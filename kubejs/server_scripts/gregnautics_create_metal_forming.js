// priority: 15
"use strict";

const gregnauticsCreateUniqueList = items => items.filter((item, index, list) => list.indexOf(item) === index);

const GREGNAUTICS_CREATE_FORMING_MATERIALS = [
	"copper",
	"bismuth",
	"tin",
	"zinc",
	"silver",
	"gold",
	"nickel",
	"lead",
	"platinum",
	"antimony",
	"aluminium",
	"cobalt",
	"chromium",
	"wrought_iron",
	"annealed_copper",
	"steel",
	"black_steel",
	"red_steel",
	"blue_steel",
	"stainless_steel",
	"bronze",
	"bismuth_bronze",
	"black_bronze",
	"brass",
	"electrum",
	"constantan",
	"rose_gold",
	"sterling_silver",
	"invar",
	"potin",
	"red_alloy",
	"tin_alloy",
	"cobalt_brass",
	"soldering_alloy",
	"battery_alloy"
];

const GREGNAUTICS_CREATE_SMALL_SPRING_MATERIALS = [
	"aluminium",
	"copper",
	"europium",
	"gold",
	"iron",
	"lead",
	"niobium_titanium",
	"platinum",
	"red_alloy",
	"steel",
	"tin",
	"tungsten",
	"vanadium_gallium",
	"yttrium_barium_cuprate"
];

const GREGNAUTICS_CREATE_SPRING_MATERIALS = [
	"aluminium",
	"copper",
	"cupronickel",
	"europium",
	"gold",
	"iron",
	"lead",
	"niobium_titanium",
	"platinum",
	"steel",
	"tin",
	"tungsten",
	"vanadium_gallium",
	"yttrium_barium_cuprate"
];

const GREGNAUTICS_CREATE_FOIL_FINE_WIRE_MATERIALS = [
	"aluminium",
	"americium",
	"annealed_copper",
	"black_steel",
	"cobalt",
	"copper",
	"cupronickel",
	"electrum",
	"enriched_naquadah_trinium_europium_duranide",
	"europium",
	"gold",
	"hssg",
	"indium_tin_barium_titanium_cuprate",
	"iridium",
	"lead",
	"naquadah",
	"naquadria",
	"niobium_titanium",
	"osmiridium",
	"palladium",
	"platinum",
	"red_alloy",
	"rhodium",
	"ruridit",
	"silver",
	"steel",
	"tantalum",
	"tin",
	"tritanium",
	"tungsten_steel",
	"uranium_rhodium_dinaquadide",
	"yttrium_barium_cuprate",
	"zinc"
];

const GREGNAUTICS_CREATE_LATHE_MATERIALS = gregnauticsCreateUniqueList(
	GREGNAUTICS_CREATE_FORMING_MATERIALS
		.concat(GREGNAUTICS_CREATE_SMALL_SPRING_MATERIALS)
		.concat(GREGNAUTICS_CREATE_SPRING_MATERIALS)
		.concat(GREGNAUTICS_CREATE_FOIL_FINE_WIRE_MATERIALS)
).filter(material => material !== "iron" && material.indexOf("magnetic_") !== 0);

