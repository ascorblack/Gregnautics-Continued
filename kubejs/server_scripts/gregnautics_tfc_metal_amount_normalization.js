// priority: -5
"use strict";

const GREGNAUTICS_TFC_METAL_TEMPERATURES = {
	bismuth: 270,
	bismuth_bronze: 985,
	black_bronze: 1070,
	black_steel: 1485,
	blue_steel: 1540,
	brass: 930,
	bronze: 950,
	cast_iron: 1535,
	copper: 1080,
	gold: 1060,
	high_carbon_black_steel: 1485,
	high_carbon_blue_steel: 1540,
	high_carbon_red_steel: 1540,
	high_carbon_steel: 1540,
	nickel: 1453,
	pig_iron: 1535,
	red_steel: 1540,
	rose_gold: 960,
	silver: 961,
	steel: 1540,
	sterling_silver: 950,
	tin: 230,
	weak_blue_steel: 1540,
	weak_red_steel: 1540,
	weak_steel: 1540,
	wrought_iron: 1535,
	zinc: 420
};

const GREGNAUTICS_TFC_FINAL_METAL_GT_OUTPUTS = {
	bismuth: "gtceu:bismuth_ingot",
	bismuth_bronze: "gtceu:bismuth_bronze_ingot",
	black_bronze: "gtceu:black_bronze_ingot",
	black_steel: "gtceu:black_steel_ingot",
	blue_steel: "gtceu:blue_steel_ingot",
	brass: "gtceu:brass_ingot",
	bronze: "gtceu:bronze_ingot",
	copper: "gtceu:copper_ingot",
	gold: "gtceu:gold_ingot",
	nickel: "gtceu:nickel_ingot",
	red_steel: "gtceu:red_steel_ingot",
	rose_gold: "gtceu:rose_gold_ingot",
	silver: "gtceu:silver_ingot",
	steel: "gtceu:steel_ingot",
	sterling_silver: "gtceu:sterling_silver_ingot",
	tin: "gtceu:tin_ingot",
	wrought_iron: "gtceu:wrought_iron_ingot",
	zinc: "gtceu:zinc_ingot"
};

const GREGNAUTICS_TFC_HEATABLE_METAL_PARTS = [
	{ path: "anvil", amount: 2016 },
	{ path: "axe", amount: 144 },
	{ path: "axe_head", amount: 144 },
	{ path: "bars", amount: 18 },
	{ path: "boots", amount: 288 },
	{ path: "chain", amount: 9 },
	{ path: "chestplate", amount: 576 },
	{ path: "chisel", amount: 144 },
	{ path: "chisel_head", amount: 144 },
	{ path: "double_ingot", amount: 288 },
	{ path: "double_sheet", amount: 288 },
	{ path: "exposed_grate", amount: 72 },
	{ path: "fish_hook", amount: 144 },
	{ path: "fishing_rod", amount: 144 },
	{ path: "grate", amount: 72 },
	{ path: "greaves", amount: 432 },
	{ path: "hammer", amount: 144 },
	{ path: "hammer_head", amount: 144 },
	{ path: "helmet", amount: 432 },
	{ path: "hoe", amount: 144 },
	{ path: "hoe_head", amount: 144 },
	{ path: "horse_armor", amount: 864 },
	{ path: "ingot", amount: 144 },
	{ path: "javelin", amount: 144 },
	{ path: "javelin_head", amount: 144 },
	{ path: "knife", amount: 144 },
	{ path: "knife_blade", amount: 144 },
	{ path: "lamp", amount: 144 },
	{ path: "mace", amount: 288 },
	{ path: "mace_head", amount: 288 },
	{ path: "oxidized_grate", amount: 72 },
	{ path: "pickaxe", amount: 144 },
	{ path: "pickaxe_head", amount: 144 },
	{ path: "propick", amount: 144 },
	{ path: "propick_head", amount: 144 },
	{ path: "rod", amount: 72 },
	{ path: "saw", amount: 144 },
	{ path: "saw_blade", amount: 144 },
	{ path: "scythe", amount: 144 },
	{ path: "scythe_blade", amount: 144 },
	{ path: "shears", amount: 288 },
	{ path: "sheet", amount: 144 },
	{ path: "shield", amount: 288 },
	{ path: "shovel", amount: 144 },
	{ path: "shovel_head", amount: 144 },
	{ path: "sword", amount: 288 },
	{ path: "sword_blade", amount: 288 },
	{ path: "trapdoor", amount: 144 },
	{ path: "tuyere", amount: 288 },
	{ path: "unfinished_boots", amount: 144 },
	{ path: "unfinished_chestplate", amount: 288 },
	{ path: "unfinished_greaves", amount: 288 },
	{ path: "unfinished_helmet", amount: 288 },
	{ path: "unfinished_lamp", amount: 144 },
	{ path: "weathered_grate", amount: 72 }
];

