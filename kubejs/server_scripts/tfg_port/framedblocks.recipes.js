// priority: 0
// [PORT] portированный framed_blocks/recipes.js (TFG 1.20.1 -> Gregnautics 1.21.1)
"use strict";

// [PORT] диспетчер main_server_script.js отсутствует — регистрируем событие напрямую
ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port framedblocks recipes start')

	event.remove({ id: 'framedblocks:framed_torch' })
	event.remove({ id: 'framedblocks:framing_saw/framed_torch' })
	event.remove({ id: 'framedblocks:framed_soul_torch' })
	event.remove({ id: 'framedblocks:framing_saw/framed_soul_torch' })
	event.remove({ id: 'framedblocks:framed_obsidian_pressure_plate' })
	event.remove({ id: 'framedblocks:framing_saw/framed_obsidian_pressure_plate' })

	//#region Framed Iron Door
	event.shaped('framedblocks:framed_iron_door', [
		'ABA'
	], {
		A: '#c:plates/wrought_iron', // [PORT] forge: -> c:
		B: 'framedblocks:framed_door'
	}).id('framedblocks:framed_iron_door')

	event.custom({
		type: "framedblocks:frame",
		additives: [
			{
				"count": 2,
				"ingredient": {
					"tag": "c:plates/wrought_iron" // [PORT] forge: -> c:
				}
			}
		],
		material: 3072,
		result: {
			id: "framedblocks:framed_iron_door" // [PORT-FIX] 1.21 ItemStack codec: item -> id
		}
	}).id('framedblocks:framing_saw/framed_iron_door')
	//#endregion

	//#region Framed Iron Trapdoor
	event.shapeless('framedblocks:framed_iron_trapdoor', [
		'framedblocks:framed_trapdoor',
		'#c:plates/wrought_iron' // [PORT] forge: -> c:
	]).id('framedblocks:framed_iron_trapdoor')

	event.custom({
		type: "framedblocks:frame",
		additives: [
			{
				count: 1,
				ingredient: {
					tag: "c:plates/wrought_iron" // [PORT] forge: -> c:
				}
			}
		],
		material: 1536,
		result: {
			id: "framedblocks:framed_iron_trapdoor" // [PORT-FIX] 1.21 ItemStack codec: item -> id
		}
	}).id('framedblocks:framing_saw/framed_iron_trapdoor')
	//#endregion

	//#region Framed Pressure Plate
	event.shapeless(
		Item.of('framedblocks:framed_pressure_plate', 1),
		[
			'#minecraft:wooden_pressure_plates',
			'framedblocks:framed_cube',
		]
	).id('framedblocks:framed_pressure_plate')

	event.custom({
		type: "framedblocks:frame",
		additives: [
			{
				"count": 1,
				"ingredient": {
					tag: "minecraft:wooden_pressure_plates"
				}
			}
		],
		material: 6144,
		result: {
			id: "framedblocks:framed_pressure_plate" // [PORT-FIX] 1.21 ItemStack codec: item -> id
		}
	}).id('framedblocks:framing_saw/framed_pressure_plate')
	//#endregion

	//#region Framed Pressure Plate
	event.shapeless(
		Item.of('framedblocks:framed_stone_pressure_plate', 1),
		[
			'#c:stones/pressure_plate', // [PORT-FIX] minecraft:stone_pressure_plates пуст в TFC 1.21 — тег TFC: c:stones/pressure_plate
			'framedblocks:framed_cube',
		]
	).id('framedblocks:framed_stone_pressure_plate')

	event.custom({
		type: "framedblocks:frame",
		additives: [
			{
				"count": 1,
				"ingredient": {
					tag: "c:stones/pressure_plate" // [PORT-FIX] пустой vanilla-тег -> тег TFC 1.21
				}
			}
		],
		material: 6144,
		result: {
			id: "framedblocks:framed_stone_pressure_plate" // [PORT-FIX] 1.21 ItemStack codec: item -> id
		}
	}).id('framedblocks:framing_saw/framed_stone_pressure_plate')
	//#endregion

	//#region Framed Gold Pressure Plate
	event.shaped('framedblocks:framed_gold_pressure_plate', [
		'AA',
		'BB'
	], {
		A: '#c:plates/gold', // [PORT] forge: -> c:
		B: 'framedblocks:framed_cube'
	}).id('framedblocks:framed_gold_pressure_plate')

	event.custom({
		type: "framedblocks:frame",
		additives: [
			{
				count: 1,
				ingredient: {
					tag: "c:plates/gold" // [PORT] forge: -> c:
				}
			}
		],
		material: 6144,
		result: {
			id: "framedblocks:framed_gold_pressure_plate" // [PORT-FIX] 1.21 ItemStack codec: item -> id
		}
	}).id('framedblocks:framing_saw/framed_gold_pressure_plate')
	//#endregion

	//#region Framed Iron Pressure Plate
	event.shaped('framedblocks:framed_iron_pressure_plate', [
		'AA',
		'BB'
	], {
		A: '#c:plates/iron', // [PORT] forge: -> c:
		B: 'framedblocks:framed_cube'
	}).id('framedblocks:framed_iron_pressure_plate')

	event.custom({
		type: "framedblocks:frame",
		additives: [
			{
				count: 1,
				ingredient: {
					tag: "c:plates/iron" // [PORT] forge: -> c:
				}
			}
		],
		material: 6144,
		result: {
			id: "framedblocks:framed_iron_pressure_plate" // [PORT-FIX] 1.21 ItemStack codec: item -> id
		}
	}).id('framedblocks:framing_saw/framed_iron_pressure_plate')
	//#endregion

	//#region Framed Hanging Sign
	// [PORT-Ф4] тег tfg:metal_chains ещё не портирован (tfg: контент — фаза 4)
	/*
	event.shaped('6x framedblocks:framed_hanging_sign', [
		'A A',
		'BBB',
		'BBB'
	], {
		A: '#tfg:metal_chains',
		B: 'framedblocks:framed_cube'
	}).id('framedblocks:framed_hanging_sign')

	event.custom({
		type: "framedblocks:frame",
		additives: [
			{
				count: 1,
				ingredient: {
					tag: "tfg:metal_chains"
				}
			}
		],
		material: 3072,
		result: {
			count: 2,
			id: "framedblocks:framed_hanging_sign" // [PORT-FIX] 1.21 ItemStack codec: item -> id
		}
	}).id('framedblocks:framing_saw/framed_hanging_sign')
	*/
	//#endregion

	//#region Framed Collapsible Copycat Block
	event.shaped('4x framedblocks:framed_collapsible_copycat_block', [
		'ABA',
		'B B',
		'ABA'
	], {
		A: 'framedblocks:framed_cube',
		B: '#c:plates/copper' // [PORT] forge:sheets -> c:plates (GTM8)
	}).id('framedblocks:framed_collapsible_copycat_block')

	event.custom({
		type: "framedblocks:frame",
		additives: [
			{
				count: 1,
				ingredient: {
					tag: "c:plates/copper" // [PORT] forge: -> c:
				}
			}
		],
		material: 6144,
		result: {
			id: "framedblocks:framed_collapsible_copycat_block" // [PORT-FIX] 1.21 ItemStack codec: item -> id
		}
	}).id('framedblocks:framing_saw/framed_collapsible_copycat_block')
	//#endregion

	//#region Framed Fancy Rail Block
	event.shaped('32x framedblocks:framed_fancy_rail', [
		'A A',
		'ABA',
		'A A'
	], {
		A: '#c:rods/wrought_iron', // [PORT] forge: -> c:
		B: 'framedblocks:framed_cube'
	}).id('framedblocks:framed_fancy_rail')

	event.custom({
		type: "framedblocks:frame",
		additives: [
			{
				count: 6,
				ingredient: {
					tag: "c:rods/wrought_iron" // [PORT] forge: -> c:
				}
			}
		],
		material: 6144,
		result: {
			count: 32,
			id: "framedblocks:framed_fancy_rail" // [PORT-FIX] 1.21 ItemStack codec: item -> id
		}
	}).id('framedblocks:framing_saw/framed_fancy_rail')
	//#endregion

	//#region Framed Fancy Powered Rail Block
	event.shaped('16x framedblocks:framed_fancy_powered_rail', [
		'A A',
		'ABA',
		'ACA'
	], {
		A: '#c:rods/gold', // [PORT] forge: -> c:
		B: 'framedblocks:framed_cube',
		C: 'minecraft:redstone'
	}).id('framedblocks:framed_fancy_powered_rail')

	event.custom({
		type: "framedblocks:frame",
		additives: [
			{
				count: 6,
				ingredient: {
					tag: "c:rods/gold" // [PORT] forge: -> c:
				}
			},
			{
				count: 1,
				ingredient: {
					tag: "c:dusts/redstone" // [PORT] forge: -> c:
				}
			}
		],
		material: 6144,
		result: {
			count: 16,
			id: "framedblocks:framed_fancy_powered_rail" // [PORT-FIX] 1.21 ItemStack codec: item -> id
		}
	}).id('framedblocks:framing_saw/framed_fancy_powered_rail')
	//#endregion

	//#region Framed Fancy Detector Rail Block
	event.shaped('4x framedblocks:framed_fancy_detector_rail', [
		'ABA',
		'ACA',
		'ADA'
	], {
		A: '#c:rods/wrought_iron', // [PORT] forge: -> c:
		B: '#c:stones/pressure_plate', // [PORT-FIX] minecraft:stone_pressure_plates пуст в TFC 1.21
		C: 'framedblocks:framed_cube',
		D: 'minecraft:redstone',
	}).id('framedblocks:framed_fancy_detector_rail')

	event.custom({
		type: "framedblocks:frame",
		additives: [
			{
				count: 6,
				ingredient: {
					tag: "c:rods/wrought_iron" // [PORT] forge: -> c:
				}
			},
			{
				count: 1,
				ingredient: {
					tag: "c:dusts/redstone" // [PORT] forge: -> c:
				}
			},
			{
				count: 1,
				ingredient: {
					tag: "c:stones/pressure_plate" // [PORT-FIX] пустой vanilla-тег -> тег TFC 1.21
				}
			}
		],
		material: 6144,
		result: {
			count: 4,
			id: "framedblocks:framed_fancy_detector_rail" // [PORT-FIX] 1.21 ItemStack codec: item -> id
		}
	}).id('framedblocks:framing_saw/framed_fancy_detector_rail')
	//#endregion

	//#region Framed Fancy Activator Rail Block
	event.shaped('4x framedblocks:framed_fancy_activator_rail', [
		'ABA',
		'ACA',
		'ABA'
	], {
		A: '#c:rods/wrought_iron', // [PORT] forge: -> c:
		B: 'framedblocks:framed_cube',
		C: 'minecraft:redstone_torch'
	}).id('framedblocks:framed_fancy_activator_rail')

	event.custom({
		type: "framedblocks:frame",
		additives: [
			{
				count: 6,
				ingredient: {
					tag: "c:rods/wrought_iron" // [PORT] forge: -> c:
				}
			},
			{
				count: 1,
				ingredient: {
					item: "minecraft:redstone_torch"
				}
			}
		],
		material: 6144,
		result: {
			count: 4,
			id: "framedblocks:framed_fancy_activator_rail" // [PORT-FIX] 1.21 ItemStack codec: item -> id
		}
	}).id('framedblocks:framing_saw/framed_fancy_activator_rail')
	//#endregion

	// Framed Raiforcement
	event.shaped('32x framedblocks:framed_reinforcement', [
		'ABA',
		'BCB',
		'ABA'
	], {
		A: '#c:plates/obsidian', // [PORT] forge: -> c:
		B: '#c:plates/wrought_iron', // [PORT] forge: -> c:
		C: '#c:frames' // [PORT] forge: -> c:
	}).id('framedblocks:framed_reinforcement')

	// Framed Key
	event.shaped('framedblocks:framed_key', [
		'AAB',
		'CC '
	], {
		A: '#c:rods/wooden', // [PORT] forge: -> c:
		B: 'framedblocks:framed_cube',
		C: '#c:nuggets/wrought_iron' // [PORT] forge: -> c:
	}).id('framedblocks:framed_key')

	// Framed Cube
	event.shaped('4x framedblocks:framed_cube', [
		'ABA',
		'B B',
		'ABA'
	], {
		A: '#minecraft:planks',
		B: '#c:rods/wooden' // [PORT] forge: -> c:
	}).id('framedblocks:framed_cube')

	event.recipes.gtceu.assembler('tfg:assembler/framedblocks/framed_cube')
		.itemInputs('4x #minecraft:planks', '4x #c:rods/wooden') // [PORT] forge: -> c:
		.circuit(8)
		.itemOutputs('4x framedblocks:framed_cube')
		.duration(40)
		.EUt(GTValues.VA[GTValues.ULV])

	// Framed Fence
	event.shaped('3x framedblocks:framed_fence', [
		'ABA',
		'ABA',
	], {
		A: 'framedblocks:framed_cube',
		B: '#c:rods/wooden' // [PORT] forge: -> c:
	}).id('framedblocks:framed_fence')

	// Framed Fence Gate
	event.shaped('framedblocks:framed_fence_gate', [
		'ABA',
		'ABA',
	], {
		B: 'framedblocks:framed_cube',
		A: '#c:rods/wooden' // [PORT] forge: -> c:
	}).id('framedblocks:framed_fence_gate')

	// Framed Ladder
	event.shaped('8x framedblocks:framed_ladder', [
		'A A',
		'ABA',
		'A A'
	], {
		A: 'framedblocks:framed_cube',
		B: '#c:rods/wooden' // [PORT] forge: -> c:
	}).id('framedblocks:framed_ladder')

	// Framing Saw
	event.shaped('framedblocks:framing_saw', [
		' E ',
		'CAC',
		'BDB'
	], {
		A: '#c:plates/wrought_iron', // [PORT] forge: -> c:
		B: 'framedblocks:framed_cube',
		C: '#c:plates/brass', // [PORT] forge: -> c:
		D: '#c:small_gears/brass', // [PORT] forge: -> c:
		E: '#c:buzz_saw_blades' // [PORT-FIX] в GTM8 тег называется c:buzz_saw_blades (buzz_saw_heads не существует)
	}).id('framedblocks:framing_saw');

	// Powered Framing Saw
	event.shaped('framedblocks:powered_framing_saw', [
		'A',
		'B',
		'C'
	], {
		A: '#c:glass_blocks', // [PORT-FIX] NeoForge 1.21: c:glass -> c:glass_blocks
		B: 'framedblocks:framing_saw',
		C: 'gtceu:lv_electric_motor'
	}).id('framedblocks:powered_framing_saw')

	// Framed Chest
	event.shapeless(
		Item.of('framedblocks:framed_chest', 1),
		[
			'gtceu:wood_crate',
			'framedblocks:framed_cube',
		]
	).id('framedblocks:framed_chest')

	event.custom({
		type: "framedblocks:frame",
		additives: [
			{
				"count": 1,
				"ingredient": {
					item: "gtceu:wood_crate"
				}
			}
		],
		material: 6144,
		result: {
			id: "framedblocks:framed_chest" // [PORT-FIX] 1.21 ItemStack codec: item -> id
		}
	}).id('framedblocks:framing_saw/framed_chest')

	// Button
	event.shapeless(
		Item.of('framedblocks:framed_button', 1),
		[
			'#minecraft:buttons',
			'framedblocks:framed_cube',
		]
	).id('framedblocks:framed_button')

	event.custom({
		type: "framedblocks:frame",
		additives: [
			{
				"count": 1,
				"ingredient": {
					tag: "minecraft:buttons"
				}
			}
		],
		material: 1536,
		result: {
			id: "framedblocks:framed_button" // [PORT-FIX] 1.21 ItemStack codec: item -> id
		}
	}).id('framedblocks:framing_saw/framed_button')

	// Stone button
	event.shapeless(
		Item.of('framedblocks:framed_stone_button', 1),
		[
			'#c:stones', // [PORT-FIX] c:stone пуст — в NeoForge/TFC 1.21 тег называется c:stones
			'framedblocks:framed_button',
		]
	).id('framedblocks:framed_stone_button')

	event.custom({
		type: "framedblocks:frame",
		additives: [
			{
				"count": 1,
				"ingredient": {
					tag: "c:stones" // [PORT-FIX] c:stone -> c:stones (NeoForge 1.21)
				}
			}
		],
		material: 1536,
		result: {
			id: "framedblocks:framed_stone_button" // [PORT-FIX] 1.21 ItemStack codec: item -> id
		}
	}).id('framedblocks:framing_saw/framed_stone_button')

	// Lever

	event.shapeless(
		Item.of('framedblocks:framed_lever', 1),
		[
			'framedblocks:framed_cube',
			'minecraft:redstone',
			'#c:rods/wooden', // [PORT] forge: -> c:
		]
	).id('framedblocks:framed_lever')

	event.custom({
		type: "framedblocks:frame",
		additives: [
			{
				"count": 1,
				"ingredient": { tag: "c:rods/wooden" } // [PORT] forge: -> c:
			},
			{
				"count": 1,
				"ingredient": { item: "minecraft:redstone" }
			}
		],
		material: 6144,
		result: {
			id: "framedblocks:framed_lever", // [PORT-FIX] 1.21 ItemStack codec: item -> id
			count: 4
		}
	}).id('framedblocks:framing_saw/framed_lever')

	// Glowing cube

	event.shapeless(
		Item.of('framedblocks:framed_glowing_cube', 1),
		[
			'framedblocks:framed_cube',
			'minecraft:glowstone',
		]
	).id('framedblocks:framed_glowing_cube')

	event.custom({
		type: "framedblocks:frame",
		additives: [
			{
				"count": 1,
				"ingredient": { item: "minecraft:glowstone" }
			}
		],
		material: 6144,
		result: {
			id: "framedblocks:framed_glowing_cube", // [PORT-FIX] 1.21 ItemStack codec: item -> id
			count: 1
		}
	}).id('framedblocks:framing_saw/framed_glowing_cube')

	// Item Frame

	event.shaped('4x framedblocks:framed_item_frame', [
		'AAA',
		'ABA',
		'AAA'
	], {
		A: 'framedblocks:framed_cube',
		B: '#c:leather' // [PORT] forge: -> c:
	}).id('framedblocks:framed_item_frame')

	event.custom({
		type: "framedblocks:frame",
		additives: [
			{
				"count": 1,
				"ingredient": { tag: "c:leather" } // [PORT] forge: -> c:
			}
		],
		material: 6144*8,
		result: {
			id: "framedblocks:framed_item_frame", // [PORT-FIX] 1.21 ItemStack codec: item -> id
			count: 4
		}
	}).id('framedblocks:framing_saw/framed_item_frame')

	// Glow Item Frame

	event.shapeless('framedblocks:framed_glowing_item_frame', ['framedblocks:framed_item_frame', 'minecraft:glowstone_dust'])
		.id('framedblocks:framed_glowing_item_frame')

	event.custom({
		type: "framedblocks:frame",
		additives: [
			{
				"count": 1,
				"ingredient": { tag: "c:leather" } // [PORT] forge: -> c:
			},
			{
				"count": 4,
				"ingredient": { item: "minecraft:glowstone_dust" }
			}
		],
		material: 6144*8,
		result: {
			id: "framedblocks:framed_glowing_item_frame", // [PORT-FIX] 1.21 ItemStack codec: item -> id
			count: 4
		}
	}).id('framedblocks:framing_saw/framed_glowing_item_frame')
})
