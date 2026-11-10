import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="bg-azul-900 border-b border-azul-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className=" p-1.5 rounded-full transition-all duration-300 hover:bg-white/20 group-hover:scale-105">
              <img
                src="/src/assets/favicon.png"
                alt="Logo MyHood"
                className="h-9 w-9 rounded-full drop-shadow-lg"
              />
            </div>
            <p className="font-dunbar text-white font-bold text-xl tracking-tight">
              My
              <span className="text-laranja-500">Hood</span>
            </p>
          </Link>
          <Link
            to="/cadastro"
            className="bg-laranja-500 hover:bg-laranja-400 text-white font-dunbar font-bold px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-md"
          >
            Cadastrar Pedido
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
