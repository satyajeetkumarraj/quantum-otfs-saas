from pydantic import BaseModel

class SimulationRequest(BaseModel):
    doppler_bins: int
    delay_bins: int
    snr_db: float
    quantum_gain: float

class SimulationResponse(BaseModel):
    classical_ber: float
    quantum_ber: float
    improvement_percent: float
    estimated_qubits: int