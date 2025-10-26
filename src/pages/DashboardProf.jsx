// ===============================================================
// Componente: DashboardProf.jsx
// Descripción: Panel del Profesional Interno.
// Permite ver, agregar, modificar y eliminar pacientes,
// además de ver su información clínica detallada.
// ===============================================================

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardResumen from "../components/CardResumen";

function DashboardProf() {
  const navigate = useNavigate();

  // ---------------------------------------------------------------
  // Estados principales
  // ---------------------------------------------------------------
  const [usuario, setUsuario] = useState(null);
  const [vista, setVista] = useState("resumen");
  const [institucion, setInstitucion] = useState("");
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [pacienteEditando, setPacienteEditando] = useState(null);
  const [pacientes, setPacientes] = useState([]);

  // Estados para el formulario de agregar/modificar paciente
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
  // Carga inicial desde localStorage
  // ---------------------------------------------------------------
  useEffect(() => {
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!activo || activo.tipoUsuario !== "Profesional Interno") {
      navigate("/login");
      return;
    }

    setUsuario(activo);
    if (activo.institucion) setInstitucion(activo.institucion);

    const almacenados = JSON.parse(localStorage.getItem("pacientes"));
    if (almacenados && Array.isArray(almacenados)) {
      setPacientes(almacenados);
    }
  }, [navigate]);

  // ---------------------------------------------------------------
  // Guardar cambios en localStorage
  // ---------------------------------------------------------------
  const guardarPacientes = (nuevos) => {
    setPacientes(nuevos);
    localStorage.setItem("pacientes", JSON.stringify(nuevos));
  };

  // ---------------------------------------------------------------
  // Agregar nuevo paciente
  // ---------------------------------------------------------------
  const handleAgregarPaciente = (e) => {
    e.preventDefault();

    if (
      !formData.rut.trim() ||
      !formData.nombre.trim() ||
      !formData.edad.trim()
    ) {
      alert("Debes completar al menos RUT, nombre y edad.");
      return;
    }

    const nuevo = {
      ...formData,
      edad: parseInt(formData.edad),
      medicamentos: [],
      controles: [],
      notas: [],
      recetas: [],
      examenes: [],
      certificados: [],
    };

    const actualizados = [...pacientes, nuevo];
    guardarPacientes(actualizados);
    alert("Paciente agregado correctamente.");

    // Reinicia formulario
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
  };

  // ---------------------------------------------------------------
  // Modificar paciente existente
  // ---------------------------------------------------------------
  const handleGuardarEdicion = (e) => {
    e.preventDefault();
    const actualizados = pacientes.map((p) =>
      p.rut === pacienteEditando.rut ? { ...p, ...formData } : p
    );
    guardarPacientes(actualizados);
    alert("Paciente modificado correctamente.");
    setPacienteEditando(null);
    setVista("pacientes");
  };

  // ---------------------------------------------------------------
  // Eliminar paciente
  // ---------------------------------------------------------------
  const handleEliminar = (rut) => {
    if (window.confirm("¿Seguro que deseas eliminar este paciente?")) {
      const actualizados = pacientes.filter((p) => p.rut !== rut);
      guardarPacientes(actualizados);
      alert("Paciente eliminado.");
    }
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
  // Render según vista actual
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

    // --------------------- VISTA: AGREGAR PACIENTE -------------------------
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
                  <label>URL de Imagen</label>
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
              </div>
            </form>
          </div>
        </div>
      );
    }

    // --------------------- VISTA: PACIENTES -------------------------
    if (vista === "pacientes") {
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

      return (
        <>
          <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
            <h4>Listado de pacientes</h4>
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
                            onClick={() => {
                              setPacienteEditando(p);
                              setFormData(p);
                              setVista("editar");
                            }}
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
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      );
    }

    // --------------------- VISTA: EDITAR PACIENTE -------------------------
    if (vista === "editar" && pacienteEditando) {
      return (
        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h4 className="text-primary mb-3">
              Modificar paciente: {pacienteEditando.nombre}
            </h4>
            <form onSubmit={handleGuardarEdicion}>
              <div className="row g-3">
                <div className="col-md-6">
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
                <div className="col-md-6">
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
              </div>

              <div className="text-end mt-3">
                <button type="submit" className="btn btn-warning me-2">
                  Guardar cambios
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
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

    return null;
  };

  // ---------------------------------------------------------------
  // Render principal
  // ---------------------------------------------------------------
  if (!usuario) return null;

  return (
    <div className="container-fluid">
      <div className="row">
        {/* SIDEBAR */}
        <aside className="col-md-3 col-lg-2 bg-light p-3 min-vh-100 border-end">
          <h6 className="text-uppercase text-muted mt-3 mb-2">Menú</h6>
          <ul className="nav flex-column gap-1">
            <li>
              <button
                className={`nav-link text-start btn btn-link ${
                  vista === "resumen" ? "fw-bold text-primary" : ""
                }`}
                onClick={() => setVista("resumen")}
              >
                Resumen
              </button>
            </li>
            <li>
              <button
                className={`nav-link text-start btn btn-link ${
                  vista === "pacientes" ? "fw-bold text-primary" : ""
                }`}
                onClick={() => setVista("pacientes")}
              >
                Pacientes
              </button>
            </li>
          </ul>
        </aside>

        {/* CONTENIDO */}
        <main className="col-md-9 col-lg-10 px-md-4 py-4">
          {renderContenido()}
        </main>
      </div>
    </div>
  );
}

export default DashboardProf;
