// priority: 0
"use strict";

// [PORT] KubeJS 7: диспетчер main_server_script.js больше не используется — событие регистрируется напрямую
ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port toolbelt recipes start')

	event.remove({ mod: 'toolbelt' });

	// [PORT] sns (Smithing 'n' Stuff?) отсутствует в сборке 1.21.1 — рецепт закомментирован (sns:leather_strip)
	// [PORT] теги: forge:string -> c:string, forge:bolts/rose_gold -> c:bolts/rose_gold
	/*
	event.shaped('toolbelt:pouch', [
		'ACA',
		'BAB'
	], {
		A: '#c:string',
		B: 'sns:leather_strip',
		C: '#c:bolts/rose_gold'
	}).id('tfg:toolbelt/shaped/pouch')
	*/

	// [PORT] sns отсутствует в сборке 1.21.1 (sns:leather_strip, sns:buckle) — рецепт закомментирован
	// [PORT-CHECK] NBT->components needs in-game verification: Item.of('toolbelt:belt', { Size: 2 })
	/*
	event.shaped(Item.of('toolbelt:belt', { Size: 2 }), [
		'ABA',
		'B B',
		'BCB'
	], {
		A: '#c:string',
		B: 'sns:leather_strip',
		C: 'sns:buckle'
	}).id(`tfg:toolbelt/shaped/belt_${2}`)
	*/

	// [PORT-CHECK] NBT->components needs in-game verification: modifyResult читает/пишет orig.nbt (Size пояса) — в 1.21 нужен data component тулбелта
	/*
	event.shapeless('toolbelt:belt', ['toolbelt:belt', 'toolbelt:pouch'])
		.modifyResult((grid, result) => {
			let orig = grid.find(Item.of('toolbelt:belt').ignoreNBT())

			if (orig.nbt == null) {
				orig.nbt = { Size: 3 };
			}
			else {
				if (orig.nbt.Size == null) {
					orig.nbt = { Size: 3 };
				}
				else {
					orig.nbt.Size = orig.nbt.getInt("Size") + 1;
				}
			}

			return result.withNBT(orig.nbt);
		})
	*/

	// [PORT-CHECK] NBT->components needs in-game verification: удаление nbt.display (сброс покраски пояса золой) — в 1.21 это компонент minecraft:dyed_color / custom_name
	/*
	event.shapeless('toolbelt:belt', ['toolbelt:belt', 'tfc:powder/wood_ash'])
		.modifyResult((grid, result) => {
			let orig = grid.find(Item.of('toolbelt:belt').ignoreNBT())

			if (orig.nbt == null || orig.nbt.display == null) {
				return result;
			}
			else {
				delete orig.nbt.display;
				return result.withNBT(orig.nbt);
			}
		})
	*/
})
