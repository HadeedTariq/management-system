import React from "react";
import {
  Moon,
  Sun,
  Calendar,
  Users,
  Briefcase,
  Bell,
  TrendingUp,
  Shield,
  Hexagon,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useGetAllPlatformEvents,
  useGetAllPlatformSocieities,
} from "../hooks/student/useStudent";
import HomeEvents from "../components/HomeEvents";
import { Link } from "react-router-dom";

export default function CiviConnectHomepage() {
  const { data, isLoading } = useGetAllPlatformSocieities();
  const { data: events, isLoading: isEventLoading } = useGetAllPlatformEvents();
  const getInitials = (title: string) => {
    return title
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };
  return (
    <>
      {/* HERO */}
      <section className="max-w-[1100px] mx-auto px-6 py-16 md:py-20 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#EDEAE3] darks:bg-[#252320] border border-[#1A1814]/10 darks:border-[#F2EFE8]/10 rounded-full px-3.5 py-1 text-xs font-medium text-indigo-600 darks:text-indigo-600 uppercase tracking-wider mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 darks:bg-indigo-600 animate-pulse"></div>
            Civiline College · Est. 2024
          </div>
          <h1 className="font-['Playfair_Display',_serif] text-4xl md:text-5xl lg:text-[52px] font-black leading-[1.1] tracking-tight mb-5">
            Where College
            <br />
            <em className="italic text-[#C8873A] darks:text-[#E09A4A]">
              Societies Thrive
            </em>
          </h1>
          <p className="text-base text-[#5C5748] darks:text-[#A8A298] leading-relaxed mb-8 max-w-[440px] font-light">
            Civi Connect is the all-in-one platform for managing, discovering,
            and participating in Civiline College's vibrant society ecosystem.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to={"/societies"}>
              <Button className="bg-indigo-600 hover:bg-indigo-600/90 text-[#F5F3EE] darks:bg-indigo-600 darks:hover:bg-indigo-600/90 h-[50px] px-7 text-[15px] rounded-xl">
                Join a Society
              </Button>
            </Link>
            <Button
              variant="outline"
              className="h-[50px] px-7 text-[15px] rounded-xl border-[#1A1814]/10 darks:border-[#F2EFE8]/10 text-[#1A1814] darks:text-[#F2EFE8] hover:bg-[#EDEAE3] darks:hover:bg-[#252320] bg-transparent"
            >
              Explore Features <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* HERO VISUAL */}
        <div className="relative h-[340px] mt-8 md:mt-0">
          {/* Main Card */}
          <div className="absolute top-0 left-0 right-0 z-30 bg-white darks:bg-[#1E1C19] border border-[#1A1814]/10 darks:border-[#F2EFE8]/10 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3.5 pb-3 border-b border-[#1A1814]/10 darks:border-[#F2EFE8]/10">
              <span className="text-[13px] font-medium text-[#5C5748] darks:text-[#A8A298]">
                Active Societies
              </span>
              <Link to={"/societies"}>
                <span className="text-[11px] text-indigo-600 darks:text-indigo-600 cursor-pointer">
                  View all →
                </span>
              </Link>
            </div>
            <div className="flex flex-col gap-2.5">
              {isLoading &&
                [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2.5 bg-[#F5F3EE] darks:bg-[#141210] rounded-lg animate-pulse"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#E8E4DB] darks:bg-[#262421] shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-24 bg-[#E8E4DB] darks:bg-[#262421] rounded" />
                      <div className="h-2 w-32 bg-[#E8E4DB] darks:bg-[#262421] rounded" />
                    </div>
                    <div className="ml-auto h-4 w-12 bg-[#E8E4DB] darks:bg-[#262421] rounded-full" />
                  </div>
                ))}
              {!isLoading &&
                data?.slice(0, 3).map((soc: GetAllSocietiesResponse) => {
                  // Dynamic colors based on status or index if you want variety
                  // Here using a default "Active" style similar to your CS example
                  const isActive = soc.status.toLowerCase() === "active";

                  return (
                    <Link
                      to={`/societies/${soc.id}`}
                      key={soc.id}
                      className="flex items-center gap-3 p-2.5 bg-[#F5F3EE] darks:bg-[#141210] rounded-lg"
                    >
                      {/* Icon Box */}
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 
                ${
                  isActive
                    ? "bg-[#EAF3DE] darks:bg-[#1A2F0D] text-[#3B6D11] darks:text-[#9FD44A]"
                    : "bg-[#E6F1FB] darks:bg-[#0D2A4A] text-[#185FA5] darks:text-[#5FA0DF]"
                }`}
                      >
                        {getInitials(soc.title)}
                      </div>

                      {/* Content */}
                      <div>
                        <div className="text-[13px] font-medium text-[#1A1814] darks:text-[#F2EFE8]">
                          {soc.title}
                        </div>
                        <div className="text-[11px] text-[#9C9488] darks:text-[#6B6560]">
                          {soc.memberCount} members ·{" "}
                          {soc.description || "No description"}
                        </div>
                      </div>

                      {/* Status Pill */}
                      <span
                        className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-medium 
                ${
                  isActive
                    ? "bg-[#EAF3DE] darks:bg-[#1A2F0D] text-[#3B6D11] darks:text-[#9FD44A]"
                    : "bg-[#FAEEDA] darks:bg-[#2A1C06] text-[#854F0B] darks:text-[#FAC775]"
                }`}
                      >
                        {soc.status}
                      </span>
                    </Link>
                  );
                })}
            </div>
          </div>

          {/* Float Card 1 */}
          <div
            className="absolute -bottom-2 -right-2 md:bottom-8 md:-right-6 w-48 z-40 
  bg-indigo-600/90 darks:bg-indigo-600/90 backdrop-blur-md 
  text-[#F5F3EE] rounded-2xl p-5 
  shadow-[0_10px_30px_rgba(0,0,0,0.15)] 
  border border-white/10 
  transition-all duration-300 hover:scale-105"
          >
            <div className="font-['Playfair_Display',_serif] text-4xl font-semibold leading-none tracking-tight">
              {data?.length || 20}
              <span className="text-base font-medium opacity-70 ml-0.5">+</span>
            </div>

            <div className="text-sm opacity-80 mt-1 tracking-wide">
              Societies running
            </div>
          </div>

          {/* Float Card 2 */}
          <div
            className="absolute -bottom-6 -left-2 md:bottom-2 md:-left-6 w-44 z-40 
  bg-[#EDEAE3]/90 darks:bg-[#252320]/90 backdrop-blur-md 
  rounded-2xl p-5 
  shadow-[0_10px_30px_rgba(0,0,0,0.12)] 
  border border-black/5 darks:border-white/10
  transition-all duration-300 hover:scale-105"
          >
            <div
              className="text-[#C8873A] darks:text-[#E09A4A] 
    font-['Playfair_Display',_serif] text-3xl font-semibold tracking-tight"
            >
              1,200+
            </div>

            <div className="text-xs text-[#5C5748] darks:text-[#A8A298] mt-1 tracking-wide">
              Student members
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="border-y border-[#1A1814]/10 darks:border-[#F2EFE8]/10 bg-white darks:bg-[#1E1C19] transition-colors">
        <div className="max-w-[1100px] mx-auto py-7 px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#1A1814]/10 darks:divide-[#F2EFE8]/10">
          {[
            { num: data?.length || 20, suffix: "+", desc: "Active societies" },
            { num: "1,200", suffix: "+", desc: "Student members" },
            { num: "180", suffix: "+", desc: "Events per year" },
            { num: "98", suffix: "%", desc: "Member satisfaction" },
          ].map((stat, i) => (
            <div key={i} className="text-center px-5 mb-4 md:mb-0">
              <div className="font-['Playfair_Display',_serif] text-3xl md:text-4xl font-bold text-[#1A1814] darks:text-[#F2EFE8] leading-none mb-1.5">
                {stat.num}
                <span className="text-[#C8873A] darks:text-[#E09A4A]">
                  {stat.suffix}
                </span>
              </div>
              <div className="text-[13px] text-[#5C5748] darks:text-[#A8A298] font-normal">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES GRID */}
      <section className="max-w-[1100px] mx-auto py-20 px-6 md:px-10">
        <div className="mb-12">
          <div className="text-[11px] font-semibold tracking-widest uppercase text-indigo-600 darks:text-indigo-600 mb-2.5">
            Key Features
          </div>
          <h2 className="font-['Playfair_Display',_serif] text-3xl md:text-[38px] font-bold leading-[1.15] tracking-tight mb-3">
            Everything a society needs
            <br />
            to run smoothly
          </h2>
          <p className="text-base text-[#5C5748] darks:text-[#A8A298] font-light max-w-[520px] leading-relaxed">
            From registration to event planning, Civi Connect handles the
            administrative overhead so society leaders can focus on what
            matters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Featured Card */}
          <div className="bg-indigo-600 darks:bg-indigo-600 text-[#F5F3EE] border border-transparent rounded-2xl p-7 transition-all hover:-translate-y-0.5">
            <div className="w-11 h-11 rounded-xl bg-[#F5F3EE]/15 flex items-center justify-center mb-4.5">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-base font-medium mb-2 tracking-tight text-[#F5F3EE]">
              Event Management
            </h3>
            <p className="text-[13px] text-[#F5F3EE]/70 font-light leading-relaxed">
              Plan, publish, and manage society events with RSVP tracking,
              attendance records, and venue coordination all in one place.
            </p>
          </div>

          {[
            {
              icon: <Users />,
              title: "Member Directory",
              desc: "Searchable profiles for every society member with roles, contributions, and contact information securely managed.",
            },
            {
              icon: <Briefcase />,
              title: "Treasury & Budgets",
              desc: "Track society finances, manage dues, submit expense requests, and generate transparent budget reports for the college administration.",
            },
            {
              icon: <Bell />,
              title: "Announcements & Feeds",
              desc: "Broadcast updates to members, share news across the college, and keep everyone informed with targeted notification channels.",
            },
            {
              icon: <TrendingUp />,
              title: "Analytics Dashboard",
              desc: "Visualize membership growth, event attendance, engagement trends, and society health metrics with easy-to-read charts.",
            },
            {
              icon: <Shield />,
              title: "Role-Based Access",
              desc: "Granular permissions for Presidents, Secretaries, Treasurers, and Members with college admin oversight built in.",
            },
          ].map((feat, i) => (
            <div
              key={i}
              className="bg-white darks:bg-[#1E1C19] border border-[#1A1814]/10 darks:border-[#F2EFE8]/10 rounded-2xl p-7 transition-all hover:-translate-y-0.5 hover:bg-[#F0EDE6] darks:hover:bg-[#2A2824]"
            >
              <div className="w-11 h-11 rounded-xl bg-[#EDEAE3] darks:bg-[#252320] flex items-center justify-center mb-4.5 text-indigo-600 darks:text-indigo-600">
                {React.cloneElement(feat.icon as React.ReactElement, {
                  className: "w-5 h-5",
                })}
              </div>
              <h3 className="text-base font-medium mb-2 tracking-tight text-[#1A1814] darks:text-[#F2EFE8]">
                {feat.title}
              </h3>
              <p className="text-[13px] text-[#5C5748] darks:text-[#A8A298] font-light leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="h-[1px] bg-[#1A1814]/10 darks:bg-[#F2EFE8]/10 max-w-[1100px] mx-auto"></div>

      {/* SOCIETIES SHOWCASE */}
      <section className="max-w-[1100px] mx-auto py-20 px-6 md:px-10">
        <div className="mb-12">
          <div className="text-[11px] font-semibold tracking-widest uppercase text-indigo-600 darks:text-indigo-600 mb-2.5">
            Society Types
          </div>
          <h2 className="font-['Playfair_Display',_serif] text-3xl md:text-[38px] font-bold leading-[1.15] tracking-tight mb-3">
            A home for every interest
          </h2>
          <p className="text-base text-[#5C5748] darks:text-[#A8A298] font-light max-w-[520px] leading-relaxed">
            From academia to arts, Civi Connect supports all types of student
            societies under one unified platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {data?.map((society) => (
            <div
              key={society.id}
              className="group relative overflow-hidden rounded-3xl border border-[#1A1814]/10 darks:border-[#F2EFE8]/10 bg-white/90 darks:bg-[#1E1C19]/90 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/5 darks:hover:shadow-black/20"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all duration-500" />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                      <Users className="w-6 h-6" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-[#1A1814] darks:text-[#F2EFE8] line-clamp-1">
                        {society.title}
                      </h3>

                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-medium capitalize ${
                            society.status === "active"
                              ? "bg-emerald-100 text-emerald-700 darks:bg-emerald-500/10 darks:text-emerald-400"
                              : "bg-red-100 text-red-700 darks:bg-red-500/10 darks:text-red-400"
                          }`}
                        >
                          {society.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#1A1814] darks:text-[#F2EFE8]">
                      {society.memberCount}
                    </p>
                    <p className="text-[12px] text-[#5C5748] darks:text-[#A8A298]">
                      Students
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-[#5C5748] darks:text-[#A8A298] line-clamp-3 min-h-[72px]">
                  {society.description ||
                    "No description available for this society."}
                </p>

                <div className="mt-6 pt-5 border-t border-[#1A1814]/10 darks:border-[#F2EFE8]/10 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#8B8475] darks:text-[#7D776D]">
                      Created
                    </p>

                    <p className="text-sm mt-1 font-medium text-[#1A1814] darks:text-[#F2EFE8]">
                      {new Date(society.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <Link to={`/societies/${society.id}`}>
                    <button className="px-4 py-2 rounded-xl bg-[#1A1814] text-white text-sm font-medium transition-all hover:bg-black darks:bg-[#F2EFE8] darks:text-[#1A1814] darks:hover:bg-white">
                      View Society
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-[1px] bg-[#1A1814]/10 darks:bg-[#F2EFE8]/10 max-w-[1100px] mx-auto"></div>

      {/* HOW IT WORKS */}
      <section className="max-w-[1100px] mx-auto py-20 px-6 md:px-10">
        <div className="mb-12">
          <div className="text-[11px] font-semibold tracking-widest uppercase text-indigo-600 darks:text-indigo-600 mb-2.5">
            How It Works
          </div>
          <h2 className="font-['Playfair_Display',_serif] text-3xl md:text-[38px] font-bold leading-[1.15] tracking-tight">
            Up and running in minutes
          </h2>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-[28px] left-[12.5%] right-[12.5%] h-[1px] bg-[#1A1814]/10 darks:bg-[#F2EFE8]/10 z-0"></div>

          {[
            {
              step: 1,
              title: "Register",
              desc: "Sign up with your college credentials and create or join your society profile.",
              active: true,
            },
            {
              step: 2,
              title: "Configure",
              desc: "Set up roles, committees, and your society's details in the admin panel.",
              active: false,
            },
            {
              step: 3,
              title: "Engage",
              desc: "Post announcements, plan events, and recruit new members across campus.",
              active: false,
            },
            {
              step: 4,
              title: "Grow",
              desc: "Track progress, analyze data, and build a stronger society year after year.",
              active: false,
            },
          ].map((wf, i) => (
            <div key={i} className="relative z-10 text-center px-5">
              <div
                className={`w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center font-['Playfair_Display',_serif] text-xl font-bold transition-colors ${
                  wf.active
                    ? "bg-indigo-600 darks:bg-indigo-600 text-[#F5F3EE] border-indigo-600 darks:border-indigo-600"
                    : "bg-white darks:bg-[#1E1C19] border border-[#1A1814]/10 darks:border-[#F2EFE8]/10 text-[#1A1814] darks:text-[#F2EFE8]"
                }`}
              >
                {wf.step}
              </div>
              <div className="text-sm font-medium text-[#1A1814] darks:text-[#F2EFE8] mb-1.5">
                {wf.title}
              </div>
              <div className="text-xs text-[#9C9488] darks:text-[#6B6560] leading-relaxed">
                {wf.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-[1px] bg-[#1A1814]/10 darks:bg-[#F2EFE8]/10 max-w-[1100px] mx-auto"></div>

      {/* EVENTS SECTION */}
      <section className="max-w-[1100px] mx-auto py-20 px-6 md:px-10">
        <div className="mb-12">
          <div className="text-[11px] font-semibold tracking-widest uppercase text-indigo-600 darks:text-indigo-600 mb-2.5">
            Events
          </div>
          <h2 className="font-['Playfair_Display',_serif] text-3xl md:text-[38px] font-bold leading-[1.15] tracking-tight mb-3">
            Never miss a moment
          </h2>
          <p className="text-base text-[#5C5748] darks:text-[#A8A298] font-light max-w-[520px] leading-relaxed">
            A unified college events calendar powered by real-time RSVP data and
            automated reminders.
          </p>
        </div>

        <HomeEvents events={events || []} isEventLoading={isEventLoading} />
      </section>

      {/* CTA BANNER */}
      <section className="bg-indigo-600 darks:bg-indigo-600 transition-colors">
        <div className="max-w-[1100px] mx-auto py-16 px-6 md:py-20 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h2 className="font-['Playfair_Display',_serif] text-3xl md:text-[40px] font-bold leading-[1.15] tracking-tight text-[#F5F3EE] mb-3.5">
              Ready to connect your
              <br />
              college community?
            </h2>
            <p className="text-[15px] text-[#F5F3EE]/70 font-light leading-relaxed mb-6">
              Join Civi Connect today and give your society the tools it
              deserves. It's free for all Civiline College students and staff.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to={"/societies"}>
                <Button className="bg-[#F5F3EE] hover:bg-[#F5F3EE]/90 text-indigo-600 darks:text-indigo-600 h-[50px] px-7 text-[15px] rounded-xl font-medium">
                  Get Started
                </Button>
              </Link>
              <Link to={"/about-us"}>
                <Button
                  variant="outline"
                  className="h-[50px] px-7 text-[15px] rounded-xl border-[#F5F3EE]/25 text-[#F5F3EE] hover:bg-[#F5F3EE]/10 bg-transparent"
                >
                  Learn more <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                title: "Free for students",
                desc: "No subscription fees for any society or member",
              },
              {
                title: "Instant setup",
                desc: "Get a society running in under 10 minutes",
              },
              {
                title: "Admin oversight",
                desc: "College administration dashboard included",
              },
              {
                title: "Secure & private",
                desc: "College-scoped data, no third-party sharing",
              },
            ].map((feat, i) => (
              <div
                key={i}
                className="bg-[#F5F3EE]/10 border border-[#F5F3EE]/15 rounded-xl p-4"
              >
                <div className="text-[13px] font-medium text-[#F5F3EE] mb-1">
                  {feat.title}
                </div>
                <div className="text-xs text-[#F5F3EE]/55 leading-relaxed">
                  {feat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
