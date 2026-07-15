"use strict";

const GREGNAUTICS_TFC_MINERAL_STONES = [
	"gabbro",
	"shale",
	"claystone",
	"limestone",
	"conglomerate",
	"dolomite",
	"chert",
	"chalk",
	"rhyolite",
	"basalt",
	"andesite",
	"dacite",
	"quartzite",
	"slate",
	"phyllite",
	"schist",
	"gneiss",
	"marble",
	"diorite",
	"granite",
	"tuff"
];

const GREGNAUTICS_TFC_GRADED_RAW_BLOCK_DROPS = [
	{ gt: "bismuth", tfc: "bismuthinite" },
	{ gt: "bismuthinite", tfc: "bismuthinite" },
	{ gt: "cassiterite", tfc: "cassiterite" },
	{ gt: "cassiterite_sand", tfc: "cassiterite" },
	{ gt: "tin", tfc: "cassiterite" },
	{ gt: "garnierite", tfc: "garnierite" },
	{ gt: "nickel", tfc: "garnierite" },
	{ gt: "hematite", tfc: "hematite" },
	{ gt: "limonite", tfc: "limonite" },
	{ gt: "yellow_limonite", tfc: "limonite" },
	{ gt: "magnetite", tfc: "magnetite" },
	{ gt: "malachite", tfc: "malachite" },
	{ gt: "copper", tfc: "native_copper" },
	{ gt: "gold", tfc: "native_gold" },
	{ gt: "silver", tfc: "native_silver" },
	{ gt: "sphalerite", tfc: "sphalerite" },
	{ gt: "zinc", tfc: "sphalerite" },
	{ gt: "tetrahedrite", tfc: "tetrahedrite" }
];

const GREGNAUTICS_TFC_UNGRADED_MINERAL_COMPAT = [
	{ gt: "amethyst", tfc: "amethyst" },
	{ gt: "borax", tfc: "borax" },
	{ gt: "cinnabar", tfc: "cinnabar" },
	{ gt: "cryolite", tfc: "cryolite" },
	// TFC's diamond ore represents kimberlite, but it is the diamond-bearing ore.
	{ gt: "diamond", tfc: "diamond", aliases: ["kimberlite"] },
	{ gt: "emerald", tfc: "emerald" },
	{ gt: "graphite", tfc: "graphite" },
	{ gt: "green_sapphire", tfc: "sapphire", exact: false },
	{ gt: "gypsum", tfc: "gypsum" },
	{ gt: "lapis", tfc: "lapis_lazuli" },
	{ gt: "lazurite", tfc: "lapis_lazuli", exact: false },
	{ gt: "opal", tfc: "opal" },
	{ gt: "pyrite", tfc: "pyrite" },
	{ gt: "ruby", tfc: "ruby" },
	{ gt: "saltpeter", tfc: "saltpeter" },
	{ gt: "sapphire", tfc: "sapphire" },
	{ gt: "sulfur", tfc: "sulfur" },
	{ gt: "sylvite", tfc: "sylvite" },
	{ gt: "topaz", tfc: "topaz" },
	{ gt: "blue_topaz", tfc: "topaz", exact: false }
];

const GREGNAUTICS_GTCEU_RAW_BLOCK_MATERIALS = [
	"almandine",
	"aluminium",
	"alunite",
	"amethyst",
	"apatite",
	"asbestos",
	"barite",
	"basaltic_mineral_sand",
	"bastnasite",
	"bauxite",
	"bentonite",
	"beryllium",
	"bismuth",
	"blue_topaz",
	"borax",
	"bornite",
	"calcite",
	"cassiterite",
	"cassiterite_sand",
	"certus_quartz",
	"chalcocite",
	"chalcopyrite",
	"chromite",
	"cinnabar",
	"coal",
	"cobalt",
	"cobaltite",
	"cooperite",
	"diamond",
	"diatomite",
	"electrotine",
	"emerald",
	"fullers_earth",
	"galena",
	"garnet_sand",
	"garnierite",
	"glauconite_sand",
	"goethite",
	"granitic_mineral_sand",
	"graphite",
	"green_sapphire",
	"grossular",
	"gypsum",
	"hematite",
	"ilmenite",
	"kyanite",
	"lapis",
	"lazurite",
	"lead",
	"lepidolite",
	"lithium",
	"magnesite",
	"magnetite",
	"malachite",
	"mica",
	"molybdenite",
	"molybdenum",
	"monazite",
	"naquadah",
	"neodymium",
	"nether_quartz",
	"nickel",
	"oilsands",
	"olivine",
	"opal",
	"palladium",
	"pentlandite",
	"pitchblende",
	"platinum",
	"plutonium_239",
	"pollucite",
	"powellite",
	"pyrite",
	"pyrochlore",
	"pyrolusite",
	"pyrope",
	"quartzite",
	"realgar",
	"red_garnet",
	"redstone",
	"rock_salt",
	"ruby",
	"salt",
	"saltpeter",
	"sapphire",
	"scheelite",
	"silver",
	"soapstone",
	"sodalite",
	"spessartine",
	"sphalerite",
	"spodumene",
	"stibnite",
	"sulfur",
	"talc",
	"tantalite",
	"tetrahedrite",
	"thorium",
	"tin",
	"topaz",
	"tricalcium_phosphate",
	"trona",
	"tungstate",
	"uraninite",
	"vanadium_magnetite",
	"wulfenite",
	"yellow_garnet",
	"yellow_limonite",
	"zeolite"
];

