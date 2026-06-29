/**
 * Central API client for the web app. Per project convention, ALL backend calls
 * go through this module — no scattered fetch/axios calls in components.
 *
 * This is a typed stub for now. No real network calls are made until a step that
 * explicitly wires up the backend. Endpoints will be added method-by-method.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export interface ApiRequestOptions extends RequestInit {
  /** Path relative to API_BASE_URL, e.g. "/events/". */
  path: string;
}

/**
 * Thin typed wrapper around fetch. Intentionally unused until backend wiring;
 * exists so the convention and base URL handling live in one place.
 */
export async function apiRequest<T>({ path, ...init }: ApiRequestOptions): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as T;
}
