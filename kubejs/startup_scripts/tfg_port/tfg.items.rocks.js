// priority: 0
"use strict";

// [PORT] TFG 1.20.1 startup_scripts/tfg/stone_types/items.rocks.js -> 1.21.1 (Gregnautics).
// [PORT] Ф2-диспетчер отключён — регистрируем напрямую через StartupEvents.registry('item').
// [PORT] Текстура берётся автоматически: tfg:brick/<id> -> kubejs/assets/tfg/textures/item/brick/<id>.png
// [PORT] (совпадает с путями оригинальных ассетов TFG, ставятся отдельно).

StartupEvents.registry('item', event => {
	console.info('[Gregnautics] progress: tfg_port rocks registry start (item)')

	for (let [rockId, rock] of Object.entries(global.BIG_ROCK_TABLE)) {

		if (rock.brick != null && rock.brick.startsWith('tfg:brick/')) {
			let brickItem = event.create(rock.brick);

			if (rock.tfcTag != null) {
				brickItem.tag(rock.tfcTag)
			}
		}
	}

	console.info('[Gregnautics] progress: tfg_port rocks registry done (item)')
})
