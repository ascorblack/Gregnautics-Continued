// priority: -5
"use strict";

// [PORT] Из TFG server_scripts/tfg/food/utility.food.js (TerraFirmaGreg-Modern 1.20.1 -> 1.21.1).
// KubeJS 7 запрещает присваивание global.* в server_scripts — все генераторы еды перенесены
// в startup (сами функции вызываются позже, из ServerEvents.recipes с event в аргументе).
//
// [PORT-Ф2] Кастомные GT-машины еды TFG (tfg:food_oven / tfg:food_processor и
// su.terrafirmagreg.core...ISPOutputRecipeLogic) не существуют на 1.21 — все
// processor/oven-рецепты пропускаются (registerFoodRecipe и обёртки = no-op с console.debug).
// Когда машины будут портированы, вернуть сюда логику из оригинального utility.food.js.
//
// [PORT-FIX] kubejs_tfc 2.0: TFC.fluidStackIngredient удалён (жидкости — строки '#tag 100' или Fluid.of);
// TFC.ingredient.notRotten() больше не принимает ингредиент (объединение через tfc:and);
// firmaLifeCopyDynamicFood()/firmaLifeAddPiePan() -> addSimpleModifier('firmalife:...');
// схем firmalife нет — vat/oven/drying/smoking/mixing_bowl пишутся через event.custom
// (формат сверен с data/firmalife/recipe/**.json из Firmalife 3.0.11).

const $FoodBuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
const $FoodResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation');

//#region Общие парсеры/проверки

/** Разбирает 'Nx ns:id' -> {count, id}. */
global.TFG_parseItem = function (s) {
	const m = String(s).match(/^(\d+)\s*x\s+/i);
	return m ? { count: parseInt(m[1]), id: String(s).slice(m[0].length) } : { count: 1, id: String(s) };
};

/** Тихая проверка существования предмета. Теги ('#...') считаются существующими. */
global.TFG_itemExists = function (s) {
	try {
		// [PORT-FIX 2026-07-16] ТОЛЬКО let, не const! `const` внутри try Rhino роняет с
		// "InternalError: TypeError: redeclaration of var id", а catch ниже это глотал =>
		// функция возвращала false НА ВСЁ (даже minecraft:apple) => вся еда TFG теряла
		// данные TFC и была несъедобна. См. HANDOFF, раздел про const-в-try.
		let id = global.TFG_parseItem(s).id;
		if (id.startsWith('#')) return true;
		return $FoodBuiltInRegistries.ITEM.containsKey($FoodResourceLocation.parse(id));
	} catch (e) {
		// Отсутствующий предмет сюда НЕ попадает (containsKey просто вернёт false),
		// поэтому любое исключение здесь — реальный баг. Молчать нельзя.
		console.warn(`[Gregnautics] TFG_itemExists('${s}') упал: ${e}`);
		return false;
	}
};

/** Тихая проверка существования жидкости ('ns:fluid' или 'ns:fluid 100'). Теги считаются существующими. */
global.TFG_fluidExists = function (s) {
	try {
		// [PORT-FIX 2026-07-16] ТОЛЬКО let, не const (см. TFG_itemExists выше).
		let id = String(s).trim().split(/\s+/)[0];
		if (id.startsWith('#')) return true;
		return $FoodBuiltInRegistries.FLUID.containsKey($FoodResourceLocation.parse(id));
	} catch (e) {
		console.warn(`[Gregnautics] TFG_fluidExists('${s}') упал: ${e}`);
		return false;
	}
};

/** Все ли предметы списка существуют (строки 'Nx id' / '#tag'). */
global.TFG_allItemsExist = function (arr) {
	if (!arr) return true;
	if (typeof arr === 'string') arr = [arr];
	return arr.every(i => global.TFG_itemExists(i));
};

/**
 * [PORT] Ремап тегов жидкостей 1.20 -> 1.21 (tfg:clean_water ещё не портирован; TFC 4.x перевёл часть тегов в c:).
 * Принимает 'fluid'/'#tag' с опциональным ' N'.
 */
global.TFG_remapFluid = function (s) {
	if (!s) return s;
	return String(s)
		.replace('#tfg:clean_water', '#tfc:any_fresh_water')
		.replace('#tfg:alcohols/beer', '#c:alcohols/beer')
		.replace('#tfg:alcohols', '#tfc:alcohols')
		.replace('#tfc:milks', '#c:milks');
};

