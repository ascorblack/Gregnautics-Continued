// priority: 0
"use strict";

function registerTFGTagPrefixes(event) {

	// registerTFGRocksTagPrefixes(event) // [PORT] не портировано в Ф2 — определяется в tfg/stone_types/tag_prefixes.rocks.js (фаза stone_types); раскомментировать после порта

	excludeAllGemsButNormal(GTMaterials.get('tfg:apt'));
	TagPrefix.block.setIgnored(GTMaterials.get('tfg:apt'));
	excludeAllGemsButNormal(GTMaterials.get('tfg:tetrafluoroethane'));
	TagPrefix.block.setIgnored(GTMaterials.get('tfg:tetrafluoroethane'));
	excludeAllGemsButNormal(GTMaterials.get('tfg:crimsene'));
	TagPrefix.block.setIgnored(GTMaterials.get('tfg:crimsene'));
	excludeAllGemsButNormal(GTMaterials.get('tfg:warpane'));
	TagPrefix.block.setIgnored(GTMaterials.get('tfg:warpane'));

	excludeAllGemsButNormal(GTMaterials.Coke)

	TagPrefix.rawOre.setIgnored(GTMaterials.Coal);
	// [PORT] TFGTagPrefix — биндинг Java-мода TFG (отсутствует в 1.21.1-сборке).
	// [PORT] Префиксы richRawOre/poorRawOre пока не зарегистрированы; раскомментировать,
	// [PORT] когда они будут созданы через GTCEuStartupEvents.registry('gtceu:tag_prefix').
	// [PORT] TFGTagPrefix.richRawOre.setIgnored(GTMaterials.Coal);
	// [PORT] TFGTagPrefix.poorRawOre.setIgnored(GTMaterials.Coal);
	TagPrefix.plate.setIgnored(GTMaterials.Coal);

	TagPrefix.dust.setIgnored(GTMaterials.get('gtceu:lignite'));
	TagPrefix.dustSmall.setIgnored(GTMaterials.get('gtceu:lignite'));
	TagPrefix.dustTiny.setIgnored(GTMaterials.get('gtceu:lignite'));
	TagPrefix.rawOre.setIgnored(GTMaterials.get('gtceu:lignite'));
	// [PORT] TFGTagPrefix.richRawOre.setIgnored(GTMaterials.get('gtceu:lignite'));
	// [PORT] TFGTagPrefix.poorRawOre.setIgnored(GTMaterials.get('gtceu:lignite'));
	TagPrefix.crushed.setIgnored(GTMaterials.get('gtceu:lignite'));
	TagPrefix.crushedPurified.setIgnored(GTMaterials.get('gtceu:lignite'));
	TagPrefix.crushedRefined.setIgnored(GTMaterials.get('gtceu:lignite'));
	TagPrefix.dustImpure.setIgnored(GTMaterials.get('gtceu:lignite'));
	TagPrefix.dustPure.setIgnored(GTMaterials.get('gtceu:lignite'));

	TagPrefix.dust.setIgnored(GTMaterials.get('gtceu:anthracite'));
	TagPrefix.dustSmall.setIgnored(GTMaterials.get('gtceu:anthracite'));
	TagPrefix.dustTiny.setIgnored(GTMaterials.get('gtceu:anthracite'));
	TagPrefix.rawOre.setIgnored(GTMaterials.get('gtceu:anthracite'));
	// [PORT] TFGTagPrefix.richRawOre.setIgnored(GTMaterials.get('gtceu:anthracite'));
	// [PORT] TFGTagPrefix.poorRawOre.setIgnored(GTMaterials.get('gtceu:anthracite'));
	TagPrefix.crushed.setIgnored(GTMaterials.get('gtceu:anthracite'));
	TagPrefix.crushedPurified.setIgnored(GTMaterials.get('gtceu:anthracite'));
	TagPrefix.crushedRefined.setIgnored(GTMaterials.get('gtceu:anthracite'));
	TagPrefix.dustImpure.setIgnored(GTMaterials.get('gtceu:anthracite'));
	TagPrefix.dustPure.setIgnored(GTMaterials.get('gtceu:anthracite'));

	TagPrefix.nugget.setIgnored(GTMaterials.RawRubber);
	TagPrefix.ingot.setIgnored(GTMaterials.RawRubber);
	TagPrefix.plate.setIgnored(GTMaterials.RawRubber);
	TagPrefix.plateDouble.setIgnored(GTMaterials.RawRubber);

	TagPrefix.nugget.setIgnored(GTMaterials.get('tfg:magnesia_refractory_brick'))
	TagPrefix.block.setIgnored(GTMaterials.get('tfg:magnesia_refractory_brick'))

	TagPrefix.block.setIgnored(GTMaterials.get('tfg:weak_inconel_718'))
	TagPrefix.block.setIgnored(GTMaterials.get('tfg:homogenized_inconel_718'))
	TagPrefix.nugget.setIgnored(GTMaterials.get('tfg:weak_inconel_718'))
	TagPrefix.nugget.setIgnored(GTMaterials.get('tfg:homogenized_inconel_718'))
	TagPrefix.dustTiny.setIgnored(GTMaterials.get('tfg:weak_inconel_718'))
	TagPrefix.dustTiny.setIgnored(GTMaterials.get('tfg:homogenized_inconel_718'))
	TagPrefix.dustSmall.setIgnored(GTMaterials.get('tfg:weak_inconel_718'))
	TagPrefix.dustSmall.setIgnored(GTMaterials.get('tfg:homogenized_inconel_718'))
	TagPrefix.dust.setIgnored(GTMaterials.get('tfg:homogenized_inconel_718'))

	TagPrefix.dustTiny.setIgnored(GTMaterials.get('tfg:dirty_mo_si_b'))
	TagPrefix.dustSmall.setIgnored(GTMaterials.get('tfg:dirty_mo_si_b'))

	TagPrefix.block.setIgnored(GTMaterials.get('tfg:weak_mo_si_b'))
	TagPrefix.nugget.setIgnored(GTMaterials.get('tfg:weak_mo_si_b'))
	TagPrefix.dustTiny.setIgnored(GTMaterials.get('tfg:weak_mo_si_b'))
	TagPrefix.dustSmall.setIgnored(GTMaterials.get('tfg:weak_mo_si_b'))
	TagPrefix.ingot.setIgnored(GTMaterials.get('tfg:weak_mo_si_b'))

	TagPrefix.block.setIgnored(GTMaterials.get('tfg:worked_mo_si_b'))
	TagPrefix.nugget.setIgnored(GTMaterials.get('tfg:worked_mo_si_b'))
	TagPrefix.dustTiny.setIgnored(GTMaterials.get('tfg:worked_mo_si_b'))
	TagPrefix.dustSmall.setIgnored(GTMaterials.get('tfg:worked_mo_si_b'))
	TagPrefix.ingot.setIgnored(GTMaterials.get('tfg:worked_mo_si_b'))
	TagPrefix.dust.setIgnored(GTMaterials.get('tfg:worked_mo_si_b'))

	TagPrefix.block.setIgnored(GTMaterials.get('tfg:homogenized_mo_si_b'))
	TagPrefix.nugget.setIgnored(GTMaterials.get('tfg:homogenized_mo_si_b'))
	TagPrefix.dustTiny.setIgnored(GTMaterials.get('tfg:homogenized_mo_si_b'))
	TagPrefix.dustSmall.setIgnored(GTMaterials.get('tfg:homogenized_mo_si_b'))
	TagPrefix.dust.setIgnored(GTMaterials.get('tfg:homogenized_mo_si_b'))

	TagPrefix.block.setIgnored(GTMaterials.get('tfg:activated_mo_si_b'))
	TagPrefix.nugget.setIgnored(GTMaterials.get('tfg:activated_mo_si_b'))
	TagPrefix.dustTiny.setIgnored(GTMaterials.get('tfg:activated_mo_si_b'))
	TagPrefix.dustSmall.setIgnored(GTMaterials.get('tfg:activated_mo_si_b'))
	TagPrefix.dust.setIgnored(GTMaterials.get('tfg:activated_mo_si_b'))

	TagPrefix.nugget.setIgnored(GTMaterials.get('tfg:rough_silicon_carbide'))
	TagPrefix.block.setIgnored(GTMaterials.get('tfg:rough_silicon_carbide'))
	TagPrefix.nugget.setIgnored(GTMaterials.get('tfg:silicon_carbide'))
	TagPrefix.block.setIgnored(GTMaterials.get('tfg:silicon_carbide'))
	TagPrefix.plateDouble.setIgnored(GTMaterials.get('tfg:silicon_carbide'))

	TagPrefix.block.setIgnored(GTMaterials.get('tfg:basalt_fiber'))
	TagPrefix.nugget.setIgnored(GTMaterials.get('tfg:basalt_fiber'))
	TagPrefix.dustTiny.setIgnored(GTMaterials.get('tfg:basalt_fiber'))
	TagPrefix.dustSmall.setIgnored(GTMaterials.get('tfg:basalt_fiber'))
	TagPrefix.dust.setIgnored(GTMaterials.get('tfg:basalt_fiber'))
	TagPrefix.plateDouble.setIgnored(GTMaterials.get('tfg:basalt_fiber'))
	TagPrefix.ingot.setIgnored(GTMaterials.get('tfg:basalt_fiber'))

	TagPrefix.block.setIgnored(GTMaterials.get('tfg:silicon_carbide_silicon_carbide'))
	TagPrefix.nugget.setIgnored(GTMaterials.get('tfg:silicon_carbide_silicon_carbide'))
	TagPrefix.dustTiny.setIgnored(GTMaterials.get('tfg:silicon_carbide_silicon_carbide'))
	TagPrefix.dustSmall.setIgnored(GTMaterials.get('tfg:silicon_carbide_silicon_carbide'))
	TagPrefix.dust.setIgnored(GTMaterials.get('tfg:silicon_carbide_silicon_carbide'))
	TagPrefix.plateDouble.setIgnored(GTMaterials.get('tfg:silicon_carbide_silicon_carbide'))
	TagPrefix.plate.setIgnored(GTMaterials.get('tfg:silicon_carbide_silicon_carbide'))
	TagPrefix.bolt.setIgnored(GTMaterials.get('tfg:silicon_carbide_silicon_carbide'))
	TagPrefix.screw.setIgnored(GTMaterials.get('tfg:silicon_carbide_silicon_carbide'))
	TagPrefix.rod.setIgnored(GTMaterials.get('tfg:silicon_carbide_silicon_carbide'))
	//TagPrefix.turbineBlade.setIgnored(GTMaterials.get('tfg:silicon_carbide_silicon_carbide'))
	TagPrefix.ingot.setIgnored(GTMaterials.get('tfg:silicon_carbide_silicon_carbide'))

	TagPrefix.block.setIgnored(GTMaterials.get('tfg:diamond_tipped_mo_50_re'))
	TagPrefix.nugget.setIgnored(GTMaterials.get('tfg:diamond_tipped_mo_50_re'))
	TagPrefix.plateDouble.setIgnored(GTMaterials.get('tfg:diamond_tipped_mo_50_re'))
	TagPrefix.dust.setIgnored(GTMaterials.get('tfg:diamond_tipped_mo_50_re'))
	TagPrefix.dustSmall.setIgnored(GTMaterials.get('tfg:diamond_tipped_mo_50_re'))
	TagPrefix.dustTiny.setIgnored(GTMaterials.get('tfg:diamond_tipped_mo_50_re'))
	TagPrefix.bolt.setIgnored(GTMaterials.get('tfg:diamond_tipped_mo_50_re'))
	TagPrefix.screw.setIgnored(GTMaterials.get('tfg:diamond_tipped_mo_50_re'))

	TagPrefix.block.setIgnored(GTMaterials.get('tfg:arsenic_bronze'))
	TagPrefix.ingot.setIgnored(GTMaterials.get('tfg:arsenic_bronze'))
	TagPrefix.nugget.setIgnored(GTMaterials.get('tfg:arsenic_bronze'))
	TagPrefix.dust.setIgnored(GTMaterials.get('tfg:arsenic_bronze'))
	TagPrefix.dustSmall.setIgnored(GTMaterials.get('tfg:arsenic_bronze'))
	TagPrefix.dustTiny.setIgnored(GTMaterials.get('tfg:arsenic_bronze'))
	// [PORT] TFGTagPrefix.toolHead* — кастомные префиксы Java-мода TFG (TFC-инструменты),
	// [PORT] в 1.21.1 отсутствуют; раскомментировать после их регистрации через
	// [PORT] GTCEuStartupEvents.registry('gtceu:tag_prefix').
	// [PORT] TFGTagPrefix.toolHeadSword.setIgnored(GTMaterials.get('tfg:arsenic_bronze'))
	// [PORT] TFGTagPrefix.toolHeadButcheryKnife.setIgnored(GTMaterials.get('tfg:arsenic_bronze'))
	// [PORT] TFGTagPrefix.toolHeadMiningHammer.setIgnored(GTMaterials.get('tfg:arsenic_bronze'))
	// [PORT] TFGTagPrefix.toolHeadSpade.setIgnored(GTMaterials.get('tfg:arsenic_bronze'))
	// [PORT] TFGTagPrefix.toolHeadPickaxe.setIgnored(GTMaterials.get('tfg:arsenic_bronze'))
	// [PORT] TFGTagPrefix.toolHeadAxe.setIgnored(GTMaterials.get('tfg:arsenic_bronze'))
	// [PORT] TFGTagPrefix.toolHeadShovel.setIgnored(GTMaterials.get('tfg:arsenic_bronze'))
	// [PORT] TFGTagPrefix.toolHeadHoe.setIgnored(GTMaterials.get('tfg:arsenic_bronze'))
	// [PORT] TFGTagPrefix.toolHeadHammer.setIgnored(GTMaterials.get('tfg:arsenic_bronze'))
	// [PORT] TFGTagPrefix.toolHeadSaw.setIgnored(GTMaterials.get('tfg:arsenic_bronze'))
	// [PORT] TFGTagPrefix.toolHeadScythe.setIgnored(GTMaterials.get('tfg:arsenic_bronze'))
	// [PORT] TFGTagPrefix.toolHeadKnife.setIgnored(GTMaterials.get('tfg:arsenic_bronze'))
}

function excludeAllGemsButNormal(material) {
	TagPrefix.gemChipped.setIgnored(material);
	TagPrefix.gemFlawed.setIgnored(material);
	TagPrefix.gemFlawless.setIgnored(material);
	TagPrefix.gemExquisite.setIgnored(material);
}
