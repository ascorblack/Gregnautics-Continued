// priority: 20
"use strict";

const GREGNAUTICS_CREATE_BIONICS_TFC_WOODS = [
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

function gregnauticsBionicsId(path) {
	return `createbionics:${path}`;
}

function gregnauticsBionicsRemove(event, path) {
	event.remove({ id: gregnauticsBionicsId(path) });
}

function gregnauticsBionicsShaped(event, path, output, pattern, key) {
	gregnauticsBionicsRemove(event, path);
	event.shaped(output, pattern, key).id(gregnauticsBionicsId(path));
}

function gregnauticsBionicsMechanical(event, path, output, pattern, key) {
	gregnauticsBionicsRemove(event, `mechanical_crafting/${path}`);
	event.custom({
		type: "create:mechanical_crafting",
		accept_mirrored: false,
		category: "misc",
		key: key,
		pattern: pattern,
		result: {
			count: 1,
			id: output
		},
		show_notification: false
	}).id(gregnauticsBionicsId(`mechanical_crafting/${path}`));
}

ServerEvents.tags("item", event => {
	GREGNAUTICS_CREATE_BIONICS_TFC_WOODS.forEach(wood => {
		const chest = `tfc:wood/chest/${wood}`;
		const workbench = `tfc:wood/workbench/${wood}`;
		if (Item.exists(chest)) {
			event.add("c:chests/wooden", chest);
			event.add("forge:chests/wooden", chest);
		}
		if (Item.exists(workbench)) {
			event.add("c:workbenches", workbench);
			event.add("forge:workbenches", workbench);
		}
	});
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: create_bionics_integration recipes event start");
	gregnauticsBionicsShaped(event, "simple_engine", "createbionics:simple_engine", [
		"ASA",
		"PEP",
		"WRW"
	], {
		A: "gtceu:copper_plate",
		P: "createdieselgenerators:engine_piston",
		E: "gtceu:wrought_iron_plate",
		S: "create:shaft",
		W: "gtceu:wrought_iron_ingot",
		R: "create:fluid_pipe"
	});

	gregnauticsBionicsShaped(event, "anole_body_item", "createbionics:anole_body_item", [
		"CPC",
		"SES",
		"WSW"
	], {
		C: "gtceu:copper_plate",
		P: "create:cogwheel",
		E: "createbionics:simple_engine",
		W: "gtceu:wrought_iron_plate",
		S: "create:shaft"
	});

	gregnauticsBionicsShaped(event, "anole_head_item", "createbionics:anole_head_item", [
		" WC",
		"TEW",
		"CP "
	], {
		W: "exposure:camera",
		C: "gtceu:copper_single_wire",
		T: "create:transmitter",
		E: "gtceu:basic_electronic_circuit",
		P: "gtceu:copper_plate"
	});

	gregnauticsBionicsShaped(event, "anole_leg_item", "createbionics:anole_leg_item", [
		" C ",
		"  R",
		"WPC"
	], {
		C: "gtceu:copper_plate",
		R: "gtceu:wrought_iron_rod",
		W: "gtceu:wrought_iron_plate",
		P: "create:cogwheel"
	});

	gregnauticsBionicsShaped(event, "anole_tail_item", "createbionics:anole_tail_item", [
		"  R",
		" PC",
		"W  "
	], {
		R: "gtceu:wrought_iron_rod",
		P: "gtceu:copper_plate",
		C: "gtceu:copper_single_wire",
		W: "gtceu:wrought_iron_plate"
	});

	gregnauticsBionicsShaped(event, "organ_piston_item", "createbionics:organ_piston_item", [
		"SSD",
		"PPR",
		"PPR"
	], {
		S: "gtceu:steel_plate",
		D: "create:sturdy_sheet",
		P: "create:mechanical_piston",
		R: "gtceu:steel_rod"
	});

	gregnauticsBionicsShaped(event, "oxhauler_engine_item", "createbionics:oxhauler_engine_item", [
		"EAE",
		"ETE",
		"EFE"
	], {
		E: "createbionics:simple_engine",
		A: "gtceu:steel_plate",
		T: "createdieselgenerators:engine_turbocharger",
		F: "create:fluid_pipe"
	});

	gregnauticsBionicsShaped(event, "oxhauler_front_item", "createbionics:oxhauler_front_item", [
		"GTG",
		"HWH",
		"SKS"
	], {
		G: "gtceu:brass_ingot",
		T: { tag: "c:workbenches" },
		H: { tag: "c:chests/wooden" },
		W: "gtceu:wrought_iron_block",
		S: "create:shaft",
		K: "create:cogwheel"
	});

	gregnauticsBionicsShaped(event, "oxhauler_middle_item", "createbionics:oxhauler_middle_item", [
		"GSG",
		"CEC",
		"APA"
	], {
		G: "gtceu:brass_ingot",
		S: "create:red_seat",
		C: { tag: "c:chests/wooden" },
		A: "gtceu:steel_plate",
		P: "create:shaft",
		E: "create:mechanical_pump"
	});

	gregnauticsBionicsShaped(event, "oxhauler_rear_item", "createbionics:oxhauler_rear_item", [
		"GEG",
		"HBH",
		"SKS"
	], {
		G: "gtceu:brass_ingot",
		E: "createbionics:oxhauler_engine_item",
		H: { tag: "c:chests/wooden" },
		B: "gtceu:wrought_iron_block",
		S: "create:shaft",
		K: "create:large_cogwheel"
	});

	gregnauticsBionicsShaped(event, "replete_leg_item", "createbionics:replete_leg_item", [
		" SC",
		" GP",
		" BS"
	], {
		S: "gtceu:copper_plate",
		C: "create:cogwheel",
		G: "create:metal_girder",
		P: "create:shaft",
		B: "create:gearbox"
	});

	gregnauticsBionicsMechanical(event, "replete_body_item", "createbionics:replete_body_item", [
		"CPC",
		"EGE",
		"HAH",
		"EBE",
		"QIQ"
	], {
		C: { item: "gtceu:copper_plate" },
		P: { item: "create:fluid_pipe" },
		E: { item: "create:encased_chain_drive" },
		G: { item: "create:framed_glass" },
		H: { item: "create:mechanical_pump" },
		A: { item: "simulated:red_portable_engine" },
		B: { item: "gtceu:micro_processor" },
		Q: { item: "exposure:camera" },
		I: { item: "gtceu:steel_block" }
	});

	gregnauticsBionicsMechanical(event, "oxhauler_head_item", "createbionics:oxhauler_head_item", [
		"IBTBI",
		"SEAES",
		"SCICS"
	], {
		I: { item: "gtceu:brass_ingot" },
		B: { item: "gtceu:brass_block" },
		S: { item: "create:shaft" },
		A: { item: "gtceu:wrought_iron_block" },
		T: { item: "gtceu:micro_processor" },
		E: { item: "exposure:camera" },
		C: { item: "create:cogwheel" }
	});

	gregnauticsBionicsMechanical(event, "organ_bellows_item", "createbionics:organ_bellows_item", [
		"CWW ",
		"CWWW",
		"CLWW",
		"BRSC"
	], {
		C: { item: "create:brass_casing" },
		W: { tag: "minecraft:wool" },
		L: { item: "create:large_cogwheel" },
		B: { item: "gtceu:brass_plate" },
		R: { item: "create:mechanical_pump" },
		S: { item: "create:smart_fluid_pipe" }
	});

	gregnauticsBionicsMechanical(event, "organ_chest_item", "createbionics:organ_chest_item", [
		"CPCPC",
		"PETEP",
		"CENEC",
		"BGMGB",
		"BCFCB"
	], {
		C: { item: "create:railway_casing" },
		P: { item: "create:fluid_pipe" },
		E: { item: "create:mechanical_pump" },
		T: { item: "create:fluid_tank" },
		N: { item: "createdieselgenerators:large_diesel_engine" },
		B: { item: "create:brass_casing" },
		G: { item: "create:gearbox" },
		M: { item: "create:precision_mechanism" },
		F: { item: "create:encased_fan" }
	});

	gregnauticsBionicsMechanical(event, "organ_chimney_item", "createbionics:organ_chimney_item", [
		"S ",
		"S ",
		"SP",
		"SS"
	], {
		S: { item: "gtceu:steel_plate" },
		P: { item: "create:fluid_pipe" }
	});

	gregnauticsBionicsMechanical(event, "organ_foot_item", "createbionics:organ_foot_item", [
		"SSS",
		"SCS",
		"ILI",
		"SCS"
	], {
		S: { item: "gtceu:steel_plate" },
		C: { item: "create:cogwheel" },
		I: { item: "createbionics:organ_piston_item" },
		L: { item: "create:large_cogwheel" }
	});

	gregnauticsBionicsMechanical(event, "organ_head_item", "createbionics:organ_head_item", [
		"CTAAA",
		"CNERA",
		"RSSSS"
	], {
		C: { item: "createbionics:organ_chimney_item" },
		T: { item: "exposure:camera" },
		A: { item: "gtceu:steel_block" },
		N: { item: "gtceu:lv_sensor" },
		E: { item: "create:transmitter" },
		R: { item: "create:railway_casing" },
		S: { item: "gtceu:steel_plate" }
	});

	gregnauticsBionicsMechanical(event, "organ_neck_item", "createbionics:organ_neck_item", [
		"CCCCC",
		"PSNSP",
		"BKBKB"
	], {
		C: { item: "create:railway_casing" },
		P: { item: "create:fluid_pipe" },
		S: { item: "create:shaft" },
		N: { item: "create:mechanical_arm" },
		B: { item: "gtceu:brass_plate" },
		K: { item: "gtceu:steel_plate" }
	});

	gregnauticsBionicsMechanical(event, "organ_tail_base_item", "createbionics:organ_tail_base_item", [
		"PPPPP",
		"MTCSG",
		"RRDDD"
	], {
		P: { item: "create:fluid_pipe" },
		M: { item: "create:mechanical_pump" },
		T: { item: "create:fluid_tank" },
		C: { item: "create:precision_mechanism" },
		S: { item: "create:shaft" },
		G: { item: "create:gearbox" },
		R: { item: "create:railway_casing" },
		D: { item: "gtceu:steel_plate" }
	});

	gregnauticsBionicsMechanical(event, "organ_tail_end_item", "createbionics:organ_tail_end_item", [
		"RPPPP",
		"MTGGG"
	], {
		R: { item: "create:railway_casing" },
		P: { item: "create:fluid_pipe" },
		M: { item: "create:mechanical_pump" },
		T: { item: "create:fluid_tank" },
		G: { item: "create:metal_girder" }
	});

	console.info("[Gregnautics] Create Bionics recipes integrated with GTCEu, TFC and Create Diesel Generators.");
});
