// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/create_connected/tags.js (Фаза 3).
// KubeJS 7: файл регистрирует событие сам (диспетчер main_server_script.js не используется).
// forge:hidden_from_recipe_viewers -> c:hidden_from_recipe_viewers (уже было c: в оригинале).

ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port create_connected item tags start')

	global.CREATE_CONNECTED_HIDDEN_ITEMS.forEach(item => {
		event.removeAllTagsFrom(item)
		event.add('c:hidden_from_recipe_viewers', item)
	})

	event.remove('minecraft:creeper_drop_music_discs', ['create_connected:music_disc_elevator', 'create_connected:music_disc_interlude'])
})
