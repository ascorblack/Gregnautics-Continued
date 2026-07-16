// priority: -100
"use strict";

const GREGNAUTICS_GTCEU_IRON_PROCESSING_TYPES = [
	"gtceu:forge_hammer",
	"gtceu:macerator",
	"gtceu:ore_washer",
	"gtceu:centrifuge",
	"gtceu:thermal_centrifuge",
	"gtceu:electromagnetic_separator"
];

const GREGNAUTICS_GTCEU_IRON_PROCESSING_INPUTS = [
	"gtceu:crushed_iron_ore",
	"gtceu:purified_iron_ore",
	"gtceu:refined_iron_ore",
	"gtceu:impure_iron_dust",
	"gtceu:pure_iron_dust"
];

const GREGNAUTICS_GTCEU_IRON_ORE_PREFIXES = [
	"",
	"gabbro_",
	"shale_",
	"claystone_",
	"limestone_",
	"conglomerate_",
	"dolomite_",
	"chert_",
	"chalk_",
	"rhyolite_",
	"dacite_",
	"quartzite_",
	"slate_",
	"phyllite_",
	"schist_",
	"gneiss_",
	"marble_",
	"basalt_",
	"diorite_",
	"andesite_",
	"granite_",
	"tuff_",
	"brown_sand_",
	"white_sand_",
	"black_sand_",
	"red_sand_",
	"yellow_sand_",
	"green_sand_",
	"pink_sand_"
];

const GREGNAUTICS_GTCEU_GENERATED_IRON_PROCESSING_RECIPE_IDS = [
	"gtceu:macerator/macerate_iron_crushed_ore_to_impure_dust",
	"gtceu:macerator/macerate_iron_crushed_ore_to_dust",
	"gtceu:macerator/macerate_iron_refined_ore_to_dust",
	"gtceu:forge_hammer/hammer_iron_crushed_ore_to_impure_dust",
	"gtceu:forge_hammer/hammer_iron_crushed_ore_to_dust",
	"gtceu:forge_hammer/hammer_iron_refined_ore_to_dust",
	"gtceu:ore_washer/wash_iron_dirty_dust_to_dust",
	"gtceu:ore_washer/wash_iron_pure_dust_to_dust",
	"gtceu:centrifuge/centrifuge_iron_dirty_dust_to_dust",
	"gtceu:centrifuge/centrifuge_iron_pure_dust_to_dust",
	"gtceu:electromagnetic_separator/separate_iron_pure_dust_to_dust",
	"gtceu:thermal_centrifuge/centrifuge_iron_crushed_ore_to_refined_ore",
	"gtceu:thermal_centrifuge/centrifuge_iron_purified_ore_to_refined_ore"
];

const GREGNAUTICS_GTCEU_IRON_BYPRODUCT_REPLACEMENTS = {
	almandine: "hematite",
	andradite: "hematite",
	chromite: "magnetite",
	garnierite: "goethite",
	glauconite_sand: "goethite",
	goethite: "hematite",
	hematite: "magnetite",
	ilmenite: "magnetite",
	magnetite: "hematite",
	nickel: "goethite",
	pentlandite: "pyrite",
	powellite: "scheelite",
	pyrite: "goethite",
	sodalite: "lazurite",
	tin: "cassiterite",
	vanadium_magnetite: "magnetite",
	wulfenite: "molybdenite",
	yellow_limonite: "goethite"
};

const GREGNAUTICS_GTCEU_IRON_BYPRODUCT_MATERIAL_FIELDS = {
	almandine: "Almandine",
	andradite: "Andradite",
	cassiterite: "Cassiterite",
	chromite: "Chromite",
	garnierite: "Garnierite",
	glauconite_sand: "GlauconiteSand",
	goethite: "Goethite",
	hematite: "Hematite",
	ilmenite: "Ilmenite",
	magnetite: "Magnetite",
	molybdenite: "Molybdenite",
	nickel: "Nickel",
	pentlandite: "Pentlandite",
	powellite: "Powellite",
	pyrite: "Pyrite",
	scheelite: "Scheelite",
	sodalite: "Sodalite",
	tin: "Tin",
	vanadium_magnetite: "VanadiumMagnetite",
	wulfenite: "Wulfenite",
	yellow_limonite: "YellowLimonite"
};

