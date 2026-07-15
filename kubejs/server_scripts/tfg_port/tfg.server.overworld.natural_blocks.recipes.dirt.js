// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/natural_blocks/recipes.dirt.js (1.20.1) на 1.21.1 NeoForge.
// [PORT-FIX] КЛЮЧЕВОЕ: в TFC 1.21 почвы переработаны — старые 4 типа (loam/silt/sandy_loam/silty_loam)
//  заменены 8 таксономическими (alfisol, andisol, aridisol, entisol, fluvisol, mollisol, oxisol, podzol).
//  4 почвы, которые в 1.20 добавлял TFG (alfisol/mollisol/oxisol/podzol), теперь НАТИВНЫЕ tfc:.
//  Поэтому: buildDirtRecipes выполняется для всех 8 типов с неймспейсом tfc;
//  рецепты создания старых почв (loam+silt и т.п.) не применимы — где возможно, вход заменён на
//  tfc:dirt/entisol (энтисоль — «недифференцированная» почва), остальное закомментировано.
// [PORT] Прочее: forge:* -> c:*; tfc:any_water -> tfc:any_fresh_water (тега any_water в TFC 1.21 нет);
//  vintageimprovements -> createvintageneoforged (curving c полем head в CVI 1.21 нет -> curving_concave);
//  результаты кастомных рецептов — {id: ...}; tfg:duff/* не зарегистрированы (Ф4) — гварды.

const $DirtBuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const $DirtResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')

