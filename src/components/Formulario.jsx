// Importamos React y el hook useState para manejar estados internos del componente
import React, { useState } from "react";

// Componente funcional que recibe como prop la función onLogin (viene de Login.jsx)
const Formulario = ({ onLogin }) => {
    // useState permite guardar el contenido que escribe el usuario
    const [email, setEmail] = useState("");         // Guarda el correo ingresado
    const [password, setPassword] = useState("");   // Guarda la contraseña ingresada
    const [error, setError] = useState("");         // Guarda un mensaje de error si ocurre

    // Función para validar el correo electrónico según tus requisitos:
    // debe tener "@"
    // debe terminar en ".com"
    const validarEmail = (email) => {
        return email.includes("@") && email.endsWith(".com");
    };


    // Función para validar la contraseña con estas reglas:
    // - mínimo 6 caracteres
    // - al menos una mayúscula
    // - al menos una minúscula
    // - al menos un número
    // - al menos un carácter especial (@, $, %, etc.)
    const validarPassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
        return regex.test(password);
    };

    // Esta función se ejecuta cuando el usuario envía el formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que el formulario recargue la página

        // Validamos el correo. Si no cumple con las reglas, mostramos error y detenemos todo
        if (!validarEmail(email)) {
            setError("El correo debe tener una mayúscula, mínimo 8 caracteres, un carácter especial, @ y terminar en .com");
            return;
        }

        // Validamos la contraseña. Si no cumple, mostramos mensaje y detenemos el envío
        if (!validarEmail(email)) {
            setError("El correo debe contener @ y terminar en .com");
            return;
        }


        // Si ambas validaciones son correctas, llamamos a la función onLogin
        const success = onLogin(email, password);

        // Si onLogin devuelve false (es decir, credenciales incorrectas), mostramos error
        if (!success) {
            setError("Correo o contraseña incorrectos");
        }
    };

    // Esta es la parte visual del formulario: campos de texto, botón, etc.
    return (
        <div className="card shadow p-4 rounded-4">
            {/* Título del formulario */}
            <h3 className="text-center mb-4 text-primary fw-bold">Iniciar Sesión</h3>

            {/* Si hay un mensaje de error, lo mostramos en rojo usando clases de Bootstrap */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Formulario principal */}
            <form onSubmit={handleSubmit}>
                {/* Campo de correo electrónico */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input
                        type="email"                    // Tipo email para validación básica del navegador
                        id="email"                      // ID para vincular con el label
                        className="form-control"        // Clase Bootstrap para estilo
                        placeholder="ejemplo@correo.com"// Texto de ejemplo
                        value={email}                   // Valor actual del estado email
                        onChange={(e) => setEmail(e.target.value)} // Actualiza el estado cuando se escribe
                        required                        // Campo obligatorio
                    />
                </div>

                {/* Campo de contraseña */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"                 // Oculta lo que se escribe
                        id="password"
                        className="form-control"
                        placeholder="********"
                        value={password}                // Valor actual del estado password
                        onChange={(e) => setPassword(e.target.value)} // Actualiza estado cuando se escribe
                        required
                    />
                </div>

                {/* Botón de envío del formulario */}
                <button type="submit" className="btn btn-primary w-100 mt-2">
                    Ingresar
                </button>
            </form>
        </div>
    );
};

// Exportamos el componente para que pueda ser usado en otras partes como Login.jsx
export default Formulario;