function gregnauticsGtceuIronOreFormInputs() {
	return GREGNAUTICS_GTCEU_IRON_ORE_PREFIXES
		.map(prefix => `gtceu:${prefix}iron_ore`)
		.filter(item => Item.exists(item));
}

function gregnauticsRemoveGeneratedIronProcessing(event) {
	GREGNAUTICS_GTCEU_GENERATED_IRON_PROCESSING_RECIPE_IDS.forEach(id => event.remove({ id: id }));

	GREGNAUTICS_GTCEU_IRON_PROCESSING_TYPES.forEach(type => {
		GREGNAUTICS_GTCEU_IRON_PROCESSING_INPUTS.forEach(input => {
			event.remove({ type: type, input: input });
		});
	});

	gregnauticsGtceuIronOreFormInputs()
		.concat(GREGNAUTICS_GTCEU_IRON_PROCESSING_INPUTS)
		.forEach(input => {
			event.remove({ type: "minecraft:smelting", input: input });
			event.remove({ type: "minecraft:blasting", input: input });
		});
}

function gregnauticsGtceuDustForm(material, form) {
	const dust = form === "dust" ? `gtceu:${material}_dust` : `gtceu:${form}_${material}_dust`;
	return Item.exists(dust) ? dust : null;
}

function gregnauticsIronCleanupStack(item, count) {
	return count > 1 ? `${count}x ${item}` : item;
}

function gregnauticsIronCleanupStackExists(stack) {
	if (stack === null || stack === undefined) {
		return false;
	}

	const item = String(stack).replace(/^\d+x\s+/, "");
	return Item.exists(item);
}

function gregnauticsIronCleanupPascalCase(name) {
	return name
		.split("_")
		.map(part => part.length === 0 ? part : part.substring(0, 1).toUpperCase() + part.substring(1))
		.join("");
}

function gregnauticsIronCleanupMaterial(materialName) {
	if (typeof GTMaterials === "undefined") {
		return null;
	}

	const fieldName = GREGNAUTICS_GTCEU_IRON_BYPRODUCT_MATERIAL_FIELDS[materialName] || gregnauticsIronCleanupPascalCase(materialName);
	try {
		let fieldMaterial = GTMaterials[fieldName];
		if (fieldMaterial !== null && fieldMaterial !== undefined) {
			return fieldMaterial;
		}
	} catch (ignored) {
	}

	try {
		let material = GTMaterials.get(materialName);
		return material === undefined ? null : material;
	} catch (ignored) {
		return null;
	}
}

function gregnauticsIronCleanupOreProperty(materialName) {
	if (typeof PropertyKey === "undefined") {
		return null;
	}

	const material = gregnauticsIronCleanupMaterial(materialName);
	if (material === null || material === undefined || !material.hasProperty(PropertyKey.ORE)) {
		return null;
	}

	return material.getProperty(PropertyKey.ORE);
}

function gregnauticsIronCleanupByproductMaterialName(materialName, index) {
	try {
		let material = gregnauticsIronCleanupMaterial(materialName);
		const oreProperty = gregnauticsIronCleanupOreProperty(materialName);
		if (material === null || material === undefined || oreProperty === null || oreProperty === undefined) {
			return null;
		}

		const byproduct = oreProperty.getOreByProduct(index, material);
		return byproduct === null || byproduct === undefined ? null : byproduct.getName();
	} catch (ignored) {
		return null;
	}
}

function gregnauticsIronCleanupByproductMultiplier(materialName) {
	try {
		let oreProperty = gregnauticsIronCleanupOreProperty(materialName);
		return oreProperty === null || oreProperty === undefined ? 1 : oreProperty.getByProductMultiplier();
	} catch (ignored) {
		return 1;
	}
}

function gregnauticsIronCleanupReplacementMaterialName(materialName, index) {
	const byproduct = gregnauticsIronCleanupByproductMaterialName(materialName, index);
	if (byproduct !== "iron") {
		return byproduct;
	}

	return GREGNAUTICS_GTCEU_IRON_BYPRODUCT_REPLACEMENTS[materialName] || byproduct;
}

