# Telepítő mód

A **Telepítő** mód a szabványos SFX archívumot teljes értékű Windows telepítővé alakítja. A folyamat automatizálja az abszolút útvonalakra történő fájlmásolást, a parancsikonok generálását, valamint a Windows szabványos eltávolításához szükséges regisztrációs adatbázis-bejegyzések létrehozását. A mód aktiválása a felső navigációs sávból vezérelhető; engedélyezésével a **Telepítő** konfigurációs lap elérhetővé válik.

## Telepítő mód engedélyezése

1. A felső navigációs sávon válassza a telepítő mód ikonját (a negyedik ikont balról).
2. Nyissa meg a **Telepítő** lapot.
3. Adja meg a **Telepítési mappa** értékét, például `%ProgramFiles%\Termeknev`.
4. Válassza ki a mappához tartozó **Architektúra** értéket.
5. Adja meg a **Parancsikon neve** értéket, és jelölje ki a szükséges parancsikonokat.
6. Az **Összeállítás** lapon válassza a **Készítés** lehetőséget.

## Konfigurációs paraméterek

| Mező | Leírás |
|---|---|
| **Telepítési mappa** | A célkönyvtár abszolút útvonala a célgépen, például `%ProgramFiles%\Termeknev`. |
| **Architektúra** | A `%ProgramFiles%` vagy a `%ProgramFiles(x86)%` érték kiválasztása a telepítési útvonalnak megfelelően. |
| **Parancsikon neve** | Az asztalon és a Start menüben megjelenő felirat. |
| **Asztali parancsikon** | Asztali parancsikon létrehozása. |
| **Start menü parancsikon** | Start menü bejegyzés létrehozása. |
| **Programeltávolítási lista bejegyzés** | A szoftver regisztrálása a Windows rendszerleíró adatbázisában, amely lehetővé teszi a Programok és szolgáltatások felületről történő eltávolítást. |
| **AppId (opcionális)** | Egyedi alkalmazásazonosító. Üresen hagyva a builder automatikusan generál egyet a megadott név alapján: a program neve, aláhúzásjel, majd a név SHA256 lenyomatának első 8 karaktere. |
| **Célmappa bekérése telepítéskor** | Lehetővé teszi a telepítési útvonal módosítását futásidőben. |
| **Futtatás telepítés után** | A fő alkalmazás indítása a telepítés befejezését követően. |

## Telepítővarázsló felület

A **Varázsló indítása telepítéskor (3 lépés)** opció engedélyezése felülírja a csendes kicsomagolást, és egy háromlépéses interaktív felületet biztosít: **Üdvözöljük**, **Telepítési mappa kiválasztása**, **Készen áll a telepítésre**. Varázslóval a csomag mindenképp interaktív, ezért a **Jelszó** lapon a **Csomag megjelenése** nem szerkeszthető, és a **Kimenet** lapon a **Rákérdezés** is elérhetővé válik.

![A Telepítő lap](../assets/img/hu/08-installer.png)

## Futásidejű végrehajtási folyamat

Futtatáskor a telepítő automatikusan jogosultságemelést kér a Windows UAC (User Account Control) rendszerén keresztül. A fájlok másolása és a parancsikonok létrehozása után generálja az eltávolításhoz szükséges bejegyzéseket. A szoftver ezt követően a Programok és szolgáltatások listáján keresztül, vagy a célkönyvtárban létrejövő `Uninstall.exe` meghívásával távolítható el.
