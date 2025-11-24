import React from "react";

function DiagnosticoObservaciones({ paciente }) {
  return (
    <>
      <div className="card shadow-sm mb-3">
        <div className="card-header">
          <strong>
            <i className="bi bi-file-medical me-2"></i>
            Diagnóstico
          </strong>
        </div>
        <div className="card-body">{paciente.diagnostico}</div>
      </div>

      <div className="card shadow-sm mb-3">
        <div className="card-header">
          <strong>
            <i className="bi bi-journal-text me-2"></i>
            Observaciones
          </strong>
        </div>
        <div className="card-body">{paciente.observaciones}</div>
      </div>
    </>
  );
}

export default DiagnosticoObservaciones;
