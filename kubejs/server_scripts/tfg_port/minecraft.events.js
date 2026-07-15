"use strict";

// [PORT] Порт minecraft/events.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT] Обработчик уже был зарегистрирован напрямую (PlayerEvents.tick) — структура сохранена.
// [PORT-CHECK] в оригинале комментарий про Луну, но проверяется minecraft:the_nether — оставлено как в оригинале.

console.info('[Gregnautics] progress: tfg_port minecraft events start') // [PORT] лог вынесен на уровень файла — tick-обработчик вызывается 20 раз/с

PlayerEvents.tick(event => {

	// make levitation last shorter, so shulkers aren't so deadly on the moon
	const { player, level, level: { dimension } } = event;
	if (player.age % 20 === 0) {
		if (event.player.hasEffect('minecraft:levitation') && dimension == "minecraft:the_nether") {
			if (event.player.getEffect('minecraft:levitation').getDuration() > 60) {
				event.player.potionEffects.add('minecraft:levitation', 60, 0, true, true)
			}
		}
	}
});
