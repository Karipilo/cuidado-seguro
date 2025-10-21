import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


//import "../style/style.css";

function Paciente() {
  useEffect(() => {
    document.getElementById("pacNombre").innerText = "Juan Pérez Soto";
    document.getElementById("pacCentro").innerText = "ELEAM Alerces";
    document.getElementById("pacCiudad").innerHTML = '<i class="bi bi-geo-alt me-1"></i>Viña del Mar';
    document.getElementById("pacContacto").innerText = "Contacto: María López (Hermana) — +56 9 1234 5678";
    document.getElementById("pacIdentificacion").innerText = "RUT: 12.345.678-9";
    document.getElementById("pacEdadSexo").innerText = "78 años, Masculino";
    document.getElementById("pacDiagnosticos").innerText = "Hipertensión arterial, Diabetes tipo II";
    document.getElementById("pacAlergias").innerText = "Penicilina";
    document.getElementById("pacContactos").innerText = "Tutor legal: María López";
    document.getElementById("tablaMeds").innerHTML = `
      <tr><td>Enalapril</td><td>10 mg</td><td>VO</td><td>1 vez al día</td><td>HTA</td><td>01-01-2024</td><td>—</td></tr>
      <tr><td>Metformina</td><td>850 mg</td><td>VO</td><td>2 veces al día</td><td>Diabetes</td><td>15-03-2024</td><td>—</td></tr>`;
    document.getElementById("medsContador").innerText = "2 activos";
    document.getElementById("listaControles").innerHTML = `
      <li class="list-group-item"><strong>05-06-2024</strong> — Control médico general con Dr. Ramírez (Presión y glicemia estables)</li>
      <li class="list-group-item"><strong>20-07-2024</strong> — Control enfermería (Revisión de pie diabético)</li>`;
    document.getElementById("pacQx").innerText = "Colecistectomía (2010)";
    document.getElementById("pacHabitos").innerText = "Exfumador, actividad física ligera";
    document.getElementById("pacVacunas").innerText = "Influenza 2023, COVID-19 esquema completo";
    document.getElementById("pacRiesgos").innerText = "Caídas, Hipoglicemia";
  }, []);

  return (
    <div className="container py-3 tutor-body">
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
        <div>
          <h1 className="h4 mb-1">Panel del Tutor/Familiar</h1>
          <p className="text-muted mb-0">Revisa antecedentes, medicamentos y controles del paciente seleccionado.</p>
        </div>
        <span id="chipConexion" className="badge text-bg-success">Conectado</span>
      </div>

      <ul className="nav nav-tabs" id="tabsTutor" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="tab-detalle-tab" data-bs-toggle="tab" data-bs-target="#tab-detalle"
            type="button" role="tab">
            <i className="bi bi-person-vcard me-1"></i> Paciente (detalle)
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="tab-mensajes-tab" data-bs-toggle="tab" data-bs-target="#tab-mensajes"
            type="button" role="tab">
            <i className="bi bi-chat-dots me-1"></i> Mensajes
          </button>
        </li>
      </ul>

      <div className="tab-content pt-3">
        <div className="tab-pane fade show active" id="tab-detalle" role="tabpanel">
          <div className="card shadow-sm mb-3">
            <div className="card-body d-flex flex-wrap align-items-center gap-3">
              <div className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                style={{ width: "56px", height: "56px" }}>
                <i className="bi bi-person fs-3 text-muted"></i>
              </div>
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <h2 className="h5 mb-0" id="pacNombre">Paciente</h2>
                  <span className="badge text-bg-secondary" id="pacCentro">Centro</span>
                  <span className="badge text-bg-light border" id="pacCiudad">Ciudad</span>
                </div>
                <small className="text-muted" id="pacContacto">Contacto</small>
              </div>
              <div className="text-end">
                <a className="btn btn-sm btn-outline-primary" href="#">
                  <i className="bi bi-box-arrow-up-right me-1"></i> Ver ficha completa
                </a>
              </div>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-3"><div className="border rounded p-2 h-100"><div className="text-muted small">Identificación</div><div id="pacIdentificacion" className="fw-semibold">—</div><div id="pacEdadSexo" className="small text-muted">—</div></div></div>
            <div className="col-md-3"><div className="border rounded p-2 h-100"><div className="text-muted small">Diagnósticos</div><div id="pacDiagnosticos">—</div></div></div>
            <div className="col-md-3"><div className="border rounded p-2 h-100"><div className="text-muted small">Alergias</div><div id="pacAlergias">—</div></div></div>
            <div className="col-md-3"><div className="border rounded p-2 h-100"><div className="text-muted small">Contactos</div><div id="pacContactos">—</div></div></div>
          </div>

          <div className="mt-4 card shadow-sm">
            <div className="card-header d-flex align-items-center justify-content-between">
              <strong><i className="bi bi-capsule-pill me-1"></i> Medicamentos activos</strong>
              <span className="small text-muted" id="medsContador">—</span>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-sm align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Fármaco</th><th>Dosis</th><th>Vía</th><th>Frecuencia</th><th>Indicación</th><th>Desde</th><th>Hasta</th>
                    </tr>
                  </thead>
                  <tbody id="tablaMeds"></tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-4 card shadow-sm">
            <div className="card-header d-flex align-items-center justify-content-between">
              <strong><i className="bi bi-clipboard2-check me-1"></i> Controles realizados</strong>
              <div className="input-group input-group-sm" style={{ maxWidth: "260px" }}>
                <span className="input-group-text"><i className="bi bi-search"></i></span>
                <input className="form-control" placeholder="Filtrar por profesional/motivo…" />
              </div>
            </div>
            <ul className="list-group list-group-flush" id="listaControles"></ul>
          </div>

          <div className="mt-4 card shadow-sm">
            <div className="card-header">
              <strong><i className="bi bi-journal-medical me-1"></i> Otros antecedentes médicos</strong>
            </div>
            <div className="card-body row g-3">
              <div className="col-md-3"><div className="border rounded p-2 h-100"><div className="text-muted small">Quirúrgicos</div><div id="pacQx">—</div></div></div>
              <div className="col-md-3"><div className="border rounded p-2 h-100"><div className="text-muted small">Hábitos</div><div id="pacHabitos">—</div></div></div>
              <div className="col-md-3"><div className="border rounded p-2 h-100"><div className="text-muted small">Vacunas</div><div id="pacVacunas">—</div></div></div>
              <div className="col-md-3"><div className="border rounded p-2 h-100"><div className="text-muted small">Riesgos</div><div id="pacRiesgos">—</div></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paciente;
