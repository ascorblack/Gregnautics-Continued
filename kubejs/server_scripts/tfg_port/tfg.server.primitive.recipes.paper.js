// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/primitive/recipes.paper.js (Ф4).
// Главные изменения 1.20→1.21:
//  - материалы gtceu:hardwood / gtceu:thermochemically_treated_hardwood зарегистрированы
//    в startup tfg.materials.primitive.js (.dust()) — их пыли доступны [PORT-CHECK: проверить в игре]
//  - global.TFC_HARDWOOD_TYPES отсутствует — вычисляем из TFC_WOOD_TYPES минус TFC_SOFTWOOD_TYPES
//  - removeMaceratorRecipe (хелпер оригинала) — обычный event.remove
//  - barrel_sealed: конструктор (input_fluid, duration); TFC.fluidStackIngredient удалён
//  - firmalife vat: kubejs_tfc 2.0.1 не поддерживает схемы firmalife — event.custom
//  - greate отсутствует — рецепт вырезан [PORT]

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.primitive.recipes.paper start')

	// [PORT-Ф2] Материал gtceu:hardwood зарегистрирован в startup tfg.materials.primitive.js, но диспетчер
	// GTCEuStartupEvents (05_startup.dispatch.js) отключён до принятия патченного GTM jar — пыли
	// gtceu:(small_/tiny_)(thermochemically_treated_)hardwood_dust не существуют. Рецепты на них
	// добавляются только при наличии предмета, иначе валят весь handler.
	const hasHardwoodDust = Item.exists('gtceu:hardwood_dust')
	if (!hasHardwoodDust) console.warn('[Gregnautics] [PORT-Ф2] gtceu:hardwood_dust не зарегистрирован — hardwood-рецепты бумаги пропущены')

	event.recipes.gtceu.cutter('tfg:unrefined_paper')
		.itemInputs('tfc:unrefined_paper')
		.itemOutputs('minecraft:paper')
		.duration(100)
		.EUt(7)

	event.recipes.gtceu.chemical_bath('paper_from_papyrus_distilled')
		.itemInputs('tfc:papyrus')
		.inputFluids(Fluid.of('gtceu:distilled_water', 100))
		.itemOutputs('4x tfc:soaked_papyrus_strip')
		.duration(100)
		.EUt(7)

	event.recipes.gtceu.chemical_bath('paper_from_papyrus')
		.itemInputs('tfc:papyrus')
		.inputFluids("#tfg:clean_water 100")
		.itemOutputs('4x tfc:soaked_papyrus_strip')
		.duration(100)
		.EUt(7)

	event.recipes.gtceu.assembler('papyrus_strips')
		.itemInputs('4x tfc:soaked_papyrus_strip')
		.itemOutputs('minecraft:paper')
		.circuit(1)
		.duration(100)
		.EUt(7)

	function generatePotRecipe(id, maxAmountOfInputItems, inputItem, inputFluid, inputFluidAmount, outputItem, ticks, temperature) {
		for (let i = 0; i < maxAmountOfInputItems; i++) {
			let iPlusOne = i + 1
			let inputsArray = new Array(iPlusOne)
			for (let j = 0; j < iPlusOne; j++) {
				inputsArray[j] = inputItem
			}

			event.recipes.tfc.pot(inputsArray, Fluid.of(inputFluid, inputFluidAmount * iPlusOne), ticks, temperature)
				.itemOutput(`${iPlusOne}x ${outputItem}`)
				.id(`tfg:pot/${iPlusOne}x_${id}`)
		}
	}

	//remove chemical bath recipe
	event.remove({ id: 'gtceu:chemical_bath/paper_from_wood_dust' })
	event.remove({ id: 'gtceu:chemical_bath/paper_from_wood_dust_distilled' })

	//Lathe - Replace regular logs tag with softwood tag
	event.remove({ id: 'gtceu:lathe/lathe_logs' })
	event.remove({ id: 'gtceu:lathe/lathe_stripped_bamboo_log' })

	event.remove({ id: 'gtceu:macerator/macerate_logs' }) // [PORT-FIX] removeMaceratorRecipe -> event.remove

	// Create macerator recipes for softwood
	event.recipes.gtceu.macerator('macerate_softwood')
		.itemInputs('#tfg:softwood')
		.itemOutputs('4x gtceu:wood_dust')
		.chancedOutput('gtceu:wood_dust', 8000)
		.duration(70)
		.EUt(2)

	if (hasHardwoodDust) { // [PORT-Ф2] hardwood-пыль отсутствует
	event.recipes.gtceu.macerator('macerate_hardwood')
		.itemInputs('#tfg:hardwood')
		.itemOutputs('4x gtceu:hardwood_dust')
		.chancedOutput('gtceu:hardwood_dust', 8000)
		.duration(70)
		.EUt(2)

	// [PORT-FIX] global.TFC_HARDWOOD_TYPES теперь определён в tfc.constants.js — локальный const
	// [PORT-FIX] конфликтовал с глобальной var (Rhino: redeclaration of var). Используем глобальный список.

	// Заменяем любой рецепт с выходом wood dust на hardwood dust, если ID содержит имя одного из типов твёрдой древесины.
	// [PORT-FIX] KubeJS 7: per-recipe r.replaceOutput(string,string) отсутствует -> event.replaceOutput.
	// [PORT-FIX] Фильтр по ТИПУ gtceu:macerator (item-only, безопасно) + id-regex: {output:...} без типа
	// [PORT-FIX] сканирует все рецепты и падает на чтении GT-жидкостных выходов (amount=10000).
	var hardwoodIdRe = new RegExp('(' + global.TFC_HARDWOOD_TYPES.join('|') + ')') // [PORT-FIX] var (не const): Rhino ругается «redeclaration of var» на const/let внутри блока if
	event.replaceOutput({ type: 'gtceu:macerator', id: hardwoodIdRe }, 'gtceu:small_wood_dust', 'gtceu:small_hardwood_dust')
	event.replaceOutput({ type: 'gtceu:macerator', id: hardwoodIdRe }, 'gtceu:tiny_wood_dust', 'gtceu:tiny_hardwood_dust')
	event.replaceOutput({ type: 'gtceu:macerator', id: hardwoodIdRe }, 'gtceu:wood_dust', 'gtceu:hardwood_dust')
	} // [PORT-Ф2]


	//Replace any input that uses softwood dust to use our custom tag (we cant add it to the forge tag because it will literally fuck everything up by making softwood pulp obtainable using hardwood pulp)
	// [PORT-GTM-REPLACE] blanket replaceInput бьёт GT-рецепты (UOE immutable b71dec5) — включить с патченным GTM
	// event.replaceInput([
	// 	{ not: { output: 'gtceu:small_wood_dust' } },
	// 	{ not: { output: 'gtceu:tiny_wood_dust' } }
	// ], 'gtceu:wood_dust', '#tfg:wood_dusts')

	//Craft hardwood strips
	// [PORT-FIX] damage_inputs_shapeless_crafting удалён в kubejs_tfc 2.0 — обычный shapeless
	event.shapeless('4x tfg:hardwood_strip', ['#minecraft:axes', '#tfg:stripped_hardwood'])
		.id('tfg:crafting/strip_hardwood')
	global.generateCutterRecipe(event, `#tfg:stripped_hardwood`, `8x tfg:hardwood_strip`, 50, 6, 'cutter/strip_hardwood')

	//Soak hardwood strips
	// [PORT-FIX] kubejs_tfc 2.0: конструктор barrel_sealed(input_fluid, duration); .inputs() нет
	event.recipes.tfc.barrel_sealed('#tfc:water 100', 12000)
		.inputItem('tfg:hardwood_strip')
		.outputItem('tfg:soaked_hardwood_strip')
		.id('tfg:barrel/soak_hardwood_strip')
	event.recipes.gtceu.chemical_bath('tfg:chemical_bath/soak_hardwood_strips')
		.inputFluids("#tfg:clean_water 100")
		.itemInputs('tfg:hardwood_strip')
		.itemOutputs('tfg:soaked_hardwood_strip')
		.duration(200)
		.EUt(GTValues.VA[GTValues.ULV])

	if (hasHardwoodDust) { // [PORT-Ф2] 
	//Create Hardwood Dust using Quern and Millstone/Crushing Wheels
	event.recipes.gtceu.macerator('tfg:macerator/macerate_hardwood_strips')
		.itemInputs('tfg:soaked_hardwood_strip')
		.itemOutputs('3x gtceu:small_hardwood_dust')
		.chancedOutput('gtceu:small_hardwood_dust', 5000)
		.duration(100)
		.EUt(2)
	event.recipes.tfc.quern('2x gtceu:small_hardwood_dust', 'tfg:soaked_hardwood_strip')
		.id('tfg:quern/soaked_hardwood_strip')
	} // [PORT-Ф2]


	if (hasHardwoodDust) { // [PORT-Ф2] 
	//Cook hardwood dust in lye
	// [PORT-FIX] kubejs_tfc 2.0.1 не поддерживает схемы firmalife — vat через event.custom
	// (length/temperature — как у vat-рецептов Firmalife 3.0 по умолчанию: 600/300)
	event.custom({
		"type": "firmalife:vat",
		"input_item": { "item": "gtceu:hardwood_dust" },
		"input_fluid": { "amount": 300, "fluid": "tfc:lye" },
		"output_item": { "id": "gtceu:thermochemically_treated_hardwood_dust" },
		"length": 600,
		"temperature": 300.0
	}).id('tfg:vat/thermochemically_treat_hardwood_dust')

	event.custom({
		"type": "firmalife:vat",
		"input_item": { "item": "gtceu:small_hardwood_dust" },
		"input_fluid": { "amount": 75, "fluid": "tfc:lye" },
		"output_item": { "id": "gtceu:small_thermochemically_treated_hardwood_dust" },
		"length": 600,
		"temperature": 300.0
	}).id('tfg:vat/thermochemically_treat_small_hardwood_dust')

	event.custom({
		"type": "firmalife:vat",
		"input_item": { "item": "gtceu:tiny_hardwood_dust" },
		"input_fluid": { "amount": 33, "fluid": "tfc:lye" },
		"output_item": { "id": "gtceu:tiny_thermochemically_treated_hardwood_dust" },
		"length": 600,
		"temperature": 300.0
	}).id('tfg:vat/thermochemically_treat_tiny_hardwood_dust')

	generatePotRecipe('thermochemically_treat_hardwood_dust', 3, 'gtceu:hardwood_dust', 'tfc:lye', 300, 'gtceu:thermochemically_treated_hardwood_dust', 600, 300)
	generatePotRecipe('thermochemically_treat_small_hardwood_dust', 5, 'gtceu:small_hardwood_dust', 'tfc:lye', 75, 'gtceu:small_thermochemically_treated_hardwood_dust', 600, 300)
	generatePotRecipe('thermochemically_treat_tiny_hardwood_dust', 5, 'gtceu:tiny_hardwood_dust', 'tfc:lye', 33, 'gtceu:tiny_thermochemically_treated_hardwood_dust', 600, 300)
	global.generateMixerRecipe(event, 'gtceu:hardwood_dust', Fluid.of('tfc:lye', 150), 'gtceu:thermochemically_treated_hardwood_dust', null, [], 150, 4, 64, 'tfg:mixer/mix_hardwood_dust_with_lye')
	global.generateMixerRecipe(event, 'gtceu:small_hardwood_dust', Fluid.of('tfc:lye', 37), 'gtceu:small_thermochemically_treated_hardwood_dust', null, [], 100, 3, 64, 'tfg:mixer/mix_small_hardwood_dust_with_lye')
	global.generateMixerRecipe(event, 'gtceu:tiny_hardwood_dust', Fluid.of('tfc:lye', 16), 'gtceu:tiny_thermochemically_treated_hardwood_dust', null, [], 50, 2, 64, 'tfg:mixer/mix_tiny_hardwood_dust_with_lye')
	} // [PORT-Ф2]


	if (hasHardwoodDust) { // [PORT-Ф2] 
	//Beat thermochemically treated hardwood dust into soaked unrefined paper
	event.recipes.tfc.anvil('tfg:soaked_unrefined_paper', 'gtceu:thermochemically_treated_hardwood_dust', ['hit_last', 'hit_second_last', 'hit_third_last'])
		.id('tfg:anvil/soaked_unrefined_paper')

	// [PORT] greate отсутствует в 1.21.1 — прессование заменяется обычным Create-прессом
	// event.recipes.greate.pressing(Item.of('tfg:soaked_unrefined_paper'), 'gtceu:thermochemically_treated_hardwood_dust')
	// 	.recipeTier(0)
	// 	.id('greate:pressing/soaked_unrefined_paper')
	event.recipes.create.pressing('tfg:soaked_unrefined_paper', 'gtceu:thermochemically_treated_hardwood_dust') // [PORT-FIX] greate -> create
		.id('tfg:pressing/soaked_unrefined_paper')

	// [PORT-FIX] kubejs_tfc 2.0.1 не поддерживает схемы firmalife — stomping через event.custom
	event.custom({
		"type": "firmalife:stomping",
		"ingredient": { "item": "gtceu:thermochemically_treated_hardwood_dust" },
		"input_texture": "tfg:block/thermochemically_treated_hardwood_dust",
		"output_texture": "tfg:block/soaked_unrefined_paper",
		"sound": "minecraft:entity.slime.squish",
		"result": { "id": "tfg:soaked_unrefined_paper" }
	}).id('tfg:stomping/soaked_unrefined_paper')
	} // [PORT-Ф2]


	//Dry the soaked unrefined paper
	// [PORT-FIX] kubejs_tfc 2.0.1 не поддерживает схемы firmalife — drying через event.custom
	event.custom({
		"type": "firmalife:drying",
		"ingredient": { "item": "tfg:soaked_unrefined_paper" },
		"result": { "id": "tfc:unrefined_paper" }
	}).id('tfg:drying/unrefined_paper')

	if (hasHardwoodDust) { // [PORT-Ф2] 
	//alternatively, just put the thermochemically treated hardwood dust inside a forge hamemr
	event.recipes.gtceu.forge_hammer('tfg:forge_hammer/paper_from_thermochemically_treated_hardwood_dust')
		.itemInputs('gtceu:thermochemically_treated_hardwood_dust')
		.itemOutputs('minecraft:paper')
		.duration(20)
		.EUt(4)
	event.recipes.gtceu.forge_hammer('tfg:forge_hammer/paper_from_small_thermochemically_treated_hardwood_dust')
		.itemInputs('4x gtceu:small_thermochemically_treated_hardwood_dust')
		.itemOutputs('minecraft:paper')
		.duration(30)
		.EUt(4)
	event.recipes.gtceu.forge_hammer('tfg:forge_hammer/paper_from_tiny_thermochemically_treated_hardwood_dust')
		.itemInputs('9x gtceu:tiny_thermochemically_treated_hardwood_dust')
		.itemOutputs('minecraft:paper')
		.duration(40)
		.EUt(4)
	} // [PORT-Ф2]

})
