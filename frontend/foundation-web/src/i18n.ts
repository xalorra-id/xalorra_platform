import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const selectedLocale = locale ?? 'en';
  const messages = (await import(`@/locales/${selectedLocale}.json`)).default;

  return {
    messages,
    locale: selectedLocale
  };
});
