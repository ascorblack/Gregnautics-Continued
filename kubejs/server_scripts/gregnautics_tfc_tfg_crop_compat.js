// priority: -10
"use strict";

// TFC 4.x recipes predate the TFG port's aggregate crop tags and hard-code
// native canola IDs. Limit replacements to those recipes so unrelated TFC
// progression remains untouched.
//
// [FIX 2026-07-18] Исходная версия (PR #5) делала event.replaceInput — но
// replaceInput/replaceOutput НЕ РАБОТАЮТ на кастомных типах рецептов
// (tfc:quern и т.п.): вызов проходит, JSON не меняется (проверено фактом —
// ingredient оставался "tfc:seeds/canola"). Лечение то же, что для
// наковальни в gregnautics_material_recipe_normalization.js: клонировать
// JSON рецепта с заменой и перерегистрировать под тем же id.
ServerEvents.recipes(event => {
	var swaps = [
		["tfc:quern/canola_paste", '{"item":"tfc:seeds/canola"}', '{"tag":"gregnautics:canola_seeds"}'],
		["tfc:crafting/straw_from_canola", '{"item":"tfc:canola"}', '{"tag":"gregnautics:canola_products"}']
	];
	swaps.forEach(spec => {
		event.forEachRecipe({ id: spec[0] }, recipe => {
			var raw = String(recipe.json);
			var replaced = raw.split(spec[1]).join(spec[2]);
			if (replaced === raw) {
				console.warn("[Gregnautics] crop_compat: в " + spec[0] + " не найден " + spec[1] + " — рецепт изменился апстримом?");
				return;
			}
			event.remove({ id: spec[0] });
			event.custom(JSON.parse(replaced)).id(spec[0]);
		});
	});
});
