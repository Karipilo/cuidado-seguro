// ============================================================
// 📄 DashboardProf.jsx
// Versión en React del "Dashboard Profesional" del proyecto Cuidado Seguro
// ============================================================

// ✅ Importamos React y los hooks que necesitamos:
import React, { useEffect, useState } from "react";
// useEffect: para ejecutar código automáticamente cuando el componente se carga
// useState: para crear variables reactivas (como vista actual, usuario, etc.)

import { useNavigate } from "react-router-dom";
// useNavigate: permite redirigir al usuario a otra ruta (por ejemplo: "/login")

// ============================================================
// 🔹 Componente principal: DashboardProf
// ============================================================
function DashboardProf() {
  // Hook que nos permitirá movernos entre páginas
  const navigate = useNavigate();

  // Estado que almacenará los datos del usuario logueado (nombre, tipoUsuario, etc.)
  const [usuario, setUsuario] = useState(null);

  // Estado para controlar qué sección del dashboard se está mostrando
  // (por defecto mostramos la vista "resumen")
  const [vista, setVista] = useState("resumen");

  // ============================================================
  // 🧠 useEffect: se ejecuta cuando el componente se monta
  // ============================================================
  useEffect(() => {
    // Recuperamos del localStorage al usuario que inició sesión
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));

    // Si no hay usuario logueado o no es profesional, lo enviamos al login
    if (!activo || activo.tipoUsuario !== "Profesional") {
      navigate("/login"); // 🔁 Redirige al formulario de inicio de sesión
      return; // Detiene la ejecución del resto del código
    }

    // Si todo está correcto, guardamos la información del usuario para mostrarla en pantalla
    setUsuario(activo);
  }, [navigate]); // Se ejecuta solo una vez al cargar el componente

  // ============================================================
  // 📊 Datos estáticos de ejemplo (puedes reemplazarlos por datos reales)
  // ============================================================
  const stats = {
    pacientes: 12,
    hogares: 5,
    alertas: 3,
    notificaciones: 8,
  };

  // ============================================================
  // 💡 Subcomponente interno: CardResumen
  // Muestra las tarjetas del resumen (Pacientes, Hogares, etc.)
  // ============================================================
  const CardResumen = ({ titulo, valor, extraClass = "" }) => (
    <div className="col-md-3 mb-3">
      <div className={`card text-center shadow-sm ${extraClass}`}>
        <div className="card-body">
          <h5 className="card-title">{titulo}</h5>
          <p className="card-text fs-3 fw-bold">{valor}</p>
        </div>
      </div>
    </div>
  );

  // ============================================================
  // 🧩 Función que renderiza el contenido dinámico del dashboard
  // según la sección que el usuario seleccione en el menú lateral
  // ============================================================
  const renderContenido = () => {
    // ----------------------------------------------
    // 🔹 Vista 1: Resumen general
    // ----------------------------------------------
    if (vista === "resumen") {
      return (
        <>
          <h2 className="mt-4">Resumen general</h2>
          <div className="row mt-4">
            {/* Tarjetas con información resumida */}
            <CardResumen titulo="Pacientes" valor={stats.pacientes} />
            <CardResumen titulo="Hogares" valor={stats.hogares} />
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

    // ----------------------------------------------
    // 🔹 Vista 2: Pacientes (CRUD simulado)
    // ----------------------------------------------
    if (vista === "pacientes") {
      return (
        <>
          <h2 className="mt-4">Pacientes</h2>
          <p className="text-muted">
            En esta sección podrás administrar los pacientes: crear, listar, editar y eliminar.
          </p>

          {/* Barra superior con título + botón "Nuevo paciente" */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Listado de pacientes</h5>
            <button className="btn btn-primary btn-sm">+ Nuevo paciente</button>
          </div>

          {/* Tabla de pacientes (ejemplo estático) */}
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>RUT</th>
                      <th>Nombre</th>
                      <th>Edad</th>
                      <th>Hogar</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Filas de ejemplo (puedes reemplazar con datos de estado o fetch) */}
                    <tr>
                      <td>11.111.111-1</td>
                      <td>María Pérez</td>
                      <td>78</td>
                      <td>ELEAM Las Palmas</td>
                      <td>
                        <button className="btn btn-outline-secondary btn-sm me-2">
                          Editar
                        </button>
                        <button className="btn btn-outline-danger btn-sm">Eliminar</button>
                      </td>
                    </tr>
                    <tr>
                      <td>22.222.222-2</td>
                      <td>Juan Soto</td>
                      <td>82</td>
                      <td>Hogar Santa María</td>
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

    // ----------------------------------------------
    // 🔹 Vista 3: Datos importantes
    // ----------------------------------------------
    if (vista === "datos") {
      return (
        <>
          <h2 className="mt-4">Datos importantes</h2>
          <p className="text-muted">
            Aquí puedes ingresar información médica relevante para los pacientes seleccionados.
          </p>

          {/* Formulario simple para ingresar datos */}
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

              {/* Botón de guardar alineado a la derecha */}
              <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-primary">Guardar</button>
              </div>
            </div>
          </div>
        </>
      );
    }

    // Si no hay vista seleccionada, no muestra nada
    return null;
  };

  // ============================================================
  // 🕓 Si todavía no se ha cargado el usuario (primer render), no mostrar nada
  // ============================================================
  if (!usuario) return null;

  // ============================================================
  // 🎨 Render principal del componente (estructura visual)
  // ============================================================
  return (
    <div className="container-fluid">
      <div className="row">
        {/* ======================================================
           🧭 SIDEBAR (menú lateral del dashboard)
        ======================================================= */}
        <aside className="col-md-3 col-lg-2 bg-light p-3 min-vh-100 border-end">
          {/* Saludo dinámico con el nombre del profesional */}
          <div className="mb-3">
            <div className="small text-muted">Sesión activa</div>
            <div className="fw-semibold">👋 Bienvenido, {usuario.nombre}</div>
          </div>

          {/* Encabezado del menú */}
          <h6 className="text-uppercase text-muted mt-4 mb-2">Menú</h6>

          {/* Botones de navegación del menú */}
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

        {/* ======================================================
           🧩 CONTENIDO PRINCIPAL (cambia según la vista)
        ======================================================= */}
        <main className="col-md-9 col-lg-10 px-md-4 py-4">
          {/* Llamamos a la función que genera el contenido dinámico */}
          {renderContenido()}
        </main>
      </div>
    </div>
  );
}

// Exportamos el componente para usarlo en App.jsx
export default DashboardProf;

