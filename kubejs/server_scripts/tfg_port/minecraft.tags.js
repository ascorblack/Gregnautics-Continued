// priority: 0
"use strict";

// [PORT] Порт minecraft/tags.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT] registerMinecraftItemTags / registerMinecraftBlockTags -> прямые обработчики ServerEvents.tags (KubeJS 7: изолированные скоупы, диспетчер не используется).
// [PORT] forge: -> c: (конвенция NeoForge 1.21); forge:sand/gravel/cobblestone -> c:sands/gravels/cobblestones (NeoForge пляурализовал общие тэги).

ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port minecraft item tags start')

	event.removeAllTagsFrom("minecraft:lantern");
	event.removeAllTagsFrom("minecraft:raw_iron_block");
	event.removeAllTagsFrom("minecraft:grass_block");
	event.removeAllTagsFrom("minecraft:infested_deepslate");
	event.removeAllTagsFrom("minecraft:furnace");

	global.MINECRAFT_HIDED_ITEMS.forEach(item => {
		event.add('c:hidden_from_recipe_viewers', item)
	})

	// Hide potions
	event.add('c:hidden_from_recipe_viewers', /minecraft.*potion.*/)

	// Теперь обсидиан сторадж блок
	event.add('c:storage_blocks/obsidian', 'minecraft:obsidian') // [PORT] forge: -> c:

	// Бамбуковые полублоки
	event.add('tfg:bamboo_slabs', 'minecraft:bamboo_slab')
	event.add('tfg:bamboo_slabs', 'minecraft:bamboo_mosaic_slab')

	event.remove('minecraft:creeper_drop_music_discs', ['minecraft:music_disc_11'])

	event.remove('c:gems', 'tfc:ore/lignite') // [PORT] forge: -> c:
	event.remove('c:gems', 'tfc:ore/bituminous_coal') // [PORT] forge: -> c:
	// [PORT] beneath отсутствует в сборке 1.21.1: event.remove('c:gems', 'beneath:cursecoal')
	event.remove('c:gems', 'minecraft:charcoal') // [PORT] forge: -> c:
	event.remove('c:gems', 'minecraft:flint') // [PORT] forge: -> c:

	event.add('tfc:colored_terracotta', 'minecraft:white_terracotta')

	event.add('tfc:bells', 'minecraft:bell')

	event.add('tfc:makes_black_dye', 'minecraft:ink_sac')
	event.add('tfc:makes_white_dye', 'minecraft:bone_meal')

	event.add('create:blaze_burner_fuel/regular', 'tfc:ore/lignite')
	event.add('create:blaze_burner_fuel/regular', 'tfc:ore/bituminous_coal')
	event.add('create:blaze_burner_fuel/regular', 'minecraft:charcoal')

	event.add("tfg:rubber_plants", "minecraft:spore_blossom")

	event.add('tfg:stonecutting/crackrack', 'minecraft:nether_brick_fence')
})

ServerEvents.tags('block', event => {
	console.info('[Gregnautics] progress: tfg_port minecraft block tags start')

	global.MINECRAFT_HIDED_ITEMS.forEach(item => {
		event.add('c:hidden_from_recipe_viewers', item)
	})
	event.removeAllTagsFrom("minecraft:lantern");
	event.removeAllTagsFrom("minecraft:raw_iron_block");
	event.removeAllTagsFrom("minecraft:grass_block");
	event.removeAllTagsFrom("minecraft:infested_deepslate");
	event.removeAllTagsFrom("minecraft:furnace");

	// Stops saws from being able to pick up ice
	event.remove('minecraft:ice', 'minecraft:ice')
	event.remove('minecraft:ice', 'tfc:sea_ice')

	// Теперь обсидиан сторадж блок
	event.add('c:storage_blocks/obsidian', 'minecraft:obsidian') // [PORT] forge: -> c:
	event.remove('minecraft:needs_diamond_tool', 'minecraft:obsidian')

	event.add('minecraft:mineable/pickaxe', 'minecraft:glowstone')

	// Things endermen can pick up and move around
	event.removeAll('minecraft:enderman_holdable');
	event.add('minecraft:enderman_holdable', '#tfc:dirt')
	event.add('minecraft:enderman_holdable', '#tfc:mud')
	event.add('minecraft:enderman_holdable', '#tfc:loose_rocks')
	event.add('minecraft:enderman_holdable', '#c:gravels') // [PORT] forge:gravel -> c:gravels (NeoForge 1.21)
	event.add('minecraft:enderman_holdable', '#c:sands') // [PORT] forge:sand -> c:sands (NeoForge 1.21)
	event.add('minecraft:enderman_holdable', '#c:cobblestones') // [PORT] forge:cobblestone -> c:cobblestones (NeoForge 1.21)
	event.add('minecraft:enderman_holdable', '#tfc:plants')
	// [PORT] beneath отсутствует в сборке 1.21.1: event.add('minecraft:enderman_holdable', '#tfg:plants/beneath')
	// [PORT-Ф4] тэги tfg: планетарных растений ещё не определены (ad_astra-контент, Фаза 4):
	// event.add('minecraft:enderman_holdable', '#tfg:moon_plants')
	// event.add('minecraft:enderman_holdable', '#tfg:mars_plants')
	// event.add('minecraft:enderman_holdable', '#tfg:venus_plants')
	// event.add('minecraft:enderman_holdable', '#tfg:mercury_plants')
	// event.add('minecraft:enderman_holdable', '#tfg:europa_plants')
	event.add('minecraft:enderman_holdable', 'tfc:pumpkin')
	event.add('minecraft:enderman_holdable', 'tfc:melon')
	// [PORT] betterend отсутствует в сборке 1.21.1: event.add('minecraft:enderman_holdable', 'betterend:cave_pumpkin')
	event.add('minecraft:enderman_holdable', '#minecraft:leaves')
	// [PORT] beneath отсутствует в сборке 1.21.1: event.add('minecraft:enderman_holdable', 'beneath:wood/leaves/crimson')
	// [PORT] beneath отсутствует в сборке 1.21.1: event.add('minecraft:enderman_holdable', 'beneath:wood/leaves/warped')
	// [PORT-Ф4] event.add('minecraft:enderman_holdable', 'tfg:glacian_leaves')
	// [PORT-Ф4] тэг tfg:solid_leaves ещё не определён: event.add('minecraft:enderman_holdable', '#tfg:solid_leaves')
})
