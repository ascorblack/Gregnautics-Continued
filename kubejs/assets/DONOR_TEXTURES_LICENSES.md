# Лицензии текстур-доноров (kubejs/assets)

Пак публикуется на CurseForge — статус лицензий каждого донора важен.
Дата проверки: 2026-07-15 (лицензии повторно сверены через Modrinth/GitHub API).

| Донор | Версия-источник | Что взято | Куда положено | Лицензия | Редистрибуция |
|---|---|---|---|---|---|
| ~~Ad Astra~~ **(ЗАМЕНЕНО, см. ниже)** | было: ad_astra-forge-1.20.1-1.15.20.jar (Modrinth) | было: 39 текстур блоков планетных пород | `assets/ad_astra/textures/block/` | Terrarium License v1 — **All Rights Reserved** для ассетов | БЛОКЕР СНЯТ 2026-07-15 — оригиналы удалены из пака, см. раздел ниже. |
| Beneath | beneath-1.20.1-1.0.6.jar (Modrinth) | `beneath:block/crackrack.png` | `assets/beneath/textures/block/` | MIT (перепроверено 2026-07-15) | Разрешена (с сохранением уведомления об авторстве). |
| BetterEnd | текстуры из оригинального пака TFG-Modern 0.13.3 (`overrides/kubejs/assets/betterend`), первоисточник — мод BetterEnd (Fabric) | 8 текстур: flavolite и sandy_jadestone (+bricks/polished/tiles) | `assets/betterend/textures/block/` (+ `license.txt`, `credits.txt` сохранены рядом — как в оригинальном TFG) | MIT (Copyright (c) 2020 paulevsGitch, перепроверено 2026-07-15 — github.com/paulevsGitch/BetterEnd/LICENSE) | Разрешена при сохранении текста лицензии — `license.txt` лежит в `assets/betterend/`. |
| TerraFirmaGreg Core-Modern | GitHub TerraFirmaGreg-Team/Core-Modern (ветка dev), мод оригинального пака | `tfg:block/mud_bricks/{alfisol,mollisol,oxisol,podzol}`, `tfg:block/wood/sapling/*`, `tfg:block/wood/stripped_log/*`, `tfg:block/wood/stripped_log_top/*` (araucaria/beech/mahoe) | `assets/tfg/textures/block/` | LGPL-3.0 (перепроверено 2026-07-15 — GitHub LICENSE) | Разрешена (LGPL не ограничивает распространение ассетов, указание источника — хорошая практика; мы форк того же проекта). |
| ArborFirmaCraft (AFC) | afc-2.1.1-1.21.1.jar (мод уже в паке) | копия `afc:block/wood/leaves/dense_leaves/mahoe.png` под именем `mahoet.png` — воркараунд опечатки в модели `afc:models/block/wood/leaves/dense_leaves/mahoe.json` самого мода (ссылается на несуществующую текстуру `mahoet`) | `assets/afc/textures/block/wood/leaves/dense_leaves/mahoet.png` | MIT (перепроверено 2026-07-15 — Modrinth) | Разрешена. Мод и так входит в пак; это alias его собственной текстуры. Можно убрать, когда AFC исправит опечатку. |

## Ad Astra — замена текстур (2026-07-15)

Блокер снят заменой всех 39 текстур `assets/ad_astra/textures/block/*.png` на
**процедурно сгенерированные оригинальные текстуры** (генератор —
`gen_ad_astra_replacements.py`, хранится вне пака у мейнтейнера).

Алгоритм НЕ копирует пиксели донора: из оригинального PNG берётся только
доминирующая цветовая палитра (медиан-cut квантование, 6 цветов), сама текстура
строится с нуля когерентным value-noise (билинейно интерполированная случайная
решётка) + процедурные швы для bricks/chiseled вариантов и диагональные трещины
для cracked-вариантов. Результат — новый набор пикселей в похожей цветовой гамме
("same palette/feel"), не производная работа от текстуры Ad Astra.

- Оригиналы (для справки/отката) сохранены отдельно от пака у мейнтейнера
  (`gregnautics_port/ad_astra_originals/block/`, 39 файлов, НЕ входят
  в overrides/публикацию).
- Замена не требует written permission от Terrarium Earth — новые текстуры не
  являются производной работой оригинала.
- Если позже появится возможность нарисовать текстуры вручную (более высокое
  визуальное качество) — заменить процедурные png на ручные, оставив тот же
  список путей/имён файлов (модели/блокстейты не менялись).

## Итого по рискам

- **Ad Astra — блокер закрыт (2026-07-15)**: все 39 текстур заменены на
  процедурно сгенерированные оригиналы, лицензионных претензий больше нет.
- Остальные доноры (MIT / LGPL-3.0) — свободны для включения в пак, лицензии
  перепроверены 2026-07-15.
