import { Link, Outlet } from "react-router-dom";

import Footer from "./Footer";
import { useState } from "react";
import { Hexagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFullApp } from "@/store/hooks/useFullApp";
import ProfileDropDown from "./ProfileDropDown";

const Layout = () => {
  const [isDark, setIsDark] = useState(false);
  const { user } = useFullApp();

  return (
    <div className="flex flex-col w-full">
      <div className={`${isDark ? "dark" : ""} mt-0`}>
        <div className="min-h-screen bg-[#F5F3EE] text-[#1A1814] darks:bg-[#141210] darks:text-[#F2EFE8] font-['DM_Sans',_sans-serif] transition-colors duration-300">
          <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 border-b border-[#1A1814]/10 darks:border-[#F2EFE8]/10 bg-white darks:bg-[#1E1C19] transition-colors duration-300">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#2D4A3E] darks:bg-[#4A7C65] rounded-lg flex items-center justify-center text-[#F5F3EE]">
                <Hexagon size={20} fill="currentColor" />
              </div>
              <Link
                to={"/"}
                className="font-['Playfair_Display',_serif] text-xl font-bold tracking-tight"
              >
                Civi
                <span className="text-[#C8873A] darks:text-[#E09A4A]">
                  Connect
                </span>
              </Link>
            </div>

            <ul className="hidden md:flex items-center gap-7">
              <li>
                <a
                  href="#"
                  className="text-[#5C5748] darks:text-[#A8A298] hover:text-[#2D4A3E] darks:hover:text-[#4A7C65] text-sm transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#5C5748] darks:text-[#A8A298] hover:text-[#2D4A3E] darks:hover:text-[#4A7C65] text-sm transition-colors"
                >
                  Societies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#5C5748] darks:text-[#A8A298] hover:text-[#2D4A3E] darks:hover:text-[#4A7C65] text-sm transition-colors"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#5C5748] darks:text-[#A8A298] hover:text-[#2D4A3E] darks:hover:text-[#4A7C65] text-sm transition-colors"
                >
                  About
                </a>
              </li>
            </ul>

            {user ? (
              <ProfileDropDown />
            ) : (
              <div className="flex items-center gap-3">
                <Link to={"/authenticate/"}>
                  <Button
                    variant="outline"
                    className="hidden sm:flex border-[#1A1814]/10 darks:border-[#F2EFE8]/10 text-[#1A1814] darks:text-[#F2EFE8] hover:bg-[#EDEAE3] darks:hover:bg-[#252320] bg-transparent h-9 px-5"
                  >
                    Sign in
                  </Button>
                </Link>
                <Link to={"/authenticate/"}>
                  <Button className="bg-[#2D4A3E] hover:bg-[#2D4A3E]/90 text-[#F5F3EE] darks:bg-[#4A7C65] darks:hover:bg-[#4A7C65]/90 h-9 px-5">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </nav>
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
