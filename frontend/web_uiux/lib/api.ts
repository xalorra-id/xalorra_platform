// lib/api.ts
import { getToken } from "./auth";

export const fetchWithAuth = async (url: string, options = {}) => {
  const token = getToken();

  return fetch(url, {
    ...options,
    headers: {
      ...(options as any).headers,
      Authorization: `Bearer ${token}`,
    },
  });
};
