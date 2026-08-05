import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Heart,
  User as UserIcon,
  LogOut,
  ChevronDown,
} from "lucide-react";
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

  // Close dropdown on outside click
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
          sticky ? "fixed top-0 left-0 right-0 z-50" : "relative"
        } w-full bg-transparent transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center cursor-pointer">
              <img
                src={Logo}
                alt="QuickSeat"
                className="h-11 w-auto object-contain"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <a
                href="#support"
                className="text-white font-semibold hover:text-orange-400 transition cursor-pointer"
              >
                Support
              </a>

              <a
                href="#trips"
                className="text-white font-semibold hover:text-orange-400 transition cursor-pointer"
              >
                My Trips
              </a>

              {/* Region */}
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-sm text-white cursor-pointer hover:bg-white/20 transition-all select-none">
                <span>🇵🇰</span>
                <span>PK</span>
                <span>|</span>
                <span>EN</span>
                <span>|</span>
                <span>PKR</span>
              </div>

              {/* Favourite */}
              <Button
                variant="ghost"
                className="text-white hover:text-orange-400 transition"
              >
                <Heart className="w-5 h-5 fill-current" />
              </Button>

              {/* Auth / Login */}
              {isAuthenticated && user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2.5 rounded-full border border-white/30 bg-white/15 backdrop-blur-md px-4 py-2 text-sm font-semibold text-white hover:bg-white/25 transition-all cursor-pointer select-none"
                  >
                    <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs">
                      {user.name
                        ? user.name.charAt(0).toUpperCase()
                        : user.email.charAt(0).toUpperCase()}
                    </div>
                    <span>{user.name || user.email.split("@")[0]}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                          Signed in as
                        </div>
                        <div className="text-sm font-bold text-slate-800 truncate">
                          {user.email}
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
                  className="rounded-full border border-white/85 bg-transparent px-6 py-2 text-sm font-semibold text-white hover:bg-white hover:text-slate-900 transition-all duration-200"
                >
                  Login
                </Button>
              )}
            </div>

            {/* Mobile Button */}
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white hover:bg-transparent"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/95 backdrop-blur-xl">
            <div className="flex flex-col gap-5 px-6 py-6">
              <a
                href="#support"
                className="text-white cursor-pointer hover:text-orange-400 transition"
              >
                Support
              </a>

              <a
                href="#trips"
                className="text-white cursor-pointer hover:text-orange-400 transition"
              >
                My Trips
              </a>

              <div className="flex items-center gap-2 text-white cursor-pointer">
                🇵🇰 PK | EN | PKR
              </div>

              {isAuthenticated && user ? (
                <div className="pt-2 border-t border-white/10 space-y-3">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs">
                      {user.name
                        ? user.name.charAt(0).toUpperCase()
                        : user.email.charAt(0).toUpperCase()}
                    </div>
                    <span>{user.name || user.email}</span>
                  </div>
                  <Button
                    onClick={handleLogout}
                    className="w-full rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 py-3 font-semibold cursor-pointer"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => handleOpenAuth("signin")}
                  className="rounded-xl bg-orange-500 py-3 text-white font-semibold cursor-pointer"
                >
                  Login
                </Button>
              )}
            </div>
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
