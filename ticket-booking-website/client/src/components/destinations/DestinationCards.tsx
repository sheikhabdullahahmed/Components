import React, { useState } from "react";
import destinationsData from "@/data/destinations.json";

// Import images directly for reliable bundler path resolution
import islamabadImg from "@/assets/destinations/islamabad.png";
import dammamImg from "@/assets/destinations/dammam.png";
import muscatImg from "@/assets/destinations/muscat.png";
import lahoreImg from "@/assets/destinations/lahore.png";
import dubaiImg from "@/assets/destinations/dubai.png";
import karachiImg from "@/assets/destinations/karachi.png";

const imageMap: Record<string, string> = {
  islamabad: islamabadImg,
  dammam: dammamImg,
  muscat: muscatImg,
  lahore: lahoreImg,
  dubai: dubaiImg,
  karachi: karachiImg,
};

export function DestinationCards() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items for continuous smooth infinite scrolling
  const cards = [...destinationsData, ...destinationsData];

  return (
    <section className="w-full bg-slate-50/50 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Trending Destinations
        </h2>
        <p className="text-slate-500 font-medium text-sm sm:text-base mt-1">
          Explore popular routes with real-time flight deals
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Fade Gradients */}
        <div className="absolute left-0 top-0 h-full w-12 sm:w-20 z-10 bg-gradient-to-r from-slate-50/90 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-12 sm:w-20 z-10 bg-gradient-to-l from-slate-50/90 to-transparent pointer-events-none" />

        <div
          className="flex items-center gap-5 sm:gap-6 px-4"
          style={{
            animation: "marquee-scroll 35s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
            width: "max-content",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {cards.map((dest, index) => {
            const imgSrc = imageMap[dest.id] || dest.image;
            return (
              <div
                key={`${dest.id}-${index}`}
                className="relative w-60 sm:w-72 h-80 sm:h-96 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer flex-shrink-0 border border-slate-200/60"
              >
                {/* Background Image */}
                <img
                  src={imgSrc}
                  alt={dest.city}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Card Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white flex flex-col justify-end">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1 text-white group-hover:text-orange-400 transition-colors">
                    {dest.city}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-300">
                    {dest.subtitle}
                  </p>
                  <p className="text-lg sm:text-xl font-black text-white mt-0.5 tracking-tight">
                    {dest.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
