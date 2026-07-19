// priority: 0
"use strict";

// [FIX 2026-07-18] Репорт с CurseForge: «the flint hatchet don't work as a axe».
//
// htm:hatchet (HardRock Tools & Materials) — класс `HatchetItem extends Item`:
// скорость копания сделана через getDestroySpeed, но isCorrectToolForDrops НЕ
// переопределён и tool-компонента нет. Все брёвна TFC требуют правильный
// инструмент (requiresCorrectToolForDrops=true) → топорик рубил дерево БЕЗ ДРОПА.
// Проверено на сервере: drops=false, AXE_DIG=false.
//
// Лечим дефолтный data-компонент minecraft:tool — в 1.21.1 именно он решает
// isCorrectToolForDrops и скорость. Скорость 4.0 — уровень каменного топора TFC.
// ItemAbilities (strip/scrape) так не появятся (зашиты в класс AxeItem), но
// рубка деревьев с дропом работает — это и есть суть репорта.
//
// ГРАБЛИ (найдены по краху сервера, НЕ повторять):
//  - kjs$override / override → "Cannot find function" (ремап на record не работает);
//  - item.set(type, new Tool(Rule.minesAndDrops(holderSet, 4.0), ...)) → Rhino
//    выбирает перегрузку minesAndDrops(List<Block>,float) и падает на конверсии.
// Правильный путь: item.set(type, JSON) — KubeJS прогоняет значение через КОДЕК
// компонента, поэтому формат tот же, что в датапаках.

ItemEvents.modification(event => {
	const $DataComponents = Java.loadClass("net.minecraft.core.component.DataComponents");

	event.modify("htm:hatchet", item => {
		// Ключи — ИМЕНА ПОЛЕЙ record'а Tool/Tool.Rule (camelCase), НЕ ключи кодека:
		// kubejs set() собирает объект по полям, correct_for_drops молча терялся
		// (correctForDrops=Optional.empty -> drops=false). Тот же класс граблей,
		// что с данными еды TFC (см. HANDOFF про camelCase).
		item.set($DataComponents.TOOL, {
			rules: [
				{
					blocks: "#minecraft:mineable/axe",
					speed: 4.0,
					correctForDrops: true
				}
			],
			defaultMiningSpeed: 1.0,
			damagePerBlock: 1
		});
	});
});
