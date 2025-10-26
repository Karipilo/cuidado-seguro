// ===============================================================
// 🧩 Componente: FormularioPaciente.jsx
// Descripción: Formulario con validación básica y soporte para testing
// ===============================================================

import React, { useState } from "react";

function FormularioPaciente({ onSubmit }) {
  // ------------------ Estados ------------------
  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [edad, setEdad] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [error, setError] = useState("");

  // ------------------ Manejo del envío ------------------
  function handleSubmit(e) {
    e.preventDefault();

    if (!nombre || !rut || !edad || !diagnostico) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setError("");
    const datos = { nombre, rut, edad, diagnostico };

    // Si se pasó una función externa (mock en test), la llama
    if (onSubmit) onSubmit(datos);

    console.log("Formulario enviado:", datos);
  }

  // ------------------ Render ------------------
  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <h3>Formulario Paciente</h3>

      {error && <p className="text-danger">{error}</p>}

      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input
          type="text"
          id="nombre"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="rut" className="form-label">RUT</label>
        <input
          type="text"
          id="rut"
          className="form-control"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="edad" className="form-label">Edad</label>
        <input
          type="number"
          id="edad"
          className="form-control"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="diagnostico" className="form-label">Diagnóstico</label>
        <input
          type="text"
          id="diagnostico"
          className="form-control"
          value={diagnostico}
          onChange={(e) => setDiagnostico(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">Registrar</button>
    </form>
  );
}

export default FormularioPaciente;