// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/primitive/recipes.wood.js (Ф4).
// Главные изменения 1.20→1.21:
//  - forge:→c: (shears→tools/shear, tools/knives→tools/knife, creosote, fences, fence_gates, rods)
//  - greate.splashing → create.splashing (шансовые выходы — plain-объекты {id, chance})
//  - barrel_sealed: конструктор (input_fluid, duration); TFC.fluidStackIngredient удалён
//  - gtceu:long_treated_wood_rod и gtceu:small_wood_gear в GTM8 не генерируются [PORT-Ф2]

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.primitive.recipes.wood start')

	event.replaceInput({ output: '#tfc:sewing_tables'}, '#c:tools/shear', '#c:tools/knife') // [PORT] forge:shears/knives -> c:tools/shear|knife
	event.replaceInput({ id: 'gtceu:shaped/powderbarrel' }, 'gtceu:wood_plate', '#tfc:lumber')

	// Wood ash
	event.smelting('4x tfc:powder/wood_ash', '#minecraft:logs_that_burn').id('tfg:wood_ash') // [PORT-FIX] ingredient не принимает count ('1x #...')

	event.recipes.gtceu.chemical_reactor('tfg:wood_ash_to_wood_gas_air')
		.itemInputs('8x tfc:powder/wood_ash')
		.inputFluids(Fluid.of('gtceu:air', 100))
		.outputFluids('gtceu:wood_gas 100')
		.duration(20 * 5)
		.EUt(GTValues.VA[GTValues.LV])

	// [PORT-FIX] greate отсутствует — обычный create.splashing (без recipeTier и fluid-входа);
	// шансовые выходы — plain-объекты {id, chance}
	event.recipes.create.splashing(
		[{ id: 'tfc:powder/wood_ash', chance: 0.25 }, { id: 'minecraft:stick', chance: 0.25 }],
		'tfc:torch'
	).id('tfg:splashing/wash_torch')

	// Just a dummy recipe to tell people they can get wood ash by throwing torches in water via TFC
	event.custom({
		type: "ae2:transform",
		circumstance: {
			type: "fluid",
			tag: "tfc:water"
		},
		ingredients: [{ item: 'tfc:torch' }],
		result: { id: 'tfc:powder/wood_ash' } // [PORT-FIX] ItemStack-кодек 1.21: id вместо item
	}).id(`tfg:ae_transform/torch_to_wood_ash`)

	event.replaceInput({ id: 'tfc:crafting/vanilla/armor_stand' }, '#minecraft:planks', '#tfc:lumber')
	event.remove({ id: 'tfc:crafting/vanilla/armor_stand_bulk' })

	// Treated Wood
	event.remove({ id: 'gtceu:shaped/treated_wood_planks' })

	// [PORT] forge:-теги -> c:; input tfg:wood_dusts исправлен на тег (#) [PORT-FIX]
	// [PORT-Ф2] gtceu:long_treated_wood_rod не генерируется в GTM8 — строка закомментирована
	const TREATED_WOOD_ITEMS = [
		{ output: 'gtceu:treated_wood_plate', input: '#tfc:lumber', multiplier: 1 },
		{ output: 'gtceu:treated_wood_dust', input: '#tfg:wood_dusts', multiplier: 1 },
		{ output: 'gtceu:treated_wood_rod', input: '#c:rods/wooden', multiplier: 2 },
		// { output: 'gtceu:long_treated_wood_rod', input: '#c:rods/long/wood', multiplier: 4 }, // [PORT-Ф2]
		{ output: 'gtceu:treated_wood_planks', input: '#minecraft:planks', multiplier: 4 },
		{ output: 'gtceu:treated_wood_slab', input: '#minecraft:wooden_slabs', multiplier: 2 },
		{ output: 'gtceu:treated_wood_fence', input: '#c:fences/wooden', multiplier: 2.25 },
		{ output: 'gtceu:treated_wood_pressure_plate', input: '#minecraft:wooden_pressure_plates', multiplier: 4 },
		{ output: 'gtceu:treated_wood_trapdoor', input: '#minecraft:wooden_trapdoors', multiplier: 2 },
		{ output: 'gtceu:treated_wood_stairs', input: '#minecraft:wooden_stairs', multiplier: 3 },
		{ output: 'gtceu:treated_wood_fence_gate', input: '#c:fence_gates/wooden', multiplier: 6 },
		{ output: 'gtceu:treated_wood_door', input: '#minecraft:wooden_doors', multiplier: 3 },
	]

	TREATED_WOOD_ITEMS.forEach(item => {
		// [PORT-FIX] kubejs_tfc 2.0: конструктор barrel_sealed(input_fluid, duration)
		event.recipes.tfc.barrel_sealed(`#c:creosote ${Math.round(25 * item.multiplier)}`, Math.round(1000 * item.multiplier))
			.outputItem(`${item.output}`)
			.inputItem(`${item.input}`)
			.id(`tfg:barrel/${global.linuxUnfucker(item.output)}`)
	})

	// Empty Wooden Form
	event.shaped('gtceu:empty_wooden_form', [
		' AA',
		'BAA'
	], {
		A: '#minecraft:planks',
		B: '#c:tools/saw' // [PORT] forge:tools/saws -> c:tools/saw
	}).id('gtceu:shaped/plank_to_wooden_shape')

	// Wood gears
	// [PORT-Ф2] gtceu:small_wood_gear не генерируется в GTM8 (у Wood нет small gear) — блок закомментирован
	// event.shaped('gtceu:small_wood_gear', [
	// 	'AB ',
	// 	'BCB',
	// 	' B '
	// ], {
	// 	A: '#c:tools/saw',
	// 	B: '#tfc:lumber',
	// 	C: 'tfc:glue'
	// }).id('gtceu:shaped/small_gear_wood')

	event.shaped('gtceu:wood_gear', [
		'AB ',
		'BCB',
		' B '
	], {
		A: '#c:tools/saw',
		B: '#minecraft:planks',
		C: 'tfc:glue'
	}).id('gtceu:shaped/gear_wood')

	// [PORT-Ф2] gtceu:small_wood_gear отсутствует
	// event.recipes.gtceu.assembler("tfg:small_wood_gear")
	// 	.itemInputs('4x #tfc:lumber')
	// 	.inputFluids(Fluid.of('gtceu:glue', 50))
	// 	.itemOutputs('gtceu:small_wood_gear')
	// 	.duration(20)
	// 	.circuit(6)
	// 	.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.assembler("tfg:wood_gear")
		.itemInputs('4x #minecraft:planks')
		.inputFluids(Fluid.of('gtceu:glue', 50))
		.itemOutputs('gtceu:wood_gear')
		.duration(20)
		.circuit(6)
		.EUt(GTValues.VA[GTValues.LV])
})
