import React, { useState } from "react";
import { runSimulation } from "./api";

function App() {
  const [doppler, setDoppler] = useState(8);
  const [delay, setDelay] = useState(8);
  const [snr, setSnr] = useState(18);
  const [quantumGain, setQuantumGain] = useState(28);

  const [backendResult, setBackendResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBackendSimulation = async () => {
    try {
      setLoading(true);

      const result = await runSimulation({
        doppler,
        delay,
        snr,
        quantumGain,
      });

      setBackendResult(result);
    } catch (error) {
      alert("Backend simulation failed. Make sure FastAPI backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Quantum OTFS Simulator</h1>

      <div>
        <label>Doppler Bins: {doppler}</label>
        <br />
        <input
          type="range"
          min="4"
          max="16"
          value={doppler}
          onChange={(e) => setDoppler(Number(e.target.value))}
        />
      </div>

      <br />

      <div>
        <label>Delay Bins: {delay}</label>
        <br />
        <input
          type="range"
          min="4"
          max="16"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
        />
      </div>

      <br />

      <div>
        <label>SNR: {snr} dB</label>
        <br />
        <input
          type="range"
          min="2"
          max="35"
          value={snr}
          onChange={(e) => setSnr(Number(e.target.value))}
        />
      </div>

      <br />

      <div>
        <label>Quantum Gain: {quantumGain}%</label>
        <br />
        <input
          type="range"
          min="5"
          max="55"
          value={quantumGain}
          onChange={(e) => setQuantumGain(Number(e.target.value))}
        />
      </div>

      <br />

      <button onClick={handleBackendSimulation} disabled={loading}>
        {loading ? "Running..." : "Run Real Backend Simulation"}
      </button>

      <br />
      <br />

      {backendResult && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "400px",
          }}
        >
          <h2>Simulation Result</h2>
          <p>Classical BER: {backendResult.classical_ber}</p>
          <p>Quantum BER: {backendResult.quantum_ber}</p>
          <p>Improvement: {backendResult.improvement_percent}%</p>
          <p>Estimated Qubits: {backendResult.estimated_qubits}</p>
        </div>
      )}
    </div>
  );
}

export default App;;

