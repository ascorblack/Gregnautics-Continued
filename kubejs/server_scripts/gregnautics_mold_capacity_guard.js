// priority: 0
"use strict";

// [FIX 2026-07-20] Репорт с CurseForge (Romagek): «Copper saw blade mold never
// yields the blade» — молд заполняется до 100/100 mB, а casting-рецепт требует
// 144 mB → отливка никогда не завершается.
//
// Причина на стороне игрока: у него ёмкости молдов = дефолтные TFC (100 mB),
// хотя ВО ВСЕХ наших релизах config/tfc-server.toml задаёт 144 (GT-шкала:
// 1 слиток = 144 mB). Конфиг может «слететь» кучей способов (ручная правка,
// сброс NeoForge'ом, кривое обновление профиля CurseForge) — поэтому чинить
// надо не файлом, а самовосстановлением: на КАЖДОЙ загрузке сервера проверяем
// фактические значения конфига и принудительно ставим правильные.
// ConfigValue.set() применяется немедленно (ёмкость читается из supplier'а
// на лету). Проверено тестом: файл на диске при этом НЕ переписывается —
// лечение in-memory, срабатывает заново на каждой загрузке. Это ок: warn в
// логе каждый раз = видимый маркер, что у игрока конфиг битый.
//
// ВАЖНО (баг TFC 4.2.5, не трогать): поля moldFireIngotCapacity и
// moldBellCapacity зарегистрированы под ЧУЖИМИ ключами (дубликаты
// "moldIngotCapacity" и "moldScytheBladeCapacity" соответственно) — отдельных
// ключей у них нет, их НЕ проверяем: fire ingot наследует 144 от ingot,
// колокол — 144 от scythe. Совпадает с нашими рецептами (144) — по счастью.
ServerEvents.loaded(event => {
	try {
		let $TFCConfig = Java.loadClass('net.dries007.tfc.config.TFCConfig');
		let sv = $TFCConfig.SERVER;

		// ключ конфига -> требуемое значение (GT-шкала TFG: 144 mB/слиток)
		let required = {
			moldIngotCapacity: 144,
			moldPickaxeHeadCapacity: 144,
			moldPropickHeadCapacity: 144,
			moldAxeHeadCapacity: 144,
			moldShovelHeadCapacity: 144,
			moldHoeHeadCapacity: 144,
			moldChiselHeadCapacity: 144,
			moldHammerHeadCapacity: 144,
			moldSawBladeCapacity: 144,
			moldJavelinHeadCapacity: 144,
			moldSwordBladeCapacity: 288,
			moldMaceHeadCapacity: 288,
			moldKnifeBladeCapacity: 144,
			moldScytheBladeCapacity: 144
		};

		let $Integer = Java.loadClass('java.lang.Integer');
		let fixed = [];
		Object.keys(required).forEach(key => {
			// sv.<key> — record ServerValue[value=ModConfigSpec$IntValue].
			// ГРАБЛИ Rhino #1: value — аксессор record'а, его надо ВЫЗЫВАТЬ (value()),
			// как свойство (.value) он возвращает саму функцию.
			// ГРАБЛИ Rhino #2 (найдены тестом): cv.set(144) кладёт JS-число как
			// java.lang.Double → при чтении ёмкости ClassCastException
			// «Double cannot be cast to Integer». ТОЛЬКО Integer.valueOf!
			let cv = sv[key].value();
			let cur = cv.get();
			if (cur < required[key]) {
				cv.set($Integer.valueOf(required[key]));
				fixed.push(key + ': ' + cur + ' -> ' + required[key]);
			}
		});

		if (fixed.length > 0) {
			console.warn('[Gregnautics] Ёмкости молдов TFC были сброшены на дефолт — исправлено: ' + fixed.join(', '));
		} else {
			console.info('[Gregnautics] Ёмкости молдов TFC в норме (144/288 mB).');
		}
	} catch (e) {
		console.error('[Gregnautics] mold_capacity_guard упал: ' + e);
	}
});
