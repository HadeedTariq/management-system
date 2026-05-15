import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  ShieldCheck,
  Users,
  CalendarDays,
  MessageSquareDiff,
  ClipboardCheck,
  Crown,
  UserCog,
  UserCheck,
  KeyRound,
  BarChart3,
  Bell,
  Layers,
  ChevronRight,
  Sparkles,
  Lock,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.11 } },
};

const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────

type RoleKey = "admin" | "society_head" | "resident";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
}

interface RoleSection {
  key: RoleKey;
  label: string;
  tagline: string;
  icon: React.ReactNode;
  accentClass: string;
  ringClass: string;
  badgeClass: string;
  dotClass: string;
  features: Feature[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const roleSections: RoleSection[] = [
  {
    key: "admin",
    label: "Super Admin",
    tagline: "Platform-wide command and control",
    icon: <Crown className="h-5 w-5" />,
    accentClass: "from-violet-600 to-indigo-600",
    ringClass: "ring-violet-200",
    badgeClass:
      "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-50",
    dotClass: "bg-violet-500",
    features: [
      {
        icon: <Building2 className="h-5 w-5 text-violet-600" />,
        title: "Global Society Management",
        description:
          "Onboard new societies, configure subscription tiers, and oversee platform-wide settings from a single high-authority dashboard.",
        highlight: "Multi-tenant architecture",
      },
      {
        icon: <ShieldCheck className="h-5 w-5 text-violet-600" />,
        title: "Access & Role Governance",
        description:
          "Granular RBAC across every society. Define permissions, audit access logs, and enforce data boundaries at the platform level.",
        highlight: "Zero-trust RBAC",
      },
      {
        icon: <BarChart3 className="h-5 w-5 text-violet-600" />,
        title: "Platform Analytics",
        description:
          "Cross-society reporting on engagement, growth, and system health. Identify trends before they become problems.",
        highlight: "Real-time insights",
      },
      {
        icon: <UserCog className="h-5 w-5 text-violet-600" />,
        title: "User Lifecycle Control",
        description:
          "Approve, suspend, or permanently remove accounts. Manage impersonation for support, all with a complete audit trail.",
        highlight: "Full audit trail",
      },
    ],
  },
  {
    key: "society_head",
    label: "Society Head",
    tagline: "Everything your community needs, organized",
    icon: <UserCheck className="h-5 w-5" />,
    accentClass: "from-indigo-600 to-blue-600",
    ringClass: "ring-indigo-200",
    badgeClass:
      "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-50",
    dotClass: "bg-indigo-500",
    features: [
      {
        icon: <Users className="h-5 w-5 text-indigo-600" />,
        title: "Member Management",
        description:
          "Add, remove, and assign roles to society members. Maintain a live roster with join dates, status, and contact details.",
        highlight: "Role-aware roster",
      },
      {
        icon: <MessageSquareDiff className="h-5 w-5 text-indigo-600" />,
        title: "Announcements & Posts",
        description:
          "Publish notices, newsletters, and important updates. Control visibility and schedule posts in advance.",
        highlight: "Rich-text editor",
      },
      {
        icon: <CalendarDays className="h-5 w-5 text-indigo-600" />,
        title: "Event Coordination",
        description:
          "Create and manage society events with location, timing, and status tracking. From meetings to festivals—handled.",
        highlight: "Status lifecycle",
      },
      {
        icon: <ClipboardCheck className="h-5 w-5 text-indigo-600" />,
        title: "Request & Complaint Handling",
        description:
          "A structured ticketing flow to triage, assign, and resolve resident complaints and maintenance requests efficiently.",
        highlight: "Ticket workflow",
      },
      {
        icon: <Bell className="h-5 w-5 text-indigo-600" />,
        title: "Resident Notifications",
        description:
          "Push targeted alerts for dues, upcoming events, or urgent notices directly to resident dashboards and email.",
        highlight: "Multi-channel",
      },
    ],
  },
  {
    key: "resident",
    label: "Resident",
    tagline: "A frictionless everyday living experience",
    icon: <Users className="h-5 w-5" />,
    accentClass: "from-blue-600 to-cyan-500",
    ringClass: "ring-blue-200",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50",
    dotClass: "bg-blue-500",
    features: [
      {
        icon: <Layers className="h-5 w-5 text-blue-600" />,
        title: "Society Feed",
        description:
          "Stay up to date with a clean, chronological feed of posts, events, and announcements from your society leadership.",
        highlight: "Always informed",
      },
      {
        icon: <CalendarDays className="h-5 w-5 text-blue-600" />,
        title: "Event Visibility",
        description:
          "Browse upcoming and ongoing events, see locations and timings, and never miss a community occasion.",
        highlight: "Calendar view",
      },
      {
        icon: <ClipboardCheck className="h-5 w-5 text-blue-600" />,
        title: "Submit Requests",
        description:
          "Raise maintenance issues, report concerns, or make amenity requests — all tracked transparently with status updates.",
        highlight: "Live status",
      },
      {
        icon: <Bell className="h-5 w-5 text-blue-600" />,
        title: "Instant Alerts",
        description:
          "Receive real-time notifications for dues reminders, event invites, and society announcements without any noise.",
        highlight: "Smart filtering",
      },
    ],
  },
];

const securityPillars = [
  {
    icon: <KeyRound className="h-5 w-5 text-indigo-500" />,
    title: "JWT Authentication",
    description:
      "Stateless, signed tokens verify every request — no session state, no attack surface.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-indigo-500" />,
    title: "Role-Based Access Control",
    description:
      "Permissions enforced at every layer — API, service, and UI — so no role can exceed its boundary.",
  },
  {
    icon: <Lock className="h-5 w-5 text-indigo-500" />,
    title: "Data Isolation",
    description:
      "Each society's data is strictly scoped. Cross-society reads are architecturally impossible.",
  },
  {
    icon: <Zap className="h-5 w-5 text-indigo-500" />,
    title: "Audit Logging",
    description:
      "Every privileged action is timestamped and attributed. Full accountability at every tier.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const RoleTab = ({
  section,
  isActive,
  onClick,
}: {
  section: RoleSection;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`group flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
      isActive
        ? `bg-gradient-to-r ${section.accentClass} text-white shadow-md shadow-indigo-200`
        : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
    }`}
  >
    <span
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all ${
        isActive ? "bg-white/20" : "bg-slate-100 group-hover:bg-slate-200"
      }`}
    >
      <span className={isActive ? "text-white" : "text-slate-500"}>
        {section.icon}
      </span>
    </span>
    {section.label}
  </button>
);

const FeatureCard = ({
  feature,
  accentClass,
  index,
}: {
  feature: Feature;
  accentClass: string;
  index: number;
}) => (
  <motion.div
    variants={fadeUp as any}
    custom={index}
    className="group relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:shadow-md"
  >
    {/* Left accent bar on hover */}
    <div
      className={`absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-gradient-to-b ${accentClass} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
    />

    {/* Icon */}
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 transition-transform duration-300 group-hover:scale-110">
      {feature.icon}
    </div>

    {/* Content */}
    <div className="min-w-0 flex-1 space-y-1">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-800">
          {feature.title}
        </h3>
        {feature.highlight && (
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {feature.highlight}
          </span>
        )}
      </div>
      <p className="text-xs leading-relaxed text-slate-500">
        {feature.description}
      </p>
    </div>
  </motion.div>
);

const SecurityCard = ({ pillar }: { pillar: (typeof securityPillars)[0] }) => (
  <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 ring-1 ring-indigo-100">
      {pillar.icon}
    </div>
    <div>
      <p className="mb-1 text-sm font-semibold text-slate-800">
        {pillar.title}
      </p>
      <p className="text-xs leading-relaxed text-slate-500">
        {pillar.description}
      </p>
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FeaturesPage() {
  const [activeRole, setActiveRole] = useState<RoleKey>("admin");
  const activeSection = roleSections.find((s) => s.key === activeRole)!;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-500/20">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 py-20 md:py-28">
        {/* Subtle grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(to right, #6366f1 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow blob */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/10 blur-3xl" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp as any}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-sm font-medium text-indigo-700">
              <Sparkles className="h-3.5 w-3.5" />
              Platform Capabilities
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp as any}
            className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl"
          >
            Everything your society{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              needs to thrive
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp as any}
            className="mx-auto max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg"
          >
            CiviConnect delivers a complete operational stack — purpose-built
            for Super Admins overseeing platforms, Society Heads running
            communities, and Residents living in them.
          </motion.p>

          {/* Role pills */}
          <motion.div
            variants={fadeUp as any}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {roleSections.map((s) => (
              <div
                key={s.key}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${s.badgeClass}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${s.dotClass}`} />
                {s.label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Role Feature Explorer ─────────────────────────────────────────── */}
      <section className="border-y border-slate-200 bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          {/* Section heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp as any}
            className="mb-12 md:text-center"
          >
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Built for Every Role
            </h2>
            <p className="text-sm text-slate-500 md:text-base">
              Each tier of the platform is purpose-designed. Select a role to
              explore its dedicated feature set.
            </p>
          </motion.div>

          {/* Role tab switcher */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-inner">
            {roleSections.map((s) => (
              <RoleTab
                key={s.key}
                section={s}
                isActive={activeRole === s.key}
                onClick={() => setActiveRole(s.key)}
              />
            ))}
          </div>

          {/* Role content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection.key}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              variants={stagger}
            >
              {/* Role banner */}
              <motion.div
                variants={slideIn as any}
                className={`mb-8 flex items-center gap-4 rounded-2xl bg-gradient-to-r ${activeSection.accentClass} p-5 text-white shadow-lg`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
                  {activeSection.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                    {activeSection.label}
                  </p>
                  <p className="text-lg font-bold leading-tight">
                    {activeSection.tagline}
                  </p>
                </div>
                <ChevronRight className="ml-auto h-5 w-5 text-white/50" />
              </motion.div>

              {/* Feature cards grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {activeSection.features.map((feature, i) => (
                  <FeatureCard
                    key={feature.title}
                    feature={feature}
                    accentClass={activeSection.accentClass}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Security Section ──────────────────────────────────────────────── */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left — text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.div variants={fadeUp as any}>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  <Lock className="h-3 w-3" />
                  Security First
                </div>
              </motion.div>

              <motion.h2
                variants={fadeUp as any}
                className="mb-4 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
              >
                Enterprise-grade security,{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  built-in from day one
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp as any}
                className="mb-6 text-sm leading-relaxed text-slate-500 md:text-base"
              >
                Security isn't a feature — it's the foundation. Every request,
                every role boundary, and every data access point is protected by
                a layered security model so your community data stays
                exclusively yours.
              </motion.p>

              <motion.div
                variants={fadeUp as any}
                className="flex flex-wrap gap-3"
              >
                {[
                  "JWT Secured",
                  "RBAC Enforced",
                  "Scoped Data",
                  "Audit Ready",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — security pillars */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="grid gap-4 sm:grid-cols-2"
            >
              {securityPillars.map((pillar) => (
                <motion.div key={pillar.title} variants={fadeUp as any}>
                  <SecurityCard pillar={pillar} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Role Comparison Strip ─────────────────────────────────────────── */}
      <section className="border-t border-slate-200 bg-white px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp as any}
            className="mb-10 md:text-center"
          >
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              One platform, three perspectives
            </h2>
            <p className="text-sm text-slate-500">
              Every user gets exactly what they need — nothing more, nothing
              less.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-3"
          >
            {roleSections.map((section) => (
              <motion.div
                key={section.key}
                variants={fadeUp as any}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-shadow hover:shadow-md"
              >
                {/* Top gradient accent */}
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${section.accentClass}`}
                />

                {/* Role badge */}
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm font-semibold ${section.badgeClass}`}
                  >
                    {section.icon}
                    {section.label}
                  </div>
                  <span className="text-xs font-medium text-slate-400">
                    {section.features.length} features
                  </span>
                </div>

                <p className="mb-5 text-xs leading-relaxed text-slate-500">
                  {section.tagline}
                </p>

                <Separator className="mb-4" />

                <ul className="space-y-2.5">
                  {section.features.map((f) => (
                    <li
                      key={f.title}
                      className="flex items-center gap-2.5 text-xs text-slate-600"
                    >
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${section.dotClass}`}
                      />
                      {f.title}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp as any}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-10 text-center text-white shadow-2xl shadow-indigo-300/30 md:p-14"
          >
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/5" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-white/5" />
            <div className="pointer-events-none absolute right-1/3 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-white/5" />

            <div className="relative z-10 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Join hundreds of modern communities
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                Ready to transform your society?
              </h2>

              <p className="mx-auto max-w-xl text-base leading-relaxed text-indigo-100">
                Everything your community needs — from admin oversight to
                resident experience — available on day one, without the
                complexity.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link to={"/societies"}>
                  <button className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-indigo-600 shadow-md transition-all hover:bg-slate-50 active:scale-95">
                    Explore Societies
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </Link>
                <Link to={"/events"}>
                  <button className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95">
                    Explore Events
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
