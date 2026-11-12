import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    navigate("/dashboard");
  }

  return (
    <main className="min-h-screen bg-azul-900 flex items-center justify-center px-4 py-8 font-dunbar">
      <div className="w-full max-w-6xl bg-azul-800 rounded-2xl shadow-2xl border border-azul-600 overflow-hidden flex flex-col md:flex-row md:min-h-[560px]">
        <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-14 flex flex-col justify-center">
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-laranja-500/20 mb-5">
              <img src="/chave.svg" alt="Icone de Chave" className="h-7 w-7" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
            <p className="text-slate-300 text-base">Acesso do administrador</p>
            <p className="text-slate-400 text-sm mt-2">
              Acesso de demonstração: qualquer email e senha funcionam.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-base sm:text-lg font-bold text-slate-200"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu endereço de email"
                required
                className="w-full px-5 py-3.5 bg-azul-900 border border-azul-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-laranja-500 focus:border-transparent transition text-base"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="senha"
                className="block text-base sm:text-lg font-bold text-slate-200"
              >
                Senha
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                required
                className="w-full px-5 py-3.5 bg-azul-900 border border-azul-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-laranja-500 focus:border-transparent transition text-base"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-azul-500 hover:bg-azul-600 disabled:opacity-60 disabled:cursor-not-allowed text-xl sm:text-2xl text-white font-semibold py-3.5 px-4 rounded-xl transition"
            >
              {loading ? "Entrando..." : "Continuar"}
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-laranja-500 flex items-center justify-center min-h-[200px] sm:min-h-[280px] md:min-h-0">
          <img
            src="/carrossel-3.png"
            alt="Ilustração"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </main>
  );
}
