// priority: 0
"use strict";

// [PORT] Из TFG server_scripts/tfg/primitive/fishing_nets/recipes.fishing_nets.js (Ф4).
// Главные изменения 1.20→1.21:
//  - damage_inputs_shaped_crafting удалён в kubejs_tfc 2.0 — обычный shaped
//  - forge:cloth→c:cloth, forge:tools/*→c:tools/* (ед. число)
//  - [PORT-Ф2] в GTM8 у части материалов нет колец (ring): Brass/SterlingSilver/Magnalium и др.
//    (проверено по exported/registries/items.json) — металлические сетки переписаны циклом
//    с проверкой наличия GT-частей; отсутствующие рецепты пропускаются с console.warn.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tfg.server.primitive.fishing_nets.recipes.fishing_nets start')

	//wood
	// [PORT-FIX] damage_inputs_shaped_crafting удалён — обычный shaped
	global.TFGDamageShaped(event,'1x tfg:fishing_net/wood', [
		' DC',
		'GBE',
		'AF '
	],{
		A: ChemicalHelper.get(TagPrefix.rodLong, GTMaterials.Wood, 1),
		B: ChemicalHelper.get(TagPrefix.rod, GTMaterials.Wood, 1),
		C: 'tfc:jute_net',
		D: 'tfc:glue',
		E: ChemicalHelper.get(TagPrefix.bolt, GTMaterials.Wood, 1),
		F: '#c:tools/knife', // [PORT] forge:tools/knives -> c:tools/knife
		G: '#tfc:sewing_needles'
	}).id('tfg:shaped/fishing_net/wood')

	event.recipes.gtceu.assembler('tfg:assembler/fishing_net/wood')
		.itemInputs(
			ChemicalHelper.get(TagPrefix.rodLong, GTMaterials.Wood, 1),
			ChemicalHelper.get(TagPrefix.rod, GTMaterials.Wood, 1),
			'1x tfc:glue',
			ChemicalHelper.get(TagPrefix.bolt, GTMaterials.Wood, 1),
			'1x tfc:jute_net'
		)
		.itemOutputs('tfg:fishing_net/wood')
		.duration(100)
		.circuit(4)
		.EUt(GTValues.VA[GTValues.ULV])

	// [PORT-FIX] металлические сетки: цикл с проверкой наличия GT-частей (ring и др. в GTM8 есть не у всех материалов)
	const metalNets = [
		{ name: 'brass', material: GTMaterials.Brass, cloth: '#c:cloth', eut: GTValues.VA[GTValues.ULV] },
		{ name: 'rose_gold', material: GTMaterials.RoseGold, cloth: '#c:cloth', eut: GTValues.VA[GTValues.ULV] },
		{ name: 'sterling_silver', material: GTMaterials.SterlingSilver, cloth: '#c:cloth', eut: GTValues.VA[GTValues.ULV] },
		{ name: 'invar', material: GTMaterials.Invar, cloth: '#c:cloth', eut: GTValues.VA[GTValues.LV] },
		{ name: 'cupronickel', material: GTMaterials.Cupronickel, cloth: '#c:cloth', eut: GTValues.VA[GTValues.LV] },
		{ name: 'tin_alloy', material: GTMaterials.TinAlloy, cloth: '#c:cloth', eut: GTValues.VA[GTValues.LV] },
		{ name: 'magnalium', material: GTMaterials.Magnalium, cloth: 'tfg:polycaprolactam_fabric', eut: GTValues.VA[GTValues.LV] }
	]

	metalNets.forEach(net => {
		let rodLong = ChemicalHelper.get(TagPrefix.rodLong, net.material, 1)
		let rod = ChemicalHelper.get(TagPrefix.rod, net.material, 1)
		let ring = ChemicalHelper.get(TagPrefix.ring, net.material, 1)
		let screw = ChemicalHelper.get(TagPrefix.screw, net.material, 1)

		if (rodLong.isEmpty() || rod.isEmpty() || ring.isEmpty() || screw.isEmpty()) {
			// [PORT-Ф2] у материала нет нужных GT-частей в GTM8 — рецепт пропущен
			console.warn(`[Gregnautics][PORT-Ф2] fishing_net/${net.name}: нет GT-частей (ring/screw/rod) — рецепт пропущен`)
			return;
		}

		event.shaped(`1x tfg:fishing_net/${net.name}`, [
			' DC',
			'GBE',
			'AF '
		],{
			A: rodLong,
			B: rod,
			C: net.cloth,
			D: ring,
			E: screw,
			F: '#c:tools/wire_cutter', // [PORT] forge:tools/wire_cutters -> c:tools/wire_cutter
			G: '#tfc:sewing_needles'
		}).id(`tfg:shaped/fishing_net/${net.name}`)

		event.recipes.gtceu.assembler(`tfg:assembler/fishing_net/${net.name}`)
			.itemInputs(
				rodLong,
				rod,
				ring,
				screw,
				(typeof net.cloth === 'string' && net.cloth.startsWith('#')) ? `1x ${net.cloth}` : net.cloth
			)
			.itemOutputs(`tfg:fishing_net/${net.name}`)
			.duration(100)
			.circuit(4)
			.EUt(net.eut)
	})
})
