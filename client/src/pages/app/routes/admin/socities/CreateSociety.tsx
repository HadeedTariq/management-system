import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Settings2, Loader2, ArrowRight, X } from "lucide-react";
import {
  CreateSocietyInput,
  createSocietySchema,
} from "@/pages/app/validators/admin/admin.validator";
import { useCreateSociety } from "@/pages/app/hooks/admin/useAdmin";

// ─── Status badge colours ─────────────────────────────────────────────────────
const statusConfig: Record<string, { label: string; dot: string }> = {
  active: { label: "Active", dot: "bg-emerald-500" },
  inactive: { label: "Inactive", dot: "bg-slate-400" },
  suspended: { label: "Suspended", dot: "bg-red-400" },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function CreateSociety() {
  // Replace with your real mutation hook, e.g. useCreateSociety()
  const { mutate, isPending } = useCreateSociety();

  const form = useForm<CreateSocietyInput>({
    resolver: zodResolver(createSocietySchema),
    defaultValues: {
      title: "",
      description: "",
      status: "active",
    },
  });

  function onSubmit(values: CreateSocietyInput) {
    mutate(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] darks:bg-[#0A0C0B] transition-colors duration-500">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Header: High-End Editorial Style */}
        <header className="mb-16 border-l-2 border-indigo-600 pl-8">
          <h1 className="text-3xl font-light tracking-[0.15em] text-gray-900 darks:text-white uppercase italic">
            New Society
          </h1>
          <p className="mt-2 text-sm tracking-widest text-indigo-600 font-medium uppercase opacity-80">
            Establish a new collective mandate
          </p>
        </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-20">
            {/* Section 1: Basic Information */}
            <section className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-4 border-b border-gray-100 darks:border-indigo-600/10 pb-4">
                <Users
                  size={18}
                  strokeWidth={1.5}
                  className="text-indigo-600"
                />
                <h2 className="text-[11px] tracking-[0.3em] uppercase font-bold text-gray-400">
                  Identity Details
                </h2>
              </div>

              <div className="grid gap-10">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-widest text-gray-500">
                        Society Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., The Architectural Guild"
                          className="rounded-none border-0 border-b border-gray-200 darks:border-gray-800 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-indigo-600 transition-all text-lg font-light italic"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] uppercase tracking-widest" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-widest text-gray-500">
                        The Vision
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the core purpose..."
                          className="min-h-[100px] rounded-none border-gray-200 darks:border-gray-800 bg-transparent focus-visible:ring-1 focus-visible:ring-indigo-600 focus-visible:border-indigo-600 transition-all text-sm leading-relaxed font-light"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] uppercase tracking-widest" />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            {/* Section 2: Configuration */}
            <section className="space-y-10 animate-in fade-in slide-in-from-bottom-4 delay-150 duration-700">
              <div className="flex items-center gap-4 border-b border-gray-100 darks:border-indigo-600/10 pb-4">
                <Settings2
                  size={18}
                  strokeWidth={1.5}
                  className="text-indigo-600"
                />
                <h2 className="text-[11px] tracking-[0.3em] uppercase font-bold text-gray-400">
                  Initial Configuration
                </h2>
              </div>

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="max-w-xs">
                    <FormLabel className="text-[10px] uppercase tracking-widest text-gray-500">
                      Operation Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-none border-gray-200 darks:border-gray-800 bg-transparent uppercase text-[10px] tracking-widest focus:ring-indigo-600">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none border-indigo-600/20 uppercase text-[10px] tracking-widest">
                        {Object.entries(statusConfig).map(([value, cfg]) => (
                          <SelectItem
                            key={value}
                            value={value}
                            className="focus:bg-indigo-600/5"
                          >
                            <span className="flex items-center gap-3">
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`}
                              />
                              {cfg.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px] uppercase tracking-widest" />
                  </FormItem>
                )}
              />
            </section>

            {/* Action Bar: Precision Positioning */}
            <div className="pt-12 border-t border-gray-100 darks:border-indigo-600/10 flex flex-col sm:flex-row items-center justify-between gap-8">
              <button
                type="button"
                onClick={() => {
                  if (confirm("Discard entries?")) form.reset();
                }}
                className="group flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-semibold text-gray-400 hover:text-red-800 transition-colors"
              >
                <X
                  size={14}
                  className="group-hover:rotate-90 transition-transform"
                />
                Discard Proposal
              </button>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto min-w-[240px] h-14 rounded-none bg-indigo-600 hover:bg-[#3d6653] text-white tracking-[0.25em] uppercase text-[11px] font-medium transition-all duration-500 ease-in-out shadow-none group"
              >
                {isPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <span className="flex items-center gap-3">
                    Initialize Society
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Form>

        {/* Footer Mandate */}
        <footer className="mt-20 text-center">
          <p className="text-[9px] tracking-[0.4em] uppercase text-gray-300 darks:text-gray-700">
            Civi Connect Institutional Protocol
          </p>
        </footer>
      </div>
    </div>
  );
}
