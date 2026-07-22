// priority: 0
"use strict";

// [PORT] Портировано из tfc/recipes.removes.js (TerraFirmaGreg-Modern 1.20.1 -> 1.21.1)
// [PORT] removeTFCRecipes(event) вызывался из tfc/recipes.js -> прямой обработчик ServerEvents.recipes (KubeJS 7)
// [PORT-FIX] TFC 4.2.5 перенёс id рецептов кверна руды (tfc:quern/<grade>_<ore> -> tfc:quern/powder/<ore>_<grade>)
// [PORT-FIX] и теста (tfc:crafting/dough/* -> tfc:crafting/food/*) — id обновлены по data/tfc/recipe в jar

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfc.recipes.removes start')

	// [FIX 2026-07-22] УДАЛЁН blanket-remove всех tfc:welding (наследие TFG 1.20, где
	// double ingots давал GregTech). В GTM8 GT-двойных слитков НЕТ, канон — TFC, и без
	// ванильной сварки нельзя сварить НИ ОДИН double ingot -> нет металлических наковален
	// -> прогрессия заблокирована (репорты OAnimalVelho/stoic_nightingale: «welding of double
	// ingots», «stone anvil doesn't work»). Точечные замены TFG (high carbon стали и т.п.)
	// переопределяют ваниль по тем же id и в blanket-remove не нуждаются.
	event.remove({ id: /tfc:heating\/metal\/.*/ })
	event.remove({ id: /tfc:heating\/ore\/.*/ })

	global.TFC_METALS.forEach(metal => {
		event.remove({ id: `tfc:crafting/metal/block/${metal}` })
		event.remove({ id: `tfc:crafting/metal/block/${metal}_stairs` })
		event.remove({ id: `tfc:crafting/metal/block/${metal}_slab` })
	})

	// #region Reliable recipe remover doesn't work with the quern
	// [PORT-FIX] TFC 4.2.5: id кверна руды теперь tfc:quern/powder/<ore>_<grade> — список свёрнут в цикл
	const QUERN_ORES = [
		'bismuthinite',
		'cassiterite',
		'garnierite',
		'hematite',
		'limonite',
		'magnetite',
		'malachite',
		'native_copper',
		'native_gold',
		'native_silver',
		'sphalerite',
		'tetrahedrite'
	];
	const QUERN_GRADES = ['small', 'normal', 'poor', 'rich'];
	QUERN_ORES.forEach(ore => {
		QUERN_GRADES.forEach(grade => {
			event.remove({ id: `tfc:quern/powder/${ore}_${grade}` })
		})
	})
	//#endregion

	global.TFC_DOUGHS.forEach(dough => {
		for (let i = 1; i <= 8; i++) {
			event.remove({ id: `tfc:crafting/food/${dough}_dough_${i}` }) // [PORT-FIX] TFC 4.2.5: crafting/dough/ -> crafting/food/
		}
	})
})
