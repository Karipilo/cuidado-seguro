import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/formulario.css";

import { normalizarRut, validarRut, formatearRut } from "../utils/rutUtils";

const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{6,}$/;

function FormularioRegistro() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repitePassword, setRepitePassword] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [tipoProf, setTipoProf] = useState("");
  const [institucion, setInstitucion] = useState("");
  const [rnpi, setRnpi] = useState("");
  const [idPaciente, setIdPaciente] = useState("");
  const [codigoCentro, setCodigoCentro] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  // ============================================================
  // SUBMIT DEL FORMULARIO
  // ============================================================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!aceptaTerminos) {
      alert("Debes aceptar los Términos y Condiciones.");
      return;
    }

    if (!validarEmail(email)) {
      alert("Ingrese un correo válido.");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert(
        "La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un símbolo."
      );
      return;
    }

    if (password !== repitePassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const nuevoUsuario = {
      nombre,
      email,
      password,
      tipoUsuario,
    };

    // PROFESIONAL INTERNO
    if (tipoUsuario === "Profesional Interno") {
      nuevoUsuario.tipoProf = tipoProf;
      nuevoUsuario.institucion = institucion;
    }

    // PROFESIONAL EXTERNO
    if (tipoUsuario === "Profesional Externo") {
      nuevoUsuario.tipoProf = tipoProf;
      nuevoUsuario.rnpi = rnpi;
    }

    // ============================================================
    // TUTOR — VALIDAR RUT DEL PACIENTE (CORREGIDO)
    // ============================================================
    if (tipoUsuario === "Tutor") {
      // Validar usando el RUT tal cual lo ingresó el usuario
      if (!validarRut(idPaciente)) {
        alert("El RUT del paciente no es válido.");
        return;
      }

      // Formatear RUT correctamente
      const rutFormateado = formatearRut(idPaciente);

      nuevoUsuario.idPaciente = rutFormateado;
      nuevoUsuario.codigoCentro = codigoCentro;
    }

    // Guardar usuario
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Guardar sesión activa
    localStorage.setItem("usuarioActivo", JSON.stringify(nuevoUsuario));

    alert("Registro exitoso");

    // Redirección
    if (tipoUsuario === "Profesional Interno") {
      navigate("/dashboard-prof");
    } else if (tipoUsuario === "Profesional Externo") {
      navigate("/dashboard-prof-externo");
    } else if (tipoUsuario === "Tutor") {
      navigate("/dashboard-tutor");
    }
  };

  // ============================================================
  // RENDER DEL FORMULARIO
  // ============================================================
  return (
    <div className="formulario card formulario">
      <h3>Registro</h3>
      <form onSubmit={handleSubmit}>
        <label>Nombre completo</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Repite tu contraseña</label>
        <input
          type="password"
          value={repitePassword}
          onChange={(e) => setRepitePassword(e.target.value)}
          required
        />

        <label>Tipo de usuario</label>
        <select
          value={tipoUsuario}
          onChange={(e) => setTipoUsuario(e.target.value)}
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="Profesional Interno">Profesional Interno</option>
          <option value="Profesional Externo">Profesional Externo</option>
          <option value="Tutor">Tutor</option>
        </select>

        {/* PROFESIONAL INTERNO */}
        {tipoUsuario === "Profesional Interno" && (
          <>
            <label>Tipo Profesional</label>
            <select
              value={tipoProf}
              onChange={(e) => setTipoProf(e.target.value)}
              required
            >
              <option value="">Seleccione tipo profesional</option>
              <option value="Médico">Médico</option>
              <option value="Enfermero">Enfermero</option>
              <option value="Kinesiólogo">Kinesiólogo</option>
              <option value="Psicólogo">Psicólogo</option>
              <option value="Nutricionista">Nutricionista</option>
              <option value="Terapeuta Ocupacional">
                Terapeuta Ocupacional
              </option>
              <option value="Paramédico">Paramédico</option>
            </select>

            <label>Institución</label>
            <select
              value={institucion}
              onChange={(e) => setInstitucion(e.target.value)}
              required
            >
              <option value="">Seleccione institución</option>
              <option value="ELEAM Las Palmas">ELEAM Las Palmas</option>
              <option value="Hogar San José">Hogar San José</option>
              <option value="Hogar Santa María">Hogar Santa María</option>
            </select>
          </>
        )}

        {/* PROFESIONAL EXTERNO */}
        {tipoUsuario === "Profesional Externo" && (
          <>
            <label>Tipo de profesional</label>
            <select
              value={tipoProf}
              onChange={(e) => setTipoProf(e.target.value)}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="Médico">Médico</option>
              <option value="Enfermero">Enfermero</option>
              <option value="Paramédico">Paramédico</option>
              <option value="Nutricionista">Nutricionista</option>
              <option value="Otro">Otro</option>
            </select>

            <label>RNPI</label>
            <input
              type="text"
              value={rnpi}
              onChange={(e) => setRnpi(e.target.value)}
              required
            />
          </>
        )}

        {/* TUTOR */}
        {tipoUsuario === "Tutor" && (
          <>
            <label>RUT del Paciente</label>
            <input
              type="text"
              placeholder="Ej: 6.345.678-9"
              value={idPaciente}
              onChange={(e) => setIdPaciente(e.target.value)}
              required
            />

            <label>Código del Centro</label>
            <input
              type="text"
              value={codigoCentro}
              onChange={(e) => setCodigoCentro(e.target.value)}
              required
            />
          </>
        )}

        <div className="form-check mb-3 d-flex align-items-center justify-content-center">
          <input
            type="checkbox"
            className="form-check-input me-2"
            id="aceptaTerminos"
            checked={aceptaTerminos}
            onChange={(e) => setAceptaTerminos(e.target.checked)}
            style={{ width: "16px", height: "16px" }}
            required
          />
          <label htmlFor="aceptaTerminos" className="form-check-label">
            Acepto los Términos y Condiciones
          </label>
        </div>

        <button type="submit">Registrarse</button>
      </form>

      <p className="text-center mt-3">
        ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </div>
  );
}

export default FormularioRegistro;
