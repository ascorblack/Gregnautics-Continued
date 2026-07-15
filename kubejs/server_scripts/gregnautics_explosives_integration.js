// priority: 20
"use strict";

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: explosives_integration recipes event start");
	// The pack already has a TFC-style gunpowder recipe; remove CBC's direct reassembly shortcut.
	event.remove({ id: "tacz:gunpowder" });
	event.remove({ id: "createbigcannons:gunpowder_from_pinches" });

	event.remove({ id: "createbigcannons:mixing/guncotton" });
	event.custom({
		type: "create:mixing",
		ingredients: [
			{ tag: "createbigcannons:can_be_nitrated" },
			{ type: "neoforge:single", amount: 100, fluid: "gtceu:nitric_acid" },
			{ type: "neoforge:single", amount: 100, fluid: "gtceu:sulfuric_acid" }
		],
		processing_time: 400,
		results: [
			{ id: "createbigcannons:guncotton" }
		]
	}).id("gregnautics:create/mixing/guncotton");

	event.remove({ id: "tfmg:mixing/thermite" });
	event.custom({
		type: "create:mixing",
		ingredients: [
			{ item: "gtceu:wrought_iron_dust" },
			{ item: "gtceu:aluminium_dust" }
		],
		results: [
			{ id: "tfmg:thermite_powder" }
		]
	}).id("gregnautics:create/mixing/thermite_powder");

	event.remove({ id: "createbigcannons:hardened_nitro" });
	event.remove({ id: "createbigcannons:mixing/congealed_nitro" });
	event.remove({ id: "createbigcannons:mixing/congealed_nitro_no_nether" });
	event.custom({
		type: "create:mixing",
		heat_requirement: "heated",
		ingredients: [
			{ tag: "createbigcannons:guncotton" },
			{ item: "gtceu:gelatin_dust" },
			{ item: "gtceu:activated_carbon_dust" },
			{ type: "neoforge:single", amount: 250, fluid: "gtceu:glyceryl_trinitrate" },
			{ type: "neoforge:single", amount: 100, fluid: "gtceu:nitrobenzene" }
		],
		processing_time: 400,
		results: [
			{ id: "createbigcannons:hardened_nitro" }
		]
	}).id("gregnautics:create/mixing/hardened_nitro");
});
