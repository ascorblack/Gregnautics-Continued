// priority: 5
"use strict";

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: blast_furnace_unification recipes event start");
	event.remove({ output: "minecraft:blast_furnace" });
	event.replaceInput({ output: "gtceu:electric_blast_furnace" }, "minecraft:blast_furnace", "tfc:blast_furnace");
});

ServerEvents.tags("item", event => {
	event.add("c:hidden_from_recipe_viewers", "minecraft:blast_furnace");
	event.add("forge:hidden_from_recipe_viewers", "minecraft:blast_furnace");
});

ServerEvents.tags("block", event => {
	event.add("c:hidden_from_recipe_viewers", "minecraft:blast_furnace");
	event.add("forge:hidden_from_recipe_viewers", "minecraft:blast_furnace");
});

function gregnauticsBlastFurnaceRecipePath(id) {
	const split = id.split(":");
	return split[0] + ":recipe/" + split[1];
}

function gregnauticsBlastFurnaceOverride(event, id, json) {
	event.json(gregnauticsBlastFurnaceRecipePath(id), json);
}

ServerEvents.generateData("after_mods", event => {
	gregnauticsBlastFurnaceOverride(event, "createpropulsion:crafting/liquid_burner", {
		type: "minecraft:crafting_shaped",
		pattern: [
			"CCC",
			"WBM",
			"WSW"
		],
		key: {
			C: { item: "gtceu:double_copper_plate" },
			W: { item: "gtceu:wrought_iron_plate" },
			B: { item: "tfc:bloomery" },
			M: { item: "create:mechanical_pump" },
			S: { tag: "c:stones/smooth" }
		},
		result: { id: "createpropulsion:liquid_burner" }
	});

	gregnauticsBlastFurnaceOverride(event, "createpropulsion:crafting/solid_burner", {
		type: "minecraft:crafting_shaped",
		pattern: [
			"CCC",
			"WBW",
			"WSW"
		],
		key: {
			C: { item: "gtceu:double_copper_plate" },
			W: { item: "gtceu:wrought_iron_plate" },
			B: { item: "tfc:bloomery" },
			S: { tag: "c:stones/smooth" }
		},
		result: { id: "createpropulsion:solid_burner" }
	});

	gregnauticsBlastFurnaceOverride(event, "simulated:red_portable_engine", {
		type: "minecraft:crafting_shaped",
		category: "misc",
		pattern: [
			" G ",
			"SES",
			" B "
		],
		key: {
			G: { item: "gtceu:wrought_iron_plate" },
			S: { item: "createdieselgenerators:engine_silencer" },
			E: { item: "simulated:engine_assembly" },
			B: { item: "tfc:blast_furnace" }
		},
		result: {
			count: 1,
			id: "simulated:red_portable_engine"
		}
	});

	gregnauticsBlastFurnaceOverride(event, "createthrusters:processing_upgrade_smelting_t2", {
		type: "minecraft:crafting_shaped",
		category: "misc",
		pattern: [
			" M ",
			"PBP",
			" X "
		],
		key: {
			M: { item: "tfc:blast_furnace" },
			P: { item: "createthrusters:processing_upgrade_smelting_t1" },
			B: { item: "create:brass_sheet" },
			X: { item: "create:brass_sheet" }
		},
		result: {
			id: "createthrusters:processing_upgrade_smelting_t2",
			count: 1
		}
	});

	gregnauticsBlastFurnaceOverride(event, "sophisticatedbackpacks:blasting_upgrade", {
		"neoforge:conditions": [
			{
				type: "sophisticatedcore:item_enabled",
				itemRegistryName: "sophisticatedbackpacks:blasting_upgrade"
			}
		],
		type: "minecraft:crafting_shaped",
		category: "misc",
		key: {
			B: { item: "sophisticatedbackpacks:upgrade_base" },
			F: { item: "tfc:blast_furnace" },
			I: { tag: "c:ingots/iron" },
			R: { tag: "c:dusts/redstone" }
		},
		pattern: [
			"RIR",
			"IBI",
			"RFR"
		],
		result: {
			count: 1,
			id: "sophisticatedbackpacks:blasting_upgrade"
		}
	});
});
