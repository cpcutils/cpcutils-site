# What is it?

**A single .exe file. Everything included.**

An ideal solution for creating self-extracting (SFX) packages for software and drivers, especially for non-technical users. The result is a single executable (.exe) file. Upon execution on the target machine, extraction is automatic, and it can be configured to launch a specified program.

No external archive software is required on the target machine, minimizing the need for technical support.

![The main window](../assets/img/en/main-window.png)

## Common Use Cases

- **WinPE and Recovery Environments:** Instant execution of diagnostic tools, scripts, and drivers (e.g., VMD/RAID) in bootable Windows PE environments lacking installed frameworks or archive utilities.
- **Service and Diagnostic Packages:** Rapid bundling of portable utilities and diagnostic tools for USB deployment, intended for use by system administrators and field technicians.
- **Corporate Software Deployment:** Standardized distribution of internal applications, updates, and configuration files to employee workstations, supporting silent (unattended) execution.
- **Power User Automation:** Packaging custom scripts, registry modifications, and complex command-line task sequences into a single portable binary for rapid execution.
- **Customer Installers:** Generation of professional software installers featuring absolute path deployment, shortcut creation, and standard Control Panel uninstallation entries.
- **Simplified Delivery for End Users:** Distribution of tools and drivers that provide a zero-configuration "click-and-run" experience, minimizing user error and post-deployment technical support.


## Package Contents

- **Your files.** A folder, or an archive you already have: 7z, zip, rar, tar, gz, bz2, xz, cab, iso.
- **Name and icon.** So the package looks like your product, not like an anonymous download.
- **A password** (optional): AES-256 encryption for confidential content; the package asks for it before unpacking.
- **A program to start**, or a completion message.
- **A destination**, in installer mode: target folder, shortcuts, uninstall entry.

## Portable and Self-Contained Architecture

The builder needs no installation. Copy the folder anywhere, start `cpcbuilder.exe`, and its settings stay next to it in the `profiles\` folder. Nothing is written to the registry, nothing to `%APPDATA%`, and there is nothing to uninstall.

Building requires no internet connection. The program goes online only for licence activation and for checking updates; without a connection the update check is skipped silently.

## Free and Pro Editions

The free edition is not a trial. It builds complete packages, with everything described above, for as long as you like.

| | Free | Pro |
|---|---|---|
| Building packages | yes | yes |
| Splash screen in the package | yes | no |
| Integrity protection | always on | on or off |
| Updates and support | not included | 12 months from purchase |

The Pro edition removes the splash screen from the generated executable and allows disabling package integrity protection. The license never expires: after the update period the program keeps working, you just stop receiving new versions. See [License](12-license.html).

## System Requirements

- 64-bit Windows.
- The `packer\` folder next to the program, with `7z.exe` and `7z.dll` inside. Nothing to install.
- No administrator rights to run the builder. Packages built in installer mode will require them on the target machine.

## Creating Your First Package

1. On the **Source** page, select the folder or the archive you want to pack.
2. On the **Output** page, assign a file name, for example `Setup_v1`.
3. On the **Build** page, select **Build Now**.

The .exe file appears in the output folder. Before distribution, test it on a computer that has never seen your source files. This is the only test that verifies that every component is included.
