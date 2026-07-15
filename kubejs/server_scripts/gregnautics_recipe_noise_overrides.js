// priority: 5
"use strict";

const GREGNAUTICS_DISABLED_RECIPE_CONDITION = [
	{ type: "neoforge:mod_loaded", modid: "gregnautics_disabled_recipe_guard" }
];

const GREGNAUTICS_TFC_TRACK_WOODS = [
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
	"pine",
	"rosewood",
	"sequoia",
	"spruce",
	"sycamore",
	"white_cedar",
	"willow"
];

const GREGNAUTICS_AFC_SUPPORT_WOODS = [
	"araucaria",
	"baobab",
	"beech",
	"cypress",
	"eucalyptus",
	"fig",
	"ginkgo",
	"hevea",
	"ipe",
	"ironwood",
	"mahoe",
	"mahogany",
	"teak",
	"tualang"
];

const GREGNAUTICS_DYE_COLORS = [
	"black",
	"blue",
	"brown",
	"cyan",
	"gray",
	"green",
	"light_blue",
	"light_gray",
	"lime",
	"magenta",
	"orange",
	"pink",
	"purple",
	"red",
	"white",
	"yellow"
];

// 21 TFC geological rock types that conflict between TFC smooth stone and RnR flagstone recipes.
const GREGNAUTICS_TFC_ROCK_TYPES = [
	"andesite",
	"basalt",
	"chalk",
	"chert",
	"claystone",
	"conglomerate",
	"dacite",
	"diorite",
	"dolomite",
	"gabbro",
	"gneiss",
	"granite",
	"limestone",
	"marble",
	"phyllite",
	"quartzite",
	"rhyolite",
	"schist",
	"shale",
	"slate",
	"tuff"
];

// TFC sandstone colors that conflict between TFC cut_sandstone and RnR sandstone flagstone recipes.
const GREGNAUTICS_TFC_SANDSTONE_COLORS = [
	"black",
	"brown",
	"green",
	"pink",
	"red",
	"white",
	"yellow"
];

const GREGNAUTICS_CDG_CONCRETE_COLORS = [
	"black",
	"blue",
	"brown",
	"cyan",
	"gray",
	"green",
	"light_blue",
	"light_gray",
	"lime",
	"magenta",
	"orange",
	"pink",
	"purple",
	"red",
	"white",
	"yellow"
];

const GREGNAUTICS_DISABLED_RECIPE_IDS = [
	"storagedrawers:personal_key_cofh",
	"tfc:crafting/clay_ball_5",
	"tfc:crafting/clay_ball_6",
	"tfc:crafting/clay_ball_7",
	"tfc:crafting/clay_ball_8",
	"afc:crafting/wood/lumber/araucaria_from_kauri_logs",
	"tfchotornot:heating/insulating_items",
	"htm:interract/punch_hurt",
	"tfcrf:regrowth/fruits/cacao",
	"tfcrf:regrowth/fruits/fig"
];

function gregnauticsRecipeDataPath(id) {
	const split = id.split(":");
	return split[0] + ":recipe/" + split[1];
}

function gregnauticsAddRecipeOverride(event, id, json) {
	event.json(gregnauticsRecipeDataPath(id), json);
}

function gregnauticsDisabledRecipe() {
	return {
		"neoforge:conditions": GREGNAUTICS_DISABLED_RECIPE_CONDITION,
		type: "minecraft:crafting_shapeless",
		ingredients: [{ item: "minecraft:barrier" }],
		result: { id: "minecraft:barrier" }
	};
}

function gregnauticsLumberjackSupportInteraction(namespace, wood, output) {
	return {
		type: "lychee:block_interacting",
		item_in: { tag: "c:tools/saw" },
		block_in: {
			blocks: [
				`${namespace}:wood/stripped_log/${wood}`,
				`${namespace}:wood/stripped_wood/${wood}`
			]
		},
		post: [
			{ type: "add_item_cooldown", s: 1 },
			{ type: "execute", command: "particle minecraft:ash ~ ~0.5 ~ 0.1 0.1 0.1 0 60", hide: true },
			{ type: "execute", command: "playsound minecraft:item.axe.strip", hide: true },
			{ type: "drop_item", id: output, if: { type: "chance", chance: 0.99 } },
			{ type: "drop_item", id: output, if: { type: "chance", chance: 0.5 }, hide: true },
			{ type: "drop_item", id: "tfc_lumberjack:sawdust", if: { type: "chance", chance: 0.5 } },
			{ type: "place", block: "minecraft:air", if: { type: "chance", chance: 0.3 }, hide: true },
			{ type: "damage_item" }
		]
	};
}

