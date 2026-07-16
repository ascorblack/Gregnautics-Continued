// priority: 0
"use strict";

// [PORT] KubeJS 7: изолированные скоупы, регистрируем событие напрямую вместо registerTFCDataForWaterFlasks(event)

/**
 * [PORT-FIX] kubejs_tfc 2.0.1: itemHeat(ingredient, capacity, forgeT, weldT) заменён на
 * event.heat({ingredient, heat_capacity, forging_temperature?, welding_temperature?}, id?)
 * (codec-объект TFC HeatDefinition; null-температуры просто опускаются)
 */
TFCEvents.data(event => {
	console.info('[Gregnautics] progress: tfg_port waterflasks data start')

	event.heat({ ingredient: 'waterflasks:unfinished_iron_flask', heatCapacity: 0.2345 }, 'tfg:waterflasks/unfinished_iron_flask') // [PORT-FIX] itemHeat -> heat
	event.heat({ ingredient: 'waterflasks:broken_iron_flask', heatCapacity: 0.2345 }, 'tfg:waterflasks/broken_iron_flask') // [PORT-FIX] itemHeat -> heat
	event.heat({ ingredient: 'waterflasks:iron_flask', heatCapacity: 0.2345 }, 'tfg:waterflasks/iron_flask') // [PORT-FIX] itemHeat -> heat
})
