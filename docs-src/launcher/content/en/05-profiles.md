# Profiles

A profile is the whole list: its groups, its items and their settings, stored in one `.ini` file. Switching profiles replaces the list without restarting the program, which is how one stick can serve two benches, two customers or two PE images.

## The profile switch

The profile switch sits in the top bar and is also reachable with **Ctrl+P**. Selecting another profile loads it immediately; an editor that is open with unsaved changes is closed without keeping them, so decide before you switch.

## Managing profiles

| Action | Effect |
|---|---|
| **Load** | Opens the selected profile and makes it active |
| **Duplicate** | Copies the active profile; the copy gets the suffix ` - copy` |
| **Rename** | Renames the file and updates the active name |
| **Delete** | Removes the profile; the active profile cannot be deleted |
| **Export (copy)** | Writes a copy to a location you choose, for backup or for another stick |
| **Open from file** | Opens a profile from anywhere on disk, for inspection |
| **Import (copy in)** | Copies an outside profile into the profile folder and opens it |

A name that already exists is refused with a message instead of being overwritten.

## Saving, and what happens if saving fails

Every save writes a timestamped backup into a `_backup` folder next to the profile before the file is replaced. Ten backups are kept; older ones are removed in rotation.

If the backup cannot be written, the profile is **not** saved and the program says why — for example when the media is read-only. A half-written profile is worse than an unsaved one, so the operation stops.

## The file format

Profiles are `.ini` files in the MInstAll layout: a `[MInst]` section for profile metadata, a `[Group]` section listing group names by number, one numbered section per item, and a hidden-group list. Twelve item keys are managed by the launcher; every other section and key is written back untouched when the profile is saved.

A file that has no `[MInst]` or `[Group]` section is refused with a message rather than guessed at.

![The profile switch in the top bar with the profile actions](../assets/img/en/05-profiles.png)

## Several profiles on one stick

Nothing stops a stick from carrying more than one profile — one per customer, per PE build or per technician. They share the tool folder, so the media does not have to be duplicated; only the lists differ.
