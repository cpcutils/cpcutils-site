# Password

The **Password** tab sets the password of the finished package, and controls how the package presents itself when it runs. This is not the password of the source archive: the **Source** tab handles that separately, and the two serve different purposes.

![The Password tab](../assets/img/en/06-password.png)

| Field | Function |
|---|---|
| **Password** | The password that the built package asks for before extraction. The eye icon next to the field shows or hides the typed text. |
| **Package appearance** | How the running package looks. For a portable package there are two values: **Progress bar** (splash + progress bar) or **Silent (no window)**. When the installer is built with the wizard, the field is not editable: the wizard is always interactive. |

## Setting a Password

1. Open the **Password** tab.
2. Type the password into the **Password** field.
3. Select the appearance in **Package appearance**.
4. Build the package on the **Build** tab.

The password applies AES-256 encryption to the payload; the package asks for it at run time, and it is not stored in readable form in the configuration.

> When a password is set, **Silent (no window)** cannot be used, because the package has to ask for the password. The **Progress bar** mode works with a password as well.

The password cannot contain a double quote character. If the source was an existing archive, the field has no effect, because that archive is not re-compressed with a new password; a warning is shown instead.

## Common Error

**The package does not ask for the password.** The field was left empty, or the source was an existing archive. Check the Summary section of the **Build** tab: the **Password** row shows whether the configuration includes a password.