const GREGNAUTICS_TFC_HEATABLE_METAL_BLOCK_PARTS = [
	{ path: "block", suffix: "", amount: 72 },
	{ path: "block", suffix: "_slab", amount: 36 },
	{ path: "block", suffix: "_stairs", amount: 54 },
	{ path: "exposed_block", suffix: "", amount: 72 },
	{ path: "exposed_block", suffix: "_slab", amount: 36 },
	{ path: "exposed_block", suffix: "_stairs", amount: 54 },
	{ path: "oxidized_block", suffix: "", amount: 72 },
	{ path: "oxidized_block", suffix: "_slab", amount: 36 },
	{ path: "oxidized_block", suffix: "_stairs", amount: 54 },
	{ path: "weathered_block", suffix: "", amount: 72 },
	{ path: "weathered_block", suffix: "_slab", amount: 36 },
	{ path: "weathered_block", suffix: "_stairs", amount: 54 }
];

const GREGNAUTICS_TFC_ANVIL_PLATE_METALS = [
	{ metal: "bismuth" },
	{ metal: "bismuth_bronze", tier: 2 },
	{ metal: "black_bronze", tier: 2 },
	{ metal: "black_steel", tier: 5 },
	{ metal: "blue_steel", tier: 6 },
	{ metal: "brass" },
	{ metal: "bronze", tier: 2 },
	{ metal: "cast_iron" },
	{ metal: "copper", tier: 1 },
	{ metal: "gold" },
	{ metal: "nickel" },
	{ metal: "red_steel", tier: 6 },
	{ metal: "rose_gold" },
	{ metal: "silver" },
	{ metal: "steel", tier: 4 },
	{ metal: "sterling_silver" },
	{ metal: "tin" },
	{ metal: "wrought_iron", tier: 3 },
	{ metal: "zinc" }
];

const GREGNAUTICS_TFC_SPECIAL_HEATABLE_METAL_ITEMS = [
	{ item: "minecraft:copper_door", fluid: "tfc:metal/copper", temperature: 1080, amount: 144, id: "tfc:heating/copper_door" },
	{ item: "minecraft:iron_door", fluid: "tfc:metal/cast_iron", temperature: 1535, amount: 144, id: "tfc:heating/iron_door" },
	{ item: "firmalife:copper_pipe", fluid: "tfc:metal/copper", temperature: 1080, amount: 18, id: "firmalife:heating/copper_pipe" },
	{ item: "firmalife:oxidized_copper_pipe", fluid: "tfc:metal/copper", temperature: 1080, amount: 18, id: "firmalife:heating/oxidized_copper_pipe" },
	{ item: "tfc:wrought_iron_grill", fluid: "tfc:metal/cast_iron", temperature: 1535, amount: 288, id: "gregnautics:heating/wrought_iron_grill" },
	{ item: "castirongrill:cast_iron_grill", fluid: "tfc:metal/cast_iron", temperature: 1535, amount: 288, id: "gregnautics:heating/cast_iron_grill" },
	{ item: "tfcbetterbf:insulation", fluid: "tfc:metal/cast_iron", temperature: 1535, amount: 432, id: "tfcbetterbf:heating/metal/insulation" },
	// [PORT-FIX] перенесено в tfg_port/waterflasks.recipes.js (канонический TFG-рецепт, выход gtceu:iron):
	// { item: "waterflasks:unfinished_iron_flask", fluid: "tfc:metal/cast_iron", temperature: 1535, amount: 144, id: "waterflasks:heating/wrought_iron_unfinished_iron_flask" },
	{ item: "waterflasks:unfinished_red_steel_flask", fluid: "tfc:metal/red_steel", temperature: 1540, amount: 144, id: "waterflasks:heating/red_steel_unfinished_red_steel_flask" }
];

