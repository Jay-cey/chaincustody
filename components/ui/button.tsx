"use client";
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-blue-600 hover:bg-blue-500 text-white",
  outline: "bg-transparent border border-gray-700 text-gray-100 hover:bg-gray-800",
  ghost: "bg-transparent text-gray-100 hover:bg-gray-800",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "default", disabled, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        variantClasses[variant],
        disabled ? "opacity-60 cursor-not-allowed" : "",
        className
      )}
    />
  );
});
Button.displayName = "Button";

export default Button;