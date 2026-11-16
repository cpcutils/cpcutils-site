# Unpacker

The **Unpacker** tab extracts the contents of a finished package without executing it. It is intended for inspecting what a package carries and for recovering files from a package that must not be run.

![The Unpacker tab](../assets/img/en/10-unpacker.png)

| Field | Function |
|---|---|
| **Package** | The package (.exe) to be unpacked. Select **Browse** to choose the file. |
| **Target folder** | The target directory for the extracted files. The info line below shows the size, the date, and whether the package is encrypted. |
| **Password** | Needed only for password-protected (AES-256) packages; if left empty, the package asks for it at run time. |

## Extracting a Package

1. Open the **Unpacker** tab.
2. Next to **Package**, select **Browse** and choose the package.
3. For an encrypted package, type the password into the **Password** field.
4. Select **Extract**.
5. When the process finishes, select **Open folder**.

The default target is the `_unpacker\<package name>` folder next to the program. If that folder already exists, a new one is created with a `-2`, `-3` suffix, so an earlier extraction is never overwritten.

> During extraction the main button becomes **Cancel**. It appears after a short delay, so a small package does not produce a flicker; from that point the process can be stopped.

## Packages that are not CPC packages

The **Unpacker** opens more than its own packages. Any self-extracting `.exe` can be extracted – including 7z- or rar-based SFX files – because extraction is not performed by the package's own stub but by the bundled 7-Zip, which finds the embedded archive inside the executable. The package is not executed in this case either.

The header then shows **not a CPC package**: this is informational only and does not block extraction. For a password-protected SFX, enter the password in the **Password** field, exactly as with your own packages. The **Verify** page shows only the size and the SHA256 digest for such a file, because it carries no CPC-specific configuration.

## Messages

- **Extraction finished.** The contents are in the target folder.
- **Extraction failed.** The status line shows the reason; for a password-protected package the password is usually missing.
- **Low disk space on the target drive: only … available.** Free space is less than three times the size of the package.

The package itself is never executed: the SFX stub is not started, and the contents are extracted with the bundled 7-Zip.