function gregnauticsIronCleanupReplacementDust(materialName, index) {
	const replacement = gregnauticsIronCleanupReplacementMaterialName(materialName, index);
	if (replacement === null || replacement === undefined) {
		return null;
	}

	return gregnauticsGtceuDustForm(replacement, "dust");
}

function gregnauticsIronCleanupSeparatedMaterialNames(materialName) {
	try {
		let oreProperty = gregnauticsIronCleanupOreProperty(materialName);
		if (oreProperty === null || oreProperty === undefined || oreProperty.getSeparatedInto() === null) {
			return [];
		}

		const separated = oreProperty.getSeparatedInto();
		const names = [];
		for (let i = 0; i < separated.size(); i++) {
			const material = separated.get(i);
			if (material !== null && material !== undefined) {
				names.push(material.getName());
			}
		}
		return names;
	} catch (ignored) {
		return [];
	}
}

function gregnauticsIronCleanupNormalizeSeparatedMaterialName(materialName, separatedName) {
	const replacement = GREGNAUTICS_GTCEU_IRON_BYPRODUCT_REPLACEMENTS[materialName];
	if (separatedName === "iron") {
		return replacement || separatedName;
	}
	return separatedName;
}

function gregnauticsIronCleanupSeparatedNeedsReplacement(materialName) {
	const replacement = GREGNAUTICS_GTCEU_IRON_BYPRODUCT_REPLACEMENTS[materialName];
	return gregnauticsIronCleanupSeparatedMaterialNames(materialName)
		.some(separatedName => separatedName === "iron" || separatedName === replacement);
}

function gregnauticsIronCleanupByproductNeedsReplacement(materialName, index) {
	const byproduct = gregnauticsIronCleanupByproductMaterialName(materialName, index);
	const replacement = GREGNAUTICS_GTCEU_IRON_BYPRODUCT_REPLACEMENTS[materialName];
	return (byproduct === "iron" || byproduct === replacement)
		&& gregnauticsIronCleanupReplacementDust(materialName, index) !== null;
}

function gregnauticsIronCleanupRemoveByproductRecipeIds(event, materialName) {
	if (gregnauticsIronCleanupByproductNeedsReplacement(materialName, 0)) {
		event.remove({ id: `gtceu:macerator/macerate_${materialName}_crushed_ore_to_impure_dust` });
		event.remove({ id: `gtceu:ore_washer/wash_${materialName}_crushed_ore_to_purified_ore` });
		event.remove({ id: `gtceu:ore_washer/wash_${materialName}_crushed_ore_to_purified_ore_distilled` });
		event.remove({ id: `gtceu:centrifuge/centrifuge_${materialName}_dirty_dust_to_dust` });
	}

	if (gregnauticsIronCleanupByproductNeedsReplacement(materialName, 1)) {
		event.remove({ id: `gtceu:thermal_centrifuge/centrifuge_${materialName}_crushed_ore_to_refined_ore` });
		event.remove({ id: `gtceu:macerator/macerate_${materialName}_crushed_ore_to_dust` });
		event.remove({ id: `gtceu:thermal_centrifuge/centrifuge_${materialName}_purified_ore_to_refined_ore` });
		event.remove({ id: `gtceu:centrifuge/centrifuge_${materialName}_pure_dust_to_dust` });
	}

	if (gregnauticsIronCleanupByproductNeedsReplacement(materialName, 2)) {
		event.remove({ id: `gtceu:macerator/macerate_${materialName}_refined_ore_to_dust` });
	}

	if (gregnauticsIronCleanupSeparatedNeedsReplacement(materialName)) {
		event.remove({ id: `gtceu:electromagnetic_separator/separate_${materialName}_pure_dust_to_dust` });
	}
}

