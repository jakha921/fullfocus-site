"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Card, Badge, Button, Input, Modal, Skeleton, Textarea } from "@/components/ui";

interface Member {
  id: string;
  name: string;
  position: string;
  photo: string | null;
  bio: string | null;
  linkedin: string | null;
  github: string | null;
  telegram: string | null;
  translations: Record<string, { position?: string; bio?: string }> | null;
  order: number;
  isActive: boolean;
}

const emptyForm = {
  name: "",
  position: "",
  bio: "",
  photo: "",
  linkedin: "",
  github: "",
  telegram: "",
  order: "0",
  isActive: true,
  enPosition: "",
  enBio: "",
  uzPosition: "",
  uzBio: "",
};

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/admin/team");
      if (res.ok) setMembers(await res.json());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEdit = (member: Member) => {
    const en = member.translations?.en || {};
    const uz = member.translations?.uz || {};
    setEditing(member);
    setForm({
      name: member.name,
      position: member.position,
      bio: member.bio || "",
      photo: member.photo || "",
      linkedin: member.linkedin || "",
      github: member.github || "",
      telegram: member.telegram || "",
      order: String(member.order),
      isActive: member.isActive,
      enPosition: en.position || "",
      enBio: en.bio || "",
      uzPosition: uz.position || "",
      uzBio: uz.bio || "",
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
    name: form.name.trim(),
    position: form.position.trim(),
    bio: form.bio.trim(),
    photo: form.photo.trim(),
    linkedin: form.linkedin.trim(),
    github: form.github.trim(),
    telegram: form.telegram.trim(),
    order: Number(form.order) || 0,
    isActive: form.isActive,
    translations: {
      ru: {
        position: form.position.trim(),
        bio: form.bio.trim(),
      },
      en: {
        position: form.enPosition.trim() || form.position.trim(),
        bio: form.enBio.trim() || form.bio.trim(),
      },
      uz: {
        position: form.uzPosition.trim() || form.position.trim(),
        bio: form.uzBio.trim() || form.bio.trim(),
      },
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch(editing ? `/api/admin/team/${editing.id}` : "/api/admin/team", {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload()),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка сохранения");
      toast.success(editing ? "Участник обновлён" : "Участник создан");
      setIsModalOpen(false);
      await fetchMembers();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Ошибка сохранения");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить члена команды?")) return;
    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Ошибка удаления");
      toast.success("Удалено");
      setMembers((prev) => prev.filter((member) => member.id !== id));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Ошибка");
    }
  };

  const handleToggle = async (member: Member) => {
    try {
      const res = await fetch(`/api/admin/team/${member.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !member.isActive }),
      });
      if (!res.ok) throw new Error("Ошибка обновления");
      setMembers((prev) =>
        prev.map((item) =>
          item.id === member.id ? { ...item, isActive: !item.isActive } : item
        )
      );
      toast.success(member.isActive ? "Скрыт" : "Опубликован");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Ошибка");
    }
  };

  return (
    <>
      <AdminHeader title="Команда" />
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between gap-4"
        >
          <p className="text-gray-400">
            {isLoading ? "..." : `${members.length} членов команды`}
          </p>
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Новый участник
          </Button>
        </motion.div>

        {isLoading ? (
          <Skeleton className="h-64" />
        ) : members.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="mb-4 text-gray-400">Команда не заполнена</p>
            <Button onClick={openCreate}>Добавить первого участника</Button>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <Card key={member.id} className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-xl font-bold text-black">
                  {member.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={member.photo} alt={member.name} className="h-full w-full object-cover" />
                  ) : (
                    member.name.charAt(0)
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="truncate font-semibold text-white">{member.name}</h3>
                    {!member.isActive && <Badge variant="error" className="text-xs">Скрыт</Badge>}
                  </div>
                  <p className="text-sm text-emerald-400">{member.position}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">{member.bio || "Без био"}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleToggle(member)}>
                    {member.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => openEdit(member)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(member.id)}>
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
        title={editing ? "Редактировать участника" : "Новый участник"}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Имя *" name="name" value={form.name} onChange={handleChange} required />
            <Input label="Позиция RU *" name="position" value={form.position} onChange={handleChange} required />
            <Input label="Порядок" name="order" type="number" value={form.order} onChange={handleChange} />
            <ImageUploadField
              label="Фото"
              name="photo"
              value={form.photo}
              onChange={setField}
              placeholder="/uploads/team.jpg"
            />
          </div>
          <Textarea label="Био RU" name="bio" value={form.bio} onChange={handleChange} />
          <div className="grid gap-4 md:grid-cols-3">
            <Input label="LinkedIn" name="linkedin" value={form.linkedin} onChange={handleChange} />
            <Input label="GitHub" name="github" value={form.github} onChange={handleChange} />
            <Input label="Telegram" name="telegram" value={form.telegram} onChange={handleChange} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4 rounded-lg border border-white/8 p-4">
              <h3 className="font-semibold text-white">English</h3>
              <Input label="Position EN" name="enPosition" value={form.enPosition} onChange={handleChange} />
              <Textarea label="Bio EN" name="enBio" value={form.enBio} onChange={handleChange} />
            </div>
            <div className="space-y-4 rounded-lg border border-white/8 p-4">
              <h3 className="font-semibold text-white">O&apos;zbek</h3>
              <Input label="Position UZ" name="uzPosition" value={form.uzPosition} onChange={handleChange} />
              <Textarea label="Bio UZ" name="uzBio" value={form.uzBio} onChange={handleChange} />
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
