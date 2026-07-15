// priority: 0
"use strict";

// [PORT] Из TFG startup_scripts/tfg/equipment/items.weapons.js (registerTFGWeaponItems).
// Диспетчер Ф2 отключён — регистрация напрямую через StartupEvents.registry.
// TACZ и AE2 присутствуют в сборке — все предметы портированы без изменений.
// Текстуры/модели — из оригинального assets/tfg (models/item/*.json → item/tacz_helpers/*).

StartupEvents.registry('item', event => {
	console.info('[Gregnautics] progress: tfg_port misc registry start')

	//Tacz Helper Region
	event.create('tfg:flintlock_mechanism')
	event.create('tfg:advanced_clockwork_mechanism')
	event.create('tfg:certus_mechanism')

	event.create('tfg:small_bullet_casing')
	event.create('tfg:shell_bullet_casing')
	event.create('tfg:large_bullet_casing')
	event.create('tfg:nitrocellulose')

})
