import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Centros from "./pages/Centros";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/centros" element={<Centros />} />
        <Route path="login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;




