// priority: 0
"use strict";

// [PORT] Портировано из create_additions/events.js (TerraFirmaGreg-Modern 1.20.1 -> 1.21.1)
// [PORT] Оригинал: new FoodData(6, 0, 2, 1, 0, 0, 0, 0.5, 0) + player.getFoodData().eat(cakeData)
// [PORT-CHECK] В TFC 4.x (1.21) FoodData переехал из net.dries007.tfc.common.capabilities.food в
// компонентную систему (net.dries007.tfc.common.component.food), конструктор/механизм eat изменились.
// Портировано через ванильные setFoodLevel/setSaturation (hunger 6, saturation 2);
// нутриенты (grain 1, dairy 0.5) НЕ начисляются — нужна проверка в игре / доработка через TFC API.

BlockEvents.rightClicked(event => {
	console.info('[Gregnautics] progress: tfg_port createaddition events start')

	const { block, player } = event;
	if (block.id !== 'createaddition:chocolate_cake' && block.id !== 'createaddition:honey_cake') return

	let foodData = player.getFoodData();
	if (foodData.needsFood()) {
		// [PORT-CHECK] замена foodData.eat(cakeData): hunger 6, saturation 2 из оригинального FoodData
		foodData.setFoodLevel(Math.min(20, foodData.getFoodLevel() + 6));
		foodData.setSaturation(Math.min(foodData.getFoodLevel(), foodData.getSaturationLevel() + 2));
	}
});
