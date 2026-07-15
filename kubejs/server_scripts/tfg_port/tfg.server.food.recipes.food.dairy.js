// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/food/recipes.food.dairy.js (registerTFGDairyFoodRecipes).
// [PORT-Ф2] processor-рецепты (творог, сырные головы, масло) — no-op до порта машин еды TFG;
// рецепты с gtceu-предметами TFG-материалов (lactose_dust и т.п.) закомментированы (upstream-баг флагов).

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.food.recipes.food.dairy start');

	//#region Cheese & Curds

	global.TFC_CURDS_AND_CHEESES.forEach(item => {

		// Curdled Milk
		event.recipes.gtceu.fermenter(`tfg:curdled_${item.id}`)
			.inputFluids(Fluid.of(item.milk, 2000))
			.itemInputs('firmalife:rennet')
			.outputFluids(Fluid.of(item.curdled_fluid, 2000))
			.duration(2400)
			.EUt(16);

		// [PORT-Ф2] gtceu:lactose_dust — предмет TFG-материала (upstream-баг флагов), рецепты закомментированы:
		// event.recipes.gtceu.mixer(`lactose_milk_${item.id}`)
		// 	.circuit(1)
		// 	.inputFluids(Fluid.of(item.milk, 1000), Fluid.of('gtceu:acetic_acid', 25))
		// 	.itemOutputs('1x gtceu:lactose_dust')
		// 	.outputFluids(Fluid.of(item.curdled_fluid, 1000))
		// 	.duration(300)
		// 	.EUt(GTValues.VA[GTValues.LV]);
		// event.recipes.gtceu.mixer(`lactose_milk_vinegar_${item.id}`)
		// 	.circuit(1)
		// 	.inputFluids(Fluid.of(item.milk, 1000), Fluid.of('tfc:vinegar', 100))
		// 	.chancedOutput('gtceu:lactose_dust', 1000, 0)
		// 	.outputFluids(Fluid.of(item.curdled_fluid, 1000))
		// 	.duration(300)
		// 	.EUt(GTValues.VA[GTValues.LV]);

		// Curds / Cheese Wheels / Cutting ([PORT-Ф2] processor)
		global.processorRecipe(event, `${item.id}_curd`, 1200, 16, {});
		global.processorRecipe(event, `${item.id}_unsalted_cheese_wheel`, 8000, 16, {});
		global.processorRecipe(event, `${item.id}_unsalted_cheese_cutting`, 100, 8, {});

		if (item.salted_wheel === null || item.salted_cheese === null) return;

		global.processorRecipe(event, `${item.id}_salted_cheese_wheel`, 1000, 16, {});
		global.processorRecipe(event, `${item.id}_salted_cheese_cutting`, 100, 8, {});
	});

	// Shredded Cheese ([PORT-Ф2] processor)
	global.processorRecipe(event, 'shredded_cheese', 100, 16, {});

	// Slice of "Cheese"
	// [PORT-Ф2] gtceu.food_processor — тип TFG; lactose/cholesterol/sodium_dihydrogen_citrate —
	// предметы TFG-материалов (upstream-баг флагов). Закомментировано:
	// event.recipes.gtceu.food_processor('slice_of_cheese')
	// 	.itemInputs(
	// 		ChemicalHelper.get(TagPrefix.dust, 'gtceu:lactose', 1),
	// 		ChemicalHelper.get(TagPrefix.dust, 'tfg:cholesterol', 1),
	// 		ChemicalHelper.get(TagPrefix.dust, 'tfg:sodium_dihydrogen_citrate', 1),
	// 		ChemicalHelper.get(TagPrefix.foil, GTMaterials.Polyethylene, 8)
	// 	)
	// 	.inputFluids('#tfc:any_fresh_water 1000')
	// 	.itemOutputs('8x tfg:food/slice_of_cheese')
	// 	.duration(20 * 20)
	// 	.EUt(GTValues.VA[GTValues.LV]);

	// Fried Cheese Curds
	// [PORT] forge:eggs -> c:eggs; tfc:foods/flour -> c:foods/flour; tfg:alcohols/beer -> c:alcohols/beer
	global.generateMixingFoodRecipes(event,
		['3x #tfg:foods/cheese_curds', '#c:foods/flour', '#c:eggs'],
		'#c:alcohols/beer 100', null, '3x tfg:food/raw_beer_battered_cheese_curds'
	);

	global.generateOilBoilingFoodRecipes(event, 'tfg:food/raw_beer_battered_cheese_curds', 'tfg:food/cooked_beer_battered_cheese_curds', true, true, true);

	//#endregion
	//#region Yogurt

	// Cultured Milk
	global.generateMixingFoodRecipes(event, '4x firmalife:fruit_leaf', '#c:milks 1000', 'tfg:cultured_milk 1000', null, false, true, true, 1, null, 'cultured_milk_from_fruit_leaf');
	global.generateMixingFoodRecipes(event, 'tfg:food/yogurt', '#c:milks 1000', 'tfg:cultured_milk 1000', 'tfc:empty_jar', false, true, true, 1, null, 'cultured_milk_from_yogurt');

	// Yo Gurt Whattup?
	// [PORT-FIX] kubejs_tfc 2.0: конструктор barrel_sealed(input_fluid, duration); .inputs() -> .inputItem()
	event.recipes.tfc.barrel_sealed('tfg:cultured_milk 250', 8000) // 8 hours.
		.inputItem('tfc:empty_jar')
		.outputItem(TFC.isp.of('tfg:food/yogurt').resetFood())
		.id('tfg:barrel/yogurt_fermentation');

	global.processorRecipe(event, 'yogurt_fermentation', 1200, 1, {});

	// Fruit Yogurt
	global.FOOD_FRUIT.forEach(fruit => {
		// [PORT-CHECK] mergeTag({dynamic_color}) опущен (NBT удалён); meal через addJsonModifier
		global.generateMixingFoodRecipes(event, ['tfg:food/yogurt', `2x ${fruit.id}`], null, null, 'tfg:food/fruit_yogurt', true, false, true, 1,
			TFC.isp.of('tfg:food/fruit_yogurt').addJsonModifier({ type: 'tfc:meal',
				food: { hunger: 4, decay_modifier: 1.5 },
				portions: [{ nutrient_modifier: 1.2, saturation_modifier: 1.2 }]
			}), `${fruit.id}_fruit_yogurt`);
	});

	//#endregion
	//#region Churning

	event.recipes.gtceu.fermenter('tfg:fermenter/cream')
		.inputFluids('#c:milks 1000') // [PORT] tfc:milks -> c:milks
		.outputFluids(Fluid.of('firmalife:cream'))
		.circuit(6)
		.duration(1200)
		.EUt(24);

	global.processorRecipe(event, 'butter', 300, 16, {});

	//#endregion
});
