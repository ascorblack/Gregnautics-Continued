// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/primitive/recipes.supports.js (Ф4).
// Главные изменения 1.20→1.21:
//  - forge:→c: (tfc:chisels→c:tools/chisel, forge:tools/wire_cutters→c:tools/wire_cutter,
//    forge:double_ingots→c:double_ingots)
//  - damage_inputs_shaped_crafting удалён в kubejs_tfc 2.0 — обычный shaped
//  - barrel_sealed: конструктор (input_fluid, duration)
//  - TFGHelpers.registerMaterialInfo — Java-хелпер мода TFG, отсутствует [PORT-Ф4]

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.primitive.recipes.supports start')

	// Concrete Supports
	event.recipes.gtceu.fluid_solidifier('tfg:gtceu/fluid_solidifier/reinforced_light_concrete_support')
		.inputFluids(Fluid.of('gtceu:concrete', 144 / 2))
		.itemOutputs('1x tfg:reinforced_light_concrete_support')
		.itemInputs('1x tfg:rebar_support')
		.duration(60)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.assembler('tfg:gtceu/assembler/reinforced_light_concrete_support')
		.inputFluids(Fluid.of('gtceu:concrete', 144 / 2))
		.itemOutputs('1x tfg:reinforced_light_concrete_support')
		.itemInputs('1x tfg:rebar_support')
		.duration(120)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.macerator(`reinforced_light_concrete_support_to_dust`)
		.itemInputs('tfg:reinforced_light_concrete_support')
		.itemOutputs('2x gtceu:small_concrete_dust', 'gtceu:tiny_steel_dust')
		.duration(150)
		.EUt(2)
		.category(GTRecipeCategories.MACERATOR_RECYCLING);

	event.recipes.gtceu.chemical_bath('tfg:gtceu/chemical_bath/reinforced_dark_concrete_support')
		.inputFluids(Fluid.of('tfc:black_dye', 10))
		.itemOutputs('1x tfg:reinforced_dark_concrete_support')
		.itemInputs('1x tfg:reinforced_light_concrete_support')
		.duration(60)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.chemical_bath('tfg:gtceu/chemical_bath/dark_concrete_support')
		.inputFluids(Fluid.of('tfc:black_dye', 10))
		.itemOutputs('1x tfg:dark_concrete_support')
		.itemInputs('1x tfg:light_concrete_support')
		.duration(60)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.macerator(`reinforced_dark_concrete_support_to_dust`)
		.itemInputs('tfg:reinforced_dark_concrete_support')
		.itemOutputs('2x gtceu:small_concrete_dust', 'gtceu:tiny_steel_dust')
		.duration(150)
		.EUt(2)
		.category(GTRecipeCategories.MACERATOR_RECYCLING);

	// [PORT-FIX] damage_inputs_shaped_crafting удалён в kubejs_tfc 2.0 — обычный shaped
	global.TFGDamageShaped(event,'6x tfg:light_concrete_support', [
		'AB ',
		'AC ',
		'AC '
	], {
		A: 'gtceu:light_concrete',
		B: '#c:tools/chisel', // [PORT] tfc:chisels -> c:tools/chisel
		C: 'tfc:mortar'
	}).id('tfg:shaped/light_concrete_support')

	event.recipes.gtceu.assembler('tfg:gtceu/assembler/light_concrete_support')
		.circuit(11)
		.inputFluids(Fluid.of('gtceu:concrete', 36))
		.itemOutputs('6x tfg:light_concrete_support')
		.itemInputs('3x gtceu:light_concrete')
		.duration(40)
		.EUt(GTValues.VA[GTValues.ULV])

	// [PORT-FIX] damage_inputs_shaped_crafting удалён — обычный shaped
	global.TFGDamageShaped(event,'6x tfg:dark_concrete_support', [
		'AB ',
		'AC ',
		'AC '
	], {
		A: 'gtceu:dark_concrete',
		B: '#c:tools/chisel',
		C: 'tfc:mortar'
	}).id('tfg:shaped/dark_concrete_support')

	event.recipes.gtceu.assembler('tfg:gtceu/assembler/dark_concrete_support')
		.circuit(11)
		.inputFluids(Fluid.of('gtceu:concrete', 36))
		.itemOutputs('6x tfg:dark_concrete_support')
		.itemInputs('3x gtceu:dark_concrete')
		.duration(40)
		.EUt(GTValues.VA[GTValues.ULV])

	// [PORT-FIX] kubejs_tfc 2.0: конструктор barrel_sealed(input_fluid, duration)
	event.recipes.tfc.barrel_sealed(Fluid.of('gtceu:concrete', 96), 1000)
		.inputItem('tfg:rebar_support')
		.outputItem('tfg:reinforced_light_concrete_support')
		.id('tfg:barrel/reinforced_light_concrete_support')

	event.recipes.tfc.barrel_sealed(Fluid.of('tfc:black_dye', 10), 500)
		.inputItem('tfg:light_concrete_support')
		.outputItem('tfg:dark_concrete_support')
		.id('tfg:barrel/dark_concrete_support')

	event.recipes.tfc.barrel_sealed(Fluid.of('tfc:black_dye', 10), 500)
		.inputItem('tfg:reinforced_light_concrete_support')
		.outputItem('tfg:reinforced_dark_concrete_support')
		.id('tfg:barrel/reinforced_dark_concrete_support')

	// Stone supports are in recipes.rocks.js

	// Metal Supports
	event.shaped('8x tfg:rebar_support', [
		'BA ',
		'AC '
	], {
		A: ChemicalHelper.get(TagPrefix.rod, GTMaterials.Steel, 1),
		B: ChemicalHelper.get(TagPrefix.wireFine, GTMaterials.Steel, 1),
		C: '#c:tools/wire_cutter' // [PORT] forge:tools/wire_cutters -> c:tools/wire_cutter
	}).id('tfg:shaped/rebar_support')

	event.recipes.gtceu.assembler('tfg:gtceu/assembler/rebar_support')
		.circuit(11)
		.itemOutputs('8x tfg:rebar_support')
		.itemInputs(ChemicalHelper.get(TagPrefix.rod, GTMaterials.Steel, 2), ChemicalHelper.get(TagPrefix.wireFine, GTMaterials.Steel, 1))
		.addMaterialInfo(true)
		.duration(100)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.tfc.anvil(
		'1x tfg:steel_support',
		'#c:double_ingots/steel', // [PORT] forge: -> c:
		[
			'upset_last',
			'shrink_any'
		]
	).tier(4).id('tfg:anvil/steel_support')

	event.recipes.gtceu.assembler('tfg:gtceu/assembler/steel_support')
		.circuit(11)
		.itemOutputs('2x tfg:steel_support')
		.itemInputs('1x #c:double_ingots/steel')
		.duration(100)
		.EUt(GTValues.VA[GTValues.ULV])

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo — Java-хелпер мода TFG, отсутствует в 1.21.1
	// TFGHelpers.registerMaterialInfo('tfg:steel_support', [GTMaterials.Steel, 1])
})
