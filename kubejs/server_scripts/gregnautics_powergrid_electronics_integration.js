"use strict";

const GREGNAUTICS_TFMG_LIGHT_BULB_RECIPE_FILTERS = [
	{ type: "minecraft:crafting_shaped" },
	{ type: "minecraft:crafting_shapeless" },
	{ type: "create:deploying" },
	{ type: "create:mechanical_crafting" },
	{ type: "create:sequenced_assembly", not: { mod: "createstellaris" } } // [PORT-FIX] createstellaris squenched_assembly не парсится KubeJS (старый формат deploying) — исключаем
];

function gregnauticsPowerGridReplaceRecipe(event, id, recipe) {
	event.remove({ id: id });
	event.custom(recipe).id(id);
}

ServerEvents.tags("item", event => {
	if (Item.exists("tfmg:light_bulb")) {
		event.add("c:hidden_from_recipe_viewers", "tfmg:light_bulb");
		event.add("forge:hidden_from_recipe_viewers", "tfmg:light_bulb");
	}
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: powergrid_electronics_integration recipes event start");
	if (Item.exists("tfmg:light_bulb") && Item.exists("powergrid:light_bulb")) {
		event.replaceInput(GREGNAUTICS_TFMG_LIGHT_BULB_RECIPE_FILTERS, "tfmg:light_bulb", "powergrid:light_bulb");
		event.remove({ output: "tfmg:light_bulb" });
	}

	gregnauticsPowerGridReplaceRecipe(event, "powergrid:crafting/light_bulb", {
		type: "minecraft:crafting_shaped",
		category: "misc",
		key: {
			G: { item: "tfc:lamp_glass" },
			I: { tag: "c:plates/iron" },
			W: { tag: "c:wires/iron" }
		},
		pattern: [
			" G ",
			" W ",
			" I "
		],
		result: { count: 1, id: "powergrid:light_bulb" }
	});

	gregnauticsPowerGridReplaceRecipe(event, "powergrid:crafting/lv_light_bulb", {
		type: "minecraft:crafting_shaped",
		category: "misc",
		key: {
			F: { tag: "minecraft:coals" },
			G: { item: "tfc:lamp_glass" },
			I: { tag: "c:plates/iron" }
		},
		pattern: [
			" G ",
			" F ",
			" I "
		],
		result: { count: 1, id: "powergrid:lv_light_bulb" }
	});

	gregnauticsPowerGridReplaceRecipe(event, "powergrid:crafting/neon_bulb", {
		type: "minecraft:crafting_shaped",
		category: "misc",
		key: {
			G: { item: "minecraft:glowstone_dust" },
			I: { tag: "c:plates/iron" },
			T: { item: "gtceu:glass_tube" }
		},
		pattern: [
			"T",
			"G",
			"I"
		],
		result: { count: 1, id: "powergrid:neon_bulb" }
	});

	gregnauticsPowerGridReplaceRecipe(event, "powergrid:crafting/regulator_tube", {
		type: "minecraft:crafting_shaped",
		category: "misc",
		key: {
			A: { item: "minecraft:amethyst_shard" },
			G: { item: "minecraft:glowstone_dust" },
			I: { tag: "c:plates/iron" },
			T: { item: "gtceu:glass_tube" }
		},
		pattern: [
			" A ",
			"GTG",
			" I "
		],
		result: { count: 1, id: "powergrid:regulator_tube" }
	});

	gregnauticsPowerGridReplaceRecipe(event, "powergrid:crafting/barretter_tube", {
		type: "minecraft:crafting_shaped",
		category: "misc",
		key: {
			I: { tag: "c:wires/iron" },
			P: { tag: "c:plates/iron" },
			T: { item: "gtceu:glass_tube" }
		},
		pattern: [
			"T",
			"I",
			"P"
		],
		result: { count: 1, id: "powergrid:barretter_tube" }
	});

	gregnauticsPowerGridReplaceRecipe(event, "powergrid:crafting/diode", {
		type: "minecraft:crafting_shaped",
		category: "misc",
		key: {
			C: { tag: "c:plates/copper" },
			R: { item: "gtceu:fine_red_alloy_wire" }
		},
		pattern: ["RC"],
		result: { count: 1, id: "powergrid:diode" }
	});

	gregnauticsPowerGridReplaceRecipe(event, "powergrid:crafting/vfet", {
		type: "minecraft:crafting_shaped",
		category: "misc",
		key: {
			C: { tag: "c:plates/copper" },
			I: { tag: "c:plates/iron" },
			R: { item: "gtceu:red_alloy_single_wire" }
		},
		pattern: [
			"C",
			"R",
			"I"
		],
		result: { count: 1, id: "powergrid:vfet" }
	});

	gregnauticsPowerGridReplaceRecipe(event, "powergrid:crafting/growth_lamp", {
		type: "minecraft:crafting_shaped",
		category: "misc",
		key: {
			G: { item: "tfc:lamp_glass" },
			I: { tag: "c:plates/iron" },
			Q: { item: "gtceu:flawless_quartzite_gem" },
			W: { tag: "c:wires/iron" }
		},
		pattern: [
			" G ",
			"WQW",
			" I "
		],
		result: { count: 1, id: "powergrid:growth_lamp" }
	});

	gregnauticsPowerGridReplaceRecipe(event, "powergrid:mechanical_crafting/crt", {
		type: "create:mechanical_crafting",
		accept_mirrored: true,
		category: "misc",
		key: {
			C: { tag: "c:copper_coils" },
			E: { item: "create:electron_tube" },
			L: { item: "minecraft:glowstone_dust" },
			T: { item: "gtceu:glass_tube" }
		},
		pattern: [
			"  L  ",
			" TTT ",
			"CCTCC",
			"  E  "
		],
		result: { count: 1, id: "powergrid:crt" }
	});

	gregnauticsPowerGridReplaceRecipe(event, "powergrid:mechanical_crafting/integrated_circuit", {
		type: "create:mechanical_crafting",
		accept_mirrored: true,
		category: "misc",
		key: {
			G: { tag: "c:nuggets/gold" },
			L: { item: "minecraft:lapis_lazuli" },
			R: { item: "gtceu:fine_red_alloy_wire" },
			T: { item: "gtceu:glass_tube" }
		},
		pattern: [
			"  L  ",
			"RRTRR",
			" GGG "
		],
		result: { count: 1, id: "powergrid:integrated_circuit" }
	});

	gregnauticsPowerGridReplaceRecipe(event, "powergrid:sequenced_assembly/bjt_npn", {
		type: "create:sequenced_assembly",
		ingredient: { tag: "c:plates/iron" },
		results: [
			{ chance: 100.0, id: "powergrid:bjt_npn" },
			{ chance: 10.0, id: "powergrid:bjt_pnp" },
			{ chance: 3.0, id: "gtceu:wrought_iron_plate" },
			{ chance: 3.0, id: "create:electron_tube" }
		],
		sequence: [
			{
				type: "create:deploying",
				ingredients: [
					{ item: "powergrid:incomplete_bjt_npn" },
					{ item: "gtceu:fine_red_alloy_wire" }
				],
				results: [{ id: "powergrid:incomplete_bjt_npn" }]
			},
			{
				type: "create:deploying",
				ingredients: [
					{ item: "powergrid:incomplete_bjt_npn" },
					{ tag: "c:wires/gold" }
				],
				results: [{ id: "powergrid:incomplete_bjt_npn" }]
			},
			{
				type: "create:pressing",
				ingredients: [{ item: "powergrid:incomplete_bjt_npn" }],
				results: [{ id: "powergrid:incomplete_bjt_npn" }]
			}
		],
		transitional_item: { id: "powergrid:incomplete_bjt_npn" }
	});

	gregnauticsPowerGridReplaceRecipe(event, "powergrid:sequenced_assembly/bjt_pnp", {
		type: "create:sequenced_assembly",
		ingredient: { tag: "c:plates/iron" },
		results: [
			{ chance: 100.0, id: "powergrid:bjt_pnp" },
			{ chance: 10.0, id: "powergrid:bjt_npn" },
			{ chance: 3.0, id: "gtceu:wrought_iron_plate" },
			{ chance: 3.0, id: "create:electron_tube" }
		],
		sequence: [
			{
				type: "create:deploying",
				ingredients: [
					{ item: "powergrid:incomplete_bjt_pnp" },
					{ tag: "c:wires/gold" }
				],
				results: [{ id: "powergrid:incomplete_bjt_pnp" }]
			},
			{
				type: "create:deploying",
				ingredients: [
					{ item: "powergrid:incomplete_bjt_pnp" },
					{ item: "gtceu:fine_red_alloy_wire" }
				],
				results: [{ id: "powergrid:incomplete_bjt_pnp" }]
			},
			{
				type: "create:pressing",
				ingredients: [{ item: "powergrid:incomplete_bjt_pnp" }],
				results: [{ id: "powergrid:incomplete_bjt_pnp" }]
			}
		],
		transitional_item: { id: "powergrid:incomplete_bjt_pnp" }
	});
});
