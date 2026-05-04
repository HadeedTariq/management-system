import { RefreshCcw, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type AdminErrorComponentProps = {
  error?: any;
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
};

export default function AdminErrorComponent({
  error,
  title = "System Interruption",
  message,
  onRetry,
  className,
}: AdminErrorComponentProps) {
  const errorMessage =
    message ||
    error?.response?.data?.message ||
    error?.message ||
    error?.data?.message ||
    (typeof error === "string" ? error : null) ||
    "An unexpected variance has occurred in the secure protocol. Please re-establish connection.";

  return (
    <div
      className={cn(
        "flex min-h-[400px] w-full flex-col items-center justify-center p-8 transition-colors duration-500",
        className,
      )}
    >
      <div className="relative w-full max-w-lg overflow-hidden border border-indigo-600/10 bg-white/50 darks:bg-[#0A0C0B]/50 backdrop-blur-sm p-12 lg:p-16 text-center">
        {/* Subtle Architectural Background Detail */}
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-indigo-600/20 to-transparent" />

        {/* Icon: Using ShieldAlert for a more professional, "Secure" feel */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center border border-indigo-600/20 bg-indigo-600/5 transition-transform duration-700 hover:scale-105">
            <ShieldAlert
              className="h-6 w-6 text-indigo-600"
              strokeWidth={1.2}
            />
          </div>
        </div>

        {/* Text Content: High-Tracking Typography */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-gray-900 darks:text-white">
            {title}
          </h3>
          <p className="mx-auto max-w-xs text-[11px] leading-relaxed tracking-wider text-gray-500 darks:text-gray-400 font-light italic">
            {errorMessage}
          </p>
        </div>

        {/* Action: Refined, Minimalist Button */}
        {onRetry && (
          <div className="mt-10 animate-in fade-in zoom-in duration-1000">
            <Button
              variant="ghost"
              onClick={onRetry}
              className="group h-12 rounded-none px-8 text-[10px] tracking-[0.25em] uppercase text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-500 ease-out"
            >
              <RefreshCcw
                className="mr-3 h-3 w-3 transition-transform duration-700 group-hover:rotate-180"
                strokeWidth={1.5}
              />
              Re-establish Session
            </Button>
          </div>
        )}

        {/* Decorative Protocol Number - Purely for Aesthetic/Professional feel */}
        <div className="mt-12 text-[8px] tracking-[0.5em] uppercase text-gray-300 darks:text-gray-700">
          Ref: ERR-SEC-4A7C65
        </div>
      </div>
    </div>
  );
}
