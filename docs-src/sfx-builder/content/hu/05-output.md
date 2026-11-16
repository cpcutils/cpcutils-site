# Kimenet

A **Kimenet** lap határozza meg a generált futtatható állomány (.exe) paramétereit, beleértve a célkönyvtárat, a kimeneti fájlnevet, a tömörítési szintet és a vizuális megjelenést (ikon).

![A Kimenet lap](../assets/img/hu/05-output.png)

## Kimeneti paraméterek

| Mező | Leírás |
|---|---|
| **Kimeneti mappa** | A generált futtatható állomány célkönyvtára. |
| **Fájlnév** | A futtatható állomány neve kiterjesztés nélkül. Például: `Telepites_v1`. |
| **Tömörítési szint** | A tömörítési arány meghatározása. A választható értékek: **0**, **1**, **3**, **5**, **7** és **9** (0 = tömörítés nélküli tárolás, 9 = maximális tömörítés). Meglévő archívum újracsomagolásakor a szint rögzített **5**. |
| **Felülírás, ha létezik** | Konfliktuskezelési stratégia meglévő kimeneti fájlok esetén: **felülírás**, **kihagyás** vagy **átnevezés**. A **rákérdezés** csak akkor választható, ha a stub kérdezhet (varázslós telepítő) – portable csomagnál és varázsló nélküli telepítőnél nem. |
| **SFX ikon** | A generált futtatható állomány ikonja. Megadás hiányában a beépített CPC ikon érvényesül. |

## Ikon szinkronizáció

Az ikon beállítása globálisan szinkronizált a **Forrás** és a **Kimenet** lapokon. Bármelyik mező módosítása ugyanazt a konfigurációs értéket frissíti. Megadás hiányában a rendszer az alapértelmezett CPC ikont alkalmazza.

## A build lépései

1. Válasszon kimeneti mappát.
2. Adjon meg fájlnevet, például `Illesztoprogram_v3`.
3. Válasszon tömörítési szintet. A választható értékek: 0, 1, 3, 5, 7 és 9; kiindulási értékként az 5-ös szint javasolt. A 9-es szint akkor indokolt, ha a kimeneti méret elsőbbséget élvez a build idejével szemben. Meglévő archívum újracsomagolásakor a program mindig 5-ös szintet használ.
4. Állítsa be a **Felülírás, ha létezik** mezőt a munkafolyamat igényei szerint.

A `.exe` kiterjesztés automatikusan hozzáadódik a fájlnévhez. Ha a konfliktuskezelés **Felülírás** értékre van állítva, a rendszer interakció nélkül cseréli a meglévő állományokat. A következetes elnevezési konvenciók, például a verziószámok használata, biztosítják a kimeneti fájlok egyértelmű azonosíthatóságát.
