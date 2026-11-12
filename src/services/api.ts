import type { Pedido } from "./Pedido";

const API_URL = "https://dummyjson.com/products";
const USERS_API_URL = "https://dummyjson.com/users";
const STORAGE_KEY = "myhood.pedidos";
const PRODUTO_REFERENCIA_DEMO_ID = 1;

interface UsuarioApi {
  id: number;
}

interface ProdutoApi {
  id: number;
  title: string;
  description?: string;
  category?: string;
  brand?: string;
  rating?: number;
}

interface CachePedidos {
  criados: Pedido[];
  atualizados: Pedido[];
  removidos: number[];
}

interface ListaUsuariosApi {
  users: UsuarioApi[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isPedido(value: unknown): value is Pedido {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "number" &&
    (value.apiId === undefined || typeof value.apiId === "number") &&
    typeof value.nome === "string" &&
    typeof value.cpf === "string" &&
    typeof value.nivel === "number" &&
    typeof value.pedido === "string" &&
    typeof value.cep === "string" &&
    typeof value.cidade === "string" &&
    (value.exemplo === undefined || typeof value.exemplo === "boolean") &&
    (value.status === "Em análise" ||
      value.status === "Em andamento" ||
      value.status === "Concluído")
  );
}

function isProdutoApi(value: unknown): value is ProdutoApi {
  if (!isRecord(value)) return false;

  return typeof value.id === "number" && typeof value.title === "string";
}

function lerCache(): CachePedidos {
  const armazenados = localStorage.getItem(STORAGE_KEY);
  if (!armazenados) {
    return { criados: [], atualizados: [], removidos: [] };
  }

  const dados: unknown = JSON.parse(armazenados);
  if (Array.isArray(dados) && dados.every(isPedido)) {
    const cache: CachePedidos = {
      criados: dados.map((pedido, index) => ({
        ...pedido,
        id: -(Date.now() + index),
        apiId: PRODUTO_REFERENCIA_DEMO_ID,
      })),
      atualizados: [],
      removidos: [],
    };
    salvarCache(cache);
    return cache;
  }

  if (
    isRecord(dados) &&
    Array.isArray(dados.criados) &&
    dados.criados.every(isPedido) &&
    Array.isArray(dados.atualizados) &&
    dados.atualizados.every(isPedido) &&
    Array.isArray(dados.removidos) &&
    dados.removidos.every((id) => typeof id === "number")
  ) {
    return {
      criados: dados.criados.map((pedido) => ({
        ...pedido,
        apiId: pedido.apiId ?? PRODUTO_REFERENCIA_DEMO_ID,
      })),
      atualizados: dados.atualizados,
      removidos: dados.removidos,
    };
  }

  throw new Error("Os dados locais dos pedidos estão inválidos.");
}

function salvarCache(cache: CachePedidos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
}

async function requisitar<T>(
  url: string,
  init: RequestInit | undefined,
  validar: (data: unknown) => data is T,
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, init);
  } catch {
    throw new Error("Não foi possível conectar à API DummyJSON.");
  }

  if (!response.ok) {
    throw new Error(`A API DummyJSON respondeu com erro (${response.status}).`);
  }

  const data: unknown = await response.json();
  if (!validar(data)) {
    throw new Error("A API DummyJSON retornou uma resposta inválida.");
  }
  return data;
}

function isUsuarioApi(value: unknown): value is UsuarioApi {
  return (
    isRecord(value) &&
    typeof value.id === "number" &&
    Number.isInteger(value.id) &&
    value.id > 0
  );
}

function isListaUsuariosApi(value: unknown): value is ListaUsuariosApi {
  return (
    isRecord(value) &&
    Array.isArray(value.users) &&
    value.users.every(isUsuarioApi)
  );
}

const pessoasBrasileiras = [
  { nome: "Ana Souza", cidade: "São Paulo - SP" },
  { nome: "João Oliveira", cidade: "Rio de Janeiro - RJ" },
  { nome: "Maria Santos", cidade: "Belo Horizonte - MG" },
  { nome: "Pedro Costa", cidade: "Curitiba - PR" },
  { nome: "Júlia Almeida", cidade: "Salvador - BA" },
  { nome: "Lucas Ferreira", cidade: "Recife - PE" },
  { nome: "Beatriz Lima", cidade: "Porto Alegre - RS" },
  { nome: "Gabriel Rodrigues", cidade: "Fortaleza - CE" },
  { nome: "Larissa Martins", cidade: "Manaus - AM" },
  { nome: "Rafael Pereira", cidade: "Goiânia - GO" },
];

