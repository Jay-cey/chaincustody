"use client";
import React from "react";
import { cn } from "@/lib/utils";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label: React.FC<LabelProps> = ({ className, children, ...props }) => {
  return (
    <label {...props} className={cn("text-sm font-medium text-gray-200", className)}>
      {children}
    </label>
  );
};

export default Label;