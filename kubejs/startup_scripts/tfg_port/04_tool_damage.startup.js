// priority: -5
"use strict";

// [PORT-FIX 2026-07-17] Крафты с инструментом: в TFC 1.20 у инструментов был
// ГЛОБАЛЬНЫЙ crafting remainder (любой рецепт возвращал инструмент с уроном),
// поэтому оригинальный TFG спокойно писал plain shaped/shapeless с '#tools/...'.
// В TFC 4 (1.21) глобального remainder НЕТ — он переехал в данные конкретного
// рецепта. Итог в порте: нож/пила/стамеска/молот/ножницы СЪЕДАЛИСЬ крафтом.
// (GT-инструменты не страдали: у них свой stack-aware getCraftingRemainingItem.)
//
// Используем сериализаторы TFCHotOrNot (мод обязателен для прогрессии — щипцы):
//   tfchotornot:advanced_damage_inputs_(shaped|shapeless)_crafting
// Их getRemainingItems (проверено по байткоду) повторяет поведение TFC 1.20:
// КАЖДЫЙ повреждаемый предмет в сетке получает урон и остаётся, остальные идут
// через ванильный getCraftingRemainingItem (GT-инструменты тоже работают).
// В отличие от tfc:advanced_* не нужен primary_ingredient — рецепты с двумя
// инструментами (молот+пила) дамажат оба, как в оригинале.
//
// Оба типа наследуют кодек TFC (primary_ingredient/remainder — Optional, можно
// не указывать; result — ItemStackProvider, принимает плоский {id, count}).
//
// Хелперы — обёртки 1:1 над сигнатурами event.shapeless/event.shaped.
// Возвращают RecipeJS — .id() работает как раньше.

/** 'Nx thing' -> {n, rest}. */
global.TFGDamageParseCounted = function (s) {
	let m = String(s).trim().match(/^(\d+)\s*x\s+(.+)$/i);
	return m ? { n: parseInt(m[1]), rest: m[2] } : { n: 1, rest: String(s).trim() };
};

/** '#tag' / 'ns:item' -> JSON-ингредиент; массив -> массив вариантов; прочее как есть. */
global.TFGDamageIngredientJson = function (s) {
	if (Array.isArray(s)) return s.map(x => global.TFGDamageIngredientJson(x));
	if (typeof s !== 'string') return s;
	let str = String(s).trim();
	if (str.startsWith('#')) return { tag: str.substring(1) };
	return { item: str };
};

/** Результат: 'Nx id' -> {id, count}; не-строки как есть. */
global.TFGDamageResultJson = function (r) {
	if (typeof r !== 'string') return r;
	let p = global.TFGDamageParseCounted(r);
	return { id: p.rest, count: p.n };
};

/** Замена event.shapeless(result, ingredients) для рецептов с инструментом. */
global.TFGDamageShapeless = function (event, result, ingredients) {
	let ings = [];
	ingredients.forEach(i => {
		if (typeof i === 'string') {
			// kubejs-шорткат 'Nx item' в shapeless = N одинаковых ингредиентов
			let p = global.TFGDamageParseCounted(i);
			let j = global.TFGDamageIngredientJson(p.rest);
			for (let k = 0; k < p.n; k++) ings.push(j);
		} else {
			ings.push(global.TFGDamageIngredientJson(i));
		}
	});
	return event.custom({
		type: 'tfchotornot:advanced_damage_inputs_shapeless_crafting',
		ingredients: ings,
		result: global.TFGDamageResultJson(result)
	});
};

/** Замена event.shaped(result, pattern, key) для рецептов с инструментом. */
global.TFGDamageShaped = function (event, result, pattern, key) {
	let jsonKey = {};
	Object.keys(key).forEach(k => { jsonKey[k] = global.TFGDamageIngredientJson(key[k]); });
	return event.custom({
		type: 'tfchotornot:advanced_damage_inputs_shaped_crafting',
		pattern: pattern.map(r => String(r)),
		key: jsonKey,
		result: global.TFGDamageResultJson(result)
	});
};
