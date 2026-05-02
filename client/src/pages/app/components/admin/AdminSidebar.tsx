import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  CalendarDays,
  UserCog,
  Settings,
  Megaphone,
  ShieldCheck,
  X,
  ChevronDown,
  Menu,
  PanelLeft,
  User,
  Compass,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useFullApp } from "@/store/hooks/useFullApp";
// import { useAdminState } from "@/store/hooks/useAdminState";
// import AdminPasswordDialog from "./AdminPasswordDialog";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    pathName: "/admin-dashboard",
  },

  {
    title: "Society Management",
    icon: <Building2 className="h-5 w-5" />,
    pathName: undefined,
    items: [
      {
        title: "All Societies",
        url: "/admin-dashboard/societies",
        icon: <Building2 className="h-4 w-4" />,
      },
      {
        title: "Create Society",
        url: "/admin-dashboard/societies/create",
        icon: <ShieldCheck className="h-4 w-4" />,
      },
    ],
  },

  {
    title: "Memberships",
    icon: <UserCog className="h-5 w-5" />,
    pathName: "/admin-dashboard/memberships",
  },

  {
    title: "Event Management",
    icon: <CalendarDays className="h-5 w-5" />,
    pathName: undefined,
    items: [
      {
        title: "All Events",
        url: "/admin-dashboard/events",
        icon: <CalendarDays className="h-4 w-4" />,
      },
      {
        title: "Pending Approvals",
        url: "/admin-dashboard/events/pending",
        icon: <ShieldCheck className="h-4 w-4" />,
      },
    ],
  },

  {
    title: "Announcements",
    icon: <Megaphone className="h-5 w-5" />,
    pathName: "/admin-dashboard/announcements",
  },

  {
    title: "Settings",
    icon: <Settings className="h-5 w-5" />,
    pathName: "/admin-dashboard/settings",
  },
];

function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );

  //   const { adminAuthenticated } = useAdminState();

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const { user } = useFullApp();
  const { pathname } = useLocation();

  if (!user) return <Navigate to={"/"} />;

  return (
    <div className="relative min-h-screen w-full bg-[#FDFDFD] darks:bg-[#0A0C0B] text-gray-900 darks:text-gray-100 font-sans antialiased">
      {/* Precision Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-md md:hidden transition-opacity duration-500"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Navigation Sidebar (Mobile & Desktop Logic) */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[70] w-72 bg-white darks:bg-[#0F1110] border-r border-[#4A7C65]/10 transition-transform duration-500 ease-in-out shadow-[20px_0_80px_rgba(0,0,0,0.02)]",
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0",
          !sidebarOpen && "md:-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header Section: Minimalist Branding */}
          <div className="h-24 flex flex-col justify-center px-8 border-b border-[#4A7C65]/5">
            <Link to="/" className="group flex items-center gap-3">
              <div className="w-1 h-8 bg-[#4A7C65] transition-all duration-500 group-hover:h-10" />
              <div>
                <h2 className="text-sm font-bold tracking-[0.25em] uppercase text-gray-900 darks:text-white">
                  Civi
                  <span className="text-[#C8873A] darks:text-[#E09A4A]">
                    Connect
                  </span>
                </h2>
                <p className="text-[10px] tracking-widest text-[#4A7C65] font-medium uppercase opacity-70">
                  Control Mandate
                </p>
              </div>
            </Link>
          </div>

          {/* Menu Navigation */}
          <ScrollArea className="flex-1 px-4 py-8">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <div key={item.title} className="mb-2">
                  <Link
                    to={item.pathName || "#"}
                    onClick={() => {
                      if (item.items) toggleExpanded(item.title);
                      if (window.innerWidth < 768) setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3 text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300 rounded-none",
                      item.pathName === pathname
                        ? "text-[#4A7C65] bg-[#4A7C65]/5 border-r-2 border-[#4A7C65]"
                        : "text-gray-500 hover:text-[#4A7C65] hover:bg-gray-50 darks:hover:bg-[#151816]",
                    )}
                  >
                    <span
                      className={cn(
                        "transition-colors",
                        item.pathName === pathname
                          ? "text-[#4A7C65]"
                          : "text-gray-400",
                      )}
                    >
                      {item.icon}
                    </span>
                    <span className="flex-1">{item.title}</span>
                    {item.items && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-500",
                          expandedItems[item.title] && "rotate-180",
                        )}
                      />
                    )}
                  </Link>

                  {/* Sub-menu Items */}
                  {item.items && expandedItems[item.title] && (
                    <div className="mt-1 ml-4 border-l border-[#4A7C65]/10 space-y-1">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          to={subItem.url}
                          className={cn(
                            "block px-8 py-2 text-[10px] tracking-widest uppercase transition-colors",
                            subItem.url === pathname
                              ? "text-[#4A7C65] font-bold"
                              : "text-gray-400 hover:text-[#4A7C65]",
                          )}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </ScrollArea>

          {/* Profile Section: Lowered Visual Noise */}
          <div className="p-6 border-t border-[#4A7C65]/5 bg-gray-50/50 darks:bg-[#080909]/50">
            <div className="flex items-center gap-4 px-2">
              <div className="relative">
                <Avatar className="h-10 w-10 rounded-none border border-[#4A7C65]/20">
                  <AvatarFallback className="bg-transparent text-[#4A7C65] text-xs font-light">
                    {user.user_name?.[0] || <User size={16} />}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#4A7C65] border-2 border-white darks:border-[#0F1110]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold tracking-wider text-gray-900 darks:text-gray-100 uppercase truncate">
                  {user.user_name || "Authorized Admin"}
                </p>
                <p className="text-[9px] tracking-widest text-[#4A7C65] uppercase opacity-60">
                  System Executive
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Framework */}
      <div
        className={cn(
          "min-h-screen transition-all duration-500 ease-in-out",
          sidebarOpen ? "md:pl-72" : "md:pl-0",
        )}
      >
        {/* Global Taskbar */}
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between px-8 bg-white/80 darks:bg-[#0A0C0B]/80 backdrop-blur-xl border-b border-[#4A7C65]/5">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-[#4A7C65]"
              onClick={() => {
                if (window.innerWidth < 768) setMobileMenuOpen(true);
                else setSidebarOpen(!sidebarOpen);
              }}
            >
              {sidebarOpen ? (
                <PanelLeft size={20} strokeWidth={1.5} />
              ) : (
                <Menu size={20} strokeWidth={1.5} />
              )}
            </Button>

            <div className="hidden lg:flex items-center gap-2 text-[10px] tracking-[0.3em] text-gray-400 uppercase">
              <Compass size={12} strokeWidth={1.5} />
              <span>Network</span>
              <span className="mx-2 opacity-30">/</span>
              <span className="text-gray-900 darks:text-white">Admin Hub</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 border border-[#4A7C65]/20 bg-[#4A7C65]/5">
              <ShieldCheck size={14} className="text-[#4A7C65]" />
              <span className="text-[9px] tracking-widest uppercase text-[#4A7C65] font-bold">
                Secure Instance
              </span>
            </div>
          </div>
        </header>

        {/* Precision Canvas */}
        <main className="p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-2 duration-1000">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminSidebar;
