// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/recipes.js (registerTFGRecipes).
// Исходный файл — чистый диспетчер: вызывал ~60 функций register*(event) из соседних файлов.
// В порте на KubeJS 7 диспетчер убран: каждый портированный файл регистрирует
// свой ServerEvents.recipes(...) самостоятельно. Рецептов здесь нет.
//
// Замечания о порядке из оригинала (важно при порте соответствующих файлов):
//  - «Greenhouse needs to register before pisciculture» — registerTFGGreenhouseRecipes
//    должен отработать раньше registerTFGPiscicultureRecipes. Если оба окажутся в разных
//    файлах, обеспечить порядок через // priority: у файлов.
//  - registerTFGMaterialRecipes шёл первым, registerTFGSlimeRecipes — последним.
//
// Соответствие уже портированных вызовов:
//  - registerTFGMiscellaneousRecipes -> tfg.server.recipes.miscellaneous.js
//  - registerTFGTemporaryRecipes     -> tfg.server.recipes.temporary.js
// Остальные register* портируются по своим исходным файлам (tfg/food, tfg/machines, ...).
