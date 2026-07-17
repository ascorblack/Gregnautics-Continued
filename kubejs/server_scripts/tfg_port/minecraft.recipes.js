// priority: 0
"use strict";

// [PORT] Порт minecraft/recipes.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT] registerMinecraftRecipes -> прямой обработчик ServerEvents.recipes (KubeJS 7: изолированные скоупы, диспетчер не используется).
// [PORT] removeMinecraftRecipes(event) вынесен в отдельный файл minecraft.recipes.removes.js (кросс-файловых функций больше нет).
// [PORT] forge: -> c: (конвенция NeoForge 1.21); forge:sheets -> c:plates (GTM 8); forge:cobblestone -> c:cobblestones.
// [PORT] TFGHelpers / .addMaterialInfo — хелперы мода TFG, его нет в сборке (Фаза 4).

const MINECRAFT_COPPER_RECIPE_COMPONENT_FIELDS = [
	['block', 'block'],
	['cutted', 'cutted'],
	['stairs', 'stairs'],
	['slabs', 'slabs'],
	['shingles', 'shingles'],
	['shingleStairs', 'shingle_stairs'],
	['shingleSlabs', 'shingle_slabs'],
	['tiles', 'tiles'],
	['tileStairs', 'tile_stairs'],
	['tileSlabs', 'tile_slabs']
]

const MINECRAFT_COPPER_BLOCK_STONECUTTING_FIELDS = [
	['cutted', 'cutted'],
	['shingles', 'shingles'],
	['tiles', 'tiles']
]

const MINECRAFT_COPPER_VARIANT_STONECUTTING_FIELDS = [
	['shingles', 'shingleStairs', 1, 'shingle_stairs', 'shingles'],
	['shingles', 'shingleSlabs', 2, 'shingle_slabs', 'shingles'],
	['tiles', 'tileStairs', 1, 'tile_stairs', 'tiles'],
	['tiles', 'tileSlabs', 2, 'tile_slabs', 'tiles']
]


/**
 *
 * @param {Internal.RecipesEventJS} event
 * @param {Object} source
 * @param {Object} target
 */
const addCopperOxidizingRecipes = (event, source, target) => {
	for (const [componentName, recipeSuffix] of MINECRAFT_COPPER_RECIPE_COMPONENT_FIELDS) {
		if (!source[componentName] || !target[componentName]) continue

		event.recipes.gtceu.chemical_reactor(`tfg:minecraft/oxidizing_${recipeSuffix}_${source.name}`)
			.itemInputs(source[componentName])
			.inputFluids("#tfc:any_fresh_water 150") // [PORT-FIX] тега tfc:any_water нет в TFC 1.21 — заменён на tfc:any_fresh_water
			.circuit(1)
			.itemOutputs(target[componentName])
			.duration(60)
			.EUt(10)
	}
}

/**
 *
 * @param {Internal.RecipesEventJS} event
 * @param {Object} source
 * @param {Object} target
 */
const addCopperWaxingRecipes = (event, source, target) => {
	for (const [componentName, recipeSuffix] of MINECRAFT_COPPER_RECIPE_COMPONENT_FIELDS) {
		if (!source[componentName] || !target[componentName]) continue

		event.recipes.gtceu.assembler(`tfg:minecraft/waxing_${recipeSuffix}_${target.name}`)
			.itemInputs(source[componentName], 'firmalife:beeswax') // [PORT-FIX] тега c:wax нет ни в одном моде 1.21 (пустой тег) — единственный воск в сборке (как в firmalife.recipes.js)
			.circuit(1)
			.itemOutputs(target[componentName])
			.duration(50)
			.EUt(10)
	}
}

/**
 *
 * @param {Internal.RecipesEventJS} event
 * @param {Object} element
 */
const addCopperStonecuttingRecipes = (event, element) => {
	for (const [componentName, recipeSuffix] of MINECRAFT_COPPER_BLOCK_STONECUTTING_FIELDS) {
		if (!element[componentName]) continue

		event.stonecutting(`4x ${element[componentName]}`, element.block)
			.id(`tfg:stonecutting/${recipeSuffix}_${element.name}`)
	}
}

/**
 *
 * @param {Internal.RecipesEventJS} event
 * @param {Object} element
 */
