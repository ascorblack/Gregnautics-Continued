// priority: 0
"use strict";

const GREGNAUTICS_GTCEU_ORE_POWDER_COMPAT_MATERIALS = [
	"almandine", "aluminium", "alunite", "amethyst", "apatite", "asbestos", "barite", "basaltic_mineral_sand",
	"bastnasite", "bauxite", "bentonite", "beryllium", "bismuth", "blue_topaz", "borax", "bornite", "calcite",
	"cassiterite", "cassiterite_sand", "certus_quartz", "chalcocite", "chalcopyrite", "chromite", "cinnabar",
	"coal", "cobalt", "cobaltite", "cooperite", "copper", "diamond", "diatomite", "electrotine", "emerald",
	"fullers_earth", "galena", "garnet_sand", "garnierite", "glauconite_sand", "goethite", "gold",
	"granitic_mineral_sand", "graphite", "green_sapphire", "grossular", "gypsum", "hematite", "ilmenite",
	"iron", "kyanite", "lapis", "lazurite", "lead", "lepidolite", "lithium", "magnesite", "magnetite",
	"malachite", "mica", "molybdenite", "molybdenum", "monazite", "naquadah", "neodymium", "nether_quartz",
	"nickel", "oilsands", "olivine", "opal", "palladium", "pentlandite", "pitchblende", "platinum",
	"plutonium_239", "pollucite", "powellite", "pyrite", "pyrochlore", "pyrolusite", "pyrope", "quartzite",
	"realgar", "red_garnet", "redstone", "rock_salt", "ruby", "salt", "saltpeter", "sapphire", "scheelite",
	"silver", "soapstone", "sodalite", "spessartine", "sphalerite", "spodumene", "stibnite", "sulfur", "talc",
	"tantalite", "tetrahedrite", "thorium", "tin", "topaz", "tricalcium_phosphate", "trona", "tungstate",
	"uraninite", "vanadium_magnetite", "wulfenite", "yellow_garnet", "yellow_limonite", "zeolite"
];

const GREGNAUTICS_GTCEU_ORE_POWDER_COMPAT_FORMS = [
	{ id: "dust", item: material => `gtceu:${material}_dust`, amount: 144, heat: 1.429, pile: false },
	{ id: "small_dust", item: material => `gtceu:small_${material}_dust`, amount: 36, heat: 0.714, pile: true },
	{ id: "tiny_dust", item: material => `gtceu:tiny_${material}_dust`, amount: 16, heat: 0.357, pile: true },
	{ id: "impure_dust", item: material => `gtceu:impure_${material}_dust`, amount: 100, heat: 1, pile: false },
	{ id: "pure_dust", item: material => `gtceu:pure_${material}_dust`, amount: 120, heat: 1.2, pile: false }
];

const GREGNAUTICS_GTCEU_ORE_POWDER_COMPAT_DIRECT_SMELTING = {
	aluminium: { metal: "aluminium", melt: 660, percent: 100 },
	antimony: { metal: "antimony", melt: 630, percent: 100 },
	bismuth: { metal: "bismuth", melt: 270, percent: 100 },
	bornite: { metal: "copper", melt: 1080, percent: 90 },
	cassiterite: { metal: "tin", melt: 230, percent: 100 },
	cassiterite_sand: { metal: "tin", melt: 230, percent: 100 },
	chalcocite: { metal: "copper", melt: 1080, percent: 90 },
	chalcopyrite: { metal: "copper", melt: 1080, percent: 90 },
	cobalt: { metal: "cobalt", melt: 1495, percent: 100 },
	copper: { metal: "copper", melt: 1080, percent: 100 },
	galena: { metal: "lead", melt: 330, percent: 90 },
	garnierite: { metal: "nickel", melt: 1453, percent: 100 },
	goethite: { metal: "iron", melt: 1535, percent: 90 },
	gold: { metal: "gold", melt: 1060, percent: 100 },
	hematite: { metal: "iron", melt: 1535, percent: 90 },
	iron: { metal: "iron", melt: 1535, percent: 100 },
	lead: { metal: "lead", melt: 330, percent: 100 },
	magnetite: { metal: "iron", melt: 1535, percent: 90 },
	malachite: { metal: "copper", melt: 1080, percent: 90 },
	nickel: { metal: "nickel", melt: 1453, percent: 100 },
	pentlandite: { metal: "nickel", melt: 1453, percent: 90 },
	silver: { metal: "silver", melt: 961, percent: 100 },
	sphalerite: { metal: "zinc", melt: 420, percent: 90 },
	stibnite: { metal: "antimony", melt: 630, percent: 90 },
	tetrahedrite: { metal: "copper", melt: 1080, percent: 90 },
	tin: { metal: "tin", melt: 230, percent: 100 },
	vanadium_magnetite: { metal: "iron", melt: 1535, percent: 90 },
	yellow_limonite: { metal: "iron", melt: 1535, percent: 90 },
	zinc: { metal: "zinc", melt: 420, percent: 100 }
};

