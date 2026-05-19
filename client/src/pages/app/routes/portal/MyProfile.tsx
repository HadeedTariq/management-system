import LoadingBar from "@/components/LoadingBar";
import { useGetMyDetails } from "../../hooks/student/useStudent";
import ClientErrorComponent from "../../components/ClientErrorComponent";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  User,
  Mail,
  Shield,
  LogIn,
  UserRound,
  CircleUserRound,
  CircleDashed,
  CalendarDays,
  Users,
  Bookmark,
  CalendarCheck,
  Building2,
  Crown,
  UserCheck,
  Clock,
  MapPin,
  FileText,
  Tag,
} from "lucide-react";

// ─── Sub-components ──────────────────────────────────────────────────────────

const SectionHeading = ({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
      <Icon size={15} strokeWidth={2} />
    </div>
    <h2 className="text-sm font-semibold tracking-wide text-slate-700 uppercase">
      {label}
    </h2>
  </div>
);

const StatCard = ({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
}) => (
  <Card className="border border-slate-100 shadow-sm rounded-xl bg-white hover:shadow-md transition-shadow duration-200">
    <CardContent className="p-5 flex items-center gap-4">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
      >
        <Icon size={20} strokeWidth={1.8} />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800 leading-none">
          {value}
        </p>
        <p className="text-xs text-slate-500 mt-1">{label}</p>
      </div>
    </CardContent>
  </Card>
);

const roleBadgeConfig: Record<string, { label: string; className: string }> = {
  society_head: {
    label: "Society Head",
    className: "bg-violet-100 text-violet-700 border-violet-200",
  },
  admin: {
    label: "Admin",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
  member: {
    label: "Member",
    className: "bg-sky-100 text-sky-700 border-sky-200",
  },
};

const RoleBadge = ({ role }: { role: "member" | "admin" | "society_head" }) => {
  const Icon =
    role === "society_head" ? Crown : role === "admin" ? Shield : UserCheck;
  const cfg = roleBadgeConfig[role];
  return (
    <Badge
      variant="outline"
      className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 ${cfg.className}`}
    >
      <Icon size={11} strokeWidth={2} />
      {cfg.label}
    </Badge>
  );
};

const statusDot = (status: "active" | "inactive" | "left") => {
  const colors: Record<string, string> = {
    active: "bg-emerald-400",
    inactive: "bg-slate-300",
    left: "bg-rose-400",
  };
  return (
    <span className={`inline-block h-2 w-2 rounded-full ${colors[status]}`} />
  );
};

const eventStatusBadge: Record<string, string> = {
  upcoming: "bg-blue-50 text-blue-600 border-blue-200",
  ongoing: "bg-emerald-50 text-emerald-600 border-emerald-200",
  completed: "bg-slate-100 text-slate-500 border-slate-200",
  cancelled: "bg-rose-50 text-rose-500 border-rose-200",
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const formatDateTime = (dateStr: string) =>
  new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

// ─── Main Component ───────────────────────────────────────────────────────────

const MyProfile = () => {
  const { data, isLoading, error, isError } = useGetMyDetails();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center rounded-lg border border-slate-100 bg-slate-50/50">
        <LoadingBar />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <ClientErrorComponent
          error={error}
          title="Failed to load profile"
          message="We encountered an issue while fetching your profile. Please try again later."
        />
      </div>
    );
  }

  const { student, analytics, joinedSocieties, savedPosts, savedEvents } =
    data!;

  const initials = (student.userName ?? student.email ?? "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const GenderIcon =
    student.gender === "female"
      ? UserRound
      : student.gender === "male"
        ? CircleUserRound
        : CircleDashed;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* ── Profile Header ── */}
        <Card className="border border-slate-100 shadow-sm rounded-2xl overflow-hidden bg-white">
          {/* Decorative top band */}
          <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Avatar */}
              <Avatar className="h-20 w-20 rounded-2xl border-2 border-indigo-100 shadow-sm shrink-0">
                <AvatarFallback className="rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 text-indigo-700 text-2xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>

              {/* Name / meta */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold text-slate-900 truncate">
                    {student.userName ?? "Unnamed User"}
                  </h1>
                  <Badge
                    variant="outline"
                    className={`text-xs font-medium px-2 py-0.5 ${
                      student.role === "admin"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-indigo-50 text-indigo-600 border-indigo-200"
                    }`}
                  >
                    {student.role === "admin" ? (
                      <Shield
                        size={10}
                        strokeWidth={2}
                        className="mr-1 inline"
                      />
                    ) : (
                      <User size={10} strokeWidth={2} className="mr-1 inline" />
                    )}
                    {student.role.charAt(0).toUpperCase() +
                      student.role.slice(1)}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-2">
                  {student.email && (
                    <span className="flex items-center gap-1.5 text-sm text-slate-500">
                      <Mail
                        size={13}
                        strokeWidth={2}
                        className="text-slate-400"
                      />
                      {student.email}
                    </span>
                  )}
                  {student.gender && (
                    <span className="flex items-center gap-1.5 text-sm text-slate-500 capitalize">
                      <GenderIcon
                        size={13}
                        strokeWidth={2}
                        className="text-slate-400"
                      />
                      {student.gender}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-sm text-slate-500">
                    <LogIn
                      size={13}
                      strokeWidth={2}
                      className="text-slate-400"
                    />
                    {student.source === "google" ? "Google" : "General"} account
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-slate-500">
                    <CalendarDays
                      size={13}
                      strokeWidth={2}
                      className="text-slate-400"
                    />
                    Joined {formatDate(student.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Analytics ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={Users}
            label="Joined Societies"
            value={analytics.joinedSocieties}
            color="bg-indigo-50 text-indigo-500"
          />
          <StatCard
            icon={Bookmark}
            label="Saved Posts"
            value={analytics.savedPosts}
            color="bg-violet-50 text-violet-500"
          />
          <StatCard
            icon={CalendarCheck}
            label="Saved Events"
            value={analytics.savedEvents}
            color="bg-purple-50 text-purple-500"
          />
        </div>

        {/* ── Joined Societies ── */}
        <Card className="border border-slate-100 shadow-sm rounded-2xl bg-white">
          <CardHeader className="px-6 pt-6 pb-0">
            <SectionHeading icon={Building2} label="Joined Societies" />
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {joinedSocieties.length === 0 ? (
              <EmptyState icon={Building2} message="No societies joined yet." />
            ) : (
              <div className="space-y-3">
                {joinedSocieties.map((item, idx) => (
                  <div key={item.membershipId}>
                    <div className="flex items-start justify-between gap-4 py-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                          <Building2 size={16} strokeWidth={1.8} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-semibold text-slate-800 truncate">
                              {item.society.title}
                            </p>
                            <div className="flex items-center gap-1">
                              {statusDot(item.status)}
                              <span className="text-xs text-slate-400 capitalize">
                                {item.status}
                              </span>
                            </div>
                          </div>
                          {item.society.description && (
                            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                              {item.society.description}
                            </p>
                          )}
                          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                            <Clock size={11} strokeWidth={2} />
                            Joined {formatDate(item.joinedAt)}
                          </p>
                        </div>
                      </div>
                      <RoleBadge role={item.role} />
                    </div>
                    {idx < joinedSocieties.length - 1 && (
                      <Separator className="bg-slate-100" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── Saved Posts ── */}
        <Card className="border border-slate-100 shadow-sm rounded-2xl bg-white">
          <CardHeader className="px-6 pt-6 pb-0">
            <SectionHeading icon={FileText} label="Saved Posts" />
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {savedPosts.length === 0 ? (
              <EmptyState icon={Bookmark} message="No saved posts yet." />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedPosts.map((item) => (
                  <div
                    key={item.savedId}
                    className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-4 hover:border-indigo-100 hover:bg-indigo-50/30 transition-colors duration-150"
                  >
                    {/* Thumbnail placeholder */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-500 overflow-hidden">
                      {item.post.image ? (
                        <img
                          src={item.post.image}
                          alt={item.post.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <FileText size={18} strokeWidth={1.8} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {item.post.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Tag
                          size={10}
                          strokeWidth={2}
                          className="text-slate-400 shrink-0"
                        />
                        <span className="text-xs text-slate-500 truncate">
                          {item.society.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <Bookmark size={10} strokeWidth={2} />
                        Saved {formatDate(item.savedAt)}
                      </p>
                    </div>

                    <Badge
                      variant="outline"
                      className={`self-start shrink-0 text-xs px-1.5 py-0.5 ${
                        item.post.isPublished
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : "bg-slate-100 text-slate-400 border-slate-200"
                      }`}
                    >
                      {item.post.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── Saved Events ── */}
        <Card className="border border-slate-100 shadow-sm rounded-2xl bg-white">
          <CardHeader className="px-6 pt-6 pb-0">
            <SectionHeading icon={CalendarCheck} label="Saved Events" />
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {savedEvents.length === 0 ? (
              <EmptyState icon={CalendarCheck} message="No saved events yet." />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedEvents.map((item) => (
                  <div
                    key={item.savedId}
                    className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 hover:border-indigo-100 hover:bg-indigo-50/30 transition-colors duration-150 space-y-2"
                  >
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 min-w-0">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-500">
                          <CalendarCheck size={15} strokeWidth={1.8} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-800 truncate">
                            {item.event.title}
                          </p>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <Tag
                              size={10}
                              strokeWidth={2}
                              className="text-slate-400"
                            />
                            {item.society.title}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`shrink-0 text-xs px-1.5 py-0.5 capitalize ${eventStatusBadge[item.event.status]}`}
                      >
                        {item.event.status}
                      </Badge>
                    </div>

                    <Separator className="bg-slate-100" />

                    {/* Meta row */}
                    <div className="space-y-1">
                      <p className="text-xs text-slate-500 flex items-center gap-1.5">
                        <Clock
                          size={11}
                          strokeWidth={2}
                          className="text-slate-400 shrink-0"
                        />
                        {formatDateTime(item.event.startTime)}
                        {item.event.endTime && (
                          <span className="text-slate-400">
                            → {formatDateTime(item.event.endTime)}
                          </span>
                        )}
                      </p>
                      {item.event.location && (
                        <p className="text-xs text-slate-500 flex items-center gap-1.5">
                          <MapPin
                            size={11}
                            strokeWidth={2}
                            className="text-slate-400 shrink-0"
                          />
                          {item.event.location}
                        </p>
                      )}
                      <p className="text-xs text-slate-400 flex items-center gap-1.5">
                        <Bookmark size={11} strokeWidth={2} />
                        Saved {formatDate(item.savedAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────

const EmptyState = ({
  icon: Icon,
  message,
}: {
  icon: React.ElementType;
  message: string;
}) => (
  <div className="flex flex-col items-center justify-center py-10 text-slate-400 gap-2">
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
      <Icon size={22} strokeWidth={1.5} />
    </div>
    <p className="text-sm">{message}</p>
  </div>
);

export default MyProfile;
