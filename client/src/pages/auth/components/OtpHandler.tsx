import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";
import { authApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, KeyRound, Loader2 } from "lucide-react";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function OtpHandler({
  setShowOtp,
}: {
  setShowOtp: (value: boolean) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const { mutate: handleOtp, isPending } = useMutation({
    mutationKey: ["otp-handler"],
    mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
      const { data } = await authApi.post("/otp-email-checker", {
        otp,
        email,
      });
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: data.message || "User logged in successfully",
      });
      setShowOtp(false);
      localStorage.removeItem("current-email");
      window.location.reload();
    },
    onError: (error: ErrResponse) => {
      toast({
        title: error.response?.data.message || "Something went wrong",
        variant: "destructive",
      });
      setShowOtp(false);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const storageData = JSON.parse(
      localStorage.getItem("current-email") as string,
    );
    if (!storageData || !storageData.email) {
      toast({
        title: "Email is required ",
        variant: "destructive",
      });
      return;
    }
    handleOtp({ otp: data.pin, email: storageData.email });
  }

  return (
    <div className="w-full flex flex-col items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[320px] space-y-12"
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center space-y-8">
                <div className="text-center space-y-3">
                  <FormLabel className="text-[10px] tracking-[0.3em] uppercase font-semibold text-indigo-600 flex items-center justify-center gap-2">
                    <KeyRound size={14} strokeWidth={1.5} />
                    Secure Verification
                  </FormLabel>
                  <FormDescription className="text-xs italic text-gray-500 darks:text-gray-400 font-light tracking-wide">
                    Enter the six-digit code issued to your device.
                  </FormDescription>
                </div>

                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    className="flex justify-center"
                  >
                    <InputOTPGroup className="gap-2 sm:gap-3">
                      {[...Array(6)].map((_, i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          className="w-10 h-14 sm:w-12 sm:h-16 cursor-text text-lg font-light border-0 border-b-2 border-gray-200 darks:border-gray-800 focus:border-indigo-600 darks:focus:border-indigo-600 transition-all duration-500 rounded-none bg-transparent text-indigo-600 darks:text-white"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className="text-[10px] uppercase tracking-widest text-red-500/80" />
              </FormItem>
            )}
          />

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-14 rounded-none bg-indigo-600 hover:bg-[#3d6653] text-white tracking-[0.2em] uppercase text-[11px] font-medium transition-all duration-700 ease-in-out shadow-none border-none group"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Verify Credentials
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              )}
            </Button>

            <p className="mt-8 text-center text-[9px] tracking-[0.2em] uppercase text-gray-400 darks:text-gray-600">
              Trusted Access via Civi Security
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
