// priority: 0
"use strict";

// [PORT] Порт tfg/equipment/recipes.equipment.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT-FIX] kubejs_tfc 2.0.1: barrel_sealed(input_fluid, duration).inputItem/.outputItem;
//   damage_inputs_shaped_crafting УДАЛЁН — обычный event.shaped (TFC сам возвращает повреждённый инструмент);
//   схемы firmalife не поддерживаются kubejs_tfc 2.0.1 — oven через event.custom (результат {id:...}).
// [PORT-Ф2] Жидкость tfg:vulcanized_latex — GT-материал TFG (не зарегистрирован) — vat-рецепт закомментирован
//   (перчатки латекса пока получаются только через закомментированную цепочку; alloy_smelter-путь активен).
// [PORT-Ф4-TODO] tfg:snowshoes, tfg:flippers, tfg:snorkel не зарегистрированы; sns/firmaciv отсутствуют.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.equipment recipes.equipment start')

	// #region Primitive protection

	// [PORT-FIX] kubejs_tfc 2.0: конструктор barrel_sealed(input_fluid, duration)
	event.recipes.tfc.barrel_sealed('tfc:vinegar 1000', 2000)
		.inputItem('tfchotornot:mittens')
		.outputItem('tfg:prepared_leather_gloves')
		.id('tfg:sealed_barrel/prepared_leather_gloves')

	// [PORT-Ф2] tfg:vulcanized_latex — жидкость материала TFG (не зарегистрирована)
	// event.custom({
	// 	"type": "firmalife:vat",
	// 	"input_item": { "item": "tfg:prepared_leather_gloves" },
	// 	"input_fluid": { "amount": 1000, "fluid": "tfg:vulcanized_latex" },
	// 	"output_item": { "id": "tfg:latex_soaked_gloves" },
	// 	"length": 300,
	// 	"temperature": 200.0
	// }).id('tfg:vat/latex_soaked_gloves')

	// [PORT-FIX] схема firmalife.oven -> event.custom (kubejs_tfc 2.0.1 не поддерживает схемы firmalife)
	event.custom({
		"type": "firmalife:oven",
		"ingredient": { "item": "tfg:latex_soaked_gloves" },
		"temperature": 120.0,
		"duration": 1200,
		"result": { "id": "gtceu:rubber_gloves" }
	}).id('tfg:oven/rubber_gloves')

	event.remove({ id: 'gtceu:shaped/rubber_gloves' })

	event.recipes.gtceu.alloy_smelter('rubber_gloves_alloy_smelter')
		.itemInputs('2x #c:plates/rubber') // [PORT] forge: -> c:
		.notConsumableItem('create:brass_hand') // [PORT-FIX] .notConsumable -> .notConsumableItem
		.itemOutputs('gtceu:rubber_gloves')
		.duration(200)
		.EUt(GTValues.VA[GTValues.ULV])
		.category(GTRecipeCategories.INGOT_MOLDING)


	// [PORT-FIX] tfc.damage_inputs_shaped_crafting удалён в kubejs_tfc 2.0 — обычный shaped,
	// TFC сам обрабатывает урон/остаток иглы
	event.shaped('gtceu:face_mask', [
		'ACA',
		'ABA',
		' D '
	], {
		A: '#c:strings', // [PORT] forge:string -> c:strings
		B: '#c:cloth', // [PORT] forge:cloth -> c:cloth
		C: 'minecraft:paper',
		D: '#tfc:sewing_needles'
	}).id('gtceu:shaped/face_mask')

	event.recipes.gtceu.assembler('assemble_face_mask')
		.itemInputs('4x #c:strings', '#c:cloth', 'minecraft:paper')
		.itemOutputs('gtceu:face_mask')
		.duration(100)
		.EUt(GTValues.VA[GTValues.ULV])
		.circuit(7)

	// #endregion

	// [PORT-Ф4-TODO] tfg:snowshoes не зарегистрирован; sns отсутствует в сборке
	// event.shaped("tfg:snowshoes", [
	// 	"RSR",
	// 	"WSW",
	// 	"LSL"
	// ], {
	// 	S: "#c:strings",
	// 	R: "#c:rods",
	// 	W: "#c:rods/long",
	// 	L: ['#tfg:rubber_foils'], // [PORT] 'sns:leather_strip' вырезан — мод отсутствует
	// }).id('tfg:shaped/snowshoes');

	// [PORT-Ф4-TODO] tfg:flippers не зарегистрирован
	// global.TFGDamageShaped(event,"tfg:flippers", [
	// 	"L L",
	// 	"LKL",
	// 	"B B"
	// ], {
	// 	K: "#c:tools/knife", // [PORT] forge:tools/knives -> c:tools/knife
	// 	L: "#tfg:rubber_plates",
	// 	B: "#tfg:rubber_foils"
	// }).id('tfg:shaped/flippers_rubber');

	// [PORT] firmaciv и sns отсутствуют в сборке 1.21.1
	// global.TFGDamageShaped(event,"tfg:flippers", [
	// 	" K ",
	// 	"BHB"
	// ], {
	// 	K: "#c:tools/knife",
	// 	H: "firmaciv:large_waterproof_hide",
	// 	B: "sns:leather_strip"
	// }).id('tfg:shaped/flippers_leather');

	// [PORT-Ф4-TODO] tfg:snorkel не зарегистрирован; тег tfg:water_breathing_ingredients нигде не наполняется
	// global.TFGDamageShaped(event,'tfg:snorkel', [
	// 	'BC ',
	// 	'BLE',
	// 	'LGL'
	// ], {
	// 	B: ['#c:tiny_fluid_pipes', 'minecraft:bamboo'],
	// 	L: ['#tfg:rubber_foils'], // [PORT] 'sns:leather_strip' вырезан
	// 	E: '#c:tools/hammer',
	// 	G: "#c:glass_panes",
	// 	C: '#tfg:water_breathing_ingredients'
	// }).id('tfg:shaped/snorkel')
})
