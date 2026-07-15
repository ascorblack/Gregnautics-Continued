// priority: 10
"use strict";

const GREGNAUTICS_GT_METALS = [
	{ id: "copper", melt: 1080, heat: 0.00857, forge: 648, weld: 864, tier: 1 },
	{ id: "cupronickel", melt: 1170, heat: 0.00857, forge: 702, weld: 936, tier: 2 },
	{ id: "bismuth", melt: 270, heat: 0.02143, forge: 162, weld: 216, tier: 1 },
	{ id: "tin", melt: 230, heat: 0.02143, forge: 138, weld: 184, tier: 1 },
	{ id: "zinc", melt: 420, heat: 0.01429, forge: 252, weld: 336, tier: 1 },
	{ id: "silver", melt: 961, heat: 0.00625, forge: 577, weld: 769, tier: 1 },
	{ id: "gold", melt: 1060, heat: 0.005, forge: 636, weld: 848, tier: 1 },
	{ id: "electrum", melt: 900, heat: 0.00857, forge: 648, weld: 864, tier: 1 },
	{ id: "nickel", melt: 1453, heat: 0.00625, forge: 872, weld: 1162, tier: 1 },
	{ id: "lead", melt: 330, heat: 0.01729, forge: 198, weld: 264, tier: 1 },
	{ id: "platinum", melt: 1768, heat: 0.00625, forge: 1061, weld: 1414, tier: 3 },
	{ id: "antimony", melt: 630, heat: 0.00857, forge: 378, weld: 504, tier: 1 },
	{ id: "aluminium", melt: 660, heat: 0.01, forge: 396, weld: 528, tier: 2 },
	{ id: "cobalt", melt: 1495, heat: 0.00857, forge: 897, weld: 1196, tier: 3 },
	{ id: "chromium", melt: 1907, heat: 0.00625, forge: 1144, weld: 1526, tier: 4 },
	{ id: "europium", melt: 822, heat: 0.00625, forge: 493, weld: 658, tier: 4 },
	{ id: "niobium_titanium", melt: 4500, heat: 0.0025, forge: 2700, weld: 3600, tier: 5 },
	{ id: "tungsten", melt: 3422, heat: 0.0025, forge: 2053, weld: 2738, tier: 5 },
	{ id: "vanadium_gallium", melt: 1450, heat: 0.00625, forge: 870, weld: 1160, tier: 5 },
	{ id: "yttrium_barium_cuprate", melt: 1500, heat: 0.00625, forge: 900, weld: 1200, tier: 5 },
	{ id: "redstone", melt: 460, heat: 0.01729, forge: null, weld: null, tier: 1 },
	{ id: "iron", melt: 1535, heat: 0.00857, forge: 921, weld: 1228, tier: 3 },
	{ id: "wrought_iron", melt: 1535, heat: 0.00857, forge: 921, weld: 1228, tier: 3 },
	{ id: "annealed_copper", melt: 1080, heat: 0.00857, forge: 648, weld: 864, tier: 1 },
	{ id: "steel", melt: 1540, heat: 0.00857, forge: 924, weld: 1232, tier: 4 },
	{ id: "stainless_steel", melt: 1540, heat: 0.00857, forge: 924, weld: 1232, tier: 4 },
	{ id: "black_steel", melt: 1485, heat: 0.00857, forge: 891, weld: 1188, tier: 5 },
	{ id: "red_steel", melt: 1540, heat: 0.00857, forge: 924, weld: 1232, tier: 6 },
	{ id: "blue_steel", melt: 1540, heat: 0.00857, forge: 924, weld: 1232, tier: 6 },
	{ id: "bronze", melt: 950, heat: 0.00857, forge: 570, weld: 760, tier: 2 },
	{ id: "bismuth_bronze", melt: 985, heat: 0.00857, forge: 591, weld: 788, tier: 2 },
	{ id: "black_bronze", melt: 1070, heat: 0.00857, forge: 642, weld: 856, tier: 2 },
	{ id: "brass", melt: 930, heat: 0.00857, forge: 558, weld: 744, tier: 2 },
	{ id: "rose_gold", melt: 960, heat: 0.00857, forge: 576, weld: 768, tier: 1 },
	{ id: "sterling_silver", melt: 950, heat: 0.00857, forge: 570, weld: 760, tier: 1 },
	{ id: "invar", melt: 1494, heat: 0.00741, forge: 896, weld: 1195, tier: 3 },
	{ id: "potin", melt: 807, heat: 0.0124, forge: 484, weld: 646, tier: 2 },
	{ id: "red_alloy", melt: 740, heat: 0.01529, forge: 444, weld: 592, tier: 2 },
	{ id: "tin_alloy", melt: 1250, heat: 0.00829, forge: 750, weld: 1000, tier: 3 },
	{ id: "cobalt_brass", melt: 1060, heat: 0.00857, forge: 636, weld: 848, tier: 3 },
	{ id: "soldering_alloy", melt: 400, heat: 0.01429, forge: 240, weld: 320, tier: 1 },
	{ id: "battery_alloy", melt: 400, heat: 0.01429, forge: 240, weld: 320, tier: 1 }
];

const GREGNAUTICS_TFC_REPLACED_FLUIDS = [
	"bismuth",
	"bismuth_bronze",
	"black_bronze",
	"bronze",
	"brass",
	"copper",
	"gold",
	"nickel",
	"rose_gold",
	"silver",
	"tin",
	"zinc",
	"sterling_silver",
	"wrought_iron",
	"steel",
	"black_steel",
	"blue_steel",
	"red_steel"
];

