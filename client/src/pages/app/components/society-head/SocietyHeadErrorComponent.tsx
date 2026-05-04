import { RefreshCcw, LayoutDashboard, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SocietyHeadErrorProps = {
  error?: any;
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
};

export default function SocietyHeadErrorComponent({
  error,
  title = "Management Interface Notice",
  message,
  onRetry,
  className,
}: SocietyHeadErrorProps) {
  // Parsing the error message with a fallback tailored for a Society Head
  const errorMessage =
    message ||
    error?.response?.data?.message ||
    error?.message ||
    error?.data?.message ||
    (typeof error === "string" ? error : null) ||
    "We encountered a synchronization issue while updating your society dashboard. Please try refreshing the view.";

  return (
    <div
      className={cn(
        "flex min-h-[450px] w-full flex-col items-center justify-center p-6 transition-all duration-500",
        className,
      )}
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-indigo-100 bg-white/80 darks:bg-slate-950/80 darks:border-indigo-900/30 backdrop-blur-md shadow-xl shadow-indigo-500/5 p-10 text-center">
        {/* Top Accent Bar: Using your primary Indigo theme */}
        <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />

        {/* Icon: Using AlertCircle for an operational "Management" feel */}
        <div className="mb-6 flex justify-center">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 darks:bg-indigo-500/10 transition-transform duration-500 hover:rotate-6">
            <AlertCircle
              className="h-10 w-10 text-indigo-600 darks:text-indigo-400"
              strokeWidth={1.5}
            />
            <div className="absolute -right-1 -top-1 h-4 w-4 animate-pulse rounded-full bg-indigo-500 border-2 border-white darks:border-slate-950" />
          </div>
        </div>

        {/* Typography: Modern, slightly more readable than the high-tracking Admin version */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold tracking-tight text-slate-900 darks:text-slate-100">
            {title}
          </h3>
          <p className="mx-auto max-w-[280px] text-sm leading-relaxed text-slate-500 darks:text-slate-400">
            {errorMessage}
          </p>
        </div>

        {/* Action: Refined Button with the Royal/Indigo theme */}
        {onRetry && (
          <div className="mt-8">
            <Button
              onClick={onRetry}
              className="group h-11 w-full rounded-xl bg-indigo-600 px-8 text-sm font-medium text-white hover:bg-indigo-700 darks:bg-indigo-500 darks:hover:bg-indigo-400 transition-all duration-300 shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
            >
              <RefreshCcw
                className="mr-2 h-4 w-4 transition-transform duration-500 group-hover:rotate-180"
                strokeWidth={2}
              />
              Refresh Dashboard
            </Button>

            <button
              onClick={() => window.history.back()}
              className="mt-4 text-xs font-medium text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest"
            >
              Go Back
            </button>
          </div>
        )}

        {/* Footer info: Operational rather than technical */}
        <div className="mt-10 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-slate-300 darks:text-slate-700">
          <LayoutDashboard className="h-3 w-3" />
          <span>Management Node: SH-SEC-01</span>
        </div>
      </div>
    </div>
  );
}
