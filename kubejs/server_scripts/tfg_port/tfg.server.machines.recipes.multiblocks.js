// priority: 0
"use strict";

// [PORT] Порт tfg/machines/recipes.multiblocks.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT-Ф7] Все мультиблоки TFG (tfg:electric_greenhouse, tfg:steam_*, tfg:ostrum_linear_accelerator,
//   tfg:heat_battery_mk1, gtceu:ostrum_harvester, gtceu:moon_dust_harvester, tfg:evaporation_tower,
//   tfg:smr_generator, gtceu:nuclear_fuel_factory, tfg:heat_exchanger, tfg:nuclear_turbine,
//   gtceu:coal_liquefaction_tower, tfg:high_temp_precision_fabricator, tfg:active_power_transformer,
//   tfg:large_*_boiler, tfg:large_steam_turbine, tfg:gas_well, tfg:pastoral_engine, tfg:ore_processing_beneath)
//   не зарегистрированы: registerGTCEuMachines не портирован (Ф7, апстрим-баг GTM8) — их рецепты закомментированы.
// [PORT] deafission (fission_reactor_*) отсутствует в сборке; tfcgroomer отсутствует; beneath отсутствует.
// [PORT] Активны: рецепты стоковых gtceu:multi_smelter / gtceu:electric_blast_furnace и замена плит
//   в кейсинге паровой турбины.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.machines recipes.multiblocks start')

	// Multi-Smelter
	event.shaped('gtceu:multi_smelter', [
		'AAA',
		'BCB',
		'DBD'
	], {
		A: 'gtceu:hp_steam_furnace',
		B: '#gtceu:circuits/hv',
		C: 'gtceu:heatproof_machine_casing',
		D: 'gtceu:copper_single_cable'
	}).id('gtceu:shaped/multi_furnace')

	event.shaped('gtceu:multi_smelter', [
		'AAA',
		'BCB',
		'DBD'
	], {
		A: 'gtceu:lv_electric_furnace',
		B: '#gtceu:circuits/hv',
		C: 'gtceu:heatproof_machine_casing',
		D: 'gtceu:copper_single_cable'
	}).id('gtceu:shaped/multi_furnace2')

	// Electric Blast Furnace
	event.shaped('gtceu:electric_blast_furnace', [
		'AAA',
		'BCB',
		'DBD'
	], {
		A: 'gtceu:hp_steam_furnace',
		B: '#gtceu:circuits/lv',
		C: 'gtceu:heatproof_machine_casing',
		D: 'gtceu:tin_single_cable'
	}).id('gtceu:shaped/electric_blast_furnace')

	event.shaped('gtceu:electric_blast_furnace', [
		'AAA',
		'BCB',
		'DBD'
	], {
		A: 'gtceu:lv_electric_furnace',
		B: '#gtceu:circuits/lv',
		C: 'gtceu:heatproof_machine_casing',
		D: 'gtceu:tin_single_cable'
	}).id('gtceu:shaped/electric_blast_furnace2')

	// TFG customs
	// [PORT-Ф7] tfg:electric_greenhouse не зарегистрирован
	// event.recipes.gtceu.shaped('tfg:electric_greenhouse', [
	// 	'ABA',
	// 	'CDC',
	// 	'BCB'
	// ], {
	// 	A: '#gtceu:circuits/mv',
	// 	B: '#c:single_cables/copper',
	// 	C: 'tfc:compost',
	// 	D: 'gtceu:steel_machine_casing'
	// }).addMaterialInfo().id('tfg:shaped/electric_greenhouse')

	// [PORT-Ф7] tfg:steam_bloomery не зарегистрирован
	// event.recipes.gtceu.shaped('tfg:steam_bloomery', [
	// 	'CEC',
	// 	'DAD',
	// 	'CBC'
	// ], {
	// 	A: 'tfc:bloomery',
	// 	B: '#c:frames/bronze',
	// 	C: '#c:rods/black_steel',
	// 	D: '#c:screws/wrought_iron',
	// 	E: '#c:tools/wrench'
	// }).addMaterialInfo().id('tfg:shaped/steam_bloomery')

	// [PORT-Ф7] tfg:steam_thermal_centrifuge не зарегистрирован
	// event.recipes.gtceu.shaped('tfg:steam_thermal_centrifuge', [
	// 	'ACA',
	// 	'DBD',
	// 	'ACA'
	// ], {
	// 	A: '#c:plates/brass',
	// 	B: 'create:steam_engine',
	// 	C: ChemicalHelper.get(TagPrefix.gear, GTMaterials.Invar, 1),
	// 	D: '#gtceu:circuits/lv'
	// }).addMaterialInfo().id('tfg:shaped/steam_thermal_centrifuge')

	// [PORT-Ф7] tfg:steam_fuser не зарегистрирован
	// event.recipes.gtceu.shaped('tfg:steam_fuser', [
	// 	'ABA',
	// 	'ACA',
	// 	'ABA'
	// ], {
	// 	A: '#c:plates/bronze',
	// 	B: 'gtceu:potin_large_fluid_pipe',
	// 	C: 'gtceu:hp_steam_alloy_smelter'
	// }).addMaterialInfo().id('gtceu:shaped/steam_fuser')

	// [PORT-Ф7] tfg:steam_squasher не зарегистрирован
	// event.recipes.gtceu.shaped('tfg:steam_squasher', [
	// 	'ABA',
	// 	'ACA',
	// 	'ABA'
	// ], {
	// 	A: '#c:plates/bronze',
	// 	B: 'gtceu:potin_large_fluid_pipe',
	// 	C: 'gtceu:hp_steam_compressor'
	// }).addMaterialInfo().id('gtceu:shaped/steam_squasher')

	// [PORT-Ф7] tfg:steam_presser не зарегистрирован
	// event.recipes.gtceu.shaped('tfg:steam_presser', [
	// 	'ADA',
	// 	'ACA',
	// 	'ABA'
	// ], {
	// 	A: '#c:plates/bronze',
	// 	B: 'tfc:metal/anvil/steel',
	// 	C: 'gtceu:hp_steam_forge_hammer',
	// 	D: 'gtceu:potin_large_fluid_pipe'
	// }).addMaterialInfo().id('gtceu:shaped/steam_presser')

	// [PORT-Ф7] tfg:ostrum_linear_accelerator не зарегистрирован; [PORT-Ф2] stellite_100 — материал TFG
	// event.recipes.gtceu.shaped('tfg:ostrum_linear_accelerator', [
	// 	'USU',
	// 	'WZW',
	// 	'PTP'
	// ], {
	// 	S: 'tfg:casings/machine_casing_vacuum_engine_intake',
	// 	Z: 'gtceu:ev_machine_hull',
	// 	W: '#gtceu:circuits/ev',
	// 	U: '#c:double_plates/stellite_100',
	// 	T: '#c:single_cables/aluminium',
	// 	P: 'gtceu:ev_electric_pump'
	// }).addMaterialInfo().id('tfg:shaped/ostrum_linear_accelerator')

	// [PORT-Ф7] tfg:heat_battery_mk1 и tfg:casings/heat_pipe_casing не зарегистрированы
	// event.recipes.gtceu.shaped('tfg:heat_battery_mk1', [
	// 	'USU',
	// 	'WZW',
	// 	'PTP'
	// ], {
	// 	S: 'tfg:casings/heat_pipe_casing',
	// 	Z: 'gtceu:ev_machine_hull',
	// 	W: '#gtceu:circuits/ev',
	// 	U: '#c:dense_plates/silicon',
	// 	T: '#c:single_cables/aluminium',
	// 	P: 'gtceu:hv_field_generator'
	// }).addMaterialInfo().id('tfg:shaped/heat_battery_mk1')

	// [PORT-Ф7] gtceu:ostrum_harvester (машина TFG) не зарегистрирован; [PORT-Ф2] desh — материал космо
	// event.recipes.gtceu.assembler('tfg:ostrum_harvester')
	// 	.itemInputs(
	// 		'1x gtceu:ev_machine_hull',
	// 		'4x #gtceu:circuits/ev',
	// 		'4x gtceu:ev_electric_motor',
	// 		'4x #c:rotors/black_steel',
	// 		'4x gtceu:ev_electric_pump',
	// 		'4x #c:gears/desh')
	// 	.itemOutputs('gtceu:ostrum_harvester')
	// 	.duration(400)
	// 	.EUt(GTValues.VA[GTValues.EV])
	// 	.circuit(2)

	// [PORT-Ф7] gtceu:moon_dust_harvester (машина TFG) не зарегистрирован; [PORT-Ф2] rocket_alloy_t1
	// event.recipes.gtceu.assembler('tfg:moon_dust_harvester')
	// 	.itemInputs(
	// 		'1x gtceu:hv_machine_hull',
	// 		'4x #gtceu:circuits/hv',
	// 		'4x gtceu:hv_electric_motor',
	// 		'4x #c:rotors/titanium',
	// 		'4x gtceu:hv_electric_pump',
	// 		'4x #c:gears/rocket_alloy_t1')
	// 	.itemOutputs('gtceu:moon_dust_harvester')
	// 	.duration(400)
	// 	.EUt(GTValues.VA[GTValues.HV])
	// 	.circuit(2)

	// [PORT-Ф7] tfg:evaporation_tower не зарегистрирован
	// event.recipes.gtceu.shaped('tfg:evaporation_tower', [
	// 	'TUT',
	// 	'WZW',
	// 	'TUT'
	// ], {
	// 	T: '#gtceu:circuits/iv',
	// 	W: 'gtceu:ev_electric_pump',
	// 	U: '#c:double_wires/nichrome',
	// 	Z: 'gtceu:ev_machine_hull'
	// }).addMaterialInfo().id('tfg:shaped/evaporation_tower')

	// [PORT] deafission отсутствует в сборке 1.21.1
	// event.recipes.gtceu.shaped('deafission:fission_reactor_mk1', [
	// 	'TUT',
	// 	'WZW',
	// 	'TUT'
	// ], {
	// 	T: 'gtceu:atomic_casing',
	// 	W: '#gtceu:circuits/ev',
	// 	U: 'gtceu:hv_field_generator',
	// 	Z: 'gtceu:ev_machine_hull'
	// }).addMaterialInfo().id('tfg:shaped/fission_reactor_mk1')

	// event.recipes.gtceu.shaped('deafission:fission_reactor_smr1', [
	// 	'TUT',
	// 	'WZW',
	// 	'TUT'
	// ], {
	// 	T: 'gtceu:atomic_casing',
	// 	W: '#gtceu:circuits/iv',
	// 	U: 'gtceu:ev_field_generator',
	// 	Z: 'gtceu:iv_machine_hull'
	// }).addMaterialInfo().id('tfg:shaped/fission_reactor_smr1')

	// [PORT-Ф7] tfg:smr_generator и tfg:casings/machine_casing_desh_ptfe не зарегистрированы
	// event.recipes.gtceu.shaped('tfg:smr_generator', [
	// 	'TUT',
	// 	'WZW',
	// 	'TUT'
	// ], {
	// 	T: 'tfg:casings/machine_casing_desh_ptfe',
	// 	W: '#gtceu:circuits/iv',
	// 	U: 'gtceu:ev_field_generator',
	// 	Z: 'gtceu:iv_machine_hull'
	// }).addMaterialInfo().id('tfg:shaped/smr_generator')

	// [PORT-Ф7] gtceu:nuclear_fuel_factory (машина TFG) не зарегистрирован
	// event.recipes.gtceu.shaped('gtceu:nuclear_fuel_factory', [
	// 	'TUT',
	// 	'WZW',
	// 	'TBT'
	// ], {
	// 	T: 'gtceu:atomic_casing',
	// 	W: '#gtceu:circuits/ev',
	// 	U: 'gtceu:ev_emitter',
	// 	Z: 'gtceu:ev_machine_hull',
	// 	B: 'gtceu:ev_robot_arm'
	// }).addMaterialInfo().id('tfg:shaped/nuclear_fuel_factory')

	// [PORT-Ф7] tfg:heat_exchanger не зарегистрирован; [PORT-Ф2] ostrum_iodide — материал TFG
	// event.recipes.gtceu.shaped('tfg:heat_exchanger', [
	// 	'TUT',
	// 	'WZW',
	// 	'GBG'
	// ], {
	// 	T: 'gtceu:high_temperature_smelting_casing',
	// 	W: '#gtceu:circuits/ev',
	// 	U: 'gtceu:ev_sensor',
	// 	Z: 'gtceu:ev_machine_hull',
	// 	B: 'gtceu:ev_fluid_regulator',
	// 	G: '#c:gears/ostrum_iodide'
	// }).addMaterialInfo().id('tfg:shaped/heat_exchanger')

	// [PORT-Ф7] tfg:nuclear_turbine не зарегистрирован; [PORT-Ф2] gears/magnalium — TFG-флаг
	// event.recipes.gtceu.shaped('tfg:nuclear_turbine', [
	// 	'CTC',
	// 	'TZT',
	// 	'BTB'
	// ], {
	// 	T: '#c:gears/magnalium',
	// 	Z: 'gtceu:ev_machine_hull',
	// 	B: 'gtceu:ultimet_large_item_pipe',
	// 	C: '#gtceu:circuits/ev'
	// }).addMaterialInfo().id('tfg:shaped/nuclear_turbine')

	// [PORT-Ф7] gtceu:coal_liquefaction_tower (машина TFG) не зарегистрирован
	// event.recipes.gtceu.shaped('gtceu:coal_liquefaction_tower', [
	// 	'ABA',
	// 	'CDC',
	// 	'EFE'
	// ], {
	// 	A: '#c:double_wires/cupronickel',
	// 	B: 'gtceu:aluminium_drum',
	// 	C: '#gtceu:circuits/mv',
	// 	D: 'gtceu:mv_machine_hull',
	// 	E: 'gtceu:solid_machine_casing',
	// 	F: 'gtceu:mv_electric_piston'
	// }).addMaterialInfo().id('gtceu:shaped/coal_liquefaction_tower')

	// [PORT-Ф7] tfg:high_temp_precision_fabricator и tfg:casings/sterling_silver_casing не зарегистрированы
	// event.recipes.gtceu.shaped('tfg:high_temp_precision_fabricator', [
	// 	'BEB',
	// 	'CAC',
	// 	'DFD'
	// ], {
	// 	A: 'gtceu:mv_machine_hull',
	// 	B: 'gtceu:mv_robot_arm',
	// 	C: '#gtceu:circuits/mv',
	// 	D: '#c:double_wires/cupronickel',
	// 	E: '#c:single_cables/copper',
	// 	F: 'tfg:casings/sterling_silver_casing'
	// }).addMaterialInfo().id('tfg:shaped/high_temp_precision_fabricator')

	// [PORT-Ф7] Замена активного трансформатора отключена (tfg:active_power_transformer не зарегистрирован) —
	// стоковый gtceu:active_transformer сохраняет свои рецепты
	// event.remove({output: 'gtceu:active_transformer'})

	// event.recipes.gtceu.assembler('tfg:active_power_transformer')
	// 	.itemInputs('1x gtceu:ev_transformer_1a', '1x #gtceu:circuits/ev', '8x gtceu:uranium_triplatinum_single_wire',
	// 				'2x gtceu:mpic_chip')
	// 	.inputFluids(Fluid.of('gtceu:ostrum_iodide', 288))
	// 	.itemOutputs('tfg:active_power_transformer')
	// 	.duration(300)
	// 	.EUt(GTValues.VA[GTValues.EV])
	// 	.circuit(2)

	// Large Bronze Boiler

	// [PORT-Ф7] tfg:large_bronze_boiler не зарегистрирован
	// event.recipes.gtceu.shaped('tfg:large_bronze_boiler', [
	// 	'ABA',
	// 	'BCB',
	// 	'ABA'
	// ], {
	// 	A: '#c:quadruple_wires/tin',
	// 	B: '#gtceu:circuits/ulv',
	// 	C: Item.of('gtceu:bronze_firebox_casing')
	// }).addMaterialInfo().id('tfg:shaped/large_bronze_boiler')

	// Large Steel Boiler

	// [PORT-Ф7] tfg:large_steel_boiler не зарегистрирован
	// event.recipes.gtceu.shaped('tfg:large_steel_boiler', [
	// 	'ABA',
	// 	'BCB',
	// 	'DBD'
	// ], {
	// 	A: '#c:single_cables/copper',
	// 	B: '#gtceu:circuits/mv',
	// 	C: Item.of('gtceu:steel_firebox_casing'),
	// 	D: '#gtceu:capacitors'
	// }).addMaterialInfo().id('tfg:shaped/large_steel_boiler')

	// Large Steam Turbine

	// [PORT-Ф7] tfg:large_steam_turbine не зарегистрирован
	// event.recipes.gtceu.shaped('tfg:large_steam_turbine', [
	// 	'ABE',
	// 	'BCB',
	// 	'DBD'
	// ], {
	// 	A: Item.of('gtceu:red_steel_gear'),
	// 	B: '#gtceu:circuits/hv',
	// 	C: Item.of('gtceu:hv_machine_hull'),
	// 	D: Item.of('#c:huge_fluid_pipes/stainless_steel'),
	// 	E: Item.of('gtceu:blue_steel_gear')
	// }).addMaterialInfo().id('tfg:shaped/large_steam_turbine')

	// [PORT-GTM-REPLACE] replaceInput/Output по GT-рецептам крашится в b71dec5 (immutable CapabilityMapComponent, UOE) — включить с патченным GTM: 
	// event.replaceInput({ id: 'gtceu:shaped/casing_steel_turbine_casing'}, 'gtceu:magnalium_plate', 'gtceu:double_magnalium_plate')
	// [PORT-GTM-REPLACE] replaceInput/Output по GT-рецептам крашится в b71dec5 (immutable CapabilityMapComponent, UOE) — включить с патченным GTM: 
	// event.replaceInput({ id: 'gtceu:assembler/casing_steel_turbine'}, 'gtceu:magnalium_plate', 'gtceu:double_magnalium_plate')

	// Gas Well

	// [PORT-Ф7] tfg:gas_well не зарегистрирован
	// event.recipes.gtceu.shaped('tfg:gas_well', [
	// 	'ABA',
	// 	'BCB',
	// 	'DBD'
	// ], {
	// 	A: Item.of('gtceu:small_steel_gear'),
	// 	B: '#gtceu:circuits/ulv',
	// 	C: Item.of('gtceu:ulv_machine_hull'),
	// 	D: Item.of('#c:normal_fluid_pipes/steel')
	// }).addMaterialInfo().id('tfg:shaped/gas_well')

	// Pastoral Rancher

	// [PORT-Ф7] tfg:pastoral_engine не зарегистрирован; [PORT] tfcgroomer отсутствует в сборке
	// event.recipes.gtceu.shaped('tfg:pastoral_engine', [
	// 	'ABA',
	// 	'DCE',
	// 	'ABA'
	// ], {
	// 	A: Item.of('gtceu:copper_single_cable'),
	// 	B: '#gtceu:circuits/mv',
	// 	C: Item.of('gtceu:steel_machine_casing'),
	// 	D: Item.of('tfcgroomer:red_steel_grooming_station'),
	// 	E: Item.of('tfcgroomer:blue_steel_grooming_station')
	// }).addMaterialInfo().id('tfg:shaped/pastoral_engine')

	// Geologic Vulcanizer

	// [PORT-Ф7] tfg:ore_processing_beneath не зарегистрирован; [PORT] beneath отсутствует в сборке
	// event.recipes.gtceu.shaped('tfg:ore_processing_beneath', [
	// 	'ABC',
	// 	'DED',
	// 	'FGF'
	// ], {
	// 	A: Item.of('gtceu:lv_ore_washer'),
	// 	B: Item.of('gtceu:lv_thermal_centrifuge'),
	// 	C: Item.of('gtceu:lv_macerator'),
	// 	D: '#gtceu:circuits/lv',
	// 	E: Item.of('gtceu:industrial_steam_casing'),
	// 	F: Item.of('gtceu:bronze_normal_fluid_pipe'),
	// 	G: Item.of('gtceu:tin_single_cable')
	// }).addMaterialInfo().id('tfg:shaped/ore_processing_beneath')
})
