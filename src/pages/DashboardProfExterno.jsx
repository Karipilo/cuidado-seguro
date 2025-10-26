/*
Componente: DashboardProfExterno.jsx
Descripción: Panel del Profesional Externo.
Lee los pacientes desde localStorage (cargados por App.jsx),
permite buscarlos y registrar información médica adicional.
*/ 

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardProfExterno() {
  const navigate = useNavigate();

  
  // Estados principales

  const [usuario, setUsuario] = useState(null);
  const [rutBusqueda, setRutBusqueda] = useState("");
  const [paciente, setPaciente] = useState(null);
  const [pacientes, setPacientes] = useState([]);
  const [accion, setAccion] = useState("");
  const [texto, setTexto] = useState("");

 
  // Efecto inicial: carga usuario y pacientes desde localStorage

  useEffect(() => {
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));

    // Si no hay usuario o no es Profesional Externo, redirige al login.
    if (!activo || activo.tipoUsuario !== "Profesional Externo") {
      navigate("/login");
      return;
    }

    setUsuario(activo);

    // Cargar pacientes desde localStorage
    const almacenados = JSON.parse(localStorage.getItem("pacientes"));

    if (almacenados && Array.isArray(almacenados)) {
      setPacientes(almacenados);
    } else {
      console.warn("No se encontraron pacientes en localStorage.");
      setPacientes([]);
    }
  }, [navigate]);

 
  // Función auxiliar: normaliza el RUT para comparación

  const normalizarRut = (rut) =>
    (rut || "").toString().replace(/\s+/g, "").toLowerCase();

  // Buscar paciente por RUT

  const handleBuscar = () => {
    const buscado = normalizarRut(rutBusqueda);
    const encontrado = pacientes.find((p) => normalizarRut(p.rut) === buscado);

    if (encontrado) {
      setPaciente(encontrado);
    } else {
      alert(
        "No se encontró un paciente con ese RUT. Recuerda usar puntos y guion (Ej: 5.654.234-0)."
      );
      setPaciente(null);
    }
  };

  
  // Registrar nueva información médica
  
  const handleRegistrar = () => {
    if (!texto.trim() || !accion) {
      alert("Por favor, selecciona una acción y escribe el contenido.");
      return;
    }

    const nuevaEntrada = {
      contenido: texto,
      fecha: new Date().toLocaleString(),
    };

    const actualizado = pacientes.map((p) => {
      if (p.rut === paciente.rut) {
        const copia = { ...p };
        if (accion === "nota") copia.notas.push(nuevaEntrada);
        if (accion === "receta") copia.recetas.push(nuevaEntrada);
        if (accion === "examen") copia.examenes.push(nuevaEntrada);
        if (accion === "certificado") copia.certificados.push(nuevaEntrada);
        return copia;
      }
      return p;
    });

    // Guardar cambios en localStorage
    localStorage.setItem("pacientes", JSON.stringify(actualizado));
    setPacientes(actualizado);

    const pacienteActualizado = actualizado.find((p) => p.rut === paciente.rut);
    setPaciente(pacienteActualizado);

    setTexto("");
    setAccion("");
    alert("Información registrada correctamente.");
  };

  
  // Render principal
  
  if (!usuario) return null;

  return (
    <div className="container py-4">
      <div className="row">
        {/* Columna principal (búsqueda y detalle del paciente) */}
        <div className="col-md-8">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold text-primary">Buscar paciente</h5>
              <div className="input-group mt-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese RUT con puntos y guion (Ej: 5.654.234-0)"
                  value={rutBusqueda}
                  onChange={(e) => setRutBusqueda(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleBuscar}>
                  Buscar
                </button>
              </div>
            </div>
          </div>

          {/* Bloque del paciente encontrado */}
          {paciente && (
            <>
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4 text-center">
                      <img
                        src={paciente.imagen}
                        alt={paciente.nombre}
                        className="img-fluid rounded-circle shadow"
                        style={{
                          width: "130px",
                          height: "130px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="col-md-8">
                      <h5 className="text-primary fw-bold">
                        {paciente.nombre}
                      </h5>
                      <p>
                        <strong>RUT:</strong> {paciente.rut}
                      </p>
                      <p>
                        <strong>Edad:</strong> {paciente.edad} años
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

                      <p>
                        <strong>Medicamentos:</strong>
                      </p>
                      <ul>
                        {(Array.isArray(paciente.medicamentos)
                          ? paciente.medicamentos
                          : []
                        ).map((med, idx) => (
                          <li key={idx}>{med}</li>
                        ))}
                      </ul>

                      <p>
                        <strong>Controles:</strong>
                      </p>
                      <ul>
                        {(Array.isArray(paciente.controles)
                          ? paciente.controles
                          : []
                        ).map((ctrl, idx) => (
                          <li key={idx}>{ctrl}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloque para registrar información nueva */}
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
                        <option value="">Selecciona una acción</option>
                        <option value="nota">Nota clínica</option>
                        <option value="receta">Receta</option>
                        <option value="examen">Examen</option>
                        <option value="certificado">Certificado</option>
                      </select>
                    </div>
                    <div className="col-md-8">
                      <textarea
                        className="form-control"
                        rows="2"
                        placeholder="Escribe el detalle..."
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="text-end mt-3">
                    <button
                      className="btn btn-success"
                      onClick={handleRegistrar}
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>

              {/* Sección de registros existentes */}
              <div className="row">
                {["notas", "recetas", "examenes", "certificados"].map(
                  (tipo) => {
                    const lista = Array.isArray(paciente[tipo])
                      ? paciente[tipo]
                      : [];
                    return (
                      <div key={tipo} className="col-md-6 mb-3">
                        <div className="card shadow-sm">
                          <div className="card-body">
                            <h6 className="fw-bold text-capitalize mb-2">
                              {tipo}
                            </h6>
                            {lista.length === 0 ? (
                              <p className="text-muted">Sin registros.</p>
                            ) : (
                              <ul className="list-group list-group-flush">
                                {lista.map((item, i) => (
                                  <li key={i} className="list-group-item small">
                                    <strong>{item.fecha}:</strong>{" "}
                                    {item.contenido}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </>
          )}
        </div>

        {/* Columna lateral: información del profesional */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold text-primary">
                Información del Profesional
              </h6>
              <p>
                <strong>Nombre:</strong> {usuario.nombre}
              </p>
              <p>
                <strong>Email:</strong> {usuario.email}
              </p>
              <p>
                <strong>Tipo:</strong> {usuario.tipoUsuario}
              </p>
              {usuario.rnpi && (
                <p>
                  <strong>RNPI:</strong> {usuario.rnpi}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardProfExterno;