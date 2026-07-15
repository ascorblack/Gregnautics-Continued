// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/food/data.crops.js (Ф4).
// kubejs_tfc 2.0: climateRange(объект-кодек, id) вместо builder-консюмера;
// поля — из TFC 1.21 ClimateRange.CODEC (min_hydration, ..., temperature_wiggle_range).
TFCEvents.data(event => {
	console.info('[Gregnautics] progress: tfg_port crop climate ranges start');

	global.CROP_CLIMATE_DATA.forEach((crop) => {
		if (crop.genData !== true) return;

		event.climateRange({
			min_hydration: crop.minHydration,
			max_hydration: crop.maxHydration,
			// [PORT] в TFC 1.21 hydration_wiggle_range — целое (в данных TFG бывает 7.5)
			hydration_wiggle_range: Math.round(crop.hydrationWiggle),
			min_temperature: crop.minTemp,
			max_temperature: crop.maxTemp,
			temperature_wiggle_range: crop.tempWiggle
		}, crop.id);
	});
});
