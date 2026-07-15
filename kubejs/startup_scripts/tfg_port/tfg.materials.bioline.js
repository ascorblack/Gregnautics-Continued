// priority: 0
"use strict";

// [PORT] Материалам без namespace добавлен явный префикс gtceu: — в GTM 1.x KubeJS
// они попадали в namespace gtceu (см. material.gtceu.* в lang оригинала), а в GTM 8
// через KubeJS уходят в kubejs: и их предметы/жидкости не регистрируются
// (краш 'Some intrusive holders were not registered', 68 объектов).

const registerTFGBiolineMaterials = (event) => {

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

	//#region Decellularization

	event.create('tfg:lauryl_alcohol')
		.liquid(new GTFluidBuilder().temperature(293))
		.components('12x carbon', '26x hydrogen', '1x oxygen', 'unknown')
		// [PORT] .iconSet(GTMaterialIconSet.FINE) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.color(0x9C734E)
		.secondaryColor(0xA12727)
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('tfg:chlorosulfuric_acid')
		.liquid(new GTFluidBuilder().temperature(293).attribute(GTFluidAttributes.ACID))
		.components('1x hydrogen', '1x sulfur', '3x oxygen', '1x chlorine')
		// [PORT] .iconSet(GTMaterialIconSet.FINE) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.color(0xAA8772)
		.secondaryColor(0xF0D5CE)

	event.create('tfg:sodium_dodecyl_sulfate')
		.liquid(new GTFluidBuilder().temperature(293))
		.components('12x carbon', '25x hydrogen', '1x sodium', '1x sulfur', '4x oxygen')
		// [PORT] .iconSet(GTMaterialIconSet.FINE) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.color(0xCA9851)
		.secondaryColor(0xF0D5CE)
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('tfg:sodium_hypochlorite')
		.liquid(new GTFluidBuilder().temperature(293))
		.components('1x sodium', '1x oxygen', '1x chlorine')
		// [PORT] .iconSet(GTMaterialIconSet.FINE) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.color(0x64995B)
		.secondaryColor(0xE5EEAE)

	//#endregion
	//#region Basic Feeder Cells

	event.create('tfg:mutative_yeast')
		.liquid(new GTFluidBuilder().customStill().temperature(310))
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('tfg:proto_growth_medium')
		.liquid(new GTFluidBuilder().customStill().temperature(293))
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('tfg:fibroblast_feeder_cells')
		.liquid(new GTFluidBuilder().customStill().temperature(310))
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	//#endregion
	//#region Gram Stain

	event.create('tfg:gram_stain')
		.liquid(new GTFluidBuilder().customStill().temperature(293))
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('tfg:crystal_violet')
		.liquid(new GTFluidBuilder().customStill().temperature(293))
		.components('25x carbon', '30x hydrogen', '1x chlorine', '3x nitrogen')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('tfg:n_n_dimethylaniline')
		.liquid(new GTFluidBuilder().temperature(293))
		.components('8x carbon', '11x hydrogen', '1x nitrogen')
		// [PORT] .iconSet(GTMaterialIconSet.FINE) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.color(0x525467)
		.secondaryColor(0x6B81A1)

	//#endregion
	//#region Triglycerides

	event.create('tfg:triglyceride_oil')
		.liquid(new GTFluidBuilder().customStill().temperature(293))
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('tfg:cholesterol')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.components('27x carbon', '46x hydrogen', '1x oxygen')
		// [PORT] .iconSet(GTMaterialIconSet.FINE) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.color(0x7F86C2)
		.secondaryColor(0xE1E7F0)

	event.create('tfg:butyric_acid')
		.liquid(new GTFluidBuilder().temperature(293).attribute(GTFluidAttributes.ACID))
		.components('4x carbon', '8x hydrogen', '2x oxygen')
		.formula('C3H7COOH')
		// [PORT] .iconSet(GTMaterialIconSet.FINE) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.color(0x3F3E3E)
		.secondaryColor(0x8E4949)
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	//#endregion
	//#region Green Stuff

	event.create('tfg:chloroplasts')
		.liquid(new GTFluidBuilder().customStill().temperature(310))
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	//#endregion
}