// priority: 5
"use strict";

const GREGNAUTICS_TFMG_POLARIZER_RECIPES = [
	{ id: "iron_ingot", input: { tag: "c:ingots/iron" }, output: "gtceu:magnetic_iron_ingot" },
	{ id: "iron_nugget", input: { tag: "c:nuggets/iron" }, output: "gtceu:magnetic_iron_nugget" },
	{ id: "iron_dust", input: { tag: "c:dusts/iron" }, output: "gtceu:magnetic_iron_dust" },
	{ id: "iron_small_dust", input: { item: "gtceu:small_iron_dust" }, output: "gtceu:small_magnetic_iron_dust" },
	{ id: "iron_tiny_dust", input: { item: "gtceu:tiny_iron_dust" }, output: "gtceu:tiny_magnetic_iron_dust" },
	{ id: "iron_block", input: { tag: "c:storage_blocks/iron" }, output: "gtceu:magnetic_iron_block" },
	{ id: "iron_rod", input: { tag: "c:rods/iron" }, output: "gtceu:magnetic_iron_rod" },
	{ id: "iron_bolt", input: { tag: "c:bolts/iron" }, output: "gtceu:magnetic_iron_bolt" },
	{ id: "iron_screw", input: { tag: "c:screws/iron" }, output: "gtceu:magnetic_iron_screw" },
	{ id: "iron_plate", input: { tag: "c:plates/iron" }, output: "gtceu:magnetic_iron_plate" },

	{ id: "steel_ingot", input: { tag: "c:ingots/steel" }, output: "gtceu:magnetic_steel_ingot" },
	{ id: "steel_nugget", input: { tag: "c:nuggets/steel" }, output: "gtceu:magnetic_steel_nugget" },
	{ id: "steel_dust", input: { tag: "c:dusts/steel" }, output: "gtceu:magnetic_steel_dust" },
	{ id: "steel_small_dust", input: { item: "gtceu:small_steel_dust" }, output: "gtceu:small_magnetic_steel_dust" },
	{ id: "steel_tiny_dust", input: { item: "gtceu:tiny_steel_dust" }, output: "gtceu:tiny_magnetic_steel_dust" },
	{ id: "steel_block", input: { tag: "c:storage_blocks/steel" }, output: "gtceu:magnetic_steel_block" },
	{ id: "steel_rod", input: { tag: "c:rods/steel" }, output: "gtceu:magnetic_steel_rod" },
	{ id: "steel_plate", input: { tag: "c:plates/steel" }, output: "gtceu:magnetic_steel_plate" },
	{ id: "steel_double_plate", input: { item: "gtceu:double_steel_plate" }, output: "gtceu:double_magnetic_steel_plate" },
	{ id: "steel_dense_plate", input: { item: "gtceu:dense_steel_plate" }, output: "gtceu:dense_magnetic_steel_plate" },
	{ id: "steel_bolt", input: { tag: "c:bolts/steel" }, output: "gtceu:magnetic_steel_bolt" },
	{ id: "steel_screw", input: { tag: "c:screws/steel" }, output: "gtceu:magnetic_steel_screw" }
];

const GREGNAUTICS_MAGNETIC_BLOCKS = [
	"gtceu:magnetic_iron_block",
	"gtceu:magnetic_steel_block",
	"gtceu:magnetic_neodymium_block",
	"gtceu:magnetic_samarium_block"
];

const GREGNAUTICS_TFMG_HIDDEN_MAGNETIC_ALLOY_ITEMS = [
	"tfmg:laminated_magnetic_alloy_block",
	"tfmg:magnet",
	"tfmg:magnetic_alloy_ingot",
	"tfmg:magnetic_alloy_sheet"
];

function gregnauticsTfmgPolarizerInputExists(input) {
	return input.item === undefined || Item.exists(input.item);
}

function gregnauticsAddTfmgPolarizerRecipe(event, recipe) {
	if (!gregnauticsTfmgPolarizerInputExists(recipe.input) || !Item.exists(recipe.output)) {
		return;
	}

	event.custom({
		type: "tfmg:polarizing",
		ingredients: [recipe.input],
		results: [{ id: recipe.output }]
	}).id(`gregnautics:tfmg/polarizing/${recipe.id}`);
}

ServerEvents.tags("item", event => {
	if (Item.exists("gtceu:magnetic_steel_plate")) {
		event.add("c:plates/magnetic", "gtceu:magnetic_steel_plate");
		event.add("forge:plates/magnetic", "gtceu:magnetic_steel_plate");
	}

	GREGNAUTICS_MAGNETIC_BLOCKS.forEach(item => {
		if (!Item.exists(item)) {
			return;
		}

		event.add("c:storage_blocks/magnetic", item);
		event.add("forge:storage_blocks/magnetic", item);
	});

	GREGNAUTICS_TFMG_HIDDEN_MAGNETIC_ALLOY_ITEMS.forEach(item => {
		if (!Item.exists(item)) {
			return;
		}

		event.add("c:hidden_from_recipe_viewers", item);
		event.add("forge:hidden_from_recipe_viewers", item);
	});
});

ServerEvents.tags("block", event => {
	GREGNAUTICS_MAGNETIC_BLOCKS.forEach(block => {
		event.add("c:storage_blocks/magnetic", block);
		event.add("forge:storage_blocks/magnetic", block);
	});

	event.add("c:hidden_from_recipe_viewers", "tfmg:laminated_magnetic_alloy_block");
	event.add("forge:hidden_from_recipe_viewers", "tfmg:laminated_magnetic_alloy_block");
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: tfmg_magnetic_alloy_cleanup recipes event start");
	event.remove({ id: "tfmg:mixing/magnetic_alloy" });
	event.remove({ id: "tfmg:polarizing/magnet" });

	event.replaceInput(
		{ mod: "tfmg" },
		"tfmg:magnet",
		"#c:ingots/magnetic"
	);

	event.replaceInput(
		{ id: "tfmg:crafting/materials/unfinished_electromagnetic_coil", type: "minecraft:crafting_shaped" },
		"tfmg:magnetic_alloy_ingot",
		"#c:ingots/steel"
	);
	event.replaceInput(
		{ id: "tfmg:crafting/materials/transformer", type: "minecraft:crafting_shaped" },
		"tfmg:magnetic_alloy_sheet",
		"#c:plates/magnetic"
	);
	event.remove({ id: "tfmg:winding/large_coil" });
	event.custom({
		type: "tfmg:winding",
		ingredients: [
			{ tag: "c:storage_blocks/magnetic" },
			{ item: "tfmg:copper_spool" }
		],
		processing_time: 100,
		results: [
			{
				components: {
					"tfmg:coil_turns": 100
				},
				id: "tfmg:large_coil"
			}
		]
	}).id("tfmg:winding/large_coil");

	GREGNAUTICS_TFMG_POLARIZER_RECIPES.forEach(recipe => {
		gregnauticsAddTfmgPolarizerRecipe(event, recipe);
	});
});
