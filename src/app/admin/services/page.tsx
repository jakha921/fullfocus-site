
"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Card, Badge, Button, Skeleton } from "@/components/ui";
import toast from "react-hot-toast";

interface Service {
  id: string;
  title: string;
  slug: string;
  icon: string;
  isActive: boolean;
  order: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/admin/services");
        if (res.ok) setServices(await res.json());
      } finally { setIsLoading(false); }
    };
    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить услугу?")) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (res.ok) { toast.success("Удалено"); setServices(services.filter((s) => s.id !== id)); }
    } catch { toast.error("Ошибка"); }
  };

  const handleToggle = async (id: string, isActive: boolean) => {
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      });
      if (res.ok) {
        setServices(services.map((s) => s.id === id ? { ...s, isActive: !isActive } : s));
        toast.success(isActive ? "Скрыто" : "Показано");
      }
    } catch { toast.error("Ошибка"); }
  };

  return (
    <>
      <AdminHeader title="Услуги" />
      <div className="p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between mb-6">
          <p className="text-gray-400">{isLoading ? "..." : `${services.length} услуг`}</p>
        </motion.div>
        {isLoading ? <Skeleton className="h-64" /> : (
          <Card className="overflow-hidden p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Название</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Slug</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Статус</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Порядок</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-400">Действия</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="border-b border-white/8 last:border-0 hover:bg-white/5">
                    <td className="px-6 py-4 text-white font-medium">{service.title}</td>
                    <td className="px-6 py-4 text-gray-400">{service.slug}</td>
                    <td className="px-6 py-4">
                      <Badge variant={service.isActive ? "success" : "outline"}>{service.isActive ? "Активна" : "Скрыта"}</Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{service.order}</td>
                    <td className="px-6 py-4 text-right flex gap-2 justify-end">
                      <Button size="sm" variant="ghost" onClick={() => handleToggle(service.id, service.isActive)}>
                        {service.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => handleDelete(service.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </>
  );
}
