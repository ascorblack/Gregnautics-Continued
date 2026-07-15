// priority: 0
"use strict";

// [PORT] Из TFG startup_scripts/tfg/biotech/items.biotech.js (registerTFGBiotechItems).
// Диспетчер Ф2 отключён — регистрация напрямую через StartupEvents.registry.
// global.LAB_EQUIPMENT_CONTAINERS определён в tfg.constants.js (Ф1).

StartupEvents.registry('item', event => {
	console.info('[Gregnautics] progress: tfg_port misc registry start')

	event.create('tfg:stainless_steel_needle')
		.unstackable()
		.maxDamage(9999)

	//#region Lab Equipment

	global.LAB_EQUIPMENT_CONTAINERS.forEach((item) => {
		event.create(`tfg:${item.type}`, 'tfc:glass_bottle')
			.allowedFluids('tfg:not_solid') // [PORT] kubejs_tfc 2.0.1: fluidTagAccept() переименован в allowedFluids() (TagKey<Fluid>, строка оборачивается автоматически)
			.capacity(item.capacity)
			.breakChance(0.01) // [PORT] дефолт breakChance в kubejs_tfc 2.0.1 = 0.5 (в 1.20.1 был 0.01) — фиксируем старое поведение
			.textures(`tfg:item/${item.type}`, `tfg:item/${item.type}_overlay`) // [PORT] дефолтная overlay-текстура в 2.0.1 — <base>_fluid, а оригинальные ассеты — <base>_overlay.png
			.translationKey(`item.tfg.lab_equipment.${item.type}`)
			.tag('tfg:lab_equipment_containers')
			.tag('tfc:fluid_item_ingredient_empty_containers')
			.tag('tfc:glass_bottles')
	})

	event.create('tfg:lab_equipment')
		.translationKey('item.tfg.lab_equipment.lab_equipment')
		.tooltip(Text.translatable('tfg.tooltip.lab_equipment.set'))

	event.create('tfg:dirty_lab_equipment')
		.translationKey('item.tfg.lab_equipment.dirty_lab_equipment')
		.tooltip(Text.translatable('tfg.tooltip.lab_equipment.set_dirty'))
	//#endregion


	//#region Bioline

	event.create('tfg:cellulose_matrix')
	event.create('tfg:smooth_endoplasmic_reticula')
	event.create('tfg:rough_endoplasmic_reticula')
	event.create('tfg:alpha_keratin')

	//#endregion
	//#region Medicine

	event.create('tfg:empty_capsule');

	//#endregion
})
