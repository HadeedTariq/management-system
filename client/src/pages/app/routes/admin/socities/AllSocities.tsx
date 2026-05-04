import { useState } from "react";
import { format } from "date-fns";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Search,
  Users,
  ShieldCheck,
  ShieldOff,
  ArrowUpDown,
  Filter,
  User,
  Building2,
  Database,
  Calendar,
  Layers,
  AlertTriangle,
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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import LoadingBar from "@/components/LoadingBar";
import AdminErrorComponent from "@/pages/app/components/admin/AdminErrorComponent";
import {
  useDeleteSociety,
  useGetAllSocieties,
} from "@/pages/app/hooks/admin/useAdmin";
import { Link } from "react-router-dom";

type SortField = "title" | "status" | "createdAt" | "updatedAt";
type SortDir = "asc" | "desc";
type StatusFilter = "all" | "active" | "inactive";

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: AdminSociety["status"] }) {
  if (status === "active") {
    return (
      <Badge
        className="flex w-fit items-center gap-1.5 border-0 px-2.5 py-1 text-xs font-medium"
        style={{ backgroundColor: "#4A7C6520", color: "#4A7C65" }}
      >
        <ShieldCheck className="h-3 w-3" />
        Active
      </Badge>
    );
  }
  return (
    <Badge
      variant="secondary"
      className="flex w-fit items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-500"
    >
      <ShieldOff className="h-3 w-3" />
      Inactive
    </Badge>
  );
}

function SortableHead({
  field,
  label,
  sortField,
  sortDir,
  onSort,
}: {
  field: SortField;
  label: string;
  sortField: SortField;
  sortDir: SortDir;
  onSort: (f: SortField) => void;
}) {
  const active = sortField === field;
  return (
    <TableHead>
      <button
        onClick={() => onSort(field)}
        className="flex items-center gap-1 font-semibold text-slate-700 transition-colors hover:text-slate-900"
      >
        {label}
        <ArrowUpDown
          className={`h-3.5 w-3.5 transition-colors ${
            active ? "text-indigo-600" : "text-slate-400"
          }`}
        />
      </button>
    </TableHead>
  );
}

