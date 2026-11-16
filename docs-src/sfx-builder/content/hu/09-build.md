# Összeállítás

Az **Összeállítás** lap összesíti a korábban konfigurált paramétereket. A felület végső validációs áttekintést nyújt a build megkezdése előtt, és jelzi az esetlegesen hiányzó beállításokat.

![Az Összeállítás lap – sikeres build után](../assets/img/hu/09-build-done.png)

## Az összeállítás előtti összesítés

Az összesítő panel az alábbi kulcsparamétereket validálja:

| Sor | Leírás |
|---|---|
| **Forrás** | A becsomagolásra kijelölt könyvtár vagy archívum. |
| **Kimenet** | A generált futtatható állomány célútvonala és fájlneve. |
| **Jelszó** | `igen`, ha a tartalom titkosítása engedélyezett, `nincs`, ha nem. |
| **Futtatás** | A kicsomagolás után indított futtatható állomány. |
| **Integritás** | A tartalom SHA256-lenyomata része-e a csomagnak. |
| **Utolsó összeállítás** | A legutóbbi kimenet dátuma és mérete. Ha még nem készült build, és a kimeneti mappában sincs fájl, a sor ezt írja: `még nincs build`. |

Az állapotsor azt mutatja, megvan-e a két kötelező bemenet: `Minden szükséges adat megvan a buildhez.`, ha a forrás és a terméknév is adott, egyébként `Nincs forrás kiválasztva.`. A sor tájékoztató jellegű; a teljes ellenőrzés a készítés indításakor fut le.

A lapon három további kapcsoló szabályozza a csomag tartalmát:

- **Csomag tartalmának elrejtése (7z + konfiguráció)**: a tartalom és a konfiguráció elrejtése az archiváló eszközök elől. Csak PRO kiadásban; Free-ben a build ezzel áll le: `Csomag elrejtése: ez a funkció csak PRO licenccel érhető el.`
- **Vízjel (összeállítás-azonosító)**: azonosító kerül a csomagba, így egy kiszivárgott build visszakövethető.
- **Aláírás a kimeneten**: a kész csomag aláírása a Windows tanúsítványtárában lévő kódaláíró tanúsítvánnyal, időbélyeggel. A tanúsítvány nem jár a programhoz; kiválasztása a **Beállítások** ablakban történik, ahol a lista a **Frissítés** gombbal újraolvasható.

## Az összeállítás folyamata

1. Ellenőrizze a konfigurációs összesítőt. Eltérés esetén korrigálja az értékeket a megfelelő lapokon.
2. Válassza a **Készítés** lehetőséget (vagy nyomjon F5-öt).
3. A build folyamatának diagnosztikai kimenete a **BUILD NAPLÓ** panelen követhető nyomon.
4. Ha az utolsó bejegyzés tartalmazza az .exe fájl nevét, a csomag a kimeneti könyvtárban elérhető.

A végrehajtási idő a forrás méretével nő, a tömörítési szint emelésével pedig meredeken ugrik.

![Futó build: napló és folyamatjelző](../assets/img/hu/09-build.png)

Ha egy ellenőrzés megállítja az összeállítást, a napló piros sorban mondja meg az okot:

![Sikertelen összeállítás: az ok a naplóban](../assets/img/hu/09-build-error.png)

## Csomag integritásának ellenőrzése

A kriptográfiai védelem a konfiguráció Ed25519 aláírásán és a tartalom SHA256 lenyomatán alapul.

- **Bekapcsolva**: a builder a tartalom SHA256 lenyomatát és eltolási értékét Ed25519 aláírással rögzíti a konfigurációban. A kész csomag tartalmának bármilyen jogosulatlan módosítása futásidejű validációs hibát generál, és blokkolja a kicsomagolást.
- **Kikapcsolva**: a csomag nem ellenőrzi önmagát. Ez a beállítás csak akkor indokolt, ha a csomag a build után módosításra kerül, vagy ha kódaláíró tanúsítvánnyal történő aláírás esetén a téves riasztások elkerülése szükséges.

A Free kiadásban az opció tartósan bekapcsolt állapotú, és nem módosítható. A kész csomag integritási állapotát a [Csomag ellenőrzése](11-verify.html) lap jeleníti meg.

## A BUILD NAPLÓ értelmezése

| Szín | Jelentés |
|---|---|
| Fehér | Normál build-lépés, például a tartalom tömörítése. |
| Zöld | A lépés sikeresen befejeződött. |
| Sárga | Figyelmeztetés. A build folytatódik. |
| Piros | A build megszakadt. Az előző bejegyzés azonosítja az okot. |

Gyakori fatális összeállítási hibák (piros jelzés):

- **HIBA: packer\7z.exe nem található**: a 7z binárisok hiányoznak az alkalmazás `packer` mappájából.
- **HIBA: stub\7z.sfx nem található** / **HIBA: telepítő stub (stub\7z-admin.sfx) nem található – telepítsd újra a programot**: a csomag indítómodulja hiányzik.
- **Nincs aláíró kulcspár (keys\builder.key) – indítsd újra a programot, vagy aktiváld a licencet**: a builder nem tudja aláírni a konfigurációt.
- **A kimeneti mappa nem hozható létre**: a kimeneti útvonal nem írható.
- **Telepítő módban add meg a futtatandó programot (ez lesz a parancsikon és az ikon célja)**: telepítő módban kötelező megadni a futtatandó programot.
- **Titkosított forrásarchívum – az összeállításhoz jelszó szükséges.**: az archívum jelszavát a **Forrás** lapon kell megadni.
- **A forrás egyetlen fájlból áll, ami meghaladja a 2 GB-os csomag-plafont – a csomag valószínűleg nem lesz futtatható**. A build még a tartalom összeállítása előtt leáll; a korlát termékdöntés, nem technikai akadály.

> A **BUILD NAPLÓ** a kiválasztott felületi nyelven íródik; a technikai sorok (`[scan]`, `[bld]`, `[cfg]`) minden nyelven ugyanazok.
- **Időtúllépés (10 perc) – az összeállítás folyamata leállítva.**: egy válaszképtelenné vált 7-Zip folyamatot le kellett állítani.

## Ellenőrzés az összeállítás után

A generált állomány teljesen független; sem a builder, sem telepített archiváló szoftver nem szükséges a futtatásához.

Környezeti validáció: erősen javasolt a generált csomag tesztelése egy teljesen tiszta, izolált környezetben (sandbox vagy virtuális gép) az integritás és az elvárt futásidejű viselkedés igazolása érdekében.
