# Futtatás

A **Futtatás** lap a kicsomagolást követő végrehajtási szekvenciát konfigurálja, beleértve az elsődleges programok és szkriptek indítását, vagy a folyamat végét jelző értesítések megjelenítését.

![A Futtatás lap](../assets/img/hu/07-run.png)

## Futtatási paraméterek

| Mező | Leírás |
|---|---|
| **Futtatandó program** | A kicsomagolás után automatikusan elinduló elsődleges futtatható állomány. |
| **Paraméterek** | A futtatható állománynak átadott parancssori argumentumok, például `/S /L=1038`. |
| **Befejezési üzenet** | Opcionális párbeszédpanel, amely a végrehajtás befejezésekor jelenik meg, például `A telepítés kész.` Csak akkor érvényes, ha a stub kérdezhet: varázslós telepítő esetén. Portable csomagnál és varázsló nélküli telepítőnél a mező nem szerkeszthető. |
| **Kicsomagolás helye** | Hová bontsa ki a csomag a fájlokat: **Ideiglenes mappa (Temp)** (alapértelmezés), **LocalAppData**, **AppData (Roaming)**, **ProgramData** vagy **SFX-csomag mappája**. A mező a feloldott útvonalat mutatja. Részletek: [Kicsomagolás helye](#kicsomagolás-helye). |
| **Ideiglenes fájlok törlése futtatás után** | A program lefutása után törli a kicsomagolt fájlokat. A kicsomagolás helyét nem befolyásolja. |
| **Ideiglenes fájlok és indító exe törlése futtatás után** | A program lefutása után törli a kicsomagolt fájlokat és a szülő indító végrehajtható fájlt is. A két kapcsoló kizárja egymást. |

## Megjelenés és láthatóság

A **Csomag megjelenése** beállítás a **Jelszó** lapon található: portable csomagnál **Folyamatjelző** vagy **Csendes (nincs ablak)** választható. Ha a telepítő varázslóval készül, a mező nem szerkeszthető, mert a varázsló mindenképp interaktív. Varázsló nélküli (csendes) telepítőnél a beállítás ugyanúgy érvényes, mint portable csomagnál.

| Elem | Folyamatjelző | Csendes (nincs ablak) | Telepítő varázslóval |
|---|---|---|---|
| Indítóképernyő | van | nincs | van |
| Folyamatjelző sáv | van | nincs | van |
| Jelszó-kérdés induláskor | kérdez | nem kérdez | kérdez |
| Befejezési üzenet | nincs | nincs | van |
| Hibaablak | van | van (5 másodperc után magától bezárul) | van |

A hibaablak szándékosan csendes módban is megjelenik: ha a csomag nem tud kicsomagolni, a felhasználónak látnia kell az okot.

Free licenccel az indítóképernyő és a folyamatjelző sáv nem kapcsolható ki – a márkázás miatt minden módban megjelenik. A teljesen csendes csomag **Pro** licencet igényel.

A két ablak sorban követi egymást: az indítóképernyő előbb lefut (a beállított minimum ideig), és csak utána jelenik meg a folyamatjelző sáv, amikor a kicsomagolás elkezdődik.

![A folyamatjelző sáv kicsomagolás közben](../assets/img/hu/07-run-progress.png)

## Kicsomagolás helye

A **Kicsomagolás helye** mező dönti el, hová bontja ki a csomag a fájlokat. A mezőben mindig a feloldott útvonal látható, a legördülő lista pedig a választható helyeket adja.

| Választás | Kicsomagolási mappa |
|---|---|
| **Ideiglenes mappa (Temp)** | `%TEMP%\cpc-sfx-<folyamat>-<idő>\<terméknév>\` – a program innen indul, és futtatás után a teljes mappa törölhető |
| **LocalAppData** | `%LOCALAPPDATA%\<terméknév>\` |
| **AppData (Roaming)** | `%APPDATA%\<terméknév>\` |
| **ProgramData** | `%ProgramData%\<terméknév>\` |
| **SFX-csomag mappája** | a csomag mellett létrehozott `<terméknév>\` mappa |

A kicsomagolási mappa neve mindig a terméknév, hogy a felhasználó könnyen megtalálja. A nem temp helyeken a builder egy rejtett `.cpc-sfx` jelölőfájlt hoz létre: a törlés csak akkor hajtódik végre, ha ez a jelölő jelen van, így a csomag nem törölhet el egy idegen mappát.

> A **Kicsomagolás helye** és a törlés két külön dolog. A hely megadja, hová kerülnek a fájlok; a két kapcsoló csak azt szabályozza, hogy futtatás után törlődjenek-e.

## Fő futtatható állomány konfigurálása

1. A **Futtatás** lapon nyissa meg a **Futtatandó program** melletti listát.
2. Válasszon egy fájlt a csomagból. A lista a forrásban található futtatható állományokat és szkripteket tartalmazza.
3. Adjon meg paramétereket, ha a futtatható állomány igényli.
4. Adjon meg befejezési üzenetet (telepítő módban), ha befejezési értesítés szükséges.

## A lista használata

A **Futtatandó program**, a **Futtatás telepítés után** és az **Előkészítő fájlok** mezőnél ugyanaz a választó nyílik meg, és a lista a forrás **teljes** futtatható állomány-készletét tartalmazza (nincs darabszám-korlát).

- **Sorrend:** a lista a gyökérkönyvtár fájljaival kezdődik, utána a mappák következnek ábécé-sorrendben.
- **Megjelenítés:** a mappa neve a fájlnév előtt áll, például `Sysinternals\autoruns64.exe`; a kiválasztott érték a csomagban érvényes relatív út.
- **Keresés:** gépelje be a lista nyitott állapotában a szűrő szöveget – a szűrő a mappa nevére is illeszkedik. A fejléc bal oldala a beírt szöveget, jobb oldala a `találatok / összes` arányt mutatja; a **Backspace** törli az utolsó karaktert.
- **Billentyűk:** ↑ / ↓ (sor), PgUp / PgDn (oldal), Home / End (a lista eleje és vége), **Enter** (kiválasztás), **Esc** (bezárás).
- **Előkészítő fájlok:** a **Szóköz** pipázza ki és be a kijelölést, a lista közben nyitva marad. A kijelölés **sorrendje** egyben a futtatás sorrendje. A lista első sora, a **- nincs -**, minden kijelölést töröl.
- **Nincs találat:** ha a szűrőre nincs találat, a lista üres; az **Esc** gombbal léphet ki.

## Futtatható állományokra vonatkozó követelmények

- A célfájlnak a csomag gyökérkönyvtárában vagy relatív alkönyvtárában kell elhelyezkednie. Abszolút útvonalak és könyvtárváltó (`..`) hivatkozások használata tilos.
- A fájltípusnak futtathatónak kell lennie: .exe, .com, .bat, .cmd, .vbs, .ps1 vagy .msi.
- Hiányzó futtatható állomány esetén a build fatális hibával megszakad.
- Ha a **Futtatandó program** üres, a build nem indul el: egy ilyen csomag indítás után semmit nem tenne, és a felhasználó nem látna semmilyen visszajelzést. Portable módban ez alól nincs kivétel.

## Előkészítő fájlok

Az előkészítő fájlok (`.cmd`, `.exe`, `.reg`) a kicsomagolás után, az elsődleges program indítása előtt, szekvenciálisan futnak le. Ez a funkció rendszerleíró adatbázis módosítására, környezet előkészítésére vagy függőségek telepítésére szolgál. A hivatkozott fájloknak a forráskönyvtárban kell lenniük az automatikus csomagoláshoz.

> Portable módban a **Futtatandó program** megadása kötelező, csak kicsomagoló csomag nem állítható elő. Telepítő módban a varázsló adja a visszajelzést, ott a **Befejezési üzenet** mező kitölthető.
