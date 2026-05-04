import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  Search,
  ShieldCheck,
  Crown,
  Users,
  UserX,
  ShieldAlert,
  Calendar,
  MoreVertical,
  ChevronDown,
  UserMinus,
  ChevronUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingBar from "@/components/LoadingBar";
import AdminErrorComponent from "@/pages/app/components/admin/AdminErrorComponent";
import {
  useCreateSocietyHead,
  useGetSocietyExistingMembers,
  useRemoveSocietyHead,
} from "@/pages/app/hooks/admin/useAdmin";

type FilterKey = "all" | "active" | "left" | "society_head" | "admin";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getInitials(name: string | null): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function MemberAvatar({ name }: { name: string | null }) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-indigo-600/25 bg-indigo-600/10 text-sm font-semibold text-indigo-600">
      {getInitials(name)}
    </div>
  );
}

function RoleBadge({ role }: { role: SocietyMemberDetails["role"] }) {
  if (role === "society_head")
    return (
      <Badge className="gap-1 border-indigo-600/30 bg-indigo-600/15 text-[#3a6450] hover:bg-indigo-600/20">
        <Crown className="h-3 w-3" />
        Head
      </Badge>
    );

  if (role === "admin")
    return (
      <Badge className="gap-1 border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
        <ShieldCheck className="h-3 w-3" />
        Admin
      </Badge>
    );

  return (
    <Badge variant="outline" className="text-muted-foreground">
      Member
    </Badge>
  );
}

