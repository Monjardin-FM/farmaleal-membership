// import { ApiKey } from "../../variables";
import { api } from "../utils/api";
import { verifyResponse } from "../utils/check-response";

export const getCity = async (params) => {
  const response = await api().get("Catalogs/Municipio", {
    headers: {
      ApiKey: import.meta.env.VITE_API_KEY,
    },
    searchParams: {
      idEstado: params,
    },
  });
  const { body } = await verifyResponse({ response });
  const data = body.data.municipio;
  const municipios = data.map((municipio) => ({
    idMunicipio: municipio.idMunicipio,
    descripcion: municipio.descripcion,
  }));
  return municipios;
};