const GREGNAUTICS_TFC_ITEMS_HEATING_METALS = [
	{ metal: "bismuth", fluid: "tfc:metal/bismuth", temperature: 270 },
	{ metal: "bismuth_bronze", fluid: "tfc:metal/bismuth_bronze", temperature: 985 },
	{ metal: "black_bronze", fluid: "tfc:metal/black_bronze", temperature: 1070 },
	{ metal: "black_steel", fluid: "tfc:metal/black_steel", temperature: 1485 },
	{ metal: "blue_steel", fluid: "tfc:metal/blue_steel", temperature: 1540 },
	{ metal: "brass", fluid: "tfc:metal/brass", temperature: 930 },
	{ metal: "bronze", fluid: "tfc:metal/bronze", temperature: 950 },
	{ metal: "cast_iron", fluid: "tfc:metal/cast_iron", temperature: 1535 },
	{ metal: "chromium", fluid: "gtceu:chromium", temperature: 1907 },
	{ metal: "copper", fluid: "tfc:metal/copper", temperature: 1080 },
	{ metal: "gold", fluid: "tfc:metal/gold", temperature: 1060 },
	{ metal: "nickel", fluid: "tfc:metal/nickel", temperature: 1453 },
	{ metal: "red_steel", fluid: "tfc:metal/red_steel", temperature: 1540 },
	{ metal: "rose_gold", fluid: "tfc:metal/rose_gold", temperature: 960 },
	{ metal: "silver", fluid: "tfc:metal/silver", temperature: 961 },
	{ metal: "stainless_steel", fluid: "gtceu:stainless_steel", temperature: 1540 },
	{ metal: "steel", fluid: "tfc:metal/steel", temperature: 1540 },
	{ metal: "sterling_silver", fluid: "tfc:metal/sterling_silver", temperature: 950 },
	{ metal: "tin", fluid: "tfc:metal/tin", temperature: 230 },
	{ metal: "wrought_iron", fluid: "tfc:metal/cast_iron", temperature: 1535 },
	{ metal: "zinc", fluid: "tfc:metal/zinc", temperature: 420 }
];

const GREGNAUTICS_TFC_ITEMS_HEATING_FORMS = [
	{ path: "double_sheet", tag: "double_sheets", amount: 288 },
	{ path: "foil", tag: "foils", amount: 72 },
	{ path: "gear", tag: "gears", amount: 288 },
	{ path: "heavy_sheet", tag: "heavy_sheets", amount: 432 },
	{ path: "nugget", tag: "nuggets", amount: 16 },
	{ path: "ring", tag: "rings", amount: 18 },
	{ path: "rod", tag: "rods", amount: 72 },
	{ path: "stamen", tag: "stamens", amount: 36 },
	{ path: "wire", tag: "wires", amount: 36 }
];

const GREGNAUTICS_TFC_ITEMS_SMALL_PART_HEATING_FORMS = [
	{ path: "bolt", tag: "bolts", amount: 18 },
	{ path: "nail", tag: "nails", amount: 18 },
	{ path: "rivet", tag: "rivets", amount: 18 },
	{ path: "screw", tag: "screws", amount: 18 }
];

const GREGNAUTICS_TFC_ITEMS_SMALL_PART_HANDFUL_HEATING_FORMS = [
	{ path: "handful_bolts", suffix: "bolts", amount: 72 },
	{ path: "handful_nails", suffix: "nails", amount: 72 },
	{ path: "handful_rivets", suffix: "rivets", amount: 72 },
	{ path: "handful_screws", suffix: "screws", amount: 72 }
];

