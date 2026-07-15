// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/overworld/tags.overworld.js (1.20.1) на 1.21.1 NeoForge.
// [PORT] Изменения:
//  - tfc:compost_greens_low -> tfc:compost_greens/low;
//  - endermanoverhaul / waves / beneath отсутствуют в сборке — их записи вырезаны [PORT];
//  - tfc_ruined_world отсутствует — теги его неймспейса безвредны, оставлены 1:1 (мод планируется);
//  - [PORT-Ф5] биомы tfg:earth/*, worldgen-фичи tfg:* и мобы tfg:* приедут с Ф5 (worldgen/лут):
//    биомные/фичевые теги оставлены 1:1 (KubeJS пропускает несуществующие записи с warning'ом),
//    предметы/блоки/мобы — под гвардами BuiltInRegistries.

const $OwTagBuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const $OwTagResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')

function owTagExists(registry, id) {
	try {
		return registry.containsKey($OwTagResourceLocation.parse(String(id)))
	} catch (e) {
		return false
	}
}

ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.overworld tags.overworld item start')

	// [PORT] гвард: только существующие предметы; теги '#...' — как есть
	const add = (tag, entry) => {
		if (String(entry).startsWith('#') || owTagExists($OwTagBuiltInRegistries.ITEM, entry)) {
			event.add(tag, entry);
		}
	}

	// [PORT-Ф5] растения/блоки tfg:* появятся с Ф5 — гварды подхватят
	add('c:hidden_from_recipe_viewers', 'tfg:plant/flame_vine_plant')
	add('c:hidden_from_recipe_viewers', 'tfg:plant/cycad_plant')
	add('c:hidden_from_recipe_viewers', 'tfg:plant/pale_hanging_moss_plant')
	add('c:hidden_from_recipe_viewers', 'tfg:volcanic_ash')
	add('c:hidden_from_recipe_viewers', 'tfg:pile/volcanic_ash')
	add('c:hidden_from_recipe_viewers', 'tfg:oil_slick')
	add('c:hidden_from_recipe_viewers', 'tfg:heavy_oil_slick')
	add('c:hidden_from_recipe_viewers', 'tfg:light_oil_slick')
	add('c:hidden_from_recipe_viewers', 'tfg:raw_oil_slick')
	add('c:hidden_from_recipe_viewers', 'tfg:big_volcano_smoke_emitter')
	add('c:hidden_from_recipe_viewers', 'tfg:natural_gas_emitter')
	add('c:hidden_from_recipe_viewers', 'tfg:natural_gas_bubble_emitter')

	global.NEW_OVERWORLD_PLANTS.forEach(plant => {
		add('tfc:plants', plant);
		add('tfc:compost_greens/low', plant); // [PORT] compost_greens_low -> compost_greens/low
	});

	add('tfc:fluxstone', 'tfg:plant/mussels');
	add('tfc:fluxstone', 'tfg:plant/barnacles');

	// [PORT-Ф4-TODO] hornfels-блоки не зарегистрированы — гварды
	add('tfg:stone_composition/igneous_mafic', 'tfg:mafic_hornfels')
	add('tfg:stone_composition/metamorphic', 'tfg:pelitic_hornfels')
	add('tfg:stone_composition/sedimentary_carbonate', 'tfg:carbonate_hornfels')

	add('tfg:anemones', "tfg:plant/anemone_green");
	add('tfg:anemones', "tfg:plant/anemone_purple");
	add('tfg:anemones', "tfg:plant/anemone_large_orange");
	add('tfg:anemones', "tfg:plant/anemone_large_purple");
	add('tfc:compost_browns', '#tfg:anemones');

	// [PORT-CHECK] теги tfc:makes_*_dye — как в 1.20 (в датапаке TFC 1.21 не поставляются, потребитель — рецепты красок)
	add('tfc:makes_red_dye', 'tfg:plant/kinnikinnick')
	add('tfc:makes_red_dye', 'tfg:plant/tank_bromeliad')
	add('tfc:makes_brown_dye', 'tfg:plant/shawiash')
	add('tfc:makes_pink_dye', 'tfg:plant/ramunda')
	add('tfc:makes_pink_dye', 'tfg:plant/moss_campion')
	add('tfc:makes_magenta_dye', 'tfg:plant/azalea')
	add('tfc:makes_yellow_dye', 'tfg:plant/buttercup')
	add('tfc:makes_yellow_dye', 'tfg:plant/yellow_saxifrage')
	add('tfc:makes_yellow_dye', 'tfg:plant/cycad')
	add('tfc:makes_orange_dye', 'tfg:plant/elegant_sunburst_lichen')
	add('tfc:makes_orange_dye', 'tfg:plant/palash')
	add('tfc:makes_orange_dye', 'tfg:plant/qantu')
	add('tfc:makes_orange_dye', 'tfg:plant/flame_vine')
	add('tfc:makes_green_dye', 'tfg:plant/prickly_pear')
	add('tfc:makes_green_dye', 'tfg:plant/prickly_pear_purple')
	add('tfc:makes_green_dye', 'tfg:plant/silken_pincushion_cactus')
	add('tfc:makes_blue_dye', 'tfg:plant/cornflower')
	add('tfc:makes_light_blue_dye', 'tfg:plant/mountain_hullwort')
	add('tfc:makes_light_blue_dye', 'tfg:plant/penwortel')
	add('tfc:makes_purple_dye', 'tfg:plant/ramirezella')
	add('tfc:makes_white_dye', 'tfg:plant/edelweiss')
	add('tfc:makes_white_dye', 'tfg:plant/bear_grass')
	add('tfc:makes_light_gray_dye', 'tfg:plant/silver_bromeliad')
	add('tfc:makes_light_gray_dye', 'tfg:plant/eyeblossom')
	add('tfc:makes_light_gray_dye', 'tfg:plant/pale_hanging_moss')

	add('minecraft:flowers', 'tfg:plant/azalea')
	add('minecraft:flowers', 'tfg:plant/buttercup')
	add('minecraft:flowers', 'tfg:plant/cornflower')
	add('minecraft:flowers', 'tfg:plant/edelweiss')
	add('minecraft:flowers', 'tfg:plant/eyeblossom')
	add('minecraft:flowers', 'tfg:plant/mountain_hullwort')
	add('minecraft:flowers', 'tfg:plant/palash')
	add('minecraft:flowers', 'tfg:plant/penwortel')
	add('minecraft:flowers', 'tfg:plant/qantu')
	add('minecraft:flowers', 'tfg:plant/ramirezella')
	add('minecraft:flowers', 'tfg:plant/ramunda')
	add('minecraft:flowers', 'tfg:plant/yellow_saxifrage')
})

