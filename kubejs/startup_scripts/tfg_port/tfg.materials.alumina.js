// priority: 0
"use strict";

function registerTFGAluminaMaterials(event) {
	event.create('tfg:aluminium_sulfate')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.color(0xfaf9c3)
		.secondaryColor(0xfaf2f9)
		// [PORT] .iconSet(GTMaterialIconSet.FINE) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.components('2x aluminium', '3x sulfate')
		.flags(
			GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('tfg:aluminium_hydroxide')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.color(0xd3f3f5)
		.secondaryColor(0xedf9fa)
		// [PORT] .iconSet(GTMaterialIconSet.FINE) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.components('1x aluminium', '3x oxygen', '3x hydrogen')
		.flags(
			GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('tfg:sodium_sulfate')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.color(0xfafaf7)
		.secondaryColor(0xf7f7f2)
		// [PORT] .iconSet(GTMaterialIconSet.BRIGHT) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.components('2x sodium', '1x sulfur', '4x oxygen')

	event.create('tfg:alumina')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.color(0xf7f7f2)
		.secondaryColor(0xe8eafa)
		// [PORT] .iconSet(GTMaterialIconSet.OPAL) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.components('2x aluminium', '3x oxygen')
		.flags(
			GTMaterialFlags.DISABLE_DECOMPOSITION,
			GTMaterialFlags.GENERATE_PLATE)

	event.create('tfg:chromium_3_oxide')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.color(0xD192D8)
		.secondaryColor(0xD1CDD1)
		// [PORT] .iconSet(GTMaterialIconSet.FINE) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.components('2x chromium', '3x oxygen')
		.flags(
			GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('tfg:ferrochrome')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.color(0x8C9E9A)
		.secondaryColor(0xD6BEDB)
		// [PORT] .iconSet(GTMaterialIconSet.METALLIC) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.components('1x iron', '2x chromium')

	event.create('tfg:sodium_chromate')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.color(0xD2D252)
		.secondaryColor(0xE8E4D9)
		// [PORT] .iconSet(GTMaterialIconSet.METALLIC) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.components('2x sodium', '1x chromium', '4x oxygen')
		.flags(
			GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('tfg:wollastonite')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.color(0xD3D3CC)
		.secondaryColor(0xE8E4D9)
		// [PORT] .iconSet(GTMaterialIconSet.METALLIC) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.components('1x calcium', '1x silicon', '3x oxygen')

	event.create('tfg:sodium_dichromate')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.color(0xE84B0A)
		.secondaryColor(0xF2C4B0)
		// [PORT] .iconSet(GTMaterialIconSet.DULL) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.components('2x sodium', '2x chromium', '7x oxygen')
		.flags(
			GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('tfg:mixed_garnet')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.color(0x642910)
		.secondaryColor(0xF0946D)
		// [PORT] .iconSet(GTMaterialIconSet.FLINT) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.flags(
			GTMaterialFlags.DISABLE_DECOMPOSITION)
}