/** TFC-ингредиент "не гнилой" (kubejs_tfc 2.0: notRotten() без аргумента, объединение через tfc:and). */
global.TFG_notRotten = function (ing) {
	return TFC.ingredient.and(ing, TFC.ingredient.notRotten());
};

/** JSON-ингредиент {item/tag} + tfc:not_rotten (+count) для event.custom (firmalife:vat/oven/...). */
global.TFG_jsonNotRotten = function (itemStr, countOverride) {
	const p = global.TFG_parseItem(itemStr);
	const count = (countOverride !== undefined && countOverride !== null) ? countOverride : p.count;
	const base = p.id.startsWith('#') ? { tag: p.id.substring(1) } : { item: p.id };
	const out = { type: 'tfc:and', children: [base, { type: 'tfc:not_rotten' }] };
	if (count > 1) out.count = count;
	return out;
};

/** JSON-жидкость {amount, fluid|tag} из строки 'ns:fluid 100' / '#tag 100'. */
global.TFG_jsonFluid = function (fluidStr, defaultAmount) {
	const s = global.TFG_remapFluid(String(fluidStr).trim());
	const m = s.match(/^(\S+?)\s+(\d+)$/);
	const id = m ? m[1] : s;
	const amount = m ? parseInt(m[2]) : (defaultAmount || 1000);
	return id.startsWith('#') ? { amount: amount, tag: id.substring(1) } : { amount: amount, fluid: id };
};

/** JSON ItemStackProvider: {stack:{id,count}, modifiers:[...]} (или просто {id,count} без модификаторов). */
global.TFG_jsonISP = function (itemStr, modifiers) {
	const p = global.TFG_parseItem(itemStr);
	if (!modifiers || modifiers.length === 0) return { id: p.id, count: p.count };
	return { stack: { id: p.id, count: p.count }, modifiers: modifiers };
};

//#endregion
//#region Machine Helper ([PORT-Ф2] — заглушки)

/**
 * [PORT-Ф2] tfg:food_oven / tfg:food_processor не портированы (кастомные GT-машины TFG core).
 * Рецепт пропускается; лог — в debug.log, чтобы не засорять консоль.
 */
global.registerFoodRecipe = function (event, type, id, duration, EUt, text, data) {
	console.debug(`[Gregnautics] [PORT-Ф2] пропущен рецепт ${type}/${id} — машины еды TFG не портированы`);
	return null;
};

global.processorRecipe = (event, id, duration, EUt, data) => global.registerFoodRecipe(event, 'food_processor', id, duration, EUt, '', data);

global.processorRecipeText = (event, id, duration, EUt, text, data) => global.registerFoodRecipe(event, 'food_processor', id, duration, EUt, text, data);

global.cookingRecipe = (event, id, input, out, fluid, isFirmaDynamic) => global.registerFoodRecipe(event, 'food_oven', id, 20 * 10, 32, '', {});

//#endregion
//#region Jam Generator

/**
 * [PORT-Ф2] GT-рецепты джемов (food_processor) пропущены.
 */
global.generateJamProcessorRecipes = function (event, fruitId, fruitName, jar, unsealedJar) {
	console.debug(`[Gregnautics] [PORT-Ф2] пропущены processor-рецепты джема ${fruitName}`);
};

/**
 * Рецепты джема: pot_jam (kubejs_tfc 2.0: конструктор (unsealed_result, sealed_result,
 * ingredients, fluid_ingredient, duration, temperature, texture)) + firmalife:vat через event.custom.
 * [PORT-FIX] добавлен параметр unsealedJar (нужен новому кодеку tfc:jam_pot).
 */
global.generateJamPotAndVatRecipes = function (event, fruitId, fruitName, jar, unsealedJar, texture) {
	if (!fruitId || !fruitName || !jar || !texture) {
		throw new Error(`Missing parameters for generateJamPotAndVatRecipes: fruitId=${fruitId}, fruitName=${fruitName}, jar=${jar}, texture=${texture}`);
	}

	for (let i = 2; i <= 4; i++) {
		let ingredients = [];
		for (let j = 0; j < i; j++) {
			ingredients.push(global.TFG_notRotten(fruitId));
		}
		ingredients.push('#tfc:foods/sweeteners'); // [PORT] tfc:sweetener -> tfc:foods/sweeteners

		event.recipes.tfc.pot_jam(
			unsealedJar,
			`${i}x ${jar}`,
			ingredients,
			'#tfc:any_fresh_water 100', // [PORT] tfg:clean_water не портирован
			500,
			200,
			texture
		).id(`tfg:pot/jam/${fruitName}_x${i}`);
	}

	// [PORT-FIX] схем firmalife нет в kubejs_tfc 2.0.1 — vat через event.custom
	event.custom({
		"type": "firmalife:vat",
		"input_item": global.TFG_jsonNotRotten(fruitId),
		"input_fluid": { "amount": 500, "fluid": "firmalife:sugar_water" },
		"output_item": global.TFG_jsonISP(jar, [{ "type": "tfc:copy_food" }]),
		"length": 100,
		"temperature": 200.0
	}).id(`tfg:vat/jam/${fruitName}`);
};

