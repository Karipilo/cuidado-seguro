// src/components/TopbarTutor.jsx
import React from "react"; // Importa React para poder usar JSX.

function TopbarTutor({
  pacienteSeleccionado,
  setPacienteSeleccionado,
  pacientesDisponibles,
}) {
  // Componente funcional TopbarTutor que recibe props.
  return (
    // Renderiza la barra superior del tutor/familiar.
    <div className="d-flex align-items-center justify-content-between mb-3">
      {" "}
      {/* Contenedor flex para alinear elementos. */}
      <div className="d-flex align-items-center gap-2">
        {" "}
        {/* Contenedor para el logo y título. */}
        <img src="/images/logo.png" alt="logo" width="36" height="30" />{" "}
        {/* Logo de la aplicación. */}
        <h1 className="h5 mb-0">Panel del Tutor/Familiar</h1>{" "}
        {/* Título del panel. */}
      </div>
      <div style={{ minWidth: 320, maxWidth: 480 }}>
        {" "}
        {/* Contenedor para el selector de pacientes. */}
        <div className="input-group input-group-sm">
          {" "}
          {/* Grupo de entrada para el selector y botón. */}
          <span className="input-group-text">
            {" "}
            {/* Icono de persona con corazón. */}
            <i className="bi bi-person-heart"></i>{" "}
            {/* Icono de Bootstrap Icons. */}
          </span>{" "}
          {/* Selector de paciente. */}
          <select
            className="form-select"
            value={pacienteSeleccionado}
            onChange={(e) => setPacienteSeleccionado(e.target.value)}
          >
            {pacientesDisponibles.map((p) => (
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
