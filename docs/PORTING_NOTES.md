# Заметки о порте (1.20.1 Forge → 1.21.1 NeoForge)

Технический дневник порта **TerraFirmaGreg — Modern 0.13.3** на 1.21.1 NeoForge.
Может пригодиться всем, кто портирует KubeJS-паки на 1.21 / GregTech CEu Modern 8 / TFC 4.

## Методология

Порт делался фазами (Ф0–Ф10) по плану, составленному после полной инвентаризации
оригинала:

| Фаза | Содержание | Статус |
|---|---|---|
| Ф0 | Инструментарий: конвертер датапаков 1.20→1.21 (1992 json + 460 nbt), таблицы ремапов id/тегов | ✅ |
| Ф1 | Константы и утилиты TFG (13 файлов) | ✅ |
| Ф2 | ~326 кастомных материалов GTCEu (57 файлов) | ✅ (потребовала фиксов самого GTM — см. PR) |
| Ф3 | Интеграция TFC ↔ GregTech: теги, рецепты металлов | ✅ |
| Ф4 | Контент экс-TFG-Core (1.20-only мод, воссоздан скриптами): камни, еда, кропы, поддержки, жидкости, 2861 файл ассетов | ✅ |
| Ф5 | Worldgen: 82 рудные жилы + 7 геодов + 49 фичей (руды генерируются только в новых чанках!) | ✅ (без вулканов/структур) |
| Ф6 | 31 папка интеграций сторонних модов (~68 файлов server-скриптов) | ✅ |
| Ф7 | Мультиблоки | ✅ (в составе порта машин) |
| Ф8 | TFC Field Guide: 2 категории + 15 статей (EN+RU) | ✅ |
| Ф9 | Квесты: 1194 из 1281, 25 глав, RU+EN | ✅ |
| Ф10 | Космос (Ad Astra → Stellaris) — частично; ComputerCraft возвращён | 🔄 |

Каждая итерация проверялась на выделенном dedicated-сервере до вердикта
«CLEAN: 0 ошибок скриптов, 0 битых рецептов» (в финале — 234/234 скриптов,
23 300+ рецептов). Каждое отступление от оригинала помечено в коде маркерами
`[PORT]` / `[PORT-FIX]` / `[PORT-WORKAROUND]` / `[PORT-Ф*]` — всего ~975 пометок.

## Замены модов

Оригинал — 270 модов, порт — 235: часть модов не существует на 1.21.1.
Ключевые замены:

- **Ad Astra → Stellaris** (+ Create: Stellaris) — планеты, ракеты;
- **TFG-Core** (ядро оригинала, только 1.20) → воссоздан KubeJS-стартапами и датапаком;
- **Create: Aeronautics** — интегрирован как основа воздухоплавания (наследие сборки Gregnautics);
- **ComputerCraft: Tweaked возвращён** (1.120.0 + Advanced Peripherals + CC:C Bridge +
  MoreRed-CCT-Compat) — краш TFC при старте сервера, из-за которого CC исключался,
  на текущих версиях не воспроизводится (проверено на выделенном тестовом сервере);
- Полный список модов: [MODLIST.md](MODLIST.md).

## Найденные баги апстрима (исправлены, отправлены PR)

| Мод | Баг | PR |
|---|---|---|
| GregTech CEu Modern | Материалы KubeJS с неймспейсом не-мода теряют регистрацию блоков → краш «Some intrusive holders were not registered» (регистрейт-листенер подписывается во время диспатча событий) | [#5111](https://github.com/GregTechCEu/GregTech-Modern/pull/5111) |
| GregTech CEu Modern | NPE при `.stationResearch()` без предшествующих условий рецепта | [#5109](https://github.com/GregTechCEu/GregTech-Modern/pull/5109), [issue #5106](https://github.com/GregTechCEu/GregTech-Modern/issues/5106) |
| GregTech CEu Modern | Краш клиента: CategoryIcon обращается к JEI-runtime во время регистрации | [#5115](https://github.com/GregTechCEu/GregTech-Modern/pull/5115) |
| KubeJS TFC | Билдер листвы несовместим с TFC 4.2.4+ (NoSuchMethodError) | [#41](https://github.com/Notenoughmail/KubeJS-TFC/pull/41) |

До принятия PR в сборке используются патченные jar (исходники: форки
[GregTech-Modern](https://github.com/ascorblack/GregTech-Modern) и
[KubeJS-TFC](https://github.com/ascorblack/KubeJS-TFC), лицензии LGPL-3.0/MIT соблюдены).

## Дорого добытые факты об API (KubeJS 7 / GTM 8 / TFC 4 / NeoForge 1.21)

Собраны в процессе порта — возможно, сэкономят кому-то дни отладки.

### KubeJS 7 / Rhino
- Server-скрипты **делят top-level scope** — имена `const` должны быть уникальны глобально по всем файлам.
- `global` нельзя присваивать из client/server-скриптов — только из startup.
- `Java.loadClass` — только на верхнем уровне файла; внутри функций Rhino бросает «redeclaration of var».
- `const`/`let` во вложенном блоке → «redeclaration of var»; использовать `var`.
- GT-классы (`GTToolType.*` и т.п.) нельзя трогать на верхнем уровне startup-скрипта (ExceptionInInitializerError) — оборачивать в `StartupEvents.postInit()`.
- JS-объект маппится в Java-**класс** по bean-полям, а в **record** — по codec-ключам.
- Rhino не выбирает перегрузку, если аргумент реализует несколько интерфейсов; `obj['method(sig)']`-синтаксис не поддерживается; `java.lang.reflect` заблокирован.

### GregTech CEu Modern 8
- Реестр материалов — ванильный `Registry` (`gtceu:material`); `GTRegistries.MATERIALS` — Iterable.
- `GTMaterials.get('x')` без неймспейса резолвится в `minecraft:` — нужен `'gtceu:x'`.
- KubeJS-материалы регистрировать только с явным неймспейсом.
- `chancedOutput` — только 2-аргументный (tierBoost удалён); тег-выходы в нём невалидны.
- Теги инструментов `c:tools/*` — в **единственном** числе (`mining_hammer`, не `mining_hammers`).
- Переименования: `Limonite`→`Goethite`, `GraniteRed`→`RedGranite`, `oil_heavy`→`heavy_oil`, `uranium_dust`→`uranium_238_dust`; sheets→plates.
- `blastTemp(t,tier,eut,dur)` → `blastTemp(int)` / `blast(int, GasTier)`.

### TFC 4 / KubeJS TFC 2.0
- Data-события принимают кодек-объекты: `event.heat({ingredient, heat_capacity, ...})`.
- `TFC.ingredient.blockIngredient` — только реальные Block-объекты, не строки.
- `damage_inputs_*_crafting` удалён — урон инструментов через авто-remainder.
- Переименования тегов: `tfc:foods/flour`→`c:foods/flour`, `c:sand`→`c:sands`, `c:glass`→`c:glass_blocks` и т.д.

### NeoForge / 1.21 кодеки
- Результат рецепта — `{id: ...}`, не `{item: ...}`; NBT → data components.
- **NeoForge подставляет `minecraft:barrier` в пустые теги** — ломает наивные проверки на пустоту.
- Create-схемы: тег-ингредиент — plain-объект `{tag: 'ns:path'}`; голая строка `'#тег'` парсится как fluid-тег; пустой тег валит рецепт при сериализации.
- Шансовые выходы Create: plain-объект `{id, count, chance}`.

### Прочее
- KubeJS-модели: `texture(String)` заполняет только baseTexture — для шаблонов с `#texture`-ключом нужен `.texture(['texture'], path)`.
- KubeJS-жидкости без своих текстур: `.customStill()` отключает tint — использовать `.color()`.
- Ассеты GTCEu нельзя подкладывать частично — обрушивают динамическую генерацию ресурсов (чистить `dynamic-resource-pack-cache`).

## Известные ограничения порта

- Космо-контент (руды планет, скафандры, теплицы) переезжает на Stellaris — частично в работе;
- поставленные в мир повозки TFC Astikor Carts пород AFC могут быть без текстур (рантайм-композитинг скинов самого мода; иконки и названия исправлены 315 моделями-оверрайдами);
- вулканы и lithostitched-структуры оригинала не перенесены (нет блоков/модов);
- ~60 предупреждений в логе — битые 1.20-рецепты внутри сторонних модов (woodencog и др.), на игру не влияют;
- квесты: 87 удалены (моды отсутствуют на 1.21), часть космических — временно чекмарки.
