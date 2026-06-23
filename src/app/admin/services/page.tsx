"use client";
export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Edit, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Card, Badge, Button, Input, Modal, Skeleton, Textarea } from "@/components/ui";
import { slugify } from "@/lib/utils";

type LocaleCode = "ru" | "en" | "uz";

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  translations: Record<string, { title?: string; description?: string; features?: string[] }> | null;
  isActive: boolean;
  order: number;
}

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  icon: "Bot",
  features: "",
  order: "0",
  isActive: true,
  enTitle: "",
  enDescription: "",
  enFeatures: "",
  uzTitle: "",
  uzDescription: "",
  uzFeatures: "",
};

const localeLabels: Record<LocaleCode, string> = {
  ru: "RU",
  en: "EN",
  uz: "UZ",
};

function lines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toTextarea(value: string[] | undefined) {
  return (value || []).join("\n");
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const countLabel = useMemo(() => `${services.length} услуг`, [services.length]);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      if (res.ok) setServices(await res.json());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEdit = (service: Service) => {
    const en = service.translations?.en || {};
    const uz = service.translations?.uz || {};
    setEditing(service);
    setForm({
      title: service.title,
      slug: service.slug,
      description: service.description,
      icon: service.icon,
      features: toTextarea(service.features),
      order: String(service.order),
      isActive: service.isActive,
      enTitle: en.title || "",
      enDescription: en.description || "",
      enFeatures: toTextarea(en.features),
      uzTitle: uz.title || "",
      uzDescription: uz.description || "",
      uzFeatures: toTextarea(uz.features),
    });
    setIsModalOpen(true);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;
    const checked = (event.target as HTMLInputElement).checked;
    setForm((prev) => {
      const next = { ...prev, [name]: type === "checkbox" ? checked : value };
      if (name === "title" && !prev.slug) next.slug = slugify(value);
      return next;
    });
  };

  const payload = () => {
    const features = lines(form.features);
    return {
      title: form.title.trim(),
      slug: form.slug.trim(),
      description: form.description.trim(),
      icon: form.icon.trim() || "Bot",
      features,
      order: Number(form.order) || 0,
      isActive: form.isActive,
      translations: {
        ru: {
          title: form.title.trim(),
          description: form.description.trim(),
          features,
        },
        en: {
          title: form.enTitle.trim() || form.title.trim(),
          description: form.enDescription.trim() || form.description.trim(),
          features: lines(form.enFeatures).length ? lines(form.enFeatures) : features,
        },
        uz: {
          title: form.uzTitle.trim() || form.title.trim(),
          description: form.uzDescription.trim() || form.description.trim(),
          features: lines(form.uzFeatures).length ? lines(form.uzFeatures) : features,
        },
      },
    };
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch(
        editing ? `/api/admin/services/${editing.id}` : "/api/admin/services",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload()),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка сохранения");
      toast.success(editing ? "Услуга обновлена" : "Услуга создана");
      setIsModalOpen(false);
      await fetchServices();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Ошибка сохранения");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить услугу?")) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Ошибка удаления");
      toast.success("Удалено");
      setServices((prev) => prev.filter((service) => service.id !== id));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Ошибка");
    }
  };

  const handleToggle = async (service: Service) => {
    try {
      const res = await fetch(`/api/admin/services/${service.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !service.isActive }),
      });
      if (!res.ok) throw new Error("Ошибка обновления");
      setServices((prev) =>
        prev.map((item) =>
          item.id === service.id ? { ...item, isActive: !item.isActive } : item
        )
      );
      toast.success(service.isActive ? "Скрыто" : "Опубликовано");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Ошибка");
    }
  };

  return (
    <>
      <AdminHeader title="Услуги" />
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between gap-4"
        >
          <p className="text-gray-400">{isLoading ? "..." : countLabel}</p>
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Новая услуга
          </Button>
        </motion.div>

        {isLoading ? (
          <Skeleton className="h-64" />
        ) : (
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Название</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Slug</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Иконка</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Локали</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Статус</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Порядок</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id} className="border-b border-white/8 last:border-0 hover:bg-white/5">
                      <td className="px-6 py-4">
                        <p className="font-medium text-white">{service.title}</p>
                        <p className="mt-1 line-clamp-1 text-xs text-gray-500">{service.description}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{service.slug}</td>
                      <td className="px-6 py-4 text-gray-400">{service.icon}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {(["ru", "en", "uz"] as LocaleCode[]).map((locale) => (
                            <span
                              key={locale}
                              className="rounded border border-white/10 px-1.5 py-0.5 text-xs text-gray-400"
                            >
                              {localeLabels[locale]}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={service.isActive ? "success" : "outline"}>
                          {service.isActive ? "Активна" : "Скрыта"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{service.order}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" onClick={() => handleToggle(service)}>
                            {service.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button size="sm" variant="secondary" onClick={() => openEdit(service)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="danger" onClick={() => handleDelete(service.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editing ? "Редактировать услугу" : "Новая услуга"}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Название RU *" name="title" value={form.title} onChange={handleChange} required />
            <Input label="Slug *" name="slug" value={form.slug} onChange={handleChange} required />
            <Input label="Иконка lucide" name="icon" value={form.icon} onChange={handleChange} placeholder="Bot, Workflow, Code2, Plug" />
            <Input label="Порядок" name="order" type="number" value={form.order} onChange={handleChange} />
          </div>
          <Textarea label="Описание RU *" name="description" value={form.description} onChange={handleChange} required />
          <Textarea label="Фичи RU, по одной строке" name="features" value={form.features} onChange={handleChange} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4 rounded-lg border border-white/8 p-4">
              <h3 className="font-semibold text-white">English</h3>
              <Input label="Title EN" name="enTitle" value={form.enTitle} onChange={handleChange} />
              <Textarea label="Description EN" name="enDescription" value={form.enDescription} onChange={handleChange} />
              <Textarea label="Features EN" name="enFeatures" value={form.enFeatures} onChange={handleChange} />
            </div>
            <div className="space-y-4 rounded-lg border border-white/8 p-4">
              <h3 className="font-semibold text-white">O&apos;zbek</h3>
              <Input label="Title UZ" name="uzTitle" value={form.uzTitle} onChange={handleChange} />
              <Textarea label="Description UZ" name="uzDescription" value={form.uzDescription} onChange={handleChange} />
              <Textarea label="Features UZ" name="uzFeatures" value={form.uzFeatures} onChange={handleChange} />
            </div>
          </div>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="h-5 w-5 rounded border-gray-600 bg-gray-800"
            />
            <span className="text-white">Показывать на сайте</span>
          </label>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Отмена
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Сохранение..." : "Сохранить"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
