// priority: 0
"use strict";

const GREGNAUTICS_GTCEU_SAND_COMPAT_COLORS = ["black", "brown", "green", "pink", "red", "white", "yellow"];

const GREGNAUTICS_GTCEU_SAND_COMPAT_MATERIAL_NAMES = [
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

const GREGNAUTICS_GTCEU_SAND_COMPAT_METAL_DATA = {
	bismuth: { common: "bismuth", metal: "bismuth", melt: 270, percent: 100 },
	cassiterite: { common: "tin", metal: "tin", melt: 230, percent: 100 },
	cassiterite_sand: { common: "tin", metal: "tin", melt: 230, percent: 100 },
	copper: { common: "copper", metal: "copper", melt: 1080, percent: 100 },
	garnierite: { common: "nickel", metal: "nickel", melt: 1453, percent: 100 },
	gold: { common: "gold", metal: "gold", melt: 1060, percent: 100 },
	hematite: { common: "iron", metal: "iron", melt: 1535, percent: 90 },
	magnetite: { common: "iron", metal: "iron", melt: 1535, percent: 90 },
	malachite: { common: "copper", metal: "copper", melt: 1080, percent: 90 },
	silver: { common: "silver", metal: "silver", melt: 961, percent: 100 },
	sphalerite: { common: "zinc", metal: "zinc", melt: 420, percent: 90 },
	tetrahedrite: { common: "copper", metal: "copper", melt: 1080, percent: 90 },
	yellow_limonite: { common: "iron", metal: "iron", melt: 1535, percent: 90 }
};

const GREGNAUTICS_GTCEU_SAND_COMPAT_MATERIALS = GREGNAUTICS_GTCEU_SAND_COMPAT_MATERIAL_NAMES.map(id =>
	Object.assign({ id: id }, GREGNAUTICS_GTCEU_SAND_COMPAT_METAL_DATA[id] || {})
);

const GREGNAUTICS_GTCEU_SAND_COMPAT_RAW_AMOUNT = 72;
const GREGNAUTICS_GTCEU_SAND_COMPAT_RAW_BLOCK_AMOUNT = GREGNAUTICS_GTCEU_SAND_COMPAT_RAW_AMOUNT * 9;

const GREGNAUTICS_GTCEU_SAND_COMPAT_HEAT_FORMS = [
	{ form: "raw", item: material => `gtceu:raw_${material.id}`, amount: GREGNAUTICS_GTCEU_SAND_COMPAT_RAW_AMOUNT },
	{ form: "raw_block", item: material => `gtceu:raw_${material.id}_block`, amount: GREGNAUTICS_GTCEU_SAND_COMPAT_RAW_BLOCK_AMOUNT },
	{ form: "crushed", item: material => `gtceu:crushed_${material.id}_ore`, amount: 80 },
	{ form: "purified", item: material => `gtceu:purified_${material.id}_ore`, amount: 100 },
	{ form: "refined", item: material => `gtceu:refined_${material.id}_ore`, amount: 110 },
	{ form: "impure_dust", item: material => `gtceu:impure_${material.id}_dust`, amount: 100 },
	{ form: "pure_dust", item: material => `gtceu:pure_${material.id}_dust`, amount: 120 },
	{ form: "dust", item: material => `gtceu:${material.id}_dust`, amount: 144 },
	{ form: "small_dust", item: material => `gtceu:small_${material.id}_dust`, amount: 36 },
	{ form: "tiny_dust", item: material => `gtceu:tiny_${material.id}_dust`, amount: 16 }
];

function gregnauticsGtceuSandCompatItemExists(item) {
	return Item.exists(item);
}

function gregnauticsGtceuSandCompatStack(item, count) {
	return count === 1 ? item : `${count}x ${item}`;
}

function gregnauticsGtceuSandCompatCalcAmount(defaultAmount, percent) {
	const percentPerItem = percent / Math.ceil(percent / 100);
	const value = defaultAmount * (percentPerItem / 100);
	return value % 2 === 0 ? value : Math.round(value) - 1;
}

function gregnauticsGtceuSandCompatProcessedAmount(material, defaultAmount) {
	return gregnauticsGtceuSandCompatCalcAmount(defaultAmount, material.percent || 100);
}

function gregnauticsGtceuSandCompatCrushed(material) {
	return `gtceu:crushed_${material.id}_ore`;
}

function gregnauticsGtceuSandCompatRaw(material) {
	return `gtceu:raw_${material.id}`;
}

function gregnauticsGtceuSandCompatRawBlock(material) {
	return `gtceu:raw_${material.id}_block`;
}

function gregnauticsGtceuSandCompatOreBlock(color, material) {
	return `gtceu:${color}_sand_${material.id}_ore`;
}

function gregnauticsGtceuSandCompatGenericOreBlock(material) {
	return `gtceu:${material.id}_ore`;
}

function gregnauticsGtceuSandCompatBaseSand(color) {
	return `tfc:sand/${color}`;
}

function gregnauticsGtceuSandCompatOutputForMechanical(material) {
	const crushed = gregnauticsGtceuSandCompatCrushed(material);
	if (gregnauticsGtceuSandCompatItemExists(crushed)) {
		return crushed;
	}

	const raw = gregnauticsGtceuSandCompatRaw(material);
	if (gregnauticsGtceuSandCompatItemExists(raw)) {
		return raw;
	}

	const dust = `gtceu:${material.id}_dust`;
	return gregnauticsGtceuSandCompatItemExists(dust) ? dust : null;
}

function gregnauticsGtceuSandCompatAddCreateCrushing(event, id, outputs, input) {
	event.remove({ id: id });
	event.recipes.create.crushing(Array.isArray(outputs) ? outputs : [outputs], input).id(id);
}

function gregnauticsGtceuSandCompatAddCreateMilling(event, id, output, input) {
	event.remove({ id: id });
	event.recipes.create.milling(output, input).id(id);
}

function gregnauticsGtceuSandCompatAddQuern(event, id, output, input) {
	event.remove({ id: id });
	event.recipes.tfc.quern(output, input).id(id);
}

function gregnauticsGtceuSandCompatAddMechanicalFromInput(event, idSuffix, input, output, count) {
	if (!gregnauticsGtceuSandCompatItemExists(input) || output === null || !gregnauticsGtceuSandCompatItemExists(output)) {
		return false;
	}

	const outputStack = gregnauticsGtceuSandCompatStack(output, count);
	gregnauticsGtceuSandCompatAddCreateCrushing(
		event,
		`gregnautics:create/crushing/gtceu_sand_ore/${idSuffix}`,
		outputStack,
		input
	);
	gregnauticsGtceuSandCompatAddCreateMilling(
		event,
		`gregnautics:create/milling/gtceu_sand_ore/${idSuffix}`,
		outputStack,
		input
	);
	gregnauticsGtceuSandCompatAddQuern(
		event,
		`gregnautics:quern/gtceu_sand_ore/${idSuffix}`,
		outputStack,
		input
	);

	return true;
}

function gregnauticsGtceuSandCompatAddOreBlockMechanical(event, material, color) {
	const input = gregnauticsGtceuSandCompatOreBlock(color, material);
	const output = gregnauticsGtceuSandCompatOutputForMechanical(material);
	if (!gregnauticsGtceuSandCompatItemExists(input) || output === null || !gregnauticsGtceuSandCompatItemExists(output)) {
		return false;
	}

	const outputs = [output];
	const baseSand = gregnauticsGtceuSandCompatBaseSand(color);
	if (gregnauticsGtceuSandCompatItemExists(baseSand)) {
		outputs.push(CreateItem.of(baseSand, 0.5));
	}

	// ID должен включать "_sand_", иначе цвет+материал коллидирует с другим материалом:
	// например color=green + sapphire давало тот же ID, что материал green_sapphire,
	// и рецепты green_sapphire затирались (KubeJS "two recipes with the same ID").
	gregnauticsGtceuSandCompatAddCreateCrushing(
		event,
		`gregnautics:create/crushing/gtceu_sand_ore/${color}_sand_${material.id}_ore`,
		outputs,
		input
	);
	gregnauticsGtceuSandCompatAddCreateMilling(
		event,
		`gregnautics:create/milling/gtceu_sand_ore/${color}_sand_${material.id}_ore`,
		output,
		input
	);
	gregnauticsGtceuSandCompatAddQuern(
		event,
		`gregnautics:quern/gtceu_sand_ore/${color}_sand_${material.id}_ore`,
		output,
		input
	);

	return true;
}

function gregnauticsGtceuSandCompatAddGenericOreBlockMechanical(event, material) {
	const input = gregnauticsGtceuSandCompatGenericOreBlock(material);
	const output = gregnauticsGtceuSandCompatOutputForMechanical(material);
	if (!gregnauticsGtceuSandCompatItemExists(input) || output === null || !gregnauticsGtceuSandCompatItemExists(output)) {
		return false;
	}

	const outputs = [output];
	if (gregnauticsGtceuSandCompatItemExists("minecraft:sand")) {
		outputs.push(CreateItem.of("minecraft:sand", 0.5));
	}

	gregnauticsGtceuSandCompatAddCreateCrushing(
		event,
		`gregnautics:create/crushing/gtceu_sand_ore/${material.id}_ore`,
		outputs,
		input
	);
	gregnauticsGtceuSandCompatAddCreateMilling(
		event,
		`gregnautics:create/milling/gtceu_sand_ore/${material.id}_ore`,
		output,
		input
	);
	gregnauticsGtceuSandCompatAddQuern(
		event,
		`gregnautics:quern/gtceu_sand_ore/${material.id}_ore`,
		output,
		input
	);

	return true;
}

function gregnauticsGtceuSandCompatAddHeatData(event, item, id) {
	// Melting heat data for GTCEu ore forms is centralized in
	// gregnautics_gtceu_ore_melting_compat.js and gregnautics_gtceu_ore_powder_compat.js.
	// This script only keeps sand-ore mechanical processing and tags.
	return false;
}

function gregnauticsGtceuSandCompatAddHeating(event, material, form) {
	// See gregnauticsGtceuSandCompatAddHeatData().
	return false;
}

TFCEvents.data(event => {
	GREGNAUTICS_GTCEU_SAND_COMPAT_MATERIALS.forEach(material => {
		if (material.metal === undefined) {
			return;
		}

		GREGNAUTICS_GTCEU_SAND_COMPAT_HEAT_FORMS.forEach(form => {
			gregnauticsGtceuSandCompatAddHeatData(
				event,
				form.item(material),
				`gregnautics:gtceu_sand_ore/${material.id}/${form.form}`
			);
		});
	});
});

ServerEvents.tags("item", event => {
	GREGNAUTICS_GTCEU_SAND_COMPAT_MATERIALS.forEach(material => {
		const oreTags = ["c:ores", `c:ores/${material.id}`, "forge:ores", `forge:ores/${material.id}`];
		if (material.common !== undefined) {
			oreTags.push(`c:ores/${material.common}`);
			oreTags.push(`forge:ores/${material.common}`);
		}

		const genericOre = gregnauticsGtceuSandCompatGenericOreBlock(material);
		if (gregnauticsGtceuSandCompatItemExists(genericOre)) {
			oreTags.forEach(tag => event.add(tag, genericOre));
		}

		GREGNAUTICS_GTCEU_SAND_COMPAT_COLORS.forEach(color => {
			const item = gregnauticsGtceuSandCompatOreBlock(color, material);
			if (gregnauticsGtceuSandCompatItemExists(item)) {
				oreTags.forEach(tag => event.add(tag, item));
			}
		});
	});
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: gtceu_sand_ore_compat recipes event start");
	let oreBlockRecipes = 0;
	let rawRecipes = 0;
	let heatingRecipes = 0;

	GREGNAUTICS_GTCEU_SAND_COMPAT_MATERIALS.forEach(material => {
		const output = gregnauticsGtceuSandCompatOutputForMechanical(material);

		if (gregnauticsGtceuSandCompatAddGenericOreBlockMechanical(event, material)) {
			oreBlockRecipes++;
		}

		GREGNAUTICS_GTCEU_SAND_COMPAT_COLORS.forEach(color => {
			if (gregnauticsGtceuSandCompatAddOreBlockMechanical(event, material, color)) {
				oreBlockRecipes++;
			}
		});

		if (gregnauticsGtceuSandCompatAddMechanicalFromInput(event, `${material.id}_raw`, gregnauticsGtceuSandCompatRaw(material), output, 1)) {
			rawRecipes++;
		}
		if (gregnauticsGtceuSandCompatAddMechanicalFromInput(event, `${material.id}_raw_block`, gregnauticsGtceuSandCompatRawBlock(material), output, 9)) {
			rawRecipes++;
		}

		GREGNAUTICS_GTCEU_SAND_COMPAT_HEAT_FORMS.forEach(form => {
			const input = form.item(material);
			if (gregnauticsGtceuSandCompatAddHeating(event, material, form)) {
				heatingRecipes++;
			}
		});
	});

	console.info(`[Gregnautics] GTCEu sand ore compat: ${oreBlockRecipes} sand ore inputs, ${rawRecipes} raw inputs, ${heatingRecipes} TFC heating recipes.`);
});
