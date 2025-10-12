// Importa React y el hook useState para manejar los estados de los campos
import React, { useState } from "react";
import "../style/formulario.css";

function Formulario({ onLogin}) {

    // Estados locales para guardar los datos ingresados por el usuario
    const [email, setEmail] = useState("");       // Guarda el correo electrónico
    const [password, setPassword] = useState(""); // Guarda la contraseña
    const [error, setError] = useState("");       // Guarda mensajes de error si los hay

    // Función para validar el correo
    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // ejemplo: usuario@correo.com
        return regex.test(email)
    };

    // Función que maneja el envío del formulario

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario

        // Validación del correo: debe tener formato correcto
        if (!validarEmail(email)) {
        setError("El correo debe contener '@' y terminar en '.com'");
        return;
        }

        // Validación de contraseña: al menos 6 caracteres, una mayúscula, un número y un símbolo
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordRegex.test(password)) {
        setError("La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un símbolo");
        return;
        }

        // Si pasa las validaciones, limpia el error
        setError("");

        // LLamamos a la función que simula el login (pasada por props)
        const loginExitoso = onLogin(email, password);

        if (loginExitoso) {
            console.log("Inicio de sesión exitoso con:", email);
        } else {
            setError("Credenciales incorrectas");
        }    

    
    };

    return (
        // 🔹 Esta clase "formulario" conecta con el CSS en formulario.css
        <div className="formulario">
            <h3>Iniciar Sesión</h3>

            {/* Formulario controlado */}
            <form onSubmit={handleSubmit}>
                {/* Campo de correo */}
                <label htmlFor="email">Correo electrónico</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Campo de contraseña */}
                <label htmlFor="password">Contraseña</label>
                <input
                    id="password"
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
