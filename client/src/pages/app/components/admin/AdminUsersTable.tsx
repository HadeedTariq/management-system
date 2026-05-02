import {
  MoreHorizontal,
  Shield,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  Filter,
  Search,
  User,
} from "lucide-react";

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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useFullApp } from "@/store/hooks/useFullApp";
import { formatDate } from "@/lib/utils";

type AdminUsersTableProps = {
  isLoading: boolean;
  users: AdminUserListItem[];
  totalUsers: number | undefined;
  currentPageNumber: number;
};

const getInitials = (name: string | null, email: string | null) => {
  if (name) return name.substring(0, 2).toUpperCase();
  if (email) return email.substring(0, 2).toUpperCase();
  return "U";
};

// --- Sub-components ---
const TableSkeleton = () => (
  <>
    {[...Array(5)].map((_, i) => (
      <TableRow key={i}>
        <TableCell>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
          </div>
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 w-[80px] rounded-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 w-[100px] rounded-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[80px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-8 rounded-md ml-auto" />
        </TableCell>
      </TableRow>
    ))}
  </>
);

// --- Main Component ---
const AdminUsersTable = ({
  isLoading,
  totalUsers,
  users,
  currentPageNumber,
}: AdminUsersTableProps) => {
  const { user: currentUser } = useFullApp();

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-700">
      {/* Refined Header Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-2 gap-4">
        <div>
          <h2 className="text-xl font-light tracking-tight text-[#4A7C65] darks:text-[#6ba388]">
            User Directory
          </h2>
          <p className="text-xs uppercase tracking-widest text-slate-400 mt-1">
            Showing {users?.length || 0} of {totalUsers || 0} Professional
            Members
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-8 w-px bg-slate-200 darks:bg-slate-800 hidden sm:block" />
          <button className="p-2 text-slate-400 hover:text-[#4A7C65] transition-colors">
            <Search className="h-4 w-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-[#4A7C65] transition-colors">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Table Container: Minimalist & Sleek */}
      <div className="group rounded-xl border border-slate-200/60 darks:border-slate-800 bg-white/50 darks:bg-slate-950/50 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(74,124,101,0.08)]">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-slate-50/30 darks:bg-slate-900/30 border-b border-slate-100 darks:border-slate-800">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="py-5 px-6 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                  Identity
                </TableHead>
                <TableHead className="py-5 px-6 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                  Privileges
                </TableHead>
                <TableHead className="py-5 px-6 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                  Status
                </TableHead>
                <TableHead className="py-5 px-6 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                  Chronology
                </TableHead>
                <TableHead className="py-5 px-6 text-right text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                  Options
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableSkeleton />
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-4 opacity-40">
                      <User className="h-10 w-10 stroke-[1px] text-[#4A7C65]" />
                      <p className="text-sm font-light tracking-wide italic">
                        No records available in this view.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow
                    key={user.id}
                    className="group/row border-b border-slate-50 darks:border-slate-900 last:border-none transition-colors hover:bg-[#4A7C65]/[0.02] darks:hover:bg-[#4A7C65]/[0.05]"
                  >
                    {/* Identity Column */}
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-11 w-11 ring-2 ring-transparent group-hover/row:ring-[#4A7C65]/20 transition-all duration-500">
                          <AvatarFallback className="bg-[#4A7C65]/10 darks:bg-[#4A7C65]/20 text-[#4A7C65] font-light text-sm">
                            {getInitials(user.userName, user.email)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-800 darks:text-slate-100 tracking-tight">
                            {user.userName || "Anonymous Professional"}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                            <Mail className="h-3 w-3 stroke-[1.5px]" />
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Privileges Column */}
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div
                          className={`px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase flex items-center gap-1.5 
                      ${
                        user.role === "admin"
                          ? "bg-[#4A7C65] text-white shadow-md shadow-[#4A7C65]/20"
                          : "bg-slate-100 darks:bg-slate-800 text-slate-500 darks:text-slate-400"
                      }`}
                        >
                          {user.role === "admin" && (
                            <Shield className="w-3 h-3" />
                          )}
                          {user.role}
                        </div>
                        {user.email === currentUser?.email && (
                          <div className="flex items-center gap-1 text-[10px] text-[#4A7C65] darks:text-[#6ba388] font-semibold italic">
                            <ShieldCheck className="w-3 h-3" />
                            Active Self
                          </div>
                        )}
                      </div>
                    </TableCell>

                    {/* Status Column */}
                    <TableCell className="py-4 px-6">
                      <div className="flex flex-col gap-1.5">
                        {user.isActive ? (
                          <span className="flex items-center gap-1.5 text-xs text-slate-600 darks:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#4A7C65]" />
                            Authorized
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-xs text-slate-400 italic">
                            <XCircle className="w-3.5 h-3.5" />
                            Suspended
                          </span>
                        )}
                        {user.isVerified && (
                          <span className="text-[10px] text-[#4A7C65]/70 darks:text-[#6ba388]/70 uppercase tracking-widest font-bold ml-5">
                            Verified
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* Chronology Column */}
                    <TableCell className="py-4 px-6">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 darks:text-slate-300">
                          <Clock className="h-3 w-3 text-slate-400" />
                          {formatDate(user.createdAt)}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">
                          Origin: {user.source}
                        </div>
                      </div>
                    </TableCell>

                    {/* Options Column */}
                    <TableCell className="py-4 px-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-9 w-9 rounded-full hover:bg-[#4A7C65]/10 hover:text-[#4A7C65] darks:hover:bg-[#4A7C65]/20 transition-all"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-56 p-2 rounded-xl border-slate-100 darks:border-slate-800 shadow-2xl"
                        >
                          <DropdownMenuLabel className="text-[11px] uppercase tracking-widest text-slate-400 font-bold px-3 py-2">
                            Management
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-slate-50 darks:bg-slate-800" />
                          {/* Menu items here */}
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

export default AdminUsersTable;