const GREGNAUTICS_TFC_ITEMS_ANVIL_SMALL_PART_FORMS = [
	{ path: "ring", suffix: "ring", count: 2, rules: ["hit_last", "draw_second_last", "draw_third_last"] },
	{ path: "nail", suffix: "nail", count: 2, rules: ["punch_last", "hit_not_last", "bend_not_last"] },
	{ path: "rivet", suffix: "rivet", count: 2, rules: ["draw_not_last", "bend_any", "hit_any"] },
	{ path: "screw", suffix: "screw", count: 2, rules: ["hit_any", "hit_any", "draw_last"] }
];

const GREGNAUTICS_TFC_METAL_TOOLS_HEATING_FORMS = [
	{ path: "crossguard", amount: 18 },
	{ path: "pommel", amount: 36 }
];

const GREGNAUTICS_RNR_MATTOCK_METALS = [
	"bismuth_bronze",
	"black_bronze",
	"black_steel",
	"blue_steel",
	"bronze",
	"copper",
	"red_steel",
	"steel",
	"wrought_iron"
];

function gregnauticsTfcMetalOutput(metal) {
	const gtOutput = GREGNAUTICS_TFC_FINAL_METAL_GT_OUTPUTS[metal];
	if (gtOutput !== undefined && Item.exists(gtOutput)) {
		return gtOutput;
	}
	return `tfc:metal/ingot/${metal}`;
}

function gregnauticsTfcPlateOutput(metal) {
	const gtOutput = `gtceu:${metal}_plate`;
	if (Item.exists(gtOutput)) {
		return gtOutput;
	}
	return `tfc:metal/sheet/${metal}`;
}

function gregnauticsTfcItemsMetalName(metal) {
	return metal === "aluminium" ? "aluminum" : metal;
}

function gregnauticsTfcAnvilTier(metal) {
	const entry = GREGNAUTICS_TFC_ANVIL_PLATE_METALS.find(candidate => candidate.metal === metal);
	return entry === undefined ? 1 : (entry.tier || 1);
}

function gregnauticsTfcItemsSmallPartOutput(metal, form) {
	const gtOutput = `gtceu:${metal.metal}_${form.suffix}`;
	if (Item.exists(gtOutput)) {
		return gtOutput;
	}
	return `tfc_items:${gregnauticsTfcItemsMetalName(metal.metal)}_${form.suffix}`;
}

function gregnauticsAddTfcCasting144(event, metal, mold, breakChance, idSuffix) {
	const output = gregnauticsTfcMetalOutput(metal);
	if (!Item.exists(output)) {
		return;
	}

	const id = `tfc:casting/${metal}_${idSuffix}`;
	event.remove({ id: id });
	event.custom({
		type: "tfc:casting",
		break_chance: breakChance,
		fluid: {
			amount: 144,
			fluid: `tfc:metal/${metal}`
		},
		mold: {
			item: mold
		},
		result: {
			count: 1,
			id: output
		}
	}).id(id);
}

function gregnauticsScaledTfcMetalAmount(amount) {
	return amount;
}

function gregnauticsAddTfcPlateAnvilRecipe(event, entry) {
	const output = gregnauticsTfcPlateOutput(entry.metal);
	if (!Item.exists(output)) {
		return;
	}

	const recipe = {
		type: "tfc:anvil",
		ingredient: {
			tag: `c:ingots/${entry.metal}`
		},
		result: {
			count: 1,
			id: output
		},
		rules: [
			"hit_last",
			"hit_second_last",
			"hit_third_last"
		]
	};
	if (entry.tier !== undefined) {
		recipe.tier = entry.tier;
	}

	event.remove({ id: `tfc:anvil/metal/sheet/${entry.metal}` });
	event.custom(recipe).id(`tfc:anvil/metal/sheet/${entry.metal}`);
}

function gregnauticsAddTfcHeatingAmount(event, metal, path, name, amount) {
	const item = `tfc:metal/${path}/${name}`;
	if (!Item.exists(item)) {
		return;
	}

	const id = `tfc:heating/metal/${path}/${name}`;
	event.remove({ id: id });
	event.recipes.tfc.heating(item, GREGNAUTICS_TFC_METAL_TEMPERATURES[metal])
		.resultFluid(Fluid.of(`tfc:metal/${metal}`, gregnauticsScaledTfcMetalAmount(amount)))
		.id(id);
}

