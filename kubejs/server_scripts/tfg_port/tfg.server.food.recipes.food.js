// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/food/recipes.food.js (registerTFGFoodRecipes, секция Basic Cooking).
// Вызовы register*-подфункций разнесены по отдельным файлам tfg.server.food.recipes.* —
// в KubeJS 7 каждый файл имеет изолированный скоуп, общие генераторы — в startup (03_food_shared).
// [PORT-Ф2] Циклы TFC_FOOD_COOKING / FIRMALIFE_FOOD_COOKING генерировали только GT-oven-рецепты
// (heating у них отключён) — до порта машин еды TFG они ничего не создают.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.food.recipes.food start');

	//#region Basic Cooking

	global.TFC_FOOD_COOKING.forEach(item => {
		global.generateFoodCookingRecipes(event, item.input, item.output, true, false);
	});

	global.TFG_FOOD_COOKING.forEach(item => {
		global.generateFoodCookingRecipes(event, item.input, item.output);
	});

	global.FIRMALIFE_FOOD_COOKING.forEach(item => {
		global.generateFoodCookingRecipes(event, item.input, item.output, true, false);
	});

	global.generateWaterBoilingFoodRecipes(event, 'tfc:food/rice_grain', 'tfc:food/cooked_rice', false, true, true);

	//#endregion
});
