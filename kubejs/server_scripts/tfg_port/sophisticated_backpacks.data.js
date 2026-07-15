// priority: 0
"use strict";

// [PORT] Портировано из sophisticated_backpacks/data.js (TerraFirmaGreg-Modern 1.20.1 -> 1.21.1)
// [PORT] registerTFCDataForSophisticatedBackpacks -> прямой обработчик TFCEvents.data (KubeJS 7: изолированные скоупы)

TFCEvents.data(event => {
	console.info('[Gregnautics] progress: tfg_port sophisticated_backpacks data start')

	// [PORT-FIX] kubejs_tfc 2.0: itemSize принимает объект записи вместо позиционных аргументов
	event.itemSize({ ingredient: 'sophisticatedbackpacks:backpack', size: 'very_large', weight: 'very_heavy' }, 'backpack_size')
	event.itemSize({ ingredient: 'sophisticatedbackpacks:iron_backpack', size: 'very_large', weight: 'very_heavy' }, 'iron_backpack_size')
	event.itemSize({ ingredient: 'sophisticatedbackpacks:gold_backpack', size: 'very_large', weight: 'very_heavy' }, 'gold_backpack_size')
	event.itemSize({ ingredient: 'sophisticatedbackpacks:diamond_backpack', size: 'very_large', weight: 'very_heavy' }, 'diamond_backpack_size')
	event.itemSize({ ingredient: 'sophisticatedbackpacks:netherite_backpack', size: 'very_large', weight: 'very_heavy' }, 'netherite_backpack_size')

})
