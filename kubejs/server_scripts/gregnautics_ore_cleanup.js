"use strict";

ServerEvents.tags("item", event => {
    [
        "gtceu:raw_aluminium",
        "gtceu:raw_lead",
        "gtceu:raw_tin",
        "gtceu:raw_lithium",
        "gtceu:raw_beryllium",
        "gtceu:raw_cobalt",
        "gtceu:raw_molybdenum"
    ].forEach(item => event.add("c:hidden_from_recipe_viewers", item));
});
