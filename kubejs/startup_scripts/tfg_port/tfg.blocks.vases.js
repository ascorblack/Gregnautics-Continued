// priority: 0
"use strict";

// [PORT] Из TFG startup_scripts/tfg/primitive/blocks.vases.js (Ф4).
// Диспетчер Ф2 отключён — регистрация напрямую через StartupEvents.registry.
// Изменения 1.20→1.21:
//  - .model(x) → .parentModel(x) (KubeJS 7: сгенерированная модель наследует кастомную)
//  - Аттачмент 'tfc:inventory' (kubejs_tfc 2.0.1): ключ size → sizeFilter

function registerTFGVaseBlocks(event) {

	global.MINECRAFT_DYE_NAMES.forEach(color => {
		event.create(`tfg:decorative_vase/generated/${color}`, 'cardinal')
			.parentModel(`tfg:block/decorative_vase/loot_vase_${color}`) // [PORT] model → parentModel
			.soundType('decorated_pot')
			.hardness(0.7)
			.tagBlock('minecraft:mineable/pickaxe')
			.mapColor(global.tfgMapColor(color)) // [PORT-FIX] white/lime не имеют color_*-имён
			.box(2, 0, 2, 14, 20, 14)
			.fullBlock(false)
			.opaque(false)
			.renderType('cutout')

		event.create(`tfg:decorative_vase/${color}`, 'cardinal')
			.parentModel(`tfg:block/decorative_vase/vase_${color}`) // [PORT]
			.soundType('decorated_pot')
			.hardness(0.7)
			.tagBlock('minecraft:mineable/pickaxe')
			.mapColor(global.tfgMapColor(color)) // [PORT-FIX] white/lime не имеют color_*-имён
			.box(2, 0, 2, 14, 20, 14)
			.fullBlock(false)
			.opaque(false)
			.renderType('cutout')
			.blockEntity(be => {
				// [PORT-FIX] KubeJS 7: attach(имя, тип, стороны, аргументы) + rightClickOpensInventory(имя)
				// (синтаксис из run/kubejs примеров kubejs_tfc 1.21.1)
				be.attach('inv', 'tfc:inventory', [], {
					width: 9,
					height: 1,
					sizeFilter: size => size.isSmallerThan('large') // [PORT] size → sizeFilter
				})
				be.rightClickOpensInventory('inv')
			})

		event.create(`tfg:decorative_vase/unfired/${color}`, 'cardinal')
			.parentModel(`tfg:block/decorative_vase/vase_unfired_${color}`) // [PORT]
			.soundType('decorated_pot')
			.hardness(0.7)
			.tagBlock('minecraft:mineable/pickaxe')
			.mapColor(global.tfgMapColor(color)) // [PORT-FIX] white/lime не имеют color_*-имён
			.box(2, 0, 2, 14, 20, 14)
			.fullBlock(false)
			.opaque(false)
			.renderType('cutout')
	})
	event.create('tfg:decorative_vase', 'cardinal')
		.parentModel('tfg:block/decorative_vase/vase') // [PORT]
		.soundType('decorated_pot')
		.hardness(0.7)
		.tagBlock('minecraft:mineable/pickaxe')
		.mapColor(`color_gray`)
		.box(2, 0, 2, 14, 20, 14)
		.fullBlock(false)
		.opaque(false)
		.renderType('cutout')
		.blockEntity(be => {
			// [PORT-FIX] KubeJS 7: attach(имя, тип, стороны, аргументы)
			be.attach('inv', 'tfc:inventory', [], {
				width: 9,
				height: 1,
				sizeFilter: size => size.isSmallerThan('large') // [PORT] size → sizeFilter
			})
			be.rightClickOpensInventory('inv')
		})

	event.create('tfg:decorative_vase/unfired', 'cardinal')
		.parentModel('tfg:block/decorative_vase/vase_unfired') // [PORT]
		.soundType('decorated_pot')
		.hardness(0.7)
		.tagBlock('minecraft:mineable/pickaxe')
		.mapColor(`color_gray`)
		.box(2, 0, 2, 14, 20, 14)
		.fullBlock(false)
		.opaque(false)
		.renderType('cutout')

}

// [PORT] Прямая регистрация вместо диспетчера Ф2
StartupEvents.registry('block', event => {
	console.info('[Gregnautics] progress: tfg_port primitive registry start')
	registerTFGVaseBlocks(event)
})
