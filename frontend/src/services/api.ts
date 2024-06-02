import axios from "axios";
import { Cookies } from "./cookies";

const api = axios.create({
  baseURL: process.env.API_Url,
});

api.interceptors.request.use(
  async (config:any) => {
    const { get, remove } = new Cookies();
    const token = await get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Faça algo com erros de requisição
    return Promise.reject(error);
  }
);

// Adiciona um interceptor para respostas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Faça algo com erros de resposta
    if (error.response.status === 401) {
      const currentUrl = error.response.config.url;
      const loginRoute = "/user/login";
      if (currentUrl === loginRoute) {
        // Não faça o redirecionamento se o erro for na rota de login
        return Promise.reject(error);
      } else {
        const { get, remove } = new Cookies();
        await remove();
        window.location.href = "/auth";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export { api };
