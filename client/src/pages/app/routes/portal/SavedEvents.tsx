import { Link } from "react-router-dom"; // Assuming standard react-router setup
import LoadingBar from "@/components/LoadingBar";
import {
  useGetSavedEvents,
  useSaveEvent,
} from "../../hooks/student/useStudent";
import ClientErrorComponent from "../../components/ClientErrorComponent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  CalendarDays,
  CalendarX,
  ChevronRight,
  Clock,
  MapPin,
  User,
} from "lucide-react";
// Subcomponent: Handles the modern row/card layout for an individual saved event
const SavedEventRow = ({ item }: { item: SavedEvent }) => {
  const { event, society, author } = item;
  const { mutate, isPending } = useSaveEvent(event.id, society.id);

  // Custom configuration for status badge colors to keep visual alignment clean
  const statusConfig = {
    upcoming: "bg-indigo-50 text-indigo-700 border-indigo-100",
    ongoing: "bg-emerald-50 text-emerald-700 border-emerald-100",
    completed: "bg-slate-100 text-slate-600 border-slate-200",
    cancelled: "bg-rose-50 text-rose-700 border-rose-100",
  };

  const formattedStartTime = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(event.startTime));

  const formattedEndTime = event.endTime
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(event.endTime))
    : null;

  return (
    <Link
      to={`/events/${event.id}`}
      className="group flex flex-col sm:flex-row sm:items-center gap-5 rounded-xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-500/[0.03]"
    >
      {/* Media Box / Thumbnail Wrapper */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-gradient-to-br from-indigo-50/50 to-violet-50/50">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <CalendarDays
              className="h-6 w-6 text-indigo-500/80"
              strokeWidth={1.75}
            />
          </div>
        )}
      </div>

      {/* Main Content Block */}
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <h3 className="text-base font-semibold leading-snug text-slate-900 group-hover:text-indigo-700 transition-colors duration-200">
            {event.title}
          </h3>
          <Badge
            variant="outline"
            className={`capitalize border text-[10px] font-semibold ${statusConfig[event.status as keyof typeof statusConfig] || statusConfig.upcoming}`}
          >
            {event.status}
          </Badge>
          <Badge
            variant="secondary"
            className="bg-slate-100 text-slate-600 hover:bg-slate-100 text-[10px] font-medium max-w-[140px] truncate"
          >
            {society.title}
          </Badge>
        </div>

        {event.description && (
          <p className="line-clamp-2 max-w-3xl text-sm leading-relaxed text-slate-500">
            {event.description}
          </p>
        )}

        {/* Metadata Details Row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-0.5 text-xs font-medium text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-500">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>{formattedStartTime}</span>
            {formattedEndTime && (
              <>
                <ChevronRight className="h-3 w-3 text-slate-300" />
                <span>{formattedEndTime}</span>
              </>
            )}
          </span>

          {event.location && (
            <span className="flex items-center gap-1.5 text-slate-500">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              <span className="truncate max-w-[180px] sm:max-w-xs">
                {event.location}
              </span>
            </span>
          )}

          <span className="flex items-center gap-1.5 text-slate-400">
            <User className="h-3.5 w-3.5" />
            <span className="truncate max-w-[100px]">
              {author.userName || "Host"}
            </span>
          </span>
        </div>
      </div>

      {/* Action CTA Block */}
      <div className="sm:pl-4">
        <Button
          variant="outline"
          size="sm"
          disabled={isPending}
          onClick={(e) => {
            // Stop the link from being triggered
            e.preventDefault();
            // Stop the event from bubbling up to the card wrapper
            e.stopPropagation();

            mutate();
          }}
          className="h-9 w-full sm:w-auto px-4 border-indigo-100 bg-indigo-50/50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 font-medium transition-colors duration-200"
        >
          <Bookmark className="mr-2 h-3.5 w-3.5 fill-indigo-600 stroke-indigo-600" />
          Saved
        </Button>
      </div>
    </Link>
  );
};

// Main Grid Container Scaffold
const SavedEvents = () => {
  const { data, isLoading, error, isError } = useGetSavedEvents();

  // Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center rounded-xl border border-slate-100 bg-slate-50/50">
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
          title="Failed to load saved events"
          message="We encountered an issue while fetching your saved events. Please try again later."
        />
      </div>
    );
  }

  // Empty State Layout
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col min-h-[350px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/30 p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 mb-4 border border-indigo-100">
          <CalendarX className="h-5 w-5 text-indigo-600" />
        </div>
        <h3 className="text-base font-semibold text-slate-900">
          No saved events
        </h3>
        <p className="mt-1 text-sm text-slate-500 max-w-sm">
          Any events or workshops you bookmark across societies will appear here
          for you to keep track of.
        </p>
      </div>
    );
  }

  // Populated Functional Layout
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Saved Schedules
          </h2>
          <p className="text-sm text-slate-500">
            Keep an eye on timelines and locations for events you plan to
            attend.
          </p>
        </div>
        <Badge
          variant="outline"
          className="border-indigo-200 bg-indigo-50/50 px-2.5 py-1 text-xs font-semibold text-indigo-700"
        >
          {data.length} {data.length === 1 ? "Event" : "Events"}
        </Badge>
      </div>

      <div className="flex flex-col gap-4">
        {data.map((item: any) => (
          <SavedEventRow key={item.savedId} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SavedEvents;
