import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Megaphone } from "lucide-react";

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
import { Switch } from "@/components/ui/switch";

import ImageUploader from "@/components/ImageUploader";

import {
  CreatePostInput,
  createPostSchema,
} from "../../validators/society-head/society-head.validator";
import { useUpdatePost } from "../../hooks/society-head/useSocietyHead";

type UpdateSocietyPostFormProps = {
  post: MySocietyPost;
  societyId: string;
};

const UpdateSocietyPostForm = ({
  post,
  societyId,
}: UpdateSocietyPostFormProps) => {
  const [postImage, setPostImage] = useState<File | null>(null);

  const { mutate, isPending } = useUpdatePost(societyId as string, post.id);

  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: post.title,
      description: post.description || "",
      isPublished: post.isPublished,
    },
  });

  function onSubmit(values: CreatePostInput) {
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
        {/* Header */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-100 p-2.5 darks:bg-indigo-900/30">
              <Megaphone className="h-6 w-6 text-indigo-600 darks:text-indigo-400" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 darks:text-slate-100">
              Update Post
            </h1>
          </div>
          <p className="text-slate-500 darks:text-slate-400">
            Modify your existing announcement details.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
                <CardDescription>
                  Update the main content of your post.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Image */}
            <Card>
              <CardHeader>
                <CardTitle>Update Image</CardTitle>
                <CardDescription>
                  Upload a new image to replace the existing one.
                </CardDescription>
              </CardHeader>

              <CardContent>
                {post.image && !postImage && (
                  <img
                    src={post.image}
                    alt="Current"
                    className="mb-4 rounded-lg max-h-60 object-cover"
                  />
                )}

                <ImageUploader
                  setImageFile={(file) => setPostImage(file)}
                  title="Replace Image"
                />
              </CardContent>
            </Card>

            {/* Visibility */}
            <Card>
              <CardHeader>
                <CardTitle>Visibility</CardTitle>
              </CardHeader>

              <CardContent>
                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex justify-between items-center border p-4 rounded-xl">
                      <div>
                        <FormLabel>Published</FormLabel>
                        <FormDescription>
                          Toggle post visibility.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  form.reset({
                    title: post.title,
                    description: post.description || "",
                    isPublished: post.isPublished,
                  });
                  setPostImage(null);
                }}
              >
                Reset
              </Button>

              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update Post"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateSocietyPostForm;
