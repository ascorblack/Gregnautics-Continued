// priority: -10
"use strict";

// [FIX 2026-07-20] Репорт с CF: «Many recipes are missing, like ore crushing
// ... Or crusher recipes from the Create mod».
//
// В TFG 1.20 колёса дробления (Create/Greate) умели весь рудный процессинг,
// потому что мод Greate АВТОМАТИЧЕСКИ зеркалил рецепты GT-макератора в
// create:crushing (greate:crushing/integration/gtceu/macerator/*). На 1.21
// Greate нет — середину цепочки закрыл gregnautics_gtceu_bulk_washing.js
// (crushed->impure, purified->pure, refined->dust), а ВХОД (raw ore -> crushed)
// остался только у макератора/молота. Итог: сырую руду нельзя было дробить
// колёсами вообще.
//
// Лечим тем же способом, что Greate: зеркалим стоковые GT-рецепты
// gtceu:macerator/macerate_raw_*_ore_to_crushed_ore в create:crushing 1:1
// (вход-тег, выходы и шансы — из JSON рецепта; шанс GT в десятитысячных ->
// у Create дробь). forEachRecipe видит стоковые рецепты GT (проверено зондом);
// наши kubejs-генерации он НЕ видит — для TFC-руд зеркало добавлено прямо в
// генераторы gregnautics_gtceu_tfc_material_compat.js.
ServerEvents.recipes(event => {
	let mirrored = 0;
	event.forEachRecipe({ type: "gtceu:macerator" }, r => {
		let id = String(r.getId());
		let m = id.match(/^gtceu:macerator\/macerate_raw_(.+)_ore_to_crushed_ore$/);
		if (m === null) return;
		try {
			let j = JSON.parse(String(r.json));
			let inputs = j.inputs["gtceu:item"];
			let outputs = j.outputs["gtceu:item"];
			if (!inputs || !outputs || inputs.length !== 1) return;
			let ing = inputs[0].content.ingredient;
			let results = [];
			for (let k = 0; k < outputs.length; k++) {
				let o = outputs[k];
				let ingr = o.content.ingredient;
				if (!ingr.item) continue; // выход-тег в create:crushing не выразить
				let res = { id: ingr.item, count: o.content.count || 1 };
				if (o.chance !== undefined && o.chance !== null && o.chance < 10000) {
					res.chance = o.chance / 10000.0;
				}
				results.push(res);
			}
			if (results.length === 0) return;
			event.custom({
				type: "create:crushing",
				ingredients: [ing],
				results: results,
				processing_time: 250
			}).id(`gregnautics:create/crushing/raw_ore/${m[1]}`);
			mirrored++;
		} catch (e) {
			console.warn("[Gregnautics] crushing-зеркало не осилило " + id + ": " + e);
		}
	});
	console.info("[Gregnautics] create:crushing зеркало raw ore -> crushed: " + mirrored + " рецептов.");
});
