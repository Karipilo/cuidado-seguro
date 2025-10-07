import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Centros from "./pages/Centros";
import Login from "./pages/Login";
import DashboardProf from "./pages/DashboardProf";
import DatosMedicos from "./pages/DatosMedicos";
import Paciente from "./pages/Paciente";
import Registro from "./pages/Registro";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/centros" element={<Centros />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboardprf" element={<DashboardProf />} />
        <Route path="datosmedicos" element={<DatosMedicos />} />
        <Route path="paciente" element={<Paciente />} />
        <Route path="registro" element={<Registro />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;




