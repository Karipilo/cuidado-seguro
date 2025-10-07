import React from "react";

function Footer() {
    const handleClick = () => {
        alert("Gracias por visitar Cuidado Seguro");
    };

    return (
        <footer className="footer-rect bg-dark text-light mt-5">
            <div className="container py-4">
                {/* ...tu contenido anterior... */}

                <hr className="my-4 opacity-25" />
                <div
                    className="text-center small"
                    onClick={handleClick} // ✅ agregado
                    role="button" // opcional, mejora accesibilidad
                >
                    © 2025 Cuidado Seguro - Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
