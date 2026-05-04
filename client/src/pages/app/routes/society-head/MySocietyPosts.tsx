import { Link, useParams } from "react-router-dom";
import {
  Pencil,
  Trash2,
  Plus,
  Calendar,
  MoreHorizontal,
  Image as ImageIcon,
  MessageSquare,
} from "lucide-react";
import { format } from "date-fns";

// shadcn/ui components
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Existing imports
import { useGetMySocietyPosts } from "../../hooks/society-head/useSocietyHead";
import LoadingBar from "@/components/LoadingBar";
import SocietyHeadErrorComponent from "../../components/society-head/SocietyHeadErrorComponent";

type MySocietyPost = {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  createdAt: string;
};

const MySocietyPosts = () => {
  const { id } = useParams();

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useGetMySocietyPosts(id as string);

  if (isLoading) return <LoadingBar />;

  if (isError)
    return (
      <SocietyHeadErrorComponent
        title={!posts ? "Society not found" : "Communication Error"}
        error={error}
      />
    );

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6 sm:p-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-200 pb-6 darks:border-slate-800 sm:flex-row sm:items-center">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 darks:text-slate-50">
            Society Announcements
          </h1>
          <p className="flex items-center gap-2 text-sm text-slate-500 darks:text-slate-400">
            <MessageSquare className="h-4 w-4" />
            Manage posts and updates for your residents.
          </p>
        </div>
        <Link to={`/society-head-dashboard/my-society/${id}/create-post`}>
          <Button className="bg-indigo-600 text-white shadow-sm transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 darks:focus:ring-offset-slate-950 sm:w-auto h-10 px-4 rounded-lg flex items-center gap-2 font-medium">
            <Plus className="h-4 w-4" />
            Create New Post
          </Button>
        </Link>
      </div>

      {/* Posts Grid */}
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:border-indigo-200 hover:shadow-md darks:border-slate-800 darks:bg-slate-950 darks:hover:border-indigo-900"
            >
              {/* Post Image Container */}
              <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-slate-50 darks:bg-slate-900/50 border-b border-slate-100 darks:border-slate-800/50">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center space-y-2 text-slate-400 darks:text-slate-500">
                    <ImageIcon className="h-8 w-8 stroke-[1.5]" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">
                      No Cover Image
                    </span>
                  </div>
                )}
                <div className="absolute left-4 top-4">
                  <Badge className="bg-white/95 text-indigo-700 shadow-sm hover:bg-white darks:bg-slate-900/95 darks:text-indigo-400 darks:hover:bg-slate-900 rounded-md px-2.5 py-0.5 text-xs font-medium border border-slate-200 darks:border-slate-800 backdrop-blur-sm">
                    Update
                  </Badge>
                </div>
              </div>

              {/* Card Header */}
              <CardHeader className="space-y-3 p-5 pb-3">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="line-clamp-1 text-lg font-semibold tracking-tight text-slate-900 darks:text-slate-100">
                    {post.title}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="-mr-2 -mt-1.5 h-8 w-8 text-slate-400 hover:text-indigo-600 darks:hover:text-indigo-400 flex-shrink-0 rounded-md"
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-40 rounded-lg"
                    >
                      <DropdownMenuItem className="gap-2 cursor-pointer font-medium text-slate-600 darks:text-slate-300">
                        <Pencil className="h-4 w-4" /> Edit Post
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 cursor-pointer font-medium text-red-600 focus:bg-red-50 focus:text-red-700 darks:text-red-500 darks:focus:bg-red-950/30 darks:focus:text-red-400">
                        <Trash2 className="h-4 w-4" /> Delete Post
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 darks:text-slate-400">
                  <Calendar className="h-3.5 w-3.5" />
                  <time dateTime={post.createdAt}>
                    {format(new Date(post.createdAt), "MMM d, yyyy • h:mm a")}
                  </time>
                </div>
              </CardHeader>

              {/* Card Content */}
              <CardContent className="flex-1 px-5 pb-5 pt-0">
                <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 darks:text-slate-400">
                  {post.description ||
                    "No description provided for this announcement."}
                </p>
              </CardContent>

              {/* Card Footer */}
              <CardFooter className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/50 p-4 darks:border-slate-800 darks:bg-slate-900/20">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-lg border-slate-200 px-3 text-xs font-medium hover:bg-slate-100 hover:text-slate-900 darks:border-slate-700 darks:hover:bg-slate-800 darks:hover:text-slate-100"
                >
                  Preview
                </Button>
                <Button
                  size="sm"
                  className="h-8 rounded-lg bg-indigo-600 px-3 text-xs font-medium text-white hover:bg-indigo-700 darks:bg-indigo-600 darks:hover:bg-indigo-500 shadow-sm"
                >
                  View Stats
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-20 px-6 text-center darks:border-slate-800 darks:bg-slate-900/50">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 darks:bg-indigo-900/30">
            <MessageSquare
              className="h-8 w-8 text-indigo-600 darks:text-indigo-400"
              strokeWidth={1.5}
            />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 darks:text-slate-100">
            No Posts Found
          </h3>
          <p className="mt-2 max-w-sm text-sm text-slate-500 darks:text-slate-400">
            Your announcement feed is currently empty. Create a new post to keep
            your society members informed.
          </p>
          <Button className="mt-6 h-10 rounded-lg bg-indigo-600 px-6 font-medium text-white shadow-sm hover:bg-indigo-700 darks:bg-indigo-600 darks:hover:bg-indigo-500 transition-colors">
            Create First Post
          </Button>
        </div>
      )}
    </div>
  );
};

export default MySocietyPosts;
