// priority: 0
"use strict";

// [PORT] TFG 1.20.1 main_server_script.js -> 1.21.1 (Gregnautics), Ф5 (worldgen).
// TFG полностью удаляет стандартные рудные жилы GTCEu: вся руда генерируется
// через TFC-жилы (kubejs/data/gregnautics/worldgen/**) в стиле TerraFirmaCraft.
// GTCEuServerEvents.oreVeins + removeAll проверены по jar GTCEu 8.0.0-SNAPSHOT
// (com/gregtechceu/gtceu/integration/kjs/GTCEuServerEvents, GTOreVeinEventJS).
GTCEuServerEvents.oreVeins(event => {
	event.removeAll()
})

// [PORT] registerGTCEUBedrockFluidVeins (ориг. gregtech/data.js) регистрировал ТОЛЬКО
// коренные жидкостные жилы Луны/Марса/Венеры (registerTFGMoon/Mars/VenusBedrockFluidVeins)
// -> отложено до Ф10 (космос). Дефолтные bedrock fluid жилы GTCEu в оверворлде
// TFG не удалял — оставляем как есть (GTCEuServerEvents.fluidVeins не трогаем).
// [PORT] tfg/bedrock_fluid_spouts/earth.json (спауты над жилами) требовал кастомную
// логику мода TFG (placement-тип tfg:fluid_vein) — заменено датапак-фичами
// gregnautics:earth/fluid_vein/* (см. gregnautics_worldgen_tags.js).
