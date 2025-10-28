"use client";
import React from "react";
import { cn } from "@/lib/utils";

export type CardProps = React.HTMLAttributes<HTMLDivElement>

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div {...props} className={cn("rounded-lg border border-gray-700 bg-gray-800 p-4", className)}>
      {children}
    </div>
  );
};

export default Card;