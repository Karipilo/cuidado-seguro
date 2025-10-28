import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/formulario.css";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!aceptaTerminos) {
      alert("Debes aceptar los Términos y Condiciones.");
      return;
    }

    if (!validarEmail(email)) {
      alert("El correo debe contener '@' y terminar en '.com'");
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

    if (tipoUsuario === "Profesional Interno") {
      nuevoUsuario.tipoProf = tipoProf;
      nuevoUsuario.institucion = institucion;
    }

    if (tipoUsuario === "Profesional Externo") {
      nuevoUsuario.tipoProf = tipoProf;
      nuevoUsuario.rnpi = rnpi;
    }

    if (tipoUsuario === "Tutor") {
      nuevoUsuario.idPaciente = idPaciente;
      nuevoUsuario.codigoCentro = codigoCentro;
    }

    // ✅ Guardar usuario en la lista general (sin sobrescribir)
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // ✅ Guardar también la sesión activa actual
    localStorage.setItem("usuarioActivo", JSON.stringify(nuevoUsuario));

    alert("Registro exitoso");

    // Redirección según tipo de usuario
    if (tipoUsuario === "Profesional Interno") {
      navigate("/dashboard-prof");
    } else if (tipoUsuario === "Profesional Externo") {
      navigate("/dashboard-prof-externo");
    } else if (tipoUsuario === "Tutor") {
      navigate("/dashboard-tutor");
    }
  };

  return (
    <div className="formulario card formulario">
      <h3>Registro</h3>
      <form onSubmit={handleSubmit}>
        <label>Nombre completo</label>
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          placeholder="6 caracteres, 1 mayúscula, 1 número y 1 símbolo."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Repite tu contraseña</label>
        <input
          type="password"
          placeholder="6 caracteres, 1 mayúscula, 1 número y 1 símbolo tener al menos 6 caracteres, una mayúscula, un número y un símbolo."
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

        {/* Campos dinámicos */}
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
              <option value="Clínica Los Alerces">Clínica Los Alerces</option>
              <option value="Clínica Los Carrera">Clínica Los Carrera</option>
              <option value="Clínica Miraflores">Clínica Miraflores</option>
              <option value="ELEAM Las Palmas">ELEAM Las Palmas</option>
              <option value="Hogar San José">Hogar San José</option>
              <option value="Hogar Santa María">Hogar Santa María</option>
            </select>
          </>
        )}

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

        {tipoUsuario === "Tutor" && (
          <>
            <label>RUT del Familiar</label>
            <input
              type="text"
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