function RowActions({
  society,
  onEdit,
  onDelete,
}: {
  society: AdminSociety;
  onEdit: (s: AdminSociety) => void;
  onDelete: (s: AdminSociety) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-500 hover:text-slate-900"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel className="text-xs text-slate-500">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to={`/admin-dashboard/societies/update/${society.id}`}>
          <DropdownMenuItem className="cursor-pointer gap-2 text-slate-700">
            <Pencil className="h-4 w-4" style={{ color: "#4A7C65" }} />
            Edit Society
          </DropdownMenuItem>
        </Link>
        <Link to={`/admin-dashboard/societies/manage-members/${society.id}`}>
          <DropdownMenuItem className="cursor-pointer gap-2 text-slate-700">
            <User className="h-4 w-4" style={{ color: "#4A7C65" }} />
            Manage Members
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="cursor-pointer gap-2 text-red-600 focus:text-red-600"
          onClick={() => onDelete(society)}
        >
          <Trash2 className="h-4 w-4" />
          Delete Society
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const AllSocieties = () => {
  const { data: societies, isLoading, isError, error } = useGetAllSocieties();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [deleteTarget, setDeleteTarget] = useState<AdminSociety | null>(null);
  const { mutate, isPending } = useDeleteSociety(deleteTarget?.id);

  if (isLoading) return <LoadingBar />;
  if (isError) return <AdminErrorComponent error={error} />;

  // ── Derived data ────────────────────────────────────────────────────────────
  const filtered: AdminSociety[] = (societies ?? [])
    .filter((s: AdminSociety) => {
      const matchesSearch =
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        (s.description ?? "").toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || s.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a: AdminSociety, b: AdminSociety) => {
      let cmp = 0;
      if (sortField === "title") {
        cmp = a.title.localeCompare(b.title);
      } else if (sortField === "status") {
        cmp = a.status.localeCompare(b.status);
      } else if (sortField === "createdAt") {
        cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortField === "updatedAt") {
        cmp = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

  const activeCount = (societies ?? []).filter(
    (s: AdminSociety) => s.status === "active",
  ).length;
  const inactiveCount = (societies ?? []).length - activeCount;

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  function handleEdit(society: AdminSociety) {
    // Wire to your edit handler / navigation
    console.log("Edit:", society);
  }

  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    mutate(undefined, {
      onSuccess: () => {
        setDeleteTarget(null);
      },
    });
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 darks:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-600 darks:text-indigo-400 font-bold text-xs uppercase tracking-widest">
              <Building2 size={14} />
              Institutional Management
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 darks:text-white">
              Societies
            </h1>
            <p className="text-sm text-slate-500 darks:text-slate-400 max-w-2xl">
              Manage and monitor the centralized directory of registered
              mandates, operational status, and institutional compliance.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 bg-white darks:bg-slate-900 border border-slate-200 darks:border-slate-800 px-4 py-2.5 rounded-lg shadow-sm">
              <div className="p-2 bg-slate-100 darks:bg-slate-800 rounded-md">
                <Users
                  size={16}
                  className="text-slate-600 darks:text-slate-400"
                />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400 leading-none mb-1">
                  Total
                </p>
                <p className="text-sm font-bold text-slate-900 darks:text-white">
                  {(societies ?? []).length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white darks:bg-slate-900 border border-slate-200 darks:border-slate-800 px-4 py-2.5 rounded-lg shadow-sm">
              <div className="p-2 bg-indigo-50 darks:bg-indigo-900/20 rounded-md">
                <ShieldCheck
                  size={16}
                  className="text-indigo-600 darks:text-indigo-400"
                />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400 leading-none mb-1">
                  Active
                </p>
                <p className="text-sm font-bold text-slate-900 darks:text-white">
                  {activeCount}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white darks:bg-slate-900 border border-slate-200 darks:border-slate-800 px-4 py-2.5 rounded-lg shadow-sm">
              <div className="p-2 bg-slate-100 darks:bg-slate-800 rounded-md">
                <ShieldOff
                  size={16}
                  className="text-slate-600 darks:text-slate-400"
                />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400 leading-none mb-1">
                  Inactive
                </p>
                <p className="text-sm font-bold text-slate-900 darks:text-white">
                  {inactiveCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white darks:bg-slate-900 p-4 rounded-xl border border-slate-200 darks:border-slate-800 shadow-sm">
          <div className="relative max-w-md flex-1 group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <Input
              placeholder="Search entities by name or description..."
              className="h-10 border-slate-200 darks:border-slate-800 bg-slate-50 darks:bg-slate-950 pl-10 rounded-md focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">
              <Filter size={14} />
              <span>Filter</span>
            </div>
            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as StatusFilter)}
            >
              <SelectTrigger className="w-[160px] h-10 rounded-md border-slate-200 darks:border-slate-800 bg-white darks:bg-slate-950 text-xs font-medium focus:ring-2 focus:ring-indigo-500">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="rounded-md border-slate-200 darks:border-slate-800 shadow-lg">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="inactive">Inactive Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Data Table Card */}
        <div className="bg-white darks:bg-slate-900 rounded-xl border border-slate-200 darks:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50 darks:bg-slate-800/50 border-b border-slate-200 darks:border-slate-800 hover:bg-transparent">
                  <SortableHead
                    field="title"
                    label="Entity Name"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                  <TableHead className="hidden md:table-cell text-xs font-bold uppercase tracking-wider text-slate-500 py-4">
                    Mandate Description
                  </TableHead>
                  <SortableHead
                    field="status"
                    label="Status"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                  <SortableHead
                    field="createdAt"
                    label="Date Initiated"
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                  <TableHead className="w-16 px-6" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-20 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="p-4 bg-slate-50 darks:bg-slate-800 rounded-full">
                          <Database size={24} className="text-slate-300" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-slate-900 darks:text-white">
                            No records found
                          </p>
                          <p className="text-xs text-slate-500">
                            Try adjusting your search terms or filters
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((society) => (
                    <TableRow
                      key={society.id}
                      className="group border-b border-slate-100 darks:border-slate-800/50 last:border-0 hover:bg-slate-50/50 darks:hover:bg-slate-800/30 transition-colors"
                    >
                      <TableCell className="py-4 px-6">
                        <div className="font-bold text-slate-900 darks:text-slate-100">
                          {society.title}
                        </div>
                      </TableCell>

                      <TableCell className="hidden max-w-xs md:table-cell py-4 text-slate-500 darks:text-slate-400 text-xs leading-relaxed">
                        {society.description ? (
                          <span className="line-clamp-1">
                            {society.description}
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium opacity-40 uppercase italic tracking-tighter">
                            No mandate provided
                          </span>
                        )}
                      </TableCell>

                      <TableCell className="py-4">
                        <StatusBadge status={society.status} />
                      </TableCell>

                      <TableCell className="py-4 text-xs font-medium text-slate-500 darks:text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar size={12} className="text-slate-400" />
                          {format(new Date(society.createdAt), "MMM dd, yyyy")}
                        </div>
                      </TableCell>

                      <TableCell className="py-4 text-right px-6">
                        <RowActions
                          society={society}
                          onEdit={handleEdit}
                          onDelete={setDeleteTarget}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Footer Metrics */}
          {filtered.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 darks:bg-slate-800/30 border-t border-slate-200 darks:border-slate-800">
              <div className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">
                Showing{" "}
                <span className="text-indigo-600 darks:text-indigo-400 font-bold">
                  {filtered.length}
                </span>{" "}
                of <span className="font-bold">{(societies ?? []).length}</span>{" "}
                entities
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                <Layers size={12} />
                Registry Index Validated
              </div>
            </div>
          )}
        </div>

        {/* Delete Dialog */}
        <AlertDialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
        >
          <AlertDialogContent className="rounded-xl border-slate-200 darks:border-slate-800 bg-white darks:bg-slate-900 shadow-2xl">
            <AlertDialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-50 darks:bg-red-950/30 rounded-lg">
                  <AlertTriangle className="text-red-600 h-5 w-5" />
                </div>
                <AlertDialogTitle className="text-lg font-bold text-slate-900 darks:text-white">
                  Confirm Entity Deletion
                </AlertDialogTitle>
              </div>
              <AlertDialogDescription className="text-sm text-slate-500 darks:text-slate-400 leading-relaxed">
                Are you sure you want to remove{" "}
                <span className="font-bold text-slate-900 darks:text-slate-100">
                  {deleteTarget?.title}
                </span>
                ? This will permanently purge the record from the registry. This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6 gap-3">
              <AlertDialogCancel className="rounded-md h-10 px-4 text-xs font-bold uppercase tracking-wider border-slate-200 darks:border-slate-800">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="rounded-md h-10 px-4 bg-red-600 text-white hover:bg-red-700 text-xs font-bold uppercase tracking-wider border-0 shadow-lg shadow-red-500/20"
                onClick={handleDeleteConfirm}
                disabled={isPending}
              >
                {isPending ? "Processing..." : "Confirm Deletion"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default AllSocieties;
