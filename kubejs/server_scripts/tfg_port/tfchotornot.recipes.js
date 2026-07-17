// priority: 0
"use strict";

// [PORT] KubeJS 7: диспетчер main_server_script.js заменён на прямую регистрацию событий в файле

ServerEvents.recipes((event) => {
	console.info('[Gregnautics] progress: tfg_port tfchotornot recipes start')

	// [PORT-FIX 2026-07-17] Оверрайд tongs/wood УБРАН ЦЕЛИКОМ: он существовал ради
	// замены forge:-тегов из 1.20, но родной рецепт мода в 1.21 уже на c:-тегах И
	// с типом advanced_damage_inputs_shaped_crafting (нож дамажится + переносится
	// forging bonus). Наш перезаписывавший его plain shaped СЪЕДАЛ нож.

	event.remove({ id: 'tfchotornot:anvil/tong_part/cast_iron' })
	event.remove({ id: 'tfchotornot:crafting/tongs/cast_iron' })
	event.remove({ id: 'tfchotornot:heating/tongs/cast_iron' })
})
