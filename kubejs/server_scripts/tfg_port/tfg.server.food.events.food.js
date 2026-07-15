// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/food/events.food.js — возврат формы для пирога после съедания.

console.info('[Gregnautics] progress: tfg_port tfg.server.food.events.food start');

ItemEvents.foodEaten('firmalife:food/cooked_pie', event => {
	if (event.player.isCreative() === false) {
		event.player.give('firmalife:pie_pan');
	}
});

ItemEvents.foodEaten('minecraft:pumpkin_pie', event => {
	if (event.player.isCreative() === false) {
		event.player.give('firmalife:pie_pan');
	}
});
