# A felület áttekintése

Az alkalmazás egységes, egyablakos felülettel rendelkezik. Az elrendezés három fő részre tagolódik: a felső sáv a profilkezelésre, a középső terület a konfigurációra, az alsó panel pedig a folyamatok naplózására szolgál. Ez a kialakítás megszünteti a rejtett menüket, és átlátható munkafolyamatot biztosít.

## Felső sáv: profilkezelés és gyors műveletek

A felső sáv az alkalmazás nevét és az aktuális licenc típusát (**PRO** vagy **FREE**) jeleníti meg. A profil legördülő menüje az aktív profilt mutatja, és lehetővé teszi a mentett projektek közötti gyors váltást. Ha még nincs mentett profil, itt **Új projekt** áll, és a mentés a **Mentés másként** párbeszédet nyitja. Mellette a gyorsművelet-ikonok találhatók: **Új profil** (plusz ikon), **Új projekt** (↺ ikon, Ctrl+R), JSON-profil tallózása (JSON ikon), **Mentés**, valamint a **Mentés** melletti nyíl a **Mentés másként...** lehetőséggel. Az **Új projekt** megerősítés után a **Forrás** lapra vált, és a kurzor a forrás mezőbe kerül, mert a munka ott kezdődik. Mellettük a **Telepítő** mód kapcsolója és a **Készítés** gomb található. A jobb szélen a **Beállítások**, a **Névjegy** és a **Súgó (F1)** ikon áll.

## Lapok és navigáció

| Terület | Funkció |
|---|---|
| **Felső sáv** | Kiadásjelvény, profil menü, gyorsműveletek, Telepítő mód kapcsolója, Készítés gomb, valamint a Beállítások, a Névjegy és a Súgó ikon. |
| **Lap-sáv** | A nyolc konfigurációs lap közötti váltás; a nézetváltó gomb az ikonos és a szöveges címkék között vált. |
| **Bal oldali navigáció** | Ugyanezek a lapok **PROJEKT** és **BUILD** csoportba rendezve, valamint a **Licenc** és a **Névjegy**. |
| **Tartalmi terület** | A kiválasztott lap konfigurációs mezői. |
| **Build napló** | Lépésenkénti build-üzenetek, színkódolva. |
| **Állapotsor** | A futó folyamat aktuális állapota. |

A szoftver tíz fő konfigurációs lapot tartalmaz: **Forrás**, **Kimenet**, **Jelszó**, **Futtatás**, **Telepítő**, **Összeállítás**, **Kicsomagolás**, **Ellenőrzés**, **Licenc** és **Névjegy**. A felső lap-sáv ezek közül nyolcat mutat – **Forrás**, **Kimenet**, **Jelszó**, **Futtatás**, **Telepítő**, **Összeállítás**, **Kicsomagolás** és **Ellenőrzés** –; a nézetváltó gomb az ikonok és a szöveges címkék közötti váltást szolgálja. A **Licenc** és a **Névjegy** csak a bal oldali navigációból érhető el, amely mind a tíz lapot a **PROJEKT** és **BUILD** kategóriákba csoportosítja.

## Build napló és állapotsor

Az alsó részen található **BUILD NAPLÓ** panel valós idejű, szöveges visszajelzést ad a háttérfolyamatokról. A fix szélességű betűtípus és a színkódolt sorok biztosítják a hibák és a normál rendszerüzenetek vizuális elkülönítését. Az alatta lévő állapotsor az aktuális állapotot mutatja.

![A builder főablaka a felső sávval, lapokkal és build naplóval](../assets/img/hu/02-interface.png)

## Gyorsbillentyűk

| Billentyű | Művelet |
|---|---|
| Ctrl+N | Új profil |
| Ctrl+S | Mentés |
| Ctrl+Shift+S | Mentés másként... |
| Ctrl+O | JSON profil betöltése |
| Ctrl+F | Keresés a profil-listában |
| Ctrl+Q (vagy Ctrl+,) | Beállítások |
| Ctrl+R | Új projekt (megerősítést kér) |
| F5 | Készítés indítása |
| Ctrl+Tab / Ctrl+Shift+Tab | következő / előző lap |
| F1 | Súgó |
| Esc | a legördülő lista vagy a dialógus bezárása |

**Navigáció és fókusz:** a billentyűzetes görgetéshez kattintson a fájllista vagy a build napló paneljére – a fókuszált panel vékony keretet kap. Onnantól a ↑ / ↓ egy sort, a Page Up / Page Down egy oldalt, a Home / End az elejére, illetve a végére ugrik. Az egérgörgő a panel fölött bárhol működik, a görgetősáv pedig húzható. A profil legördülő listában a nyilak a kijelölést mozgatják, az Enter betölti, a Delete pedig megerősítés után törli.

## Beállítások

A fogaskerék ikon (Ctrl+Q vagy Ctrl+,) a **Beállítások** ablakot nyitja. A módosítások a **Mentés** gombbal lépnek életbe, a **Mégse** elveti őket.

| Beállítás | Mit szabályoz |
|---|---|
| **Nyelv** | A felület nyelve; a program melletti `lang\` mappa `.ini` fájljai közül választ. |
| **Splash hossza** | Az indítóképernyő időtartama másodpercben; 0 = ki. |
| **Kimeneti mappa** | Az alapértelmezett kimeneti könyvtár; üresen `alapértelmezett`. |
| **7-Zip mappa** | A használt `7z.exe` helye; üresen a program melletti `packer\` mappa. |
| **Betűméret** | A felület betűmérete: kicsi, közepes, nagy. |
| **Frissítések ellenőrzése** | Hetente, havonta vagy soha. Free kiadásban nem állítható: fixen hetente. |
| **Aláírás tanúsítvány** | A kimenet aláírásához használt tanúsítvány a Windows tanúsítványtárából; automatikus módban a legkésőbb lejáró kódaláíró tanúsítvány. A **Frissítés** gomb újraolvassa a listát (például token bedugása után). |
| **Időbélyeg-szerver** | Az RFC 3161 időbélyeg-szerver címe; üresen a DigiCert szerver. |

## Névjegy

A **Névjegy** lap az alkalmazás adatait mutatja: a nevet, a verziót és a szerzői jogi sort, alatta a licenc állapotát - **FREE**, illetve **PRO** a lejárati dátummal -, valamint a frissítési és támogatási időszak végét, ha a licenchez tartozik ilyen.

A **Frissítések keresése** sor jobb oldalán a jelenlegi verzió, illetve az ellenőrzés eredménye látható; kattintásra a program a frissítési szerverhez fordul, és újabb verzió esetén felajánlja a letöltést. Alatta a **Weboldal** (`cpcutils.com`) és az **E-mail** (`support@cpcutils.com`) hivatkozás áll.

A **Technikai részletek** hivatkozás lenyitja a telepítés adatait, két oszlopban: **Platform**, **Nyelv** és a **Napló** útvonala, illetve a **Program mappa**, a **7-Zip mappa** és a **Kimeneti mappa**. A hosszú útvonalak rövidítve jelennek meg; a **Másolás** gomb a teljes adatsort a vágólapra teszi (támogatási hibajegyhez). A blokk alján az SFX motor és a színpaletta azonosítója szerepel.

A **Külső összetevők és licencek** hivatkozás a csomagban mellékelt `third-party-licenses.txt` fájlt nyitja meg; ebben szerepel a 7-Zip LGPL és a többi külső összetevő licence.