import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();

    // 🔹 Leer el usuario activo desde localStorage
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    // 🔹 Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem("usuarioActivo");
        alert("Sesión cerrada correctamente");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
            <div className="container-fluid">
                {/* Logo y nombre */}
                <img src="images/logo.png" alt="logoCuidadoSeguro" width="50" height="45" />
                <Link className="navbar-brand ms-2" to="/">Home</Link>

                {/* Botón hamburguesa para pantallas pequeñas */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* 🔹 Enlaces de la izquierda */}
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/centros">Centros</Link>
                        </li>

                        {!usuarioActivo && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/registro">Registro</Link>
                            </li>
                        )}
                    </ul>

                    {/* 🔹 Sección derecha (inicio de sesión o saludo) */}
                    <ul className="navbar-nav ms-auto">
                        {!usuarioActivo && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Inicio de sesión</Link>
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
                                    <button className="btn btn-link nav-link" onClick={handleLogout}>
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

