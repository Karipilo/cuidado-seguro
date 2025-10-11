

// Importa React y el hook useState para manejar los estados de los campos
import React, { useState } from "react";
// Importa useNavigate para redireccionar y Link para enlaces internos
import { useNavigate, Link } from "react-router-dom";

// Componente principal de Registro
function Registro() {
  // Permite redireccionar a otra página
  const navigate = useNavigate();
  // Estados para cada campo del formulario
  const [nombre, setNombre] = useState(""); // Nombre del usuario
  const [email, setEmail] = useState(""); // Correo electrónico
  const [password, setPassword] = useState(""); // Contraseña
  const [repitePassword, setRepitePassword] = useState(""); // Repetir contraseña
  const [tipoUsuario, setTipoUsuario] = useState(""); // Tipo de usuario (profesional/tutor)
  const [profesion, setProfesion] = useState(""); // Profesión (si es profesional)
  const [numRegistro, setNumRegistro] = useState(""); // Número de registro profesional
  const [institucion, setInstitucion] = useState(""); // Institución afiliada
  const [parentesco, setParentesco] = useState(""); // Parentesco (si es tutor)
  const [rutPaciente, setRutPaciente] = useState(""); // RUT del paciente (si es tutor)
  const [error, setError] = useState(""); // Mensaje de error

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita recargar la página
    // Validación: todos los campos obligatorios deben estar completos
    if (!nombre || !email || !password || !repitePassword || !tipoUsuario) {
      setError("Completa todos los campos obligatorios.");
      return;
    }
    // Validación: las contraseñas deben coincidir
    if (password !== repitePassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    // Nueva Validación: Seguridad de la contraseña
    const passwordSeguro = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!passwordSeguro.test(password)) {
      setError("La contraseña debe tener al menos 6 caracterres, una mayúscula, una minúscula, un número y un símbolo especial. ");
      return;
    }
    
    // Simula guardar el usuario en localStorage
    localStorage.setItem("usuario_registrado", JSON.stringify({
      nombre,
      email,
      password,
      tipoUsuario,
      profesion: tipoUsuario === "PROFESIONAL" ? profesion : undefined,
      numRegistro: tipoUsuario === "PROFESIONAL" ? numRegistro : undefined,
      institucion: tipoUsuario === "PROFESIONAL" ? institucion : undefined,
      parentesco: tipoUsuario === "TUTOR" ? parentesco : undefined,
      rutPaciente: tipoUsuario === "TUTOR" ? rutPaciente : undefined,
    }));
    // Redirige al login después de registrar
    navigate("/login");
  };

  return (
    <main className="container py-4">
      {/* Caja principal del formulario de registro */}
      <div className="LoginUsuario card p-4 shadow rounded-4 mx-auto" style={{maxWidth: 500}}>
        {/* Título y bienvenida */}
        <h2 className="card-title">Registro</h2>
        <p className="text-center">¡Bienvenido! Ingresa tus datos para continuar.</p>
        {/* Muestra mensaje de error si existe */}
        {error && <div className="alert alert-danger">{error}</div>}
        {/* Formulario principal */}
        <form onSubmit={handleSubmit}>
          {/* Campo nombre de usuario */}
          <label htmlFor="UsuarioInput" className="form-label">Nombre</label>
          <input type="text" id="UsuarioInput" className="form-control input-gris-claro" placeholder="Ingresa tu usuario" value={nombre} onChange={e => setNombre(e.target.value)} />

          {/* Campo correo electrónico */}
          <label htmlFor="regEmail" className="form-label mt-2">Correo electrónico</label>
          <input type="email" id="regEmail" className="form-control input-gris-claro" placeholder="Ingresa tu correo electrónico" value={email} onChange={e => setEmail(e.target.value)} />

          {/* Campo contraseña */}
          <label htmlFor="inputPassword5" className="form-label mt-2">Contraseña</label>
          <input type="password" id="inputPassword5" className="form-control input-gris-claro" placeholder="Ingresa tu contraseña" value={password} onChange={e => setPassword(e.target.value)} />

          {/* Campo repetir contraseña */}
          <label htmlFor="inputPassword" className="form-label mt-2">Repite Contraseña</label>
          <input type="password" id="inputPassword" className="form-control input-gris-claro" placeholder="Repite contraseña" value={repitePassword} onChange={e => setRepitePassword(e.target.value)} />

          {/* Selector de tipo de usuario */}
          <div className="mb-3 mt-3">
            <label htmlFor="tipoUsuario" className="form-label">Tipo de usuario</label>
            <select id="tipoUsuario" className="form-select input-gris-claro" required value={tipoUsuario} onChange={e => setTipoUsuario(e.target.value)}>
              <option value="" disabled>Selecciona una opción</option>
              <option value="PROFESIONAL">Profesional de Salud</option>
              <option value="TUTOR">Tutor / Familiar</option>
            </select>
          </div>

          {/* Campos condicionales para PROFESIONAL */}
          {tipoUsuario === "PROFESIONAL" && (
            <div className="mb-3">
              {/* Selector de profesión */}
              <label htmlFor="profesion" className="form-label">Profesión</label>
              <select id="profesion" className="form-select input-gris-claro" value={profesion} onChange={e => setProfesion(e.target.value)}>
                <option value="" disabled>Seleccione...</option>
                <option value="Medico">Médico</option>
                <option value="Enfermero">Enfermero</option>
                <option value="Kinesiólogo">Kinesiólogo</option>
                <option value="Terapista Ocupacional">Terapista Ocupacional</option>
                <option value="Psicólogo">Psicólogo</option>
                <option value="Nutricionista">Nutricionista</option>
                <option value="TENS">TENS</option>
              </select>

              {/* Campo número de registro profesional */}
              <label htmlFor="numRegistro" className="form-label mt-2">N° Registro (RNPI)</label>
              <input type="text" id="numRegistro" className="form-control input-gris-claro" placeholder="Ej: 123456" value={numRegistro} onChange={e => setNumRegistro(e.target.value)} />

              {/* Selector de institución afiliada a Cuidado Seguro */}
              <label htmlFor="institucion" className="form-label mt-2">Institución</label>
              <select id="institucion" className="form-select input-gris-claro" value={institucion} onChange={e => setInstitucion(e.target.value)}>
                <option value="" disabled>Seleccione...</option>
                <option value="Clínica Los Alerces">Clínica Los Alerces</option>
                <option value="Clínica Los Carrera">Clínica Los Carrera</option>
                <option value="Clínica Miraflores">Clínica Miraflores</option>
                <option value="ELEAM Las Palmas">ELEAM Las Palmas</option>
                <option value="Hogar San José">Hogar San José</option>
                <option value="Hogar Santa María">Hogar Santa María</option>
              </select>
            </div>
          )}

          {/* Campos condicionales para TUTOR */}
          {tipoUsuario === "TUTOR" && (
            <div className="mb-3">
              {/* Selector de parentesco */}
              <label htmlFor="parentesco" className="form-label">Parentesco</label>
              <select id="parentesco" className="form-select input-gris-claro" value={parentesco} onChange={e => setParentesco(e.target.value)}>
                <option value="" disabled>Seleccione...</option>
                <option value="Padre">Padre</option>
                <option value="Madre">Madre</option>
                <option value="Tio">Tío</option>
                <option value="Tia">Tía</option>
                <option value="Abuelo">Abuelo</option>
                <option value="Abuela">Abuela</option>
                <option value="Hijo">Hijo</option>
              </select>

              {/* Campo RUT del paciente */}
              <label htmlFor="RutPaciente" className="form-label mt-2">RUT del Paciente</label>
              <input type="text" id="RutPaciente" className="form-control input-gris-claro" placeholder="11.111.111-1" value={rutPaciente} onChange={e => setRutPaciente(e.target.value)} />
            </div>
          )}

          {/* Botón para crear cuenta */}
          <button className="button-56 w-100 mt-3" type="submit">Crear cuenta</button>
        </form>
        {/* Enlace para usuarios que ya tienen cuenta */}
        <div className="text-center mt-2">
          <Link to="/login" className="small d-block text-decoration-none">Ya tengo una cuenta</Link>
        </div>
      </div>
    </main>
  );
}

export default Registro;