const GREGNAUTICS_GT_ALLOY_RECIPES = [
	{
		id: "bronze",
		parts: [
			{ fluid: "gtceu:copper", min: 0.7, max: 0.8 },
			{ fluid: "gtceu:tin", min: 0.2, max: 0.3 }
		]
	},
	{
		id: "brass",
		parts: [
			{ fluid: "gtceu:copper", min: 0.7, max: 0.8 },
			{ fluid: "gtceu:zinc", min: 0.2, max: 0.3 }
		]
	},
	{
		id: "bismuth_bronze",
		parts: [
			{ fluid: "gtceu:copper", min: 0.5, max: 0.65 },
			{ fluid: "gtceu:zinc", min: 0.2, max: 0.3 },
			{ fluid: "gtceu:bismuth", min: 0.1, max: 0.2 }
		]
	},
	{
		id: "black_bronze",
		parts: [
			{ fluid: "gtceu:copper", min: 0.5, max: 0.7 },
			{ fluid: "gtceu:silver", min: 0.1, max: 0.25 },
			{ fluid: "gtceu:gold", min: 0.1, max: 0.25 }
		]
	},
	{
		id: "rose_gold",
		parts: [
			{ fluid: "gtceu:copper", min: 0.15, max: 0.3 },
			{ fluid: "gtceu:gold", min: 0.7, max: 0.85 }
		]
	},
	{
		id: "sterling_silver",
		parts: [
			{ fluid: "gtceu:copper", min: 0.2, max: 0.4 },
			{ fluid: "gtceu:silver", min: 0.6, max: 0.8 }
		]
	},
	{
		id: "electrum",
		remove: ["createaddition:mixing/electrum"],
		parts: [
			{ fluid: "gtceu:gold", min: 0.45, max: 0.55 },
			{ fluid: "gtceu:silver", min: 0.45, max: 0.55 }
		]
	},
	{
		id: "weak_steel",
		output: "tfc:metal/weak_steel",
		parts: [
			{ fluid: "gtceu:steel", min: 0.5, max: 0.7 },
			{ fluid: "gtceu:nickel", min: 0.15, max: 0.25 },
			{ fluid: "gtceu:black_bronze", min: 0.15, max: 0.25 }
		]
	},
	{
		id: "weak_blue_steel",
		output: "tfc:metal/weak_blue_steel",
		parts: [
			{ fluid: "gtceu:black_steel", min: 0.5, max: 0.55 },
			{ fluid: "gtceu:steel", min: 0.2, max: 0.25 },
			{ fluid: "gtceu:bismuth_bronze", min: 0.1, max: 0.15 },
			{ fluid: "gtceu:sterling_silver", min: 0.1, max: 0.15 }
		]
	},
	{
		id: "weak_red_steel",
		output: "tfc:metal/weak_red_steel",
		parts: [
			{ fluid: "gtceu:black_steel", min: 0.5, max: 0.55 },
			{ fluid: "gtceu:steel", min: 0.2, max: 0.25 },
			{ fluid: "gtceu:brass", min: 0.1, max: 0.15 },
			{ fluid: "gtceu:rose_gold", min: 0.1, max: 0.15 }
		]
	},
	{
		id: "stainless_steel",
		remove: ["firmalife:alloy/stainless_steel"],
		parts: [
			{ fluid: "gtceu:steel", min: 0.6, max: 0.75 },
			{ fluid: "gtceu:chromium", min: 0.15, max: 0.25 },
			{ fluid: "gtceu:nickel", min: 0.1, max: 0.2 }
		]
	},
	{
		id: "invar",
		parts: [
			{ fluid: "gtceu:iron", min: 0.6, max: 0.7 },
			{ fluid: "gtceu:nickel", min: 0.3, max: 0.4 }
		]
	},
	{
		id: "potin",
		parts: [
			{ fluid: "gtceu:copper", min: 0.63, max: 0.69 },
			{ fluid: "gtceu:tin", min: 0.19, max: 0.25 },
			{ fluid: "gtceu:lead", min: 0.08, max: 0.14 }
		]
	},
	{
		id: "red_alloy",
		parts: [
			{ fluid: "gtceu:redstone", min: 0.75, max: 0.85 },
			{ fluid: "gtceu:copper", min: 0.15, max: 0.25 }
		]
	},
	{
		id: "tin_alloy",
		parts: [
			{ fluid: "gtceu:tin", min: 0.45, max: 0.55 },
			{ fluid: "gtceu:iron", min: 0.45, max: 0.55 }
		]
	},
	{
		id: "cobalt_brass",
		parts: [
			{ fluid: "gtceu:brass", min: 0.74, max: 0.81 },
			{ fluid: "gtceu:cobalt", min: 0.08, max: 0.14 },
			{ fluid: "gtceu:aluminium", min: 0.08, max: 0.14 }
		]
	},
	{
		id: "soldering_alloy",
		parts: [
			{ fluid: "gtceu:tin", min: 0.9, max: 0.95 },
			{ fluid: "gtceu:antimony", min: 0.05, max: 0.1 }
		]
	},
	{
		id: "battery_alloy",
		parts: [
			{ fluid: "gtceu:lead", min: 0.75, max: 0.85 },
			{ fluid: "gtceu:antimony", min: 0.15, max: 0.25 }
		]
	}
];

// Metals that can be cast into TFC tool head molds (copper tier bronzes only)
const GREGNAUTICS_TOOL_HEAD_METALS = ["copper", "bismuth_bronze", "black_bronze", "bronze"];

// Tool head types: amount is in GTCEu mb (144 per ingot-equivalent; 288 for double)
const GREGNAUTICS_TOOL_HEADS = [
	{ type: "axe_head",     amount: 144 },
	{ type: "chisel_head",  amount: 144 },
	{ type: "hammer_head",  amount: 144 },
	{ type: "hoe_head",     amount: 144 },
	{ type: "javelin_head", amount: 144 },
	{ type: "knife_blade",  amount: 144 },
	{ type: "mace_head",    amount: 288 },
	{ type: "pickaxe_head", amount: 144 },
	{ type: "propick_head", amount: 144 },
	{ type: "saw_blade",    amount: 144 },
	{ type: "scythe_blade", amount: 144 },
	{ type: "shovel_head",  amount: 144 },
	{ type: "sword_blade",  amount: 288 }
];

