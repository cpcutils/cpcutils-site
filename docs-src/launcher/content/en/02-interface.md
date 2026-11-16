# The window at a glance

The window is built from four parts: the top bar, the tool list, the info bar and the side bar. Everything else — the editor, the group manager, the icon picker, the settings — opens in place or as a dialog and closes back to the same list.

## Top bar

The top bar holds the **profile** switch and the actions that belong to the whole list: loading, duplicating, renaming and exporting a profile, the group manager, the settings, and the side bar toggle. The profile switch is also available with **Ctrl+P**.

## Tool list

Each group has a header row and a chevron. Items appear under their group with their icon and displayed name. An item whose target file is missing stays in the list and is marked **not found** — a broken stick is visible before a client sits down. Groups collapse and expand from the chevron, not from a click anywhere on the row.

## Info bar

Selecting an item fills the info bar. It shows the displayed name, the target path with `{Patch}` resolved, the parameters, the OS value and the size in KB. Items flagged as PE-only are marked **WinPE only**. With nothing selected the bar shows a short hint.

![The info bar of a selected tool, with path, parameters and platform](../assets/img/en/02-interface.png)

## Side bar

The side bar holds the day-to-day actions as thirteen buttons, opened with **F3**. It is the fast path for editing, adding, deleting and moving items without going through the menus.

## Keyboard

| Key | Action |
|---|---|
| **F10** | Run the selected item |
| **F2** | Edit the selected item |
| **F3** | Show or hide the side bar |
| **Ctrl+N / Ctrl+C / Ctrl+P / Ctrl+Q / Ctrl+S / Ctrl+F** | New item, copy, profiles, quit, save, search |
| **Del** | Delete the selected item |
| **Up / Down** | Move the selected item within its group |
| **Ctrl+E** | Open the active profile as raw text in Notepad |

## Launch behaviour, tray and snapping

After a program is started the launcher can do nothing, minimise, or go to the tray. The tray icon has its own menu: show, hide, settings, reset window position, exit. The window normally appears at the right edge of the screen, snapped against the taskbar; **reset window position** returns it there without changing its size. If a tray icon cannot be created, the window stays visible instead of disappearing.

Three font sizes are available in settings, and every action that changes the profile shows a short confirmation for three seconds.
