import LoadingBar from "@/components/LoadingBar";
import SocietyHeadErrorComponent from "../../components/society-head/SocietyHeadErrorComponent";
import { useGetMyAllEvents } from "../../hooks/society-head/useSocietyHead";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Pencil,
  Image as ImageIcon,
} from "lucide-react";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const AllEvents = () => {
  const { data: events, isLoading, isError, error } = useGetMyAllEvents();

  if (isLoading) return <LoadingBar />;

  if (isError)
    return (
      <SocietyHeadErrorComponent
        title={!events ? "Events not found" : "Communication Error"}
        error={error}
      />
    );

  const getStatusBadge = (status: MyEvent["status"]) => {
    const statusStyles = {
      upcoming:
        "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200",
      ongoing:
        "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200",
      completed:
        "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200",
      cancelled: "bg-red-100 text-red-700 hover:bg-red-200 border-red-200",
    };

    return (
      <Badge
        variant="outline"
        className={`capitalize shadow-none ${statusStyles[status]}`}
      >
        {status}
      </Badge>
    );
  };
  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-200 pb-6 darks:border-slate-800 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            My Events
          </h1>
          <p className="text-slate-500 mt-1">
            Manage and track all your events.
          </p>
        </div>
      </div>

      {!events || events.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-slate-200 border-dashed">
          <Calendar className="w-12 h-12 text-indigo-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-900">
            No events found
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            There are currently no events scheduled for this society.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {(events as MyEvent[]).map((event) => (
            <Card
              key={event.id}
              className="flex flex-col overflow-hidden border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-indigo-200"
            >
              {event.image ? (
                <div className="w-full h-48 overflow-hidden bg-slate-100 border-b border-slate-100">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-indigo-50/50 border-b border-indigo-100/50">
                  <ImageIcon className="w-10 h-10 text-indigo-200" />
                </div>
              )}

              <CardHeader className="pb-3 flex-none">
                <div className="flex items-start justify-between gap-4 mb-2">
                  {getStatusBadge(event.status)}
                  <span className="text-xs font-medium text-slate-400">
                    {formatDate(event.createdAt)}
                  </span>
                </div>
                <CardTitle className="text-xl leading-tight line-clamp-1 text-slate-900">
                  {event.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-grow space-y-4">
                <p className="text-sm text-slate-600 line-clamp-2 min-h-[2.5rem]">
                  {event.description ||
                    "No description provided for this event."}
                </p>

                <div className="space-y-2.5 bg-slate-50 p-4 rounded-lg border border-slate-100">
                  {event.location && (
                    <div className="flex items-start gap-2.5 text-sm text-slate-700">
                      <MapPin className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2.5 text-sm text-slate-700">
                    <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>{formatDate(event.startTime)}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-sm text-slate-700">
                    <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>
                      {formatTime(event.startTime)}
                      {event.endTime && ` - ${formatTime(event.endTime)}`}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-4 border-t border-slate-100 bg-slate-50/50 flex gap-3">
                {/* Edit functionality assumed to be handled externally or via route navigation, 
                        using standard button here for the layout. */}
                <Link
                  to={`/society-head-dashboard/my-society/${event.societyId}/update-event/${event.id}`}
                >
                  <Button
                    variant="outline"
                    className="w-full bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-800"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEvents;
