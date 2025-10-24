import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardTutor() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  useEffect(() => {
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!activo || activo.tipoUsuario !== "Tutor") {
      navigate("/login");
      return;
    }

    setUsuario(activo);

    const almacenados = JSON.parse(localStorage.getItem("pacientesData"));
    if (!almacenados || !Array.isArray(almacenados)) return;

    const paciente = almacenados.find(p => p.rut === activo.idPaciente);
    if (paciente) {
      setPacienteSeleccionado(paciente);
    }
  }, [navigate]);

  if (!usuario || !pacienteSeleccionado) {
    return (
      <div className="container py-4">
        <h5 className="text-danger text-center">No se encontraron pacientes con ese RUT.</h5>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h2 className="fw-semibold text-primary">Panel del Tutor / Familiar</h2>
        <p className="text-muted mb-0">
          Bienvenido, {usuario.nombre}. Aquí puedes consultar la información del paciente asignado.
        </p>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-3 text-center">
              <img
                src={pacienteSeleccionado.imagen}
                alt={pacienteSeleccionado.nombre}
                className="rounded-circle shadow-sm"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-9">
              <h4 className="text-primary">{pacienteSeleccionado.nombre}</h4>
              <p><strong>RUT:</strong> {pacienteSeleccionado.rut}</p>
              <p><strong>Edad:</strong> {pacienteSeleccionado.edad} años</p>
              <p><strong>Diagnóstico:</strong> {pacienteSeleccionado.diagnostico}</p>
              <p><strong>Alergias:</strong> {pacienteSeleccionado.alergias}</p>
              <p><strong>Observaciones:</strong> {pacienteSeleccionado.observaciones}</p>

              {pacienteSeleccionado.medicamentos?.length > 0 && (
                <>
                  <h6 className="fw-bold text-primary mt-3">Medicamentos</h6>
                  <ul>
                    {pacienteSeleccionado.medicamentos.map((med, i) => (
                      <li key={i}>{med}</li>
                    ))}
                  </ul>
                </>
              )}

              {pacienteSeleccionado.controles?.length > 0 && (
                <>
                  <h6 className="fw-bold text-primary mt-3">Controles</h6>
                  <ul>
                    {pacienteSeleccionado.controles.map((ctrl, i) => (
                      <li key={i}>{ctrl}</li>
                    ))}
                  </ul>
                </>
              )}

              <hr />

              <h6 className="fw-bold text-primary mt-3">Notas Clínicas</h6>
              {pacienteSeleccionado.notas?.length > 0 ? (
                <ul>
                  {pacienteSeleccionado.notas.map((n, i) => (
                    <li key={i}><strong>{n.fecha}:</strong> {n.contenido}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">Sin notas clínicas registradas.</p>
              )}

              <h6 className="fw-bold text-primary mt-3">Recetas</h6>
              {pacienteSeleccionado.recetas?.length > 0 ? (
                <ul>
                  {pacienteSeleccionado.recetas.map((r, i) => (
                    <li key={i}><strong>{r.fecha}:</strong> {r.contenido}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">Sin recetas registradas.</p>
              )}

              <h6 className="fw-bold text-primary mt-3">Exámenes</h6>
              {pacienteSeleccionado.examenes?.length > 0 ? (
                <ul>
                  {pacienteSeleccionado.examenes.map((e, i) => (
                    <li key={i}><strong>{e.fecha}:</strong> {e.contenido}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">Sin exámenes registrados.</p>
              )}

              <h6 className="fw-bold text-primary mt-3">Certificados</h6>
              {pacienteSeleccionado.certificados?.length > 0 ? (
                <ul>
                  {pacienteSeleccionado.certificados.map((c, i) => (
                    <li key={i}><strong>{c.fecha}:</strong> {c.contenido}</li>
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
