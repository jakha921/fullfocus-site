
"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
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
    featured: false,
    isActive: true,
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
