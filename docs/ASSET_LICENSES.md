# Лицензии заимствованных ассетов (kubejs/assets)

Пак публикуется на CurseForge — статус лицензий каждого донора важен.
Дата проверки: 2026-07-15 (лицензии повторно сверены через Modrinth/GitHub API).

| Донор | Версия-источник | Что взято | Куда положено | Лицензия | Редистрибуция |
|---|---|---|---|---|---|
| ~~Ad Astra~~ **(заменено, см. ниже)** | было: ad_astra-forge-1.20.1-1.15.20.jar (Modrinth) | было: 39 текстур блоков планетных пород | `assets/ad_astra/textures/block/` | Terrarium License v1 — **All Rights Reserved** для ассетов | Блокер снят 2026-07-15 — оригинальные текстуры Ad Astra в пак **не входят**, см. раздел ниже. |
| Beneath | beneath-1.20.1-1.0.6.jar (Modrinth) | `beneath:block/crackrack.png` | `assets/beneath/textures/block/` | MIT (перепроверено 2026-07-15) | Разрешена (с сохранением уведомления об авторстве). |
| BetterEnd | текстуры из оригинального пака TFG-Modern 0.13.3, первоисточник — мод BetterEnd (Fabric) | 8 текстур: flavolite и sandy_jadestone (+bricks/polished/tiles) | `assets/betterend/textures/block/` (+ `license.txt`, `credits.txt` сохранены рядом — как в оригинальном TFG) | MIT (Copyright (c) 2020 paulevsGitch — github.com/paulevsGitch/BetterEnd/LICENSE) | Разрешена при сохранении текста лицензии — `license.txt` лежит в `assets/betterend/`. |
| TerraFirmaGreg Core-Modern | GitHub TerraFirmaGreg-Team/Core-Modern (ветка dev), мод оригинального пака | `tfg:block/mud_bricks/{alfisol,mollisol,oxisol,podzol}`, `tfg:block/wood/sapling/*`, `tfg:block/wood/stripped_log/*`, `tfg:block/wood/stripped_log_top/*` (araucaria/beech/mahoe) | `assets/tfg/textures/block/` | LGPL-3.0 (перепроверено 2026-07-15 — GitHub LICENSE) | Разрешена (LGPL не ограничивает распространение ассетов, указание источника — хорошая практика; сборка — форк того же проекта). |
| ArborFirmaCraft (AFC) | afc-2.1.1-1.21.1.jar (мод уже в паке) | копия `afc:block/wood/leaves/dense_leaves/mahoe.png` под именем `mahoet.png` — воркараунд опечатки в модели самого мода (ссылается на несуществующую текстуру `mahoet`) | `assets/afc/textures/block/wood/leaves/dense_leaves/mahoet.png` | MIT (перепроверено 2026-07-15 — Modrinth) | Разрешена. Мод и так входит в пак; это alias его собственной текстуры. Можно убрать, когда AFC исправит опечатку. |

## Ad Astra — замена текстур (2026-07-15)

Все 39 текстур `assets/ad_astra/textures/block/*.png` заменены на
**процедурно сгенерированные оригинальные текстуры**.

Алгоритм НЕ копирует пиксели донора: из оригинального PNG берётся только
доминирующая цветовая палитра (median-cut квантование, 6 цветов), сама текстура
строится с нуля когерентным value-noise (билинейно интерполированная случайная
решётка) + процедурные швы для bricks/chiseled вариантов и диагональные трещины
для cracked-вариантов. Результат — новый набор пикселей в похожей цветовой гамме,
не производная работа от текстур Ad Astra.

- Оригинальные текстуры Ad Astra в репозиторий и публикацию **не входят**.
- Замена не требует written permission от Terrarium Earth — новые текстуры не
  являются производной работой оригинала.
- Если позже появится возможность нарисовать текстуры вручную — достаточно
  заменить процедурные png, оставив те же пути/имена файлов (модели/блокстейты
  не менялись).

## Итого по рискам

- **Ad Astra — блокер закрыт (2026-07-15)**: все 39 текстур заменены на
  процедурно сгенерированные оригиналы, лицензионных претензий нет.
- Остальные доноры (MIT / LGPL-3.0) — свободны для включения в пак, лицензии
  перепроверены 2026-07-15.

## Патченные моды

До принятия отправленных в апстрим PR сборка использует собственные патченные
jar двух модов (оба LGPL-3.0 / MIT — модификация и распространение разрешены
при раскрытии исходников):

| Мод | Лицензия | Исходники патчей | PR в апстрим |
|---|---|---|---|
| GregTech CEu Modern | LGPL-3.0 | github.com/ascorblack/GregTech-Modern | [#5109](https://github.com/GregTechCEu/GregTech-Modern/pull/5109), [#5111](https://github.com/GregTechCEu/GregTech-Modern/pull/5111), [#5115](https://github.com/GregTechCEu/GregTech-Modern/pull/5115) |
| KubeJS TFC | MIT | github.com/ascorblack/KubeJS-TFC | [#41](https://github.com/Notenoughmail/KubeJS-TFC/pull/41) |
