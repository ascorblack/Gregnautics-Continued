// priority: 0
"use strict";

// [PORT] Материалам без namespace добавлен явный префикс gtceu: — в GTM 1.x KubeJS
// они попадали в namespace gtceu (см. material.gtceu.* в lang оригинала), а в GTM 8
// через KubeJS уходят в kubejs: и их предметы/жидкости не регистрируются
// (краш 'Some intrusive holders were not registered', 68 объектов).

function registerTFGMoonMaterials(event) {
	const $BlastProperty = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.properties.BlastProperty")

	// Solar Panel Chemicals

	event.create('tfg:chloryl_fluoride')
		.gas()
		.components('1x fluorine', '1x chlorine', '2x oxygen')
		.color(0x8AFAF4)

	event.create('tfg:chlorine_pentafluoride')
		.gas()
		.components('5x fluorine', '1x chlorine')
		.color(0x51F7C0)

	event.create('tfg:solar_coolant')
        .gas(new GTFluidBuilder().state(GTFluidState.GAS).temperature(163))
		.components('8x helium_3', '11x oxygen', '11x hydrogen')
		.color(0xEDFFB3)

	event.create('tfg:solar_coolant_tier2')
        .gas(new GTFluidBuilder().state(GTFluidState.GAS).temperature(73))
		.components('8x tfg:solar_coolant', '1x argon')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		.color(0xfeff5d)

	// Moon Ore Line

	event.create('gtceu:regolith_vapor')
		.gas(new GTFluidBuilder().state(GTFluidState.GAS).customStill().temperature(727))

	event.create('tfg:certus_regolith')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.flags(GTMaterialFlags.DISABLE_MATERIAL_RECIPES)
		// [PORT] .iconSet(GTMaterialIconSet.CERTUS) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.color('0xc1e6e4')
		.secondaryColor('0x7a5225')

	event.create('tfg:goethe_regolith')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.flags(GTMaterialFlags.DISABLE_MATERIAL_RECIPES)
		// [PORT] .iconSet(GTMaterialIconSet.METALLIC) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.color('0xb0af5b')
		.secondaryColor('0x7a5225')

	event.create('tfg:bright_regolith')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.flags(GTMaterialFlags.DISABLE_MATERIAL_RECIPES)
		// [PORT] .iconSet(GTMaterialIconSet.SHINY) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.color('0xf0efe9')
		.secondaryColor('0xffffff')

	event.create('tfg:cassiterite_regolith')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.flags(GTMaterialFlags.DISABLE_MATERIAL_RECIPES)
		// [PORT] .iconSet(GTMaterialIconSet.METALLIC) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.color('0xbab6b7')
		.secondaryColor('0x7a5225')

	event.create('tfg:regolith_mush')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.flags(GTMaterialFlags.DISABLE_MATERIAL_RECIPES)
		// [PORT] .iconSet(GTMaterialIconSet.WOOD) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.color('0xa2cde0')
		.secondaryColor('0x7a5225')

	// Ores

	event.create('gtceu:armalcolite')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.gem(2)
		.components('1x magnesium', '1x ilmenite', '2x oxygen')
		.color(0x443333)
		.secondaryColor(0x5e2c21)
		// [PORT] .iconSet(GTMaterialIconSet.getByName('monoclinic_gem_horizontal')) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.ore()
		.addOreByproducts('ilmenite', 'magnesium', 'ilmenite')
		.flags(GTMaterialFlags.GENERATE_LENS)

	event.create('gtceu:desh')
		.components('2x olivine', '1x ilmenite', '4x nitrogen')
		.color(0xF39A4C)
		.secondaryColor(0xF35A6C)
		// [PORT] .iconSet(GTMaterialIconSet.getByName('botryoidal')) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.ore()
		.addOreByproducts('olivine', 'ilmenite', 'iron', 'rhenium')
		.washedIn(GTMaterials.SodiumPersulfate)
		.ingot()
		.liquid()
		.blast(2212, $BlastProperty.GasTier.MID) /* [PORT] GTM8: blastTemp->blast; EUt/duration-оверрайды (GTValues.VA[GTValues.HV]) вернуть на фазе рецептов */
		.flags(
			GTMaterialFlags.FORCE_GENERATE_BLOCK, 
			GTMaterialFlags.GENERATE_PLATE,
			GTMaterialFlags.GENERATE_FOIL,
			GTMaterialFlags.GENERATE_ROD,
			GTMaterialFlags.GENERATE_DENSE,
			GTMaterialFlags.GENERATE_GEAR,
			GTMaterialFlags.GENERATE_FRAME,
			GTMaterialFlags.GENERATE_FOIL,
			GTMaterialFlags.DISABLE_ALLOY_BLAST
		)
}