function gregnauticsIronCleanupAddByproductRecipe(event, recipeType, id, input, primaryOutput, byproduct, chance, duration, eut, extraOutput) {
	if (!Item.exists(input) || !Item.exists(primaryOutput) || !gregnauticsIronCleanupStackExists(byproduct)) {
		return;
	}

	const recipe = event.recipes.gtceu[recipeType](id)
		.itemInputs(input)
		.itemOutputs(primaryOutput)
		.chancedOutput(byproduct, chance)
		.duration(duration)
		.EUt(eut);

	if (extraOutput !== undefined && extraOutput !== null && Item.exists(extraOutput)) {
		recipe.itemOutputs(extraOutput);
	}
}

function gregnauticsIronCleanupAddWasherRecipe(event, id, input, primaryOutput, byproduct, fluid, duration) {
	if (!Item.exists(input) || !Item.exists(primaryOutput) || !gregnauticsIronCleanupStackExists(byproduct)) {
		return;
	}

    event.recipes.gtceu.ore_washer(id)
        .itemInputs(input)
        .inputFluids(fluid)
        .itemOutputs(primaryOutput)
        .chancedOutput(byproduct, 3333)
        .itemOutputs("gtceu:stone_dust")
		.duration(duration)
		.EUt(4);
}

function gregnauticsIronCleanupAddByproductReplacements(event, materialName) {
	const multiplier = gregnauticsIronCleanupByproductMultiplier(materialName);
	const byproduct0 = gregnauticsIronCleanupReplacementDust(materialName, 0);
	const byproduct1 = gregnauticsIronCleanupReplacementDust(materialName, 1);
	const byproduct2 = gregnauticsIronCleanupReplacementDust(materialName, 2);
	const byproduct0Stack = gregnauticsIronCleanupStack(byproduct0, multiplier);
	const byproduct1Stack = gregnauticsIronCleanupStack(byproduct1, multiplier);
	const crushedOre = `gtceu:crushed_${materialName}_ore`;
	const purifiedOre = `gtceu:purified_${materialName}_ore`;
	const refinedOre = `gtceu:refined_${materialName}_ore`;
	const impureDust = `gtceu:impure_${materialName}_dust`;
	const pureDust = `gtceu:pure_${materialName}_dust`;
	const dust = `gtceu:${materialName}_dust`;

	if (gregnauticsIronCleanupByproductNeedsReplacement(materialName, 0)) {
		gregnauticsIronCleanupAddByproductRecipe(
			event,
			"macerator",
			`gregnautics:gtceu/macerator/${materialName}_crushed_ore_to_impure_dust`,
			crushedOre,
			impureDust,
			byproduct0Stack,
			1400,
			400,
			2
		);

		gregnauticsIronCleanupAddWasherRecipe(
			event,
			`gregnautics:gtceu/ore_washer/${materialName}_crushed_ore_to_purified_ore`,
			crushedOre,
			purifiedOre,
			byproduct0Stack,
			Fluid.of("minecraft:water", 1000),
			200
		);

		gregnauticsIronCleanupAddWasherRecipe(
			event,
			`gregnautics:gtceu/ore_washer/${materialName}_crushed_ore_to_purified_ore_distilled`,
			crushedOre,
			purifiedOre,
			byproduct0Stack,
			Fluid.of("gtceu:distilled_water", 100),
			200
		);

		gregnauticsIronCleanupAddByproductRecipe(
			event,
			"centrifuge",
			`gregnautics:gtceu/centrifuge/${materialName}_impure_dust_to_dust`,
			impureDust,
			dust,
			byproduct0,
			1111,
			224,
			24
		);
	}

	if (gregnauticsIronCleanupByproductNeedsReplacement(materialName, 1)) {
		gregnauticsIronCleanupAddByproductRecipe(
			event,
			"thermal_centrifuge",
			`gregnautics:gtceu/thermal_centrifuge/${materialName}_crushed_ore_to_refined_ore`,
			crushedOre,
			refinedOre,
			byproduct1Stack,
			3333,
			500,
			48,
			"gtceu:stone_dust"
		);

		gregnauticsIronCleanupAddByproductRecipe(
			event,
			"macerator",
			`gregnautics:gtceu/macerator/${materialName}_purified_ore_to_pure_dust`,
			purifiedOre,
			pureDust,
			byproduct1Stack,
			1400,
			400,
			2
		);

		gregnauticsIronCleanupAddByproductRecipe(
			event,
			"thermal_centrifuge",
			`gregnautics:gtceu/thermal_centrifuge/${materialName}_purified_ore_to_refined_ore`,
			purifiedOre,
			refinedOre,
			byproduct1,
			3333,
			400,
			48
		);

		gregnauticsIronCleanupAddByproductRecipe(
			event,
			"centrifuge",
			`gregnautics:gtceu/centrifuge/${materialName}_pure_dust_to_dust`,
			pureDust,
			dust,
			byproduct1,
			1111,
			100,
			5
		);
	}

	if (gregnauticsIronCleanupByproductNeedsReplacement(materialName, 2)) {
		gregnauticsIronCleanupAddByproductRecipe(
			event,
			"macerator",
			`gregnautics:gtceu/macerator/${materialName}_refined_ore_to_dust`,
			refinedOre,
			dust,
			byproduct2,
			1400,
			400,
			2
		);
	}
}

