# zk-verifier

A WebAssembly library for verifying zero-knowledge proofs from zkPortal.

This library is derived from [ark-circom](https://github.com/gakonst/ark-circom).

Proof verification function is exported and compiled into a WebAssembly module using `wasm-pack`.

This library is ES2015 module for now, so that means you probably need to transpile it, e.g. to run in Node.

## Usage

```js
import init, { verify_proof } from './zk-verifier';

async function verify() {
  await init(); // uses bundled WebAssembly module, you can also provide URL string, URL object, or Request object as an arument
  const verifyingKey = Uint8Array.from(...);
  const proof = Uint8Array.from(...);
  const publicInputs = Uint8Array.from(...);
  const success = verify_proof(verifyingKey, proof, publicInputs);
}
```
