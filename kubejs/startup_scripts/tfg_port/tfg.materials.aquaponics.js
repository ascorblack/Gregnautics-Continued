// priority: 0
"use strict";

// [PORT] Материалам без namespace добавлен явный префикс gtceu: — в GTM 1.x KubeJS
// они попадали в namespace gtceu (см. material.gtceu.* в lang оригинала), а в GTM 8
// через KubeJS уходят в kubejs: и их предметы/жидкости не регистрируются
// (краш 'Some intrusive holders were not registered', 68 объектов).

const registerTFGAquaponicsMaterials = (event) => {

	/*    event.create('gtceu:mysterious_ooze')
			.liquid(new GTFluidBuilder().temperature(293))
			.gas(new GTFluidBuilder().state(GTFluidState.GAS).customStill().temperature(293))
			.color(0x500bbf)
			.fluidTemp(69420)
			.dust()
			.cableProperties(GTValues.V[GTValues.LV], 69, 0, true) // Voltage, Amperage, EU loss, Is Superconductor.
			.gem(2, 4000) 
			// [PORT-Ф10] .element(...) вырезан: GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder на ЛЮБОЙ element-привязке KubeJS-материала (краш заморозки реестра, проверено минимальным репро). Вернуть при фиксе апстрима. 
			.ore(2, 3) 
			.color(0x7D2DDB)
			// [PORT] .iconSet(GTMaterialIconSet.LIGNITE) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
			.ingot()
			.components('1x andesite', '1x iron')
			.color(0x839689)
			// [PORT] .iconSet(GTMaterialIconSet.DULL) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
			.flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_SMALL_GEAR)
	*/

	// Nitrate Fluids
	event.create('tfg:nitrate_rich_water')
		.liquid(new GTFluidBuilder().customStill().temperature(310))
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

	event.create('tfg:nitrate_rich_semiheavy_ammoniacal_water')
		.liquid(new GTFluidBuilder().customStill().temperature(310))
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION);

}