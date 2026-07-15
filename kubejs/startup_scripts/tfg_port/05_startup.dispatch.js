// priority: -10
"use strict";

// [PORT] Диспетчер Ф2 (система материалов) — собран по образцу оригинального
// [PORT] overrides/kubejs/startup_scripts/main_startup_script.js (TFG 1.20.1).
// [PORT] priority: -10 — загружается ПОЗЖЕ файлов-определений (priority: 0) и файлов
// [PORT] констант (в KubeJS больший priority = раньше). Содержит ТОЛЬКО хуки,
// [PORT] все register-функции которых реально определены в f2_staging.
// [PORT] Хуки оригинала, чей контент не портирован в Ф2, закомментированы ниже с пометкой фазы.

// [PORT] Ф5/Ф7 — предметы/блоки/флюиды/звуки TFG не портированы в Ф2:
// StartupEvents.registry('item', event => { registerTFGItems(event) }) // [PORT] не портировано в Ф2
// StartupEvents.registry('block', event => { registerTFGBlocks(event) }) // [PORT] не портировано в Ф2
// StartupEvents.registry('fluid', event => { registerTFGFluids(event) }) // [PORT] не портировано в Ф2
// StartupEvents.registry('sound_event', event => { registerTFGSounds(event) }) // [PORT] не портировано в Ф2

// [PORT] Ф5 — модификации блоков/предметов не портированы в Ф2:
// BlockEvents.modification(event => { ... }) // [PORT] не портировано в Ф2
// ItemEvents.modification(event => { ... }) // [PORT] не портировано в Ф2

GTCEuStartupEvents.registry('gtceu:element', event => {
	registerTFGElement(event)
})

GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
	registerGTCEuRecipeTypes(event)
})

// [PORT] Ф4 — машины не портированы в Ф2:
// GTCEuStartupEvents.registry('gtceu:machine', event => { registerGTCEuMachines(event) }) // [PORT] не портировано в Ф2

GTCEuStartupEvents.registry('gtceu:tag_prefix', event => {
	registerAE2TagPrefixes(event)
	registerGTCEuTagPrefixes(event)
	registerTFGTagPrefixes(event)
})

GTCEuStartupEvents.registry('gtceu:material', event => {
	registerAE2Materials(event)
	registerCreateMaterials(event)
	// registerGreateMaterials(event) // [PORT] не портировано в Ф2 — мод Greate отсутствует в сборке 1.21.1
	registerTFGMaterials(event)
})

// [PORT-GTM-HEAD] icon set-ы больше НЕ регистрируются через registry('gtceu:material_icon_set')
// [PORT-GTM-HEAD] (builderInfo для этого реестра в HEAD не регистрируется -> NPE в GTRegistryKubeEvent.create).
// [PORT-GTM-HEAD] HEAD ввёл отдельный стартап-ивент materialIconInfo с event.createIconSet(name[, parent]);
// [PORT-GTM-HEAD] постится в MaterialIconType.init() ДО initMaterials(), поэтому кастомные iconset-ы
// [PORT-GTM-HEAD] доступны в билдерах материалов и в materialModification.
GTCEuStartupEvents.materialIconInfo(event => {
	registerTFGIconSets(event)
})

GTCEuStartupEvents.materialModification(event => {
	// registerGreateMaterialModification(event) // [PORT] не портировано в Ф2 — мод Greate отсутствует в сборке 1.21.1
	registerTFGMaterialModification(event)
})

// [PORT] Ф6 — dimension markers не портированы в Ф2:
// GTCEuStartupEvents.registry('gtceu:dimension_marker', event => { registerTFGDimensionMarkers(event) }) // [PORT] не портировано в Ф2

GTCEuStartupEvents.craftingComponents(event => {
	registerTFGCraftingComponents(event)
})

// [PORT] Переименования Platform.mods из main_startup_script.js НЕ включены в Ф2:
// [PORT] моды primitive_creatures / wan_ancient_beasts могут отсутствовать в сборке 1.21.1,
// [PORT] а обращение к несуществующему Platform.mods.<id> упадёт. Перенести в порт main_startup_script (Ф7).
// Platform.mods.tfg.name = "TerraFirmaGreg";
// Platform.mods.kubejs.name = "TerraFirmaGreg";

// [PORT] global.linuxUnfucker из main_startup_script.js не включён — в файлах Ф2 не используется
// [PORT] (используется server_scripts, портировать вместе с фазой рецептов).
