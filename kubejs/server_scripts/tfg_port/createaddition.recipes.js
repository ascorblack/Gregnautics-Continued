// priority: 0
"use strict";

// [PORT] Портировано из create_additions/recipes.js (TerraFirmaGreg-Modern 1.20.1 -> 1.21.1)
// [PORT] KubeJS 7: регистрация напрямую через ServerEvents.recipes вместо диспетчера registerCreateAdditionsRecipes
// [PORT] Теги forge:* -> c:* (NeoForge), forge:tools/hammers -> c:tools/hammer

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port createaddition recipes start')

	// Удаление рецептов
	event.remove({ mod: 'createaddition' });

	// Прокатный стан
	event.recipes.gtceu.shaped('createaddition:rolling_mill', [
		'ABA',
		'CEC',
		'DBD'
	], {
		A: 'create:precision_mechanism',
		B: '#c:rods/long/blue_steel', // [PORT] forge -> c
		C: '#c:double_plates/black_steel', // [PORT] forge -> c
		D: '#gtceu:circuits/ulv',
		E: 'gtceu:ulv_machine_hull'
	}).addMaterialInfo().id('tfg:create_additions/shaped/rolling_mill')

	// Цифровой адаптер
	// [PORT] computercraft отсутствует в сборке 1.21.1 — рецепт убран (createaddition:digital_adapter
	// остаётся без рецепта после event.remove({ mod: 'createaddition' }))
	// event.recipes.gtceu.shaped('createaddition:digital_adapter', ...)

	// Колючая проволка
	event.shapeless('4x createaddition:barbed_wire', [
		'#c:rods/wrought_iron', // [PORT] forge -> c
		'#c:rods/long/wrought_iron',
		'#c:rods/wrought_iron',
		'#c:rods/long/wrought_iron',
		'#c:rods/wrought_iron',
		'#c:rods/long/wrought_iron',
		'#c:rods/wrought_iron',
		'#c:rods/long/wrought_iron',
		'#c:tools/hammer' // [PORT] forge:tools/hammers -> c:tools/hammer
	]).id('tfg:create_additions/shapeless/barbed_wire')

	event.recipes.gtceu.assembler('tfg:createaddition/barbed_wire')
		.itemInputs('4x #c:rods/wrought_iron', '4x #c:rods/long/wrought_iron') // [PORT] forge -> c
		.circuit(3)
		.itemOutputs('4x createaddition:barbed_wire')
		.duration(200)
		.EUt(20)
		.addMaterialInfo(true)

	event.recipes.gtceu.shaped('createaddition:electric_motor', [
		'CCC',
		'BDA',
		'CCC'
	], {
		A: 'gtceu:ulv_voltage_coil',
		B: 'create:rotation_speed_controller',
		C: 'gtceu:tin_single_cable',
		D: 'gtceu:lv_electric_motor',
	}).addMaterialInfo().id('tfg:createadditions/shaped/electric_motor')

	event.recipes.gtceu.shaped('createaddition:alternator', [
		'ABA',
		'CDC',
		'EFE'
	], {
		A: '#gtceu:resistors',
		B: '#gtceu:circuits/lv',
		C: 'gtceu:ulv_voltage_coil',
		D: 'gtceu:ulv_machine_hull',
		E: 'gtceu:tin_single_cable',
		F: 'create:shaft' // [PORT-FIX] тег c:shafts пуст в 1.21 (Create 6 его не поставляет) — прямой item
	}).addMaterialInfo().id('tfg:createadditions/shaped/alternator')


	event.shapeless('createaddition:diamond_grit_sandpaper', ['minecraft:paper', 'tfc:glue', '#c:dusts/diamond']) // [PORT] forge -> c
		.id('tfg:shapeless/diamond_grit_sand_paper')


	event.recipes.gtceu.shaped('createaddition:portable_energy_interface', [
		'ABC',
		'DEC',
		'ADC'
	], {
		A: '#c:plates/brass', // [PORT] forge -> c
		B: 'create:chute',
		C: 'gtceu:copper_octal_wire',
		D: 'gtceu:copper_single_cable',
		E: 'create:brass_casing'
	}).addMaterialInfo().id('tfg:create_additions/shaped/portable_energy_interface')

	event.recipes.gtceu.assembler('create_additions/battery_hv')
		.itemInputs('gtceu:industrial_steam_casing', '#gtceu:batteries/hv')
		.itemOutputs('createaddition:modular_accumulator')
		.duration(400)
		.EUt(30)

	event.recipes.gtceu.assembler('create_additions/battery_mv')
		.itemInputs('gtceu:industrial_steam_casing', '4x #gtceu:batteries/mv')
		.itemOutputs('createaddition:modular_accumulator')
		.duration(400)
		.EUt(30)

	event.recipes.gtceu.assembler('create_additions/battery_lv')
		.itemInputs('gtceu:industrial_steam_casing', '16x #gtceu:batteries/lv')
		.itemOutputs('createaddition:modular_accumulator')
		.duration(400)
		.EUt(30)
		.addMaterialInfo(true)
})
