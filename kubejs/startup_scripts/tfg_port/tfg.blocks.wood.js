// priority: 0
"use strict";

// [PORT] Из TFG startup_scripts/tfg/primitive/blocks.wood.js (Ф4).
// Диспетчер Ф2 отключён — регистрация напрямую через StartupEvents.registry.
// Изменения 1.20→1.21 (kubejs_tfc 2.0.1):
//  - сапling: .features(x) → .tree(x)
//  - .textureAll(x) → .texture(x)
//  - fallenLeaves.models: у FallenLeavesModelType теперь layers 2..16 и parentModel
//    (вместо height); полный блок — 16 слоёв
//  - WAB_WOOD (wan_ancient_beasts) — мод отсутствует, цикл вырезан

function registerTFGNewWoodBlocks(event) {
	global.TFG_NEW_WOOD_TYPES.forEach(wood => {
		TFGWoodLeavesRegistry(event, wood)
		TFGWoodSaplingRegistry(event, wood)
		TFGWoodSupportRegistry(event, wood, `tfg:block/wood/stripped_log/${wood.name}`)
	})

	// [PORT] wan_ancient_beasts отсутствует — цикл WAB_WOOD вырезан
	// global.WAB_WOOD.forEach(wood => {
	// 	TFGWoodLeavesRegistry(event, wood)
	// 	TFGWoodSaplingRegistry(event, wood)
	// 	TFGWoodSupportRegistry(event, wood, `wan_ancient_beasts:block/stripped_${wood.name}_log`)
	// })

	function TFGWoodLeavesRegistry(event, wood) {
		// [PORT-FIX] листва включена обратно: стоит наш патченный kubejs_tfc
		// (PR https://github.com/Notenoughmail/KubeJS-TFC/pull/41, jar из patched_jars/)
		event.create(`tfg:wood/leaves/${wood.name}`, 'tfc:leaves')
			// [PORT-FIX] Родитель mc:block/leaves ссылается на ключ "#all"; без .texture()
			// карта textures пустая -> #all не резолвится -> magenta. TFCLeavesBlockBuilder
			// переопределяет .texture(String) и ставит ключи particle+all -> резолвится.
			.texture(`tfg:block/wood/leaves/${wood.name}`)
			.soundType(`${wood.leafSound}`)
			.tagBlock('minecraft:mineable/hoe')
			.tagBoth('minecraft:leaves')
			.defaultCutout()
			.noDynamicTinting()
			.twig(`tfg:wood/twig/${wood.name}`)
			.mapColor('plant')
			.fallenLeaves(leaves => {
				leaves.noCollision()
				leaves.notSolid()
				leaves.defaultCutout()
				leaves.soundType(`${wood.leafSound}`)
				leaves.tagBlock('minecraft:mineable/hoe')
				leaves.tagBlock('minecraft:replaceable')
				leaves.noDynamicTinting()
				leaves.models((modelType, generator) => {
					// [PORT-FIX] FallenLeavesModelType.layers = 1..8 (внутр. ordinal+1), НЕ высота.
					// Высота слоя = layers*2 -> "2".."16". Полный блок (высота 16) = куб листвы;
					// частичные -> tfc:block/groundcover/fallen_leaves_height{2..14}.
					// Раньше сравнивали `layers != 16` (никогда true), поэтому *_fallen_16 брал
					// modelType.parentModel = tfc:.../fallen_leaves_height16 (нет такого файла в
					// TFC 4.2.5, есть только 2..14) -> "Unable to load model". Ключ текстуры этих
					// groundcover-моделей — "#all" (+"#particle").
					let height = modelType.layers * 2;
					if (height != 16) {
						generator.parent(`tfc:block/groundcover/fallen_leaves_height${height}`)
						generator.texture("particle", `tfg:block/wood/leaves/${wood.name}`);
						generator.texture("all", `tfg:block/wood/leaves/${wood.name}`);
					} else {
						generator.parent(`tfg:block/wood/leaves/${wood.name}`);
					}
				})
			})
	}

	function TFGWoodSaplingRegistry(event, wood) {
		event.create(`tfg:wood/sapling/${wood.name}`, 'tfc:sapling')
			.soundType(`${wood.leafSound}`)
			.tree(`tfg:${wood.location}/tree/${wood.name}_mini`) // [PORT] features → tree
			.tagBoth('minecraft:saplings')
			.growthDays(wood.daysToGrow)
			.defaultCutout()
			.noCollision()
			.mapColor(global.tfgMapColor(wood.leafColor)) // [PORT-FIX]
			.hardness(0)
	}

	function TFGWoodSupportRegistry(event, wood, stripped_log) {
		event.create(`tfg:wood/support/${wood.name}`, 'tfc:support')
			// [PORT-FIX] tfc:support-модели ссылаются на "#texture"; .texture(String) ставит
			// только baseTexture (карта пустая) -> magenta. Ставим ключ 'texture' явно.
			.texture(['texture'], `${stripped_log}`)
			.horizontal(horizontal => {
				horizontal.texture(['texture'], `${stripped_log}`) // [PORT-FIX] ключ 'texture'
				horizontal.soundType(`${wood.woodSound}`)
				horizontal.hardness(2)
				horizontal.resistance(2)
				horizontal.mapColor(global.tfgMapColor(wood.woodColor)) // [PORT-FIX]
				horizontal.tagBlock('minecraft:mineable/axe')
				horizontal.requiresTool(false)
			})
			.soundType(`${wood.woodSound}`)
			.hardness(2)
			.resistance(2)
			.mapColor(global.tfgMapColor(wood.woodColor)) // [PORT-FIX]
			.tagBlock('minecraft:mineable/axe')
			.requiresTool(false)
	}
}

// [PORT] Прямая регистрация вместо диспетчера Ф2
StartupEvents.registry('block', event => {
	console.info('[Gregnautics] progress: tfg_port primitive registry start')
	registerTFGNewWoodBlocks(event)
})
