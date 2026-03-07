"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Inbox,
  Briefcase,
  FileText,
  Eye,
  Plus,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Card, Badge, Button, Skeleton } from "@/components/ui";

interface Stats {
  requests: number;
  projects: number;
  posts: number;
  testimonials: number;
}

interface Request {
  id: string;
  name: string;
  email: string;
  serviceType: string | null;
  status: string;
  createdAt: string;
}

interface ChartEntry {
  date: string;
  count: number;
}

interface PieEntry {
  name: string;
  value: number;
}

const statusLabels: Record<string, { label: string; variant: "success" | "warning" | "error" | "default" }> = {
  new: { label: "Новая", variant: "success" },
  in_progress: { label: "В работе", variant: "warning" },
  completed: { label: "Завершена", variant: "default" },
  rejected: { label: "Отклонена", variant: "error" },
};

const PIE_COLORS = ["#22c55e", "#14b8a6", "#3b82f6", "#f59e0b", "#8b5cf6"];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const [chartData, setChartData] = useState<ChartEntry[]>([]);
  const [pieData, setPieData] = useState<PieEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, requestsRes, dashRes] = await Promise.all([
          fetch("/api/stats"),
          fetch("/api/admin/requests"),
          fetch("/api/admin/dashboard-stats"),
        ]);

        if (statsRes.ok) setStats(await statsRes.json());
        if (requestsRes.ok) {
          const data = await requestsRes.json();
          setRequests(data.slice(0, 5));
        }
        if (dashRes.ok) {
          const data = await dashRes.json();
          setChartData(data.chartData || []);
          setPieData(data.pieData || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const statsCards = [
    {
      title: "Заявки",
      value: stats?.requests ?? 0,
      icon: Inbox,
      href: "/admin/requests",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: "Проекты",
      value: stats?.projects ?? 0,
      icon: Briefcase,
      href: "/admin/projects",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      title: "Статьи",
      value: stats?.posts ?? 0,
      icon: FileText,
      href: "/admin/blog",
      gradient: "from-purple-500 to-violet-600",
    },
    {
      title: "Отзывы",
      value: stats?.testimonials ?? 0,
      icon: Eye,
      href: "/admin/testimonials",
      gradient: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <>
      <AdminHeader title="Dashboard" />

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={stat.href}>
                <div className="glass-card rounded-xl p-5 flex items-center gap-4 hover:border-green-500/20 transition-all cursor-pointer">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-2xl font-display font-bold text-white">
                      {isLoading ? (
                        <Skeleton className="w-10 h-7" />
                      ) : (
                        stat.value
                      )}
                    </p>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-600" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <h3 className="text-sm font-medium text-gray-400 mb-4">
                Заявки за последние 7 дней
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData} barSize={24}>
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#111",
                      border: "1px solid #27272a",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    cursor={{ fill: "rgba(34,197,94,0.05)" }}
                  />
                  <Bar
                    dataKey="count"
                    fill="url(#barGrad)"
                    radius={[4, 4, 0, 0]}
                    name="Заявки"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <h3 className="text-sm font-medium text-gray-400 mb-4">
                По типу услуги
              </h3>
              {pieData.length === 0 ? (
                <div className="h-[200px] flex items-center justify-center text-gray-500 text-sm">
                  Нет данных
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                    >
                      {pieData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "#111",
                        border: "1px solid #27272a",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      formatter={(value) => (
                        <span style={{ color: "#9ca3af", fontSize: 12 }}>
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-white mb-4">
            Быстрые действия
          </h2>
          <div className="flex gap-3">
            <Link href="/admin/projects/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Новый проект
              </Button>
            </Link>
            <Link href="/admin/blog/new">
              <Button variant="secondary">
                <Plus className="w-4 h-4 mr-2" />
                Новая статья
              </Button>
            </Link>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost">
                <ExternalLink className="w-4 h-4 mr-2" />
                Открыть сайт
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Recent Requests as cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Последние заявки
            </h2>
            <Link
              href="/admin/requests"
              className="text-sm text-green-500 hover:text-green-400"
            >
              Все заявки →
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-4">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="w-32 h-4" />
                    <Skeleton className="w-48 h-3" />
                  </div>
                </div>
              ))}
            </div>
          ) : requests.length === 0 ? (
            <div className="glass-card rounded-xl p-8 text-center text-gray-500">
              Нет заявок
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map((r) => (
                <div
                  key={r.id}
                  className="glass-card rounded-xl p-4 flex items-center gap-4 hover:border-white/15 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                    {r.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{r.name}</p>
                    <p className="text-gray-500 text-xs truncate">{r.email}</p>
                  </div>
                  <Badge
                    variant={statusLabels[r.status]?.variant || "default"}
                  >
                    {statusLabels[r.status]?.label || r.status}
                  </Badge>
                  <Link
                    href={`/admin/requests/${r.id}`}
                    className="text-gray-600 hover:text-green-500 flex-shrink-0"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
