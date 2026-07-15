"use strict";

var GREGNAUTICS_DUPLICATE_COKE_ITEMS = [
    "tfmg:coal_coke"
];

var GREGNAUTICS_DUPLICATE_COKE_BLOCKS = [
    "tfmg:coal_coke_block"
];

var GREGNAUTICS_DUPLICATE_COKE_DUSTS = [
    "tfmg:coal_coke_dust",
    "tfc:powder/coke"
];

var GREGNAUTICS_DUPLICATE_CREOSOTE_BUCKETS = [
    "tfmg:creosote_bucket"
];

var GREGNAUTICS_DUPLICATE_CREOSOTE_FLUIDS = [
    "tfmg:creosote",
    "tfmg:flowing_creosote"
];

var GREGNAUTICS_COKE_REPLACE_FILTERS = [
    { type: "minecraft:crafting_shaped" },
    { type: "minecraft:crafting_shapeless" },
    { type: "minecraft:stonecutting" },
    { type: "minecraft:smelting" },
    { type: "minecraft:blasting" },
    { type: "create:crushing" },
    { type: "create:cutting" },
    { type: "create:filling" },
    { type: "create:item_application" },
    { type: "create:mechanical_crafting" },
    { type: "create:mixing" },
    { type: "create:pressing" },
    { type: "create:sequenced_assembly", not: { mod: "createstellaris" } }, // [PORT-FIX] createstellaris squenched_assembly не парсится KubeJS (старый формат deploying) — исключаем, чтобы не было ERROR
    { type: "tfmg:industrial_blasting" },
    { type: "tfmg:vat_machine_recipe" }
];

function gregnauticsHideIfItemExists(event, item) {
    if (!Item.exists(item)) {
        return;
    }

    event.add("c:hidden_from_recipe_viewers", item);
    event.add("forge:hidden_from_recipe_viewers", item);
}

function gregnauticsReplaceCokeInput(event, from, to) {
    if (!Item.exists(from)) {
        return;
    }

    event.replaceInput(GREGNAUTICS_COKE_REPLACE_FILTERS, from, to);
}

function gregnauticsReplaceCokeOutput(event, from, to) {
    if (!Item.exists(from)) {
        return;
    }

    event.replaceOutput(GREGNAUTICS_COKE_REPLACE_FILTERS, from, to);
}

ServerEvents.tags("item", event => {
    // TFC coals в minecraft:coals — GTCEu использует этот тег в рецептах с углём
    event.add("minecraft:coals", "tfc:ore/lignite");
    event.add("minecraft:coals", "tfc:ore/bituminous_coal");

    // TFC coals в forge:gems/coal — стандартный тег GTCEu для коксовой печи
    event.add("forge:gems/coal", "tfc:ore/lignite");
    event.add("forge:gems/coal", "tfc:ore/bituminous_coal");

    // Убираем из общего forge:gems (уголь не декоративный самоцвет)
    event.remove("forge:gems", "tfc:ore/lignite");
    event.remove("forge:gems", "tfc:ore/bituminous_coal");

    // TFC доменная печь теперь работает только на коксе, не на сыром угле
    event.remove("tfc:blast_furnace_fuel", "tfc:ore/lignite");
    event.remove("tfc:blast_furnace_fuel", "tfc:ore/bituminous_coal");
    event.remove("tfc:blast_furnace_fuel", "minecraft:charcoal");
    event.add("tfc:blast_furnace_fuel", "gtceu:coke_gem");

    // GTCEu производные угля как топливо для TFC кузницы
    event.add("tfc:forge_fuel", "gtceu:coke_gem");
    event.add("tfc:forge_fuel", "gtceu:coke_dust");
    event.add("tfc:forge_fuel", "gtceu:coal_dust");
    event.add("tfc:forge_fuel", "gtceu:small_coal_dust");
    event.add("tfc:forge_fuel", "gtceu:tiny_coal_dust");
    event.add("tfc:forge_fuel", "gtceu:charcoal_dust");
    event.add("tfc:forge_fuel", "gtceu:charcoal_block");

    // TFC торф как слабое топливо для кузницы и горелок
    event.add("tfc:forge_fuel", "tfc:peat");

    // TFMG доменная печь принимает GTCEu кокс
    event.remove("tfmg:blast_furnace_fuel", "tfmg:coal_coke_dust");
    event.add("tfmg:blast_furnace_fuel", "gtceu:coke_gem");
    event.add("tfmg:blast_furnace_fuel", "gtceu:coke_dust");

    // Create blaze burner / Hot Air Burner — обычное топливо (нормальный жар)
    event.add("create:blaze_burner_fuel/regular", "tfc:ore/lignite");
    event.add("create:blaze_burner_fuel/regular", "tfc:ore/bituminous_coal");
    event.add("create:blaze_burner_fuel/regular", "tfc:peat");
    event.add("create:blaze_burner_fuel/regular", "gtceu:charcoal_block");
    event.add("create:blaze_burner_fuel/regular", "gtceu:coke_gem");

    // Create blaze burner — перегретый режим (bituminous coal и кокс жгут горячее)
    event.add("create:blaze_burner_fuel/special", "tfc:ore/bituminous_coal");
    event.add("create:blaze_burner_fuel/special", "gtceu:coke_gem");

    event.add("c:coal_coke", "gtceu:coke_gem");
    event.add("forge:coal_coke", "gtceu:coke_gem");
    event.add("c:storage_blocks/coal_coke", "gtceu:coke_block");
    event.add("forge:storage_blocks/coal_coke", "gtceu:coke_block");
    event.add("c:storage_blocks", "gtceu:coke_block");
    event.add("forge:storage_blocks", "gtceu:coke_block");
    event.add("c:dusts/coal_coke", "gtceu:coke_dust");
    event.add("forge:dusts/coal_coke", "gtceu:coke_dust");
    event.add("c:dusts", "gtceu:coke_dust");
    event.add("forge:dusts", "gtceu:coke_dust");
    event.add("c:buckets/creosote", "gtceu:creosote_bucket");
    event.add("forge:buckets/creosote", "gtceu:creosote_bucket");

    GREGNAUTICS_DUPLICATE_COKE_ITEMS.forEach(item => {
        event.remove("c:coal_coke", item);
        event.remove("forge:coal_coke", item);
        gregnauticsHideIfItemExists(event, item);
    });

    GREGNAUTICS_DUPLICATE_COKE_BLOCKS.forEach(item => {
        event.remove("c:storage_blocks/coal_coke", item);
        event.remove("forge:storage_blocks/coal_coke", item);
        event.remove("c:storage_blocks", item);
        event.remove("forge:storage_blocks", item);
        gregnauticsHideIfItemExists(event, item);
    });

    GREGNAUTICS_DUPLICATE_COKE_DUSTS.forEach(item => {
        event.remove("c:dusts/coal_coke", item);
        event.remove("forge:dusts/coal_coke", item);
        event.remove("c:dusts", item);
        event.remove("forge:dusts", item);
        event.remove("tfc:forge_fuel", item);
        gregnauticsHideIfItemExists(event, item);
    });

    GREGNAUTICS_DUPLICATE_COKE_ITEMS.forEach(item => {
        event.remove("minecraft:coals", item);
        event.remove("tfc:forge_fuel", item);
    });

    GREGNAUTICS_DUPLICATE_CREOSOTE_BUCKETS.forEach(item => {
        event.remove("c:buckets/creosote", item);
        event.remove("forge:buckets/creosote", item);
        gregnauticsHideIfItemExists(event, item);
    });

});

