// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/loot.js -> LootJS 3.x (1.21.1), по образцу tfc.loot.js:
//  - addBlockLootModifier -> addBlockModifier, addEntityLootModifier -> addEntityModifier
//  - Ingredient.all -> ItemFilter.ANY
//  - addWeightedLoot([a,b], [item]) -> addLoot(LootEntry.of(item, [a,b])) (все списки были из 1 предмета)
//  - pool.addAlternativesLoot(...) -> pool.addEntry(LootEntry.alternative(...))
//  - customCondition({...}) -> matchCustomCondition(json)
// [PORT] #forge:tools/butchery_knives -> #c:tools/butchery_knife (GTM8: c:tools/* в единственном числе).
// [PORT] chalk, everycomp отсутствуют в сборке — их лут вырезан.
// [PORT-FIX] Животные TFG (bison, leopard_seal, mongoose, lemming, jerboa) в TFC 1.21 стали
// нативными (tfc:*) и имеют собственные лут-таблицы — «нормальные» модификаторы не портируются
// (дублировали бы дроп), оставлены только бонусы за нож мясника.

const $TfgLootBuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
const $TfgLootResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation');

/** Тихая проверка существования предмета — не создаёт warning'ов в логе. */
function tfgLootItemExists(id) {
	try {
		return $TfgLootBuiltInRegistries.ITEM.containsKey($TfgLootResourceLocation.parse(id));
	} catch (e) {
		return false;
	}
}

function tfgLootBlockExists(id) {
	try {
		return $TfgLootBuiltInRegistries.BLOCK.containsKey($TfgLootResourceLocation.parse(id));
	} catch (e) {
		return false;
	}
}

