// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/natural_blocks/recipes.concrete.js (1.20.1) на 1.21.1 NeoForge.
// [PORT] Изменения:
//  - forge:* -> c:*; .notConsumable(строка) -> .notConsumableItem(...);
//  - greate отсутствует — его removes/рецепты вырезаны;
//  - kubejs_tfc 2.0: barrel_sealed(input_fluid, duration).inputItem/.outputItem;
//  - firmalife mixing_bowl: KubeJS-схемы нет -> event.custom (поля item_ingredients/fluid_ingredients/result_fluid,
//    проверено по MixingBowlRecipe.class Firmalife 3.0.11);
//  - [PORT-Ф2] tfg:sedimentary_carbonate_dust и тег c:dusts/sedimentary_carbonate — TFG-материалы Ф2:
//    рецепты с ними регистрируются с «пустым» тегом и заработают после Ф2 (теги резолвятся в рантайме).

const $ConcBuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const $ConcResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')

function concItemExists(id) {
	try {
		return $ConcBuiltInRegistries.ITEM.containsKey($ConcResourceLocation.parse(String(id).replace(/^\d+x\s+/, '')))
	} catch (e) {
		return false
	}
}

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.overworld natural_blocks recipes.concrete start')

	event.remove({ id: 'gtceu:mixer/concrete_from_marble' })
	// [PORT] greate отсутствует в сборке 1.21.1
	// event.remove({ id: 'greate:mixing/integration/gtceu/mixer/concrete_from_marble' })
	event.remove({ id: 'gtceu:mixer/concrete_from_calcite' })
	// event.remove({ id: 'greate:mixing/integration/gtceu/mixer/concrete_from_calcite' })
	event.remove({ id: 'gtceu:mixer/concrete_from_clay' })
	// event.remove({ id: 'greate:mixing/integration/gtceu/mixer/concrete_from_clay' })

	// [PORT-Ф2] До Ф2 tfg:sedimentary_carbonate_dust не существует — исключение невозможно (и не нужно);
	// [PORT-FIX] KubeJS 7: Ingredient.subtract переименован в except (kjs$except, neoforge:difference).
	const stoneDusts3 = concItemExists('tfg:sedimentary_carbonate_dust')
		? Ingredient.of('#tfg:stone_dusts').except('tfg:sedimentary_carbonate_dust').withCount(3)
		: '3x #tfg:stone_dusts'

	event.recipes.gtceu.mixer('tfg:concrete_from_marble')
		.itemInputs(
			stoneDusts3,
			'#c:dusts/sedimentary_carbonate', // [PORT-Ф2] тег пуст до Ф2
			'gtceu:gypsum_dust')
		.inputFluids("#tfg:clean_water 1000")
		.outputFluids('gtceu:concrete 1152')
		.circuit(1)
		.duration(40)
		.EUt(16)

	event.recipes.gtceu.mixer('tfg:concrete_from_clay')
		.itemInputs(
			stoneDusts3,
			'#c:dusts/sedimentary_carbonate', // [PORT-Ф2] тег пуст до Ф2
			'gtceu:clay_dust')
		.inputFluids("#tfg:clean_water 500")
		.outputFluids('gtceu:concrete 576')
		.duration(40)
		.circuit(2)
		.EUt(16)

	event.recipes.gtceu.mixer('tfg:concrete_from_calcite')
		.itemInputs(
			stoneDusts3,
			'gtceu:calcite_dust',
			'gtceu:gypsum_dust')
		.inputFluids("#tfg:clean_water 1000")
		.outputFluids('gtceu:concrete 1152')
		.duration(40)
		.circuit(3)
		.EUt(16)


	//GT light/dark concrete recipe fix

	event.remove({ id: 'gtceu:fluid_solidifier/solidify_concrete_block' })
	event.remove({ id: 'gtceu:chemical_bath/light_to_dark_concrete' })

	event.recipes.gtceu.fluid_solidifier('gtceu:fluid_solidifier/solidify_light_concrete')
		.inputFluids(Fluid.of('gtceu:concrete', 144))
		.notConsumableItem('1x gtceu:block_casting_mold') // [PORT-FIX] notConsumable(строка) нет в GTM8
		.itemOutputs('1x gtceu:light_concrete')
		.duration(98)
		.EUt(7)

	event.recipes.gtceu.chemical_bath('gtceu:chemical_bath/dark_concrete')
		.inputFluids(Fluid.of('tfc:black_dye', 18))
		.itemInputs('1x gtceu:light_concrete')
		.itemOutputs('1x gtceu:dark_concrete')
		.duration(20)
		.EUt(7)

	event.recipes.gtceu.extractor('gtceu:extractor/extract_light_concrete')
		.itemInputs('1x gtceu:light_concrete')
		.outputFluids(Fluid.of('gtceu:concrete', 144))
		.duration(98)
		.EUt(30)

	event.stonecutting('gtceu:light_concrete_bricks', 'gtceu:light_concrete').id('tfg:stonecutting/light_concrete_bricks')
	event.stonecutting('gtceu:chiseled_light_concrete', 'gtceu:light_concrete').id('tfg:stonecutting/chiseled_light_concrete')
	event.stonecutting('gtceu:light_concrete_tile', 'gtceu:light_concrete').id('tfg:stonecutting/light_concrete_tile')
	event.stonecutting('gtceu:light_concrete_small_tile', 'gtceu:light_concrete').id('tfg:stonecutting/light_concrete_small_tile')
	event.stonecutting('gtceu:light_concrete_windmill_a', 'gtceu:light_concrete').id('tfg:stonecutting/light_concrete_windmill_a')
	event.stonecutting('gtceu:light_concrete_windmill_b', 'gtceu:light_concrete').id('tfg:stonecutting/light_concrete_windmill_b')
	event.stonecutting('gtceu:small_light_concrete_bricks', 'gtceu:light_concrete').id('tfg:stonecutting/small_light_concrete_bricks')
	event.stonecutting('gtceu:square_light_concrete_bricks', 'gtceu:light_concrete').id('tfg:stonecutting/square_light_concrete_bricks')

	event.stonecutting('gtceu:dark_concrete_bricks', 'gtceu:dark_concrete').id('tfg:stonecutting/dark_concrete_bricks')
	event.stonecutting('gtceu:chiseled_dark_concrete', 'gtceu:dark_concrete').id('tfg:stonecutting/chiseled_dark_concrete')
	event.stonecutting('gtceu:dark_concrete_tile', 'gtceu:dark_concrete').id('tfg:stonecutting/dark_concrete_tile')
	event.stonecutting('gtceu:dark_concrete_small_tile', 'gtceu:dark_concrete').id('tfg:stonecutting/dark_concrete_small_tile')
	event.stonecutting('gtceu:dark_concrete_windmill_a', 'gtceu:dark_concrete').id('tfg:stonecutting/dark_concrete_windmill_a')
	event.stonecutting('gtceu:dark_concrete_windmill_b', 'gtceu:dark_concrete').id('tfg:stonecutting/dark_concrete_windmill_b')
	event.stonecutting('gtceu:small_dark_concrete_bricks', 'gtceu:dark_concrete').id('tfg:stonecutting/small_dark_concrete_bricks')
	event.stonecutting('gtceu:square_dark_concrete_bricks', 'gtceu:dark_concrete').id('tfg:stonecutting/square_dark_concrete_bricks')

	// Handcrafted artisanal concrete
	// [PORT-FIX] firmalife.mixing_bowl -> event.custom (KubeJS-схемы у Firmalife 3.0 нет);
	// результат-жидкость — поле result_fluid; входы-теги — {tag: ...}

	event.custom({
		"type": "firmalife:mixing_bowl",
		"item_ingredients": [
			{ "tag": "tfg:stone_dusts" },
			{ "tag": "tfg:stone_dusts" },
			{ "tag": "tfg:stone_dusts" },
			{ "tag": "c:dusts/sedimentary_carbonate" }, // [PORT-Ф2] тег пуст до Ф2
			{ "tag": "c:dusts/gypsum" }
		],
		"fluid_ingredients": { "amount": 1000, "fluid": "minecraft:water" },
		"result_fluid": { "amount": 1000, "id": "gtceu:concrete" }
	}).id('tfg:mixing_bowl/concrete_from_marble')

	event.custom({
		"type": "firmalife:mixing_bowl",
		"item_ingredients": [
			{ "tag": "tfg:stone_dusts" },
			{ "tag": "tfg:stone_dusts" },
			{ "tag": "tfg:stone_dusts" },
			{ "tag": "c:dusts/sedimentary_carbonate" }, // [PORT-Ф2] тег пуст до Ф2
			{ "tag": "c:dusts/clay" }
		],
		"fluid_ingredients": { "amount": 500, "fluid": "minecraft:water" },
		"result_fluid": { "amount": 500, "id": "gtceu:concrete" }
	}).id('tfg:mixing_bowl/concrete_from_clay')

	event.custom({
		"type": "firmalife:mixing_bowl",
		"item_ingredients": [
			{ "tag": "tfg:stone_dusts" },
			{ "tag": "tfg:stone_dusts" },
			{ "tag": "tfg:stone_dusts" },
			{ "tag": "c:dusts/calcite" },
			{ "tag": "c:dusts/gypsum" }
		],
		"fluid_ingredients": { "amount": 1000, "fluid": "minecraft:water" },
		"result_fluid": { "amount": 1000, "id": "gtceu:concrete" }
	}).id('tfg:mixing_bowl/concrete_from_calcite')

	// [PORT] kubejs_tfc 2.0: barrel_sealed(input_fluid, duration).inputItem/.outputItem
	event.recipes.tfc.barrel_sealed('gtceu:concrete 144', 1000)
		.inputItem('gtceu:wood_frame')
		.outputItem('gtceu:light_concrete')
		.id('tfg:barrel/light_concrete')

	event.recipes.tfc.barrel_sealed('tfc:black_dye 18', 500)
		.inputItem('gtceu:light_concrete')
		.outputItem('gtceu:dark_concrete')
		.id('tfg:barrel/dark_concrete')

	// Titanium concrete
	// [PORT-Ф4-TODO] блоки tfg:titanium_concrete* не зарегистрированы — гварды пропустят до их появления
	if (concItemExists('tfg:titanium_concrete')) {
		event.recipes.gtceu.assembler('tfg:titanium_concrete')
			.itemInputs('2x #c:rods/titanium', '#c:dusts/kaolinite')
			.inputFluids(Fluid.of('gtceu:concrete', 144 * 1.5))
			.itemOutputs('tfg:titanium_concrete')
			.circuit(2)
			.duration(20)
			.EUt(GTValues.VH[GTValues.EV])
	}

	if (concItemExists('tfg:polished_titanium_concrete')) {
		event.recipes.gtceu.laser_engraver('tfg:titanium_concrete_bricks')
			.itemInputs('tfg:polished_titanium_concrete')
			.notConsumableItem('#c:lenses/light_blue')
			.itemOutputs('tfg:titanium_concrete_bricks')
			.duration(20 * (2.5))
			.EUt(GTValues.VA[GTValues.LV])
		event.recipes.gtceu.laser_engraver('tfg:titanium_concrete_bricks_small')
			.itemInputs('tfg:polished_titanium_concrete')
			.notConsumableItem('#c:lenses/pink')
			.itemOutputs('tfg:titanium_concrete_bricks_small')
			.duration(20 * (2.5))
			.EUt(GTValues.VA[GTValues.LV])
		event.recipes.gtceu.laser_engraver('tfg:titanium_concrete_bricks_square')
			.itemInputs('tfg:polished_titanium_concrete')
			.notConsumableItem('#c:lenses/green')
			.itemOutputs('tfg:titanium_concrete_bricks_square')
			.duration(20 * (2.5))
			.EUt(GTValues.VA[GTValues.LV])
		event.recipes.gtceu.laser_engraver('tfg:titanium_concrete_tile')
			.itemInputs('tfg:polished_titanium_concrete')
			.notConsumableItem('#c:lenses/red')
			.itemOutputs('tfg:titanium_concrete_tile')
			.duration(20 * (2.5))
			.EUt(GTValues.VA[GTValues.LV])
		event.recipes.gtceu.laser_engraver('tfg:titanium_concrete_tile_small')
			.itemInputs('tfg:polished_titanium_concrete')
			.notConsumableItem('#c:lenses/black')
			.itemOutputs('tfg:titanium_concrete_tile_small')
			.duration(20 * (2.5))
			.EUt(GTValues.VA[GTValues.LV])
	}
})
