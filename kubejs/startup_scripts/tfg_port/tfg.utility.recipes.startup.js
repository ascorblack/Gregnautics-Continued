// priority: 50
"use strict";

console.info('[Gregnautics] progress: tfg_port tfg.utility.recipes.startup load')

// [PORT] Из TFG server_scripts/tfg/utility.recipes.js.
// В KubeJS 7 запись в `global` разрешена только из startup-скриптов, поэтому
// global.modifyRecipe живёт здесь; server-скрипты вызывают его как раньше:
// global.modifyRecipe(event, "gtceu:assembler/some_recipe", { ... }).
//
// [PORT-FIX] JSON-формат GT-рецептов в GTCEu 8 / 1.21 (сверено с GTRecipeSerializer из jar):
//  - верхний уровень: duration, inputs/outputs/tickInputs/tickOutputs (map capability -> [{content, chance, ...}]),
//    recipeConditions, data, category — имена полей сохранились;
//  - item content = NeoForge SizedIngredient: { ingredient: {item|tag|type...}, count };
//    кастомный ингредиент (circuit) теперь ВНУТРИ ingredient: { type: "gtceu:circuit", configuration: N };
//  - fluid content = NeoForge SizedFluidIngredient: { ingredient: {fluid} | {type:"neoforge:tag", tag} , amount };
//    (в 1.20 было { value: [...], amount } — поддерживаем оба на всякий случай);
//  - eu tick content = EnergyStack: число (voltage-only codec) ИЛИ { voltage, amperage }.
// [PORT-CHECK] Проверить в игре на реальном рецепте (например gtceu:assembler/transistor):
// формат условий (cleanroom/blastFurnaceTemp/research) читается «плоско», как в 1.20.

// How to call this function anywhere in KubeJS

// Always add an ID, whatever you want without adding the machine name if you don't want to see namespace:machine/machine/my_recipe

/*
// Modify only duration et EUt
global.modifyRecipe(event, "gtceu:electric_blast_furnace/some_recipe", {
    newId: "tfg:some_recipe",
    duration: 20 * 100,
    eut: GTValues.VA[GTValues.EV]
})

// Replace a fluid if needed - ALWAYS USE A TAG BECAUSE GREGTECH REGISTERS THEIR RECIPE IN JSON WITH TAG
// [PORT] Теги теперь в namespace c: (бывший forge:)
global.modifyRecipe(event, "gtceu:assembler/transistor", {
    newId: "tfg:transistor",
    fluidReplacements: { "c:polyethylene": "gtceu:silicone_rubber" }
})

// Modify item input quantity
global.modifyRecipe(event, "gtceu:assembler/some_recipe", {
    newId: "tfg:some_recipe",
    itemInputs: { "gtceu:copper_plate": 4 }
})

// Modify fluid input quantity
global.modifyRecipe(event, "gtceu:chemical_reactor/some_recipe", {
    newId: "tfg:some_recipe",
    fluidInputs: { "c:sulfuric_acid": 500 }
})

// Modify item output quantity
global.modifyRecipe(event, "gtceu:electric_blast_furnace/some_recipe", {
    newId: "tfg:some_recipe",
    itemOutputs: { "gtceu:steel_ingot": 2 }
})

// Modify fluid output quantity
global.modifyRecipe(event, "gtceu:chemical_reactor/some_recipe", {
    newId: "tfg:some_recipe",
    fluidOutputs: { "gtceu:sulfuric_acid": 1000 }
})

// Modify blast furnace temperature (override)
// Works for both electric_blast_furnace and alloy_blast_smelter (data.ebf_temp)
global.modifyRecipe(event, "gtceu:electric_blast_furnace/some_recipe", {
    newId: "tfg:some_recipe",
    blastFurnaceTemp: 2700
})

// Modify circuit configuration
global.modifyRecipe(event, "gtceu:some_machine/some_recipe", {
    newId: "tfg:some_recipe",
    circuit: 5
})
*/

