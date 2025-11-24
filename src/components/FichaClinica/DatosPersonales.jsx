import React from "react";

function DatosPersonales({ paciente }) {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-header">
        <strong>
          <i className="bi bi-person-vcard me-2"></i>
          Datos del Paciente
        </strong>
      </div>
      <div className="card-body row g-3">
        <div className="col-md-4">
          <strong>RUT:</strong>
          <p className="mb-0">{paciente.rut}</p>
        </div>

        <div className="col-md-4">
          <strong>Edad:</strong>
          <p className="mb-0">{paciente.edad} años</p>
        </div>

        <div className="col-md-4">
          <strong>Alergias:</strong>
          <p className="mb-0">{paciente.alergias}</p>
        </div>
      </div>
    </div>
  );
}

export default DatosPersonales;
