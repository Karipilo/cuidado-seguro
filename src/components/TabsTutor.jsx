// src/components/TabsTutor.jsx
import React from "react";

function TabsTutor({ tab, setTab }) {
  return (
    <ul className="nav nav-tabs mb-3">
      <li className="nav-item">
        <button
          className={`nav-link${tab === "detalle" ? " active" : ""}`}
          onClick={() => setTab("detalle")}
        >
          📄 Paciente (detalle)
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link${tab === "mensajes" ? " active" : ""}`}
          onClick={() => setTab("mensajes")}
        >
          💬 Mensajes
        </button>
      </li>
    </ul>
  );
}

export default TabsTutor;