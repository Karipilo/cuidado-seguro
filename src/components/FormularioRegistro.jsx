// ===============================================================
// 🧩 Componente: FormularioRegistro.jsx
// Descripción: Mantiene los estilos originales (formulario.css)
//              con tres tipos de usuario y redirección automática:
//              Profesional Interno → /dashboard-prof
//              Tutor → /dashboard-tutor
//              Profesional Externo → /dashboard-prof-externo
// ===============================================================

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/formulario.css"; // ✅ Mantiene tus colores y diseño original

function FormularioRegistro() {
    const navigate = useNavigate();

    // ------------------------- ESTADOS -------------------------
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repitePassword, setRepitePassword] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("");

    // Profesional Interno
    const [rnpi, setRnpi] = useState("");
    const [institucion, setInstitucion] = useState("");

    // Tutor / Familiar
    const [parentesco, setParentesco] = useState("");
    const [idPaciente, setIdPaciente] = useState("");
    const [codigoCentro, setCodigoCentro] = useState("");

    // Profesional Externo
    const [numeroProfesional, setNumeroProfesional] = useState("");

    const [error, setError] = useState("");

    // ------------------------- VALIDACIONES -------------------------
    const emailValido = (v) => /\S+@\S+\.\S+/.test(v);
    const noVacio = (v) => String(v).trim().length > 0;
    const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{6,}$/;

    // ------------------------- ENVÍO DEL FORMULARIO -------------------------
    const handleSubmit = (e) => {
        e.preventDefault();

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

        if (!emailValido(email)) {
            setError("El correo electrónico no tiene un formato válido.");
            return;
        }

        if (password !== repitePassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        if (!passwordRegex.test(password)) {
            setError(
                "La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un símbolo (@ $ ! % * ? & . _ -)."
            );
            return;
        }

        // Validaciones específicas según tipo
        if (
            tipoUsuario === "Profesional Interno" &&
            (!noVacio(rnpi) || !noVacio(institucion))
        ) {
            setError("Debes completar los campos del Profesional Interno (RNPI e institución).");
            return;
        }

        if (
            tipoUsuario === "Tutor" &&
            (!noVacio(parentesco) || !noVacio(idPaciente) || !noVacio(codigoCentro))
        ) {
            setError("Debes completar los campos del Tutor (parentesco, ID paciente y código del centro).");
            return;
        }

        if (tipoUsuario === "Profesional Externo" && !noVacio(numeroProfesional)) {
            setError("Debes ingresar tu número de profesional externo.");
            return;
        }

        setError("");

        // Crear el objeto del nuevo usuario
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
        };

        // Guardar en localStorage
        localStorage.setItem("usuarioRegistrado", JSON.stringify(nuevoUsuario));
        localStorage.setItem("usuarioActivo", JSON.stringify(nuevoUsuario));

        // Redirección según tipo de usuario
        if (tipoUsuario === "Profesional Interno") {
            navigate("/dashboard-prof");
        } else if (tipoUsuario === "Tutor") {
            navigate("/dashboard-tutor");
        } else if (tipoUsuario === "Profesional Externo") {
            navigate("/dashboard-prof-externo");
        } else {
            navigate("/login");
        }

        alert(`✅ Registro exitoso como ${tipoUsuario}`);
    };

    // ------------------------- INTERFAZ VISUAL -------------------------
    return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div
                className="card shadow p-4 rounded-4 formulario"
                style={{ maxWidth: 560, width: "100%" }}
            >
                <h3 className="text-center mb-4">REGÍSTRATE</h3>

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
                        <small
                            className="text-light"
                            style={{
                                fontSize: "0.78rem",
                                marginTop: "-12px",
                                display: "block",
                                lineHeight: "1.2",
                            }}
                        >
                            Mínimo 6 caracteres, una mayúscula, un número y un símbolo
                            (<strong>@ $ ! % * ? & . _ -</strong>)
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
                                    placeholder="Ingrese el RUT del paciente"
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
                                placeholder="Ejemplo: 908776"
                            />
                        </div>
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
