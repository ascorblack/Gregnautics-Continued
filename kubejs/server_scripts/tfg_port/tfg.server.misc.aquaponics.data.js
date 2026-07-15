"use strict";

// [PORT] Порт tfg/aquaponics/data.aquaponics.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT] registerTFGAquaponicsData -> прямой обработчик TFCEvents.data (KubeJS 7: изолированные скоупы).

TFCEvents.data(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.misc aquaponics data start')

	// [PORT-FIX] kubejs_tfc 2.0: fuel(ingredient, temp, duration, purity) -> event.fuel({codec-объект}) (как в tfc.data.js)
	// [PORT] tfg:flora_pellets зарегистрирован (startup_scripts/tfg_port/tfg.misc.aquaponics.js)
	event.fuel({ ingredient: 'tfg:flora_pellets', temperature: 1415, duration: 1900, purity: 0.95 })

	// [PORT-Ф4-TODO] tfg:fish_roe не зарегистрирован (аквапоника-предметы TFG-Core, Ф4) — еда отключена.
	// [PORT-FIX] kubejs_tfc 2.0: foodItem(id, builder) -> event.food({codec-объект}), поля FoodData плоские.
	// event.food({
	// 	ingredient: 'tfg:fish_roe',
	// 	hunger: 4,
	// 	decay_modifier: 2,
	// 	protein: 2.5,
	// 	saturation: 2
	// })
})
