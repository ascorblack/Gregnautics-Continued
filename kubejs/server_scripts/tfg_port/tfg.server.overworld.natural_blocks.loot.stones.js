// priority: 10
"use strict";

// [PORT] Из TFG server_scripts/tfg/natural_blocks/loot.stones.js (1.20.1) на 1.21.1 NeoForge.
// [PORT] LootJS 2.x -> 3.7.0 (проверено по классам lootjs-neoforge-1.21.1-3.7.0.jar):
//  - LootJS.modifiers(event => ...) — событие осталось, но addBlockLootModifier -> addBlockModifier;
//  - ItemFilter.ALWAYS_TRUE -> ItemFilter.ANY;
//  - addWeightedLoot удалён -> .pool(pool => { pool.rolls(...); pool.addEntry(LootEntry.of(x).withWeight(n)) });
//  - addSequenceLoot / addLoot / removeLoot / matchMainHand — существуют без изменений.
// [PORT] forge:tools/hammers -> c:tools/hammer.
// [PORT] Незарегистрированный tfg:-контент (Ф4/Ф5) отфильтровывается через BuiltInRegistries-гварды.

const $LootBuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const $LootResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
const $UniformGenerator = Java.loadClass('net.minecraft.world.level.storage.loot.providers.number.UniformGenerator')

/** Тихая проверка существования предмета (без warning'ов в логе). */
function lootItemExists(id) {
	try {
		return $LootBuiltInRegistries.ITEM.containsKey($LootResourceLocation.parse(String(id).replace(/^\d+x\s+/, '')))
	} catch (e) {
		return false
	}
}

/** Тихая проверка существования блока. */
function lootBlockExists(id) {
	try {
		return $LootBuiltInRegistries.BLOCK.containsKey($LootResourceLocation.parse(String(id)))
	} catch (e) {
		return false
	}
}

