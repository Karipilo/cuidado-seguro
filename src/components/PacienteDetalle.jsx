// src/components/PacienteDetalle.jsx
import React from "react";

function PacienteDetalle({ paciente }) {
  return (
    <>
      {/* ENCABEZADO PACIENTE */}
      <div className="card shadow-sm mb-3">
        <div className="card-body d-flex flex-wrap align-items-center gap-3">
          <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: 56, height: 56 }}>
            <i className="bi bi-person fs-3 text-muted"></i>
          </div>
          <div className="flex-grow-1">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <h2 className="h5 mb-0">{paciente.nombre}</h2>
              <span className="badge text-bg-secondary">{paciente.centro}</span>
              <span className="badge text-bg-light border">
                <i className="bi bi-geo-alt me-1"></i>{paciente.ciudad}
              </span>
            </div>
            <small className="text-muted">{paciente.contacto}</small>
          </div>
        </div>
      </div>

      {/* ANTECEDENTES */}
      <div className="card shadow-sm mb-3">
        <div className="card-header d-flex justify-content-between">
          <strong><i className="bi bi-clipboard2-pulse me-1"></i> Antecedentes</strong>
          <span className="text-muted small">Actualizado —</span>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <div className="border rounded p-2 h-100">
                <div className="text-muted small">Identificación</div>
                <div className="fw-semibold">{paciente.identificacion}</div>
                <div className="small text-muted">{paciente.edadSexo}</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="border rounded p-2 h-100">
                <div className="text-muted small">Diagnósticos</div>
                <div>{paciente.diagnosticos}</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="border rounded p-2 h-100">
                <div className="text-muted small">Alergias</div>
                <div>{paciente.alergias}</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="border rounded p-2 h-100">
                <div className="text-muted small">Contactos</div>
                <div>{paciente.contactos}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MEDICAMENTOS */}
      <div className="card shadow-sm mb-3">
        <div className="card-header d-flex justify-content-between">
          <strong><i className="bi bi-capsule-pill me-1"></i> Medicamentos activos</strong>
          <span className="small text-muted">{paciente.medicamentos.length} activos</span>
        </div>
        <div className="table-responsive">
          <table className="table table-sm align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Fármaco</th><th>Dosis</th><th>Vía</th><th>Frecuencia</th><th>Indicación</th><th>Desde</th><th>Hasta</th>
              </tr>
            </thead>
            <tbody>
              {paciente.medicamentos.map((med, idx) => (
                <tr key={idx}>
                  <td>{med.farmaco}</td><td>{med.dosis}</td><td>{med.via}</td>
                  <td>{med.frecuencia}</td><td>{med.indicacion}</td>
                  <td>{med.desde}</td><td>{med.hasta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONTROLES */}
      <div className="card shadow-sm mb-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <strong><i className="bi bi-clipboard2-check me-1"></i> Controles realizados</strong>
          <div className="input-group input-group-sm" style={{ maxWidth: 260 }}>
            <span className="input-group-text"><i className="bi bi-search"></i></span>
            <input className="form-control" placeholder="Filtrar por profesional/motivo…" />
          </div>
        </div>
        <ul className="list-group list-group-flush">
          {paciente.controles.map((control, idx) => (
            <li key={idx} className="list-group-item">
              <strong>{control.fecha}</strong> — {control.detalle}
            </li>
          ))}
        </ul>
      </div>

      {/* OTROS ANTECEDENTES */}
      <div className="card shadow-sm mb-3">
        <div className="card-header">
          <strong><i className="bi bi-journal-medical me-1"></i> Otros antecedentes médicos</strong>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <div className="border rounded p-2 h-100">
                <div className="text-muted small">Quirúrgicos</div><div>{paciente.quirurgicos}</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="border rounded p-2 h-100">
                <div className="text-muted small">Hábitos</div><div>{paciente.habitos}</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="border rounded p-2 h-100">
                <div className="text-muted small">Vacunas</div><div>{paciente.vacunas}</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="border rounded p-2 h-100">
                <div className="text-muted small">Riesgos</div><div>{paciente.riesgos}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PacienteDetalle;