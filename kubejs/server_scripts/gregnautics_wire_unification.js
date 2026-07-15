// priority: -80
"use strict";

const GREGNAUTICS_WIRE_CANONICAL = {
	copper: "powergrid:wire",
	gold: "powergrid:golden_wire",
	iron: "powergrid:iron_wire",
	aluminum: "tfc_items:aluminum_wire",
	bismuth: "tfc_items:bismuth_wire",
	bismuth_bronze: "tfc_items:bismuth_bronze_wire",
	black_bronze: "tfc_items:black_bronze_wire",
	black_steel: "tfc_items:black_steel_wire",
	blue_steel: "tfc_items:blue_steel_wire",
	brass: "tfc_items:brass_wire",
	bronze: "tfc_items:bronze_wire",
	cast_iron: "tfc_items:cast_iron_wire",
	chromium: "tfc_items:chromium_wire",
	constantan: "tfc_items:constantan_wire",
	electrum: "tfc_items:electrum_wire",
	lead: "tfc_items:lead_wire",
	nickel: "tfc_items:nickel_wire",
	red_steel: "tfc_items:red_steel_wire",
	rose_gold: "tfc_items:rose_gold_wire",
	silver: "tfc_items:silver_wire",
	stainless_steel: "tfc_items:stainless_steel_wire",
	steel: "tfc_items:steel_wire",
	sterling_silver: "tfc_items:sterling_silver_wire",
	tin: "tfc_items:tin_wire",
	uranium: "tfc_items:uranium_wire",
	wrought_iron: "powergrid:iron_wire",
	zinc: "tfc_items:zinc_wire"
};

const GREGNAUTICS_WIRE_ALIASES = {
	aluminium: "aluminum"
};

const GREGNAUTICS_WIRE_DUPLICATES = {
	copper: [
		"createaddition:copper_wire",
		"tfc_items:copper_wire",
		"tfmg:copper_wire"
	],
	gold: [
		"createaddition:gold_wire",
		"tfc_items:gold_wire"
	],
	iron: [
		"createaddition:iron_wire",
		"tfc_items:wrought_iron_wire"
	],
	aluminum: [
		"tfmg:aluminum_wire"
	],
	constantan: [
		"tfmg:constantan_wire"
	],
	electrum: [
		"createaddition:electrum_wire"
	]
};

const GREGNAUTICS_WIRE_TAG_ONLY_REMOVALS = {};

const GREGNAUTICS_WIRE_TAGS = Object.keys(GREGNAUTICS_WIRE_CANONICAL).concat(Object.keys(GREGNAUTICS_WIRE_ALIASES));
const GREGNAUTICS_WIRE_ANVIL_TIERS = {
	aluminum: 1,
	bismuth: 1,
	bismuth_bronze: 2,
	black_bronze: 2,
	black_steel: 5,
	blue_steel: 6,
	brass: 2,
	bronze: 2,
	cast_iron: 3,
	chromium: 3,
	constantan: 2,
	copper: 1,
	electrum: 3,
	gold: 1,
	iron: 3,
	lead: 1,
	nickel: 1,
	red_steel: 6,
	rose_gold: 1,
	silver: 1,
	stainless_steel: 4,
	steel: 4,
	sterling_silver: 1,
	tin: 1,
	uranium: 3,
	wrought_iron: 3,
	zinc: 1
};

const GREGNAUTICS_WIRE_RECIPE_FILTERS = [
	{ type: "minecraft:crafting_shaped" },
	{ type: "minecraft:crafting_shapeless" },
	{ type: "create:deploying" },
	{ type: "create:mechanical_crafting" },
	{ type: "create:sequenced_assembly" },
	{ type: "createaddition:charging" },
	{ type: "createaddition:rolling" },
	{ type: "tfc:anvil" },
	{ type: "tfc:heating" }
];

const GREGNAUTICS_WIRE_REMOVED_RECIPE_IDS = [
	"powergrid:cutting/copper_wire_cutting",
	"powergrid:cutting/gold_wire_cutting",
	"powergrid:cutting/iron_wire_cutting",
	"createdieselgenerators:crafting/wire_cutters",
	"createdieselgenerators:wire_cutting/sticks",
	"createdieselgenerators:wire_cutting/sticks_from_ladder"
];

const gregnauticsWireExists = item => Item.exists(item);
const gregnauticsWireCanonicalFor = material => GREGNAUTICS_WIRE_CANONICAL[GREGNAUTICS_WIRE_ALIASES[material] || material];

const gregnauticsWireResult = (id, count) => {
	const result = { id: id };
	if (count !== undefined && count !== 1) {
		result.count = count;
	}
	return result;
};

const gregnauticsWireAddProcessingRecipe = (event, id, type, input, output, count, extra) => {
	if (!gregnauticsWireExists(output)) return;
	const recipe = {
		type: type,
		ingredients: [input],
		results: [gregnauticsWireResult(output, count)]
	};
	if (extra !== undefined) {
		Object.keys(extra).forEach(key => {
			recipe[key] = extra[key];
		});
	}
	event.remove({ id: id });
	event.custom(recipe).id(id);
};

