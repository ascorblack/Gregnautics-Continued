// priority: 0
"use strict";

// [PORT] Порт из TFG-Modern 1.20.1: create/recipes.js
// [PORT] KubeJS 7: функция registerCreateRecipes заменена на прямую регистрацию ServerEvents.recipes
// [PORT] forge:* теги -> c:* (tools/hammers->tools/hammer, tools/saws->tools/saw, tools/knives->tools/knife, sheets->plates)
// [PORT] event.recipes.createXxx -> event.recipes.create.xxx (KubeJS 7 именование)
// [PORT-FIX] массовое переименование пустых тегов (GTCEu 8.0 регистрирует теги инструментов в ед. числе):
//   c:tools/wrench -> c:tools/wrench, c:tools/screwdriver -> c:tools/screwdriver, c:tools/file -> c:tools/file,
//   c:cobblestone -> c:cobblestones/normal (TFC 1.21), tfc:trapdoors -> minecraft:wooden_trapdoors
// [PORT-Ф4] TFGHelpers.registerMaterialInfo — хелпер мода TFG, отсутствует в сборке (Фаза 4)

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port create recipes start')

	// Удаление рецептов мода create
	event.remove({
		not: [
			{ id: 'create:crafting/kinetics/cuckoo_clock' },
			{ id: 'create:crafting/kinetics/mysterious_cuckoo_clock' },
			{ id: 'create:crafting/kinetics/smart_chute' },
			{ id: 'create:crafting/kinetics/speedometer_from_conversion' },
			{ id: 'create:crafting/kinetics/stressometer_from_conversion' },
			{ id: 'create:crafting/kinetics/smart_fluid_pipe' },
			{ id: 'create:crafting/kinetics/portable_fluid_interface' },
			{ id: 'create:crafting/kinetics/clockwork_bearing' },
			{ id: 'create:crafting/kinetics/linear_chassisfrom_conversion' },
			{ id: 'create:crafting/kinetics/secondary_linear_chassisfrom_conversion' },
			{ id: 'create:crafting/kinetics/portable_storage_interface' },
			{ id: 'create:crafting/kinetics/track_observer' },
			{ id: 'create:crafting/kinetics/controls' },
			{ id: 'create:crafting/logistics/content_observer' },
			{ id: 'create:crafting/logistics/stockpile_switch' },
			{ id: 'create:crafting/kinetics/nixie_tube' },
			{ id: 'create:crafting/kinetics/placard' },
			{ id: 'create:crafting/logistics/pulse_repeater' },
			{ id: 'create:crafting/logistics/pulse_extender' },
			{ id: 'create:crafting/logistics/powered_latch' },
			{ id: 'create:crafting/logistics/powered_toggle_latch' },
			{ id: 'create:crafting/kinetics/crafter_slot_cover' },
			{ id: 'create:crafting/appliances/linked_controller' },
			{ id: 'create:crafting/appliances/filter_clear' },
			{ id: 'create:crafting/appliances/attribute_filter_clear' },
			{ id: 'create:crafting/appliances/schedule_clear' },
			{ id: 'create:crafting/schematics/empty_schematic' },
			{ id: 'create:crafting/schematics/schematic_and_quill' },
			{ id: 'create:crafting/appliances/clipboard_clear' },
			{ id: 'create:crafting/logistics/content_observer' },
			{ id: 'create:crafting/kinetics/chain_conveyor' },
			{ id: 'create:crafting/logistics/packager_from_conversion' },
			{ id: 'create:crafting/logistics/repackager_from_conversion' },
			{ id: 'create:crafting/materials/cardboard_block'},
			{ id: 'create:crafting/materials/bound_cardboard_block'},
			{ id: 'create:crafting/materials/cardboard_from_block'},
			{ id: 'create:crafting/materials/cardboard_from_bound_block'},
			{ id: 'create:item_application/bound_cardboard_inworld'},
			{ id: 'create:crafting/logistics/redstone_requester_clear'},
			{ id: 'create:crafting/logistics/redstone_requester'}, // [PORT-Ф2-TEMP] TFG-замена требует CVI redstone_module (нет в 1.21) — ваниль остаётся
			{ id: 'create:sequenced_assembly/precision_mechanism'}, // [PORT-Ф2-TEMP] TFG-замена требует small_gears/springs из Ф2 — ваниль остаётся
			{ id: 'create:crafting/logistics/stock_link_clear'},
			{ id: 'create:crafting/logistics/stock_ticker_clear'},
			{ id: 'create:crafting/logistics/factory_gauge_clear'},
			{ type: 'create:item_copying' },
			{ output: '#create:table_cloths'} // Gotta do this to not purge the table cloth reset recipes
		], mod: 'create'
	})

	// Make Bound Cardboard craftable with all string
	event.replaceInput({id: 'create:crafting/materials/bound_cardboard_block' }, 'minecraft:string', '#c:string')

	// Remove Table Cloth recipes
	global.MINECRAFT_DYE_NAMES.forEach(dye => {
		event.remove([
			{ id: `create:crafting/logistics/${dye}_table_cloth` },
			{ id: `create:crafting/logistics/${dye}_table_cloth_from_other_table_cloth` }
		])
	})

	// Train Signal
	event.shapeless('4x create:track_signal', [
		'create:railway_casing',
		'gtceu:glass_tube',
		'#c:dusts/glowstone'
	]).id('create:crafting/kinetics/track_signal')

	// Train Station
	// [PORT] firmaciv отсутствует в сборке 1.21.1 (firmaciv:firmaciv_compass) — рецепт станции нужно переделать
	// event.shapeless('2x create:track_station', [
	// 	'create:railway_casing',
	// 	'firmaciv:firmaciv_compass'
	// ]).id('create:crafting/kinetics/track_station')

	// Speedometer
	// [PORT] firmaciv отсутствует в сборке 1.21.1 (firmaciv:firmaciv_compass)
	// event.shapeless('create:speedometer', [
	// 	'create:andesite_casing',
	// 	'firmaciv:firmaciv_compass'
	// ]).id('create:crafting/kinetics/speedometer')

	// Пушка для постройки схематик
	// [PORT] firmaciv и alekiships отсутствуют в сборке 1.21.1 (firmaciv:cannon / alekiships:cannon)
	// event.recipes.gtceu.shaped('create:schematicannon', [
	// 	'DE ',
	// 	'CAC'
	// ], {
	// 	A: '#c:storage_blocks/wrought_iron',
	// 	C: '#tfc:rock/smooth',
	// 	D: 'minecraft:dispenser',
	// 	E: ['firmaciv:cannon', 'alekiships:cannon']
	// }).addMaterialInfo().id('tfg:create/shaped/schematicannon')

	// Стол для схематик
	event.shaped('create:schematic_table', [
		'AAA',
		'CB '
	], {
		A: '#minecraft:wooden_slabs',
		B: '#minecraft:logs',
		C: '#c:tools/saw'
	}).id('tfg:create/shaped/schematic_table')

	event.recipes.gtceu.assembler('create:schematic_table')
		.itemInputs('3x #minecraft:wooden_slabs', '1x #minecraft:logs')
		.itemOutputs('create:schematic_table')
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])

	// Внутриблочный двигатель цепи
	event.shapeless('create:encased_chain_drive', [
		'create:andesite_casing',
		'#tfg:metal_chains',
		'#tfg:metal_chains',
		'#tfg:metal_chains',
		'#tfg:metal_chains'
	]).id('tfg:create/shapeless/encased_chain_drive')

	// Сопло
	event.shaped('create:nozzle', [
		'ABA',
		'ACA'
	], {
		A: '#c:rods/wrought_iron',
		B: '#c:plates/wrought_iron',
		C: '#c:cloth'
	}).id('tfg:create/shaped/nozzle')

	// Ручка, чтобы люто крутить
	event.shaped('create:hand_crank', [
		'AAA',
		'  B'
	], {
		A: '#tfc:lumber',
		B: '#c:rods/any_bronze'
	}).id('tfg:create/shaped/hand_crank')

	// Емкость для миксера
	event.shaped('create:basin', [
		'ABA',
		' A '
	], {
		A: ['#c:ingots/iron', '#c:ingots/wrought_iron'],
		B: '#c:tools/hammer'
	}).id('tfg:create/shaped/basin')

	event.recipes.gtceu.assembler('tfg:create/basin')
		.itemInputs('3x #c:ingots/iron')
		.circuit(3)
		.itemOutputs('create:basin')
		.duration(200)
		.EUt(20)
		.addMaterialInfo(true)

	// Место куда можно что то положить
	event.recipes.gtceu.shaped('create:depot', [
		'A',
		'B'
	], {
		A: '#c:double_plates/wrought_iron',
		B: 'create:andesite_casing'
	}).addMaterialInfo().id('tfg:create/shaped/depot')

	// Лоток
	event.shaped('create:chute', [
		'A ',
		'AB',
		'A '
	], {
		A: '#c:plates/wrought_iron',
		B: '#c:tools/hammer'
	}).id('tfg:create/shaped/chute')

	event.recipes.gtceu.assembler('tfg:create/chute')
		.itemInputs('3x #c:plates/wrought_iron')
		.circuit(4)
		.itemOutputs('create:chute')
		.duration(200)
		.EUt(20)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:chute', [GTMaterials.WroughtIron, 3]) — хелпер мода TFG отсутствует

	// Металлический держатель
	event.recipes.gtceu.shaped('4x create:metal_bracket', [
		'AAA',
		' B '
	], {
		A: '#c:bolts/wrought_iron',
		B: '#c:plates/wrought_iron'
	}).addMaterialInfo().id('tfg:create/shaped/metal_bracket')

	event.recipes.gtceu.shaped('4x create:wooden_bracket', [
		'AAA',
		'BBB'
	], {
		A: '#c:bolts/wrought_iron',
		B: '#tfc:lumber'
	}).addMaterialInfo().id('tfg:create/shaped/wooden_bracket')

	// Жидкостная труба
	event.shaped('create:fluid_pipe', [
		'BAB'
	], {
		A: '#c:tools/hammer',
		B: '#c:plates/copper'
	}).id('tfg:create/shaped/fluid_pipe')

	event.recipes.gtceu.assembler('tfg:create/fluid_pipe')
		.itemInputs('2x #c:plates/copper')
		.circuit(3)
		.itemOutputs('create:fluid_pipe')
		.duration(200)
		.EUt(20)
		.addMaterialInfo(true)

	// Жидкостный люк
	event.shapeless('create:fluid_valve', [
		'create:fluid_pipe',
		'#c:plates/wrought_iron'
	]).id('tfg:create/shapeless/fluid_valve')

	// Ручка жидкостного люка
	event.shaped('create:copper_valve_handle', [
		' A ',
		'BCD'
	], {
		A: '#c:plates/copper',
		B: '#c:tools/hammer',
		C: '#c:small_gears/iron', // [PORT-Ф2-TEMP] small gear wrought_iron — флаг TFG (Ф2); iron есть в стоке
		D: '#c:tools/file'
	}).id('tfg:create/shaped/copper_valve_handle')

	event.recipes.gtceu.assembler('tfg:create/copper_valve_handle')
		.itemInputs('#c:plates/copper', '#c:small_gears/iron') // [PORT-Ф2-TEMP] small gear wrought_iron — флаг Ф2
		.circuit(6)
		.itemOutputs('create:copper_valve_handle')
		.duration(200)
		.EUt(20)
		.addMaterialInfo(true)

	// Жидкостный резервуар
	event.shaped('create:fluid_tank', [
		'ADA',
		'BCB',
		'AEA'
	], {
		A: '#c:bolts/copper',
		B: '#c:plates/copper',
		C: '#c:glass_panes',
		D: '#c:tools/screwdriver',
		E: '#c:tools/wrench'
	}).id('tfg:create/shaped/fluid_tank')

	event.recipes.gtceu.assembler('create:fluid_tank')
		.itemInputs('2x #c:bolts/copper', '2x #c:plates/copper', '#c:glass_panes')
		.itemOutputs('create:fluid_tank')
		.circuit(4)
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])
		.addMaterialInfo(true)

	// Шкив для шланга
	event.shaped('create:hose_pulley', [
		'DAE',
		' B ',
		'CFC'
	], {
		A: 'create:copper_casing',
		B: '#tfg:rubber_foils',
		C: '#c:plates/copper',
		D: '#c:tools/wrench',
		E: '#c:tools/hammer',
		F: 'minecraft:bucket'
	}).id('tfg:create/shaped/hose_pulley')

	event.recipes.gtceu.assembler('create:hose_pulley')
		.itemInputs('create:copper_casing', '#tfg:rubber_foils', '2x #c:plates/copper', 'minecraft:bucket')
		.itemOutputs('create:hose_pulley')
		.duration(50)
		.circuit(1)
		.EUt(GTValues.VA[GTValues.ULV])

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:hose_pulley', [GTMaterials.Copper, 3, GTMaterials.Rubber, 1/4]) — хелпер мода TFG отсутствует

	// Слив из предметов
	event.shaped('create:item_drain', [
		'A',
		'B'
	], {
		A: '#tfg:metal_bars',
		B: 'create:copper_casing'
	}).id('tfg:create/shaped/item_drain')

	// Жидкостный наполнитель
	event.shaped('create:spout', [
		'CBD',
		' A ',
		'   '
	], {
		A: '#c:plates/rubber',
		B: 'create:fluid_tank',
		C: '#c:tools/wrench',
		D: '#c:tools/screwdriver'
	}).id('tfg:create/shaped/spout')

	event.recipes.gtceu.assembler('create:spout')
		.itemInputs('create:fluid_tank', '2x #tfg:rubber_foils')
		.itemOutputs('create:spout')
		.duration(50)
		.circuit(2)
		.EUt(GTValues.VA[GTValues.ULV])
		.addMaterialInfo(true)

	// Паровой двигатель
	event.shaped('create:steam_engine', [
		'  A',
		'DCC',
		'FE '
	], {
		A: '#c:screws/wrought_iron',
		C: '#c:rods/brass',
		D: '#c:small_gears/steel',
		E: '#c:tools/hammer',
		F: '#c:double_ingots/copper'
	}).id('tfg:create/shaped/steam_engine')

	event.recipes.gtceu.assembler('tfg:create/steam_engine')
		.itemInputs('1x #c:screws/wrought_iron', '2x #c:rods/brass', '#c:small_gears/steel', '#c:double_ingots/copper')
		.circuit(3)
		.itemOutputs('create:steam_engine')
		.duration(200)
		.EUt(32)
		.addMaterialInfo(true)

	// Паровой свисток
	event.shaped('create:steam_whistle', [
		'AC',
		'BD'
	], {
		A: '#c:plates/brass',
		B: '#c:rings/gold',
		C: '#c:tools/hammer',
		D: '#c:tools/file'
	}).id('tfg:create/shaped/steam_whistle')

	event.recipes.gtceu.assembler('tfg:create/steam_whistle')
		.itemInputs('#c:plates/brass', '#c:rings/gold')
		.circuit(5)
		.itemOutputs('create:steam_whistle')
		.duration(200)
		.EUt(4)
		.addMaterialInfo(true)

	// Рука поршня
	event.shaped('8x create:piston_extension_pole', [
		'A ',
		'BC',
		'A '
	], {
		A: '#minecraft:planks',
		B: '#c:plates/wrought_iron',
		C: '#c:tools/hammer'
	}).id('tfg:create/shaped/piston_extension_pole')

	event.recipes.gtceu.assembler('tfg:create/piston_extension_pole')
		.itemInputs('2x #minecraft:planks', '#c:plates/wrought_iron')
		.circuit(3)
		.itemOutputs('8x create:piston_extension_pole')
		.duration(200)
		.EUt(20)
		.addMaterialInfo(true)

	// Редстоуновый вал
	event.shaped('8x create:gantry_shaft', [
		'A ',
		'BC',
		'A '
	], {
		A: '#c:plates/wrought_iron',
		B: 'gtceu:red_alloy_single_wire',
		C: '#c:tools/hammer'
	}).id('tfg:create/shaped/gantry_shaft')

	event.recipes.gtceu.assembler('tfg:create/gantry_shaft')
		.itemInputs('gtceu:red_alloy_single_wire', '2x #c:plates/wrought_iron')
		.circuit(3)
		.itemOutputs('8x create:gantry_shaft')
		.duration(200)
		.EUt(20)
		.addMaterialInfo(true)

	// Канатный шкиф
	// [PORT] firmaciv отсутствует в сборке 1.21.1 (firmaciv:rope_coil) — rope_pulley остаётся без рецепта
	// event.shaped('create:rope_pulley', [
	// 	'EA ',
	// 	'DBD',
	// 	' C '
	// ], {
	// 	A: 'create:andesite_casing',
	// 	B: 'firmaciv:rope_coil',
	// 	C: '#c:plates/wrought_iron',
	// 	D: '#c:cogwheels',
	// 	E: '#c:tools/wrench'
	// }).id('tfg:create/shaped/rope_pulley')

	// event.recipes.gtceu.assembler('create:rope_pulley')
	// 	.itemInputs('create:andesite_casing', 'firmaciv:rope_coil', '#c:plates/wrought_iron', '2x #c:cogwheels')
	// 	.itemOutputs('create:rope_pulley')
	// 	.duration(50)
	// 	.EUt(GTValues.VA[GTValues.ULV])
	// 	.circuit(22)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:rope_pulley', [GTMaterials.Wood, 1, GTMaterials.WroughtIron, 2]) — хелпер мода TFG отсутствует

	// Шкиф подъемника
	// [PORT] firmaciv отсутствует в сборке 1.21.1 (firmaciv:rope_coil) — elevator_pulley остаётся без рецепта
	// event.shaped('create:elevator_pulley', [
	// 	'EAF',
	// 	'DBD',
	// 	' C '
	// ], {
	// 	A: 'create:brass_casing',
	// 	B: 'firmaciv:rope_coil',
	// 	C: '#c:plates/steel',
	// 	D: '#c:cogwheels',
	// 	E: '#c:tools/wrench',
	// 	F: 'create:electron_tube'
	// }).id('tfg:create/shaped/elevator_pulley')

	// event.recipes.gtceu.assembler('create:elevator_pulley')
	// 	.itemInputs('create:brass_casing', 'firmaciv:rope_coil', '#c:plates/steel', '2x #c:cogwheels', 'create:electron_tube')
	// 	.itemOutputs('create:elevator_pulley')
	// 	.duration(50)
	// 	.EUt(GTValues.VA[GTValues.ULV])

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:elevator_pulley', [GTMaterials.Wood, 1, GTMaterials.Brass, 1, GTMaterials.Steel, 1]) — хелпер мода TFG отсутствует

	// Сборщик вагонеток
	event.shaped('create:cart_assembler', [
		' D ',
		'ABA',
		'C C'
	], {
		A: '#c:plates/steel',
		B: 'gtceu:red_alloy_single_wire',
		C: '#minecraft:logs',
		D: '#c:tools/wrench'
	}).id('tfg:create/shaped/cart_assembler')

	event.recipes.gtceu.assembler('create:cart_assembler')
		.itemInputs('2x #c:plates/steel', 'gtceu:red_alloy_single_wire', '2x #minecraft:logs')
		.itemOutputs('create:cart_assembler')
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])
		.circuit(21)
		.addMaterialInfo(true)

	// Контроллер рельсы
	event.shaped('4x create:controller_rail', [
		'ABA',
		'ACA',
		'ABA'
	], {
		A: '#c:rods/gold',
		B: '#tfc:can_be_lit_on_torch',
		C: 'create:electron_tube'
	}).id('tfg:create/shaped/controller_rail')

	// Линейный переход
	event.recipes.gtceu.shaped('4x create:linear_chassis', [
		'A A',
		'CCC',
		'A A'
	], {
		A: '#c:bolts/wrought_iron',
		C: '#minecraft:logs'
	}).addMaterialInfo().id('tfg:create/shaped/linear_chassis')

	event.shapeless('create:linear_chassis', ['create:secondary_linear_chassis'])
	event.shapeless('create:secondary_linear_chassis', ['create:linear_chassis'])

	// Радиальный переход
	event.recipes.gtceu.shaped('3x create:radial_chassis', [
		'ACA',
		' C ',
		'ACA'
	], {
		A: '#c:bolts/wrought_iron',
		C: '#minecraft:logs'
	}).addMaterialInfo().id('tfg:create/shaped/radial_chassis')

	// Умный липкий поршень
	event.recipes.gtceu.shaped('create:sticker', [
		'ABA',
		'CDC'
	], {
		A: '#c:plates/wrought_iron',
		B: 'tfc:glue',
		C: '#c:cobblestones/normal',
		D: '#c:dusts/redstone'
	}).addMaterialInfo().id('tfg:create/shaped/sticker')

	// Механическая бурилка
	// [PORT] greate отсутствует в сборке 1.21.1 (greate:steel_cogwheel); [PORT-Ф4] tfg:steel_drill_head — бурилка остаётся без рецепта
	// event.shaped('create:mechanical_drill', [
	// 	'EBF',
	// 	'HCG',
	// 	'ADA'
	// ], {
	// 	A: '#c:plates/wrought_iron',
	// 	B: 'tfg:steel_drill_head',
	// 	C: 'greate:steel_cogwheel',
	// 	D: 'create:andesite_casing',
	// 	E: '#c:tools/hammer',
	// 	F: '#c:tools/wrench',
	// 	G: '#c:screws/wrought_iron',
	// 	H: '#gtceu:circuits/ulv'
	// }).id('tfg:create/shaped/mechanical_drill')

	// [PORT-Ф4] tfg:steel_drill_head пока не существует
	// event.recipes.gtceu.assembler('create:mechanical_drill')
	// 	.itemInputs('2x #c:plates/wrought_iron', 'tfg:steel_drill_head', '#c:cogwheels', 'create:andesite_casing', '#gtceu:circuits/ulv')
	// 	.itemOutputs('create:mechanical_drill')
	// 	.duration(50)
	// 	.EUt(GTValues.VA[GTValues.ULV])
	// 	.circuit(19)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:mechanical_drill', [GTMaterials.Wood, 1, GTMaterials.Steel, 8, GTMaterials.WroughtIron, 7]) — хелпер мода TFG отсутствует

	event.shaped('create:mechanical_roller', [
		'GBG',
		'ADA',
		'EHF'
	], {
		A: '#c:plates/wrought_iron',
		B: 'tfc:metal/block/wrought_iron',
		D: 'create:andesite_casing',
		E: '#c:tools/hammer',
		F: '#c:tools/wrench',
		G: '#c:bolts/wrought_iron',
		H: '#c:cogwheels'
	}).id('tfg:create/shaped/mechanical_roller')

	event.recipes.gtceu.assembler('create:mechanical_roller')
		.itemInputs('2x #c:plates/wrought_iron', 'tfc:metal/block/wrought_iron', 'create:andesite_casing', '2x #c:bolts/wrought_iron', '#c:cogwheels')
		.itemOutputs('create:mechanical_roller')
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])
		.circuit(20)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:mechanical_roller', [GTMaterials.Wood, 1, GTMaterials.WroughtIron, 4]) — хелпер мода TFG отсутствует

	// Редстоуновый контакт
	event.shaped('2x create:redstone_contact', [
		'DCE',
		'ABA',
		'AAA'
	], {
		A: '#c:cobblestones/normal',
		B: '#c:small_gears/red_alloy',
		C: '#c:plates/wrought_iron',
		D: '#c:screws/bronze',
		E: '#c:tools/screwdriver'
	}).id('tfg:create/shaped/redstone_contact')

	event.recipes.gtceu.assembler('tfg:create/redstone_contact')
		.itemInputs('5x #c:cobblestones/normal', '#c:small_gears/red_alloy', '#c:plates/wrought_iron', '#c:screws/bronze')
		.circuit(3)
		.itemOutputs('2x create:redstone_contact')
		.duration(200)
		.EUt(20)
		.addMaterialInfo(true)

	// Механический собиратель
	event.shaped('create:mechanical_harvester', [
		'CDE',
		' F ',
		' A '
	], {
		A: '#c:hoe_heads/wrought_iron',
		C: '#c:tools/hammer',
		D: 'create:andesite_casing',
		E: '#c:tools/wrench',
		F: '#c:cogwheels'
	}).id('tfg:create/shaped/mechanical_harvester')

	event.recipes.gtceu.assembler('tfg:create/mechanical_harvester')
		.itemInputs('1x #c:hoe_heads', '#c:cogwheels', 'create:andesite_casing')
		.circuit(3)
		.itemOutputs('create:mechanical_harvester')
		.duration(200)
		.EUt(20)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:mechanical_harvester', [GTMaterials.Wood, 1, GTMaterials.WroughtIron, 2]) — хелпер мода TFG отсутствует

	// Механический плуг
	event.shaped('create:mechanical_plough', [
		'CDE',
		' F ',
		' A '
	], {
		A: '#c:shovel_heads/wrought_iron',
		C: '#c:tools/hammer',
		D: 'create:andesite_casing',
		E: '#c:tools/wrench',
		F: '#c:cogwheels'
	}).id('tfg:create/shaped/mechanical_plough')

	event.recipes.gtceu.assembler('tfg:create/mechanical_plough')
		.itemInputs('#c:shovel_heads', '#c:cogwheels', 'create:andesite_casing')
		.circuit(5)
		.itemOutputs('create:mechanical_plough')
		.duration(200)
		.EUt(20)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:mechanical_plough', [GTMaterials.Wood, 1, GTMaterials.WroughtIron, 2]) — хелпер мода TFG отсутствует

	// Create sail creation using custom sail items.

	event.shaped('8x create:sail_frame', [
		'ADA',
		'BCB',
		'ABA'
	], {
		A: '#c:screws/wood',
		B: 'gtceu:treated_wood_rod',
		C: 'gtceu:treated_wood_frame',
		D: '#c:rods/wrought_iron'
	}).id('tfg:create/shaped/sail_frame')

	event.shaped('8x create:white_sail', [
		'AAA',
		'ABA',
		'AAA'
	], {
		A: 'create:sail_frame',
		B: '#c:cloth'
	}).id('tfg:create/shaped/white_sail')


	// Андезитовый корпус
	event.recipes.create.item_application(['create:andesite_casing'], [{ tag: 'c:stripped_logs' }, { tag: 'c:plates/wrought_iron' }]) // [PORT-FIX] {tag:...}-объект: голый '#тег' парсится как жидкость, а Ingredient.of не проходит кодек
		.id('tfg:create/item_application/andesite_casing')

	event.recipes.gtceu.assembler('tfg:create/andesite_casing')
		.itemInputs('#c:stripped_logs', '#c:plates/wrought_iron')
		.circuit(10)
		.itemOutputs('create:andesite_casing')
		.duration(50)
		.EUt(4)
		.addMaterialInfo(true)

	// Латунный корпус
	event.recipes.create.item_application(['create:brass_casing'], [{ tag: 'c:stripped_logs' }, { tag: 'c:plates/brass' }]) // [PORT-FIX] {tag:...}-объект вместо Ingredient.of / голого '#тега'
		.id('tfg:create/item_application/brass_casing')

	event.recipes.gtceu.assembler('tfg:create/brass_casing')
		.itemInputs('#c:stripped_logs', '#c:plates/brass')
		.circuit(10)
		.itemOutputs('create:brass_casing')
		.duration(50)
		.EUt(4)
		.addMaterialInfo(true)

	// Медный корпус
	event.recipes.create.item_application(['create:copper_casing'], [{ tag: 'c:stripped_logs' }, { tag: 'c:plates/copper' }]) // [PORT-FIX] {tag:...}-объект вместо Ingredient.of / голого '#тега'
		.id('tfg:create/item_application/copper_casing')

	event.recipes.gtceu.assembler('tfg:create/copper_casing')
		.itemInputs('#c:stripped_logs', '#c:plates/copper')
		.circuit(11)
		.itemOutputs('create:copper_casing')
		.duration(50)
		.EUt(4)
		.addMaterialInfo(true)

	// Shadow steel casing
	// [PORT-CHECK] проверить, что create:shadow_steel_casing существует в Create 6.0.10 (1.21.1)
	event.recipes.create.item_application(['create:shadow_steel_casing'], [{ tag: 'c:stripped_logs' }, { tag: 'c:plates/black_steel' }]) // [PORT-FIX] {tag:...}-объект вместо Ingredient.of / голого '#тега'
			.id('tfg:create/item_application/shadow_steel_casing')

	event.recipes.gtceu.assembler('tfg:create/shadow_steel_casing')
		.itemInputs('#c:stripped_logs', '#c:plates/black_steel')
		.circuit(11)
		.itemOutputs('create:shadow_steel_casing')
		.duration(50)
		.EUt(4)
		.addMaterialInfo(true)

	// Refined radiance casing
	// [PORT-CHECK] проверить, что create:refined_radiance_casing существует в Create 6.0.10 (1.21.1)
	event.recipes.create.item_application(['create:refined_radiance_casing'], [{ tag: 'c:stripped_logs' }, 'gtceu:glowstone_plate']) // [PORT-FIX] {tag:...}-объект вместо Ingredient.of / голого '#тега'
			.id('tfg:create/item_application/refined_radiance_casing')

	event.recipes.gtceu.assembler('tfg:create/refined_radiance_casing')
		.itemInputs('#c:stripped_logs', 'gtceu:glowstone_plate')
		.circuit(11)
		.itemOutputs('create:refined_radiance_casing')
		.duration(50)
		.EUt(4)
		.addMaterialInfo(true)

	// Корпус поезда
	event.recipes.create.item_application(['create:railway_casing'], [{ tag: 'c:stripped_logs' }, { tag: 'c:plates/steel' }]) // [PORT-FIX] {tag:...}-объект вместо Ingredient.of / голого '#тега'
		.id('tfg:create/item_application/railway_casing')

	event.recipes.gtceu.assembler('tfg:create/railway_casing')
		.itemInputs('#c:stripped_logs', '#c:plates/steel')
		.circuit(10)
		.itemOutputs('create:railway_casing')
		.duration(50)
		.EUt(4)
		.addMaterialInfo(true)

	// Механический крафтер
	event.shaped('create:mechanical_crafter', [
		' A ',
		'DCE',
		' F '
	], {
		A: 'create:electron_tube',
		C: '#tfc:workbenches',
		D: '#c:tools/wrench',
		E: '#c:tools/hammer',
		F: '#c:small_gears/brass'
	}).id('tfg:create/shaped/mechanical_crafter')

	event.recipes.gtceu.assembler('create:mechanical_crafter')
		.itemInputs('create:electron_tube', '#tfc:workbenches', '#c:small_gears/brass')
		.itemOutputs('create:mechanical_crafter')
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])
		.addMaterialInfo(true)

	// Маховик
	event.shaped('create:flywheel', [
		'ABA',
		'BCB',
		'ABA'
	], {
		A: '#c:rods/brass',
		B: '#c:rods/wrought_iron',
		C: '#c:shafts'
	}).id('tfg:create/shaped/flywheel')

	// Механическая рука
	event.shaped('create:mechanical_arm', [
		'AAB',
		'C  ',
		' DF'
	], {
		A: '#c:rods/brass',
		B: '#c:rods/wrought_iron',
		C: 'create:precision_mechanism',
		D: 'create:brass_casing',
		F: '#c:tools/wrench'
	}).id('tfg:create/shaped/mechanical_arm')

	event.recipes.gtceu.assembler('tfg:create/mechanical_arm')
		.itemInputs('2x #c:rods/brass', '#c:rods/wrought_iron', 'create:precision_mechanism', 'create:brass_casing')
		.circuit(3)
		.itemOutputs('create:mechanical_arm')
		.duration(200)
		.EUt(20)
		.addMaterialInfo(true)

	// Наблюдатель за поездом
	event.shapeless('create:track_observer', [
		'create:railway_casing',
		'#c:stones/pressure_plate' // [PORT-FIX] minecraft:stone_pressure_plates — только block-тег в 1.21; TFC даёт item-тег c:stones/pressure_plate
	]).id('tfg:create/shapeless/track_observer')

	// Сейф
	event.shaped('create:item_vault', [
		' B ',
		'CAC',
		' D '
	], {
		A: '#c:chests/wooden',
		B: '#c:plates/wrought_iron', // [PORT] forge:sheets -> c:plates (GTM8 переименовал sheets в plates)
		C: '#c:screws/wrought_iron',
		D: '#c:tools/screwdriver'
	}).id('tfg:create/shaped/item_vault')

	event.recipes.gtceu.assembler('tfg:create/item_vault')
		.itemInputs('#c:chests/wooden', '#c:plates/wrought_iron', '2x #c:screws/wrought_iron') // [PORT] sheets -> plates
		.circuit(3)
		.itemOutputs('create:item_vault')
		.duration(200)
		.EUt(20)
		.addMaterialInfo(true)

	// Умный раздатчик/приемник из железа
	event.shaped('create:andesite_funnel', [
		'AD',
		'BC'
	], {
		A: '#c:plates/wrought_iron',
		B: ['#tfg:rubber_foils', '#c:leather'],
		C: '#c:tools/wrench',
		D: '#c:tools/knife'
	}).id('tfg:create/shaped/andesite_funnel')

	event.recipes.gtceu.assembler('create:andesite_funnel')
		.itemInputs('#c:plates/wrought_iron', '#tfg:rubber_foils')
		.itemOutputs('create:andesite_funnel')
		.circuit(6)
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.assembler('create:andesite_funnel_leather')
		.itemInputs('#c:plates/wrought_iron', '#c:leather')
		.itemOutputs('create:andesite_funnel')
		.circuit(7)
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:andesite_funnel', [GTMaterials.WroughtIron, 1]) — хелпер мода TFG отсутствует

	// Умный раздатчик/приемник из латуни
	event.shaped('create:brass_funnel', [
		' E',
		'AD',
		'BC'
	], {
		A: '#c:plates/brass',
		B: ['#tfg:rubber_foils', '#c:leather'],
		C: '#c:tools/wrench',
		D: '#c:tools/knife',
		E: 'create:electron_tube'
	}).id('tfg:create/shaped/brass_funnel')

	event.recipes.gtceu.assembler('create:brass_funnel')
		.itemInputs('#c:plates/brass', '#tfg:rubber_foils', 'create:electron_tube')
		.itemOutputs('create:brass_funnel')
		.circuit(8)
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.assembler('create:brass_funnel_leather')
		.itemInputs('#c:plates/brass', '#c:leather', 'create:electron_tube')
		.itemOutputs('create:brass_funnel')
		.circuit(9)
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:brass_funnel', [GTMaterials.Brass, 1]) — хелпер мода TFG отсутствует

	// Тунель из железа
	event.shaped('create:andesite_tunnel', [
		' A',
		'DB'
	], {
		A: '#c:plates/wrought_iron',
		B: ['#tfg:rubber_foils', '#c:leather'],
		D: '#c:tools/wrench'
	}).id('tfg:create/shaped/andesite_tunnel')

	event.recipes.gtceu.assembler('create:andesite_tunnel')
		.itemInputs('#c:plates/wrought_iron', '#tfg:rubber_foils')
		.itemOutputs('create:andesite_tunnel')
		.circuit(10)
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.assembler('create:andesite_tunnel_leather')
		.itemInputs('#c:plates/wrought_iron', '#c:leather')
		.itemOutputs('create:andesite_tunnel')
		.circuit(11)
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:andesite_tunnel', [GTMaterials.WroughtIron, 1]) — хелпер мода TFG отсутствует

	// Тунель из латуни
	event.shaped('create:brass_tunnel', [
		'CA',
		'DB'
	], {
		A: '#c:plates/brass',
		B: ['#tfg:rubber_foils', '#c:leather'],
		C: 'create:electron_tube',
		D: '#c:tools/wrench'
	}).id('tfg:create/shaped/brass_tunnel')

	event.recipes.gtceu.assembler('create:brass_tunnel')
		.itemInputs('#c:plates/brass', '#tfg:rubber_foils', 'create:electron_tube')
		.itemOutputs('create:brass_tunnel')
		.circuit(12)
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.assembler('create:brass_tunnel_leather')
		.itemInputs('#c:plates/brass', '#c:leather', 'create:electron_tube')
		.itemOutputs('create:brass_tunnel')
		.circuit(13)
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:brass_tunnel', [GTMaterials.Brass, 1]) — хелпер мода TFG отсутствует

	// Дисплей столешница (чзх)
	event.shaped('4x create:display_board', [
		'DA ',
		'BCB',
		' A '
	], {
		A: '#c:plates/wrought_iron',
		B: '#c:rings/wrought_iron',
		C: '#c:small_gears',
		D: '#c:tools/wrench'
	}).id('tfg:create/shaped/display_board')

	event.recipes.gtceu.assembler('create:display_board')
		.itemInputs('2x #c:plates/wrought_iron', '2x #c:rings/wrought_iron', '#c:small_gears')
		.itemOutputs('4x create:display_board')
		.duration(50)
		.circuit(14)
		.EUt(GTValues.VA[GTValues.ULV])

	// Латунная рука
	event.recipes.gtceu.shaped('create:brass_hand', [
		' AB',
		'CCD',
		' C '
	], {
		A: '#c:tools/hammer',
		B: ChemicalHelper.get(TagPrefix.ingot, GTMaterials.Brass, 1),
		C: ChemicalHelper.get(TagPrefix.bolt, GTMaterials.Brass, 1),
		D: '#c:tools/file'
	}).addMaterialInfo().id('tfg:create/shaped/brass_hand')

	event.recipes.gtceu.assembler('tfg:create/brass_hand')
		.itemInputs('3x #c:bolts/brass', '#c:plates/brass')
		.circuit(3)
		.itemOutputs('create:brass_hand')
		.duration(200)
		.EUt(20)

	// Тюбик с клеем
	event.shaped('create:super_glue', [
		'BA',
		'CB'
	], {
		A: '#c:plates/wrought_iron',
		B: 'tfc:glue',
		C: '#c:rings/wrought_iron'
	}).id('tfg:create/shaped/super_glue')

	// Deployer
	event.shaped('create:deployer', [
		' A ',
		'DBF',
		' CE'
	], {
		A: '#c:cogwheels',
		B: 'create:shadow_steel_casing', // [PORT-CHECK] существует ли shadow_steel_casing в Create 6 (1.21.1)
		C: 'create:brass_hand',
		D: '#c:tools/wrench',
		E: '#c:tools/screwdriver',
		F: 'create:electron_tube'
	}).id('tfg:create/shaped/deployer')

	event.recipes.gtceu.assembler('create:deployer')
		.itemInputs('#c:cogwheels', 'create:shadow_steel_casing', 'create:brass_hand', 'create:electron_tube')
		.itemOutputs('create:deployer')
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:deployer', [GTMaterials.Brass, 12/9, GTMaterials.BlackSteel, 1, GTMaterials.Wood, 1]) — хелпер мода TFG отсутствует

	// Соединятор вагонеток
	event.shapeless('create:minecart_coupling', [
		'#tfg:metal_chains',
		'#c:bolts',
		'#tfg:metal_chains',
		'#c:bolts',
		'#tfg:metal_chains',
		'#c:tools/hammer'
	]).id('tfg:create/shapeless/minecart_coupling')

	event.recipes.gtceu.assembler('tfg:create/minecart_coupling')
		.itemInputs('3x #tfg:metal_chains', '2x #c:bolts')
		.circuit(1)
		.itemOutputs('create:minecart_coupling')
		.duration(200)
		.EUt(20)

	// Блупринт создания
	event.shapeless('create:crafting_blueprint', [
		'minecraft:painting',
		'#tfc:workbenches'
	]).id('tfg:create/shapeless/crafting_blueprint')

	// Медная бочка на спину
	// [PORT] greate (greate:andesite_alloy_shaft) и firmaciv (firmaciv:large_waterproof_hide) отсутствуют в сборке 1.21.1 — backtank без рецепта
	// event.shaped('create:copper_backtank', [
	// 	'ABA',
	// 	'CDC',
	// 	'EFE'
	// ], {
	// 	A: '#c:screws/copper',
	// 	B: 'greate:andesite_alloy_shaft',
	// 	C: '#c:plates/copper',
	// 	D: 'tfc:bellows',
	// 	E: 'firmaciv:large_waterproof_hide',
	// 	F: 'tfc:metal/chestplate/copper'
	// }).id('tfg:create/shaped/copper_backtank')

	// Шлем для дайвинга
	// [PORT] firmaciv отсутствует в сборке 1.21.1 (firmaciv:large_waterproof_hide)
	// event.recipes.tfc.advanced_shaped_crafting(
	// 	TFC.itemStackProvider.of('create:copper_diving_helmet').copyForgingBonus(), [
	// 		'ABA',
	// 		'CDC'
	// 	], {
	// 		A: '#c:plates/copper',
	// 		B: 'tfc:metal/helmet/copper',
	// 		C: '#c:glass_panes',
	// 		D: 'firmaciv:large_waterproof_hide'
	// 	}, 0, 1).id('tfg:create/shaped/copper_diving_helmet')

	// Ботинки для дайвинга
	// [PORT] firmaciv отсутствует в сборке 1.21.1 (firmaciv:large_waterproof_hide)
	// event.recipes.tfc.advanced_shaped_crafting(
	// 	TFC.itemStackProvider.of('create:copper_diving_boots').copyForgingBonus(), [
	// 		'ABA',
	// 		'CDC'
	// 	], {
	// 		A: '#c:screws/copper',
	// 		B: 'tfc:metal/boots/copper',
	// 		C: '#c:ingots/iron',
	// 		D: 'firmaciv:large_waterproof_hide'
	// 	}, 0, 1).id('tfg:create/shaped/copper_diving_boots_cast_iron')

	// event.recipes.tfc.advanced_shaped_crafting(
	// 	TFC.itemStackProvider.of('create:copper_diving_boots').copyForgingBonus(), [
	// 		'ABA',
	// 		'CDC'
	// 	], {
	// 		A: '#c:screws/copper',
	// 		B: 'tfc:metal/boots/copper',
	// 		C: '#c:ingots/wrought_iron',
	// 		D: 'firmaciv:large_waterproof_hide'
	// 	}, 0, 1).id('tfg:create/shaped/copper_diving_boots_wrought_iron')

	// Netherite backtank
	// [PORT] greate (greate:steel_shaft) и beneath (beneath:cursed_hide) отсутствуют в сборке 1.21.1
	// event.recipes.tfc.advanced_shaped_crafting(
	// 	TFC.itemStackProvider.of('create:netherite_backtank').copyForgingBonus(), [
	// 		'ABA',
	// 		'CDC',
	// 		'EFE'
	// 	], {
	// 		A: '#c:screws/blue_steel',
	// 		B: 'greate:steel_shaft',
	// 		C: '#c:plates/blue_steel',
	// 		D: 'gtceu:steel_drum',
	// 		E: 'beneath:cursed_hide',
	// 		F: 'tfc:metal/chestplate/blue_steel'
	// 	}, 2, 1).id('tfg:create/shaped/netherite_backtank')

	// [PORT] beneath отсутствует в сборке 1.21.1 (beneath:cursed_hide)
	// event.shaped('create:netherite_backtank', [
	// 	'ACA',
	// 	'CCC',
	// 	'EDE'
	// ], {
	// 	A: '#c:screws/blue_steel',
	// 	C: '#c:plates/blue_steel',
	// 	D: 'create:copper_backtank',
	// 	E: 'beneath:cursed_hide'
	// }).id('tfg:create/shaped/netherite_backtank_upgrade')

	// Netherite diving helmet
	// [PORT] beneath отсутствует в сборке 1.21.1 (beneath:cursed_hide)
	// event.recipes.tfc.advanced_shaped_crafting(
	// 	TFC.itemStackProvider.of('create:netherite_diving_helmet').copyForgingBonus(), [
	// 		'ABA',
	// 		'CDC'
	// 	], {
	// 		A: '#c:plates/blue_steel',
	// 		B: 'tfc:metal/helmet/blue_steel',
	// 		C: 'firmalife:reinforced_glass',
	// 		D: 'beneath:cursed_hide'
	// 	}, 0, 1).id('tfg:create/shaped/netherite_diving_helmet')

	// event.shaped('create:netherite_diving_helmet', [
	// 	' A ',
	// 	'ABA',
	// 	'CDC'
	// ], {
	// 	A: '#c:plates/blue_steel',
	// 	B: 'create:copper_diving_helmet',
	// 	C: 'firmalife:reinforced_glass',
	// 	D: 'beneath:cursed_hide'
	// }).id('tfg:create/shaped/netherite_diving_helmet_upgrade')

	// Netherite diving boots
	// [PORT] beneath отсутствует в сборке 1.21.1 (beneath:cursed_hide)
	// event.recipes.tfc.advanced_shaped_crafting(
	// 	TFC.itemStackProvider.of('create:netherite_diving_boots').copyForgingBonus(), [
	// 		'ABC',
	// 		'EDE'
	// 	], {
	// 		A: '#c:screws/blue_steel',
	// 		B: 'tfc:metal/boots/blue_steel',
	// 		C: '#c:plates/blue_steel',
	// 		D: 'beneath:cursed_hide',
	// 		E: '#c:ingots/lead'
	// 	}, 0, 1).id('tfg:create/shaped/netherite_diving_boots')

	// event.shaped('create:netherite_diving_boots', [
	// 	'ABA',
	// 	'CDC'
	// ], {
	// 	A: '#c:screws/blue_steel',
	// 	B: 'create:copper_diving_boots',
	// 	C: '#c:plates/blue_steel',
	// 	D: 'beneath:cursed_hide'
	// }).id('tfg:create/shaped/netherite_diving_boots_upgrade')

	// Херь, увеличивающая дистанцию копки
	event.recipes.create.mechanical_crafting('create:extendo_grip', [
		' A ',
		' B ',
		'CCC',
		'CCC',
		' D '
	], {
		A: '#c:plates/brass',
		B: 'create:precision_mechanism',
		C: '#c:rods/wooden',
		D: 'create:brass_hand'
	}).id('tfg:create/mechanical_crafting/extendo_grip')

	// Херь, устанавливающая блоки зеркально
	event.recipes.create.mechanical_crafting('create:wand_of_symmetry', [
		'  A  ',
		' ABA ',
		'  C  ',
		'  D  ',
		'  D  '
	], {
		A: '#c:glass',
		B: 'minecraft:redstone_lamp',
		C: 'create:precision_mechanism',
		D: '#c:rods/brass'
	}).id('tfg:create/mechanical_crafting/wand_of_symmetry')

	// Фильтр список
	event.shaped('create:filter', [
		'ABA'
	], {
		A: '#c:bolts/wrought_iron',
		B: '#c:cloth'
	}).id('tfg:create/shaped/filter')

	// Фильтр аттрибутов
	event.shaped('create:attribute_filter', [
		'ABA'
	], {
		A: '#c:bolts/brass',
		B: '#c:cloth'
	}).id('tfg:create/shaped/attribute_filter')

	event.shaped('create:package_filter', [
		'ABA'
	], {
		A: '#c:bolts/bismuth',
		B: '#c:cloth'
	}).id('tfg:create/shaped/package_filter')

	event.shapeless('create:package_filter', ['create:package_filter'])
		.id('tfg:shapeless/package_filter')

	// Расписание поездов
	event.shapeless('4x create:schedule', [
		'minecraft:paper',
		'#c:dyes/black'
	]).id('tfg:create/shapeless/schedule')

	// Дневник
	event.shaped('create:clipboard', [
		' AD',
		' B ',
		' C '
	], {
		A: '#c:small_springs',
		B: '#tfc:lumber',
		C: 'minecraft:paper',
		D: '#c:bolts'
	}).id('tfg:create/shaped/clipboard')

	// Лестница из железа
	event.shaped('7x create:andesite_ladder', [
		'A A',
		'AAA',
		'A A'
	], {
		A: '#c:rods/tin_alloy'
	}).id('tfg:create/shaped/andesite_ladder')

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:andesite_ladder', [GTMaterials.TinAlloy, 0.5]) — хелпер мода TFG отсутствует

	// Лестница из латуни
	event.shaped('7x create:brass_ladder', [
		'A A',
		'AAA',
		'A A'
	], {
		A: '#c:rods/brass'
	}).id('tfg:create/shaped/brass_ladder')

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:brass_ladder', [GTMaterials.Brass, 0.5]) — хелпер мода TFG отсутствует

	// Лестница из железа
	event.shaped('7x create:copper_ladder', [
		'A A',
		'AAA',
		'A A'
	], {
		A: '#c:rods/copper'
	}).id('tfg:create/shaped/copper_ladder')

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:copper_ladder', [GTMaterials.Copper, 0.5]) — хелпер мода TFG отсутствует

	// Леса из железа
	event.shaped('4x create:andesite_scaffolding', [
		'AAA',
		'A A'
	], {
		A: '#c:rods/tin_alloy'
	}).id('tfg:create/shaped/andesite_scaffolding')

	// Леса из латуни
	event.shaped('4x create:brass_scaffolding', [
		'AAA',
		'A A'
	], {
		A: '#c:rods/brass'
	}).id('tfg:create/shaped/brass_scaffolding')

	// Леса из железа
	event.shaped('4x create:copper_scaffolding', [
		'AAA',
		'A A'
	], {
		A: '#c:rods/copper'
	}).id('tfg:create/shaped/copper_scaffolding')

	// Деталь рельса
	const GIRDERS = [
		{ metal: 'iron', amount: 4 },
		{ metal: 'wrought_iron', amount: 8 },
		{ metal: 'steel', amount: 16 }
	]

	GIRDERS.forEach(material => {
		event.shaped(`${material.amount}x create:metal_girder`, [
			'AAA',
			'BBB'
		], {
			A: `#c:plates/${material.metal}`,
			B: `#c:bolts/${material.metal}`
		}).id(`tfg:create/shaped/metal_girder_from_${material.metal}`)

		event.recipes.gtceu.assembler(`tfg:create/metal_girder_from_${material.metal}`)
		.itemInputs(`3x #c:plates/${material.metal}`, `3x #c:bolts/${material.metal}`)
		.itemOutputs(`${material.amount}x create:metal_girder`)
		.duration(100)
		.EUt(20)
		.circuit(6)
	})

	// Стеклянная дверь
	event.shapeless('create:framed_glass_door', [
		'#minecraft:wooden_doors',
		'minecraft:glass_pane'
	]).id('tfg:create/shapeless/framed_glass_door')

	// Стеклянный люк
	event.shapeless('create:framed_glass_trapdoor', [
		'#minecraft:wooden_trapdoors',
		'minecraft:glass_pane'
	]).id('tfg:create/shapeless/framed_glass_trapdoor')

	//
	event.recipes.create.mechanical_crafting('create:potato_cannon', [
		'ABCCC',
		'DD   '
	], {
		A: '#c:screws/copper',
		B: 'create:precision_mechanism',
		C: 'create:fluid_pipe',
		D: '#c:plates/copper'
	}).id('tfg:create/mechanical_crafting/potato_cannon')

	// Липкий механический поршень
	event.shaped('create:mechanical_piston', [
		'A',
		'B',
		'C'
	], {
		A: 'minecraft:piston',
		B: 'create:andesite_casing',
		C: '#c:shafts'
	}).id('tfg:create/shaped/mechanical_piston')

	event.shaped('create:sticky_mechanical_piston', [
		'A',
		'B',
		'C'
	], {
		A: '#c:tools/hammer',
		B: 'tfc:glue',
		C: 'create:mechanical_piston'
	}).id('tfg:create/shaped/sticky_mechanical_piston_from_glue')

	event.shaped('create:sticky_mechanical_piston', [
		'A',
		'B',
		'C'
	], {
		A: '#c:tools/hammer',
		B: 'gtceu:sticky_resin',
		C: 'create:mechanical_piston',
	}).id('tfg:create/shaped/sticky_mechanical_piston_from_sticky_resin')

	event.recipes.gtceu.assembler('tfg:create/sticky_mechanical_piston_from_liquid_glue')
		.itemInputs('create:mechanical_piston')
		.inputFluids(Fluid.of('gtceu:glue', 50))
		.itemOutputs('create:sticky_mechanical_piston')
		.duration(100)
		.EUt(4)

	event.recipes.gtceu.assembler('tfg:create/sticky_mechanical_piston_from_slimeball')
		.itemInputs('create:mechanical_piston', 'tfc:glue')
		.itemOutputs('create:sticky_mechanical_piston')
		.duration(100)
		.EUt(4)

	event.recipes.gtceu.assembler('tfg:create/sticky_mechanical_piston_from_sticky_resin')
		.itemInputs('create:mechanical_piston', 'gtceu:sticky_resin')
		.itemOutputs('create:sticky_mechanical_piston')
		.duration(100)
		.EUt(4)

	//#region Покраска ручек от люка

	event.recipes.tfc.barrel_sealed(Fluid.of(`tfc:lye`, 144), 1000)
		.inputItem('#tfg:colored_valve_handles') // [PORT-FIX] kubejs_tfc 2.0: конструктор (input_fluid, duration) + inputItem вместо inputs
		.outputItem(`create:copper_valve_handle`)
		.id(`barrel/create/valve_handle_decolor`)

	global.MINECRAFT_DYE_NAMES.forEach(dye => {
		event.recipes.tfc.barrel_sealed(Fluid.of(`tfc:${dye}_dye`, 144), 1000)
			.inputItem('create:copper_valve_handle') // [PORT-FIX] kubejs_tfc 2.0: конструктор (input_fluid, duration) + inputItem вместо inputs
			.outputItem(`create:${dye}_valve_handle`)
			.id(`barrel/create/${dye}_valve_handle`)
	})

	//#endregion

	//#region Покраска тулбоксов

	global.MINECRAFT_DYE_NAMES.forEach(dye => {
		if (dye !== 'brown') {
			event.remove({ id: `create:create.toolbox.color.block.create.${dye}_toolbox` })

			// [PORT-CHECK] NBT->components needs in-game verification: оригинал копировал содержимое тулбокса через
			// ISP-модификатор tfg:copy_nbt (Ф4). Пока рецепт выдаёт пустой тулбокс без переноса содержимого.
			event.recipes.tfc.barrel_sealed(Fluid.of(`tfc:${dye}_dye`, 288), 1000)
				.inputItem('#create:toolboxes') // [PORT-FIX] kubejs_tfc 2.0: конструктор (input_fluid, duration) + inputItem вместо inputs
				.outputItem(`create:${dye}_toolbox`)
				.id(`barrel/create/${dye}_toolbox`)

			// [PORT-Ф4] gtceu:food_processor — кастомная машина TFG, отсутствует в сборке
			// event.recipes.gtceu.food_processor(`create/${dye}_toolbox`)
			// 	.itemInputs('#create:toolboxes')
			// 	.inputFluids(Fluid.of(`tfc:${dye}_dye`, 288))
			// 	.itemOutputs(`create:${dye}_toolbox`)
			// 	.duration(200)
			// 	.EUt(4)

			// [PORT-Ф4] $ISPRecipeLogic и модификатор tfg:copy_nbt — часть мода TFG, отсутствуют
			// $ISPRecipeLogic.RegisterRecipeData(`food_processor/create/${dye}_toolbox`,
			// 	[Ingredient.of('#create:toolboxes')],
			// 	TFC.isp.of(`create:${dye}_toolbox`).simpleModifier('tfg:copy_nbt').asCanonClass(),
			// 	[])
		}
	})

	//#endregion

	//#region Painting postboxes
	event.recipes.tfc.barrel_sealed(Fluid.of(`tfc:lye`, 288), 1000)
		.inputItem('#create:postboxes') // [PORT-FIX] kubejs_tfc 2.0: конструктор (input_fluid, duration) + inputItem вместо inputs
		.outputItem(`create:white_postbox`)
		.id(`barrel/create/postbox_decolor`)

	global.MINECRAFT_DYE_NAMES.forEach(dye => {
		if (dye !== 'white') {
			event.recipes.tfc.barrel_sealed(Fluid.of(`tfc:${dye}_dye`, 288), 1000)
				.inputItem('create:white_postbox') // [PORT-FIX] kubejs_tfc 2.0: конструктор (input_fluid, duration) + inputItem вместо inputs
				.outputItem(`create:${dye}_postbox`)
				.id(`barrel/create/${dye}_postbox`)

			event.recipes.gtceu.chemical_bath(`create/${dye}_postbox`)
				.itemInputs('create:white_postbox')
				.inputFluids(Fluid.of(`tfc:${dye}_dye`, 288))
				.itemOutputs(`create:${dye}_postbox`)
				.duration(200)
				.EUt(4)
				.category(GTRecipeCategories.CHEM_DYES)
		}
	})

	//#endregion

	//#region Painting table cloths
	event.recipes.tfc.barrel_sealed(Fluid.of(`tfc:lye`, 144), 1000)
		.inputItem('#create:dyed_table_cloths') // [PORT-FIX] kubejs_tfc 2.0: конструктор (input_fluid, duration) + inputItem вместо inputs
		.outputItem(`create:white_table_cloth`)
		.id(`barrel/create/table_cloth_decolor`)

	global.MINECRAFT_DYE_NAMES.forEach(dye => {
		if (dye !== 'white') {
			event.recipes.tfc.barrel_sealed(Fluid.of(`tfc:${dye}_dye`, 288), 1000)
				.inputItem('create:white_table_cloth') // [PORT-FIX] kubejs_tfc 2.0: конструктор (input_fluid, duration) + inputItem вместо inputs
				.outputItem(`create:${dye}_table_cloth`)
				.id(`barrel/create/${dye}_table_cloth`)

			event.recipes.gtceu.chemical_bath(`create/${dye}_table_cloth`)
				.itemInputs('create:white_table_cloth')
				.inputFluids(Fluid.of(`tfc:${dye}_dye`, 288))
				.itemOutputs(`create:${dye}_table_cloth`)
				.duration(200)
				.EUt(4)
				.category(GTRecipeCategories.CHEM_DYES)
		}
	})

	//#endregion

	//#region Покраска сидушек

	event.recipes.tfc.barrel_sealed(Fluid.of(`tfc:lye`, 288), 1000)
		.inputItem('#tfg:colored_seats') // [PORT-FIX] kubejs_tfc 2.0: конструктор (input_fluid, duration) + inputItem вместо inputs
		.outputItem(`create:white_seat`)
		.id(`barrel/create/seat_decolor`)

	global.MINECRAFT_DYE_NAMES.forEach(dye => {
		if (dye !== "white") {

			event.recipes.tfc.barrel_sealed(Fluid.of(`tfc:${dye}_dye`, 288), 1000)
				.inputItem(`create:white_seat`) // [PORT-FIX] kubejs_tfc 2.0: конструктор (input_fluid, duration) + inputItem вместо inputs
				.outputItem(`create:${dye}_seat`)
				.id(`barrel/create/${dye}_seat`)
		}
	})

	//#endregion

	//#region Механизм точности

	// [PORT-Ф2-TEMP] пустые теги c:small_springs/gold и c:small_gears/brass (флаги Ф2) валят create-схему
	// при сериализации — до фикса Ф2 остаётся ванильный рецепт (см. not-список remove выше).
	// event.recipes.create.sequenced_assembly([
	// 	'create:precision_mechanism',
	// ], '#c:plates/gold', [
	// 	event.recipes.create.deploying('create:incomplete_precision_mechanism', ['create:incomplete_precision_mechanism', { tag: 'c:small_springs/gold' }]), // [PORT-FIX] {tag:...}-объект: голый '#тег' парсится как жидкость, Ingredient.of с пустым тегом сериализуется в пустой шаг
	// 	event.recipes.create.deploying('create:incomplete_precision_mechanism', ['create:incomplete_precision_mechanism', { tag: 'c:small_gears/brass' }]), // [PORT-FIX] {tag:...}; [PORT-Ф2] тег c:small_gears/brass пуст до флага GENERATE_SMALL_GEAR из Фазы 2 — рецепт зарегистрируется, но заработает после Ф2
	// 	event.recipes.create.deploying('create:incomplete_precision_mechanism', ['create:incomplete_precision_mechanism', { tag: 'c:bolts/wrought_iron' }]), // [PORT-FIX] {tag:...}
	// ]).transitionalItem('create:incomplete_precision_mechanism').loops(3).id('tfg:create/sequenced_assembly/precision_mechanism')

	event.recipes.gtceu.assembler('tfg:create/precision_mechanism')
		.itemInputs('#c:plates/gold', '2x #c:small_springs/gold', '2x #c:small_gears/brass', '2x #c:bolts/wrought_iron')
		.itemOutputs('create:precision_mechanism')
		.duration(20 * 20)
		.EUt(20)
		.addMaterialInfo(true)

	//#endregion

	// #region Water Wheels

	event.recipes.gtceu.shaped('create:water_wheel', [
		'ACA',
		'CBC',
		'ACA'
	], {
		A: 'gtceu:treated_wood_planks',
		B: 'create:andesite_casing',
		C: '#c:rods/wrought_iron'
	}).addMaterialInfo().id('create:shaped/water_wheel')

	event.recipes.gtceu.shaped('create:large_water_wheel', [
		'ACA',
		'CBC',
		'ACA'
	], {
		A: 'gtceu:treated_wood_planks',
		B: 'create:water_wheel',
		C: '#c:plates/steel'
	}).addMaterialInfo().id('create:shaped/large_water_wheel')

	// #endregion

	// #region Windmill Bearing

	event.shaped('create:windmill_bearing', [
		'FA ',
		'DBE',
		' C '
	], {
		A: 'gtceu:treated_wood_slab',
		B: 'create:andesite_casing',
		C: '#c:cogwheels',
		D: '#c:small_gears/brass',
		E: '#c:tools/hammer',
		F: 'tfc:glue'
	}).id('create:shaped/windmill_bearing')

	event.recipes.gtceu.assembler('create:windmill_bearing')
		.itemInputs('gtceu:treated_wood_slab', 'create:andesite_casing', '#c:cogwheels', '#c:small_gears/brass')
		.inputFluids(Fluid.of('gtceu:glue', 50))
		.itemOutputs('create:windmill_bearing')
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])
		.circuit(1)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:windmill_bearing', [GTMaterials.Wood, 1.5, GTMaterials.Brass, 1, GTMaterials.WroughtIron, 1]) — хелпер мода TFG отсутствует

	// #endregion

	//#region Blaze burner

	event.shaped('create:blaze_burner', [
		'EFE',
		'BAB',
		'DCD'
	], {
		A: '#c:gems/coke',
		B: 'tfc:metal/bars/steel',
		C: '#c:double_plates/steel',
		D: '#c:plates/steel',
		E: '#c:rods/steel',
		F: '#c:tools/hammer'
	}).id('tfg:create/shaped/blaze_burner')

	event.recipes.gtceu.assembler('create:blaze_burner')
		.itemInputs('#c:gems/coke', '2x tfc:metal/bars/steel', '2x #c:rods/steel', '#c:double_plates/steel', '2x #c:plates/steel')
		.itemOutputs('create:blaze_burner')
		.duration(50)
		.circuit(2)
		.EUt(GTValues.VA[GTValues.ULV])
		.addMaterialInfo(true)

	//#endregion

	// #region So-called "Shit Glass"

	event.shaped('4x create:framed_glass',
		[
			'AA',
			'AA'
		], {
		A: 'minecraft:glass'
	}).id('tfg:create/framed_glass')

	event.shaped('4x create:tiled_glass',
		[
			'A A',
			'   ',
			'A A'
		], {
		A: 'minecraft:glass'
	}).id('tfg:create/tiled_glass')

	event.shaped('4x create:horizontal_framed_glass',
		[
			'AA',
			'  ',
			'AA'
		], {
		A: 'minecraft:glass'
	}).id('tfg:create/horizontal_framed_glass')

	event.shaped('4x create:vertical_framed_glass',
		[
			'A A',
			'A A'
		], {
		A: 'minecraft:glass'
	}).id('tfg:create/vertical_framed_glass')

	const CREATE_FRAMED_GLASS_WINDOWS =
	[
		'framed_glass',
		'tiled_glass',
		'horizontal_framed_glass',
		'vertical_framed_glass'
	]

	CREATE_FRAMED_GLASS_WINDOWS.forEach(x => {
		event.shapeless(`2x create:${x}_pane`,
			[
				`create:${x}`,
				'#c:tools/saw'
			])
			.id(`tfg:create/shapeless/${x}_pane`)

		event.recipes.gtceu.cutter(`tfg:create/${x}_pane`)
			.itemInputs(`3x create:${x}`)
			.itemOutputs(`8x create:${x}_pane`)
			.duration(40)
			.EUt(7)
	})

	const CREATE_OTHER_GLASS_WINDOWS =
	[
		['dark_oak', 'tfc:wood/planks/hickory'],
		['mangrove', 'tfc:wood/planks/mangrove'],
		['cherry', 'afc:wood/planks/fig'],
		['oak', 'tfc:wood/planks/oak'],
		['spruce', 'afc:wood/planks/cypress'],
		['jungle', 'afc:wood/planks/teak'],
		['birch', 'afc:wood/planks/eucalyptus'],
		['acacia', 'afc:wood/planks/baobab'],
		// [PORT] beneath отсутствует в сборке 1.21.1 — crimson/warped окна пока без рецепта (можно заменить на ванильные доски)
		// ['crimson', 'beneath:wood/planks/crimson'],
		// ['warped', 'beneath:wood/planks/warped'],
		['bamboo', 'minecraft:bamboo_planks'],
		['ornate_iron', 'tfc:metal/bars/wrought_iron'],
		['industrial_iron', 'tfc:metal/bars/steel']
	]

	CREATE_OTHER_GLASS_WINDOWS.forEach(x => {
		event.shaped(`2x create:${x[0]}_window`,
			[
				'   ',
				'BAB',
				' B '
			], {
			A: '#c:glass',
			B: x[1]
		}).id(`tfg:create/shaped/${x[0]}_window`)

		event.shapeless(`2x create:${x[0]}_window_pane`,
			[
				`create:${x[0]}_window`,
				'#c:tools/saw'
			])
			.id(`tfg:create/shapeless/${x[0]}_window_pane`)

		event.recipes.gtceu.cutter(`tfg:create/${x[0]}_window_pane`)
			.itemInputs(`3x create:${x[0]}_window`)
			.itemOutputs(`8x create:${x[0]}_window_pane`)
			.duration(40)
			.EUt(7)
	})

	//Allow automatic scraping by using sequenced assembly
	// [PORT-CHECK] JSON структура tfc:scraping в 1.21 могла измениться — обёрнуто в try/catch, проверить в игре, что рецепты генерируются
	event.forEachRecipe({ type: 'tfc:scraping' }, r => {
		try {
			let obj = JSON.parse(String(r.json))
			let ing = obj.ingredient
			let originalRecipeIngredient = (typeof ing === 'string') ? ing : (ing && ing.item ? ing.item : null)
			let res = obj.result
			let output = (typeof res === 'string') ? res : (res ? (res.item || res.id || (res.stack ? res.stack.id : null)) : null)
			if (!originalRecipeIngredient || !output) return

			event.recipes.create.sequenced_assembly([output], originalRecipeIngredient, [
				event.recipes.create.deploying(originalRecipeIngredient, [originalRecipeIngredient, { tag: 'c:tools/knife' }]).keepHeldItem() // [PORT-FIX] tfc:knives -> c:tools/knife; {tag:...}-объект, чтобы тег не распарсился как жидкость
			]).transitionalItem(originalRecipeIngredient).loops(16)
		} catch (err) {
			console.warn('[Gregnautics] tfg_port create: scraping->sequenced_assembly пропущен для ' + r.getId() + ': ' + err)
		}
	})

	// #endregion

	//#region Create 6 Logistics

	event.shaped('2x create:chain_conveyor', [
		'DAE',
		'CBC',
		' A '
	], {
		A: '#c:large_cogwheels',
		B: 'create:andesite_casing',
		C: 'gtceu:treated_wood_plate',
		D: '#c:tools/wrench',
		E: '#c:tools/hammer'
	}).id('create:shaped/chain_conveyor')

	event.recipes.gtceu.assembler('create:chain_conveyor')
		.itemInputs('2x #c:large_cogwheels', 'create:andesite_casing', 'gtceu:treated_wood_plate')
		.itemOutputs('2x create:chain_conveyor')
		.circuit(20)
		.duration(20 * 20)
		.EUt(20)

	event.shaped('2x create:cardboard', [
		'ABA',
		'BAB',
		'ABA'
	], {
		A: 'minecraft:paper',
		B: 'tfc:glue'
	}).id('tfg:create/shaped/cardboard_from_glue')

	event.recipes.gtceu.assembler('tfg:create/cardboard_from_glue')
		.itemInputs('4x minecraft:paper')
		.inputFluids(Fluid.of('gtceu:glue', 50))
		.circuit(5)
		.itemOutputs('2x create:cardboard')
		.duration(200)
		.EUt(7)

	event.recipes.gtceu.packer('tfg:cardboard_block')
		.itemInputs('4x create:cardboard', '#c:string')
		.itemOutputs('create:bound_cardboard_block')
		.duration(500)
		.EUt(7)

	// [PORT-Ф2] тег #c:small_gears/red_alloy пуст (нужен флаг GENERATE_SMALL_GEAR для RedAlloy из заблокированной Фазы 2) — gtceu:shaped жёстко валидирует ключи и падает
	// event.recipes.gtceu.shaped('create:packager', [
	// 	' A ',
	// 	'BCD',
	// 	'FEG'
	// ], {
	// 	A: '#c:small_gears/red_alloy',
	// 	B: '#c:springs/wrought_iron',
	// 	C: 'create:andesite_casing',
	// 	D: 'create:bound_cardboard_block',
	// 	E: 'create:electron_tube',
	// 	F: '#c:tools/screwdriver',
	// 	G: '#c:tools/wrench'
	// }).addMaterialInfo().id('tfg:create/shaped/packager')

	event.recipes.gtceu.assembler('create:packager')
		.itemInputs('#c:small_gears/red_alloy', '#c:springs/wrought_iron', 'create:andesite_casing', 'create:bound_cardboard_block', 'create:electron_tube')
		.itemOutputs('create:packager')
		.circuit(20)
		.duration(100)
		.EUt(20)

	event.shaped('create:item_hatch', [
		'A',
		'B',
		'C'
	], {
		A: '#c:tools/hammer',
		B: '#minecraft:wooden_trapdoors',
		C: 'create:chute',
	}).id('tfg:create/shaped/item_hatch_tfc')

	event.shaped('create:item_hatch', [
		'A',
		'B',
		'C'
	], {
		A: '#c:tools/hammer',
		B: '#createdeco:metal_trapdoors',
		C: 'create:chute',
	}).id('tfg:create/shaped/item_hatch_deco')

	event.recipes.gtceu.assembler('tfg:create/item_hatch_tfc')
		.itemInputs('3x #c:plates/wrought_iron', '#minecraft:wooden_trapdoors')
		.circuit(19)
		.itemOutputs('create:item_hatch')
		.duration(200)
		.EUt(20)

	event.recipes.gtceu.assembler('tfg:create/item_hatch_deco')
		.itemInputs('3x #c:plates/wrought_iron', '#createdeco:metal_trapdoors')
		.circuit(19)
		.itemOutputs('create:item_hatch')
		.duration(200)
		.EUt(20)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:item_hatch', [GTMaterials.WroughtIron, 3]) — хелпер мода TFG отсутствует

	event.shaped('create:package_frogport', [
		' A ',
		'HCB',
		'EDF'
	], {
		A: 'tfc:glue',
		B: '#c:small_gears/red_alloy',
		C: '#tfg:metal_chains',
		D: 'create:andesite_casing',
		E: '#c:tools/screwdriver',
		F: '#c:tools/wrench',
		H: 'create:electron_tube'
	}).id('tfg:create/shaped/package_frogport')

	event.recipes.gtceu.assembler('tfg:create/package_frogport')
		.itemInputs('#tfg:metal_chains', '1x #c:small_gears/red_alloy', 'create:electron_tube', 'create:andesite_casing')
		.inputFluids(Fluid.of('gtceu:glue', 50))
		.itemOutputs('create:package_frogport')
		.circuit(20)
		.duration(200)
		.EUt(20)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:package_frogport', [GTMaterials.RedAlloy, 1, GTMaterials.WroughtIron, 1, GTMaterials.Wood, 1]) — хелпер мода TFG отсутствует

	event.shapeless('create:white_postbox', [
		'create:track_signal',
		'gtceu:wood_crate'
	]).id('create:crafting/shapeless/white_postbox')

	// [PORT-Ф4] tfg:scaffolding_frame пока не существует — white_table_cloth крафтится только через покраску/lye
	// event.shaped('create:white_table_cloth', [
	// 	'AA',
	// 	'BB'
	// ], {
	// 	A: '#c:cloth',
	// 	B: 'tfg:scaffolding_frame'
	// }).id('tfg:create/shaped/white_table_cloth')

	// [PORT-CHECK] проверить, что предмет create:transmitter существует в Create 6.0.10 (1.21.1)
	event.recipes.gtceu.laser_engraver('create:transmitter')
		.itemInputs('2x #c:plates/red_alloy')
		.notConsumableItem('#c:lenses/pink') // [PORT-FIX] notConsumable(string) не существует в GTCEu 1.21 → notConsumableItem
		.itemOutputs('create:transmitter')
		.duration(1200)
		.EUt(30)

	event.shaped('create:stock_link', [
		' D ',
		'BAE',
		'GCF'
	], {
		A: 'gtceu:ulv_machine_casing',
		B: '#c:small_gears/red_alloy',
		C: '#gtceu:circuits/ulv',
		D: 'create:transmitter',
		E: '#c:plates/rose_quartz',
		F: '#c:tools/wrench',
		G: '#c:tools/screwdriver'
	}).id('tfg:create/shaped/stock_link')

	event.recipes.gtceu.assembler('create:stock_link')
		.itemInputs('gtceu:ulv_machine_casing', '#gtceu:circuits/ulv', 'create:transmitter', '#c:small_gears/red_alloy', '#c:plates/rose_quartz')
		.itemOutputs('create:stock_link')
		.duration(150)
		.EUt(16)
		.circuit(1)
		.addMaterialInfo(true)

	event.shaped('create:stock_ticker', [
		' A ',
		'ABA',
		'CDC'
	], {
		A: '#c:glass_panes',
		B: 'create:stock_link',
		C: '#gtceu:resistors',
		D: '#c:plates/rose_quartz'
	}).id('tfg:create/shaped/stock_ticker')

	// [PORT-Ф2-TEMP] createvintageneoforged:redstone_module отсутствует в CVI 1.21 —
	// рецепт отключён, ванильный create:crafting/logistics/redstone_requester оставлен (см. not-список remove).
	// event.shaped('create:redstone_requester', [
	// 	' A ',
	// 	' B ',
	// 	'CDC'
	// ], {
	// 	A: '#c:plates/wrought_iron',
	// 	B: 'create:stock_link',
	// 	C: '#gtceu:circuits/ulv',
	// 	D: 'createvintageneoforged:redstone_module' // [PORT] modid vintageimprovements -> createvintageneoforged
	// }).id('tfg:create/shaped/redstone_requester')

	event.shaped('create:factory_gauge', [
		'CFC',
		'DAE',
		'FGF'
	], {
		A: 'create:precision_mechanism',
		C: '#c:screws/aluminium',
		D: '#gtceu:diodes',
		E: '#gtceu:circuits/lv',
		F: '#c:plates/rose_quartz',
		G: '#c:tools/wrench'
	}).id('tfg:create/shaped/factory_gauge')

	event.recipes.gtceu.assembler('create:factory_gauge')
		.itemInputs('create:precision_mechanism', '2x #c:screws/aluminium', '#gtceu:diodes', '3x #c:plates/rose_quartz', '#gtceu:circuits/lv')
		.itemOutputs('create:factory_gauge')
		.duration(150)
		.EUt(16)
		.addMaterialInfo(true)

	//#endregion

	//#region Decoration blocks

	const DECO_BLOCKS = [
		{ base: 'tfc:rock/raw/diorite', cut: 'create:cut_diorite', vanilla: 'minecraft:diorite' },
		// this is renamed to Cut Chert
		{ base: 'tfc:rock/raw/chert', cut: 'create:cut_granite', vanilla: 'minecraft:granite' },
		{ base: 'tfc:rock/raw/andesite', cut: 'create:cut_andesite', vanilla: 'minecraft:andesite' },
		{ base: 'tfc:rock/raw/limestone', cut: 'create:cut_limestone' },
		{ base: 'minecraft:deepslate', cut: 'create:cut_deepslate' },
		{ base: 'minecraft:dripstone_block', cut: 'create:cut_dripstone' },
		{ base: 'minecraft:calcite', cut: 'create:cut_calcite' }
	]

	DECO_BLOCKS.forEach(x => {

		// [PORT-FIX] damage_inputs_shapeless_crafting удалён в kubejs_tfc 2.0 —
		// в TFC 1.21 урон инструментов в крафте идёт через crafting remainder автоматически.
		event.shapeless(x.cut, [x.base, '#c:tools/chisel', '#c:tools/file'])
			.id(`create:shapeless/chisel_${x.cut.split(':')[1]}`)

		event.recipes.gtceu.laser_engraver(`engrave_${x.cut.split(':')[1]}`)
			.itemInputs(x.base)
			.notConsumableItem('tfc:lens') // [PORT-FIX] notConsumable(string) → notConsumableItem
			.itemOutputs(x.cut)
			.duration(32)
			.EUt(GTValues.VA[GTValues.ULV])

		event.shaped(`2x create:layered_${x.cut.split('_')[1]}`, [
			'AA'
		], {
			A: x.cut
		})

		event.shaped(`2x create:${x.cut.split('_')[1]}_pillar`, [
			'A',
			'A'
		], {
			A: x.cut
		})

		// Stops the stonecutter recipe turning it back into vanilla stone
		if ("vanilla" in x) {
			event.replaceOutput({ mod: 'create' }, x.vanilla, x.base);
		}
	})

	//#endregion

	event.shaped('create:white_seat', [
		'DA ',
		'CBC'
	], {
		A: '#tfc:high_quality_cloth',
		B: '#minecraft:wooden_slabs',
		C: '#c:screws',
		D: '#c:tools/hammer'
	}).id('tfg:create/shaped/white_seat')

	event.recipes.gtceu.assembler('create:white_seat')
		.itemInputs('#tfc:high_quality_cloth', '#minecraft:wooden_slabs', '2x #c:screws')
		.itemOutputs('create:white_seat')
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])

	event.shaped('create:brown_toolbox', [
		'CEC',
		'BFB',
		'DAD'
	], {
		A: '#c:chests/wooden',
		B: '#c:plates/brass',
		C: '#c:bolts/brass',
		D: '#c:screws',
		E: '#c:tools/screwdriver',
		F: 'gtceu:treated_wood_frame'
	}).id('tfg:create/shaped/brown_toolbox')

	event.recipes.gtceu.assembler('create:brown_toolbox')
		.itemInputs('#c:chests/wooden', 'gtceu:treated_wood_frame', '2x #c:plates/brass',
					'2x #c:bolts/brass', '2x #c:screws')
		.itemOutputs('create:brown_toolbox')
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])

	event.shaped('create:contraption_controls', [
		'EAF',
		'DBD',
		' C '
	], {
		A: '#minecraft:buttons',
		B: 'create:andesite_casing',
		C: 'create:electron_tube',
		D: '#c:plates/wrought_iron',
		E: '#c:tools/hammer',
		F: '#c:tools/wrench'
	}).id('tfg:create/shaped/contraption_controls')

	event.recipes.gtceu.assembler('create:contraption_controls')
		.itemInputs('#minecraft:buttons', 'create:andesite_casing', 'create:electron_tube', '2x #c:plates/wrought_iron')
		.itemOutputs('create:contraption_controls')
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])
		.circuit(18)
		.addMaterialInfo(true)

	event.shaped('create:wrench', [
		' BB',
		' C ',
		'AD '
	], {
		A: '#c:rods/wooden',
		B: '#c:plates/brass',
		C: '#c:cogwheels',
		D: '#c:tools/hammer'
	}).id('tfg:create/shaped/wrench')

	event.shaped('create:goggles', [
		'BBB',
		'AEA',
		'C C'
	], {
		A: '#c:rings/brass',
		B: '#tfg:rubber_foils', // [PORT] sns (sns:leather_strip) отсутствует в сборке 1.21.1 — оставлена альтернатива из резины
		C: 'tfc:lens',
		E: '#c:tools/hammer'
	}).id('tfg:create/shaped/goggles')

	// [PORT] sns отсутствует в сборке 1.21.1 (sns:leather_strip)
	// event.recipes.gtceu.assembler('create:goggles')
	// 	.itemInputs('2x #c:rings/brass', '3x sns:leather_strip', '2x tfc:lens')
	// 	.itemOutputs('create:goggles')
	// 	.circuit(10)
	// 	.duration(50)
	// 	.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.assembler('create:goggles_rubber')
		.itemInputs('2x #c:rings/brass', '#tfg:rubber_foils', '2x tfc:lens')
		.itemOutputs('create:goggles')
		.circuit(10)
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])

	event.shaped('create:analog_lever', [
		'CA',
		'DB'
	], {
		A: 'minecraft:lever',
		B: 'create:andesite_casing',
		C: '#c:tools/wrench',
		D: 'minecraft:redstone'
	}).id('tfg:create/shaped/analog_lever')

	event.recipes.gtceu.assembler('create:analog_lever')
		.itemInputs('minecraft:lever', 'create:andesite_casing', 'minecraft:redstone')
		.itemOutputs('create:analog_lever')
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])

	event.shaped('create:redstone_link', [
		'FCB',
		'DAD',
		' E '
	], {
		A: 'create:andesite_casing',
		B: '#gtceu:circuits/ulv',
		C: '#c:small_springs/red_alloy',
		D: '#c:plates/wrought_iron',
		E: '#c:tools/wrench',
		F: '#c:tools/screwdriver'
	}).id('tfg:create/shaped/redstone_link')

	event.recipes.gtceu.assembler('create:redstone_link')
		.itemInputs('create:andesite_casing', '#gtceu:circuits/ulv', '#c:small_springs/red_alloy', '2x #c:plates/wrought_iron')
		.itemOutputs('create:redstone_link')
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])
		.addMaterialInfo(true)
		.circuit(17)

	event.shaped('create:display_link', [
		'FED',
		'BAB',
		' C '
	], {
		A: 'create:brass_casing',
		B: '#c:small_springs/red_alloy',
		C: '#c:plates/brass',
		D: 'create:electron_tube',
		E: '#c:screws',
		F: '#c:tools/wrench'
	}).id('tfg:create/shaped/display_link')

	event.recipes.gtceu.assembler('create:display_link')
		.itemInputs('create:brass_casing', '2x #c:small_springs/red_alloy', '#c:plates/brass', 'create:electron_tube')
		.itemOutputs('create:display_link')
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])
		.addMaterialInfo(true)

	event.shaped('create:linked_controller', [
		'CAC',
		'CBC',
		'CDC'
	], {
		A: 'gtceu:lv_sensor',
		B: 'create:andesite_casing',
		C: '#minecraft:buttons',
		D: '#c:small_springs/red_alloy'
	}).id('tfg:create/shaped/linked_controller')

	event.shaped('create:rotation_speed_controller', [
		'ECE',
		'BAB',
		'DFG'
	], {
		A: 'create:brass_casing',
		B: '#c:small_gears/brass',
		C: '#c:small_gears/red_alloy',
		D: '#c:tools/wrench',
		E: '#c:small_springs/steel',
		F: '#c:shafts',
		G: '#c:tools/hammer'
	}).id('tfg:create/shaped/rotation_speed_controller')

	event.recipes.gtceu.assembler('create:rotation_speed_controller')
		.itemInputs('create:brass_casing', '2x #c:small_gears/brass', '#c:small_gears/red_alloy', '#c:shafts')
		.itemOutputs('create:rotation_speed_controller')
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:rotation_speed_controller', [GTMaterials.Wood, 1, GTMaterials.Brass, 3, GTMaterials.RedAlloy, 1]) — хелпер мода TFG отсутствует

	event.shaped('create:pulse_timer', [
		'E E',
		'ABC',
		'DDD'
	], {
		A: 'minecraft:redstone',
		B: '#c:plates/brass',
		C: 'minecraft:redstone_torch',
		D: '#c:stone',
		E: '#tfg:precision_fabricator_holder_rods' // [PORT-CHECK] тег tfg:precision_fabricator_holder_rods должен наполняться другим скриптом, иначе рецепт мёртвый
	}).id('tfg:shaped/pulse_timer')

	event.shaped('create:desk_bell', [
		'A',
		'B',
		'C'
	], {
		A: '#minecraft:buttons',
		B: ['tfc:brass_bell', 'tfc:bronze_bell'], // [PORT-FIX] тега tfc:bells нет в TFC 4.2.5 — перечислены предметы явно
		C: 'minecraft:redstone'
	}).id('tfg:shaped/desk_bell')

	event.shaped('create:sequenced_gearshift', [
		'DBE',
		'CAC',
		'   '
	], {
		A: 'create:brass_casing',
		B: 'create:electron_tube',
		C: '#c:cogwheels',
		D: '#c:tools/wrench',
		E: '#c:tools/hammer'
	}).id('tfg:create/shaped/sequenced_gearshift')

	event.recipes.gtceu.assembler('create:sequenced_gearshift')
		.itemInputs('create:brass_casing', 'create:electron_tube', '2x #c:cogwheels')
		.itemOutputs('create:sequenced_gearshift')
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:sequenced_gearshift', [GTMaterials.Wood, 1, GTMaterials.Steel, 4, GTMaterials.WroughtIron, 3]) — хелпер мода TFG отсутствует

	event.shaped('create:mechanical_bearing', [
		'CBE',
		' A ',
		' D '
	], {
		A: 'create:andesite_casing',
		B: '#c:plates/wrought_iron',
		C: 'tfc:glue',
		D: '#c:cogwheels',
		E: '#c:tools/wrench'
	}).id('tfg:create/shaped/mechanical_bearing')

	event.recipes.gtceu.assembler('create:mechanical_bearing')
		.itemInputs('create:andesite_casing', '#c:plates/wrought_iron', '#c:cogwheels')
		.inputFluids(Fluid.of('gtceu:glue', 50))
		.itemOutputs('create:mechanical_bearing')
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])
		.circuit(15)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:mechanical_bearing', [GTMaterials.Wood, 1, GTMaterials.WroughtIron, 2]) — хелпер мода TFG отсутствует

	event.shaped('create:gantry_carriage', [
		'DCE',
		' A ',
		' B '
	], {
		A: 'create:andesite_casing',
		B: '#c:cogwheels',
		C: '#minecraft:wooden_slabs',
		D: 'tfc:glue',
		E: '#c:tools/hammer'
	}).id('tfg:create/shaped/gantry_carriage')

	event.recipes.gtceu.assembler('create:gantry_carriage')
		.itemInputs('create:andesite_casing', '#c:cogwheels', '#minecraft:wooden_slabs')
		.inputFluids(Fluid.of('gtceu:glue', 50))
		.itemOutputs('create:gantry_carriage')
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])
		.circuit(2)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:gantry_carriage', [GTMaterials.Wood, 1, GTMaterials.WroughtIron, 1]) — хелпер мода TFG отсутствует

	event.shaped('create:weighted_ejector', [
		' B ',
		' CE',
		'DA '
	], {
		A: 'create:andesite_casing',
		B: '#c:plates/wrought_iron',
		C: '#c:springs/wrought_iron',
		D: '#c:cogwheels',
		E: '#c:tools/wrench'
	}).id('tfg:create/shaped/weighted_ejector')

	event.recipes.gtceu.assembler('create:weighted_ejector')
		.itemInputs('create:andesite_casing', '#c:plates/wrought_iron', '#c:springs/wrought_iron', '#c:cogwheels')
		.itemOutputs('create:weighted_ejector')
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])
		.circuit(16)

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:weighted_ejector', [GTMaterials.Wood, 1, GTMaterials.WroughtIron, 3]) — хелпер мода TFG отсутствует

	event.shaped('create:turntable', [
		'DA ',
		'CBC'
	], {
		A: '#create:seats',
		B: '#minecraft:wooden_slabs',
		C: '#c:screws',
		D: '#c:tools/hammer'
	}).id('tfg:create/shaped/turntable')

	event.recipes.gtceu.assembler('create:turntable')
		.itemInputs('#create:seats', '#minecraft:wooden_slabs', '2x #c:screws')
		.itemOutputs('create:turntable')
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])

	event.shaped('create:gearshift', [
		' C ',
		'DAE',
		' B '
	], {
		A: 'create:andesite_casing',
		B: '#c:cogwheels',
		C: 'minecraft:redstone',
		D: '#c:tools/wrench',
		E: '#c:tools/hammer'
	}).id('tfg:create/shaped/gearshift')

	event.recipes.gtceu.assembler('create:gearshift')
		.itemInputs('create:andesite_casing', '#c:cogwheels', 'minecraft:redstone')
		.itemOutputs('create:gearshift')
		.circuit(5)
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo('create:gearshift', [GTMaterials.Wood, 1, GTMaterials.WroughtIron, 1, GTMaterials.Redstone, 1]) — хелпер мода TFG отсутствует

	event.shaped('create:clutch', [
		' C ',
		'DAE',
		' B '
	], {
		A: 'create:andesite_casing',
		B: '#c:shafts',
		C: 'minecraft:redstone',
		D: '#c:tools/wrench',
		E: '#c:tools/hammer'
	}).id('tfg:create/shaped/clutch')

	event.recipes.gtceu.assembler('create:clutch')
		.itemInputs('create:andesite_casing', '#c:shafts', 'minecraft:redstone')
		.itemOutputs('create:clutch')
		.circuit(5)
		.duration(50)
		.EUt(GTValues.VA[GTValues.ULV])

	event.stonecutting('2x create:andesite_table_cloth', '#c:ingots/tin_alloy')
	event.stonecutting('2x create:andesite_scaffolding', '#c:ingots/tin_alloy')
	event.stonecutting('2x create:andesite_ladder', '#c:ingots/tin_alloy')

	// Industrial Iron stuff

	event.stonecutting('2x create:industrial_iron_block', '#c:ingots/steel')

	event.custom({
		type: "ae2:transform",
		circumstance: {
			type: "fluid",
			tag: "tfc:water"
		},
		ingredients: [{ item: 'create:industrial_iron_block' }],
		result: { id: 'create:weathered_iron_block' } /* [PORT-FIX] ItemStack-кодек 1.21: id вместо item */
	}).id(`tfg:ae_transform/weathered_iron_block`)

	event.recipes.gtceu.chemical_bath('tfg:industrial_iron_block')
		.itemInputs('create:industrial_iron_block')
		.inputFluids(Fluid.of('minecraft:water', 250))
		.itemOutputs('create:weathered_iron_block')
		.duration(100)
		.EUt(GTValues.VA[GTValues.ULV])

	event.custom({
		type: "ae2:transform",
		circumstance: {
			type: "fluid",
			tag: "tfc:water"
		},
		ingredients: [{ item: 'create:industrial_iron_window' }],
		result: { id: 'create:weathered_iron_window' } /* [PORT-FIX] ItemStack-кодек 1.21: id вместо item */
	}).id(`tfg:ae_transform/weathered_iron_window`)

	event.recipes.gtceu.chemical_bath('tfg:industrial_iron_window')
		.itemInputs('create:industrial_iron_window')
		.inputFluids(Fluid.of('minecraft:water', 250))
		.itemOutputs('create:weathered_iron_window')
		.duration(100)
		.EUt(GTValues.VA[GTValues.ULV])

	event.custom({
		type: "ae2:transform",
		circumstance: {
			type: "fluid",
			tag: "tfc:water"
		},
		ingredients: [{ item: 'create:industrial_iron_window_pane' }],
		result: { id: 'create:weathered_iron_window_pane' } /* [PORT-FIX] ItemStack-кодек 1.21: id вместо item */
	}).id(`tfg:ae_transform/weathered_iron_window_pane`)

	event.recipes.gtceu.chemical_bath('tfg:industrial_iron_window_pane')
		.itemInputs('create:industrial_iron_window_pane')
		.inputFluids(Fluid.of('minecraft:water', 250))
		.itemOutputs('create:weathered_iron_window_pane')
		.duration(100)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.cutter('tfg:weathered_iron_window_pane')
		.itemInputs('3x create:weathered_iron_window')
		.itemOutputs('8x create:weathered_iron_window_pane')
		.duration(40)
		.EUt(7)

	// Rose quartz

	event.shaped('create:rose_quartz_lamp', [
		'ABA'
	], {
		A: '#c:plates/rose_quartz',
		B: 'minecraft:redstone_lamp'
	}).id('tfg:shaped/rose_quartz_lamp')

	event.recipes.gtceu.laser_engraver('tfg:rose_quartz_tiles')
		.itemInputs('#c:storage_blocks/rose_quartz')
		.itemOutputs('4x create:rose_quartz_tiles')
		.notConsumableItem('tfc:lens') // [PORT-FIX] notConsumable(string) → notConsumableItem
		.circuit(1)
		.duration(100)
		.EUt(GTValues.VA[GTValues.LV])

	// [PORT-Ф2] c:storage_blocks/rose_quartz пуст (материал rose_quartz — кастомный GT-материал TFG):
	// event.stonecutting('4x create:rose_quartz_tiles', '#c:storage_blocks/rose_quartz')
	event.stonecutting('create:rose_quartz_tiles', 'create:small_rose_quartz_tiles')

	event.recipes.gtceu.laser_engraver('tfg:small_rose_quartz_tiles')
		.itemInputs('#c:storage_blocks/rose_quartz') // [PORT-Ф2] тег пуст до Ф2 (GT-рецепты терпят пустой тег, рецепт мёртв, но не падает)
		.itemOutputs('4x create:small_rose_quartz_tiles')
		.notConsumableItem('tfc:lens') // [PORT-FIX] notConsumable(string) → notConsumableItem
		.circuit(2)
		.duration(100)
		.EUt(GTValues.VA[GTValues.LV])

	// [PORT-Ф2] event.stonecutting('4x create:small_rose_quartz_tiles', '#c:storage_blocks/rose_quartz')
	event.stonecutting('create:small_rose_quartz_tiles', 'create:rose_quartz_tiles')

	//Bars

	const create_metals = [
		{ metal: 'andesite', material: 'tin_alloy', tier: 3 },
		{ metal: 'brass', material: 'brass', tier: 2 },
		{ metal: 'copper', material: 'copper', tier: 1 },
	];

	create_metals.forEach(bar => {
		event.recipes.tfc.anvil(`4x create:${bar.metal}_bars`, `#c:ingots/${bar.material}`, ['upset_last', 'punch_second_last', 'punch_third_last'])
			.tier(bar.tier).id(`tfg:anvil/create_${bar.metal}_bars`)

		// [PORT-Ф4] TFGHelpers.registerMaterialInfo(`create:${bar.metal}_bars`, [GTMaterials.get(bar.material), 0.25]) — хелпер мода TFG отсутствует

		if (bar.material !== 'tin_alloy') { // [PORT-Ф2] у tin_alloy нет double ingot в стоковом GTM8 (тег пуст, tfc:anvil падает)
			event.recipes.tfc.anvil(`8x create:${bar.metal}_bars`, `#c:double_ingots/${bar.material}`, ['upset_last', 'punch_second_last', 'punch_third_last'])
				.tier(bar.tier).id(`tfg:anvil/create_${bar.metal}_bars_double`)
		}

		event.stonecutting(`4x create:${bar.metal}_bars`, `#c:ingots/${bar.material}`);
	})

	//Copycats

	event.stonecutting("16x create:copycat_step", "#c:ingots/zinc")
	event.stonecutting("16x create:copycat_panel", "#c:ingots/zinc")

	event.recipes.gtceu.extractor('tfg:create/copycat_step_recyle')
		.itemInputs('create:copycat_step')
		.outputFluids(Fluid.of('gtceu:zinc', 9))
		.duration(20)
		.EUt(GTValues.VA[GTValues.LV])
		.category(GTRecipeCategories.EXTRACTOR_RECYCLING)

	event.recipes.gtceu.extractor('tfg:create/copycat_panel_recyle')
		.itemInputs('create:copycat_panel')
		.outputFluids(Fluid.of('gtceu:zinc', 9))
		.duration(20)
		.EUt(GTValues.VA[GTValues.LV])
		.category(GTRecipeCategories.EXTRACTOR_RECYCLING)

	// Doors

	event.shapeless('2x create:andesite_door', ['createdeco:andesite_door', '#minecraft:wooden_doors', 'minecraft:glass_pane'])
		.id('tfg:shapeless/create_andesite_door')

	event.shapeless('2x create:brass_door', ['createdeco:brass_door', '#minecraft:wooden_doors', 'minecraft:glass_pane'])
		.id('tfg:shapeless/create_brass_door')

	// [PORT] createdeco 1.21 не содержит copper_door (есть только locked_copper_door) — конверсия отключена
	// event.shapeless('2x create:copper_door', ['createdeco:copper_door', '#minecraft:wooden_doors', 'minecraft:glass_pane'])
	// 	.id('tfg:shapeless/create_copper_door')

	event.shapeless('2x create:train_door', ['minecraft:iron_door', '#minecraft:wooden_doors', 'minecraft:glass_pane'])
		.id('tfg:shapeless/create_train_door')

	event.shapeless('2x create:train_trapdoor', ['tfc:metal/trapdoor/wrought_iron', '#minecraft:wooden_trapdoors'])
		.id('tfg:shapeless/create_train_trapdoor')


	event.shapeless('create:sand_paper', ['minecraft:paper', 'tfc:glue', '#c:sands' /* [PORT-FIX] c:sand -> c:sands */])
		.id('tfg:shapeless/sand_paper')

	// The custom ores

	event.smelting('minecraft:copper_ingot', 'create:crushed_raw_copper') // [PORT-FIX] тег в результате недопустим
	event.smelting('minecraft:gold_ingot', 'create:crushed_raw_gold') // [PORT-FIX] тег в результате недопустим
	event.smelting('create:zinc_ingot', 'create:crushed_raw_zinc') // [PORT-FIX] тег в результате недопустим
	event.smelting('gtceu:silver_ingot', 'create:crushed_raw_silver')
	event.smelting('gtceu:tin_ingot', 'create:crushed_raw_tin')
	event.smelting('gtceu:lead_ingot', 'create:crushed_raw_lead') // [PORT-FIX] тег в результате недопустим

})
