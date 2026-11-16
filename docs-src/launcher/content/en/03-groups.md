# Groups

Groups are the structure of the list. They do not correspond to folders: an item belongs to a group because the profile says so, not because of where the file sits on disk. Moving a file does not reorder the list, and reordering the list does not move a file.

## Managing groups

The group manager creates, renames, reorders and deletes groups. The order of the groups is the order you set — up and down move a group, and the result is saved with the profile.

| Action | Effect |
|---|---|
| New | Adds an empty group at the end of the list |
| Rename | Changes the displayed name only; items stay in the group |
| Up / Down | Moves the group, and with it every item inside |
| Delete | Removes the group; a group that still contains items is refused |

A group that is not empty cannot be deleted. Empty it first, or move its items to another group — the program does not delete tools silently.

## Sorting

**Sort A-Z** sorts the items inside one group. **Sort all groups** does the same across the whole profile. The first time an item is moved by hand, that group switches to manual order and is no longer re-sorted automatically; a short message confirms it. New items are inserted alphabetically in an alphabetical group, and after the selected item in a manual group.

## Hidden groups

A group can be marked hidden. A hidden group is not shown in the launcher list, but its items are still part of the profile and their shortcuts are still generated. This is how a set of tools can appear on the PE desktop without occupying the list.

![The group manager with reorder buttons and the hidden flag](../assets/img/en/03-groups.png)

## Collapsing

A group collapses only from its chevron. Clicking the row itself selects the group instead of folding it, so a mis-click never hides the items you were aiming for. While a search filter is active, empty groups are not drawn at all.
