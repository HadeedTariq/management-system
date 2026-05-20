import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { adminApi } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { setAdminAuthenticated } from "@/reducers/adminReducer";
import { useLocation } from "react-router-dom";

// schema
const adminSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

type AdminSchema = z.infer<typeof adminSchema>;

const AdminPasswordDialog = () => {
  const location = useLocation();

  const [viewPassword, setViewPassword] = useState(false);
  const dispatch = useDispatch();
  const form = useForm<AdminSchema>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      password: "",
    },
  });

  const { mutate: authenticateAdmin, isPending } = useMutation({
    mutationKey: ["admin-auth"],
    mutationFn: async ({ password }: { password: string }) => {
      const res = await adminApi.post("/set-up", {
        password,
        currentRoute: location.pathname,
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast({
        title: data.message || "Admin authenticated",
        variant: "default",
        duration: 2000,
      });
      dispatch(setAdminAuthenticated(true));
      window.location.reload();
    },
    onError: (err: ErrResponse) => {
      toast({
        title: err.response?.data?.message || "Authentication failed",
        variant: "destructive",
        duration: 2000,
      });
    },
  });

  const onSubmit = (data: AdminSchema) => {
    authenticateAdmin({ password: data.password });
  };

  return (
    <Dialog open={true}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Admin Verification</DialogTitle>
          <DialogDescription>
            Enter your admin password to continue.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={viewPassword ? "text" : "password"}
                    placeholder="Admin password"
                    {...form.register("password")}
                    className="pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setViewPassword(!viewPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {viewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>

            <Button
              type="submit"
              className="w-full"
              variant="app"
              disabled={isPending}
            >
              {isPending ? "Verifying..." : "Verify"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPasswordDialog;
