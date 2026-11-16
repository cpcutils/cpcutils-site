# Output

The **Output** tab defines the final executable parameters, including the destination directory, filename, compression level, and graphical assets (icon).

![The Output tab](../assets/img/en/05-output.png)

## Output Settings

| Field | Description |
|---|---|
| **Output folder** | The destination directory for the generated executable. |
| **File name** | The name of the executable, without the extension. For example, `Setup_v1`. |
| **Compression level** | Determines the compression ratio. Available values are **0**, **1**, **3**, **5**, **7**, and **9** (0 = store-only, 9 = maximum). When repacking an existing archive, the level is fixed at **5**. |
| **If the file exists** | Conflict resolution strategy for existing output files: **overwrite**, **skip** or **rename**. **Ask** is available only when the stub can ask (installer with wizard) – not for portable packages and not for a silent installer. |
| **SFX icon** | The icon of the generated executable. If omitted, the built-in CPC icon is applied. |

## Icon Synchronization

The executable icon setting is globally synchronized across the **Source** and **Output** tabs. Modifying either field updates the same underlying configuration value. If omitted, the default CPC icon is applied.

## Build Steps

1. Select an **Output folder**.
2. Specify a **File name**, for example `DriverPack_v3`.
3. Select a **Compression level**. The available values are 0, 1, 3, 5, 7, and 9; level 5 is the recommended starting value. Level 9 is appropriate only when output size takes precedence over build time. Repacking an existing archive always uses level 5.
4. Configure **If the file exists** according to the workflow requirements.

The `.exe` extension is appended automatically to the output file. If the conflict resolution is set to **Overwrite**, existing binaries with identical names are replaced without prompting. Consistent naming conventions, such as version numbers, ensure that output files remain unambiguously identifiable.
