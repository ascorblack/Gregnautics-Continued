"use strict";

// [PORT] из tacz/recipes.misc.js (TFG 1.20.1); функция registerTACZMiscRecipes заменена на прямую регистрацию ServerEvents.recipes
// [PORT] теги forge: переименованы в c:

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tacz misc recipes start')

	//Targets etc
	event.shaped('tacz:target',[
		'ABA',
		'BCB',
		' B '
	],{
		A: '#c:dyes/red', // [PORT] forge:dyes/red -> c:dyes/red
		B: '#c:foils/steel', // [PORT] forge: -> c:
		C: '#c:rods/long/wood' // [PORT] forge: -> c:
	}).id('tfg_tacz:target');

	event.shaped('tacz:statue',[
		'BAB',
		'BAB',
		' A '
	],{
		A: 'tfc:rock/chiseled/marble',
		B: 'tfc:rock/smooth/marble_stairs'
	}).id('tfg_tacz:statue');

	event.shapeless('tacz:target_minecart',
		['tacz:target', 'minecraft:minecart']
	).id('tfg_tacz:target_minecart');

	//Mechanisms
	// [PORT-Ф4] tfg:flintlock_mechanism ещё не существует (фаза 4) — оба рецепта закомментированы
	// (теги forge: уже переименованы в c: для будущего раскомментирования)
	//event.shaped('tfg:flintlock_mechanism', [
	//	'ABC',
	//	'DEF',
	//	'GHI'
	//], {
	//	A: '#c:tools/screwdriver',
	//	B: '#c:gems/flint',
	//	C: '#c:tools/file',
	//	D: '#c:springs',
	//	E: '#c:bolts/wrought_iron',
	//	F: '#c:double_plates/wrought_iron',
	//	G: '#c:tools/wire_cutter',
	//	H: '#c:gears/wrought_iron',
	//	I: '#c:tools/hammer' // [PORT] forge:tools/hammers -> c:tools/hammer
	//}).id('tfg:shaped/flintlock_mechanism_iron');

	//event.shaped('tfg:flintlock_mechanism', [
	//	'ABC',
	//	'DEF',
	//	'GHI'
	//], {
	//	A: '#c:tools/screwdriver',
	//	B: '#c:gems/flint',
	//	C: '#c:tools/file',
	//	D: '#c:springs',
	//	E: '#c:bolts/steel',
	//	F: '#c:plates/steel',
	//	G: '#c:tools/wire_cutter',
	//	H: '#c:small_gears/steel',
	//	I: '#c:tools/hammer' // [PORT] forge:tools/hammers -> c:tools/hammer
	//}).id('tfg:shaped/flintlock_mechanism_steel');

	// [PORT-Ф4] tfg:advanced_clockwork_mechanism ещё не существует (фаза 4)
	// [PORT] greate отсутствует в сборке 1.21.1 (greate:aluminium_cogwheel, greate:silicone_rubber_belt_connector)
	//event.recipes.gtceu.assembler('tfg:advanced_clockwork_mechanism')
	//	.itemInputs('2x greate:aluminium_cogwheel', 'greate:silicone_rubber_belt_connector', '2x #c:springs/aluminium',
	//				'8x #c:screws/aluminium', '#c:gears/cobalt_brass', '3x #c:rings/silicone_rubber')
	//	.itemOutputs('tfg:advanced_clockwork_mechanism')
	//	.EUt(GTValues.VA[GTValues.MV])
	//	.duration(80)

	// [PORT-Ф4] tfg:certus_mechanism ещё не существует (фаза 4)
	//event.recipes.gtceu.assembler('tfg:certus_mechanism')
	//	.itemInputs('2x ae2:charged_certus_quartz_crystal', '2x #c:gears/titanium', '4x #c:springs/hsla_steel',
	//				'16x #c:screws/titanium', '2x #c:rods/titanium', '6x #c:rings/styrene_butadiene_rubber',
	//				'16x #c:fine_wires/red_alloy')
	//	.inputFluids(Fluid.of('gtceu:soldering_alloy', 288))
	//	.itemOutputs('tfg:certus_mechanism')
	//	.EUt(GTValues.VA[GTValues.EV])
	//	.duration(80)

	// [PORT-Ф4] TFGHelpers — биндинг мода TFG 1.20.1, в сборке 1.21.1 отсутствует (фаза 4)
	//TFGHelpers.registerMaterialInfo('tacz:target_minecart', [GTMaterials.WroughtIron, 5, GTMaterials.Steel, 1, GTMaterials.Wood, 1]);
})
