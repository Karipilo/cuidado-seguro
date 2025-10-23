// ===============================================================
// 🧩 Componente: DashboardTutor.jsx
// Descripción: Panel del Tutor/Familiar.
// Permite visualizar la información del paciente asignado
// con datos sincronizados desde localStorage (pacientesData).
// ===============================================================

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardTutor() {
  // ---------------------------------------------------------------
  // 🔹 HOOKS Y ESTADOS PRINCIPALES
  // ---------------------------------------------------------------
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [pacientes, setPacientes] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  // ---------------------------------------------------------------
  // 🔹 CARGA DE USUARIO Y PACIENTES DESDE LOCALSTORAGE
  // ---------------------------------------------------------------
  useEffect(() => {
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!activo || activo.tipoUsuario !== "Tutor") {
      navigate("/login");
      return;
    }
    setUsuario(activo);

    // Cargar pacientes sincronizados
    const almacenados = JSON.parse(localStorage.getItem("pacientesData"));
    if (almacenados && Array.isArray(almacenados)) {
      setPacientes(almacenados);
    } else {
      setPacientes([]);
    }

    // Si el tutor tiene asignado un paciente por su ID
    if (activo.idPaciente) {
      const paciente = almacenados?.find(
        (p) => p.rut === activo.idPaciente
      );
      if (paciente) setPacienteSeleccionado(paciente);
    }
  }, [navigate]);

  // ---------------------------------------------------------------
  // 🔹 FUNCIONES
  // ---------------------------------------------------------------
  const handleSeleccionar = (p) => {
    setPacienteSeleccionado(p);
  };

  // ---------------------------------------------------------------
  // 🔹 RENDERIZADO PRINCIPAL
  // ---------------------------------------------------------------
  if (!usuario) return null;

  return (
    <div className="container-fluid py-4">
      <div className="text-center mb-4">
        <h2 className="fw-semibold text-primary">Panel del Tutor / Familiar</h2>
        <p className="text-muted mb-0">
          👋 Bienvenido, {usuario.nombre}. Aquí puedes consultar la información del paciente asignado.
        </p>
      </div>

      {/* SELECCIONAR PACIENTE (solo si tiene más de uno) */}
      {!pacienteSeleccionado && (
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="fw-bold text-primary">Selecciona un paciente</h5>
            {pacientes.length === 0 ? (
              <p className="text-muted">No hay pacientes registrados en el sistema.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Imagen</th>
                      <th>RUT</th>
                      <th>Nombre</th>
                      <th>Edad</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pacientes.map((p) => (
                      <tr key={p.rut}>
                        <td style={{ width: "90px" }}>
                          <img
                            src={p.imagen}
                            alt={p.nombre}
                            className="rounded-circle"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td>{p.rut}</td>
                        <td>{p.nombre}</td>
                        <td>{p.edad}</td>
                        <td>
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleSeleccionar(p)}
                          >
                            Ver Detalle
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DETALLE DEL PACIENTE */}
      {pacienteSeleccionado && (
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-3 text-center">
                <img
                  src={pacienteSeleccionado.imagen}
                  alt={pacienteSeleccionado.nombre}
                  className="rounded-circle shadow-sm"
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
              </div>
              <div className="col-md-9">
                <h4 className="text-primary">{pacienteSeleccionado.nombre}</h4>
                <p><strong>RUT:</strong> {pacienteSeleccionado.rut}</p>
                <p><strong>Edad:</strong> {pacienteSeleccionado.edad} años</p>
                <p><strong>Diagnóstico:</strong> {pacienteSeleccionado.diagnostico}</p>
                <p><strong>Alergias:</strong> {pacienteSeleccionado.alergias}</p>
                <p><strong>Observaciones:</strong> {pacienteSeleccionado.observaciones}</p>
              </div>
            </div>

            <hr />

            {/* 🩺 Notas Clínicas */}
            <h6 className="fw-bold text-primary mt-3">🩺 Notas Clínicas</h6>
            {pacienteSeleccionado.notas?.length > 0 ? (
              <ul>
                {pacienteSeleccionado.notas.map((n, i) => (
                  <li key={i}>
                    <strong>{n.fecha}:</strong> {n.contenido}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">Sin notas clínicas registradas.</p>
            )}

            {/* 💊 Recetas */}
            <h6 className="fw-bold text-primary mt-3">💊 Recetas</h6>
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

            {/* 🧪 Exámenes */}
            <h6 className="fw-bold text-primary mt-3">🧪 Exámenes</h6>
            {pacienteSeleccionado.examenes?.length > 0 ? (
              <ul>
                {pacienteSeleccionado.examenes.map((e, i) => (
                  <li key={i}>
                    <strong>{e.fecha}:</strong> {e.contenido}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">Sin exámenes registrados.</p>
            )}

            {/* 📜 Certificados */}
            <h6 className="fw-bold text-primary mt-3">📜 Certificados</h6>
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

            <div className="text-end">
              <button
                className="btn btn-secondary mt-3"
                onClick={() => setPacienteSeleccionado(null)}
              >
                ← Volver al listado
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardTutor;
