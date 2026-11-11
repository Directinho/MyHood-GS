import { useState, FormEvent } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { createPedido } from "../../services/api";
import type { Pedido } from "../../services/Pedido";

interface FormData {
  nome: string;
  cpf: string;
  nivel: number;
  pedido: string;
  cep: string;
  cidade: string;
}

interface PularFields {
  nome: boolean;
  cpf: boolean;
  pedido: boolean;
  cep: boolean;
}

export default function CadastrarPedido() {
  const [form, setForm] = useState<FormData>({
    nome: "",
    cpf: "",
    nivel: 3,
    pedido: "",
    cep: "",
    cidade: "",
  });

  const [pular, setPular] = useState<PularFields>({
    nome: false,
    cpf: false,
    pedido: false,
    cep: false,
  });

  const [loadingCep, setLoadingCep] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [mensagem, setMensagem] = useState<{
    tipo: "sucesso" | "erro";
    texto: string;
  } | null>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "nivel" ? Number(value) : value,
    }));
  }

  function handlePular(campo: keyof PularFields) {
    setPular((prev) => {
      const novoValor = !prev[campo];

      if (novoValor) {
        setForm((f) => ({
          ...f,
          [campo]: "Não informado",
          ...(campo === "cep" ? { cidade: "Não informado" } : {}),
        }));
      } else {
        setForm((f) => ({
          ...f,
          [campo]: "",
          ...(campo === "cep" ? { cidade: "" } : {}),
        }));
      }

      return { ...prev, [campo]: novoValor };
    });
  }

  async function buscarCep() {
    if (pular.cep) return;

    const cleanCep = form.cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      setForm((prev) => ({ ...prev, cidade: "" }));
      return;
    }

    setLoadingCep(true);
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCep}/json/`,
      );
      const data = await response.json();

      if (data.erro) {
        setForm((prev) => ({
          ...prev,
          cidade: "CEP não encontrado",
        }));
      } else {
        const cidadeFormatada = [
          data.logradouro,
          data.bairro,
          data.localidade,
          data.uf,
        ]
          .filter(Boolean)
          .join(" | ");

        setForm((prev) => ({
          ...prev,
          cidade: cidadeFormatada || data.localidade,
        }));
      }
    } catch {
      setForm((prev) => ({
        ...prev,
        cidade: "Erro ao consultar CEP",
      }));
    } finally {
      setLoadingCep(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMensagem(null);
    setLoadingSubmit(true);

    try {
      const novoPedido: Omit<Pedido, "id"> = {
        nome: pular.nome ? "Não informado" : form.nome || "Não informado",
        cpf: pular.cpf ? "Não informado" : form.cpf || "Não informado",
        nivel: form.nivel,
        pedido: pular.pedido ? "Não informado" : form.pedido || "Sem descrição",
        cep: pular.cep
          ? "Não informado"
          : form.cep.replace(/\D/g, "") || "Não informado",
        cidade: pular.cep ? "Não informado" : form.cidade || "Não informado",
        status: "Em análise",
      };

      await createPedido(novoPedido);

      setMensagem({
        tipo: "sucesso",
        texto: "Pedido cadastrado com sucesso!",
      });

      setForm({
        nome: "",
        cpf: "",
        nivel: 3,
        pedido: "",
        cep: "",
        cidade: "",
      });
      setPular({
        nome: false,
        cpf: false,
        pedido: false,
        cep: false,
      });
    } catch {
      setMensagem({
        tipo: "erro",
        texto: "Erro ao cadastrar o pedido. Tente novamente.",
      });
    } finally {
      setLoadingSubmit(false);
    }
  }

  return (
    <main className="min-h-screen bg-azul-900 flex items-center justify-center px-4 py-10 font-dunbar">
      <div className="w-full max-w-lg bg-azul-800 rounded-2xl shadow-2xl border border-azul-600 p-8">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Cadastrar Pedido
        </h2>
        <p className="text-slate-400 text-center text-sm mb-2">
          Preencha os dados abaixo para reportar um problema no seu bairro
        </p>
        <p className="text-slate-500 text-center text-xs mb-8">
          Marque "Não informar" se não quiser preencher algum campo
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-slate-200"
              >
                Nome Completo
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer select-none">
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
                className="block text-sm font-medium text-slate-200"
              >
                CPF
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer select-none">
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
              className="block text-sm font-medium text-slate-200"
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
                className="block text-sm font-medium text-slate-200"
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

          {/* CEP */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="cep"
                className="block text-sm font-medium text-slate-200"
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
              className="block text-sm font-medium text-slate-200"
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
            </div>
          )}

          <div className="flex gap-3 pt-2">
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
