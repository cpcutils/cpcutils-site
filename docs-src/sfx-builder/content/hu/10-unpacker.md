# Csomag kicsomagolása

A **Kicsomagolás** lap a kész csomag tartalmát bontja ki anélkül, hogy a csomag végrehajtódna. Célja a tartalom ellenőrzése, illetve fájlok visszanyerése olyan csomagból, amelyet nem szabad futtatni.

![A Kicsomagolás lap](../assets/img/hu/10-unpacker.png)

| Mező | Funkció |
|---|---|
| **Csomag** | A kicsomagolandó csomag (.exe). A **Tallóz** gombbal választható ki. |
| **Célmappa** | A kibontott fájlok célkönyvtára. Az alatta lévő információs sor a csomag méretét, dátumát és azt mutatja, hogy titkosított-e. |
| **Jelszó** | Csak jelszavas (AES-256) csomagnál kell kitölteni; üresen hagyva a csomag futásidőben kéri be. |

## Csomag kicsomagolása

1. Nyissa meg a **Kicsomagolás** lapot.
2. A **Csomag** mező mellett válassza a **Tallóz** lehetőséget, és jelölje ki a csomagot.
3. Titkosított csomag esetén írja be a jelszót a **Jelszó** mezőbe.
4. Válassza a **Kicsomagolás** lehetőséget.
5. A folyamat végén válassza a **Mappa megnyitása** lehetőséget.

A célmappa alapértéke a program melletti `_unpacker\<csomag neve>` mappa. Ha az már létezik, a program `-2`, `-3` végződéssel új mappát hoz létre, így egy korábbi kicsomagolás nem íródik felül.

> Kibontás közben a fő gomb felirata **Mégse**-re vált – rövid késleltetéssel, hogy kis csomagnál ne villanjon fel; onnantól a folyamat leállítható.

## Nem CPC csomagok

A **Kicsomagolás** nem csak a saját csomagokat nyitja meg. Bármely önkicsomagoló `.exe` kicsomagolható vele – 7z- vagy rar-alapú SFX is –, mert a bontást nem a csomag saját indítómodulja végzi, hanem a mellékelt 7-Zip, amely a futtatható állományban megtalálja a beágyazott archívumot. A csomag ilyenkor sem fut le.

A fejléc ilyenkor a **nem CPC csomag** jelzést mutatja: ez csak tájékoztatás, a bontást nem akadályozza. Jelszóval védett SFX esetén a jelszót a **Jelszó** mezőbe kell beírni, ugyanúgy, mint a saját csomagoknál. Az **Ellenőrzés** lap az ilyen fájlról csak a méretet és a SHA256 lenyomatot mutatja, mert a CPC-re jellemző konfigurációt nem tartalmazza.

## Üzenetek

- **Kicsomagolás kész.** A tartalom a célmappában van.
- **Kicsomagolás sikertelen.** Az állapotsor mutatja az okot; jelszavas csomagnál általában a jelszó hiányzik.
- **Kevés szabad hely a célmeghajtón: csak … áll rendelkezésre.** A szabad hely kevesebb, mint a csomag méretének háromszorosa.

A csomag nem fut le: az SFX indítómodul nem indul el, a tartalmat a mellékelt 7-Zip bontja ki.
