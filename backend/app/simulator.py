import math
import numpy as np

# Later connect real package:
# from quantum_otfs import quantum_otfs_tx_rx

def run_simulation(doppler_bins, delay_bins, snr_db, quantum_gain):
    estimated_qubits = math.ceil(math.log2(doppler_bins * delay_bins))

    # MVP educational model
    classical_ber = 0.42 * math.exp(-snr_db / 7.5)
    quantum_ber = classical_ber * (1 - quantum_gain / 100)

    improvement = ((classical_ber - quantum_ber) / classical_ber) * 100

    return {
        "classical_ber": round(classical_ber, 6),
        "quantum_ber": round(quantum_ber, 6),
        "improvement_percent": round(improvement, 2),
        "estimated_qubits": estimated_qubits
    }