function StatusBadge({ status }: { status: SocietyMemberDetails["status"] }) {
  if (status === "active")
    return (
      <Badge className="gap-1.5 border-green-200 bg-green-50 text-green-700 hover:bg-green-100">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        Active
      </Badge>
    );

  return (
    <Badge className="gap-1.5 border-red-200 bg-red-50 text-red-700 hover:bg-red-100">
      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
      Left
    </Badge>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col gap-1 rounded-xl border border-border bg-white px-5 py-3.5 shadow-sm">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span
        className={`text-2xl font-semibold ${accent ? "text-indigo-600" : "text-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Filter buttons ───────────────────────────────────────────────────────────

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "left", label: "Left" },
  { key: "society_head", label: "Heads" },
  { key: "admin", label: "Admins" },
];

// ─── Main Component ───────────────────────────────────────────────────────────

const ManageSocietyMembers = () => {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");

  const {
    data: members,
    isLoading,
    isError,
    error,
  } = useGetSocietyExistingMembers(id as string);

  const { mutate: createSocietyHead, isPending: isSocietyHeadCreationPending } =
    useCreateSocietyHead();
  const {
    mutate: removeFromSocietyHead,
    isPending: isSocietyHeadRemovingPending,
  } = useRemoveSocietyHead();

  const filtered = useMemo(() => {
    if (!members) return [];
    const q = search.toLowerCase();
    return members.filter((m) => {
      const matchSearch =
        !q ||
        (m.userName?.toLowerCase().includes(q) ?? false) ||
        (m.email?.toLowerCase().includes(q) ?? false);

      const matchFilter =
        filter === "all" ||
        (filter === "active" && m.status === "active") ||
        (filter === "left" && m.status === "left") ||
        (filter === "society_head" && m.role === "society_head") ||
        (filter === "admin" && m.role === "admin");

      return matchSearch && matchFilter;
    });
  }, [members, search, filter]);

  if (isLoading) return <LoadingBar />;

  if (isError)
    return (
      <AdminErrorComponent
        title={!members ? "Society not found" : "Something went wrong"}
        error={error}
      />
    );

  const total = members?.length ?? 0;
  const activeCount = members?.filter((m) => m.status === "active").length ?? 0;
  const adminCount = members?.filter((m) => m.role === "admin").length ?? 0;
  const headCount =
    members?.filter((m) => m.role === "society_head").length ?? 0;

  return (
    <div className="min-h-screen bg-slate-50/50 darks:bg-slate-950 p-4 sm:p-8 lg:p-10 space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 darks:text-slate-50">
            Society Members
          </h1>
          <p className="text-slate-500 darks:text-slate-400 text-sm md:text-base">
            Centrally manage permissions, roles, and verification status for all
            society participants.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Optional: Add a primary action button here if needed in future */}
        </div>
      </div>

      {/* Stats Overview Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Members" value={total} accent />
        <StatCard label="Active Members" value={activeCount} />
        <StatCard label="Administrators" value={adminCount} />
        <StatCard label="Society Heads" value={headCount} />
      </div>

      {/* Interactive Toolbar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white darks:bg-slate-900 p-4 rounded-xl border border-slate-200 darks:border-slate-800 shadow-sm">
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search by name or email identity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10 border-slate-200 darks:border-slate-800 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-slate-100 darks:bg-slate-800 p-1 rounded-lg border border-slate-200 darks:border-slate-700">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all rounded-md ${
                  filter === key
                    ? "bg-white darks:bg-slate-700 text-indigo-600 darks:text-indigo-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 darks:hover:text-slate-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Member Directory Table */}
      <div className="rounded-xl border border-slate-200 darks:border-slate-800 bg-white darks:bg-slate-900 shadow-sm overflow-hidden transition-all">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 darks:bg-slate-800/50 hover:bg-slate-50 darks:hover:bg-slate-800/50 border-b border-slate-200 darks:border-slate-800">
                <TableHead className="text-xs font-bold uppercase tracking-widest text-slate-500 py-4">
                  Member Identity
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Access Role
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Current Status
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Identity Verified
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Joining Date
                </TableHead>
                <TableHead className="w-[80px]" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-72 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="p-4 rounded-full bg-slate-50 darks:bg-slate-800">
                        <UserX className="h-8 w-8 text-slate-300" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-slate-900 darks:text-slate-100">
                          No members found
                        </p>
                        <p className="text-xs text-slate-500">
                          Try adjusting your search or filter parameters.
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((member) => (
                  <TableRow
                    key={member.memberId}
                    className="group hover:bg-slate-50/50 darks:hover:bg-slate-800/30 transition-colors border-b border-slate-100 darks:border-slate-800 last:border-0"
                  >
                    {/* Member Info */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <MemberAvatar name={member.userName} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 darks:text-slate-100">
                            {member.userName || "Unnamed Member"}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            {member.email || "No email provided"}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Role Badge */}
                    <TableCell>
                      <RoleBadge role={member.role} />
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell>
                      <StatusBadge status={member.status} />
                    </TableCell>

                    {/* Verification Status */}
                    <TableCell>
                      {member.isVerified ? (
                        <div className="flex items-center gap-2 text-indigo-600 darks:text-indigo-400">
                          <ShieldCheck className="h-5 w-5" />
                          <span className="text-[10px] font-bold uppercase tracking-tighter">
                            Verified
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-slate-300 darks:text-slate-600">
                          <ShieldAlert className="h-5 w-5" />
                          <span className="text-[10px] font-bold uppercase tracking-tighter">
                            Unverified
                          </span>
                        </div>
                      )}
                    </TableCell>

                    {/* Joined At */}
                    <TableCell>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-600 darks:text-slate-400">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        {formatDate(member.joinedAt)}
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 hover:bg-slate-100 darks:hover:bg-slate-800"
                          >
                            <MoreVertical className="h-4 w-4 text-slate-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-56 p-1.5 shadow-xl border-slate-200 darks:border-slate-800"
                        >
                          <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2 py-1.5">
                            Member Management
                          </DropdownMenuLabel>
                          {member.role === "society_head" ? (
                            <DropdownMenuItem
                              className="gap-2 focus:bg-amber-50 focus:text-amber-700 darks:focus:bg-amber-950/30"
                              onClick={() =>
                                removeFromSocietyHead({
                                  societyId: id || "",
                                  userId: member.userId,
                                })
                              }
                              disabled={isSocietyHeadRemovingPending}
                            >
                              <ChevronDown className="h-4 w-4" />
                              Demote from Head
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              className="gap-2 focus:bg-indigo-50 focus:text-indigo-700 darks:focus:bg-indigo-950/30"
                              onClick={() =>
                                createSocietyHead({
                                  societyId: id || "",
                                  userId: member.userId,
                                })
                              }
                              disabled={isSocietyHeadCreationPending}
                            >
                              <ChevronUp className="h-4 w-4" />
                              Promote to Head
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator className="bg-slate-100 darks:bg-slate-800" />
                          <DropdownMenuItem className="gap-2 text-red-600 focus:bg-red-50 focus:text-red-700 darks:focus:bg-red-950/30">
                            <UserMinus className="h-4 w-4" />
                            Remove from Society
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ManageSocietyMembers;
