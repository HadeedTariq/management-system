import { useEffect, useState } from "react";
import { ShieldCheck, UserPlus, LogIn } from "lucide-react";

import CredentialsLogin from "./CredentialsLogin";
import OAuthHandler from "./OAuthHandler";
import RegisterAccount from "./RegisterAccount";
import { OtpHandler } from "./OtpHandler";

export function AuthHandler() {
  const [showOtp, setShowOtp] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  useEffect(() => {
    const storageData = JSON.parse(
      localStorage.getItem("current-email") as string,
    );
    if (storageData && storageData.email) {
      setShowOtp(true);
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#F8F9F8] darks:bg-[#0A0C0B] flex items-center justify-center p-6 lg:p-12">
      {/* Precision Container */}
      <div className="w-full max-w-[440px] transition-all duration-500 ease-in-out">
        {/* Main Card */}
        <div className="bg-white darks:bg-[#121413] border border-[#4A7C65]/10 darks:border-[#4A7C65]/20 rounded-none shadow-[0_32px_64px_-12px_rgba(74,124,101,0.12)] p-10 lg:p-12">
          {/* Refined Branding Area */}
          <div className="flex flex-col items-center mb-12">
            <div className="mb-8">
              <ShieldCheck
                size={42}
                strokeWidth={1.25}
                className="text-[#4A7C65]"
              />
            </div>

            {!showOtp && (
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-light tracking-tight text-gray-900 darks:text-gray-100 uppercase italic">
                  {showRegistration ? "Create Account" : "Authentication"}
                </h1>
                <p className="text-[13px] tracking-widest text-[#4A7C65] font-medium uppercase opacity-80">
                  {showRegistration
                    ? "Join Civi Connect"
                    : "Refined Access Control"}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-8">
            {showOtp ? (
              <OtpHandler setShowOtp={(val: boolean) => setShowOtp(val)} />
            ) : showRegistration ? (
              <>
                <RegisterAccount
                  setShowOtp={(val: boolean) => setShowOtp(val)}
                />
                <div className="pt-6 flex flex-col items-center border-t border-gray-50 darks:border-gray-800">
                  <button
                    onClick={() => setShowRegistration(false)}
                    className="group flex items-center gap-2 text-xs tracking-wide text-gray-500 hover:text-[#4A7C65] transition-colors duration-300"
                  >
                    <span>ALREADY REGISTERED?</span>
                    <LogIn
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>

                <OAuthHandler />
              </>
            ) : (
              <>
                <CredentialsLogin />
                <div className="pt-6 flex flex-col items-center border-t border-gray-50 darks:border-gray-800">
                  <button
                    onClick={() => setShowRegistration(true)}
                    className="group flex items-center gap-2 text-xs tracking-wide text-gray-500 hover:text-[#4A7C65] transition-colors duration-300"
                  >
                    <span>NEW TO THE PLATFORM?</span>
                    <UserPlus
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>

                <OAuthHandler />
              </>
            )}
          </div>
        </div>

        {/* Minimalist Footer */}
        <div className="mt-8 flex flex-col items-center space-y-4 px-6 text-center">
          <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase leading-relaxed">
            By proceeding, you acknowledge our <br />
            <span className="text-gray-600 darks:text-gray-400 font-medium cursor-pointer hover:text-[#4A7C65]">
              Terms of Service
            </span>{" "}
            &{" "}
            <span className="text-gray-600 darks:text-gray-400 font-medium cursor-pointer hover:text-[#4A7C65]">
              Privacy Mandate
            </span>
          </p>

          <div className="flex items-center gap-4 pt-4 opacity-30">
            <div className="w-8 h-[1px] bg-[#4A7C65]" />
            <div className="w-1 h-1 rounded-full bg-[#4A7C65]" />
            <div className="w-8 h-[1px] bg-[#4A7C65]" />
          </div>
        </div>
      </div>
    </div>
  );
}
