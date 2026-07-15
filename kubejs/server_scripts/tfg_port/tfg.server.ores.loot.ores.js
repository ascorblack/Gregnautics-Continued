// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/ores_and_materials/loot.ores.js (registerTFGOreLoots, LootJS 2.x).
// [PORT-Ф2] ФАЙЛ ПОЛНОСТЬЮ ЗАБЛОКИРОВАН Фазой 2 (апстрим-баг GTM8):
//   - TFGTagPrefix.budIndicator / richRawOre / poorRawOre не зарегистрированы (Java-мод TFG-Core);
//   - GT-материалы камней (global.BIG_ROCK_TABLE[*].material -> дасты пород) — Ф2-файлы
//     tfg.materials.rocks.js определены, но диспетчер отключён;
//   - greate отсутствует (GreateMaterials.RoseQuartz).
// [PORT] Дополнительно: LootJS 3.x (1.21) имеет ДРУГОЙ API (LootJS.modifiers ->
//   иные имена событий/методов, addWeightedLoot/LootEntry.of сверить с docs.lootjs.dev) —
//   при разблокировке Ф2 портировать тело заново по актуальному API, не раскомментировать вслепую.
// Взаимодействует с: gtceu:<порода>_<материал>_ore блоки УЖЕ регистрируются
//   (gregnautics_gtceu_tfc_worldgen.js + tfg.tag_prefixes.rocks.js), но их лут пока стоковый GT.

console.info('[Gregnautics] progress: tfg_port tfg.server.ores.loot.ores [PORT-Ф2] пропущен (см. шапку)')

//#region [PORT-Ф2] Оригинальный код (1.20.1, НЕ раскоммментировать без миграции API):
// // priority: 10
// "use strict";
//
// const registerTFGOreLoots = (event) => {
//
// 	// Go through all materials
// 	const $GreateMaterials = Java.loadClass("electrolyte.greate.registry.GreateMaterials")
//
// 	forEachMaterial(material => {
// 		if (material.hasProperty(PropertyKey.ORE)) {
// 			// Indicator buds
// 			if (material.hasProperty(PropertyKey.GEM)) {
// 				let bud = ChemicalHelper.get(TFGTagPrefix.budIndicator, material, 1).getItem().id;
//
// 				event.addBlockLootModifier(bud)
// 					.matchMainHand("tfc:gem_saw")
// 					.addLoot(ChemicalHelper.get(TagPrefix.gem, material, 1));
//
// 				event.addBlockLootModifier(bud)
// 					.not(n => n.matchMainHand("tfc:gem_saw"))
// 					.addLoot(ChemicalHelper.get(TagPrefix.gemChipped, material, 1));
// 			}
//
// 			// Special case for coals
// 			if (material === GTMaterials.Coal || material === GTMaterials.get('lignite') || material === GTMaterials.get('anthracite')) {
// 				let rawOreBlock = ChemicalHelper.get(TagPrefix.rawOreBlock, material, 1).getItem().id;
// 				let rawOre = ChemicalHelper.get(TagPrefix.gem, material, 1)
// 				event.addBlockLootModifier(rawOreBlock)
// 					.removeLoot(ItemFilter.ALWAYS_TRUE)
// 					.addWeightedLoot([4, 6], rawOre)
// 					.addLoot(LootEntry.of(ChemicalHelper.get(TagPrefix.dustTiny, GTMaterials.Coal, 1))
// 						.when(c => c.randomChance(0.2)));
//
// 				// Stone ores
// 				global.ORE_BEARING_STONES.forEach(stoneType => {
// 					let stoneTypeMaterial = GTMaterials.get(global.BIG_ROCK_TABLE[stoneType === "pyroxenite" ? "blackstone" : stoneType].material);
//
// 					let stoneTypeDust = ChemicalHelper.get(TagPrefix.dust, stoneTypeMaterial, 1)
//
// 					event.addBlockLootModifier(`gtceu:${stoneType}_${material.getName()}_ore`)
// 						.removeLoot(Ingredient.all)
// 						.addLoot(rawOre)
// 						.addLoot(LootEntry.of(stoneTypeDust)
// 							.when(c => c.randomChance(0.2)))
// 						.addLoot(LootEntry.of(ChemicalHelper.get(TagPrefix.dustTiny, GTMaterials.Coal, 1))
// 							.when(c => c.randomChance(0.05)));
// 				})
//
// 				return;
// 			}
//
// 			let richRawOre = ChemicalHelper.get(TFGTagPrefix.richRawOre, material, 1)
// 			let normalRawOre = ChemicalHelper.get(TagPrefix.rawOre, material, 1)
// 			let poorRawOre = ChemicalHelper.get(TFGTagPrefix.poorRawOre, material, 1)
// 			let tinyDustOre = ChemicalHelper.get(TagPrefix.dustTiny, material, 1)
//
// 			let rawOreBlock = ChemicalHelper.get(TagPrefix.rawOreBlock, material, 1).getItem().id;
// 			event.addBlockLootModifier(rawOreBlock)
// 				.removeLoot(ItemFilter.ALWAYS_TRUE)
// 				.addWeightedLoot([4, 6], [
// 					richRawOre.withChance(20),
// 					normalRawOre.withChance(60),
// 					poorRawOre.withChance(20)
// 				])
// 				.addLoot(LootEntry.of(tinyDustOre).when(c => c.randomChance(0.2)));
//
// 			// Stone ores
// 			global.ORE_BEARING_STONES.forEach(stoneType => {
//
// 				let stoneTypeMaterial = GTMaterials.get(global.BIG_ROCK_TABLE[stoneType === "pyroxenite" ? "blackstone" : stoneType].material);
//
// 				let stoneTypeDust = ChemicalHelper.get(TagPrefix.dust, stoneTypeMaterial, 1)
// 				let namespace = material === $GreateMaterials.RoseQuartz ? 'greate' : 'gtceu';
//
// 				event.addBlockLootModifier(`${namespace}:${stoneType}_${material.getName()}_ore`)
// 					.removeLoot(Ingredient.all)
// 					.addWeightedLoot([
// 						richRawOre.withChance(20),
// 						normalRawOre.withChance(60),
// 						poorRawOre.withChance(20)
// 					])
// 					.addLoot(LootEntry.of(stoneTypeDust).when(c => c.randomChance(0.2)))
// 					.addLoot(LootEntry.of(tinyDustOre).when(c => c.randomChance(0.05)));
// 			})
//
// 			// Sand ores
// 			global.SAND_COLORS.forEach(sandType => {
// 				event.addBlockLootModifier(`gtceu:${sandType}_sand_${material.getName()}_ore`)
// 					.removeLoot(Ingredient.all)
// 					.addWeightedLoot([
// 						richRawOre.withChance(20),
// 						normalRawOre.withChance(60),
// 						poorRawOre.withChance(20)
// 					])
// 					.addLoot(LootEntry.of(`tfc:sand/${sandType}`).when(c => c.randomChance(0.2)))
// 					.addLoot(LootEntry.of(tinyDustOre).when(c => c.randomChance(0.05)));
// 			})
// 		}
// 	})
// }
//#endregion
