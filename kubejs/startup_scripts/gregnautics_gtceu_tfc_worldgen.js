// priority: 0
"use strict";

const GREGNAUTICS_TFC_STONE_TYPES = [
	"gabbro",
	"shale",
	"claystone",
	"limestone",
	"conglomerate",
	"dolomite",
	"chert",
	"chalk",
	"rhyolite",
	"dacite",
	"quartzite",
	"slate",
	"phyllite",
	"schist",
	"gneiss",
	"marble",
	"basalt",
	"diorite",
	"andesite",
	"granite"
];

const GREGNAUTICS_SAND_COLORS = ["brown", "white", "black", "red", "yellow", "green", "pink"];
const GREGNAUTICS_TFC_ORE_GRADES = ["small", "poor", "normal", "rich"];

const GREGNAUTICS_GT_FORMULA_OVERRIDES = [
	{ material: () => GTMaterials.Malachite, formula: "Cu2CO3(OH)2" },
	{ material: () => GTMaterials.Tetrahedrite, formula: "(Cu,Fe)12Sb4S13" },
	{ material: () => GTMaterials.Cassiterite, formula: "SnO3" },
	{ material: () => GTMaterials.Garnierite, formula: "(Ni,Mg)3Si2O5(OH)4" },
	{ material: () => GTMaterials.YellowLimonite, formula: "FeO(OH)" }
];

const GREGNAUTICS_GT_ORE_IRON_BYPRODUCT_REPLACEMENTS = [
	{ material: () => GTMaterials.Chromite, byproducts: [() => GTMaterials.Magnetite, () => GTMaterials.Magnesium, () => GTMaterials.Chromium], separatedInto: [() => GTMaterials.Magnetite, () => GTMaterials.Chromium] },
	{ material: () => GTMaterials.Garnierite, byproducts: [() => GTMaterials.Goethite, () => GTMaterials.Nickel], separatedInto: [() => GTMaterials.Goethite, () => GTMaterials.Nickel] },
	{ material: () => GTMaterials.GlauconiteSand, byproducts: [() => GTMaterials.Goethite, () => GTMaterials.Aluminium, () => GTMaterials.Goethite], separatedInto: [() => GTMaterials.Goethite, () => GTMaterials.Aluminium] },
	{ material: () => GTMaterials.Ilmenite, byproducts: [() => GTMaterials.Magnetite, () => GTMaterials.Rutile, () => GTMaterials.Rutile], separatedInto: [() => GTMaterials.Magnetite, () => GTMaterials.Rutile] },
	{ material: () => GTMaterials.Magnetite, byproducts: [() => GTMaterials.Hematite, () => GTMaterials.Gold], separatedInto: [() => GTMaterials.Hematite, () => GTMaterials.Gold] },
	{ material: () => GTMaterials.Nickel, byproducts: [() => GTMaterials.Goethite, () => GTMaterials.Goethite], separatedInto: [() => GTMaterials.Goethite, () => GTMaterials.Nickel] },
	{ material: () => GTMaterials.Pentlandite, byproducts: [() => GTMaterials.Pyrite, () => GTMaterials.Sulfur, () => GTMaterials.Cobalt], separatedInto: [() => GTMaterials.Pyrite, () => GTMaterials.Cobalt] },
	{ material: () => GTMaterials.Powellite, byproducts: [() => GTMaterials.Scheelite, () => GTMaterials.Potassium, () => GTMaterials.Molybdenite], separatedInto: [() => GTMaterials.Scheelite, () => GTMaterials.Molybdenite] },
	{ material: () => GTMaterials.Pyrite, byproducts: [() => GTMaterials.Goethite], separatedInto: [() => GTMaterials.Goethite, () => GTMaterials.Sulfur] },
	{ material: () => GTMaterials.Tin, byproducts: [() => GTMaterials.Cassiterite, () => GTMaterials.Cassiterite], separatedInto: [() => GTMaterials.Cassiterite, () => GTMaterials.Cassiterite] },
	{ material: () => GTMaterials.Wulfenite, byproducts: [() => GTMaterials.Molybdenite, () => GTMaterials.Manganese, () => GTMaterials.Manganese], separatedInto: [() => GTMaterials.Molybdenite, () => GTMaterials.Manganese] }
];

