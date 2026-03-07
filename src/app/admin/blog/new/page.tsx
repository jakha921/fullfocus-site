
"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Card, Button, Input, Textarea } from "@/components/ui";
import { slugify } from "@/lib/utils";
import toast from "react-hot-toast";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    authorName: "FullFocus",
    coverImage: "",
    isPublished: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (name === "title" && !formData.slug) {
      setFormData((prev) => ({ ...prev, slug: slugify(value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        toast.success("Статья создана");
        router.push("/admin/blog");
      } else {
        toast.error("Ошибка");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AdminHeader title="Новая статья" />
      <div className="p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/admin/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" />Назад к блогу
          </Link>
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <h2 className="text-lg font-semibold text-white mb-4">Основная информация</h2>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input label="Заголовок *" name="title" value={formData.title} onChange={handleChange} required />
                      <Input label="Slug *" name="slug" value={formData.slug} onChange={handleChange} required />
                    </div>
                    <Textarea label="Краткое описание *" name="excerpt" value={formData.excerpt} onChange={handleChange} required />
                    <Textarea label="Содержание *" name="content" value={formData.content} onChange={handleChange} required className="min-h-[300px]" />
                  </div>
                </Card>
              </div>
              <div className="space-y-6">
                <Card>
                  <h2 className="text-lg font-semibold text-white mb-4">Настройки</h2>
                  <div className="space-y-4">
                    <Input label="Категория" name="category" value={formData.category} onChange={handleChange} />
                    <Input label="Теги (через запятую)" name="tags" value={formData.tags} onChange={handleChange} />
                    <Input label="Автор" name="authorName" value={formData.authorName} onChange={handleChange} />
                    <Input label="URL обложки" name="coverImage" value={formData.coverImage} onChange={handleChange} />
                    <label className="flex items-center gap-3">
                      <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} className="w-5 h-5 bg-gray-800 border-gray-600 rounded" />
                      <span className="text-white">Опубликовать</span>
                    </label>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Создание...</> : <><Save className="w-4 h-4 mr-2" />Создать</>}</Button>
                  </div>
                </Card>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}
