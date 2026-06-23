
"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Card, Button, Input, Select, Textarea } from "@/components/ui";
import { slugify } from "@/lib/utils";
import toast from "react-hot-toast";

const categoryOptions = [
  { value: "web", label: "Веб-разработка" },
  { value: "mobile", label: "Мобильные приложения" },
  { value: "design", label: "UI/UX Дизайн" },
  { value: "erp", label: "ERP/CRM системы" },
];

export default function NewProjectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    shortDesc: "",
    category: "web",
    client: "",
    technologies: "",
    coverImage: "",
    link: "",
    order: "0",
    featured: false,
    isActive: true,
    enTitle: "",
    enShortDesc: "",
    enDescription: "",
    enCategory: "",
    uzTitle: "",
    uzShortDesc: "",
    uzDescription: "",
    uzCategory: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Auto-generate slug from title
    if (name === "title" && !formData.slug) {
      setFormData((prev) => ({
        ...prev,
        slug: slugify(value),
      }));
    }
  };

  const setField = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean),
          images: formData.coverImage ? [formData.coverImage] : [],
          order: Number(formData.order) || 0,
          translations: {
            ru: {
              title: formData.title,
              shortDesc: formData.shortDesc,
              description: formData.description,
              category: formData.category,
            },
            en: {
              title: formData.enTitle || formData.title,
              shortDesc: formData.enShortDesc || formData.shortDesc,
              description: formData.enDescription || formData.description,
              category: formData.enCategory || formData.category,
            },
            uz: {
              title: formData.uzTitle || formData.title,
              shortDesc: formData.uzShortDesc || formData.shortDesc,
              description: formData.uzDescription || formData.description,
              category: formData.uzCategory || formData.category,
            },
          },
        }),
      });

      if (res.ok) {
        toast.success("Проект создан");
        router.push("/admin/projects");
      } else {
        const error = await res.json();
        toast.error(error.error || "Ошибка создания");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AdminHeader title="Новый проект" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к проектам
          </Link>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main fields */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Основная информация
                  </h2>

                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Название *"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        label="Slug *"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Input
                      label="Краткое описание"
                      name="shortDesc"
                      value={formData.shortDesc}
                      onChange={handleChange}
                      placeholder="Для карточки проекта"
                    />

                    <Textarea
                      label="Полное описание *"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className="min-h-[200px]"
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <Select
                        label="Категория *"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        options={categoryOptions}
                      />
                      <Input
                        label="Клиент"
                        name="client"
                        value={formData.client}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </Card>

                <Card>
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Технологии и ссылки
                  </h2>

                  <div className="space-y-4">
                    <Input
                      label="Технологии (через запятую)"
                      name="technologies"
                      value={formData.technologies}
                      onChange={handleChange}
                      placeholder="React, Node.js, PostgreSQL"
                    />

                    <Input
                      label="Ссылка на проект"
                      name="link"
                      type="url"
                      value={formData.link}
                      onChange={handleChange}
                      placeholder="https://..."
                    />

                    <Input
                      label="URL обложки *"
                      name="coverImage"
                      value={formData.coverImage}
                      onChange={handleChange}
                      placeholder="/images/project.jpg"
                      required
                    />
                    <ImageUploadField
                      label="Загрузить обложку"
                      name="coverImage"
                      value={formData.coverImage}
                      onChange={setField}
                      placeholder="/uploads/project.jpg"
                    />
                  </div>
                </Card>

                <Card>
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Переводы для сайта
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-4 rounded-lg border border-white/8 p-4">
                      <h3 className="font-semibold text-white">English</h3>
                      <Input label="Title EN" name="enTitle" value={formData.enTitle} onChange={handleChange} />
                      <Input label="Short description EN" name="enShortDesc" value={formData.enShortDesc} onChange={handleChange} />
                      <Input label="Category EN" name="enCategory" value={formData.enCategory} onChange={handleChange} />
                      <Textarea label="Description EN" name="enDescription" value={formData.enDescription} onChange={handleChange} />
                    </div>
                    <div className="space-y-4 rounded-lg border border-white/8 p-4">
                      <h3 className="font-semibold text-white">O&apos;zbek</h3>
                      <Input label="Title UZ" name="uzTitle" value={formData.uzTitle} onChange={handleChange} />
                      <Input label="Short description UZ" name="uzShortDesc" value={formData.uzShortDesc} onChange={handleChange} />
                      <Input label="Category UZ" name="uzCategory" value={formData.uzCategory} onChange={handleChange} />
                      <Textarea label="Description UZ" name="uzDescription" value={formData.uzDescription} onChange={handleChange} />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Настройки
                  </h2>

                  <div className="space-y-4">
                    <Input
                      label="Порядок"
                      name="order"
                      type="number"
                      value={formData.order}
                      onChange={handleChange}
                    />

                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleChange}
                        className="w-5 h-5 bg-gray-800 border-gray-600 rounded"
                      />
                      <span className="text-white">Избранный проект</span>
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                        className="w-5 h-5 bg-gray-800 border-gray-600 rounded"
                      />
                      <span className="text-white">Опубликован</span>
                    </label>
                  </div>

                  <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Создание...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Создать проект
                      </>
                    )}
                  </Button>
                </Card>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}