const GREGNAUTICS_GT_ORE_IRON_SEPARATION_REPLACEMENTS = [
	{ material: () => GTMaterials.Almandine, separatedInto: [() => GTMaterials.Hematite, () => GTMaterials.Aluminium] },
	{ material: () => GTMaterials.Andradite, separatedInto: [() => GTMaterials.Hematite, () => GTMaterials.Calcium] },
	{ material: () => GTMaterials.Chromite, separatedInto: [() => GTMaterials.Magnetite, () => GTMaterials.Chromium] },
	{ material: () => GTMaterials.GarnetRed, separatedInto: [() => GTMaterials.Almandine, () => GTMaterials.Pyrope] },
	{ material: () => GTMaterials.GarnetSand, separatedInto: [() => GTMaterials.Almandine, () => GTMaterials.Grossular] },
	{ material: () => GTMaterials.Goethite, separatedInto: [() => GTMaterials.Hematite, () => GTMaterials.YellowLimonite] },
	{ material: () => GTMaterials.Hematite, separatedInto: [() => GTMaterials.Magnetite, () => GTMaterials.Goethite] },
	{ material: () => GTMaterials.Ilmenite, separatedInto: [() => GTMaterials.Magnetite, () => GTMaterials.Rutile] },
	{ material: () => GTMaterials.Nickel, separatedInto: [() => GTMaterials.Goethite, () => GTMaterials.Nickel] },
	{ material: () => GTMaterials.Pentlandite, separatedInto: [() => GTMaterials.Pyrite, () => GTMaterials.Cobalt] },
	{ material: () => GTMaterials.Pyrite, separatedInto: [() => GTMaterials.Goethite, () => GTMaterials.Sulfur] },
	{ material: () => GTMaterials.Sodalite, separatedInto: [() => GTMaterials.Lazurite, () => GTMaterials.Aluminium] },
	{ material: () => GTMaterials.Tin, separatedInto: [() => GTMaterials.Cassiterite, () => GTMaterials.Cassiterite] },
	{ material: () => GTMaterials.VanadiumMagnetite, separatedInto: [() => GTMaterials.Magnetite, () => GTMaterials.Vanadium] },
	{ material: () => GTMaterials.YellowLimonite, separatedInto: [() => GTMaterials.Goethite, () => GTMaterials.Hematite] }
];

const GREGNAUTICS_TFC_ORE_MATERIAL_ENTRIES = [
	{ ore: "native_copper", material: () => GTMaterials.Copper },
	{ ore: "malachite", material: () => GTMaterials.Malachite },
	{ ore: "tetrahedrite", material: () => GTMaterials.Tetrahedrite },
	{ ore: "cassiterite", material: () => GTMaterials.Cassiterite },
	{ ore: "bismuthinite", material: () => GTMaterials.get("gtceu:bismuthinite") },
	{ ore: "native_gold", material: () => GTMaterials.Gold },
	{ ore: "native_silver", material: () => GTMaterials.Silver },
	{ ore: "garnierite", material: () => GTMaterials.Garnierite },
	{ ore: "sphalerite", material: () => GTMaterials.Sphalerite },
	{ ore: "hematite", material: () => GTMaterials.Hematite },
	{ ore: "limonite", material: () => GTMaterials.YellowLimonite },
	{ ore: "magnetite", material: () => GTMaterials.Magnetite }
];

function gregnauticsSetGtFormula(material, formula) {
	if (material !== null && material !== undefined && typeof material.setFormula === "function") {
		material.setFormula(formula, true);
	}
}

function gregnauticsGtMaterialName(material) {
	return material === null || material === undefined ? "" : String(material.getName());
}

function gregnauticsSetGtOreByproducts(material, byproductSuppliers, ArrayList) {
	if (material === null || material === undefined || byproductSuppliers === null || byproductSuppliers === undefined || !material.hasProperty(PropertyKey.ORE)) {
		return false;
	}

	const oreProperty = material.getProperty(PropertyKey.ORE);
	const updatedByproducts = new ArrayList();

	for (let i = 0; i < byproductSuppliers.length; i++) {
		const byproduct = byproductSuppliers[i]();
		if (byproduct === null || byproduct === undefined || byproduct.isNull()) {
			return false;
		}
		updatedByproducts.add(byproduct);
	}

	oreProperty["setOreByProducts(java.util.Collection)"](updatedByproducts);
	return true;
}

