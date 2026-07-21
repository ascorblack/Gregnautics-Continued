// priority: 0
"use strict";

// [PORT] Порт minecraft/data.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT] registerTFCDataForMinecraft -> прямой обработчик TFCEvents.data (KubeJS 7: изолированные скоупы, диспетчер не используется).

TFCEvents.data(event => {
	console.info('[Gregnautics] progress: tfg_port minecraft data start')

	// [PORT-FIX] kubejs_tfc 2.0.1: foodItem(builder) не существует, используется event.food(FoodDefinition-объект);
	// [FIX 2026-07-21, аудит P1] Плоская форма ({ingredient, hunger, fruit, decay_modifier})
	// МОЛЧА давала нулевую FoodData: KubeJS собирает record FoodDefinition по ИМЕНАМ ПОЛЕЙ,
	// незнакомые верхнеуровневые ключи игнорируются. Правильная форма — вложенный
	// food:{...camelCase, nutrients:[grain,fruit,vegetables,protein,dairy]} + edible
	// (эталон: tfg.server.food.data.food.js). Проверено зондом: golden_apple был hunger=0/decay=0.

	event.food({
		ingredient: 'minecraft:golden_apple',
		food: { hunger: 2, water: 0, saturation: 0, intoxication: 0, nutrients: [0, 2, 0, 0, 0], decayModifier: 0.6 },
		edible: true
	}, 'gregnautics/golden_apple')

	// treasure

	event.food({
		ingredient: 'minecraft:enchanted_golden_apple',
		food: { hunger: 10, water: 20, saturation: 10, intoxication: 0, nutrients: [0, 5, 0, 0, 0], decayModifier: 0 },
		edible: true
	}, 'gregnautics/enchanted_golden_apple')

	event.food({
		ingredient: 'minecraft:golden_carrot',
		food: { hunger: 5, water: 20, saturation: 5, intoxication: 0, nutrients: [0, 0, 3, 0, 0], decayModifier: 0 },
		edible: true
	}, 'gregnautics/golden_carrot')

	event.food({
		ingredient: 'minecraft:glow_berries',
		food: { hunger: 1, water: 5, saturation: 0, intoxication: 0, nutrients: [0, 0.5, 0, 0, 0], decayModifier: 2 },
		edible: true
	}, 'gregnautics/glow_berries')

	event.food({
		ingredient: 'minecraft:chorus_fruit',
		food: { hunger: 2, water: 5, saturation: 0, intoxication: 0, nutrients: [0, 2, 0, 0, 0], decayModifier: 2 },
		edible: true
	}, 'gregnautics/chorus_fruit')

	event.food({
		ingredient: 'minecraft:popped_chorus_fruit',
		food: { hunger: 2, water: 0, saturation: 1, intoxication: 0, nutrients: [0, 3, 0, 0, 0], decayModifier: 0.5 },
		edible: true
	}, 'gregnautics/popped_chorus_fruit')
})