const gregnauticsWireAddAnvilRecipe = (event, id, input, output, count, tier) => {
	if (!gregnauticsWireExists(output)) return;
	event.remove({ id: id });
	event.custom({
		type: "tfc:anvil",
		ingredient: input,
		result: gregnauticsWireResult(output, count),
		tier: tier,
		rules: ["hit_last", "hit_second_last", "hit_third_last"]
	}).id(id);
};

ServerEvents.tags("item", event => {
	GREGNAUTICS_WIRE_TAGS.forEach(material => {
		const canonical = gregnauticsWireCanonicalFor(material);
		if (!canonical || !gregnauticsWireExists(canonical)) return;

		[`c:wires/${material}`, `forge:wires/${material}`].forEach(tag => {
			event.add(tag, canonical);
		});
	});

	Object.values(GREGNAUTICS_WIRE_CANONICAL).forEach(item => {
		if (gregnauticsWireExists(item)) {
			event.add("c:wires/all_metal", item);
			event.add("forge:wires/all_metal", item);
		}
	});

	Object.entries(GREGNAUTICS_WIRE_TAG_ONLY_REMOVALS).forEach(([material, items]) => {
		items.forEach(item => {
			event.remove(`c:wires/${material}`, item);
			event.remove(`forge:wires/${material}`, item);
		});
	});

	const allDuplicates = [];
	Object.values(GREGNAUTICS_WIRE_DUPLICATES).forEach(items => {
		items.forEach(item => {
			if (!allDuplicates.includes(item)) allDuplicates.push(item);
		});
	});

	allDuplicates.forEach(item => {
		if (!gregnauticsWireExists(item)) return;
		event.remove("c:wires", item);
		event.remove("forge:wires", item);
		GREGNAUTICS_WIRE_TAGS.forEach(material => {
			event.remove(`c:wires/${material}`, item);
			event.remove(`forge:wires/${material}`, item);
		});
		event.remove("c:wires/all_metal", item);
		event.remove("forge:wires/all_metal", item);
		event.add("c:hidden_from_recipe_viewers", item);
		event.add("forge:hidden_from_recipe_viewers", item);
	});

	if (gregnauticsWireExists("createdieselgenerators:wire_cutters")) {
		event.remove("immersiveengineering:tools/wirecutters", "createdieselgenerators:wire_cutters");
		event.add("c:hidden_from_recipe_viewers", "createdieselgenerators:wire_cutters");
		event.add("forge:hidden_from_recipe_viewers", "createdieselgenerators:wire_cutters");
	}
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: wire_unification recipes event start");
	GREGNAUTICS_WIRE_REMOVED_RECIPE_IDS.forEach(id => event.remove({ id: id }));
	event.remove({ type: "createdieselgenerators:wire_cutting" });

	Object.entries(GREGNAUTICS_WIRE_DUPLICATES).forEach(([material, duplicates]) => {
		const canonical = gregnauticsWireCanonicalFor(material);
		if (!canonical || !gregnauticsWireExists(canonical)) return;

		duplicates.forEach(item => {
			if (!gregnauticsWireExists(item)) return;
			event.replaceInput(GREGNAUTICS_WIRE_RECIPE_FILTERS, item, canonical);
			event.replaceOutput(GREGNAUTICS_WIRE_RECIPE_FILTERS, item, canonical);
			event.remove({ output: item });
		});
	});

	Object.entries(GREGNAUTICS_WIRE_CANONICAL).forEach(([material, output]) => {
		gregnauticsWireAddProcessingRecipe(
			event,
			`gregnautics:createaddition/rolling/${material}_wire_from_rod`,
			"createaddition:rolling",
			{ tag: `c:rods/${material}` },
			output,
			2
		);
	});

	[
		["copper", "c:rods/copper"],
		["gold", "c:rods/gold"],
		["iron", "c:rods/iron"]
	].forEach(entry => {
		const material = entry[0];
		const rodTag = entry[1];
		gregnauticsWireAddAnvilRecipe(
			event,
			`gregnautics:tfc/anvil/${material}_wire_from_${rodTag.split("/").pop()}_rod`,
			{ tag: rodTag },
			gregnauticsWireCanonicalFor(material),
			2,
			GREGNAUTICS_WIRE_ANVIL_TIERS[material]
		);
	});

	event.remove({ id: "createaddition:charging/electrify_gold_wire" });
	if (gregnauticsWireExists("powergrid:golden_wire") && gregnauticsWireExists("tfc_items:electrum_wire")) {
		event.custom({
			type: "createaddition:charging",
			energy: 18000,
			ingredients: [
				{ item: "powergrid:golden_wire" }
			],
			max_charge_rate: 360,
			results: [
				{ id: "tfc_items:electrum_wire" }
			]
		}).id("gregnautics:createaddition/charging/electrum_wire_from_powergrid_gold_wire");
	}
});
