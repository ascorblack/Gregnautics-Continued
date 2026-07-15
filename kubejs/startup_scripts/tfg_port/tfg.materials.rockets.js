// priority: 0
"use strict";

// [PORT] Материалам без namespace добавлен явный префикс gtceu: — в GTM 1.x KubeJS
// они попадали в namespace gtceu (см. material.gtceu.* в lang оригинала), а в GTM 8
// через KubeJS уходят в kubejs: и их предметы/жидкости не регистрируются
// (краш 'Some intrusive holders were not registered', 68 объектов).

function registerTFGRocketMaterials(event) {
	const $BlastProperty = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.properties.BlastProperty")

	// Space Rocket Materials

	event.create('gtceu:rocket_alloy_t1')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.ingot()
		.components('6x aluminium', '2x stainless_steel', '1x red_steel')
		.color(0x333e47)
		// [PORT] .iconSet('metallic') перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_ROD, GTMaterialFlags.GENERATE_DENSE, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_BOLT_SCREW)
		.blast(1760, $BlastProperty.GasTier.MID) /* [PORT] GTM8: blastTemp->blast; EUt/duration-оверрайды (256, 900) вернуть на фазе рецептов */

	event.create('gtceu:rocket_alloy_t2')
		.ingot()
		.components('19x titanium', '4x vanadium', '3x aluminium', '3x chromium', '3x tin')
		.color(0x3c253d)
		// [PORT] .iconSet('metallic') перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_ROD, GTMaterialFlags.GENERATE_DENSE, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_BOLT_SCREW, GTMaterialFlags.DISABLE_ALLOY_BLAST)
		.blast(3200, $BlastProperty.GasTier.MID) /* [PORT] GTM8: blastTemp->blast; EUt/duration-оверрайды (1024, 1100) вернуть на фазе рецептов */
		.liquid()

	/*	event.create('gtceu:rocket_alloy_t3')
			.ingot()
			.components('8x titanium', '9x tungsten_steel', '2x tantalum', '2x radon')
			.color(0x6c678b)
			//.secondaryColor(0xa59fc6)
			.liquid()
			.removeHazard()
			// [PORT] .iconSet('metallic') перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
			.flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_ROD, GTMaterialFlags.GENERATE_DENSE, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_BOLT_SCREW)
			.blast(4200, $BlastProperty.GasTier.MID) // [PORT] внутри закомментированного блока; при расконсервации: EUt/duration (4096, 1300) на фазе рецептов
		*/

	// Insulation
	event.create('gtceu:vitrified_asbestos')
		.dust()
		.fluid()
		// [PORT] .iconSet('glass') перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.color(0xcccccc)

	event.create('tfg:aes_mix')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.flags(GTMaterialFlags.DECOMPOSITION_BY_CENTRIFUGING)
		.components('5x silicon_dioxide', '4x quicklime', '1x magnesia')
		.hazard(HazardProperty.HazardTrigger.SKIN_CONTACT, GTMedicalConditions.CHEMICAL_BURNS)
		.color(0xE0E9E4)
	event.create('tfg:molten_aes')
		.liquid(2900)
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		.components('5x silicon_dioxide', '4x quicklime', '1x magnesia')
		.color(0xe65609)
		.secondaryColor(0xe65609)

	//#region Ammonia Borane
	event.create('tfg:sodium_hydride')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING)
		.components('1x sodium', '1x hydrogen')
		.color(0xEDF5F3)
	event.create('tfg:boric_acid')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING)
		.components('3x hydrogen', '1x boron', '3x oxygen')
		.color(0xDFEDDF)
		.secondaryColor(0xDFEDDF)
	event.create('tfg:trimethyl_borate')
		.liquid()
		.flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING)
		.components('3x carbon', '9x hydrogen', '1x boron', '3x oxygen')
		.color(0xF7F7F7)
	event.create('tfg:sodium_borohydride')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING)
		.components('1x sodium', '1x boron', '4x hydrogen')
		.color(0xE8F1FF)
		.secondaryColor(0xE8F1FF)
	event.create('tfg:sodium_methoxide')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING)
		.components('1x sodium', '1x oxygen', '1x carbon', '3x hydrogen')
		.color(0xE8E5DF)
		.secondaryColor(0xE8E5DF)
	event.create('tfg:ammonia_borane')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING, GTMaterialFlags.GENERATE_PLATE)
		.components('1x ammonia', '1x boron', '3x hydrogen')
		.color(0xCCE3E3)
		.secondaryColor(0xCCE3E3)
	//#endregion

	//#region polyurethane
	event.create('tfg:aniline')
		.liquid()
		.components('6x carbon', '5x hydrogen', '1x nitrogen', '2x hydrogen')
		.color(0xBAB999)
	event.create('tfg:dimethyl_carbonate')
		.liquid()
		.flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING)
		.components('3x formaldehyde') // CH2O
		.color(0xFFFFF2)
	event.create('tfg:methyl_phenylcarbamate')
		.liquid()
		.flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING)
		.components('8x carbon', '9x hydrogen', '1x nitrogen', '2x oxygen')
		.color(0xB4EDB4)
	event.create('tfg:methylene_diphenyl_dicarbamate')
		.liquid()
		.flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING)
		.components('17x carbon', '18x hydrogen', '2x nitrogen', '4x oxygen')
		.color(0x69C2C1)
	event.create('tfg:methylene_diphenyl_diisocyanate')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING)
		.components('13x carbon', '10x hydrogen', '2x nitrogen', '2x oxygen')
		.color(0xFFFFBA)
	//#endregion

	//#region aerogel
	event.create('tfg:tmos')
		.liquid()
		.components('1x silicon', '4x methoxy')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		.color(0xC2C6CC)
	event.create('tfg:silica_gel')
		.liquid()
		.color(0x60BABF)
		.secondaryColor(0xFFD38C)
	event.create('tfg:soaked_silica_gel')
		.liquid()
		.color(0x9ED5D9)
	//#endregion


	// Space suit gases (these all add up to 10B of components = 1B of space suit gas)

	event.create('tfg:compressed_nitrox')
		.gas()
		.components('8x nitrogen', '2x oxygen')
		.color(0xaef5ef)

	event.create('tfg:compressed_heliox')
		.gas()
		.components('8x helium', '2x oxygen')
		.color(0xf5eeb3)

	event.create('tfg:compressed_heliox_3')
		.gas()
		.components('8x helium_3', '2x oxygen')
		.color(0xf5ea90)

	event.create('tfg:compressed_trimix')
		.gas()
		.components('5x nitrogen', '3x oxygen', '2x helium')
		.color(0xc3fab9)

	event.create('tfg:compressed_trimix_3')
		.gas()
		.components('5x nitrogen', '3x oxygen', '2x helium_3')
		.color(0xa3ed95)

	//#region Basalt Insulation Pannel

	event.create('tfg:basalt_fiber')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.ingot()
		.components('1x basalt')
		.flags(
			GTMaterialFlags.DISABLE_DECOMPOSITION,
			GTMaterialFlags.GENERATE_PLATE,
			GTMaterialFlags.GENERATE_FOIL,
			GTMaterialFlags.GENERATE_FINE_WIRE,
			GTMaterialFlags.DISABLE_MATERIAL_RECIPES
		)
		.color(0x525D6B)

	event.create('tfg:dichloropropane')
		.liquid()
		.components('3x carbon', '6x hydrogen', '2x chlorine')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		.color(0xC2C6CC)

	event.create('tfg:3_chloropropylamine')
		.liquid()
		.components('3x carbon', '8x hydrogen', '1x chlorine', '1x nitrogen')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		.color(0xFFF8C6)

	event.create('tfg:aminopropyl_chlorosilane')
		.liquid()
		.components('3x carbon', '8x hydrogen', '3x chlorine', '1x nitrogen', '1x silicon')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		.color(0xC6E2FF)

	event.create('tfg:3_aminopropyltriethoxysilane')
		.liquid()
		.components('9x carbon', '23x hydrogen', '1x nitrogen', '3x oxygen', '1x silicon')
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
		.color(0xFFE8C2)


}