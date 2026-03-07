"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, DollarSign, Clock, Mail, Phone, Building, Eye, Trash2 } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Card, Badge, Button, Skeleton } from "@/components/ui";
import toast from "react-hot-toast";

interface QuizResult {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  projectType: string;
  budget: string;
  timeline: string;
  features: string;
  estimateMin: number;
  estimateMax: number;
  estimateWeeksMin: number;
  estimateWeeksMax: number;
  createdAt: string;
}

const projectTypeLabels: Record<string, string> = {
  website: "Корпоративный сайт",
  webapp: "Веб-приложение",
  mobile: "Мобильное приложение",
  ecommerce: "Интернет-магазин",
  erp: "ERP/CRM система",
  other: "Другое",
};

const budgetLabels: Record<string, { label: string; color: string }> = {
  small: { label: "До $5,000", color: "bg-blue-500" },
  medium: { label: "$5,000 - $15,000", color: "bg-green-500" },
  large: { label: "$15,000 - $50,000", color: "bg-yellow-500" },
  enterprise: { label: "$50,000+", color: "bg-purple-500" },
  not_sure: { label: "Не определён", color: "bg-gray-500" },
};

const timelineLabels: Record<string, string> = {
  urgent: "Срочно (1 месяц)",
  normal: "1-3 месяца",
  relaxed: "3-6 месяцев",
  flexible: "Гибкие сроки",
};

export default function QuizResultsPage() {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch("/api/admin/quiz-results");
        if (res.ok) setResults(await res.json());
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить результат опроса?")) return;
    try {
      const res = await fetch(`/api/admin/quiz-results/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Удалено");
        setResults(results.filter((r) => r.id !== id));
        setSelectedResult(null);
      }
    } catch {
      toast.error("Ошибка");
    }
  };

  const formatFeatures = (featuresJson: string) => {
    try {
      const arr = JSON.parse(featuresJson);
      const labels: Record<string, string> = {
        auth: "Авторизация",
        payment: "Платежи",
        admin: "Админ-панель",
        api: "API интеграция",
        analytics: "Аналитика",
        multilang: "Многоязычность",
      };
      return arr.map((f: string) => labels[f] || f).join(", ");
    } catch {
      return featuresJson;
    }
  };

  return (
    <>
      <AdminHeader title="Результаты опроса" />
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <p className="text-gray-400">
            {isLoading ? "..." : `${results.length} ответов`}
          </p>
        </motion.div>

        {isLoading ? (
          <Skeleton className="h-64" />
        ) : results.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-400">Пока нет результатов опроса</p>
          </Card>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {/* List */}
            <div className="space-y-3">
              {results.map((result) => {
                const budget = budgetLabels[result.budget] || budgetLabels.not_sure;
                return (
                  <Card
                    key={result.id}
                    className={`cursor-pointer transition-all hover:border-green-500/50 ${
                      selectedResult?.id === result.id ? "border-green-500" : ""
                    }`}
                    onClick={() => setSelectedResult(result)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-black font-bold text-sm">
                        {result.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-semibold truncate">
                            {result.name}
                          </h3>
                          <span className={`px-2 py-0.5 rounded text-xs text-white ${budget.color}`}>
                            {budget.label}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm truncate">{result.email}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          {projectTypeLabels[result.projectType] || result.projectType}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-semibold text-sm">
                          ${result.estimateMin.toLocaleString()} - ${result.estimateMax.toLocaleString()}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {new Date(result.createdAt).toLocaleDateString("ru-RU")}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Detail View */}
            <div className="lg:sticky lg:top-20 lg:self-start">
              {selectedResult ? (
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Детали</h2>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(selectedResult.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {/* Contact Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Mail className="w-4 h-4 text-green-500" />
                        <a href={`mailto:${selectedResult.email}`} className="hover:text-white">
                          {selectedResult.email}
                        </a>
                      </div>
                      {selectedResult.phone && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <Phone className="w-4 h-4 text-green-500" />
                          <a href={`tel:${selectedResult.phone}`} className="hover:text-white">
                            {selectedResult.phone}
                          </a>
                        </div>
                      )}
                      {selectedResult.company && (
                        <div className="flex items-center gap-2 text-gray-400 col-span-2">
                          <Building className="w-4 h-4 text-green-500" />
                          {selectedResult.company}
                        </div>
                      )}
                    </div>

                    <hr className="border-white/8" />

                    {/* Project Details */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Тип проекта</span>
                        <span className="text-white">
                          {projectTypeLabels[selectedResult.projectType] || selectedResult.projectType}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Бюджет</span>
                        <Badge className={budgetLabels[selectedResult.budget]?.color || "bg-gray-500"}>
                          {budgetLabels[selectedResult.budget]?.label || selectedResult.budget}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Сроки</span>
                        <span className="text-white">
                          {timelineLabels[selectedResult.timeline] || selectedResult.timeline}
                        </span>
                      </div>

                      <div>
                        <span className="text-gray-400 block mb-1">Функционал</span>
                        <p className="text-white text-sm">
                          {formatFeatures(selectedResult.features)}
                        </p>
                      </div>
                    </div>

                    <hr className="border-white/8" />

                    {/* Estimate */}
                    <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                      <h3 className="text-green-400 font-semibold mb-3">Оценка проекта</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-400" />
                          <div>
                            <p className="text-gray-400 text-xs">Бюджет</p>
                            <p className="text-white font-semibold">
                              ${selectedResult.estimateMin.toLocaleString()} - ${selectedResult.estimateMax.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-green-400" />
                          <div>
                            <p className="text-gray-400 text-xs">Сроки</p>
                            <p className="text-white font-semibold">
                              {selectedResult.estimateWeeksMin}-{selectedResult.estimateWeeksMax} недель
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                      <a
                        href={`mailto:${selectedResult.email}?subject=Ответ по проекту&body=Здравствуйте, ${selectedResult.name}!%0D%0A%0D%0AСпасибо за интерес к FullFocus.%0D%0A%0D%0AПо вашему запросу:`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        Написать Email
                      </a>
                      {selectedResult.phone && (
                        <a
                          href={`https://t.me/${selectedResult.phone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg border border-white/8 transition-colors"
                        >
                          Telegram
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="p-12 text-center">
                  <Eye className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Выберите результат для просмотра</p>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
