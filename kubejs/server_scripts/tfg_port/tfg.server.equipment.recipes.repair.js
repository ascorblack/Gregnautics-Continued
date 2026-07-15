// priority: 0
"use strict";

// [PORT] Заглушка порта tfg/equipment/recipes.repair.js из TerraFirmaGreg-Modern (1.20.1).
// [PORT-Ф4-TODO] ВЕСЬ ФАЙЛ НЕ ПОРТИРОВАН (см. оригинал: orig_kubejs/overrides/kubejs/server_scripts/tfg/equipment/recipes.repair.js):
//  1. Тип рецептов 'tfg:item_repair' — кастомный сериализатор Java-мода TFG-Core; мода нет в сборке 1.21.1,
//     event.custom({type:'tfg:item_repair', ...}) дал бы нерабочие/ошибочные рецепты. Нужна замена
//     (свой сериализатор или datapack-механика починки).
//  2. Предметы gtceu:repair_kit_* / tfg:unfired_repair_kit_* — кастомный TagPrefix (TFGTagPrefix.repairKit /
//     unfiredRepairKit) Java-мода TFG; в GTM8-порте префиксы не зарегистрированы, предметов нет
//     (проверено по exported/registries/items.json).
//  3. Java-биндинги TFGTagPrefix / TFGPropertyKey отсутствуют (генерация киттов через forEachMaterial).
//  4. Часть целей починки — отсутствующие моды: grapplemod, constructionwand, sns, tfcambiental,
//     tfc_textile, tfcscraping, hangglider, ad_astra ([PORT-Ф10]).
// Портировать после появления механики item_repair и предметов repair kit (Ф4).

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.equipment recipes.repair start (stub, not ported — Ф4-TODO)')
})
