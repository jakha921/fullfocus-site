export const siteUrl = "https://fullfocus.dev";

export const locales = ["en", "ru", "uz"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "uz";

export const localeNames: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  uz: "O'zbek",
};

export const localePrefixes: Record<Locale, string> = {
  uz: "",
  ru: "/ru",
  en: "/en",
};

export const localeAlternates: Record<Locale, string> = {
  uz: "uz-UZ",
  ru: "ru-UZ",
  en: "en-US",
};

export const openGraphLocales: Record<Locale, string> = {
  uz: "uz_UZ",
  ru: "ru_UZ",
  en: "en_US",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function normalizePath(path: string) {
  if (!path || path === "/") return "/";
  const pathname = path.startsWith("/") ? path : `/${path}`;
  return pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
}

export function stripLocaleFromPath(path: string) {
  const pathname = normalizePath(path);
  const [firstSegment] = pathname.slice(1).split("/");

  if (isLocale(firstSegment)) {
    const stripped = pathname.slice(firstSegment.length + 1) || "/";
    return {
      locale: firstSegment,
      path: normalizePath(stripped),
      hadLocalePrefix: true,
    };
  }

  return {
    locale: defaultLocale,
    path: pathname,
    hadLocalePrefix: false,
  };
}

export function localizedPath(path: string, locale: Locale) {
  const stripped = stripLocaleFromPath(path).path;
  if (locale === defaultLocale) return stripped;
  return normalizePath(`${localePrefixes[locale]}${stripped === "/" ? "" : stripped}`);
}

export function absoluteLocalizedUrl(path: string, locale: Locale) {
  return `${siteUrl}${localizedPath(path, locale)}`;
}

export function localizedAlternates(path: string) {
  return {
    [localeAlternates.uz]: absoluteLocalizedUrl(path, "uz"),
    [localeAlternates.ru]: absoluteLocalizedUrl(path, "ru"),
    [localeAlternates.en]: absoluteLocalizedUrl(path, "en"),
    "x-default": absoluteLocalizedUrl(path, defaultLocale),
  };
}
