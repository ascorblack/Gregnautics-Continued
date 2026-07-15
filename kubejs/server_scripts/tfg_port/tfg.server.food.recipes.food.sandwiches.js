// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/food/recipes.food.sandwiches.js (registerTFGSandwichFoodRecipes).
// [PORT-Ф2] Все сэндвич-рецепты — processor-рецепты (no-op до порта машин еды TFG);
// ручная сборка сэндвичей остаётся нативной TFC-механикой (нож + хлеб).

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.food.recipes.food.sandwiches start');

	//#region Sandwiches ([PORT-Ф2] processor)

	global.TFC_GRAINS.forEach(grain => {
		const breadTypes = [
			['bread', `tfc:food/${grain.name}_bread`],
			['flatbread', `firmalife:food/${grain.name}_flatbread`],
			['slice', `firmalife:food/${grain.name}_slice`]
		];

		breadTypes.forEach((type) => {
			global.processorRecipe(event, `${grain.name}_${type[0]}_sandwich`, 100, 16, {});
			global.processorRecipe(event, `${grain.name}_${type[0]}_jam_sandwich_1`, 100, 16, {});
			global.processorRecipe(event, `${grain.name}_${type[0]}_jam_sandwich_2`, 100, 16, {});
			global.processorRecipe(event, `${grain.name}_${type[0]}_jam_sandwich_3`, 100, 16, {});
		});
	});

	//#endregion
	//#region Burgers

	// Hamburger
	// [PORT-FIX] advanced_shaped_crafting без хвостовых 0,0; forge:tools/knives -> c:tools/knife;
	// meal через addJsonModifier (кодек tfc:meal)
	event.recipes.tfc.advanced_shaped_crafting(
		TFC.isp.of('tfg:food/hamburger').addJsonModifier({ type: 'tfc:meal',
			food: { hunger: 4, decay_modifier: 1.3 },
			portions: [{ nutrient_modifier: 1.2, saturation_modifier: 1.0 }]
		}),
		[
			'CA ',
			'BBB',
			' A '
		], {
			A: global.TFG_notRotten('tfg:food/brioche_bun'),
			B: global.TFG_notRotten('#tfg:foods/usable_in_burgers'),
			C: '#c:tools/knife'
		}
	).id('tfg:crafting/hamburger');

	global.processorRecipe(event, 'hamburger', 60, GTValues.VA[GTValues.ULV], {});

	// Cheeseburger
	event.recipes.tfc.advanced_shaped_crafting(
		TFC.isp.of('tfg:food/cheeseburger').addJsonModifier({ type: 'tfc:meal',
			food: { hunger: 4, decay_modifier: 1.3 },
			portions: [{ nutrient_modifier: 1.2, saturation_modifier: 1.1 }]
		}),
		[
			'CA ',
			'BBD',
			' A '
		], {
			A: global.TFG_notRotten('tfg:food/brioche_bun'),
			B: global.TFG_notRotten('#tfg:foods/usable_in_burgers'),
			C: '#c:tools/knife',
			D: global.TFG_notRotten('#tfg:foods/cheeses')
		}
	).id('tfg:crafting/cheeseburger');

	global.processorRecipe(event, 'cheeseburger', 60, GTValues.VA[GTValues.ULV], {});

	// Burger Patty
	event.recipes.tfc.advanced_shapeless_crafting(
		TFC.isp.of('tfg:food/raw_burger_patty').copyFood(),
		[
			global.TFG_notRotten('#tfg:foods/burger_meats'),
			'#c:tools/mortar' // [PORT] forge:tools/mortars -> c:tools/mortar
		],
		'#tfg:foods/burger_meats' // [PORT-FIX] primary_ingredient обязателен
	).id('tfg:crafting/raw_burger_patty');

	global.processorRecipe(event, 'raw_burger_patty', 60, GTValues.VA[GTValues.ULV], {});

	//#endregion
});
