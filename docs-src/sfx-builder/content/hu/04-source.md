# Forrás

A **Forrás** lap a becsomagolandó bemenet kiválasztására és ellenőrzésére szolgál. A szoftver helyi könyvtárat és meglévő archívumot egyaránt elfogad; a kiválasztás után a tartalom automatikusan beolvasódik, és a fájllista a csomagolás előtti állapotot mutatja. Ugyanezen a lapon a forrás közvetlenül szerkeszthető is: fájl és mappa nevezhető át, törölhető, illetve új mappa hozható létre – akár egy archívumon belül.

## Forrás típusa és útvonala

A lap tetején a kétállású kapcsoló választja ki a forrás módját: **Archívum** vagy **Mappa**. A **Tallóz** gomb viszi a megfelelő párbeszédablakot, az útvonal a kapcsoló alatti mezőben jelenik meg.

- **Archívum:** a bemenet egy meglévő tömörített állomány. A tallózó alapból az `_original` mappában nyílik, és a támogatott formátumokra szűr.
- **Mappa:** a bemenet egy kibontott programkönyvtár; ekkor a teljes mappaszerkezet kerül a csomagba.

A kapcsoló átállítása a listát is frissíti: ha a korábban megadott útvonal nem felel meg az új típusnak, a lista kiürül, és új útvonalat kell választani.

## Konfigurációs paraméterek

| Mező | Leírás |
|---|---|
| **Archívum** / **Mappa** | A becsomagolandó archívum vagy könyvtár útvonala. Kézzel is beírható, de a tallózó a biztonságosabb. |
| **Program neve** | A csomag neve és az alapértelmezett kimeneti fájlnév. A rendszer a forrásból automatikusan kitölti (a mappa neve, illetve az archívum neve kiterjesztés nélkül); ha a nevet kézzel átírtad, a további forrásváltás már nem írja felül. |
| **Ikon (.ico)** | A kész `.exe` ikonja. Ugyanaz a beállítás, mint a **Kimenet** lap **SFX ikon** mezője; megadás nélkül a beépített CPC ikon érvényesül. |

A kicsomagolás után indítandó programot a **Futtatás** lapon kell megadni, a csomag tartalmának jelszavát pedig a **Jelszó** lapon.

## Támogatott formátumok

A szoftver a következő formátumokat olvassa: 7z, zip, rar, tar, gz, bz2, xz, cab és iso. A listázás a mellékelt 7-Zippel történik, ezért a fájlnevek ékezetei és a hosszú útvonalak is helyesen jelennek meg.

Titkosított forrásarchívumnál a program a beolvasás előtt jelszót kér. A jelszó a munkamenethez kötődik: új forrás kiválasztásakor törlődik, így egy másik archívum nem örökli az előző jelszavát.

## A fájllista

A lista nem lapos felsorolás, hanem a 7-Ziphez hasonló mappanézet: mindig az aktuális szint közvetlen elemeit mutatja. A mappák egy sorba vannak vonva (a méret-oszlopban az alattuk lévő fájlok összmérete, a darabszám pedig a sor jobb oldalán látszik), a fájlok külön sorban jelennek meg.

| Elem | Jelentés |
|---|---|
| **Állapot** | ✓ rendben · ! a mentett állapothoz képest változott · + új elem. A forrásból eltűnt elem nem jelenik meg a listán. |
| **Fájl** | Az elem neve az aktuális szinten. |
| **Méret** | A fájl mérete, illetve mappánál az alatta lévő fájlok összmérete. |
| **Dátum** | A forrásban tárolt módosítási idő. |

A fejléc oszlopaira kattintva a lista rendezhető: **Fájl**, **Méret** vagy **Dátum** szerint, újabb kattintásra fordított irányban. A kis háromszög az aktív oszlopot jelöli. A mappák mindig elöl maradnak, a fájlok között pedig a választott szempont szerint rendeződik a lista.

A fejléc feletti morzsamenü (breadcrumb) mutatja, hol jársz: `Forrás > Alpha > Sub`. Bármelyik szegmensre kattintva visszaugorhatsz a megfelelő szintre.

A lista alján összesítő sor áll: hány fájl van a forrásban, mekkora az összméret, hány elem változott, és hány elem van kijelölve.

Üres mappa is megjelenik a listában (0 KB, 0 elem). Ezekbe be lehet lépni, átnevezhetők és törölhetők – tehát az újonnan létrehozott mappa azonnal látszik és kezelhető.

A kijelölt elem útvonala `Ctrl + C`-vel a vágólapra másolható.

## Navigáció

| Művelet | Hatás |
|---|---|
| Dupla kattintás mappasoron | belépés a mappába |
| Enter | belépés a kijelölt mappába |
| `..` sor | egy szinttel feljebb |
| Backspace | egy szinttel feljebb |
| Kattintás a morzsamenüre | ugrás a megfelelő szintre |
| Görgetősáv, egérgörgő, PgUp, PgDn, Home, End | mozgás a listában |

A lista fölötti és alatti terület, valamint a görgetősáv a hosszú listáknál is stabilan kezelhető: a görgető húzható, a sávjára kattintva pedig oldalanként lép.

