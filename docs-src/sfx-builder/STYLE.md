# STYLE - a CPC 7z SFX Builder súgó szabályai

**Nyelvi alap:** az **angol** a forrás; a magyar fordítás.
**Célközönség:** végfelhasználó, aki csomagot készít (nem fejlesztő, nem rendszergazda).

---

## 0. Munkamegosztás (2026-11-07-i döntés)

| Ki | Mit csinál |
|---|---|
| **Gemini (Viktor)** | a **szöveg** — hangnem, mondatszerkezet, fogalmazás. Ez a szöveg az etalon. |
| **PAI** | **átvezetés változtatás nélkül** + magyar helyesírás/nyelvtan javítása + **szerkezeti** egységesítés + **tárgyi** ellenőrzés a kóddal szemben |

**Ezért ez a dokumentum NEM ír elő hangnemet.** A korábbi „tárgyilagos, rövid mondat, nincs jelző" típusú előírások törölve — azok húzták szárazra a szöveget.

PAI csak ezekben az esetekben módosít:
1. magyar helyesírás, egyeztetés, vonzat, szórend, központozás;
2. a felületi név eltér a `lang/*.ini`-től;
3. a szöveg olyat állít, ami a kódban másképp működik (**tárgyi hiba** — ezt mindig jelezni kell, nem csendben javítani);
4. szerkezeti hiány (nincs cím, nincs kép, hiányzó lépés).

---

## 0/A. Regiszter oldalanként (2026-11-07, Viktor)

Nem az egész súgó egyfajta, hanem kétféle — és ezt oldalanként kell tartani:

| Oldal | Regiszter | Mi van benne |
|---|---|---|
| **01 bevezető** (és az `index.html`) | **bemutató / landoló** | helyzet, felhasználási esetek, sokrétűség (WinPE, szerviz, vállalati, power user, ügyféltelepítő, laikus), miért jó. **Webre is ez megy ki.** |
| **02–12** | **kézikönyv** | mező, lépés, hiba, ítélet — száraz, pontos, díszítés nélkül. Itt minden jelző zaj. |

> Az első oldal nem lehet „gagyi", és nem hagyhatja ki a program sokrétűségét — ez a 2026-11-07-i tanulság. A technikai oldalakon viszont a lazább hangnem ront, nem javít.

## 1. Címek

- **Angolul Title Case** (minden jelentős szó nagybetűs): „Common Use Cases", „Package Contents".
- **Magyarul mondatkezdő nagybetű**: „Gyakori felhasználási területek", „A csomag tartalma".
- Cím végén nincs pont, kettőspont, felkiáltójel.
- Csak `#` (fejezetcím), `##`, `###` használható. A fejezet `#` címe a `toc.json`-ból jön.

## 2. Felületi elemek

- A vezérlő neve **félkövér**, pontosan a `lang/*.ini` szerint (**Source**, **Build Now**; **Forrás**, **Készítés**).
- A felület szövege az egyetlen terminológiai forrás: ha ott szerepel egy fogalom, tilos mást írni rá.
- Nem kell kiírni, hogy „gomb", „mező", „jelölőnégyzet", ha a szövegkörnyezet egyértelmű.

## 3. Szerkezet (minden fejezetre)

1. Bevezető bekezdés(ek) a fejezet céljáról.
2. Táblázat: mező → funkció (ahol van mező).
3. Számozott lépések (ahol van folyamat).
4. Megjegyzés (`>`) csak indokolt esetben, max. 1-2 fejezetenként.
5. Gyakori hiba → megoldás (ahol releváns).

Hossz: **250–500 szó** fejezetenként.

## 4. Magyar helyesírás — a leggyakoribb javítások

| hiba | helyes |
|---|---|
| kettőspont után nagybetű, ha nem új mondat | kisbetű |
| „bootolható", „driverek", „pendrive-os" | „indítható", „illesztőprogramok", „pendrive-ról" |
| „szervizes" | „szerviztechnikus" |
| „felhasználói beavatkozás nélküli" (ismétlés) | „beavatkozás nélküli" |
| „minimalizálva az … szükségességét" (lógó szerkezet) | állítmányos mondat: „… minimalizálja az igényt" |
| „összetevő" (fájlokra) | „fájl", „összetevő" csak absztrakt értelemben |
| „buildel" | „elkészít", „lefordít", „összeállít" |
| em dash (—) | „–" szóközzel, vagy más szerkezet |
| „címzett" | „aki megkapja", „aki futtatja" |

## 5. Írásjelek, formák

| | Angol | Magyar |
|---|---|---|
| felsorolás vessző | a, b, and c | a, b és c |
| gondolatjel | — szóköz nélkül | „–" szóközzel |
| hárompont | csak felületi címkében (`Save as...`) | `…` szóköz nélkül |
| dátum | 2026-11-07 | 2026-11-07. |
| szám | 15 GB, 1,000 files | 15 GB, 100 000 fájl |
| márka, mozaikszó | változatlan (7-Zip, SHA256, UAC, WinPE) | változatlan |

## 6. Képernyőképek

- Saját sorban, a vonatkozó bekezdés után.
- `![Rövid leírás, mit mutat](../assets/img/<lang>/<id>.png)`
- A fájlnév a fejezet id-je, stabil (csere esetén ugyanaz marad).
- Amíg nincs kész kép, a generátor placeholder dobozt rajzol.

## 7. Amit tilos leírni

- Olyan vezérlőt, funkciót, oldalt, ami a programban nincs.
- Fejlesztői eszközöket (parancssori kapcsolók, `--dump-rects`, naplófájlok, DOC GATE).
- Nem tesztelt viselkedést (másodlagos monitor DPI, hálózati telepítés).
- Új szinonimát egy felületi fogalomra.

## 8. Gépi ellenőrzés (minden build után)

- `node build.js` — 12 fejezet × 2 nyelv, hibátlan generálás.
- `node check-terms.js` — a félkövér felületi nevek egyeznek-e a `lang/*.ini`-vel.
- `verify_all.py` — fejezetszám, oldalak, belső linkek, index-paritás, OneDrive-szinkron.
- Angol helyesírás: LanguageTool (`lt_check.py en`); a magyar azt nem támogatja, ezért a magyar lektorálás kézi/Gemini.
