import { api } from "../utils/api";
// import { ApiKey } from "../../variables";
import { verifyResponse } from "../utils/check-response";

export const confirmMembership = async (params) => {
  const response = await api().post("Membresia/Client", {
    headers: {
      ApiKey: import.meta.env.VITE_API_KEY,
    },
    json: params,
  });
  const { body } = await verifyResponse({ response });
  return body;
};
