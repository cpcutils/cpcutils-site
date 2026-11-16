# Troubleshooting and FAQ

## General Specifications

**Are external archive utilities (e.g., 7-Zip) required on the target host?**

No. The generated executable is fully standalone and bundles all necessary extraction components.

**Does the application require system installation?**

No. The application is fully portable. Configuration data is persistently stored in the `profiles\` directory located next to the executable.

**Why does the payload prompt for decryption during execution?**

An AES-256 key was configured on the **Password** tab. The key is requested at runtime and is not stored in plain text within the configuration. To disable encryption, clear the contents of the **Password** field and rebuild the package on the **Build** tab.

**Why does execution fail with an integrity error?**

The Ed25519 signature validation detected unauthorized post-build modifications. Execution is blocked; a clean rebuild is mandatory. Do not edit the built package with archive utilities.

**How is license migration executed?**

Perform a `.cpckey` export on the source machine, followed by an import on the target environment. Details: [License](12-license.html).

**Is network connectivity required for build?**

No. Network access is required only for the initial license activation.

## Diagnostic Error Codes and Resolutions

**No source set**
Resolution: define a valid input directory or archive on the **Source** tab.

**ERROR: source folder does not exist**
Resolution: the defined input path is invalid or inaccessible. Reconfigure the source path.

**ERROR: packer\7z.exe not found**
Resolution: missing dependency. Ensure the `7z` directory containing `7z.exe` and `7z.dll` is present in the application root.

**The build did not finish within 10 minutes**
Resolution: build timeout. Verify background I/O performance and source file accessibility.

**Files missing or damaged after extraction**
Resolution: potential endpoint security interference. Add the source directory and the `%TEMP%` extraction path to the exclusions.

**The password must not contain a double quote**
Resolution: syntax error. Remove the `"` character from the encryption key.

![Troubleshooting reference](../assets/img/en/13-faq.png)

## The Windows SmartScreen Warning

**The "Unknown publisher" message**

The finished package carries no certificate authority (Authenticode) signature, so Windows reports the publisher as unknown when the file is started. This is not an error message and does not indicate malware: the package protects its contents with an internal Ed25519-based integrity check; Windows does not know that mechanism, because SmartScreen evaluates only standard PKI/Authenticode signatures, and therefore treats the file as unsigned.

**When it appears**

The message usually appears when the package arrives from the internet: downloaded through a browser, received as an e-mail attachment, or fetched by a download manager. For files copied from a local network, a OneDrive-synchronised folder or removable media, the message normally does not appear, because the file never receives the Mark of the Web (MotW, Zone.Identifier) marker.

**How to proceed**

- In the message window choose *More info*, then *Run anyway*.
- On the file property sheet (right-click, *Properties*), tick *Unblock* at the bottom of the *General* tab to remove the marker. From a command line the `Unblock-File` cmdlet does the same.
- If the file is copied from a OneDrive-synchronised folder or a network location, the marker is never created in the first place.

**Verifying the package**

The Windows warning is about the origin of the file, not about its contents. Content authenticity is checked by the *Verify* function described in Chapter 11: it states whether the configuration signature is valid, whether the compressed content is unmodified, and whether the extraction stub comes from CPC. When all three checks pass, the package contents are byte-for-byte what the builder produced.

**Enterprise environments**

If an organisation's policy blocks unsigned programs, the package can be allowed by its SHA-256 fingerprint, shown in Chapter 11, in the endpoint protection system. The allowance then refers to the exact contents of the package rather than to a file name or size.
