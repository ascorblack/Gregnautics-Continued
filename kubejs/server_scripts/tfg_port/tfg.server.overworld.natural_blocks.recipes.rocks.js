// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/natural_blocks/recipes.rocks.js (1.20.1) на 1.21.1 NeoForge.
// [PORT] Изменения:
//  - tfc:damage_inputs_*_crafting удалены в TFC 1.21 -> plain shaped/shapeless (урон через авто-remainder);
//  - kubejs_tfc 2.0: chisel(result, ingredient, mode) — режим с неймспейсом (tfc:smooth и т.п.),
//    BlockIngredient одиночного блока — массивом;
//  - .notConsumable(строка) -> .notConsumableItem(...);
//  - forge:* -> c:*; tfc:compost_greens_low -> tfc:compost_greens/low; tfc:chisels -> c:tools/chisel;
//  - Create-схемы: бажный '#тег' в deploying -> {tag: ...}-объект;
//  - greate отсутствует — greate.pressing вырезаны; removeCutterRecipe (хелпер TFG) — инлайн event.remove;
//  - [PORT-Ф2] GT-материалы tfg:* (stone compositions) не зарегистрированы до Ф2 — мацераторная секция под гвардом;
//  - [PORT-Ф10] ad_astra отсутствует (permafrost/venus_sandstone);
//  - незарегистрированный tfg:-контент отфильтровывается через BuiltInRegistries-гварды.

const $RockBuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const $RockResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')

function rockItemExists(id) {
	try {
		return $RockBuiltInRegistries.ITEM.containsKey($RockResourceLocation.parse(String(id).replace(/^\d+x\s+/, '')))
	} catch (e) {
		return false
	}
}

/** [PORT] безопасная проверка «настоящего» GT-материала (null/NULL-материал -> false) */
function rockIsRealMaterial(m) {
	try {
		return m != null && !m.isNull()
	} catch (e) {
		return m != null
	}
}

