"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Loader2 } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Card, Button, Input, Textarea } from "@/components/ui";
import toast from "react-hot-toast";

type LocaleCode = "ru" | "en" | "uz";

const localeLabels: Record<LocaleCode, string> = {
  ru: "Русский",
  en: "English",
  uz: "O'zbek",
};

const emptyContent = {
  heroBadge: "",
  heroTitleLine1: "",
  heroTitleLine2: "",
  heroTitleLine3: "",
  heroSubtitle: "",
  heroCta: "",
  heroSecondaryCta: "",
  ctaTitle: "",
  ctaSubtitle: "",
  ctaButton: "",
};

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    companyName: "",
    companyDescription: "",
    phone: "",
    email: "",
    address: "",
    telegram: "",
    github: "",
    linkedin: "",
    metaTitle: "",
    metaDescription: "",
    telegram_bot_token: "",
    telegram_chat_id: "",
    sticky_bar_enabled: "false",
    available_slots: "",
  });
  const [content, setContent] = useState<Record<LocaleCode, typeof emptyContent>>({
    ru: emptyContent,
    en: emptyContent,
    uz: emptyContent,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [settingsRes, blocksRes] = await Promise.all([
          fetch("/api/admin/settings"),
          fetch("/api/admin/content-blocks"),
        ]);
        if (settingsRes.ok) {
          const data = await settingsRes.json();
          setSettings((prev) => ({ ...prev, ...data }));
        }
        if (blocksRes.ok) {
          const blocks = await blocksRes.json();
          const next = {
            ru: { ...emptyContent },
            en: { ...emptyContent },
            uz: { ...emptyContent },
          };
          blocks.forEach((block: { key: string; locale: LocaleCode; payload: Record<string, string> }) => {
            if (!next[block.locale]) return;
            if (block.key === "home.hero") {
              next[block.locale] = {
                ...next[block.locale],
                heroBadge: block.payload.badge || "",
                heroTitleLine1: block.payload.titleLine1 || "",
                heroTitleLine2: block.payload.titleLine2 || "",
                heroTitleLine3: block.payload.titleLine3 || "",
                heroSubtitle: block.payload.subtitle || "",
                heroCta: block.payload.cta || "",
                heroSecondaryCta: block.payload.secondaryCta || "",
              };
            }
            if (block.key === "home.cta") {
              next[block.locale] = {
                ...next[block.locale],
                ctaTitle: block.payload.title || "",
                ctaSubtitle: block.payload.subtitle || "",
                ctaButton: block.payload.button || "",
              };
            }
          });
          setContent(next);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: prev[key as keyof typeof prev] === "true" ? "false" : "true",
    }));
  };

  const handleContentChange = (
    locale: LocaleCode,
    key: keyof typeof emptyContent,
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      [locale]: {
        ...prev[locale],
        [key]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const blocks = (["ru", "en", "uz"] as LocaleCode[]).flatMap((locale) => [
        {
          key: "home.hero",
          locale,
          payload: {
            badge: content[locale].heroBadge,
            titleLine1: content[locale].heroTitleLine1,
            titleLine2: content[locale].heroTitleLine2,
            titleLine3: content[locale].heroTitleLine3,
            subtitle: content[locale].heroSubtitle,
            cta: content[locale].heroCta,
            secondaryCta: content[locale].heroSecondaryCta,
          },
          isActive: true,
        },
        {
          key: "home.cta",
          locale,
          payload: {
            title: content[locale].ctaTitle,
            subtitle: content[locale].ctaSubtitle,
            button: content[locale].ctaButton,
          },
          isActive: true,
        },
      ]);
      const [settingsRes, blocksRes] = await Promise.all([
        fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
        }),
        fetch("/api/admin/content-blocks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blocks),
        }),
      ]);
      if (settingsRes.ok && blocksRes.ok) toast.success("Настройки сохранены");
      else toast.error("Ошибка");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading)
    return (
      <>
        <AdminHeader title="Настройки" />
        <div className="p-6">
          <div className="animate-pulse bg-gray-800 h-96 rounded-xl" />
        </div>
      </>
    );

  return (
    <>
      <AdminHeader title="Настройки" />
      <div className="p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <h2 className="text-lg font-semibold text-white mb-4">Информация о компании</h2>
                <div className="space-y-4">
                  <Input
                    label="Название компании"
                    name="companyName"
                    value={settings.companyName}
                    onChange={handleChange}
                  />
                  <Textarea
                    label="Описание"
                    name="companyDescription"
                    value={settings.companyDescription}
                    onChange={handleChange}
                  />
                  <Input label="Телефон" name="phone" value={settings.phone} onChange={handleChange} />
                  <Input label="Email" name="email" value={settings.email} onChange={handleChange} />
                  <Input label="Адрес" name="address" value={settings.address} onChange={handleChange} />
                </div>
                </Card>
                <Card>
                  <h2 className="text-lg font-semibold text-white mb-4">Контент главной</h2>
                  <div className="space-y-6">
                    {(["ru", "en", "uz"] as LocaleCode[]).map((locale) => (
                      <div key={locale} className="space-y-4 rounded-lg border border-white/8 p-4">
                        <h3 className="font-semibold text-white">{localeLabels[locale]}</h3>
                        <Input
                          label="Hero badge"
                          value={content[locale].heroBadge}
                          onChange={(e) => handleContentChange(locale, "heroBadge", e.target.value)}
                        />
                        <div className="grid md:grid-cols-3 gap-3">
                          <Input
                            label="Hero line 1"
                            value={content[locale].heroTitleLine1}
                            onChange={(e) => handleContentChange(locale, "heroTitleLine1", e.target.value)}
                          />
                          <Input
                            label="Hero line 2"
                            value={content[locale].heroTitleLine2}
                            onChange={(e) => handleContentChange(locale, "heroTitleLine2", e.target.value)}
                          />
                          <Input
                            label="Hero line 3"
                            value={content[locale].heroTitleLine3}
                            onChange={(e) => handleContentChange(locale, "heroTitleLine3", e.target.value)}
                          />
                        </div>
                        <Textarea
                          label="Hero subtitle"
                          value={content[locale].heroSubtitle}
                          onChange={(e) => handleContentChange(locale, "heroSubtitle", e.target.value)}
                        />
                        <div className="grid md:grid-cols-2 gap-3">
                          <Input
                            label="Hero CTA"
                            value={content[locale].heroCta}
                            onChange={(e) => handleContentChange(locale, "heroCta", e.target.value)}
                          />
                          <Input
                            label="Secondary CTA"
                            value={content[locale].heroSecondaryCta}
                            onChange={(e) => handleContentChange(locale, "heroSecondaryCta", e.target.value)}
                          />
                        </div>
                        <Input
                          label="CTA title"
                          value={content[locale].ctaTitle}
                          onChange={(e) => handleContentChange(locale, "ctaTitle", e.target.value)}
                        />
                        <Textarea
                          label="CTA subtitle"
                          value={content[locale].ctaSubtitle}
                          onChange={(e) => handleContentChange(locale, "ctaSubtitle", e.target.value)}
                        />
                        <Input
                          label="CTA button"
                          value={content[locale].ctaButton}
                          onChange={(e) => handleContentChange(locale, "ctaButton", e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              <div className="space-y-6">
                <Card>
                  <h2 className="text-lg font-semibold text-white mb-4">Социальные сети</h2>
                  <div className="space-y-4">
                    <Input label="Telegram" name="telegram" value={settings.telegram} onChange={handleChange} />
                    <Input label="GitHub" name="github" value={settings.github} onChange={handleChange} />
                    <Input label="LinkedIn" name="linkedin" value={settings.linkedin} onChange={handleChange} />
                  </div>
                </Card>
                <Card>
                  <h2 className="text-lg font-semibold text-white mb-4">SEO</h2>
                  <div className="space-y-4">
                    <Input label="Meta Title" name="metaTitle" value={settings.metaTitle} onChange={handleChange} />
                    <Textarea
                      label="Meta Description"
                      name="metaDescription"
                      value={settings.metaDescription}
                      onChange={handleChange}
                    />
                  </div>
                </Card>
                <Card>
                  <h2 className="font-display text-lg font-semibold text-white mb-1">
                    Telegram уведомления
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Уведомления при новых заявках на @fullfocusdev_bot
                  </p>
                  <div className="space-y-4">
                    <Input
                      label="Bot Token"
                      name="telegram_bot_token"
                      type="password"
                      value={settings.telegram_bot_token}
                      onChange={handleChange}
                      placeholder="1234567890:AAF..."
                    />
                    <Input
                      label="Chat ID"
                      name="telegram_chat_id"
                      value={settings.telegram_chat_id}
                      onChange={handleChange}
                      placeholder="-1001234567890"
                    />
                  </div>
                </Card>
                <Card>
                  <h2 className="font-display text-lg font-semibold text-white mb-1">Sticky Bar</h2>
                  <p className="text-sm text-gray-500 mb-4">Срочный баннер снизу страницы</p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Включить Sticky Bar</span>
                      <button
                        type="button"
                        onClick={() => handleToggle("sticky_bar_enabled")}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          settings.sticky_bar_enabled === "true" ? "bg-emerald-500" : "bg-gray-700"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            settings.sticky_bar_enabled === "true" ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                    <Input
                      label="Количество мест"
                      name="available_slots"
                      type="number"
                      value={settings.available_slots}
                      onChange={handleChange}
                      placeholder="3"
                    />
                  </div>
                </Card>
                <Button type="submit" className="w-full" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Сохранение...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Сохранить
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}
