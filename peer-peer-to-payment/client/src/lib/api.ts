const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public messages: string[] = [message],
  ) {
    super(message);
  }
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    // Send the httpOnly auth cookie with every request.
    credentials: "include",
    headers: { "Content-Type": "application/json", ...init?.headers },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    // Nest validation errors come back as an array of messages.
    const messages: string[] = Array.isArray(body?.message)
      ? body.message
      : [body?.message ?? res.statusText];
    throw new ApiError(res.status, messages[0], messages);
  }

  return res.status === 204 ? (undefined as T) : res.json();
}