ServerEvents.tags('block', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.overworld tags.overworld block start')

	const add = (tag, entry) => {
		if (String(entry).startsWith('#') || owTagExists($OwTagBuiltInRegistries.BLOCK, entry)) {
			event.add(tag, entry);
		}
	}

	add('tfg:dry_plant_plantable_on', '#minecraft:sand');
	add('tfg:dry_plant_plantable_on', '#c:gravels'); // [PORT] forge:gravel -> c:gravels
	add('tfg:dry_plant_plantable_on', '#tfc:bush_plantable_on');
	add('tfg:dry_plant_plantable_on', '#c:sandstones'); // [PORT] forge:sandstone -> c:sandstones

	add('tfg:epiphyte_plantable_on', '#minecraft:logs');
	add('tfg:epiphyte_plantable_on', '#c:stones'); // [PORT] forge:stone -> c:stones
	add('tfg:epiphyte_plantable_on', '#c:sandstones');
	add('tfg:epiphyte_plantable_on', '#c:gravels');

	add('tfg:sea_stack_rocks', 'tfc:rock/hardened/basalt');
	add('tfg:sea_stack_rocks', 'tfc:rock/hardened/limestone');
	add('tfg:sea_stack_rocks', 'tfc:rock/hardened/marble');
	add('tfg:sea_stack_rocks', 'tfc:rock/hardened/rhyolite');

	add('tfg:anemone_plantable_on', '#c:stones');
	add('tfg:anemone_plantable_on', '#c:cobblestones'); // [PORT] forge:cobblestone -> c:cobblestones
	add('tfg:anemone_plantable_on', '#c:gravels');
	add('tfg:anemone_plantable_on', '#minecraft:sand');
	add('tfg:anemone_plantable_on', '#c:sandstones');

	// [PORT-Ф5] анемоны tfg:* — гварды
	add('tfg:is_anemone', 'tfg:plant/anemone_green');
	add('tfg:is_anemone', 'tfg:plant/anemone_purple');
	add('tfg:is_anemone', 'tfg:plant/anemone_large_orange');
	add('tfg:is_anemone', 'tfg:plant/anemone_large_purple');

	add('tfc:can_be_snow_piled', 'firmalife:plant/basil');
	add('tfc:can_be_snow_piled', 'firmalife:plant/bay_laurel');
	add('tfc:can_be_snow_piled', 'firmalife:plant/cardamom');
	add('tfc:can_be_snow_piled', 'firmalife:plant/cilantro');
	add('tfc:can_be_snow_piled', 'firmalife:plant/cumin');
	add('tfc:can_be_snow_piled', 'firmalife:plant/oregano');
	add('tfc:can_be_snow_piled', 'firmalife:plant/pimento');
	add('tfc:can_be_snow_piled', 'firmalife:plant/vanilla');
	// [PORT] beneath отсутствует в сборке 1.21.1
	// add('tfc:can_be_snow_piled', 'beneath:sulfur');

	event.removeAll('firmalife:butterfly_grass_mutants');
	add('firmalife:butterfly_grass_mutants', 'tfc:plant/bluegrass')
	add('firmalife:butterfly_grass_mutants', 'tfc:plant/bromegrass')
	add('firmalife:butterfly_grass_mutants', 'tfc:plant/fountain_grass')
	add('firmalife:butterfly_grass_mutants', 'tfc:plant/orchard_grass')
	add('firmalife:butterfly_grass_mutants', 'tfc:plant/pampas_grass')
	add('firmalife:butterfly_grass_mutants', 'tfc:plant/raddia_grass')
	add('firmalife:butterfly_grass_mutants', 'tfc:plant/ryegrass')
	add('firmalife:butterfly_grass_mutants', 'tfc:plant/scutch_grass')
	add('firmalife:butterfly_grass_mutants', 'tfc:plant/switchgrass')
	add('firmalife:butterfly_grass_mutants', 'tfc:plant/fall_fescue_grass')
	add('firmalife:butterfly_grass_mutants', 'tfc:plant/timothy_grass')
	add('firmalife:butterfly_grass_mutants', 'tfg:plant/red_oat_grass') // [PORT-Ф5]

	add('tfc:kaolin_clay_replaceable', '#tfc:mud');

	add('tfc:powder_snow_replaceable', 'minecraft:snow_block');
	add('tfc:powder_snow_replaceable', 'minecraft:ice');
	add('tfc:powder_snow_replaceable', 'minecraft:packed_ice');
	add('tfc:powder_snow_replaceable', 'minecraft:blue_ice');

	add('tfc:can_carve', 'tfg:gilsonite'); // [PORT-Ф4-TODO] блок не зарегистрирован — гвард

	// add("tfc:monster_spawns_on", "beneath:crackrack"); // [PORT] beneath отсутствует
	add("tfc:monster_spawns_on", "minecraft:calcite");
	add("tfc:monster_spawns_on", "tfg:mafic_hornfels"); // [PORT-Ф4-TODO]
	add("tfc:monster_spawns_on", "tfg:carbonate_hornfels");
	add("tfc:monster_spawns_on", "tfg:pelitic_hornfels");
	add("tfc:monster_spawns_on", "minecraft:packed_ice");
	add("tfc:monster_spawns_on", "minecraft:blue_ice");
})

