// priority: -40
"use strict";

const GREGNAUTICS_TURPENTINE_FLUID = "createpropulsion:turpentine";

const GREGNAUTICS_TURPENTINE_TAPPING = [
	{ id: "pine", block: "tfc:wood/log/pine", amount: 3 },
	{ id: "spruce", block: "tfc:wood/log/spruce", amount: 4 },
	{ id: "douglas_fir", block: "tfc:wood/log/douglas_fir", amount: 2 },
	{ id: "white_cedar", block: "tfc:wood/log/white_cedar", amount: 3 },
	{ id: "sequoia", block: "tfc:wood/log/sequoia", amount: 2 }
];

const gregnauticsTurpentineFluid = amount => Fluid.of(GREGNAUTICS_TURPENTINE_FLUID, amount);

ServerEvents.tags("fluid", event => {
	event.add("tfc:ingredients", GREGNAUTICS_TURPENTINE_FLUID);
	event.add("tfc:usable_in_barrel", GREGNAUTICS_TURPENTINE_FLUID);
	event.add("tfc:usable_in_red_steel_bucket", GREGNAUTICS_TURPENTINE_FLUID);
	event.add("tfc:usable_in_wooden_bucket", GREGNAUTICS_TURPENTINE_FLUID);
});

ServerEvents.tags("block", event => {
	GREGNAUTICS_TURPENTINE_TAPPING.forEach(entry => {
		event.add("afc:tappable_logs", entry.block);
	});
});

ServerEvents.tags("item", event => {
	if (Item.exists("createpropulsion:pine_resin")) {
		event.add("c:hidden_from_recipe_viewers", "createpropulsion:pine_resin");
		event.add("forge:hidden_from_recipe_viewers", "createpropulsion:pine_resin");
	}
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: turpentine recipes event start");
	GREGNAUTICS_TURPENTINE_TAPPING.forEach(entry => {
		if (!Item.exists(entry.block)) {
			return;
		}

		event.custom({
			type: "afc:tree_tapping",
			input_block: [entry.block],
			result_fluid: {
				id: GREGNAUTICS_TURPENTINE_FLUID,
				amount: entry.amount
			},
			requires_natural_log: true
		}).id(`gregnautics:tree_tapping/turpentine/${entry.id}`);
	});

	event.remove({ id: "createpropulsion:crushing/spruce_log" });
	event.remove({ id: "createpropulsion:mixing/turpentine" });

	event.custom({
		type: "tfc:pot",
		ingredients: [],
		fluid_ingredient: {
			fluid: GREGNAUTICS_TURPENTINE_FLUID,
			amount: 1000
		},
		item_output: [
			{
				id: "gtceu:sticky_resin"
			}
		],
		duration: 1200,
		temperature: 300.0
	}).id("gregnautics:pot/sticky_resin_from_turpentine");

	if (Platform.isLoaded("tfmg")) {
		event.custom({
			type: "tfmg:vat_machine_recipe",
			allowed_vat_types: [
				"tfmg:steel_vat",
				"tfmg:firebrick_lined_vat"
			],
			heat_requirement: "heated",
			ingredients: [
				{
					type: "neoforge:single",
					amount: 1000,
					fluid: GREGNAUTICS_TURPENTINE_FLUID
				}
			],
			machines: [
				"tfmg:mixing"
			],
			min_size: 1,
			processing_time: 200,
			results: [
				{
					id: "gtceu:sticky_resin"
				}
			]
		}).id("gregnautics:tfmg/vat_machine_recipe/sticky_resin_from_turpentine");
	}
});
