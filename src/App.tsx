import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import Pontos from "./components/Pontos/Pontos";
import Footer from "./components/Footer/Footer";
import CadastrarPedido from "./pages/CadastrarPedido/CadastrarPedido";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Main />
            <Pontos />
            <Footer />
          </>
        }
      />

      <Route path="/cadastrar-pedido" element={<CadastrarPedido />} />
    </Routes>
  );
}

export default App;