ServerEvents.tags('worldgen/biome', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.overworld tags.overworld biome start')

	// [PORT-Ф5] биомы tfg:earth/* приедут с датапаком worldgen (Ф5); записи оставлены 1:1 —
	// несуществующие KubeJS пропускает с warning'ом, теги оживут вместе с биомами.

	// Structures
	event.add('tfg:has_structure/plains_temperate_0', 'tfc:plains')
	event.add('tfg:has_structure/plains_temperate_0', 'tfc:plateau')
	event.add('tfg:has_structure/plains_temperate_0', 'tfc:highlands')

	event.add('tfg:has_structure/plains_temperate_0', 'tfg:earth/burren_plains')
	event.add('tfg:has_structure/plains_temperate_0', 'tfg:earth/burren_plateau')
	event.add('tfg:has_structure/plains_temperate_0', 'tfg:earth/drumlins')
	event.add('tfg:has_structure/plains_temperate_0', 'tfg:earth/extinct_shield_volcano')
	event.add('tfg:has_structure/plains_temperate_0', 'tfg:earth/grassy_dunes')
	event.add('tfg:has_structure/plains_temperate_0', 'tfg:earth/highlands')
	event.add('tfg:has_structure/plains_temperate_0', 'tfg:earth/inverted_patterned_ground')
	event.add('tfg:has_structure/plains_temperate_0', 'tfg:earth/knob_and_kettle')
	event.add('tfg:has_structure/plains_temperate_0', 'tfg:earth/patterned_ground')
	event.add('tfg:has_structure/plains_temperate_0', 'tfg:earth/plains')
	event.add('tfg:has_structure/plains_temperate_0', 'tfg:earth/plateau')
	event.add('tfg:has_structure/plains_temperate_0', 'tfg:earth/plateau_wide')
	event.add('tfg:has_structure/plains_temperate_0', 'tfg:earth/rocky_plateau')

	event.add('tfg:has_structure/aqueduct', 'tfc:plains')
	event.add('tfg:has_structure/aqueduct', 'tfc:highlands')
	event.add('tfg:has_structure/aqueduct', 'tfc:lowlands')
	event.add('tfg:has_structure/aqueduct', 'tfc:badlands')

	event.add('tfg:has_structure/aqueduct', 'tfg:earth/badlands')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/burren_badlands')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/burren_plains')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/burren_roche_moutonee')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/buttes')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/canyons')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/cenote_canyons')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/cenote_highlands')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/cenote_hills')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/cenote_plains')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/doline_canyons')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/doline_highlands')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/doline_plains')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/drumlins')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/extreme_doline_plateau')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/grassy_dunes')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/highlands')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/hoodoos')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/lowlands')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/mesas')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/plains')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/shilin_plains')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/shilin_hills')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/shilin_highlands')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/stair_step_canyons')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/tower_karst_canyons')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/tower_karst_highlands')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/tower_karst_plains')
	event.add('tfg:has_structure/aqueduct', 'tfg:earth/tuyas')

	event.add('tfg:has_structure/ocean_moai_0', 'tfc:volcanic_oceanic_mountains')
	event.add('tfg:has_structure/ocean_moai_0', 'tfc:volcanic_mountains')

	event.add('tfg:has_structure/ocean_moai_0', 'tfg:earth/old_shield_volcano_shore')
	event.add('tfg:has_structure/ocean_moai_0', 'tfg:earth/shield_volcano_shore')
	event.add('tfg:has_structure/ocean_moai_0', 'tfg:earth/sunken_shield_volcano')
	event.add('tfg:has_structure/ocean_moai_0', 'tfg:earth/volcanic_oceanic_mountains')
	event.add('tfg:has_structure/ocean_moai_0', 'tfg:earth/volcanic_mountains')

	event.add('tfg:has_structure/illages', 'tfc:plains')
	event.add('tfg:has_structure/illages', 'tfc:hills')
	event.add('tfg:has_structure/illages', 'tfc:rolling_hills')
	event.add('tfg:has_structure/illages', 'tfc:badlands')
	event.add('tfg:has_structure/illages', 'tfc:plateau')
	event.add('tfg:has_structure/illages', 'tfc:old_mountains')

	event.add('tfg:has_structure/illages', 'tfg:earth/burren_plains')
	event.add('tfg:has_structure/illages', 'tfg:earth/burren_plateau')
	event.add('tfg:has_structure/illages', 'tfg:earth/drumlins')
	event.add('tfg:has_structure/illages', 'tfg:earth/hills')
	event.add('tfg:has_structure/illages', 'tfg:earth/inverted_patterned_ground')
	event.add('tfg:has_structure/illages', 'tfg:earth/knob_and_kettle')
	event.add('tfg:has_structure/illages', 'tfg:earth/patterned_ground')
	event.add('tfg:has_structure/illages', 'tfg:earth/plains')
	event.add('tfg:has_structure/illages', 'tfg:earth/plateau')
	event.add('tfg:has_structure/illages', 'tfg:earth/plateau_wide')
	event.add('tfg:has_structure/illages', 'tfg:earth/rocky_plateau')
	event.add('tfg:has_structure/illages', 'tfg:earth/stone_circles')

	event.add('tfg:has_structure/malay_illage', 'tfc:lowlands')
	event.add('tfg:has_structure/malay_illage', 'tfc:salt_marsh')
	event.add('tfg:has_structure/malay_illage', 'tfg:earth/lowlands')
	event.add('tfg:has_structure/malay_illage', 'tfg:earth/salt_marsh')
	event.add('tfg:never_has_structure/malay_illage', '#tfg:has_structure/illages')
	event.add('tfg:never_has_structure/malay_illage', '#tfg:earth/is_true_ocean')
	event.add('tfg:never_has_structure/malay_illage', '#tfg:earth/is_shore_island')
	event.add('tfg:never_has_structure/malay_illage', '#tfg:earth/is_dry')
	event.add('tfg:never_has_structure/malay_illage', '#tfg:earth/is_hill')
	event.add('tfg:never_has_structure/malay_illage', '#tfg:earth/is_karst')
	event.add('tfg:never_has_structure/malay_illage', '#tfg:earth/is_mountain')
	event.add('tfg:never_has_structure/malay_illage', '#tfg:earth/is_sandstone')
	event.add('tfg:never_has_structure/malay_illage', '#tfg:earth/is_volcanic')
	event.add('tfg:never_has_structure/malay_illage', 'tfc:ocean')
	event.add('tfg:never_has_structure/malay_illage', 'tfc:ocean_reef')
	event.add('tfg:never_has_structure/malay_illage', 'tfc:deep_ocean')
	event.add('tfg:never_has_structure/malay_illage', 'tfc:deep_ocean_trench')
	event.add('tfg:never_has_structure/malay_illage', 'tfc:shore')
	event.add('tfg:never_has_structure/malay_illage', 'tfc:hills')
	event.add('tfg:never_has_structure/malay_illage', 'tfc:canyons')

	event.add('tfg:has_structure/illager_camp', 'tfc:badlands')
	event.add('tfg:has_structure/illager_camp', 'tfc:canyons')
	event.add('tfg:has_structure/illager_camp', 'tfc:highlands')
	event.add('tfg:has_structure/illager_camp', 'tfc:hills')
	event.add('tfg:has_structure/illager_camp', 'tfc:inverted_badlands')
	event.add('tfg:has_structure/illager_camp', 'tfc:lowlands')
	event.add('tfg:has_structure/illager_camp', 'tfc:mountains')
	event.add('tfg:has_structure/illager_camp', 'tfc:oceanic_mountains')
	event.add('tfg:has_structure/illager_camp', 'tfc:old_mountains')
	event.add('tfg:has_structure/illager_camp', 'tfc:plains')
	event.add('tfg:has_structure/illager_camp', 'tfc:plateau')
	event.add('tfg:has_structure/illager_camp', 'tfc:rolling_hills')
	event.add('tfg:has_structure/illager_camp', 'tfc:salt_marsh')
	event.add('tfg:has_structure/illager_camp', 'tfc:shore')
	event.add('tfg:has_structure/illager_camp', 'tfc:tidal_flats')
	event.add('tfg:has_structure/illager_camp', 'tfc:volcanic_mountains')
	event.add('tfg:has_structure/illager_camp', 'tfc:volcanic_oceanic_mountains')

	event.add('tfg:has_structure/illager_camp', 'tfg:earth/ancient_shield_volcano')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/badlands')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/burren_badlands')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/burren_badlands_tall')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/burren_plains')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/burren_plateau')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/burren_roche_moutonee')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/canyons')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/cenote_canyons')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/cenote_highlands')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/cenote_hills')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/cenote_plains')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/cenote_plateau')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/cenote_rolling_hills')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/coastal_dunes')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/doline_canyons')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/doline_highlands')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/doline_hills')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/doline_plains')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/doline_plateau')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/doline_rolling_hills')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/dormant_shield_volcano')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/drumlins')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/embayments')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/extinct_shield_volcano')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/extreme_doline_plateau')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/grassy_dunes')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/highlands')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/hills')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/inverted_patterned_ground')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/mountains')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/mud_flats')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/oceanic_mountains')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/old_mountains')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/old_shield_volcano_shore')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/patterned_ground')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/plains')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/plateau')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/plateau_wide')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/rocky_plateau')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/rolling_hills')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/salt_flats')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/setback_cliffs')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/shield_volcano_shore')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/shore')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/stone_circles')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/tidal_flats')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/tuyas')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/volcanic_mountains')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/volcanic_oceanic_mountains')
	event.add('tfg:has_structure/illager_camp', 'tfg:earth/whorled_canyons')

	event.add('tfg:has_structure/illager_roaming', '#tfg:has_structure/illager_camp')

	event.add('tfg:never_has_structure/water', '#tfc:is_lake')
	event.add('tfg:never_has_structure/water', '#tfc:is_ocean')
	event.add('tfg:never_has_structure/water', '#tfc:is_river')
	event.add('tfg:never_has_structure/water', '#tfg:earth/is_lake')
	event.add('tfg:never_has_structure/water', '#tfg:earth/is_ocean')
	event.add('tfg:never_has_structure/water', '#tfg:earth/is_river')

	event.add('tfc_ruins:has_structure/ruin_beach', 'tfg:earth/coastal_dunes')
	event.add('tfc_ruins:has_structure/ruin_beach', 'tfg:earth/embayments')
	event.add('tfc_ruins:has_structure/ruin_beach', 'tfg:earth/shield_volcano_shore')
	event.add('tfc_ruins:has_structure/ruin_beach', 'tfg:earth/shore')
	event.add('tfc_ruins:has_structure/ruin_beach', 'tfg:earth/tidal_flats')

	event.add('tfc_ruins:has_structure/ruin_rich', 'tfg:earth/highlands')
	event.add('tfc_ruins:has_structure/ruin_rich', 'tfg:earth/plateau')
	event.add('tfc_ruins:has_structure/ruin_rich', 'tfg:earth/old_mountains')
	event.add('tfc_ruins:has_structure/ruin_rich', 'tfg:earth/rolling_hills')

	event.add('tfc_ruins:has_structure/ruin_small', 'tfg:earth/badlands')
	event.add('tfc_ruins:has_structure/ruin_small', 'tfg:earth/burren_badlands')
	event.add('tfc_ruins:has_structure/ruin_small', 'tfg:earth/burren_plains')
	event.add('tfc_ruins:has_structure/ruin_small', 'tfg:earth/burren_plateau')
	event.add('tfc_ruins:has_structure/ruin_small', 'tfg:earth/drumlins')
	event.add('tfc_ruins:has_structure/ruin_small', 'tfg:earth/hills')
	event.add('tfc_ruins:has_structure/ruin_small', 'tfg:earth/hoodoos')
	event.add('tfc_ruins:has_structure/ruin_small', 'tfg:earth/inverted_patterned_ground')
	event.add('tfc_ruins:has_structure/ruin_small', 'tfg:earth/knob_and_kettle')
	event.add('tfc_ruins:has_structure/ruin_small', 'tfg:earth/low_canyons')
	event.add('tfc_ruins:has_structure/ruin_small', 'tfg:earth/lowlands')
	event.add('tfc_ruins:has_structure/ruin_small', 'tfg:earth/patterned_ground')
	event.add('tfc_ruins:has_structure/ruin_small', 'tfg:earth/plains')
	event.add('tfc_ruins:has_structure/ruin_small', 'tfg:earth/plateau')
	event.add('tfc_ruins:has_structure/ruin_small', 'tfg:earth/plateau_wide')
	event.add('tfc_ruins:has_structure/ruin_small', 'tfg:earth/rocky_plateau')
	event.add('tfc_ruins:has_structure/ruin_small', 'tfg:earth/rolling_hills')
	event.add('tfc_ruins:has_structure/ruin_small', 'tfg:earth/stone_circles')

	// [PORT] tfc_ruined_world отсутствует в сборке — теги его неймспейса безвредны, оставлены 1:1
	event.add('tfc_ruined_world:has_structure/large_structure', 'tfg:earth/hills')
	event.add('tfc_ruined_world:has_structure/large_structure', 'tfg:earth/plateau')
	event.add('tfc_ruined_world:has_structure/large_structure', 'tfg:earth/plateau_wide')
	event.add('tfc_ruined_world:has_structure/large_structure', 'tfg:earth/plains')
	event.add('tfc_ruined_world:has_structure/large_structure', 'tfg:earth/patterned_ground')
	event.add('tfc_ruined_world:has_structure/large_structure', 'tfg:earth/inverted_patterned_ground')
	event.add('tfc_ruined_world:has_structure/large_structure', 'tfg:earth/mud_flats')
	event.add('tfc_ruined_world:has_structure/large_structure', 'tfg:earth/salt_flats')

	event.add('tfc_ruined_world:has_structure/small_structure', '#tfc_ruined_world:has_structure/large_structure')
	event.add('tfc_ruined_world:has_structure/small_structure', '#tfc_ruins:has_structure/ruin_small')

	event.add('tfc_ruined_world:has_structure/ancient_monument_1', '#tfc_ruined_world:has_structure/large_structure')
	event.add('tfc_ruined_world:has_structure/ancient_monument_2', '#tfc_ruined_world:has_structure/large_structure')
	event.add('tfc_ruined_world:has_structure/castle_1', '#tfc_ruined_world:has_structure/large_structure')
	event.add('tfc_ruined_world:has_structure/castle_2', '#tfc_ruined_world:has_structure/large_structure')
	event.add('tfc_ruined_world:has_structure/limestone_church', '#tfc_ruined_world:has_structure/large_structure')
	event.add('tfc_ruined_world:has_structure/medium_gneiss_church', '#tfc_ruined_world:has_structure/large_structure')
	event.add('tfc_ruined_world:has_structure/small_gneiss_church', '#tfc_ruined_world:has_structure/large_structure')
	event.add('tfc_ruined_world:has_structure/small_limestone_church', '#tfc_ruined_world:has_structure/large_structure')
	event.add('tfc_ruined_world:has_structure/small_limestone_church_2', '#tfc_ruined_world:has_structure/large_structure')
	event.add('tfc_ruined_world:has_structure/tower_1', '#tfc_ruined_world:has_structure/small_structure')
	event.add('tfc_ruined_world:has_structure/tower_2', '#tfc_ruined_world:has_structure/small_structure')
	event.add('tfc_ruined_world:has_structure/tower_3', '#tfc_ruined_world:has_structure/small_structure')
	event.add('tfc_ruined_world:has_structure/tower_4', '#tfc_ruined_world:has_structure/small_structure')
	event.add('tfc_ruined_world:has_structure/tower_5', '#tfc_ruined_world:has_structure/small_structure')
	event.add('tfc_ruined_world:has_structure/towerhouse_1', '#tfc_ruined_world:has_structure/small_structure')
	event.add('tfc_ruined_world:has_structure/towerhouse_2', '#tfc_ruined_world:has_structure/small_structure')

	// Kaolin
	event.add("tfc:kaolin_clay_spawns_in", "tfc:rolling_hills");

	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/rolling_hills");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/highlands");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/plateau");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/plateau_wide");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/old_mountains");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/tower_karst_hills");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/tower_karst_highlands");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/extreme_doline_plateau");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/extreme_doline_mountains");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/doline_rolling_hills");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/doline_highlands");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/doline_plateau");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/cenote_rolling_hills");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/cenote_highlands");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/cenote_plateau");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/shilin_highlands");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/shilin_plateau");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/active_shield_volcano");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/dormant_shield_volcano");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/extinct_shield_volcano");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/ancient_shield_volcano");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/ice_sheet_shield_volcano");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/glaciated_shield_volcano");
	event.add("tfc:kaolin_clay_spawns_in", "tfg:earth/sunken_shield_volcano");

	global.TFC_BIOMES.forEach(biome => {
		event.add('tfg:overworld_biomes', biome);
	})
	global.NEW_TFC_BIOMES.forEach(biome => {
		event.add('tfg:overworld_biomes', biome);
	})

	// [PORT] waves отсутствует в сборке 1.21.1
	// event.add('waves:has_waves', '#tfg:earth/is_ocean');
})