function gregnauticsAddSpecialTfcHeatingAmount(event, entry) {
	const ingredient = entry.ingredient || entry.item;
	if (ingredient === undefined) {
		return;
	}
	if (entry.item !== undefined && !Item.exists(entry.item)) {
		return;
	}

	event.remove({ id: entry.id });
	event.remove({ type: "tfc:heating", input: ingredient });
	const recipe = event.recipes.tfc.heating(ingredient, entry.temperature)
		.resultFluid(Fluid.of(entry.fluid, entry.amount));
	if (entry.useDurability === true) {
		recipe.useDurability(true);
	}
	recipe.id(entry.id);
}

function gregnauticsAddTfcItemsHeatingAmount(event, metal, form) {
	if (metal.metal === "cast_iron" && form.path === "nugget") {
		return;
	}

	gregnauticsAddSpecialTfcHeatingAmount(event, {
		ingredient: `#c:${form.tag}/${metal.metal}`,
		fluid: metal.fluid,
		temperature: metal.temperature,
		amount: form.amount,
		id: `tfc_items:heating/${metal.metal}/${form.path}`
	});
}

function gregnauticsAddRnrMattockHeatingAmount(event, metal, form, useDurability) {
	const item = `rnr:metal/${form}/${metal}`;
	if (!Item.exists(item)) {
		return;
	}

	gregnauticsAddSpecialTfcHeatingAmount(event, {
		item: item,
		fluid: metal === "wrought_iron" ? "tfc:metal/cast_iron" : `tfc:metal/${metal}`,
		temperature: GREGNAUTICS_TFC_METAL_TEMPERATURES[metal],
		amount: 144,
		id: `rnr:heating/metal/${form}/${metal}`,
		useDurability: useDurability
	});
}

function gregnauticsAddTfcItemsSmallPartHeatingAmount(event, metal, form) {
	const boltItem = `gtceu:${metal.metal}_bolt`;
	if (form.tag === "bolts" && !Item.exists(boltItem)) {
		return;
	}
	const ingredient = form.tag === "bolts" ? boltItem : `#c:${form.tag}/${metal.metal}`;

	event.remove({ id: `tfc_items:heating/${metal.metal}/nail_screw_rivet` });
	event.remove({ id: `tfc_items:heating/${metal.metal}/nail_screw_rivet_handful` });
	gregnauticsAddSpecialTfcHeatingAmount(event, {
		ingredient: ingredient,
		fluid: metal.fluid,
		temperature: metal.temperature,
		amount: form.amount,
		id: `gregnautics:tfc_items/heating/${metal.metal}/${form.path}`
	});
}

function gregnauticsAddTfcItemsSmallPartHandfulHeatingAmount(event, metal, form) {
	const item = `tfc_items:handful_${metal.metal}_${form.suffix}`;
	if (!Item.exists(item)) {
		return;
	}

	gregnauticsAddSpecialTfcHeatingAmount(event, {
		item: item,
		fluid: metal.fluid,
		temperature: metal.temperature,
		amount: form.amount,
		id: `gregnautics:tfc_items/heating/${metal.metal}/${form.path}`
	});
}

function gregnauticsAddTfcItemsSmallPartAnvilRecipe(event, metal, form) {
	const itemMetal = gregnauticsTfcItemsMetalName(metal.metal);
	const ingredient = `tfc_items:${itemMetal}_stamen`;
	const output = gregnauticsTfcItemsSmallPartOutput(metal, form);
	if (!Item.exists(ingredient) || !Item.exists(output)) {
		return;
	}

	event.remove({ id: `tfc_items:anvil/${itemMetal}_${form.path}` });
	event.custom({
		type: "tfc:anvil",
		ingredient: { item: ingredient },
		result: {
			count: form.count,
			id: output
		},
		tier: gregnauticsTfcAnvilTier(metal.metal),
		rules: form.rules
	}).id(`tfc_items:anvil/${itemMetal}_${form.path}`);
}

