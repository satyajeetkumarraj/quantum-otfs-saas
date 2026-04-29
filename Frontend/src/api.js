export async function runSimulation(params) {
  const response = await fetch("http://127.0.0.1:8000/simulate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      doppler_bins: params.doppler,
      delay_bins: params.delay,
      snr_db: params.snr,
      quantum_gain: params.quantumGain,
    }),
  });

  if (!response.ok) {
    throw new Error("Simulation failed");
  }

  return await response.json();
}