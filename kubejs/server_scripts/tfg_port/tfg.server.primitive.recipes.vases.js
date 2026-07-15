// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/primitive/recipes.vases.js (Ф4).
// Главные изменения 1.20→1.21:
//  - barrel_sealed: конструктор (input_fluid, duration); .inputFluid() в схеме нет
//  - knapping: .outsideSlotRequired() удалён (свойство knapping type в TFC 1.21)
// Блоки ваз зарегистрированы в startup tfg.blocks.vases.js, теги — в tfg.server.primitive.tags.primitive.js.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.primitive.recipes.vases start')

	global.MINECRAFT_DYE_NAMES.forEach(color => {
		event.recipes.gtceu.chemical_bath(`tfg:chemical_bath/dyeing/decorative_vase/unfired/${color}`)
			.itemInputs('#tfg:decorative_vases/unfired')
			.inputFluids(Fluid.of(`tfc:${color}_dye`, 25))
			.itemOutputs(`tfg:decorative_vase/unfired/${color}`)
			.duration(80)
			.EUt(GTValues.VA[GTValues.ULV])
			.category(GTRecipeCategories.CHEM_DYES)

		event.recipes.tfc.heating(`tfg:decorative_vase/unfired/${color}`, 1399)
			.resultItem(`tfg:decorative_vase/${color}`)
			.id(`tfg:heating/decorative_vase/unfired/${color}`)

		// [PORT-FIX] kubejs_tfc 2.0: конструктор barrel_sealed(input_fluid, duration)
		event.recipes.tfc.barrel_sealed(Fluid.of(`tfc:${color}_dye`, 25), 1000)
			.outputItem(`tfg:decorative_vase/unfired/${color}`)
			.inputItem(Ingredient.of('#tfg:decorative_vases/unfired').except(`tfg:decorative_vase/unfired/${color}`)) // [PORT-FIX] KubeJS 7: .subtract() -> .except()
			.id(`tfg:barrel/dyeing/decorative_vase/${color}`)

		event.smelting(
			`1x tfg:decorative_vase/${color}`,
			`tfg:decorative_vase/unfired/${color}`
		).id(`tfg:smelting/decorative_vase/${color}`)
	})

	event.recipes.gtceu.chemical_bath(`tfg:chemical_bath/bleaching/decorative_vase/unfired`)
		.itemInputs('#tfg:decorative_vases/unfired')
		.inputFluids(Fluid.of('gtceu:chlorine', 72))
		.itemOutputs('tfg:decorative_vase/unfired')
		.duration(80)
		.EUt(GTValues.VA[GTValues.ULV])
		.category(GTRecipeCategories.CHEM_DYES)

	event.smelting(
		'1x tfg:decorative_vase',
		'tfg:decorative_vase/unfired'
	).id('tfg:smelting/decorative_vase')

	event.recipes.tfc.heating('tfg:decorative_vase/unfired', 1399)
		.resultItem('tfg:decorative_vase')
		.id('tfg:heating/decorative_vase/unfired')

	event.recipes.tfc.knapping(
		'tfg:decorative_vase/unfired',
		'tfc:clay',
		[
			' X X ',
			'XX XX',
			'X   X',
			'X   X',
			'XXXXX'
		]
	)
		.ingredient('minecraft:clay_ball') // [PORT-FIX] .outsideSlotRequired(false) удалён; ingredient не принимает count ('5x ...')
		.id('tfg:knapping/decorative_vase/unfired')
})
