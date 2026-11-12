import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { createPedido } from "../services/api";
import { buscarEnderecoPorCep } from "../services/cep";
import type { Pedido } from "../services/Pedido";

interface FormData {
  nome: string;
  cpf: string;
  nivel: number;
  pedido: string;
  cep: string;
  cidade: string;
}

interface CamposOpcionais {
  nome: boolean;
  cpf: boolean;
  pedido: boolean;
  cep: boolean;
}

type Mensagem = { tipo: "sucesso" | "erro"; texto: string };

const formularioInicial: FormData = {
  nome: "",
  cpf: "",
  nivel: 3,
  pedido: "",
  cep: "",
  cidade: "",
};

const camposOpcionaisIniciais: CamposOpcionais = {
  nome: false,
  cpf: false,
  pedido: false,
  cep: false,
};

function mensagemDeErro(error: unknown, padrao: string): string {
  return error instanceof Error ? error.message : padrao;
}

export function useCadastroPedido() {
  const [form, setForm] = useState<FormData>(formularioInicial);
  const [pular, setPular] = useState<CamposOpcionais>(
    camposOpcionaisIniciais,
  );
  const [loadingCep, setLoadingCep] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [mensagem, setMensagem] = useState<Mensagem | null>(null);

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target;
    setForm((atual) => ({
      ...atual,
      [name]: name === "nivel" ? Number(value) : value,
    }));
  }

  function handlePular(campo: keyof CamposOpcionais) {
    const novoValor = !pular[campo];
    setPular((atual) => ({ ...atual, [campo]: novoValor }));
    setForm((atual) => ({
      ...atual,
      [campo]: novoValor ? "Não informado" : "",
      ...(campo === "cep"
        ? { cidade: novoValor ? "Não informado" : "" }
        : {}),
    }));
  }

  async function buscarCep() {
    if (pular.cep) return;

    const cep = form.cep.replace(/\D/g, "");
    if (cep.length !== 8) {
      setForm((atual) => ({ ...atual, cidade: "" }));
      return;
    }

    setLoadingCep(true);
    try {
      const cidade = await buscarEnderecoPorCep(cep);
      setForm((atual) => ({ ...atual, cidade }));
    } catch (error) {
      setForm((atual) => ({
        ...atual,
        cidade: mensagemDeErro(error, "Erro ao consultar CEP."),
      }));
    } finally {
      setLoadingCep(false);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setMensagem(null);
    setLoadingSubmit(true);

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

    try {
      await createPedido(novoPedido);
      setMensagem({
        tipo: "sucesso",
        texto: "Pedido cadastrado com sucesso!",
      });
      setForm(formularioInicial);
      setPular(camposOpcionaisIniciais);
    } catch (error) {
      setMensagem({
        tipo: "erro",
        texto: mensagemDeErro(error, "Não foi possível cadastrar o pedido."),
      });
    } finally {
      setLoadingSubmit(false);
    }
  }

  return {
    form,
    pular,
    loadingCep,
    loadingSubmit,
    mensagem,
    handleChange,
    handlePular,
    buscarCep,
    handleSubmit,
  };
}
