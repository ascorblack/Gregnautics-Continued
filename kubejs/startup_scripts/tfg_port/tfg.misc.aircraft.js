// priority: 0
"use strict";

// [PORT] Из TFG startup_scripts/tfg/items.aircraft.js (registerTFGAircraftItems).
// Диспетчер Ф2 отключён — регистрация напрямую через StartupEvents.registry.
// scaffolding_frame используется вне immersive_aircraft (рецепты minecraft:scaffolding
// и create:white_table_cloth) — оставлен. Остальные предметы в оригинале нужны только
// для рецептов immersive_aircraft — закомментированы; ниша самолётов у Create Aeronautics.

StartupEvents.registry('item', event => {
	console.info('[Gregnautics] progress: tfg_port misc registry start')

	event.create('tfg:scaffolding_frame')

	// [PORT] immersive_aircraft отсутствует — предметы ниже использовались только в его рецептах
	// event.create('tfg:airship_hull')
	// event.create('tfg:airship_balloon')
	// event.create('tfg:lv_aircraft_engine')
	// event.create('tfg:hv_aircraft_engine')
	// event.create('tfg:ev_aircraft_engine')
	// event.create('tfg:black_steel_plated_airplane_propeller')
	// event.create('tfg:redblu_steel_plated_airplane_propeller')
	// event.create('tfg:stainless_steel_plated_airplane_propeller')
	// event.create('tfg:titanium_plated_airplane_propeller')
	// event.create('tfg:redblu_steel_landing_gear')
	// event.create('tfg:aluminium_landing_gear')
	// event.create('tfg:stainless_steel_landing_gear')
	// event.create('tfg:titanium_landing_gear')
	// event.create('tfg:redblu_steel_hull_reinforcement')
	// event.create('tfg:aluminium_hull_reinforcement')
	// event.create('tfg:stainless_steel_hull_reinforcement')
	// event.create('tfg:titanium_hull_reinforcement')

})
