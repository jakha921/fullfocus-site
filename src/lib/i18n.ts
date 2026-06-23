import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import {
  defaultLocale,
  isLocale,
  localeNames,
  locales,
  type Locale,
} from "@/lib/routing";

export { defaultLocale, localeNames, locales, type Locale };

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headerStore = headers();
  const localeHeader = headerStore.get("x-fullfocus-locale");
  const localeCookie = cookieStore.get('locale')?.value as Locale | undefined;
  const locale = isLocale(localeHeader)
    ? localeHeader
    : localeCookie && locales.includes(localeCookie)
      ? localeCookie
      : defaultLocale;

  return {
    locale,
    messages: (await import(`../locales/${locale}/common.json`)).default,
  };
});
