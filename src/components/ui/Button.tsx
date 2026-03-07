"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "gradient";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]";

    const variants = {
      primary: "bg-green-500 hover:bg-green-600 text-black",
      secondary: "bg-transparent border border-gray-700 hover:border-gray-500 text-white",
      ghost: "text-gray-400 hover:text-white bg-transparent",
      danger: "bg-red-500 hover:bg-red-600 text-white",
      gradient:
        "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-black font-bold shadow-lg shadow-green-500/25",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
