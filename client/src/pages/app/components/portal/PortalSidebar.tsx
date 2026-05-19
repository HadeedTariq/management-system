import { useState } from "react";
import {
  LayoutDashboard,
  Menu,
  PanelLeft,
  ShieldCheck,
  User,
  Layers,
  UserCircle,
  Building2,
  Bookmark,
  CalendarDays,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useFullApp } from "@/store/hooks/useFullApp";
const sidebarItems = [
  {
    title: "My Profile",
    icon: <UserCircle className="h-5 w-5" />,
    pathName: "/portal",
  },
  {
    title: "Joined Societies",
    icon: <Building2 className="h-5 w-5" />,
    pathName: "/portal/joined-societies",
  },
  {
    title: "Saved Posts",
    icon: <Bookmark className="h-5 w-5" />,
    pathName: "/portal/saved-posts",
  },
  {
    title: "Saved Events",
    icon: <CalendarDays className="h-5 w-5" />,
    pathName: "/portal/saved-events",
  },
];

function PortalSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user } = useFullApp();
  const { pathname } = useLocation();

  if (!user) return <Navigate to={"/"} />;

  return (
    <div className="relative min-h-screen w-full bg-slate-50 darks:bg-slate-950 text-slate-900 darks:text-slate-100 font-sans antialiased flex flex-col">
      {/* Precision Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Navigation Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[70] w-64 bg-white darks:bg-slate-900 border-r border-slate-200 darks:border-slate-800 transition-transform duration-300 ease-in-out shadow-sm flex flex-col",
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0",
          !sidebarOpen && "md:-translate-x-full",
        )}
      >
        {/* Header Section: SaaS Branding */}
        <div className="h-16 flex items-center px-6 border-b border-slate-200 darks:border-slate-800 shrink-0">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm transition-transform group-hover:scale-105">
              <Layers size={18} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-slate-900 darks:text-white">
                CiviConnect
              </h2>
            </div>
          </Link>
        </div>

        {/* Menu Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <div key={item.title} className="mb-1">
                <Link
                  to={item.pathName || "#"}
                  onClick={() => {
                    if (window.innerWidth < 768) setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    item.pathName === pathname
                      ? "bg-indigo-50 text-indigo-700 darks:bg-indigo-500/10 darks:text-indigo-400"
                      : "text-slate-600 darks:text-slate-400 hover:bg-slate-100 hover:text-slate-900 darks:hover:bg-slate-800/50 darks:hover:text-slate-50",
                  )}
                >
                  <span
                    className={cn(
                      "flex-shrink-0 transition-colors",
                      item.pathName === pathname
                        ? "text-indigo-600 darks:text-indigo-400"
                        : "text-slate-400 darks:text-slate-500 group-hover:text-slate-600",
                    )}
                  >
                    {item.icon}
                  </span>
                  <span className="flex-1 truncate">{item.title}</span>
                </Link>
              </div>
            ))}
          </nav>
        </ScrollArea>

        {/* Profile Section */}
        <div className="p-4 border-t border-slate-200 darks:border-slate-800 bg-white darks:bg-slate-900 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-9 w-9 rounded-md border border-slate-200 darks:border-slate-700 shadow-sm">
                <AvatarFallback className="bg-slate-100 darks:bg-slate-800 text-indigo-600 darks:text-indigo-400 text-sm font-medium rounded-md">
                  {user.user_name?.[0] || <User size={16} />}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white darks:border-slate-900" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 darks:text-slate-100 truncate">
                {user.user_name || "Admin User"}
              </p>
              <p className="text-xs text-slate-500 darks:text-slate-400 truncate">
                System Administrator
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Framework */}
      <div
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out",
          sidebarOpen ? "md:pl-64" : "md:pl-0",
        )}
      >
        {/* Global Taskbar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between px-6 bg-white/80 darks:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 darks:border-slate-800 shadow-sm shrink-0">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 darks:text-slate-400 darks:hover:text-slate-50 darks:hover:bg-slate-800 rounded-md"
              onClick={() => {
                if (window.innerWidth < 768) setMobileMenuOpen(true);
                else setSidebarOpen(!sidebarOpen);
              }}
            >
              {sidebarOpen ? (
                <PanelLeft size={20} strokeWidth={2} />
              ) : (
                <Menu size={20} strokeWidth={2} />
              )}
            </Button>

            {/* Structured Breadcrumbs */}
            <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-500 darks:text-slate-400">
              <LayoutDashboard size={16} className="text-slate-400" />
              <span>Personal Portal</span>
              <span className="text-slate-300 darks:text-slate-600">/</span>
              <span className="text-slate-900 darks:text-slate-100">
                Overview
              </span>
            </div>
          </div>
        </header>

        {/* Precision Canvas */}
        <main className="flex-1 p-6 lg:p-8 animate-in fade-in duration-500">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default PortalSidebar;
