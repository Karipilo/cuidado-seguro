// Importa React y los hooks necesarios
import React, { useState } from "react"; // useState para manejar los valores y cambios del formulario
import { useNavigate, Link } from "react-router-dom"; // useNavigate permite redirigir; Link para cambiar de página sin recargar

// Componente principal del formulario de registro
function FormularioRegistro() {
    // useNavigate permite redirigir a otra ruta, por ejemplo, después de registrarse
    const navigate = useNavigate();

    // ----------------------------
    // ESTADOS GENERALES
    // ----------------------------

    // Guarda el nombre completo del usuario
    const [nombre, setNombre] = useState("");
    // Guarda el email
    const [email, setEmail] = useState("");
    // Guarda la contraseña
    const [password, setPassword] = useState("");
    // Guarda la confirmación de la contraseña
    const [repitePassword, setRepitePassword] = useState("");
    // Guarda si el usuario seleccionó “Profesional” o “Tutor”
    const [tipoUsuario, setTipoUsuario] = useState("");

    // ----------------------------
    // ESTADOS PARA USUARIOS PROFESIONALES
    // ----------------------------

    // Guarda la especialidad del profesional
    const [tipoProfesional, setTipoProfesional] = useState("");
    // Guarda el número de registro RNPI
    const [rnpi, setRnpi] = useState("");
    // Guarda la institución a la que pertenece el profesional
    const [institucion, setInstitucion] = useState("");

    // ----------------------------
    // ESTADOS PARA USUARIOS TUTORES
    // ----------------------------

    // Guarda el parentesco con el paciente
    const [parentesco, setParentesco] = useState("");
    // Guarda el ID del paciente asociado
    const [idPaciente, setIdPaciente] = useState("");

    // ----------------------------
    // ERROR
    // ----------------------------

    // Guarda cualquier mensaje de error que se quiera mostrar al usuario
    const [error, setError] = useState("");

    // ----------------------------
    // FUNCIONES AUXILIARES
    // ----------------------------

    // Verifica que un correo tenga formato válido (con @ y .)
    const emailValido = (value) => /\S+@\S+\.\S+/.test(value);

    // Verifica que un campo no esté vacío (ignora espacios en blanco)
    const noVacio = (value) => String(value).trim().length > 0;

    // ----------------------------
    // FUNCIÓN QUE MANEJA EL ENVÍO DEL FORMULARIO
    // ----------------------------

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que se recargue la página al enviar el formulario

        // Validación básica: campos obligatorios comunes
        if (!noVacio(nombre) || !noVacio(email) || !noVacio(password) || !noVacio(repitePassword) || !noVacio(tipoUsuario)) {
            setError("Todos los campos obligatorios deben completarse.");
            return;
        }

        // Validar formato de email
        if (!emailValido(email)) {
            setError("El correo electrónico no tiene un formato válido.");
            return;
        }

        // Validar que las contraseñas coincidan
        if (password !== repitePassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        // Validar contraseña segura:
        // - Mínimo 6 caracteres
        // - Al menos una mayúscula
        // - Al menos un número
        // - Al menos un símbolo
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordRegex.test(password)) {
            setError("La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un símbolo.");
            return;
        }

        // Si el usuario seleccionó Profesional, validar sus campos
        if (tipoUsuario === "Profesional") {
            if (!noVacio(tipoProfesional) || !noVacio(rnpi) || !noVacio(institucion)) {
                setError("Debes completar los campos del profesional (tipo, RNPI e institución).");
                return;
            }
        }

        // Si el usuario seleccionó Tutor, validar sus campos
        if (tipoUsuario === "Tutor") {
            if (!noVacio(parentesco) || !noVacio(idPaciente)) {
                setError("Debes completar los campos del tutor (parentesco e ID del paciente).");
                return;
            }
        }

        // Si pasó todas las validaciones:
        setError(""); // Limpia errores anteriores
        alert("Registro exitoso ");
        navigate("/login"); // Redirige al login después de registrarse
    };

    // ----------------------------
    // RETORNO DEL COMPONENTE (interfaz visual)
    // ----------------------------

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
            {/* Tarjeta centrada */}
            <div className="card shadow p-4 rounded-4 formulario" style={{ maxWidth: 560, width: "100%" }}>
                <h3 className="text-center mb-4">Registro de Usuario</h3>

                {/* Muestra error si existe */}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    {/* Campo: Nombre */}
                    <div className="mb-3">
                        <label className="form-label">Nombre completo:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Ej: Karina Pimentel"
                        />
                        <small className="form-text text-muted">Ingresa tu nombre completo.</small>
                    </div>

                    {/* Campo: Email */}
                    <div className="mb-3">
                        <label className="form-label">Correo electrónico:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="usuario@correo.com"
                        />
                        <small className="form-text text-muted">Debe contener “@” y un dominio válido.</small>
                    </div>

                    {/* Campo: Contraseña */}
                    <div className="mb-3">
                        <label className="form-label">Contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                        <small className="form-text text-muted">
                            Mínimo 6 caracteres, una mayúscula, un número y un símbolo.
                        </small>
                    </div>

                    {/* Campo: Confirmar contraseña */}
                    <div className="mb-3">
                        <label className="form-label">Repite la contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={repitePassword}
                            onChange={(e) => setRepitePassword(e.target.value)}
                            placeholder="Confirma tu contraseña"
                        />
                    </div>

                    {/* Selector: Tipo de usuario */}
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

                    {/* Si el usuario es PROFESIONAL, aparecen estos campos */}
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

                    {/* Si el usuario es TUTOR, aparecen estos campos */}
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
                                    <option value="Hermano">Hermano/a</option>
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
                                    placeholder="Ejemplo: 00123PAC"
                                />
                                <small className="form-text text-muted">
                                    Puedes usar cualquier identificador único del paciente.
                                </small>
                            </div>
                        </>
                    )}

                    {/* Botón para enviar el formulario */}
                    <button type="submit" className="btn btn-primary w-100 mt-3">
                        Registrarse
                    </button>
                </form>

                {/* Enlace para usuarios que ya tienen cuenta */}
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
