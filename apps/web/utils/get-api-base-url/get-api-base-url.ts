const DEFAULT_NODE_API_URL = 'http://localhost:8080';

export function getNodeApiBaseUrl() {
  return (
    process.env.NODE_API_URL ??
    process.env.NEXT_PUBLIC_NODE_API_URL ??
    DEFAULT_NODE_API_URL
  ).replace(/\/$/, '');
}
