// priority: 0
"use strict";

// [PORT] Портировано из firmalife/data.js (TerraFirmaGreg-Modern 1.20.1 -> 1.21.1)
// [PORT] registerTFCDataForFirmalife -> прямой обработчик TFCEvents.data (KubeJS 7: изолированные скоупы)

//#region registerFirmalifeItemSize
TFCEvents.data(event => {
	console.info('[Gregnautics] progress: tfg_port firmalife data start')

	// [PORT-FIX] kubejs_tfc 2.0: itemSize принимает объект-кодек {ingredient, size, weight} + опциональный id вместо позиционных аргументов
	event.itemSize({ ingredient: 'firmalife:jar/honey', size: 'tiny', weight: 'medium' }, 'jar_of_honey')
	event.itemSize({ ingredient: 'firmalife:jar/compost', size: 'tiny', weight: 'medium' }, 'jar_of_compost')
	event.itemSize({ ingredient: 'firmalife:jar/rotten_compost', size: 'tiny', weight: 'medium' }, 'jar_of_rotten_compost')
	event.itemSize({ ingredient: 'firmalife:jar/guano', size: 'tiny', weight: 'medium' }, 'jar_of_guano')
})
//#endregion
