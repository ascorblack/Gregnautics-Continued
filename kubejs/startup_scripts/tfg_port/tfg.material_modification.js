// priority: 0
"use strict";

const registerTFGMaterialModification = (event) => {
	//registerTFCMaterialModification(event); // [PORT] Ф3 — зависит от TFG-Core-механик (material_modification.tfc.js не портирован)
	registerTFGFlagsMaterialModification(event);
	registerTFGOresMaterialModification(event);
	//registerTFGPropertyMaterialModification(event); // [PORT] Ф3 — зависит от TFG-Core-механик (material_modification.properties.js не портирован)
	//registerTFGToolMaterialModification(event); // [PORT] Ф3 — зависит от TFG-Core-механик (material_modification.tools.js не портирован)
	registerTFGFluidMaterialModification(event);
	registerTFGComponentMaterialModification(event);
	registerTFGColorsMaterialModification(event)
	registerTFGIconSetFixups(event) // [PORT] см. tfg.iconset_fixups.js;
}