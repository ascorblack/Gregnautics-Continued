"use strict";

// [PORT] Портировано из afc/data.js (TerraFirmaGreg-Modern 1.20.1 -> 1.21.1)
// [PORT] registerTFCDataForArborFirmaCraft -> прямой обработчик TFCEvents.data (KubeJS 7: изолированные скоупы)

TFCEvents.data(event => {
	console.info('[Gregnautics] progress: tfg_port afc data start')

	// [PORT-FIX] kubejs_tfc 2.0: itemHeat(...) не существует — event.heat({...}) с codec-полями HeatDefinition
	event.heat({ ingredient: 'afc:tree_tap', heat_capacity: 0.2345 })
})