function gregnauticsIronCleanupAddElectromagneticSeparatorReplacement(event, materialName) {
	//if (!gregnauticsIronCleanupSeparatedNeedsReplacement(materialName)) {
	//	return;
	//}

	//const pureDust = `gtceu:pure_${materialName}_dust`;
	//const dust = `gtceu:${materialName}_dust`;
	//if (!Item.exists(pureDust) || !Item.exists(dust)) {
	//	return;
	//}

	//const separatedNames = gregnauticsIronCleanupSeparatedMaterialNames(materialName)
	//	.map(separatedName => gregnauticsIronCleanupNormalizeSeparatedMaterialName(materialName, separatedName));
	//const firstSeparatedDust = separatedNames.length > 0 ? gregnauticsGtceuDustForm(separatedNames[0], "dust") : null;
	//const lastSeparatedDust = separatedNames.length > 1 ? gregnauticsGtceuDustForm(separatedNames[separatedNames.length - 1], "dust") : null;

	//const recipe = event.recipes.gtceu.electromagnetic_separator(`gregnautics:gtceu/electromagnetic_separator/${materialName}_pure_dust_to_dust`)
	//	.itemInputs(pureDust)
	//	.itemOutputs(dust)
	//	.duration(200)
	//	.EUt(24);

	//if (firstSeparatedDust !== null) {
	//	recipe.chancedOutput(firstSeparatedDust, 1000, 0);
	//}
	//if (lastSeparatedDust !== null && lastSeparatedDust !== firstSeparatedDust) {
	//	recipe.chancedOutput(lastSeparatedDust, 500, 0);
	//}
}

function gregnauticsRemoveAndAddGeneratedIronByproductReplacements(event) {
	Object.keys(GREGNAUTICS_GTCEU_IRON_BYPRODUCT_REPLACEMENTS).forEach(materialName => {
		gregnauticsIronCleanupRemoveByproductRecipeIds(event, materialName);
		gregnauticsIronCleanupAddByproductReplacements(event, materialName);
		gregnauticsIronCleanupAddElectromagneticSeparatorReplacement(event, materialName);
	});
}

const GREGNAUTICS_GTCEU_STATIC_ORE_BYPRODUCT_REPLACEMENTS = {
	chromite: { first: "magnetite", second: "magnesium", third: "chromium", separator: "magnetite" },
	garnierite: { first: "goethite", second: "nickel", separator: "goethite" },
	glauconite_sand: { first: "goethite", second: "aluminium", third: "goethite", separator: "goethite" },
	ilmenite: { first: "magnetite", second: "rutile", third: "rutile", separator: "magnetite" },
	magnetite: { first: "hematite", second: "gold", separator: "hematite" },
	nickel: { first: "goethite", second: "goethite", separator: "goethite" },
	pentlandite: { first: "pyrite", second: "sulfur", third: "cobalt", separator: "pyrite" },
	powellite: { first: "scheelite", second: "potassium", third: "molybdenite", separator: "scheelite" },
	pyrite: { first: "goethite", third: "goethite", separator: "goethite" },
	tin: { first: "cassiterite", second: "cassiterite", separator: "cassiterite" },
	wulfenite: { first: "molybdenite", second: "manganese", third: "manganese", separator: "molybdenite" }
};

