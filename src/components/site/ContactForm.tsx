"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { Button, Input, Select, Textarea } from "@/components/ui";
import type { ContactFormData } from "@/types";

const serviceOptions = [
  { value: "", label: "Выберите услугу" },
  { value: "web", label: "Веб-разработка" },
  { value: "mobile", label: "Мобильные приложения" },
  { value: "design", label: "UI/UX Дизайн" },
  { value: "erp", label: "ERP/CRM системы" },
  { value: "other", label: "Другое" },
];

const budgetOptions = [
  { value: "", label: "Выберите бюджет" },
  { value: "small", label: "до $5,000" },
  { value: "medium", label: "$5,000 - $15,000" },
  { value: "large", label: "$15,000 - $50,000" },
  { value: "enterprise", label: "более $50,000" },
];

export function ContactForm() {
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
        throw new Error("Ошибка отправки");
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
      setError("Произошла ошибка. Попробуйте ещё раз.");
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
          Заявка отправлена!
        </h3>
        <p className="text-gray-400">
          Мы свяжемся с вами в ближайшее время
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => setIsSuccess(false)}
        >
          Отправить ещё заявку
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Имя *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ваше имя"
          required
        />
        <Input
          label="Email *"
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
          label="Телефон"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+998 90 123 45 67"
        />
        <Select
          label="Тип услуги"
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          options={serviceOptions}
        />
      </div>

      <Select
        label="Бюджет"
        name="budget"
        value={formData.budget}
        onChange={handleChange}
        options={budgetOptions}
      />

      <Textarea
        label="Описание проекта *"
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Расскажите о вашем проекте, целях и сроках..."
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
            Отправка...
          </>
        ) : (
          <>
            Отправить заявку
            <Send className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </form>
  );
}
