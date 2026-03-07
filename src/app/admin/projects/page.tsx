
"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Card, Badge, Button, Skeleton } from "@/components/ui";
import toast from "react-hot-toast";

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDesc: string | null;
  coverImage: string;
  featured: boolean;
  isActive: boolean;
  createdAt: string;
}

const categoryLabels: Record<string, string> = {
  web: "Веб-разработка",
  mobile: "Мобильные",
  design: "Дизайн",
  erp: "ERP/CRM",
};

const categoryColors: Record<string, string> = {
  web: "text-blue-400 border-blue-500/30 bg-blue-500/10",
  mobile: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  design: "text-pink-400 border-pink-500/30 bg-pink-500/10",
  erp: "text-orange-400 border-orange-500/30 bg-orange-500/10",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/admin/projects");
        if (res.ok) {
          setProjects(await res.json());
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить проект?")) return;

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Проект удалён");
        setProjects(projects.filter((p) => p.id !== id));
      } else {
        toast.error("Ошибка удаления");
      }
    } catch {
      toast.error("Ошибка удаления");
    }
  };

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !featured }),
      });

      if (res.ok) {
        setProjects(
          projects.map((p) =>
            p.id === id ? { ...p, featured: !featured } : p
          )
        );
        toast.success(featured ? "Убран из избранного" : "Добавлен в избранное");
      }
    } catch {
      toast.error("Ошибка");
    }
  };

  return (
    <>
      <AdminHeader title="Проекты" />

      <div className="p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <p className="text-gray-400">
            {isLoading ? "..." : `${projects.length} проектов`}
          </p>
          <Link href="/admin/projects/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Новый проект
            </Button>
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <Skeleton className="h-64" />
          ) : projects.length === 0 ? (
            <Card className="col-span-full text-center py-12">
              <p className="text-gray-400 mb-4">Проекты не найдены</p>
              <Link href="/admin/projects/new">
                <Button>Создать первый проект</Button>
              </Link>
            </Card>
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden p-0 group">
                  {/* Image */}
                  <div className="relative aspect-video bg-white/5">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <div className="w-full h-full bg-gradient-to-br from-green-500/20 to-white/5" />

                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute top-3 left-3 z-20">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      </div>
                    )}

                    {/* Actions overlay */}
                    <div className="absolute inset-0 z-20 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Link href={`/admin/projects/${project.id}/edit`}>
                        <Button size="sm" variant="secondary">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant={project.featured ? "secondary" : "ghost"}
                        onClick={() => handleToggleFeatured(project.id, project.featured)}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            project.featured ? "text-yellow-500 fill-yellow-500" : ""
                          }`}
                        />
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(project.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs border ${categoryColors[project.category] || "text-gray-400 border-white/8 bg-white/5"}`}>
                        {categoryLabels[project.category] || project.category}
                      </span>
                      {!project.isActive && (
                        <Badge variant="error" className="text-xs">
                          Скрыт
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {project.shortDesc || "Нет описания"}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
