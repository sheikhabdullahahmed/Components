import React from "react";

// --- Inline SVG Brand Logos ---

const FlyJinnahLogo = () => (
  <svg viewBox="0 0 120 40" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="28" fontFamily="Georgia, serif" fontWeight="bold" fontSize="18" fill="#E63312">FlyJinnah</text>
    <circle cx="108" cy="20" r="9" fill="#E63312" />
    <text x="104" y="24" fontFamily="Arial" fontWeight="bold" fontSize="10" fill="white">PK</text>
  </svg>
);

const AirSialLogo = () => (
  <svg viewBox="0 0 120 40" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="6,20 16,10 16,30" fill="#1A6D3A" />
    <polygon points="10,20 20,12 20,28" fill="#22883F" />
    <text x="24" y="27" fontFamily="Arial" fontWeight="800" fontSize="16" fill="#1A6D3A" letterSpacing="1">AIRSIAL</text>
  </svg>
);

const PIALogo = () => (
  <svg viewBox="0 0 150 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Crescent & flag motif */}
    <rect x="0" y="8" width="28" height="24" rx="3" fill="#01411C" />
    <circle cx="12" cy="20" r="7" fill="#4CAF50" />
    <circle cx="15" cy="20" r="5" fill="#01411C" />
    <text x="33" y="18" fontFamily="Arial" fontWeight="700" fontSize="9" fill="#01411C">PAKISTAN</text>
    <text x="33" y="29" fontFamily="Arial" fontWeight="700" fontSize="8" fill="#01411C">INTERNATIONAL AIRLINES</text>
  </svg>
);

const AirblueLogo = () => (
  <svg viewBox="0 0 110 40" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="28" fontFamily="Arial" fontWeight="300" fontSize="22" fill="#4A4A4A">air</text>
    <text x="38" y="28" fontFamily="Arial" fontWeight="700" fontSize="22" fill="#0057B7">blue</text>
  </svg>
);

const SastaTicketLogo = () => (
  <svg viewBox="0 0 140 40" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="26" fontFamily="Arial" fontWeight="400" fontSize="16" fill="#444444">sastaticket</text>
    <rect x="103" y="14" width="18" height="14" rx="2" fill="#E53935" />
    <text x="105" y="24" fontFamily="Arial" fontWeight="700" fontSize="9" fill="white">.pk</text>
  </svg>
);

const SkyToursLogo = () => (
  <svg viewBox="0 0 120 40" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Sky arc */}
    <path d="M10 28 Q30 8 50 20" stroke="#0095DA" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
    <path d="M14 26 Q32 10 48 22" stroke="#0095DA" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4"/>
    <text x="54" y="28" fontFamily="Arial" fontWeight="800" fontSize="17" fill="#0095DA">-tours</text>
    <text x="14" y="28" fontFamily="Arial" fontWeight="800" fontSize="17" fill="#E63312">Sky</text>
  </svg>
);

const OneTravelLogo = () => (
  <svg viewBox="0 0 120 40" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="27" fontFamily="Arial" fontWeight="700" fontSize="18" fill="#F47920">One</text>
    <text x="42" y="27" fontFamily="Arial" fontWeight="400" fontSize="18" fill="#333333">Travel</text>
  </svg>
);

const TripAdvisorLogo = () => (
  <svg viewBox="0 0 140 40" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="20" r="10" fill="#00AA6C" />
    <circle cx="14" cy="20" r="5" fill="white" />
    <circle cx="14" cy="20" r="2.5" fill="#00AA6C" />
    <circle cx="36" cy="20" r="10" fill="#E8192C" />
    <circle cx="36" cy="20" r="5" fill="white" />
    <circle cx="36" cy="20" r="2.5" fill="#E8192C" />
    <text x="52" y="26" fontFamily="Arial" fontWeight="600" fontSize="14" fill="#333">TripAdvisor</text>
  </svg>
);

const BookingComLogo = () => (
  <svg viewBox="0 0 130 40" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="27" fontFamily="Arial" fontWeight="700" fontSize="18" fill="#003580">Booking</text>
    <text x="84" y="27" fontFamily="Arial" fontWeight="700" fontSize="18" fill="#E8192C">.com</text>
  </svg>
);

const KayakLogo = () => (
  <svg viewBox="0 0 90 40" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="6" width="34" height="28" rx="5" fill="#FF690F" />
    <text x="4" y="26" fontFamily="Arial" fontWeight="900" fontSize="16" fill="white">K</text>
    <text x="15" y="26" fontFamily="Arial" fontWeight="900" fontSize="16" fill="white" opacity="0.7">≡</text>
    <text x="38" y="27" fontFamily="Arial" fontWeight="700" fontSize="16" fill="#FF690F">KAYAK</text>
  </svg>
);

const ExpediaLogo = () => (
  <svg viewBox="0 0 110 40" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="20" r="13" fill="#FBCC33" />
    <circle cx="18" cy="20" r="8" fill="#1E90FF" />
    <circle cx="18" cy="20" r="4" fill="#FBCC33" />
    <text x="36" y="27" fontFamily="Arial" fontWeight="700" fontSize="16" fill="#1E90FF">expedia</text>
  </svg>
);

// --- Partner list (duplicated for infinite scroll effect) ---
const partners = [
  { id: "flyjinnah",    Logo: FlyJinnahLogo,    name: "FlyJinnah" },
  { id: "airsial",     Logo: AirSialLogo,       name: "AirSial" },
  { id: "pia",         Logo: PIALogo,           name: "Pakistan International Airlines" },
  { id: "airblue",     Logo: AirblueLogo,       name: "Airblue" },
  { id: "sastaticket", Logo: SastaTicketLogo,   name: "sastaticket.pk" },
  { id: "skytours",    Logo: SkyToursLogo,      name: "Sky-Tours" },
  { id: "onetravel",   Logo: OneTravelLogo,     name: "OneTravel" },
  { id: "tripadvisor", Logo: TripAdvisorLogo,   name: "TripAdvisor" },
  { id: "bookingcom",  Logo: BookingComLogo,    name: "Booking.com" },
  { id: "kayak",       Logo: KayakLogo,         name: "KAYAK" },
  { id: "expedia",     Logo: ExpediaLogo,       name: "Expedia" },
];

export function TravelPartnersMarquee() {
  // Duplicate list for seamless infinite loop
  const loopedPartners = [...partners, ...partners];
  const [isPaused, setIsPaused] = React.useState(false);

  return (
    <section className="w-full bg-white border-t border-b border-slate-100 py-5 overflow-hidden">
      {/* Heading */}
      <p className="text-center text-slate-700 font-bold text-base md:text-lg mb-4 tracking-tight px-4">
        <span className="text-slate-900">700+ travel websites.</span>{" "}
        <span className="text-slate-500 font-medium">One simple search.</span>
      </p>

      {/* Marquee track */}
      <div className="relative w-full overflow-hidden">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 h-full w-16 md:w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 h-full w-16 md:w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        {/* Scrolling strip */}
        <div
          className="flex items-center gap-10 md:gap-14"
          style={{
            animation: "marquee-scroll 28s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
            width: "max-content",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {loopedPartners.map(({ id, Logo, name }, index) => (
            <div
              key={`${id}-${index}`}
              title={name}
              className="flex items-center justify-center px-2 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer flex-shrink-0"
            >
              <Logo />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
