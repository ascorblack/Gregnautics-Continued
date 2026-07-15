// priority: 0
"use strict";

function registerTFGTungstenMaterials(event) {

	event.create('tfg:sodium_tungstate')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.flags(GTMaterialFlags.DISABLE_MATERIAL_RECIPES, GTMaterialFlags.DISABLE_DECOMPOSITION)
		// [PORT] .iconSet(GTMaterialIconSet.BRIGHT) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.components('2x sodium', '1x tungsten', '4x oxygen')
		.color('0xdcf6f7')

	event.create('tfg:ammonium_tungstate')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.flags(GTMaterialFlags.DISABLE_MATERIAL_RECIPES, GTMaterialFlags.DISABLE_DECOMPOSITION)
		// [PORT] .iconSet(GTMaterialIconSet.DULL) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.components('10x ammonia', '2x hydrogen', '12x tungsten', '42x oxygen')
		.color('0xfafafa')

	event.create('tfg:apt')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.gem()
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		// [PORT] .iconSet(GTMaterialIconSet.FLINT) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.components('10x ammonia', '4x water', '2x hydrogen', '12x tungsten', '42x oxygen')
		.color('0xaabdf0')

	event.create('tfg:tungsten_oxide')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		// [PORT] .iconSet(GTMaterialIconSet.FLINT) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.components('1x tungsten', '3x oxygen')
		.color('0xf0c851')
}