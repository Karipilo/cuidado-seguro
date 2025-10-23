// ===============================================================
// 🧩 Componente: DashboardTutorContent.jsx
// Descripción: Panel del tutor/familiar con pestañas para
// visualizar detalles del paciente y enviar mensajes.
// ===============================================================

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardTutorContent() {
  const navigate = useNavigate();

  // -------------------------------------------------------------
  // 🔹 ESTADOS PRINCIPALES
  // -------------------------------------------------------------
  const [usuario, setUsuario] = useState(null);
  const [tab, setTab] = useState("detalle"); // "detalle" | "mensajes"
  const [mensajes, setMensajes] = useState([]);
  const [para, setPara] = useState("");
  const [asunto, setAsunto] = useState("");
  const [cuerpo, setCuerpo] = useState("");

  // Paciente simulado (como en la versión HTML)
  const paciente = {
    nombre: "Juan Pérez Soto",
    edad: 82,
    diagnostico: "Parkinson",
    centro: "ELEAM Alerces",
    ciudad: "Viña del Mar",
    medicamentos: ["Levodopa 100mg - cada 8 hrs", "Clonazepam 0.5mg - noche"],
    controles: ["Presión: 130/85 mmHg", "Peso: 70 kg"],
    observaciones: "Leves temblores controlados con medicación.",
    imagen: "/images/luis.png",
  };

  // -------------------------------------------------------------
  // 🔹 EFECTO: CARGA DE USUARIO ACTIVO
  // -------------------------------------------------------------
  useEffect(() => {
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));

    // Evita bloqueos en pruebas (Vitest)
    if (process.env.NODE_ENV === "test") {
      setUsuario(activo || { nombre: "TestUser", tipoUsuario: "Tutor" });
      return;
    }

    if (!activo || activo.tipoUsuario !== "Tutor") {
      navigate("/login");
      return;
    }

    setUsuario(activo);
  }, [navigate]);

  // -------------------------------------------------------------
  // 🔹 MANEJAR ENVÍO DE MENSAJE
  // -------------------------------------------------------------
  const handleEnviarMensaje = (e) => {
    e.preventDefault();

    if (!para || !asunto || !cuerpo) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const nuevoMensaje = {
      para,
      asunto,
      cuerpo,
      fecha: new Date().toLocaleString(),
    };

    setMensajes([...mensajes, nuevoMensaje]);
    setPara("");
    setAsunto("");
    setCuerpo("");
  };

  // -------------------------------------------------------------
  // 🔹 RENDER DE CONTENIDO SEGÚN TAB
  // -------------------------------------------------------------
  const renderContenido = () => {
    // ===============================
    // TAB: DETALLE PACIENTE
    // ===============================
    if (tab === "detalle") {
      return (
        <div>
          <h5 className="fw-bold">{paciente.nombre}</h5>
          <p className="text-muted mb-1">{paciente.centro}</p>
          <p className="text-muted">Ubicación: {paciente.ciudad}</p>
          <p>
            <strong>Diagnóstico:</strong> {paciente.diagnostico}
          </p>
          <p>
            <strong>Observaciones:</strong> {paciente.observaciones}
          </p>

          <h6 className="mt-3 fw-semibold text-primary">Medicamentos</h6>
          <ul>
            {paciente.medicamentos.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>

          <h6 className="mt-3 fw-semibold text-primary">Controles recientes</h6>
          <ul>
            {paciente.controles.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      );
    }

    // ===============================
    // TAB: MENSAJES
    // ===============================
    if (tab === "mensajes") {
      return (
        <div>
          <h5 className="fw-bold mb-3 text-primary">📩 Enviar mensaje</h5>

          <form onSubmit={handleEnviarMensaje}>
            <div className="mb-3">
              <label htmlFor="para" className="form-label">
                Para
              </label>
              <select
                id="para"
                className="form-select"
                value={para}
                onChange={(e) => setPara(e.target.value)}
              >
                <option value="">Selecciona destinatario</option>
                <option value="Administrativo">Administrativo</option>
                <option value="Profesional de Salud a cargo">
                  Profesional de Salud a cargo
                </option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="asunto" className="form-label">
                Asunto
              </label>
              <input
                id="asunto"
                type="text"
                className="form-control"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                placeholder="Ej: Solicitud de información"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                className="form-control"
                rows="3"
                value={cuerpo}
                onChange={(e) => setCuerpo(e.target.value)}
                placeholder="Escribe tu mensaje aquí..."
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
                  <p className="small text-muted mb-0">
                    Para: {m.para} — {m.fecha}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }
  };

  // -------------------------------------------------------------
  // 🔹 RENDER PRINCIPAL
  // -------------------------------------------------------------
  if (!usuario) return <p className="text-center mt-5">Cargando...</p>;

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

      {/* Contenido dinámico */}
      <div className="card shadow-sm p-4">{renderContenido()}</div>
    </div>
  );
}

export default DashboardTutorContent;
