// Componente: FormularioRegistro.jsx
// Descripción: Formulario de registro para usuarios del sistema "Cuidado Seguro"
// Estilos definidos en el archivo formulario.css

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/formulario.css";

function FormularioRegistro() {
    const navigate = useNavigate();

    // Estados principales
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repitePassword, setRepitePassword] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [terminos, setTerminos] = useState(false);

    // Campos para profesionales
    const [tipoProfesional, setTipoProfesional] = useState("");
    const [rnpi, setRnpi] = useState("");
    const [institucion, setInstitucion] = useState("");

    // Campos para tutor
    const [rutFamiliar, setRutFamiliar] = useState("");
    const [codigoCentro, setCodigoCentro] = useState("");

    // Validación del formulario
    const validarFormulario = () => {
        if (!nombre || !email || !password || !repitePassword || !tipoUsuario) {
            alert("Todos los campos son obligatorios.");
            return false;
        }
        if (password !== repitePassword) {
            alert("Las contraseñas no coinciden.");
            return false;
        }
        if (!terminos) {
            alert("Debes aceptar los Términos y Condiciones.");
            return false;
        }
        return true;
    };

    // Envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        const nuevoUsuario = {
            nombre,
            email,
            password,
            tipoUsuario,
            tipoProfesional,
            rnpi,
            institucion,
            idPaciente: rutFamiliar,
            codigoCentro
        };

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("usuarioActivo", JSON.stringify(nuevoUsuario));

        if (tipoUsuario === "Profesional Interno") {
            navigate("/dashboard-prof");
        } else if (tipoUsuario === "Tutor") {
            navigate("/dashboard-tutor");
        } else if (tipoUsuario === "Profesional Externo") {
            navigate("/dashboard-prof-externo");
        } else {
            navigate("/home");
        }
    };

    // Render del formulario
    return (
        <div className="container">
            <div className="row justify-content-center mt-3 mb-5">
                <div className="col-12 col-sm-10 col-md-8 col-lg-5">
                    <div className="formulario card shadow-lg p-4">
                        <h3 className="text-center mb-3">Registro de Usuario</h3>

                        <form onSubmit={handleSubmit}>
                            <label>Nombre completo</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Ej: Juan Pérez"
                                required
                            />

                            <label>Correo electrónico</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="usuario@correo.com"
                                required
                            />

                            <label>Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Mínimo 6 caracteres"
                                required
                            />

                            <label>Repite tu contraseña</label>
                            <input
                                type="password"
                                value={repitePassword}
                                onChange={(e) => setRepitePassword(e.target.value)}
                                placeholder="Repite la contraseña"
                                required
                            />

                            <label>Tipo de usuario</label>
                            <select
                                value={tipoUsuario}
                                onChange={(e) => setTipoUsuario(e.target.value)}
                                required
                            >
                                <option value="">Selecciona...</option>
                                <option value="Profesional Interno">Profesional Interno</option>
                                <option value="Tutor">Tutor / Familiar</option>
                                <option value="Profesional Externo">Profesional Externo</option>
                            </select>

                            {(tipoUsuario === "Profesional Interno" || tipoUsuario === "Profesional Externo") && (
                                <>
                                    <label>Tipo Profesional</label>
                                    <input
                                        type="text"
                                        value={tipoProfesional}
                                        onChange={(e) => setTipoProfesional(e.target.value)}
                                        placeholder="Ej: Enfermero, Kinesiólogo"
                                    />

                                    <label>RNPI</label>
                                    <input
                                        type="text"
                                        value={rnpi}
                                        onChange={(e) => setRnpi(e.target.value)}
                                        placeholder="Número de registro"
                                    />

                                    <label>Institución</label>
                                    <input
                                        type="text"
                                        value={institucion}
                                        onChange={(e) => setInstitucion(e.target.value)}
                                        placeholder="Centro o institución"
                                    />
                                </>
                            )}

                            {tipoUsuario === "Tutor" && (
                                <>
                                    <label>RUT del Familiar (Paciente en el Centro)</label>
                                    <input
                                        type="text"
                                        value={rutFamiliar}
                                        onChange={(e) => setRutFamiliar(e.target.value)}
                                        placeholder="Ej: 12345678-9"
                                        required
                                    />

                                    <label>Código del Centro</label>
                                    <input
                                        type="text"
                                        value={codigoCentro}
                                        onChange={(e) => setCodigoCentro(e.target.value)}
                                        placeholder="Ej: ELEAM001"
                                        required
                                    />
                                </>
                            )}

                            <div className="form-check text-center my-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="terminos"
                                    checked={terminos}
                                    onChange={() => setTerminos(!terminos)}
                                    style={{ width: "18px", height: "18px" }}
                                />
                                <label htmlFor="terminos" className="form-check-label ms-2">
                                    Acepto los <Link to="/terminos">Términos y Condiciones</Link>
                                </label>
                            </div>

                            <button type="submit">Registrarme</button>
                        </form>

                        <p className="text-center mt-3">
                            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormularioRegistro;
