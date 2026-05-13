// --- Date Helper Functions ---
const formatDateFull = (dateStr: Date | string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateStr));
};

const getDay = (dateStr: Date | string) => {
  return new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(
    new Date(dateStr),
  );
};

const getMonth = (dateStr: Date | string) => {
  return new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    new Date(dateStr),
  );
};

// --- Skeleton Component ---
const EventsSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
    {/* Featured Event Skeleton */}
    <div className="lg:col-span-2 bg-white darks:bg-[#1E1C19] border border-[#1A1814]/10 darks:border-[#F2EFE8]/10 rounded-2xl p-8 animate-pulse">
      <div className="flex flex-wrap items-center gap-2.5 mb-4">
        <div className="h-6 w-24 bg-[#E8E4DB] darks:bg-[#262421] rounded-md" />
        <div className="h-6 w-32 bg-[#E8E4DB] darks:bg-[#262421] rounded-md" />
      </div>
      <div className="h-8 w-3/4 bg-[#E8E4DB] darks:bg-[#262421] rounded mb-2.5" />
      <div className="h-8 w-1/2 bg-[#E8E4DB] darks:bg-[#262421] rounded mb-5.5" />
      <div className="space-y-2 mb-5.5">
        <div className="h-4 w-full bg-[#E8E4DB] darks:bg-[#262421] rounded" />
        <div className="h-4 w-5/6 bg-[#E8E4DB] darks:bg-[#262421] rounded" />
        <div className="h-4 w-4/6 bg-[#E8E4DB] darks:bg-[#262421] rounded" />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-7.5 h-7.5 rounded-full bg-[#E8E4DB] darks:bg-[#262421] border-2 border-white darks:border-[#1E1C19] -ml-2 first:ml-0 shrink-0"
            />
          ))}
        </div>
        <div className="h-4 w-20 bg-[#E8E4DB] darks:bg-[#262421] rounded ml-1" />
      </div>
    </div>

    {/* Small Events List Skeleton */}
    <div className="flex flex-col gap-2.5">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white darks:bg-[#1E1C19] border border-[#1A1814]/10 darks:border-[#F2EFE8]/10 rounded-xl p-4 flex items-center gap-3.5 animate-pulse"
        >
          <div className="w-[38px] h-10 bg-[#E8E4DB] darks:bg-[#262421] rounded shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-3/4 bg-[#E8E4DB] darks:bg-[#262421] rounded" />
            <div className="h-2.5 w-1/2 bg-[#E8E4DB] darks:bg-[#262421] rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Main Component ---
const HomeEvents = ({
  events,
  isEventLoading,
}: {
  events: GetAllEventsResponse[];
  isEventLoading: boolean;
}) => {
  if (isEventLoading) return <EventsSkeleton />;

  // Empty state handling
  if (!events || events.length === 0) {
    return (
      <div className="p-8 text-center bg-white darks:bg-[#1E1C19] border border-[#1A1814]/10 darks:border-[#F2EFE8]/10 rounded-2xl text-[#5C5748] darks:text-[#A8A298]">
        No upcoming events at the moment.
      </div>
    );
  }

  // Split the data: First item is featured, the rest go to the list (max 4)
  const featuredEvent = events[0];
  const sideEvents = events.slice(1, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Featured Event Card */}
      <div className="lg:col-span-2 bg-white darks:bg-[#1E1C19] border border-[#1A1814]/10 darks:border-[#F2EFE8]/10 rounded-2xl p-8 transition-colors">
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="bg-[#EDEAE3] darks:bg-[#252320] rounded-md px-2.5 py-1 text-xs font-medium text-[#5C5748] darks:text-[#A8A298]">
            {formatDateFull(featuredEvent.startTime)}
          </span>
          <span className="bg-[#EDEAE3] darks:bg-[#252320] rounded-md px-2.5 py-1 text-xs font-medium text-indigo-600 darks:text-indigo-600">
            {featuredEvent.society.title}
          </span>
          {/* Optional: Add a status pill if needed */}
          {featuredEvent.status === "ongoing" && (
            <span className="bg-green-100 darks:bg-green-900/30 rounded-md px-2.5 py-1 text-xs font-medium text-green-700 darks:text-green-400">
              Happening Now
            </span>
          )}
        </div>

        <h3 className="font-['Playfair_Display',_serif] text-2xl font-bold text-[#1A1814] darks:text-[#F2EFE8] tracking-tight mb-2.5">
          {featuredEvent.title}
        </h3>

        <p className="text-sm text-[#5C5748] darks:text-[#A8A298] leading-relaxed font-light mb-5.5 line-clamp-3">
          {featuredEvent.description ||
            "Join us for this upcoming event. More details will be shared soon."}
        </p>

        {/* Keeping your static attendee avatars since attendee data isn't in the type */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {[
              {
                init: "AK",
                bg: "bg-[#EAF3DE] darks:bg-[#1A2F0D]",
                text: "text-[#3B6D11] darks:text-[#9FD44A]",
              },
              {
                init: "SR",
                bg: "bg-[#FAEEDA] darks:bg-[#2A1C06]",
                text: "text-[#854F0B] darks:text-[#FAC775]",
              },
              {
                init: "MH",
                bg: "bg-[#E6F1FB] darks:bg-[#0D2A4A]",
                text: "text-[#185FA5] darks:text-[#5FA0DF]",
              },
              {
                init: "ZA",
                bg: "bg-[#FBEAF0] darks:bg-[#3B1521]",
                text: "text-[#993556] darks:text-[#E87599]",
              },
            ].map((av, i) => (
              <div
                key={i}
                className={`w-7.5 h-7.5 rounded-full border-2 border-white darks:border-[#1E1C19] flex items-center justify-center text-[10px] font-semibold -ml-2 first:ml-0 shrink-0 ${av.bg} ${av.text}`}
              >
                {av.init}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Side Events List */}
      <div className="flex flex-col gap-2.5">
        {sideEvents.map((ev: GetAllEventsResponse) => (
          <div
            key={ev.id}
            className="bg-white darks:bg-[#1E1C19] border border-[#1A1814]/10 darks:border-[#F2EFE8]/10 rounded-xl p-4 flex items-center gap-3.5 transition-colors hover:bg-[#F0EDE6] darks:hover:bg-[#2A2824] cursor-pointer"
          >
            <div className="text-center min-w-[38px] shrink-0">
              <div className="font-['Playfair_Display',_serif] text-xl font-bold text-[#C8873A] darks:text-[#E09A4A] leading-none">
                {getDay(ev.startTime)}
              </div>
              <div className="text-[10px] text-[#9C9488] darks:text-[#6B6560] uppercase tracking-wider mt-1">
                {getMonth(ev.startTime)}
              </div>
            </div>

            <div>
              <div className="text-[13px] font-medium text-[#1A1814] darks:text-[#F2EFE8] mb-0.5 line-clamp-1">
                {ev.title}
              </div>
              <div className="text-[11px] text-[#9C9488] darks:text-[#6B6560] line-clamp-1">
                {ev.society.title}
              </div>
            </div>
          </div>
        ))}

        {/* Optional: Filler if there are less than 4 side events */}
        {sideEvents.length === 0 && (
          <div className="h-full flex items-center justify-center border border-dashed border-[#1A1814]/10 darks:border-[#F2EFE8]/10 rounded-xl text-xs text-[#9C9488]">
            No other upcoming events
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeEvents;
