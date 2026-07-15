// priority: -20
"use strict";

const GREGNAUTICS_TFC_POWDER_TO_GT_DUST = [
	{ powder: "tfc:powder/native_copper", dust: "gtceu:copper_dust" },
	{ powder: "tfc:powder/malachite", dust: "gtceu:malachite_dust" },
	{ powder: "tfc:powder/tetrahedrite", dust: "gtceu:tetrahedrite_dust" },
	{ powder: "tfc:powder/cassiterite", dust: "gtceu:cassiterite_dust" },
	{ powder: "tfc:powder/bismuthinite", dust: "gtceu:bismuth_dust" },
	{ powder: "tfc:powder/native_gold", dust: "gtceu:gold_dust" },
	{ powder: "tfc:powder/native_silver", dust: "gtceu:silver_dust" },
	{ powder: "tfc:powder/garnierite", dust: "gtceu:garnierite_dust" },
	{ powder: "tfc:powder/sphalerite", dust: "gtceu:sphalerite_dust" },
	{ powder: "tfc:powder/hematite", dust: "gtceu:hematite_dust" },
	{ powder: "tfc:powder/limonite", dust: "gtceu:yellow_limonite_dust" },
	{ powder: "tfc:powder/magnetite", dust: "gtceu:magnetite_dust" }
];

const GREGNAUTICS_TFC_POWDER_ORE_GRADES = ["small", "poor", "normal", "rich"];

const gregnauticsRecipeOutput = (item, count) => {
	return count === 1 ? item : `${count}x ${item}`;
};

const GREGNAUTICS_TFC_POWDER_INPUT_REPLACE_FILTERS = [
	{ type: "minecraft:crafting_shaped" },
	{ type: "minecraft:crafting_shapeless" },
	{ type: "minecraft:stonecutting" },
	{ type: "minecraft:smelting" },
	{ type: "minecraft:blasting" },
	{ type: "minecraft:smoking" },
	{ type: "minecraft:campfire_cooking" },
	{ type: "create:mixing" },
	{ type: "create:compacting" },
	{ type: "create:crushing" },
	{ type: "create:milling" },
	{ type: "create:pressing" },
	{ type: "create:deploying" },
	{ type: "create:sequenced_assembly" },
	{ type: "tfc:heating" },
	{ type: "tfc:anvil" },
	{ type: "tfc:welding" },
	{ type: "tfc:barrel_instant" },
	{ type: "tfc:barrel_sealed" },
	{ type: "tfc:pot" },
	{ type: "tfc:loom" }
];

const GREGNAUTICS_TFC_POWDER_OUTPUT_REPLACE_FILTERS = [
	{ type: "minecraft:crafting_shaped" },
	{ type: "minecraft:crafting_shapeless" },
	{ type: "minecraft:smelting" },
	{ type: "minecraft:blasting" },
	{ type: "minecraft:smoking" },
	{ type: "minecraft:campfire_cooking" },
	{ type: "create:mixing" },
	{ type: "create:compacting" },
	{ type: "create:crushing" },
	{ type: "create:milling" },
	{ type: "create:pressing" },
	{ type: "tfc:anvil" },
	{ type: "tfc:welding" },
	{ type: "tfc:barrel_instant" },
	{ type: "tfc:barrel_sealed" },
	{ type: "tfc:pot" }
];

ServerEvents.tags("item", event => {
	GREGNAUTICS_TFC_POWDER_TO_GT_DUST.forEach(entry => {
		if (Item.exists(entry.powder)) {
			event.add("c:hidden_from_recipe_viewers", entry.powder);
		}
	});
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: tfc_powder_unification recipes event start");
	GREGNAUTICS_TFC_POWDER_TO_GT_DUST.forEach(entry => {
		if (!Item.exists(entry.powder) || !Item.exists(entry.dust)) {
			return;
		}

		const namespace = entry.powder.split(":")[0];
		const powderPath = entry.powder.split("/")[1];
		const gtMaterial = entry.dust.substring("gtceu:".length, entry.dust.length - "_dust".length);
		const smallDust = `gtceu:small_${gtMaterial}_dust`;
		const crushedOre = `gtceu:crushed_${gtMaterial}_ore`;

		GREGNAUTICS_TFC_POWDER_ORE_GRADES.forEach(grade => {
			const input = `${namespace}:ore/${grade}_${powderPath}`;
			const oldRecipeId = `${namespace}:quern/powder/${powderPath}_${grade}`;
			const output = grade === "small" || grade === "poor" ? smallDust : crushedOre;
			const outputCount = grade === "poor" || grade === "rich" ? 2 : 1;

			event.remove({ id: oldRecipeId });

			if (Item.exists(input) && Item.exists(output)) {
				event.recipes.tfc.quern(gregnauticsRecipeOutput(output, outputCount), input)
					.id(oldRecipeId);

				event.recipes.create.milling(gregnauticsRecipeOutput(output, outputCount), input)
					.id(`gregnautics:create/milling/${namespace}/${powderPath}_${grade}`);
			}
		});

		if (namespace === "tfc") {
			event.remove({ id: `gregnautics:quern/small_${powderPath}` });
			event.remove({ id: `gregnautics:quern/${powderPath}_crushed_ore_from_poor_raw_ore` });
			event.remove({ id: `gregnautics:quern/${powderPath}_crushed_ore_from_normal_raw_ore` });
			event.remove({ id: `gregnautics:quern/${powderPath}_crushed_ore_from_rich_raw_ore` });
		}

		event.remove({ type: "tfc:quern", output: entry.powder });
		event.remove({ type: "tfc:heating", input: entry.powder });

		event.replaceInput(GREGNAUTICS_TFC_POWDER_INPUT_REPLACE_FILTERS, entry.powder, entry.dust);
		event.replaceOutput(GREGNAUTICS_TFC_POWDER_OUTPUT_REPLACE_FILTERS, entry.powder, entry.dust);
	});
});
