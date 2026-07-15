// priority: 10
"use strict";

// [PORT-Ф4-ЧАСТИЧНО] Теги, которые в 1.20 поставлял мод TFG-Core (данными), а Ф6-скрипты
// используют уже сейчас. Полный набор TFG-Core-тегов приедет с Ф4 — тогда сверить и слить.
// Имя с 00_ — файл должен грузиться раньше остальных tfg_port-тегов.

ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port compat item tags start');

	// Create-детали: в TFG тегами forge:shafts/cogwheels пользуется куча рецептов
	// (create.recipes.js, createaddition, create_connected)
	event.add('c:shafts', 'create:shaft');
	event.add('c:cogwheels', 'create:cogwheel');
	event.add('c:large_cogwheels', 'create:large_cogwheel');

	// Агрегаты «любая бронза» (TFG-Core: bronze + bismuth_bronze + black_bronze)
	event.add('c:rods/any_bronze', '#c:rods/bronze');
	event.add('c:rods/any_bronze', '#c:rods/bismuth_bronze');
	event.add('c:rods/any_bronze', '#c:rods/black_bronze');
	event.add('c:screws/any_bronze', '#c:screws/bronze');
	event.add('c:screws/any_bronze', '#c:screws/bismuth_bronze');
	event.add('c:screws/any_bronze', '#c:screws/black_bronze');
	event.add('c:plates/any_bronze', '#c:plates/bronze');
	event.add('c:plates/any_bronze', '#c:plates/bismuth_bronze');
	event.add('c:plates/any_bronze', '#c:plates/black_bronze');

	// [PORT-FIX] Кейсинги теплиц (в TFG 1.20 — tags.aquaponics.js): тег наполнялся стеной теплицы своего тира.
	// Предметы firmalife:*_greenhouse_wall есть в Firmalife-NeoForge-1.21.1-3.0.11 (используется firmalife.recipes.js, порты теплиц)
	event.add('tfg:treated_wood_greenhouse_casings', 'firmalife:treated_wood_greenhouse_wall');
	event.add('tfg:copper_greenhouse_casings', 'firmalife:copper_greenhouse_wall');
	event.add('tfg:iron_greenhouse_casings', 'firmalife:iron_greenhouse_wall');
	event.add('tfg:stainless_steel_greenhouse_casings', 'firmalife:stainless_steel_greenhouse_wall');
	event.add('tfg:all_greenhouse_casings', '#tfg:treated_wood_greenhouse_casings');
	event.add('tfg:all_greenhouse_casings', '#tfg:copper_greenhouse_casings');
	event.add('tfg:all_greenhouse_casings', '#tfg:iron_greenhouse_casings');
	event.add('tfg:all_greenhouse_casings', '#tfg:stainless_steel_greenhouse_casings');

	// [PORT-FIX] Рельсовые пруты (TFG tfg/tags.js:162) — нужны railways.recipes.js;
	// пустой тег валит create:deploying при сериализации.
	event.add('tfg:track_rods', '#c:rods/long/wrought_iron');
	event.add('tfg:track_rods', '#c:rods/steel');

	// [PORT-FIX] Тег tfc:mortar в TFC 1.21 не поставляется (сам предмет tfc:mortar есть) —
	// его используют треки railways и др.
	event.add('tfc:mortar', 'tfc:mortar');

	// [PORT-FIX] Логи TFG-деревьев (Ф4): собственные tfg:wood/log/* не зарегистрированы,
	// но AFC 2.1.1 поставляет те же породы (afc:wood/log/araucaria|mahoe|beech + теги afc:*_logs) —
	// алиасим tfg:*_logs на них, иначе пустой тег валит shapeless-рецепты supports в recipes.wood.js
	event.add('tfg:araucaria_logs', '#afc:araucaria_logs');
	event.add('tfg:mahoe_logs', '#afc:mahoe_logs');
	event.add('tfg:beech_logs', '#afc:beech_logs');
});

ServerEvents.tags('fluid', event => {
	console.info('[Gregnautics] progress: tfg_port compat fluid tags start');

	// TFG-Core: «чистая вода» для рецептов (губка, fluix, firmalife, rnr)
	event.add('tfg:clean_water', 'minecraft:water');
	event.add('tfg:clean_water', 'minecraft:flowing_water');
	event.add('tfg:clean_water', 'tfc:river_water');
});
