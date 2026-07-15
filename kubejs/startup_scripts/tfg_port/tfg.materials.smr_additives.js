// priority: 0
"use strict";

const registerTFGSMRAdditiveMaterials = (event) => {
	
	event.create('tfg:ozone')
		.gas()
		.components('3x oxygen')
		.color(0x00FBFF)
		
	event.create('tfg:tin_chloride')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.components('1x tin', '2x chlorine')
		.color(0x77CF67)
		// [PORT] .iconSet(GTMaterialIconSet.ROUGH) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		
	event.create('tfg:cyclohexanone')
		.liquid()
		.components('6x carbon', '10x hydrogen', '1x oxygen')
		.color(0xFCB16F)
	
	event.create('tfg:cyclohex_diperoxide')
		.liquid()
		.components('6x carbon', '12x hydrogen', '4x oxygen')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		.color(0xBC8E63)
	
}