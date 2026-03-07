"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { ChevronRight, Home, Bell, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const pageNames: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/requests": "Заявки",
  "/admin/projects": "Проекты",
  "/admin/services": "Услуги",
  "/admin/blog": "Блог",
  "/admin/team": "Команда",
  "/admin/testimonials": "Отзывы",
  "/admin/settings": "Настройки",
};

interface AdminHeaderProps {
  title?: string;
}

export function AdminHeader({ title }: AdminHeaderProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const pathParts = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathParts.map((part, index) => {
    const href = "/" + pathParts.slice(0, index + 1).join("/");
    return {
      href,
      label: pageNames[href] || part,
    };
  });

  return (
    <header className="h-16 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/8 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20">
      {/* Left: Breadcrumbs + Title */}
      <div className="flex items-center gap-4">
        {/* Breadcrumbs */}
        <nav className="hidden sm:flex items-center gap-1.5 text-sm">
          <Link
            href="/admin"
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Home className="w-4 h-4" />
          </Link>
          {breadcrumbs.slice(1).map((crumb, index) => (
            <div key={crumb.href} className="flex items-center gap-1.5">
              <ChevronRight className="w-4 h-4 text-gray-600" />
              <Link
                href={crumb.href}
                className={cn(
                  "px-2 py-1 rounded-lg transition-colors",
                  index === breadcrumbs.length - 2
                    ? "text-white bg-white/8"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                {crumb.label}
              </Link>
            </div>
          ))}
        </nav>

        {/* Mobile Title */}
        <h1 className="text-lg font-semibold text-white lg:hidden ml-12">
          {title || pageNames[pathname] || "Admin"}
        </h1>

        {/* Desktop Title */}
        {title && (
          <h1 className="hidden lg:block text-xl font-semibold text-white">
            {title}
          </h1>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Search (desktop) */}
        <button className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/8 text-gray-400 text-sm hover:border-white/15 transition-colors">
          <Search className="w-4 h-4" />
          <span>Поиск...</span>
          <kbd className="ml-4 px-1.5 py-0.5 rounded bg-white/5 text-xs">⌘K</kbd>
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-black font-bold text-sm">
              {session?.user?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <span className="hidden sm:block text-sm text-white font-medium">
              {session?.user?.name || "Admin"}
            </span>
          </button>

          {/* Dropdown */}
          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-56 bg-[#0d0d0d] border border-white/8 backdrop-blur-xl rounded-xl shadow-xl z-20 py-2">
                <div className="px-4 py-2 border-b border-white/8">
                  <p className="text-sm font-medium text-white">
                    {session?.user?.name}
                  </p>
                  <p className="text-xs text-gray-500">{session?.user?.email}</p>
                </div>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5"
                  onClick={() => setShowUserMenu(false)}
                >
                  Настройки
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5"
                  onClick={() => setShowUserMenu(false)}
                >
                  Открыть сайт
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