ServerEvents.tags("block", event => {
    event.add("c:storage_blocks/coal_coke", "gtceu:coke_block");
    event.add("forge:storage_blocks/coal_coke", "gtceu:coke_block");
    event.add("c:storage_blocks", "gtceu:coke_block");
    event.add("forge:storage_blocks", "gtceu:coke_block");

    GREGNAUTICS_DUPLICATE_COKE_BLOCKS.forEach(block => {
        event.remove("c:storage_blocks/coal_coke", block);
        event.remove("forge:storage_blocks/coal_coke", block);
        event.remove("c:storage_blocks", block);
        event.remove("forge:storage_blocks", block);
    });
});

ServerEvents.tags("fluid", event => {
    event.add("c:creosote", "gtceu:creosote");
    event.add("c:creosote", "gtceu:flowing_creosote");
    event.add("forge:creosote", "gtceu:creosote");
    event.add("forge:creosote", "gtceu:flowing_creosote");
    event.add("c:fuel", "gtceu:creosote");
    event.add("c:fuel", "gtceu:flowing_creosote");
    event.add("tfc:usable_in_barrel", "gtceu:creosote");
    event.add("tfc:usable_in_barrel", "gtceu:flowing_creosote");
    event.add("tfc:usable_in_red_steel_bucket", "gtceu:creosote");
    event.add("tfc:usable_in_red_steel_bucket", "gtceu:flowing_creosote");
    event.add("tfc:usable_in_wooden_bucket", "gtceu:creosote");
    event.add("tfc:usable_in_wooden_bucket", "gtceu:flowing_creosote");
    event.add("tfmg:blast_stove_fuel", "gtceu:creosote");
    event.add("tfmg:blast_stove_fuel", "gtceu:flowing_creosote");
    event.add("tfmg:flammable", "gtceu:creosote");
    event.add("tfmg:flammable", "gtceu:flowing_creosote");

    GREGNAUTICS_DUPLICATE_CREOSOTE_FLUIDS.forEach(fluid => {
        event.remove("c:creosote", fluid);
        event.remove("forge:creosote", fluid);
        event.remove("c:fuel", fluid);
        event.remove("tfc:usable_in_barrel", fluid);
        event.remove("tfc:usable_in_red_steel_bucket", fluid);
        event.remove("tfc:usable_in_wooden_bucket", fluid);
        event.remove("tfmg:blast_stove_fuel", fluid);
        event.remove("tfmg:flammable", fluid);
        event.add("c:hidden_from_recipe_viewers", fluid);
        event.add("forge:hidden_from_recipe_viewers", fluid);
    });
});

