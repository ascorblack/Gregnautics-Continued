"use strict";

// [PORT] из tacz/recipes.ammo.js (TFG 1.20.1); функция registerTACZAmmoRecipes заменена на прямую регистрацию ServerEvents.recipes
// [PORT] Все рецепты боеприпасов ниже закомментированы по совокупности причин:
// [PORT-CHECK] NBT->components needs in-game verification — выходы Item.of('tacz:ammo', '{AmmoId:...}') и Item.of('tacz:ammo_box', '{Level:N}') используют NBT;
//              в 1.21 нужны data components (предположительно [tacz:ammo_id=...]), точные имена компонентов TaCZ 1.21 не подтверждены
// [PORT-Ф4] tfg: предметы ещё не существуют (гильзы small/shell/large_bullet_casing, tfg:nitrocellulose, экструдерные формы, #tfg:rubber_rings, tfg:fluix)
// [PORT-Ф2] материалы desh/ostrum (Ad Astra-интеграция TFG) отсутствуют без кастомных GT-материалов
// [PORT] applied_ammo_box отсутствует в сборке 1.21.1 (wl_ammo_box, remove shaped_nbt)
// Теги forge: уже переименованы в c: для будущего раскомментирования.

ServerEvents.recipes(event => {
	console.info('[Gregnautics] progress: tfg_port tacz ammo recipes start')

	
//	//Ammo Boxes
//	event.recipes.gtceu.assembler('tfg_tacz:steel_ab')
//		.itemInputs('4x #c:double_plates/steel', '16x #c:screws/steel', '4x #tfg:rubber_rings')
//		.itemOutputs(Item.of('tacz:ammo_box', '{Level:0}'))
//		.EUt(GTValues.VA[GTValues.LV])
//		.duration(60)
		
//	event.recipes.gtceu.assembler('tfg_tacz:magnalium_ab')
//		.itemInputs('4x #c:double_plates/magnalium', '16x #c:screws/aluminium', '4x #c:rings/silicone_rubber')
//		.itemOutputs(Item.of('tacz:ammo_box', '{Level:1}'))
//		.EUt(GTValues.VA[GTValues.MV])
//		.duration(60)
		
//	event.recipes.gtceu.assembler('tfg_tacz:desh_ab')
//		.itemInputs('4x #c:double_plates/desh', '16x #c:screws/stainless_steel', '4x #c:rings/styrene_butadiene_rubber')
//		.itemOutputs(Item.of('tacz:ammo_box', '{Level:2}'))
//		.EUt(GTValues.VA[GTValues.HV])
//		.duration(60)
		
//	//event.remove({ mod: 'applied_ammo_box' })
//	event.remove({ type: 'applied_ammo_box:shaped_nbt' })
	
//	event.recipes.gtceu.assembler('tfg_tacz:wl_ammo_box')
//		.itemInputs('2x #gtceu:batteries/ev', 'ae2:wireless_terminal', '4x #c:double_plates/ostrum',
//				'2x gtceu:ev_sensor', 'gtceu:ev_emitter', '2x #c:rods/ultimet')
//		.itemOutputs('applied_ammo_box:ammo_box')
//		.EUt(GTValues.VA[GTValues.EV])
//		.duration(100)

//	//Extruder Casing
//	event.recipes.gtceu.extruder('tfg_tacz:small_casing')
//		.itemInputs('#c:ingots/brass')
//		.notConsumable('tfg:small_casing_extruder_mold')
//		.itemOutputs('6x tfg:small_bullet_casing')
//		.duration(10)
//		.EUt(GTValues.VA[GTValues.MV])
//	event.recipes.gtceu.extruder('tfg_tacz:shell_casing')
//		.itemInputs('#c:ingots/brass')
//		.notConsumable('tfg:shell_casing_extruder_mold')
//		.itemOutputs('3x tfg:shell_bullet_casing')
//		.duration(10)
//		.EUt(GTValues.VA[GTValues.MV])
//	event.recipes.gtceu.extruder('tfg_tacz:large_casing')
//		.itemInputs('#c:ingots/brass')
//		.notConsumable('tfg:large_casing_extruder_mold')
//		.itemOutputs('5x tfg:large_bullet_casing')
//		.duration(10)
//		.EUt(GTValues.VA[GTValues.MV])
		
//	//Additives
//	event.recipes.gtceu.chemical_reactor('tfg_tacz:nitrocellulose_from_wood')
//		.itemInputs('gtceu:thermochemically_treated_hardwood_dust')
//		.inputFluids(Fluid.of('gtceu:nitration_mixture', 800), Fluid.of('minecraft:water', 600))
//		.itemOutputs('2x tfg:nitrocellulose')
//		.EUt(GTValues.VA[GTValues.EV])
//		.duration(20)
//	event.recipes.gtceu.chemical_reactor('tfg_tacz:nitrocellulose_from_wood_dih20')
//		.itemInputs('gtceu:thermochemically_treated_hardwood_dust')
//		.inputFluids(Fluid.of('gtceu:nitration_mixture', 800), Fluid.of('gtceu:distilled_water', 600))
//		.itemOutputs('4x tfg:nitrocellulose')
//		.outputFluids(Fluid.of('gtceu:sulfuric_acid', 200))
//		.EUt(GTValues.VA[GTValues.EV])
//		.duration(40)
	
//	//Actual Ammo
//	event.shapeless(Item.of('tacz:ammo',4, '{AmmoId:"ulv_guns:lead_shot"}'),
//		['4x #c:nuggets/lead', '#c:plates/paper', '#c:dusts/gunpowder']
//	).id('tfg_tacz:lead_shot');
	
//	global.TFGDamageShaped(event,Item.of('tacz:ammo', 4,'{AmmoId:"tacz:45_70"}'), [
//		'ABA',
//		'ACA',
//		'DEF'
//	], {
//		A: '#c:nuggets/lead',
//		B: '#c:tools/mallet',
//		C: '#c:dusts/gunpowder',
//		D: '#c:tools/file',
//		E: '#c:ingots/brass',
//		F: '#c:tools/saw'
		
//	}).id('tfg_tacz:45_70_bullets');

//	event.recipes.gtceu.assembler('tfg_tacz:45_70_bullets_lv')
//		.itemInputs('4x #c:nuggets/lead','#c:ingots/brass', '#c:dusts/gunpowder')
//		.itemOutputs(Item.of('tacz:ammo', 4,
//					'{AmmoId:"tacz:45_70"}'))
//		.EUt(GTValues.VA[GTValues.LV])
//		.circuit(4)
//		.duration(20)
	
//	//Clockwork era
//	event.recipes.gtceu.assembler('tfg_tacz:rb_small_lv')
//		.itemInputs('4x #c:nuggets/lead','2x #c:foils/copper', '#c:ingots/brass', 
//					'#c:dusts/gunpowder')
//		.itemOutputs(Item.of('tacz:ammo', 4, 
//					'{AmmoId:"create_armorer:rbapb"}'))
//		.EUt(GTValues.VA[GTValues.LV])
//		.circuit(1)
//		.duration(20)
//	event.recipes.gtceu.assembler('tfg_tacz:rb_small')
//		.itemInputs('4x #c:nuggets/lead','2x #c:foils/copper', '4x tfg:small_bullet_casing', 
//					'#c:dusts/gunpowder')
//		.itemOutputs(Item.of('tacz:ammo', 4, 
//					'{AmmoId:"create_armorer:rbapb"}'))
//		.EUt(GTValues.VA[GTValues.MV])
//		.duration(20)
//	event.recipes.gtceu.assembler('tfg_tacz:rb_small_nc')
//		.itemInputs('8x #c:nuggets/lead','4x #c:foils/copper', '8x tfg:small_bullet_casing', 
//					'tfg:nitrocellulose')
//		.itemOutputs(Item.of('tacz:ammo', 8, 
//					'{AmmoId:"create_armorer:rbapb"}'))
//		.EUt(GTValues.VA[GTValues.EV])
//		.duration(20)
		
//	event.recipes.gtceu.assembler('tfg_tacz:slap_large')
//		.itemInputs('4x #c:bolts/lead','4x #c:foils/copper', '4x tfg:large_bullet_casing', 
//					'#c:dusts/gunpowder')
//		.itemOutputs(Item.of('tacz:ammo', 4, 
//					'{AmmoId:"create_armorer:slap"}'))
//		.EUt(GTValues.VA[GTValues.MV])
//		.duration(20)
//	event.recipes.gtceu.assembler('tfg_tacz:slap_large_nc')
//		.itemInputs('8x #c:bolts/lead','8x #c:foils/copper', '8x tfg:large_bullet_casing', 
//					'tfg:nitrocellulose')
//		.itemOutputs(Item.of('tacz:ammo', 8, 
//					'{AmmoId:"create_armorer:slap"}'))
//		.EUt(GTValues.VA[GTValues.EV])
//		.duration(20)
		
//	event.recipes.gtceu.assembler('tfg_tacz:3006_large')
//		.itemInputs('4x #c:rods/annealed_copper','4x #c:foils/copper', '4x tfg:large_bullet_casing', 
//					'#c:dusts/gunpowder')
//		.itemOutputs(Item.of('tacz:ammo', 4, 
//					'{AmmoId:"tacz:30_06"}'))
//		.EUt(GTValues.VA[GTValues.MV])
//		.duration(20)
//	event.recipes.gtceu.assembler('tfg_tacz:3006_large_nc')
//		.itemInputs('8x #c:rods/annealed_copper','8x #c:foils/copper', '8x tfg:large_bullet_casing', 
//					'tfg:nitrocellulose')
//		.itemOutputs(Item.of('tacz:ammo', 8, 
//					'{AmmoId:"tacz:30_06"}'))
//		.EUt(GTValues.VA[GTValues.EV])
//		.duration(20)	
	
	
//	//Certus era
//	event.recipes.gtceu.assembler('tfg_tacz:fluix_grenade')
//		.itemInputs('#c:ingots/magnalium', '2x gtceu:gelled_toluene', '4x tfg:nitrocellulose')
//		.inputFluids(Fluid.of('tfg:fluix', 720))
//		.itemOutputs(Item.of('tacz:ammo', 
//					'{AmmoId:"applied_armorer:fluix_infused_grenade"}'))
//		.EUt(GTValues.VA[GTValues.EV])
//		.duration(40)
//	event.recipes.gtceu.assembler('tfg_tacz:40mm_he')
//		.itemInputs('#c:ingots/brass', '#c:ingots/steel', '8x gtceu:gelled_toluene', 
//					'6x tfg:nitrocellulose')
//		.itemOutputs(Item.of('tacz:ammo', 
//					'{AmmoId:"create_armorer:40mmhe"}'))
//		.EUt(GTValues.VA[GTValues.EV])
//		.duration(40)

//	event.recipes.gtceu.assembler('tfg_tacz:etched_quartz_small')
//		.itemInputs('2x #c:flawless_gems/certus_quartz', '4x tfg:small_bullet_casing', '2x tfg:nitrocellulose')
//		.itemOutputs(Item.of('tacz:ammo', 4, 
//					'{AmmoId:"applied_armorer:etched_quartz_bullet"}'))
//		.EUt(GTValues.VA[GTValues.EV])
//		.duration(20)
//	event.recipes.gtceu.assembler('tfg_tacz:hard_quartz_large')
//		.itemInputs('4x #c:exquisite_gems/certus_quartz', '4x #c:rods/titanium', '4x tfg:large_bullet_casing', 
//					'2x tfg:nitrocellulose')
//		.itemOutputs(Item.of('tacz:ammo', 4, 
//					'{AmmoId:"applied_armorer:hard_core_quartz_bullet"}'))
//		.EUt(GTValues.VA[GTValues.EV])
//		.duration(20)
//	event.recipes.gtceu.assembler('tfg_tacz:cluster_quartz_shell_ptfe')
//		.itemInputs('16x gtceu:chipped_certus_quartz_gem', '4x tfg:shell_bullet_casing', '2x tfg:nitrocellulose')
//		.inputFluids(Fluid.of('gtceu:polytetrafluoroethylene', 144))
//		.itemOutputs(Item.of('tacz:ammo', 4, 
//					'{AmmoId:"applied_armorer:cluster_quartz_bullet"}'))
//		.EUt(GTValues.VA[GTValues.EV])
//		.duration(20)
//	event.recipes.gtceu.assembler('tfg_tacz:cluster_quartz_shell_pbi')
//		.itemInputs('16x gtceu:chipped_certus_quartz_gem', '4x tfg:shell_bullet_casing', '2x tfg:nitrocellulose')
//		.inputFluids(Fluid.of('gtceu:polybenzimidazole', 72))
//		.itemOutputs(Item.of('tacz:ammo', 4, 
//					'{AmmoId:"applied_armorer:cluster_quartz_bullet"}'))
//		.EUt(GTValues.VA[GTValues.EV])
//		.duration(30)
		
//	//12gauge shell
//	event.recipes.gtceu.assembler('tfg_tacz:12g_shell_peth')
//		.itemInputs('12x #c:nuggets/lead', '4x tfg:shell_bullet_casing', '2x #c:dusts/gunpowder')
//		.inputFluids(Fluid.of('gtceu:polyethylene', 288))
//		.itemOutputs(Item.of('tacz:ammo', 4, 
//					'{AmmoId:"tacz:12g"}'))
//		.EUt(GTValues.VA[GTValues.MV])
//		.duration(20)
//	event.recipes.gtceu.assembler('tfg_tacz:12g_shell_pvc')
//		.itemInputs('12x #c:nuggets/lead', '4x tfg:shell_bullet_casing', '2x #c:dusts/gunpowder')
//		.inputFluids(Fluid.of('gtceu:polyvinyl_chloride', 144))
//		.itemOutputs(Item.of('tacz:ammo', 4, 
//					'{AmmoId:"tacz:12g"}'))
//		.EUt(GTValues.VA[GTValues.MV])
//		.duration(20)
//	event.recipes.gtceu.assembler('tfg_tacz:12g_shell_ptfe')
//		.itemInputs('12x #c:nuggets/lead', '4x tfg:shell_bullet_casing', '2x #c:dusts/gunpowder')
//		.inputFluids(Fluid.of('gtceu:polytetrafluoroethylene', 72))
//		.itemOutputs(Item.of('tacz:ammo', 4, 
//					'{AmmoId:"tacz:12g"}'))
//		.EUt(GTValues.VA[GTValues.HV])
//		.duration(20)
//	event.recipes.gtceu.assembler('tfg_tacz:12g_shell_pbi')
//		.itemInputs('12x #c:nuggets/lead', '4x tfg:shell_bullet_casing', '2x #c:dusts/gunpowder')
//		.inputFluids(Fluid.of('gtceu:polybenzimidazole', 36))
//		.itemOutputs(Item.of('tacz:ammo', 4, 
//					'{AmmoId:"tacz:12g"}'))
//		.EUt(GTValues.VA[GTValues.EV])
//		.duration(20)
		
//	event.recipes.gtceu.assembler('tfg_tacz:12g_shell_nc_ptfe')
//		.itemInputs('12x #c:nuggets/lead', '4x tfg:shell_bullet_casing', 'tfg:nitrocellulose')
//		.inputFluids(Fluid.of('gtceu:polytetrafluoroethylene', 72))
//		.itemOutputs(Item.of('tacz:ammo', 4, 
//					'{AmmoId:"tacz:12g"}'))
//		.EUt(GTValues.VA[GTValues.HV])
//		.duration(20)
//	event.recipes.gtceu.assembler('tfg_tacz:12g_shell_nc_pbi')
//		.itemInputs('12x #c:nuggets/lead', '4x tfg:shell_bullet_casing', 'tfg:nitrocellulose')
//		.inputFluids(Fluid.of('gtceu:polybenzimidazole', 36))
//		.itemOutputs(Item.of('tacz:ammo', 4, 
//					'{AmmoId:"tacz:12g"}'))
//		.EUt(GTValues.VA[GTValues.EV])
//		.duration(20)
	
})
