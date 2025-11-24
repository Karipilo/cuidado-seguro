// FichaPaciente.jsx — Ficha Clínica completa, modular y funcional

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/fichaClinica.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import PanelLateral from "../components/FichaClinica/PanelLateral";

function FichaPaciente() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState(null);

  // === Estados de formularios ===
  const [notaTexto, setNotaTexto] = useState("");

  const [signoPA, setSignoPA] = useState("");
  const [signoPulso, setSignoPulso] = useState("");
  const [signoTemp, setSignoTemp] = useState("");

  const [peso, setPeso] = useState("");
  const [talla, setTalla] = useState("");
  const [imc, setImc] = useState("");

  // =====================================================
  // Cargar paciente desde localStorage
  // =====================================================
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pacientes")) || [];
    const encontrado = data.find((p) => p.id === Number(id));

    if (!encontrado) {
      navigate("/dashboard-prof");
      return;
    }

    setPaciente(encontrado);
  }, [id, navigate]);

  // =====================================================
  //   Actualizar Información en localStorage
  // =====================================================
  const actualizarPaciente = (nuevosDatos) => {
    const pacientes = JSON.parse(localStorage.getItem("pacientes"));

    const actualizados = pacientes.map((p) =>
      p.id === paciente.id ? { ...p, ...nuevosDatos } : p
    );

    localStorage.setItem("pacientes", JSON.stringify(actualizados));

    setPaciente(actualizados.find((p) => p.id === paciente.id));
  };

  // =====================================================
  //   GUARDAR NOTA CLÍNICA
  // =====================================================
  const guardarNota = () => {
    if (!notaTexto.trim()) return;

    const nuevaNota = {
      fecha: new Date().toLocaleString(),
      contenido: notaTexto,
      autor: "Profesional Interno",
    };

    const notasActualizadas = [...(paciente.notas || []), nuevaNota];

    actualizarPaciente({ notas: notasActualizadas });

    setNotaTexto("");
  };

  // =====================================================
  //   GUARDAR SIGNOS VITALES
  // =====================================================
  const guardarSignos = () => {
    if (!signoPA && !signoPulso && !signoTemp) return;

    const nuevo = {
      fecha: new Date().toLocaleString(),
      pa: signoPA,
      pulso: signoPulso,
      temp: signoTemp,
    };

    const actualizados = [...(paciente.signosVitales || []), nuevo];

    actualizarPaciente({ signosVitales: actualizados });

    setSignoPA("");
    setSignoPulso("");
    setSignoTemp("");
  };

  // =====================================================
  //   GUARDAR MEDIDAS ANTROPOMÉTRICAS
  // =====================================================
  const guardarAntropometria = () => {
    if (!peso || !talla) return;

    const nuevo = {
      fecha: new Date().toLocaleString(),
      peso,
      talla,
      imc,
    };

    const actualizados = [...(paciente.antropometria || []), nuevo];

    actualizarPaciente({ antropometria: actualizados });

    setPeso("");
    setTalla("");
    setImc("");
  };

  if (!paciente) return <p>Cargando...</p>;

  return (
    <div className="container py-4 ficha-container">
      {/* PANEL IZQUIERDO */}
      <PanelLateral />

      {/* CONTENIDO PRINCIPAL */}
      <main className="contenido-ficha">
        <h4 className="mb-3">Ficha Clínica de {paciente.nombre}</h4>

        <img src={paciente.foto} alt={paciente.nombre} className="foto-ficha" />

        {/* ===============================================
             DATOS BÁSICOS DEL PACIENTE
           =============================================== */}
        <div className="card mb-3">
          <div className="card-header">
            <i className="bi bi-person-vcard me-2"></i>Datos Personales
          </div>
          <div className="card-body">
            <p>
              <strong>RUT:</strong> {paciente.rut}
            </p>
            <p>
              <strong>Edad:</strong> {paciente.edad}
            </p>
            <p>
              <strong>Diagnóstico:</strong> {paciente.diagnostico}
            </p>
            <p>
              <strong>Alergias:</strong> {paciente.alergias}
            </p>
            <p>
              <strong>Observaciones:</strong> {paciente.observaciones}
            </p>
          </div>
        </div>

        {/* ===============================================
             MEDICAMENTOS
           =============================================== */}
        <div className="card mb-3">
          <div className="card-header">
            <i className="bi bi-capsule-pill me-2"></i>Medicamentos Activos
          </div>

          <div className="card-body table-responsive">
            {paciente.medicamentos?.length > 0 ? (
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Fármaco</th>
                    <th>Dosis</th>
                    <th>Vía</th>
                    <th>Frecuencia</th>
                    <th>Indicación</th>
                    <th>Desde</th>
                    <th>Hasta</th>
                  </tr>
                </thead>
                <tbody>
                  {paciente.medicamentos.map((m, i) => (
                    <tr key={i}>
                      <td>{m.nombre}</td>
                      <td>{m.dosis}</td>
                      <td>{m.via}</td>
                      <td>{m.frecuencia}</td>
                      <td>{m.indicacion}</td>
                      <td>{m.desde}</td>
                      <td>{m.hasta || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted">No hay medicamentos registrados.</p>
            )}
          </div>
        </div>

        {/* ===============================================
             NOTAS CLÍNICAS
           =============================================== */}
        <div className="card mb-3">
          <div className="card-header">
            <i className="bi bi-journal-medical me-2"></i>Notas Clínicas
          </div>
          <div className="card-body">
            {paciente.notas?.length > 0 ? (
              <ul>
                {paciente.notas.map((n, i) => (
                  <li key={i}>
                    <strong>{n.fecha}</strong>
                    <br />
                    {n.contenido}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No hay notas registradas.</p>
            )}
          </div>
        </div>

        {/* ===============================================
             SIGNOS VITALES
           =============================================== */}
        <div className="card mb-3">
          <div className="card-header">
            <i className="bi bi-heart-pulse me-2"></i>Signos Vitales
          </div>
          <div className="card-body">
            {paciente.signosVitales?.length > 0 ? (
              <ul>
                {paciente.signosVitales.map((s, i) => (
                  <li key={i}>
                    <strong>{s.fecha}</strong>
                    <br /> PA: {s.pa}
                    <br /> Pulso: {s.pulso}
                    <br /> Temp: {s.temp}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No hay signos vitales registrados.</p>
            )}
          </div>
        </div>

        {/* ===============================================
             MEDIDAS ANTROPOMÉTRICAS
           =============================================== */}
        <div className="card mb-3">
          <div className="card-header">
            <i className="bi bi-rulers me-2"></i>Medidas Antropométricas
          </div>
          <div className="card-body">
            {paciente.antropometria?.length > 0 ? (
              <ul>
                {paciente.antropometria.map((a, i) => (
                  <li key={i}>
                    <strong>{a.fecha}</strong>
                    <br /> Peso: {a.peso} kg
                    <br /> Talla: {a.talla} cm
                    <br /> IMC: {a.imc}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">
                No hay datos antropométricos registrados.
              </p>
            )}
          </div>
        </div>
      </main>

      {/* =====================================================
              MODALES — Notas / Signos / Antropometría
          ===================================================== */}

      {/* === MODAL NOTAS CLÍNICAS === */}
      <div className="modal fade" id="modalNota" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agregar Nota Clínica</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <textarea
                className="form-control"
                rows="4"
                value={notaTexto}
                onChange={(e) => setNotaTexto(e.target.value)}
                placeholder="Describa evolución, hallazgos, conducta..."
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={guardarNota}
              >
                Guardar Nota
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* === MODAL SIGNOS === */}
      <div className="modal fade" id="modalSignos" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Registrar Signos Vitales</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <input
                className="form-control mb-2"
                placeholder="Presión Arterial"
                value={signoPA}
                onChange={(e) => setSignoPA(e.target.value)}
              />
              <input
                className="form-control mb-2"
                placeholder="Pulso"
                value={signoPulso}
                onChange={(e) => setSignoPulso(e.target.value)}
              />
              <input
                className="form-control mb-2"
                placeholder="Temperatura"
                value={signoTemp}
                onChange={(e) => setSignoTemp(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={guardarSignos}
              >
                Guardar Signos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* === MODAL ANTROPOMETRÍA === */}
      <div className="modal fade" id="modalAntropometria" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Registrar Medidas Antropométricas</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <input
                className="form-control mb-2"
                placeholder="Peso (kg)"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
              />
              <input
                className="form-control mb-2"
                placeholder="Talla (cm)"
                value={talla}
                onChange={(e) => setTalla(e.target.value)}
              />
              <input
                className="form-control mb-2"
                placeholder="IMC (opcional)"
                value={imc}
                onChange={(e) => setImc(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={guardarAntropometria}
              >
                Guardar Datos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FichaPaciente;
