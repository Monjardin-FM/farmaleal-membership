import to from "await-to-js";
import { api } from "../utils/api";
import { ApiKey } from "../../variables";

export const createMembership = async (params) => {
  const fn = api().post("Membresia", {
    headers: {
      ApiKey: ApiKey,
    },
    json: params,
  });
  const [, response] = await to(fn);
  return !!response;
};
