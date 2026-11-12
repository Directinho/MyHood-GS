export type StatusPedido = "Em análise" | "Em andamento" | "Concluído";

export interface Pedido {
  id: number;
  apiId?: number;
  nome: string;
  cpf: string;
  nivel: number;
  pedido: string;
  cep: string;
  cidade: string;
  status: StatusPedido;
}
