// priority: 0
"use strict";

// [PORT] был registerTFCDataForTFCBetterBF(event), вызывался из main_server_script.js — теперь регистрируем событие напрямую
TFCEvents.data(event => {
	console.info('[Gregnautics] progress: tfg_port tfcbetterbf data start')

	event.heat({ ingredient: 'tfcbetterbf:insulation', heat_capacity: 8.571 }) // [PORT-FIX] itemHeat -> heat codec form (null temps omitted)
})
