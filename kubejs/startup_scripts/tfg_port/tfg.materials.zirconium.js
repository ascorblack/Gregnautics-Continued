// priority: 0
"use strict";

function registerTFGZirconiumMaterials(event) {

	event.create('tfg:zircon')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.gem()
		.color(0xF1B6B0)
		.secondaryColor(0x4BABC6)
		// [PORT] .iconSet('gem_horizontal') перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.components('1x zirconium', '1x silicon', '4x oxygen')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('tfg:zirconium_tetrachloride')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.color(0xF1B6B0)
		.secondaryColor(0x146946)
		// [PORT] .iconSet('rough') перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.components('1x zirconium', '4x chlorine')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('tfg:silicon_tetrachloride')
		.liquid()
		.color(0x707078)
		.secondaryColor(0x146946)
		.components('1x silicon', '4x chlorine')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('tfg:zirconium_bromide')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.color(0xBA776F)
		.secondaryColor(0x146985)
		// [PORT] .iconSet('shiny') перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.components('1x zirconium', '4x bromine')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('tfg:zirconium_diboride')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.ingot()
		.color(0xFADED2)
		.secondaryColor(0x4FA883)
		// [PORT] .iconSet('chonky') перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.components('1x zirconium', '2x boron')
		.flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_FOIL)

}