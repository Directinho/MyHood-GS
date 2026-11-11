import type { Pedido } from "./Pedido";

const BASE_URL = "https://dummyjson.com";

function mapear(product: any): Pedido {
  return {
    id: product.id,
    nome: product.brand || "Não informado",
    cpf: product.sku || "000.000.000-00",
    nivel: Math.min(5, Math.max(1, Math.round(product.rating || 3))),
    pedido: product.title || product.description || "Sem Descrição",
    cep: product.meta?.barcode?.slice(0, 8) || "00000-000",
    cidade: product.category || "Não informado",
    status:
      product.stock > 50
        ? "Concluído"
        : product.stock > 20
          ? "Em andamento"
          : "Em análise",
  };
}
// Read
export async function getPedidos(): Promise<Pedido[]> {
  const response = await fetch(`${BASE_URL}?limit=30`);
  if (!response.ok) throw new Error("Erro na busca de pedidos");
  const data = await response.json();
  return data.products.map(mapear);
}
// Read ID
export async function getPedido(id: number): Promise<Pedido> {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error("Pedido não encontrado");
  const product = await response.json();
  return mapear(product);
}
// Create
export async function createPedido(
  pedido: Omit<Pedido, "id">,
): Promise<Pedido> {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: pedido.pedido,
      description: `Nome: ${pedido.nome} | CPF: ${pedido.cpf} | CEP: ${pedido.cep}`,
      brand: pedido.nome,
      category: pedido.cidade,
      rating: pedido.nivel,
      stock: pedido.status === "Concluído" ? 80 : 30,
    }),
  });

  if (!response.ok) throw new Error("Erro ao criar pedido");
  const product = await response.json();
  return mapear(product);
}
// Update
export async function updatePedido(
  id: number,
  pedido: Partial<Pedido>
): Promise<Pedido> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: pedido.pedido,
      brand: pedido.nome,
      category: pedido.cidade,
      rating: pedido.nivel,
      stock:
        pedido.status === "Concluído"
          ? 80
          : pedido.status === "Em andamento"
            ? 40
            : 10,
    }),
  });
  if (!response.ok) throw new Error("Erro na atualização de pedido");
  const product = await response.json();
  return mapear(product);
}
// Delete
export async function deletePedido(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar pedido");
}
