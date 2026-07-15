// priority: 5
"use strict";

// [PORT] Замена биндинга TFGMaterialFlags из TFG-Core (мод существует только на 1.20.1).
// Создаём НАСТОЯЩИЕ кастомные MaterialFlag с теми же именами: материалы получают
// флаги 1:1 с оригиналом, а генерацию контента, которую делал TFG-Core по этим
// флагам (TFC-инструменты, двойные слитки, small ores, dusty ores...), мы
// воспроизводим скриптами в Ф3/Ф4, читая material.hasFlag(...).
// Файл грузится раньше остальных tfg_port-файлов (priority 5 > 0).

const $MaterialFlagBuilder = Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.material.info.MaterialFlag$Builder');

const gregnauticsTfgFlag = name => new $MaterialFlagBuilder(name).build();

const TFGMaterialFlags = {
	HAS_TFC_TOOL: gregnauticsTfgFlag('has_tfc_tool'),
	HAS_GT_TOOL: gregnauticsTfgFlag('has_gt_tool'),
	HAS_TFC_ARMOR: gregnauticsTfgFlag('has_tfc_armor'),
	HAS_TFC_UTILITY: gregnauticsTfgFlag('has_tfc_utility'),
	CAN_BE_UNMOLDED: gregnauticsTfgFlag('can_be_unmolded'),
	GENERATE_DOUBLE_INGOTS: gregnauticsTfgFlag('generate_double_ingots'),
	HAS_SMALL_TFC_ORE: gregnauticsTfgFlag('has_small_tfc_ore'),
	GENERATE_DUSTY_ORES: gregnauticsTfgFlag('generate_dusty_ores'),
	GENERATE_BUZZSAW_BLADE: gregnauticsTfgFlag('generate_buzzsaw_blade')
};

// доступ и из global для серверных скриптов будущих фаз
global.TFGMaterialFlags = TFGMaterialFlags;
