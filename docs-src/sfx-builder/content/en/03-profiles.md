# Profiles

A profile encapsulates all project configurations within a single JSON file, enabling session persistence and the concurrent management of multiple projects. Selecting a profile from the drop-down menu instantly restores the associated configuration.

## Profile Storage Location

Profiles are stored natively in the `profiles\` directory within the application root. At startup the program loads the `_base.json` base template: it provides an empty project, it is not listed in the profile menu, and it cannot be overwritten. The entire application folder can be copied to alternative drives or workstations without losing configuration data, ensuring full portability.

## Managing Profiles (Save, Rename, Load)

**Save** writes the current configuration into the active profile. Select the arrow next to **Save** and choose **Save as...** to store the current configuration under a new name. **New profile** (plus icon) opens a save dialog initialized with the file name `new.json`; once saved, it becomes the active profile. **JSON...** loads a previously saved `.json` profile from disk.

| Action | Result |
|---|---|
| **Save** | Writes the current configuration into the active profile. |
| Arrow next to **Save** → **Save as...** | Stores the current configuration under a new file name. |
| **New profile** (plus icon) | Opens a save dialog with `new.json`; the saved file becomes the active profile. |
| **JSON...** | Loads an existing `.json` profile from disk. |
| **New project** (↺ icon) | Loads `_base.json`: every field becomes empty, the build log and the source list are cleared. The saved profile remains unchanged. |
| Red delete icon (X) in the profile menu | Deletes the selected profile after confirmation. |

## New project, Deletion, and Unsaved Changes

The reset action (↺ icon, Ctrl+R) loads `_base.json`: every field returns to its default value, the build log and the source list are cleared, and the active profile is detached. The saved profile file is not modified, and the program requests confirmation before the operation. Afterwards the header shows **New project**, and saving opens the **Save as** dialog - so the previous profile cannot be overwritten. When the operation finishes, the program switches to the **Source** tab and places the cursor in the source field. To delete a profile, open the profile drop-down menu and select the red delete icon (X); the system requests confirmation before the operation. If the program is closed with unsaved changes, three options are available: save and exit, exit without saving, or stay.

Passwords stored within a profile are secured using Windows DPAPI encryption, preventing plain-text extraction from the JSON file.

![The Profile drop-down menu and save controls in the top bar](../assets/img/en/03-profiles.png)
