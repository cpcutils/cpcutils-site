# Installer mode

Installer mode transforms a standard SFX payload into a fully featured Windows system installer. This process automates file deployment to absolute paths, shortcut generation, and the registry modifications required for standard Windows uninstallation. Installer mode activation is controlled via the top navigation bar; enabling this mode unlocks the **Installer** configuration tab.

## Enabling Installer Mode

1. In the top navigation bar, select the installer mode icon (the fourth icon from the left).
2. Open the **Installer** tab.
3. Specify the **Install folder**, for example `%ProgramFiles%\MyProduct`.
4. Select the **Architecture** that corresponds to the folder.
5. Specify a **Shortcut name** and select the required shortcuts.
6. On the **Build** page, select **Build Now**.

## Configuration Parameters

| Field | Description |
|---|---|
| **Install folder** | The target absolute path for payload deployment, for example `%ProgramFiles%\Product`. |
| **Architecture** | Selects `%ProgramFiles%` or `%ProgramFiles(x86)%` to match the installation path. |
| **Shortcut name** | The label displayed on the desktop and in the Start menu. |
| **Desktop shortcut** | Creates a desktop shortcut. |
| **Start menu shortcut** | Creates a Start menu entry. |
| **Uninstall entry in Control Panel** | Registers the application in the Windows registry for standard removal via Programs and Features. |
| **AppId (optional)** | Application unique identifier. If omitted, the builder generates one from the product name: the product name followed by an underscore and the first 8 characters of the SHA-256 hash of the product name. |
| **Ask for the folder during install** | Allows modification of the installation path at runtime. |
| **Run after installation** | Launches the main application after installation completes. |

## Installation Wizard Interface (UI)

Enabling **Start the wizard during install (3 steps)** overrides the silent extraction process with a three-step interactive UI: **Welcome**, **Choose the install folder**, and **Ready to install**. With the wizard the package is always interactive, so **Package appearance** on the **Password** page is not editable, and **Ask** becomes available in **If the file exists** on the **Output** page.

![The Installer tab](../assets/img/en/08-installer.png)

## Runtime Execution Flow

Upon execution, the generated installer requests privilege elevation via User Account Control (UAC). Following payload deployment and shortcut creation, it writes the required uninstallation registry keys. The software can subsequently be removed via the Windows Control Panel or by executing the generated `Uninstall.exe` binary in the target directory.
