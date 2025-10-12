// Importa React y sus hooks necesarios
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Para navegación entre páginas

// Componente principal del formulario de registro
function FormularioRegistro() {
    const navigate = useNavigate(); // Permite redirigir al usuario al login luego del registro

    // ----------------------------
    // ESTADOS COMUNES DEL FORMULARIO
    // ----------------------------

    const [nombre, setNombre] = useState("");              // Nombre completo del usuario
    const [email, setEmail] = useState("");                // Correo electrónico
    const [password, setPassword] = useState("");          // Contraseña
    const [repitePassword, setRepitePassword] = useState("");// Confirmación de contraseña
    const [tipoUsuario, setTipoUsuario] = useState("");    // "Profesional" o "Tutor"

    // ----------------------------
    // CAMPOS EXCLUSIVOS PARA PROFESIONAL
    // ----------------------------

    const [tipoProfesional, setTipoProfesional] = useState(""); // Especialidad del profesional
    const [rnpi, setRnpi] = useState("");                       // Número RNPI
    const [institucion, setInstitucion] = useState("");         // Institución a la que pertenece

    // ----------------------------
    // CAMPOS EXCLUSIVOS PARA TUTOR
    // ----------------------------

    const [parentesco, setParentesco] = useState("");      // Parentesco con el paciente
    const [idPaciente, setIdPaciente] = useState("");      // ID único del paciente
    const [codigoCentro, setCodigoCentro] = useState("");  // Código entregado por el centro

    // ----------------------------
    // ESTADO PARA MANEJAR ERRORES
    // ----------------------------

    const [error, setError] = useState(""); // Se muestra en pantalla si hay errores

    // ----------------------------
    // VALIDACIONES AUXILIARES
    // ----------------------------

    const emailValido = (value) => /\S+@\S+\.\S+/.test(value); // Verifica que el email tenga @ y dominio
    const noVacio = (value) => String(value).trim().length > 0; // Verifica que no esté vacío

    // ----------------------------
    // FUNCIÓN QUE MANEJA EL ENVÍO DEL FORMULARIO
    // ----------------------------

    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del form (recargar la página)

        // Validación de campos comunes
        if (!noVacio(nombre) || !noVacio(email) || !noVacio(password) || !noVacio(repitePassword) || !noVacio(tipoUsuario)) {
            setError("Todos los campos obligatorios deben completarse.");
            return;
        }

        if (!emailValido(email)) {
            setError("El correo electrónico no tiene un formato válido.");
            return;
        }

        if (password !== repitePassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        // Validación de contraseña segura
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordRegex.test(password)) {
            setError("La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un símbolo.");
            return;
        }

        // Validación de campos para profesional
        if (tipoUsuario === "Profesional") {
            if (!noVacio(tipoProfesional) || !noVacio(rnpi) || !noVacio(institucion)) {
                setError("Debes completar los campos del profesional (tipo, RNPI e institución).");
                return;
            }
        }

        // Validación de campos para tutor (ahora incluye el código del centro)
        if (tipoUsuario === "Tutor") {
            if (!noVacio(parentesco) || !noVacio(idPaciente) || !noVacio(codigoCentro)) {
                setError("Debes completar los campos del tutor (parentesco, ID del paciente y código del centro).");
                return;
            }
        }

        // Si todo está correcto:
        setError(""); // Limpia errores
        alert("Registro exitoso 🎉");
        navigate("/login"); // Redirige al login
    };

    // ----------------------------
    // INTERFAZ VISUAL DEL COMPONENTE
    // ----------------------------

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="card shadow p-4 rounded-4 formulario" style={{ maxWidth: 560, width: "100%" }}>
                <h3 className="text-center mb-4">Registro de Usuario</h3>

                {/* Si hay error, se muestra aquí */}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    {/* NOMBRE */}
                    <div className="mb-3">
                        <label className="form-label">Nombre completo:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Ej: Juan Pérez"
                        />

                    </div>

                    {/* EMAIL */}
                    <div className="mb-3">
                        <label className="form-label">Correo electrónico:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="usuario@correo.com"
                        />

                    </div>

                    {/* CONTRASEÑA */}
                    <div className="mb-3">
                        <label className="form-label">Contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mínimo 6 caracteres, una mayúscula, un número y un símbolo"
                        />

                    </div>

                    {/* REPITE CONTRASEÑA */}
                    <div className="mb-3">
                        <label className="form-label">Repite la contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={repitePassword}
                            onChange={(e) => setRepitePassword(e.target.value)}
                            placeholder="Repite tu contraseña"
                        />
                    </div>

                    {/* TIPO DE USUARIO */}
                    <div className="mb-3">
                        <label className="form-label">Tipo de usuario:</label>
                        <select
                            className="form-select"
                            value={tipoUsuario}
                            onChange={(e) => setTipoUsuario(e.target.value)}
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="Profesional">Profesional</option>
                            <option value="Tutor">Tutor</option>
                        </select>
                    </div>

                    {/* CAMPOS PROFESIONAL */}
                    {tipoUsuario === "Profesional" && (
                        <>
                            <div className="mb-3">
                                <label className="form-label">Tipo de profesional:</label>
                                <select
                                    className="form-select"
                                    value={tipoProfesional}
                                    onChange={(e) => setTipoProfesional(e.target.value)}
                                >
                                    <option value="">Selecciona tu especialidad</option>
                                    <option value="Enfermero">Enfermero/a</option>
                                    <option value="Técnico Paramédico">Paramedico</option>
                                    <option value="Kinesiólogo">Kinesiólogo/a</option>
                                    <option value="Médico">Médico/a</option>
                                    <option value="Nutricionista">Nutricionista</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Número RNPI:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={rnpi}
                                    onChange={(e) => setRnpi(e.target.value)}
                                    placeholder="Ejemplo: 12345"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Institución:</label>
                                <select
                                    className="form-select"
                                    value={institucion}
                                    onChange={(e) => setInstitucion(e.target.value)}
                                >
                                    <option value="">Selecciona una institución</option>
                                    <option value="ELEAM San José">ELEAM San José</option>
                                    <option value="Hogar Esperanza">Hogar Esperanza</option>
                                    <option value="Residencia Los Pinos">Residencia Los Pinos</option>
                                    <option value="Centro Vida Plena">Centro Vida Plena</option>
                                </select>
                            </div>
                        </>
                    )}

                    {/* CAMPOS TUTOR */}
                    {tipoUsuario === "Tutor" && (
                        <>
                            <div className="mb-3">
                                <label className="form-label">Parentesco:</label>
                                <select
                                    className="form-select"
                                    value={parentesco}
                                    onChange={(e) => setParentesco(e.target.value)}
                                >
                                    <option value="">Selecciona parentesco</option>
                                    <option value="Madre">Madre</option>
                                    <option value="Padre">Padre</option>
                                    <option value="Hijo">Hijo/a</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">ID del paciente:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={idPaciente}
                                    onChange={(e) => setIdPaciente(e.target.value)}
                                    placeholder="Ingrese el rut del paciente"
                                />

                            </div>

                            <div className="mb-3">
                                <label className="form-label">Código de acceso del centro:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={codigoCentro}
                                    onChange={(e) => setCodigoCentro(e.target.value)}
                                    placeholder="Este código debe ser proporcionado por la institución."
                                />

                            </div>
                        </>
                    )}

                    {/* BOTÓN SUBMIT */}
                    <button type="submit" className="btn btn-primary w-100 mt-3">
                        Registrarse
                    </button>
                </form>

                {/* ENLACE A LOGIN */}
                <p className="text-center mt-3">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="text-decoration-none fw-semibold">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default FormularioRegistro;

