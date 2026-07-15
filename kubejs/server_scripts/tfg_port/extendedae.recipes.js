// priority: 0
"use strict";

// [PORT] KubeJS 7: файл-диспетчер отсутствует, событие регистрируется напрямую
// [PORT] modid remap: expatternprovider -> extendedae (везде: id рецептов, предметы, теги)
ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port extendedae recipes start')

	// [PORT-Ф2-TEMP] remove-all ВРЕМЕННО ОТКЛЮЧЁН: GT-замены рецептов используют
	// tfg:fluix / tfg:cryogenized_fluix (Ф2 заблокирована) — без ванильных рецептов
	// предметы ExtendedAE стали бы некрафтовыми. Вернуть вместе с Ф2.
	// event.remove({
	// 	not: [
	// 		{ id: 'extendedae:epp_part' }, // [PORT] expatternprovider -> extendedae
	// 		{ id: 'extendedae:ei_part' },
	// 		{ id: 'extendedae:epp_alt' },
	// 		{ id: 'extendedae:ei_alt' },
	// 		{ id: 'extendedae:oversize_interface_alt' },
	// 		{ id: 'extendedae:oversize_interface_part' },
	// 	], mod: 'extendedae'
	// });


	//#region Ext Interface

	// IV

	// [PORT-Ф2] tfg:fluix — кастомный GT-материал TFG, ещё не портирован
	// event.recipes.gtceu.assembler('tfg:ex_interface_iv')
	// 	.itemInputs(
	// 		'gtceu:iv_conveyor_module',
	// 		'8x gtceu:laminated_glass',
	// 		'4x #c:plates/tungsten_steel', // [PORT] forge: -> c:
	// 		'4x ae2:annihilation_core',
	// 		'4x ae2:formation_core',
	// 		'2x megacells:accumulation_processor',
	// 		'2x #ae2:interface')
	// 	.inputFluids(Fluid.of('tfg:fluix', 144 * 8))
	// 	.itemOutputs('extendedae:ex_interface')
	// 	.duration(300)
	// 	.EUt(GTValues.VA[GTValues.IV])
	// 	.cleanroom(CleanroomType.CLEANROOM)
	// 	.circuit(1)

	// IV Moon Only

	// [PORT] ad_astra отсутствует в сборке 1.21.1; [PORT-Ф2] tfg:cryogenized_fluix
	// event.recipes.gtceu.assembler('tfg:ex_interface_iv_moon')
	// 	.itemInputs(
	// 		'gtceu:iv_conveyor_module',
	// 		'8x gtceu:laminated_glass',
	// 		'4x #c:plates/tungsten_steel',
	// 		'4x ae2:annihilation_core',
	// 		'4x ae2:formation_core',
	// 		'2x megacells:accumulation_processor',
	// 		'2x #ae2:interface')
	// 	.inputFluids(Fluid.of('tfg:cryogenized_fluix', 144 * 8))
	// 	.itemOutputs('2x extendedae:ex_interface')
	// 	.duration(300)
	// 	.EUt(GTValues.VA[GTValues.IV])
	// 	.dimension('ad_astra:moon')
	// 	.circuit(1)

	// ZPM

	// [PORT-Ф2] tfg:fluix — кастомный GT-материал TFG, ещё не портирован
	// event.recipes.gtceu.assembler('tfg:ex_interface_zpm')
	// 	.itemInputs(
	// 		'gtceu:zpm_conveyor_module',
	// 		'8x gtceu:laminated_glass',
	// 		'4x #c:plates/naquadah_alloy',
	// 		'16x ae2:annihilation_core',
	// 		'16x ae2:formation_core',
	// 		'8x megacells:accumulation_processor',
	// 		'16x #ae2:interface')
	// 	.inputFluids(Fluid.of('tfg:fluix', 144 * 32))
	// 	.itemOutputs('16x extendedae:ex_interface')
	// 	.duration(300)
	// 	.EUt(GTValues.VA[GTValues.ZPM])
	// 	.cleanroom(CleanroomType.CLEANROOM)
	// 	.circuit(1)

	// ZPM Moon Only

	// [PORT] ad_astra отсутствует в сборке 1.21.1; [PORT-Ф2] tfg:cryogenized_fluix
	// event.recipes.gtceu.assembler('tfg:ex_interface_zpm_moon')
	// 	.itemInputs(
	// 		'gtceu:zpm_conveyor_module',
	// 		'8x gtceu:laminated_glass',
	// 		'4x #c:plates/naquadah_alloy',
	// 		'16x ae2:annihilation_core',
	// 		'16x ae2:formation_core',
	// 		'8x megacells:accumulation_processor',
	// 		'16x #ae2:interface')
	// 	.inputFluids(Fluid.of('tfg:cryogenized_fluix', 144 * 32))
	// 	.itemOutputs('32x extendedae:ex_interface')
	// 	.duration(300)
	// 	.EUt(GTValues.VA[GTValues.ZPM])
	// 	.dimension('ad_astra:moon')
	// 	.circuit(1)

	// Interface Upgrade

	// IV

	// [PORT-Ф2] tfg:fluix — кастомный GT-материал TFG, ещё не портирован
	// event.recipes.gtceu.assembler('extendedae:interface_upgrade_iv')
	// 	.itemInputs(
	// 		'gtceu:iv_conveyor_module',
	// 		'8x gtceu:laminated_glass',
	// 		'4x #c:plates/tungsten_steel',
	// 		'4x ae2:annihilation_core',
	// 		'4x ae2:formation_core',
	// 		'2x megacells:accumulation_processor',
	// 		'1x #ae2:interface')
	// 	.inputFluids(Fluid.of('tfg:fluix', 144 * 8))
	// 	.itemOutputs('extendedae:interface_upgrade')
	// 	.duration(300)
	// 	.EUt(GTValues.VA[GTValues.IV])
	// 	.cleanroom(CleanroomType.CLEANROOM)
	// 	.circuit(2)

	// IV Moon Only

	// [PORT] ad_astra отсутствует в сборке 1.21.1; [PORT-Ф2] tfg:cryogenized_fluix
	// event.recipes.gtceu.assembler('extendedae:interface_upgrade_iv_moon')
	// 	.itemInputs(
	// 		'gtceu:iv_conveyor_module',
	// 		'8x gtceu:laminated_glass',
	// 		'4x #c:plates/tungsten_steel',
	// 		'4x ae2:annihilation_core',
	// 		'4x ae2:formation_core',
	// 		'2x megacells:accumulation_processor')
	// 	.inputFluids(Fluid.of('tfg:cryogenized_fluix', 144 * 8))
	// 	.itemOutputs('2x extendedae:interface_upgrade')
	// 	.duration(300)
	// 	.EUt(GTValues.VA[GTValues.IV])
	// 	.dimension('ad_astra:moon')
	// 	.circuit(2)

	// ZPM

	// [PORT-Ф2] tfg:fluix — кастомный GT-материал TFG, ещё не портирован
	// event.recipes.gtceu.assembler('extendedae:interface_upgrade_zpm')
	// 	.itemInputs(
	// 		'gtceu:zpm_conveyor_module',
	// 		'8x gtceu:laminated_glass',
	// 		'4x #c:plates/naquadah_alloy',
	// 		'16x ae2:annihilation_core',
	// 		'16x ae2:formation_core',
	// 		'8x megacells:accumulation_processor',
	// 		'8x #ae2:interface')
	// 	.inputFluids(Fluid.of('tfg:fluix', 144 * 32))
	// 	.itemOutputs('16x extendedae:interface_upgrade')
	// 	.duration(300)
	// 	.EUt(GTValues.VA[GTValues.ZPM])
	// 	.cleanroom(CleanroomType.CLEANROOM)
	// 	.circuit(2)

	// ZPM Moon Only

	// [PORT] ad_astra отсутствует в сборке 1.21.1; [PORT-Ф2] tfg:cryogenized_fluix
	// event.recipes.gtceu.assembler('extendedae:interface_upgrade_zpm_moon')
	// 	.itemInputs(
	// 		'gtceu:zpm_conveyor_module',
	// 		'8x gtceu:laminated_glass',
	// 		'4x #c:plates/naquadah_alloy',
	// 		'16x ae2:annihilation_core',
	// 		'16x ae2:formation_core',
	// 		'8x megacells:accumulation_processor')
	// 	.inputFluids(Fluid.of('tfg:cryogenized_fluix', 144 * 32))
	// 	.itemOutputs('32x extendedae:interface_upgrade')
	// 	.duration(300)
	// 	.EUt(GTValues.VA[GTValues.ZPM])
	// 	.dimension('ad_astra:moon')
	// 	.circuit(2)

	//#endregion

	//#region Oversized Interface

	// IV

	// [PORT-Ф2] tfg:fluix — кастомный GT-материал TFG, ещё не портирован
	// event.recipes.gtceu.assembly_line('extendedae:oversize_interface_iv')
	// 	.itemInputs(
	// 		'4x #extendedae:extended_interface',
	// 		'4x megacells:accumulation_processor',
	// 		'gtceu:iv_robot_arm',
	// 		'gtceu:iv_fluid_regulator',
	// 		'4x #c:dense_plates/tungsten_steel',
	// 		'#gtceu:circuits/luv')
	// 	.inputFluids(Fluid.of('tfg:fluix', 144 * 9))
	// 	.itemOutputs("extendedae:oversize_interface")
	// 	.duration(300)
	// 	.EUt(GTValues.VA[GTValues.IV])
	// 	.cleanroom(CleanroomType.CLEANROOM)

	// IV Moon

	// [PORT] ad_astra отсутствует в сборке 1.21.1; [PORT-Ф2] tfg:cryogenized_fluix
	// event.recipes.gtceu.assembly_line('extendedae:oversize_interface_iv_moon')
	// 	.itemInputs(
	// 		'4x #extendedae:extended_interface',
	// 		'4x megacells:accumulation_processor',
	// 		'gtceu:iv_robot_arm',
	// 		'gtceu:iv_fluid_regulator',
	// 		'4x #c:dense_plates/tungsten_steel',
	// 		'#gtceu:circuits/luv')
	// 	.inputFluids(Fluid.of('tfg:cryogenized_fluix', 144 * 9))
	// 	.itemOutputs("4x extendedae:oversize_interface")
	// 	.duration(300)
	// 	.EUt(GTValues.VA[GTValues.IV])
	// 	.dimension('ad_astra:moon')

	// ZPM

	// [PORT-Ф2] tfg:fluix — кастомный GT-материал TFG, ещё не портирован
	// event.recipes.gtceu.assembly_line('extendedae:oversize_interface_zpm')
	// 	.itemInputs(
	// 		'8x #extendedae:extended_interface',
	// 		'4x megacells:accumulation_processor',
	// 		'gtceu:zpm_robot_arm',
	// 		'gtceu:zpm_fluid_regulator',
	// 		'4x #c:dense_plates/naquadah_alloy',
	// 		'#gtceu:circuits/uv')
	// 	.inputFluids(Fluid.of('tfg:fluix', 144 * 18))
	// 	.itemOutputs("8x extendedae:oversize_interface")
	// 	.duration(300)
	// 	.EUt(GTValues.VA[GTValues.ZPM])
	// 	.cleanroom(CleanroomType.CLEANROOM)

	// ZPM Moon

	// [PORT] ad_astra отсутствует в сборке 1.21.1; [PORT-Ф2] tfg:cryogenized_fluix
	// event.recipes.gtceu.assembly_line('extendedae:oversize_interface_zpm_moon')
	// 	.itemInputs(
	// 		'8x #extendedae:extended_interface',
	// 		'4x megacells:accumulation_processor',
	// 		'gtceu:zpm_robot_arm',
	// 		'gtceu:zpm_fluid_regulator',
	// 		'4x #c:dense_plates/naquadah_alloy',
	// 		'#gtceu:circuits/uv')
	// 	.inputFluids(Fluid.of('tfg:cryogenized_fluix', 144 * 18))
	// 	.itemOutputs("16x extendedae:oversize_interface")
	// 	.duration(300)
	// 	.EUt(GTValues.VA[GTValues.ZPM])
	// 	.dimension('ad_astra:moon')

	//#endregion

	//#region Ext Pattern Provider

	// IV

	// [PORT-Ф2] tfg:fluix — кастомный GT-материал TFG, ещё не портирован
	// event.recipes.gtceu.assembler('tfg:ex_pattern_provider_iv')
	// 	.itemInputs(
	// 		'gtceu:iv_robot_arm',
	// 		'8x gtceu:laminated_glass',
	// 		'4x #c:plates/tungsten_steel',
	// 		'4x ae2:annihilation_core',
	// 		'4x ae2:formation_core',
	// 		'2x megacells:accumulation_processor',
	// 		'2x #ae2:pattern_provider')
	// 	.inputFluids(Fluid.of('tfg:fluix', 144 * 8))
	// 	.itemOutputs('extendedae:ex_pattern_provider')
	// 	.duration(300)
	// 	.EUt(GTValues.VA[GTValues.IV])
	// 	.cleanroom(CleanroomType.CLEANROOM)
	// 	.circuit(1)

	// IV Moon Only

	// [PORT] ad_astra отсутствует в сборке 1.21.1; [PORT-Ф2] tfg:cryogenized_fluix
	// event.recipes.gtceu.assembler('tfg:ex_pattern_provider_iv_moon')
	// 	.itemInputs(
	// 		'gtceu:iv_robot_arm',
	// 		'8x gtceu:laminated_glass',
	// 		'4x #c:plates/tungsten_steel',
	// 		'4x ae2:annihilation_core',
	// 		'4x ae2:formation_core',
	// 		'2x megacells:accumulation_processor',
	// 		'2x #ae2:pattern_provider')
	// 	.inputFluids(Fluid.of('tfg:cryogenized_fluix', 144 * 8))
	// 	.itemOutputs('2x extendedae:ex_pattern_provider')
	// 	.duration(300)
	// 	.EUt(GTValues.VA[GTValues.IV])
	// 	.dimension('ad_astra:moon')
	// 	.circuit(1)

	// ZPM

	// [PORT-Ф2] tfg:fluix — кастомный GT-материал TFG, ещё не портирован
	// event.recipes.gtceu.assembler('tfg:ex_pattern_provider_zpm')
	// 	.itemInputs(
	// 		'gtceu:zpm_robot_arm',
	// 		'8x gtceu:laminated_glass',
	// 		'4x #c:plates/naquadah_alloy',
	// 		'16x ae2:annihilation_core',
	// 		'16x ae2:formation_core',
	// 		'8x megacells:accumulation_processor',
	// 		'16x #ae2:pattern_provider')
	// 	.inputFluids(Fluid.of('tfg:fluix', 144 * 32))
	// 	.itemOutputs('16x extendedae:ex_pattern_provider')
	// 	.duration(300)
	// 	.EUt(GTValues.VA[GTValues.ZPM])
	// 	.cleanroom(CleanroomType.CLEANROOM)
	// 	.circuit(1)

	// ZPM Moon Only

	// [PORT] ad_astra отсутствует в сборке 1.21.1; [PORT-Ф2] tfg:cryogenized_fluix
	// event.recipes.gtceu.assembler('tfg:ex_pattern_provider_zpm_moon')
	// 	.itemInputs(
	// 		'gtceu:zpm_robot_arm',
	// 		'8x gtceu:laminated_glass',
	// 		'4x #c:plates/naquadah_alloy',
	// 		'16x ae2:annihilation_core',
	// 		'16x ae2:formation_core',
	// 		'8x megacells:accumulation_processor',
	// 		'16x #ae2:pattern_provider')
	// 	.inputFluids(Fluid.of('tfg:cryogenized_fluix', 144 * 32))
	// 	.itemOutputs('32x extendedae:ex_pattern_provider')
	// 	.duration(300)
	// 	.EUt(GTValues.VA[GTValues.ZPM])
	// 	.dimension('ad_astra:moon')
	// 	.circuit(1)

	// Pattern Provider Upgrade

	// IV

	// [PORT-Ф2] tfg:fluix — кастомный GT-материал TFG, ещё не портирован
	// event.recipes.gtceu.assembler('extendedae:pattern_provider_upgrade_iv')
	// 	.itemInputs(
	// 		'gtceu:iv_robot_arm',
	// 		'8x gtceu:laminated_glass',
	// 		'4x #c:plates/tungsten_steel',
	// 		'4x ae2:annihilation_core',
	// 		'4x ae2:formation_core',
	// 		'2x megacells:accumulation_processor',
	// 		'1x #ae2:pattern_provider')
	// 	.inputFluids(Fluid.of('tfg:fluix', 144 * 8))
	// 	.itemOutputs('extendedae:pattern_provider_upgrade')
	// 	.duration(300)
	// 	.EUt(GTValues.VA[GTValues.IV])
	// 	.cleanroom(CleanroomType.CLEANROOM)
	// 	.circuit(2)

	// IV Moon Only

	// [PORT] ad_astra отсутствует в сборке 1.21.1; [PORT-Ф2] tfg:cryogenized_fluix
	// event.recipes.gtceu.assembler('extendedae:pattern_provider_upgrade_iv_moon')
	// 	.itemInputs(
	// 		'gtceu:iv_robot_arm',
	// 		'8x gtceu:laminated_glass',
	// 		'4x #c:plates/tungsten_steel',
	// 		'4x ae2:annihilation_core',
	// 		'4x ae2:formation_core',
	// 		'2x megacells:accumulation_processor')
	// 	.inputFluids(Fluid.of('tfg:cryogenized_fluix', 144 * 8))
	// 	.itemOutputs('2x extendedae:pattern_provider_upgrade')
	// 	.duration(300)
	// 	.EUt(GTValues.VA[GTValues.IV])
	// 	.dimension('ad_astra:moon')
	// 	.circuit(2)

	// ZPM

	// [PORT-Ф2] tfg:fluix — кастомный GT-материал TFG, ещё не портирован
	// event.recipes.gtceu.assembler('extendedae:pattern_provider_upgrade_zpm')
	// 	.itemInputs(
	// 		'gtceu:zpm_robot_arm',
	// 		'8x gtceu:laminated_glass',
	// 		'4x #c:plates/naquadah_alloy',
	// 		'16x ae2:annihilation_core',
	// 		'16x ae2:formation_core',
	// 		'8x megacells:accumulation_processor',
	// 		'8x #ae2:pattern_provider')
	// 	.inputFluids(Fluid.of('tfg:fluix', 144 * 32))
	// 	.itemOutputs('16x extendedae:pattern_provider_upgrade')
	// 	.duration(300)
	// 	.EUt(GTValues.VA[GTValues.ZPM])
	// 	.cleanroom(CleanroomType.CLEANROOM)
	// 	.circuit(2)

	// ZPM Moon Only

	// [PORT] ad_astra отсутствует в сборке 1.21.1; [PORT-Ф2] tfg:cryogenized_fluix
	// event.recipes.gtceu.assembler('extendedae:pattern_provider_upgrade_zpm_moon')
	// 	.itemInputs(
	// 		'gtceu:zpm_robot_arm',
	// 		'8x gtceu:laminated_glass',
	// 		'4x #c:plates/naquadah_alloy',
	// 		'16x ae2:annihilation_core',
	// 		'16x ae2:formation_core',
	// 		'8x megacells:accumulation_processor')
	// 	.inputFluids(Fluid.of('tfg:cryogenized_fluix', 144 * 32))
	// 	.itemOutputs('32x extendedae:pattern_provider_upgrade')
	// 	.duration(300)
	// 	.EUt(GTValues.VA[GTValues.ZPM])
	// 	.dimension('ad_astra:moon')
	// 	.circuit(2)

	//#endregion

	//#region bus

	//ex import bus part
	event.recipes.gtceu.assembler('extendedae:ex_import_bus_part')
		.itemInputs(
			'1x #c:plates/stainless_steel', // [PORT] forge: -> c:
			'2x ae2:annihilation_core',
			'2x gtceu:hv_robot_arm',
			'1x megacells:accumulation_processor')
		.inputFluids(Fluid.of('gtceu:polyvinyl_chloride', 144))
		.itemOutputs('extendedae:ex_import_bus_part')
		.circuit(2)
		.duration(200)
		.EUt(GTValues.VA[GTValues.HV])
		.addMaterialInfo(true, true)

	//ex export bus part
	event.recipes.gtceu.assembler('extendedae:ex_export_bus_part')
		.itemInputs(
			'1x #c:plates/stainless_steel', // [PORT] forge: -> c:
			'2x ae2:formation_core',
			'2x gtceu:hv_robot_arm',
			'1x megacells:accumulation_processor')
		.inputFluids(Fluid.of('gtceu:polyvinyl_chloride', 144))
		.itemOutputs('extendedae:ex_export_bus_part')
		.circuit(3)
		.duration(200)
		.EUt(GTValues.VA[GTValues.HV])
		.addMaterialInfo(true, true)

	//tag export bus
	event.recipes.gtceu.assembler('extendedae:tag_export_bus')
		.itemInputs(
			'ae2:export_bus',
			'2x ae2:logic_processor',
			'#gtceu:circuits/ulv')
		.itemOutputs('extendedae:tag_export_bus')
		.duration(100)
		.EUt(480)
		.addMaterialInfo(true)

	//tag storage bus
	event.recipes.gtceu.assembler('extendedae:tag_storage_bus')
		.itemInputs(
			'ae2:storage_bus',
			'2x ae2:logic_processor',
			'#gtceu:circuits/ulv')
		.itemOutputs('extendedae:tag_storage_bus')
		.duration(100)
		.EUt(480)
		.addMaterialInfo(true)

	//mod export bus
	event.recipes.gtceu.assembler('extendedae:mod_export_bus')
		.itemInputs(
			'ae2:export_bus',
			'2x ae2:calculation_processor',
			'#gtceu:circuits/ulv')
		.itemOutputs('extendedae:mod_export_bus')
		.duration(100)
		.EUt(480)
		.addMaterialInfo(true)

	//mod storage bus
	event.recipes.gtceu.assembler('extendedae:mod_storage_bus')
		.itemInputs(
			'ae2:storage_bus',
			'2x ae2:calculation_processor',
			'#gtceu:circuits/ulv')
		.itemOutputs('extendedae:mod_storage_bus')
		.duration(100)
		.EUt(480)
		.addMaterialInfo(true)

	//precise export bus
	event.recipes.gtceu.assembler('extendedae:precise_export_bus')
		.itemInputs(
			'ae2:export_bus',
			'2x ae2:engineering_processor',
			'#gtceu:circuits/ulv')
		.itemOutputs('extendedae:precise_export_bus')
		.duration(100)
		.EUt(480)
		.addMaterialInfo(true)

	//precise storage bus
	event.recipes.gtceu.assembler('extendedae:precise_storage_bus')
		.itemInputs(
			'ae2:storage_bus',
			'2x ae2:engineering_processor',
			'#gtceu:circuits/ulv')
		.itemOutputs('extendedae:precise_storage_bus')
		.duration(100)
		.EUt(480)
		.addMaterialInfo(true)

	//threshold export bus
	event.recipes.gtceu.assembler('extendedae:threshold_export_bus')
		.itemInputs(
			'ae2:export_bus',
			'2x ae2:logic_processor',
			'ae2:level_emitter')
		.itemOutputs('extendedae:threshold_export_bus')
		.duration(100)
		.EUt(480)
		.addMaterialInfo(true)

	//#endregion

	//active formation plane
	event.recipes.gtceu.assembler('extendedae:active_formation_plane')
		.itemInputs(
			'ae2:formation_plane',
			'ae2:export_bus',
			'2x ae2:engineering_processor')
		.itemOutputs('extendedae:active_formation_plane')
		.duration(100)
		.EUt(480)
		.addMaterialInfo(true)

	//pattern modifier
	event.recipes.gtceu.assembler('extendedae:pattern_modifier')
		.itemInputs(
			'ae2:blank_pattern',
			'ae2:logic_processor')
		.inputFluids(Fluid.of('tfc:green_dye', 144))
		.itemOutputs('extendedae:pattern_modifier')
		.duration(100)
		.EUt(480)
		.addMaterialInfo(true)

	//threshold level emitter
	event.recipes.gtceu.assembler('extendedae:threshold_level_emitter')
		.itemInputs(
			'ae2:level_emitter',
			'2x minecraft:redstone_torch',
			'2x ae2:calculation_processor')
		.itemOutputs('extendedae:threshold_level_emitter')
		.duration(100)
		.EUt(480)
		.addMaterialInfo(true)

	//wireless tool
	event.recipes.gtceu.assembler('extendedae:wireless_tool')
		.itemInputs(
			'3x #c:plates/steel', // [PORT] forge: -> c:
			'#gtceu:circuits/ev',
			'2x gtceu:ev_emitter',
			'2x ae2:wireless_receiver',
			'ae2:calculation_processor')
		.itemOutputs('extendedae:wireless_tool')
		.duration(100)
		.EUt(1920)

	//wireless tool
	event.recipes.gtceu.assembler('extendedae:wireless_connect')
		.itemInputs(
			'2x gtceu:iv_machine_casing',
			'4x #gtceu:circuits/iv',
			'8x ae2:wireless_receiver',
			'4x gtceu:iv_emitter',
			'4x gtceu:iv_sensor',
			'8x ae2:engineering_processor',
			'4x megacells:accumulation_processor')
		.itemOutputs('2x extendedae:wireless_connect')
		.duration(200)
		.EUt(7580)
		.addMaterialInfo(true)

	//me packing tape
	event.recipes.gtceu.assembler('extendedae:me_packing_tape')
		.itemInputs(
			'4x #c:dusts/fluix', // [PORT] forge: -> c:
			'2x #c:plates/paper') // [PORT] forge: -> c:
		.inputFluids(Fluid.of('gtceu:glue', 144))
		.itemOutputs('extendedae:me_packing_tape') // [PORT] NBT {Damage:0} убран — в 1.21 урон 0 по умолчанию (data components)
		.duration(100)
		.EUt(GTValues.VA[GTValues.MV])

	//ex pattern access
	event.recipes.gtceu.assembler('extendedae:ex_pattern_access_part')
		.itemInputs(
			'ae2:pattern_access_terminal',
			Item.of('ae2:engineering_processor', 4),
			'2x megacells:accumulation_processor')
		.itemOutputs('extendedae:ex_pattern_access_part')
		.duration(100)
		.EUt(GTValues.VA[GTValues.EV])

	event.recipes.gtceu.assembler('extendedae:pattern_terminal_upgrade')
		.itemInputs(
			'4x ae2:calculation_processor',
			'2x megacells:accumulation_processor')
		.itemOutputs('extendedae:pattern_terminal_upgrade')
		.duration(100)
		.circuit(2)
		.EUt(GTValues.VA[GTValues.EV])

	// Wireless Crafting Terminal
	event.recipes.gtceu.assembler('extendedae:wireless_ex_pat')
		.itemInputs(
			'2x gtceu:lapotronic_energy_orb',
			'2x gtceu:iv_sensor',
			'gtceu:iv_emitter',
			'2x #c:rods/iridium', // [PORT] forge: -> c:
			'ae2:wireless_terminal',
			'extendedae:ex_pattern_access_part')
		.itemOutputs('extendedae:wireless_ex_pat')
		.duration(30)
		.EUt(GTValues.VA[GTValues.IV])

	// [PORT-CHECK] NBT->components needs in-game verification: рецепт копировал NBT
	// универсального терминала (ignoreNBT/withNBT/result.nbt) — в 1.21 нужны data components,
	// прямого эквивалента modifyResult-логики нет, требуется проверка в игре.
	// event.shapeless('ae2wtlib:wireless_universal_terminal', ['extendedae:wireless_ex_pat', 'ae2wtlib:wireless_universal_terminal'])
	// 	.modifyResult((grid, result) => {
	// 		let orig = grid.find(Item.of('ae2wtlib:wireless_universal_terminal').ignoreNBT())
	// 		result = result.withNBT(orig.nbt);
	//
	// 		if (orig.nbt == null) {
	// 			result.nbt = { ex_pattern_access: true };
	// 		}
	// 		else {
	// 			result.nbt.put('ex_pattern_access', true);
	// 		}
	//
	// 		return result;
	// 	})

	//#region ex molecular assembler

	// IV
	// [PORT-Ф2] tfg:fluix — кастомный GT-материал TFG, ещё не портирован
	// event.recipes.gtceu.assembler('extendedae:ex_molecular_assembler_iv')
	// 	.itemInputs(
	// 		'2x #gtceu:circuits/iv',
	// 		'8x gtceu:cleanroom_glass',
	// 		'4x ae2:annihilation_core',
	// 		'4x ae2:formation_core',
	// 		'2x gtceu:iv_robot_arm',
	// 		'ae2:molecular_assembler')
	// 	.inputFluids(Fluid.of('tfg:fluix', 144 * 4))
	// 	.itemOutputs('extendedae:ex_molecular_assembler')
	// 	.duration(200)
	// 	.EUt(GTValues.VA[GTValues.IV])
	// 	.cleanroom(CleanroomType.CLEANROOM)

	// LuV Moon
	// [PORT] ad_astra отсутствует в сборке 1.21.1; [PORT-Ф2] tfg:cryogenized_fluix
	// event.recipes.gtceu.assembler('extendedae:ex_molecular_assembler_luv')
	// 	.itemInputs(
	// 		'2x #gtceu:circuits/luv',
	// 		'8x gtceu:cleanroom_glass',
	// 		'4x ae2:annihilation_core',
	// 		'4x ae2:formation_core',
	// 		'2x gtceu:luv_robot_arm',
	// 		'2x ae2:molecular_assembler')
	// 	.inputFluids(Fluid.of('tfg:cryogenized_fluix', 144 * 4))
	// 	.itemOutputs('4x extendedae:ex_molecular_assembler')
	// 	.duration(200)
	// 	.EUt(GTValues.VA[GTValues.LuV])
	// 	.dimension('ad_astra:moon')

	// ZPM
	// [PORT-Ф2] tfg:fluix — кастомный GT-материал TFG, ещё не портирован
	// event.recipes.gtceu.assembler('extendedae:ex_molecular_assembler_zpm')
	// 	.itemInputs(
	// 		'2x #gtceu:circuits/zpm',
	// 		'8x gtceu:cleanroom_glass',
	// 		'4x ae2:annihilation_core',
	// 		'4x ae2:formation_core',
	// 		'2x gtceu:zpm_robot_arm',
	// 		'4x ae2:molecular_assembler')
	// 	.inputFluids(Fluid.of('tfg:fluix', 144 * 16))
	// 	.itemOutputs('8x extendedae:ex_molecular_assembler')
	// 	.duration(200)
	// 	.EUt(GTValues.VA[GTValues.ZPM])
	// 	.cleanroom(CleanroomType.CLEANROOM)

	//#endregion

	//ex io port
	event.recipes.gtceu.assembler('extendedae:ex_io_port')
		.itemInputs(
			'gtceu:ev_machine_casing',
			'ae2:io_port',
			'2x megacells:accumulation_processor',
			'4x ae2:logic_processor',
			'4x ae2:engineering_processor',
			'4x ae2:speed_card')
		.itemOutputs('extendedae:ex_io_port')
		.duration(200)
		.EUt(1000)
		.addMaterialInfo(true)

	event.recipes.gtceu.assembler('extendedae:ex_drive')
		.itemInputs(
			'gtceu:ev_machine_casing',
			'ae2:drive',
			'2x megacells:accumulation_processor',
			'4x ae2:logic_processor',
			'4x ae2:engineering_processor',
			'2x ae2:capacity_card')
		.itemOutputs('extendedae:ex_drive')
		.duration(200)
		.EUt(1920)
		.addMaterialInfo(true)

	event.recipes.gtceu.assembler('extendedae:drive_upgrade')
		.itemInputs(
			'gtceu:ev_machine_casing',
			'2x megacells:accumulation_processor',
			'4x ae2:logic_processor',
			'4x ae2:engineering_processor',
			'2x ae2:capacity_card')
		.itemOutputs('extendedae:drive_upgrade')
		.duration(200)
		.circuit(2)
		.EUt(1920)

	event.recipes.gtceu.assembler('extendedae:ingredient_buffer')
		.itemInputs('gtceu:hv_buffer', 'ae2:cell_component_1k')
		.itemOutputs('extendedae:ingredient_buffer')
		.duration(200)
		.EUt(1920)
		.addMaterialInfo(true)

	//#endregion

	//#region Matrix

	//Frame

	// [PORT-Ф2] tfg:fluix — кастомный GT-материал TFG, ещё не портирован
	// event.recipes.gtceu.assembly_line('extendedae:assembler_matrix_frame')
	// 	.itemInputs(
	// 		'4x gtceu:plascrete',
	// 		'4x gtceu:luv_machine_casing',
	// 		'1x #gtceu:circuits/iv',
	// 		'4x ae2:logic_processor',
	// 		'4x megacells:accumulation_processor',
	// 		'16x #c:rods/niobium_nitride',
	// 		'1x extendedae:ex_molecular_assembler')
	// 	.inputFluids(
	// 		Fluid.of("gtceu:concrete", 144 * 8),
	// 		Fluid.of('tfg:fluix', 144 * 16))
	// 	.itemOutputs('extendedae:assembler_matrix_frame')
	// 	.duration(2000)
	// 	.EUt(GTValues.VA[GTValues.LuV])
	// 	.cleanroom(CleanroomType.CLEANROOM)

	// [PORT] ad_astra отсутствует в сборке 1.21.1; [PORT-Ф2] tfg:cryogenized_fluix
	// event.recipes.gtceu.assembly_line('extendedae:assembler_matrix_frame_moon')
	// 	.itemInputs(
	// 		'8x gtceu:plascrete',
	// 		'8x gtceu:iv_machine_casing',
	// 		'1x #gtceu:circuits/iv',
	// 		'4x ae2:logic_processor',
	// 		'4x megacells:accumulation_processor',
	// 		'16x #c:rods/niobium_nitride',
	// 		'4x extendedae:ex_molecular_assembler')
	// 	.inputFluids(
	// 		Fluid.of('gtceu:concrete', 144 * 8),
	// 		Fluid.of('tfg:cryogenized_fluix', 144 * 16))
	// 	.itemOutputs('8x extendedae:assembler_matrix_frame')
	// 	.duration(2000)
	// 	.EUt(GTValues.VA[GTValues.IV])
	// 	.dimension('ad_astra:moon')

	//Matrix Wall

	event.recipes.gtceu.assembler('extendedae:assembler_matrix_wall_luv')
		.itemInputs(
			'#c:frames/polytetrafluoroethylene', // [PORT] forge: -> c:
			'gtceu:plascrete',
			'6x gtceu:polytetrafluoroethylene_plate')
		.inputFluids(
			Fluid.of('gtceu:concrete', 144 * 4))
		.itemOutputs('extendedae:assembler_matrix_wall')
		.duration(800)
		.EUt(GTValues.VA[GTValues.IV])
		.addMaterialInfo(true, true)

	//Matrix Glass

	event.recipes.gtceu.assembler("extendedae:assembler_matrix_glass")
		.itemInputs(
			'#c:frames/polytetrafluoroethylene', // [PORT] forge: -> c:
			'gtceu:cleanroom_glass',
			'6x gtceu:polytetrafluoroethylene_plate')
		.inputFluids(
			Fluid.of('gtceu:concrete', 144 * 4))
		.itemOutputs("extendedae:assembler_matrix_glass")
		.duration(800)
		.EUt(GTValues.VA[GTValues.IV])
		.addMaterialInfo(true, true)

	//Matrix Pattern

	// [PORT-Ф2] tfg:fluix — кастомный GT-материал TFG, ещё не портирован
	// event.recipes.gtceu.assembly_line("extendedae:assembler_matrix_pattern")
	// 	.itemInputs(
	// 		'#extendedae:extended_pattern_provider',
	// 		'8x megacells:accumulation_processor',
	// 		'4x gtceu:luv_robot_arm',
	// 		'2x #c:dense_plates/rhodium_plated_palladium',
	// 		'#gtceu:circuits/zpm',
	// 		'2x #gtceu:circuits/luv')
	// 	.inputFluids(
	// 		Fluid.of('tfg:fluix', 144 * 16),
	// 		Fluid.of('gtceu:polybenzimidazole', 1430))
	// 	.itemOutputs('extendedae:assembler_matrix_pattern')
	// 	.duration(20 * 30)
	// 	.EUt(GTValues.VA[GTValues.LuV])
	// 	.cleanroom(CleanroomType.CLEANROOM)

	// [PORT] ad_astra отсутствует в сборке 1.21.1; [PORT-Ф2] tfg:cryogenized_fluix
	// event.recipes.gtceu.assembly_line("extendedae:assembler_matrix_pattern_moon")
	// 	.itemInputs(
	// 		'2x #extendedae:extended_pattern_provider',
	// 		'8x megacells:accumulation_processor',
	// 		'4x gtceu:iv_robot_arm',
	// 		'2x #c:dense_plates/tungsten_steel',
	// 		'#gtceu:circuits/luv',
	// 		'2x #gtceu:circuits/iv')
	// 	.inputFluids(
	// 		Fluid.of('tfg:cryogenized_fluix', 144 * 8),
	// 		Fluid.of('gtceu:polybenzimidazole', 1430))
	// 	.itemOutputs('2x extendedae:assembler_matrix_pattern')
	// 	.duration(20 * 30)
	// 	.EUt(GTValues.VA[GTValues.IV])
	// 	.dimension('ad_astra:moon')

	//Matrix Crafter

	// [PORT-Ф2] tfg:fluix — кастомный GT-материал TFG, ещё не портирован
	// event.recipes.gtceu.assembly_line("extendedae:assembler_matrix_crafter")
	// 	.itemInputs(
	// 		"#extendedae:oversize_interface",
	// 		'8x megacells:accumulation_processor',
	// 		'4x gtceu:luv_field_generator',
	// 		'2x #c:dense_plates/rhodium_plated_palladium',
	// 		'#gtceu:circuits/zpm',
	// 		'2x #gtceu:circuits/luv')
	// 	.inputFluids(
	// 		Fluid.of('tfg:fluix', 144 * 16),
	// 		Fluid.of('gtceu:polybenzimidazole', 1430))
	// 	.itemOutputs('extendedae:assembler_matrix_crafter')
	// 	.duration(20 * 30)
	// 	.EUt(GTValues.VA[GTValues.LuV])
	// 	.cleanroom(CleanroomType.CLEANROOM)

	// [PORT] ad_astra отсутствует в сборке 1.21.1; [PORT-Ф2] tfg:cryogenized_fluix
	// event.recipes.gtceu.assembly_line("extendedae:assembler_matrix_crafter_moon")
	// 	.itemInputs(
	// 		"2x #extendedae:oversize_interface",
	// 		'8x megacells:accumulation_processor',
	// 		'4x gtceu:iv_field_generator',
	// 		'2x #c:dense_plates/tungsten_steel',
	// 		'#gtceu:circuits/luv',
	// 		'2x #gtceu:circuits/iv')
	// 	.inputFluids(
	// 		Fluid.of('tfg:cryogenized_fluix', 144 * 8),
	// 		Fluid.of('gtceu:polybenzimidazole', 1430))
	// 	.itemOutputs('2x extendedae:assembler_matrix_crafter')
	// 	.duration(20 * 30)
	// 	.EUt(GTValues.VA[GTValues.IV])
	// 	.dimension('ad_astra:moon')

	//Matrix Speed

	// [PORT-Ф2] tfg:fluix — кастомный GT-материал TFG, ещё не портирован
	// event.recipes.gtceu.assembly_line("extendedae:assembler_matrix_speed_luv")
	// 	.itemInputs(
	// 		"megacells:mega_crafting_accelerator",
	// 		'8x megacells:accumulation_processor',
	// 		'4x gtceu:luv_conveyor_module',
	// 		'2x #c:dense_plates/rhodium_plated_palladium',
	// 		'#gtceu:circuits/zpm',
	// 		'2x #gtceu:circuits/luv')
	// 	.inputFluids(
	// 		Fluid.of('tfg:fluix', 144 * 16),
	// 		Fluid.of('gtceu:polybenzimidazole', 1430))
	// 	.itemOutputs('extendedae:assembler_matrix_speed')
	// 	.duration(20 * 30)
	// 	.EUt(GTValues.VA[GTValues.LuV])
	// 	.cleanroom(CleanroomType.CLEANROOM)

	// [PORT] ad_astra отсутствует в сборке 1.21.1; [PORT-Ф2] tfg:cryogenized_fluix
	// event.recipes.gtceu.assembly_line("extendedae:assembler_matrix_speed_zpm")
	// 	.itemInputs(
	// 		"2x megacells:mega_crafting_accelerator",
	// 		'8x megacells:accumulation_processor',
	// 		'4x gtceu:iv_conveyor_module',
	// 		'2x #c:dense_plates/tungsten_steel',
	// 		'#gtceu:circuits/luv',
	// 		'2x #gtceu:circuits/iv')
	// 	.inputFluids(
	// 		Fluid.of('tfg:cryogenized_fluix', 144 * 8),
	// 		Fluid.of('gtceu:polybenzimidazole', 1430))
	// 	.itemOutputs('2x extendedae:assembler_matrix_speed')
	// 	.duration(20 * 30)
	// 	.EUt(GTValues.VA[GTValues.IV])
	// 	.dimension('ad_astra:moon')

	event.shaped('extendedae:fishbig', [
		'CCC',
		'CFC',
		'CCC'
	], {
		C: '#tfc:sewing_light_cloth',
		F: '#minecraft:fishes'
	}).id('tfg:shaped/fishbig')

	//#endregion

})
