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

	// [FIX 2026-07-22] Репорт Romagek: tfc:powder/graphite был БЕЗ продюсеров (минеральный
	// компат заменил кверн-рецепты графита на GT-пыль), а fire clay (-> crucible!) требует
	// именно tfc:powder/graphite x4. Конвертация 1:1 из GT-пыли (добывается из deep-веинов).
	event.shapeless('tfc:powder/graphite', ['gtceu:graphite_dust'])
		.id('gregnautics:crafting/graphite_powder_from_dust');
	event.shapeless('gtceu:graphite_dust', ['tfc:powder/graphite'])
		.id('gregnautics:crafting/graphite_dust_from_powder');
});
