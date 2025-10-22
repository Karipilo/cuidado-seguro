// src/components/TabsTutor.jsx
import React from "react";

function TabsTutor({ tab, setTab }) { // Componente funcional TabsTutor que recibe la pestaña activa y la función para cambiarla.
  return ( // Renderiza las pestañas de navegación.
    <ul className="nav nav-tabs mb-3"> 
      <li className="nav-item">
        <button
          className={`nav-link${tab === "detalle" ? " active" : ""}`} // Aplica la clase "active" si la pestaña es "detalle".
          onClick={() => setTab("detalle")} // Cambia la pestaña activa a "detalle" al hacer clic.
        >
           Paciente (detalle)
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link${tab === "mensajes" ? " active" : ""}`}
          onClick={() => setTab("mensajes")}
        >
           Mensajes
        </button>
      </li>
    </ul>
  );
}

export default TabsTutor;