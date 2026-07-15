// priority: 0
"use strict";

// [PORT] Материалам без namespace добавлен явный префикс gtceu: — в GTM 1.x KubeJS
// они попадали в namespace gtceu (см. material.gtceu.* в lang оригинала), а в GTM 8
// через KubeJS уходят в kubejs: и их предметы/жидкости не регистрируются
// (краш 'Some intrusive holders were not registered', 68 объектов).

function registerTFGMarsMaterials(event) {
	const $BlastProperty = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.properties.BlastProperty")

	event.create('gtceu:liquid_carbon_dioxide')
		.liquid(100) //Not realistic but I want it to be cryogenic
		.components('1x carbon', '2x oxygen')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		.color(0xDBFBFF)

	// Mars Ore Line

	event.create('gtceu:lightweight_ostrum_vapor')
		.gas(new GTFluidBuilder().state(GTFluidState.GAS).customStill().temperature(760))

	event.create('gtceu:ostrum_vapor')
		.gas(new GTFluidBuilder().state(GTFluidState.GAS).customStill().temperature(815))

	event.create('gtceu:dense_ostrum_vapor')
		.gas(new GTFluidBuilder().state(GTFluidState.GAS).customStill().temperature(930))

	event.create('gtceu:residual_radioactive_concoction')
		.liquid(new GTFluidBuilder().customStill().temperature(450))

	// New OLA Materials

	event.create('tfg:radioactive_effluent')
		// [PORT-FIX] .customStill() = FluidBuilder.textures(true): hasCustomStill=true и
		// isColorEnabled=false; determineTextures тогда ищет кастомную still-текстуру
		// tfg:...radioactive_effluent (в порт не завезена) -> magenta жидкость и ведро.
		// Убираем customStill (GTCEU генерирует текстуру из шаблона) + задаём .color() тинтом.
		.liquid(new GTFluidBuilder().temperature(293))
		.color(0x6E8B3D) // [PORT-CHECK] тинт радиоактивного эффлюента (болотно-зелёный)

	// Atmosphere

	event.create('tfg:mars_air')
		.gas(new GTFluidBuilder().state(GTFluidState.GAS).temperature(208))
		.color('0xD08957')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		.components('94x carbon_dioxide', '3x nitrogen', '2x argon', '1x oxygen')

	// TODO: move neon and xenon somewhere else
	event.create('tfg:liquid_mars_air')
		.liquid(new GTFluidBuilder().state(GTFluidState.LIQUID).temperature(58))
		.color('0xD08957')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		.components('80x carbon_dioxide', '7x nitrogen', '5x argon', '3x oxygen', '1x neon', '1x krypton', '1x xenon')

	// Mars sap

	event.create('tfg:crimsene')
		.liquid(new GTFluidBuilder().state(GTFluidState.LIQUID).temperature(220))
		.gem()
		// [PORT] .iconSet('lapis') перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.flags(GTMaterialFlags.DISABLE_MATERIAL_RECIPES)
		.color(0xB12727)
		.secondaryColor(0x562C3E)

	event.create('tfg:warpane')
		.liquid(new GTFluidBuilder().state(GTFluidState.LIQUID).temperature(220))
		.gem()
		// [PORT] .iconSet('quartz') перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.flags(GTMaterialFlags.DISABLE_MATERIAL_RECIPES)
		.color(0x45ABA9)
		.secondaryColor(0x562C3E)

	event.create('tfg:mycelienzene')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.color(0x9E7385)

	event.create('tfg:cooked_mycelienzane')
		.liquid(new GTFluidBuilder().state(GTFluidState.LIQUID).temperature(1830))
		.color(0x9E7385)

	event.create('tfg:iodomethane')
		.liquid()
		.components('1x carbon', '3x hydrogen', '1x iodine')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		.color(0xAC45C6)

	event.create('tfg:trideuteroiodomethane')
		.liquid()
		.components('1x carbon', '3x deuterium', '1x iodine')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		.color(0xDD9DED)

	// Ores

	event.create('gtceu:ostrum')
		.components('2x pitchblende', '1x tricalcium_phosphate', '1x bauxite', '1x silver', '1x beryllium')
		.color(0xbd7980)
		.secondaryColor(0xA66C8D)
		// [PORT] .iconSet(GTMaterialIconSet.getByName('cereal_box')) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.ingot()
		.liquid()
		.blast(3700, $BlastProperty.GasTier.MID) /* [PORT] GTM8: blastTemp->blast; EUt/duration-оверрайды (GTValues.VA[GTValues.EV]) вернуть на фазе рецептов */
		.flags(
			GTMaterialFlags.DISABLE_DECOMPOSITION,
			GTMaterialFlags.FORCE_GENERATE_BLOCK,
			GTMaterialFlags.GENERATE_PLATE,
			GTMaterialFlags.GENERATE_ROD,
			GTMaterialFlags.GENERATE_FRAME,
			GTMaterialFlags.GENERATE_FOIL,
			GTMaterialFlags.DISABLE_ALLOY_BLAST
		)


	// Alloys

	event.create("ostrum_iodide")
		.ingot()
		.liquid()
		.components('2x ostrum', 'iodine')
		.blast(3700, $BlastProperty.GasTier.MID) /* [PORT] GTM8: blastTemp->blast; EUt/duration-оверрайды (GTValues.VA[GTValues.IV], (20 * 120) вернуть на фазе рецептов */
		// [PORT] .iconSet(GTMaterialIconSet.getByName('cereal_box')) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.flags(
			GTMaterialFlags.GENERATE_GEAR,
			GTMaterialFlags.GENERATE_FOIL,
			GTMaterialFlags.GENERATE_ROD,
			GTMaterialFlags.GENERATE_LONG_ROD)
		.color(0xc696f2)
		.secondaryColor(0x9b99ff)
}