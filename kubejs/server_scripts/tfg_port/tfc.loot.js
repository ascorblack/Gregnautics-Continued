// priority: 0
"use strict";
// [PORT] tfc/loot.js -> LootJS 3.x (1.21.1): addEntityLootModifier->addEntityModifier,
// addBlockLootModifier->addBlockModifier, ItemFilter.ALWAYS_TRUE->ItemFilter.ANY,
// addWeightedLoot([a,b], [item])->addLoot(LootEntry.of(item, [a,b])) (все списки были из 1 предмета),
// .not(n => n.matchMainHand(tag))->matchMainHand(ItemFilter.not(ItemFilter.tag(tag))).
// [PORT] #forge:tools/butchery_knives -> #c:tools/butchery_knife (GTM8: c:tools/* в единственном числе, проверено по CustomTags GTCEu 8.0).
// [PORT] tfc_textile отсутствует в сборке — меха заменены на стандартные шкуры TFC ([PORT-FIX] ниже).

LootJS.modifiers(event => {
	console.info('[Gregnautics] progress: tfg_port tfc.loot modifiers start')

	const BUTCHERY_KNIFE = ItemFilter.tag('c:tools/butchery_knife') // [PORT] было '#forge:tools/butchery_knives'

	// Hostile animals

	event.addEntityModifier('tfc:black_bear')
		.removeLoot(ItemFilter.ANY)
		// .addLoot('tfc_textile:black_bear_fur') // [PORT] tfc_textile отсутствует
		.addLoot('tfc:large_raw_hide') // [PORT-FIX] взамен меха — шкура из стандартного лут-листа TFC
		.addLoot(LootEntry.of('minecraft:bone', [1, 6]))
		.addLoot(LootEntry.of('tfc:food/bear', [8, 12]))
		.addLoot(LootEntry.of('tfc:blubber', [1, 2]))
		.addSequenceLoot(LootEntry.of('waterflasks:bladder').when(c => c.randomChance(0.2)))

	event.addEntityModifier('tfc:black_bear')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/bear', [4, 6]))


	event.addEntityModifier('tfc:panda')
		.addLoot('tfc:large_raw_hide')
		.addLoot(LootEntry.of('minecraft:bone', [1, 6]))
		.addLoot(LootEntry.of('tfc:food/bear', [8, 12]))
		.addLoot(LootEntry.of('tfc:blubber', [1, 2]))

	event.addEntityModifier('tfc:panda')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/bear', [4, 6]))


	event.addEntityModifier('tfc:grizzly_bear')
		.removeLoot(ItemFilter.ANY)
		// .addLoot('tfc_textile:grizzly_bear_fur') // [PORT] tfc_textile отсутствует
		.addLoot('tfc:large_raw_hide') // [PORT-FIX]
		.addLoot(LootEntry.of('minecraft:bone', [1, 6]))
		.addLoot(LootEntry.of('tfc:food/bear', [10, 16]))
		.addLoot(LootEntry.of('tfc:blubber', [1, 2]))
		.addSequenceLoot(LootEntry.of('waterflasks:bladder').when(c => c.randomChance(0.2)))

	event.addEntityModifier('tfc:grizzly_bear')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/bear', [5, 8]))


	event.addEntityModifier('tfc:polar_bear')
		.removeLoot(ItemFilter.ANY)
		// .addLoot('tfc_textile:polar_bear_fur') // [PORT] tfc_textile отсутствует
		.addLoot('tfc:large_raw_hide') // [PORT-FIX]
		.addLoot(LootEntry.of('minecraft:bone', [1, 6]))
		.addLoot(LootEntry.of('tfc:food/bear', [14, 20]))
		.addLoot(LootEntry.of('tfc:blubber', [6, 12]))
		.addSequenceLoot(LootEntry.of('waterflasks:bladder').when(c => c.randomChance(0.2)))

	event.addEntityModifier('tfc:polar_bear')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/bear', [7, 10]))
		.addLoot(LootEntry.of('tfc:blubber', [3, 6]))


	event.addEntityModifier('tfc:cougar')
		.removeLoot(ItemFilter.ANY)
		// .addLoot('tfc_textile:cougar_fur') // [PORT] tfc_textile отсутствует
		.addLoot('tfc:large_raw_hide') // [PORT-FIX]
		.addLoot(LootEntry.of('minecraft:bone', [1, 6]))
		.addLoot(LootEntry.of('tfc:food/gran_feline', [6, 10]))

	event.addEntityModifier('tfc:cougar')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/gran_feline', [3, 5]))


	event.addEntityModifier('tfc:panther')
		.removeLoot(ItemFilter.ANY)
		// .addLoot('tfc_textile:panther_fur') // [PORT] tfc_textile отсутствует
		.addLoot('tfc:large_raw_hide') // [PORT-FIX]
		.addLoot(LootEntry.of('minecraft:bone', [1, 6]))
		.addLoot(LootEntry.of('tfc:food/gran_feline', [6, 10]))

	event.addEntityModifier('tfc:panther')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/gran_feline', [3, 5]))


	event.addEntityModifier('tfc:sabertooth')
		.removeLoot(ItemFilter.ANY)
		// .addLoot('tfc_textile:sabertooth_fur') // [PORT] tfc_textile отсутствует
		.addLoot('tfc:large_raw_hide') // [PORT-FIX]
		.addLoot(LootEntry.of('minecraft:bone', [1, 8]))
		.addLoot(LootEntry.of('tfc:food/gran_feline', [9, 14]))
		.addLoot(LootEntry.of('tfc:blubber', [1, 2]))

	event.addEntityModifier('tfc:sabertooth')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/gran_feline', [4, 7]))


	event.addEntityModifier('tfc:lion')
		.removeLoot(ItemFilter.ANY)
		// .addLoot('tfc_textile:lion_fur') // [PORT] tfc_textile отсутствует
		.addLoot('tfc:large_raw_hide') // [PORT-FIX]
		.addLoot(LootEntry.of('minecraft:bone', [1, 6]))
		.addLoot(LootEntry.of('tfc:food/gran_feline', [9, 14]))

	event.addEntityModifier('tfc:lion')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/gran_feline', [4, 7]))


	event.addEntityModifier('tfc:tiger')
		.removeLoot(ItemFilter.ANY)
		// .addLoot('tfc_textile:tiger_fur') // [PORT] tfc_textile отсутствует
		.addLoot('tfc:large_raw_hide') // [PORT-FIX]
		.addLoot(LootEntry.of('minecraft:bone', [1, 7]))
		.addLoot(LootEntry.of('tfc:food/gran_feline', [9, 14]))

	event.addEntityModifier('tfc:tiger')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/gran_feline', [4, 7]))


	event.addEntityModifier('tfc:ocelot')
		.addLoot('tfc:small_raw_hide')
		.addLoot(LootEntry.of('minecraft:bone', [1, 2]))
		.addLoot(LootEntry.of('tfc:food/gran_feline', [2, 5]))

	event.addEntityModifier('tfc:ocelot')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/gran_feline', [1, 2]))


	event.addEntityModifier('tfc:cat')
		.addLoot(LootEntry.of('tfc:food/gran_feline', [2, 5]))

	event.addEntityModifier('tfc:cat')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/gran_feline', [1, 2]))


	event.addEntityModifier('tfc:dog')
		.addLoot(LootEntry.of('tfc:food/wolf', [5, 8]))
		.addLoot(LootEntry.of('tfc:blubber', [1, 2]))

	event.addEntityModifier('tfc:dog')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/wolf', [2, 4]))


	event.addEntityModifier('tfc:wolf')
		.addLoot(LootEntry.of('tfc:food/wolf', [5, 8]))

	event.addEntityModifier('tfc:wolf')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/wolf', [2, 4]))


	event.addEntityModifier('tfc:direwolf')
		.removeLoot(ItemFilter.ANY)
		// .addLoot('tfc_textile:direwolf_fur') // [PORT] tfc_textile отсутствует
		.addLoot('tfc:medium_raw_hide') // [PORT-FIX] взамен меха — шкура из стандартного лут-листа TFC
		.addLoot(LootEntry.of('minecraft:bone', [1, 6]))
		.addLoot(LootEntry.of('tfc:food/wolf', [8, 12]))

	event.addEntityModifier('tfc:direwolf')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/wolf', [4, 6]))


	event.addEntityModifier('tfc:hyena')
		.addLoot(LootEntry.of('tfc:food/hyena', [4, 7]))

	event.addEntityModifier('tfc:hyena')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/hyena', [2, 4]))


	event.addEntityModifier('tfc:fox')
		.addLoot(LootEntry.of('tfc:food/fox', [4, 7]))

	event.addEntityModifier('tfc:fox')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/fox', [2, 4]))


	event.addEntityModifier('tfc:crocodile')
		.removeLoot(ItemFilter.ANY)
		// .addLoot('tfc_textile:crocodile_leather') // [PORT] tfc_textile отсутствует
		.addLoot('tfc:large_raw_hide') // [PORT-FIX]
		.addLoot(LootEntry.of('minecraft:bone', [1, 7]))
		.addSequenceLoot(LootEntry.of('tfc:metal/fish_hook/copper').when(c => c.randomChance(0.2)))

	//event.addEntityModifier('tfc:crocodile')
	//	.matchMainHand(BUTCHERY_KNIFE)
	//	.addWeightedLoot([2, 5], ['tfc:food/bluegill', 'tfc:food/crappie', 'tfc:food/lake_trout', 'tfc:food/rainbow_trout', 'tfc:food/frog_legs'])


	// Passive animals

	event.addEntityModifier('tfc:alpaca')
		.addSequenceLoot(LootEntry.of('waterflasks:bladder').when(c => c.randomChance(0.1)))

	event.addEntityModifier('tfc:alpaca')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/camelidae', [5, 10]))
		.addLoot(LootEntry.of('tfc:blubber', [1, 2]))


	event.addEntityModifier('tfc:boar')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/pork', [2, 4]))
		.addLoot(LootEntry.of('tfc:blubber', [3, 5]))


	event.addEntityModifier('tfc:bongo')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/venison', [2, 4]))
		.addLoot(LootEntry.of('tfc:blubber', [1, 2]))


	event.addEntityModifier('tfc:caribou')
		.removeLoot(ItemFilter.ANY)
		// .addLoot('tfc_textile:caribou_fur') // [PORT] tfc_textile отсутствует
		.addLoot('tfc:medium_raw_hide') // [PORT-FIX]
		.addLoot(LootEntry.of('tfc:food/venison', [6, 10]))
		.addLoot(LootEntry.of('minecraft:bone', [1, 6]))
		.addLoot(LootEntry.of('tfc:blubber', [3, 6]))

	event.addEntityModifier('tfc:caribou')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/venison', [3, 5]))


	event.addEntityModifier('tfc:chicken')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/chicken', [1, 3]))


	event.addEntityModifier('tfc:cow')
		.addSequenceLoot(LootEntry.of('waterflasks:bladder').when(c => c.randomChance(0.5)))
		.addLoot(LootEntry.of('firmalife:rennet', 6))

	event.addEntityModifier('tfc:cow')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/beef', [8, 12]))
		.addLoot(LootEntry.of('tfc:blubber', [2, 4]))


	event.addEntityModifier('tfc:deer')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/venison', [2, 4]))
		.addLoot(LootEntry.of('tfc:blubber', [1, 2]))


	event.addEntityModifier('tfc:dolphin')
		.removeLoot(ItemFilter.ANY)
		.addLoot(LootEntry.of('tfc:blubber', [6, 12]))
		.addLoot(LootEntry.of('minecraft:bone', [3, 5]))

	event.addEntityModifier('tfc:dolphin')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:blubber', [3, 6]))


	event.addEntityModifier('tfc:donkey')
		.addSequenceLoot(LootEntry.of('waterflasks:bladder').when(c => c.randomChance(0.2)))

	event.addEntityModifier('tfc:donkey')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/horse_meat', [7, 10]))
		.addLoot(LootEntry.of('tfc:blubber', [1, 2]))


	event.addEntityModifier('tfc:duck')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/duck', [1, 3]))


	event.addEntityModifier('tfc:frog')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/frog_legs', [1, 2]))


	event.addEntityModifier('tfc:gazelle')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/venison', [2, 4]))
		.addLoot(LootEntry.of('tfc:blubber', [1, 2]))


	event.addEntityModifier('tfc:goat')
		.addSequenceLoot(LootEntry.of('waterflasks:bladder').when(c => c.randomChance(0.1)))
		.addLoot(LootEntry.of('firmalife:rennet', 4))

	event.addEntityModifier('tfc:goat')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/chevon', [4, 6]))
		.addLoot(LootEntry.of('tfc:blubber', [1, 2]))


	event.addEntityModifier('tfc:grouse')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/grouse', [1, 2]))


	event.addEntityModifier('tfc:horse')
		.addSequenceLoot(LootEntry.of('waterflasks:bladder').when(c => c.randomChance(0.2)))

	event.addEntityModifier('tfc:horse')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/horse_meat', [7, 10]))
		.addLoot(LootEntry.of('tfc:blubber', [1, 2]))


	event.addEntityModifier('tfc:manatee')
		.removeLoot(ItemFilter.ANY)
		.addLoot(LootEntry.of('tfc:blubber', [5, 12]))
		.addLoot(LootEntry.of('minecraft:bone', [1, 5]))

	event.addEntityModifier('tfc:manatee')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:blubber', [2, 6]))


	event.addEntityModifier('tfc:moose')
		.addSequenceLoot(LootEntry.of('waterflasks:bladder').when(c => c.randomChance(0.5)))

	event.addEntityModifier('tfc:moose')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/venison', [5, 10]))
		.addLoot(LootEntry.of('tfc:blubber', [3, 6]))


	event.addEntityModifier('tfc:mule')
		.addSequenceLoot(LootEntry.of('waterflasks:bladder').when(c => c.randomChance(0.2)))

	event.addEntityModifier('tfc:mule')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/horse_meat', [7, 10]))
		.addLoot(LootEntry.of('tfc:blubber', [1, 2]))


	event.addEntityModifier('tfc:musk_ox')
		.addLoot(LootEntry.of('tfc:blubber', [2, 4]))
		.addSequenceLoot(LootEntry.of('waterflasks:bladder').when(c => c.randomChance(0.5)))
		.addLoot(LootEntry.of('firmalife:rennet', 6))

	event.addEntityModifier('tfc:musk_ox')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/mutton', [7, 10]))


	event.addEntityModifier('tfc:peafowl')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/peafowl', [1, 2]))


	event.addEntityModifier('tfc:pheasant')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/pheasant', [1, 2]))


	event.addEntityModifier('tfc:pig')
		.addLoot(LootEntry.of('tfc:blubber', [4, 6]))

	event.addEntityModifier('tfc:pig')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/pork', [5, 7]))
		.addLoot(LootEntry.of('tfc:blubber', [2, 3]))


	event.addEntityModifier('tfc:orca')
		.removeLoot(ItemFilter.ANY)
		.addLoot(LootEntry.of('tfc:blubber', [12, 20]))
		.addLoot(LootEntry.of('minecraft:bone', [3, 7]))

	event.addEntityModifier('tfc:orca')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:blubber', [6, 10]))


	event.addEntityModifier('tfc:quail')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/quail', [1, 3]))


	event.addEntityModifier('tfc:rabbit')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot('tfc:food/rabbit')


	event.addEntityModifier('tfc:sheep')
		.addSequenceLoot(LootEntry.of('waterflasks:bladder').when(c => c.randomChance(0.1)))
		.addLoot(LootEntry.of('firmalife:rennet', 6))

	event.addEntityModifier('tfc:sheep')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/mutton', [6, 9]))
		.addLoot(LootEntry.of('tfc:blubber', [1, 2]))


	event.addEntityModifier('tfc:turkey')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/turkey', [1, 2]))


	event.addEntityModifier('tfc:turtle')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot('tfc:food/turtle')


	event.addEntityModifier('tfc:wildebeest')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/beef', [4, 7]))
		.addLoot(LootEntry.of('tfc:blubber', [2, 3]))


	event.addEntityModifier('tfc:yak')
		.addSequenceLoot(LootEntry.of('waterflasks:bladder').when(c => c.randomChance(0.5)))
		.addLoot(LootEntry.of('firmalife:rennet', 4))

	event.addEntityModifier('tfc:yak')
		.matchMainHand(BUTCHERY_KNIFE)
		.addLoot(LootEntry.of('tfc:food/chevon', [7, 10]))
		.addLoot(LootEntry.of('tfc:blubber', [3, 6]))

	event.addEntityModifier('tfc:jellyfish')
		.addLoot('tfc:glue')


	// Blocks

	event.addBlockModifier('minecraft:ice')
		.removeLoot(ItemFilter.ANY)

	event.addBlockModifier('minecraft:ice')
		.matchMainHand(ItemFilter.not(ItemFilter.tag('tfg:silk_harvest_ice'))) // [PORT] .not(...) -> ItemFilter.not
		.addLoot('firmalife:ice_shavings')

	event.addBlockModifier('minecraft:ice')
		.matchMainHand(ItemFilter.tag('tfg:silk_harvest_ice'))
		.addLoot('minecraft:ice');

	event.addBlockModifier('minecraft:packed_ice')
		.matchMainHand(ItemFilter.not(ItemFilter.tag('c:tools/saw'))) // [PORT] forge:tools/saws -> c:tools/saw
		.addLoot(LootEntry.of('firmalife:ice_shavings', [4, 6]))

	event.addBlockModifier('minecraft:blue_ice')
		.matchMainHand(ItemFilter.not(ItemFilter.tag('c:tools/saw'))) // [PORT] forge:tools/saws -> c:tools/saw
		.addLoot(LootEntry.of('firmalife:ice_shavings', [8, 12]))

	event.addBlockModifier('tfc:sea_ice')
		.removeLoot(ItemFilter.ANY)
		.addLoot('firmalife:ice_shavings')
		.addSequenceLoot(LootEntry.of('tfc:powder/salt').when(c => c.randomChance(0.2)))
})
