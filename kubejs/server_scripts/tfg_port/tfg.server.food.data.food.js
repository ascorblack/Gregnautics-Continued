// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/food/data.food.js (registerTFGFoodData / registerTFGFoodItemSize).
// kubejs_tfc 2.0: data-событие принимает объекты-кодеки вместо builder-консюмеров:
//  event.foodItem(id, food=>...) -> event.food({ingredient, hunger, ...}, id)
//  event.itemHeat(id, 1, null, null) -> event.heat({ingredient, heat_capacity}, id)
//  event.drinkable(id, data=>...) -> event.drinkable({ingredient:{fluid|tag}, water, effects:[...], ...}, id)
//  event.itemSize(id, size, weight, name) -> event.itemSize({ingredient, size, weight}, id)
// Поля сверены с data/tfc/tfc/{food,drinkable,item_heat,item_size}/*.json из TFC 4.2.5.
// [PORT-Ф2] Кастомные нутриенты TFG (INutrientExtension: nauseating/parasites/cooling/quenching/
// microplastics) не существуют в TFC 4.x — опущены.
// [PORT] Отсутствующие моды: wan_ancient_beasts, species, betterend (Ф10), ad_astra — вырезаны/под guard'ом.

TFCEvents.data(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.food.data.food start');

	// [PORT] Ванильные нутриенты TFC 1.21 (Nutrient.VALUES) — кастомные TFG отброшены
	const NUTRIENTS = ['grain', 'fruit', 'vegetables', 'protein', 'dairy'];

	//#region Food Data

	/**
	 * Registers food items from the `TFG_CREATE_GENERIC_FOOD_ITEM` array.
	 * Each item should have an id, and either nutrition or mealType defined.
	 */
	global.TFG_CREATE_GENERIC_FOOD_ITEM.forEach((foodItem) => {

		if (!global.TFG_itemExists(foodItem.id)) {
			console.debug(`[Gregnautics] [PORT-Ф4-TODO] data: предмет ${foodItem.id} не зарегистрирован — пропуск`);
			return;
		}

		const name = foodItem.id.replace(':', '/');

		event.heat({ ingredient: foodItem.id, heat_capacity: 1 }, name);

		if (!foodItem.nutrition && !foodItem.mealType) return;

		let food = { ingredient: foodItem.id };

		if (foodItem.mealType) {
			// [PORT-CHECK] в TFC 4.x у food-данных нет поля type ('dynamic'/'dynamic_bowl') —
			// динамические блюда описываются как обычная еда (ср. firmalife filled_pie: hunger 4, decay 4.5)
			food.hunger = 4;
			food.decay_modifier = 4.5;
		} else {
			// Hunger defaults to 4 if not specified, but if its 0 it wont set any value.
			if (foodItem.nutrition.hunger !== 0 && !foodItem.inedible) {
				food.hunger = (foodItem.nutrition.hunger !== undefined && foodItem.nutrition.hunger !== null) ? foodItem.nutrition.hunger : 4;
			}
			if (foodItem.nutrition.saturation) food.saturation = foodItem.nutrition.saturation;
			if (foodItem.nutrition.water) food.water = foodItem.nutrition.water;
			// Decay defaults to 0 (non-perishable).
			food.decay_modifier = foodItem.nutrition.decay || 0;

			NUTRIENTS.forEach(nutrient => {
				if (foodItem.nutrition[nutrient]) {
					food[nutrient] = foodItem.nutrition[nutrient];
				}
			});
		}

		event.food(food, name);
	});

	// Ice shavings
	// [PORT-Ф2] food.cooling(0.1) — кастомный нутриент TFG, опущен
	event.food({ ingredient: 'firmalife:ice_shavings', water: 5, decay_modifier: 0 }, 'firmalife/ice_shavings');

	// [PORT-Ф10] Cave Pumpkin (betterend:cave_pumpkin) — марсианский контент, предмет не зарегистрирован

	// Ice Soup
	event.food({ ingredient: 'tfg:food/ice_soup', hunger: 1, water: 20, decay_modifier: 0 }, 'tfg/ice_soup');

	// Honeyed Apple
	event.food({ ingredient: 'create:honeyed_apple', hunger: 4, decay_modifier: 0.8, water: 5, fruit: 2, saturation: 1 }, 'create/honeyed_apple');

	// Food Items registered in core.
	// Lavacado
	if (global.TFG_itemExists('tfg:food/lavacado')) {
		event.food({ ingredient: 'tfg:food/lavacado', hunger: 4, decay_modifier: 2, vegetables: 1.5, saturation: 1 }, 'tfg/lavacado');
	}

	// Magmango
	if (global.TFG_itemExists('tfg:food/magmango')) {
		event.food({ ingredient: 'tfg:food/magmango', hunger: 4, decay_modifier: 2.25, water: 15, fruit: 1.5, saturation: 1 }, 'tfg/magmango');
	}

	// Fly Agaric
	// [PORT-Ф2] nauseating(2.0) — кастомный нутриент TFG, опущен
	if (global.TFG_itemExists('tfg:food/fly_agaric')) {
		event.food({ ingredient: 'tfg:food/fly_agaric', hunger: 4, decay_modifier: 2.1, water: 2, vegetables: 1 }, 'tfg/fly_agaric');
	}

	// Eggs
	// [PORT] wan_ancient_beasts и species отсутствуют на 1.21 — весь блок яиц вырезан
	// (charger/crusher/.../walker_egg, species:birt_egg и т.д., species:cracked_wraptor_egg)

	// Biochem Items
	if (global.TFG_itemExists('tfg:progenitor_cells')) {
		event.food({ ingredient: 'tfg:progenitor_cells', decay_modifier: 1 }, 'tfg/progenitor_cells');
	}
	if (global.TFG_itemExists('tfg:rough_endoplasmic_reticula')) {
		event.food({ ingredient: 'tfg:rough_endoplasmic_reticula', decay_modifier: 0.5 }, 'tfg/rough_endoplasmic_reticula');
	}
	if (global.TFG_itemExists('tfg:smooth_endoplasmic_reticula')) {
		event.food({ ingredient: 'tfg:smooth_endoplasmic_reticula', decay_modifier: 0.5 }, 'tfg/smooth_endoplasmic_reticula');
	}

	//#endregion
	//#region Drinkables

	// Proto Growth Medium
	if (global.TFG_fluidExists('tfg:proto_growth_medium')) {
		event.drinkable({
			ingredient: { fluid: 'tfg:proto_growth_medium' },
			water: 10,
			dairy: 5,
			protein: 1,
			effects: [{ effect: 'minecraft:absorption', amplifier: 2, chance: 0.25, duration: 1200 }]
		}, 'tfg/proto_growth_medium');
	}

	// Muddy Water
	// [PORT-Ф2] parasites/nauseating — кастомные нутриенты TFG, опущены
	if (global.TFG_fluidExists('tfg:muddy_water')) {
		event.drinkable({
			ingredient: { fluid: 'tfg:muddy_water' },
			water: 10,
			effects: [{ effect: 'tfc:thirst', chance: 1, duration: 20 * 10 }]
		}, 'tfg/muddy_water');
	}

	// Semiheavy Ammoniacal Water
	if (global.TFG_fluidExists('tfg:semiheavy_ammoniacal_water')) {
		event.drinkable({
			ingredient: { fluid: 'tfg:semiheavy_ammoniacal_water' },
			water: 10,
			effects: [{ effect: 'minecraft:nausea', chance: 0.5, duration: 200 }]
		}, 'tfg/semiheavy_ammoniacal_water');
	}

	// Rich Stock
	if (global.TFG_fluidExists('tfg:rich_stock')) {
		event.drinkable({
			ingredient: { fluid: 'tfg:rich_stock' },
			water: 4,
			protein: 0.25,
			vegetables: 0.25,
			effects: [{ effect: 'tfc:thirst', chance: 0.2, duration: 20 * 5 }]
		}, 'tfg/rich_stock');
	}

	// Light Stock
	if (global.TFG_fluidExists('tfg:light_stock')) {
		event.drinkable({
			ingredient: { fluid: 'tfg:light_stock' },
			water: 4,
			protein: 0.25,
			vegetables: 0.25,
			effects: [{ effect: 'tfc:thirst', chance: 0.2, duration: 20 * 5 }]
		}, 'tfg/light_stock');
	}

	// Brown Gravy
	if (global.TFG_fluidExists('tfg:brown_gravy')) {
		event.drinkable({
			ingredient: { fluid: 'tfg:brown_gravy' },
			water: 2,
			protein: 0.5,
			vegetables: 0.5,
			grain: 0.25,
			effects: [{ effect: 'tfc:thirst', chance: 0.3, duration: 20 * 5 }]
		}, 'tfg/brown_gravy');
	}

	//#endregion
	//#region Food Size Data

	// Loop through generic food items and set size. Defaults to `small, light`.
	global.TFG_CREATE_GENERIC_FOOD_ITEM.forEach((foodItem) => {

		if (!global.TFG_itemExists(foodItem.id)) return;

		const volume = (foodItem.size && foodItem.size.volume) || 'small';
		const weight = (foodItem.size && foodItem.size.weight) || 'light';

		event.itemSize({ ingredient: foodItem.id, size: volume, weight: weight }, foodItem.id.split(':').pop());
	});

	// TFG Earth Crops
	if (global.TFG_itemExists('tfg:rapeseed_product')) {
		event.itemSize({ ingredient: 'tfg:rapeseed_product', size: 'small', weight: 'light' }, 'rapeseed_product');
	}
	if (global.TFG_itemExists('tfg:sunflower_product')) {
		event.itemSize({ ingredient: 'tfg:sunflower_product', size: 'small', weight: 'light' }, 'sunflower_product');
	}

	// [PORT-Ф10] TFG Mars Crops (betterend:*) — марсианский контент не портирован, вырезано

	// Honeyed Apples
	event.itemSize({ ingredient: 'create:honeyed_apple', size: 'small', weight: 'light' }, 'honeyed_apple');

	// Jam
	event.itemSize({ ingredient: '#tfc:foods/sealed_preserves', size: 'tiny', weight: 'medium' }, 'sealed_preserves');
	event.itemSize({ ingredient: '#tfc:foods/preserves', size: 'tiny', weight: 'medium' }, 'preserves');

	//#endregion
});
