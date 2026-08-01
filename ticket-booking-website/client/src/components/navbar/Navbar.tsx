import React, { useState } from "react";
import { Plane, Menu, X, Heart } from "lucide-react";
import Logo from "@/assets/navbar/logo.png";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  sticky?: boolean;
}

export function Navbar({ sticky = true }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <div className="flex items-center">
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
                className="text-white font-semibold hover:text-orange-400 transition"
              >
                Support
              </a>

              <a
                href="#trips"
                className="text-white font-semibold hover:text-orange-400 transition"
              >
                My Trips
              </a>

              {/* Region */}
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-sm text-white">
                <span>🇵🇰</span>
                <span>PK</span>
                <span>|</span>
                <span>EN</span>
                <span>|</span>
                <span>PKR</span>
              </div>

              {/* Favourite */}
              <Button variant="ghost" className="text-white hover:text-orange-400 transition">
                <Heart className="w-5 h-5 fill-current" />
              </Button>

              {/* Login */}
              <Button className="rounded-full border border-white/85 bg-transparent px-6 py-2 text-sm font-semibold text-white hover:bg-white hover:text-slate-900 transition-all duration-200">
                Login
              </Button>
            </div>

            {/* Mobile Button */}
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white hover:bg-transparent"
            >
              {isMobileMenuOpen ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/95 backdrop-blur-xl">
            <div className="flex flex-col gap-5 px-6 py-6">
              <a href="#support" className="text-white">
                Support
              </a>

              <a href="#trips" className="text-white">
                My Trips
              </a>

              <div className="flex items-center gap-2 text-white">
                🇵🇰 PK | EN | PKR
              </div>

              <Button className="rounded-xl bg-orange-500 py-3 text-white font-semibold">
                Login
              </Button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}