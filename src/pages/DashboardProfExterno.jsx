// ===============================================================
// 🧩 Componente: DashboardProfExterno.jsx
// Descripción: Panel del Profesional Externo.
// Permite registrar información (notas, recetas, exámenes,
// certificados) que se sincroniza en localStorage con todos
// los demás perfiles.
// ===============================================================

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardProfExterno() {
    const navigate = useNavigate();

    // ---------------------------------------------
    // 🔹 Datos iniciales (solo si no hay en localStorage)
    // ---------------------------------------------
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
            certificados: [],
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
            certificados: [],
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
            certificados: [],
        },
    ];

    // ---------------------------------------------
    // 🔹 Estados principales
    // ---------------------------------------------
    const [usuario, setUsuario] = useState(null);
    const [rutBusqueda, setRutBusqueda] = useState("");
    const [paciente, setPaciente] = useState(null);
    const [pacientes, setPacientes] = useState([]);
    const [accion, setAccion] = useState("");
    const [texto, setTexto] = useState("");

    // ---------------------------------------------
    // 🔹 Inicialización
    // ---------------------------------------------
    useEffect(() => {
        const activo = JSON.parse(localStorage.getItem("usuarioActivo"));
        if (!activo || activo.tipoUsuario !== "Profesional Externo") {
            navigate("/login");
            return;
        }
        setUsuario(activo);

        // Cargar pacientes globales (si no existen, inicializar)
        const almacenados = JSON.parse(localStorage.getItem("pacientesData"));
        if (almacenados && Array.isArray(almacenados)) {
            setPacientes(almacenados);
        } else {
            localStorage.setItem("pacientesData", JSON.stringify(pacientesBase));
            setPacientes(pacientesBase);
        }
    }, [navigate]);

    // ---------------------------------------------
    // 🔹 Buscar paciente por RUT
    // ---------------------------------------------
    const handleBuscar = () => {
        const encontrado = pacientes.find(
            (p) => p.rut.toLowerCase() === rutBusqueda.toLowerCase()
        );
        if (encontrado) {
            setPaciente(encontrado);
        } else {
            alert("❌ No se encontró un paciente con ese RUT.");
            setPaciente(null);
        }
    };

    // ---------------------------------------------
    // 🔹 Registrar acción y guardar en localStorage
    // ---------------------------------------------
    const handleRegistrar = () => {
        if (!texto.trim() || !accion) {
            alert("Por favor, selecciona una acción y escribe el contenido.");
            return;
        }

        const nuevaEntrada = {
            contenido: texto,
            fecha: new Date().toLocaleString(),
        };

        // Actualizar paciente seleccionado
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

        // Guardar actualización global
        localStorage.setItem("pacientesData", JSON.stringify(actualizado));
        setPacientes(actualizado);

        // Refrescar el paciente actual
        const pacienteActualizado = actualizado.find((p) => p.rut === paciente.rut);
        setPaciente(pacienteActualizado);

        setTexto("");
        setAccion("");
        alert("✅ Información registrada correctamente y sincronizada con el sistema.");
    };

    // ---------------------------------------------
    // 🔹 Render principal
    // ---------------------------------------------
    if (!usuario) return null;

    return (
        <div className="container-fluid py-4">
            <div className="text-center mb-4">
                <h2 className="fw-semibold text-primary">Panel del Profesional Externo</h2>
                <p className="text-muted mb-0">
                    👋 Bienvenido, {usuario.nombre}. Consulta y agrega información clínica a los pacientes del sistema.
                </p>
            </div>

            {/* BUSCAR PACIENTE */}
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h5 className="fw-bold text-primary">Buscar paciente</h5>
                    <div className="row g-3 align-items-center mt-2">
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ingrese RUT (Ej: 5.654.234-0)"
                                value={rutBusqueda}
                                onChange={(e) => setRutBusqueda(e.target.value)}
                            />
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary w-100" onClick={handleBuscar}>
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* DATOS DEL PACIENTE */}
            {paciente && (
                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-md-3 text-center">
                                <img
                                    src={paciente.imagen}
                                    alt={paciente.nombre}
                                    className="rounded-circle shadow-sm"
                                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                />
                            </div>
                            <div className="col-md-9">
                                <h4 className="text-primary">{paciente.nombre}</h4>
                                <p><strong>RUT:</strong> {paciente.rut}</p>
                                <p><strong>Edad:</strong> {paciente.edad} años</p>
                                <p><strong>Diagnóstico:</strong> {paciente.diagnostico}</p>
                                <p><strong>Alergias:</strong> {paciente.alergias}</p>
                                <p><strong>Observaciones:</strong> {paciente.observaciones}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* AGREGAR NUEVA INFORMACIÓN */}
            {paciente && (
                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <h5 className="fw-bold text-primary mb-3">Registrar nueva información</h5>
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
            )}

            {/* VISUALIZACIÓN DE REGISTROS */}
            {paciente && (
                <div className="row">
                    {["notas", "recetas", "examenes", "certificados"].map((tipo) => (
                        <div key={tipo} className="col-md-6 mb-3">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h6 className="fw-bold text-primary text-capitalize">
                                        {tipo === "notas"
                                            ? "🩺 Notas Clínicas"
                                            : tipo === "recetas"
                                                ? "💊 Recetas"
                                                : tipo === "examenes"
                                                    ? "🧪 Exámenes"
                                                    : "📜 Certificados"}
                                    </h6>
                                    {paciente[tipo].length === 0 ? (
                                        <p className="text-muted">Sin registros.</p>
                                    ) : (
                                        <ul className="list-group small">
                                            {paciente[tipo].map((item, i) => (
                                                <li key={i} className="list-group-item">
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
            )}
        </div>
    );
}

export default DashboardProfExterno;