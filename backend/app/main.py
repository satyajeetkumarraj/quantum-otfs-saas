from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import SimulationRequest, SimulationResponse
from app.simulator import run_simulation

app = FastAPI(title="Quantum OTFS Simulator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Quantum OTFS API running"}

@app.post("/simulate", response_model=SimulationResponse)
def simulate(request: SimulationRequest):
    return run_simulation(
        request.doppler_bins,
        request.delay_bins,
        request.snr_db,
        request.quantum_gain
    )