/**
 * Распечатывание джема.
 * [PORT-FIX] no_remainder_shapeless_crafting удалён в kubejs_tfc 2.0 — advanced_shapeless без остатка.
 */
global.generateJamUnsealingRecipe = function (event, jar, unsealedJar, fruitName) {
	if (!jar || !unsealedJar || !fruitName) {
		throw new Error(`Missing parameters for generateJamUnsealingRecipe: jar=${jar}, unsealedJar=${unsealedJar}, fruitName=${fruitName}`);
	}

	event.recipes.tfc.advanced_shapeless_crafting(
		TFC.isp.of(unsealedJar).copyOldestFood(),
		[global.TFG_notRotten(jar)],
		jar
	).id(`tfg:crafting/unseal_${fruitName}_jar`);
};

global.generateAllJamRecipes = function (event, fruitId, fruitName, jar, unsealedJar, texture) {
	if (!fruitId || !fruitName || !jar || !unsealedJar || !texture) {
		throw new Error(`Missing parameters for generateAllJamRecipes: fruitId=${fruitId}, fruitName=${fruitName}, jar=${jar}, unsealedJar=${unsealedJar}, texture=${texture}`);
	}

	// [PORT-Ф4-TODO] банки tfg:jar/* не зарегистрированы на 1.21 (см. startup tfg.food.items.js) — пропуск
	if (!global.TFG_itemExists(jar) || !global.TFG_itemExists(unsealedJar) || !global.TFG_itemExists(fruitId)) {
		console.debug(`[Gregnautics] [PORT-Ф4-TODO] пропущены рецепты джема ${fruitName}: предметы не зарегистрированы`);
		return;
	}

	global.generateJamUnsealingRecipe(event, jar, unsealedJar, fruitName);
	global.generateJamPotAndVatRecipes(event, fruitId, fruitName, jar, unsealedJar, texture);
	global.generateJamProcessorRecipes(event, fruitId, fruitName, jar, unsealedJar);
};

//#endregion
//#region Boiling Generator

/**
 * Варка еды в жидкости: pot + vat (+oven — [PORT-Ф2] пропущен).
 */
global.generateFluidBoilingFoodRecipes = function (event, inputFluid, fluidQty, inputItem, outputItem, genPotRecipe, genVatRecipe, genOvenRecipe, circuit, copyDynamic) {
	genPotRecipe = genPotRecipe !== false;
	genVatRecipe = genVatRecipe !== false;

	if (!inputFluid || !fluidQty || !inputItem || !outputItem) {
		throw new Error(`Missing parameters for generateFluidBoilingFoodRecipes: inputFluid=${inputFluid}, FluidQty=${fluidQty}, inputItem=${inputItem}, outputItem=${outputItem}`);
	}

	if (!global.TFG_itemExists(inputItem) || !global.TFG_itemExists(outputItem)) {
		console.debug(`[Gregnautics] [PORT-Ф4-TODO] пропущена варка ${inputItem} -> ${outputItem}: предметы не зарегистрированы`);
		return;
	}

	const fluid = global.TFG_remapFluid(inputFluid);
	const unfuckedInput = global.linuxUnfucker(inputItem);
	const unfuckedOutput = global.linuxUnfucker(outputItem);

	// [PORT-FIX] firmalife:copy_dynamic_food через addSimpleModifier (firmaLifeCopyDynamicFood удалён)
	const makeIsp = (stack) => (copyDynamic)
		? TFC.isp.of(stack).addSimpleModifier('firmalife:copy_dynamic_food')
		: TFC.isp.of(stack).copyFood();

	if (genPotRecipe) {
		for (let i = 1; i <= 5; i++) {
			event.recipes.tfc.pot(
				Array(i).fill(global.TFG_notRotten(inputItem)),
				`${fluid} ${fluidQty * i}`,
				500,
				200
			).itemOutput(makeIsp(`${i}x ${outputItem}`))
				.id(`tfg:pot/${unfuckedInput}_boiled_into_${unfuckedOutput}_${i}`);
		}
	}

	if (genVatRecipe) {
		event.custom({
			"type": "firmalife:vat",
			"input_item": global.TFG_jsonNotRotten(inputItem),
			"input_fluid": global.TFG_jsonFluid(`${fluid} ${fluidQty}`),
			"output_item": global.TFG_jsonISP(outputItem, [(copyDynamic) ? { "type": "firmalife:copy_dynamic_food" } : { "type": "tfc:copy_food" }]),
			"length": 100,
			"temperature": 200.0
		}).id(`tfg:vat/${unfuckedInput}_boiled_into_${unfuckedOutput}`);
	}

	if (genOvenRecipe !== false) {
		console.debug(`[Gregnautics] [PORT-Ф2] пропущен food_oven-рецепт варки ${unfuckedInput}`);
	}
};

