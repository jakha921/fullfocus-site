"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit, Eye, EyeOff, Plus, Star, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Card, Badge, Button, Input, Modal, Skeleton, Textarea } from "@/components/ui";

interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  position: string | null;
  content: string;
  avatar: string | null;
  rating: number;
  translations: Record<string, { position?: string; content?: string }> | null;
  isActive: boolean;
  order: number;
}

const emptyForm = {
  clientName: "",
  company: "",
  position: "",
  content: "",
  avatar: "",
  rating: "5",
  order: "0",
  isActive: true,
  enPosition: "",
  enContent: "",
  uzPosition: "",
  uzContent: "",
};

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      if (res.ok) setTestimonials(await res.json());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEdit = (testimonial: Testimonial) => {
    const en = testimonial.translations?.en || {};
    const uz = testimonial.translations?.uz || {};
    setEditing(testimonial);
    setForm({
      clientName: testimonial.clientName,
      company: testimonial.company,
      position: testimonial.position || "",
      content: testimonial.content,
      avatar: testimonial.avatar || "",
      rating: String(testimonial.rating),
      order: String(testimonial.order),
      isActive: testimonial.isActive,
      enPosition: en.position || "",
      enContent: en.content || "",
      uzPosition: uz.position || "",
      uzContent: uz.content || "",
    });
    setIsModalOpen(true);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;
    const checked = (event.target as HTMLInputElement).checked;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const setField = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const payload = () => ({
    clientName: form.clientName.trim(),
    company: form.company.trim(),
    position: form.position.trim(),
    content: form.content.trim(),
    avatar: form.avatar.trim(),
    rating: Math.min(5, Math.max(1, Number(form.rating) || 5)),
    order: Number(form.order) || 0,
    isActive: form.isActive,
    translations: {
      ru: {
        position: form.position.trim(),
        content: form.content.trim(),
      },
      en: {
        position: form.enPosition.trim() || form.position.trim(),
        content: form.enContent.trim() || form.content.trim(),
      },
      uz: {
        position: form.uzPosition.trim() || form.position.trim(),
        content: form.uzContent.trim() || form.content.trim(),
      },
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch(
        editing ? `/api/admin/testimonials/${editing.id}` : "/api/admin/testimonials",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload()),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка сохранения");
      toast.success(editing ? "Отзыв обновлён" : "Отзыв создан");
      setIsModalOpen(false);
      await fetchTestimonials();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Ошибка сохранения");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить отзыв?")) return;
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Ошибка удаления");
      toast.success("Удалено");
      setTestimonials((prev) => prev.filter((testimonial) => testimonial.id !== id));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Ошибка");
    }
  };

  const handleToggle = async (testimonial: Testimonial) => {
    try {
      const res = await fetch(`/api/admin/testimonials/${testimonial.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !testimonial.isActive }),
      });
      if (!res.ok) throw new Error("Ошибка обновления");
      setTestimonials((prev) =>
        prev.map((item) =>
          item.id === testimonial.id ? { ...item, isActive: !item.isActive } : item
        )
      );
      toast.success(testimonial.isActive ? "Скрыт" : "Опубликован");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Ошибка");
    }
  };

  return (
    <>
      <AdminHeader title="Отзывы" />
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between gap-4"
        >
          <p className="text-gray-400">
            {isLoading ? "..." : `${testimonials.length} отзывов`}
          </p>
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Новый отзыв
          </Button>
        </motion.div>

        {isLoading ? (
          <Skeleton className="h-64" />
        ) : testimonials.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="mb-4 text-gray-400">Отзывы не заполнены</p>
            <Button onClick={openCreate}>Добавить первый отзыв</Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 font-bold text-black">
                  {testimonial.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={testimonial.avatar} alt={testimonial.clientName} className="h-full w-full object-cover" />
                  ) : (
                    testimonial.clientName.charAt(0)
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-white">{testimonial.clientName}</h3>
                    <span className="text-sm text-gray-400">• {testimonial.company}</span>
                    {!testimonial.isActive && <Badge variant="error" className="text-xs">Скрыт</Badge>}
                  </div>
                  <div className="mb-2 flex gap-0.5">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          index < testimonial.rating
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="line-clamp-2 text-sm text-gray-400">{testimonial.content}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleToggle(testimonial)}>
                    {testimonial.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => openEdit(testimonial)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(testimonial.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editing ? "Редактировать отзыв" : "Новый отзыв"}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Имя клиента *" name="clientName" value={form.clientName} onChange={handleChange} required />
            <Input label="Компания *" name="company" value={form.company} onChange={handleChange} required />
            <Input label="Позиция RU" name="position" value={form.position} onChange={handleChange} />
            <Input label="Рейтинг" name="rating" type="number" min={1} max={5} value={form.rating} onChange={handleChange} />
            <Input label="Порядок" name="order" type="number" value={form.order} onChange={handleChange} />
            <ImageUploadField
              label="Аватар"
              name="avatar"
              value={form.avatar}
              onChange={setField}
              placeholder="/uploads/client.jpg"
            />
          </div>
          <Textarea label="Текст RU *" name="content" value={form.content} onChange={handleChange} required />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4 rounded-lg border border-white/8 p-4">
              <h3 className="font-semibold text-white">English</h3>
              <Input label="Position EN" name="enPosition" value={form.enPosition} onChange={handleChange} />
              <Textarea label="Content EN" name="enContent" value={form.enContent} onChange={handleChange} />
            </div>
            <div className="space-y-4 rounded-lg border border-white/8 p-4">
              <h3 className="font-semibold text-white">O&apos;zbek</h3>
              <Input label="Position UZ" name="uzPosition" value={form.uzPosition} onChange={handleChange} />
              <Textarea label="Content UZ" name="uzContent" value={form.uzContent} onChange={handleChange} />
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
