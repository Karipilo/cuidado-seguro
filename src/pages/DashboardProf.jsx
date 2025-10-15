import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardResumen from "../components/CardResumen";

// Componente principal: DashboardProf
function DashboardProf() {
  // useNavigate: nos permite redirigir al usuario
  const navigate = useNavigate();
  // useState: crea variables reactivas
  const [usuario, setUsuario] = useState(null); // guardará el usuario activo 
  const [vista, setVista] = useState("resumen"); // controla qué sección del panel se muestra (resumen)

  // useEffect: se ejecuta cuando el componente se monta
  useEffect(() => {
    // Intentamos obtener del localStorage al usuario activo
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));

    // Si no hay usuario logueado o no es profesional, redirige al login
    if (!activo || activo.tipoUsuario !== "Profesional") {
      navigate("/login");
      return;
    }

    // Si existe y es profesional, guardamos sus datos en el estado
    setUsuario(activo);
  }, [navigate]);

  // Datos simulados para el resumen 
  const stats = {
    pacientes: 12,
    alertas: 3,
    notificaciones: 8,
  };

  // Función que renderiza el contenido dinámico del dashboard
  // según la vista seleccionada en el menú lateral

  const renderContenido = () => {
    // VISTA 1: Resumen general
    if (vista === "resumen") {
      return (
        <>
          <h2 className="mt-4">Resumen general</h2>
          <div className="row mt-4">
            {/* Componente CardResumen*/}
            <CardResumen titulo="Pacientes" valor={stats.pacientes} />
            <CardResumen
              titulo="Alertas"
              valor={<span className="text-danger">{stats.alertas}</span>}
            />
            <CardResumen
              titulo="Notificaciones"
              valor={<span className="text-warning">{stats.notificaciones}</span>}
            />
          </div>
        </>
      );
    }

    // VISTA 2: Pacientes (CRUD estatico)
    if (vista === "pacientes") {
      return (
        <>
          <h2 className="mt-4">Pacientes</h2>
          <p className="text-muted">
            Aquí podrás administrar tus pacientes: crear, listar, editar y eliminar registros.
          </p>

          {/* Barra superior con título y botón de creación */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Listado de pacientes</h5>
            <button className="btn btn-primary btn-sm">+ Nuevo paciente</button>
          </div>

          {/* Tabla de pacientes - datos de ejemplo */}
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>RUT</th>
                      <th>Nombre</th>
                      <th>Edad</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Fila de ejemplo 1 */}
                    <tr>
                      <td>11.111.111-1</td>
                      <td>María Pérez</td>
                      <td>78</td>
                      <td>
                        <button className="btn btn-outline-secondary btn-sm me-2">
                          Editar
                        </button>
                        <button className="btn btn-outline-danger btn-sm">Eliminar</button>
                      </td>
                    </tr>

                    {/* Fila de ejemplo 2 */}
                    <tr>
                      <td>22.222.222-2</td>
                      <td>Juan Soto</td>
                      <td>82</td>
                      <td>
                        <button className="btn btn-outline-secondary btn-sm me-2">
                          Editar
                        </button>
                        <button className="btn btn-outline-danger btn-sm">Eliminar</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      );
    }
    // VISTA 3: Datos importantes
    if (vista === "datos") {
      return (
        <>
          <h2 className="mt-4">Datos importantes</h2>
          <p className="text-muted">
            Aquí puedes ingresar información médica relevante para los pacientes institucionalizados.
          </p>

          {/* Formulario simple con Bootstrap */}
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

              {/* Botón para guardar los datos */}
              <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-primary">Guardar</button>
              </div>
            </div>
          </div>
        </>
      );
    }

    // Si no hay vista seleccionada, no se muestra nada
    return null;
  };

  // Si aún no se cargó el usuario, no renderizamos nada
  // Esto evita que aparezca un parpadeo visual antes de cargar la sesión
  if (!usuario) return null;

  // Render (Lo que se muestra) principal del componente
  return (
    <div className="container-fluid">
      <div className="row">
        {/* SIDEBAR IZQUIERDA (menú lateral del dashboard)*/}
        <aside className="col-md-3 col-lg-2 bg-light p-3 min-vh-100 border-end">
          {/* Saludo dinámico con el nombre del profesional */}
          <div className="mb-3">
            <div className="small text-muted">Sesión activa</div>
            <div className="fw-semibold">👋 Bienvenido, {usuario.nombre}</div>
          </div>

          {/* Título del menú */}
          <h6 className="text-uppercase text-muted mt-4 mb-2">Menú</h6>

          {/* Botones del menú lateral */}
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
                Pacientes (CRUD)
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

        {/* CONTENIDO PRINCIPAL (se actualiza según la vista)*/}
        <main className="col-md-9 col-lg-10 px-md-4 py-4">
          {/* Llamamos a la función que decide qué vista mostrar */}
          {renderContenido()}
        </main>
      </div>
    </div>
  );
}

export default DashboardProf;
