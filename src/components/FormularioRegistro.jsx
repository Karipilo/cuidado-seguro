import React, { useState } from "react";

// Componente funcional para el formulario de registro
const FormularioRegistro = ({ onRegister }) => {
    // Estados para cada campo del formulario
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repitePassword, setRepitePassword] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [profesion, setProfesion] = useState("");
    const [numRegistro, setNumRegistro] = useState("");
    const [institucion, setInstitucion] = useState("");
    const [tutor, setTutor] = useState("");
    const [parentesco, setParentesco] = useState("");
    const [rutPaciente, setRutPaciente] = useState("");
    const [error, setError] = useState("");


    // Validación del Nombre del Usuario
    const validarNombre = (nombre) => {
        return nombre.trim().length > 0;
    };

    // Validación de email
    const validarEmail = (email) => {
        return email.includes("@") && email.endsWith(".com");
    };

    // Validación de contraseña
    const validarPassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
        return regex.test(password);
    };

    // Validación repetición de contraseña
    const validarRepitePassword = (password, repitePassword) => {
        return password === repitePassword;
    };

    // Validación tipo de usuario
    const validarTipoUsuario = (tipoUsuario) => {
        return tipoUsuario === "PROFESIONAL" || tipoUsuario === "TUTOR";
    };

    // Validación campos profesionales
    const validarCamposProfesionales = (tipoUsuario, profesion, numRegistro, institucion) => {
        if (tipoUsuario === "PROFESIONAL") {
            return profesion.trim().length > 0 && numRegistro.trim().length > 0 && institucion.trim().length > 0;
        }
        return true; // Si no es profesional, no se validan estos campos
    };

    // Validación campos tutor
    const validarCamposTutor = (tipoUsuario, parentesco, rutPaciente, tutor) => {
        if (tipoUsuario === "TUTOR") {
            return parentesco.trim().length > 0 && rutPaciente.trim().length > 0 && tutor.trim().length > 0;
        }
        return true; // Si no es tutor, no se validan estos campos
    };
    

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validaciones
        if (!validarNombre(nombre)) {
            setError("El nombre es obligatorio.");
            return;
        }
        if (!validarEmail(email)) {
            setError("El correo debe contener @ y terminar en .com"); // <-- Este texto debe coincidir exactamente con el test
            return;
        }
        if (!validarPassword(password)) {
            setError("La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un carácter especial.");
            return;
        }
        if (password !== repitePassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }
        if (!validarTipoUsuario(tipoUsuario)) {
            setError("Selecciona un tipo de usuario válido.");
            return;
        }
        if (!validarCamposProfesionales(tipoUsuario, profesion, numRegistro, institucion)) {
            setError("Completa todos los campos obligatorios para profesionales.");
            return;
        }
        if (!validarCamposTutor(tipoUsuario, parentesco, rutPaciente, tutor)) {
            setError("Completa todos los campos obligatorios para tutores.");
            return;
        }
        // Llama a la función de registro
        const success = onRegister(nombre,email, password,tipoUsuario);
        if (!success) {
            setError("No se pudo registrar el usuario");
        }
    };

    return (
        <div className="card shadow p-4 rounded-4">
            <h3 className="text-center mb-4 text-primary fw-bold">Registro de usuario</h3>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        className="form-control"
                        placeholder="Escribe tu Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="ejemplo@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="repitePassword" className="form-label">Repite Contraseña</label>
                    <input
                        type="password"
                        id="repitePassword"
                        className="form-control"
                        placeholder="********"
                        value={repitePassword}
                        onChange={(e) => setRepitePassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tipoUsuario" className="form-label">Tipo Usuario</label>
                    <select
                        id="tipoUsuario"
                        className="form-select"
                        value={tipoUsuario}
                        onChange={(e) => setTipoUsuario(e.target.value)}
                        required
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="PROFESIONAL">Profesional de Salud</option>
                        <option value="TUTOR">Tutor / Familiar</option>
                    </select>
                </div>

                {/* Campos condicionales para PROFESIONAL */}
                {tipoUsuario === "PROFESIONAL" && (
                    <>
                        <div className="mb-3">
                            <label htmlFor="profesion" className="form-label">Profesión</label>
                            <select
                                id="profesion"
                                className="form-select"
                                value={profesion}
                                onChange={(e) => setProfesion(e.target.value)}
                                required
                            >
                                <option value="">Seleccione...</option>
                                <option value="Medico">Médico</option>
                                <option value="Enfermero">Enfermero</option>
                                <option value="Kinesiólogo">Kinesiólogo</option>
                                <option value="Terapista Ocupacional">Terapista Ocupacional</option>
                                <option value="Psicólogo">Psicólogo</option>
                                <option value="Nutricionista">Nutricionista</option>
                                <option value="TENS">TENS</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="numRegistro" className="form-label">N° Registro (RNPI)</label>
                            <input
                                type="text"
                                id="numRegistro"
                                className="form-control"
                                value={numRegistro}
                                onChange={(e) => setNumRegistro(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="institucion" className="form-label">Institución</label>
                            <select
                                id="institucion"
                                className="form-select"
                                value={institucion}
                                onChange={(e) => setInstitucion(e.target.value)}
                                required
                            >
                                <option value="">Seleccione...</option>
                                <option value="Clínica Los Alerces">Clínica Los Alerces</option>
                                <option value="Clínica Los Carrera">Clínica Los Carrera</option>
                                <option value="Clínica Miraflores">Clínica Miraflores</option>
                                <option value="ELEAM Las Palmas">ELEAM Las Palmas</option>
                                <option value="Hogar San José">Hogar San José</option>
                                <option value="Hogar Santa María">Hogar Santa María</option>
                            </select>
                        </div>
                    </>
                )}

                {/* Campos condicionales para TUTOR */}
                {tipoUsuario === "TUTOR" && (
                    <>
                        <div className="mb-3">
                            <label htmlFor="tutor" className="form-label">Nombre del Tutor</label>
                            <input
                                type="text"
                                id="tutor"
                                className="form-control"
                                value={tutor}
                                onChange={(e) => setTutor(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="parentesco" className="form-label">Parentesco</label>
                            <select
                                id="parentesco"
                                className="form-select"
                                value={parentesco}
                                onChange={(e) => setParentesco(e.target.value)}
                                required
                            >
                                <option value="">Seleccione...</option>
                                <option value="Padre">Padre</option>
                                <option value="Madre">Madre</option>
                                <option value="Tio">Tío</option>
                                <option value="Tia">Tía</option>
                                <option value="Abuelo">Abuelo</option>
                                <option value="Abuela">Abuela</option>
                                <option value="Hijo">Hijo</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="rutPaciente" className="form-label">RUT del Paciente</label>
                            <input
                                type="text"
                                id="rutPaciente"
                                className="form-control"
                                value={rutPaciente}
                                onChange={(e) => setRutPaciente(e.target.value)}
                                required
                            />
                        </div>
                    </>
                )}

                <button type="submit" className="btn btn-success w-100 mt-2">
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default FormularioRegistro;
