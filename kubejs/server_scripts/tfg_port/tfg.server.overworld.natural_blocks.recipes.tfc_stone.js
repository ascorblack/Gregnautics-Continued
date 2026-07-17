// [PORT-FIX] KubeJS 7: server-скрипты ДЕЛЯТ top-level scope — имена const должны быть уникальны между файлами
// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/natural_blocks/recipes.tfc_stone.js (1.20.1) на 1.21.1 NeoForge.
// [PORT] Изменения:
//  - #tfc:hammers -> #c:tools/hammer; forge:small_springs -> c:small_springs;
//    forge:tools/screwdrivers -> c:tools/screwdriver; forge:tools/saws -> c:tools/saw;
//  - id ванильных рецептов TFC 1.21: crafting/rock/{stone}_{форма} -> crafting/rock/{форма}/{stone};
//    *_wall_undo -> crafting/rock/loose/{stone}_from_walls;
//  - id нашего pressure plate = нативный (перекрываем рецепт TFC).

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.overworld natural_blocks recipes.tfc_stone start')

	global.TFC_STONE_TYPES.forEach(stone => {

		// Raw Pressure Plate
		global.TFGDamageShaped(event,`tfc:rock/pressure_plate/${stone}`, [
			' B ',
			'CDC',
			' E '
		], {
			B: '#c:tools/hammer', // [PORT] tfc:hammers -> c:tools/hammer
			C: `tfc:rock/raw/${stone}_slab`,
			D: '#c:small_springs',
			E: '#c:tools/screwdriver' // [PORT] ед. число в GTM8
		}).id(`tfc:crafting/rock/pressure_plate/${stone}`) // [PORT-FIX] нативный id TFC 1.21

		event.recipes.gtceu.assembler(`${stone}_raw_pressure_plate`)
			.itemInputs('#c:small_springs', `2x tfc:rock/raw/${stone}_slab`)
			.circuit(3)
			.itemOutputs(`2x tfc:rock/pressure_plate/${stone}`)
			.duration(50)
			.EUt(2)

		// Raw Button
		event.remove({ id: `tfc:crafting/rock/button/${stone}` }) // [PORT-FIX] нативный id TFC 1.21

		global.generateCutterRecipe(event, `tfc:rock/pressure_plate/${stone}`, `6x tfc:rock/button/${stone}`, 50, 2, `${stone}_raw_button`) // [PORT-FIX] хелпер только через global.*

		global.TFGDamageShapeless(event,`3x tfc:rock/button/${stone}`, [`tfc:rock/pressure_plate/${stone}`, '#c:tools/saw'])
			.id(`tfg:shapeless/${stone}_pressure_plate_to_button`)

		// #region Stonecutting
		// [PORT-FIX] id ванильных рецептов TFC 1.21 переехали: {stone}_{форма}_{shape} -> {форма}/{stone}_{shape}
		// Raw
		event.remove({ id: `tfc:crafting/rock/raw/${stone}_stairs` })
		event.remove({ id: `tfc:crafting/rock/raw/${stone}_slab` })
		event.remove({ id: `tfc:crafting/rock/raw/${stone}_wall` })

		// Cobble
		event.remove({ id: `tfc:crafting/rock/cobble/${stone}_stairs` })
		event.remove({ id: `tfc:crafting/rock/cobble/${stone}_slab` })
		event.remove({ id: `tfc:crafting/rock/cobble/${stone}_wall` })
		event.remove({ id: `tfc:crafting/rock/loose/${stone}_from_walls` }) // [PORT-FIX] 1.20: {stone}_cobble_wall_undo

		// Mossy Cobble
		event.remove({ id: `tfc:crafting/rock/mossy_cobble/${stone}_stairs` })
		event.remove({ id: `tfc:crafting/rock/mossy_cobble/${stone}_slab` })
		event.remove({ id: `tfc:crafting/rock/mossy_cobble/${stone}_wall` })
		event.remove({ id: `tfc:crafting/rock/mossy_loose/${stone}_from_walls` }) // [PORT-FIX] 1.20: mossy_cobble_wall_undo

		// Smooth
		event.remove({ id: `tfc:crafting/rock/smooth/${stone}_stairs` })
		event.remove({ id: `tfc:crafting/rock/smooth/${stone}_slab` })
		event.remove({ id: `tfc:crafting/rock/smooth/${stone}_wall` })

		// Bricks
		event.remove({ id: `tfc:crafting/rock/bricks/${stone}_stairs` })
		event.remove({ id: `tfc:crafting/rock/bricks/${stone}_slab` })
		event.remove({ id: `tfc:crafting/rock/bricks/${stone}_wall` })

		// Cracked Bricks
		event.remove({ id: `tfc:crafting/rock/cracked_bricks/${stone}_stairs` })
		event.remove({ id: `tfc:crafting/rock/cracked_bricks/${stone}_slab` })
		event.remove({ id: `tfc:crafting/rock/cracked_bricks/${stone}_wall` })

		// Mossy Bricks
		event.remove({ id: `tfc:crafting/rock/mossy_bricks/${stone}_stairs` })
		event.remove({ id: `tfc:crafting/rock/mossy_bricks/${stone}_slab` })
		event.remove({ id: `tfc:crafting/rock/mossy_bricks/${stone}_wall` })
		// #endregion
	})
})