function gregnauticsRailwaysTrackRecipe(wood, narrow) {
	const suffix = narrow ? "_narrow" : "";
	const track = `railways:track_tfc_${wood}${suffix}`;
	const incomplete = `railways:track_incomplete_tfc_${wood}${suffix}`;
	const deploy = {
		type: "create:deploying",
		ingredients: [
			{ item: incomplete },
			{ item: "gtceu:wrought_iron_rod" }
		],
		results: [{ id: incomplete }]
	};
	const sequence = narrow
		? [
			{
				type: "create:cutting",
				ingredients: [{ item: incomplete }],
				results: [{ id: incomplete }]
			},
			deploy,
			{
				type: "create:pressing",
				ingredients: [{ item: incomplete }],
				results: [{ id: incomplete }]
			}
		]
		: [
			deploy,
			deploy,
			{
				type: "create:pressing",
				ingredients: [{ item: incomplete }],
				results: [{ id: incomplete }]
			}
		];

	return {
		"neoforge:conditions": [{ type: "neoforge:mod_loaded", modid: "tfc" }],
		type: "create:sequenced_assembly",
		ingredient: { tag: `railways:compat_slabs/tfc/${wood}` },
		results: [{ id: track }],
		sequence: sequence,
		transitional_item: { id: incomplete }
	};
}

function gregnauticsInteriorsDyeRecipe(color, floor) {
	const type = floor ? "floor_chair" : "chair";
	const tag = floor ? "interiors:floor_chairs" : "interiors:chairs";
	return {
		type: "minecraft:crafting_shapeless",
		category: "building",
		ingredients: [
			{ tag: tag },
			{ item: `minecraft:${color}_dye` }
		],
		result: {
			count: 1,
			id: `interiors:${color}_${type}`
		}
	};
}

// RnR flagstone recipes conflict with TFC smooth stone / cut sandstone recipes:
// both use tfc:rock/raw/{stone} + chisel or tfc:smooth_sandstone/{color} + chisel.
// Fix: shift RnR input to the already-processed form so it no longer overlaps.
function gregnauticsRnrFlagstoneRockRecipe(stone) {
	return {
		type: "tfc:advanced_shapeless_crafting",
		ingredients: [
			{ item: "tfc:rock/smooth/" + stone },
			{ tag: "c:tools/chisel" }
		],
		primary_ingredient: { tag: "c:tools/chisel" },
		remainder: { modifiers: [{ type: "tfc:damage_crafting_remainder" }] },
		result: { count: 12, id: "rnr:flagstone/" + stone }
	};
}

function gregnauticsRnrFlagstoneSandstoneRecipe(color) {
	return {
		type: "tfc:advanced_shapeless_crafting",
		ingredients: [
			{ item: "tfc:cut_sandstone/" + color },
			{ tag: "c:tools/chisel" }
		],
		primary_ingredient: { tag: "c:tools/chisel" },
		remainder: { modifiers: [{ type: "tfc:damage_crafting_remainder" }] },
		result: { count: 8, id: "rnr:flagstone/" + color + "_sandstone" }
	};
}

function gregnauticsCdgConcreteRecipe(color) {
	return {
		type: "create:mixing",
		ingredients: [
			{ type: "neoforge:tag", tag: "c:water", amount: 100 },
			{ item: `minecraft:${color}_concrete_powder` }
		],
		results: [
			{ id: `createdieselgenerators:${color}_cement`, amount: 1000 },
			{ id: `minecraft:${color}_concrete_powder`, chance: 0.25 }
		]
	};
}

