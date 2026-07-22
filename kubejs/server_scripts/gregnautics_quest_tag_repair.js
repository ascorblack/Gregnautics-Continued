// priority: -50
"use strict";

// [FIX 2026-07-22] Репорт user_72s4uwdtjmc7s9ex: ~20 квестов «требуют item filter»
// и не закрываются. Корень: item_tag-фильтры квестов ссылаются на теги 1.20-эры,
// которые в 1.21 существуют, но НЕ содержат нужных предметов:
//  - часть тегов — barrier-затычки из порта (tfc:soups, tfc:sweeteners,
//    tfc:bronze_anvils = [minecraft:barrier]);
//  - часть потеряла TFC-предметы при смене конвенций TFC 4 (tfc:foods без
//    tfc:food/*, tfc:knives/hammers без tfc:metal/*, foods/raw_meats без мяса).
// Фильтры при этом ПАРСЯТСЯ (проверено FilterParser.parse — 266/266), поэтому
// статический аудит «тег непустой» это не ловил. Урок: проверять ЧЛЕНСТВО
// эталонного предмета, а не только непустоту.
ServerEvents.tags("item", event => {
	// «любая еда»: вся еда TFC + всё, что кладут в c:foods/* (tfg-еда уже внутри)
	event.add("tfc:foods", "/^tfc:food\\/.+$/");

	// сырое мясо: конвенция TFC 4 — c:foods/raw_meat (ед. число)
	event.add("tfc:foods/raw_meats", "#c:foods/raw_meat");

	// супы: предметы tfc:food/*_soup
	event.add("tfc:soups", "/^tfc:food\\/[a-z_]*soup$/");

	// подсластители: конвенция TFC 4 — tfc:foods/sweeteners
	event.add("tfc:sweeteners", "#tfc:foods/sweeteners");

	// бронзовые наковальни (квест «T2 Anvil, Bronze»)
	event.add("tfc:bronze_anvils", "tfc:metal/anvil/bronze");
	event.add("tfc:bronze_anvils", "tfc:metal/anvil/bismuth_bronze");
	event.add("tfc:bronze_anvils", "tfc:metal/anvil/black_bronze");

	// ножи/молоты: вернуть TFC-инструменты (каменные + металлические)
	event.add("tfc:knives", "/^tfc:metal\\/knife\\/.+$/");
	event.add("tfc:knives", "/^tfc:stone\\/knife\\/.+$/");
	event.add("tfc:hammers", "/^tfc:metal\\/hammer\\/.+$/");
	event.add("tfc:hammers", "/^tfc:stone\\/hammer\\/.+$/");
});
