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

	// [PORT-Ф2-DONE 2026-07-16] Пищевые жидкости (rich_stock/light_stock/brown_gravy/
	// cultured_milk/peanut_oil) БОЛЬШЕ ЗДЕСЬ НЕ РЕГИСТРИРУЮТСЯ: их даёт патченный GTM
	// из GT-материалов с .liquid() (tfg.materials.food.js). Прямая регистрация была
	// воркэраундом для GTM8-SNAPSHOT b71dec5 и после перехода на патченный jar стала
	// ДУБЛЁМ id: клиент (235 модов) и сервер (205) резолвили дубль в разном порядке ->
	// у клиента 8 жидкостей+вёдер не регистрировались -> при синхронизации реестров
	// появлялись null-дыры -> TFC (for (Item item : BuiltInRegistries.ITEM)) падал в
	// RecipesUpdatedEvent -> JEI не стартовал -> краш при открытии инвентаря.
});

// [PORT-Ф2-DONE 2026-07-16] Каучуковая ветка (latex/conifer_pitch/vulcanized_latex)
// тоже убрана: GT-материалы в tfg.materials.primitive.js объявлены с .liquid(),
// патченный GTM регистрирует эти жидкости сам. См. комментарий выше про дубль id.
