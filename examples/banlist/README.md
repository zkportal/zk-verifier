# Banlist example

This is a React app with an example of using `@zkportal/zk-verifier` to verify a proof.

The project contains JSON files with serialized inputs you can use to verify that supplied country code "NL" is not in the list of banned countries "KP RU IR SO".
Those files are:
- `src/proof.json`
- `src/public_inputs.json`

This example is also fetching the currently used verifying key from zkPortal backend.

You can find an example of integrating proof verification in `src/App.js`

## Run this example

1. Install dependencies `npm install`
2. Start dev server `npm run start`
3. You will have a page opened in your default browser.
4. Press "Verify" button
