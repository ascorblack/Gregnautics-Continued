// priority: 0
"use strict";

// [PORT] Материалам без namespace добавлен явный префикс gtceu: — в GTM 1.x KubeJS
// они попадали в namespace gtceu (см. material.gtceu.* в lang оригинала), а в GTM 8
// через KubeJS уходят в kubejs: и их предметы/жидкости не регистрируются
// (краш 'Some intrusive holders were not registered', 68 объектов).

function registerTFGBeneathMaterials(event) {
	const $BlastProperty = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.properties.BlastProperty")

	// Ores
/*
	event.create('gtceu:armalcolite')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.gem(2)
		.components('1x magnesium', '1x ilmenite', '2x oxygen')
		.color(0x443333)
		.secondaryColor(0x5e2c21)
		// [PORT] .iconSet(GTMaterialIconSet.getByName('tfc_emerald')) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.ore()
		.addOreByproducts('ilmenite', 'magnesium', 'ilmenite')
		.flags(GTMaterialFlags.GENERATE_LENS)
		*/

	event.create('gtceu:phlogopite')
		.components('1x potassium', '3x magnesium', '1x aluminium', '3x silicon', '10x oxygen', '2x fluorine')
		.color(0xD8A260)
		.secondaryColor(0x5A3712)
		// [PORT] .iconSet(GTMaterialIconSet.getByName('sheet_metallic')) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.ore()
		.addOreByproducts('magnesium', 'potassium', 'aluminium', 'aluminium')
		.washedIn(GTMaterials.HydrochloricAcid)
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('tfg:molybdenum_trioxide')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.components('1x molybdenum', '3x oxygen')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		.color(0xE8E4C9)
		.secondaryColor(0xC9C4A0)
		// [PORT] .iconSet(GTMaterialIconSet.SAND) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)

	event.create('tfg:calcium_sulfate')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.components('1x calcium', '1x sulfur', '4x oxygen')
		.color(0xF0EDE8)
		.secondaryColor(0xD4D0C8)
		// [PORT] .iconSet(GTMaterialIconSet.SAND) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)

	event.create('tfg:sodium_molybdate')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.components('2x sodium', '1x molybdenum', '4x oxygen')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		.color(0xDDE8F0)
		.secondaryColor(0xB8CCD4)
		// [PORT] .iconSet(GTMaterialIconSet.SHINY) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)

	event.create('tfg:lead_hydroxide')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.components('1x lead', '2x oxygen', '2x hydrogen')
		.color(0xE8E4D0)
		.secondaryColor(0xC8C4A8)
		// [PORT] .iconSet(GTMaterialIconSet.DULL) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)

	event.create('gtceu:irarsite')
        .components('4x iridium', '1x ruthenium', '1x rhodium', '1x platinum', '7x arsenic', '7x sulfur')
        .color(0x9F9FD2)
        .secondaryColor(0x5555CC)
        // [PORT] .iconSet(GTMaterialIconSet.getByName('monoclinic_quartz')) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
        .ore()
        .addOreByproducts('sulfur', 'nickel', 'copper', 'arsenic')
        .washedIn(GTMaterials.SodiumPersulfate)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('gtceu:ruarsite')
        .components('1x ruthenium', '1x arsenic', '1x sulfur')
        .color(0x51C2E4)
        .secondaryColor(0xA8D0F0)
        // [PORT] .iconSet(GTMaterialIconSet.getByName('monoclinic_dull')) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
        .ore()
        .addOreByproducts('sulfur', 'nickel', 'copper', 'arsenic')
        .washedIn(GTMaterials.SodiumPersulfate)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('gtceu:ferhodsite')
        .components('2x iron', '2x rhodium', '1x iridium', '3x nickel', '1x copper', '9x sulfur')
        .color(0x9C7C97)
        .secondaryColor(0xB98DBD)
        // [PORT] .iconSet(GTMaterialIconSet.getByName('prismatic_ruby')) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
        .ore()
        .addOreByproducts('sulfur', 'nickel', 'copper', 'iron')
        .washedIn(GTMaterials.SodiumPersulfate)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		
}