// priority: 0
"use strict";

// [PORT] Материалам без namespace добавлен явный префикс gtceu: — в GTM 1.x KubeJS
// они попадали в namespace gtceu (см. material.gtceu.* в lang оригинала), а в GTM 8
// через KubeJS уходят в kubejs: и их предметы/жидкости не регистрируются
// (краш 'Some intrusive holders were not registered', 68 объектов).

function registerTFGFoodMaterials(event) {

	//#region Solids

	event.create('gtceu:lactose')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		// [PORT] .iconSet(GTMaterialIconSet.FINE) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.color('0xede8da')
		.secondaryColor('0xeddcad')
		.components('12x carbon', '22x hydrogen', '11x oxygen');

	event.create('tfg:sodium_dihydrogen_citrate')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		// [PORT] .iconSet(GTMaterialIconSet.BRIGHT) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.components('6x carbon', '7x hydrogen', '1x sodium', '7x oxygen')
		.color('0xE38818');

	event.create('tfg:citric_acid')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		// [PORT] .iconSet(GTMaterialIconSet.SHINY) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.components('6x carbon', '8x hydrogen', '7x oxygen')
		.color('0xE3AD18');

	//#endregion
	//#region Liquids

	event.create('tfg:rich_stock')
		.liquid(new GTFluidBuilder().customStill().state(GTFluidState.LIQUID).temperature(360));

	event.create('tfg:light_stock')
		.liquid(new GTFluidBuilder().customStill().state(GTFluidState.LIQUID).temperature(360));

	event.create('tfg:brown_gravy')
		.liquid(new GTFluidBuilder().customStill().state(GTFluidState.LIQUID).temperature(360));

	event.create('tfg:cultured_milk')
		.liquid(new GTFluidBuilder().customStill().state(GTFluidState.LIQUID).temperature(300));

	event.create('tfg:peanut_oil')
		.liquid(new GTFluidBuilder().customStill().state(GTFluidState.LIQUID).temperature(300));

	//#endregion
};