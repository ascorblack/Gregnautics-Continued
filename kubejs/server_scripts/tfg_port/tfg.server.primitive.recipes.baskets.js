// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/primitive/recipes.baskets.js (Ф4).
// [PORT-FIX] TagPrefix.rodLong для TreatedWood в GTM8 не генерируется (нет gtceu:long_treated_wood_rod) —
// заменено на обычный gtceu:treated_wood_rod.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.primitive.recipes.baskets start')

	event.shaped('tfg:harvest_basket', [
		'BDB',
		'ACA',
		'AAA'
	], {
		A: 'tfg:soaked_hardwood_strip',
		B: ChemicalHelper.get(TagPrefix.bolt, GTMaterials.SterlingSilver, 1),
		C: 'tfc:glue',
		D: 'gtceu:treated_wood_rod' // [PORT-FIX] rodLong TreatedWood отсутствует в GTM8
	}).id('tfg:shaped/harvest_basket_from_wood')

	event.recipes.gtceu.assembler('tfg:assembler/harvest_basket_from_wood')
		.itemInputs(
			'5x tfg:soaked_hardwood_strip',
			ChemicalHelper.get(TagPrefix.bolt, GTMaterials.SterlingSilver, 2),
			'1x gtceu:treated_wood_rod' // [PORT-FIX] rodLong TreatedWood отсутствует в GTM8
		)
		.inputFluids(Fluid.of('gtceu:glue', 50))
		.itemOutputs('tfg:harvest_basket')
		.duration(100)
		.EUt(GTValues.VA[GTValues.ULV])

	event.shaped('tfg:harvest_basket', [
		'BDB',
		'ACA',
		'AAA'
	], {
		A: 'tfc:soaked_papyrus_strip',
		B: ChemicalHelper.get(TagPrefix.bolt, GTMaterials.SterlingSilver, 1),
		C: 'tfc:glue',
		D: 'gtceu:treated_wood_rod' // [PORT-FIX]
	}).id('tfg:shaped/harvest_basket_from_papyrus')

	event.recipes.gtceu.assembler('tfg:assembler/harvest_basket_from_papyrus')
		.itemInputs(
			'5x tfc:soaked_papyrus_strip',
			ChemicalHelper.get(TagPrefix.bolt, GTMaterials.SterlingSilver, 2),
			'1x gtceu:treated_wood_rod' // [PORT-FIX]
		)
		.inputFluids(Fluid.of('gtceu:glue', 50))
		.itemOutputs('tfg:harvest_basket')
		.circuit(2)
		.duration(100)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.assembler('tfg:assembler/aluminium_harvest_basket')
		.itemInputs(
			ChemicalHelper.get(TagPrefix.plate, GTMaterials.Aluminium, 3),
			ChemicalHelper.get(TagPrefix.foil, GTMaterials.Aluminium, 2),
			ChemicalHelper.get(TagPrefix.bolt, GTMaterials.Steel, 2),
			ChemicalHelper.get(TagPrefix.rodLong,
				GTMaterials.Aluminium, 1)
		)
		.inputFluids(Fluid.of('gtceu:cobalt_brass', 144))
		.itemOutputs('tfg:aluminium_harvest_basket')
		.duration(200)
		.circuit(4)
		.EUt(GTValues.VA[GTValues.LV])
		.addMaterialInfo(true)
})
