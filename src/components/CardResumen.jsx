// Descripción: Tarjeta reutilizable para mostrar datos en el resumen
// (Pacientes, Alertas, Notificaciones, etc.)

import React from "react";

// - titulo → texto superior de la tarjeta (Ej: "Pacientes")
// - valor → número o contenido dinámico que se muestra destacado

function CardResumen({ titulo, valor }) {
  return (
    // Contenedor principal con clases de Bootstrap
    // "h-100" hace que todas las tarjetas tengan la misma altura
    <div className="card text-center shadow-sm h-100 border-0 resumen-card">
      <div className="card-body d-flex flex-column justify-content-center">
        {/* Título de la tarjeta */}
        <h5 className="card-title text-secondary fw-semibold">{titulo}</h5>

        {/* Valor dinámico (número, texto o ícono) */}
        <p className="card-text fs-2 fw-bold mt-2">{valor}</p>
      </div>
    </div>
  );
}

export default CardResumen;
