import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Componentes comunes
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// Páginas
import Home from "./pages/Home";
import Centros from "./pages/Centros";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import DashboardProf from "./pages/DashboardProf";
import DashboardTutor from "./pages/DashboardTutor";
import DashboardProfExterno from "./pages/DashboardProfExterno";
import Paciente from "./pages/Paciente";
import DatosMedicos from "./pages/DatosMedicos";

function App() {
  // ✅ Carga automática de pacientes en localStorage
  useEffect(() => {
    const pacientesExistentes = localStorage.getItem("pacientes");

    if (!pacientesExistentes) {
      const pacientesIniciales = [
        {
          id: 1,
          nombre: "Ana María Pérez Villouta",
          rut: "6.345.678-9",
          edad: 74,
          diagnostico: "Demencia leve",
          alergias: "Ninguna",
          observaciones: "Buen estado general",
          medicamentos: ["Donepezilo 10mg", "Memantina 20mg"],
          controles: ["Presión 130/85", "Peso 70kg"],
          notas: [
            {
              contenido: "Paciente tranquilo. Control de presión normal.",
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
      ];

      localStorage.setItem("pacientes", JSON.stringify(pacientesIniciales));
      console.info("✅ Pacientes iniciales cargados en localStorage.");
    } else {
      console.info("ℹ️ Los pacientes ya existen en localStorage.");
    }
  }, []);

  return (
    <>
      <NavBar />
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
      <Footer />
    </>
  );
}

export default App;
