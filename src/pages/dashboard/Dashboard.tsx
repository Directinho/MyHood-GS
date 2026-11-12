import { useState } from "react";
import { Link } from "react-router-dom";
import { usePedidos } from "../../hooks/usePedidos";
import type { StatusPedido } from "../../services/Pedido";

const statusDisponiveis: StatusPedido[] = [
  "Em análise",
  "Em andamento",
  "Concluído",
];

function isStatusPedido(value: string): value is StatusPedido {
  return statusDisponiveis.some((status) => status === value);
}

function Dashboard() {
  const { pedidos, loading, error, editarPedido, removerPedido, refetch } =
    usePedidos();
  const [erroAcao, setErroAcao] = useState<string | null>(null);

  const emAnalise = pedidos.filter(
    (pedido) => pedido.status === "Em análise",
  ).length;
  const emAndamento = pedidos.filter(
    (pedido) => pedido.status === "Em andamento",
  ).length;
  const concluidos = pedidos.filter(
    (pedido) => pedido.status === "Concluído",
  ).length;

  async function alterarStatus(id: number, status: StatusPedido) {
    setErroAcao(null);
    try {
      await editarPedido(id, { status });
    } catch (error) {
      setErroAcao(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o status.",
      );
    }
  }

  async function excluirPedido(id: number) {
    if (!window.confirm("Deseja realmente excluir este pedido?")) return;

    setErroAcao(null);
    try {
      await removerPedido(id);
    } catch (error) {
      setErroAcao(
        error instanceof Error
          ? error.message
          : "Não foi possível excluir o pedido.",
      );
    }
  }

  return (
    <main className="min-h-screen bg-azul-800 px-4 py-8 font-dunbar sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="mt-1 text-3xl font-bold text-azul-500 sm:text-4xl">
              Dashboard
            </h1>
          </div>
        </header>

        <section className="rounded-xl border border-slate-200 bg-blue-200 p-4 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-azul-600 sm:text-2xl">
              Pedidos cadastrados
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Atualize o andamento ou remova um pedido.
            </p>
          </div>

          {(error || erroAcao) && (
            <div
              role="alert"
              className="mb-5 flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
            >
              <span>{erroAcao ?? error}</span>
              {error && (
                <button
                  type="button"
                  onClick={() => void refetch()}
                  className="font-bold underline"
                >
                  Tentar novamente
                </button>
              )}
            </div>
          )}

          {loading ? (
            <p className="py-10 text-center text-slate-500" role="status">
              Carregando pedidos...
            </p>
          ) : pedidos.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 px-4 py-12 text-center">
              <p className="text-lg font-semibold text-slate-700">
                Ainda não há pedidos cadastrados.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Quando alguém cadastrar um pedido, ele aparecerá aqui.
              </p>
              <Link
                to="/cadastrar-pedido"
                className="mt-5 inline-flex rounded-lg bg-laranja-500 px-4 py-2.5 font-bold text-white transition hover:bg-laranja-400"
              >
                Cadastrar o primeiro pedido
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {pedidos.map((pedido) => (
                <li
                  key={pedido.id}
                  className="grid gap-4 rounded-lg border border-slate-200 p-4 sm:p-5 lg:grid-cols-[1fr_auto] lg:items-center"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="break-words text-lg font-bold text-azul-900">
                        {pedido.pedido}
                      </h3>
                      <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-800">
                        Prioridade {pedido.nivel}/5
                      </span>
                    </div>
                    <p className="mt-2 break-words text-sm text-slate-600">
                      {pedido.cidade}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {pedido.nome} · CPF: {pedido.cpf} · CEP: {pedido.cep}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row lg:min-w-64 lg:justify-end">
                    <label className="sr-only" htmlFor={`status-${pedido.id}`}>
                      Status do pedido: {pedido.pedido}
                    </label>
                    <select
                      id={`status-${pedido.id}`}
                      value={pedido.status}
                      onChange={(event) => {
                        if (isStatusPedido(event.target.value)) {
                          void alterarStatus(pedido.id, event.target.value);
                        }
                      }}
                      className="min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-azul-500"
                    >
                      {statusDisponiveis.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => void excluirPedido(pedido.id)}
                      className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-bold text-red-700 transition hover:bg-red-50"
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