// Bells: amount is in GTCEu mb (144 per ingot-equivalent)
const GREGNAUTICS_BELL_METALS = [
	{ metal: "brass",   result: "tfc:brass_bell" },
	{ metal: "bronze",  result: "tfc:bronze_bell" },
	{ metal: "gold",    result: "minecraft:bell" }
];

const GREGNAUTICS_TFC_ORES = [
	{ ore: "native_copper", gt: "copper", material: "Copper", metal: "copper", melt: 1080, common: "copper", percent: 100 },
	{ ore: "malachite", gt: "malachite", material: "Malachite", metal: "copper", melt: 1080, common: "copper", percent: 90 },
	{ ore: "tetrahedrite", gt: "tetrahedrite", material: "Tetrahedrite", metal: "copper", melt: 1080, common: "copper", percent: 90 },
	{ ore: "cassiterite", gt: "cassiterite", material: "Cassiterite", metal: "tin", melt: 230, common: "tin", percent: 100 },
	{ ore: "bismuthinite", gt: "bismuth", material: "Bismuth", metal: "bismuth", melt: 270, common: "bismuth", percent: 100 },
	{ ore: "native_gold", gt: "gold", material: "Gold", metal: "gold", melt: 1060, common: "gold", percent: 100 },
	{ ore: "native_silver", gt: "silver", material: "Silver", metal: "silver", melt: 961, common: "silver", percent: 100 },
	{ ore: "garnierite", gt: "garnierite", material: "Garnierite", metal: "nickel", melt: 1453, common: "nickel", percent: 100 },
	{ ore: "sphalerite", gt: "sphalerite", material: "Sphalerite", metal: "zinc", melt: 420, common: "zinc", percent: 90 },
	{ ore: "hematite", gt: "hematite", material: "Hematite", metal: "iron", melt: 1535, common: "iron", percent: 90 },
	{ ore: "limonite", gt: "yellow_limonite", material: "YellowLimonite", metal: "iron", melt: 1535, common: "iron", percent: 90 },
	{ ore: "magnetite", gt: "magnetite", material: "Magnetite", metal: "iron", melt: 1535, common: "iron", percent: 90 }
];

const GREGNAUTICS_TFC_ORE_GRADES = [
	{ grade: "small", baseAmount: 32, rawTag: "small_raw_materials" },
	{ grade: "poor", baseAmount: 64, rawTag: "poor_raw_materials" },
	{ grade: "normal", baseAmount: 72, rawTag: "raw_materials" },
	{ grade: "rich", baseAmount: 144, rawTag: "rich_raw_materials" }
];

const GREGNAUTICS_THERMAL_EXTRA_MELTING_MATERIALS = [
	{ id: "cast_iron", fluid: "tfc:metal/cast_iron", temperature: 1535 },
	{ id: "pig_iron", fluid: "tfc:metal/pig_iron", temperature: 1535 },
	{ id: "weak_steel", fluid: "tfc:metal/weak_steel", temperature: 1540 },
	{ id: "weak_red_steel", fluid: "tfc:metal/weak_red_steel", temperature: 1540 },
	{ id: "weak_blue_steel", fluid: "tfc:metal/weak_blue_steel", temperature: 1540 },
	{ id: "high_carbon_steel", fluid: "tfc:metal/high_carbon_steel", temperature: 1540 },
	{ id: "high_carbon_black_steel", fluid: "tfc:metal/high_carbon_black_steel", temperature: 1485 },
	{ id: "high_carbon_red_steel", fluid: "tfc:metal/high_carbon_red_steel", temperature: 1540 },
	{ id: "high_carbon_blue_steel", fluid: "tfc:metal/high_carbon_blue_steel", temperature: 1540 }
];

const GREGNAUTICS_GT_HEAT_FORMS = [
	{ prefix: "ingot", tag: "ingots", amount: 144, heat: 1.429 },
	{ prefix: "nugget", tag: "nuggets", amount: 16, heat: 0.124 },
	{ prefix: "dust", tag: "dusts", amount: 144, heat: 1.429 },
	{ prefix: "small_dust", tag: "small_dusts", amount: 36, heat: 0.714 },
	{ prefix: "tiny_dust", tag: "tiny_dusts", amount: 16, heat: 0.357 },
	{ prefix: "plate", tag: "plates", amount: 144, heat: 2.875 },
	{ prefix: "double_plate", tag: "double_plates", amount: 288, heat: 5.75 },
	{ prefix: "double_ingot", tag: "double_ingots", amount: 288, heat: 2.875 },
	{ prefix: "rod", tag: "rods", amount: 72, heat: 0.567 },
	{ prefix: "long_rod", tag: "long_rods", amount: 144, heat: 1.429 },
	{ prefix: "small_spring", tag: "small_springs", amount: 72, heat: 0.567 },
	{ prefix: "spring", tag: "springs", amount: 144, heat: 1.429 },
	{ prefix: "small_gear", tag: "small_gears", amount: 144, heat: 2.875 },
	{ prefix: "gear", tag: "gears", amount: 288, heat: 5.75 },
	{ prefix: "buzz_saw_blade", tag: "buzz_saw_blades", amount: 288, heat: 5.75 },
	{ prefix: "block", tag: "storage_blocks", amount: 1296, heat: 20 }
];

function gregnauticsGtItem(form, material) {
	switch (form) {
		case "small_dust": return `gtceu:small_${material}_dust`;
		case "tiny_dust": return `gtceu:tiny_${material}_dust`;
		case "small_spring": return `gtceu:small_${material}_spring`;
		case "small_gear": return `gtceu:small_${material}_gear`;
		case "double_plate": return `gtceu:double_${material}_plate`;
		case "double_ingot": return `gtceu:double_${material}_ingot`;
		case "long_rod": return `gtceu:long_${material}_rod`;
		case "block": return `gtceu:${material}_block`;
		default: return `gtceu:${material}_${form}`;
	}
}

