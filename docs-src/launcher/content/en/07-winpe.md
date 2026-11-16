# WinPE

The launcher is designed to run in WinPE as well as in Windows, from the same profile and the same folder. This chapter lists what changes in PE, because a few things that are harmless in Windows are unavailable there.

## How the program recognises PE

Two checks, in order: the `MiniNT` registry key under the system control set, and — if that is not present — the existence of `winpeshl.exe` under `X:\Windows\System32`. The result decides which profile is loaded by default and which settings are offered.

## What works in PE

- The full window: groups, search, the editor, the group manager and the profile switch.
- **Desktop and Start menu shortcuts.** In PE this is the default; on Windows, generation has to be requested explicitly with `--lnk-win`.
- **Autorun.** Items marked autorun start in profile order.
- **Silent start.** With `/minimized` the window stays out of the way while the shell starts.
- **Tray icon with a delayed retry.** In PE the shell starts after the launcher, so the notification area may not exist yet. The program retries until it does, instead of giving up on the first attempt.

## What is different in PE

| Behaviour | In WinPE |
|---|---|
| Start with Windows | Not applicable — the setting is disabled and marked as such |
| Delete an item's file | Deleted immediately; there is no Recycle Bin in PE |
| Minimising | Hides to the tray icon if one exists; the window stays visible if it does not |
| Report a screenshot | Saved next to the launcher, for support |

![The launcher running in WinPE with the PE profile and desktop shortcuts](../assets/img/en/07-winpe.png)

## Autorun

Items with the autorun flag start when the launcher is invoked with `/autorun` or `--autorun`. They start in profile order, one after the other, with a short pause between them so that two installers do not fight over the same window. An item whose OS value does not match the running system is skipped, and the skip is written to `run-log.txt` with the reason. Autorun does not bring the launcher window forward: the point is that the shell comes up and the tools are already there.

In a PE image the shell usually starts the launcher with the profile as a plain argument and the switches after it:

```text
MInst.exe profiles\cpcwinpe11x64.ini /autorun /minimized
```

## Which profile loads by default

On a Windows build number of 22000 or higher the launcher loads `profiles\cpcwinpe11x64.ini`; below that, `profiles\cpcwinpe10x64.ini`. If neither exists it falls back to `default.ini`, then to the older `minst.ini`. On a service stick with two PE generations this means the right list opens without an argument.
