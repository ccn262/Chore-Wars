import { appUrl } from "@/lib/site";

export function normalizeInternalPath(
  path: string | null | undefined,
  fallback = "/home",
) {
  const trimmed = path?.trim();
  if (!trimmed) {
    return fallback;
  }

  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return fallback;
  }

  try {
    const candidate = new URL(trimmed, appUrl);
    const origin = new URL(appUrl).origin;
    if (candidate.origin !== origin) {
      return fallback;
    }

    if (/^\/invite\/undefined(?:[/?#]|$)/.test(candidate.pathname)) {
      return fallback;
    }

    return `${candidate.pathname}${candidate.search}${candidate.hash}` || fallback;
  } catch {
    return fallback;
  }
}

export function addInternalQueryParam(
  path: string,
  key: string,
  value: string,
) {
  const url = new URL(path, appUrl);
  url.searchParams.set(key, value);
  return `${url.pathname}${url.search}${url.hash}`;
}
