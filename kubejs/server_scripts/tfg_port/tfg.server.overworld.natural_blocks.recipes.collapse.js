// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/natural_blocks/recipes.collapse.js (1.20.1) на 1.21.1 NeoForge.
// [PORT] kubejs_tfc 2.0: схемы collapse/landslide сохранили конструкторы (result, ingredient) и (ingredient),
//  НО BlockIngredient: строка без '#' трактуется как ТЕГ — одиночные блоки заворачиваем в массив.
// [PORT] forge:* -> c:*; ad_astra отсутствует (космо-блоки -> [PORT-Ф10], stellaris не авто-ремапим).
// [PORT-FIX] Почвы TFC 1.21 переработаны: 4 TFG-почвы (alfisol и др.) теперь НАТИВНЫЕ tfc: и покрыты
//  датапаком TFC (data/tfc/recipe/landslide/dirt|clay/*) — цикл TFG_MUD_TYPES не нужен.
// [PORT] Незарегистрированный tfg:-контент отфильтровывается через BuiltInRegistries-гварды.

const $ClpsBuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const $ClpsResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')

function clpsBlockExists(id) {
	try {
		return $ClpsBuiltInRegistries.BLOCK.containsKey($ClpsResourceLocation.parse(String(id)))
	} catch (e) {
		return false
	}
}

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.overworld natural_blocks recipes.collapse start')

	const SHAPES = ['stair', 'slab', 'wall'];

	// [PORT] обёртки: BlockIngredient одиночного блока — массивом; + гварды регистрации
	const collapseInto = (result, input) => {
		if (clpsBlockExists(result) && clpsBlockExists(input)) {
			event.recipes.tfc.collapse(result, [input]);
		}
	}
	const landslide = (result, input) => {
		if (clpsBlockExists(result) && clpsBlockExists(input)) {
			event.recipes.tfc.landslide(result, [input]);
		}
	}

	// [PORT-FIX] Пустой БЛОЧНЫЙ тег валит BlockIngredient ("not allowed to be empty"), а гвард через
	// Ingredient.of('#...').itemIds проверяет ПРЕДМЕТНЫЙ тег и к тому же для пустого/несуществующего
	// тега NeoForge подставляет заглушку minecraft:barrier (length > 0 — ложный проход).
	// Разворачиваем тег в конкретный список блоков (как в датапаке TFC 4.2.5: ingredient = массив id)
	// и пропускаем рецепт при пустом списке.
	const clpsExpandTagToBlocks = (tag) => {
		try {
			return Ingredient.of(tag).itemIds.toArray().map(String)
				.filter(id => id !== 'minecraft:air' && id !== 'minecraft:barrier' && clpsBlockExists(id))
		} catch (e) {
			return []
		}
	}

	// Rocks
	for (let [rockId, rock] of Object.entries(global.BIG_ROCK_TABLE)) {

		if (rock.cobble != null) {
			if (rock.raw != null && rock.collapsible) {
				collapseInto(rock.cobble.block, rock.raw.block);

				SHAPES.forEach(shape => {
					if (rock.raw[shape] != null) {
						collapseInto(rock.cobble[shape], rock.raw[shape]);
					}
				})
			}
			if (rock.hardened != null) {
				collapseInto(rock.cobble.block, rock.hardened);
			}
			if (rock.polished != null && rock.collapsible) {
				collapseInto(rock.cobble.block, rock.polished.block);

				SHAPES.forEach(shape => {
					if (rock.polished[shape] != null) {
						collapseInto(rock.cobble[shape], rock.polished[shape]);
					}
				})
			}

			if (clpsBlockExists(rock.cobble.block)) {
				// [PORT] forge:ores_in_ground -> c:ores_in_ground
				// [PORT-FIX] тег -> конкретный список блоков (пустой блочный тег валил рецепт)
				let clpsOreBlocks = clpsExpandTagToBlocks(`#c:ores_in_ground/${rockId}`)
				if (clpsOreBlocks.length > 0) {
					event.recipes.tfc.collapse(rock.cobble.block, clpsOreBlocks)
				}

				landslide(rock.cobble.block, rock.cobble.block);
			}

			if (rock.cobble.mossy != null) {
				landslide(rock.cobble.mossy.block, rock.cobble.mossy.block);
			}
		}

		if (rock.gravel != null) {
			landslide(rock.gravel, rock.gravel);
		}
	}

	event.recipes.tfc.collapse('#tfg:rock_slabs').id('tfg:collapse/rock_slabs')
	event.recipes.tfc.collapse('#tfg:rock_stairs').id('tfg:collapse/rock_stairs')
	event.recipes.tfc.collapse('#tfg:rock_walls').id('tfg:collapse/rock_walls')

	// [PORT-Ф4-TODO] hornfels-блоки TFG не зарегистрированы — гварды пропустят до их появления
	if (clpsBlockExists('tfg:carbonate_hornfels')) {
		event.recipes.tfc.collapse(['tfg:carbonate_hornfels']).id('tfg:collapse/carbonate_hornfels')
	}
	if (clpsBlockExists('tfg:mafic_hornfels')) {
		event.recipes.tfc.collapse(['tfg:mafic_hornfels']).id('tfg:collapse/mafic_hornfels')
	}
	if (clpsBlockExists('tfg:pelitic_hornfels')) {
		event.recipes.tfc.collapse(['tfg:pelitic_hornfels']).id('tfg:collapse/pelitic_hornfels')
	}

	// Nether
	collapseInto('tfc:rock/cobble/basalt', 'minecraft:basalt')
	landslide('tfg:ash_pile', 'tfg:ash_pile') // [PORT-Ф4-TODO] tfg:ash_pile не зарегистрирован

	// Space
	// [PORT-Ф10] ad_astra отсутствует в сборке 1.21.1 (космоконтент — stellaris, не авто-ремапим)
	// event.recipes.tfc.landslide('ad_astra:moon_sand', 'ad_astra:moon_sand')
	// event.recipes.tfc.landslide('ad_astra:mars_sand', 'ad_astra:mars_sand')
	// event.recipes.tfc.landslide('ad_astra:venus_sand', 'ad_astra:venus_sand')
	landslide('minecraft:red_sand', 'minecraft:red_sand')

	// [PORT-Ф10] марсианские почвы tfg:grass/mars_* — космоконтент, блоки не зарегистрированы
	// event.recipes.tfc.landslide('tfg:grass/mars_dirt', 'tfg:grass/mars_dirt')
	// event.recipes.tfc.landslide('tfg:grass/mars_dirt', 'tfg:grass/amber_mycelium')
	// event.recipes.tfc.landslide('tfg:grass/mars_dirt', 'tfg:grass/rusticus_mycelium')
	// event.recipes.tfc.landslide('tfg:grass/mars_dirt', 'tfg:grass/sangnum_mycelium')
	// event.recipes.tfc.landslide('tfg:grass/mars_dirt', 'tfg:grass/mars_farmland')
	// event.recipes.tfc.landslide('tfg:grass/mars_dirt', 'tfg:grass/mars_path')
	// event.recipes.tfc.landslide('tfg:grass/mars_clay_dirt', 'tfg:grass/mars_clay_dirt')
	// event.recipes.tfc.landslide('tfg:grass/mars_clay_dirt', 'tfg:grass/amber_clay_mycelium')
	// event.recipes.tfc.landslide('tfg:grass/mars_clay_dirt', 'tfg:grass/rusticus_clay_mycelium')
	// event.recipes.tfc.landslide('tfg:grass/mars_clay_dirt', 'tfg:grass/sangnum_clay_mycelium')
	// event.recipes.tfc.landslide('tfc:red_kaolin_clay', 'tfg:grass/amber_kaolin_mycelium')
	// event.recipes.tfc.landslide('tfc:red_kaolin_clay', 'tfg:grass/rusticus_kaolin_mycelium')
	// event.recipes.tfc.landslide('tfc:red_kaolin_clay', 'tfg:grass/sangnum_kaolin_mycelium')

	// [PORT-Ф4-TODO] флюорапатитовые пески tfg:sand/fluorapatite/* не зарегистрированы — гварды
	landslide('tfg:sand/fluorapatite/blue', 'tfg:sand/fluorapatite/blue')
	landslide('tfg:sand/fluorapatite/green', 'tfg:sand/fluorapatite/green')
	landslide('tfg:sand/fluorapatite/brown', 'tfg:sand/fluorapatite/brown')
	landslide('tfg:sand/fluorapatite/orange', 'tfg:sand/fluorapatite/orange')
	landslide('tfg:sand/fluorapatite/white', 'tfg:sand/fluorapatite/white')
	landslide('tfg:sand/fluorapatite/yellow', 'tfg:sand/fluorapatite/yellow')

	// Dirt
	// [PORT-FIX] tfg:coarse_dirt/* (1.20: TFG добавлял coarse-версии почв TFC) — в TFC 1.21 coarse_dirt нативен
	// и покрыт датапаком TFC; TFG-блоки не зарегистрированы — гварды пропустят
	landslide('tfg:coarse_dirt/sandy_loam', 'tfg:coarse_dirt/sandy_loam')
	landslide('tfg:coarse_dirt/silty_loam', 'tfg:coarse_dirt/silty_loam')
	landslide('tfg:coarse_dirt/silt', 'tfg:coarse_dirt/silt')
	landslide('tfg:coarse_dirt/loam', 'tfg:coarse_dirt/loam')

	// [PORT-Ф4-TODO] tfg:duff/* не зарегистрированы; почвы sandy_loam и т.п. в TFC 1.21 заменены таксономией
	landslide('tfc:dirt/sandy_loam', 'tfg:duff/sandy_loam')
	landslide('tfc:dirt/silty_loam', 'tfg:duff/silty_loam')
	landslide('tfc:dirt/silt', 'tfg:duff/silt')
	landslide('tfc:dirt/loam', 'tfg:duff/loam')

	// [PORT-FIX] Цикл TFG_MUD_TYPES (alfisol/mollisol/oxisol/podzol) не портируется:
	// в TFC 1.21 эти почвы НАТИВНЫЕ (tfc:dirt/alfisol и т.д.) и их landslide-рецепты
	// поставляет сам TFC (data/tfc/recipe/landslide/*). TFG-дубликаты блоков (tfg:mud_bricks/*)
	// падать не должны — landslide для них не нужен.
	// global.TFG_MUD_TYPES.forEach(dirt => { ... }) // (оригинал: 11 landslide-рецептов на тип)

	// Other Ores
	// [PORT-FIX] forge:raw_ore_blocks -> c:raw_ore_blocks; пустой БЛОЧНЫЙ тег НЕ безвреден
	// (валил рецепт) — разворачиваем в конкретный список блоков и пропускаем, если пусто
	let clpsRawOreBlocks = clpsExpandTagToBlocks('#c:raw_ore_blocks')
	if (clpsRawOreBlocks.length > 0) {
		event.recipes.tfc.collapse(clpsRawOreBlocks);
	}

	global.SAND_COLORS.forEach(color => {
		// [PORT] forge:ores_in_ground -> c:ores_in_ground
		event.recipes.tfc.landslide(`tfc:sand/${color}`, `#c:ores_in_ground/${color}_sand`)
	});
})
