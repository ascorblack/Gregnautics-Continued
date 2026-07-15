// priority: 0
"use strict";

// [PORT] Портировано из firmalife/recipes.js (TerraFirmaGreg-Modern 1.20.1 -> 1.21.1)
// [PORT] registerFirmaLifeRecipes -> прямой обработчик ServerEvents.recipes (KubeJS 7: изолированные скоупы)
// [PORT] Основные замены: forge:* -> c:* (плюс переименования инструментов), tfc:sweetener -> tfc:foods/sweeteners,
// [PORT] global.TFC_GRAINS (нет в сборке) -> global.TFC_DOUGHS (те же 6 злаков),
// [PORT] tfcchannelcasting отсутствует — шоколадная ветка оставлена ванильной Firmalife

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port firmalife recipes start')

	// - Chromium

	// Ores
	event.remove({ id: 'firmalife:heating/ore/small_chromite' })
	event.remove({ id: 'firmalife:heating/ore/poor_chromite' })
	event.remove({ id: 'firmalife:heating/ore/normal_chromite' })
	event.remove({ id: 'firmalife:heating/ore/rich_chromite' })

	// Plated blocks
	event.remove({ id: 'firmalife:crafting/crafting/metal/block/chromium' })
	event.remove({ id: 'firmalife:crafting/metal/block/chromium_slab' })
	event.remove({ id: 'firmalife:crafting/metal/block/chromium_stairs' })
	event.remove({ id: 'firmalife:heating/metal/block/chromium' })
	event.remove({ id: 'firmalife:heating/metal/block/chromium_slab' })
	event.remove({ id: 'firmalife:heating/metal/block/chromium_stairs' })

	// - Stainless Steel
	event.remove({ id: 'firmalife:alloy/stainless_steel' })

	// Jar lid
	event.remove({ id: 'firmalife:heating/stainless_steel_jar_lid' })

	// Default Sugar Water
	event.remove({ id: 'firmalife:vat/sugar_water' })

	// Plated Blocks
	event.remove({ id: 'firmalife:crafting/crafting/metal/block/stainless_steel' })
	event.remove({ id: 'firmalife:crafting/metal/block/stainless_steel_slab' })
	event.remove({ id: 'firmalife:crafting/metal/block/stainless_steel_stairs' })
	event.remove({ id: 'firmalife:heating/metal/block/stainless_steel' })
	event.remove({ id: 'firmalife:heating/metal/block/stainless_steel_slab' })
	event.remove({ id: 'firmalife:heating/metal/block/stainless_steel_stairs' })

	global.TFC_DOUGHS.forEach(dough => {
		event.remove({ id: `firmalife:crafting/food/${dough}_dough` }) // [PORT-FIX] Firmalife 3.0: id теперь crafting/food/*
	})

	// [PORT] tfcchannelcasting отсутствует в сборке 1.21.1 — оставляем ванильный рецепт шоколада Firmalife
	// event.remove({ id: 'firmalife:pot/chocolate' })

	//#endregion

	// [PORT-FIX] c:screws/any_bronze (тег TFG) не портирован — пустой тег ломал рецепт; сужено до c:screws/bronze (GTCEu), расширить после порта tfg-тегов
	event.shapeless('firmalife:barrel_stave', ['2x firmalife:treated_lumber', '#c:screws/bronze', '#c:tools/hammer']) // [PORT] forge: -> c:, tools/hammers -> tools/hammer
		.id('firmalife:crafting/barrel_stave')


	// Декрафт Jag Lid
	event.recipes.tfc.heating('tfc:jar_lid', 230)
		.resultFluid(Fluid.of('gtceu:tin', 6))
		.id(`tfc:heating/jar_lid`)

	// Pie Pan
	event.recipes.tfc.anvil('4x firmalife:pie_pan', '#c:plates/wrought_iron', ["hit_last", "hit_second_last", "draw_third_last"]) // [PORT] forge:plates -> c:plates
		.tier(3)
		.id('firmalife:anvil/pie_pan')

	// Jarring Station
	event.shaped('firmalife:jarring_station', [
		'A A',
		'BBB'
	], {
		A: '#c:plates/wrought_iron', // [PORT] forge:plates -> c:plates
		B: 'firmalife:treated_lumber'
	}).id('firmalife:crafting/jarring_station')

	// Vat
	event.recipes.gtceu.shaped('firmalife:vat', [
		'A A',
		'BAB'
	], {
		A: '#c:plates/wrought_iron', // [PORT] forge:plates -> c:plates
		B: 'firmalife:beeswax' // [PORT-FIX] тега c:wax нет ни в одном моде 1.21 (пустой тег ломал рецепт) — единственный воск в сборке
	}).addMaterialInfo().id('firmalife:crafting/vat')

	// Jar Lid
	event.recipes.gtceu.fluid_solidifier(`tfg:firmalife/jar_lid`)
		.inputFluids(Fluid.of('gtceu:tin', 6))
		.notConsumableItem('gtceu:cylinder_casting_mold') // [PORT-FIX] GTCEu 1.21: notConsumable(string) не существует -> notConsumableItem
		.itemOutputs('tfc:jar_lid')
		.duration(50)
		.EUt(7)

		event.recipes.gtceu.alloy_smelter('tfg:firmalife/jar_lid')
		.itemInputs('1x #c:ingots/tin') // [PORT] forge: -> c:
		.notConsumableItem('gtceu:cylinder_casting_mold') // [PORT-FIX] GTCEu 1.21: notConsumable(string) не существует -> notConsumableItem
		.itemOutputs('24x tfc:jar_lid')
		.duration(75)
		.category(GTRecipeCategories.INGOT_MOLDING)
		.EUt(4)
		.addMaterialInfo(true)

	event.recipes.gtceu.extractor('tfc:jar_lid_extraction')
		.itemInputs('tfc:jar_lid')
		.outputFluids(Fluid.of('gtceu:tin', 6))
		.duration(50)
		.category(GTRecipeCategories.EXTRACTOR_RECYCLING)
		.EUt(2)

	event.recipes.gtceu.fluid_solidifier(`firmalife:firmalife/stainless_steel_jar_lid`)
		.inputFluids(Fluid.of('gtceu:stainless_steel', 3))
		.notConsumableItem('gtceu:cylinder_casting_mold') // [PORT-FIX] GTCEu 1.21: notConsumable(string) не существует -> notConsumableItem
		.itemOutputs('firmalife:stainless_steel_jar_lid')
		.duration(50)
		.EUt(7)

		event.recipes.gtceu.alloy_smelter('tfg:firmalife/stainless_steel_jar_lid')
		.itemInputs('1x #c:ingots/stainless_steel') // [PORT] forge: -> c:
		.notConsumableItem('gtceu:cylinder_casting_mold') // [PORT-FIX] GTCEu 1.21: notConsumable(string) не существует -> notConsumableItem
		.itemOutputs('48x firmalife:stainless_steel_jar_lid')
		.duration(75)
		.category(GTRecipeCategories.INGOT_MOLDING)
		.EUt(4)
		.addMaterialInfo(true)

	event.recipes.gtceu.extractor('firmalife:stainless_steel_jar_extraction')
		.itemInputs('firmalife:stainless_steel_jar_lid')
		.outputFluids(Fluid.of('gtceu:stainless_steel', 3))
		.duration(50)
		.EUt(2)

	// Pineapple Yarn
	event.recipes.gtceu.wiremill(`tfg:firmalife/pineapple_yarn`)
		.itemInputs('firmalife:pineapple_fiber')
		.circuit(1)
		.itemOutputs('8x firmalife:pineapple_yarn')
		.duration(50)
		.EUt(7)

	event.remove({ id: 'firmalife:crafting/pineapple_yarn' })

	// Pineapple Leather
	event.recipes.gtceu.assembler(`tfg:firmalife/pineapple_leather`)
		.itemInputs('16x firmalife:pineapple_yarn')
		.circuit(1)
		.itemOutputs('firmalife:pineapple_leather')
		.duration(50)
		.EUt(7)

	//#region Wine Working

	event.recipes.gtceu.alloy_smelter('firmalife:empty_olivine_wine_bottle')
		.itemInputs('tfc:olivine_glass_batch')
		.notConsumableItem('gtceu:cylinder_casting_mold') // [PORT-FIX] GTCEu 1.21: notConsumable(string) не существует -> notConsumableItem
		.itemOutputs('firmalife:empty_olivine_wine_bottle')
		.duration(100)
		.EUt(GTValues.VA[GTValues.ULV])
		.category(GTRecipeCategories.INGOT_MOLDING)

	event.recipes.gtceu.alloy_smelter('firmalife:empty_volcanic_wine_bottle')
		.itemInputs('tfc:volcanic_glass_batch')
		.notConsumableItem('gtceu:cylinder_casting_mold') // [PORT-FIX] GTCEu 1.21: notConsumable(string) не существует -> notConsumableItem
		.itemOutputs('firmalife:empty_volcanic_wine_bottle')
		.duration(100)
		.EUt(GTValues.VA[GTValues.ULV])
		.category(GTRecipeCategories.INGOT_MOLDING)

	event.recipes.gtceu.alloy_smelter('firmalife:empty_hematitic_wine_bottle')
		.itemInputs('tfc:hematitic_glass_batch')
		.notConsumableItem('gtceu:cylinder_casting_mold') // [PORT-FIX] GTCEu 1.21: notConsumable(string) не существует -> notConsumableItem
		.itemOutputs('firmalife:empty_hematitic_wine_bottle')
		.duration(100)
		.EUt(GTValues.VA[GTValues.ULV])
		.category(GTRecipeCategories.INGOT_MOLDING)

	event.recipes.gtceu.alloy_smelter('firmalife:wine_glass')
		.itemInputs('tfc:silica_glass_batch')
		.notConsumableItem('gtceu:cylinder_casting_mold') // [PORT-FIX] GTCEu 1.21: notConsumable(string) не существует -> notConsumableItem
		.itemOutputs('2x firmalife:wine_glass')
		.duration(100)
		.EUt(GTValues.VA[GTValues.ULV])
		.category(GTRecipeCategories.INGOT_MOLDING)

	event.recipes.gtceu.chemical_bath('firmalife:cork')
		.itemInputs('firmalife:treated_lumber')
		.inputFluids(Fluid.of('tfc:limewater', 1000))
		.itemOutputs('8x firmalife:cork')
		.duration(300)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.assembler('firmalife:bottle_label')
		.itemInputs('firmalife:beeswax', 'minecraft:paper') // [PORT-FIX] тега c:wax нет в 1.21 (пустой тег) — единственный воск в сборке
		.itemOutputs('16x firmalife:bottle_label')
		.duration(30)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.alloy_smelter('pie_pan')
		.itemInputs('#c:ingots/wrought_iron') // [PORT] forge: -> c:
		.notConsumableItem('gtceu:cylinder_casting_mold') // [PORT-FIX] GTCEu 1.21: notConsumable(string) не существует -> notConsumableItem
		.itemOutputs('6x firmalife:pie_pan')
		.EUt(GTValues.VA[GTValues.ULV])
		.duration(100)
		.category(GTRecipeCategories.INGOT_MOLDING)

	// [PORT-FIX] тега c:wax нет в 1.21 — замена beeswax -> #c:wax стала бы пустым ингредиентом; рецепт и так использует beeswax
	// event.replaceInput({ id: 'firmalife:crafting/bottle_label' }, 'firmalife:beeswax', '#c:wax')

	event.shapeless('firmalife:fruit_leaf', ['#tfc:fruit_tree_leaves']).id('tfg:shapeless/firmalife/fruit_leaf_from_fruit_leaves');

	//#endregion

	//#region Рецепты теплиц / Greenhouse

	// [PORT-Ф4] tfg:small_casing_extruder_mold — предмет tfg: ещё не зарегистрирован
	// event.recipes.gtceu.extruder('tfg:firmalife/sprinkler_electric_only')
	// 	.itemInputs('#c:plates/copper')
	// 	.notConsumable('tfg:small_casing_extruder_mold')
	// 	.itemOutputs('firmalife:sprinkler')
	// 	.duration(60)
	// 	.EUt(8)
	// 	.addMaterialInfo(true)

	/**
	 * @type {string[]} - Tier names of greenhouse casings.
	 */
	const greenhouse_tiers = [
		{tier: 'treated_wood', material: 'firmalife:treated_lumber', weathering: ["", "weathered_"]},
		{tier: 'copper', material: ChemicalHelper.get(TagPrefix.rod, GTMaterials.Copper, 1), weathering: [
			"",
			"exposed_",
			"weathered_",
			"oxidized_"
		]},
		{tier: 'iron', material: ChemicalHelper.get(TagPrefix.rod, GTMaterials.WroughtIron, 1), weathering: ["", "rusted_"]},
		{tier: 'stainless_steel', material: ChemicalHelper.get(TagPrefix.rod, GTMaterials.StainlessSteel, 1)}
	];

	const GREENHOUSE_BLOCKS = [
		"wall",
		"panel_wall",
		"panel_roof",
		"roof",
		"roof_top",
		"trapdoor",
		"door",
		"port"
	]

	//addMaterialInfo throws errors in console if this isn't included
	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('firmalife:treated_lumber', [GTMaterials.Wood, 1 / 4]) — Java-хелпер мода TFG отсутствует в сборке

	//Firmalife namespace is left so we dont have to change patchouli entries.
	greenhouse_tiers.forEach(tier => {

		event.remove({ id: `firmalife:crafting/${tier.tier}_greenhouse_wall`})
		event.recipes.gtceu.shaped(`16x firmalife:${tier.tier}_greenhouse_wall`, [
			'ABA',
			'BBB',
			'ABA'
		], {
			A: tier.material,
			B: 'firmalife:reinforced_glass'
		}).addMaterialInfo().id(`firmalife:crafting/greenhouse/${tier.tier}_greenhouse_wall`)

		event.remove({ id: `firmalife:crafting/${tier.tier}_greenhouse_panel_wall`})
		event.recipes.gtceu.shaped(`16x firmalife:${tier.tier}_greenhouse_panel_wall`, [
			'ABA',
			'ABA',
			'ABA'
		], {
			A: tier.material,
			B: 'firmalife:reinforced_glass'
		}).addMaterialInfo().id(`firmalife:crafting/greenhouse/${tier.tier}_greenhouse_panel_wall`)

		event.remove({ id: `firmalife:crafting/${tier.tier}_greenhouse_panel_roof`})
		event.recipes.gtceu.shaped(`8x firmalife:${tier.tier}_greenhouse_panel_roof`, [
			'A  ',
			'BA ',
			'BBA'
		], {
			A: 'firmalife:reinforced_glass',
			B: tier.material
		}).addMaterialInfo().id(`firmalife:crafting/greenhouse/${tier.tier}_greenhouse_panel_roof`)

		event.remove({ id: `firmalife:crafting/${tier.tier}_greenhouse_roof`})
		event.recipes.gtceu.shaped(`8x firmalife:${tier.tier}_greenhouse_roof`, [
			'A  ',
			'BA ',
			'BBA'
		], {
			A: tier.material,
			B: 'firmalife:reinforced_glass'
		}).addMaterialInfo().id(`firmalife:crafting/greenhouse/${tier.tier}_greenhouse_roof`)

		event.remove({ id: `firmalife:crafting/${tier.tier}_greenhouse_roof_top`})
		event.recipes.gtceu.shaped(`8x firmalife:${tier.tier}_greenhouse_roof_top`, [
			'ABA',
			'BAB'
		], {
			A: tier.material,
			B: 'firmalife:reinforced_glass'
		}).addMaterialInfo().id(`firmalife:crafting/greenhouse/${tier.tier}_greenhouse_roof_top`)

		event.remove({ id: `firmalife:crafting/${tier.tier}_greenhouse_trapdoor`})
		event.recipes.gtceu.shaped(`8x firmalife:${tier.tier}_greenhouse_trapdoor`, [
			'ABA',
			'BAB'
		], {
			A: 'firmalife:reinforced_glass',
			B: tier.material
		}).addMaterialInfo().id(`firmalife:crafting/greenhouse/${tier.tier}_greenhouse_trapdoor`)

		event.remove({ id: `firmalife:crafting/${tier.tier}_greenhouse_door`})
		event.recipes.gtceu.shaped(`2x firmalife:${tier.tier}_greenhouse_door`, [
			'AB',
			'AB',
			'AB'
		], {
			A: tier.material,
			B: 'firmalife:reinforced_glass'
		}).addMaterialInfo().id(`firmalife:crafting/greenhouse/${tier.tier}_greenhouse_door`)

		event.remove({ id: `firmalife:crafting/${tier.tier}_greenhouse_port`})
		event.recipes.gtceu.shaped(`firmalife:${tier.tier}_greenhouse_port`, [
			'AB'
		], {
			A: `#tfg:${tier.tier}_greenhouse_casings`,
			B: ChemicalHelper.get(TagPrefix.pipeTinyFluid, GTMaterials.Copper, 1)
		}).addMaterialInfo().id(`firmalife:crafting/greenhouse/${tier.tier}_greenhouse_port`)

		if (tier.tier !== "stainless_steel") {
			tier.weathering.forEach((weathering, i, weatheringArray) => {
				GREENHOUSE_BLOCKS.forEach(block => {
					if (weatheringArray[i + 1]) {
						event.recipes.gtceu.chemical_bath(`tfg:corrode_${weatheringArray[i + 1]}${tier.tier}_greenhouse_${block}`)
							.itemInputs(`firmalife:${weathering}${tier.tier}_greenhouse_${block}`)
							.inputFluids('#tfc:any_water 150')
							.itemOutputs(`firmalife:${weatheringArray[i + 1]}${tier.tier}_greenhouse_${block}`)
							.duration(30)
							.EUt(30)

						// [PORT-FIX] kubejs_tfc 2.0: конструктор barrel_sealed(input_fluid, duration); TFC.fluidStackIngredient/.inputFluid удалены
						event.recipes.tfc.barrel_sealed('#tfc:any_water 150', 2000)
							.inputItem(`firmalife:${weathering}${tier.tier}_greenhouse_${block}`)
							.outputItem(`firmalife:${weatheringArray[i + 1]}${tier.tier}_greenhouse_${block}`)
							.id(`tfg:corrode_${weatheringArray[i + 1]}${tier.tier}_greenhouse_${block}`)
					}
					if (i !== 0) {
						event.recipes.gtceu.chemical_bath(`tfg:strip_${weathering}${tier.tier}_greenhouse_${block}`)
							.itemInputs(`firmalife:${weathering}${tier.tier}_greenhouse_${block}`)
							.inputFluids('gtceu:phosphoric_acid 10')
							.itemOutputs(`firmalife:${tier.tier}_greenhouse_${block}`)
							.duration(30)
							.EUt(30)
					}
				})
			})
		}
	});

	// [PORT-Ф2] теги #c:saw_heads/wrought_iron и #c:small_gears/red_alloy пусты до материалов/флагов Ф2
	// (gtceu:shaped валидирует ключи жёстко) — рецепты отключены, остаются оригинальные firmalife
	// (наши id совпадают с firmalife:crafting/sweeper|picker, так что без наших ваниль сохраняется).
	// event.recipes.gtceu.shaped('2x firmalife:sweeper', [
	// 	'ABD',
	// 	'CB '
	// ], {
	// 	A: '#c:saw_heads/wrought_iron', // [PORT] forge: -> c:
	// 	B: '#c:rods/wrought_iron', // [PORT] forge: -> c:
	// 	C: '#c:small_gears/red_alloy', // [PORT] forge: -> c:
	// 	D: '#c:tools/wrench' // [PORT] forge: -> c:
	// }).addMaterialInfo().id('firmalife:crafting/sweeper')

	// event.recipes.gtceu.shaped('4x firmalife:picker', [
	// 	'ABD',
	// 	'CC ',
	// 	'EE '
	// ], {
	// 	A: '#c:plates/wrought_iron', // [PORT] forge: -> c:
	// 	B: '#c:small_gears/red_alloy', // [PORT] forge: -> c:
	// 	C: '#c:rods/wrought_iron', // [PORT] forge: -> c:
	// 	D: '#c:tools/wrench', // [PORT] forge: -> c:
	// 	E: '#c:hoe_heads/wrought_iron' // [PORT] forge: -> c:
	// }).addMaterialInfo().id('firmalife:crafting/picker')

	//#endregion

	//#region Reinforced Glass

	event.shaped('9x firmalife:reinforced_glass', [
		'AB'
	], {
		A: '#c:tools/saw', // [PORT] tfc:saws -> c:tools/saw (TFC 4.x перешёл на общие c:-теги инструментов)
		B: 'gtceu:tempered_glass'
	}).id('tfg:shaped/reinforced_glass');

	global.generateCutterRecipe(event, '1x gtceu:tempered_glass', '9x firmalife:reinforced_glass', 100, 7, 'reinforced_glass'); // [PORT] вызов через global

	event.recipes.gtceu.macerator('tfg:recycling/reinforced_glass')
		.itemInputs('firmalife:reinforced_glass')
		.itemOutputs(
			ChemicalHelper.get(TagPrefix.dustTiny, GTMaterials.Glass, 1)
		)
		.duration(GTMaterials.Glass.getMass() * 1)
		.category(GTRecipeCategories.MACERATOR_RECYCLING)
		.EUt(GTValues.VA[GTValues.ULV]);

	//#endregion

	//#region Better Sugar Water
	// [PORT-FIX] kubejs_tfc 2.0.1 не поддерживает схемы firmalife — рецепты vat переписаны на event.custom (формат JSON сверен с data/firmalife/recipe/vat/*.json)
	event.custom({
		"type": "firmalife:vat",
		"input_item": { "tag": "tfc:foods/sweeteners" }, // [PORT] tfc:sweetener -> tfc:foods/sweeteners (TFC 4.x)
		"input_fluid": { "amount": 2000, "fluid": "minecraft:water" },
		"output_fluid": { "amount": 2000, "id": "firmalife:sugar_water" },
		"length": 600,
		"temperature": 300.0
	}).id('tfg:vat/sugar_water')

	//#endregion

	//#region Salt by Vat

	// [PORT-CHECK] Firmalife 3.0: кодек firmalife:vat ТРЕБУЕТ input_item — чисто жидкостный
	// рецепт 1.20 невозможен. Отключён; соль из морской воды остаётся через TFC-выпаривание/GT.
	// event.custom({
	// 	"type": "firmalife:vat",
	// 	"input_fluid": { "amount": 625, "fluid": "tfc:salt_water" },
	// 	"output_item": { "id": "gtceu:small_salt_dust" },
	// 	"length": 600,
	// 	"temperature": 300.0
	// }).id('tfg:vat/sea_water_to_salt');

	//#endregion

	//#region Replace existing dyes

	global.MINECRAFT_DYE_NAMES.forEach(dyeName => {

		event.custom({
			"type": "firmalife:vat",
			"input_item": { "tag": `c:dyes/${dyeName}` }, // [PORT] forge:dyes -> c:dyes
			"input_fluid": { "amount": 250, "fluid": "tfc:vinegar" },
			"output_fluid": { "amount": 144, "id": `tfc:${dyeName}_dye` },
			"length": 100,
			"temperature": 200.0
		}).id(`firmalife:vat/${dyeName}_dye`)
	})

	//#endregion

	// #region Drying mat alternatives

	event.shaped('firmalife:drying_mat', ['AAA'], { A: 'tfc:plant/leafy_kelp' }).id('tfg:shaped/drying_mat_leafy_kelp')
	event.shaped('firmalife:drying_mat', ['AAA'], { A: 'tfc:plant/winged_kelp' }).id('tfg:shaped/drying_mat_winged_kelp')
	// [PORT-CHECK] тег tfg:charnia нигде не наполняется (tfg/tags.js ещё не портирован) — пустой тег ломал рецепт
	// event.shaped('firmalife:drying_mat', ['AAA'], { A: '#tfg:charnia' }).id('tfg:shaped/drying_mat_charnia')

	// #endregion

	event.recipes.gtceu.mixer('sugar_water')
		.itemInputs('#tfc:foods/sweeteners') // [PORT] tfc:sweetener -> tfc:foods/sweeteners (TFC 4.x)
		.inputFluids("#tfc:any_fresh_water 2000") // [PORT-FIX] тег tfg:clean_water не портирован (пустой) -> tfc:any_fresh_water
		.outputFluids(Fluid.of('firmalife:sugar_water', 2000))
		.circuit(5)
		.EUt(GTValues.VA[GTValues.ULV])
		.duration(200)

	// [PORT-FIX] replaceIngredient(..., Item.empty) невалиден в 1.21 (air в ingredient_actions);
	// ракушка и так расходуется крафтом, молоток вернётся через remainder.
	event.shapeless('2x tfc:powder/flux', [
		'firmalife:hollow_shell',
		'#c:tools/hammer']) // [PORT] forge:tools/hammers -> c:tools/hammer
		.id('tfg:shapeless/hollow_shell_to_flux')

	event.recipes.gtceu.macerator('firmalife:hollow_shell')
		.itemInputs('firmalife:hollow_shell')
		.itemOutputs('2x tfc:powder/flux')
		.EUt(2)
		.duration(50)

	// Dough

	// [PORT] global.TFC_GRAINS нет в сборке — используем global.TFC_DOUGHS (те же 6 злаков), grain.name -> grain
	global.TFC_DOUGHS.forEach(grain => {
		event.recipes.tfc.advanced_shapeless_crafting(TFC.isp.of(`2x firmalife:food/${grain}_dough`).copyFood(), [
			'firmalife:spoon',
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			'firmalife:tirage_mixture',
			'#c:bowls'
		], `tfc:food/${grain}_flour`).keepIngredient('#c:bowls').id(`tfg:shapeless/${grain}_dough`)

		event.recipes.tfc.advanced_shapeless_crafting(TFC.isp.of(`4x firmalife:food/${grain}_dough`).copyFood(), [
			'firmalife:spoon',
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			'firmalife:tirage_mixture',
			'firmalife:mixing_bowl'
		], `tfc:food/${grain}_flour`).id(`tfg:shapeless/${grain}_dough_mixing`)

		event.recipes.tfc.advanced_shapeless_crafting(TFC.isp.of(`4x firmalife:food/${grain}_dough`).copyFood(), [
			'firmalife:spoon',
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			'2x firmalife:tirage_mixture',
			'#c:bowls'
		], `tfc:food/${grain}_flour`).keepIngredient('#c:bowls').id(`tfg:shapeless/${grain}_dough_2`)

		event.recipes.tfc.advanced_shapeless_crafting(TFC.isp.of(`8x firmalife:food/${grain}_dough`).copyFood(), [
			'firmalife:spoon',
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			'2x firmalife:tirage_mixture',
			'firmalife:mixing_bowl'
		], `tfc:food/${grain}_flour`).id(`tfg:shapeless/${grain}_dough_mixing_2`)

		event.recipes.tfc.advanced_shapeless_crafting(TFC.isp.of(`6x firmalife:food/${grain}_dough`).copyFood(), [
			'firmalife:spoon',
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			'3x firmalife:tirage_mixture',
			'#c:bowls'
		], `tfc:food/${grain}_flour`).keepIngredient('#c:bowls').id(`tfg:shapeless/${grain}_dough_3`)

		event.recipes.tfc.advanced_shapeless_crafting(TFC.isp.of(`12x firmalife:food/${grain}_dough`).copyFood(), [
			'firmalife:spoon',
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			'3x firmalife:tirage_mixture',
			'firmalife:mixing_bowl'
		], `tfc:food/${grain}_flour`).id(`tfg:shapeless/${grain}_dough_3_mixing`)


		event.recipes.tfc.advanced_shapeless_crafting(TFC.isp.of(`2x tfc:food/${grain}_dough`).copyFood(), [
			'firmalife:spoon',
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.fluidContents('minecraft:water', 100),
			'#c:bowls'
		], `tfc:food/${grain}_flour`).keepIngredient('#c:bowls').id(`tfg:shapeless/${grain}_flatbread_dough`)

		event.recipes.tfc.advanced_shapeless_crafting(TFC.isp.of(`4x tfc:food/${grain}_dough`).copyFood(), [
			'firmalife:spoon',
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.fluidContents('minecraft:water', 100),
			'firmalife:mixing_bowl'
		], `tfc:food/${grain}_flour`).id(`tfg:shapeless/${grain}_flatbread_dough_mixing`)

		event.recipes.tfc.advanced_shapeless_crafting(TFC.isp.of(`4x tfc:food/${grain}_dough`).copyFood(), [
			'firmalife:spoon',
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.fluidContents('minecraft:water', 200),
			'#c:bowls'
		], `tfc:food/${grain}_flour`).keepIngredient('#c:bowls').id(`tfg:shapeless/${grain}_flatbread_dough_2`)

		event.recipes.tfc.advanced_shapeless_crafting(TFC.isp.of(`8x tfc:food/${grain}_dough`).copyFood(), [
			'firmalife:spoon',
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.fluidContents('minecraft:water', 200),
			'firmalife:mixing_bowl'
		], `tfc:food/${grain}_flour`).id(`tfg:shapeless/${grain}_flatbread_dough_2_mixing`)

		event.recipes.tfc.advanced_shapeless_crafting(TFC.isp.of(`6x tfc:food/${grain}_dough`).copyFood(), [
			'firmalife:spoon',
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.fluidContents('minecraft:water', 300),
			'#c:bowls'
		], `tfc:food/${grain}_flour`).keepIngredient('#c:bowls').id(`tfg:shapeless/${grain}_flatbread_dough_3`)

		event.recipes.tfc.advanced_shapeless_crafting(TFC.isp.of(`12x tfc:food/${grain}_dough`).copyFood(), [
			'firmalife:spoon',
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.fluidContents('minecraft:water', 300),
			'firmalife:mixing_bowl'
		], `tfc:food/${grain}_flour`).id(`tfg:shapeless/${grain}_flatbread_dough_3_mixing`)

		event.recipes.tfc.advanced_shapeless_crafting(TFC.isp.of(`8x tfc:food/${grain}_dough`).copyFood(), [
			'firmalife:spoon',
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.fluidContents('minecraft:water', 400),
			'#c:bowls'
		], `tfc:food/${grain}_flour`).keepIngredient('#c:bowls').id(`tfg:shapeless/${grain}_flatbread_dough_4`)

		event.recipes.tfc.advanced_shapeless_crafting(TFC.isp.of(`16x tfc:food/${grain}_dough`).copyFood(), [
			'firmalife:spoon',
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.and(`tfc:food/${grain}_flour`, TFC.ingredient.notRotten()),
			TFC.ingredient.fluidContents('minecraft:water', 400),
			'firmalife:mixing_bowl'
		], `tfc:food/${grain}_flour`).id(`tfg:shapeless/${grain}_flatbread_dough_4_mixing`)

		// [PORT-FIX] kubejs_tfc 2.0.1 не поддерживает схемы firmalife — mixing_bowl переписан на event.custom (формат сверен с data/firmalife/recipe/mixing_bowl/*.json)
		event.custom({
			"type": "firmalife:mixing_bowl",
			"item_ingredients": [
				{ "type": "tfc:and", "children": [{ "item": `tfc:food/${grain}_flour` }, { "type": "tfc:not_rotten" }] },
				{ "tag": "tfc:foods/sweeteners" } // [PORT] tfc:sweetener -> tfc:foods/sweeteners (TFC 4.x)
			],
			"fluid_ingredients": { "amount": 100, "fluid": "firmalife:yeast_starter" },
			"result_item": { "count": 4, "id": `firmalife:food/${grain}_dough` }
		}).id(`tfg:mixing_bowl/${grain}_dough`)

		event.custom({
			"type": "firmalife:mixing_bowl",
			"item_ingredients": [
				{ "type": "tfc:and", "children": [{ "item": `tfc:food/${grain}_flour` }, { "type": "tfc:not_rotten" }] }
			],
			"fluid_ingredients": { "amount": 100, "fluid": "minecraft:water" },
			"result_item": { "count": 4, "id": `tfc:food/${grain}_dough` }
		}).id(`tfg:mixing_bowl/${grain}_flatbread_dough`)
	})

	event.recipes.tfc.advanced_shapeless_crafting(TFC.isp.of(`2x firmalife:food/hardtack_dough`).copyFood(), [
		'firmalife:spoon',
		TFC.ingredient.and(`#c:foods/flour`, TFC.ingredient.notRotten()),
		'tfc:powder/salt',
		TFC.ingredient.fluidContents('minecraft:water', 100),
		'#c:bowls'
	], '#c:foods/flour').keepIngredient('#c:bowls').id(`tfg:shapeless/hardtack_dough`)

	event.recipes.tfc.advanced_shapeless_crafting(TFC.isp.of(`4x firmalife:food/hardtack_dough`).copyFood(), [
		'firmalife:spoon',
		TFC.ingredient.and(`#c:foods/flour`, TFC.ingredient.notRotten()),
		'tfc:powder/salt',
		TFC.ingredient.fluidContents('minecraft:water', 100),
		'firmalife:mixing_bowl'
	], '#c:foods/flour').id(`tfg:shapeless/hardtack_dough_mixing`)

	event.recipes.tfc.advanced_shapeless_crafting(TFC.isp.of(`4x firmalife:food/hardtack_dough`).copyFood(), [
		'firmalife:spoon',
		TFC.ingredient.and(`#c:foods/flour`, TFC.ingredient.notRotten()),
		TFC.ingredient.and(`#c:foods/flour`, TFC.ingredient.notRotten()),
		'tfc:powder/salt',
		'tfc:powder/salt',
		TFC.ingredient.fluidContents('minecraft:water', 200),
		'#c:bowls'
	], '#c:foods/flour').keepIngredient('#c:bowls').id(`tfg:shapeless/hardtack_dough_2`)

	event.recipes.tfc.advanced_shapeless_crafting(TFC.isp.of(`8x firmalife:food/hardtack_dough`).copyFood(), [
		'firmalife:spoon',
		TFC.ingredient.and(`#c:foods/flour`, TFC.ingredient.notRotten()),
		TFC.ingredient.and(`#c:foods/flour`, TFC.ingredient.notRotten()),
		'tfc:powder/salt',
		'tfc:powder/salt',
		TFC.ingredient.fluidContents('minecraft:water', 200),
		'firmalife:mixing_bowl'
	], '#c:foods/flour').id(`tfg:shapeless/hardtack_dough_2_mixing`)

	event.recipes.tfc.advanced_shapeless_crafting(TFC.isp.of(`6x firmalife:food/hardtack_dough`).copyFood(), [
		'firmalife:spoon',
		TFC.ingredient.and(`#c:foods/flour`, TFC.ingredient.notRotten()),
		TFC.ingredient.and(`#c:foods/flour`, TFC.ingredient.notRotten()),
		TFC.ingredient.and(`#c:foods/flour`, TFC.ingredient.notRotten()),
		'tfc:powder/salt',
		'tfc:powder/salt',
		'tfc:powder/salt',
		TFC.ingredient.fluidContents('minecraft:water', 300),
		'#c:bowls'
	], '#c:foods/flour').keepIngredient('#c:bowls').id(`tfg:shapeless/hardtack_dough_3`)

	event.recipes.tfc.advanced_shapeless_crafting(TFC.isp.of(`12x firmalife:food/hardtack_dough`).copyFood(), [
		'firmalife:spoon',
		TFC.ingredient.and(`#c:foods/flour`, TFC.ingredient.notRotten()),
		TFC.ingredient.and(`#c:foods/flour`, TFC.ingredient.notRotten()),
		TFC.ingredient.and(`#c:foods/flour`, TFC.ingredient.notRotten()),
		'tfc:powder/salt',
		'tfc:powder/salt',
		'tfc:powder/salt',
		TFC.ingredient.fluidContents('minecraft:water', 300),
		'firmalife:mixing_bowl'
	], '#c:foods/flour').id(`tfg:shapeless/hardtack_dough_3_mixing`)

	// [PORT-FIX] kubejs_tfc 2.0.1 не поддерживает схемы firmalife — mixing_bowl/oven переписаны на event.custom
	event.custom({
		"type": "firmalife:mixing_bowl",
		"item_ingredients": [
			{ "type": "tfc:and", "children": [{ "item": "firmalife:food/vanilla_ice_cream" }, { "type": "tfc:not_rotten" }] },
			{ "type": "tfc:and", "children": [{ "item": "firmalife:food/chocolate_chip_cookie_dough" }, { "type": "tfc:not_rotten" }] }
		],
		"result_item": { "count": 2, "id": "firmalife:food/cookie_dough_ice_cream" }
	}).id('firmalife:mixing_bowl/cookie_dough_ice_cream')

	event.custom({
		"type": "firmalife:mixing_bowl",
		"item_ingredients": [
			{ "type": "tfc:and", "children": [{ "tag": "c:eggs" }, { "type": "tfc:not_rotten" }] }, // [PORT] forge:eggs -> c:eggs
			{ "item": "minecraft:sugar" }, // [PORT-FIX] тег tfg:sugars не портирован (пустой) -> minecraft:sugar
			{ "item": "minecraft:sugar" }, // [PORT-FIX] тег tfg:sugars не портирован (пустой) -> minecraft:sugar
			{ "type": "tfc:and", "children": [{ "tag": "tfc:foods/flour" }, { "type": "tfc:not_rotten" }] },
			{ "type": "tfc:and", "children": [{ "tag": "tfc:foods/flour" }, { "type": "tfc:not_rotten" }] }
		],
		"fluid_ingredients": { "amount": 1000, "tag": "tfc:milks" },
		"result_item": { "id": "createaddition:cake_base" }
	}).id('tfg:mixing_bowl/cake_base')

	event.custom({
		"type": "firmalife:oven",
		"ingredient": { "item": "createaddition:cake_base" },
		"temperature": 400.0,
		"duration": 60 * 20,
		"result": { "id": "createaddition:cake_base_baked" }
	}).id('tfg:oven/cake_base_baked')

	// [PORT] tfcchannelcasting отсутствует в сборке 1.21.1 — жидкости white/milk/dark chocolate
	// [PORT] заменены на родную firmalife:chocolate (dark-вариант закомментирован как дубликат milk-варианта)
	event.custom({
		"type": "firmalife:mixing_bowl",
		"item_ingredients": [
			{ "type": "tfc:and", "children": [{ "item": "createaddition:cake_base_baked" }, { "type": "tfc:not_rotten" }] },
			{ "type": "tfc:and", "children": [{ "item": "tfc:food/strawberry" }, { "type": "tfc:not_rotten" }] },
			{ "type": "tfc:and", "children": [{ "item": "tfc:food/strawberry" }, { "type": "tfc:not_rotten" }] },
			{ "type": "tfc:and", "children": [{ "item": "tfc:food/strawberry" }, { "type": "tfc:not_rotten" }] },
			{ "item": "firmalife:spice/vanilla" }
		],
		"fluid_ingredients": { "amount": 400, "fluid": "firmalife:chocolate" }, // [PORT] tfcchannelcasting:white_chocolate -> firmalife:chocolate
		"result_item": { "id": "tfc:cake" }
	}).id('tfg:mixing_bowl/cake')

	event.custom({
		"type": "firmalife:mixing_bowl",
		"item_ingredients": [
			{ "type": "tfc:and", "children": [{ "item": "createaddition:cake_base_baked" }, { "type": "tfc:not_rotten" }] },
			{ "type": "tfc:and", "children": [{ "item": "tfc:food/cherry" }, { "type": "tfc:not_rotten" }] },
			{ "type": "tfc:and", "children": [{ "item": "tfc:food/cherry" }, { "type": "tfc:not_rotten" }] },
			{ "type": "tfc:and", "children": [{ "item": "tfc:food/cherry" }, { "type": "tfc:not_rotten" }] },
			{ "item": "firmalife:food/cocoa_powder" }
		],
		"fluid_ingredients": { "amount": 400, "fluid": "firmalife:chocolate" }, // [PORT] tfcchannelcasting:milk_chocolate -> firmalife:chocolate
		"result_item": { "id": "createaddition:chocolate_cake" }
	}).id('tfg:mixing_bowl/milk_chocolate_cake')

	// [PORT] tfcchannelcasting отсутствует — рецепт на dark_chocolate стал бы дубликатом предыдущего (firmalife:chocolate)
	// event.recipes.firmalife.mixing_bowl()
	// 	.ingredients([
	// 		TFC.ingredient.and('createaddition:cake_base_baked', TFC.ingredient.notRotten()),
	// 		TFC.ingredient.and('tfc:food/cherry', TFC.ingredient.notRotten()),
	// 		TFC.ingredient.and('tfc:food/cherry', TFC.ingredient.notRotten()),
	// 		TFC.ingredient.and('tfc:food/cherry', TFC.ingredient.notRotten()),
	// 		'firmalife:food/cocoa_powder'],
	// 		Fluid.of('tfcchannelcasting:dark_chocolate', 400))
	// 	.outputItem('createaddition:chocolate_cake')
	// 	.id('tfg:mixing_bowl/dark_chocolate_cake')

	event.custom({
		"type": "firmalife:mixing_bowl",
		"item_ingredients": [
			{ "type": "tfc:and", "children": [{ "item": "createaddition:cake_base_baked" }, { "type": "tfc:not_rotten" }] },
			{ "item": "minecraft:honey_bottle" } /* [PORT-FIX] в Firmalife 3.0 предмета raw_honey нет (мёд стал жидкостью) */,
			{ "item": "minecraft:honey_bottle" } /* [PORT-FIX] в Firmalife 3.0 предмета raw_honey нет (мёд стал жидкостью) */,
			{ "item": "minecraft:honey_bottle" } /* [PORT-FIX] в Firmalife 3.0 предмета raw_honey нет (мёд стал жидкостью) */,
			{ "item": "minecraft:honey_bottle" } /* [PORT-FIX] в Firmalife 3.0 предмета raw_honey нет (мёд стал жидкостью) */
		],
		"fluid_ingredients": { "amount": 1000, "fluid": "afc:maple_syrup" },
		"result_item": { "id": "createaddition:honey_cake" }
	}).id('tfg:mixing_bowl/maple_honey_cake')

	event.custom({
		"type": "firmalife:mixing_bowl",
		"item_ingredients": [
			{ "type": "tfc:and", "children": [{ "item": "createaddition:cake_base_baked" }, { "type": "tfc:not_rotten" }] },
			{ "item": "minecraft:honey_bottle" } /* [PORT-FIX] в Firmalife 3.0 предмета raw_honey нет (мёд стал жидкостью) */,
			{ "item": "minecraft:honey_bottle" } /* [PORT-FIX] в Firmalife 3.0 предмета raw_honey нет (мёд стал жидкостью) */,
			{ "item": "minecraft:honey_bottle" } /* [PORT-FIX] в Firmalife 3.0 предмета raw_honey нет (мёд стал жидкостью) */,
			{ "item": "minecraft:honey_bottle" } /* [PORT-FIX] в Firmalife 3.0 предмета raw_honey нет (мёд стал жидкостью) */
		],
		"fluid_ingredients": { "amount": 1000, "fluid": "afc:birch_syrup" },
		"result_item": { "id": "createaddition:honey_cake" }
	}).id('tfg:mixing_bowl/birch_honey_cake')

	// [PORT] tfcchannelcasting отсутствует — оставляем ванильный рецепт firmalife:mixing_bowl/chocolate_ice_cream
	// event.remove({ id: 'firmalife:mixing_bowl/chocolate_ice_cream' })
	// event.recipes.firmalife.mixing_bowl()
	// 	.ingredients([TFC.ingredient.and('firmalife:food/vanilla_ice_cream', TFC.ingredient.notRotten())],
	// 		Fluid.of('tfcchannelcasting:milk_chocolate', 100))
	// 	.outputItem(TFC.isp.of('firmalife:food/chocolate_ice_cream').copyFood())
	// 	.id('tfg:mixing_bowl/chocolate_ice_cream')

	// Chocolate Melting
	// [PORT] tfcchannelcasting отсутствует в сборке 1.21.1 — весь блок переплавки шоколада в жидкости
	// [PORT] tfcchannelcasting:* не переносится, остаётся ванильная цепочка шоколада Firmalife
	// const setChocolateHeating = (variant) => {
	// 	const itemID = `firmalife:food/${variant}_chocolate`
	// 	const fluidID = `tfcchannelcasting:${variant}_chocolate`
	// 	const recipeID = `firmalife:heating/${variant}_chocolate`
	// 	const castingRecipeID = `tfcchannelcasting:casting/${variant}_chocolate`
	//
	// 	event.remove({ id: recipeID })
	// 	event.remove({ id: castingRecipeID })
	// 	event.remove({ id: `${castingRecipeID}_fire_ingot` })
	// 	event.remove({ id: `tfcchannelcasting:heating/food/${variant}_chocolate` })
	//
	// 	event.recipes.tfc.heating(itemID, 200)
	// 		.resultFluid(Fluid.of(fluidID, 144))
	// 		.id(recipeID)
	//
	// 	event.recipes.tfc.casting(`${itemID}`, 'tfc:ceramic/ingot_mold', TFC.fluidStackIngredient(`${fluidID}`, 144), 0)
	// 	event.recipes.tfc.casting(`${itemID}`, 'tfc:ceramic/fire_ingot_mold', TFC.fluidStackIngredient(`${fluidID}`, 144), 0)
	// }
	//
	// setChocolateHeating('white')
	// setChocolateHeating('milk')
	// setChocolateHeating('dark')

	//fixing the bread unrotting
	event.remove({ id: 'firmalife:crafting/food/oat_slice' })
	event.remove({ id: 'firmalife:crafting/food/wheat_slice' })
	event.remove({ id: 'firmalife:crafting/food/barley_slice' })
	event.remove({ id: 'firmalife:crafting/food/maize_slice' })
	event.remove({ id: 'firmalife:crafting/food/rice_slice' })
	event.remove({ id: 'firmalife:crafting/food/rye_slice' })

	event.recipes.tfc.advanced_shapeless_crafting(
		TFC.isp.of('2x firmalife:food/oat_slice').copyFood(),
		[TFC.ingredient.and('tfc:food/oat_bread', TFC.ingredient.notRotten()), '#c:tools/knife'], 'tfc:food/oat_bread') // [PORT] forge:tools/knives -> c:tools/knife
		.id(`tfg:crafting/oat_slice`)
	event.recipes.tfc.advanced_shapeless_crafting(
		TFC.isp.of('2x firmalife:food/wheat_slice').copyFood(),
		[TFC.ingredient.and('tfc:food/wheat_bread', TFC.ingredient.notRotten()), '#c:tools/knife'], 'tfc:food/wheat_bread') // [PORT] forge:tools/knives -> c:tools/knife
		.id(`tfg:crafting/wheat_slice`)
	event.recipes.tfc.advanced_shapeless_crafting(
		TFC.isp.of('2x firmalife:food/barley_slice').copyFood(),
		[TFC.ingredient.and('tfc:food/barley_bread', TFC.ingredient.notRotten()), '#c:tools/knife'], 'tfc:food/barley_bread') // [PORT] forge:tools/knives -> c:tools/knife
		.id(`tfg:crafting/barley_slice`)
	event.recipes.tfc.advanced_shapeless_crafting(
		TFC.isp.of('2x firmalife:food/maize_slice').copyFood(),
		[TFC.ingredient.and('tfc:food/maize_bread', TFC.ingredient.notRotten()), '#c:tools/knife'], 'tfc:food/maize_bread') // [PORT] forge:tools/knives -> c:tools/knife
		.id(`tfg:crafting/maize_slice`)
	event.recipes.tfc.advanced_shapeless_crafting(
		TFC.isp.of('2x firmalife:food/rice_slice').copyFood(),
		[TFC.ingredient.and('tfc:food/rice_bread', TFC.ingredient.notRotten()), '#c:tools/knife'], 'tfc:food/rice_bread') // [PORT] forge:tools/knives -> c:tools/knife
		.id(`tfg:crafting/rice_slice`)
	event.recipes.tfc.advanced_shapeless_crafting(
		TFC.isp.of('2x firmalife:food/rye_slice').copyFood(),
		[TFC.ingredient.and('tfc:food/rye_bread', TFC.ingredient.notRotten()), '#c:tools/knife'], 'tfc:food/rye_bread') // [PORT] forge:tools/knives -> c:tools/knife
		.id(`tfg:crafting/rye_slice`)

	//fixing the cheese curd unrotting
	event.remove({ id: 'firmalife:crafting/cheddar_wheel' })
	event.remove({ id: 'firmalife:crafting/chevre_wheel' })
	event.remove({ id: 'firmalife:crafting/rajya_metok_wheel' })
	event.remove({ id: 'firmalife:barrel_sealed/gouda_wheel' })
	event.remove({ id: 'firmalife:barrel_sealed/feta_wheel' })
	event.remove({ id: 'firmalife:barrel_sealed/shosha_wheel' })

	event.recipes.tfc.advanced_shaped_crafting(
		TFC.isp.of('firmalife:cheddar_wheel').copyFood(), [
		'AAA',
		'BBB',
		'AAA'
	], {
		A: 'tfc:powder/salt',
		B: TFC.ingredient.and('firmalife:food/milk_curd', TFC.ingredient.notRotten())
	}).id('tfg:crafting/cheddar_wheel')
	event.recipes.tfc.advanced_shaped_crafting(
		TFC.isp.of('firmalife:chevre_wheel').copyFood(), [
		'AAA',
		'BBB',
		'AAA'
	], {
		A: 'tfc:powder/salt',
		B: TFC.ingredient.and('firmalife:food/goat_curd', TFC.ingredient.notRotten())
	}).id('tfg:crafting/chevre_wheel')
	event.recipes.tfc.advanced_shaped_crafting(
		TFC.isp.of('firmalife:rajya_metok_wheel').copyFood(), [
		'AAA',
		'BBB',
		'AAA'
	], {
		A: 'tfc:powder/salt',
		B: TFC.ingredient.and('firmalife:food/yak_curd', TFC.ingredient.notRotten())
	}).id('tfg:crafting/rajya_metok_wheel')
	// [PORT-FIX] TFC 4.x: sized ingredient плоский (count внутри), not_rotten без вложенного ingredient (через tfc:and), fluid-ключ "fluid", output-ключ "id"
	event.custom({
		"type": "tfc:barrel_sealed",
		"input_item": {
			"type": "tfc:and",
			"children": [
				{ "item": "firmalife:food/milk_curd" },
				{ "type": "tfc:not_rotten" }
			],
			"count": 3
		},
		"input_fluid": {
			"amount": 750,
			"fluid": "tfc:salt_water"
		},
		"output_item": {
			"id": "firmalife:gouda_wheel"
		},
		"duration": 16000
	}).id('tfg:barrel/gouda_wheel')
	// [PORT-FIX] TFC 4.x: формат ингредиентов как выше
	event.custom({
		"type": "tfc:barrel_sealed",
		"input_item": {
			"type": "tfc:and",
			"children": [
				{ "item": "firmalife:food/goat_curd" },
				{ "type": "tfc:not_rotten" }
			],
			"count": 3
		},
		"input_fluid": {
			"amount": 750,
			"fluid": "tfc:salt_water"
		},
		"output_item": {
			"id": "firmalife:feta_wheel"
		},
		"duration": 16000
	}).id('tfg:barrel/feta_wheel')
	// [PORT-FIX] TFC 4.x: формат ингредиентов как выше
	event.custom({
		"type": "tfc:barrel_sealed",
		"input_item": {
			"type": "tfc:and",
			"children": [
				{ "item": "firmalife:food/yak_curd" },
				{ "type": "tfc:not_rotten" }
			],
			"count": 3
		},
		"input_fluid": {
			"amount": 750,
			"fluid": "tfc:salt_water"
		},
		"output_item": {
			"id": "firmalife:shosha_wheel"
		},
		"duration": 16000
	}).id('tfg:barrel/shosha_wheel')

	// Adds a tooltip to the bacon craft to tell people it needs to be smoked first,
	// and adds traits that normally disappear on the craft

	event.recipes.tfc.advanced_shapeless_crafting(
		TFC.isp.of(Item.of('4x firmalife:food/bacon')
			) // [PORT-FIX] ItemStack.withName удалён в KubeJS 1.21 — кастомное имя опущено (только EMI-подсказка)
			.addTrait("firmalife:smoked")
			.addTrait("tfc:brined")
			.addTrait("tfc:salted"),
		[
			TFC.ingredient.and('tfc:food/pork', TFC.ingredient.hasTrait('firmalife:smoked'), TFC.ingredient.notRotten()), // [PORT-FIX] kubejs_tfc 2.0: notRotten()/hasTrait(trait) без ингредиента — объединение через tfc:and
			'#c:tools/knife', // [PORT] forge:tools/knives -> c:tools/knife
			'tfc:powder/salt'
		], 'tfc:food/pork') // [PORT-FIX] TFC 4.x: primary_ingredient обязателен в конструкторе advanced_shapeless_crafting
		.modifyResult((craftingGrid, result) => {
			// [PORT-CHECK] resetHoverName() удалён в 1.21 (data components) — заменено на remove('minecraft:custom_name'), нужна проверка в игре
			result.remove('minecraft:custom_name');
			return result;
		})
		.id('firmalife:crafting/bacon')

	// Replacement for yeast starter recipe that uses a different, more descriptive tag

	// [PORT-FIX] kubejs_tfc 2.0: конструктор barrel_sealed(input_fluid, duration); hasTrait(trait) без ингредиента — обёртка через tfc:and
	event.recipes.tfc.barrel_sealed(Fluid.of('minecraft:water', 100), 72000)
		.inputItem(TFC.ingredient.and('#tfg:dried_fruit', TFC.ingredient.hasTrait('firmalife:dried')))
		.outputFluid(Fluid.of('firmalife:yeast_starter', 100))
		.id('firmalife:barrel/yeast_starter')
})
