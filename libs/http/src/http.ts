export async function http<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(input, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  });

  // if (!res.ok) {
  //   const body = await res.text().catch(() => null)
  //
  //   throw new Error(res.status, res.statusText, {})
  // }

  const contentType = res.headers.get('content-type');

  if (!contentType?.includes('application/json')) {
    return undefined as T;
  }

  return (await res.json()) as Promise<T>;
}
