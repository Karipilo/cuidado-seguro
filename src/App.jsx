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
        <Route path="/dashboard-prof-externo" element={<DashboardProfExterno />} />

      </Routes>

      {/* Footer visible en todas las páginas */}
      <Footer />
    </>
  );
}

// Exporta el componente principal
export default App;





