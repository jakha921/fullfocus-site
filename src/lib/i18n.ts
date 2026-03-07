import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export const locales = ['en', 'ru', 'uz'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  uz: "O'zbek",
};

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('locale')?.value as Locale | undefined;
  const locale = localeCookie && locales.includes(localeCookie) ? localeCookie : defaultLocale;

  return {
    locale,
    messages: (await import(`../locales/${locale}/common.json`)).default,
  };
});
