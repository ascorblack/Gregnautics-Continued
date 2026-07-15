// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/food/recipes.food.baking_and_desserts.js (registerTFGBakingAndDessertFoodRecipes).
// [PORT-Ф2] processor/oven-рецепты (мука, тосты, дрожжи, шоколад, мороженое, пироги, торты, печенье) —
// no-op до порта машин еды TFG; данные урезаны до {}.
// [PORT-CHECK] mergeTag({dynamic_color}) / simpleModifier('tfg:copy_nbt') — NBT и модификаторы TFG
// не портированы, у смузи/сока потерян динамический цвет; meal — через addJsonModifier('tfc:meal', ...).
// [PORT-Ф2] Кастомные поля еды TFG (quenching/cooling/microplastics) опущены.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.food.recipes.food.baking_and_desserts start');

	global.TFC_GRAINS.forEach(grain => {

		//#region Flour Processing

		// Raw crop to grain
		global.processorRecipe(event, `${grain.name}_grain`, 100, 8, {});

		//  Grain to flour
		global.processorRecipe(event, `${grain.name}_flour`, 100, 8, {});

		// [PORT-FIX] advanced_shaped_crafting без хвостовых 0,0; forge:tools/mortars -> c:tools/mortar
		event.recipes.tfc.advanced_shaped_crafting(
			TFC.isp.of(`tfc:food/${grain.name}_flour`).copyFood(), [
				'A',
				'B'
			], {
				A: global.TFG_notRotten(`tfc:food/${grain.name}_grain`),
				B: '#c:tools/mortar'
			}).id(`tfg:mortar/${grain.name}_flour`);

		//#endregion
		//#region Bread

		// Flatbread dough / Firmalife dough ([PORT-Ф2] processor)
		global.processorRecipe(event, `${grain.name}_flatbread_dough`, 300, 8, {});
		global.processorRecipe(event, `${grain.name}_dough`, 300, 16, {});

		// Bread baking ([PORT-Ф2] GT-oven; нативные рецепты выпечки есть в TFC/firmalife)
		global.cookingRecipe(event, `${grain.name}_flatbread`, `tfc:food/${grain.name}_dough`, `firmalife:food/${grain.name}_flatbread`);
		global.cookingRecipe(event, `${grain.name}_bread`, `firmalife:food/${grain.name}_dough`, `tfc:food/${grain.name}_bread`);

		global.processorRecipe(event, `${grain.name}_bread_slice`, 10, 8, {});
	});

	// Brioche Dough
	// [PORT] forge:eggs -> c:eggs; tfc:foods/flour -> c:foods/flour; tfc:milks -> c:milks
	global.generateMixingFoodRecipes(event,
		['#c:eggs', '#c:foods/flour', 'firmalife:tirage_mixture'],
		'#c:milks 500', null, '4x tfg:food/brioche_dough', true
	);

	global.processorRecipe(event, 'brioche_dough/yeast', 20 * 2, GTValues.VA[GTValues.ULV], {});

	global.generateFoodCookingRecipes(event, 'tfg:food/brioche_dough', 'tfg:food/brioche_bun', true, false, true);

	// Toast ([PORT-Ф2] processor)
	global.processorRecipe(event, 'garlic_bread', 200, 8, {});
	global.processorRecipe(event, 'toast_with_butter', 200, 8, {});
	global.processorRecipe(event, 'toast_with_jam', 200, 8, {});

	//#endregion
	//#region Baking Ingredients

	// Baking Ingredients ([PORT-Ф2] processor)
	global.processorRecipe(event, 'yeast_starter', 1200, 8, {});
	global.processorRecipe(event, 'yeast_starter_from_water', 7200, 8, {});

	// Tirage Mixture
	// [PORT-Ф2] gtceu.food_processor — кастомный тип рецептов TFG, не зарегистрирован:
	// event.recipes.gtceu.food_processor('tfg:tirage_mixture')
	// 	.itemInputs('#tfc:foods/sweeteners')
	// 	.inputFluids(Fluid.of('firmalife:yeast_starter', 100))
	// 	.itemOutputs('firmalife:tirage_mixture')
	// 	.duration(10)
	// 	.circuit(4)
	// 	.EUt(GTValues.VA[GTValues.ULV]);

	//#endregion
	//#region Chocolate

	// I cannot find what happened to the original recipe so im just remaking it. v
	event.recipes.tfc.quern(TFC.isp.of('4x firmalife:food/cocoa_powder').copyOldestFood(), 'firmalife:food/roasted_cocoa_beans')
		.id('tfg:quern/cocoa_powder');

	/** @type {string[]} cocoa types ([PORT-Ф2] processor) */
	const cocoa = ['cocoa_powder', 'cocoa_butter'];
	cocoa.forEach((type, i) => {
		global.processorRecipe(event, type, 100, 4, {});
	});

	// [PORT-Ф2] Плавка/отливка/бленды шоколада — processor-рецепты (+tfcchannelcasting отсутствует):
	const chocolates = ['white_chocolate', 'milk_chocolate', 'dark_chocolate'];
	chocolates.forEach((chocolate, i) => {
		global.processorRecipe(event, `${chocolate}_melting`, 100, 16, {});
		global.processorRecipe(event, `${chocolate}_casting`, 100, 16, {});
		global.processorRecipe(event, `${chocolate}_blend`, 300, 16, {});
	});

	//#endregion
	//#region Ice cream ([PORT-Ф2] processor)

	global.processorRecipe(event, 'vanilla_ice_cream', 300, 16, {});
	global.processorRecipe(event, 'chocolate_ice_cream', 300, 16, {});
	global.processorRecipe(event, 'strawberry_ice_cream', 300, 16, {});
	global.processorRecipe(event, 'cookie_dough_ice_cream', 300, 16, {});
	global.processorRecipe(event, 'banana_split', 500, 16, {});

	//#endregion
	//#region Pies

	global.processorRecipe(event, 'pie_dough', 300, 16, {});

	// Jam Pie ([PORT-Ф2] processor)
	global.processorRecipe(event, 'filled_pie', 300, 16, {});

	// Savory Pie
	for (let i = 1; i <= 3; i++) {
		global.generateMixingFoodRecipes(event,
			['firmalife:food/pie_dough', 'firmalife:pie_pan', `${i}x #tfg:foods/usable_in_savory_pie`], null, null,
			'firmalife:food/filled_pie', true, false, true, i,
			// [PORT-FIX] meal через addJsonModifier; firmaLifeAddPiePan -> addSimpleModifier('firmalife:add_pie_pan')
			TFC.isp.of('firmalife:food/filled_pie').addJsonModifier({ type: 'tfc:meal',
				food: { hunger: 4, dairy: 0.5, grain: 1.0, saturation: 1.0, decay_modifier: 4.5 },
				portions: [{ nutrient_modifier: 1.0, water_modifier: 0.8, saturation_modifier: 0.8 }]
			}).addSimpleModifier('firmalife:add_pie_pan'), `filled_savory_pie_${i}`
		);
	}

	// Breakfast Pie
	global.generateMixingFoodRecipes(event,
		['firmalife:food/pie_dough', 'firmalife:pie_pan', '#c:eggs', 'firmalife:food/bacon', '#tfg:foods/cheeses'], null, null,
		'firmalife:food/filled_pie', true, false, true, 4,
		TFC.isp.of('firmalife:food/filled_pie').addJsonModifier({ type: 'tfc:meal',
			food: { hunger: 4, dairy: 0.5, grain: 1.0, saturation: 1.0, decay_modifier: 4.5 },
			portions: [{ nutrient_modifier: 1.0, water_modifier: 0.8, saturation_modifier: 0.8 }]
		}).addSimpleModifier('firmalife:add_pie_pan'), 'filled_breakfast_pie'
	);

	// [PORT-Ф2] GT-oven-выпечка пирогов (нативные oven-рецепты есть в firmalife)
	global.generateFoodCookingRecipes(event, 'firmalife:food/raw_pumpkin_pie', 'minecraft:pumpkin_pie', true, false, false, null, true);

	// Pumpkin Pie ([PORT-Ф2] processor)
	global.processorRecipe(event, 'pumpkin_pie_dough', 300, 16, {});
	global.processorRecipe(event, 'raw_pumpkin_pie', 20, 8, {});

	global.generateFoodCookingRecipes(event, 'firmalife:food/filled_pie', 'firmalife:food/cooked_pie', true, false, false, null, true);

	// Bulbkin Pie
	// [PORT-Ф10] betterend:* (марсианский контент) не зарегистрирован — guard в генераторе пропустит
	global.generateMixingFoodRecipes(event,
		['#tfg:martian_eggs', '2x betterend:cave_pumpkin_chunks', 'betterend:amber_root_product', 'tfg:wraptor_sugar'],
		'#tfc:any_fresh_water 1000', null, 'betterend:cave_pumpkin_pie_dough'
	);

	// [PORT-Ф10] betterend:cave_pumpkin_pie_raw не зарегистрирован — рецепт закомментирован:
	// event.recipes.tfc.advanced_shapeless_crafting(
	// 	TFC.isp.of('betterend:cave_pumpkin_pie_raw').copyFood().addSimpleModifier('firmalife:add_pie_pan'), [
	// 		global.TFG_notRotten('betterend:cave_pumpkin_pie_dough'),
	// 		'#firmalife:pie_pans'
	// ], 'betterend:cave_pumpkin_pie_dough').id('tfg:shapeless/cave_pumpkin_pie_raw');

	global.processorRecipe(event, 'raw_cave_pumpkin_pie', 20, 8, {});

	//#endregion
	//#region Cakes ([PORT-Ф2] processor; mixing_bowl/oven-аналоги cake_base уже в firmalife.recipes.js)

	global.processorRecipe(event, 'cake_base', 300, 8, {});
	global.cookingRecipe(event, 'baked_cake_base', 'createaddition:cake_base', 'createaddition:cake_base_baked');
	global.processorRecipe(event, 'vanilla_cake', 300, 8, {});
	global.processorRecipe(event, 'milk_chocolate_cake', 300, 8, {});
	global.processorRecipe(event, 'dark_chocolate_cake', 300, 8, {});
	global.processorRecipe(event, 'maple_honey_cake', 300, 8, {});
	global.processorRecipe(event, 'birch_honey_cake', 300, 8, {});
	global.processorRecipe(event, 'birtday_cake', 300, GTValues.VA[GTValues.HV], {}); // [PORT] species отсутствует

	//#endregion
	//#region Cookies ([PORT-Ф2] processor)

	global.processorRecipe(event, 'cookie_dough', 300, 16, {});
	global.processorRecipe(event, 'chocolate_chip_cookie_dough', 300, 16, {});
	global.processorRecipe(event, 'hardtack_dough', 300, 16, {});

	//#endregion
	//#region Smoothies

	global.FOOD_FRUIT.forEach(fruit => {

		if (!global.TFG_itemExists(fruit.id)) return;

		// Smoothie from yogurt.
		// [PORT-CHECK] dynamic_color потерян (NBT); [PORT-Ф2] quenching/cooling опущены
		event.recipes.tfc.advanced_shapeless_crafting(
			TFC.isp.of('tfg:food/smoothie').addJsonModifier({ type: 'tfc:meal',
				food: { hunger: 4, decay_modifier: 1.8, water: 10 },
				portions: [{ nutrient_modifier: 1.2, saturation_modifier: 1.5 }]
			}),
			[
				global.TFG_notRotten(fruit.id),
				global.TFG_notRotten(fruit.id),
				global.TFG_notRotten('tfg:food/yogurt'),
				global.TFG_notRotten('firmalife:ice_shavings'),
				'#c:tools/mortar' // [PORT] forge:tools/mortars -> c:tools/mortar
			],
			fruit.id // [PORT-FIX] primary_ingredient обязателен
		).id(`tfg:crafting/smoothie/${fruit.name}`);

		global.processorRecipe(event, `smoothie/${fruit.name}`, 60, GTValues.VA[GTValues.ULV], {});
	});

	// Smoothie from fruit yogurt.
	// [PORT-Ф2] simpleModifier('tfg:copy_nbt') — модификатор TFG не портирован, опущен
	event.recipes.tfc.advanced_shapeless_crafting(
		TFC.isp.of('tfg:food/smoothie').addJsonModifier({ type: 'tfc:meal',
			food: { hunger: 4, decay_modifier: 1.8, water: 10 },
			portions: [{ nutrient_modifier: 1.2, saturation_modifier: 1.5 }]
		}),
		[
			global.TFG_notRotten('tfg:food/fruit_yogurt'),
			global.TFG_notRotten('firmalife:ice_shavings'),
			'#c:tools/mortar'
		],
		'tfg:food/fruit_yogurt'
	).id('tfg:crafting/smoothie/fruit_yogurt');

	global.processorRecipe(event, 'smoothie/fruit_yogurt', 60, GTValues.VA[GTValues.ULV], {});

	// Smoothie from fruit juice.
	event.recipes.tfc.advanced_shapeless_crafting(
		TFC.isp.of('2x tfg:food/smoothie').addJsonModifier({ type: 'tfc:meal',
			food: { hunger: 4, decay_modifier: 1.8, water: 10 },
			portions: [{ nutrient_modifier: 1, saturation_modifier: 1.1 }]
		}),
		[
			global.TFG_notRotten('tfg:food/juice'),
			global.TFG_notRotten('tfg:food/yogurt'),
			global.TFG_notRotten('firmalife:ice_shavings'),
			global.TFG_notRotten('firmalife:ice_shavings'),
			'#c:tools/mortar'
		],
		'tfg:food/juice'
	).id('tfg:crafting/smoothie/fruit_juice');

	global.processorRecipe(event, 'smoothie/fruit_juice', 60, GTValues.VA[GTValues.ULV], {});

	//#endregion
	//#region Misc Desserts

	// Honeyed Apples
	// [PORT-FIX] тега tfc:foods/apples нет в TFC 4.x — заменён на явный список яблок
	const tfgApples = ['tfc:food/red_apple', 'tfc:food/green_apple'];
	// [PORT-FIX] firmalife:raw_honey не существует (в Firmalife 3.0 мёд — жидкость) -> minecraft:honey_bottle
	event.recipes.tfc.advanced_shapeless_crafting(
		TFC.isp.of('create:honeyed_apple').copyFood(),
		[Ingredient.of(tfgApples), 'minecraft:honey_bottle'],
		Ingredient.of(tfgApples) // [PORT-FIX] primary_ingredient обязателен
	).id('tfg:shapeless/honeyed_apple');

	global.processorRecipe(event, 'honeyed_apple', 5 * 20, GTValues.VA[GTValues.ULV], {});

	// Popcorn
	global.generateOilBoilingFoodRecipes(event, 'tfc:food/maize_grain', 'tfg:food/popcorn', true, true, true, 3);

	global.generateMixingFoodRecipes(event,
		['2x tfg:food/popcorn', 'firmalife:food/butter', 'tfc:powder/salt'],
		null, null, '2x tfg:food/buttered_popcorn'
	);

	//#endregion
});
