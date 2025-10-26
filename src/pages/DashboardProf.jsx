// ✅ DashboardProf.jsx (Profesional Interno)
// Corrige error de propiedades undefined y asegura compatibilidad con "pacientes" del localStorage.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardProf() {
  const navigate = useNavigate();

  // Estados principales
  const [usuario, setUsuario] = useState(null);
  const [pacientes, setPacientes] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [nota, setNota] = useState("");
  const [control, setControl] = useState("");

  // -----------------------------------------------------
  // ✅ useEffect: valida usuario y carga pacientes
  // -----------------------------------------------------
  useEffect(() => {
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!activo || activo.tipoUsuario !== "Profesional Interno") {
      navigate("/login");
      return;
    }
    setUsuario(activo);

    // ✅ Cargar pacientes desde la clave "pacientes"
    const almacenados = JSON.parse(localStorage.getItem("pacientes"));

    if (almacenados && Array.isArray(almacenados) && almacenados.length > 0) {
      // Inicializa campos que pudieran faltar (notas, controles, mensajes)
      const corregidos = almacenados.map((p) => ({
        ...p,
        notas: p.notas || [],
        controles: p.controles || [],
        mensajes: p.mensajes || [],
      }));
      setPacientes(corregidos);
      setPacienteSeleccionado(corregidos[0]);
    } else {
      setPacientes([]);
    }
  }, [navigate]);

  // -----------------------------------------------------
  // ✅ Cambia paciente seleccionado
  // -----------------------------------------------------
  const seleccionarPaciente = (paciente) => {
    setPacienteSeleccionado({
      ...paciente,
      notas: paciente.notas || [],
      controles: paciente.controles || [],
      mensajes: paciente.mensajes || [],
    });
  };

  // -----------------------------------------------------
  // ✅ Agregar nota clínica
  // -----------------------------------------------------
  const agregarNota = () => {
    if (!nota.trim() || !pacienteSeleccionado) return;

    const nuevaNota = {
      contenido: nota,
      fecha: new Date().toLocaleString(),
      autor: usuario.nombre,
      tipo: "Profesional Interno",
    };

    const actualizados = pacientes.map((p) => {
      if (p.id === pacienteSeleccionado.id) {
        const actualizado = { ...p, notas: [...(p.notas || []), nuevaNota] };
        setPacienteSeleccionado(actualizado);
        return actualizado;
      }
      return p;
    });

    localStorage.setItem("pacientes", JSON.stringify(actualizados));
    setPacientes(actualizados);
    setNota("");
  };

  // -----------------------------------------------------
  // ✅ Agregar control médico
  // -----------------------------------------------------
  const agregarControl = () => {
    if (!control.trim() || !pacienteSeleccionado) return;

    const actualizados = pacientes.map((p) => {
      if (p.id === pacienteSeleccionado.id) {
        const actualizado = {
          ...p,
          controles: [...(p.controles || []), control],
        };
        setPacienteSeleccionado(actualizado);
        return actualizado;
      }
      return p;
    });

    localStorage.setItem("pacientes", JSON.stringify(actualizados));
    setPacientes(actualizados);
    setControl("");
  };

  // -----------------------------------------------------
  // ✅ Renderizado seguro
  // -----------------------------------------------------
  if (!usuario) return null;

  return (
    <div className="container py-4">
      <h4 className="mb-4">Bienvenido, {usuario.nombre}</h4>

      <div className="row">
        {/* 🔹 Lista lateral de pacientes */}
        <div className="col-md-4">
          <h5 className="fw-bold text-primary">Pacientes asignados</h5>
          <ul className="list-group">
            {pacientes.map((p) => (
              <li
                key={p.id}
                className={`list-group-item list-group-item-action ${
                  pacienteSeleccionado?.id === p.id ? "active" : ""
                }`}
                onClick={() => seleccionarPaciente(p)}
                style={{ cursor: "pointer" }}
              >
                {p.nombre}
              </li>
            ))}
          </ul>
        </div>

        {/* 🔹 Panel derecho: Detalle del paciente */}
        <div className="col-md-8">
          {pacienteSeleccionado && (
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="text-primary">Resumen del paciente</h5>

                {/* ✅ Datos básicos */}
                <p>
                  <strong>Nombre:</strong> {pacienteSeleccionado.nombre}
                </p>
                <p>
                  <strong>RUT:</strong> {pacienteSeleccionado.rut}
                </p>
                <p>
                  <strong>Edad:</strong> {pacienteSeleccionado.edad}
                </p>
                <p>
                  <strong>Diagnóstico:</strong>{" "}
                  {pacienteSeleccionado.diagnostico}
                </p>
                <p>
                  <strong>Alergias:</strong> {pacienteSeleccionado.alergias}
                </p>
                <p>
                  <strong>Observaciones:</strong>{" "}
                  {pacienteSeleccionado.observaciones}
                </p>

                {/* ✅ Formulario: agregar nota clínica */}
                <div className="mt-4">
                  <h6>Agregar nota clínica (evolución médica)</h6>
                  <textarea
                    className="form-control"
                    rows="2"
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                    placeholder="Escribe la evolución médica..."
                  />
                  <button
                    className="btn btn-success mt-2"
                    onClick={agregarNota}
                  >
                    Guardar nota
                  </button>
                </div>

                {/* ✅ Formulario: agregar control médico */}
                <div className="mt-4">
                  <h6>Agregar nuevo control</h6>
                  <input
                    type="text"
                    className="form-control"
                    value={control}
                    onChange={(e) => setControl(e.target.value)}
                    placeholder="Ej: Presión 120/80, Peso 68kg"
                  />
                  <button
                    className="btn btn-primary mt-2"
                    onClick={agregarControl}
                  >
                    Guardar control
                  </button>
                </div>

                {/* ✅ Historial: notas clínicas */}
                <div className="mt-4">
                  <h6>Notas clínicas registradas</h6>
                  {(pacienteSeleccionado.notas || []).length === 0 ? (
                    <p className="text-muted">Sin notas aún.</p>
                  ) : (
                    <ul>
                      {(pacienteSeleccionado.notas || []).map((n, i) => (
                        <li key={i}>
                          <strong>{n.fecha}</strong> — <em>{n.autor}</em>:<br />
                          {n.contenido}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* ✅ Historial: controles médicos */}
                <div className="mt-4">
                  <h6>Controles médicos</h6>
                  <ul>
                    {(pacienteSeleccionado.controles || []).map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* ✅ Mensajes del tutor */}
                <div className="mt-4">
                  <h6>Mensajes del tutor</h6>
                  {(pacienteSeleccionado.mensajes || []).length > 0 ? (
                    <ul>
                      {pacienteSeleccionado.mensajes.map((m, i) => (
                        <li key={i}>
                          <strong>{m.fecha}</strong> — <em>{m.asunto}</em>:
                          <br />
                          {m.cuerpo}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">Sin mensajes disponibles.</p>
                  )}
                </div>

                {/* ✅ Notas del Profesional Externo */}
                <div className="mt-4">
                  <h6>Notas del Profesional Externo</h6>
                  {(pacienteSeleccionado.notas || []).filter(
                    (n) => n.tipo === "Profesional Externo"
                  ).length > 0 ? (
                    <ul>
                      {(pacienteSeleccionado.notas || [])
                        .filter((n) => n.tipo === "Profesional Externo")
                        .map((n, i) => (
                          <li key={i}>
                            <strong>{n.fecha}</strong> — <em>{n.autor}</em>:
                            <br />
                            {n.contenido}
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className="text-muted">
                      Sin notas del profesional externo.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardProf;