const addCopperVariantStonecuttingRecipes = (event, element) => {
	for (const [sourceName, targetName, outputCount, recipeSuffix, sourceSuffix] of MINECRAFT_COPPER_VARIANT_STONECUTTING_FIELDS) {
		if (!element[sourceName] || !element[targetName]) continue

		event.stonecutting(`${outputCount}x ${element[targetName]}`, element[sourceName])
			.id(`tfg:stonecutting/${recipeSuffix}_from_${sourceSuffix}_${element.name}`)
	}
}


ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port minecraft recipes start')

	// [PORT] removeMinecraftRecipes(event) — перенесено в minecraft.recipes.removes.js
	const copperRecipeComponentsWaxedOffset = global.MINECRAFT_COPPER_BLOCKS_RECIPE_COMPONENTS.length / 2

	//#region Добавление, copper

	for (let i = 0; i < global.MINECRAFT_COPPER_BLOCKS_RECIPE_COMPONENTS.length; i++) {
		let element = global.MINECRAFT_COPPER_BLOCKS_RECIPE_COMPONENTS[i];

		// Создание ржавчины, oxidation
		if (i < copperRecipeComponentsWaxedOffset - 1) {
			addCopperOxidizingRecipes(event, element, global.MINECRAFT_COPPER_BLOCKS_RECIPE_COMPONENTS[i + 1])
		} else if (i > copperRecipeComponentsWaxedOffset - 1) {
			addCopperWaxingRecipes(event, global.MINECRAFT_COPPER_BLOCKS_RECIPE_COMPONENTS[i - copperRecipeComponentsWaxedOffset], element)
		}

		// Блочные варианты из stonecutter
		addCopperStonecuttingRecipes(event, element)
		addCopperVariantStonecuttingRecipes(event, element)
	}

	//#endregion

	//#endregion

	//#region Выход: Кремний, flint

	event.shapeless('minecraft:flint', [
		'#c:gravels', // [PORT-FIX] тега tfc:rock/gravel нет в TFC 1.21 — c:gravels (тег TFC)
		'#c:tools/mortar' // [PORT-FIX] в GTM8 тег ступки — c:tools/mortar (ед. число)
	]).id('gtceu:shapeless/gravel_to_flint')

	event.recipes.gtceu.sifter('gravel_sifting')
		.itemInputs('#c:gravels') // [PORT-FIX] тега tfc:rock/gravel нет в TFC 1.21 — c:gravels
		.itemOutputs('minecraft:flint')
		.chancedOutput('minecraft:flint', 9000)
		.chancedOutput('minecraft:flint', 8000)
		.chancedOutput('minecraft:flint', 6000)
		.chancedOutput('minecraft:flint', 3300)
		.chancedOutput('minecraft:flint', 2500)
		.duration(100)
		.EUt(16)

	//#endregion

	//#region Выход: Шаблон баннера, banner template

	event.shapeless('minecraft:flower_banner_pattern', [
		'minecraft:paper',
		'#c:dyes/white' // [PORT] forge: -> c:
	]).id('minecraft:flower_banner_pattern')

	//#endregion

	//#region Выход: Блок сена, hay block

	event.recipes.gtceu.packer('hay_block')
		.itemInputs('9x tfc:straw')
		.itemOutputs('minecraft:hay_block')
		.duration(200)
		.EUt(2)

	//#endregion

	//#region Выход: Светильник Джека, jack o' lantern

	event.recipes.gtceu.canner('jack_o_lantern')
		.itemInputs('tfc:pumpkin')
		.itemOutputs('tfc:jack_o_lantern')
		.duration(100)
		.EUt(4)

	//#endregion

	//#region Выход: Светящийся арбуз, glistering melon

	event.shaped('minecraft:glistering_melon_slice', [
		'AAA',
		'ABA',
		'AAA'
	], {
		A: '#c:nuggets/gold', // [PORT] forge: -> c:
		B: 'tfc:food/melon_slice'
	}).id('minecraft:glistering_melon_slice')

	event.recipes.gtceu.chemical_reactor('glistening_melon_slice')
		.itemInputs('tfc:food/melon_slice', '6x #c:nuggets/gold') // [PORT] forge: -> c:
		.itemOutputs('minecraft:glistering_melon_slice')
		.duration(50)
		.EUt(30)

	event.recipes.gtceu.large_chemical_reactor('glistening_melon_slice')
		.itemInputs('tfc:food/melon_slice', '6x #c:nuggets/gold') // [PORT] forge: -> c:
		.itemOutputs('minecraft:glistering_melon_slice')
		.duration(50)
		.EUt(30)

	//#endregion

	//#region Выход: Сухая губка, dry sponge

	event.recipes.tfc.heating('minecraft:wet_sponge', 790)
		.resultItem('minecraft:sponge')
		.id('tfg:minecraft/heating/sponge')

	event.recipes.gtceu.chemical_reactor('minecraft:gtceu/chemical_reactor/sponge')
		.itemInputs(ChemicalHelper.get(TagPrefix.dust, GTMaterials.SodiumBisulfate, 1))
		.inputFluids('gtceu:polyethylene 144', "#tfg:clean_water 250") // [PORT-CHECK] тэг флюидов tfg:clean_water нигде не регистрируется в 1.21.1 (тот же вопрос в ae2/rnr.recipes.js)
		.itemOutputs('2x minecraft:sponge')
		.outputFluids('gtceu:sodium_persulfate 35')
		.duration(80)
		.EUt(GTValues.VA[GTValues.LV])


	//#endregion

	//#region Выход: Тонированное стекло, tinted glass

	event.recipes.gtceu.alloy_smelter('tfg:minecraft/tinted_glass')
		.itemInputs('#c:glass_blocks', '4x tfc:powder/amethyst') // [PORT] forge:glass -> c:glass_blocks (NeoForge 1.21)
		.itemOutputs('minecraft:tinted_glass')
		.duration(260)
		.EUt(16)

	//#endregion

	//#region Выход: Пустая карта, maps

	// [PORT] firmaciv отсутствует в сборке 1.21.1 (firmaciv:firmaciv_compass):
	// event.recipes.gtceu.assembler('map')
	// 	.itemInputs('8x minecraft:paper', 'firmaciv:firmaciv_compass')
	// 	.itemOutputs('minecraft:map')
	// 	.duration(100)
	// 	.EUt(4)

	//#endregion

	//#region Выход: Книга, books

	event.shapeless('minecraft:book', [
		'minecraft:paper', 'minecraft:paper', 'minecraft:paper', '#c:leathers', 'tfc:glue' // [PORT-FIX] тег c:paper пуст в 1.21 — minecraft:paper; c:leather -> c:leathers (конвенция NeoForge)
	]).id('minecraft:book_from_glue')

	event.shapeless('minecraft:book', [
		'minecraft:paper', 'minecraft:paper', 'minecraft:paper', '#c:leathers', 'gtceu:sticky_resin' // [PORT-FIX] тег c:paper пуст в 1.21 — minecraft:paper; c:leather -> c:leathers
	]).id('minecraft:book_from_sticky_resin')

	event.recipes.gtceu.assembler('tfg:assembler/book_from_leather')
		.itemInputs('3x minecraft:paper', '#c:leathers') // [PORT-FIX] тег c:paper пуст в 1.21 — minecraft:paper; c:leather -> c:leathers
		.itemOutputs('minecraft:book')
		.inputFluids(Fluid.of('gtceu:glue', 50))
		.EUt(7).duration(30)

	// [PORT-FIX] minecraft:inc_sac отсутствует (опечатка из оригинала, ронял весь обработчик) — рабочая замена с ink_sac есть ниже:
	// event.replaceInput({ id: 'minecraft:writable_book' }, 'minecraft:inc_sac', '#c:dyes/black')

	//#endregion

	//#region Output: name tags

	event.recipes.gtceu.assembler('tfg:assembler/name_tag')
		.itemInputs('5x #c:strings', 'minecraft:paper') // [PORT-FIX] c:string -> c:strings (тег TFC/конвенция 1.21); тег c:paper пуст — minecraft:paper
		.itemOutputs('minecraft:name_tag')
		.EUt(7).duration(100)

	//#endregion

	//#region Выход: Компаратор, comparator

	// Компаратор
	event.shaped('minecraft:comparator', [
		' A ',
		'ABA',
		'CCC'
	], {
		A: 'minecraft:redstone_torch',
		B: '#c:gems/certus_quartz', // [PORT] forge: -> c:
		C: '#c:stones/smooth' // [PORT-FIX] тега tfc:rock/smooth нет в TFC 1.21 — c:stones/smooth
	}).id('tfg:shaped/comparator_certus');

	event.shaped('minecraft:comparator', [
		' A ',
		'ABA',
		'CCC'
	], {
		A: 'minecraft:redstone_torch',
		B: '#c:gems/quartzite', // [PORT] forge: -> c:
		C: '#c:stones/smooth' // [PORT-FIX] тега tfc:rock/smooth нет в TFC 1.21 — c:stones/smooth
	}).id('tfg:shaped/comparator_quartzite');

	event.shaped('minecraft:comparator', [
		' A ',
		'ABA',
		'CCC'
	], {
		A: 'minecraft:redstone_torch',
		B: '#c:gems/nether_quartz', // [PORT] forge: -> c:
		C: '#c:stones/smooth' // [PORT-FIX] тега tfc:rock/smooth нет в TFC 1.21 — c:stones/smooth
	}).id('tfg:shaped/comparator_nether_quartz');

	//#endregion

	//#region Output: redstone lamp

	event.replaceInput({ id: 'gtceu:shaped/redstone_lamp' }, 'minecraft:glass_pane', '#c:glass_panes') // [PORT] forge: -> c:
	event.recipes.gtceu.assembler('redstone_lamp')
		.itemInputs('1x #c:glass_blocks', '1x minecraft:glowstone', '1x #c:rods/red_alloy') // [PORT] forge: -> c:
		.itemOutputs('minecraft:redstone_lamp')
		.duration(50)
		.EUt(7)
		// [PORT-Ф4] .addMaterialInfo(true) — хелпер мода TFG отсутствует

	//#endregion

	//#region Выход: Рамка, item frame

	event.recipes.gtceu.assembler('item_frame')
		.itemInputs('8x #tfc:lumber', '#c:leathers') // [PORT-FIX] c:leather -> c:leathers (конвенция NeoForge 1.21)
		.itemOutputs('8x minecraft:item_frame')
		.duration(100)
		.EUt(4)

	event.shaped('2x minecraft:item_frame', [
		'AAA',
		'ABA',
		'AAA'
	], {
		A: '#tfc:lumber',
		B: '#c:cloth' // [PORT] forge: -> c:
	}).id('tfg:shaped/item_frame_from_cloth')

	event.recipes.gtceu.assembler('item_frame_cloth')
		.itemInputs('8x #tfc:lumber', '#c:cloth') // [PORT] forge: -> c:
		.itemOutputs('4x minecraft:item_frame')
		.duration(100)
		.EUt(4)

	//#endregion

	//#region Выход: Свето-рамка, glowing item frame

	event.shapeless('minecraft:glow_item_frame', [
		'minecraft:item_frame',
		'#c:dusts/glowstone' // [PORT] forge: -> c:
	]).id('minecraft:glow_item_frame')

	event.recipes.gtceu.assembler('tfg/glow_item_frame')
		.itemInputs('2x minecraft:item_frame', '#c:dusts/glowstone') // [PORT] forge: -> c:
		.itemOutputs('2x minecraft:glow_item_frame')
		.duration(100)
		.EUt(4)

	//#endregion

	//#region Выход: Картина, painting

	event.recipes.gtceu.assembler('painting')
		.itemInputs('#tfc:high_quality_cloth', '8x #c:rods/wood') // [PORT] forge: -> c:
		.itemOutputs('2x minecraft:painting')
		.circuit(1)
		.duration(100)
		.EUt(4)

	//#endregion

	//#region Выход: Факел, torch

	//#region В Верстаке, workbench recipes

	// Из серы, from sulfur
	event.shaped('2x tfc:dead_torch', [
		'A',
		'B'
	], {
		A: 'gtceu:sulfur_dust',
		B: '#tfc:can_be_lit_on_torch'
	}).id('gtceu:shaped/torch_sulfur')

	// Из фосфора, from phosphorous
	event.shaped('6x tfc:dead_torch', [
		'A',
		'B'
	], {
		A: 'gtceu:phosphorus_dust',
		B: '#tfc:can_be_lit_on_torch'
	}).id('gtceu:shaped/torch_phosphorus')

	// Из пыли кокса, from coke dust
	event.shaped('8x tfc:dead_torch', [
		'A',
		'B'
	], {
		A: 'gtceu:coke_dust',
		B: '#tfc:can_be_lit_on_torch'
	}).id('gtceu:shaped/torch_coke_dust')

	// Из гема кокса, from coke gems
	event.shaped('8x tfc:dead_torch', [
		'A',
		'B'
	], {
		A: 'gtceu:coke_gem',
		B: '#tfc:can_be_lit_on_torch'
	}).id('gtceu:shaped/torch_coke')

	// Из пыли угля, from coal dust
	event.shaped('4x tfc:dead_torch', [
		'A',
		'B'
	], {
		A: 'gtceu:coal_dust',
		B: '#tfc:can_be_lit_on_torch'
	}).id('gtceu:shaped/torch_coal_dust')

	// Из пыли древесного угля, from charcoal dust
	event.shaped('4x tfc:dead_torch', [
		'A',
		'B'
	], {
		A: 'gtceu:charcoal_dust',
		B: '#tfc:can_be_lit_on_torch'
	}).id('gtceu:shaped/torch_charcoal_dust')

	// Из гема древесного угля, from charcoal
	event.shaped('4x tfc:dead_torch', [
		'A',
		'B'
	], {
		A: '#minecraft:coals',
		B: '#tfc:can_be_lit_on_torch'
	}).id('tfg:crafting/torch_charcoal')

	// Из резины, from sticky resin
	event.shaped('3x tfc:dead_torch', [
		'A',
		'B'
	], {
		A: 'gtceu:sticky_resin',
		B: '#tfc:can_be_lit_on_torch'
	}).id('gtceu:shaped/sticky_resin_torch')

	//#endregion


	// Мертвый факел в обычный, smelt dead torch
	event.smelting('tfc:torch', 'tfc:dead_torch')
		.id('tfg:smelting/dead_torch_to_torch')

	//#endregion

	//#region Выход: Ведро, buckets

	event.recipes.tfc.welding(TFC.isp.of('minecraft:bucket').copyForgingBonus(), 'tfc:metal/bucket/red_steel', 'tfc:metal/bucket/blue_steel')
		.tier(6) // [PORT-FIX] kubejs_tfc 2.0: конструктор welding принимает 3 аргумента, tier задаётся методом .tier()
		.id('tfg:anvil/vanilla_bucket')

	// [PORT] greate отсутствует в сборке 1.21.1:
	// event.recipes.greate.compacting('minecraft:bucket', ['tfc:metal/bucket/red_steel', 'tfc:metal/bucket/blue_steel', 'tfc:powder/flux'])
	// 	.heated()
	// 	.recipeTier(0)
	// 	.id('greate:compacting/vanilla_bucket')

	event.recipes.gtceu.assembler('tfg:vanilla/bucket')
		.itemInputs('#c:plates/red_steel', '#c:plates/blue_steel') // [PORT] forge: -> c:
		.circuit(6)
		.itemOutputs('minecraft:bucket')
		.duration(100)
		.EUt(16)

	event.recipes.gtceu.assembler('tfg:vanilla/bucket2')
		.itemInputs('2x #c:plates/stainless_steel') // [PORT] forge: -> c:
		.circuit(7)
		.itemOutputs('minecraft:bucket')
		.duration(100)
		.EUt(16)

	//#endregion

	//#region Выход: Тигель, cauldron

	global.TFGDamageShaped(event,'minecraft:cauldron', [
		'ABA',
		'AAA'
	], {
		A: '#c:plates/iron', // [PORT] forge: -> c:
		B: '#c:tools/hammer' // [PORT-FIX] тега tfc:hammers нет в TFC 1.21 — c:tools/hammer
	}).id('gtceu:shaped/cauldron')

	event.recipes.gtceu.assembler('cauldron')
		.itemInputs('5x #c:plates/iron') // [PORT] forge: -> c:
		.circuit(10)
		.itemOutputs('minecraft:cauldron')
		.duration(700)
		.EUt(4)
		// [PORT-Ф4] .addMaterialInfo(true) — хелпер мода TFG отсутствует

	//#endregion

	//#region Выход: Воронка, hopper

	global.TFGDamageShaped(event,'minecraft:hopper', [
		'A A',
		'ABA',
		'DAE'
	], {
		A: '#c:plates/wrought_iron', // [PORT] forge: -> c:
		B: '#c:chests/wooden', // [PORT] forge: -> c:
		D: '#c:tools/wrench', // [PORT-FIX] в GTM8 тег — c:tools/wrench (ед. число)
		E: '#c:tools/hammer' // [PORT] forge:tools/hammers -> c:tools/hammer
	}).id('gtceu:shaped/hopper')

	event.recipes.gtceu.assembler('hopper_wrought_iron')
		.itemInputs('#c:chests', '5x #c:plates/wrought_iron') // [PORT] forge: -> c:
		.itemOutputs('minecraft:hopper')
		.circuit(32)
		.duration(700)
		.EUt(2)

	//#endregion

	//#region Выход: Поршень, piston

	// [PORT-Ф2-TEMP] small gear (Brass) не генерируется в стоковом GTM8 (флаг Ф2) — пустой стак валил рецепт;
	// до Ф2 маленькую шестерню заменяет латунная пластина.
	event.recipes.gtceu.assembler('piston')
		.itemInputs(ChemicalHelper.get(TagPrefix.rod, GTMaterials.WroughtIron, 1), '#c:plates/brass', '3x #tfc:lumber', '4x #c:cobblestones') // [PORT] forge:cobblestone -> c:cobblestones
		.itemOutputs('2x minecraft:piston')
		.duration(100)
		.EUt(GTValues.VA[GTValues.LV])

	//#endregion


	//#region Выход: Шерсть, wool

	event.recipes.gtceu.assembler('wool_from_string')
		.itemInputs('8x #c:strings') // [PORT-FIX] c:string -> c:strings (тег TFC/конвенция 1.21)
		.circuit(4)
		.itemOutputs('minecraft:white_wool')
		.duration(100)
		.EUt(4)


	global.MINECRAFT_DYE_NAMES.forEach(dye => {
		event.remove({ id: `minecraft:dye_${dye}_wool` })
	})

	//#endregion

	//#region Выход: Лук, bow

	event.recipes.gtceu.assembler('bow')
		.itemInputs('3x #c:strings', '3x #c:rods/wooden') // [PORT-FIX] c:string -> c:strings
		.itemOutputs('minecraft:bow')
		.duration(100)
		.EUt(4)

	//#endregion

	//#region Выход: Наблюдатель, observer

	event.shaped('minecraft:observer', [
		'AAA',
		'BBC',
		'AAA'
	], {
		A: '#c:cobblestones', // [PORT] forge:cobblestone -> c:cobblestones
		B: 'minecraft:redstone',
		C: '#c:gems/certus_quartz' // [PORT] forge: -> c:
	}).id('tfg:shaped/observer_certus_q')

	event.shaped('minecraft:observer', [
		'AAA',
		'BBC',
		'AAA'
	], {
		A: '#c:cobblestones', // [PORT] forge:cobblestone -> c:cobblestones
		B: 'minecraft:redstone',
		C: '#c:gems/nether_quartz' // [PORT] forge: -> c:
	}).id('tfg:shaped/observer_nether_q')

	event.shaped('minecraft:observer', [
		'AAA',
		'BBC',
		'AAA'
	], {
		A: '#c:cobblestones', // [PORT] forge:cobblestone -> c:cobblestones
		B: 'minecraft:redstone',
		C: '#c:gems/quartzite' // [PORT] forge: -> c:
	}).id('tfg:shaped/observer_quartzite')

	event.recipes.gtceu.assembler('observer_certus_quartz')
		.itemInputs('6x #c:cobblestones', '2x minecraft:redstone', '#c:gems/certus_quartz') // [PORT] forge: -> c:
		.itemOutputs('minecraft:observer')
		.duration(100)
		.EUt(30)

	event.recipes.gtceu.assembler('observer_nether_quartz')
		.itemInputs('6x #c:cobblestones', '2x minecraft:redstone', '#c:gems/nether_quartz') // [PORT] forge: -> c:
		.itemOutputs('minecraft:observer')
		.duration(100)
		.EUt(30)

	event.recipes.gtceu.assembler('observer_quartzite')
		.itemInputs('6x #c:cobblestones', '2x minecraft:redstone', '#c:gems/quartzite') // [PORT] forge: -> c:
		.itemOutputs('minecraft:observer')
		.duration(100)
		.EUt(30)

	//#endregion

	//#region Выход: Раздатчик, dispenser

	event.recipes.gtceu.assembler('dispenser')
		.itemInputs('6x #c:cobblestones', 'minecraft:redstone', 'minecraft:bow', '#c:small_gears/brass') // [PORT] forge: -> c:
		.circuit(1)
		.itemOutputs('minecraft:dispenser')
		.duration(100)
		.EUt(30)
		// [PORT-Ф4] .addMaterialInfo(true) — хелпер мода TFG отсутствует

	event.shaped('minecraft:dispenser', [
		'ADA',
		'ABA',
		'ACA'
	], {
		A: '#c:cobblestones', // [PORT] forge:cobblestone -> c:cobblestones
		B: 'minecraft:bow',
		C: 'minecraft:redstone',
		D: '#c:small_gears/brass' // [PORT] forge: -> c:
	}).id('gtceu:shaped/dispenser')

	//#endregion

	//#region Выход: Выбрасыватель, dropper

	event.recipes.gtceu.assembler('dropper')
		.itemInputs('7x #c:cobblestones', 'minecraft:redstone', '#c:small_gears/brass') // [PORT] forge: -> c:
		.circuit(2)
		.itemOutputs('minecraft:dropper')
		.duration(100)
		.EUt(30)
		// [PORT-Ф4] .addMaterialInfo(true) — хелпер мода TFG отсутствует

	event.shaped('minecraft:dropper', [
		'AAA',
		'ADA',
		'ACA'
	], {
		A: '#c:cobblestones', // [PORT] forge:cobblestone -> c:cobblestones
		C: 'minecraft:redstone',
		D: '#c:small_gears/brass' // [PORT] forge: -> c:
	}).id('gtceu:shaped/dropper')

	//#endregion

	//#region Выход: Рельсы, rail

	event.recipes.gtceu.assembler('rail')
		.itemInputs('6x #c:rods/wrought_iron', '#c:rods/wooden') // [PORT] forge: -> c:
		.circuit(1)
		.itemOutputs('32x minecraft:rail')
		.duration(100)
		.EUt(30)

	//#endregion

	//#region Выход: Заряженные рельсы, powered rail

	event.recipes.gtceu.assembler('powered_rail')
		.itemInputs('6x #c:rods/gold', '2x #c:rods/wooden', '#c:dusts/redstone') // [PORT] forge: -> c:
		.circuit(1)
		.itemOutputs('16x minecraft:powered_rail')
		.duration(100)
		.EUt(30)

	//#endregion

	//#region Выход: Активаторные рельсы, activator rail

	event.recipes.gtceu.assembler('activator_rail')
		.itemInputs('6x #c:rods/wrought_iron', '#c:rods/wooden', 'minecraft:redstone_torch') // [PORT] forge: -> c:
		.circuit(1)
		.itemOutputs('4x minecraft:activator_rail')
		.duration(100)
		.EUt(30)

	//#endregion

	//#region Выход: Нажимные рельсы, detector rail

	event.recipes.gtceu.assembler('detector_rail')
		.itemInputs('6x #c:rods/wrought_iron', '#c:rods/wooden', '#minecraft:stone_pressure_plates') // [PORT] forge: -> c:
		.circuit(1)
		.itemOutputs('4x minecraft:detector_rail')
		.duration(100)
		.EUt(30)

	//#endregion

	//#region Выход: Веревка, lead

	event.shaped('minecraft:lead', [
		' AA',
		' BA',
		'A  '
	], {
		A: '#c:strings', // [PORT-FIX] c:string -> c:strings
		B: '#c:rings' // [PORT] forge: -> c:
	}).id('minecraft:lead')

	// [PORT-Ф4] тэг tfg:burlap_fiber ещё не наполняется (предметы tfg: появятся в Фазе 4):
	// event.shaped('minecraft:lead', [
	// 	' AA',
	// 	' BA',
	// 	'A  '
	// ], {
	// 	A: '#tfg:burlap_fiber',
	// 	B: '#c:rings'
	// }).id('tfc:crafting/lead')

	//#endregion

	//#region Выход: Кирпич, bricks

	event.shaped('4x minecraft:bricks', [
		'BAB',
		'ABA',
		'BAB'
	], {
		A: 'tfc:mortar',
		B: 'minecraft:brick'
	}).id('tfc:crafting/bricks')

	event.recipes.gtceu.assembler(`assembler_bricks`)
		.itemInputs('5x minecraft:brick')
		.inputFluids(Fluid.of('gtceu:concrete', 144))
		.itemOutputs(`4x minecraft:bricks`)
		.duration(50)
		.circuit(2)
		.EUt(7)

	event.recipes.gtceu.alloy_smelter('tfg:brick_dust_to_brick')
		.itemInputs('#c:dusts/brick') // [PORT] forge: -> c:
		.notConsumableItem('gtceu:ingot_casting_mold') // [PORT-FIX] notConsumable(строка) не существует в GTKubeRecipe — notConsumableItem
		.itemOutputs('minecraft:brick')
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])
		.category(GTRecipeCategories.INGOT_MOLDING)

	//#endregion

	//#region Выход: Элитра, elytra

	// [PORT-Ф2/Ф4] tfg:polycaprolactam_fabric / tfg:phantom_silk / gtceu:polycaprolactam_dust — кастомные материалы и предметы TFG, появятся в Фазах 2/4.
	// [PORT-CHECK] NBT->components needs in-game verification: Item.of('minecraft:elytra', '{Damage:0}') / .strongNBT() в 1.21 не работает.
	// event.recipes.gtceu.assembler('tfg:minecraft/elytra')
	// 	.itemInputs('16x tfg:polycaprolactam_fabric', '16x #c:foils/aluminium', '8x tfg:phantom_silk', '4x #c:rings/aluminium', '2x #c:rods/long/vanadium_steel', '2x #c:small_springs/aluminium', '1x #c:small_gears/aluminium')
	// 	.circuit(4)
	// 	.itemOutputs(Item.of('minecraft:elytra', "{Damage:0}"))
	// 	.duration(1600)
	// 	.EUt(420)

	// event.recipes.gtceu.assembler('tfg:minecraft/elytra2')
	// 	.itemInputs('16x tfg:polycaprolactam_fabric', '16x #c:foils/aluminium', '8x #c:plates/ender_pearl', '4x #c:rings/aluminium', '2x #c:rods/long/vanadium_steel', '2x #c:small_springs/aluminium', '1x #c:small_gears/aluminium')
	// 	.circuit(4)
	// 	.itemOutputs(Item.of('minecraft:elytra', "{Damage:0}"))
	// 	.duration(1600)
	// 	.EUt(420)

	// event.recipes.gtceu.assembler('tfg:minecraft/elytra_repairing')
	// 	.itemInputs('6x tfg:polycaprolactam_fabric', 'minecraft:elytra')
	// 	.circuit(4)
	// 	.itemOutputs(Item.of('minecraft:elytra', "{Damage:0}"))
	// 	.duration(800)
	// 	.EUt(120)

	// event.recipes.gtceu.arc_furnace('tfg:minecraft/arc_furnace/recycling/elytra')
	// 	.itemInputs(Item.of('minecraft:elytra', '{Damage:0}').strongNBT())
	// 	.itemOutputs('4x gtceu:aluminium_ingot', '4x gtceu:tiny_ash_dust')
	// 	.duration(224)
	// 	.EUt(GTValues.VA[GTValues.LV])
	// 	.category(GTRecipeCategories.ARC_FURNACE_RECYCLING)

	// event.recipes.gtceu.macerator('tfg:minecraft/macerator/recycling/elytra')
	// 	.itemInputs(Item.of('minecraft:elytra', '{Damage:0}').strongNBT())
	// 	.itemOutputs('4x gtceu:aluminium_dust', '4x gtceu:polycaprolactam_dust')
	// 	.duration(224)
	// 	.EUt(GTValues.VA[GTValues.ULV])
	// 	.category(GTRecipeCategories.MACERATOR_RECYCLING)

	//#endregion


	//#region Netherite leggings (for the lavaproof diving set)

	// [PORT] beneath отсутствует в сборке 1.21.1 (beneath:cursed_hide):
	// event.recipes.tfc.advanced_shaped_crafting(
	// 	TFC.itemStackProvider.of('minecraft:netherite_leggings').copyForgingBonus(), [
	// 		'ABA',
	// 		'CDC'
	// 	], {
	// 		A: '#c:screws/blue_steel',
	// 		B: 'tfc:metal/greaves/blue_steel',
	// 		C: '#c:plates/blue_steel',
	// 		D: 'beneath:cursed_hide'
	// 	}, 0, 1).id('tfg:minecraft/shaped/netherite_leggings')

	//#endregion

	//#region Netherite Boots (for the lavaproof diving set)

	// [PORT] beneath отсутствует в сборке 1.21.1 (beneath:cursed_hide):
	// event.recipes.tfc.advanced_shaped_crafting(
	// 	TFC.itemStackProvider.of('minecraft:netherite_boots').copyForgingBonus(), [
	// 		'ABA',
	// 		'CDC'
	// 	], {
	// 		A: '#c:screws/blue_steel',
	// 		B: 'tfc:metal/boots/blue_steel',
	// 		C: '#c:plates/blue_steel',
	// 		D: 'beneath:cursed_hide'
	// 	}, 0, 1).id('tfg:minecraft/shaped/netherite_boots')

	//#endregion

	//#region Scaffoldings
	// [PORT-Ф4-TEMP] удаление ВРЕМЕННО ОТКЛЮЧЕНО: замена требует tfg:scaffolding_frame (Ф4),
	// без неё scaffolding был бы некрафтовым. Вернуть вместе с Ф4-рецептами ниже.
	// event.remove({ output: 'minecraft:scaffolding' })

	// [PORT-Ф4] tfg:scaffolding_frame появится в Фазе 4 — до этого scaffolding нескрафтабелен (ванильный рецепт удалён выше):
	// event.shaped('32x minecraft:scaffolding', [
	// 	'ABA',
	// 	'A A',
	// 	'A A'
	// ], {
	// 	A: 'gtceu:long_wood_rod',
	// 	B: 'tfg:scaffolding_frame'
	// }).id('tfg:minecraft/shaped/scaffolding')

	// event.recipes.gtceu.assembler('tfg:minecraft/assembler/scaffolding')
	// 	.itemInputs('6x gtceu:long_wood_rod', 'tfg:scaffolding_frame')
	// 	.itemOutputs('32x minecraft:scaffolding')
	// 	.duration(100)
	// 	.EUt(4)
	//#endregion

	// #region HUH???

	event.shapeless('minecraft:redstone_torch', ['#c:rods/wooden', 'minecraft:redstone']) // [PORT] forge: -> c:
		.id('tfg:shapeless/redstone_torch')

	event.shapeless('minecraft:lever', ['#c:rods/wooden', 'minecraft:redstone', '#c:cobblestones']) // [PORT] forge: -> c:
		.id('tfg:shapeless/lever')

	global.generateCutterRecipe(event, '#c:double_plates/wrought_iron', 'minecraft:iron_door', 400, GTValues.VA[GTValues.LV], 'iron_door') // [PORT] вызов через global; forge: -> c:

	// #endregion

	// #region Calcite

	// [PORT-FIX] tfc:damage_inputs_shapeless_crafting удалён в TFC 1.21 (kubejs_tfc 2.0 схемы его нет) — обычный shapeless;
	// [PORT-FIX] тега tfc:chisels нет в TFC 1.21 — c:tools/chisel.
	// [PORT-CHECK] калцит бедный/богатый: теги c:poor_raw_materials/calcite и c:rich_raw_materials/calcite пусты
	// (калцита нет в GREGNAUTICS_TFC_ORE_MATERIALS, у TFC нет градаций калцита) — рецепты отключены:
	// global.TFGDamageShapeless(event,'1x minecraft:calcite', ['#c:poor_raw_materials/calcite', '#c:tools/chisel'])
	// 	.id('tfg:shapeless/calcite_from_poor_raw')

	global.TFGDamageShapeless(event,'2x minecraft:calcite', ['#c:raw_materials/calcite', '#c:tools/chisel'])
		.id('tfg:shapeless/calcite_from_raw')

	// global.TFGDamageShapeless(event,'4x minecraft:calcite', ['#c:rich_raw_materials/calcite', '#c:tools/chisel'])
	// 	.id('tfg:shapeless/calcite_from_rich_raw')

	// #endregion

	//#region Кожа из кожаных предметов, leather recycling
	event.recipes.gtceu.macerator('tfg:leather_from_saddle')
		.itemInputs('minecraft:saddle')
		.itemOutputs('minecraft:leather')
		.EUt(7).duration(80)

	event.recipes.gtceu.macerator('tfg:leather_from_horse_armor')
		.itemInputs('minecraft:leather_horse_armor')
		.itemOutputs('minecraft:leather')
		.EUt(7).duration(80)
	//#endregion

	//#region Campfire
	event.shaped('minecraft:campfire', [
		' A ',
		'ABA',
		'CDC'
	], {
		A: '#c:rods/black_steel', // [PORT] forge: -> c:
		B: 'minecraft:lava_bucket',
		C: '#minecraft:logs',
		D: '#c:storage_blocks/charcoal' // [PORT] forge: -> c:
	}).id('tfg:campfire_charcoal')

	event.shaped('minecraft:campfire', [
		' A ',
		'ABA',
		'CDC'
	], {
		A: '#c:rods/black_steel', // [PORT] forge: -> c:
		B: 'minecraft:lava_bucket',
		C: '#minecraft:logs',
		D: '#c:storage_blocks/coal' // [PORT] forge: -> c:
	}).id('tfg:campfire_coal')
	//#endregion

	//#region Smithing Table
	global.TFGDamageShaped(event,'minecraft:smithing_table', [
		'C  ',
		'BB ',
		'AA '
	], {
		A: '#minecraft:planks',
		B: ChemicalHelper.get(TagPrefix.plate, GTMaterials.Lead, 1),
		C: '#c:tools/hammer' // [PORT] forge:tools/hammers -> c:tools/hammer
	}).id('minecraft:shapeless/smithing_table')

	event.recipes.gtceu.assembler('minecraft:assembler/smithing_table')
		.itemInputs('2x #minecraft:planks', ChemicalHelper.get(TagPrefix.plate, GTMaterials.Lead, 2))
		.circuit(4)
		.itemOutputs('minecraft:smithing_table')
		.duration(60)
		.EUt(GTValues.VA[GTValues.ULV])
	//#endregion

	//#region Mushrooms
	event.recipes.gtceu.chemical_bath('tfg:mushrooms_to_shroomlight')
		.itemInputs('4x #c:mushrooms') // [PORT] forge: -> c:
		.inputFluids(Fluid.of('gtceu:glowstone', 144))
		.itemOutputs('minecraft:shroomlight')
		.duration(200)
		.EUt(GTValues.VA[GTValues.ULV])

	//#endregion

	//#region Stonecutter

	event.shaped('minecraft:stonecutter', [
		' E ',
		'CAC',
		'BDB'
	], {
		A: '#c:plates/wrought_iron', // [PORT] forge: -> c:
		B: '#tfc:lumber',
		C: '#c:plates/brass', // [PORT] forge: -> c:
		D: '#c:small_gears/brass', // [PORT] forge: -> c:
		E: '#c:buzz_saw_blades' // [PORT-FIX] GTM8: buzz_saw_heads -> buzz_saw_blades
	}).id('tfg:shaped/stonecutter');

	//#endregion

	//#region Glowing Ink Sacs

	event.recipes.gtceu.fluid_solidifier('tfg:glow_ink_sac')
		.inputFluids('gtceu:glowstone 36')
		.notConsumableItem('gtceu:ball_casting_mold') // [PORT-FIX] notConsumable(строка) не существует в GTKubeRecipe — notConsumableItem
		.itemOutputs('minecraft:glow_ink_sac')
		.duration(40)
		.EUt(GTValues.VA[GTValues.LV])

	event.shapeless("minecraft:glow_ink_sac", [
		"minecraft:glowstone_dust",
		"minecraft:glowstone_dust",
		"#c:dyes"]) // [PORT] forge: -> c:
		.id("tfg:shapeless/glow_ink_sac");

	//#endregion

	//#region Gunpowder

	event.shapeless('6x minecraft:gunpowder',
		['#c:tools/mortar', '2x #c:dusts/saltpeter', '#c:dusts/sulfur', '3x #c:dusts/charcoal']) // [PORT] forge: -> c: // [PORT-FIX] c:tools/mortar -> c:tools/mortar (ед. число в GTM8)
		.id('tfg:shapeless/gunpowder_charcoal')

	event.shapeless('6x minecraft:gunpowder',
		['#c:tools/mortar', '2x #c:dusts/saltpeter', '#c:dusts/sulfur', '3x #c:dusts/coal']) // [PORT] forge: -> c: // [PORT-FIX] c:tools/mortar -> c:tools/mortar (ед. число в GTM8)
		.id('tfg:shapeless/gunpowder_coal')

	event.shapeless('6x minecraft:gunpowder',
		['#c:tools/mortar', '2x #c:dusts/saltpeter', '#c:dusts/sulfur', '3x #c:dusts/carbon']) // [PORT] forge: -> c: // [PORT-FIX] c:tools/mortar -> c:tools/mortar (ед. число в GTM8)
		.id('tfg:shapeless/gunpowder_carbon')

	event.shapeless('10x minecraft:gunpowder',
		['#c:tools/mortar', '2x #c:dusts/saltpeter', '#c:dusts/sulfur', '3x #c:dusts/graphite']) // [PORT] forge: -> c: // [PORT-FIX] c:tools/mortar -> c:tools/mortar (ед. число в GTM8)
		.id('tfg:shapeless/gunpowder_graphite')

	event.shapeless('2x minecraft:gunpowder',
		['#c:tools/mortar', 'tfc:powder/saltpeter', 'tfc:powder/saltpeter', 'tfc:powder/sulfur', 'tfc:powder/charcoal', 'tfc:powder/charcoal', 'tfc:powder/charcoal']) // [PORT] forge: -> c: // [PORT-FIX] c:tools/mortar -> c:tools/mortar (ед. число в GTM8)
		.id('tfg:shapeless/gunpowder_tfc_style')

	event.shapeless('8x minecraft:bone_meal', ['#c:tools/mortar', 'minecraft:skeleton_skull']) // [PORT] forge: -> c: // [PORT-FIX] c:tools/mortar -> c:tools/mortar (ед. число в GTM8)

	event.recipes.gtceu.macerator('tfg:skeleton_skull')
		.itemInputs('minecraft:skeleton_skull')
		.itemOutputs('8x minecraft:bone_meal')
		.EUt(2)
		.duration(50)

	event.replaceInput({ id: 'minecraft:writable_book' }, 'minecraft:ink_sac', '#c:dyes/black') // [PORT] forge: -> c:

	// #endregion

	//#region Pressure Plates

	const PRESSURE_PLATES = [
		{ type: 'polished_blackstone', material: 'minecraft:polished_blackstone_slab' }, // [PORT-Ф2] recycle: GTMaterials.get('tfg:igneous_ultramafic'), yield: 0.5 — кастомный материал TFG
		{ type: 'light_weighted', material: '#c:plates/gold' }, // [PORT] forge: -> c:; [PORT-Ф4] recycle: GTMaterials.Gold, yield: 2
		{ type: 'heavy_weighted', material: '#c:plates/iron' } // [PORT] forge: -> c:; [PORT-Ф4] recycle: GTMaterials.Iron, yield: 2
	]
	PRESSURE_PLATES.forEach(x => {
		global.TFGDamageShaped(event,`minecraft:${x.type}_pressure_plate`, [
			' B ',
			'CDC',
			' E '
		], {
			B: '#c:tools/hammer', // [PORT-FIX] тега tfc:hammers нет в TFC 1.21 — c:tools/hammer
			C: x.material,
			D: '#c:small_springs', // [PORT] forge: -> c:
			E: '#c:tools/screwdriver' // [PORT-FIX] в GTM8 тег — c:tools/screwdriver (ед. число)
		}).id(`minecraft:shaped/${x.type}_pressure_plate`)

		event.recipes.gtceu.assembler(`minecraft:${x.type}_pressure_plate`)
			.itemInputs('#c:small_springs', `2x ${x.material}`) // [PORT] forge: -> c:
			.itemOutputs(`minecraft:${x.type}_pressure_plate`)
			.circuit(3)
			.duration(50)
			.EUt(2)

		// [PORT-Ф4] TFGHelpers.registerMaterialInfo(`minecraft:${x.type}_pressure_plate`, [x.recycle, x.yield]) — хелпер мода TFG отсутствует
	})

	global.TFGDamageShapeless(event,'3x minecraft:polished_blackstone_button', ['minecraft:polished_blackstone_pressure_plate', '#c:tools/saw']) // [PORT] forge:tools/saws -> c:tools/saw
		.id(`tfg:shapeless/saw_blackstone_pressure_plate_to_button`)

	// #endregion

	// Minecart w/ Furnace
	event.shapeless('minecraft:furnace_minecart', ['minecraft:water_bucket', 'gtceu:hp_steam_solid_boiler', 'minecraft:minecart']);

	event.recipes.gtceu.assembler('minecraft:furnace_minecart')
		.itemInputs('minecraft:water_bucket', 'gtceu:hp_steam_solid_boiler', 'minecraft:minecart')
		.itemOutputs('minecraft:furnace_minecart')
		.duration(100)
		.EUt(4)
})