global.generateWaterBoilingFoodRecipes = function (event, inputItem, outputItem, genPotRecipe, genVatRecipe, genOvenRecipe, circuit, copyDynamic) {
	if (!inputItem || !outputItem) {
		throw new Error(`Missing parameters for generateWaterBoilingFoodRecipes: inputItem=${inputItem}, outputItem=${outputItem}`);
	}
	global.generateFluidBoilingFoodRecipes(event, '#tfc:any_fresh_water', 100, inputItem, outputItem, genPotRecipe, genVatRecipe, genOvenRecipe, circuit, copyDynamic);
};

global.generateOilBoilingFoodRecipes = function (event, inputItem, outputItem, genPotRecipe, genVatRecipe, genOvenRecipe, circuit, copyDynamic) {
	if (!inputItem || !outputItem) {
		throw new Error(`Missing parameters for generateOilBoilingFoodRecipes: inputItem=${inputItem}, outputItem=${outputItem}`);
	}
	global.generateFluidBoilingFoodRecipes(event, '#firmalife:oils', 100, inputItem, outputItem, genPotRecipe, genVatRecipe, genOvenRecipe, circuit, copyDynamic);
};

//#endregion
//#region Cooking Generator

/**
 * Готовка еды: TFC heating + (опц.) firmalife oven; GT-oven — [PORT-Ф2] пропущен.
 */
global.generateFoodCookingRecipes = function (event, inputItem, outputItem, genOvenRecipe, genHeatingRecipe, genFirmalifeOvenRecipe, circuit, copyDynamic) {
	genHeatingRecipe = genHeatingRecipe !== false;
	genFirmalifeOvenRecipe = genFirmalifeOvenRecipe === true;
	copyDynamic = copyDynamic === true;

	if (!inputItem || !outputItem) {
		throw new Error(`Missing parameters for generateFoodCookingRecipes: inputItem=${inputItem}, outputItem=${outputItem}`);
	}

	if (!global.TFG_itemExists(inputItem) || !global.TFG_itemExists(outputItem)) {
		console.debug(`[Gregnautics] [PORT-Ф4-TODO] пропущена готовка ${inputItem} -> ${outputItem}: предметы не зарегистрированы`);
		return;
	}

	const unfuckedInput = global.linuxUnfucker(inputItem);
	const unfuckedOutput = global.linuxUnfucker(outputItem);

	let ispOut = (copyDynamic)
		? TFC.isp.of(outputItem).addSimpleModifier('firmalife:copy_dynamic_food')
		: TFC.isp.of(outputItem).copyFood();

	if (genOvenRecipe !== false) {
		console.debug(`[Gregnautics] [PORT-Ф2] пропущен food_oven-рецепт готовки ${unfuckedInput}`);
	}

	if (genHeatingRecipe) {
		event.recipes.tfc.heating(global.TFG_notRotten(inputItem), 200)
			.resultItem(ispOut).id(`tfg:heating/${unfuckedInput}_to_${unfuckedOutput}`);
	}

	if (genFirmalifeOvenRecipe) {
		// [PORT-FIX] схем firmalife нет — oven через event.custom; порядок аргументов 1.20: (ingredient, temperature, duration, result)
		const modifiers = [(copyDynamic) ? { "type": "firmalife:copy_dynamic_food" } : { "type": "tfc:copy_food" }, { "type": "tfc:add_trait", "trait": "firmalife:oven_baked" }];
		event.custom({
			"type": "firmalife:oven",
			"ingredient": global.TFG_jsonNotRotten(inputItem),
			"temperature": 300.0,
			"duration": 200,
			"result": global.TFG_jsonISP(outputItem, modifiers)
		}).id(`tfg:firmalife_oven/${unfuckedInput}_to_${unfuckedOutput}`);
	}
};

