// priority: 0
"use strict";

// [PORT] Порт tfg/equipment/events.equipment.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT-Ф10] ad_astra отсутствует (stellaris не авто-ремапим) — альтернативы скафандров вырезаны из условий.
// [PORT-FIX] KubeJS 7: сравнение ItemStack === 'id' (строгое равенство Rhino) ненадёжно — сравниваем .id;
//   доступ к слотам через getItemBySlot('head'|'chest'|'legs'|'feet').
// [PORT-CHECK] player.potionEffects.add(effect, duration, amplifier, ambient, visible) — проверить в игре.

PlayerEvents.tick((event) => {
	const { player } = event;
	if (player.age % 100 === 0) {
		const headId = player.getItemBySlot('head').id;
		const chestId = player.getItemBySlot('chest').id;
		const legsId = player.getItemBySlot('legs').id;
		const feetId = player.getItemBySlot('feet').id;

		if (headId === 'create:netherite_diving_helmet'
			&& chestId === 'create:netherite_backtank'
			&& legsId === 'minecraft:netherite_leggings'
			&& (feetId === 'create:netherite_diving_boots'
				|| feetId === 'minecraft:netherite_boots')) {
			player.potionEffects.add("minecraft:fire_resistance", 350, 0, true, false);
		}

		if (legsId === 'gtceu:nanomuscle_leggings') {
			player.potionEffects.add("minecraft:speed", 350, 0, true, false);
		}
	}
});
