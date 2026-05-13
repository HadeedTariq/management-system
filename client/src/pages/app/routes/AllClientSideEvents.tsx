import { useMemo } from "react";
import LoadingBar from "@/components/LoadingBar";
import { useGetAllPlatformEvents } from "../hooks/student/useStudent";
import ClientErrorComponent from "../components/ClientErrorComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Clock, ArrowRight, Users } from "lucide-react";

// Type definition matching your API response
type PlatformEvent = {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  location: string | null;
  startTime: Date;
  endTime: Date | null;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
  society: {
    id: string;
    title: string;
    description: string | null;
    status: string;
  };
};

// Utility: Clean date formatter
const formatDateTime = (date: Date | null) => {
  if (!date) return "TBA";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Subcomponent: Status Badge
const EventStatusBadge = ({ status }: { status: PlatformEvent["status"] }) => {
  const statusStyles: Record<PlatformEvent["status"], string> = {
    upcoming:
      "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100",
    ongoing:
      "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
    completed: "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100",
  };

  return (
    <Badge
      variant="outline"
      className={`capitalize font-medium px-3 py-1 ${statusStyles[status]}`}
    >
      {status}
    </Badge>
  );
};

// Subcomponent: Hero Event Card
const HeroEventCard = ({ event }: { event: PlatformEvent }) => (
  <Card className="overflow-hidden border-slate-200 shadow-sm transition-shadow hover:shadow-md">
    <div className="grid md:grid-cols-2 gap-0">
      <div className="relative h-64 md:h-auto bg-slate-100">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-100">
            <CalendarDays className="h-12 w-12 text-indigo-300" />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between p-6 md:p-8">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <EventStatusBadge status={event.status} />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Featured
            </span>
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold text-slate-900 leading-tight mb-1">
              {event.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm font-medium text-indigo-600">
              <Users className="h-3.5 w-3.5" />
              <span>{event.society.title}</span>
            </div>
          </div>
          <CardDescription className="text-slate-600 line-clamp-3 text-base leading-relaxed">
            {event.description || "No description available for this event."}
          </CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-500">
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-indigo-500 shrink-0" />
                <span>{event.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-indigo-500 shrink-0" />
              <span>{formatDateTime(event.startTime)}</span>
              {event.endTime && (
                <span className="text-slate-400 ml-1">
                  — {formatDateTime(event.endTime)}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm h-11 px-6">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </Card>
);

// Subcomponent: Grid Event Card
const GridEventCard = ({ event }: { event: PlatformEvent }) => (
  <Card className="group flex flex-col overflow-hidden border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-indigo-200">
    <div className="relative h-44 bg-slate-100">
      {event.image ? (
        <img
          src={event.image}
          alt={event.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-50">
          <CalendarDays className="h-8 w-8 text-indigo-200" />
        </div>
      )}
      <div className="absolute top-3 right-3">
        <EventStatusBadge status={event.status} />
      </div>
    </div>
    <CardHeader className="flex-1 pb-2">
      <div className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 mb-1">
        <Users className="h-3.5 w-3.5" />
        <span className="truncate">{event.society.title}</span>
      </div>
      <CardTitle className="text-lg font-semibold text-slate-900 line-clamp-2 leading-snug group-hover:text-indigo-700 transition-colors">
        {event.title}
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-0 pb-4 flex-1">
      <div className="space-y-2 text-sm text-slate-500">
        {event.location && (
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span>{formatDateTime(event.startTime)}</span>
        </div>
      </div>
    </CardContent>
    <CardFooter className="pt-0 pb-4 border-t border-slate-100 mt-auto">
      <Button
        variant="ghost"
        className="w-full justify-start text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-3 h-10 font-medium"
      >
        View Details <ArrowRight className="ml-2 h-3.5 w-3.5" />
      </Button>
    </CardFooter>
  </Card>
);

// Main Component
const AllClientSideEvents = () => {
  const { data, isLoading, error, isError } = useGetAllPlatformEvents();

  if (isLoading) return <LoadingBar />;

  if (isError) {
    return (
      <div className="p-6">
        <ClientErrorComponent
          error={error}
          title="Failed to load events"
          message="We encountered an issue while fetching the platform events. Please try again later."
        />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <CalendarDays className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">
          No events scheduled
        </h3>
        <p className="text-slate-500 mt-1 max-w-sm">
          There are currently no platform events available. Check back soon for
          updates.
        </p>
      </div>
    );
  }

  const heroEvent = data[0];
  const gridEvents = data.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <div className="flex items-baseline justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Platform Events
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Discover and manage upcoming society activities.
          </p>
        </div>
      </div>

      <HeroEventCard event={heroEvent} />

      {gridEvents.length > 0 && (
        <section className="space-y-5">
          <h2 className="text-lg font-semibold text-slate-800 tracking-tight">
            More Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridEvents.map((event) => (
              <GridEventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AllClientSideEvents;
