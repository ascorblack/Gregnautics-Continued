// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/food/recipes.food.preservation.js (registerTFGPreservationFoodRecipes).
// [PORT-Ф2] Почти весь файл — GT-processor-рецепты (сушка/копчение/засолка/заморозка) — no-op до порта
// машин еды TFG. Ручные пути сохраняются модами: firmalife (drying/smoking), TFC (brining в бочке).
// [PORT-Ф4-TODO] Джемы tfg:jar/* не зарегистрированы — generateAllJamRecipes пропускает их через guard.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.food.recipes.food.preservation start');

	//#region Fruit Preservation

	global.FOOD_FRUIT.forEach(fruit => {

		if (fruit.genJam) {
			global.generateAllJamRecipes(event, fruit.id, fruit.name, `tfg:jar/${fruit.name}`, `tfg:jar/${fruit.name}_unsealed`, `tfg:block/food/jam/${fruit.name}`);
		}

		// [PORT-Ф2] freeze_drying — processor-рецепт (tfg:dry_ice тоже не зарегистрирован)
		global.processorRecipeText(event, `processor/${fruit.name}/freeze_drying`, 100, GTValues.VA[GTValues.MV], 'tfg.food_recipe.freeze_drying', {});
	});

	global.TFC_JAMS.forEach(name => {
		global.generateJamProcessorRecipes(event, `tfc:food/${name}`, name, `tfc:jar/${name}`, `tfc:jar/${name}_unsealed`);
	});

	global.FIRMALIFE_JAMS.forEach(name => {
		global.generateJamProcessorRecipes(event, `firmalife:food/${name}`, name, `firmalife:jar/${name}`, `firmalife:jar/${name}_unsealed`);
	});

	// [PORT-Ф2] Сушка всех фруктов (#tfc:foods/fruits -> c:foods/fruit) — только processor-рецепты,
	// перебор тега ради no-op не выполняется:
	// const drying_fruits = Ingredient.of('#c:foods/fruit').itemIds;
	// drying_fruits.forEach(item => { global.processorRecipeText(event, `processor/${...}/drying`, ...) });

	//#endregion
	//#region Smoking

	// [PORT-Ф2] Копчение мяса/сыра — только processor-рецепты (файрпит-копчение есть в firmalife нативно):
	// const smoking_meats = Ingredient.of('#c:foods/raw_meat').itemIds;
	// const smoking_cheese = Ingredient.of('#firmalife:foods/cheeses').itemIds;
	// smoking_meats.forEach(item => { global.generateSmokingFoodRecipes(event, item) });
	// smoking_cheese.forEach(item => { global.generateSmokingFoodRecipes(event, item) });

	//#endregion
	//#region Brining

	// [PORT-Ф2] Засолка — только processor-рецепты (бочковая засолка есть в TFC нативно):
	// const brining_veg = Ingredient.of('#firmalife:foods/pizza_ingredients').itemIds;
	// const brining_ingredients = smoking_meats.concat(brining_veg);
	// brining_ingredients.forEach(item => { global.generateBriningFoodRecipes(event, item) });

	//#endregion
	//#region Drying

	/** @type {{input: Item, output: Item}[]} */
	const drying_recipes = [
		{ input: 'firmalife:food/soy_mixture', output: 'firmalife:food/tofu' },
		{ input: 'tfc:food/soybean', output: 'firmalife:food/dehydrated_soybeans' },
		{ input: 'firmalife:plant/vanilla', output: 'firmalife:spice/vanilla' },
		{ input: 'firmalife:cinnamon_bark', output: 'firmalife:spice/cinnamon' },
		{ input: 'firmalife:food/white_chocolate_blend', output: 'firmalife:food/white_chocolate' },
		{ input: 'firmalife:food/milk_chocolate_blend', output: 'firmalife:food/milk_chocolate' },
		{ input: 'firmalife:food/dark_chocolate_blend', output: 'firmalife:food/dark_chocolate' }
	];

	// [PORT-Ф2] processor-часть no-op; аналоги на сушильном мате есть в firmalife нативно
	drying_recipes.forEach(item => {
		global.generateDryingFoodRecipes(event, item.input, item.output);
	});

	//#endregion
});
