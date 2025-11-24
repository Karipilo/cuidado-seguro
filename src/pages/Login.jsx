/* Componente: Login.jsx
   Formulario de inicio de sesión del sistema "Cuidado Seguro".
   Valida credenciales por correo y contraseña desde localStorage
   y redirige según el tipo de usuario.
*/

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/formulario.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar solo por EMAIL + PASSWORD
    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (!usuarioEncontrado) {
      alert("Correo o contraseña incorrectos. Intenta nuevamente.");
      return;
    }

    // Guardar sesión activa
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

    alert(`Bienvenido ${usuarioEncontrado.nombre}`);

    // Redirección según tipo de usuario
    if (usuarioEncontrado.tipoUsuario === "Profesional Interno") {
      navigate("/dashboard-prof");
    } else if (usuarioEncontrado.tipoUsuario === "Tutor") {
      navigate("/dashboard-tutor");
    } else if (usuarioEncontrado.tipoUsuario === "Profesional Externo") {
      navigate("/dashboard-prof-externo");
    } else {
      navigate("/home"); // fallback
    }
  };

  return (
    <div className="formulario-container d-flex justify-content-center align-items-center vh-100">
      <div
        className="formulario card shadow-lg p-4"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        <h3 className="text-center mb-3 text-primary">Iniciar Sesión</h3>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@correo.com"
              required
            />
          </div>

          {/* Contraseña */}
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
              required
            />
          </div>

          {/* Botón ingresar */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Ingresar
            </button>
          </div>
        </form>

        <p className="text-center mt-3">
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
