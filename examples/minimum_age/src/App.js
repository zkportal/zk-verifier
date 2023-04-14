import { useEffect, useState, useCallback } from 'react';
import init, { verify_proof } from '@zkportal/zk-verifier';

import logo from './logo.svg';
import './App.css';

import proofData from './proof.json';
import publicInputsData from './public_inputs.json';

function App() {
  const [initCompleted, setInitCompleted] = useState(false);
  const [verificationStarted, setVerificationStarted] = useState(false);
  const [keyFetchFailed, setKeyFetchFailed] = useState(false);
  const [verifyingKey, setVerifyingKey] = useState();
  const [result, setResult] = useState("");

  const getVerifyingKey = async () => {
    try {
      // See https://zkportal.io/docs/Public_api.html for more details
      const response = await fetch('https://backend.zkportal.io:444/v1/static/age_proofs/verifying_key', { cache: 'no-cache' });
      const keyBuffer = await response.arrayBuffer();

      setVerifyingKey(new Uint8Array(keyBuffer));
    } catch (e) {
      setKeyFetchFailed(true);
      setResult(`Failed to fetch verifying key, reason: ${e}`);
    }
  };

  useEffect(() => {
    init()
      .then(() => {
        setInitCompleted(true);
      })
      .catch((e) => {
        setResult(`Failed to initialize zk-verifier, reason - ${e}`);
      })
      .then(getVerifyingKey);
  }, []);

  const startVerification = useCallback(async () => {
    if (!initCompleted || !verifyingKey) {
      setResult('Cannot start proof verification before initialization is completed');
      return;
    }

    setVerificationStarted(true);

    const proof = Uint8Array.from(proofData);
    const publicInputs = Uint8Array.from(publicInputsData);
    const success = verify_proof(verifyingKey, proof, publicInputs);

    setVerificationStarted(false);

    if (success) {
      setResult('Verified a proof that a user is older than the minimum age');
    } else {
      setResult('Failed to verify a proof that a user is older than the minimum age');
    }
  }, [initCompleted, verifyingKey]);

  return (
    <div className="App">
      <header className="App-header">
        {verificationStarted && <img src={logo} className="App-logo" alt="logo" />}

        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'center' }}>
          <p>
            Proof verification example using minimum age comparison. By verifying the proof you verify that the (hidden) user's date of birth as timestamp, which is 0 in this case (1970-01-01 00:00:00),
            is earlier than the date of minimum age as timestamp, which is 1113565045.
          </p>
          <button onClick={startVerification} disabled={verificationStarted || keyFetchFailed} id="verify-button">Verify</button>
        </div>

        <p>{result}</p>
      </header>
    </div>
  );
}

export default App;
