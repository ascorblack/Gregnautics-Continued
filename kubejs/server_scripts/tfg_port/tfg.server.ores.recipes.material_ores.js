// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/ores_and_materials/recipes.material_ores.js (Фаза 3, частично).
// [PORT] KubeJS 7: файлы изолированы — цикл по материалам (из recipes.materials.js) и нужные
//        хелперы перенесены сюда локально; регистрация напрямую через ServerEvents.recipes.
//
// ЧТО ПОРТИРОВАНО СЕЙЧАС (только сток-GT-материалы, аддитивные tfg:-рецепты):
//   - кверна: raw ore -> crushed ore, gem -> dust;
//   - мгновенная бочка (вода) и ae2:transform (бросок в воду): crushed -> purified,
//     impure/pure dust -> dust;
//   - ступка: chipped gem -> small dust.
// ЧТО ЗАБЛОКИРОВАНО:
//   [PORT-Ф2] TFGTagPrefix (richRawOre/poorRawOre/oreSmall/budIndicator), TFGPropertyKey.TFC_PROPERTY
//             (addTFCMelting — температуры плавки TFG-Core), TFGMaterialFlags на материалах —
//             всё это даёт Java-мод TFG-Core / Ф2-модификации материалов. processSmallOre,
//             processPoorRawOre, processRichRawOre и все addTFCMelting-вызовы закомментированы.
//   [PORT] greate отсутствует — greate.pressing/splashing вырезаны; интерим-замену даёт
//          gregnautics_gtceu_bulk_washing.js (create.splashing/crushing).
//   [PORT-CHECK] Переопределения стоковых GT-рецептов (forge_hammer/macerator/ore_washer с
//          не-namespaced id, удаления compress/decompress raw ore block) НЕ перенесены:
//          в GTM8 иные id/балансы, а совпадение id не гарантирует override — вернуться при Ф3-ребалансе.
//   [PORT] vintageimprovements.centrifugation -> createvintageneoforged: закомментировано вместе с
//          impure/pure центрифугированием (нужна проверка схемы processingTime/minimalRPM) — [PORT-CHECK].
// Оригинальные formul'ы см. в исходнике: orig_kubejs/.../tfg/ores_and_materials/recipes.material_ores.js

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.ores.recipes.material_ores start')

	/** [PORT] ae2:transform «бросок в воду» — формат 1.21: result {id,count}, ingredients [{item}] */
	function addWaterTransform(event, inputItem, outputItem, id) {
		event.custom({
			type: "ae2:transform",
			circumstance: {
				type: "fluid",
				tag: "tfc:any_water" // [PORT-CHECK] кодек circumstance в AE2 19.x
			},
			ingredients: [
				{ item: inputItem.getId() }
			],
			result: { id: outputItem.getId(), count: outputItem.getCount() }
		}).id(id)
	}

	/**
	 * [PORT] processNormalRawOre — оставлена только кверна (аддитивный tfg:-рецепт).
	 */
	function processNormalRawOre(event, material) {
		const oreProperty = material.getProperty(PropertyKey.ORE)
		const multiplier = oreProperty.getOreMultiplier();
		const normalOreItem = ChemicalHelper.get(TagPrefix.rawOre, material, 1)
		const crushedOreItem = ChemicalHelper.get(TagPrefix.crushed, material, Math.max(multiplier, 1))

		if (normalOreItem === null || crushedOreItem === null
			|| normalOreItem.isEmpty() || crushedOreItem.isEmpty())
			return;

		const materialName = material.getName();

		// Quern
		event.recipes.tfc.quern(crushedOreItem, normalOreItem)
			.id(`tfg:quern/${materialName}_crushed_ore_from_normal_raw_ore`)

		// [PORT-Ф2] Forge hammer / macerator override, greate.pressing, smeltOre, addTFCMelting,
		// удаления compress/decompress raw ore block — см. шапку файла.
	}

	/**
	 * [PORT] processCrushedOre — оставлены мгновенная бочка и ae2:transform.
	 */
	function processCrushedOre(event, material) {
		const crushedOreItem = ChemicalHelper.get(TagPrefix.crushed, material, 1)
		const pureOreItem = ChemicalHelper.get(TagPrefix.crushedPurified, material, 1)
		const materialName = material.getName();

		if (crushedOreItem !== null && pureOreItem !== null
			&& !crushedOreItem.isEmpty() && !pureOreItem.isEmpty()) {

			// Dropping in water
			addWaterTransform(event, crushedOreItem, pureOreItem, `tfg:ae_transform/${materialName}_purified_ore`)

			// [PORT-FIX] kubejs_tfc 2.0: barrel_instant(input_fluid).inputItem(...).outputItem(...)
			event.recipes.tfc.barrel_instant(Fluid.of("minecraft:water", 10))
				.inputItem(crushedOreItem)
				.outputItem(pureOreItem)
				.id(`tfg:instant_barrel/${materialName}_purified_ore`)

			// [PORT-Ф2]/[PORT-CHECK] GT ore_washer override, greate.splashing (замена —
			// gregnautics_gtceu_bulk_washing.js), addTFCMelting — см. шапку файла.
		}

		// [PORT] greate.pressing (crushed -> impure dust) вырезан — greate отсутствует.
	}

	/**
	 * [PORT] processImpureDust / processPureDust — оставлены мгновенная бочка и ae2:transform.
	 */
	function processDirtyDust(event, material, dirtyPrefix, suffix) {
		const dirtyDustItem = ChemicalHelper.get(dirtyPrefix, material, 1)
		const dustItem = ChemicalHelper.get(TagPrefix.dust, material, 1)

		if (dirtyDustItem !== null && dustItem !== null
			&& !dirtyDustItem.isEmpty() && !dustItem.isEmpty()) {
			const materialName = material.getName();

			// Dropping in water
			addWaterTransform(event, dirtyDustItem, dustItem, `tfg:ae_transform/${materialName}_dust_from_${suffix}`)

			event.recipes.tfc.barrel_instant(Fluid.of("minecraft:water", 10))
				.inputItem(dirtyDustItem)
				.outputItem(dustItem)
				.id(`tfg:instant_barrel/${materialName}_dust_from_${suffix}`)

			// [PORT-CHECK] vintageimprovements.centrifugation -> createvintageneoforged.centrifugation:
			// event.recipes.vintageimprovements.centrifugation(
			// 	[dustItem, Item.of(byproductDust).withChance(0.111)], dirtyDustItem)
			// 	.processingTime(material.getMass() * 10 * global.VINTAGE_IMPROVEMENTS_DURATION_MULTIPLIER)
			// 	.minimalRPM(32)
			// 	.id(`tfg:vi/centrifuge/${materialName}_dust_from_${suffix}`)
			// [PORT] greate.splashing вырезан; [PORT-Ф2] addTFCMelting — см. шапку.
		}
	}

	/**
	 * [PORT] processGems — оставлены кверна и ступка; budIndicator/greate/melting — см. шапку.
	 */
	function processGems(event, material) {
		const gemItem = ChemicalHelper.get(TagPrefix.gem, material, 1);
		if (gemItem === null || gemItem.isEmpty() || gemItem.hasTag('c:hidden_from_recipe_viewers'))
			return;

		const materialName = material.getName();

		// [PORT-Ф2] budIndicator (TFGTagPrefix) не зарегистрирован:
		// event.recipes.tfc.damage_inputs_shapeless_crafting(
		// 	event.shapeless(budItem, [gemItem, '#tfc:chisels'])).id(`shapeless/${materialName}_bud_indicator`)

		const chipped = ChemicalHelper.get(TagPrefix.gemChipped, material, 1)
		const smallDust = ChemicalHelper.get(TagPrefix.dustSmall, material, 1)
		if (chipped !== null && !chipped.isEmpty() && smallDust !== null && !smallDust.isEmpty()) {
			// [PORT] forge:tools/mortars -> c:tools/mortar (в GTM8 теги инструментов в ед. числе)
			event.shaped(smallDust, [
				'A', 'B'
			], {
				A: chipped,
				B: '#c:tools/mortar'
			}).id(`tfg:shapeless/mortar_chipped_${materialName}`)
		}

		// [PORT] greate.pressing (распаковка блока в гемы) вырезан — greate отсутствует.

		const dustItem = ChemicalHelper.get(TagPrefix.dust, material, 1)
		if (dustItem !== null && !dustItem.isEmpty()) {
			event.recipes.tfc.quern(dustItem, gemItem)
				.id(`tfg:quern/${materialName}_gem_to_dust`)
		}

		// [PORT-Ф2] addTFCMelting гемов (TFGPropertyKey.TFC_PROPERTY) — см. шапку.
	}

	// [PORT-Ф2] processSmallOre / processPoorRawOre / processRichRawOre полностью заблокированы:
	// TFGTagPrefix.oreSmall / poorRawOre / richRawOre не зарегистрированы (Фаза 2, апстрим-баг GTM8).

	// [PORT] Главный цикл (фрагмент из recipes.materials.js оригинала, только руды):
	try {
		global.forEachMaterial(material => {
			const oreProperty = material.getProperty(PropertyKey.ORE);
			if (oreProperty !== null
				&& material !== GTMaterials.Coal
				&& material !== GTMaterials.get('gtceu:lignite')     // [PORT-FIX] HEAD: голое имя резолвится в minecraft: -> namespace gtceu:
				&& material !== GTMaterials.get('gtceu:anthracite')) {

				// processSmallOre(event, material)   // [PORT-Ф2]
				// processPoorRawOre(event, material) // [PORT-Ф2]
				processNormalRawOre(event, material)
				// processRichRawOre(event, material) // [PORT-Ф2]

				processCrushedOre(event, material)
				processDirtyDust(event, material, TagPrefix.dustImpure, 'impure')
				processDirtyDust(event, material, TagPrefix.dustPure, 'pure')

				// Indicators
				// [PORT-Ф2] surface indicator'ы генерирует TFG-Core (рецепта gtceu:shaped/*_surface_indicator нет):
				// event.replaceInput({ id: `gtceu:shaped/${material.getName()}_surface_indicator` }, 'minecraft:gravel', '#tfc:rock/gravel')
			}

			if (material.hasProperty(PropertyKey.GEM)) {
				processGems(event, material)
			}
		})
	} catch (e) {
		console.error(`[Gregnautics][PORT-CHECK] tfg.server.ores.recipes.material_ores: цикл по материалам упал: ${e}`)
	}

	console.info('[Gregnautics] progress: tfg_port tfg.server.ores.recipes.material_ores done')
})
