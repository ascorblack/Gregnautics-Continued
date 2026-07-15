// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/natural_blocks/tags.stones.js (1.20.1) на 1.21.1 NeoForge.
// [PORT] Переименования тегов 1.20 -> 1.21 (сверено с data/c|tfc/tags в TFC 4.2.5):
//  - forge:stone -> c:stones; forge:cobblestone(/normal|/mossy) -> c:cobblestones(/normal|/mossy);
//  - tfc:rock/raw -> c:stones/raw; tfc:rock/smooth -> c:stones/smooth; tfc:rock/gravel (item) -> c:gravels;
//  - forge:smooth_stone -> c:smooth_stone; forge:smooth_stone_slabs -> c:smooth_stone_slab (как в create.tags.js);
//  - forge:stone_bricks -> c:stone_bricks; tfc:forge_insulation -> tfc:charcoal_forge_insulation;
//  - тегов tfc:rock/bricks|mossy_bricks|cracked_bricks|chiseled_bricks в TFC 1.21 НЕТ — их add/remove вырезаны [PORT-FIX].
// [PORT-NOTE] addToTfcTag в оригинале вызывается с ОДНИМ аргументом при сигнатуре (rock, block) —
//  апстрим-баг, функция всегда no-op. Сохранено 1:1 (не добавляем теги, которых не было в 1.20-рантайме).
// [PORT] Незарегистрированные предметы/блоки (Ф2/Ф4) отфильтровываются гвардами — теги подхватятся с регистрацией.

const $StTagBuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const $StTagResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')

function stTagItemExists(id) {
	try {
		return $StTagBuiltInRegistries.ITEM.containsKey($StTagResourceLocation.parse(String(id)))
	} catch (e) {
		return false
	}
}

function stTagBlockExists(id) {
	try {
		return $StTagBuiltInRegistries.BLOCK.containsKey($StTagResourceLocation.parse(String(id)))
	} catch (e) {
		return false
	}
}

