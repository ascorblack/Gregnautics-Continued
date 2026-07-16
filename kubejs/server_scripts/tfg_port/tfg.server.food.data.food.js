// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/food/data.food.js (registerTFGFoodData / registerTFGFoodItemSize).
// kubejs_tfc 2.0: data-событие принимает объекты-кодеки вместо builder-консюмеров:
//  event.foodItem(id, food=>...) -> event.food({ingredient, hunger, ...}, id)
//  event.itemHeat(id, 1, null, null) -> event.heat({ingredient, heatCapacity}, id)
// [PORT-FIX 2026-07-16] ВНИМАНИЕ: имена полей — как в Java-record'ах (camelCase),
// а НЕ как в json TFC (snake_case). KubeJS строит record по его полям и молча
// игнорирует незнакомые ключи (heat_capacity/decay_modifier -> тихий ноль).
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

		event.heat({ ingredient: foodItem.id, heatCapacity: 1 }, name);

		if (!foodItem.nutrition && !foodItem.mealType) return;

		// [PORT-FIX 2026-07-16] Форма данных: KubeJS собирает FoodDefinition ПО ПОЛЯМ
		// Java-record'а, а не по кодеку TFC (который в json'ах снаружи — snake_case).
		//   FoodDefinition(Ingredient ingredient, FoodData food, boolean edible)
		//   FoodData(int hunger, float water, float saturation, int intoxication,
		//            float[] nutrients, float decayModifier)
		// Поэтому: данные еды ВЛОЖЕНЫ в `food`, имена camelCase, витамины — массив из 5
		// чисел в порядке Nutrient.VALUES: [grain, fruit, vegetables, protein, dairy].
		// Плоская форма ({ingredient, hunger, decay_modifier, vegetables}) МОЛЧА давала
		// FoodData со всеми нулями — проверено на сервере (см. HANDOFF).
		let nutrients = [0, 0, 0, 0, 0];
		let data = { hunger: 0, water: 0, saturation: 0, intoxication: 0, nutrients: nutrients, decayModifier: 0 };

		if (foodItem.mealType) {
			// [PORT-CHECK] в TFC 4.x у food-данных нет поля type ('dynamic'/'dynamic_bowl') —
			// динамические блюда описываются как обычная еда (ср. firmalife filled_pie: hunger 4, decay 4.5)
			data.hunger = 4;
			data.decayModifier = 4.5;
		} else {
			// Hunger defaults to 4 if not specified, but if its 0 it wont set any value.
			if (foodItem.nutrition.hunger !== 0 && !foodItem.inedible) {
				data.hunger = (foodItem.nutrition.hunger !== undefined && foodItem.nutrition.hunger !== null) ? foodItem.nutrition.hunger : 4;
			}
			if (foodItem.nutrition.saturation) data.saturation = foodItem.nutrition.saturation;
			if (foodItem.nutrition.water) data.water = foodItem.nutrition.water;
			// Decay defaults to 0 (non-perishable).
			data.decayModifier = foodItem.nutrition.decay || 0;

			NUTRIENTS.forEach((nutrient, i) => {
				if (foodItem.nutrition[nutrient]) {
					nutrients[i] = foodItem.nutrition[nutrient];
				}
			});
		}

		// edible:false — как у TFC для egg/pumpkin: гниёт, но не съедобно (наш флаг inedible).
		event.food({ ingredient: foodItem.id, food: data, edible: !foodItem.inedible }, name);
	});

	// Ice shavings
	// [PORT-Ф2] food.cooling(0.1) — кастомный нутриент TFG, опущен
	event.food({ ingredient: 'firmalife:ice_shavings', food: { water: 5, decayModifier: 0 } }, 'firmalife/ice_shavings');

	// [PORT-Ф10] Cave Pumpkin (betterend:cave_pumpkin) — марсианский контент, предмет не зарегистрирован

	// Ice Soup
	event.food({ ingredient: 'tfg:food/ice_soup', food: { hunger: 1, water: 20, decayModifier: 0 } }, 'tfg/ice_soup');

	// Honeyed Apple
	event.food({ ingredient: 'create:honeyed_apple', food: { hunger: 4, decayModifier: 0.8, water: 5, saturation: 1, nutrients: [0, 2, 0, 0, 0] } }, 'create/honeyed_apple');

	// Food Items registered in core.
	// Lavacado
	if (global.TFG_itemExists('tfg:food/lavacado')) {
		event.food({ ingredient: 'tfg:food/lavacado', food: { hunger: 4, decayModifier: 2, saturation: 1, nutrients: [0, 0, 1.5, 0, 0] } }, 'tfg/lavacado');
	}

	// Magmango
	if (global.TFG_itemExists('tfg:food/magmango')) {
		event.food({ ingredient: 'tfg:food/magmango', food: { hunger: 4, decayModifier: 2.25, water: 15, saturation: 1, nutrients: [0, 1.5, 0, 0, 0] } }, 'tfg/magmango');
	}

	// Fly Agaric
	// [PORT-Ф2] nauseating(2.0) — кастомный нутриент TFG, опущен
	if (global.TFG_itemExists('tfg:food/fly_agaric')) {
		event.food({ ingredient: 'tfg:food/fly_agaric', food: { hunger: 4, decayModifier: 2.1, water: 2, nutrients: [0, 0, 1, 0, 0] } }, 'tfg/fly_agaric');
	}

	// Eggs
	// [PORT] wan_ancient_beasts и species отсутствуют на 1.21 — весь блок яиц вырезан
	// (charger/crusher/.../walker_egg, species:birt_egg и т.д., species:cracked_wraptor_egg)

	// Biochem Items
	if (global.TFG_itemExists('tfg:progenitor_cells')) {
		event.food({ ingredient: 'tfg:progenitor_cells', food: { decayModifier: 1 }, edible: false }, 'tfg/progenitor_cells');
	}
	if (global.TFG_itemExists('tfg:rough_endoplasmic_reticula')) {
		event.food({ ingredient: 'tfg:rough_endoplasmic_reticula', food: { decayModifier: 0.5 }, edible: false }, 'tfg/rough_endoplasmic_reticula');
	}
	if (global.TFG_itemExists('tfg:smooth_endoplasmic_reticula')) {
		event.food({ ingredient: 'tfg:smooth_endoplasmic_reticula', food: { decayModifier: 0.5 }, edible: false }, 'tfg/smooth_endoplasmic_reticula');
	}

	//#endregion
	//#region Drinkables
	// [PORT-FIX 2026-07-16] ingredient у drinkable — СТРОКА (FluidIngredient), не {fluid:...}:
	// объект KubeJS парсит как текст -> 'Failed to read FluidIngredient' -> падает ВЕСЬ
	// TFCEvents.data (терялось всё после этой строки). Раньше не всплывало: guard
	// TFG_fluidExists был сломан и до этих вызовов дело не доходило.

	// Proto Growth Medium
	if (global.TFG_fluidExists('tfg:proto_growth_medium')) {
		event.drinkable({
			ingredient: 'tfg:proto_growth_medium',
			food: { water: 10, nutrients: [0, 0, 0, 1, 5] },
			effects: [{ type: 'minecraft:absorption', amplifier: 2, chance: 0.25, duration: 1200 }]
		}, 'tfg/proto_growth_medium');
	}

	// Muddy Water
	// [PORT-Ф2] parasites/nauseating — кастомные нутриенты TFG, опущены
	if (global.TFG_fluidExists('tfg:muddy_water')) {
		event.drinkable({
			ingredient: 'tfg:muddy_water',
			food: { water: 10 },
			effects: [{ type: 'tfc:thirst', chance: 1, duration: 20 * 10 }]
		}, 'tfg/muddy_water');
	}

	// Semiheavy Ammoniacal Water
	if (global.TFG_fluidExists('tfg:semiheavy_ammoniacal_water')) {
		event.drinkable({
			ingredient: 'tfg:semiheavy_ammoniacal_water',
			food: { water: 10 },
			effects: [{ type: 'minecraft:nausea', chance: 0.5, duration: 200 }]
		}, 'tfg/semiheavy_ammoniacal_water');
	}

	// Rich Stock
	if (global.TFG_fluidExists('tfg:rich_stock')) {
		event.drinkable({
			ingredient: 'tfg:rich_stock',
			food: { water: 4, nutrients: [0, 0, 0.25, 0.25, 0] },
			effects: [{ type: 'tfc:thirst', chance: 0.2, duration: 20 * 5 }]
		}, 'tfg/rich_stock');
	}

	// Light Stock
	if (global.TFG_fluidExists('tfg:light_stock')) {
		event.drinkable({
			ingredient: 'tfg:light_stock',
			food: { water: 4, nutrients: [0, 0, 0.25, 0.25, 0] },
			effects: [{ type: 'tfc:thirst', chance: 0.2, duration: 20 * 5 }]
		}, 'tfg/light_stock');
	}

	// Brown Gravy
	if (global.TFG_fluidExists('tfg:brown_gravy')) {
		event.drinkable({
			ingredient: 'tfg:brown_gravy',
			food: { water: 2, nutrients: [0.25, 0, 0.5, 0.5, 0] },
			effects: [{ type: 'tfc:thirst', chance: 0.3, duration: 20 * 5 }]
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
