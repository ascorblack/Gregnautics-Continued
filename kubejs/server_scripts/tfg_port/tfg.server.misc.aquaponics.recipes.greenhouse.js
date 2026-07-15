// priority: 1
"use strict";

// [PORT] Порт tfg/aquaponics/recipes.greenhouse.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT-Ф2] ВЕСЬ ФАЙЛ ОТКЛЮЧЁН: типы рецептов gtceu:greenhouse и gtceu:hydroponics_facility — машины TFG-Core;
// регистрация GT-машин/материалов TFG заблокирована (05_startup.dispatch.js.disabled, апстрим-баг GTM8,
// registerGTCEuMachines не портирован). Предметы контроллеров/частей (tfg:hydroponics_facility,
// tfg:cultivation_monitor, tfg:grow_light, tfg:egh_planter, tfg:machine_casing_*, tfg:casings/machine_casing_egh)
// тоже не зарегистрированы. TFGRecipeSchemaBindings (isOxygenated) — Java-биндинг TFG-Core, отсутствует.
// [PORT-Ф10] Рецепты для ad_astra:moon / ad_astra:mars / космодревесины — космоконтент (stellaris не авто-ремапим).
// [PORT-FIX] Заметки на будущее включение:
//  - .notConsumable(строка) в GTM8 не существует -> .notConsumableItem(...);
//  - операторы ?. и ?? в хелперах переписать на явные проверки (Rhino/esprima);
//  - beneath / betterend / species / wan_ancient_beasts отсутствуют — их ветки вырезать;
//  - стоункаттинг кейсингов: в 1.21-порте каждый тег tfg:<tier>_greenhouse_casings содержит РОВНО ОДИН предмет
//    (00_tfg_compat.tags.js), Ingredient.subtract(item) даёт ПУСТОЙ ингредиент -> краш сериализации. Включать
//    только когда в тегах появится >1 предмета на тир.
// Константы длительностей/шансов использует и recipes.pisciculture (в KubeJS 7 скоупы файлов изолированы —
// у pisciculture-порта свои копии).

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.misc aquaponics greenhouse recipes start')

	// [PORT-Ф2] --- начало отключённого блока (оригинал сохранён без изменений) ---

	///////////////////////////////////////////////////////////////////////////////////////////////////////
	//#region Balancing Values

	// /** Base duration of recipes in ticks. */
	// const greenhouse_base_duration = 10 * 60 * 20;
	// /** Duration multiplier for fertilized recipes. */
	// const greenhouse_duration_multiplier_fertilized = 0.75;
	// /** Duration multiplier for aquaponic recipes. */
	// const greenhouse_duration_multiplier_aquaponics = 0.5;

	// /** Hydroponic facility chance multiplier. */
	// const hydroponics_facility_chance_multiplier = 1.25;
	// /** Base percent chance for chanced outputs (out of 100). */
	// const greenhouse_chanced_output_base = 7.5;
	// /** Fertilized percent chance for chanced outputs (out of 100). */
	// const greenhouse_chanced_output_fertilized = 40;
	// /** Aquaponics percent chance for chanced outputs (out of 100). */
	// const greenhouse_chanced_output_aquaponics = 80;

	// Dimension setting index provides recipe modifications based on the dimension assigned.
	// [PORT-Ф10] ad_astra-измерения; [PORT-Ф2] tfg:nitrate_rich_water / tfg:semiheavy_ammoniacal_water не зарегистрированы
	// const greenhouse_dimension_index = [
	// 	// Overworld settings are also used as the default when no dimension is specified.
	// 	{id: 'minecraft:overworld', fluid: '#tfg:clean_water', fluid_tier2: 'tfg:nitrate_rich_water', fluid_chance: 10, fertilizer: 'gtceu:fertilizer', eut: GTValues.VHA[GTValues.LV], oxygenated: true},
	// 	{id: 'minecraft:the_nether', fluid: '#tfg:clean_water', fluid_tier2: 'tfg:nitrate_rich_water', fluid_chance: 10, fertilizer: 'gtceu:fertilizer', eut: GTValues.VHA[GTValues.LV], oxygenated: true},
	// 	{id: 'ad_astra:moon', fluid: 'gtceu:helium_3', fluid_tier2: null, fluid_chance: 2, fertilizer: null, eut: GTValues.VHA[GTValues.MV], oxygenated: null},
	// 	{id: 'ad_astra:mars', fluid: 'tfg:semiheavy_ammoniacal_water', fluid_tier2: 'tfg:nitrate_rich_semiheavy_ammoniacal_water', fluid_chance: 10, fertilizer: 'gtceu:fertilizer', eut: GTValues.VHA[GTValues.HV], oxygenated: null}
	// ];

	//#endregion
	///////////////////////////////////////////////////////////////////////////////////////////////////////

	//#region Utility Script

	// Function for generating greenhouse recipes.
	// (event, dimension, input, output, chance_multiplier, circuit)
	// [PORT-Ф2] Хелпер generateGreenHouseRecipe целиком отключён вместе с телом файла: строит рецепты
	// event.recipes.gtceu.greenhouse(...) / event.recipes.gtceu.hydroponics_facility(...) с
	// .notConsumable(input) [-> .notConsumableItem], .perTick(true).chancedFluidInput(...), .dimension(...),
	// TFGRecipeSchemaBindings.isOxygenated(...), .chancedOutput(...), .circuit(...), плюс выход 'tfg:flora_pellets'
	// в аквапонных вариантах. Полный текст — в оригинале:
	// orig_kubejs/overrides/kubejs/server_scripts/tfg/aquaponics/recipes.greenhouse.js (строки 49-369).

	// Function for generating standard crop greenhouse recipes.
	// Uses the following defaults: 4x seed inputs, 20x crop output, 1x seed chanced output, 4x crop chanced output
	// function generateCropGreenHouseRecipe(event, dimension, input, output, leaves, chance_multiplier) {
	// 	generateGreenHouseRecipe(event, dimension, `4x ${input}`, [Item.of(output, 20), Item.of(input, 1), Item.of(output, 4)], chance_multiplier, 1);
	// 	generateGreenHouseRecipe(event, dimension, `4x ${input}`, [Item.of(output, 20), Item.of(input, 8), Item.of(input, 4)], chance_multiplier, 5);
	// 	if (leaves !== null && leaves !== undefined) {
	// 		generateGreenHouseRecipe(event, dimension, `4x ${input}`, [Item.of(output, 20), Item.of(leaves, 16), Item.of(leaves, 8)], chance_multiplier, 10);
	// 	};
	// };

	// Function for generating standard tree greenhouse recipes.
	// Uses the following defaults: 8x sapling inputs, 64x wood output, 4x sapling chanced output, 16x wood chanced output
	// function generateTreeGreenHouseRecipe(event, dimension, input, output, leaves, chance_multiplier) {
	// 	generateGreenHouseRecipe(event, dimension, `8x ${input}`, [Item.of(output, 64), Item.of(input, 4), Item.of(output, 16)], chance_multiplier, 1);
	// 	generateGreenHouseRecipe(event, dimension, `8x ${input}`, [Item.of(output, 64), Item.of(input, 16), Item.of(input, 8)], chance_multiplier, 5);
	// 	if (leaves !== null && leaves !== undefined) {
	// 		generateGreenHouseRecipe(event, dimension, `8x ${input}`, [Item.of(output, 64), Item.of(leaves, 32), Item.of(leaves, 16)], chance_multiplier, 10);
	// 	};
	// };

	//#endregion
	// Recipes

	//#region Multiblock Parts

	// [PORT-FIX] Стоункаттинг между кейсингами одного тира отключён отдельно от Ф2: в 1.21-порте каждый тег
	// tfg:<tier>_greenhouse_casings содержит один предмет, subtract(item) даёт пустой ингредиент (краш).
	// /** @type {string[]} - Tier names of greenhouse casings. */
	// const greenhouse_tiers = ['treated_wood', 'copper', 'iron', 'stainless_steel'];
	// greenhouse_tiers.forEach(tier => {
	// 	const tier_tag = Ingredient.of(`#tfg:${tier}_greenhouse_casings`).itemIds.toArray().map(String);
	// 	tier_tag.forEach(item => {
	// 		event.stonecutting(item,
	// 			Ingredient.of(`#tfg:${tier}_greenhouse_casings`).subtract(item)
	// 		).id(`tfg:stonecutter/${global.linuxUnfucker(item)}`)
	// 	});
	// });

	// // Cultivation Monitor
	// // [PORT-FIX] #forge:lenses/emerald -> #c:lenses/emerald (при включении)
	// event.recipes.gtceu.shaped('tfg:cultivation_monitor', [
	// 	'CEC',
	// 	'DBD',
	// 	'CAC'
	// ], {
	// 	A: 'gtceu:ev_scanner',
	// 	B: 'gtceu:computer_monitor_cover',
	// 	C: ChemicalHelper.get(TagPrefix.plateDense, GTMaterials.TungstenSteel, 1),
	// 	D: '#gtceu:circuits/luv',
	// 	E: '#c:lenses/emerald'
	// }).addMaterialInfo().id('tfg:shaped/cultivation_monitor');

	// // Hydroponics Facility Controller
	// event.recipes.gtceu.shaped('tfg:hydroponics_facility', [
	// 	'FBF',
	// 	'EAE',
	// 	'CDC'
	// ], {
	// 	A: 'gtceu:iv_machine_hull',
	// 	B: 'tfg:cultivation_monitor',
	// 	C: '#gtceu:circuits/iv',
	// 	D: 'gtceu:platinum_single_cable',
	// 	E: 'gtceu:iv_electric_pump',
	// 	F: 'tfg:grow_light'
	// }).addMaterialInfo().id('tfg:shaped/hydroponics_facility');

	// // Grow Lights
	// event.recipes.gtceu.shaped('2x tfg:grow_light', [
	// 	'ABA',
	// 	'CDC'
	// ], {
	// 	A: ChemicalHelper.get(TagPrefix.plate, GTMaterials.TinAlloy, 1),
	// 	B: 'gtceu:annealed_copper_single_cable',
	// 	C: 'minecraft:glowstone',
	// 	D: 'gtceu:tin_alloy_small_fluid_pipe'
	// }).addMaterialInfo().id('tfg:shaped/grow_light');

	// // Horticulture Planters
	// event.recipes.gtceu.shaped('tfg:egh_planter', [
	// 	'BAB',
	// 	'BDB',
	// 	'CCC'
	// ], {
	// 	A: 'firmalife:hydroponic_planter',
	// 	B: ChemicalHelper.get(TagPrefix.plate, GTMaterials.TungstenSteel, 1),
	// 	C: 'tfg:grow_light',
	// 	D: 'gtceu:iv_hermetic_casing'
	// }).addMaterialInfo().id('tfg:shaped/egh_planter');

	// // Horticulture Casings
	// // TODO: Venus; swap the frame to calorite.
	// // [PORT-Ф2] tfg:chloroplasts / #forge:frames/ostrum (-> #c:frames/ostrum) — TFG/космо-материалы
	// event.recipes.gtceu.assembler('tfg:casings/machine_casing_egh')
	// 	.itemInputs('gtceu:plascrete', '#c:frames/ostrum')
	// 	.inputFluids(Fluid.of('tfg:chloroplasts', 100))
	// 	.itemOutputs('2x tfg:casings/machine_casing_egh')
	// 	.duration(8*20)
	// 	.circuit(6)
	// 	.EUt(GTValues.VA[GTValues.EV])
	// 	.addMaterialInfo(true);

	//#endregion

	//#region Recipes

	// // Mushrooms
	// // [PORT] beneath отсутствует — тег #tfg:plants/beneath не наполнен
	// Ingredient.of('#tfg:plants/beneath').stacks.forEach(element => {
	// 	generateGreenHouseRecipe(event, 'minecraft:the_nether', `8x ${element.id}`, [element.withCount(24), element.withCount(8)], 1, 1);
	// });

	// // Crops
	// global.FIRMALIFE_GREENHOUSE_FRUIT_RECIPE_COMPONENTS.forEach(element => {
	// 	generateCropGreenHouseRecipe(event, null, element.input, element.output, element.leaves, 1);
	// });

	// global.TFC_GREENHOUSE_FRUIT_RECIPE_COMPONENTS.forEach(element => {
	// 	generateCropGreenHouseRecipe(event, null, element.input, element.output, element.leaves, 1);
	// });
	// global.TFC_GREENHOUSE_VEGETABLE_RECIPE_COMPONENTS.forEach(element => {
	// 	generateCropGreenHouseRecipe(event, null, element.input, element.output, null, 1);
	// });
	// global.TFC_GREENHOUSE_BERRY_RECIPE_COMPONENTS.forEach(element => {
	// 	generateCropGreenHouseRecipe(event, null, element.input, element.output, null, 1);
	// });

	// // Wood
	// global.TFC_WOOD_TYPES.forEach(element => {
	// 	generateTreeGreenHouseRecipe(event, null, `tfc:wood/sapling/${element}`, `tfc:wood/log/${element}`, `tfc:wood/leaves/${element}`, 1);
	// });
	// global.AFC_SAPLINGS.forEach(element => {
	// 	generateTreeGreenHouseRecipe(event, null, `afc:wood/sapling/${element.sapling}`, element.log, `afc:wood/leaves/${element.sapling}`, 1);
	// });
	// // [PORT] wan_ancient_beasts отсутствует — цикл WAB_WOOD вырезан
	// // global.WAB_WOOD.forEach(element => {
	// // 	generateTreeGreenHouseRecipe(event, null, `tfg:wood/sapling/${element.name}`, `wan_ancient_beasts:${element.name}_log`, `tfg:wood/leaves/${element.name}`, 1);
	// // });
	// global.TFG_NEW_WOOD_TYPES.forEach(element => {
	// 	generateTreeGreenHouseRecipe(event, null, `tfg:wood/sapling/${element.name}`, `tfg:wood/log/${element.name}`, `tfg:wood/leaves/${element.name}`, 1);
	// });

	// // Plants
	// Ingredient.of('#tfc:plants').subtract('#tfc:wild_fruits').stacks.forEach(element => {
	// 	generateGreenHouseRecipe(event, null, `8x ${element.id}`, [element.withCount(24), element.withCount(8)], 1, 1);
	// });

	// const CORALS = [ 'tube', 'brain', 'bubble', 'fire', 'horn' ];
	// CORALS.forEach(coral => {
	// 	generateGreenHouseRecipe(event, null, `8x minecraft:${coral}_coral_block`, [`24x minecraft:${coral}_coral_block`, `8x tfc:coral/${coral}_coral`, `8x tfc:coral/${coral}_coral_fan`], 1, 1);
	// 	generateGreenHouseRecipe(event, null, `8x tfc:coral/${coral}_coral`, [`24x tfc:coral/${coral}_coral`, `8x minecraft:${coral}_coral_block`, `8x tfc:coral/${coral}_coral_fan`], 1, 1);
	// 	generateGreenHouseRecipe(event, null, `8x tfc:coral/${coral}_coral_fan`, [`24x tfc:coral/${coral}_coral_fan`, `8x minecraft:${coral}_coral_block`, `8x tfc:coral/${coral}_coral`], 1, 1);
	// })

	// generateGreenHouseRecipe(event, null, '8x minecraft:bamboo', ['64x minecraft:bamboo', '8x minecraft:bamboo'], 1, 1);

	// generateGreenHouseRecipe(event, null, '8x tfc:tree_roots', ['64x tfc:tree_roots', '8x tfc:tree_roots'], 1, 1);

	// generateGreenHouseRecipe(event, null, '8x tfc:food/fresh_seaweed', ['24x tfc:food/fresh_seaweed', '8x tfc:food/fresh_seaweed'], 1, 1);

	// generateGreenHouseRecipe(event, 'minecraft:the_nether', '4x minecraft:glow_berries', ['20x minecraft:glow_berries', '4x minecraft:glow_berries'], 1, 1);

	// [PORT-Ф10] Mars Wood / Mars Plants / Moon Plants — ad_astra/betterend/species/beneath-контент, вырезан:
	// generateTreeGreenHouseRecipe(event, 'ad_astra:mars', `tfg:saplings/strophar`, `ad_astra:strophar_stem`, `ad_astra:strophar_cap`, 1);
	// generateTreeGreenHouseRecipe(event, 'ad_astra:mars', `tfg:saplings/aeronos`, `ad_astra:aeronos_stem`, `ad_astra:aeronos_cap`, 1);
	// generateTreeGreenHouseRecipe(event, 'ad_astra:mars', `tfg:saplings/glacian`, `ad_astra:glacian_log`, `species:alphacene_moss_block`, 1);
	// generateTreeGreenHouseRecipe(event, 'ad_astra:mars', `tfg:saplings/alphacene`, `species:alphacene_mushroom_block`, `minecraft:mushroom_stem`, 1);
	// generateTreeGreenHouseRecipe(event, 'ad_astra:mars', `tfg:saplings/warped`, `beneath:wood/log/warped`, `minecraft:warped_wart_block`, 1);
	// generateTreeGreenHouseRecipe(event, 'ad_astra:mars', `tfg:saplings/crimson`, `beneath:wood/log/crimson`, `minecraft:nether_wart_block`, 1);
	// Ingredient.of('#tfg:mars_plants').stacks.forEach(element => {
	// 	generateGreenHouseRecipe(event, 'ad_astra:mars', `8x ${element.id}`, [element.withCount(24), element.withCount(8)], 1, 1);
	// });
	// generateCropGreenHouseRecipe(event, 'ad_astra:mars', 'betterend:amber_root_seeds', 'betterend:amber_root_product', null, 1);
	// generateCropGreenHouseRecipe(event, 'ad_astra:mars', 'betterend:blossom_berry_seeds', 'betterend:blossom_berry_product', null, 1);
	// generateCropGreenHouseRecipe(event, 'ad_astra:mars', 'betterend:bolux_mushroom_seeds', 'betterend:bolux_mushroom_product', null, 1);
	// generateCropGreenHouseRecipe(event, 'ad_astra:mars', 'betterend:cave_pumpkin_plant_seeds', 'betterend:cave_pumpkin', null, 1);
	// generateCropGreenHouseRecipe(event, 'ad_astra:mars', 'betterend:chorus_mushroom_seeds', 'betterend:chorus_mushroom_product', null, 1);
	// generateCropGreenHouseRecipe(event, 'ad_astra:mars', 'betterend:shadow_berry_seeds', 'betterend:shadow_berry_product', null, 1);
	// generateGreenHouseRecipe(event, 'ad_astra:moon', '16x tfg:lunar_chorus_flower', [
	// 	'64x minecraft:chorus_fruit', '8x minecraft:chorus_fruit', '4x tfg:lunar_chorus_flower', '4x tfg:lunar_chorus_flower'
	// ], 1, 1);
	// generateGreenHouseRecipe(event, 'ad_astra:moon', '8x minecraft:twisting_vines', [
	// 	'16x minecraft:twisting_vines', '8x minecraft:pearlescent_froglight', '8x minecraft:verdant_froglight', '8x minecraft:ochre_froglight'
	// ], 1, 1);
	// Ingredient.of('#tfg:moon_plants').stacks.forEach(element => {
	// 	generateGreenHouseRecipe(event, 'ad_astra:moon', `8x ${element.id}`, [element.withCount(24), element.withCount(8)], 1, 1);
	// });

	// // Custom
	// generateGreenHouseRecipe(event, null, '4x tfc:plant/cherry_sapling', ['16x minecraft:cherry_leaves', '8x minecraft:cherry_leaves'], 1, 20);

	//#endregion

	// [PORT-Ф2] --- конец отключённого блока ---
})