function gregnauticsStaticDust(materialName) {
	const dust = `gtceu:${materialName}_dust`;
	return Item.exists(dust) ? dust : null;
}

function gregnauticsStaticItem(item) {
	return Item.exists(item) ? item : null;
}

function gregnauticsStaticRemoveGtceuOreProcessingRecipeIds(event, materialName) {
	[
		`gtceu:macerator/macerate_${materialName}_crushed_ore_to_impure_dust`,
		`gtceu:ore_washer/wash_${materialName}_crushed_ore_to_purified_ore`,
		`gtceu:ore_washer/wash_${materialName}_crushed_ore_to_purified_ore_distilled`,
		`gtceu:thermal_centrifuge/centrifuge_${materialName}_crushed_ore_to_refined_ore`,
		`gtceu:macerator/macerate_${materialName}_purified_ore_to_pure_dust`,
		`gtceu:thermal_centrifuge/centrifuge_${materialName}_purified_ore_to_refined_ore`,
		`gtceu:macerator/macerate_${materialName}_refined_ore_to_dust`,
		`gtceu:centrifuge/centrifuge_${materialName}_dirty_dust_to_dust`,
		`gtceu:centrifuge/centrifuge_${materialName}_pure_dust_to_dust`,
		`gtceu:electromagnetic_separator/separate_${materialName}_pure_dust_to_dust`
	].forEach(id => event.remove({ id: id }));
}

function gregnauticsStaticAddChancedRecipe(event, recipeType, id, input, primaryOutput, byproduct, chance, duration, eut, extraOutput) {
	if (input === null || primaryOutput === null || byproduct === null) {
		return 0;
	}

	const recipe = event.recipes.gtceu[recipeType](id)
		.itemInputs(input)
		.itemOutputs(primaryOutput)
		.chancedOutput(byproduct, chance)
		.duration(duration)
		.EUt(eut);

	if (extraOutput !== undefined && extraOutput !== null) {
		recipe.itemOutputs(extraOutput);
	}

	return 1;
}

function gregnauticsStaticAddWasherRecipe(event, id, input, primaryOutput, byproduct, fluid, duration) {
	if (input === null || primaryOutput === null || byproduct === null) {
		return 0;
	}

	event.recipes.gtceu.ore_washer(id)
		.itemInputs(input)
		.inputFluids(fluid)
		.itemOutputs(primaryOutput)
		.chancedOutput(byproduct, 3333)
		.itemOutputs("gtceu:stone_dust")
		.duration(duration)
		.EUt(4);
	return 1;
}

