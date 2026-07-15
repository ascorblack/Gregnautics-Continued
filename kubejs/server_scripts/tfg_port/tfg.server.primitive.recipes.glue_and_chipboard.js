// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/primitive/recipes.glue_and_chipboard.js (Ф4).
// Главные изменения 1.20→1.21:
//  - kubejs_tfc 2.0.1 не поддерживает схемы firmalife — mixing_bowl/stomping переписаны на event.custom
//    (формат сверен с data/firmalife/recipe/*.json в Firmalife 3.0.11)
//  - forge:wax → c:wax
//  - tfg:anemones / tfg:plant/starfish — водные растения TFG (Ф4 overworld) не портированы [PORT-Ф4-TODO]

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.primitive.recipes.glue_and_chipboard start')

	// Glue from resin
	event.recipes.gtceu.extractor('tfg:glue_from_tfc_glue')
		.itemInputs('tfc:glue')
		.outputFluids(Fluid.of('gtceu:glue', 50))
		.duration(20 * 10)
		.EUt(5)

	event.recipes.gtceu.extractor('tfg:glue_from_sticky_resin')
		.itemInputs('gtceu:sticky_resin')
		.outputFluids(Fluid.of('gtceu:glue', 100))
		.duration(20 * 10)
		.EUt(5)

	event.recipes.gtceu.extractor('tfg:glue_from_conifer_resin')
		.itemInputs('tfg:conifer_rosin')
		.outputFluids(Fluid.of('gtceu:glue', 50))
		.duration(20 * 10)
		.EUt(5)

	event.recipes.gtceu.mixer('tfg:glue_from_bone_meal')
		.itemInputs('minecraft:bone_meal')
		.inputFluids(Fluid.of('tfc:limewater', 500))
		.outputFluids(Fluid.of('gtceu:glue', 50))
		.duration(100)
		.EUt(5)

	// [PORT-Ф4-TODO] tfg:anemones (тег) и tfg:plant/starfish — водные растения TFG не портированы (Ф4 overworld);
	// пустой тег/несуществующий предмет ломают GT-рецепт — блок закомментирован.
	// event.recipes.gtceu.compressor('tfg:glue_from_anemones')
	// 	.itemInputs('#tfg:anemones')
	// 	.itemOutputs('tfc:glue')
	// 	.duration(100)
	// 	.EUt(5)
	//
	// event.custom({
	// 	"type": "firmalife:stomping",
	// 	"ingredient": { "tag": "tfg:anemones" },
	// 	"input_texture": "tfg:block/plant/anemone_purple/anemone_1",
	// 	"output_texture": "tfc:block/glue_block",
	// 	"sound": "minecraft:entity.slime.squish",
	// 	"result": { "id": "tfc:glue" }
	// }).id('tfg:stomping/anemones')
	//
	// event.recipes.gtceu.compressor('tfg:glue_from_starfish')
	// 	.itemInputs("tfg:plant/starfish")
	// 	.itemOutputs('tfc:glue')
	// 	.duration(100)
	// 	.EUt(5)
	//
	// event.custom({
	// 	"type": "firmalife:stomping",
	// 	"ingredient": { "item": "tfg:plant/starfish" },
	// 	"input_texture": "tfc:block/powder/hematite",
	// 	"output_texture": "tfc:block/glue_block",
	// 	"sound": "minecraft:entity.slime.squish",
	// 	"result": { "id": "tfc:glue" }
	// }).id('tfg:stomping/starfish')

	event.smelting('tfc:glue', 'minecraft:slime_ball')
		.id('tfg:smelting/slime_to_glue')

	// [PORT-FIX] kubejs_tfc 2.0.1 не поддерживает схемы firmalife — stomping через event.custom
	event.custom({
		"type": "firmalife:stomping",
		"ingredient": { "item": "minecraft:slime_ball" },
		"input_texture": "minecraft:block/slime_block",
		"output_texture": "tfc:block/glue_block",
		"sound": "minecraft:entity.slime.squish",
		"result": { "id": "tfc:glue" }
	}).id('tfg:stomping/slime_ball')

	event.smelting('tfc:glue', 'minecraft:magma_cream')
		.id('tfg:smelting/magma_cream_to_glue')

	event.custom({
		"type": "firmalife:stomping",
		"ingredient": { "item": "minecraft:magma_cream" },
		"input_texture": "minecraft:block/slime_block",
		"output_texture": "tfc:block/glue_block",
		"sound": "minecraft:entity.slime.squish",
		"result": { "id": "tfc:glue" }
	}).id('tfg:stomping/magma_cream')

	// Chipboard
	// [PORT-FIX] kubejs_tfc 2.0.1 не поддерживает схемы firmalife — mixing_bowl через event.custom
	event.custom({
		"type": "firmalife:mixing_bowl",
		"item_ingredients": [
			{ "tag": "tfg:wood_dusts" },
			{ "tag": "tfg:wood_dusts" },
			{ "item": "tfc:glue" }
		],
		"result_item": { "count": 2, "id": "tfg:chipboard_composite" }
	}).id('tfg:mixing_bowl/chipboard_composite_glue')

	event.custom({
		"type": "firmalife:mixing_bowl",
		"item_ingredients": [
			{ "tag": "tfg:wood_dusts" },
			{ "tag": "tfg:wood_dusts" },
			{ "tag": "tfg:wood_dusts" },
			{ "tag": "tfg:wood_dusts" },
			{ "item": "gtceu:sticky_resin" }
		],
		"result_item": { "count": 4, "id": "tfg:chipboard_composite" }
	}).id('tfg:mixing_bowl/chipboard_composite_resin')

	event.custom({
		"type": "firmalife:mixing_bowl",
		"item_ingredients": [
			{ "tag": "tfg:wood_dusts" },
			{ "tag": "tfg:wood_dusts" },
			{ "tag": "c:wax" }
		],
		"result_item": { "count": 2, "id": "tfg:chipboard_composite" }
	}).id('tfg:mixing_bowl/chipboard_composite_wax')

	event.recipes.gtceu.mixer('gtceu:chipboard_composite_wax')
		.itemInputs('2x #tfg:wood_dusts',
			'1x #c:wax') // [PORT] forge:wax -> c:wax
		.itemOutputs('2x tfg:chipboard_composite')
		.duration(100)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.mixer('gtceu:chipboard_composite_resin')
		.itemInputs('4x #tfg:wood_dusts',
			'1x gtceu:sticky_resin')
		.itemOutputs('4x tfg:chipboard_composite')
		.duration(100)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.mixer('gtceu:chipboard_composite_glue')
		.itemInputs('2x #tfg:wood_dusts',
			'1x tfc:glue')
		.itemOutputs('2x tfg:chipboard_composite')
		.duration(100)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.mixer('gtceu:chipboard_composite_fluid_glue')
		.itemInputs('1x #tfg:wood_dusts')
		.inputFluids(Fluid.of('gtceu:glue', 25))
		.itemOutputs('1x tfg:chipboard_composite')
		.duration(10)
		.EUt(GTValues.VA[GTValues.LV])

	// Pre-treated chipboard
	event.custom({
		"type": "firmalife:mixing_bowl",
		"item_ingredients": [
			{ "item": "gtceu:treated_wood_dust" },
			{ "item": "gtceu:treated_wood_dust" },
			{ "item": "tfc:glue" }
		],
		"result_item": { "count": 2, "id": "tfg:treated_chipboard_composite" }
	}).id('tfg:mixing_bowl/treated_chipboard_composite_glue')

	event.custom({
		"type": "firmalife:mixing_bowl",
		"item_ingredients": [
			{ "item": "gtceu:treated_wood_dust" },
			{ "item": "gtceu:treated_wood_dust" },
			{ "item": "gtceu:treated_wood_dust" },
			{ "item": "gtceu:treated_wood_dust" },
			{ "item": "gtceu:sticky_resin" }
		],
		"result_item": { "count": 4, "id": "tfg:treated_chipboard_composite" }
	}).id('tfg:mixing_bowl/treated_chipboard_composite_resin')

	event.custom({
		"type": "firmalife:mixing_bowl",
		"item_ingredients": [
			{ "item": "gtceu:treated_wood_dust" },
			{ "item": "gtceu:treated_wood_dust" },
			{ "tag": "c:wax" }
		],
		"result_item": { "count": 2, "id": "tfg:treated_chipboard_composite" }
	}).id('tfg:mixing_bowl/treated_chipboard_composite_wax')

	event.recipes.gtceu.mixer('gtceu:treated_chipboard_composite_wax')
		.itemInputs('2x gtceu:treated_wood_dust', '1x #c:wax')
		.itemOutputs('2x tfg:treated_chipboard_composite')
		.duration(100)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.mixer('gtceu:treated_chipboard_composite_resin')
		.itemInputs('4x gtceu:treated_wood_dust', '1x gtceu:sticky_resin')
		.itemOutputs('4x tfg:treated_chipboard_composite')
		.duration(100)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.mixer('gtceu:treated_chipboard_composite_glue')
		.itemInputs('2x gtceu:treated_wood_dust', '1x tfc:glue')
		.itemOutputs('2x tfg:treated_chipboard_composite')
		.duration(100)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.mixer('gtceu:treated_chipboard_composite_fluid_glue')
		.itemInputs('1x gtceu:treated_wood_dust')
		.inputFluids(Fluid.of('gtceu:glue', 25))
		.itemOutputs('1x tfg:treated_chipboard_composite')
		.duration(10)
		.EUt(GTValues.VA[GTValues.LV])


	//
	event.recipes.gtceu.compressor('gtceu:wood_mdf')
		.itemInputs('1x tfg:chipboard_composite')
		.itemOutputs('gtceu:wood_plate')
		.duration(200)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.chemical_bath('gtceu:treated_chipboard_composite')
		.itemInputs('1x tfg:chipboard_composite')
		.inputFluids(Fluid.of('gtceu:creosote', 50))
		.itemOutputs('tfg:treated_chipboard_composite')
		.duration(100)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.chemical_bath('gtceu:bath_treated_wood_dust')
		.itemInputs('#tfg:wood_dusts')
		.inputFluids(Fluid.of('gtceu:creosote', 50))
		.itemOutputs('gtceu:treated_wood_dust')
		.duration(100)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.assembler('tfg:resin_circuit_assembler')
		.itemInputs('gtceu:wood_plate', '2x gtceu:sticky_resin')
		.itemOutputs('gtceu:resin_circuit_board')
		.duration(20 * 10)
		.EUt(GTValues.VA[GTValues.ULV])
})
