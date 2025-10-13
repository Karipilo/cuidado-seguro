// Importa React y los hooks necesarios
import React, { useState } from "react";
import "../style/formulario.css"; // Importa el estilo
import { useNavigate, Link } from "react-router-dom";

function Formulario() {
    const navigate = useNavigate();

    // Estados locales
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Validación de correo
    const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Expresión regular para contraseñas seguras
    const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{6,}$/;

    // Manejo del inicio de sesión
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validaciones
        if (!validarEmail(email)) {
            setError("El correo debe contener '@' y terminar en '.com'");
            return;
        }

        if (!passwordRegex.test(password)) {
            setError(
                "La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un símbolo"
            );
            return;
        }

        // Limpia errores previos
        setError("");

        // 🔹 Recupera los datos guardados del registro
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

        // Verifica credenciales
        if (
            usuarioGuardado &&
            usuarioGuardado.email === email &&
            usuarioGuardado.password === password
        ) {
            alert(`✅ Bienvenido, ${usuarioGuardado.nombre}`);
            console.log("Inicio de sesión correcto:", usuarioGuardado);

            // Puedes redirigir según el tipo de usuario
            if (usuarioGuardado.tipoUsuario === "Profesional") {
                navigate("/dashboardprf");
            } else {
                navigate("/paciente");
            }
        } else {
            setError("❌ Credenciales incorrectas o usuario no registrado");
        }
    };

    // Render del formulario
    return (
        <div className="formulario">
            <h3>Iniciar Sesión</h3>

            {error && <p style={{ color: "#F08080", fontWeight: "bold" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <label>Correo electrónico</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                />

                <label>Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                />

                <button type="submit">Ingresar</button>
            </form>

            <p style={{ textAlign: "center", marginTop: "1rem" }}>
                ¿No tienes cuenta?{" "}
                <Link to="/registro" style={{ color: "#FFF8DC", fontWeight: "bold" }}>
                    Regístrate aquí
                </Link>
            </p>
        </div>
    );
}

export default Formulario;