//#endregion
//#region Alcohol Generator

/**
 * Рецепты алкоголя (бочки; GT-processor — [PORT-Ф2], вместо него генерируется бочковой
 * рецепт-фоллбек [PORT-Ф2-FALLBACK], чтобы базовый алкоголь оставался достижимым).
 */
global.generateAlcoholRecipes = function (event, ingredient, baseId, agedId, vintageId, genBaseBarrelRecipe, genBaseProcessorRecipe, genAgedRecipe, genVintageRecipe) {
	genBaseBarrelRecipe = genBaseBarrelRecipe === true;
	genBaseProcessorRecipe = genBaseProcessorRecipe !== false;
	genAgedRecipe = genAgedRecipe === true;
	genVintageRecipe = genVintageRecipe !== false;

	const unfuckedBaseId = global.linuxUnfucker(baseId);
	const unfuckedAgedId = global.linuxUnfucker(agedId);
	const unfuckedVintageId = global.linuxUnfucker(vintageId);

	// [PORT-Ф2-FALLBACK] processor-рецепт недоступен — генерируем бочковой аналог
	if (genBaseProcessorRecipe && !genBaseBarrelRecipe) {
		genBaseBarrelRecipe = true;
	}

	if (genBaseBarrelRecipe && baseId && global.TFG_fluidExists(baseId) && global.TFG_itemExists(ingredient)) {
		event.recipes.tfc.barrel_sealed('#tfc:any_fresh_water 500', 24000 * 3) // 3 days.
			.inputItem(ingredient)
			.outputFluid(Fluid.of(baseId, 500))
			.id(`tfg:barrel_alcohol/${unfuckedBaseId}`);
	}

	if (genAgedRecipe && baseId && agedId && global.TFG_fluidExists(baseId) && global.TFG_fluidExists(agedId)) {
		event.recipes.tfc.barrel_sealed(Fluid.of(baseId, 100), 24000 * 24) // 24 days.
			.outputFluid(Fluid.of(agedId, 100))
			.id(`tfg:barrel_alcohol/${unfuckedAgedId}`);
	}

	if (genVintageRecipe && agedId && vintageId && global.TFG_fluidExists(agedId) && global.TFG_fluidExists(vintageId)) {
		event.recipes.tfc.barrel_sealed(Fluid.of(agedId, 1000), 24000 * 24) // 24 days.
			.outputFluid(Fluid.of(vintageId, 750))
			.id(`tfg:barrel_alcohol/${unfuckedVintageId}`);
	}
};

// #endregion
// #region Preservation

/**
 * Сушка (drying mat; GT-processor — [PORT-Ф2] пропущен).
 */
global.generateDryingFoodRecipes = function (event, inputItem, outputItem, genProcessorRecipe, genDryingMatRecipe) {
	genDryingMatRecipe = genDryingMatRecipe === true;

	const unfuckedInput = global.linuxUnfucker(inputItem);

	if (genProcessorRecipe !== false) {
		console.debug(`[Gregnautics] [PORT-Ф2] пропущен processor-рецепт сушки ${unfuckedInput}`);
	}

	if (genDryingMatRecipe && global.TFG_itemExists(inputItem) && global.TFG_itemExists(outputItem)) {
		event.custom({
			"type": "firmalife:drying",
			"ingredient": global.TFG_jsonNotRotten(inputItem),
			"result": global.TFG_jsonISP(outputItem, [{ "type": "tfc:copy_oldest_food" }])
		}).id(`tfg:mat_drying/${unfuckedInput}`);
	}
};

/**
 * Копчение (fire pit smoking; GT-processor — [PORT-Ф2] пропущен).
 */