const GREGNAUTICS_TFC_RAW_BLOCK_MAPPED_MATERIALS = new Set(
	GREGNAUTICS_TFC_GRADED_RAW_BLOCK_DROPS
		.map(entry => entry.gt)
		.concat(GREGNAUTICS_TFC_UNGRADED_MINERAL_COMPAT.map(entry => entry.gt))
);

function gregnauticsGtceuTfcMineralItemExists(item) {
	return Item.exists(item);
}

function gregnauticsGtceuTfcMineralStack(item, count) {
	return count === 1 ? item : `${count}x ${item}`;
}

function gregnauticsGtceuTfcMineralOutputForMechanical(gtMaterial) {
	const crushed = `gtceu:crushed_${gtMaterial}_ore`;
	if (gregnauticsGtceuTfcMineralItemExists(crushed)) {
		return crushed;
	}

	const raw = `gtceu:raw_${gtMaterial}`;
	if (gregnauticsGtceuTfcMineralItemExists(raw)) {
		return raw;
	}

	const dust = `gtceu:${gtMaterial}_dust`;
	return gregnauticsGtceuTfcMineralItemExists(dust) ? dust : null;
}

function gregnauticsGtceuTfcMineralLootTable(outputItem, count) {
	const entry = {
		type: "minecraft:item",
		name: outputItem
	};

	if (count !== 1) {
		entry.functions = [
			{
				function: "minecraft:set_count",
				count: {
					type: "minecraft:constant",
					value: count
				},
				add: false
			}
		];
	}

	return {
		type: "minecraft:block",
		pools: [
			{
				name: "loot_pool",
				rolls: 1,
				entries: [entry],
				conditions: [{ condition: "minecraft:survives_explosion" }]
			}
		]
	};
}

function gregnauticsGtceuTfcMineralAddRawBlockLoot(event, rawMaterial, outputItem) {
	const rawBlock = `gtceu:raw_${rawMaterial}_block`;
	if (!gregnauticsGtceuTfcMineralItemExists(rawBlock) || !gregnauticsGtceuTfcMineralItemExists(outputItem)) {
		return false;
	}

	event.json(
		`gtceu:loot_table/blocks/raw_${rawMaterial}_block`,
		gregnauticsGtceuTfcMineralLootTable(outputItem, 2)
	);
	return true;
}

function gregnauticsGtceuTfcMineralAddOreTags(event, gtMaterial, tfcOre, item) {
	if (!gregnauticsGtceuTfcMineralItemExists(item)) {
		return false;
	}

	event.add("c:ores", item);
	event.add(`c:ores/${gtMaterial}`, item);
	event.add(`c:ores/${tfcOre}`, item);
	event.add("forge:ores", item);
	event.add(`forge:ores/${gtMaterial}`, item);
	event.add(`forge:ores/${tfcOre}`, item);
	event.add(`c:raw_materials/${gtMaterial}`, item);
	event.add(`forge:raw_materials/${gtMaterial}`, item);
	return true;
}

function gregnauticsGtceuTfcMineralAddAliasTags(event, aliases, item) {
	if (!Array.isArray(aliases) || !gregnauticsGtceuTfcMineralItemExists(item)) {
		return false;
	}

	aliases.forEach(alias => {
		event.add(`c:ores/${alias}`, item);
		event.add(`forge:ores/${alias}`, item);
		event.add(`c:raw_materials/${alias}`, item);
		event.add(`forge:raw_materials/${alias}`, item);
	});
	return true;
}

function gregnauticsGtceuTfcMineralAddMachineRecipes(event, gtMaterial, tfcOre, item, idSuffix) {
	const crushed = `gtceu:crushed_${gtMaterial}_ore`;
	if (!gregnauticsGtceuTfcMineralItemExists(item) || !gregnauticsGtceuTfcMineralItemExists(crushed)) {
		return false;
	}

	event.recipes.gtceu.forge_hammer(`gregnautics:gtceu/forge_hammer/tfc_${tfcOre}_${idSuffix}_to_${gtMaterial}_crushed_ore`)
		.itemInputs(item)
		.itemOutputs(crushed)
		.duration(100)
		.EUt(16);

	event.recipes.gtceu.macerator(`gregnautics:gtceu/macerator/tfc_${tfcOre}_${idSuffix}_to_${gtMaterial}_crushed_ore`)
		.itemInputs(item)
		.itemOutputs(crushed)
		.chancedOutput(crushed, 5000)
		.chancedOutput(crushed, 2500)
		.chancedOutput(crushed, 1250)
		.duration(40)
		.EUt(2);

	return true;
}