function gregnauticsItemExists(item) {
	return Item.exists(item);
}

function gregnauticsStack(item, count) {
	return count === 1 ? item : `${count}x ${item}`;
}

function gregnauticsMetalFormTag(material, form, tag) {
	return gregnauticsItemExists(gregnauticsGtItem(form, material.id)) ? `#forge:${tag}/${material.id}` : null;
}

function gregnauticsTfcMetalName(material) {
	switch (material.id) {
		case "bismuth":
		case "bismuth_bronze":
		case "black_bronze":
		case "bronze":
		case "brass":
		case "copper":
		case "gold":
		case "nickel":
		case "rose_gold":
		case "silver":
		case "sterling_silver":
		case "tin":
		case "wrought_iron":
		case "zinc":
		case "steel":
		case "black_steel":
		case "blue_steel":
		case "red_steel":
			return `tfc:${material.id}`;
		case "iron":
			return "tfc:cast_iron";
		default:
			return `gregnautics:${material.id}`;
	}
}

function gregnauticsRegisterMetalData(_event, _material) {
	// Fluid heat data (melt temperature, specific heat capacity) for GTCEu fluids
	// is registered via static JSON files at kubejs/data/gregnautics/tfc/fluid_heat/
	// instead of event.fluidHeat(), because KubeJS coerces the JS object with
	// snake_case keys to a Java Record that has camelCase fields — the coercion
	// fails silently, leaving meltTemperature at 0.0, which makes isMolten()
	// always return true (temperature > 0 is always true at ambient), so the
	// metal never solidifies in the mold and casting recipes never fire.
}

function gregnauticsGtRecipeId(path) {
	return `gregnautics:${path}`;
}

function gregnauticsCalcProcessedAmount(defaultAmount, percent) {
	const percentPerItem = percent / Math.ceil(percent / 100);
	const value = defaultAmount * (percentPerItem / 100);
	return value % 2 === 0 ? value : Math.round(value) - 1;
}

function gregnauticsOreFluidAmount(ore, grade) {
	return gregnauticsCalcProcessedAmount(grade.baseAmount, ore.percent);
}

function gregnauticsOreFluid(ore) {
	return ore.metal === "iron" ? "tfc:metal/cast_iron" : `gtceu:${ore.metal}`;
}

function gregnauticsGtDust(ore, prefix) {
	switch (prefix) {
		case "tiny": return `gtceu:tiny_${ore.gt}_dust`;
		case "small": return `gtceu:small_${ore.gt}_dust`;
		case "pure": return `gtceu:pure_${ore.gt}_dust`;
		case "impure": return `gtceu:impure_${ore.gt}_dust`;
		default: return `gtceu:${ore.gt}_dust`;
	}
}

function gregnauticsGtCrushedOre(ore) {
	return `gtceu:crushed_${ore.gt}_ore`;
}

function gregnauticsGtPurifiedOre(ore) {
	return `gtceu:purified_${ore.gt}_ore`;
}

function gregnauticsGtRefinedOre(ore) {
	return `gtceu:refined_${ore.gt}_ore`;
}

function gregnauticsGtRawOre(ore) {
	return `gtceu:raw_${ore.gt}`;
}

function gregnauticsGtMaterial(ore) {
	switch (ore.material) {
		case "Copper": return GTMaterials.Copper;
		case "Malachite": return GTMaterials.Malachite;
		case "Tetrahedrite": return GTMaterials.Tetrahedrite;
		case "Cassiterite": return GTMaterials.Cassiterite;
		case "Bismuth": return GTMaterials.Bismuth;
		case "Gold": return GTMaterials.Gold;
		case "Silver": return GTMaterials.Silver;
		case "Garnierite": return GTMaterials.Garnierite;
		case "Sphalerite": return GTMaterials.Sphalerite;
		case "Hematite": return GTMaterials.Hematite;
		case "YellowLimonite": return GTMaterials.YellowLimonite;
		case "Magnetite": return GTMaterials.Magnetite;
		default: return null;
	}
}

function gregnauticsGtByproductDust(ore, index) {
	const material = gregnauticsGtMaterial(ore);
	if (material === null || material === undefined || !material.hasProperty(PropertyKey.ORE)) {
		return null;
	}

	const byproduct = material.getProperty(PropertyKey.ORE).getOreByProduct(index, material);
	if (byproduct === null || byproduct === undefined) {
		return null;
	}

	const dust = `gtceu:${byproduct.getName()}_dust`;
	return gregnauticsItemExists(dust) ? dust : null;
}

function gregnauticsAlloyPart(fluid, min, max) {
	return { fluid: fluid, min: min, max: max };
}

function gregnauticsRegisterGtAlloy(event, alloy) {
	event.remove({ id: `tfc:alloy/${alloy.id}` });
	event.remove({ id: `gregnautics:alloy/gtceu/${alloy.id}` });
	(alloy.remove || []).forEach(id => event.remove({ id: id }));

	event.recipes.tfc.alloy(alloy.output || `gtceu:${alloy.id}`, alloy.parts.map(part => gregnauticsAlloyPart(part.fluid, part.min, part.max)))
		.id(`gregnautics:alloy/gtceu/${alloy.id}`);
}

function gregnauticsAddItemHeatData(event, ingredient, heatCapacity, forgeTemperature, weldTemperature, id) {
	const data = {
		ingredient: ingredient,
		heatCapacity: heatCapacity
	};
	if (forgeTemperature !== null && forgeTemperature !== undefined) {
		data.forgingTemperature = forgeTemperature;
	}
	if (weldTemperature !== null && weldTemperature !== undefined) {
		data.weldingTemperature = weldTemperature;
	}
	event.heat(data, id);
}

