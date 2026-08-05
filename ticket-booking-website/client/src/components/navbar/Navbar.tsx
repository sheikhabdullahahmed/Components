import React, { useState, useRef, useEffect } from "react";
import { Menu, X, User as UserIcon, LogOut, ChevronDown } from "lucide-react";
import Logo from "@/assets/navbar/logo.png";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/authmodal";
import { useAppSelector } from "@/store/hook";
import { useSignOutMutation } from "@/store/services/authApi";

interface NavbarProps {
  sticky?: boolean;
}

export function Navbar({ sticky = true }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"signin" | "signup">(
    "signin",
  );
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [signOut] = useSignOutMutation();

  const handleOpenAuth = (mode: "signin" | "signup") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut().unwrap();
    } catch (e) {
      console.error("Logout error:", e);
    }
    setIsUserMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        className={`${
          sticky ? "sticky top-0 z-50" : "relative"
        } w-full bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all duration-300 shadow-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center cursor-pointer">
              <img
                src={Logo}
                alt="QuickSeat"
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Region */}
              <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 transition-all duration-300 hover:border-orange-400 hover:bg-slate-100 select-none">
                <span className="text-base">🇵🇰</span>
                <span>Pakistan</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 opacity-60 text-slate-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Auth / User Profile */}
              {isAuthenticated && user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-100 transition-all cursor-pointer select-none"
                  >
                    <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      {user.name
                        ? user.name.charAt(0).toUpperCase()
                        : user.email.charAt(0).toUpperCase()}
                    </div>
                    <span className="truncate max-w-[150px]">
                      {user.name || user.email.split("@")[0]}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                          Signed in as
                        </div>
                        <div className="text-sm font-bold text-slate-800 truncate">
                          {user.name || user.email}
                        </div>
                      </div>

                      <a
                        href="#trips"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <UserIcon className="w-4 h-4 text-slate-400" />
                        <span>My Account</span>
                      </a>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  onClick={() => handleOpenAuth("signin")}
                  className="rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-2 shadow-md shadow-orange-500/20 active:scale-[0.98] transition-all cursor-pointer border-none"
                >
                  Login
                </Button>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-slate-800 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-100 px-6 py-5 flex flex-col gap-4 text-sm font-bold text-slate-700 shadow-lg">
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Region:</span>
              <span className="font-bold text-slate-800">🇵🇰 Pakistan</span>
            </div>

            {isAuthenticated && user ? (
              <div className="flex flex-col gap-2 pt-2">
                <div className="text-xs text-slate-400 font-bold uppercase">
                  Signed in as:{" "}
                  <span className="text-slate-800 font-extrabold">
                    {user.name || user.email}
                  </span>
                </div>
                <Button
                  onClick={handleLogout}
                  className="w-full rounded-xl bg-red-50 text-red-600 hover:bg-red-100 py-2.5 font-bold cursor-pointer border border-red-200 mt-2"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => handleOpenAuth("signin")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-md shadow-orange-500/20 mt-2"
              >
                Login
              </Button>
            )}
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
}
