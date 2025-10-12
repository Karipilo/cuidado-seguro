// Importa React y el hook useState para manejar los estados de los campos
import React, { useState } from "react";
import "../style/formulario.css";

function Formulario() {

    // Estados locales para guardar los datos ingresados por el usuario
    const [email, setEmail] = useState("");       // Guarda el correo electrónico
    const [password, setPassword] = useState(""); // Guarda la contraseña
    const [error, setError] = useState("");       // Guarda mensajes de error si los hay

    // Función para validar el correo
    const validarEmail = (email) => {
        // El correo debe contener "@" y terminar en ".com"
        return email.includes("@") && email.endsWith(".com");
    };

    // Función que maneja el envío del formulario

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario

        // Validación simple del correo y contraseña
        if (!validarEmail(email)) {
            setError("El correo debe contener '@' y terminar en '.com'");
            return;
        }

        if (password.trim() === "") {
            setError("La contraseña no puede estar vacía");
            return;
        }

        // Si pasa las validaciones, limpia el error
        setError("");

        // Aquí podrías manejar el inicio de sesión (por ejemplo, llamar a una API o redirigir)
        console.log("Inicio de sesión exitoso con:", email);
    };

    return (
        // 🔹 Esta clase "formulario" conecta con el CSS en formulario.css
        <div className="formulario">
            <h3>Iniciar Sesión</h3>

            {/* Formulario controlado */}
            <form onSubmit={handleSubmit}>
                {/* Campo de correo */}
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Campo de contraseña */}
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Si hay un error, lo muestra en pantalla */}
                {error && <p style={{ color: "#F08080", fontWeight: "bold" }}>{error}</p>}

                {/* Botón de envío */}
                <button type="submit">Ingresar</button>
            </form>

            {/* Enlace de recuperación de contraseña */}
            <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
    );
}


//Exporta el componente para que pueda usarse en otras partes del proyecto
export default Formulario;