function gregnauticsAddHeatAndMelting(event, material, form) {
	const item = gregnauticsGtItem(form.prefix, material.id);
	if (!gregnauticsItemExists(item)) {
		return;
	}

	event.recipes.tfc.heating(item, material.melt)
		.resultFluid(Fluid.of(`gtceu:${material.id}`, form.amount))
		.id(`gregnautics:heating/gtceu/${material.id}/${form.prefix}`);
}

function gregnauticsAddCasting(event, material) {
	let ingot = gregnauticsGtItem("ingot", material.id);
	if (GREGNAUTICS_TFC_REPLACED_FLUIDS.includes(material.id)) {
		event.remove({ id: `tfc:casting/${material.id}_ingot` });
		event.remove({ id: `tfc:casting/${material.id}_fire_ingot` });
		if (!gregnauticsItemExists(ingot)) {
			ingot = `tfc:metal/ingot/${material.id}`;
		}
	}

	if (!gregnauticsItemExists(ingot)) {
		return;
	}

	event.recipes.tfc.casting(
		ingot,
		"tfc:ceramic/ingot_mold",
		Fluid.of(`gtceu:${material.id}`, 144),
		0.1
	).id(`gregnautics:casting/gtceu/${material.id}_ingot`);

	event.recipes.tfc.casting(
		ingot,
		"tfc:ceramic/fire_ingot_mold",
		Fluid.of(`gtceu:${material.id}`, 144),
		0.01
	).id(`gregnautics:casting/gtceu/${material.id}_fire_ingot`);
}

function gregnauticsAddToolHeadCasting(event, metal) {
	GREGNAUTICS_TOOL_HEADS.forEach(head => {
		const output = `tfc:metal/${head.type}/${metal}`;
		if (!gregnauticsItemExists(output)) return;

		event.remove({ id: `tfc:casting/${metal}_${head.type}` });

		event.recipes.tfc.casting(
			output,
			`tfc:ceramic/${head.type}_mold`,
			Fluid.of(`gtceu:${metal}`, head.amount),
			0
		).id(`gregnautics:casting/gtceu/${metal}_${head.type}`);
	});
}

function gregnauticsAddBellCasting(event, bellMeta) {
	if (!gregnauticsItemExists(bellMeta.result)) return;

	event.remove({ id: `tfc:casting/${bellMeta.metal}_bell` });

	event.recipes.tfc.casting(
		bellMeta.result,
		"tfc:ceramic/bell_mold",
		Fluid.of(`gtceu:${bellMeta.metal}`, 144),
		0
	).id(`gregnautics:casting/gtceu/${bellMeta.metal}_bell`);
}

function gregnauticsAddTfcHeating(event, input, fluid, amount, melt, id) {
	if (!gregnauticsItemExists(input)) {
		return;
	}

	event.recipes.tfc.heating(input, melt)
		.resultFluid(Fluid.of(fluid, amount))
		.useDurability(true)
		.id(id);
}

function gregnauticsWoodencogHeatedIngredient(ingredient, minTemp) {
	return {
		type: "woodencog:heated",
		ingredient: ingredient,
		max_temp: Math.max(3000, minTemp + 200),
		min_temp: minTemp
	};
}

function gregnauticsWoodencogFluidIngredient(fluid, amount) {
	return {
		type: "neoforge:single",
		amount: amount,
		fluid: fluid
	};
}

function gregnauticsWoodencogFluidResult(fluid, amount) {
	return {
		amount: amount,
		id: fluid
	};
}

function gregnauticsWoodencogHeatedMixing(event, id, ingredients, resultFluid, resultAmount, heatRequirement, processingTime) {
	const recipe = {
		type: "woodencog:heated_mixing",
		heat_requirement: heatRequirement,
		ingredients: ingredients,
		results: [gregnauticsWoodencogFluidResult(resultFluid, resultAmount)]
	};
	if (processingTime !== undefined) {
		recipe.processing_time = processingTime;
	}

	event.remove({ id: id });
	event.custom(recipe).id(id);
}

function gregnauticsThermalMetalData(metal) {
	return GREGNAUTICS_GT_METALS.find(entry => entry.id === metal);
}

function gregnauticsThermalMetalTemperature(metal, fallback) {
	const data = gregnauticsThermalMetalData(metal);
	if (data !== undefined) {
		return data.melt;
	}
	const extra = GREGNAUTICS_THERMAL_EXTRA_MELTING_MATERIALS.find(entry => entry.id === metal);
	return extra === undefined ? fallback : extra.temperature;
}

function gregnauticsThermalOreInputTemperature(ore) {
	const data = gregnauticsThermalMetalData(ore.metal);
	if (data !== undefined && data.weld !== null) {
		return data.weld;
	}
	return Math.max(1, Math.round(ore.melt * 0.85));
}

function gregnauticsThermalMeltingMaterials() {
	return GREGNAUTICS_GT_METALS
		.filter(material => material.id !== "redstone" && material.id !== "iron")
		.map(material => ({ id: material.id, fluid: `gtceu:${material.id}`, temperature: material.melt }))
		.concat(GREGNAUTICS_THERMAL_EXTRA_MELTING_MATERIALS);
}

function gregnauticsRegisterThermalIngotMelting(event, material) {
	gregnauticsWoodencogHeatedMixing(
		event,
		`woodencog:heated_mixing/ingot_to_liquid_${material.id}`,
		[gregnauticsWoodencogHeatedIngredient({ tag: `c:ingots/${material.id}` }, material.temperature)],
		material.fluid,
		144,
		material.temperature
	);
}

