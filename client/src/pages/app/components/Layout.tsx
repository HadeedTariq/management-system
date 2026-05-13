import { Link, Outlet } from "react-router-dom";

import Footer from "./Footer";
import { useState } from "react";
import {
  Hexagon,
  LayoutDashboard,
  Globe,
  Calendar,
  Info,
  LogIn,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFullApp } from "@/store/hooks/useFullApp";
import ProfileDropDown from "./ProfileDropDown";

const Layout = () => {
  const [isDark, setIsDark] = useState(false);
  const { user } = useFullApp();

  return (
    <div
      className={`flex flex-col w-full min-h-screen ${isDark ? "dark" : ""}`}
    >
      <div className="flex flex-col w-full min-h-screen bg-slate-50 text-slate-900 darks:bg-slate-950 darks:text-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300">
        {/* Navigation Header */}
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md darks:border-slate-800/60 darks:bg-slate-900/80 transition-all duration-300">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 darks:bg-indigo-500">
                <Hexagon size={22} strokeWidth={2.5} />
              </div>
              <Link
                to="/"
                className="text-xl font-bold tracking-tight text-slate-900 darks:text-white"
              >
                Civi
                <span className="text-indigo-600 darks:text-indigo-400">
                  Connect
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {[
                { label: "Features", icon: LayoutDashboard, href: "/features" },
                { label: "Societies", icon: Globe, href: "/societies" },
                { label: "Events", icon: Calendar, href: "/events" },
                { label: "About", icon: Info, href: "/about-us" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600 darks:text-slate-400 darks:hover:text-indigo-400 rounded-lg hover:bg-slate-100 darks:hover:bg-slate-800"
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Action Section */}
            <div className="flex items-center gap-3">
              {user ? (
                <ProfileDropDown />
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/authenticate/">
                    <Button
                      variant="ghost"
                      className="hidden sm:flex h-10 px-5 text-sm font-semibold text-slate-700 darks:text-slate-300 hover:bg-slate-100 darks:hover:bg-slate-800"
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/authenticate/">
                    <Button className="h-10 bg-indigo-600 px-6 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/40 darks:bg-indigo-500 darks:hover:bg-indigo-400 rounded-lg">
                      Get Started
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Outlet />
        </main>

        {/* Footer Area */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
