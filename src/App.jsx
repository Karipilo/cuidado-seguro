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
import DatosMedicos from "./pages/DatosMedicos";
import Paciente from "./pages/Paciente";
import Registro from "./pages/Registro";

// Componente principal de la aplicación
function App() {
  return (
    <>
      {/* 🔹 Barra de navegación visible en todas las páginas */}
      <NavBar />

      {/* 🔹 Define todas las rutas del sitio */}
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Home />} />

        {/* Sección de centros */}
        <Route path="/centros" element={<Centros />} />

        {/* Formulario de inicio de sesión */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard del profesional */}
        <Route path="/dashboardprf" element={<DashboardProf />} />

        {/* Página de datos médicos */}
        <Route path="/datosmedicos" element={<DatosMedicos />} />

        {/* CRUD de paciente */}
        <Route path="/paciente" element={<Paciente />} />

        {/* Formulario de registro */}
        <Route path="/registro" element={<Registro />} />
      </Routes>

      {/* 🔹 Footer visible en todas las páginas */}
      <Footer />
    </>
  );
}

// Exporta el componente principal
export default App;





