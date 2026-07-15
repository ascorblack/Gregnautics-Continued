// priority: 0
"use strict";

// [PORT] KubeJS 7: диспетчер main_server_script.js заменён на прямую регистрацию событий в файле

ServerEvents.recipes((event) => {
	console.info('[Gregnautics] progress: tfg_port tfchotornot recipes start')

	event.shaped('tfchotornot:tongs/wood', [
		'AB ',
		'B  ',
		'   '
	], {
		A: '#c:tools/knife', // [PORT] forge:tools/knives -> c:tools/knife
		B: '#c:rods/wooden' // [PORT] forge: -> c:
	}).id('tfchotornot:crafting/tongs/wood')

	event.remove({ id: 'tfchotornot:anvil/tong_part/cast_iron' })
	event.remove({ id: 'tfchotornot:crafting/tongs/cast_iron' })
	event.remove({ id: 'tfchotornot:heating/tongs/cast_iron' })
})
