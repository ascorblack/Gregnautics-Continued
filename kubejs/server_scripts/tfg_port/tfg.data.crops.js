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
			minHydration: crop.minHydration,
			maxHydration: crop.maxHydration,
			// [PORT] в TFC 1.21 hydration_wiggle_range — целое (в данных TFG бывает 7.5)
			hydrationWiggleRange: Math.round(crop.hydrationWiggle),
			minTemperature: crop.minTemp,
			maxTemperature: crop.maxTemp,
			temperatureWiggleRange: crop.tempWiggle
		}, crop.id);
	});
});
