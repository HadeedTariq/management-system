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
            active ? "text-[#4A7C65]" : "text-slate-400"
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
    <div className="min-h-screen bg-[#FDFDFD] darks:bg-[#0A0C0B] transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-8 sm:px-10 lg:px-12">
        {/* Page Header: Editorial Minimalism */}
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between border-b border-[#4A7C65]/10 pb-12">
          <div className="space-y-3">
            <h1 className="text-[10px] font-bold tracking-[0.4em] text-[#4A7C65] uppercase">
              Institutional Management
            </h1>
            <h2 className="text-5xl font-extralight tracking-tight text-slate-900 darks:text-white italic">
              Societies
            </h2>
            <p className="text-sm tracking-wide text-slate-400 darks:text-slate-500 font-light max-w-md">
              A centralized directory of registered mandates and their
              operational status.
            </p>
          </div>

          {/* Summary Chips: Elevated with hairlines, no heavy backgrounds */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 border border-slate-200 darks:border-slate-800 px-5 py-2 transition-all hover:border-[#4A7C65]/30">
              <Users strokeWidth={1.2} className="h-4 w-4 text-slate-400" />
              <span className="text-[11px] tracking-[0.2em] font-semibold text-slate-900 darks:text-slate-100 uppercase">
                {(societies ?? []).length}{" "}
                <span className="font-light opacity-50 ml-1">Total</span>
              </span>
            </div>

            <div className="flex items-center gap-3 border border-[#4A7C65]/30 bg-[#4A7C65]/5 px-5 py-2">
              <ShieldCheck
                strokeWidth={1.2}
                className="h-4 w-4 text-[#4A7C65]"
              />
              <span className="text-[11px] tracking-[0.2em] font-semibold text-[#4A7C65] uppercase">
                {activeCount}{" "}
                <span className="font-light opacity-60 ml-1">Active</span>
              </span>
            </div>

            <div className="flex items-center gap-3 border border-slate-200 darks:border-slate-800 px-5 py-2">
              <ShieldOff strokeWidth={1.2} className="h-4 w-4 text-slate-400" />
              <span className="text-[11px] tracking-[0.2em] font-semibold text-slate-600 darks:text-slate-400 uppercase">
                {inactiveCount}{" "}
                <span className="font-light opacity-50 ml-1">Inactive</span>
              </span>
            </div>
          </div>
        </div>

        {/* Toolbar: Precision positioned inputs */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1 group">
            <Search
              className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-[#4A7C65]"
              strokeWidth={1.5}
            />
            <Input
              placeholder="SEARCH REGISTRY..."
              className="h-12 border-0 border-b border-slate-200 darks:border-slate-800 bg-transparent pl-8 rounded-none focus-visible:ring-0 focus-visible:border-[#4A7C65] text-[10px] tracking-[0.2em] uppercase transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] tracking-widest text-slate-400 uppercase mr-2">
              <Filter size={12} strokeWidth={1.5} />
              <span>Status Filter</span>
            </div>
            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as StatusFilter)}
            >
              <SelectTrigger className="w-[180px] h-10 rounded-none border-slate-200 darks:border-slate-800 bg-transparent text-[10px] tracking-widest uppercase focus:ring-1 focus:ring-[#4A7C65]">
                <SelectValue placeholder="ALL STATES" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-[#4A7C65]/20 uppercase text-[9px] tracking-[0.2em]">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table: Monolithic and Clean */}
        <div className="overflow-hidden border border-slate-100 darks:border-slate-900 bg-white darks:bg-[#0F1110] transition-all">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-100 darks:border-slate-900 hover:bg-transparent">
                <SortableHead
                  field="title"
                  label="Entity"
                  sortField={sortField}
                  sortDir={sortDir}
                  onSort={handleSort}
                />
                <TableHead className="hidden md:table-cell text-[10px] tracking-[0.2em] font-bold uppercase text-slate-400 py-6">
                  Description / Mandate
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
                  label="Initiated"
                  sortField={sortField}
                  sortDir={sortDir}
                  onSort={handleSort}
                />
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>

            <TableBody className="text-sm font-light">
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-[1px] bg-[#4A7C65]/30" />
                      <p className="text-[10px] tracking-[0.3em] uppercase text-slate-400">
                        No matching records found in vault
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((society) => (
                  <TableRow
                    key={society.id}
                    className="group border-b border-slate-50 darks:border-slate-900/50 hover:bg-slate-50/40 darks:hover:bg-[#151816] transition-colors"
                  >
                    <TableCell className="py-6 pl-6">
                      <div className="font-semibold text-slate-900 darks:text-slate-100 tracking-wide italic">
                        {society.title}
                      </div>
                    </TableCell>

                    <TableCell className="hidden max-w-xs md:table-cell py-6 text-slate-400 font-light leading-relaxed">
                      {society.description ? (
                        <span className="line-clamp-1">
                          {society.description}
                        </span>
                      ) : (
                        <span className="text-[9px] tracking-widest opacity-30 uppercase">
                          Undocumented
                        </span>
                      )}
                    </TableCell>

                    <TableCell className="py-6">
                      <StatusBadge status={society.status} />
                    </TableCell>

                    <TableCell className="py-6 text-[10px] tracking-widest text-slate-400 uppercase">
                      {format(new Date(society.createdAt), "dd MMM yyyy")}
                    </TableCell>

                    <TableCell className="py-6 text-right pr-6">
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

          {/* Footer Metrics */}
          {filtered.length > 0 && (
            <div className="flex items-center justify-between px-8 py-6 bg-slate-50/50 darks:bg-[#080909]/50">
              <div className="text-[9px] tracking-[0.4em] uppercase text-slate-400">
                Vault Indexing:{" "}
                <span className="text-slate-900 darks:text-white font-bold">
                  {filtered.length}
                </span>{" "}
                of <span className="font-bold">{(societies ?? []).length}</span>
              </div>
              <div className="w-24 h-[1px] bg-[#4A7C65]/20" />
            </div>
          )}
        </div>

        {/* Delete Dialog: Clean and serious */}
        <AlertDialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
        >
          <AlertDialogContent className="rounded-none border-[#4A7C65]/20 bg-white darks:bg-[#0F1110]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[12px] tracking-[0.3em] uppercase font-bold text-slate-900 darks:text-white">
                Confirm Removal
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm font-light leading-relaxed pt-2">
                You are about to purge{" "}
                <span className="font-semibold italic text-[#4A7C65]">
                  {deleteTarget?.title}
                </span>{" "}
                from the registry. This action is final and absolute.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-8">
              <AlertDialogCancel className="rounded-none text-[10px] tracking-widest uppercase font-semibold">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="rounded-none bg-[#4A7C65] text-white hover:bg-[#3d6653] text-[10px] tracking-widest uppercase"
                onClick={handleDeleteConfirm}
                disabled={isPending}
              >
                Confirm Purge
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default AllSocieties;
