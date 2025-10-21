import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/formulario.css";

function Formulario() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{6,}$/;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validarEmail(email)) {
            setError("El correo debe contener '@' y terminar en '.com'");
            return;
        }

        if (!passwordRegex.test(password)) {
            setError("La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un símbolo");
            return;
        }

        setError("");

        // 🔹 Leer el usuario registrado
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

        // 🔍 Validar credenciales
        if (
            usuarioGuardado &&
            usuarioGuardado.email === email &&
            usuarioGuardado.password === password
        ) {
            // Guardar sesión activa
            localStorage.setItem("usuarioActivo", JSON.stringify(usuarioGuardado));

            alert(`Bienvenido(a), ${usuarioGuardado.nombre}`);

            // Redirige según tipo de usuario
            if (usuarioGuardado.tipoUsuario === "Profesional") {
                navigate("/dashboardprof");
            } else {
                navigate("/dashboardtutor");
            }
        } else {
            setError("Credenciales incorrectas o usuario no registrado");
        }
    };

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


