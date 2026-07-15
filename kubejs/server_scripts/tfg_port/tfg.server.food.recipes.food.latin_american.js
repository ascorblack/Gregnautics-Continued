// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/food/recipes.food.latin_american.js (registerTFGLatinAmericanFoodRecipes).
// [PORT-Ф2] processor-рецепты — no-op до порта машин еды TFG; данные урезаны до {}.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.food.recipes.food.latin_american start');

	//#region Ingredients

	// Nixtamal ([PORT-Ф2] processor)
	global.processorRecipe(event, 'cured_maize', 300, 8, {});
	global.processorRecipe(event, 'nixtamal', 20 * 30, GTValues.VA[GTValues.ULV], {});

	// Tortilla ([PORT-Ф2] processor)
	global.processorRecipe(event, 'masa_flour', 100, 8, {});

	// [PORT-FIX] advanced_shaped_crafting без хвостовых 0,0; forge:tools/mortars -> c:tools/mortar
	event.recipes.tfc.advanced_shaped_crafting(
		TFC.isp.of('4x firmalife:food/masa_flour').copyFood(), ['A', 'B'], {
			A: global.TFG_notRotten('firmalife:food/nixtamal'),
			B: '#c:tools/mortar'
		}).id('tfg:mortar/masa_flour');

	global.processorRecipe(event, 'firmalife_masa', 300, 2, {});
	global.processorRecipe(event, 'tortilla_chips', 40, 16, {});

	// Salsa. Wouldnt Pico De Gallo make more sense? smh.
	global.processorRecipe(event, 'salsa', 300, 8, {});

	// [PORT-FIX] id рецепта в Firmalife 3.0: crafting/salsa -> crafting/food/salsa
	event.remove({ id: 'firmalife:crafting/food/salsa' });

	event.recipes.tfc.advanced_shapeless_crafting(
		TFC.isp.of('5x firmalife:food/salsa').copyFood(),
		[
			'tfg:spice/cilantro_leaves',
			'tfc:food/tomato',
			'tfc:powder/salt',
			'#c:tools/knife' // [PORT] forge:tools/knives -> c:tools/knife
		],
		'tfc:food/tomato' // [PORT-FIX] primary_ingredient обязателен
	).id('tfg:crafting/salsa');

	//#endregion
	//#region Meals ([PORT-Ф2] processor)

	// Burrito / Taco / Nachos
	global.processorRecipe(event, 'burrito', 60, 8, {});
	global.processorRecipe(event, 'taco', 60, 8, {});
	global.processorRecipe(event, 'nachos', 60, 8, {});

	//#endregion
});
