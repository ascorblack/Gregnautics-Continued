// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/natural_blocks/recipes.asphalt_road.js (1.20.1) на 1.21.1 NeoForge.
// [PORT-Ф4-TODO] Из асфальтовой ветки в Ф4 зарегистрированы ТОЛЬКО предметы tfg:tar_chunk /
// tfg:asphalt_binder / tfg:asphalt_rubble (startup_scripts/tfg_port/tfg.misc.asphalt_road.js).
// Блоки (tfg:oil_tar, tfg:gilsonite, tfg:asphalt_road*, tfg:asphalt_road_hot) и жидкость tfg:asphalt_mix
// НЕ зарегистрированы — их рецепты ниже закомментированы и включаются вместе с блоками.
// [PORT] Переименования жидкостей GTM8: gtceu:oil_medium -> gtceu:raw_oil, oil_light -> light_oil, oil_heavy -> heavy_oil.
// [PORT] greate отсутствует в сборке 1.21.1 — рецепты greate.* вырезаны.
// [PORT-Ф2] #forge:dusts/gilsonite — пыль TFG-материала gilsonite (Ф2), рецепты с ней закомментированы.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.overworld natural_blocks recipes.asphalt_road start')

	// [PORT-Ф4-TODO] Блоки смолы tfg:*oil_tar не зарегистрированы
	// const tarExtract = (id, input, fluidId, fluidMb) => {
	// 	event.recipes.gtceu.extractor(`tfg:asphalt/tar_extract/${id}`)
	// 		.itemInputs(`1x ${input}`)
	// 		.itemOutputs('2x tfg:tar_chunk')
	// 		.outputFluids(Fluid.of(fluidId, fluidMb))
	// 		.duration(200)
	// 		.EUt(GTValues.VA[GTValues.LV])
	// }
	//
	// tarExtract('oil_tar', 'tfg:oil_tar', 'gtceu:oil', 10)
	// tarExtract('raw_oil_tar', 'tfg:raw_oil_tar', 'gtceu:raw_oil', 10) // [PORT] oil_medium -> raw_oil
	// tarExtract('light_oil_tar', 'tfg:light_oil_tar', 'gtceu:light_oil', 10) // [PORT] oil_light -> light_oil
	// tarExtract('heavy_oil_tar', 'tfg:heavy_oil_tar', 'gtceu:heavy_oil', 10) // [PORT] oil_heavy -> heavy_oil
	//
	// const tarSolidify = (id, fluidId, outputBlock) => {
	// 	event.recipes.gtceu.fluid_solidifier(`tfg:asphalt/tar_solidify/${id}`)
	// 		.inputFluids(Fluid.of(fluidId, 1000))
	// 		.itemOutputs(`1x ${outputBlock}`)
	// 		.duration(400)
	// 		.EUt(GTValues.VA[GTValues.MV])
	// }
	//
	// tarSolidify('oil', 'gtceu:oil', 'tfg:oil_tar')
	// tarSolidify('raw_oil', 'gtceu:raw_oil', 'tfg:raw_oil_tar')
	// tarSolidify('light_oil', 'gtceu:light_oil', 'tfg:light_oil_tar')
	// tarSolidify('heavy_oil', 'gtceu:heavy_oil', 'tfg:heavy_oil_tar')

	// [PORT-Ф4-TODO] блок tfg:gilsonite не зарегистрирован; [PORT-Ф2] пыль гилсонита — материал Ф2
	// event.recipes.gtceu.macerator('tfg:asphalt/gilsonite_dust')
	// 	.itemInputs('1x tfg:gilsonite')
	// 	.itemOutputs('1x #c:dusts/gilsonite')
	// 	.duration(100)
	// 	.EUt(2)

	// [PORT-Ф4-TODO] тег tfg:asphalt_tars наполняется блоками смолы (не зарегистрированы);
	// [PORT-Ф2] chanced-выход пылью гилсонита — материал Ф2
	// event.recipes.gtceu.macerator('tfg:asphalt/macerate/tar_to_carbon')
	// 	.itemInputs('1x #tfg:asphalt_tars')
	// 	.itemOutputs('1x gtceu:carbon_dust')
	// 	.chancedOutput('1x #c:dusts/gilsonite', 2500, 0)
	// 	.duration(160)
	// 	.EUt(2)

	event.recipes.gtceu.mixer('tfg:asphalt/binder')
		.itemInputs('1x tfg:tar_chunk', '4x #tfg:stone_dusts')
		.itemOutputs('1x tfg:asphalt_binder')
		.circuit(1)
		.duration(200)
		.EUt(GTValues.VA[GTValues.MV])

	// [PORT-Ф2] #c:dusts/gilsonite — пыль TFG-материала (Ф2)
	// event.recipes.gtceu.mixer('tfg:asphalt/binder_boosted')
	// 	.itemInputs('1x tfg:tar_chunk', '4x #tfg:stone_dusts', '1x #c:dusts/gilsonite')
	// 	.itemOutputs('2x tfg:asphalt_binder')
	// 	.circuit(2)
	// 	.duration(400)
	// 	.EUt(GTValues.VA[GTValues.MV])

	// [PORT-Ф4-TODO] жидкость tfg:asphalt_mix не зарегистрирована
	// event.recipes.gtceu.mixer('tfg:asphalt/mix')
	// 	.itemInputs('4x rnr:crushed_base_course', '2x #minecraft:sand', '2x #tfg:stone_dusts', '1x tfg:asphalt_binder')
	// 	.outputFluids(Fluid.of('tfg:asphalt_mix', 1000))
	// 	.duration(400)
	// 	.EUt(GTValues.VA[GTValues.MV])

	// [PORT-Ф4-TODO] блоки tfg:asphalt_road_hot / tfg:asphalt_road и жидкость tfg:asphalt_mix не зарегистрированы
	// event.recipes.gtceu.assembler('tfg:asphalt/asphalt_road_hot')
	// 	.itemInputs('rnr:base_course')
	// 	.inputFluids(Fluid.of('tfg:asphalt_mix', 60))
	// 	.itemOutputs('tfg:asphalt_road_hot')
	// 	.circuit(1)
	// 	.duration(100)
	// 	.EUt(GTValues.VHA[GTValues.MV])

	// [PORT] greate отсутствует в сборке 1.21.1
	// event.recipes.greate.mixing('tfg:asphalt_road_hot', [Fluid.of('tfg:asphalt_mix', 60), 'rnr:base_course'])
	// 	.recipeTier(2)
	// 	.heated()
	// 	.id('tfg:create/mixer/asphalt_road_hot')

	// [PORT-Ф4-TODO]
	// event.recipes.gtceu.forming_press('tfg:asphalt/asphalt_road_hot_press')
	// 	.itemInputs('1x tfg:asphalt_road_hot')
	// 	.itemOutputs('1x tfg:asphalt_road')
	// 	.duration(20)
	// 	.EUt(GTValues.VHA[GTValues.MV])

	// [PORT] greate отсутствует в сборке 1.21.1
	// event.recipes.greate.pressing('1x tfg:asphalt_road', '1x tfg:asphalt_road_hot')
	// 	.recipeTier(2)
	// 	.id('greate:pressing/asphalt_road_hot')

	// [PORT-Ф4-TODO] жидкость tfg:asphalt_mix не зарегистрирована
	// event.recipes.gtceu.extractor('tfg:asphalt/rubble_to_mix')
	// 	.itemInputs('1x tfg:asphalt_rubble')
	// 	.outputFluids(Fluid.of('tfg:asphalt_mix', 40))
	// 	.duration(160)
	// 	.EUt(GTValues.VH[GTValues.MV])

	// [PORT-Ф4-TODO] блоки дорог не зарегистрированы
	// event.stonecutting('tfg:asphalt_road_stairs', 'tfg:asphalt_road').id('tfg:stonecutting/asphalt_road_stairs')
	// event.stonecutting('tfg:asphalt_road_slab', 'tfg:asphalt_road').id('tfg:stonecutting/asphalt_road_slab')
})
