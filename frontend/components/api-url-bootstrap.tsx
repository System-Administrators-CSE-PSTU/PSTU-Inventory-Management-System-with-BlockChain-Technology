"use client"

import { rewriteConfiguredUrl } from "@/lib/api"

declare global {
  interface Window {
    __pstuFetchPatched?: boolean
  }
}

if (typeof window !== "undefined" && !window.__pstuFetchPatched) {
  const originalFetch = window.fetch.bind(window)

  const patchedFetch: typeof window.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    if (typeof input === "string") {
      return originalFetch(rewriteConfiguredUrl(input), init)
    }

    if (input instanceof URL) {
      return originalFetch(rewriteConfiguredUrl(input.toString()), init)
    }

    return originalFetch(input, init)
  }) as typeof window.fetch

  window.fetch = patchedFetch
  globalThis.fetch = patchedFetch
  window.__pstuFetchPatched = true
}

export function ApiUrlBootstrap() {
  return null
}