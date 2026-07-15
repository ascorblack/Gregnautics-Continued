// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/food/recipes.food.basic_processing.js (registerTFGBasicProcessingFoodRecipes).
// [PORT-Ф2] Все global.processorRecipe/registerFoodRecipe — no-op (машины еды TFG не портированы).
// Вызовы оставлены как маркеры, но данные рецептов урезаны до {} (старые ISP-билдеры meal/mergeTag
// упали бы при вычислении аргументов) — полные данные брать из оригинального utility/recipes при порте машин.
// Ремапы тегов: forge:->c: (tools/* в ед. числе),
// tfg:clean_water -> tfc:any_fresh_water, tfc:sweetener -> tfc:foods/sweeteners.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.food.recipes.food.basic_processing start');

	//#region Plant Cutting

	/**
	 * Object array of crops to be cut up. `{input, output, genShapelessKnife, genShapelessHammer, genShapelessMortar}`
	 * [PORT-Ф10] betterend:cave_pumpkin — марсианский контент, отсеивается guard'ом в генераторе.
	 */
	const plantCutting = [
		{ input: 'minecraft:brown_mushroom_block', output: '4x minecraft:brown_mushroom' },
		{ input: 'minecraft:red_mushroom_block', output: '4x minecraft:red_mushroom' },
		{ input: 'tfc:pumpkin', output: '4x tfc:food/pumpkin_chunks' },
		{ input: 'tfc:melon', output: '4x tfc:food/melon_slice' },
		{ input: 'betterend:cave_pumpkin', output: '4x betterend:cave_pumpkin_chunks', genShapelessKnife: true, genShapelessHammer: true },
	];

	plantCutting.forEach(block => {
		global.generateCuttingFoodRecipes(event, block.input, block.output, block.genShapelessKnife, block.genShapelessHammer, block.genShapelessMortar);
	});

	global.SPICES.forEach((spice, i) => {
		if (i === 0) {
			global.generateCuttingFoodRecipes(event, spice.plant, `2x ${spice.product}`);
		}

		if (i > 1) {
			global.generateCuttingFoodRecipes(event, spice.plant, `2x ${spice.product}`, true);
		}
	});

	//#endregion
	//#region Soy Processing

	// Soy Processing
	// [PORT-FIX] advanced_shaped_crafting без хвостовых 0,0; forge:tools/mortars -> c:tools/mortar
	event.recipes.tfc.advanced_shaped_crafting(
		TFC.isp.of('firmalife:food/soybean_paste').copyFood(), ['A', 'B'], {
			A: global.TFG_notRotten('firmalife:food/dehydrated_soybeans'),
			B: '#c:tools/mortar'
		}).id('tfg:mortar/soybean_paste');

	global.processorRecipe(event, 'soybean_paste', 60, 8, {});
	global.processorRecipe(event, 'soy_mixture', 300, 8, {});
	global.processorRecipe(event, 'soy_mixture_sea_water', 300, 8, {});
	global.processorRecipe(event, 'soy_mixture_salt_water', 300, 8, {});

	//#endregion
	//#region Olive Processing

	event.recipes.tfc.advanced_shaped_crafting(
		TFC.isp.of('2x tfc:olive_paste').copyFood(), ['A', 'B'], {
			A: global.TFG_notRotten('tfc:food/olive'),
			B: '#c:tools/mortar'
		}).id('tfg:mortar/olive_paste');

	global.processorRecipe(event, 'olive_paste', 60, 8, {});

	event.recipes.gtceu.mixer('tfg:tfc/olive_oil_water')
		.inputFluids(Fluid.of('minecraft:water', 200))
		.itemInputs('1x tfc:olive_paste')
		.outputFluids(Fluid.of('tfc:olive_oil_water', 200))
		.duration(200)
		.EUt(28);

	event.recipes.gtceu.distillery('tfg:tfc/olive_oil')
		.inputFluids(Fluid.of('tfc:olive_oil_water', 250))
		.outputFluids(Fluid.of('tfc:olive_oil', 50))
		.duration(600)
		.EUt(28);

	event.recipes.gtceu.fermenter('tfg:soybean_oil')
		.itemInputs('firmalife:food/soybean_paste')
		.inputFluids('#tfc:any_fresh_water 100') // [PORT] tfg:clean_water не портирован
		.outputFluids(Fluid.of('firmalife:soybean_oil', 250))
		.EUt(GTValues.VA[GTValues.ULV])
		.duration(600);

	//#endregion
	//#region Misc Plants

	// Golden Apple
	global.processorRecipe(event, 'golden_apple', 30 * 20, GTValues.VA[GTValues.HV], {});

	// Fries
	event.recipes.tfc.advanced_shapeless_crafting(
		TFC.isp.of('4x tfg:food/raw_fries').copyFood(),
		[global.TFG_notRotten('tfc:food/potato'), '#c:tools/knife'], // [PORT] tfc:knives -> c:tools/knife
		'tfc:food/potato'
	).id('tfg:crafting/raw_fries_knife');

	global.processorRecipe(event, 'raw_fries', 20 * 1, 8, {});

	global.generateOilBoilingFoodRecipes(event, 'tfg:food/raw_fries', 'tfg:food/cooked_fries', true, true, true);

	// Pineapple fiber
	global.processorRecipe(event, 'firmalife:crafting/pineapple_fiber', 300, 16, {});

	//#endregion
	//#region Meat Processing

	// Stackatick
	event.recipes.tfc.advanced_shapeless_crafting(
		TFC.isp.of('tfg:food/raw_stickastackatick').copyFood(),
		[global.TFG_notRotten('tfg:food/raw_stackatick_chunks'), '#c:rods/wooden'], 'tfg:food/raw_stackatick_chunks') // [PORT] forge:rods/wood -> c:rods/wooden
		.id('tfg:crafting/raw_stickastackatick');

	// Bacon
	global.processorRecipe(event, 'bacon', 300, 8, {});

	// Eggs.
	// [PORT-FIX] id рецептов в TFC 4.x: pot/boiled_egg_N -> pot/food/boiled_egg_N (1..5), heating/cooked_egg -> heating/food/cooked_egg
	for (let i = 1; i <= 5; i++) {
		event.remove({ id: `tfc:pot/food/boiled_egg_${i}` });
	}
	event.remove({ id: 'tfc:heating/food/cooked_egg' });

	global.processorRecipe(event, 'pickled_egg', 1000, 8, {});

	// [PORT] forge:eggs -> c:eggs
	global.generateFoodCookingRecipes(event, '#c:eggs', 'tfc:food/cooked_egg', true, true, false, 1);
	global.generateWaterBoilingFoodRecipes(event, '#c:eggs', 'tfc:food/boiled_egg', true, false, true, 2);

	//#endregion
	//#region Fruit Processing

	global.FOOD_FRUIT.forEach(fruit => {

		if (!global.TFG_itemExists(fruit.id)) {
			console.debug(`[Gregnautics] [PORT-Ф4-TODO] пропущен сок из ${fruit.id}: предмет не зарегистрирован`);
			return;
		}

		// Juice
		// [PORT-CHECK] mergeTag({dynamic_color}) — NBT удалён в 1.21, динамический цвет TFG не портирован (опущено);
		// [PORT-Ф2] quenching — кастомный параметр TFG, опущен. meal через addJsonModifier (кодек tfc:meal).
		event.recipes.tfc.advanced_shapeless_crafting(
			TFC.isp.of('tfg:food/juice').addJsonModifier({ type: 'tfc:meal',
				food: { hunger: 4, decay_modifier: 1.5, water: 15 },
				portions: [{ nutrient_modifier: 1.1, saturation_modifier: 1.5 }]
			}),
			[
				global.TFG_notRotten(fruit.id),
				global.TFG_notRotten(fruit.id),
				global.TFG_notRotten(fruit.id),
				'tfc:empty_jar',
				'firmalife:cork',
				'#c:tools/mortar' // [PORT] forge:tools/mortars -> c:tools/mortar
			],
			fruit.id // [PORT-FIX] TFC 4.x: primary_ingredient обязателен
		).id(`tfg:crafting/juice/${fruit.name}`);

		global.processorRecipe(event, `juice/${fruit.name}`, 60, GTValues.VA[GTValues.ULV], {});
	});

	// [PORT-FIX] kubejs_tfc 2.0: конструктор barrel_instant(input_fluid); TFC.fluidStackIngredient удалён
	event.recipes.tfc.barrel_instant('#tfc:any_fresh_water 100')
		.inputItem('tfg:food/juice')
		.outputItem('tfc:empty_jar')
		.sound('minecraft:entity.generic.splash')
		.id('tfg:barrel/juice_washing');

	event.recipes.gtceu.chemical_bath('tfg:chemical_bath/juice_washing')
		.itemInputs('tfg:food/juice')
		.itemOutputs('tfc:empty_jar')
		.inputFluids('#tfc:any_fresh_water 100') // [PORT] tfg:clean_water не портирован
		.duration(20 * 1)
		.EUt(GTValues.VA[GTValues.ULV]);

	//#endregion
	//#region Chemicals

	// Crude Gelatin
	event.recipes.tfc.pot(
		Array(5).fill('minecraft:bone_meal'),
		'#tfc:any_fresh_water 1000', // [PORT] tfg:clean_water не портирован
		500,
		200
	).itemOutput(TFC.isp.of('tfg:food/crude_gelatin').resetFood())
		.id('tfg:pot/bone_meal_boiled_into_crude_gelatin');

	// [PORT-FIX] схем firmalife нет в kubejs_tfc 2.0.1 — vat через event.custom
	event.custom({
		"type": "firmalife:vat",
		"input_item": { "item": "minecraft:bone_meal", "count": 5 },
		"input_fluid": { "amount": 1000, "tag": "tfc:any_fresh_water" },
		"output_item": { "stack": { "id": "tfg:food/crude_gelatin", "count": 1 }, "modifiers": [{ "type": "tfc:reset_food" }] },
		"length": 100,
		"temperature": 200.0
	}).id('tfg:vat/bone_meal_boiled_into_crude_gelatin');

	global.registerFoodRecipe(event, 'food_oven', 'bone_meal_boiled_into_crude_gelatin', 100, 8, '', {});

	// Vinegar
	global.processorRecipe(event, 'vinegar_alcohol', 600, GTValues.VA[GTValues.LV], {});

	// Salt
	event.shapeless('4x tfc:powder/salt', ['#c:dusts/salt', '#c:tools/mortar']) // [PORT] forge:dusts/salt -> c:dusts/salt
		.id('tfg:mortar/salt');

	// Sodium Dihydrogen Citrate
	// [PORT-Ф2] tfg:citric_acid / gtceu-предметы TFG-материалов заблокированы (upstream-баг флагов) —
	// рецепт закомментирован до починки кастомных GT-материалов TFG.
	// event.recipes.gtceu.chemical_reactor('tfg:sodium_dihydrogen_citrate')
	// 	.itemInputs(
	// 		ChemicalHelper.get(TagPrefix.dust, 'tfg:citric_acid', 1),
	// 		ChemicalHelper.get(TagPrefix.dust, GTMaterials.SodiumBicarbonate, 1)
	// 	)
	// 	.itemOutputs('tfg:sodium_dihydrogen_citrate_dust')
	// 	.outputFluids(
	// 		Fluid.of('minecraft:water', 1000),
	// 		Fluid.of('gtceu:carbon_dioxide', 1000)
	// 	)
	// 	.duration(20*10)
	// 	.EUt(GTValues.VA[GTValues.HV]);

	// Citric Acid
	global.processorRecipe(event, 'citric_acid', 20 * 20, GTValues.VA[GTValues.HV], {});

	//#endregion

	// [PORT-FIX] схем firmalife нет — stomping через event.custom (формат сверен с data/firmalife/recipe/stomping/*.json)
	// [PORT-FIX] firmalife:raw_honey не существует (в Firmalife 3.0 мёд — жидкость) -> minecraft:honey_bottle
	event.custom({
		"type": "firmalife:stomping",
		"ingredient": { "item": "minecraft:honey_bottle" },
		"result": { "id": "minecraft:sugar" },
		"input_texture": "minecraft:block/honey_block",
		"output_texture": "minecraft:block/snow",
		"sound": "minecraft:entity.slime.squish"
	}).id('tfg:stomping/honey_to_sugar');
});
