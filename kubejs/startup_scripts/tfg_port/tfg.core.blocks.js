// priority: 0
"use strict";

// [PORT] Из TFG startup_scripts/tfg/blocks.js (registerTFGBlocks).
// Диспетчер Ф2 отключён — регистрация напрямую через StartupEvents.registry('block').
// В оригинале это был диспетчер + три particle-emitter блока. Вызовы под-функций
// портируются каждый со своим исходным файлом:
//   registerTFGDimensionMarkerBlocks -> dimension_markers.js (отдельный файл порта)
//   registerTFGCrops                 -> tfg.core.blocks.crops.js (портировано)
//   registerTFGVaseBlocks, registerTFGMudBrickBlocks, registerTFGRockBlocks,
//   registerTFGSupportBlocks, registerTFGGlassBlocks, registerTFGNewWoodBlocks
//                                    -> stone_types/, primitive/ и т.д. (отдельные файлы порта)
//   registerTFGMarsTrees, registerTFGWorldGen*DecoBlocks, registerTFGNuclearBlocks
//                                    -> worldgen/, moon/, mars/, venus/, europa/, beneath/, nuclear/ ([PORT-Ф10] частично)

StartupEvents.registry('block', event => {
	console.info('[Gregnautics] progress: tfg_port core registry start')

	// [PORT-CHECK] Кастомный тип блока 'tfg:particle_emitter_decoration' предоставлял
	// Java-мод TFG (KubeJS-плагин), которого нет в паке 1.21 — как и партикла 'tfg:volcano_smoke'.
	// Блоки-эмиттеры пропущены до появления замены (свой аддон-мод или datapack-решение).
	//
	// event.create('tfg:big_volcano_smoke_emitter', 'tfg:particle_emitter_decoration')
	// 	.tagBlock('minecraft:mineable/pickaxe')
	// 	.soundType('stone')
	// 	.noDrops()
	// 	.particles(p => p
	// 		.position(0.5, 2, 0.5)
	// 		.range(4, 1, 4)
	// 		.velocity(0, 1, 0)
	// 		.particle('tfg:volcano_smoke'))
	// 	.hasTicker(true)
	// 	.emitDelay(200);
	//
	// event.create('tfg:natural_gas_emitter', 'tfg:particle_emitter_decoration')
	// 	.soundType('sand')
	// 	.noDrops()
	// 	.noItem()
	// 	.box(0, 0, 0, 16, 1, 16, true)
	// 	.defaultTranslucent()
	// 	.particles(p => p
	// 		.position(0.5, 0.5, 0.5)
	// 		.velocity(0, 1, 0)
	// 		.particle('minecraft:dust')
	// 		.dust(1, 0.95, 1, 1))
	// 	.emitDelay(8);
	//
	// event.create('tfg:natural_gas_bubble_emitter', 'tfg:particle_emitter_decoration')
	// 	.soundType('sand')
	// 	.noDrops()
	// 	.noItem()
	// 	.box(0, 0, 0, 16, 1, 16, true)
	// 	.defaultTranslucent()
	// 	.particles(p => p
	// 		.position(0.5, 0.2, 0.5)
	// 		.velocity(0, 2, 0)
	// 		.particle('minecraft:bubble_column_up'))
	// 	.emitDelay(5);
})
