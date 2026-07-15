// priority: 0
"use strict";

// [PORT] из tacz/data.js (TFG 1.20.1); функция registerTFCDataForTACZ заменена на прямую регистрацию TFCEvents.data
// [PORT-FIX] kubejs_tfc 2.0.1: itemSize принимает codec-объект {ingredient, size, weight}, а не позиционные аргументы

TFCEvents.data(event => {
	console.info('[Gregnautics] progress: tfg_port tacz tfc data start')

	event.itemSize({ ingredient: 'tacz:modern_kinetic_gun', size: 'large', weight: 'medium' }) // [PORT-FIX] codec object form
	event.itemSize({ ingredient: 'tacz:attachment', size: 'normal', weight: 'light' }) // [PORT-FIX] codec object form
})
