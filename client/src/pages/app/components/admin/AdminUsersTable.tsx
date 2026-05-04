import {
  Shield,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  Filter,
  Search,
  User,
  Ban,
  UserMinus,
  MoreVertical,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useFullApp } from "@/store/hooks/useFullApp";
import { formatDate } from "@/lib/utils";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useBanUser, useDeleteUser } from "../../hooks/admin/useAdmin";

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

  const { mutate: deleteUser, isPending: isDeleting } =
    useDeleteUser(currentPageNumber);

  const { mutate: banUser, isPending: isBanning } =
    useBanUser(currentPageNumber);

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section: Professional Hierarchy */}
      <div className="flex flex-col md:flex-row md:items-end justify-between px-1 gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 darks:text-slate-50">
            User Directory
          </h2>
          <p className="text-sm font-medium text-slate-500 darks:text-slate-400 mt-1">
            Manage{" "}
            <span className="text-indigo-600 darks:text-indigo-400">
              {users?.length || 0}
            </span>{" "}
            active sessions from a total of {totalUsers || 0} members
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search directory..."
              className="pl-9 pr-4 py-2 bg-white darks:bg-slate-900 border border-slate-200 darks:border-slate-800 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full sm:w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-600 darks:text-slate-300 bg-white darks:bg-slate-900 border border-slate-200 darks:border-slate-800 rounded-md hover:bg-slate-50 darks:hover:bg-slate-800 transition-all">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Main Card Container */}
      <div className="rounded-lg border border-slate-200 darks:border-slate-800 bg-white darks:bg-slate-950 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-full divide-y divide-slate-200 darks:divide-slate-800">
            <TableHeader className="bg-slate-50/50 darks:bg-slate-900/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-12 px-6 text-xs font-bold uppercase tracking-wider text-slate-500 darks:text-slate-400">
                  Identity
                </TableHead>
                <TableHead className="h-12 px-6 text-xs font-bold uppercase tracking-wider text-slate-500 darks:text-slate-400">
                  Privileges
                </TableHead>
                <TableHead className="h-12 px-6 text-xs font-bold uppercase tracking-wider text-slate-500 darks:text-slate-400">
                  Status
                </TableHead>
                <TableHead className="h-12 px-6 text-xs font-bold uppercase tracking-wider text-slate-500 darks:text-slate-400">
                  Created
                </TableHead>
                <TableHead className="h-12 px-6 text-right text-xs font-bold uppercase tracking-wider text-slate-500 darks:text-slate-400">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-slate-100 darks:divide-slate-900">
              {isLoading ? (
                <TableSkeleton />
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-80 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="p-4 rounded-full bg-slate-50 darks:bg-slate-900">
                        <User className="h-8 w-8 text-slate-300 darks:text-slate-700" />
                      </div>
                      <p className="text-sm font-medium text-slate-500 darks:text-slate-400">
                        No member records identified.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow
                    key={user.id}
                    className="group hover:bg-slate-50/50 darks:hover:bg-slate-900/40 transition-colors"
                  >
                    {/* Identity: Avatar + Details */}
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 rounded-md border border-slate-200 darks:border-slate-800 shadow-sm transition-transform group-hover:scale-105">
                          <AvatarFallback className="bg-indigo-50 darks:bg-indigo-900/30 text-indigo-600 darks:text-indigo-400 font-bold text-xs uppercase">
                            {getInitials(user.userName, user.email)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-slate-900 darks:text-slate-100 truncate">
                            {user.userName || "Unknown Member"}
                          </span>
                          <span className="text-xs text-slate-500 darks:text-slate-400 flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5 text-slate-400" />
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Privileges: Badge System */}
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider
                          ${
                            user.role === "admin"
                              ? "bg-indigo-100 text-indigo-700 darks:bg-indigo-500/10 darks:text-indigo-400 border border-indigo-200/50 darks:border-indigo-500/20"
                              : "bg-slate-100 text-slate-600 darks:bg-slate-800 darks:text-slate-400 border border-slate-200 darks:border-slate-700"
                          }`}
                        >
                          {user.role === "admin" && (
                            <Shield className="w-3 h-3" />
                          )}
                          {user.role}
                        </span>
                        {user.email === currentUser?.email && (
                          <span className="flex items-center gap-1 text-[10px] text-indigo-600 darks:text-indigo-400 font-bold px-2 py-1 bg-indigo-50 darks:bg-indigo-500/5 rounded">
                            <ShieldCheck className="w-3 h-3" />
                            YOU
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* Status: Semantic Indicators */}
                    <TableCell className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        {user.isActive ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 darks:text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                            Authorized
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 darks:text-slate-500">
                            <XCircle className="w-4 h-4" />
                            Suspended
                          </span>
                        )}
                        {user.isVerified && (
                          <span className="text-[10px] text-indigo-500 darks:text-indigo-400 font-extrabold uppercase tracking-widest ml-5">
                            Verified
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* Chronology: Time stamps */}
                    <TableCell className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700 darks:text-slate-300">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          {formatDate(user.createdAt)}
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 darks:text-slate-500 uppercase tracking-tighter">
                          Source: {user.source || "Direct"}
                        </span>
                      </div>
                    </TableCell>

                    {/* Options: Action Menu */}
                    <TableCell className="py-4 px-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 rounded-md hover:bg-slate-100 darks:hover:bg-slate-800 text-slate-400 hover:text-slate-900 darks:hover:text-slate-100 transition-colors">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-52 p-1.5 bg-white darks:bg-slate-950 border-slate-200 darks:border-slate-800 shadow-xl rounded-lg"
                        >
                          <DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Administration
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-slate-100 darks:bg-slate-800" />

                          <DropdownMenuItem
                            className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-amber-600 focus:text-amber-700 focus:bg-amber-50 darks:focus:bg-amber-900/10 rounded cursor-pointer transition-colors"
                            onClick={() => banUser({ userId: user.id })}
                            disabled={isBanning}
                          >
                            <Ban className="w-4 h-4" />
                            <span>Restrict Access</span>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-red-600 focus:text-red-700 focus:bg-red-50 darks:focus:bg-red-900/10 rounded cursor-pointer transition-colors"
                            onClick={() => deleteUser({ userId: user.id })}
                            disabled={isDeleting}
                          >
                            <UserMinus className="w-4 h-4" />
                            <span>Delete Identity</span>
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

export default AdminUsersTable;
