// priority: 0
"use strict";

// [PORT] Из TFG startup_scripts/tfg/primitive/blocks.glass.js (Ф4).
// Диспетчер Ф2 отключён — регистрация напрямую через StartupEvents.registry.
// Изменения 1.20→1.21:
//  - .textureAll(x) → .texture(x)
//  - forge:glass → c:glass

function registerTFGGlassBlocks(event) {
	createGlassBlock(event, 'glass', false)
	createGlassBlock(event, 'tinted_glass', true)

	global.MINECRAFT_DYE_NAMES.forEach(color => {
		createGlassBlock(event, `${color}_stained_glass`, false)
	})
}

function createGlassBlock(event, name, opaque) {
	event.create(`tfg:glass/smooth_${name}`)
		.texture(`tfg:block/glass/smooth_${name}`) // [PORT] textureAll → texture
		.hardness(0.3)
		.glassSoundType()
		.transparent(true)
		.opaque(opaque)
		.defaultTranslucent()
		.noValidSpawns(true)
		.redstoneConductor(false)
		.suffocating(false)
		.viewBlocking(false)
		.requiresTool(true)
		.tagBoth('c:glass') // [PORT] forge:glass → c:glass
		.tagBlock('tfc:mineable_with_glass_saw')
		.tagBlock('minecraft:impermeable')
		.tagItem('tfg:whitelisted/facades')
}

// [PORT] Прямая регистрация вместо диспетчера Ф2
StartupEvents.registry('block', event => {
	console.info('[Gregnautics] progress: tfg_port primitive registry start')
	registerTFGGlassBlocks(event)
})
