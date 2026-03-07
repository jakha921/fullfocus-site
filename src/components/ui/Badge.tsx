"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "outline" | "gradient";
  pulse?: boolean;
}

export function Badge({
  className,
  variant = "default",
  pulse = false,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-gray-700 text-gray-200",
    success: "bg-green-500/10 text-green-500 border-green-500/30",
    warning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
    error: "bg-red-500/10 text-red-500 border-red-500/30",
    outline: "bg-transparent border-gray-600 text-gray-300",
    gradient:
      "bg-gradient-to-r from-green-500/10 to-teal-500/10 text-green-400 border border-green-500/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium rounded-full px-4 py-1.5 border",
        variants[variant],
        className
      )}
      {...props}
    >
      {pulse && (
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      )}
      {children}
    </span>
  );
}
