# Icons and shortcuts

Each item has an icon in the list and can have a shortcut on the desktop or in the Start menu. Both are stored in the profile, so they follow the list from one machine to the next.

## Where an icon comes from

Three sources, in this order of preference:

1. **The program's own icon** — taken from the target executable, optionally by icon index.
2. **The icon library** — `iconapp.dll` next to the launcher, opened in the icon picker.
3. **A file you choose** — an `.ico`, a `.dll` or an `.exe` with icons inside.

The picker shows two sets in one grid: the icons found in files of the tool folder, and the icons in the library. It is laid out in twelve columns; the number shown for a library icon is the number to enter in the profile.

If the target file is missing but a custom icon is set, the custom icon is still shown — the entry stays recognisable while the path in the info bar tells you what is broken.

![The icon picker: file icons and library icons in one grid](../assets/img/en/06-icons.png)

## Shortcuts

Two per-item flags control shortcut generation: one for the desktop, one for the Start menu. A separate `DesktopName` value allows a shorter name on the desktop than in the list, which matters when the desktop already carries thirty icons.

Shortcuts are generated when the launcher runs in WinPE, and on Windows only when explicitly requested. Generation is not a one-way action: the launcher keeps a manifest of the links it created, and the next generation removes the links that are no longer in the profile — but only inside the two output folders it owns. Nothing else on the desktop is touched.

If the target of an item is missing, its shortcut is skipped and the reason goes into the startup log. A dead link is worse than a missing one, because it fails in front of the customer.

## What the flags mean

| Flag | Effect |
|---|---|
| Desktop icon | A shortcut is created in the desktop folder |
| Start menu | A shortcut is created in the Start menu folder |
| Run hidden | The program starts without a console window |
| 64-bit only | The item is skipped on systems that do not match its OS value |
| Autorun | The item starts with the shell when the launcher is run with `--autorun` |