function gregnauticsSetGtOreSeparation(material, separatedSuppliers) {
	if (material === null || material === undefined || separatedSuppliers === null || separatedSuppliers === undefined || !material.hasProperty(PropertyKey.ORE)) {
		return false;
	}

	const separated = [];
	for (let i = 0; i < separatedSuppliers.length; i++) {
		const separatedMaterial = separatedSuppliers[i]();
		if (separatedMaterial === null || separatedMaterial === undefined || separatedMaterial.isNull()) {
			return false;
		}
		separated.push(separatedMaterial);
	}

	return gregnauticsSetGtOreSeparationValues(material, separated);
}

function gregnauticsSetGtOreSeparationValues(material, separated) {
	const oreProperty = material.getProperty(PropertyKey.ORE);
	oreProperty.getSeparatedInto().clear();
	if (separated.length === 0) {
		oreProperty.setSeparatedInto();
	} else if (separated.length === 1) {
		oreProperty.setSeparatedInto(separated[0]);
	} else if (separated.length === 2) {
		oreProperty.setSeparatedInto(separated[0], separated[1]);
	} else if (separated.length === 3) {
		oreProperty.setSeparatedInto(separated[0], separated[1], separated[2]);
	} else {
		oreProperty.setSeparatedInto(separated[0], separated[1], separated[2], separated[3]);
	}
	return true;
}

function gregnauticsReplaceRemainingGtOreIronSeparation(fallbackMaterial) {
	// [PORT-GTM-HEAD] GTCEuAPI.materialManager удалён в HEAD (1023cb75+) -> GTRegistries.MATERIALS.
	const $GTRegistries = Java.loadClass("com.gregtechceu.gtceu.api.registry.GTRegistries");
	const iterator = $GTRegistries.MATERIALS.stream().iterator();
	let changed = 0;
	const changedMaterials = [];

	while (iterator.hasNext()) {
		const material = iterator.next();
		if (material === null || material === undefined || material.isNull() || !material.hasProperty(PropertyKey.ORE)) {
			continue;
		}

		const separatedInto = material.getProperty(PropertyKey.ORE).getSeparatedInto();
		if (separatedInto === null || separatedInto === undefined || separatedInto.isEmpty()) {
			continue;
		}

		const updated = [];
		let hasIron = false;
		for (let i = 0; i < separatedInto.size(); i++) {
			const separatedMaterial = separatedInto.get(i);
			if (gregnauticsGtMaterialName(separatedMaterial) === "iron") {
				updated.push(fallbackMaterial);
				hasIron = true;
			} else {
				updated.push(separatedMaterial);
			}
		}

		if (hasIron && gregnauticsSetGtOreSeparationValues(material, updated)) {
			changed++;
			changedMaterials.push(gregnauticsGtMaterialName(material));
		}
	}

	if (changedMaterials.length > 0) {
		console.info(`[Gregnautics] GTCEu ore byproducts: replaced remaining separated-into iron for ${changed} materials: ${changedMaterials.join(", ")}.`);
	}
	return changed;
}

StartupEvents.registry("gtceu:material", event => {
	event.create("gtceu:bismuthinite")
		.color(0x6d6a78)
		.secondaryColor(0x3c3945)
		.formula("Bi2S3");
});

