// priority: 0
"use strict";

// [PORT] Порт tfg/slimes/slimes.tags.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT] registerTFGSlimeItemTags/registerTFGSlimeBiomeTags -> прямые обработчики ServerEvents.tags.
// [PORT-Ф4-TODO] ВЕСЬ ФАЙЛ ОТКЛЮЧЁН:
//  - слаймы (энтити и механика tfg:slime_food / tfg:slime_habitat) — контент TFG-Core (Ф4), не портирован;
//  - beneath отсутствует (#beneath:mushrooms) — единственное наполнение tfg:slime_food;
//  - биомы tfg:nether/* поставлялись датапаком TFG-Core, в 1.21-инстансе их нет.
// При портировании Ф4 раскомментировать и перепроверить существование биомов.

ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.misc slimes item tags start')

	// [PORT-Ф4-TODO][PORT] beneath отсутствует — тег остался бы пустым
	// event.add("tfg:slime_food", "#beneath:mushrooms");
})

ServerEvents.tags('worldgen/biome', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.misc slimes biome tags start')

	// [PORT-Ф4-TODO] --- начало отключённого блока (биомы tfg:nether/* не существуют) ---

	// event.add('tfg:slime_habitat', 'tfg:nether/muggy_bog')
	// event.add('tfg:slime_habitat', 'tfg:nether/thorny_brambles')
	// event.add('tfg:slime_habitat', 'tfg:nether/lush_hollow')
	// event.add('tfg:slime_habitat', 'tfg:nether/geothermal_springs')
	// event.add('tfg:slime_habitat', 'tfg:nether/salt_caves')
	// event.add('tfg:slime_habitat', 'tfg:nether/lava_floes')
	// event.add('tfg:slime_habitat', 'tfg:nether/ash_forest')
	// event.add('tfg:slime_habitat', 'tfg:nether/basalt_deltas')

	// // Plant Slime
	// event.add('tfg:nether/plant_slime_habitat', 'tfg:nether/muggy_bog')
	// event.add('tfg:nether/plant_slime_habitat', 'tfg:nether/thorny_brambles')

	// // Glowberry Slime
	// event.add('tfg:nether/glowberry_slime_habitat', 'tfg:nether/lush_hollow')

	// // Spring Slime
	// event.add('tfg:nether/spring_slime_habitat', 'tfg:nether/geothermal_springs')

	// // Ice Slime
	// event.add('tfg:nether/ice_slime_habitat', 'tfg:nether/salt_caves')

	// // Lava Slime
	// event.add('tfg:nether/lava_slime_habitat', 'tfg:nether/lava_floes')
	// event.add('tfg:nether/lava_slime_habitat', 'tfg:nether/ash_forest')
	// event.add('tfg:nether/lava_slime_habitat', 'tfg:nether/basalt_deltas')

	// [PORT-Ф4-TODO] --- конец отключённого блока ---
})
