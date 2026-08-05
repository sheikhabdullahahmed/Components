import React from "react";
import { Navbar } from "@/components/navbar/navbar";
import { SaaSHeroSection } from "./components/hero/SaaSHeroSection";
import { TravelPartnersMarquee } from "./components/travel-partners/TravelPartnersMarquee";
import { DestinationCards } from "./components/destinations/DestinationCards";
import { useGetSessionQuery } from "./store/services/authApi";

function App() {
  // Restore active user session from backend on page load / refresh
  useGetSessionQuery();

  const handleOpenAuthModal = (mode: "signin" | "signup") => {
    // Auth modal is handled inside Navbar state or can be triggered via global modal events
    const loginButton = document.querySelector<HTMLButtonElement>(
      'button:has-text("Sign In"), button:has-text("Sign Up"), button:has-text("Login")'
    );
    if (loginButton) {
      loginButton.click();
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans antialiased overflow-x-hidden selection:bg-blue-500 selection:text-white">
      {/* SaaS Header / Navbar */}
      <Navbar sticky={true} />

      {/* Main SaaS Hero Section matching user screenshot */}
      <main className="flex-grow">
        <SaaSHeroSection />

        {/* Travel Partners Marquee */}
        <TravelPartnersMarquee />

        {/* Popular Destination Deal Cards (JSON Data Powered) */}
        <DestinationCards />
      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-center text-xs font-semibold">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 QuickSeat Travel Inc. All rights reserved. Real-time SaaS flight booking experience.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
