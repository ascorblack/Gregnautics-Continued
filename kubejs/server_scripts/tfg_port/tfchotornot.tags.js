// priority: 0
"use strict";

// [PORT] KubeJS 7: диспетчер main_server_script.js заменён на прямую регистрацию событий в файле

ServerEvents.tags('item', (event) => {
	console.info('[Gregnautics] progress: tfg_port tfchotornot item tags start')

	event.add('tfchotornot:hot_whitelist', '#c:hot_ingots') // [PORT] forge: -> c:
	event.add('tfchotornot:hot_whitelist', 'minecraft:magma_block')
	event.add('tfchotornot:cold_whitelist', 'minecraft:blue_ice')
	// event.add('tfchotornot:cold_whitelist', 'tfg:dry_ice') // [PORT-Ф4]
	// event.add('tfchotornot:hot_whitelist', 'tfg:asphalt_road_hot') // [PORT-Ф4]

	global.TFC_MAGMA_BLOCKS.forEach(magma => {
		event.add('tfchotornot:hot_whitelist', magma)
	})

	global.TFC_METALS.forEach(metal => {
		event.add('tfchotornot:tong_parts', `tfchotornot:tong_part/${metal}`)
	})

	event.add('firmalife:usable_on_oven', '#tfchotornot:insulating')

	event.add('tfg:insulating_container', '#gtceu:super_tanks')
	event.add('tfg:insulating_container', '#gtceu:fluid_cells')
	event.add('tfg:insulating_container', 'tfc:metal/lamp/blue_steel')

	event.add('tfg:hot_protection_equipment', 'tfc:metal/chestplate/blue_steel')
	event.add('tfg:hot_protection_equipment', 'tfc:metal/boots/blue_steel')
	// event.add('tfg:hot_protection_equipment', 'sns:blue_steel_toe_hiking_boots') // [PORT] sns отсутствует в сборке 1.21.1
	event.add('tfg:hot_protection_equipment', 'minecraft:netherite_boots')
	event.add('tfg:hot_protection_equipment', 'create:netherite_backtank')
	event.add('tfg:hot_protection_equipment', 'create:netherite_diving_boots')
	// event.add('tfg:hot_protection_equipment', 'ad_astra:netherite_space_suit') // [PORT] ad_astra отсутствует в сборке 1.21.1
	// event.add('tfg:hot_protection_equipment', 'ad_astra:netherite_space_boots') // [PORT] ad_astra отсутствует в сборке 1.21.1
	event.add('tfg:hot_protection_equipment', 'gtceu:hazmat_chestpiece')
	event.add('tfg:hot_protection_equipment', 'gtceu:hazmat_boots')
	event.add('tfg:hot_protection_equipment', 'gtceu:quarktech_chestplate')
	event.add('tfg:hot_protection_equipment', 'gtceu:advanced_quarktech_chestplate')
	event.add('tfg:hot_protection_equipment', 'gtceu:quarktech_boots')

	event.add('tfg:cold_protection_equipment', 'tfc:metal/chestplate/red_steel')
	event.add('tfg:cold_protection_equipment', 'tfc:metal/boots/red_steel')
	// event.add('tfg:cold_protection_equipment', 'sns:red_steel_toe_hiking_boots') // [PORT] sns отсутствует в сборке 1.21.1
	// event.add('tfg:cold_protection_equipment', 'ad_astra:space_boots') // [PORT] ad_astra отсутствует в сборке 1.21.1
	// event.add('tfg:cold_protection_equipment', 'ad_astra:space_suit') // [PORT] ad_astra отсутствует в сборке 1.21.1
	// event.add('tfg:cold_protection_equipment', 'ad_astra:netherite_space_suit') // [PORT] ad_astra отсутствует в сборке 1.21.1
	// event.add('tfg:cold_protection_equipment', 'ad_astra:netherite_space_boots') // [PORT] ad_astra отсутствует в сборке 1.21.1
	event.add('tfg:cold_protection_equipment', 'gtceu:hazmat_chestpiece')
	event.add('tfg:cold_protection_equipment', 'gtceu:hazmat_boots')
	event.add('tfg:cold_protection_equipment', 'gtceu:quarktech_chestplate')
	event.add('tfg:cold_protection_equipment', 'gtceu:advanced_quarktech_chestplate')
	event.add('tfg:cold_protection_equipment', 'gtceu:quarktech_boots')

	event.add('tfg:floating_protection_equipment', 'create:copper_diving_boots')
	event.add('tfg:floating_protection_equipment', 'create:netherite_diving_boots')
	// event.add('tfg:floating_protection_equipment', 'ad_astra:space_boots') // [PORT] ad_astra отсутствует в сборке 1.21.1
	// event.add('tfg:floating_protection_equipment', 'ad_astra:netherite_space_boots') // [PORT] ad_astra отсутствует в сборке 1.21.1
	event.add('tfg:floating_protection_equipment', 'gtceu:hazmat_boots')
	event.add('tfg:floating_protection_equipment', 'gtceu:quarktech_boots')
})

ServerEvents.tags('fluid', (event) => {
	console.info('[Gregnautics] progress: tfg_port tfchotornot fluid tags start')

	event.add("tfchotornot:gaseous_whitelist", 'gtceu:helium')
	event.add("tfchotornot:gaseous_whitelist", 'gtceu:helium_3')
	event.add("tfchotornot:gaseous_whitelist", 'gtceu:hydrogen')
	event.add("tfchotornot:gaseous_whitelist", 'gtceu:coal_gas')
	event.add("tfchotornot:gaseous_whitelist", 'gtceu:methane')

	event.add("tfchotornot:fluid_whitelist", '#firmalife:oils')
	// event.add("tfchotornot:fluid_whitelist", '#tfg:oil_fluids') // [PORT-Ф4] тег tfg:oil_fluids появится с датапаком tfg (фаза 4)
})
