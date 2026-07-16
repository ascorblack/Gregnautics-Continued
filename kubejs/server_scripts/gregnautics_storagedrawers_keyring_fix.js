// priority: 100
"use strict";

// [PORT-FIX 2026-07-16] Убираем рецепт storagedrawers:keyring — он крашит КЛИЕНТ
// при входе на выделенный сервер.
//
// Причина (StorageDrawers 13.11.4, KeyringRecipe.java:24):
//   Ingredient.of(ModItems.getKeys().map(i -> new ItemStack(i, 1)))
// Рецепт сериализуется пустым ({"type":"storagedrawers:keyring"}), поэтому при
// сетевом декоде клиент ПЕРЕСОБИРАЕТ ингредиент, вызывая ModItems.getKeys() ->
// BuiltInRegistries.ITEM.stream(). Это происходит на Netty-треде во время
// приёма 'clientbound/minecraft:update_recipes', параллельно с ремапом реестров
// на главном треде: MappedRegistry.byId (ObjectArrayList) в этот момент
// расширен под новые id, но ещё не заполнен -> в нём видны null ->
// MappedRegistry.iterator() (guava Iterators.transform + Holder::value) -> NPE.
//
// Итог без фикса: падает весь пакет рецептов -> RecipesUpdatedEvent не
// срабатывает -> у клиента нет рецептов, JEI не стартует; при открытии
// инвентаря JEI форс-стартует и падает уже на реестре жидкостей.
// В одиночной игре не воспроизводится: локальное соединение не сериализует пакеты.
//
// У нас ~30 000 предметов, поэтому окно гонки огромное и краш стабилен.
// Сам предмет storagedrawers:keyring остаётся в игре (лут/креатив/команды),
// недоступен только его крафт. Убрать этот файл, когда StorageDrawers
// перестанет сканировать реестр во время декода.
ServerEvents.recipes(event => {
	event.remove({ id: "storagedrawers:keyring" });
});
