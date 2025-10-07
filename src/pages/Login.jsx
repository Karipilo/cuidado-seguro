import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulación: validación local simple
        if (email === "profesional@cuidado.cl" && password === "1234") {
            localStorage.setItem("rol", "profesional");
            navigate("/dashboard-prof");
        } else if (email === "tutor@cuidado.cl" && password === "1234") {
            localStorage.setItem("rol", "tutor");
            navigate("/dashboard-tutor");
        } else {
            setError("Correo o contraseña incorrectos");
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow p-4 rounded-4">
                        <h3 className="text-center mb-4 text-primary fw-bold">
                            Iniciar Sesión
                        </h3>

                        {error && <div className="alert alert-danger">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="ejemplo@correo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100 mt-2">
                                Ingresar
                            </button>
                        </form>

                        <p className="text-center mt-3">
                            ¿No tienes cuenta?{" "}
                            <Link to="/registro" className="text-decoration-none">
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
