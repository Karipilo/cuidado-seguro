// -----------------------------------------------------------
// Bloque para cargar datos iniciales de pacientes en localStorage
// -----------------------------------------------------------

// Esta función se encarga de cargar los datos de pacientes
// solo si aún no existen en el almacenamiento local del navegador.
// De esta forma, estarán disponibles para todos los dashboards
// (Tutor, Profesional y Profesional Externo) desde el inicio de la aplicación.
function cargarPacientesIniciales() {
  // Se obtiene la información guardada bajo la clave "pacientes".
  const pacientesGuardados = localStorage.getItem("pacientes");

  // Si no existe nada guardado, se definen los pacientes iniciales.
  if (!pacientesGuardados) {
    // Se define un arreglo con tres pacientes de ejemplo.
    const pacientesIniciales = [
      {
        id: 1,
        nombre: "Juan Pérez Soto",
        rut: "12.345.678-9",
        edad: 78,
        diagnostico: "Alzheimer leve",
        alergias: "Penicilina",
        observaciones: "Paciente tranquilo y cooperador",
        centro: "ELEAM Alerces",
        ciudad: "Viña del Mar",
        medicamentos: ["Donepezilo", "Memantina"],
        controles: ["Control mensual", "Chequeo nutricional"],
      },
      {
        id: 2,
        nombre: "María López Díaz",
        rut: "9.876.543-2",
        edad: 82,
        diagnostico: "Demencia mixta",
        alergias: "Ninguna",
        observaciones: "Requiere acompañamiento constante",
        centro: "ELEAM Las Rosas",
        ciudad: "Valparaíso",
        medicamentos: ["Rivastigmina"],
        controles: ["Control médico trimestral"],
      },
      {
        id: 3,
        nombre: "Pedro Morales Gutiérrez",
        rut: "13.456.789-1",
        edad: 74,
        diagnostico: "Parkinson",
        alergias: "Aspirina",
        observaciones: "Presenta temblores constantes",
        centro: "ELEAM Los Pinos",
        ciudad: "La Serena",
        medicamentos: ["Levodopa", "Carbidopa"],
        controles: ["Control neurológico mensual"],
      },
    ];

    // Se guarda el arreglo en localStorage convertido a formato JSON.
    localStorage.setItem("pacientes", JSON.stringify(pacientesIniciales));

    // Se muestra un mensaje en consola para informar que se cargaron los pacientes.
    console.log("Pacientes iniciales cargados en localStorage.");
  } else {
    // Si los pacientes ya existían, se muestra un mensaje indicando que no se sobreescriben.
    console.log("Pacientes ya existen en localStorage, no se sobreescriben.");
  }
}

// Se ejecuta la función al cargar el archivo App.jsx.
// Esto garantiza que los pacientes estén disponibles antes de mostrar cualquier dashboard.
cargarPacientesIniciales();

// -----------------------------------------------------------
// Importaciones de la aplicación (mantienen tu estructura original)
// -----------------------------------------------------------

// Importa las herramientas de enrutamiento de React
import { Routes, Route } from "react-router-dom";

// Importa los componentes comunes
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// Importa las páginas del sitio
import Home from "./pages/Home";
import Centros from "./pages/Centros";
import Login from "./pages/Login";
import DashboardProf from "./pages/DashboardProf";
import DashboardTutor from "./pages/DashboardTutor";
import DatosMedicos from "./pages/DatosMedicos";
import Paciente from "./pages/Paciente";
import Registro from "./pages/Registro";
import DashboardProfExterno from "./pages/DashboardProfExterno";

// Componente principal de la aplicación
function App() {
  return (
    <>
      {/* Barra de navegación visible en todas las páginas */}
      <NavBar />

      {/* Define todas las rutas del sitio */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/centros" element={<Centros />} />
        <Route path="/dashboard-prof" element={<DashboardProf />} />
        <Route path="/dashboard-tutor" element={<DashboardTutor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/dashboard-prof-externo"
          element={<DashboardProfExterno />}
        />
      </Routes>

      {/* Footer visible en todas las páginas */}
      <Footer />
    </>
  );
}

// Exporta el componente principal
export default App;
