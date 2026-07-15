// priority: 0
"use strict";

// [PORT] Из TFG startup_scripts/tfg/aquaponics/items.aquaponics.js (registerTFGAquaponicsItems).
// Диспетчер Ф2 отключён — регистрация напрямую через StartupEvents.registry.

StartupEvents.registry('item', event => {
	console.info('[Gregnautics] progress: tfg_port misc registry start')

	event.create('tfg:flora_pellets')
		.tag('tfc:compost_greens/low') // [PORT] TFC 4.x переименовал тег tfc:compost_greens_low -> tfc:compost_greens/low (проверено по data/tfc/tags/item/compost_greens/low.json в TFC 4.2.5)
})
