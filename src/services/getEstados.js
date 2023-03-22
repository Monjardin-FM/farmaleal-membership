import { api } from "../utils/api";
import { ApiKey } from "../../variables";
import { verifyResponse } from "../utils/check-response";

export const getEstados = async () => {
  const response = await api().get("Catalogs/Estado", {
    headers: {
      ApiKey: ApiKey,
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
