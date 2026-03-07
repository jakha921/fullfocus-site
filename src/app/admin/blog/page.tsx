
"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Card, Badge, Button, Skeleton } from "@/components/ui";
import toast from "react-hot-toast";

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/admin/blog");
        if (res.ok) setPosts(await res.json());
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить статью?")) return;
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Статья удалена");
        setPosts(posts.filter((p) => p.id !== id));
      }
    } catch {
      toast.error("Ошибка");
    }
  };

  const handleTogglePublish = async (id: string, isPublished: boolean) => {
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !isPublished }),
      });
      if (res.ok) {
        setPosts(posts.map((p) => p.id === id ? { ...p, isPublished: !isPublished } : p));
        toast.success(isPublished ? "Снято с публикации" : "Опубликовано");
      }
    } catch {
      toast.error("Ошибка");
    }
  };

  return (
    <>
      <AdminHeader title="Блог" />
      <div className="p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between mb-6">
          <p className="text-gray-400">{isLoading ? "..." : `${posts.length} статей`}</p>
          <Link href="/admin/blog/new"><Button><Plus className="w-4 h-4 mr-2" />Новая статья</Button></Link>
        </motion.div>

        {isLoading ? <Skeleton className="h-64" /> : (
          <Card className="overflow-hidden p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Заголовок</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Категория</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Статус</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Дата</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-400">Действия</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-white/8 last:border-0 hover:bg-white/5">
                    <td className="px-6 py-4 text-white font-medium">{post.title}</td>
                    <td className="px-6 py-4 text-gray-400">{post.category}</td>
                    <td className="px-6 py-4">
                      <Badge variant={post.isPublished ? "success" : "outline"}>
                        {post.isPublished ? "Опубликовано" : "Черновик"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(post.createdAt).toLocaleDateString("ru-RU")}
                    </td>
                    <td className="px-6 py-4 text-right flex gap-2 justify-end">
                      <Button size="sm" variant="ghost" onClick={() => handleTogglePublish(post.id, post.isPublished)}>
                        {post.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Link href={`/admin/blog/${post.id}/edit`}>
                        <Button size="sm" variant="secondary"><Edit className="w-4 h-4" /></Button>
                      </Link>
                      <Button size="sm" variant="danger" onClick={() => handleDelete(post.id)}>
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
