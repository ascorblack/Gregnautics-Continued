// priority: 0
"use strict";

// [FIX 2026-07-21] Хвост аудита квестов (репорт stoic_nightingale + субагент):
// два ванильных предмета, требуемых квестами, были недостижимы в TFC-мире.
ServerEvents.recipes(event => {
	// Громоотвод: gtceu:shaped/lightning_rod удалён в gregtech.recipes.recycling.removes.js,
	// а ванильный рецепт требует minecraft:copper_ingot (в TFC-мире не выплавляется).
	// Квест tips__tools прямо описывает «3 медных стержня» — делаем так и есть.
	event.shaped('minecraft:lightning_rod', [
		'R',
		'R',
		'R'
	], {
		R: '#c:rods/copper'
	}).id('gregnautics:crafting/lightning_rod');

	// Седло: в ванилле не крафтится (только лут), в TFC-мире лут-источники скудны,
	// а квест tips__transportation его требует. Кожа + нить/пряжа + медное кольцо-стремя.
	event.shaped('minecraft:saddle', [
		'LLL',
		'SRS'
	], {
		L: '#c:leathers',
		S: ['#c:string', 'tfc:wool_yarn'],
		R: '#c:rings/copper'
	}).id('gregnautics:crafting/saddle');
});