function gregnauticsStaticAddGtceuOreProcessingReplacement(event, materialName, replacements) {
	const crushedOre = gregnauticsStaticItem(`gtceu:crushed_${materialName}_ore`);
	const purifiedOre = gregnauticsStaticItem(`gtceu:purified_${materialName}_ore`);
	const refinedOre = gregnauticsStaticItem(`gtceu:refined_${materialName}_ore`);
	const impureDust = gregnauticsStaticItem(`gtceu:impure_${materialName}_dust`);
	const pureDust = gregnauticsStaticItem(`gtceu:pure_${materialName}_dust`);
	const dust = gregnauticsStaticDust(materialName);
	const firstByproduct = gregnauticsStaticDust(replacements.first);
	const secondByproduct = gregnauticsStaticDust(replacements.second || replacements.first);
	const thirdByproduct = gregnauticsStaticDust(replacements.third || replacements.second || replacements.first);
	const separatorByproduct = gregnauticsStaticDust(replacements.separator || replacements.first);
	let added = 0;

	added += gregnauticsStaticAddChancedRecipe(
		event,
		"macerator",
		`gregnautics:gtceu/macerator/${materialName}_crushed_ore_to_impure_dust`,
		crushedOre,
		impureDust,
		firstByproduct,
		1400,
		400,
		2
	);
	added += gregnauticsStaticAddWasherRecipe(
		event,
		`gregnautics:gtceu/ore_washer/${materialName}_crushed_ore_to_purified_ore`,
		crushedOre,
		purifiedOre,
		firstByproduct,
		Fluid.of("minecraft:water", 1000),
		200
	);
	added += gregnauticsStaticAddWasherRecipe(
		event,
		`gregnautics:gtceu/ore_washer/${materialName}_crushed_ore_to_purified_ore_distilled`,
		crushedOre,
		purifiedOre,
		firstByproduct,
		Fluid.of("gtceu:distilled_water", 100),
		200
	);
	added += gregnauticsStaticAddChancedRecipe(
		event,
		"thermal_centrifuge",
		`gregnautics:gtceu/thermal_centrifuge/${materialName}_crushed_ore_to_refined_ore`,
		crushedOre,
		refinedOre,
		secondByproduct,
		3333,
		500,
		48,
		"gtceu:stone_dust"
	);
	added += gregnauticsStaticAddChancedRecipe(
		event,
		"macerator",
		`gregnautics:gtceu/macerator/${materialName}_purified_ore_to_pure_dust`,
		purifiedOre,
		pureDust,
		secondByproduct,
		1400,
		400,
		2
	);
	added += gregnauticsStaticAddChancedRecipe(
		event,
		"thermal_centrifuge",
		`gregnautics:gtceu/thermal_centrifuge/${materialName}_purified_ore_to_refined_ore`,
		purifiedOre,
		refinedOre,
		secondByproduct,
		3333,
		400,
		48
	);
	added += gregnauticsStaticAddChancedRecipe(
		event,
		"macerator",
		`gregnautics:gtceu/macerator/${materialName}_refined_ore_to_dust`,
		refinedOre,
		dust,
		thirdByproduct,
		1400,
		400,
		2
	);
	added += gregnauticsStaticAddChancedRecipe(
		event,
		"centrifuge",
		`gregnautics:gtceu/centrifuge/${materialName}_impure_dust_to_dust`,
		impureDust,
		dust,
		firstByproduct,
		1111,
		224,
		24
	);
	added += gregnauticsStaticAddChancedRecipe(
		event,
		"centrifuge",
		`gregnautics:gtceu/centrifuge/${materialName}_pure_dust_to_dust`,
		pureDust,
		dust,
		secondByproduct,
		1111,
		100,
		5
	);
	added += gregnauticsStaticAddChancedRecipe(
		event,
		"electromagnetic_separator",
		`gregnautics:gtceu/electromagnetic_separator/${materialName}_pure_dust_to_dust`,
		pureDust,
		dust,
		separatorByproduct,
		1000,
		200,
		24
	);

	return added;
}

function gregnauticsApplyStaticGtceuOreProcessingByproductReplacements(event) {
	let added = 0;
	Object.entries(GREGNAUTICS_GTCEU_STATIC_ORE_BYPRODUCT_REPLACEMENTS).forEach(([materialName, replacements]) => {
		gregnauticsStaticRemoveGtceuOreProcessingRecipeIds(event, materialName);
		added += gregnauticsStaticAddGtceuOreProcessingReplacement(event, materialName, replacements);
	});
	console.info(`[Gregnautics] GTCEu ore processing byproduct overrides: ${added} replacement recipes.`);
}

