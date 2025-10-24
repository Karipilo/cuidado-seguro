// ===============================================================
// 🧩 Componente: DashboardTutor.jsx
// Descripción:
//   Panel del Tutor/Familiar del sistema "Cuidado Seguro".
//   Muestra la información de los pacientes existentes en
//   localStorage y permite buscarlos por RUT.
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
  const [busquedaRut, setBusquedaRut] = useState(""); // 🔍 búsqueda por RUT

  // ---------------------------------------------------------------
  // 🔹 CARGA DE USUARIO Y PACIENTES DESDE LOCALSTORAGE
  // ---------------------------------------------------------------
  useEffect(() => {
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));

    // Si no hay usuario activo o no es Tutor, redirige al login
    if (!activo || activo.tipoUsuario !== "Tutor") {
      navigate("/login");
      return;
    }

    setUsuario(activo);

    // ✅ Cargar pacientes existentes desde localStorage (no modificar nada)
    const almacenados = JSON.parse(localStorage.getItem("pacientesData")) || [];
    setPacientes(almacenados);

    // Si el tutor tiene asignado un paciente por su ID, mostrarlo directamente
    if (activo.idPaciente) {
      const paciente = almacenados.find((p) => p.rut === activo.idPaciente);
      if (paciente) setPacienteSeleccionado(paciente);
    }
  }, [navigate]);

  // ---------------------------------------------------------------
  // 🔹 FUNCIONES
  // ---------------------------------------------------------------
  const handleSeleccionar = (p) => {
    setPacienteSeleccionado(p);
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem("usuarioActivo");
    navigate("/login");
  };

  // ✅ Filtro por RUT (no afecta los datos originales)
  const pacientesFiltrados = pacientes.filter((p) =>
    p.rut.toLowerCase().includes(busquedaRut.toLowerCase())
  );

  // ---------------------------------------------------------------
  // 🔹 RENDERIZADO PRINCIPAL
  // ---------------------------------------------------------------
  if (!usuario) return null;

  return (
    <div className="container-fluid py-4">
      {/* Encabezado */}
      <div className="text-center mb-4">
        <h2 className="fw-semibold text-primary">Panel del Tutor / Familiar</h2>
        <p className="text-muted mb-0">
          👋 Bienvenido, {usuario.nombre}. Aquí puedes consultar la información del paciente asignado.
        </p>

      </div>

      {/* SELECCIONAR PACIENTE */}
      {!pacienteSeleccionado && (
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="fw-bold text-primary">Selecciona un paciente</h5>

            {/* 🔎 Campo de búsqueda por RUT */}
            <div className="input-group mb-3 mt-2">
              <span className="input-group-text">Buscar por RUT</span>
              <input
                type="text"
                className="form-control"
                placeholder="Ej: 12345678-9"
                value={busquedaRut}
                onChange={(e) => setBusquedaRut(e.target.value)}
              />
            </div>

            {pacientesFiltrados.length === 0 ? (
              <p className="text-muted">No se encontraron pacientes con ese RUT.</p>
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
                    {pacientesFiltrados.map((p) => (
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

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardTutor;
