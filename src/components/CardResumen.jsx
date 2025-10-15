import React from "react";

/**
 * CardResumen
 * Muestra una tarjeta Bootstrap con un título y un valor numérico o texto.
 * Se usa en los dashboards para mostrar datos resumidos (pacientes, alertas, etc.)
 * 
 * Props (propiedades que recibe desde el componente padre):
 * titulo → texto principal de la tarjeta (ej: "Pacientes")
 * valor → número o texto a mostrar (ej: 12)
 * extraClass → clases CSS adicionales (opcional, para colores o estilos)
 */
function CardResumen({ titulo, valor, extraClass = "" }) {
    return (
        // Estructura del diseño de la tarjeta (columna Bootstrap)
        <div className="col-md-3 mb-3">
            {/* Tarjeta centrada con sombra */}
            <div className={`card text-center shadow-sm ${extraClass}`}>
                <div className="card-body">
                    {/* Título de la tarjeta */}
                    <h5 className="card-title">{titulo}</h5>

                    {/* Valor principal en grande */}
                    <p className="card-text fs-3 fw-bold">{valor}</p>
                </div>
            </div>
        </div>
    );
}
export default CardResumen;
