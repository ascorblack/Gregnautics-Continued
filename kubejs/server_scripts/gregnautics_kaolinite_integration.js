// priority: 20
"use strict";

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: kaolinite_integration recipes event start");
	event.recipes.gtceu.chemical_reactor("gregnautics:kaolinite_from_bauxite")
		.itemInputs("gtceu:bauxite_dust", "2x gtceu:silicon_dioxide_dust", "gtceu:calcite_dust")
		.inputFluids(Fluid.of("gtceu:sulfuric_acid", 500), Fluid.of("gtceu:distilled_water", 1000))
		.itemOutputs("2x tfc:powder/kaolinite")
		.duration(600)
		.EUt(30);

	event.recipes.gtceu.chemical_reactor("gregnautics:kaolinite_from_alunite")
		.itemInputs("gtceu:alunite_dust", "2x gtceu:silicon_dioxide_dust", "gtceu:calcite_dust")
		.inputFluids(Fluid.of("gtceu:sulfuric_acid", 250), Fluid.of("gtceu:distilled_water", 1000))
		.itemOutputs("2x tfc:powder/kaolinite")
		.duration(600)
		.EUt(30);
});
