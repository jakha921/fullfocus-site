"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MoreHorizontal } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Card, Badge, Select } from "@/components/ui";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Request {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  serviceType: string | null;
  budget: string | null;
  status: string;
  createdAt: string;
}

const statusOptions = [
  { value: "all", label: "Все статусы" },
  { value: "new", label: "Новые" },
  { value: "in_progress", label: "В работе" },
  { value: "completed", label: "Завершены" },
  { value: "rejected", label: "Отклонены" },
];

const statusLabels: Record<
  string,
  { label: string; variant: "success" | "warning" | "error" | "default" }
> = {
  new: { label: "Новая", variant: "success" },
  in_progress: { label: "В работе", variant: "warning" },
  completed: { label: "Завершена", variant: "default" },
  rejected: { label: "Отклонена", variant: "error" },
};

const kanbanColumns = [
  {
    id: "new",
    label: "Новые",
    borderColor: "border-green-500/30",
    headColor: "text-green-400",
    bgColor: "bg-green-500/5",
  },
  {
    id: "in_progress",
    label: "В работе",
    borderColor: "border-yellow-500/30",
    headColor: "text-yellow-400",
    bgColor: "bg-yellow-500/5",
  },
  {
    id: "completed",
    label: "Завершены",
    borderColor: "border-gray-500/30",
    headColor: "text-gray-400",
    bgColor: "bg-gray-500/5",
  },
  {
    id: "rejected",
    label: "Отклонены",
    borderColor: "border-red-500/30",
    headColor: "text-red-400",
    bgColor: "bg-red-500/5",
  },
];

interface KanbanCardProps {
  request: Request;
  onStatusChange: (id: string, status: string) => void;
}

function KanbanCard({ request, onStatusChange }: KanbanCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="glass-card rounded-lg p-3 group hover:border-white/15 transition-all relative">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate">{request.name}</p>
          <p className="text-gray-500 text-xs truncate mt-0.5">{request.email}</p>
          {request.serviceType && (
            <p className="text-gray-600 text-xs mt-1 truncate">{request.serviceType}</p>
          )}
          <p className="text-gray-700 text-xs mt-2">
            {new Date(request.createdAt).toLocaleDateString("ru-RU")}
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded text-gray-600 hover:text-white hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-40 bg-[#0d0d0d] border border-white/8 rounded-lg shadow-xl z-20 py-1 backdrop-blur-xl">
                {kanbanColumns
                  .filter((c) => c.id !== request.status)
                  .map((col) => (
                    <button
                      key={col.id}
                      onClick={() => {
                        onStatusChange(request.id, col.id);
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      → {col.label}
                    </button>
                  ))}
                <div className="border-t border-white/8 mt-1 pt-1">
                  <Link
                    href={`/admin/requests/${request.id}`}
                    className="w-full text-left px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex"
                    onClick={() => setShowMenu(false)}
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

interface KanbanViewProps {
  requests: Request[];
  onStatusChange: (id: string, status: string) => void;
}

function KanbanView({ requests, onStatusChange }: KanbanViewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kanbanColumns.map((col) => {
        const colRequests = requests.filter((r) => r.status === col.id);
        return (
          <div
            key={col.id}
            className={cn(
              "rounded-xl border p-3 min-h-[400px]",
              col.borderColor,
              col.bgColor
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className={cn("text-sm font-semibold", col.headColor)}>
                {col.label}
              </h3>
              <span className="text-xs text-gray-600 bg-white/5 px-1.5 py-0.5 rounded-full">
                {colRequests.length}
              </span>
            </div>
            <div className="space-y-2">
              {colRequests.map((r) => (
                <KanbanCard
                  key={r.id}
                  request={r}
                  onStatusChange={onStatusChange}
                />
              ))}
              {colRequests.length === 0 && (
                <p className="text-gray-700 text-xs text-center py-8">
                  Нет заявок
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (status !== "all") params.set("status", status);
        if (search) params.set("search", search);

        const res = await fetch(`/api/admin/requests?${params}`);
        if (res.ok) {
          setRequests(await res.json());
        }
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchRequests, 300);
    return () => clearTimeout(debounce);
  }, [search, status]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const res = await fetch(`/api/admin/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
      toast.success("Статус обновлён");
    } else {
      toast.error("Ошибка обновления");
    }
  };

  return (
    <>
      <AdminHeader title="Заявки" />

      <div className="p-6">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Поиск по имени или email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/8 rounded-lg text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
            />
          </div>
          <Select
            options={statusOptions}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full sm:w-48"
          />
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/8 rounded-lg">
            {(["table", "kanban"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                  viewMode === m
                    ? "bg-green-500/10 text-green-400 border border-green-500/30"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {m === "table" ? "Таблица" : "Kanban"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {isLoading ? (
            <div className="py-8 text-center text-gray-500">Загрузка...</div>
          ) : viewMode === "kanban" ? (
            <KanbanView requests={requests} onStatusChange={handleStatusChange} />
          ) : (
            <Card className="overflow-hidden p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/8">
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                        Имя
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                        Email
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                        Телефон
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                        Услуга
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                        Статус
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                        Дата
                      </th>
                      <th className="text-right px-6 py-4 text-sm font-medium text-gray-400">
                        Действия
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-6 py-8 text-center text-gray-500"
                        >
                          Заявки не найдены
                        </td>
                      </tr>
                    ) : (
                      requests.map((request) => (
                        <tr
                          key={request.id}
                          className="border-b border-white/5 last:border-0 hover:bg-white/5"
                        >
                          <td className="px-6 py-4 text-white font-medium">
                            {request.name}
                          </td>
                          <td className="px-6 py-4 text-gray-400">
                            {request.email}
                          </td>
                          <td className="px-6 py-4 text-gray-400">
                            {request.phone || "-"}
                          </td>
                          <td className="px-6 py-4 text-gray-400">
                            {request.serviceType || "-"}
                          </td>
                          <td className="px-6 py-4">
                            <Badge
                              variant={
                                statusLabels[request.status]?.variant ||
                                "default"
                              }
                            >
                              {statusLabels[request.status]?.label ||
                                request.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-gray-400 text-sm">
                            {new Date(request.createdAt).toLocaleDateString(
                              "ru-RU"
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href={`/admin/requests/${request.id}`}
                              className="text-green-500 hover:text-green-400 text-sm"
                            >
                              Подробнее
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </motion.div>
      </div>
    </>
  );
}