global.generateSmokingFoodRecipes = function (event, inputItem, genProcessorRecipe, genFireSmokingRecipe) {
	genFireSmokingRecipe = genFireSmokingRecipe === true;

	const unfuckedInput = global.linuxUnfucker(inputItem);

	if (genProcessorRecipe !== false) {
		console.debug(`[Gregnautics] [PORT-Ф2] пропущен processor-рецепт копчения ${unfuckedInput}`);
	}

	if (genFireSmokingRecipe && global.TFG_itemExists(inputItem)) {
		// [PORT-FIX] в оригинале трейт 'kubejs:smoked' (баг) — заменён на firmalife:smoked
		event.custom({
			"type": "firmalife:smoking",
			"ingredient": global.TFG_jsonNotRotten(inputItem),
			"result": { "modifiers": [{ "type": "tfc:copy_input" }, { "type": "tfc:add_trait", "trait": "firmalife:smoked" }] }
		}).id(`tfg:fire_smoking/${unfuckedInput}`);
	}
};

/**
 * Засолка (бочка; GT-processor — [PORT-Ф2] пропущен).
 */
global.generateBriningFoodRecipes = function (event, inputItem, genProcessorRecipe, genBarrelRecipe) {
	genBarrelRecipe = genBarrelRecipe === true;

	if (genProcessorRecipe !== false) {
		console.debug(`[Gregnautics] [PORT-Ф2] пропущен processor-рецепт засолки ${global.linuxUnfucker(inputItem)}`);
	}

	if (genBarrelRecipe && global.TFG_itemExists(inputItem)) {
		// [PORT-FIX] kubejs_tfc 2.0: конструктор barrel_sealed(input_fluid, duration); .inputs() -> .inputItem(); copyInput() -> copyInputStack()
		event.recipes.tfc.barrel_sealed('tfc:brine 125', 4800) // 4:00min
			.inputItem(global.TFG_notRotten(inputItem))
			.outputItem(TFC.isp.copyInputStack().addTrait('tfc:brined'))
			.id(`tfg:barrel/brining/${global.linuxUnfucker(inputItem)}`);
	}
};

// #endregion
// #region Mixing Generator

/**
 * Разворачивает список 'Nx item' в массив not-rotten TFC-ингредиентов.
 */
global.ingredientStackInputParser = function (inputArray) {
	let formattedInputs = [];

	if (typeof inputArray === 'string') {
		inputArray = [inputArray];
	}
	if (!inputArray || !Array.isArray(inputArray)) {
		return [];
	}

	inputArray.forEach(input => {
		if (!input) return;
		const p = global.TFG_parseItem(input);
		for (let i = 0; i < p.count; i++) {
			formattedInputs.push(global.TFG_notRotten(p.id));
		}
	});

	return formattedInputs;
};

/**
 * Преобразует строки 'fluid N' в TFC-ингредиенты «предмет с жидкостью».
 * [PORT-FIX] kubejs_tfc 2.0: TFC.ingredient.fluid(TFC.fluidStackIngredient(...)) -> TFC.ingredient.fluidContents(fluid, amount).
 */
global.fluidIngredientInputParser = function (inputArray) {
	let formattedInputs = [];

	if (typeof inputArray === 'string') {
		inputArray = [inputArray];
	}
	if (!inputArray || !Array.isArray(inputArray)) {
		return [];
	}

	inputArray.forEach(input => {
		if (!input) return;
		const s = global.TFG_remapFluid(input);
		let match = s.match(/^(.+)\s+(\d+)$/);
		let fluid = match ? match[1] : s;
		let count = match ? parseInt(match[2]) : 1000;
		formattedInputs.push(TFC.ingredient.fluidContents(fluid, count));
	});

	return formattedInputs;
};

/**
 * Микс-рецепты: advanced_shapeless + firmalife:mixing_bowl (event.custom); GT-processor — [PORT-Ф2].
 */
