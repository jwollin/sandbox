'use client';

import { usePathname, useSearchParams } from 'next/navigation';

export function useGetUrlProps() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const baseUrl = typeof window === 'undefined' ? '' : window.location.origin;
  const query = searchParams.toString();

  return {
    baseUrl,
    fullUrl: `${baseUrl}${pathname}${query ? `?${query}` : ''}`,
  };
}
