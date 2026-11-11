import { useState, useEffect, useCallback } from "react";
import type { Pedido } from "../services/Pedido";
import {
  getPedidos,
  createPedido,
  updatePedido,
  deletePedido,
} from "../services/api";

export function usePedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPedidos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPedidos();
      setPedidos(data);
    } catch (err) {
      setError("Não foi possível carregar os pedidos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPedidos();
  }, [fetchPedidos]);

  // Create
  const adicionarPedido = async (novoPedido: Omit<Pedido, "id">) => {
    const criado = await createPedido(novoPedido);
    setPedidos((prev) => [criado, ...prev]);
    return criado;
  };
  // Update
  const editarPedido = async (id: number, dados: Partial<Pedido>) => {
    const atualizado = await updatePedido(id, dados);
    setPedidos((prev) => prev.map((p) => (p.id === id ? atualizado : p)));
    return atualizado;
  };

  // Delete
  const removerPedido = async (id: number) => {
    await deletePedido(id);
    setPedidos((prev) => prev.filter((p) => p.id));
  };
  return {
    pedidos,
    loading,
    error,
    adicionarPedido,
    editarPedido,
    removerPedido,
    refetch: fetchPedidos,
  };
}
