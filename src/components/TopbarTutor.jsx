
// src/components/TopbarTutor.jsx
import React from "react";

function TopbarTutor({ pacienteSeleccionado, setPacienteSeleccionado, pacientesDisponibles }) {
  return (
    <div className="d-flex align-items-center justify-content-between mb-3">
      <div className="d-flex align-items-center gap-2">
        <img src="/images/logo.png" alt="logo" width="36" height="30" />
        <h1 className="h5 mb-0">Panel del Tutor/Familiar</h1>
      </div>
      <div style={{ minWidth: 320, maxWidth: 480 }}>
        <div className="input-group input-group-sm">
          <span className="input-group-text">
            <i className="bi bi-person-heart"></i>
          </span>
          <select
            className="form-select"
            value={pacienteSeleccionado}
            onChange={e => setPacienteSeleccionado(e.target.value)}
          >
            {pacientesDisponibles.map(p => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <button
            className="btn btn-outline-primary"
            onClick={() => alert(`Abriendo ficha de ${pacienteSeleccionado}`)}
          >
            <i className="bi bi-box-arrow-up-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopbarTutor;