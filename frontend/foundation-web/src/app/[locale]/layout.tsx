import '@/styles/tailwind.css';
import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { routing } from '@/i18n/routing';
import getRequestConfig from '@/i18n/request';

export const metadata: Metadata = {
  title: {
    template: '%s - Xalorra',
    default: 'Xalorra - Lead with intelligence'
  }
};

// ✔ Tetap statik untuk semua locale yang didukung
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ✔ Perlu jika kontennya dinamis saat build
export const dynamic = 'force-dynamic';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

const config = await getRequestConfig({ requestLocale: Promise.resolve(locale) });

  return (
    <html lang={locale}>
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&display=swap"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="The Radiant Blog"
          href="/blog/feed.xml"
        />
      </head>
      <body className="text-gray-950 antialiased">
        <NextIntlClientProvider locale={locale} messages={config.messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
