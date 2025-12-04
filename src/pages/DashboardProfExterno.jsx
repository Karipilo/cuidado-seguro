// DashboardProfExterno.jsx — Versión optimizada y compatible con backend real

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPacientes } from "../services/pacienteService";

function DashboardProfExterno() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [rutBusqueda, setRutBusqueda] = useState("");
  const [paciente, setPaciente] = useState(null);
  const [pacientes, setPacientes] = useState([]);

  const [accion, setAccion] = useState("");
  const [texto, setTexto] = useState("");

  
  // Cargar usuario activo
  
  useEffect(() => {
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!activo || activo.tipoUsuario !== "Profesional Externo") {
      navigate("/login");
      return;
    }

    setUsuario(activo);
  }, [navigate]);

  
  //  Cargar pacientes desde backend
  
  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getPacientes();
        setPacientes(data);
      } catch (error) {
        console.error("Error cargando pacientes:", error);
      }
    };

    cargar();
  }, []);

  
  // Normalizar RUT (sin puntos ni guion, minúsculas)
  
  const normalizarRut = (rut) =>
    (rut || "").toString().replace(/\./g, "").replace(/-/g, "").toLowerCase();

  
  //  Buscar paciente por RUT
  
  const handleBuscar = () => {
    const buscado = normalizarRut(rutBusqueda);

    const encontrado = pacientes.find(
      (p) => normalizarRut(p.rut) === buscado
    );

    if (encontrado) {
      // Inicializamos listas opcionales para evitar errores
      setPaciente({
        ...encontrado,
        notasExterno: encontrado.notasExterno || [],
        examenes: encontrado.examenes || [],
        recetas: encontrado.recetas || [],
        certificados: encontrado.certificados || [],
      });
    } else {
      alert("No se encontró un paciente con ese RUT.");
      setPaciente(null);
    }
  };

  
  //  Registrar información del profesional externo
  
  const handleRegistrar = () => {
    if (!texto.trim() || !accion) {
      alert("Debes seleccionar una acción y escribir contenido.");
      return;
    }

    const nuevoRegistro = {
      contenido: texto,
      fecha: new Date().toLocaleString(),
    };

    const actualizado = { ...paciente };

    if (accion === "nota") actualizado.notasExterno.push(nuevoRegistro);
    if (accion === "examen") actualizado.examenes.push(nuevoRegistro);
    if (accion === "receta") actualizado.recetas.push(nuevoRegistro);
    if (accion === "certificado") actualizado.certificados.push(nuevoRegistro);

    setPaciente(actualizado);
    setTexto("");
    setAccion("");

    alert("Información agregada (modo local, no guardado en backend).");
  };

  if (!usuario) return null;

  return (
    <div className="container py-4">
      <div className="row">

        {/* ===========================================
            COLUMNA PRINCIPAL
        ============================================ */}
        <div className="col-md-8">

          {/* BUSCAR PACIENTE */}
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold text-primary">Buscar paciente</h5>

              <div className="input-group mt-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: 6.543.210-K"
                  value={rutBusqueda}
                  onChange={(e) => setRutBusqueda(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleBuscar}>
                  Buscar
                </button>
              </div>
            </div>
          </div>

          {/* PACIENTE ENCONTRADO */}
          {paciente && (
            <>
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h4 className="text-primary fw-bold">
                    {paciente.nombreCompleto || paciente.nombre_completo}
                  </h4>

                  <p><strong>RUT:</strong> {paciente.rut}</p>
                  <p><strong>Edad:</strong> {paciente.edad || "-"}</p>
                  <p><strong>Diagnóstico:</strong> {paciente.diagnostico}</p>
                  <p><strong>Alergias:</strong> {paciente.alergias}</p>
                  <p><strong>Observaciones:</strong> {paciente.observaciones}</p>
                  <p><strong>Centro:</strong> {paciente.centro}</p>
                  <p><strong>Ciudad:</strong> {paciente.ciudad}</p>
                </div>
              </div>

              {/* REGISTRAR INFORMACIÓN */}
              <div className="card mb-4 shadow-sm">
                <div className="card-body">

                  <h5 className="fw-bold mb-3">Registrar nueva información</h5>

                  <div className="row g-3">
                    <div className="col-md-4">
                      <select
                        className="form-select"
                        value={accion}
                        onChange={(e) => setAccion(e.target.value)}
                      >
                        <option value="">Seleccione acción</option>
                        <option value="nota">Nota clínica</option>
                        <option value="examen">Examen</option>
                        <option value="receta">Receta</option>
                        <option value="certificado">Certificado</option>
                      </select>
                    </div>

                    <div className="col-md-8">
                      <textarea
                        className="form-control"
                        rows="2"
                        placeholder="Escribe aquí..."
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  <div className="text-end mt-3">
                    <button className="btn btn-success" onClick={handleRegistrar}>
                      Guardar
                    </button>
                  </div>
                </div>
              </div>

              {/* MOSTRAR REGISTROS */}
              <div className="row">
                {[
                  ["notasExterno", "Notas Clínicas"],
                  ["examenes", "Exámenes"],
                  ["recetas", "Recetas"],
                  ["certificados", "Certificados"],
                ].map(([campo, titulo]) => (
                  <div key={campo} className="col-md-6 mb-3">
                    <div className="card shadow-sm">
                      <div className="card-body">
                        <h6 className="fw-bold mb-2">{titulo}</h6>

                        {paciente[campo].length === 0 ? (
                          <p className="text-muted">Sin registros.</p>
                        ) : (
                          <ul className="list-group list-group-flush">
                            {paciente[campo].map((item, idx) => (
                              <li key={idx} className="list-group-item small">
                                <strong>{item.fecha}:</strong> {item.contenido}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ===========================================
            COLUMNA DERECHA — DATOS DEL PROF EXTERNO
        ============================================ */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold text-primary">Información del Profesional</h6>

              <p><strong>Nombre:</strong> {usuario.nombre}</p>
              <p><strong>Email:</strong> {usuario.email}</p>
              <p><strong>Tipo Usuario:</strong> {usuario.tipoUsuario}</p>

              {usuario.rnpi && (
                <p><strong>RNPI:</strong> {usuario.rnpi}</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardProfExterno;