const problemasDeExemplo = [
  "Buraco na via pública",
  "Manutenção da iluminação",
  "Limpeza de área pública",
  "Reparo de calçada",
  "Coleta de resíduos",
];

function mapearUsuarioParaExemplo(usuario: UsuarioApi): Pedido {
  const indicePessoa = (usuario.id - 1) % pessoasBrasileiras.length;
  const pessoa = pessoasBrasileiras[indicePessoa];

  return {
    id: -usuario.id,
    nome: pessoa.nome,
    cpf: "Não informado",
    nivel: (usuario.id % 5) + 1,
    pedido: problemasDeExemplo[(usuario.id - 1) % problemasDeExemplo.length],
    cep: "Não informado",
    cidade: pessoa.cidade,
    status: "Em análise",
    exemplo: true,
  };
}

function paraPayload(pedido: Omit<Pedido, "id"> | Pedido) {
  return {
    title: "Pedido comunitário MyHood",
    description: `Registro de demonstração. Prioridade ${pedido.nivel}/5; status: ${pedido.status}.`,
    category: "solicitacao-comunitaria",
    rating: pedido.nivel,
  };
}

function mesclarPedidos(cache: CachePedidos): Pedido[] {
  const atualizadosPorId = new Map(
    cache.atualizados.map((pedido) => [pedido.id, pedido]),
  );
  const removidos = new Set(cache.removidos);
  return cache.criados
    .filter((pedido) => !removidos.has(pedido.id))
    .map((pedido) => atualizadosPorId.get(pedido.id) ?? pedido);
}

export async function getPedidos(): Promise<Pedido[]> {
  const [data, cache] = await Promise.all([
    requisitar<ListaUsuariosApi>(
      `${USERS_API_URL}?limit=${pessoasBrasileiras.length}`,
      undefined,
      isListaUsuariosApi,
    ),
    Promise.resolve().then(lerCache),
  ]);
  return [
    ...mesclarPedidos(cache),
    ...data.users.map(mapearUsuarioParaExemplo),
  ];
}

export async function createPedido(
  pedido: Omit<Pedido, "id">,
): Promise<Pedido> {
  await requisitar<ProdutoApi>(
    `${API_URL}/add`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paraPayload(pedido)),
    },
    isProdutoApi,
  );

  const cache = lerCache();
  const menorIdLocal = cache.criados.reduce(
    (menor, item) => Math.min(menor, item.id),
    0,
  );
  const criado: Pedido = {
    ...pedido,
    id: Math.min(-Date.now(), menorIdLocal - 1),
    apiId: PRODUTO_REFERENCIA_DEMO_ID,
  };
  salvarCache({
    ...cache,
    criados: [criado, ...cache.criados.filter((item) => item.id !== criado.id)],
  });
  return criado;
}

export async function updatePedido(
  id: number,
  dados: Partial<Pedido>,
): Promise<Pedido> {
  const cache = lerCache();
  let existente =
    cache.criados.find((pedido) => pedido.id === id) ??
    cache.atualizados.find((pedido) => pedido.id === id);

  if (!existente) {
    throw new Error("Pedido não encontrado.");
  }

  const atualizado = {
    ...existente,
    ...dados,
    id,
    apiId: existente.apiId ?? id,
  };
  await requisitar<ProdutoApi>(
    `${API_URL}/${atualizado.apiId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paraPayload(atualizado)),
    },
    isProdutoApi,
  );

  salvarCache({
    ...cache,
    criados: cache.criados.map((pedido) =>
      pedido.id === id ? atualizado : pedido,
    ),
    atualizados: [
      atualizado,
      ...cache.atualizados.filter((pedido) => pedido.id !== id),
    ],
  });
  return atualizado;
}

export async function deletePedido(id: number): Promise<void> {
  const cache = lerCache();
  const existente =
    cache.criados.find((pedido) => pedido.id === id) ??
    cache.atualizados.find((pedido) => pedido.id === id);
  if (!existente) throw new Error("Pedido não encontrado.");
  const apiId = existente.apiId ?? id;

  await requisitar<ProdutoApi>(
    `${API_URL}/${apiId}`,
    { method: "DELETE" },
    isProdutoApi,
  );

  salvarCache({
    criados: cache.criados.filter((pedido) => pedido.id !== id),
    atualizados: cache.atualizados.filter((pedido) => pedido.id !== id),
    removidos: [...new Set([...cache.removidos, id])],
  });
}
