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
      const data = await getPedidos();
      setPedidos(data);
      setError(null);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar os pedidos.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    setLoading(true);
    await fetchPedidos();
  }, [fetchPedidos]);

  useEffect(() => {

    void fetchPedidos();
  }, [fetchPedidos]);

  const adicionarPedido = async (novoPedido: Omit<Pedido, "id">) => {
    const criado = await createPedido(novoPedido);
    setPedidos((prev) => [criado, ...prev]);
    return criado;
  };
  const editarPedido = async (id: number, dados: Partial<Pedido>) => {
    const atualizado = await updatePedido(id, dados);
    setPedidos((prev) =>
      prev.map((pedido) => (pedido.id === id ? atualizado : pedido)),
    );
    return atualizado;
  };

  const removerPedido = async (id: number) => {
    await deletePedido(id);
    setPedidos((prev) => prev.filter((pedido) => pedido.id !== id));
  };
  return {
    pedidos,
    loading,
    error,
    adicionarPedido,
    editarPedido,
    removerPedido,
    refetch,
  };
}