function gregnauticsAddTfcMetalToolsHeatingAmount(event, metal, form) {
	const item = `tfc_metal_tools:${metal.metal}_${form.path}`;
	if (!Item.exists(item)) {
		return;
	}

	gregnauticsAddSpecialTfcHeatingAmount(event, {
		item: item,
		fluid: metal.fluid,
		temperature: metal.temperature,
		amount: form.amount,
		id: `tfc_metal_tools:heating/metal/${metal.metal}/${form.path}`
	});
}

function gregnauticsAddTfchotornotTongsHeatingAmount(event, metal) {
	const part = `tfchotornot:tong_part/${metal.metal}`;
	const tongs = `tfchotornot:tongs/${metal.metal}`;

	if (Item.exists(part)) {
		gregnauticsAddSpecialTfcHeatingAmount(event, {
			item: part,
			fluid: metal.fluid,
			temperature: metal.temperature,
			amount: 144,
			id: `tfchotornot:heating/tong_part/${metal.metal}`
		});
	}

	if (Item.exists(tongs)) {
		gregnauticsAddSpecialTfcHeatingAmount(event, {
			item: tongs,
			fluid: metal.fluid,
			temperature: metal.temperature,
			amount: 288,
			id: `tfchotornot:heating/tongs/${metal.metal}`,
			useDurability: true
		});
	}
}

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: tfc_metal_amount_normalization recipes event start");
	Object.keys(GREGNAUTICS_TFC_METAL_TEMPERATURES).forEach(metal => {
		gregnauticsAddTfcCasting144(event, metal, "tfc:ceramic/ingot_mold", 0.1, "ingot");
		gregnauticsAddTfcCasting144(event, metal, "tfc:ceramic/fire_ingot_mold", 0.01, "fire_ingot");

		GREGNAUTICS_TFC_HEATABLE_METAL_PARTS.forEach(part => {
			gregnauticsAddTfcHeatingAmount(event, metal, part.path, metal, part.amount);
		});

		GREGNAUTICS_TFC_HEATABLE_METAL_BLOCK_PARTS.forEach(part => {
			gregnauticsAddTfcHeatingAmount(event, metal, part.path, `${metal}${part.suffix}`, part.amount);
		});
	});

	GREGNAUTICS_TFC_ANVIL_PLATE_METALS.forEach(entry => {
		gregnauticsAddTfcPlateAnvilRecipe(event, entry);
	});

	GREGNAUTICS_TFC_ITEMS_HEATING_METALS.forEach(metal => {
		GREGNAUTICS_TFC_ITEMS_ANVIL_SMALL_PART_FORMS.forEach(form => {
			gregnauticsAddTfcItemsSmallPartAnvilRecipe(event, metal, form);
		});
		GREGNAUTICS_TFC_ITEMS_HEATING_FORMS.forEach(form => {
			gregnauticsAddTfcItemsHeatingAmount(event, metal, form);
		});
		GREGNAUTICS_TFC_ITEMS_SMALL_PART_HEATING_FORMS.forEach(form => {
			gregnauticsAddTfcItemsSmallPartHeatingAmount(event, metal, form);
		});
		GREGNAUTICS_TFC_ITEMS_SMALL_PART_HANDFUL_HEATING_FORMS.forEach(form => {
			gregnauticsAddTfcItemsSmallPartHandfulHeatingAmount(event, metal, form);
		});
		GREGNAUTICS_TFC_METAL_TOOLS_HEATING_FORMS.forEach(form => {
			gregnauticsAddTfcMetalToolsHeatingAmount(event, metal, form);
		});
		gregnauticsAddTfchotornotTongsHeatingAmount(event, metal);
	});

	GREGNAUTICS_RNR_MATTOCK_METALS.forEach(metal => {
		gregnauticsAddRnrMattockHeatingAmount(event, metal, "mattock_head", false);
		gregnauticsAddRnrMattockHeatingAmount(event, metal, "mattock", true);
	});

	GREGNAUTICS_TFC_SPECIAL_HEATABLE_METAL_ITEMS.forEach(entry => {
		gregnauticsAddSpecialTfcHeatingAmount(event, entry);
	});
});
