// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/primitive/recipes.arrows.js (Ф4).
// Главные изменения 1.20→1.21:
//  - forge:→c: (tools/knives→tools/knife, string→strings)
//  - damage_inputs_shapeless_crafting / no_remainder_shapeless_crafting удалены в kubejs_tfc 2.0 — обычный shapeless
//  - knapping: .outsideSlotRequired() удалён (в TFC 1.21 это свойство knapping type, не рецепта)
//  - primitive_creatures, species, wan_ancient_beasts отсутствуют — рецепты вырезаны [PORT]
//  - tfg:wraptor_wool не зарегистрирован [PORT-Ф4-TODO]

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.primitive.recipes.arrows start')

	global.TFGDamageShaped(event,'tfg:unstrung_bow', [
		'AA',
		'AB'
	], {
		A: '#c:rods/wooden', // [PORT] forge: -> c:
		B: '#c:tools/knife' // [PORT] tools/knives -> tools/knife
	}).id('tfg:shaped/unstrung_bow')

	event.shaped('minecraft:bow', [
		'AB',
		'BB'
	], {
		A: 'tfg:unstrung_bow',
		B: '#c:strings' // [PORT] forge:string -> c:strings
	}).id('tfg:shaped/bow')

	global.TFGDamageShapeless(event,'4x minecraft:stick', ['tfc:tree_roots', '#c:tools/knife'])
		.id('tfg:shapeless/roots_to_stick')

	// Arrow Parts
	// [PORT-CHECK] knapping type 'tfg:flint' должен быть зарегистрирован в порте tfc/data.js (event.knappingType)
	event.recipes.tfc.knapping(
		'4x tfg:flint_arrow_head',
		'tfg:flint',
		[
			'  XXX',
			' XXXX',
			'XXXXX',
			' XXX ',
			'  X  '
		]
	) // [PORT-FIX] .outsideSlotRequired(false) удалён — свойство knapping type в TFC 1.21
		.id('tfg:knapping/flint_arrow_head')

	event.recipes.gtceu.cutter('tfg:assembler/flint_arrow_head')
		.itemInputs('1x minecraft:flint')
		.itemOutputs('4x tfg:flint_arrow_head')
		.duration(20)
		.EUt(GTValues.VA[GTValues.ULV])

	// [PORT-FIX] damage_inputs_shapeless_crafting удалён в kubejs_tfc 2.0 —
	// в TFC 1.21 урон инструментов в крафте идёт через crafting remainder автоматически.
	global.TFGDamageShapeless(event,'4x tfg:fletching', [
		'minecraft:feather',
		'#c:tools/knife'
	]).id('tfg:shapeless/fletching')

	event.recipes.gtceu.assembler('tfg:assembler/fletching')
		.itemInputs('1x minecraft:feather')
		.itemOutputs('4x tfg:fletching')
		.duration(20)
		.circuit(4)
		.EUt(GTValues.VA[GTValues.ULV])

	event.shapeless('minecraft:arrow', ['tfg:flint_arrow_head', '#c:rods/wooden', ['tfg:fletching', 'tfg:hardwood_strip']])
		.id('tfg:shaped/arrow')

	// [PORT] primitive_creatures отсутствует в 1.21.1
	// event.shapeless('minecraft:arrow', ['primitive_creatures:tt_5', '#c:rods/wooden', ['tfg:fletching', 'tfg:hardwood_strip']])
	// 	.id('tfg:shaped/arrow_shard')

	// [PORT] species отсутствует в 1.21.1
	// event.shapeless('minecraft:arrow', ['species:werefang', '#c:rods/wooden', ['tfg:fletching', 'tfg:hardwood_strip']])
	// 	.id('tfg:shaped/arrow_werefang')

	// [PORT-FIX] no_remainder_shapeless_crafting удалён в kubejs_tfc 2.0 — обычный shapeless
	// [PORT-CHECK] костяная игла может возвращать remainder при крафте (раньше подавлялось обёрткой no_remainder)
	event.shapeless('minecraft:arrow', ['tfc:bone_needle', '#c:rods/wooden', ['tfg:fletching', 'tfg:hardwood_strip']])
		.id('tfg:shaped/arrow_bone_needle')

	// Wraptor feathers
	// [PORT-Ф4-TODO] tfg:wraptor_wool не зарегистрирован в 1.21.1 (Ф4 wraptor-контент)
	// global.TFGDamageShapeless(event,'4x tfg:fletching', [
	// 	'tfg:wraptor_wool',
	// 	'#c:tools/knife'
	// ]).id('tfg:shapeless/wraptor_feather_fletching')
	//
	// event.recipes.gtceu.assembler('tfg:assembler/wraptor_feather_fletching')
	// 	.itemInputs('1x tfg:wraptor_wool')
	// 	.itemOutputs('4x tfg:fletching')
	// 	.duration(20)
	// 	.circuit(4)
	// 	.EUt(GTValues.VA[GTValues.ULV])

	// Glider feathers
	// [PORT] wan_ancient_beasts отсутствует в 1.21.1
	// global.TFGDamageShapeless(event,'4x tfg:fletching', ['wan_ancient_beasts:glider_feather', '#c:tools/knife'])
	// 	.id('tfg:shapeless/glider_feather_fletching')
	//
	// event.recipes.gtceu.assembler('tfg:assembler/glider_feather_fletching')
	// 	.itemInputs('1x wan_ancient_beasts:glider_feather')
	// 	.itemOutputs('4x tfg:fletching')
	// 	.duration(20)
	// 	.circuit(4)
	// 	.EUt(GTValues.VA[GTValues.ULV])
})