ServerEvents.tags('item', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.overworld natural_blocks tags.stones item start')

	// [PORT] гвард: добавляем только существующие предметы (теги '#...' пропускаем как есть)
	const add = (tag, entry) => {
		if (String(entry).startsWith('#') || stTagItemExists(entry)) {
			event.add(tag, entry);
		}
	}

	// [PORT-NOTE] сохранённый апстрим-баг: все вызовы одноаргументные -> rock.tfcTag === undefined -> no-op
	function addToTfcTag(rock, block) {
		if (rock != null && rock.tfcTag != null) {
			event.add(rock.tfcTag, block);
		}
	}

	function addToMaterialTag(material, block) {
		if (material != null && stTagItemExists(block)) {
			if (block.endsWith('_slab') || block.endsWith('_wall') || block.endsWith('_support')) {
				event.add(`tfg:stone_composition/${material}_half`, block);
			}
			else {
				event.add(`tfg:stone_composition/${material}`, block);
			}
		}
	}

	function addToStonecutterTag(tag, entry) {
		if (tag != null) {
			add(tag, entry.block);
			if (entry.stair != null) {
				add(tag, entry.stair);
			}
			if (entry.wall != null) {
				add(tag, entry.wall);
			}
			if (entry.slab != null) {
				add(`${tag}_half`, entry.slab);
			}
		}
	}

	const SHAPES = ['stair', 'slab', 'wall'];

	for (let [rockId, rock] of Object.entries(global.BIG_ROCK_TABLE)) {

		let material = null;
		if (rock.material != null)
			material = rock.material.replace(/tfg:/g, '');

		if (rock.raw != null) {
			if (rock.collapsible && rock.cobble != null) {
				add('c:stones/raw', rock.raw.block); // [PORT] tfc:rock/raw -> c:stones/raw
				add('c:stones', rock.raw.block); // [PORT] forge:stone -> c:stones
			}
			addToTfcTag(rock.raw.block);
			addToMaterialTag(material, rock.raw.block);
			if (rock.brick == null) {
				addToStonecutterTag(rock.stonecutterTag, rock.raw);
			}

			SHAPES.forEach(shape => {
				if (rock.raw[shape] != null) {
					if (rock.collapsible && rock.cobble != null) {
						add(`tfg:rock_${shape}s`, rock.raw[shape]);
					}
					addToTfcTag(rock.raw[shape]);
					addToMaterialTag(material, rock.raw[shape]);
				}
			})
		}

		if (rock.cobble != null) {
			add('tfg:interaction/cobble', rock.cobble.block);
			add('c:cobblestones', rock.cobble.block); // [PORT] forge:cobblestone -> c:cobblestones
			add('c:cobblestones/normal', rock.cobble.block);
			addToTfcTag(rock.cobble.block);
			addToMaterialTag(material, rock.cobble.block);

			SHAPES.forEach(shape => {
				if (rock.cobble[shape] != null) {
					add(`tfg:interaction/cobble_${shape.replace(/stair/g, 'stairs')}`, rock.cobble[shape]);
					add(`tfg:rock_${shape}s`, rock.cobble[shape]);
					addToTfcTag(rock.cobble[shape]);
					addToMaterialTag(material, rock.cobble[shape]);
				}
			})

			if (rock.cobble.mossy != null) {
				add('tfg:interaction/mossy_cobble', rock.cobble.mossy.block);
				event.remove('c:cobblestones/normal', rock.cobble.mossy.block);
				add('c:cobblestones/mossy', rock.cobble.mossy.block);
				addToTfcTag(rock.cobble.mossy.block);
				addToMaterialTag(material, rock.cobble.mossy.block);

				SHAPES.forEach(shape => {
					if (rock.cobble.mossy[shape] != null) {
						add(`tfg:interaction/mossy_cobble_${shape.replace(/stair/g, 'stairs')}`, rock.cobble.mossy[shape]);
						add(`tfg:rock_${shape}s`, rock.cobble.mossy[shape]);
						addToTfcTag(rock.cobble.mossy[shape]);
						addToMaterialTag(material, rock.cobble.mossy[shape]);
					}
				})
			}
		}

		if (rock.bricks != null) {
			add('tfg:brick_index', rock.bricks.block);
			add('tfg:interaction/brick', rock.bricks.block);
			add('minecraft:stone_bricks', rock.bricks.block);
			add('c:stone_bricks', rock.bricks.block); // [PORT] forge -> c
			// [PORT-FIX] тега tfc:rock/bricks в TFC 1.21 нет — add/remove вырезаны
			addToTfcTag(rock.bricks.block);
			addToMaterialTag(material, rock.bricks.block);
			addToStonecutterTag(rock.stonecutterTag, rock.bricks);

			SHAPES.forEach(shape => {
				if (rock.bricks[shape] != null) {
					add('tfg:brick_index', rock.bricks[shape]);
					add(`tfg:interaction/brick_${shape.replace(/stair/g, 'stairs')}`, rock.bricks[shape]);
					add(`tfg:brick_${shape}s`, rock.bricks[shape]);
					addToTfcTag(rock.bricks[shape]);
					addToMaterialTag(material, rock.bricks[shape]);
				}
			})

			if (rock.bricks.mossy != null) {
				add('tfg:brick_index', rock.bricks.mossy.block);
				add('tfg:interaction/mossy_brick', rock.bricks.mossy.block);
				// [PORT-FIX] tfc:rock/bricks / tfc:rock/mossy_bricks — тегов нет в TFC 1.21
				addToTfcTag(rock.bricks.mossy.block);
				addToMaterialTag(material, rock.bricks.mossy.block);

				SHAPES.forEach(shape => {
					if (rock.bricks.mossy[shape] != null) {
						add('tfg:brick_index', rock.bricks.mossy[shape]);
						add(`tfg:interaction/mossy_brick_${shape.replace(/stair/g, 'stairs')}`, rock.bricks.mossy[shape]);
						add(`tfg:brick_${shape}s`, rock.bricks.mossy[shape]);
						addToTfcTag(rock.bricks.mossy[shape]);
						addToMaterialTag(material, rock.bricks.mossy[shape]);
					}
				})
			}

			if (rock.bricks.cracked != null) {
				add('tfg:brick_index', rock.bricks.cracked.block);
				add('tfg:interaction/cracked_brick', rock.bricks.cracked.block);
				// [PORT-FIX] tfc:rock/bricks / tfc:rock/cracked_bricks — тегов нет в TFC 1.21
				addToTfcTag(rock.bricks.cracked.block);
				addToMaterialTag(material, rock.bricks.cracked.block);

				SHAPES.forEach(shape => {
					if (rock.bricks.cracked[shape] != null) {
						add('tfg:brick_index', rock.bricks.cracked[shape]);
						add(`tfg:interaction/cracked_brick_${shape.replace(/stair/g, 'stairs')}`, rock.bricks.cracked[shape]);
						add(`tfg:brick_${shape}s`, rock.bricks.cracked[shape]);
						addToTfcTag(rock.bricks.cracked[shape]);
						addToMaterialTag(material, rock.bricks.cracked[shape]);
					}
				})
			}
		}

		if (rock.polished != null) {
			add('tfg:brick_index', rock.polished.block);
			add('tfg:interaction/smooth_brick', rock.polished.block);
			add('c:stones/smooth', rock.polished.block); // [PORT] tfc:rock/smooth -> c:stones/smooth
			add('c:smooth_stone', rock.polished.block); // [PORT] forge:smooth_stone -> c:smooth_stone
			addToTfcTag(rock.polished.block);
			addToMaterialTag(material, rock.polished.block);
			addToStonecutterTag(rock.stonecutterTag, rock.polished);

			SHAPES.forEach(shape => {
				if (rock.polished[shape] != null) {
					add('tfg:brick_index', rock.polished[shape]);
					if (rock.collapsible && rock.cobble != null) {
						add(`tfg:rock_${shape}s`, rock.polished[shape]);
					}
					addToTfcTag(rock.polished[shape]);
					addToMaterialTag(material, rock.polished[shape]);

					if (shape == 'slab') {
						add('c:smooth_stone_slab', rock.polished.slab); // [PORT] forge:smooth_stone_slabs -> c:smooth_stone_slab
					}
				}
			})
		}

		if (rock.chiseled != null) {
			// [PORT-FIX] tfc:rock/bricks / tfc:rock/chiseled_bricks — тегов нет в TFC 1.21
			addToTfcTag(rock.chiseled.block);
			addToMaterialTag(material, rock.chiseled.block);
			addToStonecutterTag(rock.stonecutterTag, rock.chiseled);
		}

		if (rock.gravel != null) {
			addToTfcTag(rock.gravel);
			addToMaterialTag(material, rock.gravel);
			add('c:gravels', rock.gravel); // [PORT] tfc:rock/gravel (item) -> c:gravels
			if (rock.gravelTag != null) {
				add(rock.gravelTag, rock.gravel);
			}
		}

		if (rock.hardened != null) {
			addToTfcTag(rock.hardened);
			addToMaterialTag(material, rock.hardened);
		}

		if (rock.loose != null) {
			add('rnr:loose_rock_items', rock.loose);
			addToTfcTag(rock.loose);
		}

		if (rock.brick != null) {
			add('tfg:stone_brick', rock.brick);
			addToTfcTag(rock.brick);
		}

		if (rock.support != null) {
			addToTfcTag(rock.support);
			addToMaterialTag(material, rock.support);
		}

		if (rock.aqueduct != null) {
			addToTfcTag(rock.aqueduct);
			addToMaterialTag(material, rock.aqueduct);
		}

		if (rock.spike != null) {
			addToTfcTag(rock.spike);
			add('tfg:rock_spikes', rock.spike);
		}

		if (rock.pillar != null) {
			addToTfcTag(rock.pillar);
			addToMaterialTag(material, rock.pillar);
			if (rock.stonecutterTag != null) {
				add(rock.stonecutterTag, rock.pillar);
			}
		}

		if (rock.pillar2 != null) {
			addToTfcTag(rock.pillar2);
			addToMaterialTag(material, rock.pillar2);
			if (rock.stonecutterTag != null) {
				add(rock.stonecutterTag, rock.pillar2);
			}
		}

		if (rock.stonecutting != null) {
			rock.stonecutting.forEach(blockForms => {
				// [PORT-FIX] tfc:rock/bricks / tfc:rock/chiseled_bricks — тегов нет в TFC 1.21
				addToTfcTag(blockForms.block);
				addToMaterialTag(material, blockForms.block);
				addToStonecutterTag(rock.stonecutterTag, blockForms);

				SHAPES.forEach(shape => {
					if (blockForms[shape] != null) {
						addToTfcTag(blockForms[shape]);
						addToMaterialTag(material, blockForms[shape]);
					}
				})
			})
		}
	}

	// Stone Dusts Tag
	// [PORT-Ф2] tfg:*_dust — пыли GT-материалов TFG, появятся после Ф2 (гварды подхватят)
	add('tfg:stone_dusts', 'gtceu:stone_dust')
	add('tfg:stone_dusts', 'tfg:sedimentary_clastic_dust')
	add('tfg:stone_dusts', 'tfg:sedimentary_carbonate_dust')
	add('tfg:stone_dusts', 'tfg:sedimentary_organic_dust')
	add('tfg:stone_dusts', 'tfg:metamorphic_dust')
	add('tfg:stone_dusts', 'tfg:igneous_ultramafic_dust')
	add('tfg:stone_dusts', 'tfg:igneous_mafic_dust')
	add('tfg:stone_dusts', 'tfg:igneous_intermediate_dust')
	add('tfg:stone_dusts', 'tfg:igneous_felsic_dust')

	// Extra basalt blocks
	add('c:stones', 'minecraft:basalt') // [PORT] forge:stone -> c:stones
	add(`tfc:igneous_extrusive_items`, 'minecraft:basalt')

	add('c:smooth_stone', 'minecraft:smooth_basalt')
	add(`tfc:igneous_extrusive_items`, 'minecraft:smooth_basalt')
	add('c:stones/smooth', 'minecraft:smooth_basalt') // [PORT] tfc:rock/smooth -> c:stones/smooth

	add('c:smooth_stone', 'minecraft:polished_basalt')
	add(`tfc:igneous_extrusive_items`, 'minecraft:polished_basalt')
	add('c:stones/smooth', 'minecraft:polished_basalt')
})


