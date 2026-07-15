"use strict";

// [PORT] из tacz/tags.js (TFG 1.20.1); функции registerTACZItemTags / registerTACZBlockTags заменены на прямую регистрацию событий

ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port tacz item tags start')

	event.add('tfc:usable_on_tool_rack', 'tacz:ammo_box')
	event.add('tfc:usable_on_tool_rack', 'tacz:modern_kinetic_gun')
	// [PORT] applied_ammo_box отсутствует в сборке 1.21.1
	//event.add('tfc:usable_on_tool_rack', 'applied_ammo_box:ammo_box')

})

ServerEvents.tags('block', event => {
	console.info('[Gregnautics] progress: tfg_port tacz block tags start')

	event.add('tacz:interact_key/whitelist', '#tfc:tool_racks')
})
