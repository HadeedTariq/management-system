import { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Users,
  Calendar,
  FileText,
  Filter,
  ArrowUpDown,
  Building2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// Shadcn UI Imports
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

// Existing Imports
import LoadingBar from "@/components/LoadingBar";
import { useGetMySocieties } from "../../hooks/society-head/useSocietyHead";
import SocietyHeadErrorComponent from "../../components/society-head/SocietyHeadErrorComponent";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type SortField = "title" | "status" | "createdAt" | "updatedAt";
type SortDir = "asc" | "desc";
type StatusFilter = "all" | "active" | "inactive";

const SocietyHeadSocieties = () => {
  const { data: societies, isLoading, isError, error } = useGetMySocieties();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  if (isLoading) return <LoadingBar />;
  if (isError) return <SocietyHeadErrorComponent error={error} />;

  // ── Derived data ────────────────────────────────────────────────────────────
  const filtered = (societies ?? [])
    .filter((s: GetMySocietiesResponse) => {
      const matchesSearch =
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        (s.description ?? "").toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || s.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a: GetMySocietiesResponse, b: GetMySocietiesResponse) => {
      let cmp = 0;
      if (sortField === "title") cmp = a.title.localeCompare(b.title);
      else if (sortField === "status") cmp = a.status.localeCompare(b.status);
      else if (sortField === "createdAt")
        cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      else if (sortField === "updatedAt")
        cmp = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      return sortDir === "asc" ? cmp : -cmp;
    });

  const activeCount = (societies ?? []).filter(
    (s) => s.status === "active",
  ).length;
  const totalCount = (societies ?? []).length;

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white darks:from-slate-950 darks:to-slate-900">
      <div className="px-6 py-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 darks:text-slate-50">
                Society Portfolio
              </h1>
              <p className="text-base text-slate-600 darks:text-slate-400">
                Manage and oversee all societies under your administration
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Total Societies */}
          <Card className="border border-slate-200 darks:border-slate-800 bg-white darks:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 darks:text-slate-400 mb-1">
                    Total Societies
                  </p>
                  <p className="text-3xl font-bold text-slate-900 darks:text-slate-50">
                    {totalCount}
                  </p>
                </div>
                <div className="p-3 bg-indigo-100 darks:bg-indigo-950/40 rounded-lg">
                  <Building2 className="w-6 h-6 text-indigo-600 darks:text-indigo-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Units */}
          <Card className="border border-slate-200 darks:border-slate-800 bg-white darks:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 darks:text-slate-400 mb-1">
                    Active Units
                  </p>
                  <p className="text-3xl font-bold text-slate-900 darks:text-slate-50">
                    {activeCount}
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 darks:bg-emerald-950/40 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 darks:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Members */}
          <Card className="border border-slate-200 darks:border-slate-800 bg-white darks:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 darks:text-slate-400 mb-1">
                    Total Members
                  </p>
                  <p className="text-3xl font-bold text-slate-900 darks:text-slate-50">
                    {societies?.reduce(
                      (acc, curr) => acc + curr.memberCount,
                      0,
                    ) ?? 0}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 darks:bg-blue-950/40 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600 darks:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table Card */}
        <Card className="border border-slate-200 darks:border-slate-800 bg-white darks:bg-slate-900 shadow-sm overflow-hidden">
          {/* Filters Header */}
          <div className="border-b border-slate-200 darks:border-slate-800 p-6 bg-slate-50 darks:bg-slate-800/50">
            <div className="flex flex-col gap-4">
              <p className="text-sm font-medium text-slate-700 darks:text-slate-300">
                Filter & Search
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search by name or description..."
                    className="pl-10 bg-white darks:bg-slate-950 border-slate-300 darks:border-slate-700 text-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Select
                  value={statusFilter}
                  onValueChange={(v) => setStatusFilter(v as StatusFilter)}
                >
                  <SelectTrigger className="w-full sm:w-[160px] bg-white darks:bg-slate-950 border-slate-300 darks:border-slate-700 text-sm">
                    <Filter className="w-4 h-4 mr-2 opacity-60" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50 darks:bg-slate-800/50 border-b border-slate-200 darks:border-slate-800">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-12 px-6 py-3 font-semibold text-slate-700 darks:text-slate-300 text-sm">
                    <button
                      onClick={() => handleSort("title")}
                      className="flex items-center gap-2 hover:text-indigo-600 darks:hover:text-indigo-400 transition-colors font-semibold"
                    >
                      Society Details
                      <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                    </button>
                  </TableHead>
                  <TableHead className="h-12 px-6 py-3 font-semibold text-slate-700 darks:text-slate-300 text-sm">
                    Status
                  </TableHead>
                  <TableHead className="h-12 px-6 py-3 font-semibold text-slate-700 darks:text-slate-300 text-sm">
                    Members
                  </TableHead>
                  <TableHead className="h-12 px-6 py-3 font-semibold text-slate-700 darks:text-slate-300 text-sm">
                    <button
                      onClick={() => handleSort("createdAt")}
                      className="flex items-center gap-2 hover:text-indigo-600 darks:hover:text-indigo-400 transition-colors font-semibold"
                    >
                      Registered
                      <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                    </button>
                  </TableHead>
                  <TableHead className="h-12 px-6 py-3 font-semibold text-slate-700 darks:text-slate-300 text-sm text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length > 0 ? (
                  filtered.map((society) => (
                    <TableRow
                      key={society.id}
                      className="border-b border-slate-100 darks:border-slate-800 hover:bg-slate-50 darks:hover:bg-slate-800/50 transition-colors group"
                    >
                      <TableCell className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          <span className="font-semibold text-slate-900 darks:text-slate-50 text-sm">
                            {society.title}
                          </span>
                          <span className="text-xs text-slate-500 darks:text-slate-400 truncate max-w-xs">
                            {society.description || "No description"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <Badge
                          variant="secondary"
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border",
                            society.status === "active"
                              ? "bg-emerald-50 darks:bg-emerald-950/30 text-emerald-700 darks:text-emerald-300 border-emerald-200 darks:border-emerald-800"
                              : "bg-slate-100 darks:bg-slate-800 text-slate-700 darks:text-slate-300 border-slate-200 darks:border-slate-700",
                          )}
                        >
                          {society.status === "active" ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5" />
                          )}
                          {society.status.charAt(0).toUpperCase() +
                            society.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-700 darks:text-slate-300 font-medium">
                          <Users className="w-4 h-4 opacity-60" />
                          {society.memberCount}
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-slate-600 darks:text-slate-400">
                        {new Date(society.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-lg h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-100 darks:hover:bg-slate-800"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel className="text-xs font-semibold text-slate-700 darks:text-slate-300">
                              Management
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-sm">
                              <Calendar className="w-4 h-4 text-slate-500" />
                              Manage Events
                            </DropdownMenuItem>
                            <Link
                              to={`/society-head-dashboard/my-society/posts/${society.id}`}
                            >
                              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-sm">
                                <FileText className="w-4 h-4 text-slate-500" />
                                Manage Posts
                              </DropdownMenuItem>
                            </Link>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <div className="flex flex-col items-center justify-center py-16 px-4">
                        <div className="p-4 bg-slate-100 darks:bg-slate-800 rounded-lg mb-4">
                          <Building2 className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="font-semibold text-slate-900 darks:text-slate-50 mb-1">
                          No societies found
                        </p>
                        <p className="text-sm text-slate-500 darks:text-slate-400">
                          Try adjusting your search or filters
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SocietyHeadSocieties;
