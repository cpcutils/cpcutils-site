# Profilok

A profilok egyetlen JSON fájlban tárolják a projekt összes konfigurációját, amely lehetővé teszi a munkafolyamatok megőrzését és több projekt párhuzamos kezelését. A legördülő menüből kiválasztott profil azonnal visszaállítja a hozzá tartozó konfigurációt.

## Profilok tárolási helye

A profilok az alkalmazás gyökérkönyvtárában található `profiles\` mappában kerülnek mentésre. Indításkor a program a `_base.json` alap-sablont tölti be: ez üres projektet ad, nem jelenik meg a profil-listában, és nem lehet rámenteni. Az alkalmazás mappájának áthelyezése más meghajtókra vagy munkaállomásokra nem okoz adatvesztést, biztosítva a szoftver teljes hordozhatóságát.

## Profilkezelés (Mentés, Átnevezés, Betöltés)

A **Mentés** az aktuális konfigurációt írja az aktív profilba. A **Mentés** melletti nyíl kiválasztásával a **Mentés másként...** lehetőség érhető el, amely új néven tárolja a jelenlegi konfigurációt. Az **Új profil** (plusz ikon) funkció inicializál egy mentési párbeszédablakot, `new.json` fájlnévvel; mentés után ez lesz az aktív profil. A **JSON...** korábban mentett `.json` profil betöltését végzi.

| Művelet | Eredmény |
|---|---|
| **Mentés** | Az aktuális konfigurációt az aktív profilba írja. |
| **Mentés** melletti nyíl → **Mentés másként...** | Új fájlnéven tárolja az aktuális konfigurációt. |
| **Új profil** (plusz ikon) | Mentési párbeszédablakot nyit `new.json` fájlnévvel; a mentett fájl lesz az aktív profil. |
| **JSON...** | Meglévő `.json` profil betöltése lemezről. |
| **Új projekt** (↺ ikon) | A `_base.json`-t tölti be: minden mező üres lesz, a build napló és a forrás-lista törlődik. A mentett profil változatlan marad. |
| Piros törlés ikon (X) a profil menüben | Megerősítés után törli a kiválasztott profilt. |

## Visszaállítás, törlés és nem mentett módosítások

A visszaállítás (↺ ikon, Ctrl+R) a `_base.json`-t tölti be: minden mező alapértékre áll, a build napló és a forrás-lista kiürül, és az aktív profil lekerül. A mentett profilfájlt nem módosítja, és a művelet előtt megerősítést kér. Utána a fejlécben **Új projekt** áll, a mentés pedig a **Mentés másként** párbeszédet nyitja – így a korábbi profil nem íródhat felül. A művelet végén a program a **Forrás** lapra vált, és a kurzor a forrás mezőbe kerül. Profil törléséhez a profil legördülő menüjében a piros törlés ikon (X) választható ki; a rendszer a végrehajtás előtt biztonsági megerősítést kér. Ha a program nem mentett módosításokkal zárul be, három lehetőség áll rendelkezésre: mentés és kilépés, kilépés mentés nélkül, vagy maradás.

A profilban tárolt jelszavak Windows DPAPI titkosítással védettek. Ezek az adatok a JSON fájlból egyszerű szövegként nem nyerhetők vissza.

![A profil legördülő menü és mentési vezérlők a felső sávban](../assets/img/hu/03-profiles.png)
