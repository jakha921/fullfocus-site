"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Users,
  Wrench,
  DollarSign,
  Send,
  Loader2,
  Check,
  Gift,
  Code2,
  Handshake,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface AuctionFormData {
  // Step 1: Idea
  ideaName: string;
  problemDescription: string;
  // Step 2: Target audience
  targetAudience: string;
  marketSize: string;
  // Step 3: Solution
  solutionDescription: string;
  keyFeatures: string;
  // Step 4: Business model
  revenueModel: string;
  competitors: string;
  uniqueness: string;
  // Step 5: Contact
  name: string;
  email: string;
  telegram: string;
}

const initialFormData: AuctionFormData = {
  ideaName: "",
  problemDescription: "",
  targetAudience: "",
  marketSize: "",
  solutionDescription: "",
  keyFeatures: "",
  revenueModel: "",
  competitors: "",
  uniqueness: "",
  name: "",
  email: "",
  telegram: "",
};

const stepIcons = [Lightbulb, Users, Wrench, DollarSign, Send];

const marketSizeKeys = [
  "market_local",
  "market_national",
  "market_regional",
  "market_global",
] as const;

const revenueKeys = [
  "revenue_subscription",
  "revenue_commission",
  "revenue_freemium",
  "revenue_onetime",
  "revenue_ads",
  "revenue_marketplace",
  "revenue_undecided",
] as const;

