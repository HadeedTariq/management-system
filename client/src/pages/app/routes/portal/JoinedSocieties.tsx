import { Users, Calendar, Shield, Activity } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import LoadingBar from "@/components/LoadingBar";
import ClientErrorComponent from "../../components/ClientErrorComponent";
import { useGetJoinedSocieties } from "../../hooks/student/useStudent";
import { Link } from "react-router-dom";

const SocietyCard = ({ membership }: { membership: JoinedSociety }) => {
  const { role, memberStatus, joinedAt, society } = membership;

  // Format date to a readable string (e.g., "Oct 12, 2023")
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(joinedAt));

  return (
    <Link to={`/societies/${society.id}`}>
      <Card className="flex flex-col h-full transition-all duration-200 hover:shadow-md border-slate-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-lg font-semibold leading-tight text-slate-900 line-clamp-2">
              {society.title}
            </CardTitle>
            <Badge
              variant={society.status === "active" ? "default" : "secondary"}
              className={
                society.status === "active"
                  ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-indigo-200"
                  : "bg-slate-100 text-slate-600 border-slate-200"
              }
            >
              {society.status}
            </Badge>
          </div>
          <CardDescription className="text-sm text-slate-500 line-clamp-2 min-h-[40px] mt-1.5">
            {society.description || "No description provided for this society."}
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-3">
          {/* Role & Member Status */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Shield className="w-4 h-4 text-indigo-500" />
              <span className="capitalize font-medium">{role}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Activity className="w-4 h-4 text-slate-400" />
              <span className="capitalize">{memberStatus}</span>
            </div>
          </div>
          {/* Joined Date */}
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Joined {formattedDate}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

// Main Component
const JoinedSocieties = () => {
  const { data, isLoading, error, isError } = useGetJoinedSocieties();

  // Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center rounded-lg border border-slate-100 bg-slate-50/50">
        <LoadingBar />
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="p-6">
        <ClientErrorComponent
          error={error}
          title="Failed to load societies"
          message="We encountered an issue while fetching your joined societies. Please try again later."
        />
      </div>
    );
  }

  // Empty State
  if (!data || data?.length === 0) {
    return (
      <div className="flex flex-col min-h-[300px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 mb-4">
          <Users className="h-6 w-6 text-indigo-600" />
        </div>
        <h3 className="text-lg font-medium text-slate-900">No societies yet</h3>
        <p className="mt-1 text-sm text-slate-500 max-w-sm">
          You haven't joined any societies. Once you join, they will appear here
          for easy access.
        </p>
      </div>
    );
  }

  // Populated State
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
          Your Joined Societies
        </h2>
        <Badge
          variant="outline"
          className="text-indigo-600 bg-indigo-50 border-indigo-200"
        >
          {data?.length} Total
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((membership: JoinedSociety) => (
          <SocietyCard key={membership.membershipId} membership={membership} />
        ))}
      </div>
    </div>
  );
};

export default JoinedSocieties;
