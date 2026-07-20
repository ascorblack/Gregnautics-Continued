// priority: 10
"use strict";

// [FIX 2026-07-20] Репорт с CF: «impossible crafting from Minecraft wood instead
// of TFC for the cases needed to craft Create machines».
//
// Все наши рецепты кейсингов Create (item_application + assembler + shaped из
// create.recipes.js) требуют #c:stripped_logs — но в 1.21 этот тег наполняют
// только ванильные модовые брёвна (11 шт., minecraft:stripped_*), которых в
// TFC-мире не добыть. TFC/AFC свои stripped-брёвна в c:-теги НЕ кладут
// (у них свой tfc:can_be_lit_on_torch и пр.) => кейсинги были непроизводимы.
//
// Лечим тегом, а не перечислением в рецептах: починятся и все чужие рецепты,
// завязанные на #c:stripped_logs / #c:stripped_woods.
ServerEvents.tags("item", event => {
	// tfc:wood/stripped_log/<type>, afc:wood/stripped_log/<type>
	// ВАЖНО: только regex! Добавка "@tfc" рядом затащила бы в тег ВЕСЬ мод.
	event.add("c:stripped_logs", "/^(tfc|afc):wood\\/stripped_log\\/.+$/");
	event.add("c:stripped_woods", "/^(tfc|afc):wood\\/stripped_wood\\/.+$/");
});
