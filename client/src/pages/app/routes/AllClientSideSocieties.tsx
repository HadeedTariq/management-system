import { Users, Calendar, ArrowRight, Building2 } from "lucide-react";

import LoadingBar from "@/components/LoadingBar";
import ClientErrorComponent from "../components/ClientErrorComponent";
import { useGetAllPlatformSocieities } from "../hooks/student/useStudent";

// Assumed shadcn/ui imports (adjust paths based on your setup)
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

// --- Types ---
export type Society = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  memberCount: number;
};

// --- Subcomponents ---

/**
 * SocietyCard Component
 * Handles the display of individual society data.
 * Keeps the main component clean and enforces separation of concerns.
 */
const SocietyCard = ({ society }: { society: Society }) => {
  // Utility to determine badge color based on status
  const isActive = society.status.toLowerCase() === "active";

  return (
    <Card className="flex flex-col h-full bg-white border border-slate-200 transition-all duration-200 hover:shadow-md hover:border-indigo-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-md">
              <Building2 className="w-5 h-5" />
            </div>
            <CardTitle className="text-xl font-semibold text-slate-900 line-clamp-1">
              {society.title}
            </CardTitle>
          </div>
          <Badge
            variant={isActive ? "default" : "secondary"}
            className={
              isActive
                ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200"
                : "bg-slate-100 text-slate-600 border-slate-200"
            }
          >
            {society.status}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2 mt-3 text-sm text-slate-500 h-10">
          {society.description || "No description provided for this society."}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow flex flex-col gap-3 pb-6">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Users className="w-4 h-4 text-indigo-500" />
          <span className="font-medium">
            {society.memberCount.toLocaleString()}
          </span>
          <span className="text-slate-500">Members</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar className="w-4 h-4 text-indigo-500" />
          <span className="text-slate-500">Established</span>
          <span className="font-medium">
            {new Date(society.createdAt).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </CardContent>

      <CardFooter className="pt-0 mt-auto">
        <Link to={`/societies/${society.id}`}>
          <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all group">
            View Society Detail
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

// --- Main Component ---

const AllClientSideSocieties = () => {
  const { data, isLoading, error, isError } = useGetAllPlatformSocieities();

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

  const societies = data as Society[] | undefined;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Platform Societies
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl">
          Discover, join, and engage with the various communities across the
          platform.
        </p>
      </div>

      {/* Empty State */}
      {!societies || societies.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 mt-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
          <Building2 className="w-12 h-12 text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-900">
            No societies found
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            There are currently no registered societies on the platform.
          </p>
        </div>
      ) : (
        /* Data Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {societies.map((society) => (
            <SocietyCard key={society.id} society={society} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllClientSideSocieties;
