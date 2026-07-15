// priority: 0
"use strict";
// [PORT] AE2 19.2 (NeoForge) держит предметы в DeferredHolder — на момент tag_prefix-события
// [PORT] они ещё не зарегистрированы (в 1.20 были прямые ссылки). Используем Supplier-перегрузку
// [PORT] setIgnored: JS-стрелка -> java Supplier, разрешение отложено до фактического использования.

const registerAE2TagPrefixes = (event) => {
	// [PORT] Пути классов AE2 не изменились в appliedenergistics2-19.2.17 (1.21.1) — проверено по jar.
	const $AE_BLOCKS = Java.loadClass('appeng.core.definitions.AEBlocks');
	const $AE_ITEMS = Java.loadClass('appeng.core.definitions.AEItems');

	// [PORT] GTM8: используем одноаргументный setIgnored(Material) — он отключает генерацию
	// [PORT] GT-предметов (главная цель). Привязка тегов к предметам AE2 — в Ф3 (server tags):
	// [PORT] Rhino не позволяет вызвать перегрузки с ItemLike/Supplier (все неоднозначны,
	// [PORT] AE2-дефиниции реализуют и ItemLike, и Supplier; reflect.Array запрещён фильтром KubeJS).


	// [PORT-GTM-HEAD] GTCEuAPI.materialManager -> GTRegistries.MATERIALS (реестр удалён из GTCEuAPI в HEAD).
	const Fluix = GTRegistries.MATERIALS.getMaterial('tfg:fluix')

	// [PORT-FIX] Если игнорировать базовый dust, но оставить dustSmall/dustTiny,
	// [PORT-FIX] GTCEu MaterialRecipeHandler.processSmallDust/processTinyDust генерируют
	// [PORT-FIX] small/tiny_dust_assembling -> outputItems(dust) = air -> краш датапака
	// [PORT-FIX] (IllegalStateException: Item must not be minecraft:air). Поэтому вместе с dust
	// [PORT-FIX] игнорируем dustSmall и dustTiny (эти предметы даёт AE2 одним dust'ом).
	// [PORT-FIX] Аналогично block+gem: см. CertusQuartz ниже (processBlock -> hammer_block_to_gem).

	TagPrefix.block.setIgnored(Fluix) /* [PORT-Ф3] тег к $AE_BLOCKS.FLUIX_BLOCK привязать в server-тегах */;

	TagPrefix.dust.setIgnored(Fluix) /* [PORT-Ф3] тег к $AE_ITEMS.FLUIX_DUST привязать в server-тегах */;
	TagPrefix.dustSmall.setIgnored(Fluix) /* [PORT-FIX] нет базового dust -> ассемблинг падал */;
	TagPrefix.dustTiny.setIgnored(Fluix) /* [PORT-FIX] нет базового dust -> ассемблинг падал */;
	TagPrefix.gem.setIgnored(Fluix) /* [PORT-Ф3] тег к $AE_ITEMS.FLUIX_CRYSTAL привязать в server-тегах */;

	// [PORT-FIX] CertusQuartz — рудный материал (PropertyKey.ORE) с gem + CRYSTALLIZABLE.
	// [PORT-FIX] Его НЕЛЬЗЯ частично игнорировать в GTM8-HEAD: generateSurfaceRockRecipe
	// [PORT-FIX] требует dustSmall (guard лишь hasProperty(ORE)); processDust (autoclave/
	// [PORT-FIX] implosion) безусловно выдаёт gem. Игнор любого из {dust,dustSmall,gem}
	// [PORT-FIX] рвёт авто-рецепты GTCEu (Item must not be air / Item array cannot be empty).
	// [PORT-FIX] Поэтому GT-предметы certus quartz оставляем как есть; унификацию с
	// [PORT-FIX] AE2-кристаллом/дастом переносим на Ф3 (server tags). Было (ломало датапак):
	//   TagPrefix.block/dust/dustSmall/dustTiny/gem.setIgnored(GTMaterials.CertusQuartz)

	// [PORT-FIX] EnderPearl dust НЕЛЬЗЯ игнорировать: GTCEu хардкодит рецепты, которые
	// [PORT-FIX] выдают ender pearl dust — DistillationRecipes (distill_liquid_ender_air)
	// [PORT-FIX] и MixerRecipes. Пустой ChemicalHelper.get(dust, EnderPearl) -> SizedIngredient
	// [PORT-FIX] size 0 -> "Size must be positive" -> краш датапака. GT-даст оставляем;
	// [PORT-FIX] унификацию с AE2 ender_dust переносим на Ф3 (server tags). Было (ломало датапак):
	//   TagPrefix.dust/dustSmall/dustTiny.setIgnored(GTMaterials.EnderPearl)
}
