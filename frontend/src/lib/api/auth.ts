import { api } from "./axios-client";

export async function login(email: string, password: string): Promise<string> {
  const response = await api({
    method: "post",
    url: "/auth/login",
    data: { email, password },
  });

  return response.data;
}

export async function register(email: string, password: string) {
  const response = await api({
    method: "post",
    url: "/auth/register",
    data: { email, password },
  });

  return response.data;
}
