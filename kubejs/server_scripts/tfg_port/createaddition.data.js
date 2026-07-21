// priority: 0
"use strict";

// [PORT] Портировано из create_additions/data.js (TerraFirmaGreg-Modern 1.20.1 -> 1.21.1)
// [PORT] registerTFCDataForCreateAddition -> прямой обработчик TFCEvents.data (KubeJS 7: изолированные скоупы)

TFCEvents.data(event => {
	console.info('[Gregnautics] progress: tfg_port createaddition data start')

	// [PORT-FIX] kubejs_tfc 2.0: itemHeat(id, cap) -> event.heat({codec-объект}) (HeatDefinition)
	event.heat({ ingredient: 'createaddition:cake_base', heatCapacity: 1.0 })
	event.heat({ ingredient: 'createaddition:cake_base_baked', heatCapacity: 1.0 })

	// [PORT-FIX] kubejs_tfc 2.0: foodItem(id, builder) -> event.food({codec-объект}) (FoodDefinition, поля FoodData плоские)
	event.food({
		ingredient: 'createaddition:cake_base',
		food: { hunger: 1, water: 0, saturation: 0.0, intoxication: 0, nutrients: [0, 0, 0, 0, 0], decayModifier: 3.0 },
		edible: true
	}, 'gregnautics/cake_base')

	event.food({
		ingredient: 'createaddition:cake_base_baked',
		food: { hunger: 4, water: 0, saturation: 1.0, intoxication: 0, nutrients: [0.4, 0, 0, 0, 0.4], decayModifier: 2.0 },
		edible: true
	}, 'gregnautics/cake_base_baked')

	event.food({
		ingredient: 'tfc:cake',
		food: { hunger: 2, water: 0, saturation: 2.0, intoxication: 0, nutrients: [0.8, 0, 0, 0, 0.8], decayModifier: 2.0 },
		edible: true
	}, 'gregnautics/cake')

	event.food({
		ingredient: 'createaddition:chocolate_cake',
		food: { hunger: 2, water: 0, saturation: 2.0, intoxication: 0, nutrients: [0.8, 0, 0, 0, 0.8], decayModifier: 2.0 },
		edible: true
	}, 'gregnautics/chocolate_cake')

	event.food({
		ingredient: 'createaddition:honey_cake',
		food: { hunger: 2, water: 0, saturation: 2.0, intoxication: 0, nutrients: [0.8, 0, 0, 0, 0.8], decayModifier: 2.0 },
		edible: true
	}, 'gregnautics/honey_cake')

	// [PORT] species отсутствует в сборке 1.21.1
	// event.foodItem('species:birtday_cake', ...)
	// event.foodItem('species:birtday_cake_slice', ...)
})