function gregnauticsGtceuTfcMineralAddMechanicalRecipes(event, gtMaterial, tfcOre, item, idSuffix) {
	const output = gregnauticsGtceuTfcMineralOutputForMechanical(gtMaterial);
	if (!gregnauticsGtceuTfcMineralItemExists(item) || output === null) {
		return false;
	}

	const outputStack = gregnauticsGtceuTfcMineralStack(output, 1);
	event.remove({ type: "create:crushing", input: item });
	event.remove({ id: `gregnautics:create/crushing/tfc_mineral/${tfcOre}_${idSuffix}_to_${gtMaterial}` });
	event.recipes.create.crushing(outputStack, item)
		.id(`gregnautics:create/crushing/tfc_mineral/${tfcOre}_${idSuffix}_to_${gtMaterial}`);

	event.remove({ type: "create:milling", input: item });
	event.remove({ id: `gregnautics:create/milling/tfc_mineral/${tfcOre}_${idSuffix}_to_${gtMaterial}` });
	event.recipes.create.milling(outputStack, item)
		.id(`gregnautics:create/milling/tfc_mineral/${tfcOre}_${idSuffix}_to_${gtMaterial}`);

	event.remove({ type: "tfc:quern", input: item });
	event.remove({ id: `gregnautics:quern/tfc_mineral/${tfcOre}_${idSuffix}_to_${gtMaterial}` });
	event.recipes.tfc.quern(outputStack, item)
		.id(`gregnautics:quern/tfc_mineral/${tfcOre}_${idSuffix}_to_${gtMaterial}`);

	return true;
}

ServerEvents.generateData("after_mods", event => {
	GREGNAUTICS_TFC_GRADED_RAW_BLOCK_DROPS.forEach(entry => {
		gregnauticsGtceuTfcMineralAddRawBlockLoot(event, entry.gt, `tfc:ore/rich_${entry.tfc}`);
	});

	GREGNAUTICS_TFC_UNGRADED_MINERAL_COMPAT.forEach(entry => {
		gregnauticsGtceuTfcMineralAddRawBlockLoot(event, entry.gt, `tfc:ore/${entry.tfc}`);
	});

	GREGNAUTICS_GTCEU_RAW_BLOCK_MATERIALS.forEach(material => {
		if (!GREGNAUTICS_TFC_RAW_BLOCK_MAPPED_MATERIALS.has(material)) {
			gregnauticsGtceuTfcMineralAddRawBlockLoot(event, material, `gtceu:raw_${material}`);
		}
	});
});

ServerEvents.tags("item", event => {
	GREGNAUTICS_TFC_UNGRADED_MINERAL_COMPAT.forEach(entry => {
		if (entry.exact === false) {
			return;
		}

		gregnauticsGtceuTfcMineralAddOreTags(event, entry.gt, entry.tfc, `tfc:ore/${entry.tfc}`);
		gregnauticsGtceuTfcMineralAddAliasTags(event, entry.aliases, `tfc:ore/${entry.tfc}`);

		GREGNAUTICS_TFC_MINERAL_STONES.forEach(stone => {
			gregnauticsGtceuTfcMineralAddOreTags(event, entry.gt, entry.tfc, `tfc:ore/${entry.tfc}/${stone}`);
			gregnauticsGtceuTfcMineralAddAliasTags(event, entry.aliases, `tfc:ore/${entry.tfc}/${stone}`);
		});
	});
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: gtceu_tfc_mineral_compat recipes event start");
	GREGNAUTICS_TFC_UNGRADED_MINERAL_COMPAT.forEach(entry => {
		if (entry.exact === false) {
			return;
		}

		gregnauticsGtceuTfcMineralAddMachineRecipes(event, entry.gt, entry.tfc, `tfc:ore/${entry.tfc}`, "base");
		gregnauticsGtceuTfcMineralAddMechanicalRecipes(event, entry.gt, entry.tfc, `tfc:ore/${entry.tfc}`, "base");

		GREGNAUTICS_TFC_MINERAL_STONES.forEach(stone => {
			gregnauticsGtceuTfcMineralAddMachineRecipes(event, entry.gt, entry.tfc, `tfc:ore/${entry.tfc}/${stone}`, stone);
			gregnauticsGtceuTfcMineralAddMechanicalRecipes(event, entry.gt, entry.tfc, `tfc:ore/${entry.tfc}/${stone}`, stone);
		});
	});
});
