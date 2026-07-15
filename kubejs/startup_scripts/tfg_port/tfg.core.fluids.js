// priority: 0
"use strict";

// [PORT] Из TFG startup_scripts/tfg/fluids.js (registerTFGFluids).
// Диспетчер Ф2 отключён — регистрация напрямую через StartupEvents.registry('fluid').
// registerTFGFoodFluids -> уже портировано в tfg.food.fluids.js.
// [PORT] KubeJS 7: .thinTexture(color) -> тип 'thin' + .tint(color),
// .thickTexture(color) -> тип 'thick' + .tint(color); .bucketColor() удалён —
// tint красит и жидкость, и ведро; .temperature() переехал в FluidTypeBuilder (.type(...)).
// Жидкости Луны/Марса/Венеры оставлены: сами по себе от контента космоса не зависят
// и нужны цепочкам переработки (Ф10 подключит рецепты).

StartupEvents.registry('fluid', event => {
	console.info('[Gregnautics] progress: tfg_port core registry start')

	// Photographic developers
	event.create('tfg:bw_photographic_developer', 'thin')
		.tint(0xa84d11) // [PORT] вместо .thinTexture/.bucketColor
		.noBlock()

	event.create('tfg:color_photographic_developer', 'thin')
		.tint(0xba6900) // [PORT] вместо .thinTexture/.bucketColor
		.noBlock()

	// Moon
	event.create('tfg:cryogenized_fluix', 'thick')
		.tint(0xde8cfb) // [PORT] вместо .thickTexture/.bucketColor
		.type(t => t.temperature(10)) // [PORT] temperature теперь в FluidTypeBuilder
		.noBlock()

	// Mars
	event.create('tfg:heavy_ammoniacal_water', 'thin')
		.tint(0x08733f) // [PORT] вместо .thinTexture/.bucketColor
		.type(t => t.temperature(236)) // [PORT] temperature теперь в FluidTypeBuilder
		.noBlock()

	// Venus
	event.create('tfg:supercritical_co2', 'thin')
		.tint(0x3deb96) // [PORT] вместо .thinTexture; отдельный .bucketColor(0x08733f) невозможен — ведро тоже 0x3deb96
		.type(t => t.temperature(236)) // [PORT] temperature теперь в FluidTypeBuilder
		.noBlock()
})
