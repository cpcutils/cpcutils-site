# Hibaelhárítás és GYIK

## Általános specifikációk

**Szükséges külső archiváló szoftver (pl. 7-Zip) a célgépen?**

Nem. A generált futtatható állomány teljesen független, és tartalmazza a kicsomagoláshoz szükséges összetevőket.

**Szükséges a szoftver telepítése?**

Nem. Az alkalmazás teljesen hordozható. A konfigurációs adatok a futtatható állomány melletti `profiles\` könyvtárban tárolódnak.

**Miért kér a csomag dekódolási kulcsot a futtatáskor?**

A **Jelszó** lapon lett jelszavas védelem beállítva. A csomag minden buildnél új, véletlen kulcsot generál a tartalom titkosításához; a megadott jelszó csak kapuként működik, önmagában nem a titkosítási kulcs. A jelszó futásidőben kerül bekérésre, és nem tárolódik egyszerű szövegként a konfigurációban. A funkció letiltásához ürítse ki a **Jelszó** mezőt, majd készítse újra a csomagot az **Összeállítás** lapon.

**Miért hiúsul meg az állomány futtatása integritási hibával?**

Az Ed25519 aláírás-ellenőrzés jogosulatlan utólagos módosítást észlelt. A végrehajtás blokkolva van; tiszta újrakészítés szükséges. A kész csomagot archiváló szoftverrel módosítani tilos.

**Hogyan hajtható végre a licencmigráció?**

Exportálja a helyi kulcsot (`.cpckey`) a forrásgépen, majd importálja a célkörnyezetben. Részletek: [Licenc](12-license.html).

**Szükséges hálózati kapcsolat a buildhez?**

Nem. Internetkapcsolat kizárólag a szoftver egyszeri licencaktiválásához szükséges.

## Diagnosztikai hibaüzenetek és megoldások

**Nincs megadva forrás**
Megoldás: definiáljon érvényes bemeneti könyvtárat vagy archívumot a **Forrás** lapon.

**HIBA: forrásmappa nem létezik**
Megoldás: az elérési út érvénytelen vagy nem hozzáférhető. Konfigurálja újra a forrás útvonalát.

**HIBA: packer\7z.exe nem található**
Megoldás: hiányzó függőség. Győződjön meg róla, hogy a `7z.exe` és `7z.dll` fájlokat tartalmazó `7z` könyvtár az alkalmazás gyökérkönyvtárában található.

**Időtúllépés (10 perc) – az összeállítás folyamata leállítva**
Megoldás: Ellenőrizze a háttértár I/O teljesítményét és a forrásfájlok zárolási állapotát.

**Fájlok hiányoznak vagy sérültek a kicsomagolás után**
Megoldás: végpontvédelmi beavatkozás gyanúja. Adja hozzá a forráskönyvtárat és a `%TEMP%` kibontási könyvtárat a kivételekhez.

**A jelszó nem tartalmazhat idézőjelet**
Megoldás: szintaktikai hiba. Távolítsa el a `"` karaktert a titkosítási kulcsból.

![Hibaelhárítási referencia](../assets/img/hu/13-faq.png)

## A Windows SmartScreen figyelmeztetése

**Az „Ismeretlen kiadó" üzenet**

A kész csomag nem rendelkezik hitelesítésszolgáltatói (Authenticode) aláírással, ezért a Windows futtatáskor jelzi, hogy a kiadó ismeretlen. Ez nem hibaüzenet, és nem vírusfertőzésre utal: a csomag a saját belső, Ed25519 alapú integritás-ellenőrzésével védi a tartalmát; ezt a mechanizmust a Windows nem ismeri, mert a SmartScreen kizárólag a szabványos PKI/Authenticode aláírásokat értékeli, ezért a fájlt „aláíratlannak" látja.

**Mikor jelenik meg**

Az üzenet jellemzően akkor jelenik meg, ha a csomag internetről érkezett: böngészőből töltötték le, e-mail mellékletként kapták, vagy letöltőprogramon keresztül került a gépre. Helyi hálózatról, OneDrive által szinkronizált mappából vagy cserélhető adathordozóról másolt fájlnál az üzenet általában nem jelenik meg, mert a fájl nem kapja meg a Mark of the Web (MotW, Zone.Identifier) jelölőt.

**Továbblépés**

- Az üzenetablakban: *További információ*, majd *Futtatás mindenképpen*.
- A fájl tulajdonságlapján (jobb egérgomb, *Tulajdonságok*) az *Általános* lap alján a *Feloldás* bejelölése után a jelölő eltávolítható. Parancssorból ugyanezt a `Unblock-File` parancsmag végzi el.
- Ha a fájlt OneDrive-szinkronizált mappából vagy hálózati helyről másolja, a jelölő eleve nem keletkezik.

**A csomag hitelességének ellenőrzése**

A Windows figyelmeztetése a fájl eredetéről szól, nem a tartalmáról. A tartalom hitelességét a 11. fejezetben leírt *Ellenőrzés* funkció vizsgálja: kimondja, hogy a csomag beállításainak aláírása hiteles-e, a tömörített tartalom változatlan-e, és a kicsomagoló váz a CPC-től származik-e. Ha az ellenőrzés mindhárom ponton megfelel, a csomag tartalma bájtra az, amit a készítő összeállított.

**Vállalati környezet**

Ha egy szervezet házirendje az aláíratlan programokat tiltja, a csomag a 11. fejezetben megjelenő SHA-256 lenyomat alapján engedélyezhető a végpontvédelmi rendszerben. Az engedélyezés így nem a fájlnévre vagy a méretre, hanem a csomag pontos tartalmára vonatkozik.
