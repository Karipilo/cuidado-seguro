// DashboardProf.jsx — Perfil Profesional Interno con vista detallada y botón volver
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/dashboardProf.css";

function DashboardProf() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [pacientes, setPacientes] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  // Cargar usuario y pacientes
  useEffect(() => {
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!activo || activo.tipoUsuario !== "Profesional Interno") {
      navigate("/login");
      return;
    }

    setUsuario(activo);

    const almacenados = JSON.parse(localStorage.getItem("pacientes"));
    if (Array.isArray(almacenados)) {
      const filtrados = almacenados.filter(
        (p) => p.centro === activo.institucion
      );
      setPacientes(filtrados);
    }
  }, [navigate]);

  const handleSeleccionarPaciente = (p) => {
    setPacienteSeleccionado(p);
  };

  const volverAtras = () => {
    setPacienteSeleccionado(null);
  };

  if (!usuario) return null;

  return (
    <div className="dashboard-prof-container py-4 container">
      {/* CABECERA */}
      <div className="header-dashboard-prof d-flex justify-content-between align-items-center">
        <h2 className="fw-bold">Pacientes</h2>

        {usuario.institucion && (
          <span className="institucion-tag">{usuario.institucion}</span>
        )}
      </div>

      {/* ============================ */}
      {/*   SIN SELECCIONAR PACIENTE   */}
      {/* ============================ */}
      {!pacienteSeleccionado && (
        <div className="row mt-3">
          {pacientes.map((p) => (
            <div
              key={p.id}
              className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4"
              onClick={() => handleSeleccionarPaciente(p)}
              style={{ cursor: "pointer" }}
            >
              <div
                className="card shadow-sm h-100 p-0"
                style={{ borderRadius: "15px", overflow: "hidden" }}
              >
                <img
                  src={p.foto}
                  alt={p.nombre}
                  style={{
                    width: "100%",
                    height: "260px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div className="text-center py-3">
                  <h6 className="fw-bold m-0">{p.nombre}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ============================ */}
      {/*   PACIENTE SELECCIONADO      */}
      {/* ============================ */}
      {pacienteSeleccionado && (
        <div className="row mt-3">
          {/* BOTÓN VOLVER */}
          <div className="col-12 mb-3">
            <button className="btn btn-secondary" onClick={volverAtras}>
              ← Volver atrás
            </button>
          </div>

          {/* PANEL DEL PACIENTE */}
          <div className="col-12 col-lg-8 mx-auto">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="text-primary fw-bold">
                  {pacienteSeleccionado.nombre}
                </h4>

                <p>
                  <strong>RUT:</strong> {pacienteSeleccionado.rut}
                </p>
                <p>
                  <strong>Edad:</strong> {pacienteSeleccionado.edad} años
                </p>
                <p>
                  <strong>Diagnóstico:</strong>{" "}
                  {pacienteSeleccionado.diagnostico}
                </p>
                <p>
                  <strong>Alergias:</strong> {pacienteSeleccionado.alergias}
                </p>
                <p>
                  <strong>Observaciones:</strong>{" "}
                  {pacienteSeleccionado.observaciones}
                </p>

                {/* ----- MENSAJES DEL TUTOR ----- */}
                <hr />
                <h5 className="text-info fw-bold mt-3">Mensajes del Tutor</h5>
                <div className="mt-3">
                  {pacienteSeleccionado.mensajesTutor?.length > 0 ? (
                    <ul>
                      {pacienteSeleccionado.mensajesTutor.map((m, i) => (
                        <li key={i}>
                          <strong>{m.fecha}:</strong> {m.asunto} — {m.cuerpo}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">Sin mensajes del tutor.</p>
                  )}
                </div>

                {/* ----- PROFESIONAL EXTERNO ----- */}
                <hr />
                <h5 className="text-info fw-bold mt-3">
                  Información del Profesional Externo
                </h5>

                {/* Notas */}
                <div className="mt-3">
                  <h6 className="fw-bold">Notas</h6>
                  {pacienteSeleccionado.notasExterno?.length > 0 ? (
                    <ul>
                      {pacienteSeleccionado.notasExterno.map((n, i) => (
                        <li key={i}>
                          <strong>{n.fecha}:</strong> {n.contenido}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">Sin notas registradas.</p>
                  )}
                </div>

                {/* Exámenes */}
                <div className="mt-3">
                  <h6 className="fw-bold">Exámenes</h6>
                  {pacienteSeleccionado.examenes?.length > 0 ? (
                    <ul>
                      {pacienteSeleccionado.examenes.map((x, i) => (
                        <li key={i}>
                          <strong>{x.fecha}:</strong> {x.contenido}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">Sin exámenes registrados.</p>
                  )}
                </div>

                {/* Recetas */}
                <div className="mt-3">
                  <h6 className="fw-bold">Recetas</h6>
                  {pacienteSeleccionado.recetas?.length > 0 ? (
                    <ul>
                      {pacienteSeleccionado.recetas.map((r, i) => (
                        <li key={i}>
                          <strong>{r.fecha}:</strong> {r.contenido}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">Sin recetas registradas.</p>
                  )}
                </div>

                {/* Certificados */}
                <div className="mt-3">
                  <h6 className="fw-bold">Certificados</h6>
                  {pacienteSeleccionado.certificados?.length > 0 ? (
                    <ul>
                      {pacienteSeleccionado.certificados.map((c, i) => (
                        <li key={i}>
                          <strong>{c.fecha}:</strong> {c.contenido}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">Sin certificados registrados.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardProf;
