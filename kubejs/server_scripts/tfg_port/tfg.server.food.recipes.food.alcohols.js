// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/food/recipes.food.alcohols.js (registerTFGAlcoholFoodRecipes).
// [PORT-Ф2] processor-рецепты (смятый виноград, мёд) — no-op до порта машин еды TFG.
// [PORT-Ф2-FALLBACK] базовый алкоголь варится в бочке (см. generateAlcoholRecipes в 03_food_shared).

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.food.recipes.food.alcohols start');

	//#region Wine Making ([PORT-Ф2] processor)

	global.processorRecipe(event, 'red_grapes', 50, 8, {});
	global.processorRecipe(event, 'white_grapes', 50, 8, {});

	//#endregion
	//#region Brewing

	global.ALCOHOLS.forEach(alcohol => {
		let genBaseBarrelRecipe = (alcohol.genBase !== undefined) ? alcohol.genBase : false;
		let genBaseProcessorRecipe = true;
		let genAgedRecipe = (alcohol.genAged !== undefined) ? alcohol.genAged : false;
		let genVintageRecipe = (alcohol.genVintage !== undefined) ? alcohol.genVintage : true;

		// Mead produces less to match firmalife barrel recipe. Since honey is cheap.
		// [PORT-Ф2] processor-рецепт мёда — no-op; бочковой рецепт мёда есть в firmalife нативно.
		if (alcohol.name === 'mead') {
			genBaseProcessorRecipe = false;
			global.processorRecipe(event, 'processor_alcohol/firmalife_mead', 2400, 1, {});
		}

		global.generateAlcoholRecipes(event, alcohol.ingredient, alcohol.id, alcohol.agedId, alcohol.vintageId, genBaseBarrelRecipe, genBaseProcessorRecipe, genAgedRecipe, genVintageRecipe);
	});

	//#endregion
});
