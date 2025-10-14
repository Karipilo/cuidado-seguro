// Importamos React y herramientas de React Router
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Formulario from "../components/Formulario";

function Login() {
    // useNavigate nos permite redirigir a otras rutas dentro de la app
    const navigate = useNavigate();

    // Esta función se ejecuta cuando el formulario se envía correctamente
    const handleLogin = (email, password) => {
        // Si los datos coinciden con un usuario "profesional"
        if (email === "" && password === "") {
            localStorage.setItem("rol", "profesional");     // Guarda el rol en localStorage
            navigate("/dashboard-prof");                    // Redirige al dashboard del profesional
            return true;                                    // Devuelve true para que Formulario sepa que fue exitoso
        }

        // Si los datos coinciden con un usuario "tutor"
        if (email === "" && password === "") {
            localStorage.setItem("rol", "tutor");
            navigate("/dashboard-tutor");
            return true;
        }

        // Si los datos no son válidos, se devuelve false (y se mostrará error en el formulario)
        return false;
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    {/* Usamos el componente Formulario y le pasamos la función handleLogin como prop */}
                    <Formulario onLogin={handleLogin} />


                </div>
            </div>
        </div>
    );
}

export default Login;
