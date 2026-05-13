import { RefreshCcw, ShieldAlert, ArrowLeft, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ClientErrorProps = {
  error?: any;
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
};

export default function ClientErrorComponent({
  error,
  title = "Something Went Wrong",
  message,
  onRetry,
  className,
}: ClientErrorProps) {
  const errorMessage =
    message ||
    error?.response?.data?.message ||
    error?.message ||
    error?.data?.message ||
    (typeof error === "string" ? error : null) ||
    "We couldn’t load the requested content right now. Please refresh the page or try again in a moment.";

  return (
    <div
      className={cn(
        "flex min-h-[450px] w-full items-center justify-center p-6",
        className,
      )}
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-10 text-center shadow-2xl shadow-slate-200/40 backdrop-blur-xl darks:border-slate-800 darks:bg-slate-950/80">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500" />

        <div className="mb-8 flex justify-center">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-50 to-violet-100 darks:from-indigo-500/10 darks:to-violet-500/10">
            <ShieldAlert
              className="h-11 w-11 text-indigo-600 darks:text-indigo-400"
              strokeWidth={1.7}
            />

            <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-red-500 darks:border-slate-950">
              <WifiOff className="h-3.5 w-3.5 text-white" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 darks:text-slate-100">
            {title}
          </h2>

          <p className="mx-auto max-w-md text-sm leading-7 text-slate-500 darks:text-slate-400">
            {errorMessage}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          {onRetry && (
            <Button
              onClick={onRetry}
              className="group h-11 flex-1 rounded-xl bg-indigo-600 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:bg-indigo-700 active:scale-[0.98] darks:bg-indigo-500 darks:hover:bg-indigo-400"
            >
              <RefreshCcw className="mr-2 h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
              Try Again
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="h-11 flex-1 rounded-xl border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 darks:border-slate-800 darks:bg-slate-950 darks:text-slate-200 darks:hover:bg-slate-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300 darks:text-slate-700">
          <span>Client Response Layer</span>
        </div>
      </div>
    </div>
  );
}
