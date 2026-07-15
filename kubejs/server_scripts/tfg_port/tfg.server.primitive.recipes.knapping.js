// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/primitive/recipes.knapping.js (Ф4).
// [PORT-Ф2] В GTM8 НЕТ отдельных предметов-оголовий инструментов (gtceu:stone_axe_head,
// gtceu:flint_*_head и т.п. не существуют — проверено по exported/registries/items.json).
// Вся система замены каменных инструментов TFC на GT-оголовья невозможна:
//  - event.remove ванильных TFC-рецептов оставлен ЗАКОММЕНТИРОВАННЫМ (иначе каменные
//    инструменты станут некрафтовыми) — восстановить вместе с knapping-рецептами,
//    если оголовья появятся.
// Портированы только рецепты соломы и глиняных форм.
// [PORT-FIX] .outsideSlotRequired() удалён (в TFC 1.21 это свойство knapping type).
// [PORT-CHECK] knapping types 'tfg:flint' и 'tfg:straw' должны быть зарегистрированы в порте tfc/data.js.
// [PORT] tfcambiental отсутствует в 1.21.1 — straw_hat вырезан.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.primitive.recipes.knapping start')

	//#region Топор [PORT-Ф2] — GT-оголовья отсутствуют в GTM8, блок закомментирован целиком

	// // Инструмент
	// event.remove({ id: `tfc:crafting/stone/axe_igneous_extrusive` })
	// event.remove({ id: `tfc:crafting/stone/axe_igneous_intrusive` })
	// event.remove({ id: `tfc:crafting/stone/axe_metamorphic` })
	// event.remove({ id: `tfc:crafting/stone/axe_sedimentary` })
	//
	// // Оголовья
	// event.remove({ id: `tfc:rock_knapping/axe_head_igneous_extrusive` })
	// event.remove({ id: `tfc:rock_knapping/axe_head_igneous_intrusive` })
	// event.remove({ id: `tfc:rock_knapping/axe_head_metamorphic` })
	// event.remove({ id: `tfc:rock_knapping/axe_head_sedimentary` })
	//
	// event.recipes.tfc.knapping('gtceu:stone_axe_head', 'tfc:rock', [...])
	// event.recipes.tfc.knapping('gtceu:flint_axe_head', 'tfg:flint', [...])

	//#endregion

	//#region Молот [PORT-Ф2] — закомментирован

	// event.remove({ id: `tfc:crafting/stone/hammer_igneous_extrusive` })
	// event.remove({ id: `tfc:crafting/stone/hammer_igneous_intrusive` })
	// event.remove({ id: `tfc:crafting/stone/hammer_metamorphic` })
	// event.remove({ id: `tfc:crafting/stone/hammer_sedimentary` })
	// event.remove({ id: `tfc:rock_knapping/hammer_head_igneous_extrusive` })
	// event.remove({ id: `tfc:rock_knapping/hammer_head_igneous_intrusive` })
	// event.remove({ id: `tfc:rock_knapping/hammer_head_metamorphic` })
	// event.remove({ id: `tfc:rock_knapping/hammer_head_sedimentary` })
	//
	// event.recipes.tfc.knapping('gtceu:stone_hammer_head', 'tfc:rock', [...])

	//#endregion

	//#region Мотыга [PORT-Ф2] — закомментирован

	// event.remove({ id: `tfc:crafting/stone/hoe_*` }), event.remove({ id: `tfc:rock_knapping/hoe_head_*` })
	// event.recipes.tfc.knapping('gtceu:stone_hoe_head' / 'gtceu:flint_hoe_head', ...)

	//#endregion

	//#region Нож [PORT-Ф2] — закомментирован

	// event.remove({ id: `tfc:crafting/stone/knife_*` }), event.remove({ id: `tfc:rock_knapping/knife_head_*` })
	// event.recipes.tfc.knapping('gtceu:stone_knife_head' / 'gtceu:flint_knife_head', ...)

	//#endregion

	//#region Лопата [PORT-Ф2] — закомментирован

	// event.remove({ id: `tfc:crafting/stone/shovel_*` }), event.remove({ id: `tfc:rock_knapping/shovel_head_*` })
	// event.recipes.tfc.knapping('gtceu:stone_shovel_head' / 'gtceu:flint_shovel_head', ...)

	//#endregion

	// [PORT-Ф2] gtceu:flint_sword_head отсутствует в GTM8
	// event.recipes.tfc.knapping('gtceu:flint_sword_head', 'tfg:flint', [...])

	event.recipes.tfc.knapping('tfc:thatch', 'tfg:straw', [
		"XXX",
		"XXX",
		"XXX"
	])
		.ingredient('tfc:straw') // [PORT-FIX] .outsideSlotRequired(false) удалён
		.id('tfc:straw_knapping/thatch_block')

	// [PORT] tfcambiental отсутствует в 1.21.1
	// event.remove({ id: 'tfcambiental:crafting/straw_hat'})
	// event.recipes.tfc.knapping('tfcambiental:straw_hat', 'tfg:straw', [' XXX ', 'XXXXX'])
	// 	.ingredient('tfc:straw')
	// 	.id('sns:straw_knapping/straw_hat')

	// Molds
	event.recipes.tfc.knapping('tfg:unfired_rod_mold', 'tfc:fire_clay', [
		"XXXXX",
		"XXX X",
		"XX XX",
		"X XXX",
		"XXXXX"
	])
		.ingredient('tfc:fire_clay') // [PORT-FIX] ingredient не принимает count ('5x ...') — количество задаёт amountToConsume knapping type
		.id('tfg:fire_clay_knapping/unfired_rod_mold')

	event.recipes.tfc.knapping('tfg:unfired_small_gear_mold', 'tfc:fire_clay', [
		"XX XX",
		"X   X",
		"  X  ",
		"X   X",
		"XX XX"
	])
		.ingredient('tfc:fire_clay') // [PORT-FIX] без count
		.id('tfg:fire_clay_knapping/unfired_small_gear_mold')

	event.recipes.tfc.knapping('tfg:unfired_nugget_mold', 'tfc:clay', [
		"XXXXX",
		"X X X",
		"XXXXX",
		"X X X",
		"XXXXX"
	])
		.ingredient('minecraft:clay_ball') // [PORT-FIX] без count
		.id('tfg:fire_clay_knapping/unfired_nugget_mold')

	event.recipes.tfc.knapping('tfg:unfired_spindle_head_mold', 'tfc:clay', [
		"XXXXX",
		"XX XX",
		"     ",
		"XX XX",
		"XXXXX"
	])
		.ingredient('minecraft:clay_ball') // [PORT-FIX] без count
		.id('tfg:clay_knapping/unfired_spindle_head_mold')

	event.recipes.tfc.knapping('tfg:unfired_lamp_mold', 'tfc:clay', [
		"XXXXX",
		"XX XX",
		"X X X",
		"X   X",
		"XXXXX"
	])
		.ingredient('minecraft:clay_ball') // [PORT-FIX] без count
		.id('tfg:clay_knapping/unfired_lamp_mold')
})
