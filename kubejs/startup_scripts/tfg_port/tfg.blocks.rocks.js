// priority: 0
"use strict";

// [PORT] TFG 1.20.1 startup_scripts/tfg/stone_types/blocks.rocks.js -> 1.21.1 (Gregnautics).
// [PORT] Ф2-диспетчер отключён — регистрируем напрямую через StartupEvents.registry('block').
// [PORT] Изменения API:
// [PORT]   KubeJS 6 -> 2101.7.2: .textureAll(x) -> .texture(x); .itemTexture(x) -> .texture(['itemTexture'], x);
// [PORT]     `a ?? b` -> явные проверки (парсер-чекер не знает nullish, Rhino — знает, но так надёжнее).
// [PORT]   kubejs_tfc 1.20 -> 2.0.1: .rockTypeModel(x) -> .rockCategory(x); .naturallySupported(bool) удалён из RawRockBlockBuilder.
// [PORT]   Forge -> NeoForge: 'forge:stone' -> 'c:stones', 'forge:gravel' -> 'c:gravels' (conventions-теги 1.21).
// [PORT] Типы билдеров kubejs_tfc проверены по jar 2.0.1: raw_rock, loose_rock, rock_spike, aqueduct, support — есть.

StartupEvents.registry('block', event => {
	console.info('[Gregnautics] progress: tfg_port rocks registry start (block)')

	const SHAPES = ['stair', 'slab', 'wall'];

	function createMissingForms(rock, blockEntry) {
		if (blockEntry === undefined || blockEntry === null)
			return;

		let texture = blockEntry.texture != null ? blockEntry.texture : blockEntry.block.replace(/:/g, ":block/"); // [PORT] ?? -> явная проверка

		if (blockEntry.block.startsWith('tfg:rock/')) {
			let block = event.create(blockEntry.block)
				.texture(texture) // [PORT] textureAll -> texture
				.soundType(rock.sound != null ? rock.sound : 'stone')
				.mapColor(global.tfgMapColor(rock.mapColor)) // [PORT-FIX]
				.tagBlock('minecraft:mineable/pickaxe')
				.requiresTool(true)
				.fullBlock(true)
				.opaque(true)
				.hardness(5)
				.resistance(8)

			if (rock.tfcTag != null) {
				block.tagBoth(rock.tfcTag);
			}
		}

		SHAPES.forEach(shape => {
			if (blockEntry[shape] != null && blockEntry[shape].startsWith('tfg:rock/')) {
				let block = event.create(blockEntry[shape], shape.replace(/stair/g, 'stairs'))
					.texture(texture) // [PORT] textureAll -> texture
					.soundType(rock.sound != null ? rock.sound : 'stone')
					.mapColor(global.tfgMapColor(rock.mapColor)) // [PORT-FIX]
					.tagBlock('minecraft:mineable/pickaxe')
					.requiresTool(true)
					.fullBlock(true)
					.opaque(true)
					.hardness(5)
					.resistance(8)

				if (rock.tfcTag != null) {
					block.tagBoth(rock.tfcTag);
				}
			}
		})
	}


	for (let [rockId, rock] of Object.entries(global.BIG_ROCK_TABLE)) {
		// Do raw separately because of the tfc:raw_rock builder
		let rawTexture = "";
		if (rock.raw != null) {
			rawTexture = rock.raw.texture != null ? rock.raw.texture : rock.raw.block.replace(/:/g, ":block/"); // [PORT] ?? -> явная проверка

			if (rock.raw.block.startsWith('tfg:rock/')) {
				let block = event.create(rock.raw.block, 'tfc:raw_rock')
					.texture(rawTexture) // [PORT] textureAll -> texture
					.soundType(rock.sound != null ? rock.sound : 'stone')
					.mapColor(global.tfgMapColor(rock.mapColor)) // [PORT-FIX]
					.tagBlock('minecraft:mineable/pickaxe')
					.requiresTool(true)
					.fullBlock(true)
					.opaque(true)
					// [PORT] .naturallySupported(false) — метода нет в kubejs_tfc 2.0.1 (RawRockBlockBuilder);
					// [PORT] поведение "естественно поддержан" в TFC 1.21 задаётся блокстейтом по умолчанию.
					.hardness(5)
					.resistance(8)

				if (rock.tfcTag != null) {
					block.tagBoth(rock.tfcTag);
				}
			}

			SHAPES.forEach(shape => {
				if (rock.raw[shape] != null && rock.raw[shape].startsWith('tfg:rock/')) {
					let block = event.create(rock.raw[shape], shape.replace(/stair/g, 'stairs'))
						.texture(rawTexture) // [PORT] textureAll -> texture
						.soundType(rock.sound != null ? rock.sound : 'stone')
						.mapColor(global.tfgMapColor(rock.mapColor)) // [PORT-FIX]
						.tagBoth(`tfg:rock_${shape}s`)
						.tagBlock('minecraft:mineable/pickaxe')
						.requiresTool(true)
						.fullBlock(true)
						.opaque(true)
						.hardness(5)
						.resistance(8)

					if (rock.tfcTag != null) {
						block.tagBoth(rock.tfcTag);
					}
				}
			})
		}

		createMissingForms(rock, rock.cobble);
		if (rock.cobble != null) {
			createMissingForms(rock, rock.cobble.mossy);
		}
		createMissingForms(rock, rock.bricks);
		if (rock.bricks != null) {
			createMissingForms(rock, rock.bricks.mossy);
			createMissingForms(rock, rock.bricks.cracked);
		}
		createMissingForms(rock, rock.polished);
		createMissingForms(rock, rock.chiseled);

		if (rock.stonecutting != null) {
			rock.stonecutting.forEach(stonecuttingEntry => {
				createMissingForms(rock, stonecuttingEntry);
				createMissingForms(rock, stonecuttingEntry.mossy);
				createMissingForms(rock, stonecuttingEntry.cracked);
			});
		}

		// Individual blocks

		// Hardened
		if (rock.raw != null && rock.hardened != null && rock.hardened.startsWith('tfg:rock/')) {
			let hardened = event.create(rock.hardened)
				.texture(rawTexture) // [PORT] textureAll -> texture
				.soundType(rock.sound != null ? rock.sound : 'stone')
				.property(BlockProperties.AXIS)
				.requiresTool(true)
				.tagBlock('tfc:can_carve')
				.tagBoth('c:stones') // [PORT] forge:stone -> c:stones (NeoForge conventions)
				.tagBoth('tfc:rock/hardened')
				.mapColor(global.tfgMapColor(rock.mapColor)) // [PORT-FIX]
				.tagBlock('minecraft:mineable/pickaxe')
				.requiresTool(true)
				.fullBlock(true)
				.opaque(true)
				.hardness(5)
				.resistance(8)

			if (rock.tfcTag != null) {
				hardened.tagBoth(rock.tfcTag);
			}
		}


		// Loose
		if (rock.raw != null && rock.loose != null && rock.loose.startsWith('tfg:loose/')) {
			let looseRock = event.create(rock.loose, 'tfc:loose_rock')
				.soundType(rock.sound != null ? rock.sound : 'stone')
				.texture(rawTexture) // [PORT] textureAll -> texture (до itemTexture, чтобы не перезаписать её)
				.texture(['itemTexture'], rock.loose.replace(/:/g, ":item/")) // [PORT-CHECK] itemTexture() -> texture(['itemTexture'], ...) — ключ itemTexture из kubejs_tfc ModelUtil.basicItemModelGen; проверить модель предмета в игре
				.mapColor(global.tfgMapColor(rock.mapColor)) // [PORT-FIX]
				.tagBlock('tfc:loose_rocks')
				.tagItem('tfc:any_knapping')
				.tagItem('tfc:rock_knapping')
				.tagItem("rnr:loose_rock_items")

			if (rock.tfcTag != null) {
				let tfcRockType = rock.tfcTag.replace(/tfc:/g, "").replace(/_items/g, "");
				looseRock.rockCategory(tfcRockType); // [PORT] rockTypeModel -> rockCategory (kubejs_tfc 2.0.1)
				looseRock.tagBoth(rock.tfcTag)
				looseRock.tagItem(`tfc:${tfcRockType}_rock`)
			}
			else {
				looseRock.rockCategory('sedimentary'); // [PORT] rockTypeModel -> rockCategory (kubejs_tfc 2.0.1)
			}
		}

		// Spike
		if (rock.raw != null && rock.spike != null && rock.spike.startsWith('tfg:spike/')) {
			let spike = event.create(rock.spike, 'tfc:rock_spike')
				.texture(rawTexture) // [PORT] textureAll -> texture
				.soundType(rock.sound != null ? rock.sound : 'stone')
				.mapColor(global.tfgMapColor(rock.mapColor)) // [PORT-FIX]
				.tagBlock('minecraft:mineable/pickaxe')
				.requiresTool(true)
				.hardness(0.8)
				.resistance(0.8)
				.requiresTool(true)

			if (rock.tfcTag != null) {
				spike.tagBoth(rock.tfcTag);
			}
		}

		// Gravel
		if (rock.gravel != null && rock.gravel.startsWith('tfg:rock/')) {
			let gravel = event.create(rock.gravel)
				.soundType('gravel')
				.tagBoth('c:gravels') // [PORT] forge:gravel -> c:gravels (NeoForge conventions)
				.tagBoth('tfc:rock/gravel')
				.mapColor(global.tfgMapColor(rock.mapColor)) // [PORT-FIX]
				.tagBlock('minecraft:mineable/shovel')
				.tagBlock('tfc:can_landslide')
				.fullBlock(true)
				.opaque(true)

			if (rock.tfcTag != null) {
				gravel.tagBoth(rock.tfcTag);
			}
			if (rock.gravelTag != null) {
				gravel.tagItem(rock.gravelTag)
			}
		}

		// Aqueducts
		if (rock.bricks != null && rock.aqueduct != null && rock.aqueduct.startsWith('tfg:rock/')) {
			let aqueduct = event.create(rock.aqueduct, 'tfc:aqueduct')
				.soundType(rock.sound != null ? rock.sound : 'stone')
				.texture(rock.bricks.texture != null ? rock.bricks.texture : rock.bricks.block.replace(/:/g, ":block/")) // [PORT] textureAll -> texture; ?? -> явная проверка
				.mapColor(global.tfgMapColor(rock.mapColor)) // [PORT-FIX]
				.tagBoth('tfc:rock/aqueducts')
				.tagBlock('minecraft:mineable/pickaxe')
				.requiresTool(true)

			if (rock.tfcTag != null) {
				aqueduct.tagBoth(rock.tfcTag);
			}
		}

		// Supports
		if (rock.raw != null && rock.support != null && rock.support.startsWith('tfg:')) {
			let support = event.create(rock.support, 'tfc:support')
				// [PORT-FIX] tfc:support-модели (block/wood/support/{vertical,horizontal,connection,inventory})
				// ссылаются на ключ "#texture". .texture(String) в KubeJS ставит только baseTexture
				// (карта textures пустая) -> #texture не резолвится -> magenta. Ставим ключ 'texture' явно.
				.texture(['texture'], rawTexture)
				.horizontal(horizontal => {
					horizontal.texture(['texture'], rawTexture) // [PORT-FIX] ключ 'texture' (см. выше)
					horizontal.soundType(rock.sound != null ? rock.sound : 'stone')
					horizontal.hardness(5)
					horizontal.resistance(8)
					horizontal.mapColor(global.tfgMapColor(rock.mapColor)) // [PORT-FIX]
					horizontal.tagBlock('minecraft:mineable/pickaxe')
					horizontal.requiresTool(true)
				})
				.soundType(rock.sound != null ? rock.sound : 'stone')
				.hardness(5)
				.resistance(8)
				.mapColor(global.tfgMapColor(rock.mapColor)) // [PORT-FIX]
				.tagBlock('minecraft:mineable/pickaxe')
				.requiresTool(true)

			if (rock.tfcTag != null) {
				support.tagBoth(rock.tfcTag);
			}
		}

		// Pillar
		if (rock.pillar != null && rock.pillar.startsWith('tfg:rock/')) {
			let block = event.create(rock.pillar)
				.texture(rock.pillar.replace(/:/g, ":block/")) // [PORT] textureAll -> texture
				.soundType(rock.sound != null ? rock.sound : 'stone')
				.mapColor(global.tfgMapColor(rock.mapColor)) // [PORT-FIX]
				.tagBlock('minecraft:mineable/pickaxe')
				.requiresTool(true)
				.fullBlock(true)
				.opaque(true)

			if (rock.tfcTag != null) {
				block.tagBoth(rock.tfcTag);
			}
		}
	}

	console.info('[Gregnautics] progress: tfg_port rocks registry done (block)')
})
