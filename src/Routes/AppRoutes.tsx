import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import CadastrarPedido from "../pages/CadastrarPedido/CadastrarPedido";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/Login/Login"
import Home from "../pages/Home/Home";

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrar-pedido" element={<CadastrarPedido />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default AppRoutes;
