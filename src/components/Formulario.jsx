// Descripción: Maneja el inicio de sesión de usuarios en Cuidado Seguro
// Compatible con pruebas unitarias (Vitest + Testing Library)

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/formulario.css";

function Formulario({ onLogin }) {
  const navigate = useNavigate();

  // Estados controlados del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Validaciones básicas
  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{6,}$/;

  // Envío del formulario

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validar email
    if (!validarEmail(email)) {
      setError("El correo debe contener '@' y terminar en '.com'");
      return;
    }

    //  2. Validar contraseña
    if (!passwordRegex.test(password)) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // 3. Si pasa las validaciones
    setError("");

    //  Llamar al callback onLogin (para las pruebas y lógica general)
    if (onLogin) onLogin(email, password);

    // Validar usuario real en localStorage (si existe)
    const usuarioGuardado = JSON.parse(
      localStorage.getItem("usuarioRegistrado")
    );

    if (
      usuarioGuardado &&
      usuarioGuardado.email === email &&
      usuarioGuardado.password === password
    ) {
      // Guardar sesión activa
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioGuardado));

      alert(`Bienvenido(a), ${usuarioGuardado.nombre}`);

      // Redirigir según el tipo de usuario
      if (usuarioGuardado.tipoUsuario === "Profesional") {
        navigate("/dashboardprof");
      } else {
        navigate("/dashboard-tutor");
      }
    } else if (!usuarioGuardado) {
      // Si no existe usuario registrado, no hace nada en producción
      console.warn("No hay usuario registrado en localStorage");
    } else {
      setError("Credenciales incorrectas o usuario no registrado");
    }
  };

  // Renderizado del formulario

  return (
    <div className="formulario">
      <h3>Iniciar Sesión</h3>

      {/* Mostrar error si existe */}
      {error && <p style={{ color: "#F08080", fontWeight: "bold" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Campo Email */}
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          placeholder="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Campo Contraseña */}
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Botón de envío */}
        <button type="submit">Ingresar</button>
      </form>

      {/* Enlace al registro */}
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        ¿No tienes cuenta?{" "}
        <Link to="/registro" style={{ color: "#FFF8DC", fontWeight: "bold" }}>
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}

export default Formulario;