ServerEvents.generateData("after_mods", event => {
	event.json("c:tags/fluid/water", {
		values: ["minecraft:water"]
	});

	GREGNAUTICS_TFC_TRACK_WOODS.forEach(wood => {
		gregnauticsAddRecipeOverride(event, `railways:sequenced_assembly/track_tfc_${wood}`, gregnauticsRailwaysTrackRecipe(wood, false));
		gregnauticsAddRecipeOverride(event, `railways:sequenced_assembly/track_tfc_${wood}_narrow`, gregnauticsRailwaysTrackRecipe(wood, true));
		gregnauticsAddRecipeOverride(event, `tfcrf:regrowth/dttfc/${wood}_dynamic`, gregnauticsDisabledRecipe());
	});

	GREGNAUTICS_AFC_SUPPORT_WOODS.forEach(wood => {
		gregnauticsAddRecipeOverride(
			event,
			`gregnautics:lychee/afc/support/${wood}`,
			gregnauticsLumberjackSupportInteraction("afc", wood, `afc:wood/support/${wood}`)
		);
	});

	GREGNAUTICS_DYE_COLORS.forEach(color => {
		gregnauticsAddRecipeOverride(event, `interiors:crafting/chair/${color}_chair_from_other_chair`, gregnauticsInteriorsDyeRecipe(color, false));
		gregnauticsAddRecipeOverride(event, `interiors:crafting/floor_chair/${color}_floor_chair_from_other_floor_chair`, gregnauticsInteriorsDyeRecipe(color, true));
	});

	GREGNAUTICS_CDG_CONCRETE_COLORS.forEach(color => {
		gregnauticsAddRecipeOverride(event, `createdieselgenerators:mixing/${color}_concrete`, gregnauticsCdgConcreteRecipe(color));
	});

	gregnauticsAddRecipeOverride(event, "create:crafting/materials/electron_tube", {
		type: "minecraft:crafting_shaped",
		category: "misc",
		pattern: [
			" G ",
			"WRW",
			" P "
		],
		key: {
			W: { tag: "c:wires/copper" },
			R: { item: "gtceu:red_alloy_single_wire" },
			G: { item: "gtceu:glass_tube" },
			P: { tag: "gregnautics:plates/wrought_iron" }
		},
		result: { count: 1, id: "create:electron_tube" }
	});

	gregnauticsAddRecipeOverride(event, "create:crafting/kinetics/goggles", {
		type: "minecraft:crafting_shaped",
		category: "misc",
		key: {
			G: { item: "tfc:lens" },
			P: { tag: "c:plates/gold" },
			S: { tag: "c:strings" }
		},
		pattern: [
			" S ",
			"GPG"
		],
		result: { count: 1, id: "create:goggles" }
	});

	gregnauticsAddRecipeOverride(event, "gregnautics:glassworking/glass_tube", {
		type: "tfc:glassworking",
		batch: { item: "tfc:silica_glass_batch" },
		operations: ["tfc:blow", "tfc:stretch", "tfc:saw"],
		result: { count: 1, id: "gtceu:glass_tube" }
	});

	gregnauticsAddRecipeOverride(event, "createdieselgenerators:mixing/asphalt_block", {
		type: "create:mixing",
		heat_requirement: "heated",
		ingredients: [
			{ item: "minecraft:gravel" },
			{ item: "minecraft:gravel" },
			{ item: "minecraft:sand" },
			{ item: "minecraft:sand" },
			{ type: "neoforge:tag", tag: "c:crude_oil", amount: 100 }
		],
		results: [{ id: "createdieselgenerators:asphalt_block", count: 4 }]
	});

	gregnauticsAddRecipeOverride(event, "createdieselgenerators:mixing/biodiesel", {
		type: "create:mixing",
		ingredients: [
			{ type: "neoforge:tag", tag: "c:plantoil", amount: 100 },
			{ type: "neoforge:tag", tag: "c:ethanol", amount: 100 }
		],
		results: [{ id: "createdieselgenerators:biodiesel", amount: 200 }]
	});

	gregnauticsAddRecipeOverride(event, "farmersdelight:pie_crust_with_pie_dough", {
		"neoforge:conditions": [{ type: "neoforge:mod_loaded", modid: "firmalife" }],
		type: "minecraft:crafting_shaped",
		pattern: ["wMw", " d "],
		key: {
			w: { tag: "tfc:foods/sweeteners" },
			d: { item: "firmalife:food/pie_dough" },
			M: { type: "tfc:fluid_content", fluid: { amount: 1000, fluid: "minecraft:milk" } }
		},
		result: { count: 1, id: "farmersdelight:pie_crust" },
		modifiers: ["tfc:copy_food"]
	});

	gregnauticsAddRecipeOverride(event, "farmersdelight:integration/create/filling/chocolate_pie", {
		"neoforge:conditions": [{ type: "neoforge:mod_loaded", modid: "create" }],
		type: "create:filling",
		ingredients: [
			{ item: "farmersdelight:pie_crust" },
			{ type: "neoforge:tag", tag: "c:chocolate", amount: 500 }
		],
		results: [{ id: "farmersdelight:chocolate_pie" }]
	});

	gregnauticsAddRecipeOverride(event, "farmersdelight:integration/create/mixing/pie_crust_from_mixing", {
		"neoforge:conditions": [{ type: "neoforge:mod_loaded", modid: "create" }],
		type: "create:mixing",
		ingredients: [
			{ item: "tfc:food/wheat_flour" },
			{ item: "tfc:food/wheat_flour" },
			{ item: "tfc:food/wheat_flour" },
			{ item: "minecraft:sugar" },
			{ type: "neoforge:tag", tag: "c:milk", amount: 250 }
		],
		results: [{ id: "farmersdelight:pie_crust", count: 1 }]
	});

	gregnauticsAddRecipeOverride(event, "create:filling/honey_cookie", {
		"neoforge:conditions": [{ type: "neoforge:mod_loaded", modid: "create" }],
		type: "create:filling",
		ingredients: [
			{ item: "minecraft:cookie" },
			{ type: "neoforge:tag", tag: "c:honey", amount: 125 }
		],
		results: [{ count: 1, id: "farmersdelight:honey_cookie" }]
	});

	gregnauticsAddRecipeOverride(event, "createdeco:placard", {
		type: "minecraft:crafting_shapeless",
		category: "misc",
		group: "dye_placard",
		ingredients: [
			{ tag: "createdeco:placards" },
			{ item: "minecraft:white_dye" }
		],
		result: { count: 1, id: "create:placard" }
	});

	gregnauticsAddRecipeOverride(event, "tfc_spindles:create/yarn_from_wool", {
		"neoforge:conditions": [{ type: "neoforge:mod_loaded", modid: "tfc" }],
		type: "create:sequenced_assembly",
		ingredient: { tag: "c:wool" },
		transitional_item: { id: "tfc:wool_yarn" },
		sequence: [
			{
				type: "create:deploying",
				ingredients: [{ item: "tfc:wool_yarn" }, { tag: "c:tools/spindle" }],
				results: [{ id: "tfc:wool_yarn" }]
			},
			{
				type: "create:deploying",
				ingredients: [{ item: "tfc:wool_yarn" }, { tag: "c:tools/spindle" }],
				results: [{ id: "tfc:wool_yarn" }]
			}
		],
		results: [{ id: "tfc:wool_yarn", count: 8 }],
		loops: 4
	});

	gregnauticsAddRecipeOverride(event, "tfc_spindles:create/yarn_from_pinapple", {
		"neoforge:conditions": [{ type: "neoforge:mod_loaded", modid: "firmalife" }],
		type: "create:sequenced_assembly",
		ingredient: { tag: "c:pineapple" },
		transitional_item: { id: "firmalife:pineapple_yarn" },
		sequence: [
			{
				type: "create:deploying",
				ingredients: [{ item: "firmalife:pineapple_yarn" }, { tag: "c:tools/spindle" }],
				results: [{ id: "firmalife:pineapple_yarn" }]
			},
			{
				type: "create:deploying",
				ingredients: [{ item: "firmalife:pineapple_yarn" }, { tag: "c:tools/spindle" }],
				results: [{ id: "firmalife:pineapple_yarn" }]
			}
		],
		results: [{ id: "firmalife:pineapple_yarn", count: 8 }],
		loops: 4
	});

	GREGNAUTICS_TFC_ROCK_TYPES.forEach(function(stone) {
		gregnauticsAddRecipeOverride(event, "rnr:crafting/flagstone/" + stone, gregnauticsRnrFlagstoneRockRecipe(stone));
	});

	GREGNAUTICS_TFC_SANDSTONE_COLORS.forEach(function(color) {
		gregnauticsAddRecipeOverride(event, "rnr:crafting/flagstone/" + color + "_sandstone", gregnauticsRnrFlagstoneSandstoneRecipe(color));
	});

	GREGNAUTICS_DISABLED_RECIPE_IDS.forEach(id => gregnauticsAddRecipeOverride(event, id, gregnauticsDisabledRecipe()));
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: recipe_noise_overrides recipes event start");
	// TFC 4.1.2 advanced shaped support recipes can crash while the crafting grid
	// is being rearranged, because assemble() reads an input slot outside the
	// trimmed CraftingInput. Remove support grid recipes by path; non-grid lumber
	// mechanics from tfc-lumberjack / machines are left intact.
	event.remove({ type: "tfc:advanced_shaped_crafting", id: /^[^:]+:crafting\/wood\/support\// });
});
