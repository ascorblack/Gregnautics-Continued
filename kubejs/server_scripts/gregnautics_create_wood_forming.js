// priority: 15
"use strict";

const gregnauticsWoodItemExists = item => Item.exists(item);
const gregnauticsWoodItemIngredient = item => ({ item: item });
const gregnauticsWoodTagIngredient = tag => ({ tag: tag });

const gregnauticsWoodResult = (id, count) => {
	const result = { id: id };
	if (count !== undefined && count !== 1) {
		result.count = count;
	}
	return result;
};

const gregnauticsWoodAddProcessingRecipe = (event, id, type, ingredients, results, extra) => {
	const recipe = {
		type: type,
		ingredients: ingredients,
		results: results
	};
	if (extra !== undefined) {
		Object.keys(extra).forEach(key => {
			recipe[key] = extra[key];
		});
	}

	event.remove({ id: id });
	event.custom(recipe).id(id);
};

const gregnauticsWoodReplaceRecipe = (event, id, recipe) => {
	event.remove({ id: id });
	event.custom(recipe).id(id);
};

const GREGNAUTICS_WOOD_PLANK_SLABS = [
	{
		id: "minecraft",
		woods: ["oak", "spruce", "birch", "jungle", "acacia", "dark_oak", "mangrove", "cherry", "bamboo", "crimson", "warped"],
		planks: wood => `minecraft:${wood}_planks`,
		slab: wood => `minecraft:${wood}_slab`
	},
	{
		id: "tfc",
		woods: [
			"acacia",
			"ash",
			"aspen",
			"birch",
			"blackwood",
			"chestnut",
			"douglas_fir",
			"hickory",
			"kapok",
			"mangrove",
			"maple",
			"oak",
			"palm",
			"palm_mosaic",
			"pine",
			"rosewood",
			"sequoia",
			"spruce",
			"sycamore",
			"white_cedar",
			"willow"
		],
		planks: wood => `tfc:wood/planks/${wood}`,
		slab: wood => `tfc:wood/planks/${wood}_slab`
	},
	{
		id: "afc",
		woods: ["araucaria", "baobab", "beech", "cypress", "eucalyptus", "fig", "ginkgo", "hevea", "ipe", "ironwood", "mahoe", "mahogany", "teak", "tualang"],
		planks: wood => `afc:wood/planks/${wood}`,
		slab: wood => `afc:wood/planks/${wood}_slab`
	}
];

