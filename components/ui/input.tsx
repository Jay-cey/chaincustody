"use client";
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={cn(
        "w-full rounded border px-3 py-2 text-sm bg-gray-900 border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
    />
  );
});
Input.displayName = "Input";

export default Input;