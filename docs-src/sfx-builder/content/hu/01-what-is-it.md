# A program célja

**Egyetlen .exe, amely minden szükséges fájlt magában foglal.**

A CPC 7z SFX Builder segítségével fájlokat, mappákat és szoftvereket csomagolhat egyetlen önkicsomagoló futtatható állományba (.exe). A végeredmény egy önálló fájl, amely a célgépen további előkészítés nélkül futtatható.

Az elkészült .exe indításakor a kicsomagolás automatikusan megtörténik, majd a konfigurált főprogram (például egy telepítő vagy egy szkript) magától elindul.

A célgépen nincs szükség előre telepített tömörítőprogramra (például 7-Zip), mert a csomag a kicsomagoláshoz szükséges modult is tartalmazza. Ez jelentősen leegyszerűsíti a fájlok átadását, mivel Önnek csak egyetlen állományt kell futtatnia, elkerülve a bonyolult kicsomagolási lépéseket.

![A főablak](../assets/img/hu/main-window.png)

## Gyakori felhasználási területek

- **WinPE és helyreállítási környezetek:** diagnosztikai programok, szkriptek és illesztőprogramok (például VMD/RAID) azonnali futtatása olyan indítható, szűkös eszközkészletű (Windows PE) környezetekben, ahol nincs telepített futtatókörnyezet és tömörítőprogram.
- **Szerviztechnikusi és diagnosztikai csomagok:** hordozható segédprogramok gyors egybecsomagolása pendrive-ról futtatható formába, rendszergazdák és szerviztechnikusok számára.
- **Vállalati szoftverterjesztés:** belső vállalati alkalmazások, frissítések és konfigurációs fájlok egységes terjesztése a munkatársak munkaállomásaira, akár csendes (beavatkozás nélküli) üzemmódban.
- **Haladó szintű automatizálás:** egyedi szkriptek, rendszerleíró adatbázis-módosítások és összetett parancssori feladatok csomagolása egyetlen hordozható állományba a gyors végrehajtás érdekében.
- **Ügyféloldali telepítők:** asztali parancsikonnal és a Programok és szolgáltatások listájában eltávolítási bejegyzéssel rendelkező, professzionális megjelenésű telepítők készítése.
- **Egyszerűsített szoftverátadás laikusoknak:** olyan eszközök és illesztőprogramok, amelyek egyetlen kattintással elindíthatók, és minimalizálják az utólagos támogatási igényt.


## A csomag tartalma

- **A fájljai.** Mappa vagy meglévő archívum: 7z, zip, rar, tar, gz, bz2, xz, cab, iso.
- **Név és ikon:** testreszabható megjelenés a professzionális arculat érdekében.
- **Jelszó** (opcionális): AES-256 titkosítás a bizalmas tartalomhoz; a program kicsomagolás előtt kéri be.
- **Futtatandó program**, vagy befejezési üzenet.
- **Célhely** telepítő módban: célmappa, parancsikonok, programeltávolítási lista bejegyzés.

## Hordozható kialakítás

A builder telepítést nem igényel. Másolja a mappát bárhová, indítsa el a `cpcbuilder.exe` fájlt, és a beállítások mellette, a `profiles\` mappában maradnak. Rendszerleíró adatbázisba nem ír, `%APPDATA%`-ba nem ír, eltávolítanivaló nincs.

A csomagkészítéshez nincs szükség internetkapcsolatra. A program csak a licenc aktiválásához és a frissítések ellenőrzéséhez kapcsolódik a hálózatra; internet nélkül a frissítés-ellenőrzés csendben kimarad.

## Free és Pro kiadások

A Free kiadás nem próbaverzió. Teljes értékű csomagokat készít, mindennel, ami fent szerepel, ameddig csak szeretne.

| | Free | Pro |
|---|---|---|
| Csomagok készítése | igen | igen |
| Indítóképernyő | van | nincs |
| Integritás-védelem | mindig bekapcsolva | be- vagy kikapcsolható |
| Frissítés és támogatás | nincs benne | 12 hónap a vásárlástól |

A Pro verzió eltávolítja az indítóképernyőt, és opcionálissá teszi a csomag integritás-védelmét. A licenc nem jár le: a frissítési időszak után a program tovább működik, csak új verziót nem kap. További információ: [Licenc](12-license.html).

## Rendszerkövetelmények

- 64 bites Windows.
- A program melletti `packer\` mappa, benne a `7z.exe` és a `7z.dll` fájlokkal. Telepíteni nem kell semmit.
- A program futtatásához nem kell rendszergazdai jog. A telepítő módban készült csomag rendszergazdai jogot kér a célgépen.

## Az első csomag elkészítése

1. A **Forrás** lapon válassza ki a mappát vagy az archívumot, amit becsomagolna.
2. A **Kimenet** lapon adjon meg fájlnevet, például `Telepites_v1`.
3. Az **Összeállítás** lapon válassza a **Készítés** lehetőséget.

A .exe fájl a kimeneti mappában jelenik meg. Terjesztés előtt tesztelje egy olyan gépen, ahol a forrásfájlok még soha nem voltak ott. Csak ez a próba bizonyítja, hogy minden összetevő benne van.
