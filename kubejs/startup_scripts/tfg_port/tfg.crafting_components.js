// priority: 0
"use strict";

function registerTFGCraftingComponents(event) {

	// [PORT] GTCraftingComponents.SENSOR_EMITTER_GEM удалён в GTM 8 (проверено по GTCraftingComponents.class:
	// [PORT] есть только SENSOR/EMITTER как готовые компоненты, отдельного компонента "гем для сенсора/эмиттера" нет).
	// [PORT] Замену гемов (tfg:vitrified_pearl @HV, tfg:cryo_fluix_pearl @EV, gtceu:quantum_eye @IV)
	// [PORT] нужно будет сделать на уровне переопределения рецептов сенсоров/эмиттеров в server_scripts (фаза рецептов).
	// [PORT] event.setItem(GTCraftingComponents.SENSOR_EMITTER_GEM, GTValues.HV, Item.of('tfg:vitrified_pearl'))
	// [PORT] event.setItem(GTCraftingComponents.SENSOR_EMITTER_GEM, GTValues.EV, Item.of('tfg:cryo_fluix_pearl'))
	// [PORT] event.setItem(GTCraftingComponents.SENSOR_EMITTER_GEM, GTValues.IV, Item.of('gtceu:quantum_eye'))

}
