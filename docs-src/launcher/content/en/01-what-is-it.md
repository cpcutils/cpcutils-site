# Purpose of the Application

**CPC MInst Launcher** is a program launcher for Windows and WinPE. It shows the portable tools you carry on a USB stick or in a PE image as a grouped list, starts any of them with one click, and keeps the whole list in a profile file that travels with the stick.

The program was built for a service bench: the tools are already there, the list should not be rebuilt every time the media is prepared, and starting a program must not depend on a Start menu that may not exist.

## What the program is not

It is a **launcher**, not an installer. It does not install programs, it does not run silent installs, and it does not write to the registry to register anything. It starts what is on the stick and remembers how you organised it.

## Requirements

| Item | Value |
|---|---|
| Operating system | 64-bit Windows, or WinPE 10 / WinPE 11 (x64) |
| Runtime | None. There is no .NET, no Visual C++ redistributable and nothing to install |
| Footprint | One executable of about 734 KB, plus the `lang\` and `profiles\` folders |
| Settings | `ui.dat` next to the executable |

## Portability

The whole folder can be copied to another drive, a network share or a PE image and it keeps working. Settings live in `ui.dat` beside the executable; if the media is read-only, the program falls back to `%TEMP%\MInst\` for its settings and tells you so.

On first start the program picks a profile automatically: `profiles\cpcwinpe11x64.ini` on Windows 11 and WinPE 11, `profiles\cpcwinpe10x64.ini` otherwise, then `default.ini` and the older `minst.ini` as fallbacks.

## Compatibility with MInstAll profiles

The launcher reads and writes the `.ini` profile format used by MInstAll, so an existing collection opens as it is and does not have to be rebuilt. Twelve keys are managed — group, name, patch path, icon, icon index, OS, parameters, hidden run, desktop, Start menu, autorun and desktop name — and every other section or key is preserved when the profile is saved.

The program is independent and is not affiliated with the original author of MInstAll.

![The launcher window with a grouped tool list and the info bar](../assets/img/en/01-what-is-it.png)
