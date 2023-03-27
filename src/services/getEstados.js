import { api } from "../utils/api";
import { verifyResponse } from "../utils/check-response";

export const getEstados = async () => {
  const response = await api().get("Catalogs/Estado", {
    headers: {
      ApiKey: import.meta.env.VITE_API_KEY,
    },
  });

  const { body } = await verifyResponse({ response });
  const data = body.data.estado;
  const estados = data.map((estado) => ({
    idEstado: estado.idEstado,
    descripcion: estado.descripcion,
  }));
  return estados;
};
