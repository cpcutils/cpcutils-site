# Licenc

Az alkalmazás kétszintű licencelési modellt (Free és Pro) alkalmaz. A Free verzió korlátozásmentes alapfunkciókat biztosít, beleértve a jelszavas védelmet és a kötelező integritás-védelmet; a **Telepítő** mód csak Pro licenccel érhető el. A Pro licenc eltávolítja a generált állományok futásidejű indítóképernyőjét, és opcionálissá teszi a tartalom integritás-validációját.

| | Free | Pro |
|---|---|---|
| Csomagok készítése | igen | igen |
| Telepítő mód (parancsikonok, eltávolítás, UAC) | nem | igen |
| Indítóképernyő a generált csomagban | van | nincs |
| Integritás-védelem | kötelező | konfigurálható |
| Csendes csomag (nincs ablak) | nem | igen |
| Frissítés és technikai támogatás | nincs benne | 12 hónap a vásárlástól |

A Free licenccel készült csomagban az indítóképernyő és a folyamatjelző sáv rögzített: nem kapcsolható ki, mert az indítóképernyő hordozza a márkázást. A csendes (ablak nélküli) csomag ezért Pro licencet igényel.

A Pro licenc örökös. A 12 hónapos szoftverkövetési periódus lejárta után a program megőrzi teljes build-funkcionalitását, de az új szoftververziókhoz és a technikai támogatáshoz való jogosultság megszűnik.

## Pro licenc aktiválása

1. Nyissa meg a **Licenc** lapot.
2. Válassza az **Aktiválás** lehetőséget; a megnyíló kulcs-kezelő varázsló **Licenckulcs** lapján adja meg a vásárláskor kapott kulcsot.
3. A varázslóban válassza az **Aktiválás** lehetőséget.

Az aktiválási folyamat aktív internetkapcsolatot igényel, és kriptográfiailag a munkaállomáson generált helyi gépkulcshoz kötődik. A sikeres szerveroldali hitelesítést követően a kliens véglegesen Pro státuszba lép.

## A Licenc lap adatai

A lap a licenc állapotát és a hozzá tartozó műveleteket mutatja:

| Elem | Jelentése |
|---|---|
| **Licencazonosító** | A licenc egyedi azonosítója. |
| **Kulcsazonosító** | A licenc nyilvános kulcsának első nyolc karaktere (ujjlenyomat). |
| **Licenc** | A használati jogosultság időtartama: határozatlan idejű. |
| **Frissítés és támogatás** | A frissítési és támogatási időszak vége (például `2031. 11. 03-ig`). Ez után a program tovább használható, de új verzió és támogatás már nem jár hozzá. |
| **Aktiválás** / **Megújítás** | Állapotfüggő gomb: aktiválatlan licencnél az aktiváló varázslót nyitja, Pro licencnél a megújítási oldalt a böngészőben. A tipp a frissítési és támogatási időszak megújítását említi. |
| **Exportálás** / **Importálás** | A licenc átvitele jelszóval védett `.cpckey` fájllal (lásd a következő szakaszt). A tippek röviden a műveletet írják le. |

Ha a használt build frissebb, mint a frissítési jogosultság, a lap jelzi, hogy ez a verzió ingyenes módban fut, és az előző verzió marad Pro.

## Offline aktiválás és hibaelhárítás

Az aktiválás minden esetben internetkapcsolatot igényel, külön offline aktiválási eljárás nincs. Olyan munkaállomás esetén, amely nem rendelkezik internet-hozzáféréssel, aktiválja a licencet egy internetkapcsolattal rendelkező gépen, majd vigye át a következő szakaszban leírt exportálási és importálási eljárással.

Ha az aktiválás nem sikerül, jegyezze fel az alkalmazás által megjelenített hibaüzenetet, és küldje el a technikai támogatásnak a licenckulccsal együtt. Gépkódot nem kell beküldeni.

## Licencmigráció (Kulcsátvitel)

A licencallokáció egy lokálisan generált kriptográfiai gépkulcshoz van rendelve. A licenc új munkaállomásra történő átviteléhez – újabb licenchely lefoglalása nélkül – a következő protokoll alkalmazandó:

1. A korábbi munkaállomáson nyissa meg a **Licenc** lapot, és válassza az **Exportálás** lehetőséget.
2. Mentse el a `.cpckey` fájlt, és jegyezze fel a jelszavát. A jelszónak legalább 12 karakter hosszúnak kell lennie.
3. Az új munkaállomáson nyissa meg a **Licenc** lapot, válassza az **Importálás** lehetőséget, és adja meg a fájlt.
4. Adja meg a jelszót.

A `.cpckey` fájl importálása helyreállítja a kliens eredeti kriptográfiai identitását. Ez a folyamat megőrzi az aktiválási állapotot anélkül, hogy újabb licenchelyet foglalna le a szerveren, mivel az import nem hoz létre új gépkulcsot.

![A Licenc lap](../assets/img/hu/12-license.png)
