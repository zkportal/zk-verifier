# zk-verifier

A WebAssembly library for verifying zero-knowledge proofs from zkPortal.

This library is derived from [ark-circom](https://github.com/gakonst/ark-circom).

Proof verification function is exported and compiled into a WebAssembly module using `wasm-pack`.

This library is ES2015 module for now, so that means you probably need to transpile it, e.g. to run in Node.

## Usage

The package is not published to NPM yet. Download `dist` directory if you want to add files to your project, or download the whole repository and import it as a local package.

```js
import init, { verify_proof } from 'zk-verifier';

async function verify() {
  await init(); // uses bundled WebAssembly module, you can also provide an argument, see API section of the README
  const verifyingKey = Uint8Array.from(...);
  const proof = Uint8Array.from(...);
  const publicInputs = Uint8Array.from(...);
  const success = verify_proof(verifyingKey, proof, publicInputs);
}
```

### API

| Function | Description | Arguments | Return | Other |
|---|---|---|---|---|
| `init` | Initialize the module | One of: <ul><li>`undefined`</li><li>`string` with WebAssembly module URL</li><li>`URL`</li><li>Fetch API `Request`</li><li>Fetch API `Response`</li><li>`BufferSource`</li><li>`WebAssembly.Module`</li><li>`Promise` of any type above</li></ul> | `Promise<any>` |  Default export |
| `verify_proof` | Verify a proof using a proof, verifying key, and public inputs | <ul><li>`verifying_key`:&nbsp; `Uint8Array`</li><li>`proof`:&nbsp; `Uint8Array`</li><li>`public_inputs`:&nbsp; `Uint8Array`</li></ul> | `boolean` - verification success | Destructured export |

## Examples

Examples provide the following files:
- `proof.json` - contains serialized decimal bytes of a zero-knowledge proof
- `verifying_key.json` - contains serialized decimal bytes of a verifying key you can use with the proof to verify it
- `public_inputs.json` - contains serialized decimal bytes of public inputs you need to supply to verify the proof

If you use a bundler, then you can import those files, then create `Uint8Array` arrays from them and supply to `verify_proof` function.

- [Banlist](examples/banlist/) This directory contains JSON files with serialized inputs you can use to verify that supplied country code "NL" is not in the list of banned countries "US IR RU".
