// ===============================
// 📦 Importaciones necesarias
// ===============================
import React, { useState } from "react";
import "../style/formulario.css"; // Importa los estilos compartidos

// ===============================
// 🧩 Componente de Registro
// ===============================
function FormularioRegistro({ onSubmit }) {
    // Estados para almacenar los datos ingresados por el usuario
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repitePassword, setRepitePassword] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState(""); // Por si luego agregas roles (profesional, tutor)
    const [error, setError] = useState("");

    // ===============================
    // ✉️ Función para validar el correo
    // ===============================
    const validarEmail = (email) => {
        return email.includes("@") && email.endsWith(".com");
    };

    // ===============================
    // ✅ Función para manejar el envío del formulario
    // ===============================
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validaciones básicas
        if (nombre.trim() === "") {
            setError("Debes ingresar tu nombre completo");
            return;
        }

        if (!validarEmail(email)) {
            setError("El correo debe contener '@' y terminar en '.com'");
            return;
        }

        if (password.trim() === "" || repitePassword.trim() === "") {
            setError("Debes ingresar y repetir la contraseña");
            return;
        }

        if (password !== repitePassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (tipoUsuario === "") {
            setError("Debes seleccionar tu tipo de usuario");
            return;
        }

        // Si todo está correcto, se limpia el error
        setError("");

        // Aquí puedes enviar los datos a una API o guardarlos temporalmente
        const datosRegistro = {
            nombre,
            email,
            password,
            tipoUsuario,
        };

        console.log("Usuario registrado:", datosRegistro);

        // Si el componente padre pasa una función onSubmit, la ejecuta
        if (onSubmit) onSubmit(datosRegistro);
    };

    // ===============================
    // 🎨 Estructura visual del formulario
    // ===============================
    return (
        <div className="formulario">
            <h3>Registro de Usuario</h3>

            <form onSubmit={handleSubmit}>
                {/* Nombre completo */}
                <input
                    type="text"
                    placeholder="Nombre completo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                {/* Correo electrónico */}
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Contraseña */}
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Repetir contraseña */}
                <input
                    type="password"
                    placeholder="Repite tu contraseña"
                    value={repitePassword}
                    onChange={(e) => setRepitePassword(e.target.value)}
                />

                {/* Tipo de usuario (por ejemplo Profesional o Tutor) */}
                <select
                    value={tipoUsuario}
                    onChange={(e) => setTipoUsuario(e.target.value)}
                >
                    <option value="">Selecciona tu tipo de usuario</option>
                    <option value="profesional">Profesional</option>
                    <option value="tutor">Tutor</option>
                </select>

                {/* Mensaje de error si corresponde */}
                {error && (
                    <p style={{ color: "#F08080", fontWeight: "bold", marginTop: "5px" }}>
                        {error}
                    </p>
                )}

                {/* Botón de registro */}
                <button type="submit">Registrarse</button>
            </form>

            {/* Enlace para volver al login */}
            <a href="#">¿Ya tienes cuenta? Inicia sesión</a>
        </div>
    );
}

// ===============================
// 🚀 Exportar el componente
// ===============================
export default FormularioRegistro;
