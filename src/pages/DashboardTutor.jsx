// DashboardTutor.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardTutor() {
  const navigate = useNavigate();

  
  // Estados principales del componente
  
  const [usuario, setUsuario] = useState(null);
  const [pacientes, setPacientes] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [asunto, setAsunto] = useState("");
  const [cuerpo, setCuerpo] = useState("");

  
  // useEffect: Se ejecuta al cargar el componente
  
  useEffect(() => {
    // 1. Se obtiene el usuario activo desde localStorage.
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));

    // Si no hay usuario o no es tipo Tutor, se redirige al login.
    if (!activo || activo.tipoUsuario !== "Tutor") {
      navigate("/login");
      return;
    }

    // Guarda la información del usuario activo en el estado.
    setUsuario(activo);

    // 2. Se obtienen los pacientes guardados en localStorage.
    //    En App.jsx fueron almacenados con la clave "pacientes".
    const almacenados = JSON.parse(localStorage.getItem("pacientes"));

    // Si existen y son un arreglo válido, se guardan en el estado.
    if (almacenados && Array.isArray(almacenados)) {
      setPacientes(almacenados);
    } else {
      // Si no hay datos válidos, se deja el estado vacío.
      setPacientes([]);
    }

    /* 3. Si el usuario activo tiene asignado un paciente,
        se busca dentro del arreglo almacenado y se selecciona.
    */
    if (activo.idPaciente) {
      const paciente = almacenados?.find((p) => p.rut === activo.idPaciente);
      if (paciente) {
        setPacienteSeleccionado(paciente);
      }
    }
  }, [navigate]);

  
  // Función: Envía un mensaje al centro
  
  const handleEnviarMensaje = () => {
    // Verifica que ambos campos (asunto y cuerpo) tengan contenido.
    if (asunto.trim() && cuerpo.trim()) {
      const nuevoMensaje = {
        asunto,
        cuerpo,
        fecha: new Date().toLocaleString(),
      };

      // Agrega el nuevo mensaje a la lista existente.
      setMensajes([...mensajes, nuevoMensaje]);

      // Limpia los campos del formulario.
      setAsunto("");
      setCuerpo("");
    }
  };

  
  // Renderizado condicional
  
  /* Si no hay usuario o no se encontró paciente asignado,
     se muestra un mensaje simple en pantalla.
  */
  if (!usuario || !pacienteSeleccionado) {
    return (
      <div className="container py-4">
        <h4>No se encontraron pacientes con ese RUT.</h4>
      </div>
    );
  }

  
  // Render principal del Dashboard del Tutor
  
  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Columna lateral: Información del familiar y mensajes */}
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="text-primary fw-bold">Información del Familiar</h5>
              <p>
                <strong>Nombre:</strong> {usuario.nombre}
              </p>
              <p>
                <strong>Email:</strong> {usuario.email}
              </p>
            </div>
          </div>

          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="text-primary fw-bold">Enviar mensaje al centro</h5>
              <div className="mb-2">
                <label>Asunto</label>
                <input
                  type="text"
                  className="form-control"
                  value={asunto}
                  onChange={(e) => setAsunto(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label>Mensaje</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={cuerpo}
                  onChange={(e) => setCuerpo(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary w-100"
                onClick={handleEnviarMensaje}
              >
                Enviar
              </button>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="text-primary fw-bold">Mensajes enviados</h5>
              {mensajes.length === 0 ? (
                <p className="text-muted">No hay mensajes enviados aún.</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {mensajes.map((m, i) => (
                    <li key={i} className="list-group-item">
                      <strong>{m.fecha}</strong>
                      <br />
                      <strong>Asunto:</strong> {m.asunto}
                      <br />
                      {m.cuerpo}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Columna principal: Datos del paciente */}
        <div className="col-md-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-4 text-center">
                  <img
                    src={pacienteSeleccionado.imagen}
                    alt={pacienteSeleccionado.nombre}
                    className="rounded-circle shadow-sm"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <h4 className="text-primary">
                    {pacienteSeleccionado.nombre}
                  </h4>
                  <p>
                    <strong>RUT:</strong> {pacienteSeleccionado.rut}
                  </p>
                  <p>
                    <strong>Edad:</strong> {pacienteSeleccionado.edad} años
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
                </div>
              </div>

              <hr />

              <h6 className="fw-bold text-primary mt-3">Medicamentos</h6>
              <ul>
                {pacienteSeleccionado.medicamentos?.map((med, i) => (
                  <li key={i}>{med}</li>
                ))}
              </ul>

              <h6 className="fw-bold text-primary mt-3">Controles</h6>
              <ul>
                {pacienteSeleccionado.controles?.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>

              <h6 className="fw-bold text-primary mt-3">Notas Clínicas</h6>
              {pacienteSeleccionado.notas?.length > 0 ? (
                <ul>
                  {pacienteSeleccionado.notas.map((n, i) => (
                    <li key={i}>
                      <strong>{n.fecha}:</strong> {n.contenido}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">Sin notas clínicas registradas.</p>
              )}

              <h6 className="fw-bold text-primary mt-3">Recetas</h6>
              {pacienteSeleccionado.recetas?.length > 0 ? (
                <ul>
                  {pacienteSeleccionado.recetas.map((r, i) => (
                    <li key={i}>
                      <strong>{r.fecha}:</strong> {r.contenido}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">Sin recetas registradas.</p>
              )}

              <h6 className="fw-bold text-primary mt-3">Exámenes</h6>
              {pacienteSeleccionado.examenes?.length > 0 ? (
                <ul>
                  {pacienteSeleccionado.examenes.map((e, i) => (
                    <li key={i}>
                      <strong>{e.fecha}:</strong> {e.contenido}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">Sin exámenes registrados.</p>
              )}

              <h6 className="fw-bold text-primary mt-3">Certificados</h6>
              {pacienteSeleccionado.certificados?.length > 0 ? (
                <ul>
                  {pacienteSeleccionado.certificados.map((c, i) => (
                    <li key={i}>
                      <strong>{c.fecha}:</strong> {c.contenido}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">Sin certificados registrados.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardTutor;