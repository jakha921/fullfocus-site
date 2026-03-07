"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Target,
  LayoutDashboard,
  Inbox,
  Briefcase,
  Layers,
  FileText,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ClipboardList,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/requests", icon: Inbox, label: "Заявки" },
  { href: "/admin/quiz-results", icon: ClipboardList, label: "Опросы" },
  { href: "/admin/projects", icon: Briefcase, label: "Проекты" },
  { href: "/admin/services", icon: Layers, label: "Услуги" },
  { href: "/admin/blog", icon: FileText, label: "Блог" },
  { href: "/admin/team", icon: Users, label: "Команда" },
  { href: "/admin/testimonials", icon: MessageSquare, label: "Отзывы" },
  { href: "/admin/settings", icon: Settings, label: "Настройки" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar_collapsed");
    if (saved === "true") setCollapsed(true);
  }, []);

  useEffect(() => {
    fetch("/api/admin/requests?status=new")
      .then((r) => r.json())
      .then((d) => setNewCount(Array.isArray(d) ? d.length : 0))
      .catch(() => {});
  }, []);

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("sidebar_collapsed", String(next));
    window.dispatchEvent(new CustomEvent("sidebar-toggle", { detail: next }));
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-[#111] border border-gray-800 text-white hover:bg-gray-800 transition-colors"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-white/8 flex flex-col z-40 transition-all duration-300",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          collapsed ? "lg:w-20" : "lg:w-64"
        )}
      >
        {/* Logo */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-white/8">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
              <Target className="w-5 h-5 text-black" />
            </div>
            {!collapsed && (
              <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                FullFocus
              </span>
            )}
          </Link>
          <button
            onClick={toggleCollapsed}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft
              className={cn(
                "w-4 h-4 transition-transform",
                collapsed && "rotate-180"
              )}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-green-500/15 to-teal-500/5 text-green-400 border border-green-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0",
                    isActive && "text-green-400"
                  )}
                />
                {!collapsed && item.label}
                {!collapsed &&
                  item.href === "/admin/requests" &&
                  newCount > 0 && (
                    <span className="ml-auto px-1.5 py-0.5 bg-green-500 text-black text-xs font-bold rounded-full">
                      {newCount}
                    </span>
                  )}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-3 border-t border-white/8">
          {/* User Info */}
          {session?.user && !collapsed && (
            <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-xl bg-white/5 border border-white/8">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-black font-bold text-sm">
                {session.user.name?.[0]?.toUpperCase() || "A"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {session.user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {session.user.email}
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 w-full transition-colors",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && "Выйти"}
          </button>

          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-green-400 hover:bg-green-500/10 w-full transition-colors mt-1",
              collapsed && "justify-center"
            )}
          >
            <Target className="w-5 h-5" />
            {!collapsed && "На сайт"}
          </Link>
        </div>
      </aside>
    </>
  );
}