function dirtItemExists(id) {
	try {
		return $DirtBuiltInRegistries.ITEM.containsKey($DirtResourceLocation.parse(String(id).replace(/^\d+x\s+/, '')))
	} catch (e) {
		return false
	}
}

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.overworld natural_blocks recipes.dirt start')

	// [PORT-FIX] 8 нативных почв TFC 1.21 (см. шапку)
	const TFC_121_SOIL_TYPES = ['alfisol', 'andisol', 'aridisol', 'entisol', 'fluvisol', 'mollisol', 'oxisol', 'podzol'];

	// Dirt creation
	event.remove({ id: 'gtceu:macerator/dirt_from_bio_chaff' })
	event.recipes.gtceu.macerator('tfg:loam_dirt_from_bio_chaff')
		.itemInputs('gtceu:bio_chaff')
		.itemOutputs('tfc:dirt/entisol') // [PORT-FIX] tfc:dirt/loam -> tfc:dirt/entisol (почв 1.20 больше нет)
		.duration(300)
		.EUt(4)

	// [PORT-FIX] Почв loam/silt/silty_loam/sandy_loam в TFC 1.21 нет — миксеры конверсии не применимы
	// // Loam + Silt -> Silty Loam (Миксер)
	// event.recipes.gtceu.mixer('tfg:silty_loam_dirt')
	// 	.itemInputs('tfc:dirt/loam', 'tfc:dirt/silt')
	// 	.itemOutputs('2x tfc:dirt/silty_loam')
	// 	.duration(200)
	// 	.EUt(16)
	//
	// // Loam + Sand -> Sandy Loam (Миксер)
	// event.recipes.gtceu.mixer('tfg:sandy_loam_dirt')
	// 	.itemInputs('tfc:dirt/loam', '#c:sands')
	// 	.circuit(3)
	// 	.itemOutputs('tfc:dirt/sandy_loam')
	// 	.duration(200)
	// 	.EUt(16)
	//
	// // Loam + Salt -> Silt
	// event.recipes.gtceu.mixer('tfg:silty_dirt')
	// 	.itemInputs('tfc:dirt/loam', 'tfc:powder/salt')
	// 	.circuit(3)
	// 	.itemOutputs('tfc:dirt/silt')
	// 	.duration(200)
	// 	.EUt(16)

	// Alkaline dirt
	event.recipes.gtceu.mixer('tfg:alfisol')
		.itemInputs('tfc:dirt/entisol', ['gtceu:tiny_calcium_dust', 'gtceu:tiny_sodium_dust', 'gtceu:tiny_magnesium_dust']) // [PORT-FIX] loam -> entisol
		.circuit(3)
		.itemOutputs('tfc:dirt/alfisol') // [PORT-FIX] tfg: -> tfc: (почва нативна в TFC 1.21)
		.duration(200)
		.EUt(16)

	// Volcanic dirt
	event.recipes.gtceu.mixer('tfg:mollisol')
		.itemInputs('tfc:dirt/entisol', ['tfc:soot', 'tfc:powder/wood_ash', 'tfc:powder/charcoal']) // [PORT-FIX] loam -> entisol
		.circuit(3)
		.itemOutputs('tfc:dirt/mollisol') // [PORT-FIX] tfg: -> tfc:
		.duration(200)
		.EUt(16)

	// Tropical
	event.recipes.gtceu.mixer('tfg:oxisol')
		.itemInputs('tfc:dirt/entisol', ['tfc:powder/hematite', 'tfc:powder/limonite', 'tfc:powder/magnetite']) // [PORT-FIX] loam -> entisol
		.circuit(3)
		.itemOutputs('tfc:dirt/oxisol') // [PORT-FIX] tfg: -> tfc:
		.duration(200)
		.EUt(16)

	// Layered
	event.recipes.gtceu.mixer('tfg:podzol')
		.itemInputs('tfc:dirt/entisol', '#minecraft:leaves') // [PORT-FIX] loam -> entisol
		.circuit(3)
		.itemOutputs('tfc:dirt/podzol') // [PORT-FIX] tfg: -> tfc:
		.duration(200)
		.EUt(16)

	// Mars dirt
	// [PORT-Ф10] марсианская почва tfg:grass/mars_dirt и жидкость tfg:semiheavy_ammoniacal_water —
	// космоконтент (не зарегистрированы; stellaris не авто-ремапим)
	// event.recipes.gtceu.mixer('tfg:mars_dirt')
	// 	.itemInputs('#tfc:dirt')
	// 	.inputFluids(Fluid.of('tfg:semiheavy_ammoniacal_water', 100))
	// 	.circuit(3)
	// 	.itemOutputs('tfg:grass/mars_dirt')
	// 	.duration(200)
	// 	.EUt(16)

	function buildDirtRecipes(namespace, dirtType) {
		// Dirt + Sticks -> Rooted Dirt
		event.recipes.gtceu.mixer(`${dirtType}_to_rooted`)
			.itemInputs(`${namespace}:dirt/${dirtType}`, "#c:rods/wooden")
			.itemOutputs(`${namespace}:rooted_dirt/${dirtType}`)
			.duration(200)
			.EUt(16)

		event.smelting(`${namespace}:dirt/${dirtType}`, `${namespace}:mud/${dirtType}`)
			.id(`tfg:smelting/${dirtType}_mud_to_grass`)


		// Dirt -> Mud
		event.recipes.gtceu.mixer(`${dirtType}_grass_to_mud`)
			.itemInputs(`${namespace}:dirt/${dirtType}`)
			.inputFluids("#tfc:any_fresh_water 100") // [PORT-FIX] tfc:any_water -> tfc:any_fresh_water
			.circuit(2)
			.itemOutputs(`${namespace}:mud/${dirtType}`)
			.duration(200)
			.EUt(16)

		//AE Transform Mud
		event.custom({
			type: "ae2:transform",
			circumstance: {
				type: "fluid",
				tag: "tfc:any_fresh_water" // [PORT-FIX] tfc:water -> tfc:any_fresh_water
			},
			ingredients: [
				{ item: `${namespace}:dirt/${dirtType}` }],
			result: { id: `${namespace}:mud/${dirtType}` } // [PORT] 1.21: результат {id}, не {item}
		}).id(`tfg:ae_transform/${dirtType}_to_mud`)

		// Mud bricks
		event.recipes.gtceu.extruder(`${namespace}:mud_bricks/${dirtType}`)
			.itemInputs(`${namespace}:mud/${dirtType}`)
			.notConsumableItem('gtceu:ingot_extruder_mold') // [PORT-FIX] notConsumable(строка) нет в GTM8
			.itemOutputs(`4x ${namespace}:drying_bricks/${dirtType}`)
			.duration(100)
			.EUt(2)

		// [PORT-FIX] CVI 1.21: типа curving с полем head нет — копия как curving_concave без пресс-формы
		event.custom({
			type: 'createvintageneoforged:curving_concave',
			ingredients: [{ item: `${namespace}:mud/${dirtType}` }],
			results: [{ id: `${namespace}:drying_bricks/${dirtType}`, count: 4 }]
		}).id(`tfg:vi/curving/${dirtType}_bricks`)

		// Wet bricks to dry
		event.smelting(`${namespace}:mud_brick/${dirtType}`, `${namespace}:drying_bricks/${dirtType}`)
			.id(`tfg:smelting/${dirtType}_drying_brick_to_brick`)

		event.custom({
			type: "firmalife:drying",
			ingredient: {
				item: `${namespace}:drying_bricks/${dirtType}`
			},
			result: {
				id: `${namespace}:mud_brick/${dirtType}` // [PORT] 1.21: {id}
			}
		}).id(`tfg:drying/${dirtType}_drying_brick_to_brick`)

		// Mud brick blocks
		// [PORT-FIX] id нативных рецептов TFC 1.21: crafting/soil/*_mud_bricks* -> crafting/mud_bricks/*
		event.shaped(`${namespace}:mud_bricks/${dirtType}`, [
			'AA',
			'AA'
		], {
			A: `${namespace}:mud_brick/${dirtType}`
		}).id(`tfc:crafting/mud_bricks/${dirtType}`)

		// Блок кирпичей -> Ступени
		event.remove({ id: `tfc:crafting/mud_bricks/${dirtType}_stairs` })

		event.stonecutting(`${namespace}:mud_bricks/${dirtType}_stairs`, `${namespace}:mud_bricks/${dirtType}`)
			.id(`tfc:stonecutting/soil/${dirtType}_mud_bricks_stairs`)

		// Блок кирпичей -> Плиты
		event.remove({ id: `tfc:crafting/mud_bricks/${dirtType}_slab` })

		event.stonecutting(`2x ${namespace}:mud_bricks/${dirtType}_slab`, `${namespace}:mud_bricks/${dirtType}`)
			.id(`tfc:stonecutting/soil/${dirtType}_mud_bricks_slab`)

		// Блок кирпичей -> Стена
		event.remove({ id: `tfc:crafting/mud_bricks/${dirtType}_wall` })

		event.stonecutting(`${namespace}:mud_bricks/${dirtType}_wall`, `${namespace}:mud_bricks/${dirtType}`)
			.id(`tfc:stonecutting/soil/${dirtType}_mud_bricks_wall`)

		// Grass blocks
		event.shapeless(`${namespace}:grass/${dirtType}`, [`${namespace}:dirt/${dirtType}`, 'minecraft:bone_meal', '#c:seeds'])
			.id(`tfg:shapeless/${dirtType}_grass_bonemeal`)

		event.shapeless(`${namespace}:grass/${dirtType}`, [`${namespace}:dirt/${dirtType}`, 'gtceu:fertilizer', '#c:seeds'])
			.id(`tfg:shapeless/${dirtType}_grass_fertilizer`)

		// Coarse dirt
		// [PORT-FIX] tfg:coarse_dirt -> tfc:coarse_dirt (в TFC 1.21 coarse-почвы нативны)
		event.shapeless(`2x ${namespace}:coarse_dirt/${dirtType}`, [`${namespace}:dirt/${dirtType}`, '#c:gravels'])
			.id(`tfg:shapeless/create_coarse_${dirtType}_dirt`)

		event.shapeless(`${namespace}:dirt/${dirtType}`, [`${namespace}:coarse_dirt/${dirtType}`, '#minecraft:hoes'])
			.id(`tfg:shapeless/sift_coarse_${dirtType}_dirt`)

		// Duff
		// [PORT-Ф4-TODO] tfg:duff/* не зарегистрированы — включится вместе с блоками
		if (dirtItemExists(`tfg:duff/${dirtType}`)) {
			event.shapeless(`tfg:duff/${dirtType}`, [`${namespace}:dirt/${dirtType}`, 'tfc:groundcover/humus'])
				.id(`tfg:shapeless/create_${dirtType}_duff`)
		}

	}

	// [PORT-FIX] оригинал: TFC_MUD_TYPES с namespace tfc + TFG_MUD_TYPES с namespace tfg;
	// в 1.21 все 8 типов нативные tfc: (см. шапку)
	TFC_121_SOIL_TYPES.forEach(dirtType => {
		buildDirtRecipes('tfc', dirtType);

		// Chisel Recipes
		// [PORT-FIX] Резьбу ступени/плиты для всех 8 почв TFC 1.21 поставляет сам (data/tfc/recipe/chisel/mud_bricks/*);
		// TFG-шные дубликаты не регистрируем. Стена из плиты (mode smooth) — только у TFG, оставлена:
		event.recipes.tfc.chisel(`tfc:mud_bricks/${dirtType}_wall`, [`tfc:mud_bricks/${dirtType}_slab`], 'tfc:smooth') // [PORT] BlockIngredient массивом; режим с неймспейсом
			.id(`tfg:chisel/tfg_soil/${dirtType}_mud_bricks_wall`)

		// [PORT-FIX] Мокрые кирпичи из грязи + соломы и tfc:muddy_roots — в TFC 1.21 нативные рецепты
		// (data/tfc/recipe/crafting/drying_bricks/*), TFG-дубликаты не регистрируем.

		// Сушка грязи в почву на сушильной циновке — TFG-механика, оставлена для всех 8 типов
		event.custom({
			type: "firmalife:drying",
			ingredient: { item: `tfc:mud/${dirtType}` },
			result: { id: `tfc:dirt/${dirtType}` }
		}).id(`tfg:drying/mud_${dirtType}`);
	});


	// #region Wattle and daub
	// TODO: Workaround for not being able to stain wattle and daub with normal dyes
	// See https://github.com/TerraFirmaGreg-Team/Modpack-Modern/issues/910

	event.shaped('tfc:wattle/unstained', [
		'AB',
		'CC'
	], {
		A: 'tfc:wattle',
		B: 'tfc:daub',
		C: '#c:rods/wooden' // [PORT] forge:rods/wood -> c:rods/wooden
	})
		.id('tfg:shapeless/unstained_wattle')

	global.MINECRAFT_DYE_NAMES.forEach(color => {
		event.shapeless(`tfc:wattle/${color}`, ['tfc:wattle/unstained', `#c:dyes/${color}`])
			.id(`tfg:shapeless/wattle/${color}`)
	})

	// #endregion
})
