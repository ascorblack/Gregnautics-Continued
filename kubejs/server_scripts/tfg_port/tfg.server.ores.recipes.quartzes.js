// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/ores_and_materials/recipes.quartzes.js (registerTFGQuartzRecipes).
// [PORT] forge:sand -> c:sands; forge:glass -> c:glass_blocks; forge:glass_panes -> c:glass_panes;
//        forge:dusts/* -> c:dusts/*.
// [PORT-Ф2] Rose Quartz — GT-материал мода Greate (greate отсутствует; наш create.materials.js — Фаза 2):
//           gtceu:rose_quartz_dust не зарегистрирован, весь регион закомментирован.
// [PORT-Ф2] Лампы (#tfg:unfinished_lamps — предметы TFG tag prefix'а lamp) — Фаза 2.
// [PORT-Ф4-TODO] tfg:lamp_casting_mold не зарегистрирован (jar_alloying / jar_alloying_dust).

/** [PORT-FIX] локальная копия хелпера (KubeJS 7: файлы изолированы); greate-строки удалены */
function tfgOresQuartzRemoveMaceratorRecipe(event, id) {
	event.remove({ id: `gtceu:macerator/${id}` })
}

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.ores.recipes.quartzes start')

	//#region Rose Quartz fabrication + decomposition
	// [PORT-Ф2] Материал rose_quartz (Greate) не зарегистрирован в GTM8-сборке — регион закомментирован:
	// event.remove({ id: 'gtceu:autoclave/autoclave_dust_rose_quartz_water' })
	// event.remove({ id: 'gtceu:autoclave/autoclave_dust_rose_quartz_distilled' })
	//
	// generateMixerRecipe(event, ['gtceu:nether_quartz_dust', '8x minecraft:redstone'], [], '9x #forge:dusts/rose_quartz', 2, [], 180, 60, 64, 'rose_quartz_dust_mixing')
	// generateMixerRecipe(event, ['gtceu:tiny_nether_quartz_dust', '8x gtceu:tiny_redstone_dust'], [], '#forge:dusts/rose_quartz', 2, [], 20, 60, 64, 'tiny_rose_quartz_dust_mixing')
	//
	// event.recipes.gtceu.autoclave("autoclave_dust_rose_quartz_ice")
	// 	.itemInputs('#forge:dusts/rose_quartz')
	// 	.notConsumable('#forge:gems/rose_quartz')
	// 	.inputFluids(Fluid.of("gtceu:ice", 144))
	// 	.itemOutputs("#forge:gems/rose_quartz")
	// 	.duration(30 * 20)
	// 	.EUt(120)
	//
	// event.recipes.gtceu.electrolyzer('electrolyze_rose_quartz_dust')
	// 	.itemInputs('9x #forge:dusts/rose_quartz')
	// 	.itemOutputs('1x #forge:dusts/nether_quartz', '8x minecraft:redstone')
	// 	.duration(7 * 20)
	// 	.EUt(60)
	//#endregion

	//#region Glass

	event.recipes.gtceu.arc_furnace('glass_from_sand')
		.itemInputs('#c:sands')
		.itemOutputs('2x minecraft:glass')
		.duration(20)
		.EUt(30)

	const TFC_BATCH_TO_BOTTLE_ASSEMBLING_RECIPE_COMPONENTS = /** @type {const} */ ([
		{ input: "tfc:silica_glass_batch", output: "tfc:silica_glass_bottle", name: "silica_glass_bottle" },
		{ input: "tfc:hematitic_glass_batch", output: "tfc:hematitic_glass_bottle", name: "hematitic_glass_bottle" },
		{ input: "tfc:olivine_glass_batch", output: "tfc:olivine_glass_bottle", name: "olivine_glass_bottle" },
		{ input: "tfc:volcanic_glass_batch", output: "tfc:volcanic_glass_bottle", name: "volcanic_glass_bottle" },
		{ input: '#c:dusts/glass', output: "tfc:silica_glass_bottle", name: "glass_dust_to_bottle" }
	]);

	TFC_BATCH_TO_BOTTLE_ASSEMBLING_RECIPE_COMPONENTS.forEach(element => {
		event.recipes.gtceu.alloy_smelter(`tfg:${element.name}`)
			.itemInputs(element.input)
			.notConsumableItem('gtceu:bottle_casting_mold')
			.itemOutputs(element.output)
			.duration(100)
			.EUt(2)
			.category(GTRecipeCategories.INGOT_MOLDING)
	})

	// Lamp Glass
	// [PORT-Ф2] #tfg:unfinished_lamps — предметы TFG tag prefix'а lampUnfinished (Фаза 2), рецепты закомментированы:
	// event.recipes.gtceu.alloy_smelter(`tfg:tfc/lamp_glass`)
	// 	.itemInputs('#tfc:glass_batches')
	// 	.notConsumable('#tfg:unfinished_lamps')
	// 	.itemOutputs('4x tfc:lamp_glass')
	// 	.duration(100)
	// 	.EUt(2)
	// 	.category(GTRecipeCategories.INGOT_MOLDING)
	//
	// event.recipes.gtceu.alloy_smelter(`tfg:tfc/lamp_glass_from_dust`)
	// 	.itemInputs('#forge:dusts/glass')
	// 	.notConsumable('#tfg:unfinished_lamps')
	// 	.itemOutputs('4x tfc:lamp_glass')
	// 	.duration(100)
	// 	.EUt(2)
	// 	.category(GTRecipeCategories.INGOT_MOLDING)

	// Empty Jar
	// [PORT-Ф4-TODO] tfg:lamp_casting_mold не зарегистрирован — рецепты через него закомментированы:
	// event.recipes.gtceu.alloy_smelter('tfg:jar_alloying')
	// 	.itemInputs('#tfc:glass_batches_tier_2')
	// 	.notConsumable('tfg:lamp_casting_mold')
	// 	.itemOutputs('tfc:empty_jar')
	// 	.duration(100)
	// 	.EUt(2)
	// 	.category(GTRecipeCategories.INGOT_MOLDING)
	//
	// event.recipes.gtceu.alloy_smelter('tfg:jar_alloying_dust')
	// 	.itemInputs('#forge:dusts/glass')
	// 	.notConsumable('tfg:lamp_casting_mold')
	// 	.itemOutputs('tfc:empty_jar')
	// 	.duration(100)
	// 	.EUt(2)
	// 	.category(GTRecipeCategories.INGOT_MOLDING)

	event.recipes.gtceu.fluid_solidifier('tfg:jar_solidification')
		.inputFluids(Fluid.of('gtceu:glass', 144))
		.notConsumableItem('gtceu:cylinder_casting_mold')
		.itemOutputs('tfc:empty_jar')
		.duration(100)
		.EUt(2)

	event.recipes.gtceu.extractor('tfg:jar_extraction')
		.itemInputs('#tfc:jars')
		.outputFluids(Fluid.of('gtceu:glass', 144))
		.duration(50)
		.EUt(2)

	// Extracting
	event.recipes.gtceu.extractor('tfg:glass_batch_extraction')
		.itemInputs('#tfc:glass_batches')
		.outputFluids(Fluid.of('gtceu:glass', 144))
		.duration(50)
		.EUt(2)

	// TFC lens
	event.recipes.gtceu.lathe('tfg:tfc_lens')
		.itemInputs('#c:glass_blocks')
		.itemOutputs('tfc:lens')
		.duration(100)
		.EUt(16)

	// Add all glass colors to macerator/hammer
	tfgOresQuartzRemoveMaceratorRecipe(event, 'macerate_glass');
	event.recipes.gtceu.macerator("gtceu:macerator/macerate_glass")
		.itemInputs(
			"#c:glass_blocks"
		)
		.itemOutputs("gtceu:glass_dust")
		.duration(20)
		.EUt(2);

	tfgOresQuartzRemoveMaceratorRecipe(event, 'macerate_glass_pane');
	event.recipes.gtceu.macerator("gtceu:macerator/macerate_glass_pane")
		.itemInputs(
			"#c:glass_panes"
		)
		.itemOutputs("3x gtceu:tiny_glass_dust")
		.duration(6)
		.EUt(2)

	event.replaceInput({ id: "gtceu:shaped/glass_dust_hammer" },
		"minecraft:glass",
		"#c:glass_blocks"
	);

	// Glass blocks
	event.recipes.gtceu.alloy_smelter('tfg:clear_glass_block_from_batch')
		.itemInputs('tfc:silica_glass_batch')
		.notConsumableItem('gtceu:block_casting_mold')
		.itemOutputs('minecraft:glass')
		.duration(12 * 20)
		.EUt(16)
		.category(GTRecipeCategories.INGOT_MOLDING);

	event.recipes.gtceu.alloy_smelter('tfg:orange_glass_block_from_batch')
		.itemInputs('tfc:hematitic_glass_batch')
		.notConsumableItem('gtceu:block_casting_mold')
		.itemOutputs('minecraft:orange_stained_glass')
		.duration(12 * 20)
		.EUt(16)
		.category(GTRecipeCategories.INGOT_MOLDING);

	event.recipes.gtceu.alloy_smelter('tfg:green_glass_block_from_batch')
		.itemInputs('tfc:olivine_glass_batch')
		.notConsumableItem('gtceu:block_casting_mold')
		.itemOutputs('minecraft:green_stained_glass')
		.duration(12 * 20)
		.EUt(16)
		.category(GTRecipeCategories.INGOT_MOLDING);

	event.recipes.gtceu.alloy_smelter('tfg:blue_glass_block_from_batch')
		.itemInputs('tfc:volcanic_glass_batch')
		.notConsumableItem('gtceu:block_casting_mold')
		.itemOutputs('minecraft:blue_stained_glass')
		.duration(12 * 20)
		.EUt(16)
		.category(GTRecipeCategories.INGOT_MOLDING);

	// Glass Tube
	event.recipes.tfc.glassworking('gtceu:glass_tube', '#tfc:glass_batches_tier_3', ['tfc:blow', 'tfc:stretch', 'tfc:stretch'])
		.id('tfg:gtceu/glassworking/glass_tube')

	event.recipes.gtceu.alloy_smelter('tfg:glass_tube_from_batch')
		.itemInputs('#tfc:glass_batches_tier_3')
		.notConsumableItem('gtceu:ball_casting_mold')
		.itemOutputs('gtceu:glass_tube')
		.duration(16 * 20)
		.EUt(16)
		.category(GTRecipeCategories.INGOT_MOLDING);

	// Glass vials
	event.recipes.gtceu.extruder('tfg:glass_vial_from_batch')
		.itemInputs('#tfc:glass_batches_tier_3')
		.notConsumableItem('gtceu:cell_extruder_mold')
		.itemOutputs("4x gtceu:glass_vial")
		.duration(6.4 * 20)
		.EUt(30)
	//#endregion

	console.info('[Gregnautics] progress: tfg_port tfg.server.ores.recipes.quartzes done')
})
