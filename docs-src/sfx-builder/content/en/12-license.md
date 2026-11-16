# License

The application operates under a dual-tier licensing model (Free and Pro). The Free edition provides the core functionality, including password protection and mandatory integrity protection; installer mode requires a Pro license. The Pro license additionally removes the runtime splash screen and enables the deactivation of payload integrity validation.

| | Free | Pro |
|---|---|---|
| Package build | yes | yes |
| Installer mode (shortcuts, uninstaller, UAC) | no | yes |
| Splash screen in the generated package | yes | no |
| Integrity protection | mandatory | configurable |
| Silent package (no window) | no | yes |
| Updates and technical support | not included | 12 months from purchase |

In a package built with a Free license the splash screen and the progress bar are fixed: they cannot be turned off, because the splash screen carries the branding. A silent (no window) package therefore requires a Pro license.

The Pro license is perpetual. Upon expiration of the initial 12-month maintenance period, the software retains full build functionality; however, access to subsequent software updates and technical support ceases.

## Pro License Activation

The license key is entered in the activation wizard, which starts from the **License** page with the **Activate** button.

1. Open the **License** page.
2. Select **Activate**; the wizard opens on the licence key step.
3. Enter the license key received at purchase.
4. Start the activation.

Activation requires an active internet connection and is bound to the local key pair generated on the workstation. After the server confirms the key, the instance switches to Pro status.

With an active Pro licence the primary button on the page changes to **Renew**, which opens the renewal page in the browser.

## Licence Page Fields

The page shows the licence state and the related actions:

| Element | Meaning |
|---|---|
| **License ID** | The unique identifier of the licence. |
| **License ID** | The unique identifier of the licence. |
| **Key identifier** | The first eight characters of the licence public key (fingerprint). |
| **License** | The duration of the usage right: perpetual. |
| **Updates and support** | The end of the update and support period (for example `2031. 11. 03-ig`). Afterwards the program can still be used, but no further updates or support are included. |
| **Activate** / **Renew** | State-dependent button: with an inactive licence it opens the activation wizard, with a Pro licence it opens the renewal page in the browser. |
| **Export** / **Import** | Moving the licence with a `.cpckey` file (see the next section). |

If the running build is newer than the update entitlement, the page indicates that this version runs in free mode and that the previous version remains Pro.

## Offline Activation and Troubleshooting

Activation always requires an internet connection; a separate offline activation procedure does not exist. For a workstation without internet access, activate the license on a machine that has one, then transfer it with the export and import procedure described in the next section.

If activation fails, note the error message shown by the application and send it to technical support together with the license key. No machine identifier has to be collected.

## License Migration (Key Transfer)

The license allocation is cryptographically bound to a locally generated machine key. To migrate the license to a new workstation without consuming an additional license seat:

1. On the previous workstation, open the **License** tab and select **Export**.
2. Save the `.cpckey` file and record its password. The password must be at least 12 characters long.
3. On the new workstation, open the **License** tab, select **Import**, and specify the file.
4. Enter the password.

Importing the `.cpckey` file restores the original cryptographic identity of the client. This preserves the activation state and prevents the allocation of redundant license seats, since the import does not create a new key pair.

![The License tab](../assets/img/en/12-license.png)
