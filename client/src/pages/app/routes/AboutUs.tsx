import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  ShieldCheck,
  Users,
  CalendarDays,
  MessageSquareDiff,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// --- Data Models ---
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  role: "Admin" | "Society Head" | "Resident";
}

const features: FeatureCardProps[] = [
  {
    role: "Admin",
    icon: (
      <Building2 className="w-6 h-6 text-indigo-600 darks:text-indigo-400" />
    ),
    title: "Global Society Management",
    description:
      "Effortlessly onboard new societies, manage subscription tiers, and oversee platform-wide analytics from a centralized, high-level dashboard.",
  },
  {
    role: "Admin",
    icon: (
      <ShieldCheck className="w-6 h-6 text-indigo-600 darks:text-indigo-400" />
    ),
    title: "Access & Role Governance",
    description:
      "Strict, customizable RBAC (Role-Based Access Control) ensuring data privacy and secure user management across all registered communities.",
  },
  {
    role: "Society Head",
    icon: (
      <MessageSquareDiff className="w-6 h-6 text-indigo-600 darks:text-indigo-400" />
    ),
    title: "Community Announcements",
    description:
      "Publish rich-text posts, important notices, and polls instantly to keep your entire resident base informed and engaged.",
  },
  {
    role: "Society Head",
    icon: (
      <CalendarDays className="w-6 h-6 text-indigo-600 darks:text-indigo-400" />
    ),
    title: "Event Coordination",
    description:
      "Schedule society meetings, festivals, and maintenance windows with automated calendar invites and RSVP tracking.",
  },
  {
    role: "Society Head",
    icon: (
      <ClipboardCheck className="w-6 h-6 text-indigo-600 darks:text-indigo-400" />
    ),
    title: "Streamlined Request Handling",
    description:
      "A modern ticketing system to review, assign, and resolve resident complaints, maintenance requests, and amenity bookings.",
  },
  {
    role: "Resident",
    icon: <Users className="w-6 h-6 text-indigo-600 darks:text-indigo-400" />,
    title: "Seamless Living",
    description:
      "Pay maintenance dues, book amenities, and connect with neighbors through a beautifully simple, mobile-first interface.",
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-slate-50 darks:bg-slate-950 text-slate-900 darks:text-slate-50 font-sans selection:bg-indigo-500/30">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 overflow-hidden max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          // variants={fadeUp}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-indigo-100 darks:bg-indigo-500/10 text-indigo-700 darks:text-indigo-300 text-sm font-medium border border-indigo-200 darks:border-indigo-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Modernizing Community Living
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            CiviConnect for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 darks:from-indigo-400 darks:to-violet-400">
              Modern Societies
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 darks:text-slate-400 mb-8 leading-relaxed">
            We bridge the gap between administration and community. Our platform
            empowers Super Admins to scale operations, equips Society Heads with
            powerful organizational tools, and gives residents a seamless living
            experience.
          </p>
        </motion.div>
      </section>

      {/* Feature Architecture Grid */}
      <section className="px-6 py-16 md:py-24 bg-white darks:bg-slate-900 border-y border-slate-200 darks:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            // variants={fadeUp}
            className="mb-16 md:text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Every Role
            </h2>
            <p className="text-slate-600 darks:text-slate-400 max-w-2xl md:mx-auto">
              From global system oversight to day-to-day community engagement,
              our architecture provides dedicated tools tailored to specific
              responsibilities.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                // variants={fadeUp}
                className="group relative p-6 rounded-2xl bg-slate-50 darks:bg-slate-950 border border-slate-200 darks:border-slate-800 hover:border-indigo-500/50 darks:hover:border-indigo-500/50 transition-colors duration-300"
              >
                <div className="mb-4 inline-flex p-3 rounded-lg bg-indigo-50 darks:bg-indigo-900/20 ring-1 ring-indigo-100 darks:ring-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 darks:text-slate-400 bg-slate-200 darks:bg-slate-800 px-2 py-1 rounded-md">
                    {feature.role}
                  </span>
                </div>
                <p className="text-slate-600 darks:text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-24 max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          // variants={fadeUp}
          className="p-8 md:p-12 rounded-3xl bg-indigo-600 darks:bg-indigo-500 text-white relative overflow-hidden shadow-2xl shadow-indigo-600/20"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
            Ready to transform your society?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto relative z-10 text-lg">
            Join hundreds of modern communities streamlining their operations
            and enhancing resident satisfaction.
          </p>
          <Link to={"/societies"}>
            <button className="relative z-10 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-slate-50 transition-colors active:scale-95">
              Explore Societies
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
