// priority: 0
"use strict";

function registerTFGEuropaMaterials(event) {

	event.create('tfg:etrium')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		//.components('1x niobium', '1x molybdenum', '1x ruthenium', '3x carbon', '1x monochloramine')
		.color(0x7BFCD7)
		.secondaryColor(0x3582D2)
		// [PORT] .iconSet(GTMaterialIconSet.getByName('tfc_silver')) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.ingot()
		.flags(
			GTMaterialFlags.FORCE_GENERATE_BLOCK,
			GTMaterialFlags.GENERATE_PLATE, 
			GTMaterialFlags.GENERATE_ROD
		)


		
}