import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authApi } from "@/lib/axios";
import { useFullApp } from "@/store/hooks/useFullApp";
import {
  User2,
  LayoutDashboard,
  Info,
  LogOut,
  ChevronDown,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";

function ProfileDropDown() {
  const roleDashboardMap: Record<string, { label: string; path: string }> = {
    admin: {
      label: "Admin Dashboard",
      path: "/admin-dashboard",
    },
    teacher: {
      label: "Society Head Dashboard",
      path: "/society-head-dashboard",
    },
    student: {
      label: "Student Dashboard",
      path: "/student-dashboard",
    },
  };

  const logout = async () => {
    await authApi.post("/logout");
    window.location.reload();
  };
  const { user } = useFullApp();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="group flex items-center gap-2 px-2 py-1.5 h-auto hover:bg-slate-100 darks:hover:bg-slate-800 transition-all rounded-md border border-transparent focus-visible:ring-1 focus-visible:ring-indigo-500"
        >
          {/* Sharp Avatar Placeholder */}
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-50 darks:bg-indigo-950/30 border border-indigo-100 darks:border-indigo-800 transition-colors duration-200">
            <User2
              size={18}
              strokeWidth={2}
              className="text-indigo-600 darks:text-indigo-400"
            />
          </div>

          <ChevronDown
            size={14}
            strokeWidth={2.5}
            className="text-slate-400 transition-transform duration-300 group-data-[state=open]:rotate-180"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="
          w-64 
          rounded-lg
          border border-slate-200 
          bg-white 
          darks:bg-slate-900 darks:border-slate-800
          shadow-xl shadow-slate-200/50 darks:shadow-none
          p-1.5
          animate-in fade-in zoom-in-95 duration-100
        "
      >
        <div className="px-3 py-3 mb-1">
          <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 darks:text-slate-500 mb-1">
            Account
          </p>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold text-slate-900 darks:text-slate-100 truncate">
              {user?.user_name || "Member User"}
            </p>
            {user?.email && (
              <p className="text-xs text-slate-500 darks:text-slate-400 truncate">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator className="bg-slate-100 darks:bg-slate-800 mx-1" />

        <DropdownMenuGroup className="space-y-0.5 py-1.5">
          {/* Admin Dashboard Entry */}
          {user && roleDashboardMap["admin"] && (
            <Link to={roleDashboardMap["admin"].path}>
              <DropdownMenuItem
                className="
                  flex items-center gap-3 px-3 py-2.5 cursor-pointer
                  text-sm font-medium text-slate-700 darks:text-slate-300
                  focus:bg-indigo-50 darks:focus:bg-indigo-950/40 
                  focus:text-indigo-600 darks:focus:text-indigo-400
                  transition-colors rounded-md
                "
              >
                <ShieldCheck size={16} strokeWidth={2} />
                <span>{roleDashboardMap["admin"].label}</span>
              </DropdownMenuItem>
            </Link>
          )}

          {/* Teacher/Head Dashboard Entry */}
          {user && roleDashboardMap["teacher"] && (
            <Link to={roleDashboardMap["teacher"].path}>
              <DropdownMenuItem
                className="
                  flex items-center gap-3 px-3 py-2.5 cursor-pointer
                  text-sm font-medium text-slate-700 darks:text-slate-300
                  focus:bg-indigo-50 darks:focus:bg-indigo-950/40 
                  focus:text-indigo-600 darks:focus:text-indigo-400
                  transition-colors rounded-md
                "
              >
                <GraduationCap size={16} strokeWidth={2} />
                <span>{roleDashboardMap["teacher"].label}</span>
              </DropdownMenuItem>
            </Link>
          )}

          {/* General Dashboard / Portal */}
          <Link to="/portal">
            <DropdownMenuItem
              className="
                flex items-center gap-3 px-3 py-2.5 cursor-pointer
                text-sm font-medium text-slate-700 darks:text-slate-300
                focus:bg-indigo-50 darks:focus:bg-indigo-950/40 
                focus:text-indigo-600 darks:focus:text-indigo-400
                transition-colors rounded-md
              "
            >
              <LayoutDashboard size={16} strokeWidth={2} />
              <span>Personal Console</span>
            </DropdownMenuItem>
          </Link>

          <Link to="/about-us">
            <DropdownMenuItem
              className="
                flex items-center gap-3 px-3 py-2.5 cursor-pointer
                text-sm font-medium text-slate-700 darks:text-slate-300
                focus:bg-indigo-50 darks:focus:bg-indigo-950/40 
                focus:text-indigo-600 darks:focus:text-indigo-400
                transition-colors rounded-md
              "
            >
              <Info size={16} strokeWidth={2} />
              <span>Platform Specs</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-slate-100 darks:bg-slate-800 mx-1" />

        <DropdownMenuItem
          onClick={() => logout()}
          className="
            flex items-center gap-3 px-3 py-2.5 mt-1 cursor-pointer
            text-sm font-semibold text-rose-600 darks:text-rose-400
            focus:bg-rose-50 darks:focus:bg-rose-950/30
            transition-all rounded-md
          "
        >
          <LogOut size={16} strokeWidth={2.5} />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropDown;