ServerEvents.recipes(event => {
	console.info("[Gregnautics] progress: coal_integration recipes event start");
    GREGNAUTICS_DUPLICATE_COKE_ITEMS.forEach(item => {
        event.remove({ output: item });
        gregnauticsReplaceCokeInput(event, item, "gtceu:coke_gem");
        gregnauticsReplaceCokeOutput(event, item, "gtceu:coke_gem");
    });

    GREGNAUTICS_DUPLICATE_COKE_BLOCKS.forEach(item => {
        event.remove({ output: item });
        gregnauticsReplaceCokeInput(event, item, "gtceu:coke_block");
        gregnauticsReplaceCokeOutput(event, item, "gtceu:coke_block");
    });

    GREGNAUTICS_DUPLICATE_COKE_DUSTS.forEach(item => {
        event.remove({ output: item });
        gregnauticsReplaceCokeInput(event, item, "gtceu:coke_dust");
        gregnauticsReplaceCokeOutput(event, item, "gtceu:coke_dust");
    });

    GREGNAUTICS_DUPLICATE_CREOSOTE_BUCKETS.forEach(item => {
        event.remove({ output: item });
        gregnauticsReplaceCokeInput(event, item, "gtceu:creosote_bucket");
        gregnauticsReplaceCokeOutput(event, item, "gtceu:creosote_bucket");
    });

    [
        "tfmg:coking/coal",
        "tfmg:coking/charcoal",
        "tfmg:crafting/materials/coal_coke",
        "tfmg:crafting/materials/coal_coke_block",
        "tfmg:filling/hardened_planks",
        "tfmg:vat_machine_recipe/arc_furnace_steel",
        "create:crushing/coal_coke"
    ].forEach(id => event.remove({ id: id }));

    event.custom({
        type: "tfmg:coking",
        ingredients: [{ item: "minecraft:coal" }],
        processing_time: 1200,
        results: [
            { id: "gtceu:coke_gem" },
            { id: "gtceu:creosote", amount: 1 },
            { id: "tfmg:carbon_dioxide", amount: 30 }
        ]
    }).id("gregnautics:tfmg/coking/coal");

    event.custom({
        type: "tfmg:coking",
        ingredients: [{ tag: "minecraft:logs_that_burn" }],
        processing_time: 600,
        results: [
            { id: "minecraft:charcoal" },
            { id: "gtceu:creosote", amount: 2 },
            { id: "tfmg:carbon_dioxide", amount: 20 }
        ]
    }).id("gregnautics:tfmg/coking/charcoal");

    event.recipes.create.crushing("gtceu:coke_dust", "gtceu:coke_gem")
        .id("gregnautics:create/crushing/gtceu_coke");

    event.recipes.create.crushing("9x gtceu:coke_dust", "gtceu:coke_block")
        .id("gregnautics:create/crushing/gtceu_coke_block");

    event.custom({
        type: "create:filling",
        ingredients: [
            { tag: "minecraft:planks" },
            { type: "neoforge:single", amount: 250, fluid: "gtceu:creosote" }
        ],
        results: [{ id: "tfmg:hardened_planks" }]
    }).id("gregnautics:tfmg/filling/hardened_planks");

    event.custom({
        type: "tfmg:vat_machine_recipe",
        allowed_vat_types: ["tfmg:firebrick_lined_vat"],
        ingredients: [
            { item: "create:crushed_raw_iron" },
            { tag: "tfmg:flux" },
            { item: "gtceu:coke_dust" }
        ],
        machines: [
            "tfmg:graphite_electrode",
            "tfmg:graphite_electrode",
            "tfmg:graphite_electrode"
        ],
        min_size: 9,
        processing_time: 20,
        results: [
            { id: "gtceu:coke_dust", chance: 0.9 },
            { id: "gtceu:steel", amount: 144 },
            { id: "tfmg:molten_slag", amount: 288 }
        ]
    }).id("gregnautics:tfmg/vat_machine_recipe/arc_furnace_steel");

    // ── Лигнит → угольная пыль ────────────────────────────────────────────

    event.shaped("gtceu:coal_dust", ["A", "B"], {
        A: "tfc:ore/lignite",
        B: "#forge:tools/mortars"
    }).id("gregnautics:mortar/lignite");

    event.recipes.tfc.quern("gtceu:coal_dust", "tfc:ore/lignite")
        .id("gregnautics:quern/lignite");

    event.recipes.gtceu.macerator()
        .itemInputs("tfc:ore/lignite")
        .itemOutputs("#forge:dusts/coal")
        .EUt(2)
        .duration(12);

    // ── Коксовая печь ─────────────────────────────────────────────────────

    // Лигнит → 1 кокс (низкое качество)
    event.recipes.gtceu.coke_oven()
        .itemInputs("tfc:ore/lignite")
        .itemOutputs("1x gtceu:coke_gem")
        .outputFluids(Fluid.of("gtceu:creosote", 500))
        .duration(900);

    // Битуминозный → 2 кокса (высокое качество)
    event.recipes.gtceu.coke_oven()
        .itemInputs("tfc:ore/bituminous_coal")
        .itemOutputs("2x gtceu:coke_gem")
        .outputFluids(Fluid.of("gtceu:creosote", 2000))
        .duration(900);

    // Торф → крезот (без кокса)
    event.recipes.gtceu.coke_oven()
        .itemInputs("tfc:peat")
        .outputFluids(Fluid.of("gtceu:creosote", 1000))
        .duration(900);

    // ── Пиролизная печь ───────────────────────────────────────────────────

    // Убираем дефолтные GTCEu рецепты на vanilla coal
    event.remove({ id: "gtceu:pyrolyse_oven/coal_to_coke_creosote" });
    event.remove({ id: "gtceu:pyrolyse_oven/coal_to_coal_gas" });
    event.remove({ id: "gtceu:pyrolyse_oven/coal_to_coke_creosote_nitrogen" });

    // Битуминозный уголь (×3 → каменноугольный деготь)
    event.recipes.gtceu.pyrolyse_oven()
        .itemInputs("3x tfc:ore/bituminous_coal")
        .chancedOutput("gtceu:dark_ash_dust", 5000)
        .outputFluids(Fluid.of("gtceu:coal_tar", 3000))
        .duration(288)
        .EUt(96)
        .circuit(8);

    // Битуминозный уголь (×8 → кокс + крезот)
    event.recipes.gtceu.pyrolyse_oven()
        .itemInputs("8x tfc:ore/bituminous_coal")
        .itemOutputs("16x gtceu:coke_gem")
        .outputFluids(Fluid.of("gtceu:creosote", 8000))
        .duration(576)
        .EUt(64)
        .circuit(1);

    // Битуминозный уголь (×8 + пар → кокс + угольный газ)
    event.recipes.gtceu.pyrolyse_oven()
        .itemInputs("8x tfc:ore/bituminous_coal")
        .itemOutputs("16x gtceu:coke_gem")
        .inputFluids(Fluid.of("gtceu:steam"))
        .outputFluids(Fluid.of("gtceu:coal_gas", 4000))
        .duration(288)
        .EUt(96)
        .circuit(22);

    // Битуминозный уголь (×8 + азот → кокс + крезот)
    event.recipes.gtceu.pyrolyse_oven()
        .itemInputs("8x tfc:ore/bituminous_coal")
        .itemOutputs("16x gtceu:coke_gem")
        .inputFluids(Fluid.of("gtceu:nitrogen"))
        .outputFluids(Fluid.of("gtceu:creosote", 8000))
        .duration(288)
        .EUt(96)
        .circuit(2);

    // Лигнит (×6 → каменноугольный деготь)
    event.recipes.gtceu.pyrolyse_oven()
        .itemInputs("6x tfc:ore/lignite")
        .chancedOutput("gtceu:dark_ash_dust", 5000)
        .outputFluids(Fluid.of("gtceu:coal_tar", 3000))
        .duration(288)
        .EUt(96)
        .circuit(8);

    // Лигнит (×8 → кокс + крезот)
    event.recipes.gtceu.pyrolyse_oven()
        .itemInputs("8x tfc:ore/lignite")
        .itemOutputs("8x gtceu:coke_gem")
        .outputFluids(Fluid.of("gtceu:creosote", 8000))
        .duration(576)
        .EUt(64)
        .circuit(1);

    // Лигнит (×8 + пар → кокс + угольный газ)
    event.recipes.gtceu.pyrolyse_oven()
        .itemInputs("8x tfc:ore/lignite")
        .itemOutputs("8x gtceu:coke_gem")
        .inputFluids(Fluid.of("gtceu:steam"))
        .outputFluids(Fluid.of("gtceu:coal_gas", 4000))
        .duration(288)
        .EUt(96)
        .circuit(22);

    // Лигнит (×8 + азот → кокс + крезот)
    event.recipes.gtceu.pyrolyse_oven()
        .itemInputs("8x tfc:ore/lignite")
        .itemOutputs("8x gtceu:coke_gem")
        .inputFluids(Fluid.of("gtceu:nitrogen"))
        .outputFluids(Fluid.of("gtceu:creosote", 8000))
        .duration(288)
        .EUt(96)
        .circuit(2);
});
