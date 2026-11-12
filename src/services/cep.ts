interface RespostaCep {
  erro?: boolean;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
}

function isRespostaCep(value: unknown): value is RespostaCep {
  return typeof value === "object" && value !== null;
}

export async function buscarEnderecoPorCep(cep: string): Promise<string> {
  let response: Response;
  try {
    response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  } catch {
    throw new Error("Não foi possível consultar o CEP.");
  }

  if (!response.ok) {
    throw new Error("O serviço de CEP está indisponível.");
  }

  const data: unknown = await response.json();
  if (!isRespostaCep(data)) {
    throw new Error("O serviço de CEP retornou uma resposta inválida.");
  }
  if (data.erro) {
    throw new Error("CEP não encontrado.");
  }

  const endereco = [
    data.logradouro,
    data.bairro,
    data.localidade,
    data.uf,
  ]
    .filter(Boolean)
    .join(" | ");

  return endereco || data.localidade || "Endereço não informado";
}
