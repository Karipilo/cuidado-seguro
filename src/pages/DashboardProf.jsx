// DashboardProf.jsx — Perfil Profesional Interno conectado al backend real

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/dashboardProf.css";
import { getPacientes } from "../services/pacienteService";

function DashboardProf() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [pacientes, setPacientes] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  
  // CARGAR USUARIO ACTIVO
  
  useEffect(() => {
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!activo || activo.tipoUsuario !== "Profesional Interno") {
      navigate("/login");
      return;
    }

    setUsuario(activo);
  }, [navigate]);

  
  // CARGAR PACIENTES DEL BACKEND SEGÚN LA INSTITUCIÓN DEL PROFESIONAL
  
  useEffect(() => {
    if (!usuario) return;

    const cargar = async () => {
      try {
        const data = await getPacientes();

        // Convertir nombres del backend (snake_case) a camelCase
        const pacientesConvertidos = data.map((p) => ({
          id: p.id,
          nombreCompleto: p.nombre_completo,
          rut: p.rut,
          edad: p.edad,
          diagnostico: p.diagnostico,
          alergias: p.alergias,
          observaciones: p.observaciones,
          ciudad: p.ciudad,
          centro: p.centro,
        }));

        // Filtrar los pacientes de la institución del profesional
        const filtrados = pacientesConvertidos.filter(
          (p) => p.centro === usuario.institucion
        );

        setPacientes(filtrados);
      } catch (error) {
        console.error("Error obteniendo pacientes:", error);
      }
    };

    cargar();
  }, [usuario]);

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

      {/* LISTA DE PACIENTES */}
      {!pacienteSeleccionado && (
        <div className="row mt-3">
          {pacientes.length === 0 ? (
            <p className="text-muted mt-4">No hay pacientes registrados para este centro.</p>
          ) : (
            pacientes.map((p) => (
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
                  <div
                    className="text-center py-3"
                    style={{ height: "260px", background: "#f2f2f2" }}
                  >
                    <h6 className="fw-bold">{p.nombreCompleto}</h6>
                    <p className="text-muted">{p.rut}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* PACIENTE SELECCIONADO */}
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
                  {pacienteSeleccionado.nombreCompleto}
                </h4>

                <p><strong>RUT:</strong> {pacienteSeleccionado.rut}</p>
                <p><strong>Edad:</strong> {pacienteSeleccionado.edad || "-"}</p>
                <p><strong>Diagnóstico:</strong> {pacienteSeleccionado.diagnostico || "No registrado"}</p>
                <p><strong>Alergias:</strong> {pacienteSeleccionado.alergias || "No registradas"}</p>
                <p><strong>Observaciones:</strong> {pacienteSeleccionado.observaciones || "Sin observaciones"}</p>
                <p><strong>Ciudad:</strong> {pacienteSeleccionado.ciudad}</p>
                <p><strong>Centro:</strong> {pacienteSeleccionado.centro}</p>

                {/* SECCIONES */}
                <hr />
                <h5 className="text-info fw-bold mt-3">Notas Clínicas</h5>
                <p className="text-muted">Sin notas clínicas registradas.</p>

                <hr />
                <h5 className="text-info fw-bold mt-3">Controles Médicos</h5>
                <p className="text-muted">Sin controles registrados.</p>

                <hr />
                <h5 className="text-info fw-bold mt-3">Mensajes del Tutor</h5>
                <p className="text-muted">Mensajes no conectados al backend aún.</p>

                <hr />
                <h5 className="text-info fw-bold mt-3">Exámenes</h5>
                <p className="text-muted">Sin exámenes registrados.</p>

                <hr />
                <h5 className="text-info fw-bold mt-3">Recetas</h5>
                <p className="text-muted">Sin recetas registradas.</p>

                <hr />
                <h5 className="text-info fw-bold mt-3">Certificados</h5>
                <p className="text-muted">Sin certificados registrados.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardProf;
