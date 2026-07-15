// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/railways/data.js (1.20.1 -> 1.21.1).
// registerTFCDataForRailways -> прямой обработчик TFCEvents.data (KubeJS 7: изолированные скоупы, диспетчер не используется).

TFCEvents.data(event => {
	console.info('[Gregnautics] progress: tfg_port railways data start')

	event.itemSize({ ingredient: 'railways:track_monorail', size: 'small', weight: 'very_light' }) // [PORT-FIX] kubejs_tfc 2.0: itemSize принимает объект-рекорд, а не позиционные аргументы
})
