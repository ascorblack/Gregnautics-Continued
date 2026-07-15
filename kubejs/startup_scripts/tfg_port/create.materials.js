// priority: 0
"use strict";

// [PORT] Материалам без namespace добавлен явный префикс gtceu: — в GTM 1.x KubeJS
// они попадали в namespace gtceu (см. material.gtceu.* в lang оригинала), а в GTM 8
// через KubeJS уходят в kubejs: и их предметы/жидкости не регистрируются
// (краш 'Some intrusive holders were not registered', 68 объектов).

function registerCreateMaterials(event) {

	event.create('gtceu:asurine')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.color(0x7DB8D1)
		.secondaryColor(0x4C5D7B)
		.components('1x certus_quartz', '1x olivine', '1x zinc')
		.dust()
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('gtceu:ochrum')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.color(0xB6995E)
		.secondaryColor(0x865840)
		.components('1x quartzite', '1x hematite', '1x gold')
		.dust()
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('gtceu:crimsite')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.color(0xA0504B)
		.secondaryColor(0x7D2F3B)
		.dust()
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('gtceu:veridium')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.color(0x4F957C)
		.secondaryColor(0x2A5C4A)
		.dust()
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
}
