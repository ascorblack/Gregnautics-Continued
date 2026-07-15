// priority: 0
"use strict";

function registerTFGCoilMaterials(event) {
	const $BlastProperty = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.properties.BlastProperty")

	// Cupronickel

	event.create('tfg:magnesium_hydroxide')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		.components('1x magnesium', '2x hydroxide')
		.color(0xC6E4FF)

	event.create('tfg:magnesia_refractory_brick')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.ingot()
		// [PORT] .iconSet(GTMaterialIconSet.ROUGH) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.flags(GTMaterialFlags.NO_SMELTING)
		.color(0xA69D96)

	// Kanthal

	event.create('tfg:rough_silicon_carbide')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.color(0x95999e)
		.secondaryColor(0x95999a)
		// [PORT] .iconSet(GTMaterialIconSet.ROUGH) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.ingot()
		.blast(2341, $BlastProperty.GasTier.LOW) /* [PORT] GTM8: blastTemp->blast; EUt/duration-оверрайды (GTValues.VA[GTValues.HV], (20*45) вернуть на фазе рецептов */
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('tfg:silicon_carbide')
		.color(0xdfe5ed)
		.secondaryColor(0xdfe5aa)
		// [PORT] .iconSet(GTMaterialIconSet.ROUGH) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.ingot()
		.fluid()
		.flags(
			GTMaterialFlags.DISABLE_DECOMPOSITION,
			GTMaterialFlags.GENERATE_PLATE,
		)

	// RTM

	event.create('tfg:nichromium_iodomethylate')
		.liquid(new GTFluidBuilder().temperature(1818))
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		.components('4x nickel', '1x chromium', '1x carbon', '3x hydrogen', '1x iodine')
		.color(0xe7a2fc)
}