ServerEvents.tags('block', event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.overworld natural_blocks tags.stones block start')

	// [PORT] гвард: добавляем только существующие блоки
	const add = (tag, entry) => {
		if (String(entry).startsWith('#') || stTagBlockExists(entry)) {
			event.add(tag, entry);
		}
	}

	const SHAPES = ['stair', 'slab', 'wall'];

	for (let [rockId, rock] of Object.entries(global.BIG_ROCK_TABLE)) {

		if (rock.raw != null) {
			add('c:stones', rock.raw.block) // [PORT] forge:stone -> c:stones
			add('minecraft:mineable/pickaxe', rock.raw.block)
			add('tfc:can_carve', rock.raw.block)
			add('tfc:powderkeg_breaking_blocks', rock.raw.block)
			add('tfc:bloomery_insulation', rock.raw.block)
			add('firmalife:oven_insulation', rock.raw.block)
			add('tfc:charcoal_forge_insulation', rock.raw.block) // [PORT-FIX] tfc:forge_insulation -> tfc:charcoal_forge_insulation

			if (rock.collapsible && rock.cobble != null) {
				add('c:stones/raw', rock.raw.block) // [PORT] tfc:rock/raw -> c:stones/raw
				// Collapse tags also require a collapse recipe to work.
				// Don't add the recipe if you don't want them to actually collapse!
				add('tfc:can_collapse', rock.raw.block)
				add('tfc:can_trigger_collapse', rock.raw.block)
				add('tfc:can_start_collapse', rock.raw.block)
				add('tfc:breaks_when_isolated', rock.raw.block)
			}

			SHAPES.forEach(shape => {
				if (rock.raw[shape] != null) {
					add(`tfg:rock_${shape}s`, rock.raw[shape]);

					if (rock.collapsible && rock.cobble != null) {
						add('tfc:can_collapse', rock.raw[shape])
						add('tfc:can_trigger_collapse', rock.raw[shape])
						add('tfc:can_start_collapse', rock.raw[shape])
					}
				}
			})
		}

		if (rock.hardened != null) {
			add('minecraft:mineable/pickaxe', rock.hardened)
			add('tfc:powderkeg_breaking_blocks', rock.hardened)
			add('tfc:bloomery_insulation', rock.hardened)
			add('firmalife:oven_insulation', rock.hardened)
			add('tfc:charcoal_forge_insulation', rock.hardened) // [PORT-FIX]
			add('tfc:can_carve', rock.hardened)
			// hardened stone always collapses, but never starts them
			add('tfc:can_collapse', rock.hardened)
			add('tfc:can_trigger_collapse', rock.hardened)
		}

		if (rock.cobble != null) {
			add('tfc:can_landslide', rock.cobble.block)
			add('c:cobblestones', rock.cobble.block) // [PORT] forge:cobblestone -> c:cobblestones
			add('tfc:toughness_2', rock.cobble.block)

			if (rock.cobble.mossy != null) {
				add('tfc:can_landslide', rock.cobble.mossy.block)
				add('c:cobblestones', rock.cobble.mossy.block)
				add('tfc:toughness_2', rock.cobble.mossy.block)
			}
		}

		if (rock.gravel != null) {
			add('tfc:can_landslide', rock.gravel)
		}

		if (rock.polished != null) {
			add('tfc:bloomery_insulation', rock.polished.block);
			add('tfc:charcoal_forge_insulation', rock.polished.block); // [PORT-FIX]
			add('firmalife:oven_insulation', rock.polished.block);

			if (rock.collapsible && rock.cobble != null) {
				add('tfc:can_collapse', rock.polished.block)
				add('tfc:can_trigger_collapse', rock.polished.block)
				add('tfc:can_start_collapse', rock.polished.block)
			}

			SHAPES.forEach(shape => {
				if (rock.polished[shape] != null) {
					add(`tfg:rock_${shape}s`, rock.polished[shape]);

					if (rock.collapsible && rock.cobble != null) {
						add('tfc:can_collapse', rock.polished[shape])
						add('tfc:can_trigger_collapse', rock.polished[shape])
						add('tfc:can_start_collapse', rock.polished[shape])
					}
				}
			})
		}

		if (rock.chiseled != null) {
			add('tfc:bloomery_insulation', rock.chiseled.block);
			add('tfc:charcoal_forge_insulation', rock.chiseled.block); // [PORT-FIX]
			add('firmalife:oven_insulation', rock.chiseled.block);
		}

		if (rock.bricks != null) {
			add('tfc:bloomery_insulation', rock.bricks.block);
			add('tfc:charcoal_forge_insulation', rock.bricks.block); // [PORT-FIX]
			add('firmalife:oven_insulation', rock.bricks.block);

			if (rock.bricks.mossy != null) {
				add('tfc:bloomery_insulation', rock.bricks.mossy.block);
				add('tfc:charcoal_forge_insulation', rock.bricks.mossy.block); // [PORT-FIX]
				add('firmalife:oven_insulation', rock.bricks.mossy.block);
			}

			if (rock.bricks.cracked != null) {
				add('tfc:bloomery_insulation', rock.bricks.cracked.block);
				add('tfc:charcoal_forge_insulation', rock.bricks.cracked.block); // [PORT-FIX]
				add('firmalife:oven_insulation', rock.bricks.cracked.block);
			}
		}

		if (rock.stonecutting != null) {
			rock.stonecutting.forEach(blockForms => {
				add('tfc:bloomery_insulation', blockForms.block);
				add('tfc:charcoal_forge_insulation', blockForms.block); // [PORT-FIX]
				add('firmalife:oven_insulation', blockForms.block);
			})
		}
	}
})