ServerEvents.tags('worldgen/placed_feature', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.overworld tags.overworld placed_feature start')

	// [PORT-Ф5] фичи tfg:* приедут с датапаком worldgen (Ф5) — записи оставлены 1:1

	// Rose quartz
	// Old worldgen
	event.add('tfc:in_biome/surface_decoration/ocean', 'tfg:earth/rose_quartz/rose_quartz')
	event.add('tfc:in_biome/surface_decoration/ocean_reef', 'tfg:earth/rose_quartz/rose_quartz')
	event.add('tfc:in_biome/surface_decoration/deep_ocean', 'tfg:earth/rose_quartz/rose_quartz')
	event.add('tfc:in_biome/surface_decoration/deep_ocean_trench', 'tfg:earth/rose_quartz/rose_quartz')
	event.add('tfc:in_biome/surface_decoration/shore', 'tfg:earth/rose_quartz/rose_quartz')
	event.add('tfc:in_biome/surface_decoration/tidal_flats', 'tfg:earth/rose_quartz/rose_quartz')
	event.add('tfc:in_biome/surface_decoration/lowlands', 'tfg:earth/rose_quartz/rose_quartz')
	event.add('tfc:in_biome/surface_decoration/salt_marsh', 'tfg:earth/rose_quartz/rose_quartz')
	event.add('tfc:in_biome/surface_decoration/plains', 'tfg:earth/rose_quartz/rose_quartz')
	event.add('tfc:in_biome/surface_decoration/lake', 'tfg:earth/rose_quartz/rose_quartz')
	// Mew worldgen
	event.add('tfg:in_biome/surface_decoration/ice_sheet', 'tfg:earth/rose_quartz/rose_quartz')
	event.add('tfg:in_biome/surface_decoration/ice_sheet_mountains', 'tfg:earth/rose_quartz/rose_quartz')
	event.add('tfg:in_biome/surface_decoration/ice_sheet_oceanic', 'tfg:earth/rose_quartz/rose_quartz')
	event.add('tfg:in_biome/surface_decoration/ice_sheet_oceanic_mountains', 'tfg:earth/rose_quartz/rose_quartz')
	event.add('tfg:in_biome/surface_decoration/ice_sheet_shield_volcano', 'tfg:earth/rose_quartz/rose_quartz')
	event.add('tfg:in_biome/surface_decoration/ice_sheet_shore', 'tfg:earth/rose_quartz/rose_quartz')
	event.add('tfg:in_biome/surface_decoration/ice_sheet_tuyas', 'tfg:earth/rose_quartz/rose_quartz')
	event.add('tfg:in_biome/surface_decoration/subglacial_lake', 'tfg:earth/rose_quartz/rose_quartz')
	event.add('tfg:in_biome/surface_decoration/glaciated_mountains', 'tfg:earth/rose_quartz/rose_quartz')
	event.add('tfg:in_biome/surface_decoration/glacited_oceanic_mountains', 'tfg:earth/rose_quartz/rose_quartz')
	event.add('tfg:in_biome/surface_decoration/glacited_shield_volcano', 'tfg:earth/rose_quartz/rose_quartz')

	// Tarkianite
	event.add('tfc:in_biome/veins', 'tfg:earth/vein/normal_tarkianite')
	event.add('tfc:in_biome/veins', 'tfg:earth/vein/desert_oilsands')

	// Add back the non-ore ones
	event.add("tfc:in_biome/veins", "tfc:vein/gravel");
	event.add("tfc:in_biome/veins", "tfc:vein/kaolin_disc");
	event.add("tfc:in_biome/veins", "tfc:vein/granite_dike");
	event.add("tfc:in_biome/veins", "tfc:vein/diorite_dike");
	event.add("tfc:in_biome/veins", "tfc:vein/gabbro_dike");

	// Geodes
	event.add("tfc:in_biome/veins", "tfg:earth/geode/amethyst");
	event.add("tfc:in_biome/veins", "tfg:earth/geode/barite");
	event.add("tfc:in_biome/veins", "tfg:earth/geode/calcite");
	event.add("tfc:in_biome/veins", "tfg:earth/geode/gypsum");
	event.add("tfc:in_biome/veins", "tfg:earth/geode/opal");
	event.add("tfc:in_biome/veins", "tfg:earth/geode/pyrite");
	event.add("tfc:in_biome/veins", "tfg:earth/geode/quartzite");

	// Crops
	event.add("tfc:feature/crops", "tfg:earth/crop/sunflower_patch");
	event.add("tfc:feature/crops", "tfg:earth/crop/rapeseed_patch");
	event.add("tfc:feature/crops", "tfg:earth/crop/flax_patch");
	event.add("tfc:feature/crops", "tfg:earth/crop/radish_patch");
	event.add("tfc:feature/crops", "tfg:earth/crop/lentil_patch");
	event.add("tfc:feature/crops", "tfg:earth/crop/cucumber_patch");
	// Herbs and spices
	event.add("tfc:feature/crops", "tfg:earth/crop/basil_patch");
	event.add("tfc:feature/crops", "tfg:earth/crop/bay_laurel_patch");
	event.add("tfc:feature/crops", "tfg:earth/crop/cardamom_patch");
	event.add("tfc:feature/crops", "tfg:earth/crop/cilantro_patch");
	event.add("tfc:feature/crops", "tfg:earth/crop/cumin_patch");
	event.add("tfc:feature/crops", "tfg:earth/crop/oregano_patch");
	event.add("tfc:feature/crops", "tfg:earth/crop/pimento_patch");
	event.add("tfc:feature/crops", "tfg:earth/crop/vanilla_patch");
	// TODO: add mustard

	// Other decoration
	// Old worldgen
	event.add("tfc:in_biome/underground_decoration", "tfg:glow_lichen");
	event.add("tfc:in_biome/underground_decoration", "tfg:earth/sulfur_patch");
	event.add("tfc:in_biome/underground_decoration", "tfg:earth/oil_spout");
	event.add("tfc:in_biome/underground_decoration", "tfg:earth/flint_patch");
	event.add("tfc:in_biome/underground_decoration", "tfg:earth/sand");
	// New worldgen
	event.add("tfg:in_biome/underground_decoration", "tfg:glow_lichen");
	event.add("tfg:in_biome/underground_decoration", "tfg:earth/sulfur_patch");
	event.add("tfg:in_biome/underground_decoration", "tfg:earth/oil_spout");
	event.add("tfg:in_biome/underground_decoration", "tfg:earth/flint_patch");
	event.add("tfg:in_biome/underground_decoration", "tfg:earth/sand");

	// Volcanoes
	event.add("tfg:feature/volcanoes", "tfg:earth/volcano/random_cinder_cone");

	event.add("tfg:feature/tuyas", "tfg:earth/volcano/tuya_smoke");
	event.add("tfg:feature/tuyas", "tfg:earth/volcano/tuya_sulfur_patch");
	event.add("tfg:feature/tuyas", "tfg:earth/volcano/tuya_ash_pile");

	event.add("tfg:feature/shield_volcanoes", "tfg:earth/volcano/sulfur_patch");
	event.add("tfg:feature/shield_volcanoes", "tfg:earth/volcano/volcanic_ash_pile");
	event.add("tfg:in_biome/surface_decoration/active_shield_volcano", "tfg:earth/volcano/volcano_smoke_random");

	// Fluid veins
	event.add("tfc:in_biome/underground_structures", "tfg:earth/fluid_vein/oil_spout_and_sands");
	event.add("tfc:in_biome/underground_structures", "tfg:earth/fluid_vein/spring_water");
	event.add("tfc:in_biome/underground_structures", "tfg:earth/fluid_vein/oil_ocean");
	event.add("tfc:in_biome/underground_structures", "tfg:earth/fluid_vein/oil_light_ocean");
	event.add("tfc:in_biome/underground_structures", "tfg:earth/fluid_vein/oil_medium_ocean");
	event.add("tfc:in_biome/underground_structures", "tfg:earth/fluid_vein/oil_heavy_ocean");
	event.add("tfc:in_biome/underground_structures", "tfg:earth/fluid_vein/oil_tar_spring");
	event.add("tfc:in_biome/underground_structures", "tfg:earth/fluid_vein/oil_tar_light_spring");
	event.add("tfc:in_biome/underground_structures", "tfg:earth/fluid_vein/oil_tar_medium_spring");
	event.add("tfc:in_biome/underground_structures", "tfg:earth/fluid_vein/oil_tar_heavy_spring");
	event.add("tfc:in_biome/underground_structures", "tfg:earth/fluid_vein/gas_vent");
	event.add("tfc:in_biome/underground_structures", "tfg:earth/fluid_vein/gas_vent_ocean");

	// Remove hot springs from old worldgen biomes
	event.remove("tfc:in_biome/large_features/old_mountains", "tfc:random_active_hot_spring")
	event.remove("tfc:in_biome/large_features/volcanic_mountains", "tfc:random_active_hot_spring")
	event.remove("tfc:in_biome/large_features/canyons", "tfc:random_active_hot_spring")
})

