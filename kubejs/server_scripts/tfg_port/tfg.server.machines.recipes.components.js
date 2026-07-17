// priority: 0
"use strict";

// [PORT] Порт tfg/machines/recipes.components.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT-FIX] forge: -> c: (tools singular: c:tools/screwdriver, c:tools/wire_cutter, c:tools/hammer);
//   в createDeploying теги как {tag:...} (bare '#tag' парсится как жидкость, Ingredient.of не проходит codec);
//   vintageimprovements -> createvintageneoforged.
// [PORT-Ф4] TFGHelpers.registerMaterialInfo — хелпер Java-мода TFG, отсутствует.
// [PORT-Ф2] tritiated_water: жидкости gtceu:tritiated_water в GTM8-сборке нет (TFG-материал/флаг не
//   зарегистрирован) — nano-wafer-замена отключена вместе с удалениями стоковых рецептов.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.machines recipes.components start')

	// Electron tubes
	event.shaped('1x create:electron_tube', [
		'FAG',
		'BCB',
		'DED'
	], {
		A: 'gtceu:glass_tube',
		B: '#c:bolts/steel',
		C: 'gtceu:wood_plate',
		D: 'gtceu:red_alloy_single_wire',
		E: '#c:plates/wrought_iron',
		F: '#c:tools/screwdriver', // [PORT] forge:tools/screwdrivers -> c:tools/screwdriver
		G: '#c:tools/wire_cutter' // [PORT] forge:tools/wire_cutters -> c:tools/wire_cutter
	}).id('tfg:create/shaped/electron_tube')

	event.recipes.createSequencedAssembly([
		'2x create:electron_tube',
	], 'gtceu:wood_plate', [
		event.recipes.createDeploying('tfg:unfinished_electron_tube', ['tfg:unfinished_electron_tube', { tag: 'c:plates/wrought_iron' }]), // [PORT-FIX] {tag:...}
		event.recipes.createDeploying('tfg:unfinished_electron_tube', ['tfg:unfinished_electron_tube', 'gtceu:red_alloy_single_wire']),
		event.recipes.createDeploying('tfg:unfinished_electron_tube', ['tfg:unfinished_electron_tube', 'gtceu:red_alloy_single_wire']),
		event.recipes.createDeploying('tfg:unfinished_electron_tube', ['tfg:unfinished_electron_tube', 'gtceu:glass_tube']),
	]).transitionalItem('tfg:unfinished_electron_tube').loops(1).id('tfg:create/sequenced_assembly/electron_tube')

	event.recipes.gtceu.assembler('create:electron_tube')
		.itemInputs('#c:plates/wrought_iron', 'gtceu:glass_tube', '2x gtceu:red_alloy_single_wire')
		.itemOutputs('2x create:electron_tube')
		.duration(50)
		.EUt(7)
		.circuit(14)

	event.shaped('4x create:electron_tube', [
		'FAG',
		'DCD'
	], {
		A: 'gtceu:glass_tube',
		C: 'gtceu:plastic_circuit_board',
		D: 'gtceu:red_alloy_single_wire',
		F: '#c:tools/screwdriver',
		G: '#c:tools/wire_cutter'
	}).id('tfg:create/shaped/electron_tube2')

	event.recipes.gtceu.assembler('create:electron_tube2')
		.itemInputs('gtceu:plastic_circuit_board', 'gtceu:glass_tube', '2x gtceu:red_alloy_single_wire')
		.itemOutputs('4x create:electron_tube')
		.duration(50)
		.EUt(7)

	event.shaped('4x create:electron_tube', [
		' A ',
		' B ',
		' C '
	], {
		A: '#c:tools/screwdriver',
		B: 'gtceu:nand_chip',
		C: 'gtceu:plastic_circuit_board'
	}).id('tfg:create/shaped/electron_tube3')

	event.recipes.gtceu.assembler('create:electron_tube3')
		.itemInputs('gtceu:plastic_circuit_board', 'gtceu:nand_chip')
		.itemOutputs('4x create:electron_tube')
		.duration(50)
		.EUt(7)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:electron_tube', [GTMaterials.Air, 1])

	// Vacuum Tubes
	event.remove({ id: 'gtceu:shaped/vacuum_tube' })
	// [PORT-CHECK] id стоковых assembler-рецептов вакуумной лампы — проверить в GTM8 (no-op при отсутствии)
	// [PORT-GTM-REPLACE] replaceInput/Output по GT-рецептам крашится в b71dec5 (immutable CapabilityMapComponent, UOE) — включить с патченным GTM: 
	// event.replaceInput({ id: 'gtceu:assembler/vacuum_tube_plain' }, 'gtceu:steel_bolt', 'gtceu:resin_circuit_board')
	// [PORT-GTM-REPLACE] replaceInput/Output по GT-рецептам крашится в b71dec5 (immutable CapabilityMapComponent, UOE) — включить с патченным GTM: 
	// event.replaceInput({ id: 'gtceu:assembler/vacuum_tube_red_alloy' }, 'gtceu:steel_bolt', 'gtceu:resin_circuit_board')
	// [PORT-GTM-REPLACE] replaceInput/Output по GT-рецептам крашится в b71dec5 (immutable CapabilityMapComponent, UOE) — включить с патченным GTM: 
	// event.replaceInput({ id: 'gtceu:assembler/vacuum_tube_red_alloy_annealed' }, 'gtceu:steel_bolt', 'gtceu:resin_circuit_board')

	event.recipes.createSequencedAssembly([
		'gtceu:vacuum_tube',
	], 'gtceu:resin_circuit_board', [
		event.recipes.createDeploying('tfg:unfinished_vacuum_tube', ['tfg:unfinished_vacuum_tube', { tag: 'c:bolts/steel' }]), // [PORT-FIX] {tag:...}
		event.recipes.createDeploying('tfg:unfinished_vacuum_tube', ['tfg:unfinished_vacuum_tube', 'gtceu:copper_single_wire']),
		event.recipes.createDeploying('tfg:unfinished_vacuum_tube', ['tfg:unfinished_vacuum_tube', 'gtceu:copper_single_wire']),
		event.recipes.createDeploying('tfg:unfinished_vacuum_tube', ['tfg:unfinished_vacuum_tube', 'gtceu:glass_tube']),
		// [PORT] vintageimprovements -> createvintageneoforged; results в 1.21 через {id:...}
		event.custom({ type: 'createvintageneoforged:vacuumizing', ingredients: [{ item: 'tfg:unfinished_vacuum_tube' }], results: [{ id: 'tfg:unfinished_vacuum_tube' }], processingTime: 80 })
	]).transitionalItem('tfg:unfinished_vacuum_tube').loops(1).id('tfg:gtceu/sequenced_assembly/vacuum_tube')

	// ULV Coil
	event.recipes.createSequencedAssembly([
		'gtceu:ulv_voltage_coil',
	], 'gtceu:magnetic_iron_rod', [
		event.recipes.createDeploying('gtceu:magnetic_iron_rod', ['gtceu:magnetic_iron_rod', { tag: 'c:fine_wires/lead' }]) // [PORT-FIX] {tag:...}
	]).transitionalItem('gtceu:magnetic_iron_rod').loops(16).id('tfg:sequenced_assembly/ulv_voltage_coil')

	// LV basic circuit
	event.remove({ id: 'gtceu:shaped/electronic_circuit_lv' })

	event.recipes.createSequencedAssembly([
		'gtceu:basic_electronic_circuit',
	], 'gtceu:resin_printed_circuit_board', [
		event.recipes.createDeploying('tfg:unfinished_basic_electronic_circuit', ['tfg:unfinished_basic_electronic_circuit', 'gtceu:resistor']),
		event.recipes.createDeploying('tfg:unfinished_basic_electronic_circuit', ['tfg:unfinished_basic_electronic_circuit', 'gtceu:resistor']),
		event.recipes.createDeploying('tfg:unfinished_basic_electronic_circuit', ['tfg:unfinished_basic_electronic_circuit', 'gtceu:vacuum_tube']),
		event.recipes.createDeploying('tfg:unfinished_basic_electronic_circuit', ['tfg:unfinished_basic_electronic_circuit', 'gtceu:vacuum_tube']),
		event.recipes.createDeploying('tfg:unfinished_basic_electronic_circuit', ['tfg:unfinished_basic_electronic_circuit', 'create:electron_tube']),
		event.recipes.createFilling('tfg:unfinished_basic_electronic_circuit', ['tfg:unfinished_basic_electronic_circuit', Fluid.of('gtceu:glue', 50)]),
		event.recipes.createDeploying('tfg:unfinished_basic_electronic_circuit', ['tfg:unfinished_basic_electronic_circuit', { tag: 'c:plates/steel' }]), // [PORT-FIX] {tag:...}
	]).transitionalItem('tfg:unfinished_basic_electronic_circuit').loops(1).id('tfg:gtceu/sequenced_assembly/basic_electronic_circuit')

	// MV basic circuit
	event.remove({ id: 'gtceu:shaped/electronic_circuit_mv' })

	event.recipes.createSequencedAssembly([
		'gtceu:good_electronic_circuit',
	], 'gtceu:phenolic_printed_circuit_board', [
		event.recipes.createDeploying('tfg:unfinished_good_electronic_circuit', ['tfg:unfinished_good_electronic_circuit', 'gtceu:diode']),
		event.recipes.createDeploying('tfg:unfinished_good_electronic_circuit', ['tfg:unfinished_good_electronic_circuit', 'gtceu:diode']),
		event.recipes.createDeploying('tfg:unfinished_good_electronic_circuit', ['tfg:unfinished_good_electronic_circuit', 'gtceu:copper_single_wire' /* [PORT-FIX] GTM8 не генерирует теги проводов */]), // [PORT-FIX] {tag:...}
		event.recipes.createDeploying('tfg:unfinished_good_electronic_circuit', ['tfg:unfinished_good_electronic_circuit', 'gtceu:copper_single_wire' /* [PORT-FIX] GTM8 не генерирует теги проводов */]), // [PORT-FIX] {tag:...}
		event.recipes.createDeploying('tfg:unfinished_good_electronic_circuit', ['tfg:unfinished_good_electronic_circuit', 'gtceu:basic_electronic_circuit']),
		event.recipes.createDeploying('tfg:unfinished_good_electronic_circuit', ['tfg:unfinished_good_electronic_circuit', 'gtceu:basic_electronic_circuit']),
		event.recipes.createDeploying('tfg:unfinished_good_electronic_circuit', ['tfg:unfinished_good_electronic_circuit', 'gtceu:basic_electronic_circuit']),
		event.recipes.createDeploying('tfg:unfinished_good_electronic_circuit', ['tfg:unfinished_good_electronic_circuit', { tag: 'c:plates/steel' }]), // [PORT-FIX] {tag:...}
	]).transitionalItem('tfg:unfinished_good_electronic_circuit').loops(1).id('tfg:gtceu/sequenced_assembly/good_electronic_circuit')

	// Vitrified Pearl
	event.recipes.gtceu.shaped('gtceu:mv_field_generator', [
		'ABA',
		'CDC',
		'ABA'
	], {
		A: ChemicalHelper.get(TagPrefix.wireGtQuadruple, GTMaterials.MagnesiumDiboride, 1),
		B: ChemicalHelper.get(TagPrefix.plate, GTMaterials.Aluminium, 1),
		C: '#gtceu:circuits/mv',
		D: 'tfg:vitrified_pearl'
	}).addMaterialInfo().id('gtceu:shaped/field_generator_mv')

	event.recipes.gtceu.assembler('field_generator_mv')
		.itemInputs('tfg:vitrified_pearl', '2x #c:plates/aluminium', '2x #gtceu:circuits/mv', '4x #c:quadruple_wires/magnesium_diboride')
		.itemOutputs('gtceu:mv_field_generator')
		.duration(100)
		.EUt(30)

	// Cryo Fluix Pearl
	// [PORT-GTM-REPLACE] replaceInput/Output по GT-рецептам крашится в b71dec5 (immutable CapabilityMapComponent, UOE) — включить с патченным GTM: 
	// event.replaceInput({ id: 'gtceu:assembler/field_generator_hv' }, 'gtceu:quantum_eye', 'tfg:cryo_fluix_pearl')

	event.recipes.gtceu.shaped('gtceu:hv_field_generator', [
		'ABA',
		'CDC',
		'ABA'
	], {
		A: ChemicalHelper.get(TagPrefix.wireGtQuadruple, GTMaterials.MercuryBariumCalciumCuprate, 1),
		B: ChemicalHelper.get(TagPrefix.plate, GTMaterials.StainlessSteel, 1),
		C: '#gtceu:circuits/hv',
		D: 'tfg:cryo_fluix_pearl'
	}).addMaterialInfo().id('gtceu:shaped/field_generator_hv')

	// Change recipes to want EV circuit instead of IV
	// [PORT-GTM-REPLACE] replaceInput/Output по GT-рецептам крашится в b71dec5 (immutable CapabilityMapComponent, UOE) — включить с патченным GTM: 
	// event.replaceInput({ id: 'gtceu:shaped/large_combustion_engine' }, '#gtceu:circuits/iv', '#gtceu:circuits/ev')
	// [PORT-GTM-REPLACE] replaceInput/Output по GT-рецептам крашится в b71dec5 (immutable CapabilityMapComponent, UOE) — включить с патченным GTM: 
	// event.replaceInput({ id: 'gtceu:shaped/nano_chestplate_advanced' }, '#gtceu:circuits/iv', '#gtceu:circuits/ev')
	// [PORT-GTM-REPLACE] replaceInput/Output по GT-рецептам крашится в b71dec5 (immutable CapabilityMapComponent, UOE) — включить с патченным GTM: 
	// event.replaceInput({ id: 'gtceu:assembler/ev_large_miner' }, '#gtceu:circuits/iv', '#gtceu:circuits/ev')

	// Nano wafer
	// [PORT-Ф2] Жидкости gtceu:tritiated_water в сборке нет — замена отключена, стоковые рецепты сохранены
	// event.remove({ id: 'gtceu:chemical_reactor/nano_cpu_wafer' })
	// event.remove({ id: 'gtceu:large_chemical_reactor/nano_cpu_wafer' })

	// event.recipes.gtceu.chemical_reactor('tfg:nano_cpu_wafer')
	// 	.inputFluids(Fluid.of('gtceu:tritiated_water', 576))
	// 	.itemInputs('gtceu:cpu_wafer', '16x gtceu:carbon_fibers')
	// 	.itemOutputs('gtceu:nano_cpu_wafer')
	// 	.duration(20*60)
	// 	.EUt(GTValues.VA[GTValues.EV])
	// 	.cleanroom(CleanroomType.CLEANROOM)

	// Quantum Eye
	// [PORT-GTM-REPLACE] replaceInput/Output по GT-рецептам крашится в b71dec5 (immutable CapabilityMapComponent, UOE) — включить с патченным GTM: 
	// event.replaceInput({ id: 'gtceu:assembler/field_generator_ev' }, 'minecraft:nether_star', 'gtceu:quantum_eye')

	event.recipes.gtceu.shaped('gtceu:ev_field_generator', [
		'ABA',
		'CDC',
		'ABA'
	], {
		A: ChemicalHelper.get(TagPrefix.wireGtQuadruple, GTMaterials.UraniumTriplatinum, 1),
		B: ChemicalHelper.get(TagPrefix.plateDouble, GTMaterials.Titanium, 1),
		C: '#gtceu:circuits/ev',
		D: 'gtceu:quantum_eye'
	}).addMaterialInfo().id('gtceu:shaped/field_generator_ev')

	event.remove({ id: 'gtceu:chemical_bath/quantum_eye' })
	event.recipes.gtceu.chemical_bath('tfg:quantum_eye')
		.itemInputs('tfg:cryo_fluix_pearl')
		.inputFluids(Fluid.of('gtceu:radon', 250))
		.itemOutputs('gtceu:quantum_eye')
		.duration(20 * 24)
		.EUt(GTValues.VA[GTValues.HV])

	// Nether Star
	// [PORT-GTM-REPLACE] replaceInput/Output по GT-рецептам крашится в b71dec5 (immutable CapabilityMapComponent, UOE) — включить с патченным GTM: 
	// event.replaceInput({ id: 'gtceu:assembler/field_generator_iv' }, 'gtceu:quantum_star', 'minecraft:nether_star')

	event.recipes.gtceu.shaped('gtceu:iv_field_generator', [
		'ABA',
		'CDC',
		'ABA'
	], {
		A: ChemicalHelper.get(TagPrefix.wireGtQuadruple, GTMaterials.SamariumIronArsenicOxide, 1),
		B: ChemicalHelper.get(TagPrefix.plateDouble, GTMaterials.TungstenSteel, 1),
		C: '#gtceu:circuits/iv',
		D: 'minecraft:nether_star'
	}).addMaterialInfo().id('gtceu:shaped/field_generator_iv')

	event.recipes.gtceu.chemical_reactor('tfg:gtceu/nether_star_dust')
		.itemInputs('2x #c:dusts/iridium', '#c:dusts/diamond')
		.circuit(10)
		.itemOutputs('gtceu:nether_star_dust')
		// TODO: change to something else with venus
		.inputFluids(Fluid.of('gtceu:neon', 1000))
		.duration(700)
		.EUt(2720)

	global.TFGDamageShaped(event,'tfg:steel_drill_head', [
		'ABA',
		'ABA',
		'BCB'
	], {
		A: '#c:plates/wrought_iron',
		B: '#c:plates/steel',
		C: '#c:tools/hammer' // [PORT] forge:tools/hammers -> c:tools/hammer
	}).id('tfg:shaped/steel_drill_head')
})
