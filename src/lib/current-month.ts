const localeMap: Record<string, string> = {
  uz: "uz-UZ",
  ru: "ru-RU",
  en: "en-US",
};

export function getCurrentMonthName(locale: string) {
  const intlLocale = localeMap[locale] || localeMap.uz;

  const monthName = new Intl.DateTimeFormat(intlLocale, {
    month: "long",
    timeZone: "Asia/Samarkand",
  }).format(new Date());

  return locale === "en" ? monthName : monthName.toLocaleLowerCase(intlLocale);
}
