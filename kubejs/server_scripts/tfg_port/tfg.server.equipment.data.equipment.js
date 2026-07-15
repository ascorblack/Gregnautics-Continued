// priority: 0
"use strict";

// [PORT] Порт tfg/equipment/data.equipment.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT] registerTFGEquipmentData -> прямой обработчик TFCEvents.data (KubeJS 7: изолированные скоупы).
// [PORT-FIX] kubejs_tfc 2.0.1: event.itemDamageResistance(ingredient, PhysicalDamage, id?) — урон кодек-объектом
//   { piercing, slashing, crushing } (поля опциональны, проверено по net/dries007/tfc/util/PhysicalDamage);
//   в 1.x были позиционные аргументы (ingredient, piercing, slashing, crushing).
// [PORT-Ф10] ad_astra отсутствует (stellaris не авто-ремапим) — записи скафандров закомментированы.

TFCEvents.data(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.equipment data.equipment start')

	// #region Armor resistances

	event.itemDamageResistance('create:copper_diving_helmet', { piercing: 2, slashing: 2, crushing: 2 }, 'tfg:copper_diving_helmet')
	event.itemDamageResistance('create:copper_backtank', { piercing: 2, slashing: 2, crushing: 2 }, 'tfg:copper_backtank')
	event.itemDamageResistance('create:copper_diving_boots', { piercing: 2, slashing: 2, crushing: 2 }, 'tfg:copper_diving_boots')
	// [PORT] дубль create:copper_diving_helmet из оригинала опущен (повторная запись перекрывала бы первую)

	event.itemDamageResistance('gtceu:hazmat_headpiece', { crushing: 3 }, 'tfg:hazmat_headpiece')
	event.itemDamageResistance('gtceu:hazmat_chestpiece', { crushing: 3 }, 'tfg:hazmat_chestpiece')
	event.itemDamageResistance('gtceu:hazmat_leggings', { crushing: 3 }, 'tfg:hazmat_leggings')
	event.itemDamageResistance('gtceu:hazmat_boots', { crushing: 3 }, 'tfg:hazmat_boots')

	event.itemDamageResistance('create:netherite_diving_helmet', { piercing: 13, slashing: 13, crushing: 15 }, 'tfg:netherite_diving_helmet')
	event.itemDamageResistance('create:netherite_backtank', { piercing: 13, slashing: 13, crushing: 15 }, 'tfg:netherite_backtank')
	event.itemDamageResistance('minecraft:netherite_leggings', { piercing: 13, slashing: 13, crushing: 15 }, 'tfg:netherite_leggings')
	event.itemDamageResistance('minecraft:netherite_boots', { piercing: 13, slashing: 13, crushing: 15 }, 'tfg:netherite_boots')
	event.itemDamageResistance('create:netherite_diving_boots', { piercing: 13, slashing: 13, crushing: 15 }, 'tfg:netherite_diving_boots')

	event.itemDamageResistance('gtceu:nanomuscle_helmet', { piercing: 16, slashing: 16, crushing: 16 }, 'tfg:nanomuscle_helmet')
	event.itemDamageResistance('gtceu:nanomuscle_chestplate', { piercing: 16, slashing: 16, crushing: 16 }, 'tfg:nanomuscle_chestplate')
	event.itemDamageResistance('gtceu:advanced_nanomuscle_chestplate', { piercing: 16, slashing: 16, crushing: 16 }, 'tfg:advanced_nanomuscle_chestplate')
	event.itemDamageResistance('gtceu:nanomuscle_leggings', { piercing: 16, slashing: 16, crushing: 16 }, 'tfg:nanomuscle_leggings')
	event.itemDamageResistance('gtceu:nanomuscle_boots', { piercing: 16, slashing: 16, crushing: 16 }, 'tfg:nanomuscle_boots')

	event.itemDamageResistance('gtceu:quarktech_helmet', { piercing: 24, slashing: 24, crushing: 24 }, 'tfg:quarktech_helmet')
	event.itemDamageResistance('gtceu:quarktech_chestplate', { piercing: 24, slashing: 24, crushing: 24 }, 'tfg:quarktech_chestplate')
	event.itemDamageResistance('gtceu:advanced_quarktech_chestplate', { piercing: 24, slashing: 24, crushing: 24 }, 'tfg:advanced_quarktech_chestplate')
	event.itemDamageResistance('gtceu:quarktech_leggings', { piercing: 24, slashing: 24, crushing: 24 }, 'tfg:quarktech_leggings')
	event.itemDamageResistance('gtceu:quarktech_boots', { piercing: 24, slashing: 24, crushing: 24 }, 'tfg:quarktech_boots')

	// [PORT-Ф10] ad_astra отсутствует в сборке 1.21.1
	// event.itemDamageResistance('ad_astra:space_helmet', { piercing: 16, slashing: 16, crushing: 16 })
	// event.itemDamageResistance('ad_astra:space_suit', { piercing: 16, slashing: 16, crushing: 16 })
	// event.itemDamageResistance('ad_astra:space_pants', { piercing: 16, slashing: 16, crushing: 16 })
	// event.itemDamageResistance('ad_astra:space_boots', { piercing: 16, slashing: 16, crushing: 16 })
	// event.itemDamageResistance('ad_astra:netherite_space_helmet', { piercing: 21, slashing: 21, crushing: 21 })
	// event.itemDamageResistance('ad_astra:netherite_space_suit', { piercing: 21, slashing: 21, crushing: 21 })
	// event.itemDamageResistance('ad_astra:netherite_space_pants', { piercing: 21, slashing: 21, crushing: 21 })
	// event.itemDamageResistance('ad_astra:netherite_space_boots', { piercing: 21, slashing: 21, crushing: 21 })

	// #endregion
})