const gregnauticsWoodAddPlankSlabCuttingRecipes = event => {
	GREGNAUTICS_WOOD_PLANK_SLABS.forEach(group => {
		group.woods.forEach(wood => {
			const planks = group.planks(wood);
			const slab = group.slab(wood);
			if (!gregnauticsWoodItemExists(planks) || !gregnauticsWoodItemExists(slab)) {
				return;
			}

			gregnauticsWoodAddProcessingRecipe(
				event,
				`gregnautics:create/cutting/${group.id}_${wood}_slabs_from_planks`,
				"create:cutting",
				[gregnauticsWoodItemIngredient(planks)],
				[gregnauticsWoodResult(slab, 2)],
				{ processing_time: 50 }
			);
		});
	});
};

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: create_wood_forming recipes event start");
	if (gregnauticsWoodItemExists("gtceu:wood_bolt")) {
		gregnauticsWoodAddProcessingRecipe(
			event,
			"gregnautics:create/cutting/short_wood_sticks_from_stick",
			"create:cutting",
			[gregnauticsWoodItemIngredient("minecraft:stick")],
			[gregnauticsWoodResult("gtceu:wood_bolt", 2)],
			{ processing_time: 60 }
		);
	}

	if (gregnauticsWoodItemExists("gtceu:wood_bolt") && gregnauticsWoodItemExists("tfc_items:short_wooden_handle")) {
		gregnauticsWoodAddProcessingRecipe(
			event,
			"gregnautics:createvintage/turning/short_wooden_handle_from_short_wood_stick",
			"createvintageneoforged:turning",
			[gregnauticsWoodItemIngredient("gtceu:wood_bolt")],
			[gregnauticsWoodResult("tfc_items:short_wooden_handle")],
			{ processing_time: 80 }
		);
	}

	if (gregnauticsWoodItemExists("gtceu:wood_gear")) {
		gregnauticsWoodReplaceRecipe(event, "gregnautics:crafting/wood_gear_from_tfc_lumber", {
			type: "minecraft:crafting_shaped",
			category: "misc",
			pattern: [
				"SLS",
				"L L",
				"SLS"
			],
			key: {
				L: gregnauticsWoodTagIngredient("tfc:lumber"),
				S: gregnauticsWoodItemIngredient("minecraft:stick")
			},
			result: gregnauticsWoodResult("gtceu:wood_gear")
		});

		gregnauticsWoodAddProcessingRecipe(
			event,
			"gregnautics:createvintage/turning/wood_gear_from_lumber",
			"createvintageneoforged:turning",
			[gregnauticsWoodTagIngredient("minecraft:wooden_slabs")],
			[gregnauticsWoodResult("gtceu:wood_gear")],
			{ processing_time: 100 }
		);

		gregnauticsWoodAddPlankSlabCuttingRecipes(event);

		gregnauticsWoodReplaceRecipe(event, "create:crafting/kinetics/cogwheel", {
			type: "minecraft:crafting_shapeless",
			category: "misc",
			ingredients: [
				gregnauticsWoodItemIngredient("create:shaft"),
				gregnauticsWoodItemIngredient("gtceu:wood_gear")
			],
			result: gregnauticsWoodResult("create:cogwheel")
		});

		gregnauticsWoodReplaceRecipe(event, "create:crafting/kinetics/large_cogwheel", {
			type: "minecraft:crafting_shapeless",
			category: "misc",
			ingredients: [
				gregnauticsWoodItemIngredient("create:shaft"),
				gregnauticsWoodItemIngredient("gtceu:wood_gear"),
				gregnauticsWoodItemIngredient("gtceu:wood_gear")
			],
			result: gregnauticsWoodResult("create:large_cogwheel")
		});

		gregnauticsWoodReplaceRecipe(event, "create:crafting/kinetics/large_cogwheel_from_little", {
			type: "minecraft:crafting_shapeless",
			category: "misc",
			ingredients: [
				gregnauticsWoodItemIngredient("create:cogwheel"),
				gregnauticsWoodItemIngredient("gtceu:wood_gear")
			],
			result: gregnauticsWoodResult("create:large_cogwheel")
		});

		gregnauticsWoodReplaceRecipe(event, "create:deploying/cogwheel", {
			type: "create:deploying",
			ingredients: [
				gregnauticsWoodItemIngredient("create:shaft"),
				gregnauticsWoodItemIngredient("gtceu:wood_gear")
			],
			results: [
				gregnauticsWoodResult("create:cogwheel")
			]
		});

		gregnauticsWoodReplaceRecipe(event, "create:deploying/large_cogwheel", {
			type: "create:deploying",
			ingredients: [
				gregnauticsWoodItemIngredient("create:cogwheel"),
				gregnauticsWoodItemIngredient("gtceu:wood_gear")
			],
			results: [
				gregnauticsWoodResult("create:large_cogwheel")
			]
		});
	}

	gregnauticsWoodReplaceRecipe(event, "tfmg:crafting/materials/steel_cogwheel", {
		type: "minecraft:crafting_shapeless",
		category: "misc",
		ingredients: [
			gregnauticsWoodTagIngredient("c:gears/steel"),
			gregnauticsWoodItemIngredient("create:shaft")
		],
		result: gregnauticsWoodResult("tfmg:steel_cogwheel")
	});

	gregnauticsWoodReplaceRecipe(event, "tfmg:crafting/materials/large_steel_cogwheel", {
		type: "minecraft:crafting_shapeless",
		category: "misc",
		ingredients: [
			gregnauticsWoodTagIngredient("c:gears/steel"),
			gregnauticsWoodTagIngredient("c:gears/steel"),
			gregnauticsWoodItemIngredient("create:shaft")
		],
		result: gregnauticsWoodResult("tfmg:large_steel_cogwheel")
	});

	gregnauticsWoodReplaceRecipe(event, "tfmg:crafting/materials/aluminum_cogwheel", {
		type: "minecraft:crafting_shapeless",
		category: "misc",
		ingredients: [
			gregnauticsWoodTagIngredient("c:gears/aluminium"),
			gregnauticsWoodItemIngredient("create:shaft")
		],
		result: gregnauticsWoodResult("tfmg:aluminum_cogwheel")
	});

	gregnauticsWoodReplaceRecipe(event, "tfmg:crafting/materials/large_aluminum_cogwheel", {
		type: "minecraft:crafting_shapeless",
		category: "misc",
		ingredients: [
			gregnauticsWoodTagIngredient("c:gears/aluminium"),
			gregnauticsWoodTagIngredient("c:gears/aluminium"),
			gregnauticsWoodItemIngredient("create:shaft")
		],
		result: gregnauticsWoodResult("tfmg:large_aluminum_cogwheel")
	});

	gregnauticsWoodReplaceRecipe(event, "copycats:crafting/copycat_cogwheel", {
		"neoforge:conditions": [
			{
				type: "copycats:feature_enabled",
				feature: "copycats:copycat_cogwheel",
				invert: false
			}
		],
		type: "minecraft:crafting_shapeless",
		category: "misc",
		ingredients: [
			gregnauticsWoodItemIngredient("tfmg:steel_cogwheel")
		],
		result: gregnauticsWoodResult("copycats:copycat_cogwheel")
	});

	gregnauticsWoodReplaceRecipe(event, "copycats:crafting/copycat_large_cogwheel", {
		"neoforge:conditions": [
			{
				type: "copycats:feature_enabled",
				feature: "copycats:copycat_large_cogwheel",
				invert: false
			}
		],
		type: "minecraft:crafting_shapeless",
		category: "misc",
		ingredients: [
			gregnauticsWoodItemIngredient("tfmg:large_steel_cogwheel")
		],
		result: gregnauticsWoodResult("copycats:copycat_large_cogwheel")
	});
});
