// priority: 0
"use strict";

// [PORT] TFG 1.20.1 startup_scripts/tfg/stone_types/tag_prefixes.rocks.js -> 1.21.1 (Gregnautics).
// [PORT] Ф2-диспетчер отключён — регистрируем напрямую через StartupEvents.registry('gtceu:tag_prefix')
// [PORT] (такой же прямой вызов уже используется в gregnautics_gtceu_tfc_worldgen.js — синтаксис GTM8 проверен там).
// [PORT] ВАЖНО (дубликаты): gregnautics_gtceu_tfc_worldgen.js:197 УЖЕ делает TagPrefix.ORES.remove(...),
// [PORT] регистрирует ore-префиксы всех TFC-камней (GREGNAUTICS_TFC_STONE_TYPES) и песков (GREGNAUTICS_SAND_COLORS).
// [PORT] Повторная регистрация тех же имён — конфликт, поэтому эти блоки здесь закомментированы [PORT-DUPLICATE];
// [PORT] раскомментировать, если/когда временный worldgen-скрипт будет убран.
// [PORT] TFGHelpers.registerCobbleBlock(...) — хелпер Java-мода TFG, отсутствует в 1.21.1-сборке;
// [PORT] все вызовы закомментированы (маппинг ore->cobble для дропа руд из булыжника) — вернуть при появлении замены.