## Kijelölés

A lista egyszerre több elem kijelölését is támogatja, a hagyományos fájlkezelők mintájára.

| Művelet | Hatás |
|---|---|
| Kattintás egy sorra | csak azt az elemet jelöli ki |
| Ctrl + kattintás | az elem hozzáadása a kijelöléshez, illetve kivétele abból |
| Shift + kattintás | az elsőként kijelölt elemtől a kattintott elemig terjedő tartomány |
| Ctrl + A | az aktuális mappa összes sora |
| Kattintás a lista üres területére | a kijelölés megszűnik |
| Nyilak, Home, End, PgUp, PgDn | egy elem mozgatása, a kijelölés az adott elemre szűkül |
| Shift + nyíl | a kijelölés bővítése a kiindulási elemtől |

Több kijelölt elem esetén a lábléc darabszámot mutat („N kijelölve”), a fókusz sorát pedig egy keskeny jelzősáv különbözteti meg a többi kijelölttől.

## Gépeléses ugrás

Ha a lista aktív, a betűk begépelésével a megfelelő névhez ugorhatsz. Az első leütött betű az első ilyen kezdetű elemre viszi a kijelölést, ugyanazon betű ismételt leütése pedig a következő találatra lép, körbeforgással. Több különböző betű begépelése egyre pontosabb kezdetet ad (például az „op” az `opera.exe` fájlra visz). Az ugrás a kis- és nagybetűt, valamint az ékezeteket nem különbözteti meg, egy másodperc szünet után pedig új kezdetet indít. A lista tartalma nem változik, ez kizárólag navigáció.

## Fájlok hozzáadása behúzással

A Forrás listára az Intézőből fájlok és mappák húzhatók. Ilyenkor a kurzor jelzi, hogy a forrás fogadja-e a műveletet.

- Archívum forrásnál a program a behúzott fájlokat ideiglenes mappába másolja, majd egyetlen 7-Zip művelettel az archívumhoz fűzi. A meglévő tartalom nem tömörítődik újra, ezért nagy archívumnál is gyors marad.
- Mappa forrásnál a fájlok a mappába másolódnak, a meglévő azonos nevű elemek felülíródhatnak.
- A művelet előtt megerősítő kérdés jelenik meg a fájlszámmal és a felülírások számával. A művelet nem visszavonható.
- Másolás közben a fejléc állapotsora mutatja a haladást; az ablak közben használható marad.
- Írásvédett formátum (például rar, cab, iso) esetén a behúzás nem indul el, a kurzor tiltást jelez.

## Jobb gombos menü

A forrás-listán a jobb egérgomb a kijelölt elemen műveleti menüt nyit. Ha a kurzor olyan sorra mutat, amely még nincs kijelölve, a menü előbb kijelöli azt.

| Menüpont | Billentyű | Mit tesz |
|---|---|---|
| Megnyitás | Enter | Belépés a mappába (csak mappánál aktív) |
| Átnevezés | F2 | Az elem átnevezése a forrásban (egy elem, az Explorer mintájára) |
| Törlés | Del | A kijelölt elemek törlése a forrásból, megerősítés után |
| Mappa létrehozása | F7 | Új mappa az aktuális szinten |

## Átnevezés és új mappa

Az átnevezés és az új mappa is az aktuális szinten történik, tehát egy almappában indítva az elem az almappába kerül. A név ellenőrzésen esik át: nem lehet üres, nem tartalmazhatja a `\ / : * ? " < > |` karaktereket, nem végződhet ponttal vagy szóközzel, és nem ütközhet a mappában már meglévő névvel – ütközés esetén a program nem indít semmit, hanem hibaüzenetet ad.

Archívum forrásnál a művelet az archívumon belül történik, a fájlok nem kerülnek ki a lemezre. Mappa átnevezésekor annak teljes tartalma együtt mozdul.

## Törlés

A `Del` a kijelölt elemeket törli a forrásból. Több elemnél egyetlen megerősítő kérdés jelenik meg, amely legfeljebb öt nevet sorol fel, utána pedig az összesített darabszámot mutatja. Archívum forrásnál a törlés egyetlen művelettel történik, a mappák a tartalmukkal együtt tűnnek el. A művelet nem visszavonható.

## Melyik formátum szerkeszthető

A szerkesztés a mellékelt 7-Zippel történik, ezért az írható formátumok követik azt, amibe a 7-Zip maga is tud írni:

| Formátum | Átnevezés | Törlés | Új mappa |
|---|---|---|---|
| 7z, zip, tar | igen | igen | igen |
| SFX `.exe` (7z vagy zip alapú) | igen | igen | igen |
| gz, tgz, bz2, tbz, xz, txz | igen | nem | nem |
| rar, cab, iso | nem | nem | nem |

A RAR, CAB és ISO írásvédett: a 7-Zip listázni és kicsomagolni tudja, írni nem (a RAR zárt formátum). Ezeknél a program a művelet előtt üzenetet ad, nem 7-Zip hibát. A gz/bz2/xz egyszálas tömörítés: csak a benne tárolt név változtatható.

![A Forrás lap kiválasztott archívummal és a validációs listával](../assets/img/hu/04-source.png)