global.generateMixingFoodRecipes = function (event, inputItems, inputFluid, outputFluid, outputItem, genShapelessRecipe, genMixingBowlRecipe, genProcessorRecipe, circuit, outputProvider, idOverride) {
	genShapelessRecipe = genShapelessRecipe === true;
	genMixingBowlRecipe = genMixingBowlRecipe !== false;

	if (typeof inputItems === 'string') inputItems = [inputItems];

	let id;
	if (idOverride) {
		id = global.linuxUnfucker(idOverride);
	} else {
		id = outputItem ? global.linuxUnfucker(outputItem) : global.linuxUnfucker(outputFluid);
	}

	// [PORT-Ф4-TODO] пропуск при незарегистрированных предметах/жидкостях
	if (!global.TFG_allItemsExist(inputItems) || (outputItem && !global.TFG_itemExists(outputItem))
		|| (outputFluid && !global.TFG_fluidExists(String(typeof outputFluid === 'string' ? outputFluid : outputFluid[0]).split(/\s+/)[0]))) {
		console.debug(`[Gregnautics] [PORT-Ф4-TODO] пропущен микс-рецепт ${id}: предметы/жидкости не зарегистрированы`);
		return;
	}

	const formattedInputItems = global.ingredientStackInputParser(inputItems);
	const fluidArray = (typeof inputFluid === 'string') ? [inputFluid] : inputFluid;
	const formattedFluidItems = fluidArray ? global.fluidIngredientInputParser(fluidArray) : [];

	if (genProcessorRecipe !== false) {
		console.debug(`[Gregnautics] [PORT-Ф2] пропущен processor-микс ${id}`);
	}

	if (genShapelessRecipe) {
		let outputItemData;

		if (outputItem) {
			outputItemData = outputProvider ? outputProvider : TFC.isp.of(outputItem).copyOldestFood();
		} else {
			throw new Error(`No output item for generateMixingFoodRecipes recipe ID: 'tfg:shapeless/${id}'`);
		}

		let ingredientsData = [];
		if (formattedInputItems.length > 0) Array.prototype.push.apply(ingredientsData, formattedInputItems);
		if (formattedFluidItems.length > 0) Array.prototype.push.apply(ingredientsData, formattedFluidItems);

		if (ingredientsData.length > 9) throw new Error(`Too many inputs for generateMixingFoodRecipes recipe ID: 'tfg:shapeless/${id}'`);

		// [PORT-FIX] TFC 4.x: primary_ingredient обязателен — берём первый предмет списка
		event.recipes.tfc.advanced_shapeless_crafting(
			outputItemData,
			ingredientsData,
			global.TFG_parseItem(inputItems[0]).id
		).id(`tfg:shapeless/${id}`);
	}

	if (genMixingBowlRecipe) {
		// [PORT-FIX] схем firmalife нет — mixing_bowl через event.custom (формат сверен с data/firmalife/recipe/mixing_bowl/*.json)
		if (formattedInputItems.length > 5) throw new Error(`Too many input items for generateMixingFoodRecipes recipe ID: 'tfg:mixing_bowl/${id}'`);

		let json = { "type": "firmalife:mixing_bowl" };

		if (inputItems && inputItems.length > 0) {
			let itemIngredients = [];
			inputItems.forEach(input => {
				if (!input) return;
				const p = global.TFG_parseItem(input);
				for (let i = 0; i < p.count; i++) itemIngredients.push(global.TFG_jsonNotRotten(p.id, 1));
			});
			json.item_ingredients = itemIngredients;
		}
		if (inputFluid) json.fluid_ingredients = global.TFG_jsonFluid(typeof inputFluid === 'string' ? inputFluid : inputFluid[0]);

		if (outputItem) {
			const p = global.TFG_parseItem(outputItem);
			json.result_item = { "id": p.id, "count": p.count };
		}
		if (outputFluid) {
			const f = global.TFG_remapFluid(typeof outputFluid === 'string' ? outputFluid : outputFluid[0]);
			const m = String(f).match(/^(\S+?)\s+(\d+)$/);
			json.result_fluid = { "id": m ? m[1] : f, "amount": m ? parseInt(m[2]) : 1000 };
		}

		event.custom(json).id(`tfg:mixing_bowl/${id}`);
	}
};

//#endregion
//#region Meal Generator

/**
 * Похлёбки/бульоны: pot; GT-processor — [PORT-Ф2].
 */
