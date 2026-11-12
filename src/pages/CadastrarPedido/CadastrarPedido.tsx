import { Link } from "react-router-dom";
import { useCadastroPedido } from "../../hooks/useCadastroPedido";

export default function CadastrarPedido() {
  const {
    form,
    pular,
    loadingCep,
    loadingSubmit,
    mensagem,
    handleChange,
    handlePular,
    buscarCep,
    handleSubmit,
  } = useCadastroPedido();

  return (
    <main className="min-h-screen bg-azul-900 flex items-center justify-center px-3 py-8 font-dunbar sm:px-4 sm:py-10">
      <div className="w-full max-w-lg bg-azul-800 rounded-2xl shadow-2xl border border-azul-600 p-5 sm:p-8">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Cadastrar Pedido
        </h2>
        <p className="text-laranja-400 text-center text-xl mb-2">
          Preencha os dados abaixo para reportar um problema no seu bairro
        </p>
        <p className="mb-2 text-center text-sm text-slate-300">
          Demonstração: use dados fictícios. Os detalhes ficam salvos apenas
          neste navegador.
        </p>
        <p className="text-laranja-300 text-center text-1xl mb-8">
          Marque "Não informar" se não quiser preencher algum campo
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="nome"
                className="block text-base font-medium text-slate-200 sm:text-lg"
              >
                Nome Completo
              </label>
              <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer select-none sm:gap-2 sm:text-sm">
                <input
                  type="checkbox"
                  checked={pular.nome}
                  onChange={() => handlePular("nome")}
                  className="rounded border-azul-600 text-laranja-500 focus:ring-laranja-500 bg-azul-900"
                />
                Não informar
              </label>
            </div>
            <input
              type="text"
              id="nome"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Digite seu Nome Completo"
              disabled={pular.nome}
              className={`w-full px-4 py-2.5 bg-azul-900 border border-azul-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-laranja-500 focus:border-transparent transition ${
                pular.nome ? "opacity-60 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="cpf"
                className="block text-base font-medium text-slate-200 sm:text-lg"
              >
                CPF
              </label>
              <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer select-none sm:gap-2 sm:text-sm">
                <input
                  type="checkbox"
                  checked={pular.cpf}
                  onChange={() => handlePular("cpf")}
                  className="rounded border-azul-600 text-laranja-500 focus:ring-laranja-500 bg-azul-900"
                />
                Não informar
              </label>
            </div>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              placeholder="000.000.000-00"
              disabled={pular.cpf}
              className={`w-full px-4 py-2.5 bg-azul-900 border border-azul-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-laranja-500 focus:border-transparent transition ${
                pular.cpf ? "opacity-60 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="nivel"
              className="block text-base font-medium text-slate-200 sm:text-lg"
            >
              Nível de prioridade (1 a 5)
            </label>
            <select
              id="nivel"
              name="nivel"
              value={form.nivel}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-azul-900 border border-azul-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-laranja-500 focus:border-transparent transition"
            >
              <option value={1}>1 - Baixa</option>
              <option value={2}>2 - Média-baixa</option>
              <option value={3}>3 - Média</option>
              <option value={4}>4 - Alta</option>
              <option value={5}>5 - Urgente</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="pedido"
                className="block text-base font-medium text-slate-200 sm:text-lg"
              >
                Descrição do problema
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={pular.pedido}
                  onChange={() => handlePular("pedido")}
                  className="rounded border-azul-600 text-laranja-500 focus:ring-laranja-500 bg-azul-900"
                />
                Não informar
              </label>
            </div>
            <textarea
              id="pedido"
              name="pedido"
              value={form.pedido}
              onChange={handleChange}
              placeholder="Descreva o problema (ex: buraco na rua, poste sem luz...)"
              rows={4}
              disabled={pular.pedido}
              className={`w-full px-4 py-2.5 bg-azul-900 border border-azul-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-laranja-500 focus:border-transparent transition resize-none ${
                pular.pedido ? "opacity-60 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="cep"
                className="block text-base font-medium text-slate-200 sm:text-lg"
              >
                CEP
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={pular.cep}
                  onChange={() => handlePular("cep")}
                  className="rounded border-azul-600 text-laranja-500 focus:ring-laranja-500 bg-azul-900"
                />
                Não informar
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                id="cep"
                name="cep"
                value={form.cep}
                onChange={handleChange}
                onBlur={buscarCep}
                placeholder="00000-000"
                maxLength={9}
                disabled={pular.cep}
                className={`w-full px-4 py-2.5 bg-azul-900 border border-azul-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-laranja-500 focus:border-transparent transition ${
                  pular.cep ? "opacity-60 cursor-not-allowed" : ""
                }`}
              />
              {loadingCep && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-laranja-400 text-sm">
                  Buscando...
                </span>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="cidade"
              className="block text-base font-medium text-slate-200 sm:text-lg"
            >
              Endereço / Cidade
            </label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={form.cidade}
              readOnly
              placeholder="Preenchido automaticamente pelo CEP"
              className="w-full px-4 py-2.5 bg-azul-900/50 border border-azul-600 rounded-lg text-slate-400 placeholder-slate-600 cursor-not-allowed"
            />
          </div>

          {mensagem && (
            <div
              className={`px-4 py-3 rounded-lg text-sm text-center font-medium ${
                mensagem.tipo === "sucesso"
                  ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700"
                  : "bg-red-900/50 text-red-300 border border-red-700"
              }`}
            >
              {mensagem.texto}
              {mensagem.tipo === "sucesso" && (
                <Link
                  to="/dashboard"
                  className="mt-2 block font-bold underline"
                >
                  Ver no dashboard
                </Link>
              )}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
            <button
              type="submit"
              disabled={loadingSubmit}
              className="flex-1 bg-laranja-500 hover:bg-laranja-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-4 rounded-lg transition"
            >
              {loadingSubmit ? "Cadastrando..." : "Cadastrar Pedido"}
            </button>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-5 py-2.5 border border-azul-600 text-slate-300 hover:bg-azul-600 hover:text-white rounded-lg transition"
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
