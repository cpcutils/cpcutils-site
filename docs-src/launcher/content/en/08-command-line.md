# Command line and files

The launcher is normally started from a shortcut, but it accepts parameters — for a PE shell entry, a dedicated shortcut, or a test script.

## Switches

| Switch | Effect |
|---|---|
| `<profile.ini>` | Opens the given profile. A plain argument, not a switch |
| `--patch <folder>` | Overrides the program folder used by the `{Patch}` token |
| `--size WxH` | Sets the window size |
| `--filter <text>` | Starts with a search filter applied |
| `--lang <code>` | Overrides the interface language for this run, e.g. `--lang=en` |
| `--autorun` | Starts the items marked autorun |
| `/autorun` | Same, in the MInstAll-compatible spelling |
| `/minimized` | Starts hidden, without flashing the window |
| `--sidebar` | Opens the side bar at startup |
| `--edit` | Opens the editor at startup |
| `--groups`, `--newgroup` | Opens the group manager, optionally with a new group |
| `--pick` | Opens the icon picker |
| `--cfg <file>` | Uses another settings file instead of `ui.dat` |
| `--res WxH` / `--res=WxH` | Sets the screen resolution at startup, for PE |
| `--startup` | Started from autostart: runs hidden, tray icon only |
| `--nomutex` | Allows a second instance |
| `--lnk-win` | Generates shortcuts on Windows too |
| `--desktoppath`, `--startmenupath` | Overrides the output folders, for testing |

Switches that exist for diagnostics or automated tests are not listed here; they are not part of the supported interface.

## Files the program uses

| File | Purpose |
|---|---|
| `ui.dat` | Settings: window position, font size, launch behaviour, language. Header, version, key/value pairs and a CRC32 |
| `ui.dat.bak` | The previous settings file, kept for atomic replacement |
| `lang\*.ini` | Interface languages. One file per language |
| `profiles\*.ini` | The lists, in the MInstAll layout |
| `profiles\_backup\` | Timestamped profile backups; ten are kept |
| `startup-log.txt` | Started programs, shortcut generation, skipped links |
| `run-log.txt` | Autorun, including skipped items and the reason |
| `startup-links.txt` | Manifest of the shortcuts the launcher created |

Reading a damaged `ui.dat` does not stop the program: the file is set aside with a `.bad` extension and defaults are used. On read-only media the settings are written to `%TEMP%\MInst\` instead, and the program says so rather than failing silently.

The logs rotate at 128 KB: the previous file is kept as `.1.txt` and a new one is started.

## One instance at a time

Only one launcher runs per session. Starting it again brings the existing window forward instead of opening a second copy, so a double-click on the desktop shortcut never produces two lists editing the same profile. `--nomutex` disables this, and is intended for testing only.

![The about window with the resolved paths, profile name and item count](../assets/img/en/08-command-line.png)
