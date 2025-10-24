// ===============================================================
// Componente: DashboardProfExterno.jsx
// Descripción: Panel del Profesional Externo
// Muestra datos de pacientes, permite registrar información médica (notas, recetas, etc.)
// y presenta un panel lateral con información del profesional.
// ===============================================================

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardProfExterno() {
    const navigate = useNavigate();

    const pacientesBase = [
        {
            rut: "4.234.657-k",
            nombre: "Ana María Pérez Villouta",
            edad: 78,
            diagnostico: "Demencia senil",
            alergias: "Penicilina",
            medicamentos: ["Rivastigmina 3mg cada 12 hrs", "Quetiapina 25mg noche"],
            controles: ["Presión: 120/80 mmHg", "Peso: 64 kg"],
            observaciones: "Paciente estable, sin alteraciones en la conducta.",
            imagen: "/images/maria.png",
            notas: [],
            recetas: [],
            examenes: [],
            certificados: []
        },
        {
            rut: "5.654.234-0",
            nombre: "Juan José Soto Risopatrón",
            edad: 82,
            diagnostico: "Parkinson",
            alergias: "Ninguna",
            medicamentos: ["Levodopa 100mg cada 8 hrs", "Clonazepam 0.5mg noche"],
            controles: ["Presión: 130/85 mmHg", "Peso: 70 kg"],
            observaciones: "Leves temblores controlados con medicación.",
            imagen: "/images/luis.png",
            notas: [],
            recetas: [],
            examenes: [],
            certificados: []
        },
        {
            rut: "6.234.657-3",
            nombre: "Rousmarie Trinidad Mattus Hasse",
            edad: 78,
            diagnostico: "Fractura de cadera",
            alergias: "Penicilina",
            medicamentos: ["Tramadol 100mg al día", "Quetiapina 25mg noche"],
            controles: ["Presión: 120/80 mmHg", "Peso: 64 kg"],
            observaciones: "Paciente estable, cambios de posición realizados.",
            imagen: "/images/rosa.png",
            notas: [],
            recetas: [],
            examenes: [],
            certificados: []
        }
    ];

    const [usuario, setUsuario] = useState(null);
    const [rutBusqueda, setRutBusqueda] = useState("");
    const [paciente, setPaciente] = useState(null);
    const [pacientes, setPacientes] = useState([]);
    const [accion, setAccion] = useState("");
    const [texto, setTexto] = useState("");

    useEffect(() => {
        const activo = JSON.parse(localStorage.getItem("usuarioActivo"));
        if (!activo || activo.tipoUsuario !== "Profesional Externo") {
            navigate("/login");
            return;
        }
        setUsuario(activo);

        const almacenados = JSON.parse(localStorage.getItem("pacientesData"));
        if (almacenados && Array.isArray(almacenados)) {
            setPacientes(almacenados);
        } else {
            localStorage.setItem("pacientesData", JSON.stringify(pacientesBase));
            setPacientes(pacientesBase);
        }
    }, [navigate]);

    const handleBuscar = () => {
        const encontrado = pacientes.find(
            (p) => p.rut.toLowerCase() === rutBusqueda.toLowerCase()
        );
        if (encontrado) {
            setPaciente(encontrado);
        } else {
            alert("No se encontró un paciente con ese RUT. Recuerda usar puntos y guion (Ej: 5.654.234-0).");
            setPaciente(null);
        }
    };

    const handleRegistrar = () => {
        if (!texto.trim() || !accion) {
            alert("Por favor, selecciona una acción y escribe el contenido.");
            return;
        }

        const nuevaEntrada = {
            contenido: texto,
            fecha: new Date().toLocaleString()
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

        localStorage.setItem("pacientesData", JSON.stringify(actualizado));
        setPacientes(actualizado);
        const pacienteActualizado = actualizado.find((p) => p.rut === paciente.rut);
        setPaciente(pacienteActualizado);

        setTexto("");
        setAccion("");
        alert("Información registrada correctamente.");
    };

    if (!usuario) return null;

    return (
        <div className="container py-4">
            <div className="row">
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
                                                style={{ width: "130px", height: "130px", objectFit: "cover" }}
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <h5 className="text-primary fw-bold">{paciente.nombre}</h5>
                                            <p><strong>RUT:</strong> {paciente.rut}</p>
                                            <p><strong>Edad:</strong> {paciente.edad} años</p>
                                            <p><strong>Diagnóstico:</strong> {paciente.diagnostico}</p>
                                            <p><strong>Alergias:</strong> {paciente.alergias}</p>
                                            <p><strong>Observaciones:</strong> {paciente.observaciones}</p>
                                            <p><strong>Medicamentos:</strong></p>
                                            <ul>
                                                {paciente.medicamentos.map((med, idx) => (
                                                    <li key={idx}>{med}</li>
                                                ))}
                                            </ul>
                                            <p><strong>Controles:</strong></p>
                                            <ul>
                                                {paciente.controles.map((ctrl, idx) => (
                                                    <li key={idx}>{ctrl}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

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
                                        <button className="btn btn-success" onClick={handleRegistrar}>
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                {["notas", "recetas", "examenes", "certificados"].map((tipo) => (
                                    <div key={tipo} className="col-md-6 mb-3">
                                        <div className="card shadow-sm">
                                            <div className="card-body">
                                                <h6 className="fw-bold text-capitalize mb-2">{tipo}</h6>
                                                {paciente[tipo].length === 0 ? (
                                                    <p className="text-muted">Sin registros.</p>
                                                ) : (
                                                    <ul className="list-group list-group-flush">
                                                        {paciente[tipo].map((item, i) => (
                                                            <li key={i} className="list-group-item small">
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

                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h6 className="fw-bold text-primary">Información del Profesional</h6>
                            <p><strong>Nombre:</strong> {usuario.nombre}</p>
                            <p><strong>Email:</strong> {usuario.email}</p>
                            <p><strong>Tipo:</strong> {usuario.tipoUsuario}</p>
                            {usuario.rnpi && <p><strong>RNPI:</strong> {usuario.rnpi}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardProfExterno;
