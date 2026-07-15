"use strict";

/**
 *
 * @param {Internal.RecipesEventJS} event
 */
// [PORT] был registerTFCBetterBFRecipes(event), вызывался из main_server_script.js — теперь регистрируем событие напрямую
ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfcbetterbf recipes start')

	event.remove({ id: 'tfcbetterbf:heating/metal/insulation' }) // [PORT] remove принимает фильтр-объект, не строку

	event.recipes.tfc.heating('tfcbetterbf:insulation', 1535)
		.resultFluid(Fluid.of('gtceu:iron', 432))
		.id(`tfcbetterbf:heating/insulation`)

	// [PORT-Ф4] TFGHelpers — Java-хелпер из мода tfg (1.20), в сборке 1.21.1 пока отсутствует
	//TFGHelpers.registerMaterialInfo('tfcbetterbf:insulation', [GTMaterials.WroughtIron, 3])

	// [PORT-Ф2] материал tfg:refractory_clay пока не зарегистрирован (+ TFGHelpers отсутствует, см. выше)
	//TFGHelpers.registerMaterialInfo('tfc:fire_bricks', [GTMaterials.get('tfg:refractory_clay'), 5])

})
