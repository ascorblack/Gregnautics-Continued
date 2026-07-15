// priority: 0
"use strict";

// [PORT] Из TFG startup_scripts/tfg/primitive/blocks.supports.js (Ф4).
// Диспетчер Ф2 отключён — регистрация напрямую через StartupEvents.registry.
// Изменения 1.20→1.21:
//  - .textureAll(x) → .texture(x) (KubeJS 7: textureAll удалён, texture(String) ставит все ключи)
//  - Опоры aeronos/strophar/glacian (ad_astra) — мод отсутствует, космоконтент → [PORT-Ф10]
//  - global.BIG_ROCK_TABLE (stone_types) ещё не портирован — значения
//    light_concrete/dark_concrete (sound: 'stone', mapColor: 'color_light_gray'/'color_gray')
//    захардкожены из оригинального constants.rocks.js

function registerTFGSupportBlocks(event) {
	// Wood
	// [PORT-Ф10] ad_astra отсутствует — грибные/глейшановые опоры (aeronos, strophar, glacian)
	// вернутся с космоконтентом Фазы 10.
	// event.create(`tfg:aeronos_support`, 'tfc:support') ...
	// event.create(`tfg:strophar_support`, 'tfc:support') ...
	// event.create(`tfg:glacian_support`, 'tfc:support') ...

	// Reinforced Concrete
	// [PORT-FIX] tfc:support-модели ссылаются на ключ "#texture". KubeJS .texture(String)
	// ставит только baseTexture (карта textures пустая) -> #texture не резолвится -> magenta.
	// Ставим ключ 'texture' явно через .texture(['texture'], ...). gtceu:block/stones/* —
	// динамические текстуры GTCEU, существуют в рантайме.
	event.create('tfg:reinforced_light_concrete_support', 'tfc:support')
		.texture(['texture'], 'gtceu:block/stones/light_concrete/stone') // [PORT-FIX]
		.horizontal(horizontal => {
			horizontal.texture(['texture'], 'gtceu:block/stones/light_concrete/stone') // [PORT-FIX]
			horizontal.soundType('stone') // [PORT] BIG_ROCK_TABLE.light_concrete.sound
			horizontal.hardness(5)
			horizontal.resistance(64)
			horizontal.mapColor('color_light_gray') // [PORT] BIG_ROCK_TABLE.light_concrete.mapColor
			horizontal.tagBlock('minecraft:mineable/pickaxe')
			horizontal.requiresTool(true)
		})
		.soundType('stone') // [PORT] BIG_ROCK_TABLE.light_concrete.sound
		.hardness(5)
		.resistance(64)
		.mapColor('color_light_gray') // [PORT] BIG_ROCK_TABLE.light_concrete.mapColor
		.tagBlock('minecraft:mineable/pickaxe')
		.requiresTool(true)

	event.create('tfg:reinforced_dark_concrete_support', 'tfc:support')
		.texture(['texture'], 'gtceu:block/stones/dark_concrete/stone') // [PORT-FIX] ключ 'texture'
		.horizontal(horizontal => {
			horizontal.texture(['texture'], 'gtceu:block/stones/dark_concrete/stone') // [PORT-FIX] ключ 'texture'
			horizontal.soundType('stone') // [PORT] BIG_ROCK_TABLE.dark_concrete.sound
			horizontal.hardness(5)
			horizontal.resistance(64)
			horizontal.mapColor('color_gray') // [PORT] BIG_ROCK_TABLE.dark_concrete.mapColor
			horizontal.tagBlock('minecraft:mineable/pickaxe')
			horizontal.requiresTool(true)
		})
		.soundType('stone') // [PORT]
		.hardness(5)
		.resistance(64)
		.mapColor('color_gray') // [PORT]
		.tagBlock('minecraft:mineable/pickaxe')
		.requiresTool(true)

	// Metal
	event.create('tfg:rebar_support', 'tfc:support')
		.texture(['texture'], 'tfg:block/support/rebar_support') // [PORT-FIX] ключ 'texture'
		.horizontal(horizontal => {
			horizontal.texture(['texture'], 'tfg:block/support/rebar_support') // [PORT-FIX] ключ 'texture'
			horizontal.soundType('chain')
			horizontal.hardness(3)
			horizontal.resistance(16)
			horizontal.mapColor('color_orange')
			horizontal.tagBlock('minecraft:mineable/pickaxe')
			horizontal.tagBlock('minecraft:climbable')
			horizontal.requiresTool(true)
			horizontal.renderType('cutout')
			horizontal.opaque(false)
		})
		.soundType('chain')
		.hardness(3)
		.resistance(16)
		.mapColor('color_orange')
		.tagBlock('minecraft:mineable/pickaxe')
		.tagBlock('minecraft:climbable')
		.requiresTool(true)
		.renderType('cutout')
		.opaque(false)

	event.create('tfg:steel_support', 'tfc:support')
		.texture(['texture'], 'tfg:block/support/steel_support') // [PORT-FIX] ключ 'texture'
		.horizontal(horizontal => {
			horizontal.texture(['texture'], 'tfg:block/support/steel_support') // [PORT-FIX] ключ 'texture'
			horizontal.soundType('metal')
			horizontal.hardness(5)
			horizontal.resistance(64)
			horizontal.mapColor('color_gray')
			horizontal.tagBlock('minecraft:mineable/pickaxe')
			horizontal.requiresTool(true)
		})
		.soundType('metal')
		.hardness(5)
		.resistance(64)
		.mapColor('color_gray')
		.tagBlock('minecraft:mineable/pickaxe')
		.requiresTool(true)
}

// [PORT] Прямая регистрация вместо диспетчера Ф2
StartupEvents.registry('block', event => {
	console.info('[Gregnautics] progress: tfg_port primitive registry start')
	registerTFGSupportBlocks(event)
})
