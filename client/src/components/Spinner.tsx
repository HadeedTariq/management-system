import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error";
  className?: string;
}

export function Spinner({
  size = "md",
  variant = "default",
  className,
}: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const variantClasses = {
    default: "text-slate-900 darks:text-slate-200",
    primary: "text-blue-600 darks:text-blue-400",
    secondary: "text-orange-600 darks:text-orange-400",
    success: "text-emerald-600 darks:text-emerald-400",
    warning: "text-amber-600 darks:text-amber-400",
    error: "text-rose-600 darks:text-rose-400",
  };

  return (
    <Loader2
      className={cn(
        "animate-spin",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
    />
  );
}
