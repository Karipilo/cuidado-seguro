// src/components/DashboardTutorContent.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopbarTutor from "./TopbarTutor";
import TabsTutor from "./TabsTutor";
import PacienteDetalle from "./PacienteDetalle";
import MensajesTutor from "./MensajesTutor";

function DashboardTutorContent() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [tab, setTab] = useState("detalle");
  const [mensajes, setMensajes] = useState([]);
  const [para, setPara] = useState("Profesional de Salud a cargo");
  const [asunto, setAsunto] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState("Juan Pérez Soto");

  useEffect(() => {
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!activo || activo.tipoUsuario !== "Tutor") {
      navigate("/login");
      return;
    }
    setUsuario(activo);
  }, [navigate]);

  const paciente = {
    nombre: pacienteSeleccionado,
    centro: "ELEAM Alerces",
    ciudad: "Viña del Mar",
    contacto: "Contacto: María López (Hermana) — +56 9 1234 5678",
    identificacion: "RUT: 12.345.678-9",
    edadSexo: "78 años, Masculino",
    diagnosticos: "Hipertensión arterial, Diabetes tipo II",
    alergias: "Penicilina",
    contactos: "Tutor legal: María López",
    medicamentos: [
      {
        farmaco: "Enalapril",
        dosis: "10 mg",
        via: "VO",
        frecuencia: "1 vez al día",
        indicacion: "HTA",
        desde: "01-01-2024",
        hasta: "—",
      },
      {
        farmaco: "Metformina",
        dosis: "850 mg",
        via: "VO",
        frecuencia: "2 veces al día",
        indicacion: "Diabetes",
        desde: "15-03-2024",
        hasta: "—",
      },
    ],
    controles: [
      {
        fecha: "05-06-2024",
        detalle: "Control médico general con Dr. Ramírez (Presión y glicemia estables)",
      },
      {
        fecha: "20-07-2024",
        detalle: "Control enfermería (Revisión de pie diabético)",
      },
    ],
    quirurgicos: "Colecistectomía (2010)",
    habitos: "Exfumador, actividad física ligera",
    vacunas: "Influenza 2023, COVID-19 esquema completo",
    riesgos: "Caídas, Hipoglicemia",
  };

  const pacientesDisponibles = [
    "Juan Pérez Soto",
    "María González Ríos",
    "Luis Andrade Mora",
  ];

  return (
    <div className="tutor-body bg-light-blue py-4 px-3">
      <div className="container">
        <TopbarTutor
          pacienteSeleccionado={pacienteSeleccionado}
          setPacienteSeleccionado={setPacienteSeleccionado}
          pacientesDisponibles={pacientesDisponibles}
        />

        <p className="text-muted">
          Revisa antecedentes, medicamentos y controles del paciente seleccionado.
        </p>

        <TabsTutor tab={tab} setTab={setTab} />

        {tab === "detalle" && (
          <PacienteDetalle paciente={paciente} />
        )}

        {tab === "mensajes" && (
          <MensajesTutor
            mensajes={mensajes}
            setMensajes={setMensajes}
            para={para}
            setPara={setPara}
            asunto={asunto}
            setAsunto={setAsunto}
            cuerpo={cuerpo}
            setCuerpo={setCuerpo}
          />
        )}
      </div>
    </div>
  );
}

export default DashboardTutorContent;