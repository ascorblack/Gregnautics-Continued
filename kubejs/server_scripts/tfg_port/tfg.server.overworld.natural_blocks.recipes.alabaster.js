// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/natural_blocks/recipes.alabaster.js (1.20.1) на 1.21.1 NeoForge.
// [PORT] Главные изменения:
//  - tfc:damage_inputs_shapeless_crafting удалён в TFC 1.21 -> plain shapeless (урон через авто-remainder);
//  - forge:raw_materials -> c:raw_materials; #tfc:chisels -> #c:tools/chisel;
//  - тег tfc:colored_bricks_alabaster переименован в tfc:colored_alabaster_bricks (TFC 4.2.5);
//  - kubejs_tfc 2.0: barrel_sealed(input_fluid, duration).inputItem/.outputItem, TFC.fluidStackIngredient удалён;
//  - id ванильного barrel-рецепта: tfc:barrel/raw_alabaster -> tfc:barrel/alabaster/raw;
//  - [PORT-Ф2] gtceu:poor_raw_gypsum / rich_raw_gypsum (бедные/богатые руды TFG) не существуют до Ф2.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.overworld natural_blocks recipes.alabaster start')

	// [PORT-FIX] TFC 1.21 сам крафтит alabaster_brick из tfc:ore/gypsum — убираем и заменяем GT-сырьём
	event.remove({ id: 'tfc:crafting/alabaster_brick' })

	event.shapeless('4x tfc:alabaster_brick', ['#c:raw_materials/gypsum', '#c:tools/chisel'])
		.id('tfc:crafting/alabaster_brick/raw_gypsum')

	// [PORT-Ф2] forge:poor_raw_materials / rich_raw_materials — теги бедных/богатых руд TFG-модификации материалов (Ф2)
	// event.shapeless('2x tfc:alabaster_brick', ['#c:poor_raw_materials/gypsum', '#c:tools/chisel'])
	// 	.id('tfc:crafting/alabaster_brick/poor_raw_gypsum')
	// event.shapeless('6x tfc:alabaster_brick', ['#c:rich_raw_materials/gypsum', '#c:tools/chisel'])
	// 	.id('tfc:crafting/alabaster_brick/rich_raw_gypsum')

	// Alabaster Brick
	event.recipes.gtceu.assembler('tfc:alabaster/bricks')
		.itemInputs('5x tfc:alabaster_brick')
		.inputFluids(Fluid.of('gtceu:concrete', 72))
		.itemOutputs('4x tfc:alabaster/bricks')
		.duration(50)
		.EUt(2)

	event.recipes.gtceu.chemical_bath('tfc:alabaster/bricks')
		.itemInputs('#tfc:colored_alabaster_bricks') // [PORT-FIX] tfc:colored_bricks_alabaster -> tfc:colored_alabaster_bricks
		.inputFluids(Fluid.of('gtceu:chlorine', 72))
		.itemOutputs('tfc:alabaster/bricks')
		.duration(400)
		.EUt(2)
		.category(GTRecipeCategories.CHEM_DYES)

	for (let i = 0; i < 16; i++) {
		event.recipes.gtceu.chemical_bath(`tfg:tfc/alabaster/bricks/${global.MINECRAFT_DYE_NAMES[i]}`)
			.itemInputs('tfc:alabaster/bricks')
			.inputFluids(Fluid.of(`tfc:${global.MINECRAFT_DYE_NAMES[i]}_dye`, 72))
			.itemOutputs(`tfc:alabaster/bricks/${global.MINECRAFT_DYE_NAMES[i]}`)
			.duration(20)
			.EUt(7)
			.category(GTRecipeCategories.CHEM_DYES)
	}

	// Raw Alabaster

	event.remove({ id: 'tfc:barrel/alabaster/raw' }) // [PORT-FIX] 1.20: tfc:barrel/raw_alabaster

	// [PORT] kubejs_tfc 2.0: barrel_sealed(input_fluid, duration).inputItem/.outputItem
	// [PORT-Ф2] варианты с gtceu:poor_raw_gypsum / rich_raw_gypsum — до Ф2
	// event.recipes.tfc.barrel_sealed('tfc:limewater 50', 1000)
	// 	.inputItem('gtceu:poor_raw_gypsum')
	// 	.outputItem('tfc:alabaster/raw')
	// 	.id('tfg:barrel/poor_raw_ore_alabaster')
	event.recipes.tfc.barrel_sealed('tfc:limewater 100', 1000)
		.inputItem('gtceu:raw_gypsum')
		.outputItem('2x tfc:alabaster/raw')
		.id('tfg:barrel/raw_ore_alabaster')
	// event.recipes.tfc.barrel_sealed('tfc:limewater 150', 1000)
	// 	.inputItem('gtceu:rich_raw_gypsum')
	// 	.outputItem('3x tfc:alabaster/raw')
	// 	.id('tfg:barrel/rich_raw_ore_alabaster')

	// [PORT-Ф2] gtceu:poor_raw_gypsum не существует до Ф2
	// event.recipes.gtceu.chemical_bath('tfc:alabaster/raw/poor_raw_gypsum')
	// 	.itemInputs('gtceu:poor_raw_gypsum')
	// 	.inputFluids(Fluid.of('tfc:limewater', 50))
	// 	.itemOutputs('tfc:alabaster/raw')
	// 	.duration(400)
	// 	.EUt(2)

	event.recipes.gtceu.chemical_bath('tfc:alabaster/raw/raw_gypsum')
		.itemInputs('gtceu:raw_gypsum')
		.inputFluids(Fluid.of('tfc:limewater', 100))
		.itemOutputs('2x tfc:alabaster/raw')
		.duration(400)
		.EUt(2)

	// [PORT-Ф2] gtceu:rich_raw_gypsum не существует до Ф2
	// event.recipes.gtceu.chemical_bath('tfc:alabaster/raw/rich_raw_gypsum')
	// 	.itemInputs('gtceu:rich_raw_gypsum')
	// 	.inputFluids(Fluid.of('tfc:limewater', 150))
	// 	.itemOutputs('3x tfc:alabaster/raw')
	// 	.duration(400)
	// 	.EUt(2)

	event.recipes.gtceu.chemical_bath('tfc:alabaster/raw')
		.itemInputs('#tfc:colored_alabaster_bricks') // [PORT-FIX] переименованный тег; вход кирпичами — как в оригинале
		.inputFluids(Fluid.of('gtceu:chlorine', 72))
		.itemOutputs('tfc:alabaster/raw')
		.duration(400)
		.EUt(2)
		.category(GTRecipeCategories.CHEM_DYES)

	for (let i = 0; i < 16; i++) {
		event.recipes.gtceu.chemical_bath(`tfg:alabaster/raw/${global.MINECRAFT_DYE_NAMES[i]}`)
			.itemInputs('tfc:alabaster/raw')
			.inputFluids(Fluid.of(`tfc:${global.MINECRAFT_DYE_NAMES[i]}_dye`, 36))
			.itemOutputs(`tfc:alabaster/raw/${global.MINECRAFT_DYE_NAMES[i]}`)
			.duration(20)
			.EUt(7)
			.category(GTRecipeCategories.CHEM_DYES)

		event.recipes.gtceu.chemical_bath(`tfg:alabaster/polished/${global.MINECRAFT_DYE_NAMES[i]}`)
			.itemInputs('tfc:alabaster/polished')
			.inputFluids(Fluid.of(`tfc:${global.MINECRAFT_DYE_NAMES[i]}_dye`, 36))
			.itemOutputs(`tfc:alabaster/polished/${global.MINECRAFT_DYE_NAMES[i]}`)
			.duration(20)
			.EUt(7)
			.category(GTRecipeCategories.CHEM_DYES)

		event.recipes.gtceu.chemical_bath(`tfg:alabaster/bricks/${global.MINECRAFT_DYE_NAMES[i]}`)
			.itemInputs('tfc:alabaster/bricks')
			.inputFluids(Fluid.of(`tfc:${global.MINECRAFT_DYE_NAMES[i]}_dye`, 36))
			.itemOutputs(`tfc:alabaster/bricks/${global.MINECRAFT_DYE_NAMES[i]}`)
			.duration(20)
			.EUt(7)
			.category(GTRecipeCategories.CHEM_DYES)
	}
})