const GREGNAUTICS_CREATE_TFC_METAL_TOOLS_MATERIALS = [
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

const GREGNAUTICS_CREATE_LATHE_GEM_ROD_MATERIALS = [
	"amethyst",
	"blue_topaz",
	"diamond",
	"echo_shard",
	"emerald",
	"green_sapphire",
	"lapis",
	"lazurite",
	"olivine",
	"opal",
	"red_garnet",
	"ruby",
	"sapphire",
	"sodalite",
	"topaz",
	"yellow_garnet"
];

const GREGNAUTICS_CREATE_LATHE_ROUND_MATERIALS = [
	"hsss",
	"osmiridium",
	"tritanium"
];

const GREGNAUTICS_CREATE_LATHE_EXQUISITE_LENS_MATERIALS = [
	"amethyst",
	"diamond",
	"emerald",
	"glass",
	"lapis",
	"lazurite",
	"ruby",
	"sapphire"
];

const GREGNAUTICS_CREATE_BUZZ_SAW_BLADE_MATERIALS = [
	"aluminium",
	"blue_steel",
	"bronze",
	"cobalt_brass",
	"damascus_steel",
	"diamond",
	"duranium",
	"hsse",
	"invar",
	"iron",
	"naquadah_alloy",
	"neutronium",
	"red_steel",
	"rose_gold",
	"stainless_steel",
	"steel",
	"sterling_silver",
	"titanium",
	"tungsten_carbide",
	"tungsten_steel",
	"ultimet",
	"vanadium_steel",
	"wrought_iron"
];

const GREGNAUTICS_CREATE_FORGED_BUZZ_SAW_BLADE_MATERIALS = [
	"wrought_iron",
	"steel"
];

const GREGNAUTICS_CREATE_GEAR_MATERIALS = gregnauticsCreateUniqueList(
	GREGNAUTICS_CREATE_FORMING_MATERIALS
		.concat(GREGNAUTICS_CREATE_BUZZ_SAW_BLADE_MATERIALS)
		.concat([
			"darmstadtium",
			"hssg",
			"hsss",
			"osmiridium",
			"rhodium_plated_palladium",
			"titanium",
			"tritanium",
			"tungsten_carbide",
			"tungsten_steel"
		])
);

const GREGNAUTICS_CREATE_LEGACY_FORM_REPLACEMENTS = [
	["create:iron_sheet", "gtceu:wrought_iron_plate"],
	["create:golden_sheet", "gtceu:gold_plate"],
	["create:copper_sheet", "gtceu:copper_plate"],
	["create:brass_sheet", "gtceu:brass_plate"],
	["createaddition:electrum_sheet", "gtceu:electrum_plate"],
	["createaddition:zinc_sheet", "gtceu:zinc_plate"],
	["createaddition:iron_rod", "gtceu:wrought_iron_rod"],
	["createaddition:gold_rod", "gtceu:gold_rod"],
	["createaddition:copper_rod", "gtceu:copper_rod"],
	["createaddition:brass_rod", "gtceu:brass_rod"],
	["createaddition:electrum_rod", "gtceu:electrum_rod"],
	["createdeco:industrial_iron_sheet", "gtceu:wrought_iron_plate"],
	["createdeco:zinc_sheet", "gtceu:zinc_plate"],
	["powergrid:zinc_sheet", "gtceu:zinc_plate"],
	["tfmg:aluminum_sheet", "gtceu:aluminium_plate"],
	["tfmg:lead_sheet", "gtceu:lead_plate"],
	["tfmg:nickel_sheet", "gtceu:nickel_plate"],
	["tfmg:heavy_plate", "gtceu:steel_plate"],
	["tfc_ie_addon:metal/sheet/aluminum", "gtceu:aluminium_plate"],
	["tfc_ie_addon:metal/sheet/electrum", "gtceu:electrum_plate"],
	["tfc_ie_addon:metal/sheet/lead", "gtceu:lead_plate"],
	["createpropulsion:platinum_ingot", "gtceu:platinum_ingot"],
	["createpropulsion:platinum_nugget", "gtceu:platinum_nugget"],
	["createpropulsion:platinum_sheet", "gtceu:platinum_plate"],
	["createpropulsion:platinum_block", "gtceu:platinum_block"]
];

const GREGNAUTICS_TFC_LEGACY_SHEET_MATERIALS = [
	["bismuth", "bismuth"],
	["bismuth_bronze", "bismuth_bronze"],
	["black_bronze", "black_bronze"],
	["black_steel", "black_steel"],
	["blue_steel", "blue_steel"],
	["brass", "brass"],
	["bronze", "bronze"],
	["copper", "copper"],
	["gold", "gold"],
	["nickel", "nickel"],
	["red_steel", "red_steel"],
	["rose_gold", "rose_gold"],
	["silver", "silver"],
	["steel", "steel"],
	["sterling_silver", "sterling_silver"],
	["tin", "tin"],
	["wrought_iron", "wrought_iron"],
	["zinc", "zinc"]
];

const GREGNAUTICS_TFC_ITEMS_LEGACY_SHEET_MATERIALS = [
	["aluminum", "aluminium"],
	["electrum", "electrum"],
	["lead", "lead"]
];

const GREGNAUTICS_TFC_SHEET_ANVIL_TIERS = {
	black_bronze: 2,
	black_steel: 5,
	blue_steel: 6,
	bronze: 2,
	bismuth_bronze: 2,
	copper: 1,
	red_steel: 6,
	steel: 4,
	wrought_iron: 3
};

const GREGNAUTICS_CREATE_ANVIL_TIERS = {
	aluminium: 2,
	bismuth: 1,
	bismuth_bronze: 2,
	black_bronze: 2,
	black_steel: 5,
	blue_steel: 6,
	brass: 2,
	bronze: 2,
	cobalt: 3,
	cobalt_brass: 3,
	constantan: 2,
	copper: 1,
	cupronickel: 2,
	electrum: 1,
	europium: 4,
	gold: 1,
	invar: 3,
	iron: 3,
	lead: 1,
	nickel: 1,
	niobium_titanium: 5,
	platinum: 3,
	potin: 2,
	red_alloy: 2,
	red_steel: 6,
	rose_gold: 1,
	silver: 1,
	stainless_steel: 4,
	steel: 4,
	sterling_silver: 1,
	tin: 1,
	tin_alloy: 3,
	tungsten: 5,
	vanadium_gallium: 5,
	wrought_iron: 3,
	yttrium_barium_cuprate: 5,
	zinc: 1
};

const GREGNAUTICS_CREATE_METAL_WELD_TEMPERATURES = {
	aluminium: 528,
	annealed_copper: 864,
	antimony: 504,
	battery_alloy: 320,
	bismuth: 216,
	bismuth_bronze: 788,
	black_bronze: 856,
	black_steel: 1188,
	blue_steel: 1232,
	brass: 744,
	bronze: 760,
	chromium: 1526,
	cobalt: 1196,
	cobalt_brass: 848,
	constantan: 864,
	copper: 864,
	cupronickel: 936,
	electrum: 769,
	europium: 658,
	gold: 848,
	invar: 1195,
	iron: 1228,
	lead: 264,
	nickel: 1162,
	niobium_titanium: 3600,
	platinum: 1414,
	potin: 646,
	red_alloy: 592,
	red_steel: 1232,
	rose_gold: 768,
	silver: 769,
	soldering_alloy: 320,
	stainless_steel: 1232,
	steel: 1232,
	sterling_silver: 760,
	tin: 184,
	tin_alloy: 1000,
	tungsten: 2738,
	vanadium_gallium: 1160,
	wrought_iron: 1228,
	yttrium_barium_cuprate: 1200,
	zinc: 336
};

GREGNAUTICS_TFC_LEGACY_SHEET_MATERIALS.forEach(material => {
	const tfc = material[0];
	const gt = material[1];
	GREGNAUTICS_CREATE_LEGACY_FORM_REPLACEMENTS.push(
		[`tfc:metal/ingot/${tfc}`, `gtceu:${gt}_ingot`],
		[`tfc:metal/double_ingot/${tfc}`, `gtceu:double_${gt}_ingot`],
		[`tfc:metal/sheet/${tfc}`, `gtceu:${gt}_plate`],
		[`tfc:metal/double_sheet/${tfc}`, `gtceu:double_${gt}_plate`],
		[`tfc_items:${tfc}_heavy_sheet`, `gtceu:double_${gt}_plate`]
	);
});

GREGNAUTICS_TFC_ITEMS_LEGACY_SHEET_MATERIALS.forEach(material => {
	const tfc = material[0];
	const gt = material[1];
	GREGNAUTICS_CREATE_LEGACY_FORM_REPLACEMENTS.push(
		[`tfc_items:${tfc}_sheet`, `gtceu:${gt}_plate`],
		[`tfc_items:${tfc}_double_sheet`, `gtceu:double_${gt}_plate`],
		[`tfc_items:${tfc}_heavy_sheet`, `gtceu:double_${gt}_plate`]
	);
});

const GREGNAUTICS_CREATE_LEGACY_RECIPE_IDS = [
	"create:pressing/iron_ingot",
	"create:pressing/gold_ingot",
	"create:pressing/copper_ingot",
	"create:pressing/brass_ingot",
	"createaddition:rolling/iron_ingot",
	"createaddition:rolling/gold_ingot",
	"createaddition:rolling/copper_ingot",
	"createaddition:rolling/brass_rod",
	"createaddition:rolling/electrum_ingot",
	"createaddition:rolling/iron_plate",
	"createaddition:rolling/gold_plate",
	"createaddition:rolling/copper_plate",
	"createaddition:rolling/electrum_plate",
	"createdieselgenerators:hammering/iron_sheet",
	"createdieselgenerators:hammering/gold_sheet",
	"createdieselgenerators:hammering/copper_sheet",
	"createdieselgenerators:hammering/brass_sheet",
	"createdieselgenerators:compat/createaddition/iron_rod",
	"createdieselgenerators:compat/createaddition/gold_rod",
	"createdieselgenerators:compat/createaddition/copper_rod",
	"createdieselgenerators:compat/createaddition/electrum_rod",
	"createdieselgenerators:compat/createaddition/iron_wire",
	"createdieselgenerators:compat/createaddition/gold_wire",
	"createdieselgenerators:compat/createaddition/copper_wire",
	"createdieselgenerators:compat/createaddition/electrum_wire",
	"createvintageneoforged:coiling/iron_rod",
	"createvintageneoforged:coiling/iron_spring",
	"createvintageneoforged:coiling/concave_curving_head",
	"woodencog:refined_iron_bloom",
	"woodencog:wrought_iron",
	"simulated:spring",
	"tfmg:sequenced_assembly/heavy_plate"
];

const GREGNAUTICS_CREATE_LEGACY_REPLACEMENT_FILTERS = [
	{ type: "minecraft:crafting_shaped" },
	{ type: "minecraft:crafting_shapeless" },
	{ type: "minecraft:smelting" },
	{ type: "minecraft:blasting" },
	{ type: "create:pressing" },
	{ type: "create:cutting" },
	{ type: "create:compacting" },
	{ type: "create:deploying" },
	{ type: "create:mixing" },
	{ type: "create:sequenced_assembly", not: { mod: "createstellaris" } }, // [PORT-FIX] createstellaris squenched_assembly не парсится KubeJS (старый формат deploying) — исключаем
	{ type: "create:mechanical_crafting" },
	{ type: "createaddition:rolling" },
	{ type: "createaddition:charging" },
	{ type: "createdieselgenerators:wire_cutting" },
	{ type: "createdieselgenerators:hammering" },
	{ type: "createvintageneoforged:coiling" },
	{ type: "tfc:anvil" },
	{ type: "tfc:welding" }
];

const gregnauticsCreateItemExists = item => Item.exists(item);

const gregnauticsCreateResult = (id, count) => {
	const result = { id: id };
	if (count !== undefined && count !== 1) {
		result.count = count;
	}
	return result;
};

const gregnauticsCreateTagIngredient = tag => ({ tag: tag });
const gregnauticsCreateItemIngredient = item => ({ item: item });
const gregnauticsCreateUnifiedIngredient = (form, material) => gregnauticsCreateTagIngredient(`gregnautics:${form}/${material}`);
const gregnauticsCreateUsesUnifiedMaterialTag = material => GREGNAUTICS_CREATE_FORMING_MATERIALS.indexOf(material) !== -1;
const gregnauticsCreateTfcItemsMetalName = material => material === "aluminium" ? "aluminum" : material;
const gregnauticsCreateTfcItemsFormItem = (material, form) => `tfc_items:${gregnauticsCreateTfcItemsMetalName(material)}_${form}`;
const gregnauticsCreateSmallPartOutput = (material, form) => {
	const gtOutput = gregnauticsGtFormItem(material, form);
	if (gregnauticsCreateItemExists(gtOutput)) {
		return gtOutput;
	}
	return gregnauticsCreateTfcItemsFormItem(material, form);
};
const gregnauticsCreateLatheIngredient = (form, material, item) => {
	if (gregnauticsCreateUsesUnifiedMaterialTag(material)) {
		return gregnauticsCreateUnifiedIngredient(form, material);
	}
	return gregnauticsCreateItemIngredient(item);
};
const gregnauticsCreateLatheGemIngredient = material => {
	const gtGem = gregnauticsGtFormItem(material, "gem");
	if (gregnauticsCreateItemExists(gtGem)) {
		return gregnauticsCreateItemIngredient(gtGem);
	}
	return gregnauticsCreateTagIngredient(`c:gems/${material}`);
};

const gregnauticsCreateRemoveDirectPlateCrafting = (event, item) => {
	if (!gregnauticsCreateItemExists(item)) {
		return;
	}
	event.remove({ type: "minecraft:crafting_shaped", output: item });
	event.remove({ type: "minecraft:crafting_shapeless", output: item });
};

const gregnauticsCreateAddProcessingRecipe = (event, id, type, ingredients, results, extra) => {
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

const gregnauticsCreateHeatedIngredient = (ingredient, minTemp) => ({
	type: "woodencog:heated",
	ingredient: ingredient,
	max_temp: Math.max(3000, minTemp + 200),
	min_temp: minTemp
});

const gregnauticsCreateHeatedResult = (id, count) => ({
	type: "heated",
	copy_heat: true,
	internal: gregnauticsCreateResult(id, count)
});

const gregnauticsCreateAddHeatedCompactingRecipe = (event, id, ingredients, result) => {
	const recipe = {
		type: "woodencog:heated_compacting",
		heat_requirement: 0,
		ingredients: ingredients.map(entry => gregnauticsCreateHeatedIngredient(entry.ingredient, entry.minTemp)),
		results: [gregnauticsCreateHeatedResult(result.id, result.count)]
	};
	event.remove({ id: id });
	event.custom(recipe).id(id);
};

const gregnauticsCreateAddPuddlingRecipe = (event, id, fluid) => {
	event.remove({ id: id });
	event.custom({
		type: "woodencog:heated_mixing",
		heat_requirement: 1535,
		ingredients: [
			{
				type: "neoforge:single",
				amount: 144,
				fluid: fluid
			}
		],
		results: [
			gregnauticsCreateHeatedResult("tfc:raw_iron_bloom")
		],
		processing_time: 1200
	}).id(id);
};

const gregnauticsCreateAddConstantanAlloyRecipe = event => {
	if (!gregnauticsCreateItemExists("tfmg:constantan_ingot")) {
		return;
	}

	event.remove({ id: "tfmg:mixing/constantan" });
	event.custom({
		type: "woodencog:heated_mixing",
		heat_requirement: 750,
		ingredients: [
			gregnauticsCreateHeatedIngredient({ tag: "c:ingots/copper" }, 750),
			gregnauticsCreateHeatedIngredient({ tag: "c:ingots/nickel" }, 750)
		],
		results: [
			gregnauticsCreateHeatedResult("tfmg:constantan_ingot", 2)
		],
		processing_time: 400
	}).id("gregnautics:woodencog/heated_mixing/alloying/constantan");
};

const gregnauticsCreateHeatedFluxIngredient = () => ({
	ingredient: gregnauticsCreateItemIngredient("tfc:powder/flux"),
	minTemp: 0
});

const gregnauticsCreateMetalWeldTemperature = material => GREGNAUTICS_CREATE_METAL_WELD_TEMPERATURES[material];

const gregnauticsCreateAddTfcAnvilRecipe = (event, id, ingredient, result, rules, tier, count) => {
	const recipe = {
		type: "tfc:anvil",
		ingredient: ingredient,
		result: gregnauticsCreateResult(result, count),
		rules: rules
	};
	if (tier !== undefined) {
		recipe.tier = tier;
	}

	event.remove({ id: id });
	event.custom(recipe).id(id);
};

const gregnauticsCreateAddTfcWeldingRecipe = (event, id, firstInput, secondInput, result, tier) => {
	const recipe = {
		type: "tfc:welding",
		first_input: firstInput,
		second_input: secondInput,
		result: gregnauticsCreateResult(result)
	};
	if (tier !== undefined) {
		recipe.tier = tier;
	}

	event.remove({ id: id });
	event.custom(recipe).id(id);
};

const gregnauticsGtFormItem = (material, form) => {
	switch (form) {
		case "ingot": return `gtceu:${material}_ingot`;
		case "double_ingot": return `gtceu:double_${material}_ingot`;
		case "plate": return `gtceu:${material}_plate`;
		case "double_plate": return `gtceu:double_${material}_plate`;
		case "rod": return `gtceu:${material}_rod`;
		case "long_rod": return `gtceu:long_${material}_rod`;
		case "foil": return `gtceu:${material}_foil`;
		case "small_spring": return `gtceu:small_${material}_spring`;
		case "spring": return `gtceu:${material}_spring`;
		case "small_gear": return `gtceu:small_${material}_gear`;
		case "fine_wire": return `gtceu:fine_${material}_wire`;
		case "small_dust": return `gtceu:small_${material}_dust`;
		case "exquisite_gem": return `gtceu:exquisite_${material}_gem`;
		default: return `gtceu:${material}_${form}`;
	}
};

const gregnauticsCreateFirstExistingItem = items => items.find(item => item !== undefined && gregnauticsCreateItemExists(item));

const gregnauticsCreateCanonicalIngot = material => gregnauticsCreateFirstExistingItem([
	gregnauticsGtFormItem(material, "ingot"),
	`tfc:metal/ingot/${material}`,
	`minecraft:${material}_ingot`
]);

const gregnauticsCreateCanonicalDoubleIngot = material => gregnauticsCreateFirstExistingItem([
	gregnauticsGtFormItem(material, "double_ingot"),
	`tfc:metal/double_ingot/${material}`
]);

const gregnauticsCreateCanonicalStorageBlock = material => gregnauticsCreateFirstExistingItem([
	gregnauticsGtFormItem(material, "block"),
	`tfc:metal/block/${material}`,
	`minecraft:${material}_block`
]);

const gregnauticsCreateCanonicalSmallGear = material => gregnauticsCreateFirstExistingItem([
	gregnauticsGtFormItem(material, "small_gear"),
	material === "wrought_iron" ? gregnauticsGtFormItem("iron", "small_gear") : undefined
]);

const gregnauticsCreateCanonicalGear = material => gregnauticsCreateFirstExistingItem([
	gregnauticsGtFormItem(material, "gear"),
	gregnauticsCreateTfcItemsFormItem(material, "gear")
]);

ServerEvents.tags("item", event => {
	GREGNAUTICS_CREATE_FORGED_BUZZ_SAW_BLADE_MATERIALS.forEach(material => {
		const blade = gregnauticsGtFormItem(material, "buzz_saw_blade");
		if (gregnauticsCreateItemExists(blade)) {
			event.add("gregnautics:create_mechanical_saw_blades", blade);
		}
	});
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: create_metal_forming recipes event start");
	GREGNAUTICS_CREATE_LEGACY_RECIPE_IDS.forEach(id => {
		event.remove({ id: id });
	});
	event.remove({ type: "createvintageneoforged:hammering", input: "minecraft:netherite_ingot" });

	GREGNAUTICS_CREATE_BUZZ_SAW_BLADE_MATERIALS.forEach(material => {
		const blade = gregnauticsGtFormItem(material, "buzz_saw_blade");
		if (gregnauticsCreateItemExists(blade)) {
			event.remove({ type: "minecraft:crafting_shaped", output: blade });
			event.remove({ type: "minecraft:crafting_shapeless", output: blade });
		}
	});
	event.remove({ type: "minecraft:crafting_shaped", id: /^gtceu:gear_/ });
	event.remove({ type: "minecraft:crafting_shaped", id: /^gtceu:small_gear_/ });
	event.remove({ type: "minecraft:crafting_shapeless", id: /^gtceu:gear_/ });
	event.remove({ type: "minecraft:crafting_shapeless", id: /^gtceu:small_gear_/ });

	GREGNAUTICS_CREATE_LEGACY_FORM_REPLACEMENTS.forEach(replacement => {
		if (gregnauticsCreateItemExists(replacement[0]) && gregnauticsCreateItemExists(replacement[1])) {
			event.replaceInput(GREGNAUTICS_CREATE_LEGACY_REPLACEMENT_FILTERS, replacement[0], replacement[1]);
			event.replaceOutput(GREGNAUTICS_CREATE_LEGACY_REPLACEMENT_FILTERS, replacement[0], replacement[1]);
		}
	});

	gregnauticsCreateAddConstantanAlloyRecipe(event);

	GREGNAUTICS_CREATE_FORMING_MATERIALS.forEach(material => {
		gregnauticsCreateRemoveDirectPlateCrafting(event, gregnauticsGtFormItem(material, "plate"));
		gregnauticsCreateRemoveDirectPlateCrafting(event, gregnauticsGtFormItem(material, "double_plate"));
	});

	GREGNAUTICS_CREATE_LATHE_MATERIALS.forEach(material => {
		const ingot = gregnauticsGtFormItem(material, "ingot");
		const rod = gregnauticsGtFormItem(material, "rod");
		const stamen = gregnauticsCreateTfcItemsFormItem(material, "stamen");
		if (gregnauticsCreateItemExists(ingot) && gregnauticsCreateItemExists(rod)) {
			gregnauticsCreateAddProcessingRecipe(
				event,
				`gregnautics:createvintage/turning/${material}_rod_from_ingot`,
				"createvintageneoforged:turning",
				[gregnauticsCreateLatheIngredient("ingots", material, ingot)],
				[gregnauticsCreateResult(rod, 2)],
				{ processing_time: 100 }
			);
		}

		if (gregnauticsCreateItemExists(rod) && gregnauticsCreateItemExists(stamen)) {
			gregnauticsCreateAddProcessingRecipe(
				event,
				`gregnautics:createvintage/turning/${material}_stamens_from_rod`,
				"createvintageneoforged:turning",
				[gregnauticsCreateLatheIngredient("rods", material, rod)],
				[gregnauticsCreateResult(stamen, 2)],
				{ processing_time: 80 }
			);
		}

		const nail = gregnauticsCreateTfcItemsFormItem(material, "nail");
		if (gregnauticsCreateItemExists(stamen) && gregnauticsCreateItemExists(nail)) {
			gregnauticsCreateAddProcessingRecipe(
				event,
				`gregnautics:createvintage/turning/${material}_nails_from_stamen`,
				"createvintageneoforged:turning",
				[gregnauticsCreateItemIngredient(stamen)],
				[gregnauticsCreateResult(nail, 2)],
				{ processing_time: 60 }
			);
		}

		const rivet = gregnauticsCreateTfcItemsFormItem(material, "rivet");
		if (gregnauticsCreateItemExists(stamen) && gregnauticsCreateItemExists(rivet)) {
			gregnauticsCreateAddProcessingRecipe(
				event,
				`gregnautics:createvintage/turning/${material}_rivets_from_stamen`,
				"createvintageneoforged:turning",
				[gregnauticsCreateItemIngredient(stamen)],
				[gregnauticsCreateResult(rivet, 2)],
				{ processing_time: 60 }
			);
		}

		const ring = gregnauticsCreateSmallPartOutput(material, "ring");
		if (gregnauticsCreateItemExists(stamen) && gregnauticsCreateItemExists(ring)) {
			gregnauticsCreateAddProcessingRecipe(
				event,
				`gregnautics:createvintage/coiling/${material}_rings_from_stamen`,
				"createvintageneoforged:coiling",
				[gregnauticsCreateItemIngredient(stamen)],
				[gregnauticsCreateResult(ring, 2)],
				{ processing_time: 80 }
			);
		}

		const bolt = gregnauticsGtFormItem(material, "bolt");
		const screw = gregnauticsGtFormItem(material, "screw");
		if (gregnauticsCreateItemExists(rod) && gregnauticsCreateItemExists(bolt)) {
			gregnauticsCreateAddProcessingRecipe(
				event,
				`gregnautics:create/cutting/${material}_bolts_from_rod`,
				"create:cutting",
				[gregnauticsCreateLatheIngredient("rods", material, rod)],
				[gregnauticsCreateResult(bolt, 4)],
				{ processing_time: 100 }
			);
		}

		if (gregnauticsCreateItemExists(bolt) && gregnauticsCreateItemExists(screw)) {
			gregnauticsCreateAddProcessingRecipe(
				event,
				`gregnautics:createvintage/turning/${material}_screw_from_bolt`,
				"createvintageneoforged:turning",
				[gregnauticsCreateLatheIngredient("bolts", material, bolt)],
				[gregnauticsCreateResult(screw)],
				{ processing_time: 40 }
			);
			gregnauticsCreateAddProcessingRecipe(
				event,
				`gregnautics:create/cutting/${material}_bolt_from_screw`,
				"create:cutting",
				[gregnauticsCreateLatheIngredient("screws", material, screw)],
				[gregnauticsCreateResult(bolt)],
				{ processing_time: 20 }
			);
		}
	});

	GREGNAUTICS_CREATE_TFC_METAL_TOOLS_MATERIALS.forEach(material => {
		const bolt = gregnauticsGtFormItem(material, "bolt");
		const crossguard = `tfc_metal_tools:${material}_crossguard`;
		const ring = gregnauticsCreateSmallPartOutput(material, "ring");
		const pommel = `tfc_metal_tools:${material}_pommel`;
		const weldTemperature = gregnauticsCreateMetalWeldTemperature(material);

		if (gregnauticsCreateItemExists(bolt) && gregnauticsCreateItemExists(crossguard)) {
			gregnauticsCreateAddProcessingRecipe(
				event,
				`gregnautics:createvintage/turning/${material}_crossguard_from_bolt`,
				"createvintageneoforged:turning",
				[gregnauticsCreateItemIngredient(bolt)],
				[gregnauticsCreateResult(crossguard)],
				{ processing_time: 60 }
			);
		}

		if (gregnauticsCreateItemExists(ring) && gregnauticsCreateItemExists(pommel) && weldTemperature !== undefined) {
			gregnauticsCreateAddHeatedCompactingRecipe(
				event,
				`gregnautics:woodencog/heated_compacting/${material}_pommel`,
				[
					{ ingredient: gregnauticsCreateLatheIngredient("rings", material, ring), minTemp: weldTemperature },
					{ ingredient: gregnauticsCreateLatheIngredient("rings", material, ring), minTemp: weldTemperature },
					gregnauticsCreateHeatedFluxIngredient()
				],
				gregnauticsCreateResult(pommel)
			);
		}
	});

	GREGNAUTICS_CREATE_BUZZ_SAW_BLADE_MATERIALS.forEach(material => {
		const gear = gregnauticsGtFormItem(material, "gear");
		const blade = gregnauticsGtFormItem(material, "buzz_saw_blade");
		if (gregnauticsCreateItemExists(gear) && gregnauticsCreateItemExists(blade)) {
			gregnauticsCreateAddProcessingRecipe(
				event,
				`gregnautics:createvintage/turning/${material}_buzz_saw_blade_from_gear`,
				"createvintageneoforged:turning",
				[gregnauticsCreateLatheIngredient("gears", material, gear)],
				[gregnauticsCreateResult(blade)],
				{ processing_time: 160 }
			);
		}
	});

	GREGNAUTICS_CREATE_FORGED_BUZZ_SAW_BLADE_MATERIALS.forEach(material => {
		const doublePlate = gregnauticsGtFormItem(material, "double_plate");
		const blade = gregnauticsGtFormItem(material, "buzz_saw_blade");
		if (gregnauticsCreateItemExists(doublePlate) && gregnauticsCreateItemExists(blade)) {
			gregnauticsCreateAddTfcAnvilRecipe(
				event,
				`gregnautics:tfc/anvil/${material}_buzz_saw_blade`,
				gregnauticsCreateUnifiedIngredient("double_plates", material),
				blade,
				["bend_last", "hit_second_last", "hit_third_last"],
				GREGNAUTICS_CREATE_ANVIL_TIERS[material]
			);
		}
	});

	GREGNAUTICS_CREATE_GEAR_MATERIALS.forEach(material => {
		const plate = gregnauticsGtFormItem(material, "plate");
		const doublePlate = gregnauticsGtFormItem(material, "double_plate");
		const smallGear = gregnauticsCreateCanonicalSmallGear(material);
		const gear = gregnauticsCreateCanonicalGear(material);

		if (gregnauticsCreateItemExists(plate) && smallGear !== undefined) {
			gregnauticsCreateAddProcessingRecipe(
				event,
				`gregnautics:createvintage/turning/${material}_small_gear_from_plate`,
				"createvintageneoforged:turning",
				[gregnauticsCreateLatheIngredient("plates", material, plate)],
				[gregnauticsCreateResult(smallGear)],
				{ processing_time: 120 }
			);

			if (GREGNAUTICS_CREATE_ANVIL_TIERS[material] !== undefined) {
				gregnauticsCreateAddTfcAnvilRecipe(
					event,
					`gregnautics:tfc/anvil/${material}_small_gear`,
					gregnauticsCreateLatheIngredient("plates", material, plate),
					smallGear,
					["punch_last", "hit_second_last", "upset_third_last"],
					GREGNAUTICS_CREATE_ANVIL_TIERS[material]
				);
			}
		}

		if (gregnauticsCreateItemExists(doublePlate) && gear !== undefined) {
			gregnauticsCreateAddProcessingRecipe(
				event,
				`gregnautics:createvintage/turning/${material}_gear_from_double_plate`,
				"createvintageneoforged:turning",
				[gregnauticsCreateLatheIngredient("double_plates", material, doublePlate)],
				[gregnauticsCreateResult(gear)],
				{ processing_time: 180 }
			);

			if (GREGNAUTICS_CREATE_ANVIL_TIERS[material] !== undefined) {
				gregnauticsCreateAddTfcAnvilRecipe(
					event,
					`tfc_items:anvil/${gregnauticsCreateTfcItemsMetalName(material)}_gear`,
					gregnauticsCreateLatheIngredient("double_plates", material, doublePlate),
					gear,
					["punch_last", "hit_second_last", "upset_third_last"],
					GREGNAUTICS_CREATE_ANVIL_TIERS[material]
				);
			}
		}
	});

	GREGNAUTICS_CREATE_LATHE_GEM_ROD_MATERIALS.forEach(material => {
		const rod = gregnauticsGtFormItem(material, "rod");
		if (gregnauticsCreateItemExists(rod)) {
			gregnauticsCreateAddProcessingRecipe(
				event,
				`gregnautics:createvintage/turning/${material}_rod_from_gem`,
				"createvintageneoforged:turning",
				[gregnauticsCreateLatheGemIngredient(material)],
				[gregnauticsCreateResult(rod, 2)],
				{ processing_time: 100 }
			);
		}
	});

	GREGNAUTICS_CREATE_LATHE_ROUND_MATERIALS.forEach(material => {
		const nugget = gregnauticsGtFormItem(material, "nugget");
		const round = gregnauticsGtFormItem(material, "round");
		if (gregnauticsCreateItemExists(nugget) && gregnauticsCreateItemExists(round)) {
			gregnauticsCreateAddProcessingRecipe(
				event,
				`gregnautics:createvintage/turning/${material}_round_from_nugget`,
				"createvintageneoforged:turning",
				[gregnauticsCreateItemIngredient(nugget)],
				[gregnauticsCreateResult(round)],
				{ processing_time: 100 }
			);
		}
	});

	GREGNAUTICS_CREATE_LATHE_EXQUISITE_LENS_MATERIALS.forEach(material => {
		const exquisiteGem = gregnauticsGtFormItem(material, "exquisite_gem");
		const lens = gregnauticsGtFormItem(material, "lens");
		const dust = gregnauticsGtFormItem(material, "dust");
		if (gregnauticsCreateItemExists(exquisiteGem) && gregnauticsCreateItemExists(lens) && gregnauticsCreateItemExists(dust)) {
			gregnauticsCreateAddProcessingRecipe(
				event,
				`gregnautics:createvintage/turning/${material}_lens_from_exquisite_gem`,
				"createvintageneoforged:turning",
				[gregnauticsCreateItemIngredient(exquisiteGem)],
				[gregnauticsCreateResult(lens), gregnauticsCreateResult(dust, 2)],
				{ processing_time: 2400 }
			);
		}
	});

	GREGNAUTICS_TFC_LEGACY_SHEET_MATERIALS.forEach(material => {
		const tfc = material[0];
		const gt = material[1];
		const plate = `gtceu:${gt}_plate`;
		const doublePlate = `gtceu:double_${gt}_plate`;

		gregnauticsCreateRemoveDirectPlateCrafting(event, `tfc:metal/sheet/${tfc}`);
		gregnauticsCreateRemoveDirectPlateCrafting(event, `tfc:metal/double_sheet/${tfc}`);
		gregnauticsCreateRemoveDirectPlateCrafting(event, `tfc_items:${tfc}_heavy_sheet`);

		if (gregnauticsCreateItemExists(plate)) {
			// Отдельный ID: канонический tfc:anvil/metal/sheet/<metal> регистрирует
			// gregnautics_tfc_metal_amount_normalization.js (1 слиток -> 1 пластина);
			// одинаковые ID вызывали KubeJS "two recipes with the same ID" и один из
			// рецептов терялся. Двойной слиток (288 mB) даёт 2 пластины — без потери металла.
			gregnauticsCreateAddTfcAnvilRecipe(
				event,
				`gregnautics:anvil/metal/sheet_from_double_ingot/${tfc}`,
				gregnauticsCreateTagIngredient(`c:double_ingots/${tfc}`),
				plate,
				["hit_last", "hit_second_last", "hit_third_last"],
				GREGNAUTICS_TFC_SHEET_ANVIL_TIERS[tfc],
				2
			);
		}

		if (gregnauticsCreateItemExists(doublePlate)) {
			gregnauticsCreateAddTfcWeldingRecipe(
				event,
				`tfc:welding/metal/double_sheet/${tfc}`,
				gregnauticsCreateTagIngredient(`c:sheets/${tfc}`),
				gregnauticsCreateTagIngredient(`c:sheets/${tfc}`),
				doublePlate
			);
		}
	});

	GREGNAUTICS_TFC_ITEMS_LEGACY_SHEET_MATERIALS.forEach(material => {
		const tfc = material[0];
		gregnauticsCreateRemoveDirectPlateCrafting(event, `tfc_items:${tfc}_sheet`);
		gregnauticsCreateRemoveDirectPlateCrafting(event, `tfc_items:${tfc}_double_sheet`);
		gregnauticsCreateRemoveDirectPlateCrafting(event, `tfc_items:${tfc}_heavy_sheet`);
	});

	GREGNAUTICS_CREATE_FORMING_MATERIALS.forEach(material => {
		const ingot = gregnauticsCreateCanonicalIngot(material);
		const plate = gregnauticsGtFormItem(material, "plate");
		const doublePlate = gregnauticsGtFormItem(material, "double_plate");
		const rod = gregnauticsGtFormItem(material, "rod");
		const longRod = gregnauticsGtFormItem(material, "long_rod");
		const doubleIngot = gregnauticsCreateCanonicalDoubleIngot(material);
		const storageBlock = gregnauticsCreateCanonicalStorageBlock(material);

		if (gregnauticsCreateItemExists(ingot) && gregnauticsCreateItemExists(plate)) {
			gregnauticsCreateAddProcessingRecipe(
				event,
				`gregnautics:create/pressing/${material}_plate`,
				"create:pressing",
				[gregnauticsCreateUnifiedIngredient("ingots", material)],
				[gregnauticsCreateResult(plate)]
			);
			gregnauticsCreateAddProcessingRecipe(
				event,
				`gregnautics:createdieselgenerators/hammering/${material}_plate`,
				"createdieselgenerators:hammering",
				[gregnauticsCreateUnifiedIngredient("ingots", material)],
				[gregnauticsCreateResult(plate)]
			);
		}

		if (storageBlock !== undefined && gregnauticsCreateItemExists(plate)) {
			gregnauticsCreateAddProcessingRecipe(
				event,
				`gregnautics:create/cutting/${material}_plates_from_block`,
				"create:cutting",
				[gregnauticsCreateUnifiedIngredient("storage_blocks", material)],
				[gregnauticsCreateResult(plate, 9)],
				{ processing_time: 200 }
			);
		}

		if (gregnauticsCreateItemExists(plate) && gregnauticsCreateItemExists(doublePlate)) {
			const weldTemperature = gregnauticsCreateMetalWeldTemperature(material);
			event.remove({ id: `gregnautics:create/compacting/${material}_double_plate` });
			if (weldTemperature !== undefined) gregnauticsCreateAddHeatedCompactingRecipe(
				event,
				`gregnautics:woodencog/heated_compacting/${material}_double_plate`,
				[
					{ ingredient: gregnauticsCreateUnifiedIngredient("plates", material), minTemp: weldTemperature },
					{ ingredient: gregnauticsCreateUnifiedIngredient("plates", material), minTemp: weldTemperature },
					gregnauticsCreateHeatedFluxIngredient()
				],
				gregnauticsCreateResult(doublePlate)
			);
		}

		if (gregnauticsCreateItemExists(ingot) && gregnauticsCreateItemExists(longRod)) {
			gregnauticsCreateAddProcessingRecipe(
				event,
				`gregnautics:createaddition/rolling/${material}_long_rod`,
				"createaddition:rolling",
				[gregnauticsCreateUnifiedIngredient("ingots", material)],
				[gregnauticsCreateResult(longRod)]
			);
		}

		if (gregnauticsCreateItemExists(longRod) && gregnauticsCreateItemExists(rod)) {
			gregnauticsCreateAddProcessingRecipe(
				event,
				`gregnautics:create/cutting/${material}_rod_from_long_rod`,
				"create:cutting",
				[{ item: longRod }],
				[gregnauticsCreateResult(rod, 2)],
				{ processing_time: 100 }
			);
		}

		if (gregnauticsCreateItemExists(ingot) && doubleIngot !== undefined) {
			const weldTemperature = gregnauticsCreateMetalWeldTemperature(material);
			event.remove({ id: `woodencog:heated_compacting/double_${material}` });
			event.remove({ id: `gregnautics:create/compacting/${material}_double_ingot` });
			if (weldTemperature !== undefined) gregnauticsCreateAddHeatedCompactingRecipe(
				event,
				`gregnautics:woodencog/heated_compacting/${material}_double_ingot`,
				[
					{ ingredient: gregnauticsCreateUnifiedIngredient("ingots", material), minTemp: weldTemperature },
					{ ingredient: gregnauticsCreateUnifiedIngredient("ingots", material), minTemp: weldTemperature },
					gregnauticsCreateHeatedFluxIngredient()
				],
				gregnauticsCreateResult(doubleIngot)
			);
		}

		if (doubleIngot !== undefined && gregnauticsCreateItemExists(longRod)) {
			gregnauticsCreateAddProcessingRecipe(
				event,
				`gregnautics:createaddition/rolling/${material}_long_rods_from_double_ingot`,
				"createaddition:rolling",
				[gregnauticsCreateUnifiedIngredient("double_ingots", material)],
				[gregnauticsCreateResult(longRod, 2)]
			);
		}
	});

	GREGNAUTICS_CREATE_SMALL_SPRING_MATERIALS.forEach(material => {
		const rod = gregnauticsGtFormItem(material, "rod");
		const smallSpring = gregnauticsGtFormItem(material, "small_spring");
		if (!gregnauticsCreateItemExists(rod) || !gregnauticsCreateItemExists(smallSpring)) return;

		gregnauticsCreateAddProcessingRecipe(
			event,
			`gregnautics:createvintage/coiling/${material}_small_spring`,
			"createvintageneoforged:coiling",
			[gregnauticsCreateItemIngredient(rod)],
			[gregnauticsCreateResult(smallSpring)],
			{ processing_time: 100 }
		);
		gregnauticsCreateAddTfcAnvilRecipe(
			event,
			`gregnautics:tfc/anvil/${material}_small_spring`,
			gregnauticsCreateItemIngredient(rod),
			smallSpring,
			["hit_any", "bend_any", "draw_not_last"],
			GREGNAUTICS_CREATE_ANVIL_TIERS[material]
		);
	});

	GREGNAUTICS_CREATE_SPRING_MATERIALS.forEach(material => {
		const longRod = gregnauticsGtFormItem(material, "long_rod");
		const spring = gregnauticsGtFormItem(material, "spring");
		if (!gregnauticsCreateItemExists(longRod) || !gregnauticsCreateItemExists(spring)) return;

		gregnauticsCreateAddProcessingRecipe(
			event,
			`gregnautics:createvintage/coiling/${material}_spring`,
			"createvintageneoforged:coiling",
			[gregnauticsCreateItemIngredient(longRod)],
			[gregnauticsCreateResult(spring)],
			{ processing_time: 150 }
		);
		gregnauticsCreateAddTfcAnvilRecipe(
			event,
			`gregnautics:tfc/anvil/${material}_spring`,
			gregnauticsCreateItemIngredient(longRod),
			spring,
			["hit_any", "bend_any", "draw_not_last"],
			GREGNAUTICS_CREATE_ANVIL_TIERS[material]
		);
	});

	GREGNAUTICS_CREATE_FOIL_FINE_WIRE_MATERIALS.forEach(material => {
		const foil = gregnauticsGtFormItem(material, "foil");
		const fineWire = gregnauticsGtFormItem(material, "fine_wire");
		if (!gregnauticsCreateItemExists(foil) || !gregnauticsCreateItemExists(fineWire)) return;

		gregnauticsCreateAddProcessingRecipe(
			event,
			`gregnautics:createvintage/coiling/${material}_fine_wire_from_foil`,
			"createvintageneoforged:coiling",
			[gregnauticsCreateItemIngredient(foil)],
			[gregnauticsCreateResult(fineWire, 2)],
			{ processing_time: 100 }
		);
	});

	if (gregnauticsCreateItemExists("simulated:spring")) {
		if (gregnauticsCreateItemExists("gtceu:wrought_iron_ingot")) {
			gregnauticsCreateAddProcessingRecipe(
				event,
				"gregnautics:createvintage/coiling/simulated_spring_from_wrought_iron_ingot",
				"createvintageneoforged:coiling",
				[gregnauticsCreateItemIngredient("gtceu:wrought_iron_ingot")],
				[gregnauticsCreateResult("simulated:spring")],
				{ processing_time: 120 }
			);
		}

		if (gregnauticsCreateItemExists("gtceu:steel_ingot")) {
			gregnauticsCreateAddProcessingRecipe(
				event,
				"gregnautics:createvintage/coiling/simulated_spring_from_steel_ingot",
				"createvintageneoforged:coiling",
				[gregnauticsCreateItemIngredient("gtceu:steel_ingot")],
				[gregnauticsCreateResult("simulated:spring")],
				{ processing_time: 120 }
			);
		}
	}

	if (gregnauticsCreateItemExists("tfc:raw_iron_bloom") && gregnauticsCreateItemExists("tfc:refined_iron_bloom")) {
		gregnauticsCreateAddPuddlingRecipe(event, "gregnautics:woodencog/heated_mixing/pig_iron_to_raw_iron_bloom", "tfc:metal/pig_iron");
		gregnauticsCreateAddPuddlingRecipe(event, "gregnautics:woodencog/heated_mixing/cast_iron_to_raw_iron_bloom", "tfc:metal/cast_iron");

		gregnauticsCreateAddProcessingRecipe(
			event,
			"gregnautics:createvintage/hammering/raw_iron_bloom_to_refined_iron_bloom",
			"createvintageneoforged:hammering",
			[{ item: "tfc:raw_iron_bloom" }],
			[gregnauticsCreateResult("tfc:refined_iron_bloom")],
			{ hammerBlows: 4 }
		);
	}

	if (gregnauticsCreateItemExists("tfc:refined_iron_bloom") && gregnauticsCreateItemExists("gtceu:wrought_iron_ingot")) {
		gregnauticsCreateAddProcessingRecipe(
			event,
			"gregnautics:createvintage/hammering/refined_iron_bloom_to_wrought_iron_ingot",
			"createvintageneoforged:hammering",
			[{ item: "tfc:refined_iron_bloom" }],
			[gregnauticsCreateResult("gtceu:wrought_iron_ingot")],
			{ hammerBlows: 8 }
		);
	}

	if (gregnauticsCreateItemExists("tfc:metal/ingot/pig_iron") && gregnauticsCreateItemExists("tfc:metal/ingot/high_carbon_steel")) {
		gregnauticsCreateAddProcessingRecipe(
			event,
			"gregnautics:createvintage/hammering/pig_iron_to_high_carbon_steel",
			"createvintageneoforged:hammering",
			[gregnauticsCreateTagIngredient("c:ingots/pig_iron")],
			[gregnauticsCreateResult("tfc:metal/ingot/high_carbon_steel")],
			{ hammerBlows: 6 }
		);
	}

	if (gregnauticsCreateItemExists("tfc:metal/ingot/high_carbon_steel") && gregnauticsCreateItemExists("gtceu:steel_ingot")) {
		gregnauticsCreateAddProcessingRecipe(
			event,
			"gregnautics:createvintage/hammering/high_carbon_steel_to_steel",
			"createvintageneoforged:hammering",
			[gregnauticsCreateTagIngredient("c:ingots/high_carbon_steel")],
			[gregnauticsCreateResult("gtceu:steel_ingot")],
			{ hammerBlows: 8 }
		);
	}

	if (gregnauticsCreateItemExists("tfc:metal/ingot/high_carbon_black_steel") && gregnauticsCreateItemExists("gtceu:black_steel_ingot")) {
		gregnauticsCreateAddProcessingRecipe(
			event,
			"gregnautics:createvintage/hammering/high_carbon_black_steel_to_black_steel",
			"createvintageneoforged:hammering",
			[gregnauticsCreateTagIngredient("c:ingots/high_carbon_black_steel")],
			[gregnauticsCreateResult("gtceu:black_steel_ingot")],
			{ hammerBlows: 10 }
		);
	}

	if (gregnauticsCreateItemExists("tfc:metal/ingot/high_carbon_red_steel") && gregnauticsCreateItemExists("gtceu:red_steel_ingot")) {
		gregnauticsCreateAddProcessingRecipe(
			event,
			"gregnautics:createvintage/hammering/high_carbon_red_steel_to_red_steel",
			"createvintageneoforged:hammering",
			[gregnauticsCreateTagIngredient("c:ingots/high_carbon_red_steel")],
			[gregnauticsCreateResult("gtceu:red_steel_ingot")],
			{ hammerBlows: 12 }
		);
	}

	if (gregnauticsCreateItemExists("tfc:metal/ingot/high_carbon_blue_steel") && gregnauticsCreateItemExists("gtceu:blue_steel_ingot")) {
		gregnauticsCreateAddProcessingRecipe(
			event,
			"gregnautics:createvintage/hammering/high_carbon_blue_steel_to_blue_steel",
			"createvintageneoforged:hammering",
			[gregnauticsCreateTagIngredient("c:ingots/high_carbon_blue_steel")],
			[gregnauticsCreateResult("gtceu:blue_steel_ingot")],
			{ hammerBlows: 12 }
		);
	}
});
