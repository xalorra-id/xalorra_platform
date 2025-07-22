'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import type { ChangeEvent } from 'react';

const locales = ['en', 'id'];

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    router.push(segments.join('/'));
  };

  return (
    <select onChange={handleChange} value={locale} className="p-1 rounded border">
      {locales.map((loc) => (
        <option key={loc} value={loc}>
          {loc === 'en' ? 'English' : 'Bahasa Indonesia'}
        </option>
      ))}
    </select>
  );
}