global.generateMealFoodRecipes = function (event, inputItems, inputFluid, outputFluid, outputItem, genPotRecipe, genProcessorRecipe, outputProvider, circuit, duration, temp, tier, idOverride) {
	genPotRecipe = genPotRecipe !== false;
	let recipeDuration = duration ? duration : 200;

	if (typeof inputItems === 'string') inputItems = [inputItems];

	let id;
	if (idOverride) {
		id = global.linuxUnfucker(idOverride);
	} else {
		id = outputItem ? global.linuxUnfucker(outputItem) : global.linuxUnfucker(outputFluid);
	}

	if (!global.TFG_allItemsExist(inputItems) || (outputItem && !global.TFG_itemExists(outputItem))
		|| (outputFluid && !global.TFG_fluidExists(String(typeof outputFluid === 'string' ? outputFluid : outputFluid[0]).split(/\s+/)[0]))) {
		console.debug(`[Gregnautics] [PORT-Ф4-TODO] пропущен meal-рецепт ${id}: предметы/жидкости не зарегистрированы`);
		return;
	}

	const formattedInputItems = global.ingredientStackInputParser(inputItems);

	if (genProcessorRecipe !== false) {
		console.debug(`[Gregnautics] [PORT-Ф2] пропущен processor-meal ${id}`);
	}

	if (genPotRecipe) {
		if (formattedInputItems.length > 5) throw new Error(`Too many input items for generateMealFoodRecipes recipe ID: 'tfg:pot/${id}'`);

		let potTemp = temp ? temp : 200;
		let potInputFluid = global.TFG_remapFluid(typeof inputFluid === 'string' ? inputFluid : inputFluid[0]);
		let recipe = event.recipes.tfc.pot(formattedInputItems, potInputFluid, recipeDuration, potTemp);

		if (outputItem) {
			// [PORT-FIX] в оригинале было присваивание recipe.itemOutput = ... (KubeJS 6) — теперь вызов метода
			recipe.itemOutput(outputProvider ? outputProvider : TFC.isp.of(outputItem).copyOldestFood());
		}
		if (outputFluid) {
			const f = global.TFG_remapFluid(typeof outputFluid === 'string' ? outputFluid : outputFluid[0]);
			const m = String(f).match(/^(\S+?)\s+(\d+)$/);
			recipe.fluidOutput(Fluid.of(m ? m[1] : f, m ? parseInt(m[2]) : 1000));
		}

		recipe.id(`tfg:pot/${id}`);
	}
};

//#endregion
//#region Cutting Generator

/**
 * Нарезка растений/еды: shapeless-рецепты (нож/молот/ступка); GT-processor — [PORT-Ф2].
 * [PORT-Ф2-FALLBACK] если запрошен только processor-рецепт — генерируется ножевой shapeless,
 * чтобы предмет оставался достижимым.
 */
global.generateCuttingFoodRecipes = function (event, inputItem, outputItem, genShapelessKnifeRecipe, genShapelessHammerRecipe, genShapelessMortarRecipe, genProcessorRecipe, circuitOverride) {
	genShapelessKnifeRecipe = genShapelessKnifeRecipe === true;
	genShapelessHammerRecipe = genShapelessHammerRecipe === true;
	genShapelessMortarRecipe = genShapelessMortarRecipe === true;
	genProcessorRecipe = genProcessorRecipe !== false;

	if (!global.TFG_itemExists(inputItem) || !global.TFG_itemExists(outputItem)) {
		console.debug(`[Gregnautics] [PORT-Ф4-TODO] пропущена нарезка ${inputItem} -> ${outputItem}: предметы не зарегистрированы`);
		return;
	}

	const unfuckedOutput = global.linuxUnfucker(outputItem);
	const parsedInputItem = global.TFG_notRotten(inputItem);

	if (genProcessorRecipe) {
		console.debug(`[Gregnautics] [PORT-Ф2] пропущен processor-рецепт нарезки ${unfuckedOutput}`);
		if (!genShapelessKnifeRecipe && !genShapelessHammerRecipe && !genShapelessMortarRecipe) {
			genShapelessKnifeRecipe = true; // [PORT-Ф2-FALLBACK]
		}
	}

	if (genShapelessKnifeRecipe) {
		event.recipes.tfc.advanced_shapeless_crafting(
			TFC.isp.of(outputItem).copyFood(),
			[parsedInputItem, '#c:tools/knife'], inputItem) // [PORT] tfc:knives -> c:tools/knife
			.id(`tfg:crafting/${unfuckedOutput}_knife`);
	}

	if (genShapelessHammerRecipe) {
		event.recipes.tfc.advanced_shapeless_crafting(
			TFC.isp.of(outputItem).copyFood(),
			[parsedInputItem, '#c:tools/hammer'], inputItem) // [PORT] forge:tools/hammers -> c:tools/hammer
			.id(`tfg:crafting/${unfuckedOutput}_hammer`);
	}

	if (genShapelessMortarRecipe) {
		event.recipes.tfc.advanced_shapeless_crafting(
			TFC.isp.of(outputItem).copyFood(),
			[parsedInputItem, '#c:tools/mortar'], inputItem) // [PORT] forge:tools/mortars -> c:tools/mortar
			.id(`tfg:crafting/${unfuckedOutput}_mortar`);
	}
};

//#endregion
