// ===============================================================
// 🧩 Componente: DashboardProf.jsx
// Descripción: Panel principal del usuario tipo "Profesional".
// ===============================================================

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardResumen from "../components/CardResumen";
import { Link } from "react-router-dom";

function DashboardProf() {
  // ---------------------------------------------------------------
  // 🔹 HOOKS Y ESTADOS PRINCIPALES
  // ---------------------------------------------------------------
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [vista, setVista] = useState("resumen");
  const [institucion, setInstitucion] = useState("");
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [pacienteEditando, setPacienteEditando] = useState(null); // 🆕 para modo edición
  const [pacientes, setPacientes] = useState([]); // ahora se carga dinámicamente

  // ---------------------------------------------------------------
  // 🔹 CARGA USUARIO Y PACIENTES
  // ---------------------------------------------------------------
  useEffect(() => {
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!activo || activo.tipoUsuario !== "Profesional") {
      navigate("/login");
      return;
    }
    setUsuario(activo);
    if (activo.institucion) setInstitucion(activo.institucion);

    // 🔸 Cargar pacientes simulados
    setPacientes([
      {
        id: 1,
        rut: "4.234.657-k",
        nombre: "Ana María Pérez Villouta",
        edad: 78,
        diagnostico: "Demencia senil",
        alergias: "Penicilina",
        medicamentos: ["Rivastigmina 3mg cada 12 hrs", "Quetiapina 25mg noche"],
        controles: ["Presión: 120/80 mmHg", "Peso: 64 kg"],
        observaciones: "Paciente estable, sin alteraciones en la conducta.",
        imagen: "/images/maria.png",
      },
      {
        id: 2,
        rut: "5.654.234-0",
        nombre: "Juan José Soto Risopatrón",
        edad: 82,
        diagnostico: "Parkinson",
        alergias: "Ninguna",
        medicamentos: ["Levodopa 100mg - cada 8 hrs", "Clonazepam 0.5mg - noche"],
        controles: ["Presión: 130/85 mmHg", "Peso: 70 kg"],
        observaciones: "Leves temblores controlados con medicación.",
        imagen: "/images/luis.png",
      },
      {
        id: 3,
        rut: "6.234.657-3",
        nombre: "Rousmarie Trinidad Mattus Hasse",
        edad: 78,
        diagnostico: "Fractura de cadera",
        alergias: "Penicilina",
        medicamentos: ["Tramadol 100 mg al día", "Quetiapina 25mg noche"],
        controles: ["Presión: 120/80 mmHg", "Peso: 64 kg"],
        observaciones: "Paciente estable, se realizaron los cambios de posición correspondientes.",
        imagen: "/images/rosa.png",
      },
    ]);
  }, [navigate]);

  // ---------------------------------------------------------------
  // 🔹 FUNCIONES DE ACCIÓN
  // ---------------------------------------------------------------

  // 🗑️ Eliminar paciente del listado
  const eliminarPaciente = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este paciente?")) {
      setPacientes((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // ✏️ Modo edición (simulado)
  const editarPaciente = (paciente) => {
    setPacienteEditando(paciente);
    alert(`Modo edición: ${paciente.nombre}`);
  };

  // ---------------------------------------------------------------
  // 🔹 DATOS SIMULADOS PARA EL RESUMEN
  // ---------------------------------------------------------------
  const stats = {
    pacientes: pacientes.length,
    alertas: 3,
    notificaciones: 8,
  };

  // ---------------------------------------------------------------
  // 🔹 FUNCIÓN QUE DECIDE QUÉ MOSTRAR SEGÚN LA VISTA
  // ---------------------------------------------------------------
  const renderContenido = () => {
    // ============================================================
    // 1️⃣ VISTA: RESUMEN GENERAL
    // ============================================================
    if (vista === "resumen") {
      return (
        <>
          <h2 className="mt-4 text-center">
            Resumen general
            {institucion && (
              <span className="text-primary d-block fs-5 mt-1">
                {institucion}
              </span>
            )}
          </h2>

          <div className="row mt-4 g-3">
            <div className="col-12 col-md-4">
              <CardResumen titulo="Pacientes" valor={stats.pacientes} />
            </div>
            <div className="col-12 col-md-4">
              <CardResumen
                titulo="Alertas"
                valor={<span className="text-danger">{stats.alertas}</span>}
              />
            </div>
            <div className="col-12 col-md-4">
              <CardResumen
                titulo="Notificaciones"
                valor={<span className="text-warning">{stats.notificaciones}</span>}
              />
            </div>
          </div>
        </>
      );
    }

    // ============================================================
    // 2️⃣ VISTA: PACIENTES (LISTADO + DETALLE)
    // ============================================================
    if (vista === "pacientes") {
      // Si hay un paciente seleccionado → mostrar detalle
      if (pacienteSeleccionado) {
        return (
          <>
            <h2 className="mt-4">Detalle del Paciente</h2>
            <p className="text-muted">Información general y médica del paciente.</p>

            <div className="card shadow-sm mt-3">
              <img
                src={pacienteSeleccionado.imagen}
                alt={pacienteSeleccionado.nombre}
                className="card-img-top"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="fw-semibold mb-3 text-primary">
                  {pacienteSeleccionado.nombre}
                </h5>
                <p><strong>RUT:</strong> {pacienteSeleccionado.rut}</p>
                <p><strong>Edad:</strong> {pacienteSeleccionado.edad} años</p>
                <p><strong>Diagnóstico:</strong> {pacienteSeleccionado.diagnostico}</p>
                <p><strong>Alergias:</strong> {pacienteSeleccionado.alergias}</p>
                <hr />
                <h6 className="fw-bold text-primary">Medicamentos</h6>
                <ul>
                  {pacienteSeleccionado.medicamentos.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>

                <h6 className="fw-bold text-primary mt-3">Controles</h6>
                <ul>
                  {pacienteSeleccionado.controles.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>

                <h6 className="fw-bold text-primary mt-3">Observaciones</h6>
                <p>{pacienteSeleccionado.observaciones}</p>

                <button
                  className="btn btn-secondary mt-3"
                  onClick={() => setPacienteSeleccionado(null)}
                >
                  ← Volver al listado
                </button>
              </div>
            </div>
          </>
        );
      }

      // 🧾 Listado de pacientes
      return (
        <>
          <h2 className="mt-4">Pacientes</h2>
          <p className="text-muted">Selecciona un paciente o gestiona sus datos.</p>

          <div className="card shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Imagen</th>
                      <th>RUT</th>
                      <th>Nombre</th>
                      <th>Edad</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pacientes.map((p) => (
                      <tr key={p.id}>
                        <td style={{ width: "90px" }}>
                          <img
                            src={p.imagen}
                            alt={p.nombre}
                            className="rounded-circle"
                            style={{ width: "60px", height: "60px", objectFit: "cover" }}
                          />
                        </td>
                        <td>{p.rut}</td>
                        <td>{p.nombre}</td>
                        <td>{p.edad}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => setPacienteSeleccionado(p)}
                            >
                              Ver
                            </button>
                            <button
                              className="btn btn-outline-warning btn-sm"
                              onClick={() => editarPaciente(p)}
                            >
                              Modificar
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => eliminarPaciente(p.id)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      );
    }

    // ============================================================
    // 3️⃣ VISTA: DATOS IMPORTANTES
    // ============================================================
    if (vista === "datos") {
      return (
        <>
          <h2 className="mt-4">Agregar Nota Clínica</h2>
          <p className="text-muted">
            Aquí puedes ingresar información médica relevante para los pacientes institucionalizados.
          </p>

          <div className="card shadow-sm">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">RUT del paciente</label>
                  <input className="form-control" placeholder="11.111.111-1" />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Diagnóstico</label>
                  <input className="form-control" placeholder="Ej: Demencia mixta" />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Alergias</label>
                  <input className="form-control" placeholder="Ej: Penicilina" />
                </div>
                <div className="col-12">
                  <label className="form-label">Observaciones</label>
                  <textarea className="form-control" rows="3" placeholder="Notas clínicas..." />
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-primary">Guardar</button>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  // ---------------------------------------------------------------
  // RENDER PRINCIPAL
  // ---------------------------------------------------------------
  if (!usuario) return null;

  return (
    <div className="container-fluid">
      <div className="row">
        {/* SIDEBAR */}
        <aside className="col-md-3 col-lg-2 bg-light p-3 min-vh-100 border-end">
          <div className="mb-3">
            <div className="small text-muted">Sesión activa</div>
            <div className="fw-semibold">👋 Bienvenido, {usuario.nombre}</div>
          </div>

          <h6 className="text-uppercase text-muted mt-4 mb-2">Menú</h6>
          <ul className="nav nav-pills flex-column gap-1">
            <li className="nav-item">
              <button
                className={`nav-link text-start ${vista === "resumen" ? "active" : ""}`}
                onClick={() => setVista("resumen")}
              >
                Resumen
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link text-start ${vista === "pacientes" ? "active" : ""}`}
                onClick={() => setVista("pacientes")}
              >
                Pacientes
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link text-start ${vista === "datos" ? "active" : ""}`}
                onClick={() => setVista("datos")}
              >
                Datos importantes
              </button>
            </li>
          </ul>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="col-md-9 col-lg-10 px-md-4 py-4">{renderContenido()}</main>
      </div>
    </div>
  );
}

export default DashboardProf;
