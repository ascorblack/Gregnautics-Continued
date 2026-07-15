// priority: 0
"use strict";

// [PORT] Из TFG startup_scripts/tfg/items.asphalt_road.js (registerTFGAsphaltRoadItems).
// Диспетчер Ф2 отключён — регистрация напрямую через StartupEvents.registry.

StartupEvents.registry('item', event => {
	console.info('[Gregnautics] progress: tfg_port misc registry start')

	event.create('tfg:tar_chunk')
	event.create('tfg:asphalt_binder')
	event.create('tfg:asphalt_rubble')
})