global.modifyRecipe = function(event, recipeId, options) {
    var matches = event.findRecipes({ id: recipeId })
    if (!matches || matches.length === 0) return

    // [PORT-FIX] EnergyStack: число или { voltage, amperage }
    var readEu = function(content) {
        if (content === null || content === undefined) return 0
        if (typeof content === "number") return content
        if (typeof content === "object" && content.voltage !== undefined) {
            return content.voltage * (content.amperage || 1)
        }
        return Number(content)
    }

    // [PORT-FIX] item content: 1.21 = { ingredient, count }; circuit — ingredient.type === "gtceu:circuit"
    var getItemIngredient = function(content) {
        var ing = content.ingredient
        // 1.20-фоллбэк: { type: "gtceu:circuit", configuration } прямо в content
        if (!ing && content.type === "gtceu:circuit") return content
        return ing
    }

    // [PORT-FIX] fluid content: 1.21 = { ingredient: {fluid}|{tag}|{type:"neoforge:tag",tag}, amount };
    // 1.20-фоллбэк: { value: [{fluid|tag}], amount }. Возвращаем массив «значений» для унификации.
    var getFluidValues = function(content) {
        if (content.ingredient) {
            var ing = content.ingredient
            if (Array.isArray(ing)) return ing
            return [ing]
        }
        if (content.value) return content.value
        return []
    }

    for (var i = 0; i < matches.length; i++) {
        var javaRecipe = matches[i]

        var recipeJson
        try {
            // [PORT] В KubeJS 7 у KubeRecipe json обычно уже есть; serialize() оставлен как фоллбэк.
            if (typeof javaRecipe.serialize === "function") javaRecipe.serialize()
            recipeJson = JSON.parse(javaRecipe.json.toString())
        } catch (e) {
            console.error(`[Gregnautics] modifyRecipe: cannot read json of ${recipeId}: ${e}`)
            continue
        }

        var machineName = javaRecipe.getId().toString().split(":")[1].split("/")[0]
        var recipeName = recipeId.split("/").slice(1).join("/")
        var newId = options.newId || (`tfg:${machineName}/${recipeName}`)

        // Extract Temp
        if (recipeJson.recipeConditions) {
            for (var ci0 = 0; ci0 < recipeJson.recipeConditions.length; ci0++) {
                var cond0 = recipeJson.recipeConditions[ci0]
                if (cond0.type === "blastFurnaceTemp" || cond0.type === "blast_furnace_temp") {
                    recipeJson.blastFurnaceTemp = cond0.temperature !== undefined ? cond0.temperature
                        : (cond0.data ? cond0.data.temperature : undefined)
                }
            }
        }
        if (!recipeJson.blastFurnaceTemp && recipeJson.data && recipeJson.data.ebf_temp) {
            recipeJson.blastFurnaceTemp = recipeJson.data.ebf_temp
        }

        // Duration and EUt
        if (options.duration) recipeJson.duration = options.duration

        var euContent = 0
        if (recipeJson.tickInputs && recipeJson.tickInputs.eu && recipeJson.tickInputs.eu.length > 0) {
            euContent = readEu(recipeJson.tickInputs.eu[0].content)
        }
        if (options.eut) euContent = options.eut

        // Override blast furnace temperature
        if (options.blastFurnaceTemp) recipeJson.blastFurnaceTemp = options.blastFurnaceTemp

        // Override circuit
        if (options.circuit !== undefined && recipeJson.inputs && recipeJson.inputs.item) {
            recipeJson.inputs.item = recipeJson.inputs.item.map(slot => {
                var sIng = getItemIngredient(slot.content)
                if (sIng && sIng.type === "gtceu:circuit") {
                    sIng.configuration = options.circuit
                }
                return slot
            })
        }

        // Replace a fluid
        if (options.fluidReplacements && recipeJson.inputs && recipeJson.inputs.fluid) {
            for (var fr = 0; fr < recipeJson.inputs.fluid.length; fr++) {
                var frValues = getFluidValues(recipeJson.inputs.fluid[fr].content)
                for (var frv = 0; frv < frValues.length; frv++) {
                    var frVal = frValues[frv]
                    var frKey = frVal.tag || frVal.fluid
                    if (frKey && options.fluidReplacements[frKey]) {
                        delete frVal.tag
                        delete frVal.type // [PORT-FIX] neoforge:tag — сбрасываем тип кастомного ингредиента
                        frVal.fluid = options.fluidReplacements[frKey]
                    }
                }
            }
        }

        // Modify amount of item input
        if (options.itemInputs && recipeJson.inputs && recipeJson.inputs.item) {
            for (var key in options.itemInputs) {
                for (var ii = 0; ii < recipeJson.inputs.item.length; ii++) {
                    var ing = getItemIngredient(recipeJson.inputs.item[ii].content)
                    if (ing && ((ing.item && ing.item === key) || (ing.tag && ing.tag === key))) {
                        recipeJson.inputs.item[ii].content.count = options.itemInputs[key]
                    }
                }
            }
        }

        // Modify amount of fluid input
        if (options.fluidInputs && recipeJson.inputs && recipeJson.inputs.fluid) {
            for (var fkey in options.fluidInputs) {
                for (var fi = 0; fi < recipeJson.inputs.fluid.length; fi++) {
                    var vals = getFluidValues(recipeJson.inputs.fluid[fi].content)
                    var val = vals.length > 0 ? vals[0] : null
                    if (val && ((val.fluid && val.fluid === fkey) || (val.tag && val.tag === fkey))) {
                        recipeJson.inputs.fluid[fi].content.amount = options.fluidInputs[fkey]
                    }
                }
            }
        }

        // Modify amount of item output
        // [PORT-FIX] Выходы в GT8 — тоже SizedIngredient ({ ingredient: {item}, count })
        if (options.itemOutputs && recipeJson.outputs && recipeJson.outputs.item) {
            for (var okey in options.itemOutputs) {
                for (var oi2 = 0; oi2 < recipeJson.outputs.item.length; oi2++) {
                    var outIng2 = getItemIngredient(recipeJson.outputs.item[oi2].content) || recipeJson.outputs.item[oi2].content
                    if ((outIng2.item && outIng2.item === okey) || (outIng2.id && outIng2.id === okey)) {
                        recipeJson.outputs.item[oi2].content.count = options.itemOutputs[okey]
                    }
                }
            }
        }

        // Modify amount of fluid output
        if (options.fluidOutputs && recipeJson.outputs && recipeJson.outputs.fluid) {
            for (var fokey in options.fluidOutputs) {
                for (var fo = 0; fo < recipeJson.outputs.fluid.length; fo++) {
                    var outVals = getFluidValues(recipeJson.outputs.fluid[fo].content)
                    var outVal = outVals.length > 0 ? outVals[0] : null
                    if (outVal && ((outVal.fluid && outVal.fluid === fokey) || (outVal.id && outVal.id === fokey))) {
                        recipeJson.outputs.fluid[fo].content.amount = options.fluidOutputs[fokey]
                    }
                }
            }
        }

        javaRecipe.remove()

        var newRecipe = event.recipes.gtceu[machineName](newId)
            .duration(recipeJson.duration)
            .EUt(euContent)

        // Rebuild item inputs
        if (recipeJson.inputs && recipeJson.inputs.item) {
            for (var ii2 = 0; ii2 < recipeJson.inputs.item.length; ii2++) {
                var ing2 = getItemIngredient(recipeJson.inputs.item[ii2].content)
                var count = recipeJson.inputs.item[ii2].content.count || 1
                if (ing2 && typeof ing2 === "object" && "tag" in ing2) {
                    newRecipe.itemInputs(`${count}x #${ing2.tag}`)
                } else if (ing2 && typeof ing2 === "object" && "item" in ing2) {
                    newRecipe.itemInputs(Item.of(ing2.item, count))
                } else if (ing2 && ing2.type === "gtceu:circuit") {
                    newRecipe.circuit(ing2.configuration !== undefined ? ing2.configuration : recipeJson.inputs.item[ii2].content.configuration)
                } else if (ing2) {
                    console.warn(`[Gregnautics] modifyRecipe ${recipeId}: unsupported item ingredient ${JSON.stringify(ing2)} — skipped`)
                }
            }
        }

        // Rebuild fluid inputs
        if (recipeJson.inputs && recipeJson.inputs.fluid) {
            for (var fi2 = 0; fi2 < recipeJson.inputs.fluid.length; fi2++) {
                var fVals = getFluidValues(recipeJson.inputs.fluid[fi2].content)
                var fluidVal = fVals.length > 0 ? fVals[0] : null
                var amount = recipeJson.inputs.fluid[fi2].content.amount
                if (fluidVal && fluidVal.fluid) {
                    newRecipe.inputFluids(Fluid.of(fluidVal.fluid, amount))
                } else if (fluidVal && fluidVal.tag) {
                    // NOTE: хак из 1.20 — GT-теги вида c:xxx маппим на флюид gtceu:xxx
                    newRecipe.inputFluids(Fluid.of(`gtceu:${fluidVal.tag.split(":")[1]}`, amount))
                }
            }
        }

        // Rebuild item outputs
        if (recipeJson.outputs && recipeJson.outputs.item) {
            for (var oi = 0; oi < recipeJson.outputs.item.length; oi++) {
                var outIng = getItemIngredient(recipeJson.outputs.item[oi].content) || recipeJson.outputs.item[oi].content
                var outCount = recipeJson.outputs.item[oi].content.count || 1
                if (outIng && typeof outIng === "object" && "item" in outIng) {
                    newRecipe.itemOutputs(Item.of(outIng.item, outCount))
                } else if (outIng && typeof outIng === "object" && "id" in outIng) {
                    newRecipe.itemOutputs(Item.of(outIng.id, outCount))
                }
            }
        }

        // Rebuild fluid outputs
        if (recipeJson.outputs && recipeJson.outputs.fluid) {
            for (var fo2 = 0; fo2 < recipeJson.outputs.fluid.length; fo2++) {
                var foVals = getFluidValues(recipeJson.outputs.fluid[fo2].content)
                var fluidOutVal = foVals.length > 0 ? foVals[0] : null
                var outAmount = recipeJson.outputs.fluid[fo2].content.amount
                if (fluidOutVal && fluidOutVal.fluid) {
                    newRecipe.outputFluids(Fluid.of(fluidOutVal.fluid, outAmount))
                } else if (fluidOutVal && fluidOutVal.tag) {
                    newRecipe.outputFluids(Fluid.of(`gtceu:${fluidOutVal.tag.split(":")[1]}`, outAmount))
                }
            }
        }

        // Recipe conditions
        // [PORT-FIX] cleanroom и прочие условия ставим ДО research (upstream NPE GTCEu#5106)
        if (recipeJson.recipeConditions) {
            for (var ci = 0; ci < recipeJson.recipeConditions.length; ci++) {
                var cond = recipeJson.recipeConditions[ci]
                if (cond.type === "cleanroom") {
                    var crName = cond.cleanroom || (cond.data ? cond.data.cleanroom : null)
                    if (crName) newRecipe.cleanroom(CleanroomType[String(crName).toUpperCase()])
                } else if (cond.type === "blastFurnaceTemp" || cond.type === "blast_furnace_temp") {
                    newRecipe.blastFurnaceTemp(recipeJson.blastFurnaceTemp || cond.temperature || (cond.data ? cond.data.temperature : 0))
                }
            }
            for (var ci2 = 0; ci2 < recipeJson.recipeConditions.length; ci2++) {
                var condR = recipeJson.recipeConditions[ci2]
                if (condR.type === "research" && condR.research && condR.research.length > 0) {
                    var research = condR.research[0]
                    var dataItemId = research.dataItem && research.dataItem.id ? research.dataItem.id : research.dataItem
                    newRecipe.researchWithoutRecipe(research.researchId, dataItemId)
                }
            }
        }

        // Temperature via data.ebf_temp — only applied if not recipeConditions
        if (recipeJson.blastFurnaceTemp && (!recipeJson.recipeConditions || !recipeJson.recipeConditions.some(function(c) { return c.type === "blastFurnaceTemp" || c.type === "blast_furnace_temp" }))) {
            newRecipe.blastFurnaceTemp(recipeJson.blastFurnaceTemp)
        }
    }
}
