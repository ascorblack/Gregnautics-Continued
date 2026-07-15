// priority: 0
"use strict";

// [PORT] Материалам без namespace добавлен явный префикс gtceu: — в GTM 1.x KubeJS
// они попадали в namespace gtceu (см. material.gtceu.* в lang оригинала), а в GTM 8
// через KubeJS уходят в kubejs: и их предметы/жидкости не регистрируются
// (краш 'Some intrusive holders were not registered', 68 объектов).

function registerTFGPrimitiveMaterials(event) {

	// Paper
	event.create('gtceu:hardwood')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.flags(GTMaterialFlags.FLAMMABLE)
		// [PORT] .iconSet(GTMaterialIconSet.WOOD) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.color('0x7a5225')
		.secondaryColor('0x7a5225')

	event.create('gtceu:thermochemically_treated_hardwood')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.flags(GTMaterialFlags.FLAMMABLE)
		// [PORT] .iconSet(GTMaterialIconSet.WOOD) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.color('0x52482c')
		.secondaryColor('0x52482c')
		
	// Tree tapping
	event.create('tfg:latex')
		.liquid()
		.color(0xFBB982)

	event.create('tfg:vulcanized_latex')
		.liquid()
		.color(0xc79973)

	event.create('tfg:conifer_pitch')
		.liquid()
		.color(0xfbdf82)
		.secondaryColor(0xff9d2e)

	// Ores -- these need to be in the gtceu namespace for the ore tool to work
	event.create('gtceu:tarkianite')
		.ore()
		.components('1x copper', '1x iron', '4x rhenium', '4x molybdenum', '8x sulfur')
		.color(0x8bb054)
		.secondaryColor(0x3d8021)
		// [PORT] .iconSet(GTMaterialIconSet.getByName('monoclinic_gem_horizontal')) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.addOreByproducts('sulfur', 'rhenium', 'molybdenite')

	// Metals/minerals
	event.create('gtceu:aluminium_silicate')
		.dust()
		.ingot()
		.liquid(new GTFluidBuilder().state(GTFluidState.LIQUID).temperature(1520))
		.components('2x aluminium', '1x silicon', '5x oxygen')
		// [PORT] .iconSet('metallic') перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.color(0xB6D3FF)
		.secondaryColor(0x6F4AB3)

	event.create('tfg:kaolinite')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.components('2x aluminium', '2x silicon', '9x oxygen', '4x hydrogen')
		.color(0xEEB9AD)
		.secondaryColor(0xF6A797)
		.formula("Al2Si2O5(OH)4")
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	event.create('tfg:gilsonite')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.color(0x343434)
		.secondaryColor(0x1F1F1F)
		// [PORT] .iconSet(GTMaterialIconSet.DULL) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

	// Ores need to be in the default namespace
	event.create('gtceu:lignite')
		.components('1x carbon')
		.color(0x362D21)
		.secondaryColor(0x15171A)
		// [PORT] .iconSet(GTMaterialIconSet.LIGNITE) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.ore()
		.flags(
			GTMaterialFlags.FLAMMABLE,
			GTMaterialFlags.DISABLE_DECOMPOSITION,
			GTMaterialFlags.DISABLE_MATERIAL_RECIPES,
			GTMaterialFlags.NO_ORE_PROCESSING_TAB
		)

	event.create('gtceu:anthracite')
		.components('1x carbon')
		.color(0x292626)
		.secondaryColor(0x471A16)
		// [PORT] .iconSet('anthracite') перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.ore()
		.flags(
			GTMaterialFlags.FLAMMABLE,
			GTMaterialFlags.DISABLE_DECOMPOSITION,
			GTMaterialFlags.DISABLE_MATERIAL_RECIPES,
			GTMaterialFlags.NO_ORE_PROCESSING_TAB
		)

	// Film developing
	event.create('tfg:pyrogallol')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		.color(0xf0ccb4)
		.formula("C6H3(OH)3")
		// [PORT] .iconSet(GTMaterialIconSet.ROUGH) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)

	// Fire clay
	event.create('tfg:refractory_clay')
		.liquid() // [PORT-WORKAROUND] GTM8-SNAPSHOT: материал с предметными свойствами без жидкости оставляет незарегистрированный intrusive holder (краш заморозки реестров); molten-жидкость канонична для GT. Убрать при фиксе апстрима.
		.dust()
		// [PORT] .iconSet(GTMaterialIconSet.ROUGH) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
		.color(0xB49AA2)
		.secondaryColor(0x60545F)

	// Weak colored steel
	event.create('tfg:weak_blue_steel')
		.dust()
		.ingot()
		.liquid()
		.components('1x sterling_silver', '1x bismuth_bronze', '2x steel', '4x black_steel')
		.blastTemp(1000) // [PORT] GTM8: blastTemp(int) — аналог null-GasTier оригинала; EUt/duration-оверрайды (VA[MV], 500 тиков) вернуть через blast(builder) или рецептом на фазе рецептов
		.color(0x697FBD)
		.secondaryColor(0x384B82)
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION, GTMaterialFlags.NO_SMELTING, GTMaterialFlags.DISABLE_ALLOY_BLAST)
		// [PORT] .iconSet(GTMaterialIconSet.METALLIC) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)

	event.create('tfg:weak_red_steel')
		.dust()
		.ingot()
		.liquid()
		.components('1x brass', '1x rose_gold', '2x steel', '4x black_steel')
		.blastTemp(1000) // [PORT] GTM8: blastTemp(int) — аналог null-GasTier оригинала; EUt/duration-оверрайды (VA[MV], 500 тиков) вернуть через blast(builder) или рецептом на фазе рецептов
		.color(0xB55C5C)
		.secondaryColor(0x7D3232)
		.flags(GTMaterialFlags.DISABLE_DECOMPOSITION, GTMaterialFlags.NO_SMELTING, GTMaterialFlags.DISABLE_ALLOY_BLAST)
		// [PORT] .iconSet(GTMaterialIconSet.METALLIC) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
}