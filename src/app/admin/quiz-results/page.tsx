"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Gauge, Mail, Phone, Building, Eye, Trash2 } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Card, Badge, Button, Skeleton } from "@/components/ui";
import toast from "react-hot-toast";
import {
  labelAutomationArea,
  labelBudget,
  labelPainPoint,
  labelTimeline,
  labelTool,
  labelVolume,
  leadTemperatureLabels,
  parseAutomationAuditFeatures,
} from "@/lib/automation-audit";

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
  sales: "Продажи и лиды",
  support: "Поддержка клиентов",
  marketing: "Маркетинг",
  operations: "Операции и процессы",
  finance: "Финансы и документы",
  hr: "HR и найм",
  analytics: "Отчеты и аналитика",
  ecommerce: "E-commerce / интернет-магазин",
  website: "Корпоративный сайт",
  webapp: "Веб-приложение",
  mobile: "Мобильное приложение",
  erp: "ERP/CRM система",
  other: "Другое",
};

const budgetLabels: Record<string, { label: string; color: string }> = {
  starter: { label: "MVP / точечная автоматизация", color: "bg-blue-500" },
  growth: { label: "Несколько интеграций", color: "bg-emerald-500" },
  scale: { label: "Процесс отдела", color: "bg-yellow-500" },
  small: { label: "MVP / точечная задача", color: "bg-blue-500" },
  medium: { label: "Несколько интеграций", color: "bg-emerald-500" },
  large: { label: "Процесс отдела", color: "bg-yellow-500" },
  enterprise: { label: "Комплексная автоматизация", color: "bg-purple-500" },
  not_sure: { label: "Нужно оценить", color: "bg-gray-500" },
};

const timelineLabels: Record<string, string> = {
  urgent: "Нужно в течение месяца",
  normal: "1-3 месяца",
  relaxed: "3-6 месяцев",
  flexible: "Можно поэтапно",
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
    const audit = parseAutomationAuditFeatures(featuresJson);
    return audit.painPoints.map((item) => labelPainPoint(item)).join(", ") || featuresJson;
  };

  const selectedAudit = selectedResult
    ? parseAutomationAuditFeatures(selectedResult.features)
    : null;

  return (
    <>
      <AdminHeader title="AI-аудиты" />
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
                    className={`cursor-pointer transition-all hover:border-emerald-500/50 ${
                      selectedResult?.id === result.id ? "border-emerald-500" : ""
                    }`}
                    onClick={() => setSelectedResult(result)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-black font-bold text-sm">
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
                          {projectTypeLabels[result.projectType] || labelAutomationArea(result.projectType)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-emerald-400 font-semibold text-sm">
                          {result.estimateWeeksMin}-{result.estimateWeeksMax} недель
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
                        <Mail className="w-4 h-4 text-emerald-500" />
                        <a href={`mailto:${selectedResult.email}`} className="hover:text-white">
                          {selectedResult.email}
                        </a>
                      </div>
                      {selectedResult.phone && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <Phone className="w-4 h-4 text-emerald-500" />
                          <a href={`tel:${selectedResult.phone}`} className="hover:text-white">
                            {selectedResult.phone}
                          </a>
                        </div>
                      )}
                      {selectedResult.company && (
                        <div className="flex items-center gap-2 text-gray-400 col-span-2">
                          <Building className="w-4 h-4 text-emerald-500" />
                          {selectedResult.company}
                        </div>
                      )}
                    </div>

                    <hr className="border-white/8" />

                    {/* Project Details */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Фокус</span>
                        <span className="text-white">
                          {projectTypeLabels[selectedResult.projectType] || labelAutomationArea(selectedResult.projectType)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Масштаб</span>
                        <Badge className={budgetLabels[selectedResult.budget]?.color || "bg-gray-500"}>
                          {budgetLabels[selectedResult.budget]?.label || labelBudget(selectedResult.budget)}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Сроки</span>
                        <span className="text-white">
                          {timelineLabels[selectedResult.timeline] || labelTimeline(selectedResult.timeline)}
                        </span>
                      </div>

                      <div>
                        <span className="text-gray-400 block mb-1">Проблемы</span>
                        <p className="text-white text-sm">
                          {formatFeatures(selectedResult.features)}
                        </p>
                      </div>

                      {selectedAudit?.version === "automation-audit-v1" && (
                        <>
                          <div>
                            <span className="text-gray-400 block mb-1">Инструменты</span>
                            <p className="text-white text-sm">
                              {selectedAudit.tools.map((item) => labelTool(item)).join(", ")}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Объем</span>
                            <span className="text-white">
                              {labelVolume(selectedAudit.volume)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Lead score</span>
                            <span className="text-white">
                              {selectedAudit.leadScore || 0}/100
                              {selectedAudit.leadTemperature
                                ? ` · ${leadTemperatureLabels[selectedAudit.leadTemperature] || selectedAudit.leadTemperature}`
                                : ""}
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    <hr className="border-white/8" />

                    {/* Estimate */}
                    <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
                      <h3 className="text-emerald-400 font-semibold mb-3">Оценка автоматизации</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Gauge className="w-5 h-5 text-emerald-400" />
                          <div>
                            <p className="text-gray-400 text-xs">Масштаб</p>
                            <p className="text-white font-semibold">
                              {budgetLabels[selectedResult.budget]?.label || labelBudget(selectedResult.budget)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-emerald-400" />
                          <div>
                            <p className="text-gray-400 text-xs">Сроки</p>
                            <p className="text-white font-semibold">
                              {selectedResult.estimateWeeksMin}-{selectedResult.estimateWeeksMax} недель
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedAudit?.report && (
                      <div className="bg-white/5 rounded-lg p-4 border border-white/8">
                        <h3 className="text-white font-semibold mb-2">Mini-report</h3>
                        <p className="text-gray-300 text-sm leading-6 mb-3">
                          {selectedAudit.report.summary}
                        </p>
                        <div className="space-y-2">
                          {selectedAudit.report.quickWins.slice(0, 3).map((item) => (
                            <p key={item} className="text-gray-400 text-sm">
                              • {item}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                      <a
                        href={`mailto:${selectedResult.email}?subject=AI-аудит автоматизации&body=Здравствуйте, ${selectedResult.name}!%0D%0A%0D%0AСпасибо за интерес к FullFocus.%0D%0A%0D%0AПо вашему запросу:`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-lg transition-colors"
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
