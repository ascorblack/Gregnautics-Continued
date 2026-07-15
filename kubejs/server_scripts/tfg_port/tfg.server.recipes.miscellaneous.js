// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/recipes.miscellaneous.js (registerTFGMiscellaneousRecipes).
// Диспетчер убран — регистрируем ServerEvents.recipes напрямую.
// Теги forge:->c:, tools/* в единственном числе (c:tools/hammer и т.д.).

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.recipes.miscellaneous start')

	//Moss
	// [PORT] Тег tfc:moss наполняется в tfc.tags.js (уже портирован).
	// [PORT-FIX] {input:...} без типа падает на чтении GT-жидкостных входов (10000) -> тип-фильтр item-крафта
	var MISC_CRAFTING_FILTERS = [
		{ type: 'minecraft:crafting_shaped' },
		{ type: 'minecraft:crafting_shapeless' },
		{ type: 'gtceu:shaped' },
		{ type: 'gtceu:shapeless' },
		{ type: 'tfc:advanced_shaped_crafting' },
		{ type: 'tfc:advanced_shapeless_crafting' }
	]
	event.replaceInput(MISC_CRAFTING_FILTERS, 'minecraft:vine', '#tfc:moss')

	// Universal Circuit
	// [PORT] tfg:*_universal_circuit зарегистрированы в startup_scripts/tfg_port/tfg.core.items.js.
	// [PORT-FIX] KubeJS 7: Ingredient.subtract переименован в except (kjs$except, neoforge:difference).
	global.UNIVERSAL_CIRCUIT_TIERS.forEach(tier => {
		event.shapeless(Item.of(`tfg:${tier}_universal_circuit`, 1), [Ingredient.of([`#gtceu:circuits/${tier}`]).except(`tfg:${tier}_universal_circuit`)]
		).id(`universal_circuits_${tier}`);
	});

	// Armor stands
	event.shapeless('1x tfg:armor_stand_arms', [
		'minecraft:armor_stand'
	]).id(`tfg:shapeless/armor_stand_arms`)

	event.shapeless('1x minecraft:armor_stand', [
		'tfg:armor_stand_arms'
	]).id(`tfg:shapeless/armor_stand`)

	// Piglin disguise
	// [PORT-Ф4-TODO] tfg:piglin_disguise не зарегистрирован в startup_scripts/tfg_port — рецепты закомментированы.
	/*
	// [PORT-FIX] tfc:sewing 1.21: паттерны строками (stitches 5x9: '#'/' ', squares 4x8: 'B'/'W'/' ')
	event.recipes.tfc.sewing(
		'1x minecraft:player_head',
		[
			'         ',
			'   # #   ',
			'   # #   ',
			'  ## ##  ',
			'         '
		],
		[
			'BBB  BBB',
			'B BWWB B',
			'BBBWWBBB',
			'  WWWW  '
		]
	).id('tfg:sewing/player_head');

	event.recipes.gtceu.assembler('tfg:player_head')
		.itemInputs('2x #tfc:sewing_light_cloth', '1x #tfc:sewing_dark_cloth', '2x #c:strings') // [PORT] forge:string -> c:strings
		.itemOutputs('minecraft:player_head')
		.EUt(GTValues.VA[GTValues.ULV])
		.duration(200)
		.circuit(3)


	//Trowel
	// [PORT-Ф4-TODO] tfg:trowel не зарегистрирован в startup_scripts/tfg_port — рецепты закомментированы.
	/*
	event.shaped('tfg:trowel', [
		'DBC',
		'AA ',
		'   '
	], {
		A: ChemicalHelper.get(TagPrefix.plate, GTMaterials.Invar, 1),
		B: '#c:screws',
		C: '#tfc:lumber',
		D: '#c:tools/screwdriver' // [PORT] forge:tools/screwdrivers -> c:tools/screwdriver (GTM8: единственное число)
	}).id('tfg:shaped/trowel')

	event.recipes.gtceu.assembler('tfg:assembler/trowel')
		.itemInputs(ChemicalHelper.get(TagPrefix.plate, GTMaterials.Invar, 2), '1x #c:screws', '1x #tfc:lumber')
		.itemOutputs('1x tfg:trowel')
		.duration(40)
		.circuit(4)
		.EUt(GTValues.VA[GTValues.ULV])
	*/

	// Etching Tip
	// [PORT] damage_inputs_shapeless_crafting удалён в kubejs_tfc 2.0 — TFC 1.21 сам возвращает повреждённый инструмент (auto-remainder).
	event.shapeless('tfg:etching_diamond_tip', [
		'#c:tools/hammer', // [PORT] forge:tools/hammers -> c:tools/hammer
		'#c:tools/chisel', // [PORT-FIX] tfc:chisels нет в TFC 1.21
		'minecraft:diamond'
	]).id('tfg:shapeless/etching_diamond_tip');

	event.replaceInput({ id: "minecraft:jukebox" }, 'minecraft:diamond', 'tfg:etching_diamond_tip');

	// Interplanetary ae2 card
	// [PORT-Ф2] Требует #c:exquisite_gems/fluix (TFG-материал fluix — кастомные GT-материалы заблокированы)
	// и #c:plates/ruthenium (флаг GENERATE_PLATE от TFG). [PORT-Ф4-TODO] tfg:wireless_card не зарегистрирован.
	/*
	event.recipes.gtceu.assembler('tfg:wireless_card')
		.itemInputs(
			'ae2:advanced_card',
			'4x ae2:wireless_booster',
			'ae2:cell_component_16k',
			'2x ae2:wireless_receiver',
			'2x gtceu:ev_emitter',
			'#c:exquisite_gems/fluix',
			'2x #c:plates/ruthenium')
		.inputFluids(Fluid.of('gtceu:epoxy', 144))
		.itemOutputs('tfg:wireless_card')
		.duration(300)
		.EUt(GTValues.VA[GTValues.EV])
	*/

	// Replace bronze drums & crates with a tag containing the 3 different bronzes
	// NOTE: A better way to do this would be to overwrite GTCraftingComponents.CRATE and GTCraftingComponents.DRUM in crafting_components.js, but tags seem to get populated after the recipes get registed, so...
	// [PORT-CHECK] Теги tfg:any_bronze_crate/tfg:any_bronze_drum наполняются в gregtech/tags.js (портируется отдельно);
	// если тег пуст — рецепты с ним сломаются. Id 'gtceu:shapeless/drum_nbt_bronze' в 1.21 мог смениться (NBT -> data components).
	event.replaceInput(MISC_CRAFTING_FILTERS, 'gtceu:bronze_crate', '#tfg:any_bronze_crate') // [PORT-FIX] тип-фильтр (см. выше)
	event.replaceInput([ // [PORT-FIX] тип-фильтр + сохранён not:id для drum_nbt_bronze
		{ type: 'minecraft:crafting_shaped' },
		{ type: 'minecraft:crafting_shapeless' },
		{ type: 'gtceu:shaped' },
		{ type: 'gtceu:shapeless', not: { id: 'gtceu:shapeless/drum_nbt_bronze' } }
	], 'gtceu:bronze_drum', '#tfg:any_bronze_drum')

	//#region RNR Paving Cart
	// [PORT] firmaciv отсутствует в 1.21.1-сборке — firmaciv:rope_coil нечем заменить,
	// рецепты колеса закомментированы (tfg:cobalt_brass_wheel зарегистрирован, но остаётся без рецепта — TODO подобрать замену).
	/*
	const rubber_types = [
		{ fluid: 'styrene_butadiene_rubber', quantity: 144 },
		{ fluid: 'silicone_rubber', quantity: 288 },
		{ fluid: 'rubber', quantity: 576 }
	];
	rubber_types.forEach((rubber) => {
		event.recipes.gtceu.assembler(`tfg:cobalt_brass_wheel/${rubber.fluid}`)
			.itemInputs(
				ChemicalHelper.get(TagPrefix.rod, GTMaterials.CobaltBrass, 8),
				Ingredient.of('firmaciv:rope_coil'), // [PORT] firmaciv отсутствует
				Ingredient.of('#c:screws/any_bronze').withCount(4)
			)
			.inputFluids(Fluid.of(`gtceu:${rubber.fluid}`, rubber.quantity))
			.itemOutputs('tfg:cobalt_brass_wheel')
			.duration(20 * 10)
			.EUt(GTValues.VA[GTValues.LV])
	});
	// TFGHelpers.registerMaterialInfo('tfg:cobalt_brass_wheel', [GTMaterials.Rubber, 1, GTMaterials.CobaltBrass, 4]); // [PORT] TFGHelpers (Java-мод TFG) отсутствует

	event.recipes.create.mechanical_crafting('tfg:cobalt_brass_wheel', [
		'  D  ',
		'CAAAC',
		'DABAD',
		'CAAAC',
		'  D  '

	], {
		A: { tag: 'c:rods/cobalt_brass' },      // [PORT] Create-схемы: '#tag' строкой парсится как флюид — только {tag:...}
		B: 'firmaciv:rope_coil',                // [PORT] firmaciv отсутствует
		C: { tag: 'c:screws/any_bronze' },
		D: { tag: 'c:plates/rubber' }
	}).id('tfg:mechanical_crafter/cobalt_brass_wheel')
	*/

	// [PORT-Ф4-TODO] tfg:rnr_plow не зарегистрирован в startup_scripts/tfg_port.
	// [PORT-Ф2] Требует rodLong TreatedWood (long_treated_wood_rod — флаг GENERATE_LONG_ROD добавляет TFG,
	// материальные модификации заблокированы) и #c:mattock_heads/*_steel (TFG-теги/предметы).
	/*
	const mattock_types = ['red', 'blue'];
	mattock_types.forEach((type) => {
		event.recipes.gtceu.assembler(`tfg:rnr_plow/${type}_steel`)
			.itemInputs(
				ChemicalHelper.get(TagPrefix.rodLong, GTMaterials.CobaltBrass, 1),
				ChemicalHelper.get(TagPrefix.rodLong, GTMaterials.TreatedWood, 2),
				ChemicalHelper.get(TagPrefix.plate, GTMaterials.Invar, 4),
				ChemicalHelper.get(TagPrefix.spring, GTMaterials.Steel, 2),
				Ingredient.of('tfg:cobalt_brass_wheel').withCount(2),
				Ingredient.of('create:chute').withCount(1),
				Ingredient.of(`#c:mattock_heads/${type}_steel`).withCount(3)
			)
			.itemOutputs('tfg:rnr_plow')
			.duration(20 * 60)
			.EUt(GTValues.VA[GTValues.LV])

		event.recipes.create.mechanical_crafting('tfg:rnr_plow', [
			' B B ',
			'ECACE',
			'DCFCD',
			' GGG '
		], {
			A: { tag: 'c:rods/long/cobalt_brass' },
			B: { tag: 'c:rods/long/treated_wood' },
			C: { tag: 'c:plates/invar' },
			D: { tag: 'c:springs/steel' },
			E: 'tfg:cobalt_brass_wheel',
			F: 'create:chute',
			G: { tag: `c:mattock_heads/${type}_steel` }
		}).id(`tfg:mechanical_crafter/rnr_plow/${type}_steel`)
	});
	// TFGHelpers.registerMaterialInfo('tfg:rnr_plow', [...]); // [PORT] TFGHelpers отсутствует
	*/

	//#endregion

	// Rotten Voiding Cover
	// [PORT-Ф4-TODO] tfg:rotten_voiding_cover не зарегистрирован в startup_scripts/tfg_port.
	/*
	event.recipes.gtceu.assembler('tfg:rotten_voiding_cover')
		.itemInputs('gtceu:item_voiding_cover', '8x tfc:rotten_compost')
		.itemOutputs('tfg:rotten_voiding_cover')
		.duration(5*20)
		.EUt(GTValues.VA[GTValues.LV])
		.addMaterialInfo(true);
	*/

	//#region Struts and Girders
	// [PORT-Ф4-TODO] Блоки tfg:girder/* и tfg:strut/* не зарегистрированы в startup_scripts/tfg_port —
	// весь регион закомментирован. TFGHelpers.registerMaterialInfo — Java-хелпер TFG, отсутствует.
	/*
	const STRUT_AND_GIRDER_METALS = [
		{ metal: 'copper', amount: 4, recycle: GTMaterials.Copper, yield: 0.25 },
		{ metal: 'zinc', amount: 4, recycle: GTMaterials.Zinc, yield: 0.25 },
		{ metal: 'brass', amount: 4, recycle: GTMaterials.Brass, yield: 0.25 },
		{ metal: 'tin_alloy', amount: 4, recycle: GTMaterials.TinAlloy, yield: 0.25 },
		{ metal: 'wrought_iron', amount: 8, recycle: GTMaterials.WroughtIron, yield: 0.125 },
		{ metal: 'steel', amount: 8, recycle: GTMaterials.Steel, yield: 0.125 }
	]

	STRUT_AND_GIRDER_METALS.forEach(material => {
		// Girder
		if(material.metal != 'steel') {
			event.stonecutting(`${material.amount}x tfg:girder/beam/${material.metal}`, `#c:ingots/${material.metal}`)
		}

		// Truss
		event.stonecutting(`${material.amount}x tfg:girder/truss/${material.metal}`, `#c:ingots/${material.metal}`)

		// Girder Strut
		event.stonecutting(`${material.amount}x tfg:strut/beam/${material.metal}`, `#c:ingots/${material.metal}`)

		// Truss Strut
		event.stonecutting(`${material.amount}x tfg:strut/truss/${material.metal}`, `#c:ingots/${material.metal}`)
	})
	*/

	//#endregion

	// Silk thread
	// [PORT-Ф4-TODO] tfg:silk_fibers не зарегистрирован в startup_scripts/tfg_port.
	/*
	event.shapeless('minecraft:string', [
		'4x tfg:silk_fibers',
		'#tfg:tools/spindles'
	]).id('tfg:shapeless/silk_fibers_to_thread') // [PORT] damage_inputs_shapeless_crafting удалён — обычный shapeless

	event.recipes.gtceu.wiremill('tfg:silk_fiber_thread')
		.itemInputs('4x tfg:silk_fibers')
		.itemOutputs('minecraft:string')
		.duration(80)
		.EUt(4)
	*/

	// Prismatic Spray Can

	// [PORT] tfg:chemical_prismatic_dye зарегистрирован в tfg.core.items.js — рецепт активен.
	event.recipes.gtceu.assembler('tfg:chemical_prismatic_die')
		.itemInputs(
			Item.of('gtceu:chemical_red_dye',16),
			Item.of('gtceu:chemical_yellow_dye',16),
			Item.of('gtceu:chemical_green_dye',16),
			Item.of('gtceu:chemical_blue_dye',16),
			Item.of('gtceu:chemical_brown_dye', 16),
			Item.of('gtceu:chemical_white_dye', 16),
			Item.of('gtceu:chemical_black_dye', 16),
			Item.of('minecraft:glow_ink_sac',16)
			)
		.itemOutputs('tfg:chemical_prismatic_dye')
		.duration(20*15)
		.EUt(GTValues.VA[GTValues.MV])

	// [PORT-Ф4-TODO] Флюид tfg:prismatic_paint не зарегистрирован в tfg.core.fluids.js.
	/*
	event.recipes.gtceu.extractor('tfg:chemical_prismatic_fluid')
		.itemInputs(Item.of('tfg:chemical_prismatic_dye', 1))
		.outputFluids(Fluid.of('tfg:prismatic_paint', 1000))
		.duration(20*30)
		.EUt(GTValues.VA[GTValues.MV])
	*/

	// [PORT-CHECK] Выход с NBT ('{Fluid:...}') — в 1.21 NBT заменён data components; рецепт нужно переписать.
	// [PORT-Ф4-TODO] tfg:chameleon_spray_can не зарегистрирован.
	/*
	event.recipes.gtceu.assembler('tfg:chemical_prismatic_spraycan')
	.itemInputs(
		Item.of('gtceu:empty_spray_can', 1),
		Item.of('gtceu:solvent_spray_can', 1),
		Item.of('gtceu:double_vanadium_steel_plate', 1)
	)
	.itemOutputs(
		Item.of('tfg:chameleon_spray_can', 1, '{Fluid:{Amount:0,FluidName:"tfg:prismatic_paint"},color:-1}')
	)
	.duration(20 * 30)
	.EUt(GTValues.VA[GTValues.MV])
	*/

})
