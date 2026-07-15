// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/food/recipes.food.pizza_and_pasta.js (registerTFGPizzaAndPastaFoodRecipes).
// [PORT-Ф2] processor-рецепты — no-op до порта машин еды TFG; данные урезаны до {}.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.food.recipes.food.pizza_and_pasta start');

	//#region Pizza
	//TODO: refactor most of these when TFCGourmet is removed.

	// Raw Pizza.
	for (let i = 0; i <= 2; i++) {
		let itemInputs = ['firmalife:food/pizza_dough', 'firmalife:food/tomato_sauce', 'firmalife:food/shredded_cheese'];

		if (i !== 0) {
			itemInputs.push(`${i}x #firmalife:foods/pizza_ingredients`);
		}

		global.generateMixingFoodRecipes(event, itemInputs, null, null, 'firmalife:food/raw_pizza', true, false, true, i + 1,
			// [PORT-FIX] meal через addJsonModifier (кодек tfc:meal)
			TFC.isp.of('firmalife:food/raw_pizza').addJsonModifier({ type: 'tfc:meal',
				food: { hunger: 4, saturation: 1, grain: 1, dairy: 0.25, decay_modifier: 4.5 },
				portions: [{ nutrient_modifier: 0.8, water_modifier: 0.8, saturation_modifier: 0.8 }]
			}),
			`raw_pizza_${i + 1}`
		);
	}

	// Pizza Dough.
	global.processorRecipe(event, 'pizza_dough', 300, 16, {});

	// Cooking Pizza.
	global.generateFoodCookingRecipes(event, 'firmalife:food/raw_pizza', 'firmalife:food/cooked_pizza', true, false, true, null, true);

	//#endregion
	//#region Noodles

	// [PORT-FIX] id рецепта в Firmalife 3.0: mixing_bowl/egg_noodles -> mixing_bowl/food/raw_egg_noodles
	event.remove({ id: 'firmalife:mixing_bowl/food/raw_egg_noodles' });

	// [PORT] forge:eggs -> c:eggs; tfc:foods/flour -> c:foods/flour; tfc:milks -> c:milks
	global.generateMixingFoodRecipes(event,
		['#c:eggs', 'tfc:powder/salt', '#c:foods/flour'],
		'#c:milks 1000', null, 'firmalife:food/raw_egg_noodles'
	);

	global.processorRecipe(event, 'rice_noodles', 50, 8, {});

	global.generateWaterBoilingFoodRecipes(event, 'firmalife:food/raw_egg_noodles', 'firmalife:food/cooked_pasta', false, true, true);
	global.generateWaterBoilingFoodRecipes(event, 'firmalife:food/raw_rice_noodles', 'firmalife:food/cooked_rice_noodles', false, true, true);

	//#endregion
	//#region Pasta

	// Instant Mac ([PORT-Ф2] processor)
	global.processorRecipe(event, 'raw_instant_mac', 20 * 10, GTValues.VA[GTValues.LV], {});

	global.generateFluidBoilingFoodRecipes(event, '#c:milks', 200, 'tfg:food/raw_instant_mac', 'tfg:food/cooked_instant_mac');

	// Lasagna ([PORT-Ф2] processor)
	global.processorRecipe(event, 'raw_lasagna', 60, 8, {});

	// [PORT-FIX] id рецепта в Firmalife 3.0: crafting/lasagna -> crafting/food/raw_lasagna
	event.replaceInput({ id: 'firmalife:crafting/food/raw_lasagna' }, 'firmalife:plant/oregano', 'tfg:spice/oregano_leaves');

	//#endregion
	//#region Ingredients ([PORT-Ф2] processor)

	global.processorRecipe(event, 'pasta_with_tomato_sauce', 60, 8, {});
	global.processorRecipe(event, 'tomato_sauce', 300, 8, {});
	global.processorRecipe(event, 'tomato_sauce_mix', 600, 8, {});

	global.generateFluidBoilingFoodRecipes(event, '#tfc:any_fresh_water', 200, 'firmalife:food/tomato_sauce_mix', 'firmalife:food/tomato_sauce', true, false, true); // [PORT] tfg:clean_water не портирован

	//#endregion
});
