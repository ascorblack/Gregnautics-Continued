// priority: 0
"use strict";

// [PORT] Порт tfg/machines/recipes.molds.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT-Ф4-TODO] ВЕСЬ ФАЙЛ ОТКЛЮЧЁН: предметы-формы TFG из global.TFG_EXTRUDER_MOLDS /
//   global.TFG_CASTING_MOLDS (tfg:*_extruder_mold, tfg:*_casting_mold) НЕ зарегистрированы в
//   startup_scripts/tfg_port (они создавались через TFG-регистрацию предметов, Ф4 не завершена для форм).
//   Сток gtceu:empty_mold в сборке есть — включить копирование форм после регистрации предметов.
// [PORT-Ф4] TFGHelpers.registerMaterialInfo — хелпер Java-мода TFG, отсутствует.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.machines recipes.molds start (disabled, Ф4-TODO)')

	// [PORT-Ф4-TODO] --- начало отключённого блока (оригинал сохранён) ---

	// global.TFG_EXTRUDER_MOLDS.forEach(mold => {

	// 	// TFGHelpers.registerMaterialInfo(mold, [GTMaterials.Steel, 4]) // [PORT-Ф4]

	// 	event.recipes.gtceu.forming_press(`copy_shape_${global.linuxUnfucker(mold)}`)
	// 		.itemInputs('gtceu:empty_mold')
	// 		.notConsumableItem(mold) // [PORT-FIX] .notConsumable -> .notConsumableItem
	// 		.itemOutputs(mold)
	// 		.duration(120)
	// 		.EUt(GTValues.VA[GTValues.LV])
	// });

	// global.TFG_CASTING_MOLDS.forEach(mold => {

	// 	// TFGHelpers.registerMaterialInfo(mold, [GTMaterials.Steel, 4]) // [PORT-Ф4]

	// 	event.recipes.gtceu.forming_press(`copy_shape_${global.linuxUnfucker(mold)}`)
	// 		.itemInputs('gtceu:empty_mold')
	// 		.notConsumableItem(mold) // [PORT-FIX]
	// 		.itemOutputs(mold)
	// 		.duration(120)
	// 		.EUt(GTValues.VA[GTValues.LV])
	// });

	// [PORT-Ф4-TODO] --- конец отключённого блока ---
})