LootJS.modifiers(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.overworld natural_blocks loot.stones start')

	// Rock to cobble, cobble to gravel
	for (let [rockId, rock] of Object.entries(global.BIG_ROCK_TABLE)) {
		if (rock.raw != null && rock.cobble != null && lootBlockExists(rock.raw.block) && lootItemExists(rock.cobble.block)) {
			event.addBlockModifier(rock.raw.block) // [PORT] addBlockLootModifier -> addBlockModifier
				.matchMainHand('#c:tools/hammer') // [PORT] forge:tools/hammers -> c:tools/hammer
				.removeLoot(ItemFilter.ANY) // [PORT] ALWAYS_TRUE -> ANY
				.addLoot(rock.cobble.block)
		}

		if (rock.hardened != null && rock.cobble != null && lootBlockExists(rock.hardened)) {
			if (rock.loose != null && lootItemExists(rock.loose)) {
				event.addBlockModifier(rock.hardened)
					.removeLoot(ItemFilter.ANY)
					.pool(pool => { // [PORT] addWeightedLoot([1, 4], [entry]) -> pool c rolls uniform(1, 4)
						pool.rolls([1, 4]) // [PORT-FIX] LootJS 3.x: rolls принимает [min,max], не ванильный UniformGenerator
						pool.addEntry(LootEntry.of(rock.loose))
					})
			}

			if (lootItemExists(rock.cobble.block)) {
				event.addBlockModifier(rock.hardened)
					.matchMainHand('#c:tools/hammer')
					.removeLoot(ItemFilter.ANY)
					.addLoot(rock.cobble.block)
			}
		}

		if (rock.cobble != null && lootBlockExists(rock.cobble.block)) {
			event.addBlockModifier(rock.cobble.block)
				.removeLoot(ItemFilter.ANY)
				.addLoot(rock.cobble.block)
		}

		if (rock.gravel != null && lootBlockExists(rock.gravel)) {
			// Add normal gravel loot to non-tfc gravel blocks
			if (!rock.gravel.startsWith('tfc:')) {
				event.addBlockModifier(rock.gravel)
					.removeLoot(ItemFilter.ANY)
					.pool(pool => { // [PORT] addWeightedLoot([...withChance]) -> pool c weighted-записями
						pool.addEntry(LootEntry.of('minecraft:flint').withWeight(10))
						pool.addEntry(LootEntry.of(rock.gravel).withWeight(90))
					})
			}

			// Add gravel -> sand crushing
			if (rock.gravelTag != null && rock.gravelTag.startsWith('tfc:')) {
				let match = /^tfc:(.+)_gravel$/gm.exec(rock.gravelTag);
				if (match && lootItemExists(`tfc:sand/${match[1]}`)) {
					event.addBlockModifier(rock.gravel)
						.matchMainHand('#c:tools/hammer')
						.removeLoot(ItemFilter.ANY)
						.addLoot(`tfc:sand/${match[1]}`)
				}

			}
			// the non-tfc sands are handled via global.HAMMERING
		}

		if (rock.cobble != null && rock.gravel != null && lootBlockExists(rock.cobble.block) && lootItemExists(rock.gravel)) {
			event.addBlockModifier(rock.cobble.block)
				.matchMainHand('#c:tools/hammer')
				.removeLoot(ItemFilter.ANY)
				.addLoot(rock.gravel)

			if (rock.cobble.mossy != null && lootBlockExists(rock.cobble.mossy.block)) {
				event.addBlockModifier(rock.cobble.mossy.block)
					.matchMainHand('#c:tools/hammer')
					.removeLoot(ItemFilter.ANY)
					.addLoot(rock.gravel)
			}
		}
	}

	global.HAMMERING.forEach(x => {
		if (!lootItemExists(x.hammered)) return; // [PORT-Ф4-TODO] выход не зарегистрирован (fluorapatite-пески и т.п.)

		if (x.raw.startsWith('#')) {
			let tag_array = [];
			try {
				// [PORT-FIX] NeoForge подставляет minecraft:barrier вместо пустого/несуществующего тега — вычищаем
				tag_array = Ingredient.of(x.raw).itemIds.toArray().map(String)
					.filter(item => item !== 'minecraft:barrier' && item !== 'minecraft:air' && lootBlockExists(item));
			} catch (e) {
				console.warn(`[Gregnautics][PORT-CHECK] loot.stones: не удалось развернуть тег ${x.raw}: ${e}`)
			}
			tag_array.forEach(item => {
				event.addBlockModifier(item)
					.matchMainHand('#c:tools/hammer')
					.removeLoot(ItemFilter.ANY)
					.addLoot(x.hammered)
			})
		}
		else if (lootBlockExists(x.raw)) {
			event.addBlockModifier(x.raw)
				.matchMainHand('#c:tools/hammer')
				.removeLoot(ItemFilter.ANY)
				.addLoot(x.hammered)
		}
	})

	// Other rocks
	if (lootItemExists('tfg:rock/cobble_blackstone')) { // [PORT-Ф4-TODO] блок blackstone-кобла из TFG-Core
		event.addBlockModifier('minecraft:gilded_blackstone')
			.matchMainHand('#c:tools/hammer')
			.removeLoot(ItemFilter.ANY)
			.addSequenceLoot(
				LootEntry.of('tfg:rock/cobble_blackstone'),
				LootEntry.of('tfc:powder/native_gold')
			)
	}

	// [PORT-Ф2] gtceu:poor_raw_salt / poor_raw_rock_salt — бедные руды из TFG-модификации материалов (Ф2);
	// [PORT-Ф4-TODO] сам блок tfg:halite не зарегистрирован — включится вместе с ним.
	if (lootBlockExists('tfg:halite')) {
		event.addBlockModifier('tfg:halite')
			.removeLoot(ItemFilter.ANY)
			.pool(pool => {
				if (lootItemExists('gtceu:poor_raw_salt')) {
					pool.addEntry(LootEntry.of('gtceu:poor_raw_salt').withWeight(40))
				}
				if (lootItemExists('gtceu:poor_raw_rock_salt')) {
					pool.addEntry(LootEntry.of('gtceu:poor_raw_rock_salt').withWeight(10))
				}
				pool.addEntry(LootEntry.of('tfc:powder/salt').withWeight(50))
			})
	}
})
