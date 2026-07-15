// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/food/recipes.food.misc_meals.js (registerTFGMiscMealFoodRecipes).
// [PORT-Ф2] processor/oven-рецепты — no-op до порта машин еды TFG.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.food.recipes.food.misc_meals start');

	// These don't seem to work with the set_bowl ISP modifier
	// [PORT] tfc:bowls -> c:bowls
	event.recipes.tfc.pot(['#c:bowls', 'firmalife:ice_shavings', 'firmalife:ice_shavings', 'firmalife:ice_shavings', 'firmalife:ice_shavings'],
		Fluid.of('minecraft:water', 1000), 20, 10)
		.itemOutput(TFC.isp.of('tfg:food/ice_soup'))
		.id('tfg:pot/ice_soup');

	// [PORT-Ф2] gtceu.food_processor — тип TFG, не зарегистрирован:
	// event.recipes.gtceu.food_processor('ice_soup')
	// 	.itemInputs('#c:bowls', '4x firmalife:ice_shavings')
	// 	.inputFluids(Fluid.of('minecraft:water', 1000))
	// 	.itemOutputs('tfg:food/ice_soup')
	// 	.duration(60)
	// 	.EUt(16);

	// Dino Nuggies
	// [PORT-Ф2] GT-oven (deep frying) — no-op; [PORT-Ф2-FALLBACK] нагрев на гриле/файрпите,
	// чтобы наггетсы оставались готовимыми (meal через addJsonModifier, firmaLifeCopyDynamicFood -> firmalife:copy_dynamic_food).
	global.registerFoodRecipe(event, 'food_oven', 'raw_dino_nugget', 300, GTValues.VA[GTValues.LV], 'tfg.food_recipe.deep_frying', {});
	event.recipes.tfc.heating(global.TFG_notRotten('tfg:food/raw_dino_nugget'), 200)
		.resultItem(TFC.isp.of('tfg:food/cooked_dino_nugget')
			.addSimpleModifier('firmalife:copy_dynamic_food')
			.addTrait('firmalife:oven_baked')
			.addJsonModifier({ type: 'tfc:meal',
				food: { hunger: 3, saturation: 2, decay_modifier: 1.5 },
				portions: [{ nutrient_modifier: 2.0 }]
			}))
		.id('tfg:heating/raw_dino_nugget_to_cooked_dino_nugget');

	// [PORT-Ф2] Наггетсы из динозавров и путин — processor-рецепты (no-op):
	global.processorRecipe(event, 'raw_dino_nuggets', 300, GTValues.VA[GTValues.HV], {});
	global.processorRecipe(event, 'poutine', 20 * 10, GTValues.VA[GTValues.LV], {});
});
