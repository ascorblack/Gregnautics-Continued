// priority: 90
"use strict";

// [PORT] Из TFG server_scripts/gregtech/constants.js и server_scripts/gregtech/utility.js.
// В KubeJS 7 запись в `global` разрешена ТОЛЬКО из startup-скриптов
// (в server-скриптах бросает "'global' cannot be assigned"), а каждый файл —
// изолированный скоуп, поэтому общие константы и функции живут здесь.
// Server-скрипты читают их как global.GTCEU_ANVIL_TOOL_TYPES, global.generateMixerRecipe и т.д.

//#region Constants (бывший server_scripts/tfg_port/gregtech.constants.js)
// [PORT] Обращение к GTToolType.* на верхнем уровне startup-скрипта инициализирует
// класс слишком рано (скрипты выполняются при конструировании мода KubeJS) →
// ExceptionInInitializerError. Откладываем до postInit, когда GT-классы готовы;
// server-скрипты читают global.* ещё позже (recipe-события) — порядок безопасен.
StartupEvents.postInit(() => {

global.GTCEU_ANVIL_TOOL_TYPES = [
	GTToolType.SWORD,
	GTToolType.PICKAXE,
	GTToolType.SHOVEL,
	GTToolType.AXE,
	GTToolType.HOE,
	GTToolType.MINING_HAMMER,
	GTToolType.SPADE,
	GTToolType.SAW,
	GTToolType.HARD_HAMMER,
	// GTToolType.SOFT_MALLET,
	// GTToolType.WRENCH,
	GTToolType.FILE,
	// GTToolType.CROWBAR,
	// GTToolType.SCREWDRIVER,
	// GTToolType.MORTAR,
	// GTToolType.WIRE_CUTTER,
	GTToolType.SCYTHE,
	GTToolType.KNIFE,
	GTToolType.BUTCHERY_KNIFE,
	// GTToolType.PLUNGER
];

global.GTCEU_TOOLTYPES_WHICH_HAS_TFC_DUPS = {
	"tfc:swords": GTToolType.SWORD,
	"tfc:pickaxes": GTToolType.PICKAXE,
	"tfc:axes": GTToolType.AXE,
	"tfc:shovels": GTToolType.SHOVEL,
	"tfc:hoes": GTToolType.HOE,
	"tfc:hammers": GTToolType.HARD_HAMMER,
	"tfc:knives": GTToolType.KNIFE,
	"tfc:saws": GTToolType.SAW,
	"tfc:scythes": GTToolType.SCYTHE
};

});

//#endregion

//#region Utility (бывший server_scripts/tfg_port/gregtech.utility.js)
// НЕ портированы (см. PORTING_ROADMAP.md Ф1): addCircuitToRecipe и addCleanroom —
// они мутируют recipe.json напрямую (Gson-хаки), в KubeJS 7 / GTCEu 8 формат
// рецептов переведён на codecs; вернёмся к ним при порте рецептурных скриптов (Ф3+).

/**
 * Function for generating gtceu mixer recipes.
 * Adding a circuit is optional.
 *
 * @param {*} event
 * @param {string|string[]} input -Item
 * @param {string|string[]} fluid_input -Fluid
 * @param {string} output -Item
 * @param {number|null} circuit -0-32
 * @param {string|string[]} fluid_output -Fluid
 * @param {number} duration -Ticks
 * @param {number} EUt -GTValues.VA[]
 * @param {number} rpm -Depreciated
 * @param {string} id -Recipe ID
 */
global.generateMixerRecipe = (event, input, fluid_input, output, circuit, fluid_output, duration, EUt, rpm, id) => {
	const recipe = event.recipes.gtceu.mixer(id)
		.itemInputs(input)
		.inputFluids(fluid_input)
		.itemOutputs(output)
		.outputFluids(fluid_output)
		.duration(duration)
		.EUt(EUt)

	if (circuit !== null) {
		recipe.circuit(circuit)
	}
}

/**
 * Function for generating gtceu cutter recipes.
 *
 * @param {*} event
 * @param {string} input -Item
 * @param {string} output -Item
 * @param {number} duration -Ticks
 * @param {number} EUt -GTValues.VA[]
 * @param {string} id -Recipe ID
 */
global.generateCutterRecipe = (event, input, output, duration, EUt, id) => {
	event.recipes.gtceu.cutter(`tfg:${id}`)
		.itemInputs(input)
		.itemOutputs(output)
		.duration(duration)
		.EUt(EUt)
}

/**
 * Function for iterating through registered materials
 *
 * @param {(material: any) => void} iterator
 */