StartupEvents.registry('gtceu:tag_prefix', event => {
	console.info('[Gregnautics] progress: tfg_port rocks registry start (gtceu:tag_prefix)')

	// [PORT-DUPLICATE] Уже выполняется в gregnautics_gtceu_tfc_worldgen.js:197 (идемпотентно, но держим один источник):
	// TagPrefix.ORES.remove(TagPrefix.oreDeepslate)
	// TagPrefix.ORES.remove(TagPrefix.oreSand)
	// TagPrefix.ORES.remove(TagPrefix.oreRedSand)
	// TagPrefix.ORES.remove(TagPrefix.oreMarble)
	// TagPrefix.ORES.remove(TagPrefix.oreGravel)
	// TagPrefix.ORES.remove(TagPrefix.oreEndstone)
	// TagPrefix.ORES.remove(TagPrefix.oreNetherrack)
	// TagPrefix.ORES.remove(TagPrefix.oreBlackstone)
	// TagPrefix.ORES.remove(TagPrefix.oreBasalt)
	// TagPrefix.ORES.remove(TagPrefix.oreAndesite)
	// TagPrefix.ORES.remove(TagPrefix.oreDiorite)
	// TagPrefix.ORES.remove(TagPrefix.oreGranite)
	// TagPrefix.ORES.remove(TagPrefix.oreRedGranite)

	const shouldGenerateOre = (material) => {
		return material.hasProperty(PropertyKey.ORE);
	}

	// [PORT] shouldGenerateSandOre используется только в закомментированном песчаном блоке ниже —
	// [PORT] оставлен для будущего раскомментирования.
	const shouldGenerateSandOre = (material) => {
		return material.getName().includes("sand") && material.hasProperty(PropertyKey.ORE);
	}

	// [PORT-DUPLICATE] Ore-префиксы TFC-камней уже регистрируются в gregnautics_gtceu_tfc_worldgen.js:217
	// [PORT-DUPLICATE] (тот же список камней, тот же билдер). Повторная регистрация имён — конфликт реестра.
	// global.TFC_STONE_TYPES.forEach(stoneTypeName => {
	//
	// 	event.create(`${stoneTypeName}`, 'ore')
	// 		.stateSupplier(() => Block.getBlock(`tfc:rock/raw/${stoneTypeName}`).defaultBlockState())
	// 		.baseModelLocation(`tfc:block/rock/raw/${stoneTypeName}`)
	// 		.unificationEnabled(true)
	// 		.materialIconType(GTMaterialIconType.ore)
	// 		.generationCondition(shouldGenerateOre)
	//
	// 	TFGHelpers.registerCobbleBlock(stoneTypeName, `tfc:rock/cobble/${stoneTypeName}`); // [PORT] TFGHelpers отсутствует
	// })

	// Custom stone types

	// Can't use 'blackstone' for whatever reason -- GTM has its own
	// blackstone ore type but it doesn't seem to work at all?
	// This works around that
	event.create('pyroxenite', 'ore')
		.stateSupplier(() => Block.getBlock('minecraft:blackstone').defaultBlockState())
		.baseModelLocation('minecraft:block/blackstone')
		.unificationEnabled(true)
		.materialIconType(GTMaterialIconType.ore)
		.generationCondition(shouldGenerateOre)

	// TFGHelpers.registerCobbleBlock('pyroxenite', 'tfg:rock/cobble_blackstone'); // [PORT] TFGHelpers (Java-мод TFG) отсутствует

	event.create('deepslate', 'ore')
		.stateSupplier(() => Block.getBlock('minecraft:deepslate').defaultBlockState())
		.baseModelLocation('minecraft:block/deepslate')
		.unificationEnabled(true)
		.materialIconType(GTMaterialIconType.ore)
		.generationCondition(shouldGenerateOre)

	// TFGHelpers.registerCobbleBlock('deepslate', 'minecraft:cobbled_deepslate'); // [PORT] TFGHelpers отсутствует

	event.create('dripstone', 'ore')
		.stateSupplier(() => Block.getBlock('minecraft:dripstone_block').defaultBlockState())
		.baseModelLocation('minecraft:block/dripstone_block')
		.unificationEnabled(true)
		.materialIconType(GTMaterialIconType.ore)
		.generationCondition(shouldGenerateOre)

	// TFGHelpers.registerCobbleBlock('dripstone', 'tfg:rock/cobble_dripstone'); // [PORT] TFGHelpers отсутствует

	// [PORT-Ф10] Космические породы (ad_astra отсутствует, контент Луны/Марса/Венеры/Меркурия/Глацио — Фаза 10):
	// [PORT-Ф10] baseModelLocation указывает на модели ad_astra; сами tfg:rock/hardened_* блоки регистрируются
	// [PORT-Ф10] в tfg.blocks.rocks.js, но руды в этих породах не нужны до космических измерений.
	// event.create('moon_stone', 'ore')
	// 	.stateSupplier(() => Block.getBlock('tfg:rock/hardened_moon_stone').defaultBlockState())
	// 	.baseModelLocation('ad_astra:block/moon_stone')
	// 	.unificationEnabled(true)
	// 	.materialIconType(GTMaterialIconType.ore)
	// 	.generationCondition(shouldGenerateOre)
	//
	// TFGHelpers.registerCobbleBlock('moon_stone', 'ad_astra:moon_cobblestone');
	//
	// event.create('moon_deepslate', 'ore')
	// 	.stateSupplier(() => Block.getBlock('tfg:rock/hardened_moon_deepslate').defaultBlockState())
	// 	.baseModelLocation('ad_astra:block/moon_deepslate')
	// 	.unificationEnabled(true)
	// 	.materialIconType(GTMaterialIconType.ore)
	// 	.generationCondition(shouldGenerateOre)
	//
	// TFGHelpers.registerCobbleBlock('moon_deepslate', 'tfg:rock/cobble_moon_deepslate');
	//
	// event.create('mars_stone', 'ore')
	// 	.stateSupplier(() => Block.getBlock('tfg:rock/hardened_mars_stone').defaultBlockState())
	// 	.baseModelLocation('ad_astra:block/mars_stone')
	// 	.unificationEnabled(true)
	// 	.materialIconType(GTMaterialIconType.ore)
	// 	.generationCondition(shouldGenerateOre)
	//
	// TFGHelpers.registerCobbleBlock('mars_stone', 'ad_astra:mars_cobblestone');
	//
	// event.create('venus_stone', 'ore')
	// 	.stateSupplier(() => Block.getBlock('tfg:rock/hardened_venus_stone').defaultBlockState())
	// 	.baseModelLocation('ad_astra:block/venus_stone')
	// 	.unificationEnabled(true)
	// 	.materialIconType(GTMaterialIconType.ore)
	// 	.generationCondition(shouldGenerateOre)
	//
	// TFGHelpers.registerCobbleBlock('venus_stone', 'ad_astra:venus_cobblestone');
	//
	// event.create('mercury_stone', 'ore')
	// 	.stateSupplier(() => Block.getBlock('tfg:rock/hardened_mercury_stone').defaultBlockState())
	// 	.baseModelLocation('ad_astra:block/mercury_stone')
	// 	.unificationEnabled(true)
	// 	.materialIconType(GTMaterialIconType.ore)
	// 	.generationCondition(shouldGenerateOre)
	//
	// TFGHelpers.registerCobbleBlock('mercury_stone', 'ad_astra:mercury_cobblestone');
	//
	// event.create('glacio_stone', 'ore')
	// 	.stateSupplier(() => Block.getBlock('tfg:rock/hardened_glacio_stone').defaultBlockState())
	// 	.baseModelLocation('ad_astra:block/glacio_stone')
	// 	.unificationEnabled(true)
	// 	.materialIconType(GTMaterialIconType.ore)
	// 	.generationCondition(shouldGenerateOre)
	//
	// TFGHelpers.registerCobbleBlock('glacio_stone', 'ad_astra:glacio_cobblestone');

	event.create('red_granite', 'ore')
		.stateSupplier(() => Block.getBlock('tfg:rock/hardened_red_granite').defaultBlockState())
		.baseModelLocation('gtceu:block/red_granite')
		.unificationEnabled(true)
		.materialIconType(GTMaterialIconType.ore)
		.generationCondition(shouldGenerateOre)

	// TFGHelpers.registerCobbleBlock('red_granite', 'gtceu:red_granite_cobblestone'); // [PORT] TFGHelpers отсутствует

	// [PORT-Ф10] betterend отсутствует (венерианские породы TFG брали его блоки), контент Венеры — Фаза 10:
	// event.create('flavolite', 'ore')
	// 	.stateSupplier(() => Block.getBlock('tfg:rock/hardened_flavolite').defaultBlockState())
	// 	.baseModelLocation('betterend:block/flavolite')
	// 	.unificationEnabled(true)
	// 	.materialIconType(GTMaterialIconType.ore)
	// 	.generationCondition(shouldGenerateOre)
	//
	// TFGHelpers.registerCobbleBlock('flavolite', 'tfg:rock/cobble_flavolite');
	//
	// event.create('sandy_jadestone', 'ore')
	// 	.stateSupplier(() => Block.getBlock('tfg:rock/hardened_sandy_jadestone').defaultBlockState())
	// 	.baseModelLocation('betterend:block/sandy_jadestone')
	// 	.unificationEnabled(true)
	// 	.materialIconType(GTMaterialIconType.ore)
	// 	.generationCondition(shouldGenerateOre)
	//
	// TFGHelpers.registerCobbleBlock('sandy_jadestone', 'tfg:rock/cobble_sandy_jadestone');

	// [PORT-DUPLICATE] Ore-префиксы песков уже регистрируются в gregnautics_gtceu_tfc_worldgen.js:226.
	// global.SAND_COLORS.forEach(color => {
	// 	event.create(`${color}_sand`, 'ore')
	// 		.stateSupplier(() => Block.getBlock(`tfc:sand/${color}`).defaultBlockState())
	// 		.baseModelLocation(`tfc:block/sand/${color}`)
	// 		.unificationEnabled(true)
	// 		.materialIconType(GTMaterialIconType.ore)
	// 		.generationCondition(shouldGenerateSandOre)
	//
	// 	TFGHelpers.registerCobbleBlock(`${color}_sand`, `tfc:sand/${color}`); // [PORT] TFGHelpers отсутствует
	// })

	console.info('[Gregnautics] progress: tfg_port rocks registry done (gtceu:tag_prefix)')
})
