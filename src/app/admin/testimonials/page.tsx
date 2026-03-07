
"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Star } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Card, Badge, Button, Skeleton } from "@/components/ui";
import toast from "react-hot-toast";

interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  content: string;
  rating: number;
  isActive: boolean;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/admin/testimonials");
        if (res.ok) setTestimonials(await res.json());
      } finally { setIsLoading(false); }
    };
    fetchTestimonials();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить отзыв?")) return;
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) { toast.success("Удалено"); setTestimonials(testimonials.filter((t) => t.id !== id)); }
    } catch { toast.error("Ошибка"); }
  };

  return (
    <>
      <AdminHeader title="Отзывы" />
      <div className="p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <p className="text-gray-400">{isLoading ? "..." : `${testimonials.length} отзывов`}</p>
        </motion.div>
        {isLoading ? <Skeleton className="h-64" /> : (
          <div className="space-y-4">
            {testimonials.map((t) => (
              <Card key={t.id} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-black font-bold">
                  {t.clientName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold">{t.clientName}</h3>
                    <span className="text-gray-400 text-sm">• {t.company}</span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < t.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-600"}`} />
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2">{t.content}</p>
                  {!t.isActive && <Badge variant="error" className="text-xs mt-2">Скрыт</Badge>}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary"><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(t.id)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
