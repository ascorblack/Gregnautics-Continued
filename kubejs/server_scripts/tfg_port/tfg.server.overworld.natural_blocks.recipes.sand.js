// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/natural_blocks/recipes.sand.js (1.20.1) на 1.21.1 NeoForge.
// [PORT] Изменения:
//  - forge:sand -> c:sands; forge:ores -> c:ores; forge:tools/mortars -> c:tools/mortar (GTM8 — ед. число);
//  - greate отсутствует — greate.pressing вырезаны;
//  - chancedOutput тегом невозможен -> конкретный предмет через ChemicalHelper;
//  - id ванильных рецептов TFC 1.21: crafting/sandstone/{color}_{form}_{shape} -> crafting/{form}_sandstone/{color}_{shape};
//  - [PORT-Ф4-TODO] tfg:sand/fluorapatite/* и tfg:sandstone/raw/fluorapatite/* не зарегистрированы — гварды.

const $SandBuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const $SandResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')

function sandItemExists(id) {
	try {
		return $SandBuiltInRegistries.ITEM.containsKey($SandResourceLocation.parse(String(id).replace(/^\d+x\s+/, '')))
	} catch (e) {
		return false
	}
}

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.overworld natural_blocks recipes.sand start')

	event.recipes.gtceu.centrifuge('oilsands_ore_separation')
		.itemInputs('#c:ores/oilsands') // [PORT] forge -> c
		.chancedOutput('tfc:sand/yellow', 5000)
		.outputFluids(Fluid.of('gtceu:oil', 2000))
		.duration(200)
		.EUt(30)

	event.recipes.gtceu.centrifuge('oilsands_dust_separation')
		.itemInputs('gtceu:oilsands_dust')
		.chancedOutput('tfc:sand/yellow', 5000)
		.outputFluids(Fluid.of('gtceu:oil', 2000))
		.duration(200)
		.EUt(30)

	event.recipes.gtceu.centrifuge('dirt_separation')
		.itemInputs('#tfc:dirt')
		.chancedOutput('gtceu:plant_ball', 1250)
		.chancedOutput('tfc:sand/yellow', 5000)
		.chancedOutput('gtceu:tiny_clay_dust', 4000)
		.duration(250)
		.EUt(30)

	global.SAND_COLORS.forEach(sandColor => {
		// Raw sandstone -> sand
		event.recipes.gtceu.forge_hammer(`raw_${sandColor}_sandstone_to_sand`)
			.itemInputs(`tfc:raw_sandstone/${sandColor}`)
			.itemOutputs(`4x tfc:sand/${sandColor}`)
			.duration(20*3.5)
			.EUt(2)

		// [PORT] greate отсутствует в сборке 1.21.1
		// event.recipes.greate.pressing(`4x tfc:sand/${sandColor}`, `tfc:raw_sandstone/${sandColor}`)
		// 	.recipeTier(1)
		// 	.id(`greate:pressing/raw_${sandColor}_sandstone_to_sand`)

		// Smooth sandstone -> sand
		event.recipes.gtceu.forge_hammer(`smooth_${sandColor}_sandstone_to_sand`)
			.itemInputs(`tfc:smooth_sandstone/${sandColor}`)
			.itemOutputs(`4x tfc:sand/${sandColor}`)
			.duration(20*3.5)
			.EUt(2)

		// Cut sandstone -> sand
		event.recipes.gtceu.forge_hammer(`cut_${sandColor}_sandstone_to_sand`)
			.itemInputs(`tfc:cut_sandstone/${sandColor}`)
			.itemOutputs(`4x tfc:sand/${sandColor}`)
			.duration(20*3.5)
			.EUt(2)

		// Sand -> sandstone
		event.recipes.gtceu.compressor(`sand_${sandColor}_to_sandstone`)
			.itemInputs(`4x tfc:sand/${sandColor}`)
			.itemOutputs(`tfc:raw_sandstone/${sandColor}`)
			.duration(400)
			.EUt(2)

		// Gravel -> Sand
		event.recipes.gtceu.forge_hammer(`${sandColor}_gravel_to_sand`)
			.itemInputs(`#tfc:${sandColor}_gravel`) // [PORT] тег наполняется нашим tags.stones (gravelTag)
			.itemOutputs(`tfc:sand/${sandColor}`)
			.duration(20*3.5)
			.EUt(2)

		// Smooth -> Raw
		event.stonecutting(`tfc:smooth_sandstone/${sandColor}`, `tfc:raw_sandstone/${sandColor}`)
			.id(`tfg:stonecutting/raw_sandstone_${sandColor}_to_smooth_sandstone`)

		// Cut -> Raw
		event.stonecutting(`tfc:cut_sandstone/${sandColor}`, `tfc:raw_sandstone/${sandColor}`)
			.id(`raw_sandstone_${sandColor}_to_cut_sandstone`)

		// Raw -> Stairs
		event.remove({ id: `tfc:crafting/raw_sandstone/${sandColor}_stairs` }) // [PORT-FIX] новый id TFC 1.21

		event.stonecutting(`tfc:raw_sandstone/${sandColor}_stairs`, `tfc:raw_sandstone/${sandColor}`)
			.id(`tfg:stonecutting/${sandColor}_sandstone_to_stairs`)

		// Raw -> Slab
		event.remove({ id: `tfc:crafting/raw_sandstone/${sandColor}_slab` })

		event.stonecutting(`2x tfc:raw_sandstone/${sandColor}_slab`, `tfc:raw_sandstone/${sandColor}`)
			.id(`tfg:stonecutting/${sandColor}_sandstone_to_slabs`)

		// Raw -> Wall
		event.remove({ id: `tfc:crafting/raw_sandstone/${sandColor}_wall` })

		event.stonecutting(`tfc:raw_sandstone/${sandColor}_wall`, `tfc:raw_sandstone/${sandColor}`)
			.id(`tfg:stonecutting/${sandColor}_sandstone_to_wall`)

		// Smooth -> Stairs
		event.remove({ id: `tfc:crafting/smooth_sandstone/${sandColor}_stairs` })

		event.stonecutting(`tfc:smooth_sandstone/${sandColor}_stairs`, `tfc:smooth_sandstone/${sandColor}`)
			.id(`tfg:stonecutting/${sandColor}_smooth_sandstone_to_stairs`)

		// Smooth -> Slab
		event.remove({ id: `tfc:crafting/smooth_sandstone/${sandColor}_slab` })

		event.stonecutting(`2x tfc:smooth_sandstone/${sandColor}_slab`, `tfc:smooth_sandstone/${sandColor}`)
			.id(`tfg:stonecutting/${sandColor}_smooth_sandstone_to_slab`)

		// Smooth -> Wall
		event.remove({ id: `tfc:crafting/smooth_sandstone/${sandColor}_wall` })

		event.stonecutting(`tfc:smooth_sandstone/${sandColor}_wall`, `tfc:smooth_sandstone/${sandColor}`)
			.id(`tfg:stonecutting/${sandColor}_smooth_sandstone_to_wall`)

		// Cut -> Stairs
		event.remove({ id: `tfc:crafting/cut_sandstone/${sandColor}_stairs` })

		event.stonecutting(`tfc:cut_sandstone/${sandColor}_stairs`, `tfc:cut_sandstone/${sandColor}`)
			.id(`tfg:stonecutting/${sandColor}_cut_sandstone_to_stairs`)

		// Cut -> Slab
		event.remove({ id: `tfc:crafting/cut_sandstone/${sandColor}_slab` })

		event.stonecutting(`2x tfc:cut_sandstone/${sandColor}_slab`, `tfc:cut_sandstone/${sandColor}`)
			.id(`tfg:stonecutting/${sandColor}_cut_sandstone_to_slab`)

		// Cut -> Wall
		event.remove({ id: `tfc:crafting/cut_sandstone/${sandColor}_wall` })

		event.stonecutting(`tfc:cut_sandstone/${sandColor}_wall`, `tfc:cut_sandstone/${sandColor}`)
			.id(`tfg:stonecutting/${sandColor}_cut_sandstone_to_wall`)
	})

	global.FLUORAPATITE_COLORS.forEach(color => {
		// [PORT-Ф4-TODO] флюорапатитовые пески/песчаники не зарегистрированы — гвард
		if (sandItemExists(`tfg:sand/fluorapatite/${color}`) && sandItemExists(`tfg:sandstone/raw/fluorapatite/${color}`)) {
			event.recipes.gtceu.compressor(`tfg:fluorapatite_sand_${color}_to_sandstone`)
				.itemInputs(`4x tfg:sand/fluorapatite/${color}`)
				.itemOutputs(`tfg:sandstone/raw/fluorapatite/${color}`)
				.duration(400)
				.EUt(2)
		}
	})

	// Quartz sand
	event.shaped('gtceu:quartz_sand_dust', [
		'A',
		'B'
	], {
		A: '#c:sands', // [PORT] forge:sand -> c:sands
		B: '#c:tools/mortar' // [PORT] forge:tools/mortars -> c:tools/mortar
	}).id('gtceu:shaped/quartz_sand')

	event.recipes.gtceu.macerator('quartz_sand_from_sand')
		.itemInputs('#c:sands')
		.itemOutputs('gtceu:quartz_sand_dust')
		.duration(30)
		.EUt(2)

	event.recipes.gtceu.electrolyzer('sand_electrolysis')
		.itemInputs('8x #c:sands')
		.itemOutputs('gtceu:silicon_dioxide_dust')
		.duration(500)
		.EUt(25)

	event.recipes.gtceu.centrifuge('gtceu:quartz_sand_separation')
		.EUt(GTValues.VA[GTValues.LV])
		.duration(60)
		.itemInputs('2x gtceu:quartz_sand_dust')
		.itemOutputs('gtceu:quartzite_dust')
		.chancedOutput(ChemicalHelper.get(TagPrefix.dust, GTMaterials.NetherQuartz, 1), 2000) // [PORT-FIX] chanced-выход тегом невозможен

	event.recipes.gtceu.autoclave('tfg:quartz_sand_autoclave')
		.itemInputs('gtceu:quartz_sand_dust')
		.inputFluids(Fluid.of('gtceu:distilled_water', 250))
		.chancedOutput('gtceu:quartzite_gem', 4500)
		.duration(60 * 20)
		.EUt(GTValues.VA[GTValues.LV])
})
