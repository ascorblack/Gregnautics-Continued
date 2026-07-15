// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/railways/tags.js (1.20.1 -> 1.21.1).
// registerRailWaysItemTags / registerRailWaysBlockTags -> прямые обработчики ServerEvents.tags
// (KubeJS 7: изолированные скоупы, диспетчер main_server_script.js не используется).

ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port railways item tags start')

	// Adding Conductor tags
	global.MINECRAFT_DYE_NAMES.forEach(dye => {
		if (dye !== 'white') {
			event.add('tfg:colored_caps', `railways:${dye}_conductor_cap`)
		}
		event.remove('c:hidden_from_recipe_viewers', `railways:${dye}_conductor_cap`)
	})

	event.remove('c:hidden_from_recipe_viewers', `railways:track_incomplete_phantom`)

	event.remove('railways:palettes/cycle_groups/netherite/hazard_stripes_black', 'railways:hazard_stripes_diagonal_on_black')
	event.remove('railways:palettes/cycle_groups/netherite/hazard_stripes_black', 'railways:hazard_stripes_chevron_on_black')
	event.remove('railways:palettes/cycle_groups/netherite/hazard_stripes_white', 'railways:hazard_stripes_diagonal_on_white')
	event.remove('railways:palettes/cycle_groups/netherite/hazard_stripes_white', 'railways:hazard_stripes_chevron_on_white')
	event.add('railways:palettes/cycle_groups/netherite/base', 'railways:hazard_stripes_diagonal_on_black')
	event.add('railways:palettes/cycle_groups/netherite/base', 'railways:hazard_stripes_chevron_on_black')
	event.add('railways:palettes/cycle_groups/netherite/base', 'railways:hazard_stripes_diagonal_on_white')
	event.add('railways:palettes/cycle_groups/netherite/base', 'railways:hazard_stripes_chevron_on_white')

	global.LOCOMETAL_COLORS.forEach(x => {
		x.colors.forEach((color, i) => {
			event.remove(`railways:palettes/cycle_groups/${color}/hazard_stripes_black`, `railways:${color}_hazard_stripes_diagonal_on_black`)
			event.remove(`railways:palettes/cycle_groups/${color}/hazard_stripes_black`, `railways:${color}_hazard_stripes_chevron_on_black`)
			event.remove(`railways:palettes/cycle_groups/${color}/hazard_stripes_white`, `railways:${color}_hazard_stripes_diagonal_on_white`)
			event.remove(`railways:palettes/cycle_groups/${color}/hazard_stripes_white`, `railways:${color}_hazard_stripes_chevron_on_white`)
			event.add(`railways:palettes/cycle_groups/${color}/base`, `railways:${color}_hazard_stripes_diagonal_on_black`)
			event.add(`railways:palettes/cycle_groups/${color}/base`, `railways:${color}_hazard_stripes_chevron_on_black`)
			event.add(`railways:palettes/cycle_groups/${color}/base`, `railways:${color}_hazard_stripes_diagonal_on_white`)
			event.add(`railways:palettes/cycle_groups/${color}/base`, `railways:${color}_hazard_stripes_chevron_on_white`)
		})
	})
})

ServerEvents.tags('block', event => {
	console.info('[Gregnautics] progress: tfg_port railways block tags start')

	event.add('tfc:no_icicle_generation', 'railways:track_monorail')
})
