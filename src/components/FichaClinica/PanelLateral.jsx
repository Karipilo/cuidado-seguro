import React from "react";

function PanelLateral() {
  return (
    <aside className="panel-izquierdo">
      <button
        className="btn btn-guardar mb-2 w-100"
        data-bs-toggle="modal"
        data-bs-target="#modalNota"
      >
        <i className="bi bi-journal-plus me-2"></i>
        Agregar Nota Clínica
      </button>

      <button
        className="btn btn-guardar mb-2 w-100"
        data-bs-toggle="modal"
        data-bs-target="#modalAntropometria"
      >
        <i className="bi bi-rulers me-2"></i>
        Medidas Antropométricas
      </button>

      <button
        className="btn btn-guardar mb-2 w-100"
        data-bs-toggle="modal"
        data-bs-target="#modalSignos"
      >
        <i className="bi bi-heart-pulse me-2"></i>
        Signos Vitales
      </button>

      <button
        className="btn btn-secondary w-100 mt-3"
        onClick={() => window.history.back()}
      >
        Volver
      </button>
    </aside>
  );
}

export default PanelLateral;
