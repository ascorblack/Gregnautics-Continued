// priority: 0
"use strict";

// [PORT] Порт tfg/machines/recipes.casings.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT] Активен только рецепт gtceu:steel_machine_casing — остальное отключено:
// [PORT-Ф7] блоки-кейсинги TFG (tfg:casings/*, tfg:machine_casing_*, tfg:reflector, tfg:superconductor_coil_*,
//   tfg:electromagnetic_accelerator) регистрировались через registerGTCEuMachines/registerTFGBlocks — не портировано.
// [PORT-Ф2] материалы TFG/космо-флаги: desh/ostrum/stellite_100/rocket_alloy_t1/rtm_alloy(plate)/
//   ultimet(rotor)/dense-плиты lead/desh, жидкости tfg:woods_metal/tfg:bi_pb_sn_cd_in_tl — не зарегистрированы.
// [PORT-Ф10] ad_astra -> stellaris не авто-ремапим (photovoltaic-ячейки, dimension ad_astra:moon).
// [PORT] deafission отсутствует в сборке (battery_heat_port_ev, heat_input_hatch_ev).
// [PORT-Ф4] TFGHelpers.registerMaterialInfo — хелпер Java-мода TFG, отсутствует.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.machines recipes.casings start')

	event.recipes.gtceu.assembler('steel_machine_casing')
		.itemInputs(ChemicalHelper.get(TagPrefix.ingot, GTMaterials.Steel, 4))
		.itemOutputs('gtceu:steel_machine_casing')
		.circuit(6)
		.duration(2.5 * 20)
		.EUt(16)

	// [PORT-Ф7] tfg:casings/sterling_silver_casing — блок TFG не зарегистрирован
	// event.shaped('2x tfg:casings/sterling_silver_casing', [
	// 	'ABA',
	// 	'ACA',
	// 	'ADA'
	// ], {
	// 	A: '#c:plates/sterling_silver',
	// 	B: '#c:tools/hammer',
	// 	C: '#c:frames/invar',
	// 	D: '#c:tools/wrench'
	// }).id('tfg:shaped/sterling_silver_casing')

	// event.recipes.gtceu.assembler('sterling_silver_casing')
	// 	.itemInputs('6x #c:plates/sterling_silver', '#c:frames/invar')
	// 	.itemOutputs('2x tfg:casings/sterling_silver_casing')
	// 	.circuit(6)
	// 	.duration(2.5 * 20)
	// 	.EUt(16)
	// 	.addMaterialInfo(true)

	// Railgun
	// [PORT-Ф4-TODO] tfg:superconductor_coil_small / tfg:superconductor_coil_large не зарегистрированы
	// global.GTCEU_SUPERCONDUCTORS.forEach((type, index) => {
	// 	const multiplier = index + 1

	// 	event.recipes.gtceu.assembler(`tfg:assembler/superconductor_coil_small_from_${type.name}`)
	// 		.itemInputs(
	// 			ChemicalHelper.get(TagPrefix.plate, GTMaterials.HSLASteel, 4),
	// 			ChemicalHelper.get(TagPrefix.rod, GTMaterials.Steel, 2),
	// 			ChemicalHelper.get(TagPrefix.rod, GTMaterials.SteelMagnetic, 1),
	// 			ChemicalHelper.get(TagPrefix.wireFine, GTMaterials[type.materialId], 4)
	// 		)
	// 		.inputFluids(Fluid.of('gtceu:epoxy', 144))
	// 		.itemOutputs(Item.of('tfg:superconductor_coil_small', 4 * multiplier))
	// 		.circuit(6)
	// 		.duration(400)
	// 		.EUt(GTValues.VA[GTValues.MV])

	// 	event.recipes.gtceu.assembler(`tfg:assembler/superconductor_coil_large_from_${type.name}`)
	// 		.itemInputs(
	// 			ChemicalHelper.get(TagPrefix.plate, GTMaterials.HSLASteel, 4),
	// 			ChemicalHelper.get(TagPrefix.rod, GTMaterials.Steel, 2),
	// 			ChemicalHelper.get(TagPrefix.rod, GTMaterials.SteelMagnetic, 1),
	// 			ChemicalHelper.get(TagPrefix.wireGtSingle, GTMaterials[type.materialId], 4))
	// 		.inputFluids(Fluid.of('gtceu:epoxy', 144))
	// 		.itemOutputs(Item.of('tfg:superconductor_coil_large', 4 * multiplier))
	// 		.circuit(6)
	// 		.duration(600)
	// 		.EUt(GTValues.VA[GTValues.MV])
	// })

	// [PORT-Ф2] c:plates/desh (материал desh не зарегистрирован); [PORT-Ф4-TODO] tfg:dry_ice,
	// tfg:electromagnetic_accelerator не зарегистрированы
	// event.recipes.gtceu.assembler('tfg:assembler/electromagnetic_accelerator')
	// 	.itemInputs(
	// 		'2x #c:plates/desh',
	// 		'gtceu:mv_voltage_coil',
	// 		'5x tfg:dry_ice',
	// 		'gtceu:nonconducting_casing'
	// 	)
	// 	.inputFluids(Fluid.of('gtceu:blue_alloy', 288))
	// 	.itemOutputs('6x tfg:electromagnetic_accelerator')
	// 	.circuit(4)
	// 	.duration(800)
	// 	.EUt(GTValues.VA[GTValues.MV])
	// 	.addMaterialInfo(true)

	// [PORT-Ф7] tfg:machine_casing_aluminium_plated_steel — блок TFG не зарегистрирован
	// event.recipes.gtceu.assembler('tfg:assembler/machine_casing_aluminium_plated_steel')
	// 	.itemInputs(
	// 		ChemicalHelper.get(TagPrefix.plate, GTMaterials.Aluminium, 6),
	// 		ChemicalHelper.get(TagPrefix.frameGt, GTMaterials.Steel, 1)
	// 	)
	// 	.inputFluids(Fluid.of('gtceu:silicon', 72))
	// 	.itemOutputs('2x tfg:machine_casing_aluminium_plated_steel')
	// 	.circuit(6)
	// 	.duration(20 * (2.5))
	// 	.EUt(GTValues.VH[GTValues.LV])
	// 	.addMaterialInfo(true, true)

	// Solar
	// [PORT-Ф7/Ф10] tfg:photo_cell_t1, tfg:casings/machine_casing_*_solar_panel не зарегистрированы;
	// ad_astra:photovoltaic_* — мод отсутствует (stellaris не авто-ремапим);
	// жидкости tfg:woods_metal / tfg:bi_pb_sn_cd_in_tl — Ф2
	// event.recipes.gtceu.assembler('basic_solar_casing')
	// 	.itemInputs('gtceu:steel_machine_casing', 'tfg:photo_cell_t1')
	// 	.itemOutputs('8x tfg:casings/machine_casing_blue_solar_panel')
	// 	.inputFluids(Fluid.of('gtceu:soldering_alloy', 288))
	// 	.circuit(6)
	// 	.duration(2.5 * 20)
	// 	.EUt(16)

	// event.recipes.gtceu.assembler('advanced_solar_casing')
	// 	.itemInputs('8x tfg:casings/machine_casing_blue_solar_panel', 'ad_astra:photovoltaic_etrium_cell')
	// 	.itemOutputs('8x tfg:casings/machine_casing_green_solar_panel')
	// 	.inputFluids(Fluid.of('tfg:woods_metal', 288))
	// 	.circuit(6)
	// 	.duration(2.5 * 20)
	// 	.EUt(16)

	// event.recipes.gtceu.assembler('elite_solar_casing')
	// 	.itemInputs('8x tfg:casings/machine_casing_green_solar_panel', 'ad_astra:photovoltaic_vesnium_cell')
	// 	.itemOutputs('8x tfg:casings/machine_casing_red_solar_panel')
	// 	.inputFluids(Fluid.of('tfg:bi_pb_sn_cd_in_tl', 288))
	// 	.circuit(6)
	// 	.duration(2.5 * 20)
	// 	.EUt(16)

	// [PORT-Ф4-TODO] tfg:reflector не зарегистрирован
	// event.recipes.gtceu.assembler('tfg:reflector_from_lens')
	// 	.itemInputs(
	// 		'24x #c:lenses',
	// 		ChemicalHelper.get(TagPrefix.frameGt, GTMaterials.BlackSteel, 1)
	// 	)
	// 	.inputFluids(Fluid.of('gtceu:silver', 1296))
	// 	.itemOutputs('1x tfg:reflector')
	// 	.circuit(6)
	// 	.duration(20 * (60))
	// 	.EUt(GTValues.VH[GTValues.MV])

	// [PORT-Ф10] dimension ad_astra:moon — космоконтент
	// event.recipes.gtceu.assembler('tfg:reflector_from_certus')
	// 	.itemInputs(
	// 		ChemicalHelper.get(TagPrefix.plate, GTMaterials.CertusQuartz, 12),
	// 		ChemicalHelper.get(TagPrefix.frameGt, GTMaterials.BlackSteel, 1)
	// 	)
	// 	.inputFluids(Fluid.of('gtceu:silver', 488))
	// 	.itemOutputs('1x tfg:reflector')
	// 	.circuit(6)
	// 	.dimension('ad_astra:moon')
	// 	.duration(20 * (60))
	// 	.EUt(GTValues.VH[GTValues.MV])

	// Moon
	// [PORT-Ф2] gtceu:desh_frame не существует; [PORT-Ф7] tfg:casings/machine_casing_iron_desh
	// event.recipes.gtceu.assembler('iron_desh_casing')
	// 	.itemInputs(ChemicalHelper.get(TagPrefix.plate, GTMaterials.Steel, 6), 'gtceu:desh_frame')
	// 	.itemOutputs('2x tfg:casings/machine_casing_iron_desh')
	// 	.circuit(6)
	// 	.duration(2.5 * 20)
	// 	.EUt(16)
	// 	.addMaterialInfo(true)

	// Evaporation
	// [PORT-Ф7] tfg:casings/machine_casing_stainless_evaporation не зарегистрирован
	// event.recipes.gtceu.assembler('tfg:casings/machine_casing_stainless_evaporation')
	// 	.itemInputs('gtceu:clean_machine_casing', '4x gtceu:annealed_copper_double_wire')
	// 	.inputFluids(Fluid.of('gtceu:polyvinyl_chloride', 288))
	// 	.itemOutputs('tfg:casings/machine_casing_stainless_evaporation')
	// 	.circuit(6)
	// 	.duration(2.5 * 20)
	// 	.EUt(GTValues.VA[GTValues.HV])
	// 	.addMaterialInfo(true, true)

	// Ostrum Linear Acclerator
	// [PORT-Ф7] tfg:casings/machine_casing_mars не зарегистрирован
	// event.recipes.gtceu.assembler('tfg:casings/machine_casing_mars')
	// 	.itemInputs('gtceu:clean_machine_casing', '4x #c:double_wires/kanthal')
	// 	.inputFluids(Fluid.of('gtceu:polytetrafluoroethylene', 288))
	// 	.itemOutputs('tfg:casings/machine_casing_mars')
	// 	.circuit(6)
	// 	.duration(2.5 * 20)
	// 	.EUt(GTValues.VA[GTValues.HV])
	// 	.addMaterialInfo(true, true)

	// [PORT-Ф2] dense-плиты lead (TFG-флаг GENERATE_DENSE не применяется) и rtm_alloy-плиты не существуют,
	// хотя сам блок gtceu:atomic_casing в сборке есть
	// event.recipes.gtceu.assembler('gtceu:atomic_casing')
	// 	.itemInputs('4x #c:dense_plates/lead', '2x #c:plates/rtm_alloy', '#c:frames/titanium')
	// 	.inputFluids(Fluid.of('gtceu:polyvinyl_butyral', 288))
	// 	.itemOutputs('2x gtceu:atomic_casing')
	// 	.circuit(6)
	// 	.duration(2.5 * 20)
	// 	.EUt(GTValues.VA[GTValues.HV])
	// 	.addMaterialInfo(true, true)

	// Heat Battery deafission:battery_heat_port_ev
	// [PORT] deafission отсутствует в сборке 1.21.1

	// event.recipes.gtceu.assembler('tfg:battery_heat_port_ev')
	// 	.itemInputs(Item.of('gtceu:ev_machine_hull', 1), Item.of('gtceu:rtm_alloy_coil_block'), Item.of('gtceu:silicon_plate', 6))
	// 	.inputFluids(Fluid.of('gtceu:mercury', 4000))
	// 	.itemOutputs('deafission:battery_heat_port_ev')
	// 	//.circuit(6)
	// 	.duration(2.5 * 20)
	// 	.EUt(GTValues.VA[GTValues.EV])
	// 	.addMaterialInfo(true, true)

	// event.recipes.gtceu.assembler('tfg:heat_input_hatch_ev')
	// 	.itemInputs(Item.of('gtceu:ev_machine_hull', 1), Item.of('gtceu:rtm_alloy_coil_block'), Item.of('gtceu:beryllium_plate', 6))
	// 	.inputFluids(Fluid.of('gtceu:mercury', 4000))
	// 	.itemOutputs(Item.of('deafission:heat_input_hatch_ev', 1))
	// 	//.circuit(6)
	// 	.duration(2.5 * 20)
	// 	.EUt(GTValues.VA[GTValues.EV])
	// 	.addMaterialInfo(true, true)

	// Small Modular Turbine
	// [PORT-Ф2] dense-плиты desh/lead; [PORT-Ф7] tfg:casings/machine_casing_desh_ptfe, tfg:uv_smr_fluid_import_hatch

	// event.recipes.gtceu.assembler('tfg:machine_casing_desh_ptfe')
	// 	.itemInputs('4x #c:dense_plates/desh', '2x #c:dense_plates/lead', Item.of('gtceu:hsla_steel_frame'))
	// 	.inputFluids(Fluid.of('gtceu:polytetrafluoroethylene', 288))
	// 	.itemOutputs('tfg:casings/machine_casing_desh_ptfe')
	// 	.circuit(6)
	// 	.duration(2.5 * 20)
	// 	.EUt(GTValues.VA[GTValues.HV])
	// 	.addMaterialInfo(true, true)

	// event.recipes.gtceu.assembler('tfg:uv_smr_fluid_import_hatch')
	// 	.itemInputs('4x #c:dense_plates/desh', '2x #c:dense_plates/lead', Item.of('gtceu:iv_input_hatch', 1))
	// 	.inputFluids(Fluid.of('gtceu:polytetrafluoroethylene', 288))
	// 	.itemOutputs('tfg:uv_smr_fluid_import_hatch')
	// 	//.circuit(6)
	// 	.duration(2.5 * 20)
	// 	.EUt(GTValues.VA[GTValues.EV])
	// 	.addMaterialInfo(true, true)

	// Vacuum Intake
	// [PORT-Ф7] tfg:casings/machine_casing_vacuum_engine_intake не зарегистрирован;
	// [PORT-Ф2] роторов ultimet нет (TFG-флаг)
	// event.shaped('tfg:casings/machine_casing_vacuum_engine_intake', [
	// 	'USU',
	// 	'WZW',
	// 	'UTU'
	// ], {
	// 	S: '#c:tools/hammer',
	// 	T: '#c:tools/wrench',
	// 	W: '#c:rotors/ultimet',
	// 	U: 'gtceu:ultimet_normal_item_pipe',
	// 	Z: 'gtceu:inert_machine_casing'
	// }).id('tfg:shaped/casing_machine_casing_vacuum_engine_intake')

	// event.recipes.gtceu.assembler('tfg:casings/machine_casing_vacuum_engine_intake')
	// 	.itemInputs(
	// 		'2x #c:rotors/ultimet',
	// 		'4x gtceu:ultimet_normal_item_pipe',
	// 		'1x gtceu:inert_machine_casing')
	// 	.itemOutputs('tfg:casings/machine_casing_vacuum_engine_intake')
	// 	.duration(50)
	// 	.EUt(GTValues.VH[GTValues.LV])
	// 	.circuit(2)
	// 	.addMaterialInfo(true)

	// [PORT-Ф2] gtceu:ostrum_frame, titanium_tungsten_carbide, tungsten_bismuth_oxide_composite — материалы
	// TFG/космо; [PORT-Ф7] tfg:machine_casing_power_casing не зарегистрирован
	// event.recipes.gtceu.assembler('tfg:casings/machine_casing_power_casing')
	// 	.itemInputs('gtceu:ostrum_frame', '4x #c:plates/titanium_tungsten_carbide', '16x #c:fine_wires/copper',
	// 				'16x #c:fine_wires/tungsten_bismuth_oxide_composite')
	// 	.inputFluids(Fluid.of('gtceu:reinforced_epoxy_resin', 288))
	// 	.itemOutputs('4x tfg:machine_casing_power_casing')
	// 	.circuit(6)
	// 	.duration(2.5 * 20)
	// 	.EUt(GTValues.VA[GTValues.EV])
	// 	.addMaterialInfo(true, true)
})
