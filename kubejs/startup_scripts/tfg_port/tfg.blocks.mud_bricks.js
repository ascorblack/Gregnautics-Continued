// priority: 0
"use strict";

// [PORT] Из TFG startup_scripts/tfg/primitive/blocks.mud_bricks.js (Ф4).
// Диспетчер Ф2 отключён — регистрация напрямую через StartupEvents.registry.
// Изменения 1.20→1.21: .textureAll(x) → .texture(x)

function registerTFGMudBrickBlocks(event) {

	global.TFG_MUD_TYPES.forEach(dirt => {
		event.create(`tfg:mud_bricks/${dirt}`)
			.soundType('mud_bricks')
			.mapColor('dirt')
			.requiresTool(true)
			.hardness(2.6)
			.tagBlock('minecraft:mineable/shovel')
			.texture(`tfg:block/mud_bricks/${dirt}`) // [PORT] textureAll → texture

		event.create(`tfg:mud_bricks/${dirt}_stairs`, 'stairs')
			.soundType('mud_bricks')
			.mapColor('dirt')
			.requiresTool(true)
			.hardness(2.6)
			.tagBlock('minecraft:mineable/shovel')
			.texture(`tfg:block/mud_bricks/${dirt}`) // [PORT]

		event.create(`tfg:mud_bricks/${dirt}_slab`, 'slab')
			.soundType('mud_bricks')
			.mapColor('dirt')
			.requiresTool(true)
			.hardness(2.6)
			.tagBlock('minecraft:mineable/shovel')
			.texture(`tfg:block/mud_bricks/${dirt}`) // [PORT]

		event.create(`tfg:mud_bricks/${dirt}_wall`, 'wall')
			.soundType('mud_bricks')
			.mapColor('dirt')
			.requiresTool(true)
			.hardness(2.6)
			.tagBlock('minecraft:mineable/shovel')
			.texture(`tfg:block/mud_bricks/${dirt}`) // [PORT]
	})
}

// [PORT] Прямая регистрация вместо диспетчера Ф2
StartupEvents.registry('block', event => {
	console.info('[Gregnautics] progress: tfg_port primitive registry start')
	registerTFGMudBrickBlocks(event)
})
