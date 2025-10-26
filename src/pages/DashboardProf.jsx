// ✅ DashboardProf.jsx — Perfil Profesional Interno con estilo personalizado
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/dashboardProf.css"; // ✅ Asegúrate de tener este archivo CSS creado

function DashboardProf() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [pacientes, setPacientes] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [nota, setNota] = useState("");
  const [control, setControl] = useState("");

  // ✅ Carga usuario y pacientes desde localStorage
  useEffect(() => {
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!activo || activo.tipoUsuario !== "Profesional Interno") {
      navigate("/login");
      return;
    }
    setUsuario(activo);

    const almacenados = JSON.parse(localStorage.getItem("pacientes"));
    if (almacenados?.length > 0) {
      setPacientes(almacenados);
      setPacienteSeleccionado(almacenados[0]);
    }
  }, [navigate]);

  const seleccionarPaciente = (paciente) => {
    setPacienteSeleccionado(paciente);
  };

  const agregarNota = () => {
    if (!nota.trim()) return;
    const nuevaNota = {
      contenido: nota,
      fecha: new Date().toLocaleString(),
      autor: usuario.nombre,
      tipo: "Profesional Interno",
    };

    const actualizados = pacientes.map((p) => {
      if (p.id === pacienteSeleccionado.id) {
        const actualizado = {
          ...p,
          notas: [...(p.notas || []), nuevaNota],
        };
        setPacienteSeleccionado(actualizado);
        return actualizado;
      }
      return p;
    });

    localStorage.setItem("pacientes", JSON.stringify(actualizados));
    setPacientes(actualizados);
    setNota("");
  };

  const agregarControl = () => {
    if (!control.trim()) return;
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

  if (!usuario) return null;

  return (
    <div className="container py-4 dashboard-prof">
      <h4 className="mb-4 text-center">👨‍⚕️ Bienvenido, {usuario.nombre}</h4>
      <div className="row">
        {/* Lista de pacientes */}
        <div className="col-md-4">
          <h5 className="text-cadetblue">Pacientes Asignados</h5>
          <ul className="list-group">
            {pacientes.map((p, i) => (
              <li
                key={i}
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

        {/* Detalle del paciente */}
        <div className="col-md-8">
          {pacienteSeleccionado && (
            <div className="card shadow-sm">
              <div className="card-body" style={{ backgroundColor: "#FFF8DC" }}>
                <h5 className="text-cadetblue">Resumen del Paciente</h5>
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

                {/* Agregar nota */}
                <div className="mt-3">
                  <h6 className="text-lightcoral">Agregar Nota Clínica</h6>
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

                {/* Agregar control */}
                <div className="mt-3">
                  <h6 className="text-lightcoral">Agregar Control Médico</h6>
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

                {/* Historial clínico */}
                <div className="mt-4">
                  <h6 className="text-lightcoral">Notas Clínicas</h6>
                  {pacienteSeleccionado.notas?.length > 0 ? (
                    <ul>
                      {pacienteSeleccionado.notas.map((n, i) => (
                        <li key={i}>
                          <strong>{n.fecha}</strong> — <em>{n.autor}</em>:<br />
                          {n.contenido}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">Sin notas aún.</p>
                  )}
                </div>

                {/* Controles médicos */}
                <div className="mt-4">
                  <h6 className="text-lightcoral">Controles Médicos</h6>
                  {pacienteSeleccionado.controles?.length > 0 ? (
                    <ul>
                      {pacienteSeleccionado.controles.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">Sin controles registrados.</p>
                  )}
                </div>

                {/* Mensajes del tutor */}
                <div className="mt-4">
                  <h6 className="text-lightcoral">Mensajes del Tutor</h6>
                  {pacienteSeleccionado.mensajes?.length > 0 ? (
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
                    <p className="text-muted">Sin mensajes.</p>
                  )}
                </div>

                {/* Notas del profesional externo */}
                <div className="mt-4">
                  <h6 className="text-lightcoral">
                    Notas del Profesional Externo
                  </h6>
                  {pacienteSeleccionado.notas?.filter(
                    (n) => n.tipo === "Profesional Externo"
                  ).length > 0 ? (
                    <ul>
                      {pacienteSeleccionado.notas
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
                    <p className="text-muted">Sin notas externas.</p>
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
