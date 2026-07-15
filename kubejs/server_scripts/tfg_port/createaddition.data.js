// priority: 0
"use strict";

// [PORT] Портировано из create_additions/data.js (TerraFirmaGreg-Modern 1.20.1 -> 1.21.1)
// [PORT] registerTFCDataForCreateAddition -> прямой обработчик TFCEvents.data (KubeJS 7: изолированные скоупы)

TFCEvents.data(event => {
	console.info('[Gregnautics] progress: tfg_port createaddition data start')

	// [PORT-FIX] kubejs_tfc 2.0: itemHeat(id, cap) -> event.heat({codec-объект}) (HeatDefinition)
	event.heat({ ingredient: 'createaddition:cake_base', heat_capacity: 1.0 })
	event.heat({ ingredient: 'createaddition:cake_base_baked', heat_capacity: 1.0 })

	// [PORT-FIX] kubejs_tfc 2.0: foodItem(id, builder) -> event.food({codec-объект}) (FoodDefinition, поля FoodData плоские)
	event.food({
		ingredient: 'createaddition:cake_base',
		hunger: 1,
		saturation: 0.0,
		decay_modifier: 3.0
	})

	event.food({
		ingredient: 'createaddition:cake_base_baked',
		hunger: 4,
		saturation: 1.0,
		decay_modifier: 2.0,
		dairy: 0.4,
		grain: 0.4
	})

	event.food({
		ingredient: 'tfc:cake',
		hunger: 2,
		saturation: 2.0,
		decay_modifier: 2.0,
		dairy: 0.8,
		grain: 0.8
	})

	event.food({
		ingredient: 'createaddition:chocolate_cake',
		hunger: 2,
		saturation: 2.0,
		decay_modifier: 2.0,
		dairy: 0.8,
		grain: 0.8
	})

	event.food({
		ingredient: 'createaddition:honey_cake',
		hunger: 2,
		saturation: 2.0,
		decay_modifier: 2.0,
		dairy: 0.8,
		grain: 0.8
	})

	// [PORT] species отсутствует в сборке 1.21.1
	// event.foodItem('species:birtday_cake', ...)
	// event.foodItem('species:birtday_cake_slice', ...)
})
