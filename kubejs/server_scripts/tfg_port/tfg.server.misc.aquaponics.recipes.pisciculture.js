// priority: 0
"use strict";

// [PORT] Порт tfg/aquaponics/recipes.pisciculture.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT-Ф2] ВЕСЬ ФАЙЛ ОТКЛЮЧЁН: тип рецептов gtceu:pisciculture_fishery — машина TFG-Core; регистрация
// GT-машин/материалов TFG заблокирована (05_startup.dispatch.js.disabled, registerGTCEuMachines не портирован).
// Не зарегистрированы также: предметы tfg:pisciculture_fishery, tfg:pisciculture_core,
// tfg:machine_casing_aluminium_plated_steel, tfg:fish_roe (Ф4); жидкости tfg:nitrate_rich_water,
// tfg:nitrate_rich_semiheavy_ammoniacal_water, tfg:semiheavy_ammoniacal_water (материалы Ф2);
// TFGRecipeSchemaBindings (isOxygenated) — Java-биндинг TFG-Core, отсутствует.
// [PORT-FIX] Заметки на будущее включение:
//  - операторы ?. / ?? в хелпере переписать на явные проверки (Rhino/esprima);
//  - Item.of(..., {"mob_type": ...}).strongNBT() — 1.21 без NBT: переписать на data components ([PORT-CHECK]);
//  - константы greenhouse_base_duration/… в KubeJS 7 не видны из соседнего файла — определены здесь локально.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.misc aquaponics pisciculture recipes start')

	// [PORT-Ф2] --- начало отключённого блока (оригинал сохранён без изменений) ---

	///////////////////////////////////////////////////////////////////////////////////////////////////////
	//#region Balancing Values

	// [PORT] копии констант из recipes.greenhouse (изолированные скоупы KubeJS 7)
	// const greenhouse_base_duration = 10 * 60 * 20;
	// const greenhouse_duration_multiplier_aquaponics = 0.5;
	// /**
	//  * Base duration of recipes in ticks.
	//  * * Should match the Greenhouse base duration * aquaponics multiplier.
	// */
	// const pisciculture_base_duration = Math.max(1, greenhouse_base_duration * greenhouse_duration_multiplier_aquaponics);

	// Dimension setting index provides recipe modifications based on the dimension assigned.
	// [PORT-Ф10] ad_astra:mars; [PORT-Ф2] tfg:*-жидкости не зарегистрированы
	// const pisciculture_dimension_index = [
	// 	// Overworld settings are also used as the default when no dimension is specified.
	// 	{id: 'minecraft:overworld', fluid: '#tfg:clean_water', fluid_chance: 10, fluid_out: 'tfg:nitrate_rich_water', eut: GTValues.VHA[GTValues.LV], oxygenated: true},
	// 	{id: 'minecraft:the_nether', fluid: '#tfg:clean_water', fluid_chance: 10, fluid_out: 'tfg:nitrate_rich_water', eut: GTValues.VHA[GTValues.LV], oxygenated: true},
	// 	// The moon has no fish yet :(
	// 	{id: 'ad_astra:mars', fluid: 'tfg:semiheavy_ammoniacal_water', fluid_chance: 10, fluid_out: 'tfg:nitrate_rich_semiheavy_ammoniacal_water', eut: GTValues.VHA[GTValues.HV], oxygenated: null}
	// ];

	//#endregion
	///////////////////////////////////////////////////////////////////////////////////////////////////////

	//#region Utility Script

	// Function for generating pisciculture recipes: (event, dimension, input, output, id)
	// [PORT-Ф2] Хелпер generatePiscicultureRecipe отключён вместе с телом файла: строит
	// event.recipes.gtceu.pisciculture_fishery(`tfg:${id}`).itemInputs(...).perTick(true)
	// .chancedFluidInput/.chancedFluidOutput(...).perTick(false).itemOutputs(...).duration(...).EUt(...)
	// с .dimension(...) и TFGRecipeSchemaBindings.isOxygenated(...). Полный текст — в оригинале:
	// orig_kubejs/overrides/kubejs/server_scripts/tfg/aquaponics/recipes.pisciculture.js (строки 39-104).

	//#endregion

	//#region Multiblock Parts

	// // Pisciculture Fishery Controller
	// event.recipes.gtceu.shaped('tfg:pisciculture_fishery', [
	// 	'FBF',
	// 	'EAE',
	// 	'CDC'
	// ], {
	// 	A: 'gtceu:hv_machine_hull',
	// 	B: 'tfg:machine_casing_aluminium_plated_steel',
	// 	C: '#gtceu:circuits/ev',
	// 	D: 'gtceu:stainless_steel_small_fluid_pipe',
	// 	E: 'gtceu:hv_electric_pump',
	// 	F: 'gtceu:fluid_filter'
	// }).addMaterialInfo().id('tfg:shaped/pisciculture_fishery');

	// // Pisciculture Core
	// event.recipes.gtceu.shaped('tfg:pisciculture_core', [
	// 	'CBC',
	// 	'DBD',
	// 	'CAC'
	// ], {
	// 	A: 'gtceu:hv_rotor_holder',
	// 	B: 'gtceu:stainless_steel_rotor',
	// 	C: 'gtceu:inert_machine_casing',
	// 	D: ChemicalHelper.get(TagPrefix.ring, GTMaterials.PolyvinylChloride, 1)
	// }).addMaterialInfo().id('tfg:shaped/pisciculture_core');

	//#endregion
	//#region Recipes

	// [PORT-CHECK] При включении: Item.of('tfg:fish_roe', {"mob_type": fish.id}).strongNBT() -> data components (1.21)
	// global.FISH_INDEX.forEach(fish => {

	// 	// Bucket to Roe.
	// 	if (fish.parent !== null && fish.parent.includes('bucket')) {
	// 		generatePiscicultureRecipe(event,
	// 			fish.dimension, [
	// 				fish.parent,
	// 				fish.parent,
	// 				'6x #tfc:small_fishing_bait'
	// 			], [
	// 				`6x ${fish.item}`,
	// 				Item.of(`3x tfg:fish_roe`, {"mob_type": fish.id}).strongNBT(),
	// 				'2x minecraft:bucket'
	// 			],
	// 			`${global.linuxUnfucker(fish.id)}/basic_food/bucket_to_roe`
	// 		);

	// 		generatePiscicultureRecipe(event,
	// 			fish.dimension, [
	// 				fish.parent,
	// 				fish.parent,
	// 				'2x #tfg:advanced_fish_food'
	// 			], [
	// 				`12x ${fish.item}`,
	// 				Item.of(`4x tfg:fish_roe`, {"mob_type": fish.id}).strongNBT(),
	// 				'2x minecraft:bucket'
	// 			],
	// 			`${global.linuxUnfucker(fish.id)}/advanced_food/bucket_to_roe`
	// 		);
	// 	} else {
	// 		generatePiscicultureRecipe(event,
	// 			fish.dimension, [
	// 				fish.parent,
	// 				fish.parent,
	// 				'6x #tfc:small_fishing_bait'
	// 			], [
	// 				`6x ${fish.item}`,
	// 				Item.of(`3x tfg:fish_roe`, {"mob_type": fish.id}).strongNBT()
	// 			],
	// 			`${global.linuxUnfucker(fish.id)}/basic_food/parent_to_roe`
	// 		);

	// 		generatePiscicultureRecipe(event,
	// 			fish.dimension, [
	// 				fish.parent,
	// 				fish.parent,
	// 				'2x #tfg:advanced_fish_food'
	// 			], [
	// 				`12x ${fish.item}`,
	// 				Item.of(`4x tfg:fish_roe`, {"mob_type": fish.id}).strongNBT()
	// 			],
	// 			`${global.linuxUnfucker(fish.id)}/advanced_food/parent_to_roe`
	// 		);
	// 	};

	// 	// Roe to Roe.
	// 	generatePiscicultureRecipe(event,
	// 		fish.dimension, [
	// 			Item.of(`tfg:fish_roe`, {"mob_type": fish.id}).strongNBT(),
	// 			Item.of(`tfg:fish_roe`, {"mob_type": fish.id}).strongNBT(),
	// 			'6x #tfc:small_fishing_bait'
	// 		], [
	// 			`10x ${fish.item}`,
	// 			Item.of(`4x tfg:fish_roe`, {"mob_type": fish.id}).strongNBT()
	// 		],
	// 		`${global.linuxUnfucker(fish.id)}/basic_food/roe_to_roe`
	// 	);

	// 	generatePiscicultureRecipe(event,
	// 		fish.dimension, [
	// 			Item.of(`tfg:fish_roe`, {"mob_type": fish.id}).strongNBT(),
	// 			Item.of(`tfg:fish_roe`, {"mob_type": fish.id}).strongNBT(),
	// 			'2x #tfg:advanced_fish_food'
	// 		], [
	// 			`24x ${fish.item}`,
	// 			Item.of(`5x tfg:fish_roe`, {"mob_type": fish.id}).strongNBT()
	// 		],
	// 		`${global.linuxUnfucker(fish.id)}/advanced_food/roe_to_roe`
	// 	);

	// });

	//#endregion
	//#region Related Recipes

	// // Nitrate Rich Water Filtering
	// // [PORT-Ф2] жидкость tfg:nitrate_rich_water не зарегистрирована
	// event.recipes.gtceu.electrolyzer('tfg:nitrate_rich_water_filtering')
	// 	.inputFluids(Fluid.of('tfg:nitrate_rich_water', 10000))
	// 	.outputFluids(
	// 		Fluid.of('minecraft:water', 8000),
	// 		Fluid.of('gtceu:ammonia', 1000)
	// 	)
	// 	.itemOutputs(ChemicalHelper.get(TagPrefix.dust, GTMaterials.Saltpeter, 1))
	// 	.duration(20 * 5)
	// 	.EUt(GTValues.VA[GTValues.HV]);

	// // Nitrate Rich Semiheavy Ammoniacal Water Filtering
	// // [PORT-Ф2] жидкости tfg:nitrate_rich_semiheavy_ammoniacal_water / tfg:semiheavy_ammoniacal_water не зарегистрированы
	// event.recipes.gtceu.electrolyzer('tfg:nitrate_rich_semiheavy_ammoniacal_water_filtering')
	// 	.inputFluids(Fluid.of('tfg:nitrate_rich_semiheavy_ammoniacal_water', 10000))
	// 	.outputFluids(
	// 		Fluid.of('tfg:semiheavy_ammoniacal_water', 8000),
	// 		Fluid.of('gtceu:ammonia', 1000)
	// 	)
	// 	.itemOutputs(ChemicalHelper.get(TagPrefix.dust, GTMaterials.Saltpeter, 1))
	// 	.duration(20 * 5)
	// 	.EUt(GTValues.VA[GTValues.HV]);

	//#endregion

	// [PORT-Ф2] --- конец отключённого блока ---
})