global.forEachMaterial = function (iterator) {
	// [PORT] GTM8: реестр материалов — это vanilla Registry (gtceu:material),
	// метода getRegisteredMaterials() больше нет; Registry итерируем напрямую.
	// [PORT-GTM-HEAD] GTCEuAPI.materialManager удалён в HEAD (1023cb75+) -> GTRegistries.MATERIALS
	// [PORT-GTM-HEAD] (MaterialRegistry implements Iterable<Material>, поэтому for..of работает).
	for (const material of GTRegistries.MATERIALS) {
		// [PORT-FIX 2026-07-15] На КЛИЕНТЕ после дисконнекта с сервера реестр может
		// отдавать null (незабинденные intrusive holders при пересборке datapack'ов —
		// родственник GTM#5111). Итерация без guard'а роняла ServerEvents.tags:
		// NullPointerException в guava Iterators.transform -> краш экрана создания мира.
		if (material == null) continue
		iterator(material)
	}
}

/**
 * Creates recipes for sterilizing an item using chemicals or the autoclave.
 *
 * @param {*} event
 * @param {string} input - The input item to be sterilized.
 * @param {string} output - The output item after sterilization.
 * @param {number} multiplier - Multiplies the fluid amounts and recipe duration. Default multiplier = 1.
 * @param {string} [cleanroom] - For if a cleanroom is required. Can be null.
 *
 * @throws {TypeError} Throws an error if input, output, or multiplier is invalid.
 */
global.sterilizeItem = function (event, input, output, multiplier, cleanroom) {
	const errors = [];

	if (input === undefined || (Array.isArray(input) && input.length !== 1) || output === undefined || (Array.isArray(output) && output.length !== 1)) {
		errors.push("input or output is undefined or not equal to one item");
	}
	if (multiplier <= 0) {
		errors.push(`invalid multiplier (${multiplier})`);
	}

	if (errors.length > 0) {
		const message = `sterilizeItem errors:\n - ${errors.join("\n - ")}`;
		throw new TypeError(message);
	}

	let recipe_multiplier = 1;
	if (multiplier !== undefined) {
		recipe_multiplier = multiplier;
	}

	const ethanol_recipe = event.recipes.gtceu.chemical_bath(`tfg:ethanol_cleaning/${global.linuxUnfucker(input)}_to_${global.linuxUnfucker(output)}`)
		.itemInputs(input)
		.inputFluids(Fluid.of('gtceu:ethanol', 500 * recipe_multiplier))
		.itemOutputs(output)
		.duration(10 * 20 * recipe_multiplier)
		.EUt(GTValues.VA[GTValues.MV]);

	const hydrogen_peroxide_recipe = event.recipes.gtceu.chemical_bath(`tfg:hydrogen_peroxide_cleaning/${global.linuxUnfucker(input)}_to_${global.linuxUnfucker(output)}`)
		.itemInputs(input)
		.inputFluids(Fluid.of('gtceu:hydrogen_peroxide', 200 * recipe_multiplier))
		.itemOutputs(output)
		.duration(10 * 20 * recipe_multiplier)
		.EUt(GTValues.VA[GTValues.MV]);

	const sodium_dodecyl_sulfate_recipe = event.recipes.gtceu.chemical_bath(`tfg:sodium_dodecyl_sulfate_cleaning/${global.linuxUnfucker(input)}_to_${global.linuxUnfucker(output)}`)
		.itemInputs(input)
		.inputFluids(Fluid.of('tfg:sodium_dodecyl_sulfate', 50 * recipe_multiplier))
		.itemOutputs(output)
		.duration(10 * 20 * recipe_multiplier)
		.EUt(GTValues.VA[GTValues.MV]);

	const autoclave_recipe = event.recipes.gtceu.autoclave(`tfg:autoclave_cleaning/${global.linuxUnfucker(input)}_to_${global.linuxUnfucker(output)}`)
		.itemInputs(input)
		.perTick(true)
		.inputFluids(Fluid.of('gtceu:steam', 100 * recipe_multiplier))
		.perTick(false)
		.itemOutputs(output)
		.duration(240 * 20 * recipe_multiplier)
		.EUt(GTValues.VA[GTValues.MV]);

	if (cleanroom) {
		ethanol_recipe.cleanroom(cleanroom);
		hydrogen_peroxide_recipe.cleanroom(cleanroom);
		sodium_dodecyl_sulfate_recipe.cleanroom(cleanroom);
		autoclave_recipe.cleanroom(cleanroom);
	}
}

//#endregion
