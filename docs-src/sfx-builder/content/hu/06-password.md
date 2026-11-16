# Jelszó

A **Jelszó** lap a kész csomag jelszavát állítja be, és azt szabályozza, hogyan jelenjen meg a csomag futtatáskor. Ez nem a forrásarchívum jelszava: azt a **Forrás** lap kezeli, és a két jelszó más célt szolgál.

![A Jelszó lap](../assets/img/hu/06-password.png)

| Mező | Funkció |
|---|---|
| **Jelszó** | A kész csomag jelszava, amelyet a csomag kicsomagolás előtt bekér. A mellette lévő szem ikon megmutatja vagy elrejti a beírt szöveget. |
| **Csomag megjelenése** | A futó csomag megjelenése. Portable csomagnál két érték választható: **Folyamatjelző** (splash + folyamatjelző sáv) vagy **Csendes (nincs ablak)**. Ha a telepítő varázslóval készül, a mező nem szerkeszthető: a varázsló mindenképp interaktív. |

## Jelszó beállítása

1. Nyissa meg a **Jelszó** lapot.
2. Írja be a jelszót a **Jelszó** mezőbe.
3. Válassza ki a megjelenést a **Csomag megjelenése** mezőben.
4. Készítse el a csomagot: az **Összeállítás** lapon válassza a **Készítés** gombot.

A jelszó AES-256 titkosítással védi a tartalmat; a csomag futtáskor kéri be, és a konfigurációban nem olvasható formában tárolódik.

> Ha jelszó van beállítva, a **Csendes (nincs ablak)** nem használható, mert a csomagnak kérdeznie kell. A **Folyamatjelző** mód jelszóval is működik.

A jelszó nem tartalmazhat idézőjelet. A mező a kész csomag tartalmára vonatkozik; a forrásarchívum saját jelszavát a **Forrás** lap kezeli, a kettő független egymástól.

## Gyakori hiba

**A csomag nem kéri a jelszót.** A mező üresen maradt, vagy a forrás meglévő archívum volt. Ellenőrizze az **Összeállítás** lap összegzését: a **Jelszó** sor mutatja, hogy a beállítás része-e jelszó.
