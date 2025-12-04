/* Componente: Login.jsx
   Conectado al backend real (EC2).
   Normaliza los valores de tipoUsuario del backend
   para que coincidan con los dashboards del frontend.
*/

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/formulario.css";
import { login } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Llamar a backend /api/auth/login
      const data = await login(email, password);

      if (!data || !data.tipoUsuario) {
        setError("Credenciales inválidas");
        return;
      }

      console.log("Respuesta backend:", data);

      
      // NORMALIZAR tipoUsuario DEL BACKEND
      
      let tipo = data.tipoUsuario;

      if (tipo === "PROF_INTERNO") tipo = "Profesional Interno";
      if (tipo === "PROF_EXTERNO") tipo = "Profesional Externo";
      if (tipo === "TUTOR") tipo = "Tutor";

      data.tipoUsuario = tipo;

      // Guardar sesión normalizada
      localStorage.setItem("usuarioActivo", JSON.stringify(data));

      alert(`Bienvenido ${data.nombre}`);

      
      // REDIRECCIÓN SEGÚN TIPO
      
      switch (data.tipoUsuario) {
        case "Profesional Interno":
          navigate("/dashboard-prof");
          break;

        case "Tutor":
          navigate("/dashboard-tutor");
          break;

        case "Profesional Externo":
          navigate("/dashboard-prof-externo");
          break;

        default:
          alert("Tipo de usuario no reconocido");
          navigate("/home");
      }
    } catch (err) {
      console.error(err);
      setError("Error: correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="formulario-container d-flex justify-content-center align-items-center vh-100">
      <div
        className="formulario card shadow-lg p-4"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        <h3 className="text-center mb-3 text-primary">Iniciar Sesión</h3>

        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}

        <form onSubmit={handleLogin}>
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