function gregnauticsRegisterThermalTfcOreMelting(event, ore, grade) {
	const id = `woodencog:heated_mixing/ore/${grade.grade}_${ore.ore}_to_liquid`;
	const input = `tfc:ore/${grade.grade}_${ore.ore}`;
	if (!gregnauticsItemExists(input)) {
		event.remove({ id: id });
		return;
	}

	gregnauticsWoodencogHeatedMixing(
		event,
		id,
		[gregnauticsWoodencogHeatedIngredient({ item: input }, gregnauticsThermalOreInputTemperature(ore))],
		gregnauticsOreFluid(ore),
		gregnauticsOreFluidAmount(ore, grade),
		ore.melt
	);
}

function gregnauticsThermalAlloyAmounts(parts, total) {
	var amounts = [];
	var index = 0;
	var part = undefined;
	var minAmount = 0;
	var maxAmount = 0;
	var preferred = 0;

	for (index = 0; index < parts.length; index++) {
		part = parts[index];
		minAmount = Math.ceil(part.min * total);
		maxAmount = Math.floor(part.max * total);
		preferred = Math.round(((part.min + part.max) / 2) * total);
		amounts.push(Math.max(minAmount, Math.min(maxAmount, preferred)));
	}

	var delta = total - amounts.reduce((sum, amount) => sum + amount, 0);
	var limitAmount = 0;
	var transferAmount = 0;
	if (delta > 0) {
		for (index = 0; index < parts.length && delta > 0; index++) {
			limitAmount = Math.floor(parts[index].max * total);
			transferAmount = Math.min(delta, limitAmount - amounts[index]);
			amounts[index] += transferAmount;
			delta -= transferAmount;
		}
	} else if (delta < 0) {
		for (index = parts.length - 1; index >= 0 && delta < 0; index--) {
			limitAmount = Math.ceil(parts[index].min * total);
			transferAmount = Math.min(-delta, amounts[index] - limitAmount);
			amounts[index] -= transferAmount;
			delta += transferAmount;
		}
	}
	if (delta !== 0) {
		amounts[amounts.length - 1] += delta;
	}

	return amounts;
}

function gregnauticsRegisterThermalAlloyMixing(event, alloy) {
	const resultFluid = alloy.output || `gtceu:${alloy.id}`;
	const resultAmount = 144;
	const amounts = gregnauticsThermalAlloyAmounts(alloy.parts, resultAmount);

	event.remove({ id: `woodencog:heated_mixing/alloying_${alloy.id}` });
	event.remove({ id: `woodencog:heated_mixing/alloying/${alloy.id}` });
	gregnauticsWoodencogHeatedMixing(
		event,
		`gregnautics:woodencog/heated_mixing/alloying/${alloy.id}`,
		alloy.parts.map((part, index) => gregnauticsWoodencogFluidIngredient(part.fluid, amounts[index])),
		resultFluid,
		resultAmount,
		gregnauticsThermalMetalTemperature(alloy.id, 600),
		400
	);
}

function gregnauticsRegisterSmallOreProcessing(event, ore, item) {
	const smallDust = gregnauticsGtDust(ore, "small");

	if (gregnauticsItemExists(smallDust)) {
		event.recipes.gtceu.macerator()
			.itemInputs(item)
			.itemOutputs(smallDust)
			.duration(40)
			.EUt(7);

		event.recipes.tfc.quern(smallDust, item)
			.id(`gregnautics:quern/small_${ore.ore}`);
	}
}

function gregnauticsRegisterPoorOreProcessing(event, ore, item) {
	const crushed = gregnauticsGtCrushedOre(ore);
	const smallDust = gregnauticsGtDust(ore, "small");

	if (gregnauticsItemExists(crushed)) {
		event.recipes.gtceu.forge_hammer()
			.itemInputs(item)
			.chancedOutput(crushed, 7500)
			.duration(100)
			.EUt(16);

		event.recipes.gtceu.macerator()
			.itemInputs(item)
			.chancedOutput(crushed, 5000)
			.chancedOutput(crushed, 2500)
			.chancedOutput(crushed, 1250)
			.duration(40)
			.EUt(2);
	}

	if (gregnauticsItemExists(smallDust)) {
		event.recipes.tfc.quern(gregnauticsStack(smallDust, 2), item)
			.id(`gregnautics:quern/${ore.ore}_crushed_ore_from_poor_raw_ore`);
	}
}

function gregnauticsRegisterNormalOreProcessing(event, ore, item) {
	const crushed = gregnauticsGtCrushedOre(ore);
	if (!gregnauticsItemExists(crushed)) {
		return;
	}

	event.recipes.gtceu.forge_hammer()
		.itemInputs(item)
		.itemOutputs(crushed)
		.duration(100)
		.EUt(16);

	event.recipes.gtceu.macerator()
		.itemInputs(item)
		.itemOutputs(crushed)
		.chancedOutput(crushed, 5000)
		.chancedOutput(crushed, 2500)
		.chancedOutput(crushed, 1250)
		.duration(40)
		.EUt(2);

	event.recipes.tfc.quern(crushed, item)
		.id(`gregnautics:quern/${ore.ore}_crushed_ore_from_normal_raw_ore`);
}

function gregnauticsRegisterRichOreProcessing(event, ore, item) {
	const crushed = gregnauticsGtCrushedOre(ore);
	if (!gregnauticsItemExists(crushed)) {
		return;
	}

	event.recipes.gtceu.forge_hammer()
		.itemInputs(item)
		.itemOutputs(gregnauticsStack(crushed, 2))
		.duration(100)
		.EUt(16);

	event.recipes.gtceu.macerator()
		.itemInputs(item)
		.itemOutputs(gregnauticsStack(crushed, 2))
		.chancedOutput(crushed, 5000)
		.chancedOutput(crushed, 2500)
		.chancedOutput(crushed, 1250)
		.duration(40)
		.EUt(2);

	event.recipes.tfc.quern(gregnauticsStack(crushed, 2), item)
		.id(`gregnautics:quern/${ore.ore}_crushed_ore_from_rich_raw_ore`);
}

