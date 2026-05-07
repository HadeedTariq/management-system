import { useFullApp } from "@/store/hooks/useFullApp";
import {
  Building2,
  CalendarDays,
  FileText,
  ArrowRight,
  Plus,
  List,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  tag: string;
  tagVariant: "indigo" | "violet" | "purple" | "blue";
  subItems?: { label: string; to: string }[];
  wide?: boolean;
}

interface StatCard {
  label: string;
  value: string | number;
  icon: string;
}

interface ActivityItem {
  text: string;
  time: string;
  section: string;
  iconColor: "indigo" | "violet" | "purple";
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats: StatCard[] = [
  { label: "My Societies", value: 3, icon: "🏛️" },
  { label: "Events", value: 12, icon: "📅" },
  { label: "Posts", value: 28, icon: "📝" },
];

const navCards: NavCard[] = [
  {
    title: "My Societies",
    description: "View and manage all your registered societies",
    icon: <Building2 className="h-5 w-5" />,
    to: "/society-head-dashboard/my-societies",
    tag: "3 Active",
    tagVariant: "indigo",
  },
  {
    title: "Event Management",
    description: "Create, schedule & track society events",
    icon: <CalendarDays className="h-5 w-5" />,
    to: "/society-head-dashboard/my-events",
    tag: "All Events",
    tagVariant: "violet",
  },
  {
    title: "Post Management",
    description:
      "Publish announcements, updates and news for your society members",
    icon: <FileText className="h-5 w-5" />,
    to: "/society-head-dashboard/my-posts",
    tag: "All Posts",
    tagVariant: "purple",
    wide: true,
    subItems: [{ label: "All Posts", to: "/society-head-dashboard/my-posts" }],
  },
];

const recentActivity: ActivityItem[] = [
  {
    text: "Annual General Meeting scheduled",
    time: "Today, 10:24 AM",
    section: "Event Management",
    iconColor: "indigo",
  },
  {
    text: "Ramadan fundraiser post published",
    time: "Yesterday, 3:45 PM",
    section: "Post Management",
    iconColor: "violet",
  },
  {
    text: "Society profile updated",
    time: "May 5, 2026",
    section: "My Societies",
    iconColor: "indigo",
  },
];

// ─── Colour helpers ────────────────────────────────────────────────────────────

const iconBg: Record<string, string> = {
  indigo: "bg-indigo-50 text-indigo-600",
  violet: "bg-violet-50 text-violet-600",
  purple: "bg-purple-50 text-purple-600",
  blue: "bg-blue-50 text-blue-600",
};

const tagStyle: Record<string, string> = {
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
  violet: "bg-violet-50 text-violet-600 border-violet-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100",
  blue: "bg-blue-50 text-blue-600 border-blue-100",
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ stat }: { stat: StatCard }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-indigo-100 p-4">
      {/* top accent bar */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-indigo-500 to-violet-500 rounded-t-2xl" />
      <p className="text-xl mb-1">{stat.icon}</p>
      <p className="text-2xl font-bold text-indigo-950">{stat.value}</p>
      <p className="text-[11px] font-medium text-gray-400 mt-0.5">
        {stat.label}
      </p>
    </div>
  );
}

function NavigationCard({ card }: { card: NavCard }) {
  return (
    <Link
      to={card.to}
      className={`group relative overflow-hidden rounded-2xl bg-white border border-indigo-100
        hover:border-indigo-300 hover:shadow-[0_8px_28px_rgba(99,102,241,0.13)]
        transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]
        p-5 flex flex-col
        ${card.wide ? "col-span-2" : "col-span-1"}
      `}
    >
      {/* arrow */}
      <ArrowRight
        className="absolute top-4 right-4 h-4 w-4 text-indigo-200 group-hover:text-indigo-400 transition-colors"
        aria-hidden
      />

      {/* icon */}
      <div
        className={`h-11 w-11 rounded-xl flex items-center justify-center mb-3 ${iconBg[card.tagVariant]}`}
      >
        {card.icon}
      </div>

      {/* text */}
      <p className="text-[15px] font-semibold text-indigo-950 mb-1">
        {card.title}
      </p>
      <p className="text-xs text-gray-400 leading-relaxed">
        {card.description}
      </p>

      {/* badge */}
      <span
        className={`mt-3 self-start text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${tagStyle[card.tagVariant]}`}
      >
        {card.tag}
      </span>

      {/* sub-items */}
      {card.subItems && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {card.subItems.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-[11px] font-medium text-indigo-600 bg-indigo-50 rounded-lg px-2.5 py-1 hover:bg-indigo-100 transition-colors"
            >
              {s.label === "New Post" ? (
                <Plus className="h-3 w-3" />
              ) : (
                <List className="h-3 w-3" />
              )}
              {s.label}
            </Link>
          ))}
        </div>
      )}
    </Link>
  );
}

function ActivityRow({ item }: { item: ActivityItem }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0 last:pb-0">
      <div
        className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg[item.iconColor]}`}
      >
        <Activity className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[12px] font-medium text-gray-700">{item.text}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">
          {item.time} · {item.section}
        </p>
      </div>
    </div>
  );
}

// ─── Page Component ────────────────────────────────────────────────────────────

export default function SocietyHeadDashboard() {
  const { user } = useFullApp();
  return (
    <div className="min-h-screen  p-6 font-sans">
      {/* ── Greeting ── */}
      <section className="mb-7">
        <p className="text-[11px] font-semibold tracking-widest text-indigo-500 uppercase mb-1">
          Society Head Portal
        </p>
        <h1 className="text-2xl font-bold text-indigo-950 leading-snug">
          Welcome back, {user?.user_name}
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Here's an overview of your society activity
        </p>
      </section>

      {/* ── Stats ── */}
      <section className="grid grid-cols-3 gap-3 mb-7">
        {stats.map((s) => (
          <StatCard key={s.label} stat={s} />
        ))}
      </section>

      {/* ── Navigation Cards ── */}
      <p className="text-[11px] font-semibold tracking-widest text-indigo-500 uppercase mb-3">
        Quick Navigation
      </p>
      <section className="grid grid-cols-2 gap-3.5 mb-7">
        {navCards.map((card) => (
          <NavigationCard key={card.title} card={card} />
        ))}
      </section>

      {/* ── Recent Activity ── */}
      <section className="bg-white rounded-2xl border border-indigo-100 p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-indigo-500" />
          <p className="text-sm font-semibold text-indigo-950">
            Recent Activity
          </p>
        </div>
        <div>
          {recentActivity.map((item, i) => (
            <ActivityRow key={i} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