const GREGNAUTICS_GTCEU_ORE_POWDER_COMPAT_EXISTING_TFC_ORE_SMELTING = [
	"bismuth", "cassiterite", "cassiterite_sand", "copper", "garnierite", "gold", "hematite",
	"magnetite", "malachite", "silver", "sphalerite", "tetrahedrite", "yellow_limonite"
];

const GREGNAUTICS_GTCEU_ORE_POWDER_COMPAT_EXISTING_METAL_DUST_SMELTING = [
	"aluminium", "antimony", "bismuth", "cobalt", "copper", "gold", "iron", "lead", "nickel", "silver", "tin", "zinc"
];

function gregnauticsGtceuOrePowderCompatItemExists(item) {
	return Item.exists(item);
}

function gregnauticsGtceuOrePowderCompatScaledAmount(defaultAmount, percent) {
	const percentPerItem = percent / Math.ceil(percent / 100);
	const value = defaultAmount * (percentPerItem / 100);
	return value % 2 === 0 ? value : Math.round(value) - 1;
}

function gregnauticsGtceuOrePowderCompatFluid(smelting) {
	return smelting.metal === "iron" ? "tfc:metal/cast_iron" : `gtceu:${smelting.metal}`;
}

function gregnauticsGtceuOrePowderCompatRegexEscape(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function gregnauticsGtceuOrePowderCompatRemoveGeneratedIronHeating(event, item, material) {
	const path = item.split(":")[1];
	const escapedPath = gregnauticsGtceuOrePowderCompatRegexEscape(path);
	const escapedMaterial = gregnauticsGtceuOrePowderCompatRegexEscape(material);
	const idPattern = new RegExp(`^gtceu:.*(?:${escapedPath}|${escapedMaterial}).*`);

	event.remove({ type: "tfc:heating", id: idPattern });
	event.remove({ type: "woodencog:heated_mixing", id: idPattern });
}

function gregnauticsGtceuOrePowderCompatIsStandardDustForm(form) {
	return form.id === "dust" || form.id === "small_dust" || form.id === "tiny_dust";
}

function gregnauticsGtceuOrePowderCompatShouldSkipHeatData(material, form) {
	return GREGNAUTICS_GTCEU_ORE_POWDER_COMPAT_EXISTING_METAL_DUST_SMELTING.includes(material)
		&& gregnauticsGtceuOrePowderCompatIsStandardDustForm(form);
}

function gregnauticsGtceuOrePowderCompatAddHeatData(event, material, form) {
	if (gregnauticsGtceuOrePowderCompatShouldSkipHeatData(material, form)) {
		return false;
	}

	const item = form.item(material);
	if (!gregnauticsGtceuOrePowderCompatItemExists(item)) {
		return false;
	}

	event.heat({
		ingredient: item,
		heatCapacity: form.heat
	}, `gregnautics:gtceu_ore_powder/${material}/${form.id}`);

	return true;
}

function gregnauticsGtceuOrePowderCompatShouldSkipHeating(material, form) {
	return false;
}

function gregnauticsGtceuOrePowderCompatShouldSkipMetalDustHeating(material, form) {
	return GREGNAUTICS_GTCEU_ORE_POWDER_COMPAT_EXISTING_METAL_DUST_SMELTING.includes(material)
		&& gregnauticsGtceuOrePowderCompatIsStandardDustForm(form);
}

function gregnauticsGtceuOrePowderCompatAddHeating(event, material, form) {
	const smelting = GREGNAUTICS_GTCEU_ORE_POWDER_COMPAT_DIRECT_SMELTING[material];
	if (
		smelting === undefined
		|| gregnauticsGtceuOrePowderCompatShouldSkipHeating(material, form)
		|| gregnauticsGtceuOrePowderCompatShouldSkipMetalDustHeating(material, form)
	) {
		return false;
	}

	const item = form.item(material);
	if (!gregnauticsGtceuOrePowderCompatItemExists(item)) {
		return false;
	}

	if (smelting.metal === "iron") {
		event.remove({ type: "tfc:heating", input: item });
		gregnauticsGtceuOrePowderCompatRemoveGeneratedIronHeating(event, item, material);
	}
	event.recipes.tfc.heating(item, smelting.melt)
		.resultFluid(Fluid.of(gregnauticsGtceuOrePowderCompatFluid(smelting), gregnauticsGtceuOrePowderCompatScaledAmount(form.amount, smelting.percent)))
		.useDurability(true)
		.id(`gregnautics:heating/gtceu_ore_powder/${material}_${form.id}`);

	return true;
}

function gregnauticsGtceuOrePowderCompatHeatedIngredient(item, smelting) {
	return {
		type: "woodencog:heated",
		ingredient: { item: item },
		max_temp: Math.max(3000, smelting.melt + 200),
		min_temp: Math.max(1, Math.round(smelting.melt * 0.85))
	};
}

function gregnauticsGtceuOrePowderCompatAddHeatedMixing(event, material, form) {
	const smelting = GREGNAUTICS_GTCEU_ORE_POWDER_COMPAT_DIRECT_SMELTING[material];
	if (
		smelting === undefined
		|| gregnauticsGtceuOrePowderCompatShouldSkipHeating(material, form)
		|| gregnauticsGtceuOrePowderCompatShouldSkipMetalDustHeating(material, form)
	) {
		return false;
	}

	const item = form.item(material);
	if (!gregnauticsGtceuOrePowderCompatItemExists(item)) {
		return false;
	}

	if (smelting.metal === "iron") {
		event.remove({ type: "woodencog:heated_mixing", input: item });
		gregnauticsGtceuOrePowderCompatRemoveGeneratedIronHeating(event, item, material);
	}
	const id = `gregnautics:woodencog/heated_mixing/gtceu_ore_powder/${material}_${form.id}`;
	event.remove({ id: id });
	event.custom({
		type: "woodencog:heated_mixing",
		heat_requirement: smelting.melt,
		ingredients: [
			gregnauticsGtceuOrePowderCompatHeatedIngredient(item, smelting)
		],
		results: [
			{
				amount: gregnauticsGtceuOrePowderCompatScaledAmount(form.amount, smelting.percent),
				id: gregnauticsGtceuOrePowderCompatFluid(smelting)
			}
		]
	}).id(id);

	return true;
}

function gregnauticsGtceuOrePowderCompatAddPowderCrafting(event, material) {
	const dust = `gtceu:${material}_dust`;
	const smallDust = `gtceu:small_${material}_dust`;
	const tinyDust = `gtceu:tiny_${material}_dust`;
	let count = 0;

	if (gregnauticsGtceuOrePowderCompatItemExists(dust) && gregnauticsGtceuOrePowderCompatItemExists(smallDust)) {
		event.shapeless(dust, [smallDust, smallDust, smallDust, smallDust])
			.id(`gregnautics:crafting/gtceu_ore_powder/${material}_dust_from_small_dust`);
		count++;
	}

	if (gregnauticsGtceuOrePowderCompatItemExists(dust) && gregnauticsGtceuOrePowderCompatItemExists(tinyDust)) {
		event.shapeless(dust, [tinyDust, tinyDust, tinyDust, tinyDust, tinyDust, tinyDust, tinyDust, tinyDust, tinyDust])
			.id(`gregnautics:crafting/gtceu_ore_powder/${material}_dust_from_tiny_dust`);
		count++;
	}

	return count;
}

TFCEvents.data(event => {
	let heatData = 0;

	GREGNAUTICS_GTCEU_ORE_POWDER_COMPAT_MATERIALS.forEach(material => {
		GREGNAUTICS_GTCEU_ORE_POWDER_COMPAT_FORMS.forEach(form => {
			if (gregnauticsGtceuOrePowderCompatAddHeatData(event, material, form)) {
				heatData++;
			}
		});
	});

	console.info(`[Gregnautics] GTCEu ore powder compat: ${heatData} heat data entries.`);
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: gtceu_ore_powder_compat recipes event start");
	let heatingRecipes = 0;
	let heatedMixingRecipes = 0;
	let craftingRecipes = 0;

	GREGNAUTICS_GTCEU_ORE_POWDER_COMPAT_MATERIALS.forEach(material => {
		GREGNAUTICS_GTCEU_ORE_POWDER_COMPAT_FORMS.forEach(form => {
			if (gregnauticsGtceuOrePowderCompatAddHeating(event, material, form)) {
				heatingRecipes++;
			}

			if (gregnauticsGtceuOrePowderCompatAddHeatedMixing(event, material, form)) {
				heatedMixingRecipes++;
			}
		});

		craftingRecipes += gregnauticsGtceuOrePowderCompatAddPowderCrafting(event, material);
	});

	console.info(`[Gregnautics] GTCEu ore powder compat: ${heatingRecipes} heating recipes, ${heatedMixingRecipes} heated mixing recipes, ${craftingRecipes} dust pile crafting recipes.`);
});