LootJS.modifiers(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.core loot modifiers start');

	const BUTCHERY_KNIFE = ItemFilter.tag('c:tools/butchery_knife'); // [PORT] было '#forge:tools/butchery_knives'

	/** Запись «предмет с шансом» с фильтрацией по реестру (Ф2/Ф4-контент включится сам). */
	const chanced = (list, id, chance) => {
		if (tfgLootItemExists(id)) list.push(LootEntry.of(id).when(c => c.randomChance(chance)));
	};

	//#region Vase Loot
	global.MINECRAFT_DYE_NAMES.forEach(color => {
		//ore
		let oreEntries = [];
		chanced(oreEntries, 'tfc:ore/normal_bismuthinite', 0.1);
		chanced(oreEntries, 'tfc:ore/rich_bismuthinite', 0.2);

		chanced(oreEntries, 'tfc:ore/normal_native_copper', 0.1);
		chanced(oreEntries, 'tfc:ore/rich_native_copper', 0.2);

		chanced(oreEntries, 'tfc:ore/normal_sphalerite', 0.1);
		chanced(oreEntries, 'tfc:ore/rich_sphalerite', 0.2);

		chanced(oreEntries, 'tfc:ore/normal_cassiterite', 0.1);
		chanced(oreEntries, 'tfc:ore/rich_cassiterite', 0.2);

		chanced(oreEntries, 'tfc:ore/normal_native_gold', 0.1);
		chanced(oreEntries, 'tfc:ore/rich_native_gold', 0.2);

		chanced(oreEntries, 'tfc:ore/normal_native_silver', 0.1);
		chanced(oreEntries, 'tfc:ore/rich_native_silver', 0.2);

		chanced(oreEntries, 'tfc:ore/normal_hematite', 0.1);
		chanced(oreEntries, 'tfc:ore/rich_hematite', 0.2);

		// [PORT-Ф2] gtceu:rich_raw_* — «богатые» сырые руды TFG-обработки, появятся после Ф2 (фильтр по реестру)
		chanced(oreEntries, 'gtceu:rich_raw_rock_salt', 0.1);
		chanced(oreEntries, 'gtceu:rich_raw_salt', 0.1);
		chanced(oreEntries, 'gtceu:rich_raw_saltpeter', 0.1);

		//seeds
		let seedEntries = [];
		chanced(seedEntries, 'tfc:seeds/onion', 0.2);
		chanced(seedEntries, 'tfc:seeds/cabbage', 0.2);
		chanced(seedEntries, 'tfc:seeds/potato', 0.2);
		chanced(seedEntries, 'tfc:seeds/jute', 0.1);
		chanced(seedEntries, 'tfc:seeds/sugarcane', 0.1);
		chanced(seedEntries, 'firmalife:plant/pineapple_bush', 0.1);
		chanced(seedEntries, 'tfc:plant/peach_sapling', 0.1);
		chanced(seedEntries, 'tfc:plant/red_apple_sapling', 0.1);

		//loot
		let lootEntries = [];
		chanced(lootEntries, 'tfc:wool_yarn', 0.1);
		chanced(lootEntries, 'tfc:blubber', 0.1);
		chanced(lootEntries, 'minecraft:bone', 0.1);
		chanced(lootEntries, 'tfc:kaolin_clay', 0.1);
		chanced(lootEntries, 'tfc:glue', 0.1);
		chanced(lootEntries, 'tfc:burlap_cloth', 0.1);
		chanced(lootEntries, 'tfc:wool_cloth', 0.1);
		chanced(lootEntries, 'tfc:mortar', 0.1);
		chanced(lootEntries, 'minecraft:leather', 0.1);
		// [PORT] chalk отсутствует — black/red/white_chalk вырезаны
		chanced(lootEntries, 'minecraft:goat_horn', 0.1);
		// [PORT-Ф4-TODO] таблетки tfg:* ещё не зарегистрированы — фильтр по реестру
		chanced(lootEntries, 'tfg:regeneration_pill', 0.1);
		chanced(lootEntries, 'tfg:water_breathing_pill', 0.1);
		chanced(lootEntries, 'tfg:night_vision_pill', 0.1);
		chanced(lootEntries, 'tfg:haste_pill', 0.1);
		chanced(lootEntries, 'tfc:small_raw_hide', 0.1);
		chanced(lootEntries, 'tfc:medium_raw_hide', 0.1);
		chanced(lootEntries, 'tfc:large_raw_hide', 0.1);
		chanced(lootEntries, 'firmalife:beeswax', 0.1);
		// [PORT-Ф2] у BismuthBronze в GTM8 нет tool property — головы инструментов появятся после Ф2/Ф3
		chanced(lootEntries, 'gtceu:bismuth_bronze_pickaxe_head', 0.1);
		chanced(lootEntries, 'gtceu:bismuth_bronze_axe_head', 0.1);
		chanced(lootEntries, 'gtceu:bismuth_bronze_shovel_head', 0.1);
		chanced(lootEntries, 'gtceu:bismuth_bronze_knife_head', 0.1);

		event.addBlockModifier(`tfg:decorative_vase/generated/${color}`)
			.removeLoot(ItemFilter.ANY)
			//ore
			.pool((pool) => {
				pool.rolls([2, 4]);
				pool.addEntry(LootEntry.alternative(oreEntries)); // [PORT] addAlternativesLoot -> addEntry(LootEntry.alternative(...))
			})
			//seeds
			.pool((pool) => {
				pool.rolls([2, 4]);
				pool.addEntry(LootEntry.alternative(seedEntries));
			})
			//loot
			.pool((pool) => {
				pool.rolls([0, 3]);
				pool.addEntry(LootEntry.alternative(lootEntries));
			});
	});
	//#endregion

	//#region Blocks

	event.addBlockModifier('minecraft:campfire')
		.removeLoot(ItemFilter.ANY)
		.addLoot('minecraft:campfire');

	// [PORT-Ф4-TODO] tfg:large_nest_box / tfg:large_nest_box_warped не зарегистрированы —
	// фильтр по реестру, включатся автоматически после Ф4
	const LARGE_NESTS = [
		'tfg:large_nest_box',
		'tfg:large_nest_box_warped'
	];
	LARGE_NESTS.forEach(nest => {
		if (!tfgLootBlockExists(nest)) return;
		event.addBlockModifier(`${nest}`)
			.removeLoot(`${nest}`)
			// [PORT] customCondition({...}) -> matchCustomCondition(json), порядок полей — как в кодеке условия
			.matchCustomCondition({
				condition: 'minecraft:block_state_property',
				block: `${nest}`,
				properties: {
					nest_part: '0'
				}
			})
			.addLoot(`${nest}`);
	});

	// [PORT-Ф4-TODO] асфальтовые дороги ещё не зарегистрированы — фильтр по реестру
	const ASPHALT_ROAD_BLOCKS = [
		'tfg:asphalt_road',
		'tfg:asphalt_road_hot',
		'tfg:asphalt_road_slab',
		'tfg:asphalt_road_stairs'
	];
	ASPHALT_ROAD_BLOCKS.forEach(block => {
		if (!tfgLootBlockExists(block) || !tfgLootItemExists('tfg:asphalt_rubble')) return;
		event.addBlockModifier(block)
			.removeLoot(ItemFilter.ANY)
			.addLoot('tfg:asphalt_rubble');
	});

	//#endregion

	//Cross-mod glass compat
	// [PORT] everycomp отсутствует — записи everycomp:c/* вырезаны (и STRONG_GLASSES, и циклы
	// TFC_WOOD_TYPES/AFC_WOOD_TYPES/AD_ASTRA_WOOD/WAB_WOOD с оконными панелями)
	const STRONG_GLASSES = [
		['create:dark_oak_window', true],
		['create:mangrove_window', true],
		['create:ornate_iron_window', true],
		['create:industrial_iron_window', true],
		['create:weathered_iron_window', true],
		['create:cherry_window', true],
		['create:bamboo_window', true],
		['createdeco:andesite_window', true],
		['createdeco:copper_window', true],
		['createdeco:iron_window', true],
		['createdeco:industrial_iron_window', true],
		['createdeco:brass_window', true],
		['createdeco:zinc_window', true]
	];
	const GLASSES = [
		'create:framed_glass',
		'create:vertical_framed_glass',
		'create:horizontal_framed_glass',
		'create:tiled_glass'
	];

	STRONG_GLASSES.forEach(glass => {
		event.addBlockModifier(glass[0])
			.addLoot(glass[0]);
		if (glass[1]) {
			event.addBlockModifier(`${glass[0]}_pane`)
				.addLoot(`${glass[0]}_pane`);
		}
	});

	GLASSES.forEach(glass => {
		event.addBlockModifier(glass)
			.matchMainHand('tfc:gem_saw') // [PORT] Item.of(...) -> ItemFilter из строки
			.addLoot(glass);
		event.addBlockModifier(`${glass}_pane`)
			.matchMainHand('tfc:gem_saw')
			.addLoot(`${glass}_pane`);
	});

	// Bonus animal drops with butchery knives

	// [PORT-Ф10] tfg:glacian_ram, tfg:moon_rabbit, tfg:wraptor — космическая фауна, вернётся с Ф10
	// [PORT-Ф4-TODO] tfg:sniffer (замена ваниллы с мясом raw_sniffer_beef) — сущность и еда не портированы

	// Leopard seal: [PORT-FIX] tfg:leopard_seal -> tfc:leopard_seal (нативный зверь TFC 1.21,
	// «нормальная» таблица уже есть у TFC — портирован только бонус за нож мясника)
	event.addEntityModifier('tfc:leopard_seal')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:blubber', [1, 3]));

	// Bison: [PORT-FIX] tfg:bison -> tfc:bison, tfg:food/raw_bison_meat -> tfc:food/bison
	// (нативный зверь TFC 1.21 со своей таблицей — портирован только бонус за нож мясника)
	event.addEntityModifier('tfc:bison')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/bison', [4, 6]))
		.addLoot(LootEntry.of('tfc:blubber', [0, 1]));

	// [PORT-FIX] tfg:lemming / tfg:jerboa / tfg:mongoose — нативные звери TFC 1.21 со своими
	// лут-таблицами, «нормальные» модификаторы (кость + мелкая шкура) не портируются во избежание дублей.

	// [PORT] tfg:fox: в 1.21 сущности нет; лут лисы (tfc:fox) уже покрыт tfc.loot.js
	// (обычный дроп + бонус за нож мясника) — не дублируем.
});
