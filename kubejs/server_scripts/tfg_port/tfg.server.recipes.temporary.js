// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/recipes.temporary.js (registerTFGTemporaryRecipes).
// Диспетчер убран — регистрируем ServerEvents.recipes напрямую.
// [PORT] Теги инструментов: forge:tools/* -> c:tools/* в единственном числе (GTM8).

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.recipes.temporary start')

	event.shapeless('tfc:ore/bituminous_coal', 'minecraft:coal')
	event.shapeless('tfc:ore/bituminous_coal', 'gtceu:crushed_coal_ore')
	event.shapeless('tfc:ore/bituminous_coal', 'gtceu:purified_coal_ore')
	event.shapeless('tfc:ore/bituminous_coal', 'gtceu:refined_coal_ore')
	event.shapeless('tfc:ore/bituminous_coal', 'gtceu:impure_coal_dust')
	event.shapeless('tfc:ore/bituminous_coal', 'gtceu:pure_coal_dust')

	// Temporary recipes until gregtech fixes its pipe problem with .setIgnored()
	// [PORT-CHECK] Возможно, в GTCEu 8 проблема с трубами уже исправлена и рецепты дублируются —
	// проверить в игре; рецепты защищены hasProperty, лишние дубликаты безвредны (свои id).
	const broken_pipes = [
		GTMaterials.Copper,
		GTMaterials.Brass,
		GTMaterials.Gold,
		GTMaterials.Iron,
		GTMaterials.Cobalt,
		GTMaterials.RoseGold,
		GTMaterials.Aluminium,
		GTMaterials.Invar,
		GTMaterials.Lead,
		GTMaterials.Nickel,
		GTMaterials.Osmium,
		GTMaterials.Palladium,
		GTMaterials.Platinum,
		GTMaterials.Rhodium,
		GTMaterials.Silver,
		GTMaterials.Vanadium,
		GTMaterials.Zinc
		// TFGHelpers.getMaterial('ostrum') // [PORT-Ф2] TFG-материал ostrum не зарегистрирован (кастомные GT-материалы заблокированы); TFGHelpers отсутствует
	]
	broken_pipes.forEach(material => {
		if (material.hasProperty(PropertyKey.FLUID_PIPE)) {
			global.TFGDamageShaped(event,ChemicalHelper.get(TagPrefix.pipeTinyFluid, material, 2), [
				' S ',
				'HPW'
			], {
				P: ChemicalHelper.get(TagPrefix.plate, material, 1),
				H: '#c:tools/hammer',
				W: '#c:tools/wrench',
				S: '#c:tools/saw'
			}).id(`tfg:temp/tiny_fluid_pipe_${material.getName()}`)

			global.TFGDamageShaped(event,ChemicalHelper.get(TagPrefix.pipeSmallFluid, material, 1), [
				'WPH'
			], {
				P: ChemicalHelper.get(TagPrefix.plate, material, 1),
				H: '#c:tools/hammer',
				W: '#c:tools/wrench'
			}).id(`tfg:temp/small_fluid_pipe_${material.getName()}`)

			global.TFGDamageShaped(event,ChemicalHelper.get(TagPrefix.pipeNormalFluid, material, 1), [
				'PPP',
				'W H'
			], {
				P: ChemicalHelper.get(TagPrefix.plate, material, 1),
				H: '#c:tools/hammer',
				W: '#c:tools/wrench'
			}).id(`tfg:temp/normal_fluid_pipe_${material.getName()}`)

			global.TFGDamageShaped(event,ChemicalHelper.get(TagPrefix.pipeLargeFluid, material, 1), [
				'PPP',
				'W H',
				'PPP'
			], {
				P: ChemicalHelper.get(TagPrefix.plate, material, 1),
				H: '#c:tools/hammer',
				W: '#c:tools/wrench'
			}).id(`tfg:temp/large_fluid_pipe_${material.getName()}`)
		}
		else if (material.hasProperty(PropertyKey.ITEM_PIPE)) {
			global.TFGDamageShaped(event,ChemicalHelper.get(TagPrefix.pipeSmallItem, material, 1), [
				'WPH'
			], {
				P: ChemicalHelper.get(TagPrefix.plate, material, 1),
				H: '#c:tools/hammer',
				W: '#c:tools/wrench'
			}).id(`tfg:temp/small_item_pipe_${material.getName()}`)

			global.TFGDamageShaped(event,ChemicalHelper.get(TagPrefix.pipeNormalItem, material, 1), [
				'PPP',
				'W H'
			], {
				P: ChemicalHelper.get(TagPrefix.plate, material, 1),
				H: '#c:tools/hammer',
				W: '#c:tools/wrench'
			}).id(`tfg:temp/normal_item_pipe_${material.getName()}`)

			global.TFGDamageShaped(event,ChemicalHelper.get(TagPrefix.pipeLargeItem, material, 1), [
				'PPP',
				'W H',
				'PPP'
			], {
				P: ChemicalHelper.get(TagPrefix.plate, material, 1),
				H: '#c:tools/hammer',
				W: '#c:tools/wrench'
			}).id(`tfg:temp/large_item_pipe_${material.getName()}`)
		}
	})
})
