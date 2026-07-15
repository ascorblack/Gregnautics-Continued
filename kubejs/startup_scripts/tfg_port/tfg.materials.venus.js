// priority: 0
"use strict";

// [PORT] Материалам без namespace добавлен явный префикс gtceu: — в GTM 1.x KubeJS
// они попадали в namespace gtceu (см. material.gtceu.* в lang оригинала), а в GTM 8
// через KubeJS уходят в kubejs: и их предметы/жидкости не регистрируются
// (краш 'Some intrusive holders were not registered', 68 объектов).

function registerTFGVenusMaterials(event) {

	// Ores

	event.create('tfg:calorite')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		//.components('2x mercury', '1x tungsten', '1x rhodium', '2x sulfur')
		.color(0xC94D4E)
		.secondaryColor(0x9A296A)
		// [PORT] .iconSet(GTMaterialIconSet.getByName('botryoidal')) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.ingot()
		.flags(
			GTMaterialFlags.FORCE_GENERATE_BLOCK,
			GTMaterialFlags.GENERATE_PLATE,
			GTMaterialFlags.GENERATE_ROD,
			GTMaterialFlags.GENERATE_FRAME
		)

	//#region Bromine Line

    event.create('gtceu:raw_brine')
        .fluid()
        .color(0x947a11)
        //.secondaryColor(0x81FFF9)

    event.create('gtceu:hot_brine')
        .liquid(320)
        .color(0x944611)

    event.create('gtceu:hot_chlorinated_brominated_brine')
        .liquid(320)
        .color(0xbf8d5a)
		.components('1x unknown', '1x chlorine')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create('gtceu:brominated_chlorine_vapor')
        .gas(new GTFluidBuilder().state(GTFluidState.GAS).temperature(320))
		.color(0xbf8d5a)
		.components('1x chlorine', '1x bromine', '1x water')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create('gtceu:acidic_bromine_solution')
		.liquid(new GTFluidBuilder().attribute(GTFluidAttributes.ACID))
		.color(0xe7b989)
		.components('1x chlorine', '1x bromine')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create('gtceu:concentrated_bromine_solution')
		.liquid()
		.color(0x905d29)
		.components('1x bromine', '1x chlorine')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create('gtceu:debrominated_brine')
		.liquid()
		.color(0xc3874a)

    event.create('gtceu:acidic_bromine_exhaust')
        .gas(new GTFluidBuilder().state(GTFluidState.GAS).attribute(GTFluidAttributes.ACID).temperature(293))
		.color(0xec9c4a)
		.components('3x water', '1x chlorine')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create('gtceu:hot_alkaline_debrominated_brine')
		.liquid()
		.color(0xcc6a06)
		.components('2x unknown', '1x chlorine')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create('gtceu:hot_debrominated_brine')
		.liquid(320)
		.color(0xb08e6b)

    event.create('gtceu:hydrogen_iodide')
        .gas(new GTFluidBuilder().state(GTFluidState.GAS).temperature(293))
		.color(0x82a6ce)
		.components('1x hydrogen', '1x iodine')

	//#endregion
}