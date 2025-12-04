// DashboardTutor.jsx — Versión corregida sin pacientes locales

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { normalizarRut } from "../utils/rutUtils";
import "../style/dashboardTutor.css";

function DashboardTutor() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [asunto, setAsunto] = useState("");
  const [cuerpo, setCuerpo] = useState("");

  
  // Cargar datos del usuario y paciente asignado
  
  useEffect(() => {
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!activo || activo.tipoUsuario !== "Tutor") {
      navigate("/login");
      return;
    }

    setUsuario(activo);

    //  YA NO SE CARGA DESDE LOCALSTORAGE NI DESDE pacientes.js
    // Solo se prepara un "placeholder" hasta conectar backend
    if (activo.idPaciente) {
      setPacienteSeleccionado({
        nombre: "Paciente asignado",
        rut: activo.idPaciente,
        edad: "—",
        diagnostico: "—",
        alergias: "—",
        observaciones: "—",
        foto: "/images/default-user.png",
        medicamentos: [],
        notas: [],
        controles: [],
        mensajesTutor: [],
        evoluciones: [],
      });
    }
  }, [navigate]);

  
  // Enviar mensaje (por ahora guardado solo localmente)
  
  const handleEnviarMensaje = () => {
    if (!asunto.trim() || !cuerpo.trim()) return;

    const nuevoMensaje = {
      asunto,
      cuerpo,
      fecha: new Date().toLocaleString(),
    };

    const nuevosMensajes = [...mensajes, nuevoMensaje];
    setMensajes(nuevosMensajes);

    // Cuando conectemos backend: aquí irá el POST real
    setAsunto("");
    setCuerpo("");
  };

  
  // Si no existe paciente asignado
  
  if (!usuario || !pacienteSeleccionado) {
    return (
      <div className="container py-4">
        <h4>No se encontró un paciente asignado al tutor.</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row g-4">
        {/* COLUMNA IZQUIERDA */}
        <div className="col-lg-4">
          {/* Información del familiar */}
          <div className="dashboard-card mb-4">
            <h5 className="section-title">Información del Familiar</h5>
            <ul className="list-group list-group-flush clean-list">
              <li className="list-group-item">
                <strong>Nombre:</strong> {usuario.nombre}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> {usuario.email}
              </li>
            </ul>
          </div>

          {/* Enviar mensaje */}
          <div className="dashboard-card mb-4">
            <h5 className="section-title">Enviar mensaje al centro</h5>

            <label className="fw-semibold">Asunto</label>
            <input
              type="text"
              className="form-control mb-3"
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
            />

            <label className="fw-semibold">Mensaje</label>
            <textarea
              className="form-control mb-3"
              rows="3"
              value={cuerpo}
              onChange={(e) => setCuerpo(e.target.value)}
            ></textarea>

            <button
              className="btn btn-principal w-100"
              onClick={handleEnviarMensaje}
            >
              Enviar Mensaje
            </button>
          </div>

          {/* Mensajes enviados */}
          <div className="dashboard-card">
            <h5 className="section-title">Mensajes enviados</h5>

            {mensajes.length === 0 ? (
              <p className="text-muted">No hay mensajes enviados aún.</p>
            ) : (
              mensajes.map((m, i) => (
                <div key={i} className="mensaje-item">
                  <small className="text-muted">{m.fecha}</small>
                  <div>
                    <strong>Asunto:</strong> {m.asunto}
                  </div>
                  <p className="mb-0">{m.cuerpo}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA — Información del paciente */}
        <div className="col-lg-8">
          <div className="dashboard-card">
            {/* ENCABEZADO PACIENTE */}
            <div className="row g-4 align-items-center">
              <div className="col-md-4 text-center">
                <img
                  src={pacienteSeleccionado.foto}
                  alt={pacienteSeleccionado.nombre}
                  className="avatar-paciente"
                />
              </div>

              <div className="col-md-8 paciente-info">
                <h3 className="fw-bold text-primary mb-2">
                  {pacienteSeleccionado.nombre}
                </h3>

                <p>
                  <strong>RUT:</strong> {pacienteSeleccionado.rut}
                </p>
                <p>
                  <strong>Edad:</strong> {pacienteSeleccionado.edad}
                </p>
                <p>
                  <strong>Diagnóstico:</strong> {pacienteSeleccionado.diagnostico}
                </p>
                <p>
                  <strong>Alergias:</strong> {pacienteSeleccionado.alergias}
                </p>
                <p>
                  <strong>Observaciones:</strong>{" "}
                  {pacienteSeleccionado.observaciones}
                </p>
              </div>
            </div>

            <hr />

            {/* SECCIONES */}
            {[
              { titulo: "Medicamentos", lista: pacienteSeleccionado.medicamentos },
              { titulo: "Controles", lista: pacienteSeleccionado.controles },
              { titulo: "Notas Clínicas", lista: pacienteSeleccionado.notas },
              { titulo: "Mensajes del Tutor", lista: mensajes },
              { titulo: "Evoluciones", lista: pacienteSeleccionado.evoluciones },
            ].map((item, idx) => (
              <div key={idx} className="section-box">
                <h5 className="fw-bold text-primary">{item.titulo}</h5>

                {item.lista && item.lista.length > 0 ? (
                  <ul className="list-group clean-list">
                    {item.lista.map((entry, i) => (
                      <li key={i} className="list-group-item">
                        {typeof entry === "string" ? (
                          entry
                        ) : (
                          <>
                            {entry.fecha && <strong>{entry.fecha}: </strong>}
                            {entry.contenido ||
                              entry.asunto ||
                              JSON.stringify(entry)}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">
                    No hay {item.titulo.toLowerCase()} registrados.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardTutor;