export function IdeaAuctionSection() {
  const t = useTranslations("ideaauction");

  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<AuctionFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const steps = Array.from({ length: 5 }, (_, i) => ({
    number: i + 1,
    icon: stepIcons[i],
    title: t(`steps.${i}.title`),
    subtitle: t(`steps.${i}.subtitle`),
  }));

  const marketSizeOptions = marketSizeKeys.map((key) => t(`options.${key}`));
  const revenueOptions = revenueKeys.map((key) => t(`options.${key}`));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const canGoNext = (): boolean => {
    switch (currentStep) {
      case 0:
        return formData.ideaName.trim().length > 0 && formData.problemDescription.trim().length > 0;
      case 1:
        return formData.targetAudience.trim().length > 0;
      case 2:
        return formData.solutionDescription.trim().length > 0 && formData.keyFeatures.trim().length > 0;
      case 3:
        return formData.revenueModel.trim().length > 0 && formData.uniqueness.trim().length > 0;
      case 4:
        return formData.name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      const message = [
        `🏆 АУКЦИОН ИДЕЙ — Новая заявка`,
        ``,
        `📌 Идея: ${formData.ideaName}`,
        `❓ Проблема: ${formData.problemDescription}`,
        ``,
        `👥 Целевая аудитория: ${formData.targetAudience}`,
        `📊 Масштаб рынка: ${formData.marketSize || "Не указан"}`,
        ``,
        `💡 Решение: ${formData.solutionDescription}`,
        `⚙️ Ключевые фичи: ${formData.keyFeatures}`,
        ``,
        `💰 Модель монетизации: ${formData.revenueModel}`,
        `🏁 Конкуренты: ${formData.competitors || "Не указаны"}`,
        `✨ Уникальность: ${formData.uniqueness}`,
        ``,
        `📱 Telegram: ${formData.telegram || "Не указан"}`,
      ].join("\n");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message,
          source: "idea_auction",
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await res.json().catch(() => null);
        console.error("API error:", errorData);
        setError(
          errorData?.details
            ? errorData.details.map((d: { message: string }) => d.message).join(", ")
            : t("error_send")
        );
      }
    } catch {
      setError(t("error_send"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-green-500 focus:outline-none text-sm transition-colors";
  const textareaClass = `${inputClass} min-h-[100px] resize-none`;
  const labelClass = "block text-sm font-medium text-gray-300 mb-1.5";

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <label className={labelClass}>
                {t("fields.idea_name")}
              </label>
              <input
                type="text"
                name="ideaName"
                value={formData.ideaName}
                onChange={handleChange}
                placeholder={t("fields.idea_name_placeholder")}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                {t("fields.problem")}
              </label>
              <textarea
                name="problemDescription"
                value={formData.problemDescription}
                onChange={handleChange}
                placeholder={t("fields.problem_placeholder")}
                className={textareaClass}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className={labelClass}>
                {t("fields.target_audience")}
              </label>
              <textarea
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                placeholder={t("fields.target_audience_placeholder")}
                className={textareaClass}
              />
            </div>
            <div>
              <label className={labelClass}>{t("fields.market_size")}</label>
              <div className="grid grid-cols-2 gap-2">
                {marketSizeOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, marketSize: option }))
                    }
                    className={`px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                      formData.marketSize === option
                        ? "bg-green-500/20 border border-green-500/40 text-green-400"
                        : "bg-white/5 border border-white/10 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className={labelClass}>
                {t("fields.solution")}
              </label>
              <textarea
                name="solutionDescription"
                value={formData.solutionDescription}
                onChange={handleChange}
                placeholder={t("fields.solution_placeholder")}
                className={textareaClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                {t("fields.key_features")}
              </label>
              <textarea
                name="keyFeatures"
                value={formData.keyFeatures}
                onChange={handleChange}
                placeholder={t("fields.key_features_placeholder")}
                className={textareaClass}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className={labelClass}>
                {t("fields.revenue_model")}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {revenueOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, revenueModel: option }))
                    }
                    className={`px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                      formData.revenueModel === option
                        ? "bg-green-500/20 border border-green-500/40 text-green-400"
                        : "bg-white/5 border border-white/10 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass}>
                {t("fields.competitors")}
              </label>
              <input
                type="text"
                name="competitors"
                value={formData.competitors}
                onChange={handleChange}
                placeholder={t("fields.competitors_placeholder")}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                {t("fields.uniqueness")}
              </label>
              <textarea
                name="uniqueness"
                value={formData.uniqueness}
                onChange={handleChange}
                placeholder={t("fields.uniqueness_placeholder")}
                className={`${inputClass} min-h-[80px] resize-none`}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className={labelClass}>{t("fields.name")}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("fields.name_placeholder")}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>{t("fields.email")}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>{t("fields.telegram")}</label>
              <input
                type="text"
                name="telegram"
                value={formData.telegram}
                onChange={handleChange}
                placeholder="@username"
                className={inputClass}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Collapsed teaser card
  if (!isOpen) {
    return (
      <section className="pb-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setIsOpen(true)}
              className="w-full glass-card rounded-2xl p-8 md:p-10 text-left group hover:border-amber-500/20 transition-all duration-500 relative overflow-hidden"
            >
              {/* Accent glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all duration-500" />

              <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-7 h-7 text-amber-400" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold rounded-full">
                      {t("badge")}
                    </span>
                    <span className="text-xs text-gray-500">{t("limited")}</span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2">
                    {t("teaser_title")}{" "}
                    <span className="text-amber-400">{t("teaser_highlight")}</span>
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base">
                    {t("teaser_desc")}{" "}
                    <span className="text-white font-semibold">{t("teaser_desc_bold")}</span>{" "}
                    {t("teaser_desc_end")}
                  </p>
                </div>

                <div className="flex-shrink-0 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold rounded-lg text-sm group-hover:scale-[1.03] transition-transform">
                  {t("participate")}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Benefits row */}
              <div className="relative mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-4 md:gap-8 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-amber-400" />
                  {t("benefit_mvp")}
                </span>
                <span className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-green-400" />
                  {t("benefit_code")}
                </span>
                <span className="flex items-center gap-2">
                  <Handshake className="w-4 h-4 text-teal-400" />
                  {t("benefit_discuss")}
                </span>
              </div>
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  // Submitted state
  if (isSubmitted) {
    return (
      <section className="pb-12 relative">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-10 text-center relative overflow-hidden"
          >
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                {t("success_title")}
              </h3>
              <p className="text-gray-400 mb-2">
                {t("success_desc")}
              </p>
              <p className="text-gray-400 text-sm mb-6">
                {t("success_timeline")}{" "}
                <span className="text-white font-semibold">{t("success_timeline_bold")}</span>.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://t.me/fullfocusdev_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold rounded-lg text-sm hover:scale-[1.02] transition-transform"
                >
                  {t("success_telegram")}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setIsOpen(false);
                    setCurrentStep(0);
                    setFormData(initialFormData);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {t("success_close")}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Wizard form
  return (
    <section className="pb-12 relative">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl overflow-hidden relative"
        >
          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {t("wizard_title")}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {t("step_counter", { current: currentStep + 1, total: steps.length })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {t("collapse")}
              </button>
            </div>

            {/* Step indicators */}
            <div className="flex items-center gap-1">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="flex items-center flex-1">
                    <div
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-all ${
                        index === currentStep
                          ? "bg-amber-500/20 text-amber-400"
                          : index < currentStep
                            ? "bg-green-500/20 text-green-400"
                            : "text-gray-600"
                      }`}
                    >
                      {index < currentStep ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Icon className="w-3 h-3" />
                      )}
                      <span className="hidden sm:inline">{step.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-px mx-1 ${
                          index < currentStep ? "bg-green-500/40" : "bg-white/5"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step content */}
          <div className="px-8 py-6">
            <div className="mb-4">
              <h4 className="font-display font-semibold text-white mb-1">
                {steps[currentStep].subtitle}
              </h4>
              {currentStep === 0 && (
                <p className="text-xs text-gray-500">
                  {t("detail_hint")}
                </p>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {error && (
              <p className="text-red-400 text-sm mt-3">{error}</p>
            )}
          </div>

          {/* Navigation */}
          <div className="px-8 pb-8 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("nav_back")}
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep((s) => s + 1)}
                disabled={!canGoNext()}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold rounded-lg text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {t("nav_next")}
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canGoNext() || isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-black font-bold rounded-lg text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t("nav_submitting")}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    {t("nav_submit")}
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
