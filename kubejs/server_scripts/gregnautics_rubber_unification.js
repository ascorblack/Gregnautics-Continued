"use strict";

const GREGNAUTICS_TFMG_RUBBER_DUPLICATES = [
	"tfmg:rubber_sheet",
	"afc:rubber_bar"
];

const GREGNAUTICS_RUBBER_STORAGE_BLOCKS = [
	"gtceu:rubber_block",
	"gtceu:silicone_rubber_block",
	"gtceu:styrene_butadiene_rubber_block"
];

const GREGNAUTICS_RUBBER_RECIPE_FILTERS = [
	{ type: "minecraft:crafting_shaped" },
	{ type: "minecraft:crafting_shapeless" },
	{ type: "minecraft:stonecutting" },
	{ type: "tfc:pot" },
	{ type: "create:pressing" },
	{ type: "create:mechanical_crafting" },
	{ type: "tfmg:vat_machine_recipe" },
	{ type: "firmalife:vat" }
];

ServerEvents.tags("item", event => {
	event.remove("c:plates", "tfmg:rubber_sheet");
	event.remove("forge:plates", "tfmg:rubber_sheet");
	event.remove("c:ingots/rubber", "tfmg:rubber_sheet");
	event.remove("forge:ingots/rubber", "tfmg:rubber_sheet");

	event.add("c:sheets/rubber", "gtceu:rubber_plate");
	event.add("c:sheets/rubber", "gtceu:silicone_rubber_plate");
	event.add("c:sheets/rubber", "gtceu:styrene_butadiene_rubber_plate");
	event.add("forge:sheets/rubber", "gtceu:rubber_plate");
	event.add("forge:sheets/rubber", "gtceu:silicone_rubber_plate");
	event.add("forge:sheets/rubber", "gtceu:styrene_butadiene_rubber_plate");
	event.add("c:plates/rubber", "gtceu:rubber_plate");
	event.add("forge:plates/rubber", "gtceu:rubber_plate");
	event.add("c:ingots/rubber", "gtceu:rubber_ingot");
	event.add("forge:ingots/rubber", "gtceu:rubber_ingot");
	GREGNAUTICS_RUBBER_STORAGE_BLOCKS.forEach(item => {
		if (!Item.exists(item)) return;
		event.add("c:storage_blocks/rubber", item);
		event.add("forge:storage_blocks/rubber", item);
	});

	GREGNAUTICS_TFMG_RUBBER_DUPLICATES.forEach(item => {
		if (Item.exists(item)) {
			event.add("c:hidden_from_recipe_viewers", item);
			event.add("forge:hidden_from_recipe_viewers", item);
		}
	});
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: rubber_unification recipes event start");
	event.remove({ id: "tfmg:vat_machine_recipe/rubber" });
	event.replaceInput({ id: "powergrid:crafting/insulated_copper_wire" }, "minecraft:dried_kelp", "#c:plates/rubber");
	event.replaceInput({ id: "powergrid:crafting/copper_cord" }, "minecraft:dried_kelp", "#c:plates/rubber");
	event.replaceInput({ id: "create_hypertube:hypertube_funnel" }, "minecraft:dried_kelp", "#c:plates/rubber");
	event.replaceInput({ id: "aeronautics:mechanical_crafting/mounted_potato_cannon" }, "minecraft:dried_kelp_block", "#c:storage_blocks/rubber");
	event.replaceInput({ id: "simulated:mechanical_crafting/plunger_launcher" }, "minecraft:slime_ball", "#c:storage_blocks/rubber");
	event.replaceInput({ id: "simulated:mechanical_crafting/plunger_launcher" }, "minecraft:copper_ingot", "tfc:metal/ingot/copper");

	event.replaceInput(GREGNAUTICS_RUBBER_RECIPE_FILTERS, "tfmg:rubber_sheet", "#c:sheets/rubber");
	event.replaceOutput(GREGNAUTICS_RUBBER_RECIPE_FILTERS, "tfmg:rubber_sheet", "gtceu:rubber_plate");
	event.replaceInput(GREGNAUTICS_RUBBER_RECIPE_FILTERS, "afc:rubber_bar", "gtceu:rubber_ingot");
	event.replaceOutput(GREGNAUTICS_RUBBER_RECIPE_FILTERS, "afc:rubber_bar", "gtceu:rubber_ingot");
});
