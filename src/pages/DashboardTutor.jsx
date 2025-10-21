// ✅ IMPORTAMOS DEPENDENCIAS REACT Y ROUTER
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function DashboardTutor() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [tab, setTab] = useState("detalle");
  const [mensajes, setMensajes] = useState([]);
  const [para, setPara] = useState("Profesional de Salud a cargo");
  const [asunto, setAsunto] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState("Juan Pérez Soto");

  useEffect(() => {
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!activo || activo.tipoUsuario !== "Tutor") {
      navigate("/login");
      return;
    }
    setUsuario(activo);
  }, [navigate]);

  const paciente = {
    nombre: pacienteSeleccionado,
    centro: "ELEAM Alerces",
    ciudad: "Viña del Mar",
    contacto: "Contacto: María López (Hermana) — +56 9 1234 5678",
    identificacion: "RUT: 12.345.678-9",
    edadSexo: "78 años, Masculino",
    diagnosticos: "Hipertensión arterial, Diabetes tipo II",
    alergias: "Penicilina",
    contactos: "Tutor legal: María López",
    medicamentos: [
      {
        farmaco: "Enalapril",
        dosis: "10 mg",
        via: "VO",
        frecuencia: "1 vez al día",
        indicacion: "HTA",
        desde: "01-01-2024",
        hasta: "—",
      },
      {
        farmaco: "Metformina",
        dosis: "850 mg",
        via: "VO",
        frecuencia: "2 veces al día",
        indicacion: "Diabetes",
        desde: "15-03-2024",
        hasta: "—",
      },
    ],
    controles: [
      {
        fecha: "05-06-2024",
        detalle: "Control médico general con Dr. Ramírez (Presión y glicemia estables)",
      },
      {
        fecha: "20-07-2024",
        detalle: "Control enfermería (Revisión de pie diabético)",
      },
    ],
    quirurgicos: "Colecistectomía (2010)",
    habitos: "Exfumador, actividad física ligera",
    vacunas: "Influenza 2023, COVID-19 esquema completo",
    riesgos: "Caídas, Hipoglicemia",
  };

  const enviarMensaje = () => {
    if (asunto.trim() === "" || cuerpo.trim() === "") return;
    const nuevo = {
      id: mensajes.length + 1,
      para,
      asunto,
      cuerpo,
      leido: false,
    };
    setMensajes([nuevo, ...mensajes]);
    setAsunto("");
    setCuerpo("");
  };

  const pacientesDisponibles = [
    "Juan Pérez Soto",
    "María González Ríos",
    "Luis Andrade Mora"
  ];

  return (
    <div className="tutor-body bg-light-blue py-4 px-3">
      <div className="container">
        {/* TOPBAR PERSONALIZADA */}
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

        <p className="text-muted">Revisa antecedentes, medicamentos y controles del paciente seleccionado.</p>

        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button className={`nav-link${tab === "detalle" ? " active" : ""}`} onClick={() => setTab("detalle")}>📄 Paciente (detalle)</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link${tab === "mensajes" ? " active" : ""}`} onClick={() => setTab("mensajes")}>💬 Mensajes</button>
          </li>
        </ul>

        {tab === "detalle" && (
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
                  <div className="col-md-3"><div className="border rounded p-2 h-100">
                    <div className="text-muted small">Identificación</div>
                    <div className="fw-semibold">{paciente.identificacion}</div>
                    <div className="small text-muted">{paciente.edadSexo}</div></div></div>
                  <div className="col-md-3"><div className="border rounded p-2 h-100">
                    <div className="text-muted small">Diagnósticos</div>
                    <div>{paciente.diagnosticos}</div></div></div>
                  <div className="col-md-3"><div className="border rounded p-2 h-100">
                    <div className="text-muted small">Alergias</div>
                    <div>{paciente.alergias}</div></div></div>
                  <div className="col-md-3"><div className="border rounded p-2 h-100">
                    <div className="text-muted small">Contactos</div>
                    <div>{paciente.contactos}</div></div></div>
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
                    <tr><th>Fármaco</th><th>Dosis</th><th>Vía</th><th>Frecuencia</th><th>Indicación</th><th>Desde</th><th>Hasta</th></tr>
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
                  <div className="col-md-3"><div className="border rounded p-2 h-100">
                    <div className="text-muted small">Quirúrgicos</div><div>{paciente.quirurgicos}</div></div></div>
                  <div className="col-md-3"><div className="border rounded p-2 h-100">
                    <div className="text-muted small">Hábitos</div><div>{paciente.habitos}</div></div></div>
                  <div className="col-md-3"><div className="border rounded p-2 h-100">
                    <div className="text-muted small">Vacunas</div><div>{paciente.vacunas}</div></div></div>
                  <div className="col-md-3"><div className="border rounded p-2 h-100">
                    <div className="text-muted small">Riesgos</div><div>{paciente.riesgos}</div></div></div>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === "mensajes" && (
          <div className="row g-3">
            <div className="col-lg-8">
              <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <strong>Bandeja</strong>
                  <span className="badge text-bg-danger">{mensajes.filter(m => !m.leido).length} sin leer</span>
                </div>
                <div className="list-group list-group-flush">
                  {mensajes.length === 0 && (
                    <div className="list-group-item text-muted">No hay mensajes aún.</div>
                  )}
                  {mensajes.map(msg => (
                    <div key={msg.id} className="list-group-item">
                      <div className="fw-semibold">{msg.asunto}</div>
                      <small className="text-muted">Para: {msg.para}</small>
                      <p className="mb-1 small">{msg.cuerpo}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card shadow-sm">
                <div className="card-header"><strong>Nuevo mensaje</strong></div>
                <div className="card-body">
                  <div className="mb-2">
                    <label className="form-label">Para</label>
                    <select className="form-select" value={para} onChange={e => setPara(e.target.value)}>
                      <option>Profesional de Salud a cargo</option>
                      <option>Administrativo</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Asunto</label>
                    <input className="form-control" value={asunto} onChange={e => setAsunto(e.target.value)} placeholder="Motivo…" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mensaje</label>
                    <textarea className="form-control" rows="4" value={cuerpo} onChange={e => setCuerpo(e.target.value)} placeholder="Escribe tu mensaje…" />
                  </div>
                  <button className="btn btn-primary w-100" onClick={enviarMensaje}>
                    <i className="bi bi-send"></i> Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardTutor;





