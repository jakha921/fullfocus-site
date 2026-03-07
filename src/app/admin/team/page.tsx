
"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Card, Badge, Button, Skeleton } from "@/components/ui";
import toast from "react-hot-toast";

interface Member {
  id: string;
  name: string;
  position: string;
  photo: string | null;
  isActive: boolean;
}

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("/api/admin/team");
        if (res.ok) setMembers(await res.json());
      } finally { setIsLoading(false); }
    };
    fetchMembers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить члена команды?")) return;
    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
      if (res.ok) { toast.success("Удалено"); setMembers(members.filter((m) => m.id !== id)); }
    } catch { toast.error("Ошибка"); }
  };

  return (
    <>
      <AdminHeader title="Команда" />
      <div className="p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between mb-6">
          <p className="text-gray-400">{isLoading ? "..." : `${members.length} членов команды`}</p>
        </motion.div>
        {isLoading ? <Skeleton className="h-64" /> : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member) => (
              <Card key={member.id} className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-black text-xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{member.name}</h3>
                  <p className="text-gray-400 text-sm">{member.position}</p>
                  {!member.isActive && <Badge variant="error" className="text-xs mt-1">Скрыт</Badge>}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary"><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(member.id)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