ServerEvents.tags('entity_type', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.overworld tags.overworld entity_type start')

	// [PORT] гвард: мобы tfg:* приедут с Ф5, waves/endermanoverhaul отсутствуют
	const add = (tag, entry) => {
		if (String(entry).startsWith('#') || owTagExists($OwTagBuiltInRegistries.ENTITY_TYPE, entry)) {
			event.add(tag, entry);
		}
	}

	// Tag used by TFC to control monsters spawning on the surface
	// add('tfc:vanilla_monsters', 'endermanoverhaul:flower_fields_enderman') // [PORT] endermanoverhaul отсутствует
	add('tfc:vanilla_monsters', 'minecraft:enderman')
	add('tfc:vanilla_monsters', 'minecraft:husk')
	add('tfc:vanilla_monsters', 'minecraft:drowned')
	add('tfc:vanilla_monsters', 'minecraft:slime')

	add('tfc:deals_crushing_damage', 'minecraft:husk')
	add('tfc:deals_crushing_damage', 'minecraft:drowned')
	add('tfc:deals_crushing_damage', 'minecraft:slime')
	add('tfc:deals_slashing_damage', 'minecraft:enderman')

	add('tfc:zombies', 'minecraft:drowned')
	add('tfc:zombies', 'minecraft:zombified_piglin')

	add('tfg:slimes', 'minecraft:slime')
	add('tfg:slimes', 'minecraft:magma_cube')
	add('tfg:slimes', 'tfg:slime') // [PORT-Ф5]

	// Takes no damage from the new 1.21 cacti
	// add('tfg:ignores_cacti', 'waves:waves') // [PORT] waves отсутствует
	add('tfg:ignores_cacti', 'tfg:jerboa') // [PORT-Ф5]
	add('tfg:ignores_cacti', 'tfc:horse')
	add('tfg:ignores_cacti', 'tfc:donkey')
	add('tfg:ignores_cacti', 'tfc:mule')

	add('tfc:amphibious_creatures', 'tfg:leopard_seal') // [PORT-Ф5]
	add('tfc:spawns_on_cold_blocks', 'tfg:leopard_seal')

	add('tfc:hunted_by_ocean_predators', 'tfg:leopard_seal')
	add('tfc:hunted_by_ocean_predators', 'tfc:penguin')
	add('tfc:hunted_by_ocean_predators', 'tfc:turtle')

	add('tfc:land_prey', 'tfg:leopard_seal')

	add('tfc:hunted_by_dogs', 'tfg:jerboa')
	add('tfc:hunted_by_dogs', 'tfg:lemming')
	add('tfc:hunted_by_dogs', 'tfg:mongoose')
	add('tfc:hunted_by_cats', 'tfg:jerboa')
	add('tfc:hunted_by_cats', 'tfg:lemming')
	add('tfc:hunted_by_cats', 'tfg:mongoose')

	add('tfg:not_rammed_by_rammers', '#tfc:bubble_column_immune')
	add('tfg:not_rammed_by_rammers', '#tfc:pests')
	add('tfg:not_rammed_by_rammers', 'tfc:frog')
})
