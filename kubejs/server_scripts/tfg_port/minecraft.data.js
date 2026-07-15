// priority: 0
"use strict";

// [PORT] Порт minecraft/data.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT] registerTFCDataForMinecraft -> прямой обработчик TFCEvents.data (KubeJS 7: изолированные скоупы, диспетчер не используется).

TFCEvents.data(event => {
	console.info('[Gregnautics] progress: tfg_port minecraft data start')

	// [PORT-FIX] kubejs_tfc 2.0.1: foodItem(builder) не существует, используется event.food(FoodDefinition-объект);
	// [PORT-FIX] поля FoodData (hunger, saturation, water, нутриенты, decay_modifier) кодируются инлайн рядом с ingredient.

	event.food({
		ingredient: 'minecraft:golden_apple',
		hunger: 2,
		fruit: 2,
		decay_modifier: 0.6
	})

	// treasure

	event.food({
		ingredient: 'minecraft:enchanted_golden_apple',
		hunger: 10,
		saturation: 10,
		fruit: 5,
		water: 20,
		decay_modifier: 0
	})

	event.food({
		ingredient: 'minecraft:golden_carrot',
		hunger: 5,
		saturation: 5,
		vegetables: 3,
		water: 20,
		decay_modifier: 0
	})

	event.food({
		ingredient: 'minecraft:glow_berries',
		hunger: 1,
		fruit: 0.5,
		water: 5,
		decay_modifier: 2
	})

	event.food({
		ingredient: 'minecraft:chorus_fruit',
		hunger: 2, // [PORT-FIX] было 1.5, поле hunger в TFC 1.21 — int
		fruit: 2,
		water: 5
	})

	event.food({
		ingredient: 'minecraft:popped_chorus_fruit',
		hunger: 2,
		saturation: 1,
		fruit: 3,
		decay_modifier: 0.5
	})
})
