// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/food/recipes.food.meal_bags.js (registerTFGMealBagRecipes).
// [PORT-Ф4-TODO] tfg:dry_ice не зарегистрирован на 1.21 — вся цепочка сухого льда закомментирована.
// [PORT-Ф2] processor-рецепты (calorie_paste, meal_bag) — no-op до порта машин еды TFG;
// gas_pressurizer — кастомный тип рецептов TFG, не зарегистрирован.
// [PORT] greate отсутствует — splashing вырезан.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.food.recipes.food.meal_bags start');

	//#region Materials

	event.recipes.gtceu.forming_press('tfg:forming_press/foil_pack')
		.itemInputs(ChemicalHelper.get(TagPrefix.foil, GTMaterials.Aluminium, 1), ChemicalHelper.get(TagPrefix.foil, GTMaterials.Polyethylene, 1))
		.itemOutputs('1x tfg:foil_pack')
		.duration(100)
		.EUt(GTValues.VA[GTValues.MV]);

	// [PORT-Ф4-TODO] [PORT-Ф2] tfg:dry_ice не зарегистрирован; gas_pressurizer — тип TFG; gtceu:liquid_carbon_dioxide под вопросом.
	// Вернуть цепочку сухого льда после регистрации предмета/машины:
	// event.recipes.gtceu.gas_pressurizer('tfg:fluid_solidifier/dry_ice')...('2x tfg:dry_ice')
	// event.recipes.gtceu.vacuum_freezer('tfg:vacuum_freezer/liq_co2')...(gtceu:liquid_carbon_dioxide)
	// event.recipes.gtceu.vacuum_freezer('tfg:vacuum_freezer/dry_ice')...('10x tfg:dry_ice')
	// event.recipes.gtceu.fluid_heater('tfg:fluid_heater/decompress_liq_co2')...
	// event.recipes.gtceu.fluid_heater('tfg:fluid_heater/decompress_dry_ice')...

	event.recipes.gtceu.mixer('tfg:clean_foil_pack')
		.itemInputs('1x tfg:used_foil_pack')
		.inputFluids('#tfc:any_fresh_water 100') // [PORT] tfg:clean_water не портирован
		.itemOutputs('1x tfg:clean_foil_pack')
		.duration(200)
		.circuit(1)
		.EUt(GTValues.VA[GTValues.LV]);

	event.recipes.gtceu.chemical_bath('tfg:ore_washer/distilled/clean_foil_pack')
		.itemInputs('1x tfg:used_foil_pack')
		.inputFluids(Fluid.of('gtceu:distilled_water', 10))
		.itemOutputs('1x tfg:clean_foil_pack')
		.duration(50)
		.circuit(2)
		.EUt(GTValues.VA[GTValues.ULV]);

	event.custom({
		type: 'ae2:transform',
		circumstance: {
			type: 'fluid',
			tag: 'tfc:any_fresh_water' // [PORT-FIX] тега tfc:water нет в TFC 4.x
		},
		ingredients: [
			{ item: 'tfg:used_foil_pack' }],
		result: { id: 'tfg:clean_foil_pack' } // [PORT-FIX] ae2:transform result — ItemStack-кодек 1.21: ключ id, не item
	}).id('tfg:ae_transform/clean_foil_pack');

	// [PORT] greate отсутствует на 1.21 — рецепт splashing вырезан:
	// event.recipes.greate.splashing(['tfg:clean_foil_pack'], ['tfg:used_foil_pack', Fluid.of('minecraft:water', 100)])

	event.shapeless('1x tfg:used_foil_pack', [
		'tfg:food/calorie_paste'
	]).id('tfg:shapeless/emptying/calorie_paste');

	event.shapeless('1x tfg:used_foil_pack', [
		'tfg:food/meal_bag'
	]).id('tfg:shapeless/emptying/meal_bag');

	event.shapeless('1x tfg:used_foil_pack', [
		'tfg:food/freeze_dried_fruit'
	]).id('tfg:shapeless/emptying/freeze_dried_fruit');

	// [PORT-Ф4] TFGHelpers.registerMaterialInfo — Java-хелпер мода tfg (1.20), отсутствует на 1.21:
	// TFGHelpers.registerMaterialInfo('tfg:clean_foil_pack', [GTMaterials.Aluminium, 0.25, GTMaterials.Polyethylene, 0.25])

	//#endregion
	//#region Food Recipes

	// Calorie Paste
	global.processorRecipeText(event, 'calorie_paste', 100, GTValues.VA[GTValues.MV], 'tfg.food_recipe.freeze_drying', {});

	// Meal Bags
	for (let i = 1; i <= 4; i++) {
		global.processorRecipeText(event, `meal_bag/${i}`, 100, GTValues.VA[GTValues.MV], 'tfg.food_recipe.freeze_drying', {});
	}

	//#endregion
});