function gregnauticsRegisterTfcOreProcessing(event, ore, grade, item) {
	switch (grade.grade) {
		case "small":
			gregnauticsRegisterSmallOreProcessing(event, ore, item);
			break;
		case "poor":
			gregnauticsRegisterPoorOreProcessing(event, ore, item);
			break;
		case "normal":
			gregnauticsRegisterNormalOreProcessing(event, ore, item);
			break;
		case "rich":
			gregnauticsRegisterRichOreProcessing(event, ore, item);
			break;
	}
}

function gregnauticsRegisterTfcOreHeatingOverride(event, ore, grade) {
	const item = `tfc:ore/${grade.grade}_${ore.ore}`;
	const amount = gregnauticsOreFluidAmount(ore, grade);

	event.remove({ id: `tfc:heating/ore/${grade.grade}_${ore.ore}` });

	event.recipes.tfc.heating(item, ore.melt)
		.resultFluid(Fluid.of(gregnauticsOreFluid(ore), amount))
		.useDurability(true)
		.id(`tfc:heating/ore/${grade.grade}_${ore.ore}`);

	return true;
}

function gregnauticsRegisterGtOreWash(event, ore) {
	const crushed = gregnauticsGtCrushedOre(ore);
	const purified = gregnauticsGtPurifiedOre(ore);
	const impureDust = gregnauticsGtDust(ore, "impure");
	const pureDust = gregnauticsGtDust(ore, "pure");
	const dust = gregnauticsGtDust(ore, "dust");

	if (gregnauticsItemExists(crushed) && gregnauticsItemExists(purified)) {
		event.recipes.tfc.barrel_instant(Fluid.of("minecraft:water", 10))
			.inputItem(crushed)
			.outputItem(purified)
			.id(`gregnautics:instant_barrel/${ore.gt}_purified_ore`);
	}

	if (gregnauticsItemExists(impureDust) && gregnauticsItemExists(dust)) {
		event.recipes.tfc.barrel_instant(Fluid.of("minecraft:water", 10))
			.inputItem(impureDust)
			.outputItem(dust)
			.id(`gregnautics:instant_barrel/${ore.gt}_dust_from_impure`);
	}

	if (gregnauticsItemExists(pureDust) && gregnauticsItemExists(dust)) {
		event.recipes.tfc.barrel_instant(Fluid.of("minecraft:water", 10))
			.inputItem(pureDust)
			.outputItem(dust)
			.id(`gregnautics:instant_barrel/${ore.gt}_dust_from_pure`);
	}
}

function gregnauticsRegisterMineralDustMelting(event, ore) {
	// GTCEu ore form melting is centralized in gregnautics_gtceu_ore_melting_compat.js
	// and gregnautics_gtceu_ore_powder_compat.js. This script keeps TFC ore processing
	// and washing aliases only, otherwise JEI shows duplicate TFC heating recipes.
}

TFCEvents.data(event => {
	GREGNAUTICS_GT_METALS.forEach(material => {
		gregnauticsRegisterMetalData(event, material);

		GREGNAUTICS_GT_HEAT_FORMS.forEach(form => {
			const item = gregnauticsGtItem(form.prefix, material.id);
			if (gregnauticsItemExists(item)) {
				gregnauticsAddItemHeatData(
					event,
					item,
					form.heat,
					material.forge,
					material.weld,
					`gregnautics:gtceu/${material.id}/${form.prefix}_item`
				);
			}

			gregnauticsAddItemHeatData(
				event,
				`#c:${form.tag}/${material.id}`,
				form.heat,
				material.forge,
				material.weld,
				`gregnautics:gtceu/${material.id}/${form.prefix}_c_tag`
			);
			gregnauticsAddItemHeatData(
				event,
				`#forge:${form.tag}/${material.id}`,
				form.heat,
				material.forge,
				material.weld,
				`gregnautics:gtceu/${material.id}/${form.prefix}_forge_tag`
			);
		});
	});

	if (gregnauticsItemExists("minecraft:redstone")) {
		gregnauticsAddItemHeatData(event, "minecraft:redstone", 1.429, null, null, "gregnautics:gtceu/redstone/minecraft_redstone");
	}

	if (gregnauticsItemExists("tfmg:constantan_ingot")) {
		gregnauticsAddItemHeatData(event, "tfmg:constantan_ingot", 5.714, 450, 600, "gregnautics:tfmg/constantan/ingot_item");
		gregnauticsAddItemHeatData(event, "#c:ingots/constantan", 5.714, 450, 600, "gregnautics:tfmg/constantan/ingot_c_tag");
		gregnauticsAddItemHeatData(event, "#forge:ingots/constantan", 5.714, 450, 600, "gregnautics:tfmg/constantan/ingot_forge_tag");
	}

	GREGNAUTICS_TFC_ORES.forEach(ore => {
		[
			gregnauticsGtRawOre(ore),
			gregnauticsGtCrushedOre(ore),
			gregnauticsGtPurifiedOre(ore),
			gregnauticsGtRefinedOre(ore),
			gregnauticsGtDust(ore, "impure"),
			gregnauticsGtDust(ore, "pure"),
			gregnauticsGtDust(ore, "dust"),
			gregnauticsGtDust(ore, "small"),
			gregnauticsGtDust(ore, "tiny")
		].forEach((item, index) => {
			if (gregnauticsItemExists(item)) {
				gregnauticsAddItemHeatData(event, item, 1, null, null, `gregnautics:gtceu_ore/${ore.gt}/${index}`);
			}
		});
	});
});

