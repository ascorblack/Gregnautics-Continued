// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/create_connected/recipes.js (Фаза 3).
// KubeJS 7: файл регистрирует событие сам (диспетчер main_server_script.js не используется).
// forge: -> c:, forge:sheets/X -> c:plates/X (GTM8), forge:tools/hammers -> c:tools/hammer,
// forge:stone -> c:stones (конвенция NeoForge 1.21).
// TFGHelpers.registerMaterialInfo / .addMaterialInfo — хелперы мода TFG, его нет в сборке (Фаза 4).

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port create_connected recipes start')

	event.remove({ input: "create_connected:copycat_vertical_step", output: "create:copycat_step" });

	// Remove Fluid Vessel Crafting
	event.remove({ id: 'create_connected:crafting/kinetics/fluid_vessel' })

	// Centrifugal Clutch
	event.shapeless('create_connected:centrifugal_clutch', [
		'create:andesite_casing',
		'#c:plates/wrought_iron', // [PORT] forge: -> c:
		'create:speedometer',
		'create:shaft', // [PORT-FIX] тег c:shafts пуст в 1.21 (никто не регистрирует) — конкретный предмет
	]).id('create_connected:crafting/kinetics/centrifugal_clutch')

	// Freewheel Clutch'
	event.shapeless('create_connected:freewheel_clutch', [
		'create:andesite_casing',
		'#c:plates/wrought_iron', // [PORT] forge: -> c:
		'create:shaft', // [PORT-FIX] тег c:shafts пуст в 1.21 — конкретный предмет
		'create:cogwheel', // [PORT-FIX] тег c:cogwheels пуст в 1.21 — конкретный предмет
	]).id('create_connected:crafting/kinetics/freewheel_clutch')

	// Overstress Clutch
	event.shapeless('create_connected:overstress_clutch', [
		'create:andesite_casing',
		'#c:plates/wrought_iron', // [PORT] forge: -> c:
		'create:shaft', // [PORT-FIX] тег c:shafts пуст в 1.21 — конкретный предмет
		'create:electron_tube',
	]).id('create_connected:crafting/kinetics/overstress_clutch')

	// Item Silo
	event.shaped('create_connected:item_silo', [
		' C ',
		'BAD',
		' C '
	], {
		A: '#c:chests/wooden', // [PORT] forge: -> c:
		B: '#c:plates/wrought_iron', // [PORT] forge:sheets -> c:plates (GTM8)
		C: '#c:screws/wrought_iron', // [PORT] forge: -> c:
		D: '#c:tools/screwdriver' // [PORT-FIX] GT8 регистрирует c:tools/screwdriver (ед. число), c:tools/screwdriver пуст
	}).id('create_connected:crafting/kinetics/item_silo')

	event.recipes.gtceu.assembler('tfg:create_connected/item_silo')
		.itemInputs('#c:chests/wooden', '#c:plates/wrought_iron', '2x #c:screws/wrought_iron') // [PORT] forge: -> c:, sheets -> plates
		.circuit(10)
		.itemOutputs('create_connected:item_silo')
		.duration(200)
		.EUt(20)
		// [PORT-Ф4] .addMaterialInfo(true) — расширение рецепт-билдера из мода TFG, отсутствует в сборке

	// Sequenced Pulse Generator
	event.shaped('create_connected:sequenced_pulse_generator', [
		'DA ',
		'DCD',
		'EEE'
	], {
		A: 'create:electron_tube',
		C: '#c:plates/bronze', // [PORT] forge: -> c:
		D: 'minecraft:redstone_torch',
		E: '#c:stones' // [PORT] forge:stone -> c:stones (конвенция NeoForge 1.21)
	}).id('create_connected:crafting/kinetics/sequenced_pulse_generator')

	event.replaceInput({ id: 'create_connected:crafting/kinetics/redstone_link_wildcard' }, 'create:transmitter', 'minecraft:redstone_torch')

	global.TFGDamageShaped(event,'create_connected:kinetic_bridge', [
		'BCF',
		'AEA',
		'DCD'
	], {
		A: 'create:brass_casing',
		B: '#c:tools/hammer', // [PORT] forge:tools/hammers -> c:tools/hammer
		C: '#c:plates/magnetic_iron', // [PORT] forge: -> c:
		D: '#c:small_gears/red_alloy', // [PORT] forge: -> c:
		E: 'create:shaft', // [PORT-FIX] тег c:shafts пуст в 1.21 — конкретный предмет
		F: '#c:tools/wrench' // [PORT-FIX] GT8/Create регистрируют c:tools/wrench (ед. число), c:tools/wrench пуст
	}).id('create_connected:crafting/kinetics/kinetic_bridge')

	event.recipes.gtceu.assembler('tfg:create_connected/kinetic_bridge')
		.itemInputs('2x create:brass_casing', '2x #c:plates/magnetic_iron', '2x #c:small_gears/red_alloy', 'create:shaft') // [PORT-FIX] тег c:shafts пуст в 1.21 — конкретный предмет
		.itemOutputs('create_connected:kinetic_bridge')
		.duration(200)
		.EUt(20)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create_connected:kinetic_bridge', [GTMaterials.Brass, 2, GTMaterials.Wood, 2, GTMaterials.RedAlloy, 2, GTMaterials.IronMagnetic, 2]) — хелпер мода TFG отсутствует

	// Brass chute

	event.shaped('create_connected:brass_chute', [
		'A',
		'B'
	], {
		A: '#c:plates/brass', // [PORT] forge: -> c:
		B: 'create:chute'
	}).id('create_connected:crafting/kinetics/brass_chute')

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create_connected:brass_chute', [GTMaterials.WroughtIron, 3, GTMaterials.Brass, 1]) — хелпер мода TFG отсутствует

	event.shaped('create:smart_chute', [
		'A',
		'B'
	], {
		A: 'create_connected:brass_chute',
		B: 'create:electron_tube'
	}).id('tfg:shaped/smart_chute_from_brass_chute')
})