StartupEvents.registry("gtceu:tag_prefix", event => {
	[
		TagPrefix.oreDeepslate,
		TagPrefix.oreSand,
		TagPrefix.oreRedSand,
		TagPrefix.oreMarble,
		TagPrefix.oreGravel,
		TagPrefix.oreEndstone,
		TagPrefix.oreNetherrack,
		TagPrefix.oreBlackstone,
		TagPrefix.oreBasalt,
		TagPrefix.oreAndesite,
		TagPrefix.oreDiorite,
		TagPrefix.oreGranite,
		TagPrefix.oreRedGranite
	].forEach(prefix => TagPrefix.ORES.remove(prefix));

	const shouldGenerateOre = material => material.hasProperty(PropertyKey.ORE);
	const shouldGenerateSandOre = material => material.getName().includes("sand") && material.hasProperty(PropertyKey.ORE);

	GREGNAUTICS_TFC_STONE_TYPES.forEach(stone => {
		event.create(stone, "ore")
			.stateSupplier(() => Block.getBlock(`tfc:rock/raw/${stone}`).defaultBlockState())
			.baseModelLocation(`tfc:block/rock/raw/${stone}`)
			.unificationEnabled(true)
			.materialIconType(GTMaterialIconType.ore)
			.generationCondition(shouldGenerateOre);
	});

	GREGNAUTICS_SAND_COLORS.forEach(color => {
		event.create(`${color}_sand`, "ore")
			.stateSupplier(() => Block.getBlock(`tfc:sand/${color}`).defaultBlockState())
			.baseModelLocation(`tfc:block/sand/${color}`)
			.unificationEnabled(true)
			.materialIconType(GTMaterialIconType.ore)
			.generationCondition(shouldGenerateSandOre);
	});
});

GTCEuStartupEvents.materialModification(event => {
	const $ArrayList = Java.loadClass("java.util.ArrayList");
	const $OreProperty = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.properties.OreProperty");

	GREGNAUTICS_GT_FORMULA_OVERRIDES.forEach(entry => {
		gregnauticsSetGtFormula(entry.material(), entry.formula);
	});

	let replacedIronByproducts = 0;
	let normalizedSeparation = 0;
	GREGNAUTICS_GT_ORE_IRON_BYPRODUCT_REPLACEMENTS.forEach(entry => {
		const material = entry.material();
		if (gregnauticsSetGtOreByproducts(material, entry.byproducts, $ArrayList)) {
			replacedIronByproducts++;
		}
		if (gregnauticsSetGtOreSeparation(material, entry.separatedInto)) {
			normalizedSeparation++;
		}
	});
	GREGNAUTICS_GT_ORE_IRON_SEPARATION_REPLACEMENTS.forEach(entry => {
		if (gregnauticsSetGtOreSeparation(entry.material(), entry.separatedInto)) {
			normalizedSeparation++;
		}
	});
	normalizedSeparation += gregnauticsReplaceRemainingGtOreIronSeparation(GTMaterials.Hematite);
	console.info(`[Gregnautics] GTCEu ore byproducts: normalized byproducts for ${replacedIronByproducts} materials, separated-into for ${normalizedSeparation} materials.`);

	if (!GTMaterials.Bismuth.hasProperty(PropertyKey.ORE)) {
		GTMaterials.Bismuth.setProperty(PropertyKey.ORE, new $OreProperty());
	}
	if (!GTMaterials.Borax.hasProperty(PropertyKey.ORE)) {
		GTMaterials.Borax.setProperty(PropertyKey.ORE, new $OreProperty());
	}
});

StartupEvents.postInit(event => {
	const $BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries");
	const $ItemMaterialData = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.ItemMaterialData");
	const $MaterialEntry = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.stack.MaterialEntry");
	const $ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation");

	function registerOreMaterialEntry(id, material, materialEntry) {
		const item = $BuiltInRegistries.ITEM.get($ResourceLocation.parse(id));
		if (item !== null && item !== undefined && $BuiltInRegistries.ITEM.getKey(item).toString() === id) {
			$ItemMaterialData.registerMaterialEntry(item, TagPrefix.ore, material);
			$ItemMaterialData.ITEM_MATERIAL_ENTRY_COLLECTED.put(item, materialEntry);
		}
	}

	GREGNAUTICS_TFC_ORE_MATERIAL_ENTRIES.forEach(entry => {
		const material = entry.material();
		if (material === null || material === undefined || material.isNull()) {
			return;
		}

		const materialEntry = new $MaterialEntry(TagPrefix.ore, material);
		GREGNAUTICS_TFC_ORE_GRADES.forEach(grade => {
			registerOreMaterialEntry(`tfc:ore/${grade}_${entry.ore}`, material, materialEntry);

			GREGNAUTICS_TFC_STONE_TYPES.forEach(stone => {
				registerOreMaterialEntry(`tfc:ore/${grade}_${entry.ore}/${stone}`, material, materialEntry);
			});
		});
	});
});