ServerEvents.tags("item", event => {
	GREGNAUTICS_TFC_ORES.forEach(ore => {
		GREGNAUTICS_TFC_ORE_GRADES.forEach(grade => {
			const item = `tfc:ore/${grade.grade}_${ore.ore}`;
			event.add("c:ores", item);
			event.add(`c:ores/${ore.common}`, item);
			event.add(`c:ores/${ore.common}/${grade.grade}`, item);
			event.add(`c:ores/${ore.ore}`, item);
			event.add(`c:ores/${ore.gt}`, item);
			event.add(`forge:ores/${ore.common}`, item);
			event.add(`forge:ores/${ore.common}/${grade.grade}`, item);
			event.add(`forge:ores/${ore.ore}`, item);
			event.add(`forge:ores/${ore.gt}`, item);
			event.add(`forge:${grade.rawTag}`, item);
			event.add(`forge:${grade.rawTag}/${ore.gt}`, item);
			event.add(`c:${grade.rawTag}`, item);
			event.add(`c:${grade.rawTag}/${ore.gt}`, item);
		});
	});
});

ServerEvents.tags("fluid", event => {
	GREGNAUTICS_TFC_REPLACED_FLUIDS.forEach(metal => {
		event.remove("tfc:usable_in_ingot_mold", `tfc:metal/${metal}`);
		// Remove replaced TFC fluids from molten_metals so vessels only see GTCEu versions
		event.remove("tfc:molten_metals", `tfc:metal/${metal}`);
	});

	["chromium", "stainless_steel"].forEach(metal => {
		event.remove("tfc:usable_in_ingot_mold", `firmalife:metal/${metal}`);
		event.remove("tfc:molten_metals", `firmalife:metal/${metal}`);
	});

	GREGNAUTICS_GT_METALS.forEach(material => {
		if (material.id !== "redstone") {
			event.add("tfc:usable_in_ingot_mold", `gtceu:${material.id}`);
			// Vessels use tfc:molten_metals to decide which fluids to accept and retain
			event.add("tfc:molten_metals", `gtceu:${material.id}`);
		}
	});

	event.add("tfc:usable_in_bell_mold", "gtceu:bronze");
	event.add("tfc:usable_in_bell_mold", "gtceu:gold");
	event.add("tfc:usable_in_bell_mold", "gtceu:brass");

	event.add("tfc:usable_in_tool_head_mold", "gtceu:copper");
	event.add("tfc:usable_in_tool_head_mold", "gtceu:bismuth_bronze");
	event.add("tfc:usable_in_tool_head_mold", "gtceu:black_bronze");
	event.add("tfc:usable_in_tool_head_mold", "gtceu:bronze");
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: gtceu_tfc_material_compat recipes event start");
	let tfcOreHeatingRecipes = 0;

	GREGNAUTICS_TFC_ORES.forEach(ore => {
		GREGNAUTICS_TFC_ORE_GRADES.forEach(grade => {
			if (gregnauticsRegisterTfcOreHeatingOverride(event, ore, grade)) {
				tfcOreHeatingRecipes++;
			}
		});
	});

	console.info(`[Gregnautics] GTCEu TFC material compat: ${tfcOreHeatingRecipes} TFC ore heating overrides.`);
});

ServerEvents.recipes(event => {
	GREGNAUTICS_GT_METALS.forEach(material => {
		GREGNAUTICS_GT_HEAT_FORMS.forEach(form => gregnauticsAddHeatAndMelting(event, material, form));
		gregnauticsAddCasting(event, material);
	});

	let toolHeadCastingRecipes = 0;
	GREGNAUTICS_TOOL_HEAD_METALS.forEach(metal => {
		GREGNAUTICS_TOOL_HEADS.forEach(head => {
			const output = `tfc:metal/${head.type}/${metal}`;
			if (!gregnauticsItemExists(output)) return;
			event.remove({ id: `tfc:casting/${metal}_${head.type}` });
			event.recipes.tfc.casting(output, `tfc:ceramic/${head.type}_mold`, Fluid.of(`gtceu:${metal}`, head.amount), 0)
				.id(`gregnautics:casting/gtceu/${metal}_${head.type}`);
			toolHeadCastingRecipes++;
		});
	});
	console.info(`[Gregnautics] GTCEu TFC material compat: ${toolHeadCastingRecipes} tool head casting recipes.`);

	let bellCastingRecipes = 0;
	GREGNAUTICS_BELL_METALS.forEach(bellMeta => {
		if (!gregnauticsItemExists(bellMeta.result)) return;
		event.remove({ id: `tfc:casting/${bellMeta.metal}_bell` });
		event.recipes.tfc.casting(bellMeta.result, "tfc:ceramic/bell_mold", Fluid.of(`gtceu:${bellMeta.metal}`, 144), 0)
			.id(`gregnautics:casting/gtceu/${bellMeta.metal}_bell`);
		bellCastingRecipes++;
	});
	console.info(`[Gregnautics] GTCEu TFC material compat: ${bellCastingRecipes} bell casting recipes.`);

	if (gregnauticsItemExists("minecraft:redstone")) {
		event.recipes.tfc.heating("minecraft:redstone", 460)
			.resultFluid(Fluid.of("gtceu:redstone", 144))
			.id("gregnautics:heating/gtceu/redstone/minecraft_redstone");
	}

	GREGNAUTICS_GT_ALLOY_RECIPES.forEach(alloy => gregnauticsRegisterGtAlloy(event, alloy));
	GREGNAUTICS_GT_ALLOY_RECIPES.forEach(alloy => gregnauticsRegisterThermalAlloyMixing(event, alloy));
	gregnauticsThermalMeltingMaterials().forEach(material => gregnauticsRegisterThermalIngotMelting(event, material));

	GREGNAUTICS_TFC_ORES.forEach(ore => {
		gregnauticsRegisterGtOreWash(event, ore);
		gregnauticsRegisterMineralDustMelting(event, ore);

		GREGNAUTICS_TFC_ORE_GRADES.forEach(grade => {
			const item = `tfc:ore/${grade.grade}_${ore.ore}`;

			event.remove({ id: `tfc:quern/powder/${ore.ore}_${grade.grade}` });

			gregnauticsRegisterThermalTfcOreMelting(event, ore, grade);
			gregnauticsRegisterTfcOreProcessing(event, ore, grade, item);
		});
	});
});