function gregnauticsAddIronOreProcessingReplacement(event) {
	const hematiteDust = "gtceu:hematite_dust";
	const magnetiteDust = "gtceu:magnetite_dust";
	const impureHematiteDust = "gtceu:impure_hematite_dust";
	const pureHematiteDust = "gtceu:pure_hematite_dust";
	const refinedHematiteOre = "gtceu:refined_hematite_ore";
	if (![hematiteDust, magnetiteDust, impureHematiteDust, pureHematiteDust, refinedHematiteOre].every(item => Item.exists(item))) {
		return;
	}

	if (Item.exists("gtceu:crushed_iron_ore")) {
		event.recipes.gtceu.forge_hammer("gregnautics:gtceu/forge_hammer/crushed_iron_ore_to_impure_hematite_dust")
			.itemInputs("gtceu:crushed_iron_ore")
			.itemOutputs(impureHematiteDust)
			.duration(10)
			.EUt(16);

		event.recipes.gtceu.macerator("gregnautics:gtceu/macerator/crushed_iron_ore_to_impure_hematite_dust")
			.itemInputs("gtceu:crushed_iron_ore")
			.itemOutputs(impureHematiteDust)
			.duration(400)
			.EUt(2);

		event.recipes.gtceu.thermal_centrifuge("gregnautics:gtceu/thermal_centrifuge/crushed_iron_ore_to_refined_hematite_ore")
			.itemInputs("gtceu:crushed_iron_ore")
			.itemOutputs(refinedHematiteOre)
			.duration(500)
			.EUt(48);
	}

	if (Item.exists("gtceu:purified_iron_ore")) {
		event.recipes.gtceu.forge_hammer("gregnautics:gtceu/forge_hammer/purified_iron_ore_to_pure_hematite_dust")
			.itemInputs("gtceu:purified_iron_ore")
			.itemOutputs(pureHematiteDust)
			.duration(10)
			.EUt(16);

		event.recipes.gtceu.macerator("gregnautics:gtceu/macerator/purified_iron_ore_to_pure_hematite_dust")
			.itemInputs("gtceu:purified_iron_ore")
			.itemOutputs(pureHematiteDust)
			.duration(400)
			.EUt(2);

		event.recipes.gtceu.thermal_centrifuge("gregnautics:gtceu/thermal_centrifuge/purified_iron_ore_to_refined_hematite_ore")
			.itemInputs("gtceu:purified_iron_ore")
			.itemOutputs(refinedHematiteOre)
			.duration(400)
			.EUt(48);
	}

	if (Item.exists("gtceu:refined_iron_ore")) {
		event.recipes.gtceu.forge_hammer("gregnautics:gtceu/forge_hammer/refined_iron_ore_to_hematite_dust")
			.itemInputs("gtceu:refined_iron_ore")
			.itemOutputs(hematiteDust)
			.duration(10)
			.EUt(16);

		event.recipes.gtceu.macerator("gregnautics:gtceu/macerator/refined_iron_ore_to_hematite_dust")
			.itemInputs("gtceu:refined_iron_ore")
			.itemOutputs(hematiteDust)
			.duration(400)
			.EUt(2);
	}

	if (Item.exists("gtceu:impure_iron_dust")) {
		event.recipes.gtceu.centrifuge("gregnautics:gtceu/centrifuge/impure_iron_dust_to_hematite_dust")
			.itemInputs("gtceu:impure_iron_dust")
			.itemOutputs(hematiteDust)
			.duration(224)
			.EUt(24);

		event.recipes.gtceu.ore_washer("gregnautics:gtceu/ore_washer/impure_iron_dust_to_hematite_dust")
			.itemInputs("gtceu:impure_iron_dust")
			.inputFluids(Fluid.of("minecraft:water", 100))
			.itemOutputs(hematiteDust)
			.duration(8)
			.EUt(4);
	}

	if (Item.exists("gtceu:pure_iron_dust")) {
		event.recipes.gtceu.centrifuge("gregnautics:gtceu/centrifuge/pure_iron_dust_to_hematite_dust")
			.itemInputs("gtceu:pure_iron_dust")
			.itemOutputs(hematiteDust)
			.duration(100)
			.EUt(5);

		event.recipes.gtceu.ore_washer("gregnautics:gtceu/ore_washer/pure_iron_dust_to_hematite_dust")
			.itemInputs("gtceu:pure_iron_dust")
			.inputFluids(Fluid.of("minecraft:water", 100))
			.itemOutputs(hematiteDust)
			.duration(8)
			.EUt(4);

		event.recipes.gtceu.electromagnetic_separator("gregnautics:gtceu/electromagnetic_separator/pure_iron_dust_to_magnetite_dust")
			.itemInputs("gtceu:pure_iron_dust")
			.itemOutputs(magnetiteDust)
			.duration(200)
			.EUt(24);
	}
}

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: gtceu_iron_processing_cleanup recipes event start");
	gregnauticsRemoveGeneratedIronProcessing(event);
	gregnauticsAddIronOreProcessingReplacement(event);
});
