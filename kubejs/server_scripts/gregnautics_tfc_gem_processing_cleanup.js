// priority: -15
"use strict";

const GREGNAUTICS_TFC_GEM_POWDER_REPLACEMENTS = [
	{ tfc: "amethyst", gt: "amethyst", dust: "gtceu:amethyst_dust" },
	{ tfc: "diamond", gt: "diamond", dust: "gtceu:diamond_dust" },
	{ tfc: "emerald", gt: "emerald", dust: "gtceu:emerald_dust" },
	{ tfc: "lapis_lazuli", gt: "lapis", dust: "gtceu:lapis_dust" },
	{ tfc: "opal", gt: "opal", dust: "gtceu:opal_dust" },
	{ tfc: "pyrite", gt: "pyrite", dust: "gtceu:pyrite_dust" },
	{ tfc: "ruby", gt: "ruby", dust: "gtceu:ruby_dust" },
	{ tfc: "sapphire", gt: "sapphire", dust: "gtceu:sapphire_dust" },
	{ tfc: "topaz", gt: "topaz", dust: "gtceu:topaz_dust" }
];

const GREGNAUTICS_TFC_GEM_POLISHING_RECIPES = [
	{ id: "opal", input: "gtceu:opal_gem", output: "tfc:gem/opal" },
	{ id: "ruby", input: "gtceu:ruby_gem", output: "tfc:gem/ruby" },
	{ id: "sapphire", input: "gtceu:sapphire_gem", output: "tfc:gem/sapphire" },
	{ id: "topaz", input: "gtceu:topaz_gem", output: "tfc:gem/topaz" },
	{ id: "green_sapphire", input: "gtceu:green_sapphire_gem", output: "tfc:gem/sapphire" },
	{ id: "blue_topaz", input: "gtceu:blue_topaz_gem", output: "tfc:gem/topaz" }
];

const GREGNAUTICS_TFC_GEM_POWDER_REPLACE_FILTERS = [
	{ type: "minecraft:crafting_shaped" },
	{ type: "minecraft:crafting_shapeless" },
	{ type: "minecraft:smelting" },
	{ type: "minecraft:blasting" },
	{ type: "create:mixing" },
	{ type: "create:compacting" },
	{ type: "create:crushing" },
	{ type: "create:milling" },
	{ type: "create:deploying" },
	{ type: "create:sequenced_assembly" },
	{ type: "createvintageneoforged:polishing" },
	{ type: "tfc:heating" },
	{ type: "tfc:barrel_instant" },
	{ type: "tfc:barrel_sealed" },
	{ type: "tfc:pot" },
	{ type: "tfc:quern" }
];

function gregnauticsTfcGemCleanupItemExists(item) {
	return Item.exists(item);
}

function gregnauticsTfcGemCleanupAddPolishingRecipe(event, recipe) {
	if (!gregnauticsTfcGemCleanupItemExists(recipe.input) || !gregnauticsTfcGemCleanupItemExists(recipe.output)) {
		return;
	}

	event.custom({
		type: "create:sandpaper_polishing",
		ingredients: [{ item: recipe.input }],
		results: [{ id: recipe.output }]
	}).id(`gregnautics:create/sandpaper_polishing/${recipe.id}_gem`);

	event.custom({
		type: "createvintageneoforged:polishing",
		ingredients: [{ item: recipe.input }],
		results: [{ id: recipe.output }],
		processing_time: 120
	}).id(`gregnautics:createvintage/grinder_polishing/${recipe.id}_gem`);
}

ServerEvents.tags("item", event => {
	GREGNAUTICS_TFC_GEM_POWDER_REPLACEMENTS.forEach(entry => {
		const powder = `tfc:powder/${entry.tfc}`;
		if (gregnauticsTfcGemCleanupItemExists(powder)) {
			event.remove("tfc:gem_powders", powder);
			event.add("c:hidden_from_recipe_viewers", powder);
			event.add("forge:hidden_from_recipe_viewers", powder);
		}

		if (gregnauticsTfcGemCleanupItemExists(entry.dust)) {
			event.add("gregnautics:gem_abrasive_dusts", entry.dust);
			event.add("tfc:gem_powders", entry.dust);
		}
	});
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: tfc_gem_processing_cleanup recipes event start");
	GREGNAUTICS_TFC_GEM_POWDER_REPLACEMENTS.forEach(entry => {
		const powder = `tfc:powder/${entry.tfc}`;
		event.remove({ id: `tfc:quern/powder/${entry.tfc}` });
		event.remove({ type: "tfc:quern", output: powder });
		event.remove({ type: "tfc:quern", input: `tfc:gem/${entry.tfc}` });
		event.remove({ id: `tfc:crafting/gem/${entry.tfc}` });

		if (gregnauticsTfcGemCleanupItemExists(powder) && gregnauticsTfcGemCleanupItemExists(entry.dust)) {
			event.replaceInput(GREGNAUTICS_TFC_GEM_POWDER_REPLACE_FILTERS, powder, entry.dust);
			event.replaceOutput(GREGNAUTICS_TFC_GEM_POWDER_REPLACE_FILTERS, powder, entry.dust);
		}
	});

	event.remove({ id: "tfc:crafting/sandpaper" });
	event.shapeless("tfc:sandpaper", [
		"minecraft:paper",
		"tfc:powder/flux",
		"tfc:glue",
		"#c:sands",
		"#gregnautics:gem_abrasive_dusts"
	]).id("tfc:crafting/sandpaper");

	event.remove({ id: "tfc:crafting/gem_saw" });
	event.shapeless("tfc:gem_saw", [
		"#c:rods/brass",
		"#gregnautics:gem_abrasive_dusts"
	]).id("tfc:crafting/gem_saw");

	GREGNAUTICS_TFC_GEM_POLISHING_RECIPES.forEach(recipe => {
		gregnauticsTfcGemCleanupAddPolishingRecipe(event, recipe);
	});
});
