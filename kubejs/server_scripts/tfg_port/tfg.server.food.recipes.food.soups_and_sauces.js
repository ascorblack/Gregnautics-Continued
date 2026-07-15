// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/food/recipes.food.soups_and_sauces.js (registerTFGSoupFoodRecipes).
// [PORT-Ф2] Слоп-супы и овсянка — processor-рецепты (no-op до порта машин еды TFG);
// бульоны (pot-часть) портированы через generateMealFoodRecipes.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.food.recipes.food.soups_and_sauces start');

	//#region Slop ([PORT-Ф2] processor)

	const soupTypes = [
		{ type: 'grain_soup', input: '#c:foods/grain' }, // [PORT] tfc:foods/* -> c:foods/*
		{ type: 'fruit_soup', input: '#c:foods/fruit' },
		{ type: 'vegetables_soup', input: '#c:foods/vegetable' },
		{ type: 'protein_soup', input: '#c:foods/meat' },
		{ type: 'dairy_soup', input: '#c:foods/dairy' }
	];

	soupTypes.forEach((soup, i) => {
		global.processorRecipe(event, soup.type, 300, 8, {});
	});

	// Oatmeal ([PORT-Ф2] processor)
	for (let i = 1; i <= 4; i++) {
		global.processorRecipe(event, `oatmeal_${i}`, 20 * 15, GTValues.VA[GTValues.LV], {});
	}

	//#endregion
	//#region Stocks

	// Rich Stock
	// [PORT] forge:bones -> c:bones; tfg:clean_water -> tfc:any_fresh_water (ремап в генераторе)
	global.generateMealFoodRecipes(event, [
		'#tfg:foods/makes_rich_stock',
		'#c:foods/vegetable',
		'#c:bones',
		'tfc:powder/salt',
		'tfg:spice/bay_leaf'
	], '#tfc:any_fresh_water 1000', 'tfg:rich_stock 1000');

	// Light Stock
	global.generateMealFoodRecipes(event, [
		'#tfg:foods/makes_light_stock',
		'#c:foods/vegetable',
		'#c:bones',
		'tfc:powder/salt',
		'firmalife:spice/basil_leaves'
	], '#tfc:any_fresh_water 1000', 'tfg:light_stock 1000');

	//#endregion
	//#region Sauces

	// Brown Gravy
	// [PORT-Ф2] processor-рецепт (единственный источник tfg:brown_gravy!) — no-op до порта машин еды TFG.
	// [PORT-Ф2-FALLBACK] pot-аналог, чтобы гравий оставался достижимым (2 жидкости GT-рецепта
	// свёрнуты в один pot: light+rich stock не смешать в котелке — берём rich):
	event.recipes.tfc.pot(
		[global.TFG_notRotten('#c:foods/flour'), global.TFG_notRotten('firmalife:food/butter'), global.TFG_notRotten('tfg:spice/allspice')],
		'tfg:rich_stock 1000',
		20 * 5,
		200
	).fluidOutput(Fluid.of('tfg:brown_gravy', 1000))
		.id('tfg:pot/brown_gravy');

	global.processorRecipe(event, 'brown_gravy', 20 * 5, GTValues.VA[GTValues.ULV], {});

	//#endregion
});
