import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  // 🔹 Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    alert("Sesión cerrada correctamente");
    navigate("/login");
  };

  // 🔹 Ir a la sesión según tipoUsuario
  const irAMiSesion = () => {
    if (!usuarioActivo) return;

    if (usuarioActivo.tipoUsuario === "Tutor") {
      navigate("/dashboard-tutor");
    } else if (usuarioActivo.tipoUsuario === "Profesional") {
      navigate("/dashboardprofesional");
    } else {
      alert("Tipo de usuario no reconocido");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container-fluid">
        {/* Logo + Home */}
        <img
          src="images/logo.png"
          alt="logoCuidadoSeguro"
          width="50"
          height="45"
        />
        <Link className="navbar-brand ms-2" to="/">
          Home
        </Link>

        {/* Hamburguesa móvil */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* 🔹 Sección izquierda */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/centros">
                Centros
              </Link>
            </li>

            {!usuarioActivo && (
              <li className="nav-item align-items-center">
                <Link className="nav-link" to="/registro">
                  Registro
                </Link>
              </li>
            )}
          </ul>

          {/* 🔹 Sección derecha */}
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
                    👋 Bienvenido(a), <strong>{usuarioActivo.nombre}</strong>
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
