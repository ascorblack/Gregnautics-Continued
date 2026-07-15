// priority: 0
"use strict";

// [PORT] Оригинал: create_picky_wheels/tags.js — функция registerCreatePickyWheelsBiomeTags(event),
// вызывалась из main_server_script.js. В KubeJS 7 регистрируем событие напрямую (изолированный scope файла).
ServerEvents.tags('worldgen/biome', event => {
	console.info('[Gregnautics] progress: tfg_port createpickywheels biome tags start')

	event.add('createpickywheels:waterwheels_boosted', 'tfc:river')
	// [PORT-Ф4] event.add('createpickywheels:waterwheels_boosted', 'tfg:earth/river') // биом tfg: ещё не существует (фаза 4)

	// [PORT-Ф4] биом-теги tfg: (overworld/nether/mars/venus) ещё не существуют (фаза 4)
	// event.add('createpickywheels:waterwheels_whitelist', '#tfg:overworld_biomes')
	// event.add('createpickywheels:waterwheels_whitelist', '#tfg:nether_biomes')
	// event.add('createpickywheels:waterwheels_whitelist', '#tfg:mars_biomes')
	// event.add('createpickywheels:waterwheels_whitelist', '#tfg:venus_biomes')

	// [PORT-Ф4] event.add('createpickywheels:windmills_whitelist', '#tfg:overworld_biomes')
	// [PORT-Ф4] event.add('createpickywheels:windmills_whitelist', '#tfg:nether_biomes')
	// [PORT-Ф4] event.add('createpickywheels:windmills_whitelist', '#tfg:mars_biomes')
	// [PORT-Ф4] event.add('createpickywheels:windmills_whitelist', '#tfg:venus_biomes')
})
