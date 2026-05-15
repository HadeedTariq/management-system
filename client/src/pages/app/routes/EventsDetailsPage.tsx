import { Link, useParams } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Building2,
  BadgeCheck,
  AlertCircle,
  CheckCircle2,
  Timer,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useGetEventDetails } from "../hooks/student/useStudent";

import LoadingBar from "@/components/LoadingBar";
import ClientErrorComponent from "../components/ClientErrorComponent";

const statusConfig = {
  upcoming: {
    label: "Upcoming",
    className:
      "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
    icon: Timer,
  },

  ongoing: {
    label: "Ongoing",
    className:
      "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300",
    icon: Clock3,
  },

  completed: {
    label: "Completed",
    className:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    icon: CheckCircle2,
  },

  cancelled: {
    label: "Cancelled",
    className: "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-300",
    icon: AlertCircle,
  },
};

const societyStatusConfig = {
  active: {
    label: "Active",
    className:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },

  inactive: {
    label: "Inactive",
    className:
      "border-zinc-500/20 bg-zinc-500/10 text-zinc-700 dark:text-zinc-300",
  },
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(date));
};

const EventsDetailsPage = () => {
  const { id } = useParams();

  const { data, isLoading, error, isError } = useGetEventDetails(id as string);

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
          title="Failed to load event details"
          message="We encountered an issue while fetching the event details. Please try again later."
        />
      </div>
    );
  }

  if (!data) return null;

  const eventStatus = statusConfig[data.status as keyof typeof statusConfig];

  const societyStatus =
    societyStatusConfig[
      data.society.status as keyof typeof societyStatusConfig
    ];

  const StatusIcon = eventStatus.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50/30 dark:to-blue-950/10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 lg:px-8">
        <Card className="overflow-hidden border-border/60 bg-background/80 shadow-xl backdrop-blur">
          <div className="relative">
            {data.image ? (
              <div className="relative h-[260px] w-full overflow-hidden md:h-[380px]">
                <img
                  src={data.image}
                  alt={data.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>
            ) : (
              <div className="flex h-[260px] items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-600 md:h-[380px]">
                <div className="flex flex-col items-center gap-4 text-center text-white">
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                    <CalendarDays className="h-12 w-12" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold md:text-4xl">
                      {data.title}
                    </h2>

                    <p className="text-sm text-blue-100 md:text-base">
                      Professional society event experience
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="absolute left-0 top-0 flex w-full items-start justify-between p-4 md:p-6">
              <Badge
                className={`gap-2 rounded-full border px-4 py-1.5 text-sm font-medium shadow-sm backdrop-blur ${eventStatus.className}`}
              >
                <StatusIcon className="h-4 w-4" />
                {eventStatus.label}
              </Badge>
            </div>

            {data.image && (
              <div className="absolute bottom-0 left-0 w-full p-5 md:p-8">
                <div className="max-w-4xl space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-white backdrop-blur">
                      <Building2 className="mr-2 h-4 w-4" />
                      {data.society.title}
                    </Badge>
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                    {data.title}
                  </h1>

                  {data.description && (
                    <p className="max-w-3xl text-sm leading-7 text-zinc-200 md:text-base">
                      {data.description}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <CardContent className="p-5 md:p-8">
            {!data.image && (
              <div className="mb-8 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-blue-700 dark:text-blue-300">
                    <Building2 className="mr-2 h-4 w-4" />
                    {data.society.title}
                  </Badge>
                </div>

                {data.description && (
                  <p className="max-w-4xl text-base leading-8 text-muted-foreground">
                    {data.description}
                  </p>
                )}
              </div>
            )}

            <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
              <div className="space-y-6">
                <Card className="border-border/60 shadow-sm">
                  <CardContent className="space-y-6 p-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400">
                        <CalendarDays className="h-5 w-5" />
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold">
                          Event Schedule
                        </h3>

                        <p className="text-sm text-muted-foreground">
                          Timing and availability information
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="rounded-2xl border bg-muted/30 p-5">
                        <p className="mb-2 text-sm font-medium text-muted-foreground">
                          Start Time
                        </p>

                        <p className="text-sm font-semibold leading-7">
                          {formatDate(data.startTime)}
                        </p>
                      </div>

                      <div className="rounded-2xl border bg-muted/30 p-5">
                        <p className="mb-2 text-sm font-medium text-muted-foreground">
                          End Time
                        </p>

                        <p className="text-sm font-semibold leading-7">
                          {data.endTime
                            ? formatDate(data.endTime)
                            : "Not specified"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/60 shadow-sm">
                  <CardContent className="space-y-6 p-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-violet-500/10 p-3 text-violet-600 dark:text-violet-400">
                        <MapPin className="h-5 w-5" />
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold">
                          Event Location
                        </h3>

                        <p className="text-sm text-muted-foreground">
                          Venue and accessibility information
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="rounded-2xl border bg-muted/30 p-5">
                      <p className="text-sm leading-7 text-muted-foreground">
                        {data.location || "Location not specified"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="sticky top-6 border-border/60 shadow-sm">
                  <CardContent className="space-y-6 p-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-600 dark:text-indigo-400">
                        <Building2 className="h-5 w-5" />
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold">
                          Society Details
                        </h3>

                        <p className="text-sm text-muted-foreground">
                          Associated organization information
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-5">
                      <div>
                        <p className="mb-2 text-sm font-medium text-muted-foreground">
                          Society Name
                        </p>

                        <Link
                          to={`/societies/${data.society.id}`}
                          className="text-base font-semibold"
                        >
                          {data.society.title}
                        </Link>
                      </div>

                      <div>
                        <p className="mb-2 text-sm font-medium text-muted-foreground">
                          Status
                        </p>

                        <Badge
                          className={`rounded-full border px-4 py-1.5 ${societyStatus.className}`}
                        >
                          <BadgeCheck className="mr-2 h-4 w-4" />
                          {societyStatus.label}
                        </Badge>
                      </div>

                      <div>
                        <p className="mb-2 text-sm font-medium text-muted-foreground">
                          Description
                        </p>

                        <p className="text-sm leading-7 text-muted-foreground">
                          {data.society.description ||
                            "No society description available."}
                        </p>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm text-muted-foreground">
                            Created
                          </span>

                          <span className="text-sm font-medium">
                            {formatDate(data.createdAt)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm text-muted-foreground">
                            Updated
                          </span>

                          <span className="text-sm font-medium">
                            {formatDate(data.updatedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventsDetailsPage;
