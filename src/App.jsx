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
