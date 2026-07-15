// priority: 0
"use strict";

// [PORT] Порт vintage_improvements/tags.js из TerraFirmaGreg-Modern (1.20.1) на 1.21.1 NeoForge.
// [PORT] modid: vintageimprovements -> createvintageneoforged (Create Vintage Improvements Neoforged).
// [PORT] Диспетчер main_server_script.js заменён на прямую регистрацию событий (KubeJS 7 — изолированные скоупы).

ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port createvintageneoforged item tags start')

	event.add('c:hidden_from_recipe_viewers', '#createvintageneoforged:springs') // [PORT] vintageimprovements -> createvintageneoforged
	event.add('c:hidden_from_recipe_viewers', '#createvintageneoforged:small_springs') // [PORT] vintageimprovements -> createvintageneoforged
	event.add('c:hidden_from_recipe_viewers', '#c:wires') // [PORT] forge:wires -> c:wires
	// [PORT] createvintageneoforged:incomplete_redstone_module — предмет redstone_module удалён в 1.21.1-версии мода
	// [PORT] (проверено по exported/registries/items.json), скрывать нечего:
	// event.add('c:hidden_from_recipe_viewers', 'vintageimprovements:incomplete_redstone_module')

	event.add('createvintageneoforged:custom_hammering_blocks', '#tfc:anvils') // [PORT] vintageimprovements -> createvintageneoforged
	event.add('createvintageneoforged:curving_heads', '#gtceu:extruder_molds') // [PORT] vintageimprovements -> createvintageneoforged
})


ServerEvents.tags('block', event => {
	console.info('[Gregnautics] progress: tfg_port createvintageneoforged block tags start')

	event.add('createvintageneoforged:custom_hammering_blocks', '#tfc:anvils') // [PORT] vintageimprovements -> createvintageneoforged
})


ServerEvents.tags('fluid', event => {
	console.info('[Gregnautics] progress: tfg_port createvintageneoforged fluid tags start')

	// [PORT] global.VINTAGE_IMPROVEMENTS_DISABLED_FLUIDS определялся в startup_scripts/vintage_improvements/constants.js
	// [PORT] оригинала; в KubeJS 7 server-скрипты не могут писать в global, поэтому список инлайнен локально.
	// [PORT] В 1.21.1-версии мода эти жидкости, судя по exported/registries/fluids.json, вообще не регистрируются —
	// [PORT] оставлена защита Fluid.exists, чтобы не упасть на несуществующей жидкости.
	const VINTAGE_IMPROVEMENTS_DISABLED_FLUIDS = [

		'createvintageneoforged:sulfuric_acid', // [PORT] vintageimprovements -> createvintageneoforged
		'createvintageneoforged:sulfur_dioxide', // [PORT] vintageimprovements -> createvintageneoforged
		'createvintageneoforged:sulfur_trioxide' // [PORT] vintageimprovements -> createvintageneoforged
	]

	VINTAGE_IMPROVEMENTS_DISABLED_FLUIDS.forEach(item => {
		if (!Fluid.exists(item)) return // [PORT] жидкость отсутствует в 1.21.1-версии мода
		event.removeAllTagsFrom(item)
		event.add('c:hidden_from_recipe_viewers', item)
	})
})
