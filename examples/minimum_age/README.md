# Minimum age example

This is a React app with an example of using `@zkportal/zk-verifier` to verify a proof.

The project contains JSON files with serialized inputs you can use to verify that supplied user age is "older" than minimum age.
Those files are:
- `src/proof.json`
- `src/public_inputs.json`

This example is also fetching the currently used verifying key from zkPortal backend.

In this example, the "minimum age" is 1113565045, which is April 15, 2005 11:37:25 AM.

The "user age" is 0, which is January 1, 1970 12:00:00 AM.

The user is considered older than the minimum age because their "date of birth" is earlier than the "minimum age".

In practice, you can verify that a user is older than 18 years old by the following steps:
1. Get current timestamp and subtract 18 years. That's going to be "minimum age" for the circuit.
2. Get user's date of birth as timestamp. That's going to be "user age" for the circuit. User age timestamp must be a smaller number that the minimum age timestamp.
3. Create a proof

You can find an example of integrating proof verification in `src/App.js`

## Run this example

1. Install dependencies `npm install`
2. Start dev server `npm run start`
3. You will have a page opened in your default browser.
4. Press "Verify" button
