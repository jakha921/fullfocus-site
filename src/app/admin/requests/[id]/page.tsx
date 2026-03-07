"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Trash2, Save } from "lucide-react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Card, Badge, Button, Select, Textarea, Skeleton } from "@/components/ui";
import toast from "react-hot-toast";

interface Request {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  serviceType: string | null;
  budget: string | null;
  message: string;
  status: string;
  notes: string | null;
  source: string | null;
  createdAt: string;
}

const statusOptions = [
  { value: "new", label: "Новая" },
  { value: "in_progress", label: "В работе" },
  { value: "completed", label: "Завершена" },
  { value: "rejected", label: "Отклонена" },
];

const statusLabels: Record<string, { label: string; variant: "success" | "warning" | "error" | "default" }> = {
  new: { label: "Новая", variant: "success" },
  in_progress: { label: "В работе", variant: "warning" },
  completed: { label: "Завершена", variant: "default" },
  rejected: { label: "Отклонена", variant: "error" },
};

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [request, setRequest] = useState<Request | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await fetch(`/api/admin/requests/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setRequest(data);
          setStatus(data.status);
          setNotes(data.notes || "");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchRequest();
    }
  }, [params.id]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/requests/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes }),
      });

      if (res.ok) {
        toast.success("Изменения сохранены");
        const data = await res.json();
        setRequest(data);
      } else {
        toast.error("Ошибка сохранения");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Удалить заявку?")) return;

    try {
      const res = await fetch(`/api/admin/requests/${params.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Заявка удалена");
        router.push("/admin/requests");
      } else {
        toast.error("Ошибка удаления");
      }
    } catch {
      toast.error("Ошибка удаления");
    }
  };

  if (isLoading) {
    return (
      <>
        <AdminHeader title="Заявка" />
        <div className="p-6">
          <Skeleton className="h-96 w-full" />
        </div>
      </>
    );
  }

  if (!request) {
    return (
      <>
        <AdminHeader title="Заявка не найдена" />
        <div className="p-6">
          <Card className="text-center py-12">
            <p className="text-gray-400 mb-4">Заявка не найдена</p>
            <Link href="/admin/requests">
              <Button variant="secondary">Назад к заявкам</Button>
            </Link>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminHeader title={`Заявка от ${request.name}`} />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Back button */}
          <Link
            href="/admin/requests"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к заявкам
          </Link>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main info */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <h2 className="text-lg font-semibold text-white mb-4">
                  Контактная информация
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Имя</p>
                    <p className="text-white">{request.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <a
                      href={`mailto:${request.email}`}
                      className="text-green-500 hover:underline"
                    >
                      {request.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Телефон</p>
                    <p className="text-white">{request.phone || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Источник</p>
                    <p className="text-white">{request.source || "Сайт"}</p>
                  </div>
                </div>
              </Card>

              <Card>
                <h2 className="text-lg font-semibold text-white mb-4">
                  Детали проекта
                </h2>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Тип услуги</p>
                    <p className="text-white">{request.serviceType || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Бюджет</p>
                    <p className="text-white">{request.budget || "-"}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Сообщение</p>
                  <p className="text-white whitespace-pre-wrap">
                    {request.message}
                  </p>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <h2 className="text-lg font-semibold text-white mb-4">
                  Управление
                </h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Статус</p>
                    <Select
                      options={statusOptions}
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-2">Заметки</p>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Внутренние заметки..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSave} disabled={isSaving} className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      Сохранить
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>

              <Card>
                <h2 className="text-lg font-semibold text-white mb-4">
                  Информация
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm">Дата создания</p>
                    <p className="text-white">
                      {new Date(request.createdAt).toLocaleString("ru-RU")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Текущий статус</p>
                    <Badge variant={statusLabels[request.status]?.variant || "default"}>
                      {statusLabels[request.status]?.label || request.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
