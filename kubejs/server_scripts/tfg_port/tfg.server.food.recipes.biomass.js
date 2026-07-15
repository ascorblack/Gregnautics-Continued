// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/food/recipes.biomass.js (registerTFGBiomassRecipes).
// Чистые GT-рецепты — портированы напрямую. Ремапы: tfc:foods -> c:foods, tfc:seeds -> c:seeds,
// forge:dusts/salt -> gtceu:salt_dust (теговые выходы недопустимы в 1.21).
// [PORT-Ф10] Теги tfg:moon_plants / tfg:mars_plants ещё не наполняются (космос) — рецепты закомментированы.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.food.recipes.biomass start');

	//#region Biomass

	event.recipes.gtceu.brewery('biomass_from_tfc_seeds')
		.itemInputs('#c:seeds') // [PORT] tfc:seeds -> c:seeds
		.inputFluids('#tfc:any_water 20')
		.outputFluids(Fluid.of('gtceu:biomass', 100))
		.duration(100)
		.EUt(3);

	event.recipes.gtceu.brewery('biomass_from_tfc_food')
		.itemInputs('#c:foods') // [PORT] tfc:foods -> c:foods
		.inputFluids('#tfc:any_water 20')
		.outputFluids(Fluid.of('gtceu:biomass', 100))
		.duration(100)
		.EUt(3);

	event.recipes.gtceu.brewery('biomass_from_tfc_plants')
		.itemInputs('#tfc:plants')
		.inputFluids('#tfc:any_water 20')
		.outputFluids(Fluid.of('gtceu:biomass', 100))
		.duration(100)
		.EUt(3);

	// [PORT-Ф10] Луна/Марс не портированы — теги пустые:
	// event.recipes.gtceu.brewery('biomass_from_moon_plants').itemInputs('#tfg:moon_plants')...
	// event.recipes.gtceu.brewery('biomass_from_mars_plants').itemInputs('#tfg:mars_plants')...

	// [PORT-CHECK] тега tfc:corals нет в TFC 4.2.5 — возможно, его добавляет coralstfc; если тег пуст,
	// рецепт просто не будет матчиться
	event.recipes.gtceu.brewery('biomass_from_tfc_corals')
		.itemInputs('#tfc:corals')
		.inputFluids('#tfc:any_water 20')
		.outputFluids(Fluid.of('gtceu:biomass', 100))
		.duration(100)
		.EUt(3);

	event.recipes.gtceu.brewery('biomass_from_spider_eyes')
		.itemInputs('minecraft:spider_eye')
		.inputFluids('#tfc:any_water 20')
		.outputFluids(Fluid.of('gtceu:biomass', 100))
		.duration(100)
		.EUt(3);

	event.recipes.gtceu.brewery('biomass_from_leaves')
		.itemInputs('#minecraft:leaves')
		.inputFluids('#tfc:any_water 20')
		.outputFluids(Fluid.of('gtceu:biomass', 20))
		.duration(100)
		.EUt(3);

	event.recipes.gtceu.brewery('biomass_from_fallen_leaves')
		.itemInputs('#tfc:fallen_leaves')
		.inputFluids('#tfc:any_water 20')
		.outputFluids(Fluid.of('gtceu:biomass', 20))
		.duration(100)
		.EUt(3);

	event.recipes.gtceu.brewery('biomass_from_minecraft_plants')
		.itemInputs('#createaddition:plants')
		.inputFluids('#tfc:any_water 20')
		.outputFluids(Fluid.of('gtceu:biomass', 20))
		.duration(100)
		.EUt(3);

	event.recipes.gtceu.brewery('biomass_from_wart_blocks')
		.itemInputs('#minecraft:wart_blocks')
		.inputFluids('#tfc:any_water 20')
		.outputFluids(Fluid.of('gtceu:biomass', 100))
		.duration(100)
		.EUt(3);

	// [PORT-GTM-REPLACE] replaceInput/Output по GT-рецептам крашится в b71dec5 (immutable CapabilityMapComponent, UOE) — включить с патченным GTM: 
	// event.replaceOutput({ id: 'gtceu:distillery/distill_biomass_to_water' }, 'gtceu:wood_dust', 'gtceu:carbon_dust');
	// [PORT-GTM-REPLACE] replaceInput/Output по GT-рецептам крашится в b71dec5 (immutable CapabilityMapComponent, UOE) — включить с патченным GTM: 
	// event.replaceOutput({ id: 'gtceu:distillery/distill_biomass_to_ethanol' }, 'gtceu:wood_dust', 'gtceu:carbon_dust');
	// [PORT-GTM-REPLACE] replaceInput/Output по GT-рецептам крашится в b71dec5 (immutable CapabilityMapComponent, UOE) — включить с патченным GTM: 
	// event.replaceOutput({ id: 'gtceu:distillation_tower/distill_biomass' }, 'gtceu:wood_dust', 'gtceu:carbon_dust');

	//#endregion

	//#region Plant ball

	event.recipes.gtceu.compressor('plant_ball_from_tfc_seeds')
		.itemInputs('4x #c:seeds')
		.itemOutputs('gtceu:plant_ball')
		.duration(300)
		.EUt(2);

	// [PORT-FIX] Ingredient.of(...).withCount(8) -> строка '8x #c:foods'
	event.recipes.gtceu.compressor('plant_ball_from_tfc_food')
		.itemInputs('8x #c:foods')
		.itemOutputs('gtceu:plant_ball')
		.duration(300)
		.EUt(2);

	event.recipes.gtceu.compressor('plant_ball_from_tfc_plants')
		.itemInputs('4x #tfc:plants')
		.itemOutputs('gtceu:plant_ball')
		.duration(300)
		.EUt(2);

	// [PORT-Ф10] Луна/Марс не портированы:
	// event.recipes.gtceu.compressor('plant_ball_from_moon_plants').itemInputs('4x #tfg:moon_plants')...
	// event.recipes.gtceu.compressor('plant_ball_from_mars_plants').itemInputs('4x #tfg:mars_plants')...

	event.recipes.gtceu.compressor('plant_ball_from_tfc_corals')
		.itemInputs('4x #tfc:corals')
		.itemOutputs('gtceu:plant_ball')
		.duration(300)
		.EUt(2);

	event.recipes.gtceu.compressor('plant_ball_from_misc_plants')
		.itemInputs('10x #createaddition:plants')
		.itemOutputs('gtceu:plant_ball')
		.duration(300)
		.EUt(2);

	event.recipes.gtceu.compressor('plant_ball_from_wart_blocks')
		.itemInputs('4x #minecraft:wart_blocks')
		.itemOutputs('gtceu:plant_ball')
		.duration(300)
		.EUt(2);

	//#endregion

	// Sugar
	event.recipes.gtceu.centrifuge('sugar_from_sugarcane')
		.itemInputs('tfc:food/sugarcane')
		.inputFluids('#tfc:any_fresh_water 600') // [PORT] tfg:clean_water не портирован
		.itemOutputs('minecraft:sugar', 'gtceu:plant_ball')
		.duration(800)
		.EUt(6);

	event.recipes.gtceu.extractor('sugar_from_honey')
		.itemInputs('minecraft:honey_bottle') // [PORT-FIX] raw_honey нет в Firmalife 3.0
		.itemOutputs('minecraft:sugar')
		.duration(400)
		.EUt(6);

	event.recipes.gtceu.centrifuge('tfg:beets_to_sugar')
		.itemInputs('5x tfc:food/beet')
		.inputFluids(Fluid.of('tfc:salt_water', 1000))
		.itemOutputs('3x minecraft:sugar', '3x gtceu:plant_ball', '1x gtceu:salt_dust') // [PORT-FIX] теговый выход '#forge:dusts/salt' -> gtceu:salt_dust
		.outputFluids(Fluid.of('minecraft:water', 1000))
		.duration(800)
		.EUt(7)
		.circuit(3);

	// Misc

	event.recipes.gtceu.macerator('macerate_meat_to_dust')
		.itemInputs('#c:foods/meat') // [PORT] tfc:foods/meats -> c:foods/meat
		.itemOutputs('gtceu:meat_dust', 'gtceu:tiny_bone_dust')
		.duration(100)
		.EUt(2);
});
