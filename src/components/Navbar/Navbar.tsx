import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b border-azul-800 bg-azul-900 text-lg sm:text-xl">
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 py-2 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:py-0">
          <Link to="/" className="group flex items-center gap-2 self-center sm:self-auto">
            <div className="rounded-full p-1 transition-all duration-300 hover:bg-white/20 group-hover:scale-105">
              <img
                src="https://iili.io/nptIhKX.png"
                alt="Logo MyHood"
                className="h-10 w-10 rounded-full drop-shadow-lg"
              />
            </div>
            <p className="font-dunbar text-lg font-bold tracking-tight text-white sm:text-xl">
              My
              <span className="text-laranja-500">Hood</span>
            </p>
          </Link>

          <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
            <Link
              to="/cadastrar-pedido"
              className="flex-1 rounded-lg bg-azul-500 px-2 py-2 text-center text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-blue-400 hover:text-azul-800 sm:flex-none sm:px-4 sm:text-base"
            >
              Cadastrar Pedido
            </Link>
            <Link
              to="/login"
              className="flex-1 rounded-lg px-2 py-2 text-center text-sm font-bold text-white shadow-md transition-all duration-300 hover:text-azul-500 sm:flex-none sm:px-4 sm:text-base"
            >
              Login para Administrador
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
