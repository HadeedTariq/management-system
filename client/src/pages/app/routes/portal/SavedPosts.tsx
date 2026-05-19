import LoadingBar from "@/components/LoadingBar";
import { useGetSavedPosts, useSavePost } from "../../hooks/student/useStudent";
import ClientErrorComponent from "../../components/ClientErrorComponent";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Bookmark,
  BookmarkX,
  CalendarDays,
  ImageOff,
  User,
} from "lucide-react";

// Subcomponent: Handles the UI presentation for an individual saved post
const SavedPostCard = ({ item }: { item: SavedPost }) => {
  const { post, society, author } = item;
  const { mutate, isPending } = useSavePost(post.id, society.id);

  // Format date nicely (e.g., "Oct 12, 2023")
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(post.createdAt));

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/[0.03]">
      {/* Media Box wrapper */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-50">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100/50">
            <ImageOff className="h-10 w-10 text-slate-300" strokeWidth={1.5} />
          </div>
        )}

        {/* Floating Headers/Badges */}
        <div className="absolute inset-x-3 top-3 z-10 flex items-center justify-between gap-2">
          <Badge className="border-slate-200/80 bg-white/95 px-2 py-0.5 text-[10px] font-medium text-slate-700 shadow-sm backdrop-blur-md hover:bg-white">
            {society.title}
          </Badge>

          <Badge
            className={`border-none text-[10px] font-semibold shadow-sm backdrop-blur-md ${
              post.isPublished
                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                : "bg-amber-50 text-amber-700 hover:bg-amber-50"
            }`}
          >
            {post.isPublished ? "Published" : "Draft"}
          </Badge>
        </div>
      </div>

      {/* Card Content & Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1 space-y-2">
          <h3 className="line-clamp-2 text-base font-semibold leading-tight text-slate-900 group-hover:text-indigo-700 transition-colors duration-200">
            {post.title}
          </h3>

          {post.description && (
            <p className="line-clamp-2 text-sm leading-relaxed text-slate-500">
              {post.description}
            </p>
          )}
        </div>

        {/* Footer info stack */}
        <div className="mt-5 space-y-3">
          <Separator className="bg-slate-100" />

          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5 font-medium text-slate-500">
              <User className="h-3.5 w-3.5 text-slate-400" />
              <span className="truncate max-w-[120px]">
                {author.userName || "Anonymous"}
              </span>
            </div>

            <div className="flex items-center gap-1.5 font-medium text-slate-400">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>{formattedDate}</span>
            </div>
          </div>

          <div className="pt-1">
            <Button
              variant="outline"
              size="sm"
              disabled={isPending}
              onClick={() => {
                mutate();
              }}
              className="h-8 w-full border-indigo-100 bg-indigo-50/50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 transition-colors duration-200"
            >
              <Bookmark className="mr-1.5 h-3.5 w-3.5 fill-indigo-600 stroke-indigo-600" />
              Saved
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Main Scaffold Component
const SavedPosts = () => {
  const { data, isLoading, error, isError } = useGetSavedPosts();

  // Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center rounded-xl border border-slate-100 bg-slate-50/50">
        <LoadingBar />
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="p-6">
        <ClientErrorComponent
          error={error}
          title="Failed to load saved posts"
          message="We encountered an issue while fetching your saved posts. Please try again later."
        />
      </div>
    );
  }

  // Empty State Layout
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col min-h-[350px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/30 p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 mb-4 border border-indigo-100">
          <BookmarkX className="h-5 w-5 text-indigo-600" />
        </div>
        <h3 className="text-base font-semibold text-slate-900">
          No saved posts
        </h3>
        <p className="mt-1 text-sm text-slate-500 max-w-sm">
          Articles and updates you bookmark will show up in this space for easy
          referencing later.
        </p>
      </div>
    );
  }

  // Render Display Container
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Saved Bookmarks
          </h2>
          <p className="text-sm text-slate-500">
            Manage posts and notifications you have pinned across your
            societies.
          </p>
        </div>
        <Badge
          variant="outline"
          className="border-indigo-200 bg-indigo-50/50 px-2.5 py-1 text-xs font-semibold text-indigo-700"
        >
          {data.length} {data.length === 1 ? "Item" : "Items"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item: any) => (
          <SavedPostCard key={item.savedId} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SavedPosts;
