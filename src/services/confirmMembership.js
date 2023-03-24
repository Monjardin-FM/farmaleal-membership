import to from "await-to-js";
import { api } from "../utils/api";
import { ApiKey } from "../../variables";
import { verifyResponse } from "../utils/check-response";

export const confirmMembership = async (params) => {
  const response = await api().post("Membresia/Client", {
    headers: {
      ApiKey: ApiKey,
    },
    json: params,
  });
  const res = await verifyResponse({ response });
  return res.body;
};
