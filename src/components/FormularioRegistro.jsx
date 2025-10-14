// Importa React y sus hooks necesarios
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Para navegación entre páginas
import "../style/formulario.css"; // Mantiene tu CSS original

function FormularioRegistro() {
    const navigate = useNavigate(); // Permite redirigir al usuario al login luego del registro

    // ESTADOS BÁSICOS
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repitePassword, setRepitePassword] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("");

    // ESTADOS PROFESIONAL
    const [tipoProfesional, setTipoProfesional] = useState("");
    const [rnpi, setRnpi] = useState("");
    const [institucion, setInstitucion] = useState("");

    // ESTADOS TUTOR
    const [parentesco, setParentesco] = useState("");
    const [idPaciente, setIdPaciente] = useState("");
    const [codigoCentro, setCodigoCentro] = useState("");

    // ERRORES
    const [error, setError] = useState("");

    // VALIDACIONES
    const emailValido = (value) => /\S+@\S+\.\S+/.test(value);
    const noVacio = (value) => String(value).trim().length > 0;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{6,}$/;

    // FUNCIÓN PRINCIPAL DE ENVÍO
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita recargar la página

        // Validaciones generales
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

        if (!passwordRegex.test(password)) {
            setError("La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un símbolo (@ $ ! % * ? & . _ -).");
            return;
        }

        // Validaciones específicas
        if (tipoUsuario === "Profesional" && (!noVacio(tipoProfesional) || !noVacio(rnpi) || !noVacio(institucion))) {
            setError("Debes completar los campos del profesional (tipo, RNPI e institución).");
            return;
        }

        if (tipoUsuario === "Tutor" && (!noVacio(parentesco) || !noVacio(idPaciente) || !noVacio(codigoCentro))) {
            setError("Debes completar los campos del tutor (parentesco, ID paciente y código del centro).");
            return;
        }

        // Limpia errores
        setError("");

        // 💾 Guarda los datos del usuario en localStorage
        const nuevoUsuario = {
            nombre,
            email,
            password,
            tipoUsuario,
            tipoProfesional,
            rnpi,
            institucion,
            parentesco,
            idPaciente,
            codigoCentro,
        };

        localStorage.setItem("usuarioRegistrado", JSON.stringify(nuevoUsuario));

        alert("✅ Registro exitoso");
        navigate("/login"); // Redirige al login
    };

    // INTERFAZ VISUAL 
    return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="card shadow p-4 rounded-4 formulario" style={{ maxWidth: 560, width: "100%" }}>
                <h3 className="text-center mb-4">REGÍSTRATE</h3>

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
                        <small className="text-light">
                            Símbolos permitidos: <strong>@ $ ! % * ? & . _ -</strong>
                        </small>
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
                                    <option value="Técnico Paramédico">Paramédico</option>
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
                                    <option value="Clínica los Alerces">Clínica Los Alerces</option>
                                    <option value="Clínica los Carreras">Clínica Los Carreras</option>
                                    <option value="Clínica Miraflores">Clínica Miraflores</option>
                                    <option value="ELEAM Las Palmas">ELEAM Las Palmas</option>
                                    <option value="ELEAM San José">ELEAM San José</option>
                                    <option value="Hogar Santa María">Hogar Santa María</option>
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
                                    placeholder="Ingrese el RUT del paciente"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Código de acceso del centro:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={codigoCentro}
                                    onChange={(e) => setCodigoCentro(e.target.value)}
                                    placeholder="Código entregado por la institución"
                                />
                            </div>
                        </>
                    )}

                    {/* BOTÓN */}
                    <button type="submit" className="btn btn-primary w-100 mt-3">
                        Registrar
                    </button>
                </form>

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


