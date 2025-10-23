// ===============================================================
// 🧩 Componente: FormularioRegistro.jsx
// Descripción: Formulario de registro con validaciones completas
// Incluye campo obligatorio "Acepto términos y condiciones"
// ===============================================================

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/formulario.css";

function FormularioRegistro() {
    const navigate = useNavigate();

    // ---------------------------------------------------------------
    // ESTADOS DEL FORMULARIO
    // ---------------------------------------------------------------
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repitePassword, setRepitePassword] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("");

    // Profesional Interno
    const [rnpi, setRnpi] = useState("");
    const [institucion, setInstitucion] = useState("");

    // Tutor
    const [parentesco, setParentesco] = useState("");
    const [idPaciente, setIdPaciente] = useState("");
    const [codigoCentro, setCodigoCentro] = useState("");

    // Profesional Externo
    const [numeroProfesional, setNumeroProfesional] = useState("");

    // Nuevo estado para checkbox de aceptación de términos
    const [aceptaTerminos, setAceptaTerminos] = useState(false);

    // Manejo de errores
    const [error, setError] = useState("");

    // ---------------------------------------------------------------
    // VALIDACIONES
    // ---------------------------------------------------------------
    const emailValido = (v) => /\S+@\S+\.\S+/.test(v);
    const noVacio = (v) => String(v).trim().length > 0;
    const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{6,}$/;

    // ---------------------------------------------------------------
    // FUNCIÓN DE ENVÍO DEL FORMULARIO
    // ---------------------------------------------------------------
    const handleSubmit = (e) => {
        e.preventDefault();

        // ✅ Validación de campos vacíos
        if (
            !noVacio(nombre) ||
            !noVacio(email) ||
            !noVacio(password) ||
            !noVacio(repitePassword) ||
            !noVacio(tipoUsuario)
        ) {
            setError("Todos los campos obligatorios deben completarse.");
            return;
        }

        // ✅ Validación formato correo
        if (!emailValido(email)) {
            setError("El correo electrónico no tiene un formato válido.");
            return;
        }

        // ✅ Contraseñas coinciden
        if (password !== repitePassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        // ✅ Seguridad de la contraseña
        if (!passwordRegex.test(password)) {
            setError(
                "La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un símbolo (@ $ ! % * ? & . _ -)."
            );
            return;
        }

        // ✅ Validaciones según tipo de usuario
        if (
            tipoUsuario === "Profesional Interno" &&
            (!noVacio(rnpi) || !noVacio(institucion))
        ) {
            setError("Debes completar RNPI e institución para profesionales internos.");
            return;
        }

        if (
            tipoUsuario === "Tutor" &&
            (!noVacio(parentesco) || !noVacio(idPaciente) || !noVacio(codigoCentro))
        ) {
            setError("Debes completar parentesco, ID paciente y código del centro.");
            return;
        }

        if (tipoUsuario === "Profesional Externo" && !noVacio(numeroProfesional)) {
            setError("Debes ingresar tu número de profesional externo.");
            return;
        }

        // ✅ Validación del checkbox
        if (!aceptaTerminos) {
            setError("Debes aceptar los términos y condiciones antes de registrarte.");
            return;
        }

        // Si todo está correcto, limpiamos el error
        setError("");

        // ---------------------------------------------------------------
        // GUARDAR DATOS DEL USUARIO
        // ---------------------------------------------------------------
        const nuevoUsuario = {
            nombre,
            email,
            password,
            tipoUsuario,
            rnpi,
            institucion,
            parentesco,
            idPaciente,
            codigoCentro,
            numeroProfesional,
            aceptaTerminos,
        };

        localStorage.setItem("usuarioRegistrado", JSON.stringify(nuevoUsuario));
        localStorage.setItem("usuarioActivo", JSON.stringify(nuevoUsuario));

        // ---------------------------------------------------------------
        // REDIRECCIÓN SEGÚN EL TIPO DE USUARIO
        // ---------------------------------------------------------------
        if (tipoUsuario === "Profesional Interno") {
            navigate("/dashboard-prof");
        } else if (tipoUsuario === "Tutor") {
            navigate("/dashboard-tutor");
        } else if (tipoUsuario === "Profesional Externo") {
            navigate("/dashboard-prof-externo");
        } else {
            navigate("/login");
        }

        alert(`Registro exitoso como ${tipoUsuario}`);
    };

    // ---------------------------------------------------------------
    // INTERFAZ VISUAL
    // ---------------------------------------------------------------
    return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div
                className="card shadow p-4 rounded-4 formulario"
                style={{ maxWidth: 560, width: "100%" }}
            >
                <h3 className="text-center mb-4">REGÍSTRATE</h3>

                {/* Mensaje de error */}
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

                    {/* CORREO */}
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
                            placeholder="Ingrese su contraseña"
                        />
                        <small className="text-light" style={{ fontSize: "0.78rem" }}>
                            Mínimo 6 caracteres, una mayúscula, un número y un símbolo.
                        </small>
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
                            <option value="Profesional Interno">Profesional Interno</option>
                            <option value="Tutor">Tutor / Familiar</option>
                            <option value="Profesional Externo">Profesional Externo</option>
                        </select>
                    </div>

                    {/* CAMPOS PROFESIONAL INTERNO */}
                    {tipoUsuario === "Profesional Interno" && (
                        <>
                            <div className="mb-3">
                                <label className="form-label">Número RNPI:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={rnpi}
                                    onChange={(e) => setRnpi(e.target.value)}
                                    placeholder="Ej: 12345"
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
                                    <option value="Clínica Los Alerces">Clínica Los Alerces</option>
                                    <option value="Clínica Los Carreras">Clínica Los Carreras</option>
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
                                    placeholder="RUT del paciente"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Código del centro:</label>
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

                    {/* CAMPOS PROFESIONAL EXTERNO */}
                    {tipoUsuario === "Profesional Externo" && (
                        <div className="mb-3">
                            <label className="form-label">Número de Profesional:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={numeroProfesional}
                                onChange={(e) => setNumeroProfesional(e.target.value)}
                                placeholder="Ej: 908776"
                            />
                        </div>
                    )}

                    {/* CHECKBOX DE TÉRMINOS Y CONDICIONES */}
                    <div className="form-check mt-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={aceptaTerminos}
                            onChange={(e) => setAceptaTerminos(e.target.checked)}
                            id="terminos"
                        />
                        <label className="form-check-label" htmlFor="terminos">
                            Acepto los <Link to="/terminos" className="text-primary">Términos y Condiciones</Link>
                        </label>
                    </div>

                    {/* BOTÓN */}
                    <button type="submit" className="btn btn-primary w-100 mt-4">
                        Registrar
                    </button>
                </form>

                {/* Enlace inferior */}
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
