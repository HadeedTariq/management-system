import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FileText, ImageIcon, Eye, Megaphone } from "lucide-react";

// shadcn/ui components
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch"; // Assuming you have the shadcn switch component

import ImageUploader from "@/components/ImageUploader";
import { useCreatePost } from "../../hooks/society-head/useSocietyHead";
import { useParams } from "react-router-dom";
// import { useCreatePost } from "@/hooks/society-head/useSocietyPosts";

// ─── ZOD VALIDATOR ──────────────────────────────────────────────────────────
export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be 255 characters or less"),
  description: z.string().optional(),
  isPublished: z.boolean().default(true),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;

// ─── COMPONENT ──────────────────────────────────────────────────────────────
export default function CreateSocietyPost() {
  const { id } = useParams();
  const [postImage, setPostImage] = useState<File | null>(null);

  // Replace with your actual mutation hook
  const { mutate, isPending } = useCreatePost(id as string);

  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      description: "",
      isPublished: true,
    },
  });

  async function onSubmit(values: CreatePostInput) {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description || "");
    formData.append("isPublished", String(values.isPublished));

    if (postImage) {
      formData.append("image", postImage);
    }

    mutate(formData);
  }

  return (
    <div className="min-h-screen bg-slate-50/50 darks:bg-slate-950/50 animate-in fade-in duration-500">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-100 p-2.5 darks:bg-indigo-900/30">
              <Megaphone className="h-6 w-6 text-indigo-600 darks:text-indigo-400" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 darks:text-slate-100">
              Create Post
            </h1>
          </div>
          <p className="text-slate-500 darks:text-slate-400">
            Publish a new post, event, or update for your society members.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Core Content Section */}
            <Card className="border-slate-200 darks:border-slate-800 shadow-sm transition-shadow hover:shadow-md darks:bg-slate-900/50 overflow-hidden">
              <CardHeader className="border-b border-slate-100 darks:border-slate-800 bg-slate-50/50 darks:bg-slate-900/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-50 darks:bg-indigo-500/10 p-2">
                    <FileText className="h-5 w-5 text-indigo-600 darks:text-indigo-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Post Content</CardTitle>
                    <CardDescription>
                      The main information visible to all residents.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6 p-5 sm:p-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-900 darks:text-slate-200 font-medium">
                        Announcement Title{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Annual General Meeting 2026"
                          className="h-11 bg-white darks:bg-slate-950 border-slate-200 darks:border-slate-800"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-900 darks:text-slate-200 font-medium">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[160px] resize-y bg-white darks:bg-slate-950 border-slate-200 darks:border-slate-800 text-base"
                          placeholder="Write the full details of your announcement here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Media Section */}
            <Card className="border-slate-200 darks:border-slate-800 shadow-sm transition-shadow hover:shadow-md darks:bg-slate-900/50 overflow-hidden">
              <CardHeader className="border-b border-slate-100 darks:border-slate-800 bg-slate-50/50 darks:bg-slate-900/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-50 darks:bg-indigo-500/10 p-2">
                    <ImageIcon className="h-5 w-5 text-indigo-600 darks:text-indigo-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Header Image</CardTitle>
                    <CardDescription>
                      Optional visual context to make your post stand out.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 p-5 sm:p-6">
                <ImageUploader
                  setImageFile={(file) => setPostImage(file)}
                  title="Upload Post Cover"
                />
              </CardContent>
            </Card>

            {/* Visibility Settings Section */}
            <Card className="border-slate-200 darks:border-slate-800 shadow-sm transition-shadow hover:shadow-md darks:bg-slate-900/50 overflow-hidden">
              <CardHeader className="border-b border-slate-100 darks:border-slate-800 bg-slate-50/50 darks:bg-slate-900/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-50 darks:bg-indigo-500/10 p-2">
                    <Eye className="h-5 w-5 text-indigo-600 darks:text-indigo-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Visibility Settings
                    </CardTitle>
                    <CardDescription>
                      Control when and how residents see this post.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 p-5 sm:p-6">
                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-xl border border-slate-200 darks:border-slate-800 p-4 bg-white darks:bg-slate-950 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base font-medium text-slate-900 darks:text-slate-100">
                          Publish Immediately
                        </FormLabel>
                        <FormDescription className="text-sm text-slate-500">
                          Turn this off to save as a draft and publish later.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-indigo-600"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Submit Actions */}
            <div className="sticky bottom-6 z-10 flex items-center justify-end gap-4 rounded-xl border border-slate-200 darks:border-slate-800 bg-white/80 darks:bg-slate-950/80 p-5 shadow-lg backdrop-blur-md">
              <Button
                type="button"
                variant="ghost"
                size="lg"
                className="text-slate-600 hover:bg-slate-100 darks:text-slate-400 darks:hover:bg-slate-800 font-medium h-11"
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to cancel? All unsaved text will be lost.",
                    )
                  ) {
                    form.reset();
                    setPostImage(null);
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                disabled={isPending}
                className="h-11 min-w-[160px] bg-indigo-600 font-medium text-white shadow-sm hover:bg-indigo-700 darks:bg-indigo-600 darks:hover:bg-indigo-500 transition-all"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Publishing...
                  </span>
                ) : (
                  "Publish Post"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
