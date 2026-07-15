// priority: 0
"use strict";

const registerAE2Materials = (event) => {
    event.create('tfg:fluix')
        .liquid()
        .gem(1)
        // [PORT] .iconSet(GTMaterialIconSet.CERTUS) перенесён в tfg.iconset_fixups.js: builder.iconSet() в GTM8-SNAPSHOT b71dec5 создаёт незарегистрированный intrusive holder (краш заморозки)
        .flags(
            GTMaterialFlags.NO_SMELTING,
            GTMaterialFlags.CRYSTALLIZABLE,
            GTMaterialFlags.DISABLE_DECOMPOSITION
        )
        .components('1x unknown', '1x nether_quartz', '1x certus_quartz')
        .color(0x8f5ccb)
        .secondaryColor(0x252f5a)
}
