// Importa las herramientas de enrutamiento de React
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Importa los componentes comunes
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// Importa las páginas del sitio
import Home from "./pages/Home";
import Centros from "./pages/Centros";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import DashboardProf from "./pages/DashboardProf";
import DashboardTutor from "./pages/DashboardTutor";
import DashboardProfExterno from "./pages/DashboardProfExterno";
import Paciente from "./pages/Paciente";
import DatosMedicos from "./pages/DatosMedicos";

// ===============================================================
// 🧩 Componente principal de la aplicación
// ===============================================================
function App() {
  // ---------------------------------------------------------------
  // 🔹 Verifica que existan datos en localStorage
  //    Si no existen, los crea vacíos para evitar errores
  // ---------------------------------------------------------------
  useEffect(() => {
    // Verifica si ya existen pacientes guardados
    const pacientesGuardados = localStorage.getItem("pacientes");
    if (!pacientesGuardados) {
      // Si no hay pacientes, crea una lista vacía
      localStorage.setItem("pacientes", JSON.stringify([]));
    }

    // Verifica si ya existen usuarios guardados
    const usuariosGuardados = localStorage.getItem("usuarios");
    if (!usuariosGuardados) {
      // Si no hay usuarios, crea una lista vacía
      localStorage.setItem("usuarios", JSON.stringify([]));
    }
  }, []);

  // ---------------------------------------------------------------
  // 🔹 Render principal de la aplicación
  // ---------------------------------------------------------------
  return (
    <>
      {/* Barra de navegación visible en todas las páginas */}
      <NavBar />

      {/* Define todas las rutas del sitio */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/centros" element={<Centros />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/dashboard-prof" element={<DashboardProf />} />
        <Route path="/dashboard-tutor" element={<DashboardTutor />} />
        <Route
          path="/dashboard-prof-externo"
          element={<DashboardProfExterno />}
        />
        <Route path="/paciente" element={<Paciente />} />
        <Route path="/datos-medicos" element={<DatosMedicos />} />
      </Routes>

      {/* Pie de página visible en todas las páginas */}
      <Footer />
    </>
  );
}

export default App;
