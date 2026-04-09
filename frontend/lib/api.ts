function normalizeBaseUrl(value?: string) {
  return (value || "").replace(/\/+$/, "")
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export const FRONTEND_URL = normalizeBaseUrl(process.env.FRONTEND_URL)
export const API_BASE_URL = normalizeBaseUrl(process.env.BACKEND_URL)

export function apiUrl(path: string) {
  if (!API_BASE_URL) {
    throw new Error("Missing BACKEND_URL in frontend env")
  }

  return `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`
}

export function frontendUrl(path: string) {
  if (!FRONTEND_URL) {
    throw new Error("Missing FRONTEND_URL in frontend env")
  }

  return `${FRONTEND_URL}${path.startsWith("/") ? "" : "/"}${path}`
}

export function rewriteConfiguredUrl(input: string) {
  let rewritten = input

  return rewritten
}