// priority: 0
"use strict";

// [PORT] Портировано из asticor_carts/recipes.js (TerraFirmaGreg-Modern 1.20.1, KubeJS 6 -> KubeJS 7 / NeoForge 1.21.1).
// [PORT] Диспетчер main_server_script.js заменён на прямую регистрацию ServerEvents.recipes.
// [PORT-Ф4] TFGHelpers.registerMaterialInfo — Java-хелпер из мода tfg (1.20), в сборке 1.21.1 пока отсутствует;
//           плюс материал GTMaterials.get('hardwood') — кастомный GT-материал TFG (Фаза 2). Все вызовы закомментированы.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port astikorcarts recipes start')

	// [PORT-Ф4] [PORT-Ф2] TFGHelpers отсутствует + материал 'hardwood' не зарегистрирован — блок закомментирован целиком
	/*
	global.TFC_HARDWOOD_TYPES.forEach(type => {
		TFGHelpers.registerMaterialInfo(`tfcastikorcarts:wheel/${type}`, [GTMaterials.get('hardwood'), 2]);
		TFGHelpers.registerMaterialInfo(`tfcastikorcarts:supply_cart/${type}`, [GTMaterials.Brass, 1, GTMaterials.get('hardwood'), 8, GTMaterials.Wood, 12]);
		TFGHelpers.registerMaterialInfo(`tfcastikorcarts:plow/${type}`, [GTMaterials.Brass, 1, GTMaterials.get('hardwood'), 8]);
		TFGHelpers.registerMaterialInfo(`tfcastikorcarts:animal_cart/${type}`, [GTMaterials.Brass, 1, GTMaterials.get('hardwood'), 14]);
	});
	global.TFC_SOFTWOOD_TYPES.forEach(type => {
		TFGHelpers.registerMaterialInfo(`tfcastikorcarts:wheel/${type}`, [GTMaterials.Wood, 2]);
		TFGHelpers.registerMaterialInfo(`tfcastikorcarts:supply_cart/${type}`, [GTMaterials.Brass, 1, GTMaterials.Wood, 20]);
		TFGHelpers.registerMaterialInfo(`tfcastikorcarts:plow/${type}`, [GTMaterials.Brass, 1, GTMaterials.Wood, 8]);
		TFGHelpers.registerMaterialInfo(`tfcastikorcarts:animal_cart/${type}`, [GTMaterials.Brass, 1, GTMaterials.Wood, 14]);
	});
	*/

	// [PORT] mcw_tfc_aio отсутствует в сборке 1.21.1 — замена входа удалена
	// (оригинал: event.replaceInput({ mod: 'tfcastikorcarts' }, '#forge:rods', '#mcw_tfc_aio:metal_rods');
	//  при возврате аналога: forge:rods -> c:rods)
})