/** true для тегов (не проверяем) и существующих предметов */
function rockIngredientOk(id) {
	if (id == null) return false
	let s = String(id)
	if (s.startsWith('#')) return true
	return rockItemExists(s)
}

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.overworld natural_blocks recipes.rocks start')

	function rawToPolished(id, addChiselRecipes, input, output) {
		if (!rockItemExists(input) || !rockItemExists(output)) return; // [PORT] гвард Ф4-контента

		if (addChiselRecipes) {
			event.recipes.tfc.chisel(output, [input], 'tfc:smooth') // [PORT] BlockIngredient массивом; режим с неймспейсом
				.id(`tfg:chisel/${id}`);

			// [PORT] damage_inputs_shapeless_crafting удалён — plain shapeless
			event.shapeless(output, [input, '#c:tools/chisel'])
				.id(`tfg:shapeless/${id}`);
		}

		event.recipes.gtceu.laser_engraver(`tfg:${id}`)
			.itemInputs(input)
			.itemOutputs(output)
			.notConsumableItem('tfc:lens') // [PORT-FIX] notConsumable(строка) нет в GTM8
			.duration(30)
			.EUt(GTValues.VA[GTValues.ULV]);
	}

	rawToPolished('vanilla_basalt_to_smooth', true, 'minecraft:basalt', 'minecraft:smooth_basalt');
	rawToPolished('vanilla_smooth_to_polished', true, 'minecraft:smooth_basalt', 'minecraft:polished_basalt');

	function looseToCobble(id, rock, loose, rockEntry) {
		if (!rockItemExists(loose) || !rockItemExists(rockEntry.block)) return; // [PORT] гвард

		if (!rock.isTFC) {
			event.shapeless(`4x ${loose}`, [rockEntry.block])
				.id(`tfg:shapeless/unpacking_${id}_cobble`);

			event.shaped(rockEntry.block, [
				'AA',
				'AA'
			], {
				A: loose
			})
			.id(`tfg:shaped/packing_${id}_cobble`);

			if (rockEntry.stair != null && rockItemExists(rockEntry.stair)) {
				event.shapeless(`3x ${loose}`, [rockEntry.stair]);
			}
			if (rockEntry.slab != null && rockItemExists(rockEntry.slab)) {
				event.shapeless(`2x ${loose}`, [rockEntry.slab]);
			}
		}

		event.recipes.gtceu.packer(`tfg:unpacking_${id}_cobble`)
			.itemInputs(`1x ${rockEntry.block}`)
			.itemOutputs(`4x ${loose}`)
			.circuit(1)
			.duration(20)
			.EUt(GTValues.VA[GTValues.ULV])

		event.recipes.gtceu.packer(`tfg:packing_${id}_cobble`)
			.itemInputs(`4x ${loose}`)
			.itemOutputs(`1x ${rockEntry.block}`)
			.circuit(1)
			.duration(20)
			.EUt(GTValues.VA[GTValues.ULV])

		if (rockEntry.wall != null && rockItemExists(rockEntry.wall)) {
			event.shapeless(`2x ${loose}`, [rockEntry.wall]);
		}
	}

	function changeForms(rockId, rock, blockEntry) {
		if (!rock.isTFC) {
			if (blockEntry.stair != null) {
				if (blockEntry.block != null && rockItemExists(blockEntry.block) && rockItemExists(blockEntry.stair)) {
					let id = global.linuxUnfucker(`${blockEntry.block}_to_${blockEntry.stair}`);

					event.recipes.tfc.chisel(blockEntry.stair, [blockEntry.block], 'tfc:stair') // [PORT] массив + неймспейс
						.id(`tfg:chisel/${id}`);

					event.stonecutting(blockEntry.stair, blockEntry.block)
						.id(`tfg:stonecutter/${id}`);
				}
			}
			if (blockEntry.slab != null) {
				if (blockEntry.block != null && rockItemExists(blockEntry.block) && rockItemExists(blockEntry.slab)) {
					let id = global.linuxUnfucker(`${blockEntry.block}_to_${blockEntry.slab}`);

					event.recipes.tfc.chisel(blockEntry.slab, [blockEntry.block], 'tfc:slab') // [PORT] массив + неймспейс
						.extraDrop(blockEntry.slab)
						.id(`tfg:chisel/${id}`);

					event.stonecutting(`2x ${blockEntry.slab}`, blockEntry.block)
						.id(`tfg:stonecutting/${id}`);
				}
			}
		}
		if (blockEntry.wall != null && rockItemExists(blockEntry.wall)) {
			if (blockEntry.block != null && rockItemExists(blockEntry.block)) {
				if (!rock.isTFC) {
					event.stonecutting(blockEntry.wall, blockEntry.block)
						.id(`tfg:stonecutting/${global.linuxUnfucker(blockEntry.block)}_to_${global.linuxUnfucker(blockEntry.wall)}`)
				}
			}
			if (blockEntry.stair != null && rockItemExists(blockEntry.stair)) {
				event.recipes.tfc.chisel(blockEntry.wall, [blockEntry.stair], 'tfc:smooth'); // [PORT] массив + неймспейс
			}
		}
	}

	for (let [rockId, rock] of Object.entries(global.BIG_ROCK_TABLE)) {

		// Raw to Hardened
		if (rock.raw != null && rock.hardened != null && rockItemExists(rock.raw.block) && rockItemExists(rock.hardened)) {
			if (!rock.isTFC) {
				event.shaped(`2x ${rock.hardened}`, [
					'ABA',
					'BAB',
					'ABA'
				], {
					A: rock.raw.block,
					B: 'tfc:mortar'
				}).id(`tfg:shaped/${rockId}_raw_to_hardened`)
			}

			event.recipes.gtceu.assembler(`tfg:${rockId}_raw_to_hardened`)
				.itemInputs(`4x ${rock.raw.block}`)
				.inputFluids(Fluid.of('gtceu:concrete', 72))
				.itemOutputs(`2x ${rock.hardened}`)
				.circuit(1)
				.duration(50)
				.EUt(2)
		}

		// Raw to cobble
		if (rock.raw != null && rock.cobble != null && rockItemExists(rock.raw.block) && rockItemExists(rock.cobble.block)) {
			event.recipes.gtceu.forge_hammer(`${rockId}_raw_to_cobble`)
				.itemInputs(rock.raw.block)
				.itemOutputs(rock.cobble.block)
				.duration(10)
				.EUt(7)

			// [PORT] greate отсутствует в сборке 1.21.1
			// event.recipes.greate.pressing(rock.cobble.block, rock.raw.block)
			// 	.recipeTier(0)
			// 	.id(`greate:pressing/${rockId}_raw_to_cobble`)
		}

		// Loose to cobble
		if (rock.loose != null && rock.cobble != null) {
			looseToCobble(rockId, rock, rock.loose, rock.cobble);

			if (rock.mossyLoose != null && rock.cobble.mossy != null) {
				looseToCobble(`mossy_${rockId}`, rock, rock.mossyLoose, rock.cobble.mossy);
			}
		}

		// Loose to brick
		if (rock.loose != null && rock.brick != null && rockItemExists(rock.loose) && rockItemExists(rock.brick)) {
			if (!rock.isTFC) {
				event.shapeless(rock.brick, [rock.loose, '#c:tools/chisel']) // [PORT] damage_inputs -> plain
					.id(`tfg:shapeless/${rockId}_loose_to_brick`);
			}

			event.recipes.gtceu.cutter(`tfg:${rockId}_loose_to_brick`)
				.itemInputs(rock.loose)
				.itemOutputs(rock.brick)
				.duration(10)
				.EUt(2);
		}

		if (rock.mossyLoose != null && rock.brick != null && rockItemExists(rock.mossyLoose) && rockItemExists(rock.brick)) {
			if (!rock.isTFC) {
				event.shapeless(rock.brick, [rock.mossyLoose, '#c:tools/chisel']) // [PORT] damage_inputs -> plain
					.id(`tfg:shapeless/${rockId}_mossy_loose_to_brick`);
			}

			event.recipes.gtceu.cutter(`tfg:${rockId}_mossy_loose_to_brick`)
				.itemInputs(rock.mossyLoose)
				.itemOutputs(rock.brick)
				.duration(10)
				.EUt(2);
		}

		// Cobble to Gravel
		if (rock.cobble != null && rock.gravel != null && rockItemExists(rock.cobble.block) && rockItemExists(rock.gravel)) {
			event.recipes.gtceu.forge_hammer(`${rockId}_cobble_to_gravel`)
				.itemInputs(rock.cobble.block)
				.itemOutputs(rock.gravel)
				.duration(10)
				.EUt(7)

			// [PORT] greate отсутствует
			// event.recipes.greate.pressing(rock.gravel, rock.cobble.block)
			// 	.recipeTier(0)
			// 	.id(`greate:pressing/${rockId}_cobble_to_gravel`)
		}

		// Cobble to mossy cobble
		if (rock.cobble != null && rock.cobble.mossy != null && rockItemExists(rock.cobble.block) && rockItemExists(rock.cobble.mossy.block)) {
			event.recipes.gtceu.mixer(`tfg:${rockId}_cobble_to_mossy_cobble`)
				.itemInputs(rock.cobble.block, '#tfc:compost_greens/low') // [PORT] compost_greens_low -> compost_greens/low
				.circuit(1)
				.inputFluids("#tfg:clean_water 144")
				.itemOutputs(rock.cobble.mossy.block)
				.duration(50)
				.EUt(2)

			// [PORT] deploying: '#тег' парсится как fluid-тег -> {tag: ...}
			event.recipes.create.deploying(rock.cobble.mossy.block, [ rock.cobble.block, { tag: 'tfc:compost_greens/low' } ])
				.id(`tfg:deploying/${rockId}_cobble_to_mossy_cobble`)

			event.recipes.create.deploying(rock.cobble.block, [ rock.cobble.mossy.block, 'tfc:groundcover/pumice' ])
				.id(`tfg:deploying/${rockId}_mossy_cobble_to_cobble_pumice`)

			event.recipes.create.deploying(rock.cobble.block, [ rock.cobble.mossy.block, { tag: 'c:tools/knife' } ]) // [PORT] forge:tools/knives -> c:tools/knife
				.id(`tfg:deploying/${rockId}_mossy_cobble_to_cobble_knife`)
		}

		// Bricks to brick blocks
		if (rock.brick != null && rock.bricks != null && rockItemExists(rock.brick) && rockItemExists(rock.bricks.block)) {
			if (!rock.isTFC) {
				event.shaped(`4x ${rock.bricks.block}`, [
					'ABA',
					'BAB',
					'ABA'
				], {
					A: rock.brick,
					B: 'tfc:mortar'
				}).id(`tfg:shaped/${rockId}_brick_to_bricks`)
			}

			event.recipes.gtceu.assembler(`tfg:${rockId}_brick_to_bricks`)
				.itemInputs(`5x ${rock.brick}`)
				.inputFluids(Fluid.of('gtceu:concrete', 72))
				.itemOutputs(`4x ${rock.bricks.block}`)
				.circuit(1)
				.duration(50)
				.EUt(2)

			event.recipes.create.sequenced_assembly([`4x ${rock.bricks.block}`], rock.brick, [
				event.recipes.create.deploying(rock.brick, [rock.brick, rock.brick]),
				event.recipes.create.deploying(rock.brick, [rock.brick, 'tfc:mortar'])
			])
			.transitionalItem(rock.brick)
			.loops(4)
			.id(`tfg:deploying/${rockId}_brick_to_bricks`)
		}

		// Bricks to smooth
		if (rock.bricks != null && rock.polished != null && rockItemExists(rock.bricks.block) && rockItemExists(rock.polished.block)) {
			event.recipes.create.sandpaper_polishing(rock.polished.block, rock.bricks.block)
				.id(`tfg:polishing/${rockId}_brick_to_polished`)
		}

		// Bricks to mossy bricks
		if (rock.bricks != null && rock.bricks.mossy != null && rockItemExists(rock.bricks.block) && rockItemExists(rock.bricks.mossy.block)) {
			event.recipes.gtceu.mixer(`tfg:${rockId}_bricks_to_mossy_bricks`)
				.itemInputs(rock.bricks.block, '#tfc:compost_greens/low') // [PORT] тег переименован
				.circuit(1)
				.inputFluids("#tfg:clean_water 144")
				.itemOutputs(rock.bricks.mossy.block)
				.duration(50)
				.EUt(2)

			event.recipes.create.deploying(rock.bricks.mossy.block, [ rock.bricks.block, { tag: 'tfc:compost_greens/low' } ])
				.id(`tfg:deploying/${rockId}_bricks_to_mossy_bricks`)

			event.recipes.create.deploying(rock.bricks.block, [ rock.bricks.mossy.block, 'tfc:groundcover/pumice' ])
				.id(`tfg:deploying/${rockId}_mossy_bricks_to_bricks_pumice`)

			event.recipes.create.deploying(rock.bricks.block, [ rock.bricks.mossy.block, { tag: 'c:tools/knife' } ])
				.id(`tfg:deploying/${rockId}_mossy_bricks_to_bricks_knife`)

			// Mossy bricks to smooth
			if (rock.bricks.mossy != null && rock.polished != null && rockItemExists(rock.polished.block)) {
				event.recipes.create.sandpaper_polishing(rock.polished.block, rock.bricks.mossy.block)
					.id(`tfg:polishing/${rockId}_mossy_brick_to_polished`)
			}
		}


		// Bricks to cracked bricks
		if (rock.bricks != null && rock.bricks.cracked != null && rockItemExists(rock.bricks.block) && rockItemExists(rock.bricks.cracked.block)) {
			if (!rock.isTFC) {
				event.shapeless(rock.bricks.cracked.block, [rock.bricks.block, '#c:tools/hammer']) // [PORT] damage_inputs -> plain; tfc:hammers -> c:tools/hammer
					.id(`tfg:shapeless/${rockId}_bricks_to_cracked`);
			}

			event.recipes.gtceu.forge_hammer(`tfg:${rockId}_bricks_to_cracked`)
				.itemInputs(rock.bricks.block)
				.itemOutputs(rock.bricks.cracked.block)
				.duration(12)
				.EUt(8);

			// [PORT] greate отсутствует
			// event.recipes.greate.pressing(rock.bricks.cracked.block, rock.bricks.block)
			// 	.recipeTier(0)
			// 	.id(`tfg:pressing/${rockId}_bricks_to_cracked`);

			event.recipes.create.deploying(rock.bricks.block, [ rock.bricks.cracked.block, 'tfc:mortar' ])
				.id(`tfg:deploying/${rockId}_cracked_bricks_to_bricks`)

			// Cracked bricks to smooth
			if (rock.bricks.cracked != null && rock.polished != null && rockItemExists(rock.polished.block)) {
				event.recipes.create.sandpaper_polishing(rock.polished.block, rock.bricks.cracked.block)
					.id(`tfg:polishing/${rockId}_cracked_brick_to_polished`)
			}
		}


		// Raw to polished
		if (rock.raw != null && rock.polished != null && rockItemExists(rock.raw.block) && rockItemExists(rock.polished.block)) {
			rawToPolished(`${rockId}_raw_to_polished`, !rock.isTFC, rock.raw.block, rock.polished.block);

			event.recipes.gtceu.assembler(`tfg:${rockId}_raw_to_polished`)
				.itemInputs(`8x ${rock.raw.block}`)
				.circuit(2)
				.inputFluids(Fluid.of('gtceu:concrete', 72))
				.itemOutputs(`8x ${rock.polished.block}`)
				.duration(250)
				.EUt(8)

			event.recipes.create.sandpaper_polishing(rock.polished.block, rock.raw.block)
				.id(`tfg:polishing/${rockId}_raw_to_polished`)
		}

		if (rock.hardened != null && rock.polished != null) {
			rawToPolished(`${rockId}_hardened_to_polished`, !rock.isTFC, rock.hardened, rock.polished.block);
		}

		if (rock.chiseled != null && rock.bricks != null) {
			rawToPolished(`${rockId}_bricks_to_chiseled`, !rock.isTFC, rock.bricks.block, rock.chiseled.block);
		}

		// Aqueducts
		if (rock.brick != null && rock.aqueduct != null && rockItemExists(rock.brick) && rockItemExists(rock.aqueduct)) {
			if (!rock.isTFC) {
				event.shaped(rock.aqueduct, [
					'A A',
					'BAB'
				], {
					A: rock.brick,
					B: 'tfc:mortar'
				})
				.id(`tfg:shaped/${rockId}_aqueduct`);
			}

			event.recipes.gtceu.assembler(`tfg:${rockId}_aqueduct`)
				.itemInputs(`3x ${rock.brick}`)
				.circuit(3)
				.inputFluids(Fluid.of('gtceu:concrete', 16))
				.itemOutputs(rock.aqueduct)
				.duration(50)
				.EUt(2);
		}

		// Pillars
		if (rock.pillar != null && rockItemExists(rock.pillar)) {
			if (rock.bricks != null && rockItemExists(rock.bricks.block)) {
				event.shaped(`2x ${rock.pillar}`, [
					'A',
					'A'
				], {
					A: rock.bricks.block
				})
				.id(`tfg:shaped/${rockId}_pillar`);
			}
		}

		if (rock.pillar2 != null && rockItemExists(rock.pillar2)) {
			if (rock.bricks != null && rockItemExists(rock.bricks.block)) {
				event.shaped(`2x ${rock.pillar2}`, [
					'AA'
				], {
					A: rock.bricks.block
				})
				.id(`tfg:shaped/${rockId}_pillar2`);
			}
		}

		// Chiseling
		if (rock.raw != null) {
			changeForms(rockId, rock, rock.raw);
		}
		if (rock.cobble != null) {
			changeForms(rockId, rock, rock.cobble);
			if (rock.cobble.mossy != null) {
				changeForms(rockId, rock, rock.cobble.mossy);
			}
		}
		if (rock.bricks != null) {
			changeForms(rockId, rock, rock.bricks);
			if (rock.bricks.mossy != null) {
				changeForms(rockId, rock, rock.bricks.mossy);
			}
			if (rock.bricks.cracked != null) {
				changeForms(rockId, rock, rock.bricks.cracked);
			}
		}
		if (rock.polished != null) {
			changeForms(rockId, rock, rock.polished);
		}
		if (rock.chiseled != null) {
			changeForms(rockId, rock, rock.chiseled);
		}
		if (rock.stonecutting != null) {
			rock.stonecutting.forEach(stonecuttingEntry => {
				changeForms(rockId, rock, stonecuttingEntry);
			})
		}

		// Stonecutting
		if (rock.stonecutterTag != null) {
			try {
				// Pull everything out of the tag
				let tag_array = Ingredient.of(`#${rock.stonecutterTag}`).itemIds.toArray().map(String);
				let tag_array_half = Ingredient.of(`#${rock.stonecutterTag}_half`).itemIds.toArray().map(String);
				// Remove any duplicates
				tag_array = tag_array.filter((item, index) => tag_array.indexOf(item) === index);
				// [PORT-FIX] NeoForge подставляет minecraft:barrier вместо пустого/несуществующего тега — вычищаем
				tag_array = tag_array.filter(item => item !== 'minecraft:barrier' && item !== 'minecraft:air')
				tag_array_half = tag_array_half.filter(item => item !== 'minecraft:barrier' && item !== 'minecraft:air')
				// [PORT-FIX] subtract на теге из ОДНОГО предмета даёт пустой ингредиент -> краш сериализации,
				// поэтому режем только теги с >1 предметом.
				// [PORT-FIX] Ingredient.subtract нет в KubeJS 7 (ванильный Ingredient) — вместо
				// «тег минус предмет» передаём явный массив остальных id из развёрнутого тега.
				if (tag_array.length > 1) {
					tag_array.forEach(item => {
						event.stonecutting(item, tag_array.filter(other => other !== item))
							.id(`tfg:stonecutter/${global.linuxUnfucker(item)}`)
					})
					tag_array_half.forEach(item => {
						event.stonecutting(`2x ${item}`, tag_array.filter(other => other !== item))
							.id(`tfg:stonecutter/${global.linuxUnfucker(item)}_half`)
						if (tag_array_half.length > 1) {
							event.stonecutting(item, tag_array_half.filter(other => other !== item))
								.id(`tfg:stonecutter/${global.linuxUnfucker(item)}_slab_to_slab`)
						}
					})
				}
			} catch (e) {
				console.warn(`[Gregnautics][PORT-CHECK] rocks stonecutter: тег ${rock.stonecutterTag} не развернулся: ${e}`)
			}
		}

		// Supports
		if (rock.support != null && rock.loose != null && rockItemExists(rock.support) && rockItemExists(rock.loose)) {
			// [PORT] damage_inputs_shaped_crafting удалён — plain shaped
			event.shaped(`8x ${rock.support}`, [
				'AB ',
				'AC ',
				'AC '
			], {
				A: rock.loose,
				B: '#c:tools/chisel',
				C: 'tfc:mortar'
			}).id(`tfg:shaped/${rockId}_support`)

			event.recipes.gtceu.assembler(`tfg:${rockId}_support`)
				.circuit(11)
				.inputFluids(Fluid.of('gtceu:concrete', 36))
				.itemOutputs(`8x ${rock.support}`)
				.itemInputs(`3x ${rock.loose}`)
				.duration(40)
				.EUt(GTValues.VA[GTValues.ULV])
		}

		if (rock.support != null && rock.mossyLoose != null && rockItemExists(rock.support) && rockItemExists(rock.mossyLoose)) {
			event.shaped(`8x ${rock.support}`, [
				'AB ',
				'AC ',
				'AC '
			], {
				A: rock.mossyLoose,
				B: '#c:tools/chisel',
				C: 'tfc:mortar'
			}).id(`tfg:shaped/${rockId}_mossy_support`)

			event.recipes.gtceu.assembler(`tfg:${rockId}_mossy_support`)
				.circuit(11)
				.inputFluids(Fluid.of('gtceu:concrete', 36))
				.itemOutputs(`8x ${rock.support}`)
				.itemInputs(`3x ${rock.mossyLoose}`)
				.duration(40)
				.EUt(GTValues.VA[GTValues.ULV])
		}

		// Rock duping
		if (rock.isTFC) {
			if (rock.raw != null && rockItemExists(rock.raw.block)) {
				event.recipes.gtceu.rock_breaker(`tfg:${rockId}_raw`)
					.notConsumableItem(rock.raw.block) // [PORT-FIX] notConsumable(строка) нет в GTM8
					.itemOutputs(rock.raw.block)
					.duration(20)
					.EUt(GTValues.VA[GTValues.ULV])
			}

			if (rock.cobble != null && rockItemExists(rock.cobble.block)) {
				event.recipes.gtceu.rock_breaker(`tfg:${rockId}_cobble`)
					.notConsumableItem(rock.cobble.block)
					.itemOutputs(rock.cobble.block)
					.duration(20)
					.EUt(GTValues.VA[GTValues.ULV])
			}
		} else if (rock.dimensions != null && rock.dimensions != []) {
			// [PORT-Ф10] измерения ad_astra:* отфильтровываются (космоконтент)
			let dims = rock.dimensions.filter(dim => !String(dim).startsWith('ad_astra:'));

			if (rock.raw != null && rockItemExists(rock.raw.block) && dims.length > 0) {
				let rawRecipe = event.recipes.gtceu.rock_breaker(`tfg:${rockId}_raw`)
					.notConsumableItem(rock.raw.block)
					.itemOutputs(rock.raw.block)
					.duration(20)
					.EUt(GTValues.VA[GTValues.ULV])
				dims.forEach(dim => rawRecipe.dimension(dim));
			}

			if (rock.cobble != null && rockItemExists(rock.cobble.block) && dims.length > 0) {
				let cobbleRecipe = event.recipes.gtceu.rock_breaker(`tfg:${rockId}_cobble`)
					.notConsumableItem(rock.cobble.block)
					.itemOutputs(rock.cobble.block)
					.duration(20)
					.EUt(GTValues.VA[GTValues.ULV])
				dims.forEach(dim => cobbleRecipe.dimension(dim));
			}
		}
	}


	// Misc hammering recipes
	global.HAMMERING.forEach(x => {
		if (!rockIngredientOk(x.raw) || !rockItemExists(x.hammered)) return; // [PORT-Ф4-TODO] fluorapatite-контент не зарегистрирован

		const id = global.linuxUnfucker(`${x.raw}_to_${x.hammered}`);

		event.recipes.gtceu.forge_hammer(`tfg:${id}`)
			.itemInputs(x.raw)
			.itemOutputs(x.hammered)
			.duration(x.duration)
			.EUt(x.eu);

		// [PORT] greate отсутствует
		// event.recipes.greate.pressing(x.hammered, x.raw)
		// 	.recipeTier(x.eu <= 8 ? 0 : 1)
		// 	.id(`tfg:pressing/${id}`);
	})

	// Alabaster
	event.recipes.gtceu.cutter("tfg:raw_alabaster_to_bricks")
		.itemInputs("tfc:alabaster/raw")
		.itemOutputs("4x tfc:alabaster_brick")
		.duration(40)
		.EUt(2)

	// TODO: do alabaster properly

	// MACERATOR
	// [PORT-Ф2] Составы камней — GT-материалы tfg:* (Ф2 заблокирована багом GTM8);
	// GTMaterials.get(...) вернёт null — такие составы пропускаем до Ф2.
	let ROCK_COMPOSITIONS = [];
	for (let [rockId, rock] of Object.entries(global.BIG_ROCK_TABLE)) {
		if (rock.material != null && !ROCK_COMPOSITIONS.includes(rock.material)) {
			ROCK_COMPOSITIONS.push(rock.material);
		}
	}

	ROCK_COMPOSITIONS.forEach(composition => {
		let material = GTMaterials.get(composition);

		let compositionId = composition.replace(/tfg:/g, '');

		// Brick composition is 5 bricks -> 4 blocks
		if (composition === "brick") {
			event.recipes.gtceu.macerator(`tfg:macerate_${compositionId}`)
				.itemInputs(`#tfg:stone_composition/${compositionId}`)
				.itemOutputs('5x gtceu:small_brick_dust')
				.duration(50)
				.EUt(2)
				.category(GTRecipeCategories.MACERATOR_RECYCLING);
		} else if (!rockIsRealMaterial(material)) {
			// [PORT-Ф2] материал не зарегистрирован до Ф2
			return;
		} else {
			event.recipes.gtceu.macerator(`tfg:macerate_${compositionId}`)
				.itemInputs(`#tfg:stone_composition/${compositionId}`)
				.itemOutputs(ChemicalHelper.getDust(material, GTValues.M))
				.duration(50)
				.EUt(2)
				.category(GTRecipeCategories.MACERATOR_RECYCLING);
		}


		// check if any items have this tag otherwise it errors
		if (rockIsRealMaterial(material)) {
			try {
				// [PORT-FIX] NeoForge подставляет minecraft:barrier вместо пустого/несуществующего тега — вычищаем
				let half = Ingredient.of(`#tfg:stone_composition/${compositionId}_half`).itemIds.toArray().map(String)
					.filter(x => x !== 'minecraft:barrier' && x !== 'minecraft:air');
				if (half.length > 0) {
					event.recipes.gtceu.macerator(`tfg:macerate_${compositionId}_half`)
						.itemInputs(`#tfg:stone_composition/${compositionId}_half`)
						.itemOutputs(ChemicalHelper.getDust(material, GTValues.M / 2))
						.duration(50)
						.EUt(2)
						.category(GTRecipeCategories.MACERATOR_RECYCLING);
				}
			} catch (e) {
				console.warn(`[Gregnautics][PORT-CHECK] rocks macerator: тег stone_composition/${compositionId}_half не развернулся: ${e}`)
			}
		}
	})

	// COMPRESSOR
	// [PORT-Ф10] permafrost: вход tfg:loose/permafrost (глацио-контент, Ф4) и выход ad_astra:permafrost
	//            не зарегистрированы; у Stellaris нет аналога permafrost — рецепт ждёт полного космо-прохода.
	// event.recipes.gtceu.compressor('tfg:permafrost')
	// 	.itemInputs('4x tfg:loose/permafrost')
	// 	.itemOutputs('ad_astra:permafrost')
	// 	.duration(40*20)
	// 	.EUt(2)

	// [PORT-Ф10-FIX] venus_sandstone: ad_astra:venus_sand / ad_astra:venus_sandstone -> stellaris-эквиваленты
	//                (оба блока подтверждены в дампе реестра testserver/kubejs/exported/registries/blocks.json).
	event.recipes.gtceu.compressor('tfg:venus_sandstone')
		.itemInputs('4x stellaris:venus_sand')
		.itemOutputs('stellaris:venus_sandstone')
		.duration(40*20)
		.EUt(2)


	// Magma Blocks
	event.remove({id: 'gtceu:compressor/magma_block'})
	// [PORT] greate отсутствует
	// event.remove({id: 'greate:splashing/obsidian'})

	// Magma block + stone group
	const MAGMA_BLOCKS = [
		{ magma: 'minecraft:magma_block',   rock: 'minecraft:blackstone' },
		{ magma: 'tfc:rock/magma/granite',  rock: 'tfc:rock/raw/granite' },
		{ magma: 'tfc:rock/magma/diorite',  rock: 'tfc:rock/raw/diorite' },
		{ magma: 'tfc:rock/magma/gabbro',   rock: 'tfc:rock/raw/gabbro' },
		{ magma: 'tfc:rock/magma/rhyolite', rock: 'tfc:rock/raw/rhyolite' },
		{ magma: 'tfc:rock/magma/basalt',   rock: 'tfc:rock/raw/basalt' },
		{ magma: 'tfc:rock/magma/andesite', rock: 'tfc:rock/raw/andesite' },
		{ magma: 'tfc:rock/magma/dacite',   rock: 'tfc:rock/raw/dacite' }
	];

	MAGMA_BLOCKS.forEach(block => {
		event.recipes.gtceu.fluid_solidifier(`tfg:gtceu/fluid_solidifier/${global.linuxUnfucker(block.magma)}`)
			.itemInputs(`1x ${block.rock}`)
			.inputFluids(Fluid.of('minecraft:lava', 250))
			.itemOutputs(`1x ${block.magma}`)
			.duration(100)
			.EUt(GTValues.VA[GTValues.ULV])

		event.recipes.gtceu.extractor(`tfg:gtceu/extractor/${global.linuxUnfucker(block.magma)}`)
			.itemInputs(`1x ${block.magma}`)
			.outputFluids(Fluid.of('minecraft:lava', 250))
			.itemOutputs(`1x ${block.rock}`)
			.duration(100)
			.EUt(GTValues.VA[GTValues.LV])
	})

	// Blackstone Buttons
	// [PORT] removeCutterRecipe — хелпер TFG-мода, инлайн event.remove; отсутствующие id безвредны
	event.remove({ id: 'gtceu:cutter/blackstone_button' })
	event.remove({ id: 'gtceu:cutter/blackstone_button_water' })
	event.remove({ id: 'gtceu:cutter/blackstone_button_distilled_water' })
	event.remove({ id: 'gtceu:cutter/cut_polished_blackstone_brickslab_into_button' })
	event.remove({ id: 'gtceu:cutter/cut_polished_blackstone_brickslab_into_button_water' })
	event.remove({ id: 'gtceu:cutter/cut_polished_blackstone_brickslab_into_button_distilled_water' })

	event.recipes.gtceu.cutter('tfg:blackstone_button')
		.itemInputs('minecraft:polished_blackstone_pressure_plate')
		.itemOutputs('6x minecraft:polished_blackstone_button')
		.EUt(7)
		.duration(100)

	// Misc
	event.recipes.gtceu.cutter('tfg:vanilla_stone_slab_to_plate')
		.itemInputs('minecraft:stone_slab')
		.itemOutputs(ChemicalHelper.get(TagPrefix.plate, GTMaterials.Stone, 1)) // [PORT-FIX] выход тегом невозможен — конкретный предмет
		.duration(20)
		.EUt(GTValues.VA[GTValues.LV])

	// Sedimentary carbonate into flux

	// [PORT-Ф2] тег c:dusts/sedimentary_carbonate пуст до Ф2 — рецепты регистрируются и заработают после Ф2
	event.recipes.gtceu.macerator('tfg:sedimentary_carbonate_to_flux')
		.itemInputs('#c:dusts/sedimentary_carbonate')
		.itemOutputs('2x tfc:powder/flux')
		.duration(20)
		.EUt(2)

	// [PORT-Ф2] пустой тег в tfc:quern валит рецепт при создании ("not allowed to be empty") —
	// до появления Ф2-материалов не регистрируем
	// event.recipes.tfc.quern('2x tfc:powder/flux', '#c:dusts/sedimentary_carbonate')
	// 	.id(`tfg:quern/sedimentary_carbonate_to_flux`)

	// [PORT-Ф2] shapeless с пустым тегом в 1.21 отбрасывается загрузчиком (failed recipe) — до Ф2 не регистрируем
	// event.shapeless('2x tfc:powder/flux', ['#c:dusts/sedimentary_carbonate', '#c:tools/hammer'])
})
