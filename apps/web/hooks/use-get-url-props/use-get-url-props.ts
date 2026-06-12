'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function useGetUrlProps() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [urls, setUrls] = useState({ baseUrl: '', fullUrl: '' });

  useEffect(() => {
    const base = window.location.origin;
    const full = `${base}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

    setUrls({ baseUrl: base, fullUrl: full });
  }, [pathname, searchParams]);

  return urls;
}
