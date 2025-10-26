/// ===============================================================
// Componente: DashboardProf.jsx
// Descripción: Panel principal del usuario tipo "Profesional Interno".
// Muestra resumen, gestión de pacientes y datos actualizados
// sincronizados desde localStorage (clave: "pacientes").
// ===============================================================

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardResumen from "../components/CardResumen";
import { Link } from "react-router-dom";

function DashboardProf() {
  // ---------------------------------------------------------------
  // HOOKS Y ESTADOS PRINCIPALES
  // ---------------------------------------------------------------
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [vista, setVista] = useState("resumen");
  const [institucion, setInstitucion] = useState("");
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [pacienteEditando, setPacienteEditando] = useState(null);
  const [pacientes, setPacientes] = useState([]);

  // ---------------------------------------------------------------
  // CARGA DE USUARIO Y PACIENTES DESDE LOCALSTORAGE
  // ---------------------------------------------------------------
  useEffect(() => {
    // 1. Se obtiene el usuario activo desde localStorage.
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));

    // Si no hay usuario o no es del tipo "Profesional Interno", se redirige al login.
    if (!activo || activo.tipoUsuario !== "Profesional Interno") {
      navigate("/login");
      return;
    }

    // Se almacena el usuario activo en el estado.
    setUsuario(activo);

    // Si el usuario tiene una institución asignada, se guarda también.
    if (activo.institucion) setInstitucion(activo.institucion);

    // 2. Se obtienen los pacientes desde localStorage.
    //    En App.jsx fueron cargados inicialmente con la clave "pacientes".
    const almacenados = JSON.parse(localStorage.getItem("pacientes"));

    // Si existen pacientes válidos, se guardan en el estado.
    if (almacenados && Array.isArray(almacenados)) {
      setPacientes(almacenados);
    } else {
      // Si no hay datos válidos, se inicializa el arreglo vacío.
      setPacientes([]);
    }
  }, [navigate]);

  // ---------------------------------------------------------------
  // ESTADÍSTICAS RÁPIDAS (SIMULADAS)
  // ---------------------------------------------------------------
  const stats = {
    pacientes: pacientes.length,
    alertas: 3,
    notificaciones: 8,
  };

  // ---------------------------------------------------------------
  // FUNCIÓN QUE DECIDE QUÉ MOSTRAR SEGÚN LA VISTA
  // ---------------------------------------------------------------
  const renderContenido = () => {
    // ============================================================
    // VISTA 1: RESUMEN GENERAL
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
                valor={
                  <span className="text-warning">{stats.notificaciones}</span>
                }
              />
            </div>
          </div>
        </>
      );
    }

    // ============================================================
    // VISTA 2: PACIENTES (LISTADO + DETALLE)
    // ============================================================
    if (vista === "pacientes") {
      // Detalle del paciente seleccionado
      if (pacienteSeleccionado) {
        return (
          <>
            <h2 className="mt-4">Detalle del Paciente</h2>
            <p className="text-muted">
              Información clínica actualizada (solo lectura).
            </p>

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

                <hr />

                <h6 className="fw-bold text-primary mt-3">Notas Clínicas</h6>
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

                <h6 className="fw-bold text-primary mt-3">Recetas</h6>
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

                <h6 className="fw-bold text-primary mt-3">Exámenes</h6>
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

                <h6 className="fw-bold text-primary mt-3">Certificados</h6>
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

      // Listado de pacientes
      return (
        <>
          <h2 className="mt-4">Pacientes</h2>
          <p className="text-muted">
            Selecciona un paciente para ver su información.
          </p>

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
                            onClick={() => setPacienteSeleccionado(p)}
                          >
                            Ver Detalle
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

    // ============================================================
    // VISTA 3: DATOS IMPORTANTES
    // ============================================================
    if (vista === "datos") {
      return (
        <>
          <h2 className="mt-4">Datos importantes</h2>
          <p className="text-muted">
            Aquí puedes registrar información adicional o reportes clínicos.
          </p>

          <div className="card shadow-sm">
            <div className="card-body">
              <p className="text-muted">
                Esta sección puede conectarse a futuras funciones.
              </p>
            </div>
          </div>
        </>
      );
    }

    return null;
  };

  // ---------------------------------------------------------------
  // RENDER PRINCIPAL
  // ---------------------------------------------------------------
  if (!usuario) return null;

  return (
    <div className="container-fluid">
      <div className="row">
        {/* SIDEBAR IZQUIERDO */}
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
            <li className="nav-item">
              <button
                className={`nav-link text-start ${
                  vista === "datos" ? "active" : ""
                }`}
                onClick={() => setVista("datos")}
              >
                Datos importantes
              </button>
            </li>
          </ul>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="col-md-9 col-lg-10 px-md-4 py-4">
          {renderContenido()}
        </main>
      </div>
    </div>
  );
}

export default DashboardProf;
