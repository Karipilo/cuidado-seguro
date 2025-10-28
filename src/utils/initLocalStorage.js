// Inicialización de datos base en localStorage
// Descripción: Carga automática de pacientes al abrir la app
//              (solo si aún no existen en localStorage).

export function initLocalStoragePacientes() {
  const pacientesExistentes = localStorage.getItem("pacientes");
  if (pacientesExistentes) return; // No duplicar si ya están cargados

  const pacientesIniciales = [
    {
      id: 1,
      nombre: "Ana María Pérez Villouta",
      rut: "6.345.678-9",
      edad: 74,
      diagnostico: "Demencia leve",
      alergias: "Ninguna",
      observaciones: "Buen estado general. Requiere control mensual.",
      medicamentos: ["Donepezilo 10mg", "Memantina 20mg"],
      controles: [
        "Presión arterial 130/85",
        "Peso 70kg",
        "Control neurológico estable",
      ],
      notas: [
        {
          contenido: "Paciente tranquila, responde bien al tratamiento.",
          fecha: "2025-10-20 10:00",
          autor: "Dra. Claudia Jara",
          tipo: "Profesional Externo",
        },
      ],
      mensajes: [
        {
          fecha: "2025-10-19 09:00",
          asunto: "Consulta sobre medicamentos",
          cuerpo: "¿Puede tomar paracetamol si tiene fiebre?",
        },
      ],
      recetas: [],
      examenes: [],
      certificados: [],
      imagen: "/images/ana.png",
    },
    {
      id: 2,
      nombre: "Juan Pérez Soto",
      rut: "6.345.678-9",
      edad: 79,
      diagnostico: "Demencia moderada",
      alergias: "Penicilina",
      observaciones: "Se recomienda seguimiento semanal.",
      medicamentos: ["Memantina 10mg", "Paracetamol 500mg"],
      controles: [
        "Glucosa normal",
        "Presión 125/80",
        "Chequeo auditivo en curso",
      ],
      notas: [
        {
          contenido:
            "Paciente presenta leves problemas de memoria reciente, sin cambios de humor.",
          fecha: "2025-10-21 11:00",
          autor: "Enfermera María López",
          tipo: "Profesional Interno",
        },
      ],
      mensajes: [
        {
          fecha: "2025-10-22 14:30",
          asunto: "Control general",
          cuerpo:
            "Se solicita información sobre los últimos controles médicos.",
        },
      ],
      recetas: [],
      examenes: [],
      certificados: [],
      imagen: "/images/hector.png",
    },
    {
      id: 3,
      nombre: "María López Rivas",
      rut: "5.789.456-2",
      edad: 82,
      diagnostico: "Alzheimer avanzado",
      alergias: "Ninguna conocida",
      observaciones: "Paciente dependiente total. Seguimiento diario.",
      medicamentos: ["Rivastigmina 3mg", "Vitamina B12 1000mcg"],
      controles: [
        "Presión 140/90",
        "Frecuencia cardíaca 75 lpm",
        "Evaluación neurológica cada 15 días",
      ],
      notas: [
        {
          contenido:
            "Evolución estable, sin reacciones adversas a medicamentos.",
          fecha: "2025-10-23 08:00",
          autor: "Dr. Ricardo Fuentes",
          tipo: "Profesional Interno",
        },
      ],
      mensajes: [
        {
          fecha: "2025-10-24 16:10",
          asunto: "Solicito informe médico",
          cuerpo:
            "Favor enviar resumen de controles y medicamentos actualizados.",
        },
      ],
      recetas: [],
      examenes: [],
      certificados: [],
      imagen: "/images/maria.png",
    },
  ];

  localStorage.setItem("pacientes", JSON.stringify(pacientesIniciales));
  console.info("Pacientes iniciales cargados en localStorage (3 registros).");
}
