import ky from "ky";
// import { apiURL } from "../../variables";

export const api = () => {
  const API_PATH = import.meta.env.VITE_API_URL;

  if (!API_PATH) throw new Error("API credentials could not be found");
  return ky.create({
    prefixUrl: API_PATH,
    hooks: {
      afterResponse: [
        (_request, _options, response) => {
          if (response.status === 401) {
            localStorage.clear();
            window.location.reload();
          }
          return response;
        },
      ],
    },
  });
};
