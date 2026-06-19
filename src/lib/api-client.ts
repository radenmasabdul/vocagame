const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function apiClient<T>( endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Request failed");
  }

  return res.json();
}