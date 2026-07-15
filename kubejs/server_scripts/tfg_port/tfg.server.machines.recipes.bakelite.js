// priority: 0
"use strict";

// [PORT] Порт tfg/machines/recipes.bakelite.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT] registerTFGBakeliteRecipes -> прямой обработчик ServerEvents.recipes (KubeJS 7: изолированные скоупы).
// [PORT-Ф2] Материалы tfg:bakelite / tfg:phenolic_resin / tfg:syngas — GT-материалы TFG, регистрация
//   заблокирована (05_startup.dispatch.js.disabled, апстрим-баг GTM8): жидкостей tfg:bakelite/tfg:phenolic_resin,
//   пыли c:dusts/sodium_hydroxide-цепочек через них, плит/фольг/блоков бакелита НЕТ. Все рецепты с ними
//   закомментированы. Удаления стоковых рецептов (mv_machine_hull, hull_mv_annealed, assembler/phenolic_board)
//   тоже закомментированы — иначе предметы останутся без рецептов.
// [PORT-FIX] forge: -> c:; .notConsumable(строка) -> .notConsumableItem(...)

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.machines recipes.bakelite start')

	// Make PE exclusively MV+, it's fine if the LCR recipe stays LV since you can't make an LCR in LV anyway
	event.recipes.gtceu.chemical_reactor('gtceu:polyethylene_from_oxygen')
		.inputFluids('gtceu:oxygen 1000', 'gtceu:ethylene 144')
		.circuit(1)
		.outputFluids('gtceu:polyethylene 216')
		.duration(2 * 20)
		.EUt(GTValues.VA[GTValues.MV])

	event.recipes.gtceu.chemical_reactor('gtceu:polyethylene_from_air')
		.inputFluids('gtceu:air 1000', 'gtceu:ethylene 144')
		.circuit(1)
		.outputFluids('gtceu:polyethylene 144')
		.duration(2 * 20)
		.EUt(GTValues.VA[GTValues.MV])

	// Formaldehyde
	event.recipes.gtceu.chemical_reactor('tfg:formaldehyde_from_methane')
		.inputFluids('gtceu:methane 1000', 'gtceu:oxygen 1000')
		.outputFluids('gtceu:formaldehyde 1000', 'gtceu:hydrogen 2000')
		.circuit(1)
		.duration(200)
		.EUt(GTValues.VA[GTValues.LV])

	// add phenol and methane to distillation
	event.recipes.gtceu.distillation_tower('gtceu:distill_creosote')
		.inputFluids('gtceu:creosote 1000')
		.outputFluids('gtceu:lubricant 500')
		.outputFluids('gtceu:phenol 50')
		.outputFluids('gtceu:carbon_dioxide 200')
		.outputFluids('gtceu:methane 250')
		// this adds single-block distillery recipes too
		.disableDistilleryRecipes(false)
		.duration(8 * 20)
		.EUt(96)

	// [PORT-Ф2] tfg:syngas — жидкость GT-материала TFG (не зарегистрирована)
	// event.recipes.gtceu.chemical_reactor('tfg:syngas_to_methane')
	// 	.inputFluids('tfg:syngas 1000')
	// 	.notConsumableItem('#c:dusts/silver') // [PORT-FIX] .notConsumable(строка) -> .notConsumableItem
	// 	.outputFluids('gtceu:methane 100')
	// 	.duration(100)
	// 	.EUt(GTValues.VA[GTValues.LV])

	// [PORT-Ф2] tfg:phenolic_resin — жидкость GT-материала TFG
	// event.recipes.gtceu.chemical_reactor('tfg:phenolic_resin')
	// 	.inputFluids('gtceu:phenol 500', 'gtceu:formaldehyde 1000')
	// 	.notConsumableItem('#c:dusts/sodium_hydroxide') // [PORT-FIX]
	// 	.outputFluids('tfg:phenolic_resin 1000')
	// 	.duration(100)
	// 	.EUt(GTValues.VA[GTValues.LV])

	// [PORT-Ф2] tfg:bakelite / tfg:phenolic_resin — жидкости GT-материалов TFG
	// event.recipes.gtceu.mixer('tfg:bakelite_wood')
	// 	.inputFluids('tfg:phenolic_resin 144')
	// 	.itemInputs('tfg:treated_chipboard_composite')
	// 	.outputFluids('tfg:bakelite 144')
	// 	.duration(100)
	// 	.EUt(GTValues.VA[GTValues.LV])

	// event.recipes.gtceu.mixer('tfg:bakelite_asbestos')
	// 	.inputFluids('tfg:phenolic_resin 144')
	// 	.itemInputs('#c:dusts/asbestos')
	// 	.outputFluids('tfg:bakelite 144')
	// 	.duration(100)
	// 	.EUt(GTValues.VA[GTValues.LV])

	// [PORT-Ф2] Удаление стокового рецепта закомментировано: LV-замена (forming_press с фольгой бакелита)
	// заблокирована Ф2 — без стокового рецепта плата осталась бы только MV+.
	// event.remove({ id: 'gtceu:assembler/phenolic_board' })

	// [PORT-Ф2] c:foils/bakelite — фольга материала TFG
	// event.recipes.gtceu.forming_press('tfg:phenolic_board_lv')
	// 	.itemInputs('2x #c:foils/bakelite', '2x minecraft:paper', 'gtceu:resin_circuit_board')
	// 	.itemOutputs('gtceu:phenolic_circuit_board')
	// 	.duration(7.5 * 20)
	// 	.EUt(GTValues.VA[GTValues.LV])

	// [PORT-Ф2] c:foils/bakelite
	// event.recipes.gtceu.assembler('tfg:phenolic_board_mv')
	// 	.itemInputs('2x #c:foils/bakelite', 'gtceu:resin_circuit_board')
	// 	.inputFluids('gtceu:phenol 50')
	// 	.itemOutputs('gtceu:phenolic_circuit_board')
	// 	.duration(7.5 * 20)
	// 	.EUt(GTValues.VA[GTValues.MV])

	event.recipes.gtceu.assembler('tfg:phenolic_board_mv_pe')
		.itemInputs('2x #c:foils/polyethylene', 'gtceu:resin_circuit_board') // [PORT] forge: -> c:
		.inputFluids('gtceu:phenol 50')
		.itemOutputs('gtceu:phenolic_circuit_board')
		.duration(7.5 * 20)
		.EUt(GTValues.VA[GTValues.MV])

	// machine hull changes/additions

	// To Move to MV Rework after
	// [PORT-Ф2] ВЕСЬ блок MV/LV/ULV корпусов/шин/люков отключён: все рецепты требуют жидкость/плиты
	// tfg:bakelite (материал Ф2). Удаления стоковых рецептов тоже закомментированы, чтобы корпуса
	// оставались крафтабельными по стоковым рецептам GTM8.
	// event.remove({ id: 'gtceu:shaped/mv_machine_hull'})
	// event.shaped('gtceu:mv_machine_hull', [
	// 	'ABA',
	// 	'DCD',
	// 	'ABA'
	// ], {
	// 	A: '#c:plates/bakelite',
	// 	B: '#c:plates/aluminum',
	// 	C: 'gtceu:mv_machine_casing',
	// 	D: 'gtceu:copper_single_cable'
	// }).id('tfg:shaped/mv_machine_hull')

	// event.remove({ id: 'gtceu:assembler/hull_mv_annealed'})
	// event.recipes.gtceu.assembler('tfg:mv_machine_hull')
	// 	.itemInputs('gtceu:mv_machine_casing', '2x gtceu:copper_single_cable')
	// 	.inputFluids('tfg:bakelite 576')
	// 	.itemOutputs('gtceu:mv_machine_hull')
	// 	.duration(20*2.5)
	// 	.EUt(GTValues.VH[GTValues.LV])

	// MV Buses
	// event.recipes.gtceu.assembler('tfg:mv_input_bus')
	// 	.itemInputs('gtceu:mv_machine_hull', '#tfg:any_bronze_crate')
	// 	.inputFluids('tfg:bakelite 576')
	// 	.itemOutputs('gtceu:mv_input_bus')
	// 	.duration(20*15)
	// 	.EUt(GTValues.VA[GTValues.MV])
	// 	.circuit(1)

	// event.recipes.gtceu.assembler('tfg:mv_output_bus')
	// 	.itemInputs('gtceu:mv_machine_hull', '#tfg:any_bronze_crate')
	// 	.inputFluids('tfg:bakelite 576')
	// 	.itemOutputs('gtceu:mv_output_bus')
	// 	.duration(20*15)
	// 	.EUt(GTValues.VA[GTValues.MV])
	// 	.circuit(2)

	// MV Hatches
	// event.recipes.gtceu.assembler('tfg:mv_input_hatch')
	// 	.itemInputs('gtceu:mv_machine_hull', '#tfg:any_bronze_drum')
	// 	.inputFluids('tfg:bakelite 576')
	// 	.itemOutputs('gtceu:mv_input_hatch')
	// 	.duration(20*15)
	// 	.EUt(GTValues.VA[GTValues.MV])
	// 	.circuit(1)

	// event.recipes.gtceu.assembler('tfg:mv_output_hatch')
	// 	.itemInputs('gtceu:mv_machine_hull', '#tfg:any_bronze_drum')
	// 	.inputFluids('tfg:bakelite 576')
	// 	.itemOutputs('gtceu:mv_output_hatch')
	// 	.duration(20*15)
	// 	.EUt(GTValues.VA[GTValues.MV])
	// 	.circuit(2)
	// End of MV Changes

	// LV Buses
	// event.recipes.gtceu.assembler('tfg:lv_input_bus_bakelite')
	// 	.itemInputs('gtceu:lv_machine_hull', 'gtceu:wood_crate')
	// 	.inputFluids('tfg:bakelite 432')
	// 	.itemOutputs('gtceu:lv_input_bus')
	// 	.duration(20*15)
	// 	.EUt(GTValues.VA[GTValues.LV])
	// 	.circuit(1)

	// event.recipes.gtceu.assembler('tfg:lv_output_bus_bakelite')
	// 	.itemInputs('gtceu:lv_machine_hull', 'gtceu:wood_crate')
	// 	.inputFluids('tfg:bakelite 432')
	// 	.itemOutputs('gtceu:lv_output_bus')
	// 	.duration(20*15)
	// 	.EUt(GTValues.VA[GTValues.LV])
	// 	.circuit(2)
	// LV Hatches
	// event.recipes.gtceu.assembler('tfg:lv_input_hatch_bakelite')
	// 	.itemInputs('gtceu:lv_machine_hull', '#c:glass_blocks')
	// 	.inputFluids('tfg:bakelite 432')
	// 	.itemOutputs('gtceu:lv_input_hatch')
	// 	.duration(20*15)
	// 	.EUt(GTValues.VA[GTValues.LV])
	// 	.circuit(1)

	// event.recipes.gtceu.assembler('tfg:lv_output_hatch_bakelite')
	// 	.itemInputs('gtceu:lv_machine_hull', '#c:glass_blocks')
	// 	.inputFluids('tfg:bakelite 432')
	// 	.itemOutputs('gtceu:lv_output_hatch')
	// 	.duration(20*15)
	// 	.EUt(GTValues.VA[GTValues.LV])
	// 	.circuit(2)
	// ULV Buses
	// event.recipes.gtceu.assembler('tfg:ulv_input_bus_bakelite')
	// 	.itemInputs('gtceu:ulv_machine_hull', '#c:chests/wooden')
	// 	.inputFluids('tfg:bakelite 216')
	// 	.itemOutputs('gtceu:ulv_input_bus')
	// 	.duration(20*15)
	// 	.EUt(GTValues.VA[GTValues.ULV])
	// 	.circuit(1)

	// event.recipes.gtceu.assembler('tfg:ulv_output_bus_bakelite')
	// 	.itemInputs('gtceu:ulv_machine_hull', '#c:chests/wooden')
	// 	.inputFluids('tfg:bakelite 216')
	// 	.itemOutputs('gtceu:ulv_output_bus')
	// 	.duration(20*15)
	// 	.EUt(GTValues.VA[GTValues.ULV])
	// 	.circuit(2)
	// ULV Hatches
	// event.recipes.gtceu.assembler('tfg:ulv_input_hatch_bakelite')
	// 	.itemInputs('gtceu:ulv_machine_hull', '#c:glass_blocks')
	// 	.inputFluids('tfg:bakelite 216')
	// 	.itemOutputs('gtceu:ulv_input_hatch')
	// 	.duration(20*15)
	// 	.EUt(GTValues.VA[GTValues.ULV])
	// 	.circuit(1)

	// event.recipes.gtceu.assembler('tfg:ulv_output_hatch_bakelite')
	// 	.itemInputs('gtceu:ulv_machine_hull', '#c:glass_blocks')
	// 	.inputFluids('tfg:bakelite 216')
	// 	.itemOutputs('gtceu:ulv_output_hatch')
	// 	.duration(20*15)
	// 	.EUt(GTValues.VA[GTValues.ULV])
	// 	.circuit(2)


	// LV/ULV Hulls

	// [PORT-Ф2] tfg:bakelite
	// event.recipes.gtceu.assembler('tfg:ulv_hull_bakelite')
	// 	.itemInputs('gtceu:ulv_machine_casing', '2x #c:single_cables/red_alloy')
	// 	.inputFluids('tfg:bakelite 432')
	// 	.itemOutputs('gtceu:ulv_machine_hull')
	// 	.duration(25)
	// 	.EUt(16)

	// event.recipes.gtceu.assembler('tfg:lv_hull_bakelite')
	// 	.itemInputs('gtceu:lv_machine_casing', '2x #c:single_cables/tin')
	// 	.inputFluids('tfg:bakelite 432')
	// 	.itemOutputs('gtceu:lv_machine_hull')
	// 	.duration(50)
	// 	.EUt(16)

	// [PORT-Ф2] c:storage_blocks/bakelite — блок материала TFG
	// event.shaped('gtceu:lv_hermetic_casing', [
	// 	'AAA',
	// 	'ABA',
	// 	'AAA'
	// ], {
	// 	A: '#c:plates/steel',
	// 	B: '#c:storage_blocks/bakelite'
	// }).id('tfg:shaped/lv_hermetic_casing_bakelite')

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo — хелпер Java-мода TFG, отсутствует в 1.21.1-сборке
	// TFGHelpers.registerMaterialInfo('gtceu:lv_hermetic_casing', [GTMaterials.Steel, 8])
})
