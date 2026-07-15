// priority: 0
"use strict";

// [PORT] Из TFG startup_scripts/tfg/sounds.js (registerTFGSounds).
// Диспетчер Ф2 отключён — регистрация напрямую через StartupEvents.registry('sound_event').
// KubeJS 7: SoundEventBuilder генерирует запись в sounds.json (звук по id + сабтайтл).
// [PORT-CHECK] Оригинальный ресурспак assets/tfg содержит свой sounds.json с реальными
// путями ogg — проверить после установки ассетов, что сгенерированные KubeJS записи
// не перекрывают оригинальные определения (sounds.json мержится между паками по ключам).

StartupEvents.registry('sound_event', event => {
	console.info('[Gregnautics] progress: tfg_port core registry start')

	event.create('tfg:ambient.upper_nether_lush.loop')
	event.create('tfg:ambient.upper_nether_cave.loop')
	event.create('tfg:ambient.upper_nether.additions')
	event.create('tfg:ambient.upper_nether.mood')
	event.create('tfg:ambient.lower_nether.loop')
	event.create('tfg:ambient.lower_nether.additions')
	event.create('tfg:ambient.lower_nether.mood')
	event.create('tfg:music.nether')

	event.create('tfg:music.orbit')

	event.create('tfg:ambient.moon.additions')
	event.create('tfg:ambient.moon.mood')
	event.create('tfg:music.moon')

	event.create('tfg:ambient.mars_desert.loop')
	event.create('tfg:ambient.mars_desert.additions')
	event.create('tfg:ambient.mars_desert.mood')
	event.create('tfg:ambient.mars_land.loop')
	event.create('tfg:ambient.mars_land.additions')
	event.create('tfg:ambient.mars_land.mood')
	event.create('tfg:music.mars')

	event.create('tfg:ambient.venus_surface.loop')
	event.create('tfg:ambient.venus_surface.additions')
	event.create('tfg:ambient.venus_surface.mood')
	event.create('tfg:music.venus')

	event.create('tfg:music.mercury')

	event.create('tfg:music.europa')
})
