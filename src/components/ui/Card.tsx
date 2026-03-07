"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glass?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, glass = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          glass
            ? "glass-card rounded-xl p-6"
            : "bg-[#111] border border-gray-800 rounded-xl p-6",
          hover && glass
            ? "hover:border-white/15 hover:bg-white/5 transition-all duration-300 cursor-pointer"
            : hover
            ? "hover:border-green-500/30 hover:bg-gray-800/60 transition-all duration-300 cursor-pointer"
            : "",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
