"use strict";

const GREGNAUTICS_GTCEU_WASHABLE_MATERIALS = [
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

const gregnauticsGtceuItemExists = item => Item.exists(item);

const GREGNAUTICS_GTCEU_BULK_WASHING_IRON_BYPRODUCT_REPLACEMENTS = {
	chromite: "gtceu:magnetite_dust",
	garnierite: "gtceu:goethite_dust",
	glauconite_sand: "gtceu:goethite_dust",
	ilmenite: "gtceu:magnetite_dust",
	magnetite: "gtceu:hematite_dust",
	nickel: "gtceu:goethite_dust",
	pentlandite: "gtceu:pyrite_dust",
	powellite: "gtceu:scheelite_dust",
	pyrite: "gtceu:goethite_dust",
	tin: "gtceu:cassiterite_dust",
	wulfenite: "gtceu:molybdenite_dust"
};

const GREGNAUTICS_GTCEU_BYPRODUCT_DUSTS = {
	almandine: "gtceu:red_garnet_dust",
	aluminium: "gtceu:bauxite_dust",
	amethyst: "gtceu:amethyst_dust",
	apatite: "gtceu:tricalcium_phosphate_dust",
	asbestos: "gtceu:diatomite_dust",
	basaltic_mineral_sand: "gtceu:basalt_dust",
	bastnasite: "gtceu:neodymium_dust",
	bauxite: "gtceu:grossular_dust",
	bentonite: "gtceu:aluminium_dust",
	beryllium: "gtceu:emerald_dust",
	blue_topaz: "gtceu:topaz_dust",
	bornite: "gtceu:pyrite_dust",
	calcite: "gtceu:calcium_dust",
	cassiterite: "gtceu:tin_dust",
	cassiterite_sand: "gtceu:tin_dust",
	certus_quartz: "gtceu:nether_quartz_dust",
	chalcocite: "gtceu:sulfur_dust",
	chalcopyrite: "gtceu:pyrite_dust",
	chromite: "gtceu:magnetite_dust",
	cinnabar: "gtceu:redstone_dust",
	coal: "gtceu:coal_dust",
	cobalt: "gtceu:cobalt_oxide_dust",
	cobaltite: "gtceu:sulfur_dust",
	cooperite: "gtceu:nickel_dust",
	copper: "gtceu:cobalt_dust",
	diamond: "gtceu:graphite_dust",
	diatomite: "gtceu:hematite_dust",
	electrotine: "gtceu:redstone_dust",
	emerald: "gtceu:beryllium_dust",
	fullers_earth: "gtceu:aluminium_dust",
	galena: "gtceu:sulfur_dust",
	garnet_sand: "gtceu:red_garnet_dust",
	garnierite: "gtceu:goethite_dust",
	glauconite_sand: "gtceu:sodium_dust",
	goethite: "gtceu:malachite_dust",
	gold: "gtceu:copper_dust",
	granitic_mineral_sand: "gtceu:deepslate_dust",
	graphite: "gtceu:carbon_dust",
	green_sapphire: "gtceu:aluminium_dust",
	grossular: "gtceu:yellow_garnet_dust",
	gypsum: "gtceu:sulfur_dust",
	hematite: "gtceu:magnetite_dust",
	ilmenite: "gtceu:magnetite_dust",
	iron: "gtceu:nickel_dust",
	kyanite: "gtceu:talc_dust",
	lapis: "gtceu:lazurite_dust",
	lazurite: "gtceu:sodalite_dust",
	lead: "gtceu:silver_dust",
	lepidolite: "gtceu:lithium_dust",
	lithium: "gtceu:lithium_dust",
	magnesite: "gtceu:magnesium_dust",
	magnetite: "gtceu:hematite_dust",
	malachite: "gtceu:goethite_dust",
	mica: "gtceu:potassium_dust",
	molybdenite: "gtceu:molybdenum_dust",
	molybdenum: "gtceu:molybdenum_dust",
	monazite: "gtceu:thorium_dust",
	naquadah: "gtceu:sulfur_dust",
	neodymium: "gtceu:rare_earth_dust",
	nether_quartz: "gtceu:quartzite_dust",
	nickel: "gtceu:cobalt_dust",
	olivine: "gtceu:pyrope_dust",
	opal: "gtceu:opal_dust",
	pentlandite: "gtceu:pyrite_dust",
	pitchblende: "gtceu:thorium_dust",
	platinum: "gtceu:nickel_dust",
	plutonium_239: "gtceu:uraninite_dust",
	pollucite: "gtceu:caesium_dust",
	powellite: "gtceu:scheelite_dust",
	pyrite: "gtceu:sulfur_dust",
	pyrochlore: "gtceu:apatite_dust",
	pyrolusite: "gtceu:manganese_dust",
	pyrope: "gtceu:red_garnet_dust",
	quartzite: "gtceu:certus_quartz_dust",
	realgar: "gtceu:sulfur_dust",
	red_garnet: "gtceu:spessartine_dust",
	redstone: "gtceu:cinnabar_dust",
	rock_salt: "gtceu:salt_dust",
	ruby: "gtceu:chromium_dust",
	salt: "gtceu:rock_salt_dust",
	saltpeter: "gtceu:saltpeter_dust",
	sapphire: "gtceu:aluminium_dust",
	scheelite: "gtceu:manganese_dust",
	silver: "gtceu:lead_dust",
	soapstone: "gtceu:silicon_dioxide_dust",
	sodalite: "gtceu:lazurite_dust",
	spessartine: "gtceu:red_garnet_dust",
	sphalerite: "gtceu:yellow_garnet_dust",
	spodumene: "gtceu:aluminium_dust",
	stibnite: "gtceu:antimony_trioxide_dust",
	sulfur: "gtceu:sulfur_dust",
	talc: "gtceu:clay_dust",
	tantalite: "gtceu:manganese_dust",
	tetrahedrite: "gtceu:antimony_dust",
	thorium: "gtceu:uraninite_dust",
	tin: "gtceu:cassiterite_dust",
	topaz: "gtceu:blue_topaz_dust",
	tricalcium_phosphate: "gtceu:apatite_dust",
	trona: "gtceu:sodium_dust",
	tungstate: "gtceu:manganese_dust",
	uraninite: "gtceu:uraninite_dust",
	vanadium_magnetite: "gtceu:magnetite_dust",
	wulfenite: "gtceu:molybdenite_dust",
	yellow_garnet: "gtceu:andradite_dust",
	yellow_limonite: "gtceu:nickel_dust",
	zeolite: "gtceu:calcium_dust"
};

const GREGNAUTICS_GTCEU_SECOND_BYPRODUCT_DUSTS = {
	almandine: "gtceu:aluminium_dust",
	aluminium: "gtceu:bauxite_dust",
	apatite: "gtceu:phosphate_dust",
	asbestos: "gtceu:silicon_dust",
	basaltic_mineral_sand: "gtceu:magnetite_dust",
	bastnasite: "gtceu:rare_earth_dust",
	bauxite: "gtceu:rutile_dust",
	bentonite: "gtceu:calcium_dust",
	beryllium: "gtceu:emerald_dust",
	bornite: "gtceu:cobalt_dust",
	calcite: "gtceu:calcium_dust",
	cassiterite: "gtceu:bismuth_dust",
	certus_quartz: "gtceu:barite_dust",
	chalcocite: "gtceu:massicot_dust",
	chalcopyrite: "gtceu:cobalt_dust",
	chromite: "gtceu:magnesium_dust",
	cinnabar: "gtceu:sulfur_dust",
	coal: "gtceu:coal_dust",
	cobalt: "gtceu:cobaltite_dust",
	cobaltite: "gtceu:cobalt_dust",
	cooperite: "gtceu:nickel_dust",
	copper: "gtceu:gold_dust",
	diatomite: "gtceu:sapphire_dust",
	electrotine: "gtceu:electrum_dust",
	emerald: "gtceu:aluminium_dust",
	fullers_earth: "gtceu:silicon_dust",
	galena: "gtceu:silver_dust",
	garnet_sand: "gtceu:yellow_garnet_dust",
	garnierite: "gtceu:nickel_dust",
	glauconite_sand: "gtceu:aluminium_dust",
	goethite: "gtceu:yellow_limonite_dust",
	gold: "gtceu:nickel_dust",
	granitic_mineral_sand: "gtceu:magnetite_dust",
	green_sapphire: "gtceu:sapphire_dust",
	grossular: "gtceu:calcium_dust",
	gypsum: "gtceu:calcium_dust",
	hematite: "gtceu:calcium_dust",
	ilmenite: "gtceu:rutile_dust",
	iron: "gtceu:tin_dust",
	kyanite: "gtceu:aluminium_dust",
	lapis: "gtceu:sodalite_dust",
	lazurite: "gtceu:lapis_dust",
	lead: "gtceu:sulfur_dust",
	lepidolite: "gtceu:caesium_dust",
	magnesite: "gtceu:magnesium_dust",
	magnetite: "gtceu:gold_dust",
	malachite: "gtceu:calcite_dust",
	mica: "gtceu:aluminium_dust",
	molybdenite: "gtceu:sulfur_dust",
	monazite: "gtceu:neodymium_dust",
	naquadah: "gtceu:barite_dust",
	nickel: "gtceu:goethite_dust",
	olivine: "gtceu:magnesium_dust",
	pentlandite: "gtceu:sulfur_dust",
	pitchblende: "gtceu:uraninite_dust",
	platinum: "gtceu:nickel_dust",
	plutonium_239: "gtceu:lead_dust",
	pollucite: "gtceu:aluminium_dust",
	powellite: "gtceu:potassium_dust",
	pyrite: "gtceu:tricalcium_phosphate_dust",
	pyrochlore: "gtceu:calcium_dust",
	pyrolusite: "gtceu:tantalite_dust",
	pyrope: "gtceu:magnesium_dust",
	quartzite: "gtceu:barite_dust",
	realgar: "gtceu:antimony_dust",
	red_garnet: "gtceu:pyrope_dust",
	redstone: "gtceu:rare_earth_dust",
	rock_salt: "gtceu:borax_dust",
	ruby: "gtceu:red_garnet_dust",
	salt: "gtceu:borax_dust",
	saltpeter: "gtceu:potassium_dust",
	sapphire: "gtceu:green_sapphire_dust",
	scheelite: "gtceu:molybdenum_dust",
	silver: "gtceu:sulfur_dust",
	soapstone: "gtceu:magnesium_dust",
	sodalite: "gtceu:lapis_dust",
	spessartine: "gtceu:manganese_dust",
	sphalerite: "gtceu:gallium_dust",
	spodumene: "gtceu:lithium_dust",
	stibnite: "gtceu:antimony_dust",
	talc: "gtceu:carbon_dust",
	tantalite: "gtceu:niobium_dust",
	tetrahedrite: "gtceu:zinc_dust",
	thorium: "gtceu:lead_dust",
	tin: "gtceu:zinc_dust",
	tricalcium_phosphate: "gtceu:phosphate_dust",
	trona: "gtceu:soda_ash_dust",
	tungstate: "gtceu:silver_dust",
	uraninite: "gtceu:thorium_dust",
	vanadium_magnetite: "gtceu:magnetite_dust",
	wulfenite: "gtceu:manganese_dust",
	yellow_garnet: "gtceu:grossular_dust",
	yellow_limonite: "gtceu:goethite_dust",
	zeolite: "gtceu:silicon_dust"
};

const GREGNAUTICS_GTCEU_THIRD_BYPRODUCT_DUSTS = {
	aluminium: "gtceu:ilmenite_dust",
	apatite: "gtceu:pyrochlore_dust",
	asbestos: "gtceu:magnesium_dust",
	bauxite: "gtceu:gallium_dust",
	bentonite: "gtceu:magnesium_dust",
	beryllium: "gtceu:thorium_dust",
	bornite: "gtceu:cadmium_dust",
	calcite: "gtceu:sodalite_dust",
	chalcocite: "gtceu:silver_dust",
	chalcopyrite: "gtceu:cadmium_dust",
	chromite: "gtceu:chromium_dust",
	cinnabar: "gtceu:glowstone_dust",
	coal: "gtceu:thorium_dust",
	cooperite: "gtceu:cobalt_dust",
	copper: "gtceu:nickel_dust",
	electrotine: "gtceu:diamond_dust",
	fullers_earth: "gtceu:magnesium_dust",
	glauconite_sand: "gtceu:goethite_dust",
	gold: "gtceu:silver_dust",
	gypsum: "gtceu:salt_dust",
	hematite: "gtceu:magnesium_dust",
	ilmenite: "gtceu:rutile_dust",
	iron: "gtceu:tin_dust",
	kyanite: "gtceu:silicon_dust",
	lapis: "gtceu:pyrite_dust",
	lepidolite: "gtceu:boron_dust",
	magnesite: "gtceu:cobaltite_dust",
	malachite: "gtceu:zincite_dust",
	molybdenite: "gtceu:quartzite_dust",
	monazite: "gtceu:rare_earth_dust",
	naquadah: "gtceu:enriched_naquadah_dust",
	nickel: "gtceu:platinum_dust",
	olivine: "gtceu:manganese_dust",
	pentlandite: "gtceu:cobalt_dust",
	pitchblende: "gtceu:lead_dust",
	platinum: "gtceu:cobalt_dust",
	plutonium_239: "gtceu:uraninite_dust",
	pollucite: "gtceu:potassium_dust",
	powellite: "gtceu:molybdenite_dust",
	pyrite: "gtceu:goethite_dust",
	pyrochlore: "gtceu:niobium_dust",
	pyrolusite: "gtceu:niobium_dust",
	realgar: "gtceu:barite_dust",
	red_garnet: "gtceu:almandine_dust",
	redstone: "gtceu:glowstone_dust",
	ruby: "gtceu:chromium_dust",
	saltpeter: "gtceu:salt_dust",
	scheelite: "gtceu:calcium_dust",
	silver: "gtceu:sulfur_dust",
	soapstone: "gtceu:calcite_dust",
	sphalerite: "gtceu:cadmium_dust",
	stibnite: "gtceu:cinnabar_dust",
	talc: "gtceu:clay_dust",
	tantalite: "gtceu:tantalum_dust",
	tetrahedrite: "gtceu:cadmium_dust",
	tricalcium_phosphate: "gtceu:pyrochlore_dust",
	trona: "gtceu:soda_ash_dust",
	tungstate: "gtceu:lithium_dust",
	uraninite: "gtceu:silver_dust",
	vanadium_magnetite: "gtceu:vanadium_dust",
	wulfenite: "gtceu:manganese_dust",
	yellow_garnet: "gtceu:uvarovite_dust",
	yellow_limonite: "gtceu:cobalt_oxide_dust",
	zeolite: "gtceu:aluminium_dust"
};

const GREGNAUTICS_GTCEU_BYPRODUCT_DUSTS_BY_INDEX = [
	GREGNAUTICS_GTCEU_BYPRODUCT_DUSTS,
	GREGNAUTICS_GTCEU_SECOND_BYPRODUCT_DUSTS,
	GREGNAUTICS_GTCEU_THIRD_BYPRODUCT_DUSTS
];

const GREGNAUTICS_GTCEU_MATERIAL_FIELD_OVERRIDES = {
	red_garnet: "GarnetRed",
	yellow_garnet: "GarnetYellow"
};

const gregnauticsGtceuPascalCase = name => name
	.split("_")
	.map(part => part.length === 0 ? part : part.substring(0, 1).toUpperCase() + part.substring(1))
	.join("");

const gregnauticsGtceuMaterial = materialName => {
	if (typeof GTMaterials === "undefined") {
		return null;
	}

	try {
		let material = GTMaterials.get(materialName);
		if (material !== null && material !== undefined) {
			return material;
		}
	} catch (ignored) {
	}

	const fieldName = GREGNAUTICS_GTCEU_MATERIAL_FIELD_OVERRIDES[materialName] || gregnauticsGtceuPascalCase(materialName);
	try {
		let material = GTMaterials[fieldName];
		return material === undefined ? null : material;
	} catch (ignored) {
		return null;
	}
};

const gregnauticsGtceuByproductDust = (materialName, index) => {
	if (typeof PropertyKey === "undefined") {
		return gregnauticsGtceuFallbackByproductDust(materialName, index);
	}

	try {
		let material = gregnauticsGtceuMaterial(materialName);
		if (material === null || material === undefined || !material.hasProperty(PropertyKey.ORE)) {
			return gregnauticsGtceuFallbackByproductDust(materialName, index);
		}

		const byproduct = material.getProperty(PropertyKey.ORE).getOreByProduct(index, material);
		if (byproduct === null || byproduct === undefined) {
			return gregnauticsGtceuFallbackByproductDust(materialName, index);
		}

		if (typeof ChemicalHelper !== "undefined" && typeof TagPrefix !== "undefined") {
			const dust = ChemicalHelper.get(TagPrefix.dust, byproduct, 1);
			if (dust !== null && dust !== undefined) {
				return gregnauticsGtceuNormalizeIronByproductDust(materialName, dust);
			}
		}

		const fallbackDust = `gtceu:${byproduct.getName()}_dust`;
		return gregnauticsGtceuItemExists(fallbackDust)
			? gregnauticsGtceuNormalizeIronByproductDust(materialName, fallbackDust)
			: gregnauticsGtceuFallbackByproductDust(materialName, index);
	} catch (ignored) {
		return gregnauticsGtceuFallbackByproductDust(materialName, index);
	}
};

const gregnauticsGtceuNormalizeIronByproductDust = (materialName, dust) => {
	if (dust !== "gtceu:iron_dust") {
		return dust;
	}

	const replacement = GREGNAUTICS_GTCEU_BULK_WASHING_IRON_BYPRODUCT_REPLACEMENTS[materialName];
	if (replacement !== undefined && gregnauticsGtceuItemExists(replacement)) {
		return replacement;
	}

	return dust;
};

const gregnauticsGtceuFallbackByproductDust = (materialName, index) => {
	for (let i = Math.min(index, GREGNAUTICS_GTCEU_BYPRODUCT_DUSTS_BY_INDEX.length - 1); i >= 0; i--) {
		const byproductDust = GREGNAUTICS_GTCEU_BYPRODUCT_DUSTS_BY_INDEX[i][materialName];
		if (byproductDust !== undefined && gregnauticsGtceuItemExists(byproductDust)) {
			return gregnauticsGtceuNormalizeIronByproductDust(materialName, byproductDust);
		}
	}

	const materialDust = `gtceu:${materialName}_dust`;
	return gregnauticsGtceuItemExists(materialDust) ? materialDust : null;
};

const gregnauticsAddCreateSplashing = (event, id, outputs, input) => {
	event.remove({ id: id });
	event.recipes.create.splashing(Array.isArray(outputs) ? outputs : [outputs], input).id(id);
};

const gregnauticsAddCreateCrushing = (event, id, outputs, input) => {
	event.remove({ id: id });
	event.recipes.create.crushing(Array.isArray(outputs) ? outputs : [outputs], input).id(id);
};

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: gtceu_bulk_washing recipes event start");
	let washedOreRecipes = 0;
	let byproductRecipes = 0;
	let crushingRecipes = 0;
	const missingByproducts = [];

	GREGNAUTICS_GTCEU_WASHABLE_MATERIALS.forEach(materialName => {
		const crushedOre = `gtceu:crushed_${materialName}_ore`;
		const purifiedOre = `gtceu:purified_${materialName}_ore`;
		const refinedOre = `gtceu:refined_${materialName}_ore`;
		const impureDust = `gtceu:impure_${materialName}_dust`;
		const pureDust = `gtceu:pure_${materialName}_dust`;
		const dust = materialName === "iron" ? "gtceu:hematite_dust" : `gtceu:${materialName}_dust`;

		if (gregnauticsGtceuItemExists(crushedOre) && gregnauticsGtceuItemExists(purifiedOre)) {
			const outputs = [purifiedOre, "gtceu:stone_dust"];
			const firstByproduct = gregnauticsGtceuByproductDust(materialName, 0);
			if (firstByproduct !== null) {
				outputs.push(CreateItem.of(firstByproduct, 0.33));
				byproductRecipes++;
			} else {
				missingByproducts.push(materialName);
			}
			washedOreRecipes++;

			gregnauticsAddCreateSplashing(
				event,
				`gregnautics:create/splashing/gtceu/${materialName}_purified_ore_water`,
				outputs,
				crushedOre
			);
		}

		if (gregnauticsGtceuItemExists(crushedOre) && gregnauticsGtceuItemExists(impureDust)) {
			crushingRecipes++;

			gregnauticsAddCreateCrushing(
				event,
				`gregnautics:create/crushing/gtceu/${materialName}_impure_dust_from_crushed_ore`,
				impureDust,
				crushedOre
			);
		}

		if (gregnauticsGtceuItemExists(purifiedOre) && gregnauticsGtceuItemExists(pureDust)) {
			crushingRecipes++;

			gregnauticsAddCreateCrushing(
				event,
				`gregnautics:create/crushing/gtceu/${materialName}_pure_dust_from_purified_ore`,
				pureDust,
				purifiedOre
			);
		}

		if (gregnauticsGtceuItemExists(refinedOre) && gregnauticsGtceuItemExists(dust)) {
			crushingRecipes++;

			gregnauticsAddCreateCrushing(
				event,
				`gregnautics:create/crushing/gtceu/${materialName}_dust_from_refined_ore`,
				dust,
				refinedOre
			);
		}

		if (gregnauticsGtceuItemExists(impureDust) && gregnauticsGtceuItemExists(dust)) {
			gregnauticsAddCreateSplashing(
				event,
				`gregnautics:create/splashing/gtceu/${materialName}_dust_from_impure_water`,
				dust,
				impureDust
			);
		}

		if (gregnauticsGtceuItemExists(pureDust) && gregnauticsGtceuItemExists(dust)) {
			gregnauticsAddCreateSplashing(
				event,
				`gregnautics:create/splashing/gtceu/${materialName}_dust_from_pure_water`,
				dust,
				pureDust
			);
		}
	});

	console.info(`[Gregnautics] GTCEu bulk washing: ${washedOreRecipes} crushed ore recipes, ${byproductRecipes} with byproducts.`);
	console.info(`[Gregnautics] GTCEu ore crushing: ${crushingRecipes} recipes without byproducts.`);
	if (missingByproducts.length > 0) {
		console.info(`[Gregnautics] GTCEu bulk washing: no byproduct dust resolved for ${missingByproducts.join(", ")}.`);
	}
});
