"use strict";

// [PORT] KubeJS 7: регистрация напрямую через ServerEvents.tags вместо диспетчера registerCopycatsItemTags
ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port copycats tags start')

	event.add('minecraft:fences', 'copycats:copycat_fence')
	event.add('minecraft:fence_gates', 'copycats:copycat_fence_gate')
})
