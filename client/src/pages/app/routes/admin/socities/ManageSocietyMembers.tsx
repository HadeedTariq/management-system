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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingBar from "@/components/LoadingBar";
import AdminErrorComponent from "@/pages/app/components/admin/AdminErrorComponent";
import { useGetSocietyExistingMembers } from "@/pages/app/hooks/admin/useAdmin";

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
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#4A7C65]/25 bg-[#4A7C65]/10 text-sm font-semibold text-[#4A7C65]">
      {getInitials(name)}
    </div>
  );
}

function RoleBadge({ role }: { role: SocietyMemberDetails["role"] }) {
  if (role === "society_head")
    return (
      <Badge className="gap-1 border-[#4A7C65]/30 bg-[#4A7C65]/15 text-[#3a6450] hover:bg-[#4A7C65]/20">
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
        className={`text-2xl font-semibold ${accent ? "text-[#4A7C65]" : "text-foreground"}`}
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
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Society Members
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage and view all existing members of this society
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-3">
        <StatCard label="Total Members" value={total} accent />
        <StatCard label="Active" value={activeCount} />
        <StatCard label="Admins" value={adminCount} />
        <StatCard label="Society Heads" value={headCount} />
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-1.5">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                filter === key
                  ? "border-[#4A7C65]/30 bg-[#4A7C65]/10 text-[#4A7C65]"
                  : "border-border bg-white text-muted-foreground hover:border-[#4A7C65]/40 hover:text-[#4A7C65]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-[60px]" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="flex flex-col items-center gap-2 py-14 text-muted-foreground">
                    <Users className="h-8 w-8 opacity-30" />
                    <span className="text-sm">
                      No members match your search.
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((member) => (
                <TableRow key={member.memberId}>
                  {/* Member info */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <MemberAvatar name={member.userName} />
                      <div>
                        <p className="font-medium text-foreground">
                          {member.userName ?? (
                            <span className="italic text-muted-foreground">
                              Unknown
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {member.email ?? "—"}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <RoleBadge role={member.role} />
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={member.status} />
                  </TableCell>

                  {/* Verified */}
                  <TableCell>
                    {member.isVerified ? (
                      <CheckCircle2 className="h-4 w-4 text-[#4A7C65]" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground/40" />
                    )}
                  </TableCell>

                  <TableCell>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(member.joinedAt)}
                    </span>
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Remove Member
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
  );
};

export default ManageSocietyMembers;
