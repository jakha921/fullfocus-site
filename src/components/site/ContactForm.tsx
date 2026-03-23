"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, Input, Select, Textarea } from "@/components/ui";
import type { ContactFormData } from "@/types";

export function ContactForm() {
  const t = useTranslations("form");

  const serviceOptions = [
    { value: "", label: t("select_service") },
    { value: "ai-agents", label: t("service_ai") },
    { value: "automation", label: t("service_automation") },
    { value: "saas", label: t("service_saas") },
    { value: "integration", label: t("service_integration") },
    { value: "other", label: t("service_other") },
  ];

  const budgetOptions = [
    { value: "", label: t("select_budget") },
    { value: "small", label: t("budget_small") },
    { value: "medium", label: t("budget_medium") },
    { value: "large", label: t("budget_large") },
    { value: "enterprise", label: t("budget_enterprise") },
  ];

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    budget: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Send error");
      }

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        budget: "",
        message: "",
      });
    } catch (_err) {
      setError(t("error"));
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {t("success_title")}
        </h3>
        <p className="text-gray-400">
          {t("success_desc")}
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => setIsSuccess(false)}
        >
          {t("send_another")}
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={t("name_label")}
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t("name")}
          required
        />
        <Input
          label={t("email_label")}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email@example.com"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={t("phone_label")}
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+998 90 123 45 67"
        />
        <Select
          label={t("service_label")}
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          options={serviceOptions}
        />
      </div>

      <Select
        label={t("budget_label")}
        name="budget"
        value={formData.budget}
        onChange={handleChange}
        options={budgetOptions}
      />

      <Textarea
        label={t("message_label")}
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder={t("message_placeholder")}
        required
      />

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            {t("submitting")}
          </>
        ) : (
          <>
            {t("submit_btn")}
            <Send className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </form>
  );
}
