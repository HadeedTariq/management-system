export const GridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="bg-white darks:bg-[#1E1C19] border border-[#1A1814]/10 rounded-2xl p-5.5 animate-pulse"
      >
        <div className="flex items-center gap-3 mb-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#E8E4DB] darks:bg-[#262421]" />
          <div className="space-y-2">
            <div className="h-3 w-20 bg-[#E8E4DB] darks:bg-[#262421] rounded" />
            <div className="h-2 w-24 bg-[#E8E4DB] darks:bg-[#262421] rounded" />
          </div>
        </div>
        <div className="pt-3.5 border-t border-[#1A1814]/10 h-6 w-full bg-[#E8E4DB] darks:bg-[#262421] rounded" />
      </div>
    ))}
  </div>
);
