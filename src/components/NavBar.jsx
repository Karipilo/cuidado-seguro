import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg custom-navbar navbar-dark">
            <div className="container-fluid">
                <img src="/images/logo.png" alt="logoCuidadoSeguro" width="50" height="45" />
                <Link className="navbar-brand ms-2" to="/">Home</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Menú izquierda */}
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link" to="/register">Registro</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/centros">Centros Y Hogares</Link></li>
                        <li className="nav-item d-none" id="navMiSesionItem">
                            <a id="linkMiSesion" className="nav-link" href="#">Mi sesión</a>
                        </li>
                    </ul>

                    {/* Menú derecha */}
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            {/* Oculto por defecto; se muestra si hay sesión */}
                            <span id="cambio" className="navbar-text me-3 d-none"></span>
                        </li>
                        <li className="nav-item" id="navLoginItem">
                            <Link className="nav-link" to="/login">Inicio de Sesión</Link>
                        </li>
                        <li className="nav-item d-none" id="navLogoutItem">
                            <button id="btnLogout" className="btn btn-outline-light btn-sm">Cerrar sesión</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;