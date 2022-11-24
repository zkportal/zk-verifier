# zk-verifier

A WebAssembly library for verifying zero-knowledge proofs from zkPortal.

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
