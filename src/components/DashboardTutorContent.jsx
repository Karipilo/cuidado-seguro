// DashboardTutorContent.jsx
// Panel del Tutor conectado al backend REAL (GET /api/pacientes)

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPacientes } from "../services/pacienteService";

function DashboardTutorContent() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [tab, setTab] = useState("detalle");
  const [mensajes, setMensajes] = useState([]);
  const [asunto, setAsunto] = useState("");
  const [cuerpo, setCuerpo] = useState("");

  
  // CARGA DE USUARIO ACTIVO 
  
  useEffect(() => {
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!activo) {
      navigate("/login");
      return;
    }

    if (activo.tipoUsuario !== "Tutor") {
      navigate("/login");
      return;
    }

    setUsuario(activo);
  }, [navigate]);

  
  // CARGAR PACIENTE DESDE EL BACKEND POR RUT 
  
  useEffect(() => {
    if (!usuario) return;

    const cargarPaciente = async () => {
      try {
        const data = await getPacientes();

        // Buscamos el paciente asignado al tutor
        const encontrado = data.find((p) => p.rut === usuario.idPaciente);

        if (!encontrado) {
          console.warn("Paciente no encontrado para este tutor.");
        }

        setPaciente(encontrado);
      } catch (error) {
        console.error("Error al cargar pacientes:", error);
      }
    };

    cargarPaciente();
  }, [usuario]);

  
  // MANEJO DE MENSAJES (local por ahora)
  
  const handleEnviarMensaje = (e) => {
    e.preventDefault();

    if (!asunto || !cuerpo) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const nuevoMensaje = {
      asunto,
      cuerpo,
      fecha: new Date().toLocaleString(),
    };

    setMensajes((prev) => [...prev, nuevoMensaje]);

    setAsunto("");
    setCuerpo("");
  };

  
  // RENDER FINAL 
  
  if (!usuario) return <p className="text-center mt-5">Cargando usuario...</p>;

  if (!paciente)
    return (
      <div className="container mt-5 text-center">
        <h4>No se encontró un paciente asignado a este tutor.</h4>
        <p>Verifica el RUT asignado en el registro.</p>
      </div>
    );

  return (
    <div className="container py-4">
      <h3 className="text-center mb-4">
        Panel del Tutor – <span className="text-primary">{usuario.nombre}</span>
      </h3>

      {/* Pestañas */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "detalle" ? "active" : ""}`}
            onClick={() => setTab("detalle")}
          >
            Detalle del Paciente
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${tab === "mensajes" ? "active" : ""}`}
            onClick={() => setTab("mensajes")}
          >
            Mensajes
          </button>
        </li>
      </ul>

      <div className="card shadow-sm p-4">
        {tab === "detalle" && (
          <div>
            <h5 className="fw-bold">{paciente.nombreCompleto}</h5>
            <p className="text-muted mb-1">{paciente.centro}</p>
            <p className="text-muted">Ubicación: {paciente.ciudad}</p>

            <p>
              <strong>Diagnóstico:</strong> {paciente.diagnostico || "Sin registro"}
            </p>

            <p>
              <strong>Alergias:</strong> {paciente.alergias || "No registradas"}
            </p>

            <p>
              <strong>Observaciones:</strong>{" "}
              {paciente.observaciones || "Sin observaciones"}
            </p>

            <p>
              <strong>Edad:</strong> {paciente.edad || "-"}
            </p>
          </div>
        )}

        {tab === "mensajes" && (
          <div>
            <h5 className="fw-bold mb-3 text-primary">📩 Enviar mensaje</h5>

            <form onSubmit={handleEnviarMensaje}>
              <div className="mb-3">
                <label className="form-label">Asunto</label>
                <input
                  type="text"
                  className="form-control"
                  value={asunto}
                  onChange={(e) => setAsunto(e.target.value)}
                  placeholder="Ej: Consulta sobre medicación"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Mensaje</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={cuerpo}
                  onChange={(e) => setCuerpo(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
            </form>

            <hr />

            <h6 className="fw-bold text-primary">📬 Bandeja de mensajes</h6>

            {mensajes.length === 0 ? (
              <p className="text-muted">No hay mensajes aún.</p>
            ) : (
              <ul className="list-group">
                {mensajes.map((m, i) => (
                  <li key={i} className="list-group-item">
                    <strong>{m.asunto}</strong> <br />
                    <span>{m.cuerpo}</span>
                    <p className="small text-muted mb-0">{m.fecha}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardTutorContent;
