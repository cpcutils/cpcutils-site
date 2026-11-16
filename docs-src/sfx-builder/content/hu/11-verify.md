# Csomag ellenőrzése

Az **Ellenőrzés** lap az SFX állományok statikus analízisét végzi a telepítés előtt. A funkció a konfiguráció, a tartalom, az indítómodul és a kriptográfiai védelem strukturális integritását auditálja, a kód futtatásának mellőzésével. Ha a vizsgált fájl nem CPC csomag, a lap megállapítja, milyen formátumú, és a beágyazott archívumot is megvizsgálja.

## Validációs folyamat

1. Nyisd meg az **Ellenőrzés** lapot.
2. A **Csomag** mellett válaszd a **Tallóz** lehetőséget, és jelöld ki az elemezni kívánt `.exe` fájlt (archívumot is lehet).
3. Az elemzés automatikusan elindul.

## A sorok felépítése

Minden elemzésnél megjelenik a **Program verzió**, a **Dátum**, a **Méret**, a **SHA256** és a **Típus** sor. Ezután a fájl jellegétől függ, mi látszik:

- CPC csomagnál a **Konfiguráció**, **Tartalom**, **Indítómodul** és **Integritás** komponenssorok, majd az **Eredmény**, alattuk pedig a konfigurációból kinyert fájllista (összesített darabszámmal és legfeljebb hat fájlnévvel).
- Idegen csomagnál az **Eredmény** (`Nem CPC csomag`), majd a **Beágyazott archívum** és a **Tartalom-teszt** sorok.

## A Típus sor

A típus a fájl tényleges tartalmából származik, nem a kiterjesztéséből:

| Érték | Jelentés |
|---|---|
| CPC SFX (7z) | A saját, aláírt csomag |
| 7-Zip SFX (7z) | 7-Zip alapú önkicsomagoló (a tartalom 7z) |
| RAR SFX (rar5 / rar) | WinRAR-alapú önkicsomagoló |
| ZIP SFX (zip) · CAB SFX (cab) | ZIP, illetve CAB tartalmú önkicsomagoló |
| NSIS telepítő (nem SFX) · Inno Setup telepítő | Telepítő, nem önkicsomagoló |
| MSI telepítő (nem SFX) | Windows Installer csomag |
| Sima archívum (7z, rar, zip …) | Nem futtatható állomány, csak archívum |
| Ismeretlen formátum | Semmilyen ismert szignatúra nem található |

A keresés a futtatható állomány szekcióinak végétől indul, ezért az indítómodul belsejében előforduló téves szignatúrák nem zavarják a felismerést.

## Diagnosztikai eredmények

| Komponens | Érvényes állapot | Kivétel állapot |
|---|---|---|
| **Konfiguráció** | Hiteles | Hamis, vagy Nincs aláírás, ha nem tartalmaz aláírást; **Nem igazolható**, ha a csomagot a builder más verziója készítette |
| **Tartalom** | Sértetlen | Módosított, vagy Nincs kötés, ha a tartalom-kötés nem volt engedélyezett |
| **Indítómodul** | Saját CPC | Idegen, azaz az SFX indítómodul nem ebből a builderből származik |
| **Integritás** | Bekapcsolva | Kikapcsolva, vagy Nincs (régi összeállítás) |

## Összesített eredmény

Az **Eredmény** sor a teljes ítéletet mutatja:

| Érték | Mikor jelenik meg |
|---|---|
| **Megfelelt** | Minden komponens rendben |
| **Részleges** | A csomag régi összeállítással készült, vagy a védelmi elemek hiányosak |
| **Hibás** | A tartalom lenyomata nem egyezik, vagy az azonos verzióval készült csomag aláírása nem igazolható |
| **Nem CPC csomag** | Felismert idegen formátum (SFX, telepítő vagy archívum) |
| **Nem csomag** | Semmilyen ismert formátum nem ismerhető fel |

A builder korábbi verziójával készült csomag nem ellenőrizhető ugyanígy: az aláírt értékek köre azóta bővült, ezért ott aláírás-eltérés fordulhat elő. Az ilyen csomag **Részleges** eredményt kap, a **Konfiguráció** sor **Nem igazolható** értéket mutat, és ez nem utal módosításra.

A build utáni jogosulatlan módosítások érvénytelenítik a konfiguráció Ed25519 aláírását és a tartalom SHA256 lenyomatát, ami Hamis vagy Módosított komponensállapotot, illetve Hibás összesített eredményt von maga után. A részletes szabályokat az [Összeállítás](09-build.html) fejezet tartalmazza.

![Az Ellenőrzés lap módosított csomaggal (piros hibaállapot)](../assets/img/hu/11-verify.png)

## Idegen csomag azonosítása

Ha a fájl nem CPC csomag, a program a következő sorokat mutatja:

- **Beágyazott archívum:** a belső archívum formátuma és kezdete, például `rar5 @ 577608 (57,5 MB)`.
- **Tartalom-teszt:** a program a beágyazott archívumot ideiglenes fájlba írja, és lefuttatja rá a 7-Zip listázását és integritás-ellenőrzését. Az eredmény például `Integritás OK (73 elem), nincs titkosítás`.

A teszt eredménye háromféle lehet:

| Érték | Jelentés |
|---|---|
| **Integritás OK (N elem), nincs titkosítás** | Az archívum listázható és hibátlan |
| **Integritás OK (N elem), titkosított** | Az archívum hibátlan, a tartalom titkosított |
| **Integritás HIBA** | Az archívum sérült vagy hiányos |
| **Kihagyva (titkosított)** | A titkosított fejléc jelszó nélkül nem listázható |
| **Kihagyva (túl nagy tartalom)** | A tartalom meghaladja az 1,5 GB-os másolási korlátot |
| **Kihagyva (nem listázható)** | A formátum nem nyitható meg a mellékelt 7-Zippel |

A vizsgálat a **Kicsomagolás** lapra vitel előtt is hasznos: kiderül, hogy a csomag egyáltalán bontható-e a mellékelt 7-Zippel, hány elem van benne, és sértetlen-e.

## Biztonságos kicsomagolás

A **Kicsomagolás lapon megnyitás** hivatkozás átvált a **Kicsomagolás** lapra, a vizsgált csomaggal kitöltve. A csomag nem fut le, a tartalom 7-Zippel bontódik ki. Jelszavas csomag esetén a **Kicsomagolás** lap **Jelszó** mezőjében kell megadni a jelszót a kicsomagolás indítása előtt.
