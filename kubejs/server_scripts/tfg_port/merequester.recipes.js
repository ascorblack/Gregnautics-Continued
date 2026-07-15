// priority: 0
"use strict";

// [PORT] источник: me_requester/recipes.js (registerMERequesterRecipes) — регистрируем событие напрямую вместо диспетчера
ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port merequester recipes start')

	// [PORT-Ф2-TEMP] GT-замена рецепта использует tfg:fluix (Ф2 заблокирована) —
	// ванильный рецепт оставлен, иначе ME Requester некрафтовый. Вернуть вместе с Ф2.
	// event.remove({ id: 'merequester:requester' })

	// ME Requester
	// [PORT-Ф2] рецепт использует жидкость tfg:fluix (кастомный TFG-материал, фаза 2) — закомментирован
	/*
	event.recipes.gtceu.assembler('tfg:merequester/merequester')
		.itemInputs(
			'extendedae:ex_pattern_provider', // [PORT] expatternprovider -> extendedae
			'#extendedae:extended_interface', // [PORT] expatternprovider -> extendedae
			'megacells:mega_crafting_unit',
			'4x #gtceu:circuits/luv',
			'4x #c:double_plates/titanium_tungsten_carbide', // [PORT] forge -> c
			'4x gtceu:exquisite_amethyst_gem')
		.inputFluids(Fluid.of('tfg:fluix', 144 * 20))
		.itemOutputs('merequester:requester')
		.duration(760)
		.EUt(GTValues.VA[GTValues.IV])
		.cleanroom(CleanroomType.CLEANROOM)
	*/

	// [PORT] ad_astra отсутствует в сборке 1.21.1 (dimension ad_astra:moon)
	// [PORT-Ф2] рецепт использует жидкость tfg:cryogenized_fluix (кастомный TFG-материал, фаза 2) — закомментирован
	/*
	event.recipes.gtceu.assembler('tfg:merequester/merequester_moon')
		.itemInputs(
			'extendedae:ex_pattern_provider', // [PORT] expatternprovider -> extendedae
			'#extendedae:extended_interface', // [PORT] expatternprovider -> extendedae
			'megacells:mega_crafting_unit',
			'4x #gtceu:circuits/iv',
			'4x #c:double_plates/titanium_tungsten_carbide', // [PORT] forge -> c
			'4x gtceu:exquisite_amethyst_gem')
		.inputFluids(Fluid.of('tfg:cryogenized_fluix', 144 * 20))
		.itemOutputs('merequester:requester')
		.duration(760)
		.EUt(GTValues.VA[GTValues.EV])
		.dimension('ad_astra:moon')
		.addMaterialInfo(true)
	*/

	// ME Requester Terminal
	event.shaped('merequester:requester_terminal', [
		'ABC',
		'DED',
		'FGF'
	], {
		A: '#c:tools/screwdriver', // [PORT] forge -> c
		B: 'ae2:terminal',
		C: '#c:tools/mallet', // [PORT] forge -> c
		D: '#c:rods/steel', // [PORT] forge -> c
		E: 'merequester:requester',
		F: '#c:plates/steel', // [PORT] forge -> c
		G: 'ae2:engineering_processor'
	}).id('merequester:requester_terminal')

	event.recipes.gtceu.assembler('assembler:ae2_requester_terminal_terminal')
		.itemInputs(
			'ae2:terminal',
			'2x #c:rods/steel', // [PORT] forge -> c
			'ae2:engineering_processor',
			'2x #c:plates/steel', // [PORT] forge -> c
			'merequester:requester')
		.itemOutputs('merequester:requester_terminal')
		.duration(100)
		.EUt(GTValues.VA[GTValues.LV])
		.addMaterialInfo(true)
})
