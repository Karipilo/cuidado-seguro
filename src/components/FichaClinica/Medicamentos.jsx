// Mostrar medicamentos activos del paciente
import React from "react";

function Medicamentos({ medicamentos }) {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-header">
        <strong>
          <i className="bi bi-capsule-pill me-2"></i>
          Medicamentos Activos
        </strong>
      </div>

      <div className="card-body p-0">
        {medicamentos?.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-sm align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Fármaco</th>
                  <th>Dosis</th>
                  <th>Vía</th>
                  <th>Frecuencia</th>
                  <th>Indicación</th>
                  <th>Desde</th>
                  <th>Hasta</th>
                </tr>
              </thead>
              <tbody>
                {medicamentos.map((m, i) => (
                  <tr key={i}>
                    <td>{m.nombre}</td>
                    <td>{m.dosis}</td>
                    <td>{m.via}</td>
                    <td>{m.frecuencia}</td>
                    <td>{m.indicacion}</td>
                    <td>{m.desde}</td>
                    <td>{m.hasta || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted p-3">Sin medicamentos registrados.</p>
        )}
      </div>
    </div>
  );
}

export default Medicamentos;
