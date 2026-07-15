// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/food/recipes.refrigerators.js (registerTFGRefrigeratorRecipes).
// [PORT-Ф2] Сами холодильники (tfg:mv/hv/ev/iv_food_refrigerator) — кастомные GT-машины TFG,
// не портированы: рецепты сборки и удаление их дефолтных крафтов закомментированы.
// Химия хладагентов портирована под guard'ами (жидкости TFG-материалов из tfg.materials.refrigerants.js —
// могут не сгенерироваться из-за upstream-бага флагов, тогда рецепт тихо пропускается).

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.food.recipes.refrigerators start');

	//#region Machine Recipes ([PORT-Ф2] машины не портированы)

	// event.remove({ id: 'gtceu:shaped/mv_food_refrigerator' })
	// event.remove({ id: 'gtceu:shaped/hv_food_refrigerator' })
	// event.remove({ id: 'gtceu:shaped/ev_food_refrigerator' })
	// event.remove({ id: 'gtceu:shaped/iv_food_refrigerator' })
	// event.recipes.gtceu.assembler('tfg:assembler/mv_food_refrigerator') ... ('1x tfg:mv_food_refrigerator')
	// event.recipes.gtceu.assembler('tfg:assembler/hv_food_refrigerator') ... ('1x tfg:hv_food_refrigerator')
	// event.recipes.gtceu.assembler('tfg:assembler/ev_food_refrigerator') ... ('1x tfg:ev_food_refrigerator')
	// event.recipes.gtceu.assembler('tfg:assembler/iv_food_refrigerator') ... ('1x tfg:iv_food_refrigerator')
	// (полные данные — в оригинальном recipes.refrigerators.js; жидкости: tfg:chlorodifluoromethane,
	//  tfg:1_1_1_2_tetrafluoroethane, tfg:cryogenized_fluix, tfg:solar_coolant_tier2)

	//#endregion

	// Refrigerants

	if (global.TFG_fluidExists('tfg:chlorodifluoromethane')) {
		event.recipes.gtceu.chemical_reactor('tfg:chemical_reactor/chlorodifluoromethane')
			.inputFluids(Fluid.of('gtceu:chloroform', 1000), Fluid.of('gtceu:hydrofluoric_acid', 2000))
			.outputFluids(Fluid.of('tfg:chlorodifluoromethane', 1000), Fluid.of('gtceu:hydrochloric_acid', 2000))
			.duration(480)
			.circuit(2)
			.EUt(GTValues.VA[GTValues.MV]);

		event.recipes.gtceu.chemical_reactor('tfg:chemical_reactor/breakdown/chlorodifluoromethane')
			.inputFluids(Fluid.of('tfg:chlorodifluoromethane', 200))
			.outputFluids(Fluid.of('gtceu:tetrafluoroethylene', 100), Fluid.of('gtceu:hydrochloric_acid', 200))
			.duration(100)
			.EUt(GTValues.VA[GTValues.HV]);
	} else {
		console.warn('[Gregnautics] [PORT-Ф2] tfg:chlorodifluoromethane отсутствует — рецепты хладагента R-22 пропущены');
	}

	if (global.TFG_fluidExists('tfg:acetylene')) {
		event.recipes.gtceu.chemical_reactor('tfg:chemical_reactor/acetylene')
			.inputFluids(Fluid.of('gtceu:methane', 2000), Fluid.of('gtceu:oxygen', 3000))
			.outputFluids(Fluid.of('tfg:acetylene', 1000), Fluid.of('minecraft:water', 3000))
			.circuit(4)
			.duration(120)
			.EUt(GTValues.VA[GTValues.MV]);
	}

	if (global.TFG_fluidExists('tfg:acetylene') && global.TFG_fluidExists('tfg:1_1_1_2_tetrafluoroethane')) {
		event.recipes.gtceu.chemical_reactor('tfg:chemical_reactor/1_1_1_2_tetrafluoroethane')
			.inputFluids(Fluid.of('tfg:acetylene', 1000), Fluid.of('gtceu:chlorine', 4000), Fluid.of('gtceu:hydrofluoric_acid', 4000))
			.outputFluids(Fluid.of('tfg:1_1_1_2_tetrafluoroethane', 1000), Fluid.of('gtceu:hydrochloric_acid', 4000))
			.circuit(4)
			.duration(480)
			.EUt(GTValues.VA[GTValues.HV]);
	}

	if (global.TFG_fluidExists('tfg:isobutane')) {
		event.recipes.gtceu.cracker('tfg:cracker/isobutane')
			.inputFluids(Fluid.of('gtceu:butane', 4000))
			.outputFluids(Fluid.of('tfg:isobutane', 1000), Fluid.of('gtceu:lpg', 3000))
			.circuit(4)
			.duration(2400)
			.EUt(GTValues.VA[GTValues.HV]);
	}
});
