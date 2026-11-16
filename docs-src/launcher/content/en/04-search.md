# Search

Search filters the list you already have. It does not open a window, it does not query the disk, and it does not need a confirmation step: the first character typed narrows the list.

## How it behaves

- Typing filters immediately, without pressing Enter.
- **Backspace** widens the list again, one character at a time.
- Matching is accent-insensitive, so `lemezkep` finds `Lemezkép` and `particio` finds `Partíció`.
- Groups collapse to the items that match; a group with no match disappears from the list entirely.
- The match is checked against the displayed name, so the tool is found by the name you gave it, not by its file name on disk.

Deleting the last character of the filter restores the full grouped list with the previous expansion state.

## When to use it

Two situations dominate on a bench:

**A long stick.** Sixty to two hundred items in a dozen groups is normal. Typing three letters beats scrolling every time, and the list keeps its grouping while you type — you can see which area the match belongs to.

**A tool you do not use often.** If you remember roughly what it does but not which group you filed it under, the search finds it without opening the group manager or the profile.

## Search at startup

The launcher can be started with a filter already applied, using `--filter <text>`. This is useful for a dedicated shortcut or a PE shell entry that opens the list at one specific tool set.

![The list after typing a few characters: three matches, empty groups hidden](../assets/img/en/04-search.png)

## What search does not do

It does not read inside files, it does not search the disk for programs, and it does not look at descriptions. If an item is missing from the profile, search will not find the file — the info bar and the **not found** marker tell you what the profile expects and where it expects it.
