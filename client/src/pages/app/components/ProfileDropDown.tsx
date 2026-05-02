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
      path: "/teacher-dashboard",
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
      {/* Precision Trigger */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="group flex items-center gap-3 px-4 py-2 hover:bg-transparent focus:ring-0"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-none border border-[#4A7C65]/30 group-hover:border-[#4A7C65] transition-colors duration-500">
            <User2 size={16} strokeWidth={1.5} className="text-[#4A7C65]" />
          </div>
          <ChevronDown
            size={12}
            className="text-gray-400 group-hover:text-[#4A7C65] transition-all duration-500 group-data-[state=open]:rotate-180"
          />
        </Button>
      </DropdownMenuTrigger>

      {/* Sleek, Premium Content Area */}
      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="
          w-64 
          rounded-none
          border border-[#4A7C65]/10 
          bg-white/95 backdrop-blur-md 
          darks:bg-[#0C0E0D]/95 darks:border-[#4A7C65]/20
          shadow-[0_20px_50px_rgba(0,0,0,0.1)]
          p-2
        "
      >
        <DropdownMenuLabel className="px-4 py-3">
          <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#4A7C65]">
            Account Identity
          </span>
          {user?.email && (
            <p className="text-[11px] text-gray-500 darks:text-gray-400 font-light mt-1 truncate">
              {user.email}
            </p>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-[#4A7C65]/5 darks:bg-[#4A7C65]/10 mx-2" />

        <DropdownMenuGroup className="py-2">
          {/* Dynamic Role-Based Dashboard */}
          {user && roleDashboardMap["admin"] && (
            <Link to={roleDashboardMap["admin"].path}>
              <DropdownMenuItem
                className="
                flex items-center gap-3 px-4 py-3 cursor-pointer
                text-[12px] tracking-wide text-gray-700 darks:text-gray-300
                focus:bg-[#4A7C65]/5 darks:focus:bg-[#4A7C65]/10 
                focus:text-[#4A7C65] darks:focus:text-[#4A7C65]
                transition-colors duration-300 rounded-none
              "
              >
                <LayoutDashboard size={15} strokeWidth={1.5} />
                <span className="uppercase">
                  {roleDashboardMap["admin"].label}
                </span>
              </DropdownMenuItem>
            </Link>
          )}

          {/* About Link */}
          <Link to="/about-us">
            <DropdownMenuItem
              className="
              flex items-center gap-3 px-4 py-3 cursor-pointer
              text-[12px] tracking-wide text-gray-700 darks:text-gray-300
              focus:bg-[#4A7C65]/5 darks:focus:bg-[#4A7C65]/10 
              focus:text-[#4A7C65] darks:focus:text-[#4A7C65]
              transition-colors duration-300 rounded-none
            "
            >
              <Info size={15} strokeWidth={1.5} />
              <span className="uppercase">Platform Philosophy</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-[#4A7C65]/5 darks:bg-[#4A7C65]/10 mx-2" />

        {/* Logout - Refined Red */}
        <DropdownMenuItem
          onClick={() => logout()}
          className="
            flex items-center gap-3 px-4 py-3 mt-1 cursor-pointer
            text-[12px] tracking-wide text-gray-400 hover:text-red-800 darks:hover:text-red-400
            focus:bg-red-50/50 darks:focus:bg-red-950/10
            transition-all duration-300 rounded-none
          "
        >
          <LogOut size={15} strokeWidth={1.5} />
          <span className="uppercase">Terminate Session</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropDown;
