import { Link, useParams } from "react-router-dom";
import {
  useGetSocietyDetails,
  useJoinSociety,
  useLeaveSociety,
  useSaveEvent,
  useSavePost,
} from "../hooks/student/useStudent";
import ClientErrorComponent from "../components/ClientErrorComponent";
import LoadingBar from "@/components/LoadingBar";
import {
  Calendar,
  Users,
  FileText,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  PlayCircle,
  ImageOff,
  Crown,
  ShieldCheck,
  User,
  CalendarDays,
  Newspaper,
  Activity,
  ChevronRight,
  Loader2,
  Bookmark,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useFullApp } from "@/store/hooks/useFullApp";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatDateTime(date: Date) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getInitials(name: string | null): string {
  if (!name) return "?";
  return name
    .split(/[\s_]+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ─── Sub-components ──────────────────────────────────────────────────────────

const SocietyStatusBadge = ({ status }: { status: "active" | "inactive" }) =>
  status === "active" ? (
    <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50 font-medium text-xs px-2.5 py-0.5">
      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
      Active
    </Badge>
  ) : (
    <Badge className="bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-100 font-medium text-xs px-2.5 py-0.5">
      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-slate-400" />
      Inactive
    </Badge>
  );

const EventStatusBadge = ({
  status,
}: {
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
}) => {
  const config = {
    upcoming: {
      icon: <Clock className="h-3 w-3 mr-1" />,
      label: "Upcoming",
      className: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50",
    },
    ongoing: {
      icon: <PlayCircle className="h-3 w-3 mr-1" />,
      label: "Ongoing",
      className:
        "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-50",
    },
    completed: {
      icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
      label: "Completed",
      className:
        "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50",
    },
    cancelled: {
      icon: <XCircle className="h-3 w-3 mr-1" />,
      label: "Cancelled",
      className: "bg-red-50 text-red-600 border-red-200 hover:bg-red-50",
    },
  }[status];

  return (
    <Badge
      className={`flex items-center border font-medium text-xs px-2 py-0.5 ${config.className}`}
    >
      {config.icon}
      {config.label}
    </Badge>
  );
};

const RoleIcon = ({ role }: { role: "member" | "admin" | "society_head" }) => {
  if (role === "society_head")
    return <Crown className="h-3.5 w-3.5 text-amber-500" />;
  if (role === "admin")
    return <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />;
  return <User className="h-3.5 w-3.5 text-slate-400" />;
};

const RoleBadge = ({ role }: { role: "member" | "admin" | "society_head" }) => {
  const config = {
    society_head: {
      label: "Head",
      className: "bg-amber-50 text-amber-700 border-amber-200",
    },
    admin: {
      label: "Admin",
      className: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    member: {
      label: "Member",
      className: "bg-slate-50 text-slate-600 border-slate-200",
    },
  }[role];

  return (
    <Badge
      className={`border font-medium text-[10px] px-1.5 py-0 hover:${config.className} ${config.className}`}
    >
      {config.label}
    </Badge>
  );
};

// ─── Society Header ───────────────────────────────────────────────────────────

const SocietyHeader = ({
  data,
  societyId,
}: {
  data: SocietyDetailsResponse;
  societyId: string;
}) => {
  const { user } = useFullApp();
  const { mutate: joinSociety, isPending: isJoining } =
    useJoinSociety(societyId);
  const { mutate: leaveSociety, isPending: isLeaving } =
    useLeaveSociety(societyId);
  const activeMembers = data.members.filter(
    (m) => m.status === "active",
  ).length;
  const head = data.members.find((m) => m.role === "society_head");
  const userJoined = data.members.find(
    (member) => member.user.userId === user?.id,
  );
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Decorative top band */}
      <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500" />

      <div className="px-8 py-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          {/* Left — title + meta */}
          <div className="flex items-start gap-5">
            {/* Society avatar */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md">
              <span className="text-2xl font-bold tracking-tight text-white">
                {data.title.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  {data.title}
                </h1>
                <SocietyStatusBadge status={data.status} />
                {!userJoined?.id ? (
                  <Button
                    variant={"app"}
                    onClick={() => {
                      joinSociety();
                    }}
                    disabled={isJoining}
                  >
                    Join Society
                  </Button>
                ) : (
                  <Button
                    variant={"destructive"}
                    onClick={() => {
                      leaveSociety();
                    }}
                    disabled={isLeaving}
                  >
                    Leave Society
                  </Button>
                )}
              </div>

              {data.description && (
                <p className="max-w-xl text-sm leading-relaxed text-slate-500">
                  {data.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Created {formatDate(data.createdAt)}
                </span>
                {head && (
                  <span className="flex items-center gap-1.5">
                    <Crown className="h-3.5 w-3.5 text-amber-400" />
                    {head.user.userName ?? "—"}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right — stats */}
          <div className="flex shrink-0 items-center gap-3">
            <StatPill
              icon={<Users className="h-4 w-4 text-indigo-500" />}
              value={activeMembers}
              label="Members"
            />
            <StatPill
              icon={<Newspaper className="h-4 w-4 text-violet-500" />}
              value={data.posts.length}
              label="Posts"
            />
            <StatPill
              icon={<Calendar className="h-4 w-4 text-blue-500" />}
              value={data.events.length}
              label="Events"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatPill = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) => (
  <div className="flex flex-col items-center gap-1 rounded-xl border border-slate-100 bg-slate-50 px-5 py-3 text-center">
    <div className="flex items-center gap-1.5">
      {icon}
      <span className="text-xl font-bold text-slate-800">{value}</span>
    </div>
    <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
      {label}
    </span>
  </div>
);

// ─── Members Panel ───────────────────────────────────────────────────────────

const MembersPanel = ({
  members,
}: {
  members: SocietyDetailsResponse["members"];
}) => {
  const active = members.filter((m) => m.status === "active");
  const left = members.filter((m) => m.status === "left");

  const roleOrder = { society_head: 0, admin: 1, member: 2 };
  const sorted = [...active].sort(
    (a, b) => roleOrder[a.role] - roleOrder[b.role],
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
            <Users className="h-4 w-4 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Members</h2>
            <p className="text-xs text-slate-400">
              {active.length} active · {left.length} left
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-50 px-2 py-2">
        {sorted.length === 0 ? (
          <EmptyState
            icon={<Users className="h-6 w-6 text-slate-300" />}
            message="No active members"
          />
        ) : (
          sorted.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-3 rounded-lg px-4 py-2.5 transition-colors hover:bg-slate-50"
            >
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-violet-100 text-xs font-semibold text-indigo-700">
                  {getInitials(m.user.userName)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">
                  {m.user.userName ?? "Unknown User"}
                </p>
                <p className="text-xs text-slate-400">
                  Joined {formatDate(m.joinedAt)}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <RoleIcon role={m.role} />
                <RoleBadge role={m.role} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ─── Posts Tab ────────────────────────────────────────────────────────────────

const PostsTab = ({
  posts,
  societyId,
}: {
  posts: SocietyDetailsResponse["posts"];
  societyId: string;
}) => {
  if (posts.length === 0)
    return (
      <EmptyState
        icon={<FileText className="h-8 w-8 text-slate-300" />}
        message="No posts published yet"
        description="Posts created by this society will appear here."
      />
    );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} societyId={societyId} />
      ))}
    </div>
  );
};

const PostCard = ({
  post,
  societyId,
}: {
  post: SocietyDetailsResponse["posts"][0];
  societyId: string;
}) => {
  const { mutate, isPending } = useSavePost(post.id, societyId);

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5">
      {/* Image or Placeholder */}
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

        {/* Subtle gradient overlay to ensure badge readability if over an image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Published Badge */}
        <div className="absolute right-3 top-3 z-10">
          {post.isPublished ? (
            <Badge className="border-indigo-100 bg-white/95 text-[10px] font-semibold text-indigo-700 shadow-sm backdrop-blur-md hover:bg-white">
              Published
            </Badge>
          ) : (
            <Badge className="border-slate-200 bg-white/95 text-[10px] font-semibold text-slate-600 shadow-sm backdrop-blur-md hover:bg-white">
              Draft
            </Badge>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col">
        <CardHeader className="pb-2 pt-5">
          <h3 className="line-clamp-2 text-base font-semibold leading-tight text-slate-900 group-hover:text-indigo-700 transition-colors duration-200">
            {post.title}
          </h3>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col pb-5 pt-0">
          {post.description && (
            <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-500">
              {post.description}
            </p>
          )}

          {/* Spacer pushes the footer to the bottom if descriptions vary in height */}
          <div className="mt-auto flex flex-col gap-4">
            <Separator className="bg-slate-100" />

            {/* Footer Metrics & Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <CalendarDays className="h-3.5 w-3.5" />
                <span>{formatDate(post.createdAt)}</span>
              </div>

              <Button
                variant={post.isSaved ? "outline" : "secondary"}
                size="sm"
                onClick={() => mutate()}
                disabled={isPending}
                className={`h-8 transition-all duration-200 ${
                  post.isSaved
                    ? "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                    {post.isSaved ? "Removing..." : "Saving..."}
                  </>
                ) : (
                  <>
                    <Bookmark
                      className={`mr-1.5 h-3.5 w-3.5 ${post.isSaved ? "fill-indigo-600" : ""}`}
                    />
                    {post.isSaved ? "Saved" : "Save Post"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

// ─── Events Tab ───────────────────────────────────────────────────────────────

const EventsTab = ({
  events,
  societyId,
}: {
  events: SocietyDetailsResponse["events"];
  societyId: string;
}) => {
  if (events.length === 0)
    return (
      <EmptyState
        icon={<Calendar className="h-8 w-8 text-slate-300" />}
        message="No events scheduled"
        description="Events organised by this society will appear here."
      />
    );

  const order = { ongoing: 0, upcoming: 1, completed: 2, cancelled: 3 };
  const sorted = [...events].sort((a, b) => order[a.status] - order[b.status]);

  return (
    <div className="flex flex-col gap-3">
      {sorted.map((event) => (
        <EventRow key={event.id} event={event} societyId={societyId} />
      ))}
    </div>
  );
};

const EventRow = ({
  event,
  societyId,
}: {
  event: SocietyDetailsResponse["events"][0];
  societyId: string;
}) => {
  const { mutate, isPending } = useSaveEvent(event.id, societyId);

  return (
    <Link
      to={`/events/${event.id}`}
      className="group flex flex-col sm:flex-row sm:items-center gap-5 rounded-xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-500/[0.03]"
    >
      {/* Media Box / Date Thumbnail */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-gradient-to-br from-indigo-50/50 to-violet-50/50">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <Calendar
              className="h-6 w-6 text-indigo-500/80"
              strokeWidth={1.75}
            />
          </div>
        )}
      </div>

      {/* Main Content Info Block */}
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <h3 className="text-base font-semibold leading-snug text-slate-900 group-hover:text-indigo-700 transition-colors duration-200">
            {event.title}
          </h3>
          <EventStatusBadge status={event.status} />
        </div>

        {event.description && (
          <p className="line-clamp-2 max-w-3xl text-sm leading-relaxed text-slate-500">
            {event.description}
          </p>
        )}

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs font-medium text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-500">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>{formatDateTime(event.startTime)}</span>
            {event.endTime && (
              <>
                <ChevronRight className="h-3 w-3 text-slate-300" />
                <span>{formatDateTime(event.endTime)}</span>
              </>
            )}
          </span>

          {event.location && (
            <span className="flex items-center gap-1.5 text-slate-500">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              <span className="truncate max-w-[200px] sm:max-w-xs">
                {event.location}
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Action Block */}
      <div className="sm:pl-4">
        <Button
          variant={event.isSaved ? "outline" : "secondary"}
          size="sm"
          onClick={(e) => {
            // Stop the link from being triggered
            e.preventDefault();
            // Stop the event from bubbling up to the card wrapper
            e.stopPropagation();

            mutate();
          }}
          disabled={isPending}
          className={`h-8 transition-all duration-200 ${
            event.isSaved
              ? "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
          }`}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              {event.isSaved ? "Removing..." : "Saving..."}
            </>
          ) : (
            <>
              <Bookmark
                className={`mr-1.5 h-3.5 w-3.5 ${event.isSaved ? "fill-indigo-600" : ""}`}
              />
              {event.isSaved ? "Saved" : "Save Event"}
            </>
          )}
        </Button>
      </div>
    </Link>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────

const EmptyState = ({
  icon,
  message,
  description,
}: {
  icon: React.ReactNode;
  message: string;
  description?: string;
}) => (
  <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
      {icon}
    </div>
    <p className="text-sm font-semibold text-slate-600">{message}</p>
    {description && (
      <p className="max-w-xs text-xs text-slate-400">{description}</p>
    )}
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const SocietyDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, error, isError } = useGetSocietyDetails(
    id as string,
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingBar />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <ClientErrorComponent
          error={error}
          title="Failed to load societies"
          message="We encountered an issue while fetching the platform societies. Please try again later."
        />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-slate-50/60">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-5 flex items-center gap-1.5 text-xs text-slate-400">
          <span>Societies</span>
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-slate-600">{data.title}</span>
        </nav>

        {/* Society header card */}
        <SocietyHeader data={data} societyId={id as string} />

        {/* Main content: tabs + members sidebar */}
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* ── Tabs (Posts / Events) ── */}
          <div className="min-w-0 flex-1">
            <Tabs defaultValue="posts">
              <TabsList className="mb-4 h-10 w-full justify-start gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                <TabsTrigger
                  value="posts"
                  className="flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-semibold text-slate-500 transition-all data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
                >
                  <Newspaper className="h-3.5 w-3.5" />
                  Posts
                  <span className="ml-1 rounded-full bg-current/10 px-1.5 py-0.5 text-[10px] opacity-60">
                    {data.posts.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-semibold text-slate-500 transition-all data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
                >
                  <CalendarDays className="h-3.5 w-3.5" />
                  Events
                  <span className="ml-1 rounded-full bg-current/10 px-1.5 py-0.5 text-[10px] opacity-60">
                    {data.events.length}
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts">
                <PostsTab posts={data.posts} societyId={id as string} />
              </TabsContent>

              <TabsContent value="events">
                <EventsTab events={data.events} societyId={id as string} />
              </TabsContent>
            </Tabs>
          </div>

          {/* ── Members sidebar ── */}
          <div className="w-full shrink-0 lg:w-72 xl:w-80">
            <MembersPanel members={data.members} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocietyDetailsPage;
