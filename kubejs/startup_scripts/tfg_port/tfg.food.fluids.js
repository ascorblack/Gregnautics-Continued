// priority: 0
"use strict";

// [PORT] Из TFG startup_scripts/tfg/food/fluids.food.js (registerTFGFoodFluids).
// Диспетчер Ф2 отключён — регистрация напрямую через StartupEvents.registry('fluid').
// [PORT] KubeJS 7: .thinTexture(color)/.bucketColor(color) -> тип 'thin' + .tint(color)
// (tint красит и жидкость, и ведро); .temperature() переехал в FluidTypeBuilder (.type(...)).
// В ALCOHOLS genBase/genAged нигде не выставлены, так что реально регистрируются
// только tfg:vintage_* (базовые — из TFC, aged — из TFCAgedAlcohol, он в паке есть).

StartupEvents.registry('fluid', event => {
	console.info('[Gregnautics] progress: tfg_port food registry start');

	/**
	 * Function to create alcohol fluids.
	 * @param {*} id Alcohol ID, example: "tfg:whiskey"
	 * @param {*} color Color of the fluid in hexadecimal, example: 0x392e14
	 */
	function createAlcohol(id, color) {

		if (!id || !color) return;

		event.create(id, 'thin') // [PORT] вместо .thinTexture(color)
			.tint(color) // [PORT] вместо .bucketColor(color)
			.noBlock()
			.type(t => t.temperature(293)); // [PORT] temperature теперь в FluidTypeBuilder
	};

	global.ALCOHOLS.forEach(alcohol => {
		if (alcohol.id && alcohol.genBase && alcohol.color) {
			createAlcohol(alcohol.id, alcohol.color);
		}
		if (alcohol.agedId && alcohol.genAged && alcohol.color) {
			createAlcohol(alcohol.agedId, alcohol.color);
		}
		if (alcohol.vintageId && alcohol.genVintage && alcohol.color) {
			createAlcohol(alcohol.vintageId, alcohol.color);
		}
	});

	// [PORT-FIX] Пищевые жидкости TFG (в оригинале — GT-материалы из materials.food.js:
	// rich_stock/light_stock/brown_gravy/cultured_milk/peanut_oil). В GTM8-SNAPSHOT b71dec5
	// .liquid() у KubeJS-материалов с namespace tfg: НЕ регистрирует flюid (в реестре нет
	// ни tfg:*, ни gtceu:*-варианта — рецепты падали с "Fluid with ID tfg:cultured_milk
	// does not exist"). Регистрируем напрямую через KubeJS до фикса апстрима
	// (при переходе на патченный GTM jar с рабочими материальными жидкостями — УБРАТЬ,
	// иначе будет дубль id). Цвета подобраны — [PORT-CHECK].
	/**
	 * Food fluid registration helper (аналог createAlcohol).
	 * @param {string} id Fluid ID, example: "tfg:rich_stock"
	 * @param {number} color Tint color, example: 0xB98C4A
	 * @param {number} temperature Temperature in K
	 */
	function createFoodFluid(id, color, temperature) {
		event.create(id, 'thin')
			.tint(color)
			.noBlock()
			.type(t => t.temperature(temperature));
	};

	createFoodFluid('tfg:rich_stock', 0xB98C4A, 360);
	createFoodFluid('tfg:light_stock', 0xE0C68C, 360);
	createFoodFluid('tfg:brown_gravy', 0x6B4A2B, 360);
	createFoodFluid('tfg:cultured_milk', 0xF2EFE6, 300);
	createFoodFluid('tfg:peanut_oil', 0xE0B75E, 300);
});

// [PORT-Ф2-TEMP] Каучуковая ветка: GT-материалы latex/conifer_pitch/vulcanized_latex не регистрируют
// жидкости (диспетчер Ф2 отключён) — временные прямые регистрации, УДАЛИТЬ с патченным GTM.
StartupEvents.registry('fluid', event => {
	console.info('[Gregnautics] progress: tfg_port rubber fluids registry start');
	event.create('tfg:latex', 'thin').tint(0xF5F1E0).noBlock();
	event.create('tfg:conifer_pitch', 'thin').tint(0x6B4F2A).noBlock();
	event.create('tfg:vulcanized_latex', 'thin').tint(0x3B3B3B).noBlock();
});
