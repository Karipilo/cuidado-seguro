// ===============================================================
// Componente: DashboardProf.jsx
// Descripción: Panel principal del "Profesional Interno".
// Incluye listado de pacientes con CRUD básico:
// - Ver detalle
// - Modificar
// - Eliminar
// - Agregar nuevo paciente
// Los datos se leen y persisten en localStorage (clave: "pacientes").
// ===============================================================

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardResumen from "../components/CardResumen";

function DashboardProf() {
  // ---------------------------------------------------------------
  // Hooks y estados principales
  // ---------------------------------------------------------------
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [vista, setVista] = useState("resumen"); // "resumen" | "pacientes" | "agregar" | "editar"
  const [institucion, setInstitucion] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null); // para "Ver detalle"
  const [pacienteEditando, setPacienteEditando] = useState(null); // para "Modificar"

  // Estado para formulario de agregar/modificar
  const [formData, setFormData] = useState({
    rut: "",
    nombre: "",
    edad: "",
    diagnostico: "",
    alergias: "",
    observaciones: "",
    imagen: "",
  });

  // ---------------------------------------------------------------
  // Carga de usuario y pacientes desde localStorage
  // ---------------------------------------------------------------
  useEffect(() => {
    // Validación de sesión y tipo de usuario
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!activo || activo.tipoUsuario !== "Profesional Interno") {
      navigate("/login");
      return;
    }
    setUsuario(activo);
    if (activo.institucion) setInstitucion(activo.institucion);

    // Carga de pacientes persistidos
    const almacenados = JSON.parse(localStorage.getItem("pacientes"));
    if (almacenados && Array.isArray(almacenados)) {
      setPacientes(almacenados);
    } else {
      setPacientes([]);
    }
  }, [navigate]);

  // ---------------------------------------------------------------
  // Utilidad: guardar en estado y en localStorage
  // ---------------------------------------------------------------
  const guardarPacientes = (nuevos) => {
    setPacientes(nuevos);
    localStorage.setItem("pacientes", JSON.stringify(nuevos));
  };

  // ---------------------------------------------------------------
  // Acciones: Agregar paciente
  // ---------------------------------------------------------------
  const handleAgregarPaciente = (e) => {
    e.preventDefault();

    // Validaciones mínimas
    if (
      !formData.rut.trim() ||
      !formData.nombre.trim() ||
      !formData.edad.toString().trim()
    ) {
      alert("Debes completar al menos RUT, nombre y edad.");
      return;
    }

    // Evitar duplicados por RUT
    const existe = pacientes.some((p) => p.rut === formData.rut);
    if (existe) {
      alert("Ya existe un paciente con ese RUT.");
      return;
    }

    // Preparar objeto nuevo con campos clínicos en arreglos vacíos si no existen
    const nuevo = {
      ...formData,
      edad: parseInt(formData.edad, 10),
      medicamentos: [],
      controles: [],
      notas: [],
      recetas: [],
      examenes: [],
      certificados: [],
    };

    const actualizados = [...pacientes, nuevo];
    guardarPacientes(actualizados);

    // Reset del formulario y vuelta al listado
    setFormData({
      rut: "",
      nombre: "",
      edad: "",
      diagnostico: "",
      alergias: "",
      observaciones: "",
      imagen: "",
    });
    setVista("pacientes");
    alert("Paciente agregado correctamente.");
  };

  // ---------------------------------------------------------------
  // Acciones: Preparar edición de paciente
  // ---------------------------------------------------------------
  const prepararEdicion = (p) => {
    setPacienteEditando(p);
    setFormData({
      rut: p.rut, // RUT se muestra pero no se debe cambiar para mantener integridad
      nombre: p.nombre || "",
      edad: p.edad?.toString() || "",
      diagnostico: p.diagnostico || "",
      alergias: p.alergias || "",
      observaciones: p.observaciones || "",
      imagen: p.imagen || "",
    });
    setVista("editar");
  };

  // ---------------------------------------------------------------
  // Acciones: Guardar edición
  // ---------------------------------------------------------------
  const handleGuardarEdicion = (e) => {
    e.preventDefault();

    // El RUT no se modifica. Se actualizan los demás campos.
    const actualizados = pacientes.map((p) =>
      p.rut === pacienteEditando.rut
        ? {
            ...p,
            nombre: formData.nombre,
            edad: parseInt(formData.edad, 10),
            diagnostico: formData.diagnostico,
            alergias: formData.alergias,
            observaciones: formData.observaciones,
            imagen: formData.imagen,
          }
        : p
    );

    guardarPacientes(actualizados);
    setPacienteEditando(null);
    setVista("pacientes");
    alert("Paciente modificado correctamente.");
  };

  // ---------------------------------------------------------------
  // Acciones: Eliminar paciente
  // ---------------------------------------------------------------
  const handleEliminar = (rut) => {
    if (!window.confirm("¿Seguro que deseas eliminar este paciente?")) return;
    const actualizados = pacientes.filter((p) => p.rut !== rut);
    guardarPacientes(actualizados);
    // Si el eliminado estaba seleccionado, limpiar selección
    if (pacienteSeleccionado?.rut === rut) setPacienteSeleccionado(null);
    alert("Paciente eliminado.");
  };

  // ---------------------------------------------------------------
  // Estadísticas rápidas (simuladas)
  // ---------------------------------------------------------------
  const stats = {
    pacientes: pacientes.length,
    alertas: 3,
    notificaciones: 8,
  };

  // ---------------------------------------------------------------
  // Render de contenido por vista
  // ---------------------------------------------------------------
  const renderContenido = () => {
    // --------------------- VISTA: RESUMEN -------------------------
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
                valor={
                  <span className="text-warning">{stats.notificaciones}</span>
                }
              />
            </div>
          </div>
        </>
      );
    }

    // --------------------- VISTA: AGREGAR -------------------------
    if (vista === "agregar") {
      return (
        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h4 className="text-primary mb-3">Agregar nuevo paciente</h4>

            <form onSubmit={handleAgregarPaciente}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label>RUT</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.rut}
                    onChange={(e) =>
                      setFormData({ ...formData, rut: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label>Nombre completo</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label>Edad</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.edad}
                    onChange={(e) =>
                      setFormData({ ...formData, edad: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label>Diagnóstico</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.diagnostico}
                    onChange={(e) =>
                      setFormData({ ...formData, diagnostico: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label>Alergias</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.alergias}
                    onChange={(e) =>
                      setFormData({ ...formData, alergias: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-12">
                  <label>Observaciones</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    value={formData.observaciones}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        observaciones: e.target.value,
                      })
                    }
                  ></textarea>
                </div>

                <div className="col-md-12">
                  <label>URL de imagen</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="/images/paciente.png"
                    value={formData.imagen}
                    onChange={(e) =>
                      setFormData({ ...formData, imagen: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="text-end mt-3">
                <button type="submit" className="btn btn-success">
                  Guardar paciente
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => setVista("pacientes")}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }

    // --------------------- VISTA: EDITAR --------------------------
    if (vista === "editar" && pacienteEditando) {
      return (
        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h4 className="text-primary mb-3">
              Modificar paciente: {pacienteEditando.nombre}
            </h4>

            <form onSubmit={handleGuardarEdicion}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label>RUT (no editable)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.rut}
                    disabled
                  />
                </div>

                <div className="col-md-4">
                  <label>Nombre completo</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label>Edad</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.edad}
                    onChange={(e) =>
                      setFormData({ ...formData, edad: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label>Diagnóstico</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.diagnostico}
                    onChange={(e) =>
                      setFormData({ ...formData, diagnostico: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label>Alergias</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.alergias}
                    onChange={(e) =>
                      setFormData({ ...formData, alergias: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-12">
                  <label>Observaciones</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    value={formData.observaciones}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        observaciones: e.target.value,
                      })
                    }
                  ></textarea>
                </div>

                <div className="col-md-12">
                  <label>URL de imagen</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.imagen}
                    onChange={(e) =>
                      setFormData({ ...formData, imagen: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="text-end mt-3">
                <button type="submit" className="btn btn-warning">
                  Guardar cambios
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => {
                    setPacienteEditando(null);
                    setVista("pacientes");
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }

    // --------------------- VISTA: PACIENTES -----------------------
    if (vista === "pacientes") {
      // Si hay un paciente seleccionado, mostrar su detalle clínico completo.
      if (pacienteSeleccionado) {
        return (
          <div className="card shadow-sm mt-4">
            <div className="card-body">
              <h4 className="text-primary mb-3">
                Detalle del paciente: {pacienteSeleccionado.nombre}
              </h4>

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

              <h6 className="fw-bold text-primary mt-3">Medicamentos</h6>
              <ul>
                {(Array.isArray(pacienteSeleccionado.medicamentos)
                  ? pacienteSeleccionado.medicamentos
                  : []
                ).map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>

              <h6 className="fw-bold text-primary mt-3">Controles</h6>
              <ul>
                {(Array.isArray(pacienteSeleccionado.controles)
                  ? pacienteSeleccionado.controles
                  : []
                ).map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>

              <h6 className="fw-bold text-primary mt-3">Notas clínicas</h6>
              {Array.isArray(pacienteSeleccionado.notas) &&
              pacienteSeleccionado.notas.length > 0 ? (
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

              <h6 className="fw-bold text-primary mt-3">Recetas</h6>
              {Array.isArray(pacienteSeleccionado.recetas) &&
              pacienteSeleccionado.recetas.length > 0 ? (
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

              <h6 className="fw-bold text-primary mt-3">Exámenes</h6>
              {Array.isArray(pacienteSeleccionado.examenes) &&
              pacienteSeleccionado.examenes.length > 0 ? (
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

              <h6 className="fw-bold text-primary mt-3">Certificados</h6>
              {Array.isArray(pacienteSeleccionado.certificados) &&
              pacienteSeleccionado.certificados.length > 0 ? (
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

              <button
                className="btn btn-secondary mt-3"
                onClick={() => setPacienteSeleccionado(null)}
              >
                Volver al listado
              </button>
            </div>
          </div>
        );
      }

      // Listado con acciones: Ver detalle, Modificar, Eliminar + botón para Agregar
      return (
        <>
          <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
            <h4>Pacientes</h4>
            <button
              className="btn btn-success"
              onClick={() => setVista("agregar")}
            >
              + Agregar paciente
            </button>
          </div>

          <div className="card shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>RUT</th>
                      <th>Nombre</th>
                      <th>Edad</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pacientes.map((p) => (
                      <tr key={p.rut}>
                        <td>{p.rut}</td>
                        <td>{p.nombre}</td>
                        <td>{p.edad}</td>
                        <td>
                          <button
                            className="btn btn-outline-primary btn-sm me-1"
                            onClick={() => setPacienteSeleccionado(p)}
                          >
                            Ver detalle
                          </button>

                          <button
                            className="btn btn-outline-warning btn-sm me-1"
                            onClick={() => prepararEdicion(p)}
                          >
                            Modificar
                          </button>

                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleEliminar(p.rut)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}

                    {pacientes.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center text-muted py-3">
                          No hay pacientes registrados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      );
    }

    return null;
  };

  // ---------------------------------------------------------------
  // Render principal
  // ---------------------------------------------------------------
  if (!usuario) return null;

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar izquierdo */}
        <aside className="col-md-3 col-lg-2 bg-light p-3 min-vh-100 border-end">
          <div className="mb-3">
            <div className="small text-muted">Sesión activa</div>
            <div className="fw-semibold">Bienvenido, {usuario.nombre}</div>
          </div>

          <h6 className="text-uppercase text-muted mt-4 mb-2">Menú</h6>
          <ul className="nav nav-pills flex-column gap-1">
            <li className="nav-item">
              <button
                className={`nav-link text-start ${
                  vista === "resumen" ? "active" : ""
                }`}
                onClick={() => setVista("resumen")}
              >
                Resumen
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link text-start ${
                  vista === "pacientes" ? "active" : ""
                }`}
                onClick={() => setVista("pacientes")}
              >
                Pacientes
              </button>
            </li>
          </ul>
        </aside>

        {/* Contenido principal */}
        <main className="col-md-9 col-lg-10 px-md-4 py-4">
          {renderContenido()}
        </main>
      </div>
    </div>
  );
}

export default DashboardProf;
