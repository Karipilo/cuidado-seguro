// -----------------------------------------------------------
// Componente: NavBar.jsx
// Descripción: Barra de navegación superior de la aplicación.
// Permite navegar entre secciones públicas y privadas,
// y acceder a la sesión del usuario según su tipo.
// -----------------------------------------------------------

import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  // Se obtiene el usuario activo desde localStorage.
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  // -----------------------------------------------------------
  // Cerrar sesión: elimina el usuario activo y redirige al login.
  // -----------------------------------------------------------
  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    alert("Sesión cerrada correctamente");
    navigate("/login");
  };

  // -----------------------------------------------------------
  // Redirigir a la sesión según el tipo de usuario.
  // -----------------------------------------------------------
  const irAMiSesion = () => {
    if (!usuarioActivo) return;

    // Si es Tutor, redirige al Dashboard del Tutor.
    if (usuarioActivo.tipoUsuario === "Tutor") {
      navigate("/dashboard-tutor");
    }

    // Si es Profesional Interno, redirige al Dashboard correspondiente.
    else if (usuarioActivo.tipoUsuario === "Profesional Interno") {
      navigate("/dashboard-prof");
    }

    // Si es Profesional Externo, redirige a su propio Dashboard.
    else if (usuarioActivo.tipoUsuario === "Profesional Externo") {
      navigate("/dashboard-prof-externo");
    }

    // Si no coincide con ninguno, muestra una advertencia.
    else {
      alert("Tipo de usuario no reconocido");
    }
  };

  // -----------------------------------------------------------
  // Render principal de la barra de navegación
  // -----------------------------------------------------------
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container-fluid">
        {/* Logo + enlace Home */}
        <img
          src="images/logo.png"
          alt="logoCuidadoSeguro"
          width="50"
          height="45"
        />
        <Link className="navbar-brand ms-2" to="/">
          Home
        </Link>

        {/* Botón hamburguesa para móviles */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Sección izquierda del menú */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/centros">
                Centros
              </Link>
            </li>

            {/* Opción de registro visible solo si no hay usuario activo */}
            {!usuarioActivo && (
              <li className="nav-item align-items-center">
                <Link className="nav-link" to="/registro">
                  Registro
                </Link>
              </li>
            )}
          </ul>

          {/* Sección derecha del menú */}
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            {usuarioActivo && (
              <li className="nav-item">
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={irAMiSesion}
                >
                  Mi sesión
                </button>
              </li>
            )}

            {!usuarioActivo && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Inicio de sesión
                </Link>
              </li>
            )}

            {usuarioActivo && (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    Bienvenido(a), <strong>{usuarioActivo.nombre}</strong>
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
