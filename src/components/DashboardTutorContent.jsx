// src/components/DashboardTutorContent.jsx  --Referencia de ubicación del archivo--
import React, { useEffect, useState } from "react"; // Importa React y hooks necesarios. Permite manejar estado y ejecutar lógica al cargar el componente (como cargar el usuario o redirigir).
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirigir a otras páginas (como el login si no hay usuario activo).
import TopbarTutor from "./TopbarTutor"; // Importa el componente TopbarTutor para mostrar la barra superior con selección de paciente.
import TabsTutor from "./TabsTutor"; // Importa el componente TabsTutor para mostrar las pestañas de navegación.
import PacienteDetalle from "./PacienteDetalle"; // Importa el componente PacienteDetalle para mostrar los detalles del paciente.
import MensajesTutor from "./MensajesTutor"; // Importa el componente MensajesTutor para gestionar los mensajes.

function DashboardTutorContent() { // Se define el componente funcional DashboardTutorContent.
  const navigate = useNavigate(); // Hook para redirigir a otras rutas.
  const [usuario, setUsuario] = useState(null); // Estado para almacenar el usuario activo.
  const [tab, setTab] = useState("detalle"); // Estado para manejar la pestaña activa (detalle o mensajes).
  const [mensajes, setMensajes] = useState([]); // Estado para almacenar los mensajes del tutor.
  const [para, setPara] = useState("Profesional de Salud a cargo"); // Estado para el destinatario del mensaje.
  const [asunto, setAsunto] = useState(""); // Estado para el asunto del mensaje.
  const [cuerpo, setCuerpo] = useState(""); // Estado para el cuerpo del mensaje.
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState("Juan Pérez Soto"); // Estado para el paciente actualmente seleccionado.

  useEffect(() => { // Hook que se ejecuta al montar el componente.
    const activo = JSON.parse(localStorage.getItem("usuarioActivo")); // Intenta obtener el usuario activo desde el almacenamiento local.
    if (!activo || activo.tipoUsuario !== "Tutor") { // Si no hay usuario activo o no es un tutor,
      navigate("/login"); // redirige al login.
      return; // Termina la ejecución del hook.
    }
    setUsuario(activo); // Si hay un usuario activo y es tutor, lo establece en el estado.
  }, [navigate]); // El hook depende de 'navigate' para evitar advertencias.

  const paciente = { // Datos simulados del paciente seleccionado.
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

  return ( // Renderiza el contenido del dashboard del tutor.
    <div className="tutor-body bg-light-blue py-4 px-3"> {/* Contenedor principal con estilos. */}
      <div className="container"> {/* Contenedor centrado. */}
        <TopbarTutor  
          pacienteSeleccionado={pacienteSeleccionado}  // Pasa el paciente seleccionado al TopbarTutor.
          setPacienteSeleccionado={setPacienteSeleccionado} // Pasa la función para actualizar el paciente seleccionado.
          pacientesDisponibles={pacientesDisponibles} // Pasa la lista de pacientes disponibles al TopbarTutor.
        />

        <p className="text-muted"> {/* Descripción debajo del TopbarTutor. */}
          Revisa antecedentes, medicamentos y controles del paciente seleccionado.
        </p>

        <TabsTutor tab={tab} setTab={setTab} /> {/* Pasa la pestaña activa y la función para cambiarla al TabsTutor. */}

        {tab === "detalle" && ( // Si la pestaña activa es "detalle", muestra el componente PacienteDetalle.
          <PacienteDetalle paciente={paciente} /> // Pasa los datos del paciente al componente PacienteDetalle.
        )}

        {tab === "mensajes" && ( // Si la pestaña activa es "mensajes", muestra el componente MensajesTutor.
          <MensajesTutor // Pasa los estados y funciones necesarios para gestionar los mensajes.
            mensajes={mensajes} // Pasa la lista de mensajes.
            setMensajes={setMensajes} // Pasa la función para actualizar la lista de mensajes.
            para={para} // Pasa el destinatario del mensaje.
            setPara={setPara} // Pasa la función para actualizar el destinatario.
            asunto={asunto} // Pasa el asunto del mensaje.
            setAsunto={setAsunto} // Pasa la función para actualizar el asunto.
            cuerpo={cuerpo} // Pasa el cuerpo del mensaje.
            setCuerpo={setCuerpo} // Pasa la función para actualizar el cuerpo del mensaje.
          />
        )}
      </div>
    </div>
  );
}

export default DashboardTutorContent; // Exporta el componente para que pueda ser utilizado en otras partes de la aplicación.