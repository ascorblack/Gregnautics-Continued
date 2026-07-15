// [PORT] portированный framed_blocks/tags.js (TFG 1.20.1 -> Gregnautics 1.21.1)
"use strict";

// [PORT] диспетчер main_server_script.js отсутствует — регистрируем событие напрямую
ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port framedblocks tags start')

	event.add('minecraft:fence_gates', 'framedblocks:framed_fence_gate')

})
