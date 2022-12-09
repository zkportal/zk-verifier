import { useEffect, useState, useCallback } from 'react';
import init, { verify_proof } from '@zkportal/zk-verifier';

import logo from './logo.svg';
import './App.css';

import verifyingKeyData from './verifying_key.json';
import proofData from './proof.json';
import publicInputsData from './public_inputs.json';

function App() {
  const [initCompleted, setInitCompleted] = useState(false);
  const [verificationStarted, setVerificationStarted] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    init()
      .then(() => {
        setInitCompleted(true);
      })
      .catch((e) => {
        setResult(`Failed to initialize zk-verifier, reason - ${e}`);
      })
  }, []);

  const startVerification = useCallback(async () => {
    if (!initCompleted) {
      setResult('Cannot start proof verification before initialization is completed');
      return;
    }

    setVerificationStarted(true);

    const verifyingKey = Uint8Array.from(verifyingKeyData);
    const proof = Uint8Array.from(proofData);
    const publicInputs = Uint8Array.from(publicInputsData);
    const success = verify_proof(verifyingKey, proof, publicInputs);

    setVerificationStarted(false);

    if (success) {
      setResult('Verified a proof that user\'s country is not in the banlist');
    } else {
      setResult('Failed to verified a proof that user\'s country is not in the banlist');
    }
  }, [initCompleted]);

  return (
    <div className="App">
      <header className="App-header">
        {verificationStarted && <img src={logo} className="App-logo" alt="logo" />}

        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'center' }}>
          <p>
            Proof verification example using country banlist. By verifying the proof you verify that the (hidden) user's country, which is "NL" in this case,
            is not in the list of banned countries. The banned countries list is "USIRRU".
          </p>
          <button onClick={startVerification} id="verify-button">Verify</button>
        </div>

        <p>{result}</p>
      </header>
    </div>
  );
}

export default App;
