// priority: 0
"use strict";

// [PORT] Порт tfc/events.js из TerraFirmaGreg-Modern (1.20.1) на KubeJS 7 / NeoForge 1.21.1.
// [PORT-FIX] KubeJS 7: у ItemStack нет hasTag(id) — проверка через Ingredient.of('#tag').test(stack).
// Тег tfc:nonplaceable наполняется в tfg_port/tfc.tags.js (вёдра с напитками и т.п.) — отмена ПКМ, чтобы жидкость нельзя было вылить.

console.info('[Gregnautics] progress: tfg_port tfc.data events start') // [PORT] лог вынесен на уровень файла — обработчик вызывается на каждый ПКМ

const TFC_NONPLACEABLE_INGREDIENT = Ingredient.of('#tfc:nonplaceable')

ItemEvents.rightClicked(event => {
	if (TFC_NONPLACEABLE_INGREDIENT.test(event.item)) {
		event.cancel()
	}
})
