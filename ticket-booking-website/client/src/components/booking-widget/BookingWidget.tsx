import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plane,
  Building,
  Car,
  Search,
  Calendar,
  ArrowLeftRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Check,
  X
} from "lucide-react";
import type { TabType, TripType, ClassType, PassengerState, FlightSegment } from "../../types";

// Custom premium Kaaba / Umrah Icon
const KaabaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    {/* Kaaba Cube */}
    <polygon points="12,2 3,6 12,10 21,6" />
    <polygon points="3,7.5 11,11 11,21 3,17.5" opacity="0.9" />
    <polygon points="21,7.5 13,11 13,21 21,17.5" opacity="0.8" />
    {/* Kiswah Gold Band */}
    <polygon points="3,10.5 11,14 11,15.2 3,11.7" fill="#EAB308" />
    <polygon points="21,10.5 13,14 13,15.2 21,11.7" fill="#EAB308" />
  </svg>
);

const popularCities = [
  { name: "Karachi", code: "KHI", country: "Pakistan" },
  { name: "Lahore", code: "LHE", country: "Pakistan" },
  { name: "Islamabad", code: "ISB", country: "Pakistan" },
  { name: "Dubai", code: "DXB", country: "United Arab Emirates" },
  { name: "London", code: "LHR", country: "United Kingdom" },
  { name: "New York", code: "JFK", country: "United States" },
  { name: "Jeddah", code: "JED", country: "Saudi Arabia" },
];

interface ActiveDropdown {
  type: "from" | "to" | "passenger" | "class" | "payment" | "depart";
  index?: number; // Used for multi-city or segment-specific dropdowns
}

export function BookingWidget() {
  // Widget States
  const [tab, setTab] = useState<TabType>("flights");
  const [tripType, setTripType] = useState<TripType>("round-trip");

  // Single-flight states (used for One-way and Round-trip)
  const [from, setFrom] = useState<string>("Karachi (KHI)");
  const [to, setTo] = useState<string>("");

  // Date setup (Default to tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [departDate, setDepartDate] = useState<Date>(tomorrow);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  // Multi-city segments states (minimum 2 flights)
  const [segments, setSegments] = useState<Array<{
    id: string;
    from: string;
    to: string;
    departDate: Date;
  }>>([
    { id: "1", from: "Karachi (KHI)", to: "", departDate: tomorrow },
    { id: "2", from: "", to: "", departDate: (() => { const d = new Date(tomorrow); d.setDate(d.getDate() + 3); return d; })() }
  ]);

  const [directOnly, setDirectOnly] = useState<boolean>(false);
  const [passengers, setPassengers] = useState<PassengerState>({
    adults: 1,
    children: 0,
    infants: 0
  });
  const [flightClass, setFlightClass] = useState<ClassType>("economy");
  const [paymentType, setPaymentType] = useState<string>("Cash");

  // Single active dropdown tracking to ensure only one is open at a time
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown | null>(null);

  // Refs for tracking click outside
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  // Date Input Refs to trigger picker
  const singleDepartInputRef = useRef<HTMLInputElement>(null);
  const singleReturnInputRef = useRef<HTMLInputElement>(null);
  const segmentInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetContainerRef.current && !widgetContainerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format date to: "Sun, 02 Aug 2026"
  const formatDateString = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  // Adjust Departure Date in Single-flight modes
  const adjustSingleDate = (days: number) => {
    const newDate = new Date(departDate);
    newDate.setDate(newDate.getDate() + days);
    setDepartDate(newDate);
  };

  // Adjust Segment Date in Multi-city
  const adjustSegmentDate = (index: number, days: number) => {
    setSegments(prev => prev.map((seg, i) => {
      if (i === index) {
        const newD = new Date(seg.departDate);
        newD.setDate(newD.getDate() + days);
        return { ...seg, departDate: newD };
      }
      return seg;
    }));
  };

  // Swap From & To handler (Single mode)
  const handleSingleSwap = () => {
    const temp = from;
    setFrom(to || "Select Origin");
    setTo(temp === "Select Origin" ? "" : temp);
  };

  // Swap Segment locations (Multi-city)
  const handleSegmentSwap = (index: number) => {
    setSegments(prev => prev.map((seg, i) => {
      if (i === index) {
        const temp = seg.from;
        return {
          ...seg,
          from: seg.to || "Select Origin",
          to: temp === "Select Origin" ? "" : temp
        };
      }
      return seg;
    }));
  };

  // Add Segment for Multi-city
  const addSegment = () => {
    setSegments(prev => {
      const last = prev[prev.length - 1];
      const nextFrom = last ? last.to : "";
      const nextD = new Date(last ? last.departDate : tomorrow);
      nextD.setDate(nextD.getDate() + 3);
      return [
        ...prev,
        {
          id: Date.now().toString(),
          from: nextFrom,
          to: "",
          departDate: nextD
        }
      ];
    });
  };

  // Remove Segment for Multi-city
  const removeSegment = (index: number) => {
    if (segments.length <= 2) return; // Keep minimum 2 rows
    setSegments(prev => prev.filter((_, i) => i !== index));
  };

  // Update Segment fields
  const updateSegmentField = (index: number, field: "from" | "to" | "departDate", value: any) => {
    setSegments(prev => prev.map((seg, i) => {
      if (i === index) {
        return { ...seg, [field]: value };
      }
      return seg;
    }));
  };

  // Passenger update handler
  const updatePassengerCount = (type: keyof PassengerState, operation: "inc" | "dec") => {
    setPassengers(prev => {
      const value = prev[type];
      if (operation === "dec") {
        if (type === "adults" && value <= 1) return prev;
        if (value <= 0) return prev;
        return { ...prev, [type]: value - 1 };
      } else {
        return { ...prev, [type]: value + 1 };
      }
    });
  };

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  return (
    <div ref={widgetContainerRef} className="w-full max-w-6xl mx-auto px-4 z-10">

      {/* 1. Translucent Blue Tabs Container */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-1 sm:gap-2 p-4 rounded-full bg-white/15 backdrop-blur-md border border-white/20 shadow-lg">

          <Button
            onClick={() => setTab("flights")}
            className={`flex items-center gap-2 px-6 py-6 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${tab === "flights"
              ? "bg-white text-slate-900 shadow-md font-bold"
              : "text-white hover:bg-white/10"
              }`}
          >
            <Plane className={`w-4 h-4 transform -rotate-45 ${tab === "flights" ? "text-emerald-500 fill-emerald-100" : "text-white"}`} />
            <span>Flights</span>
          </Button>

          <Button
            onClick={() => setTab("hotels")}
            className={`flex items-center gap-2 px-6 py-6 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${tab === "hotels"
              ? "bg-white text-slate-900 shadow-md font-bold"
              : "text-white hover:bg-white/10"
              }`}
          >
            <Building className="w-4 h-4" />
            <span>Hotels</span>
          </Button>

          <Button
            onClick={() => setTab("cars")}
            className={`flex items-center gap-2 px-6 py-6 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${tab === "cars"
              ? "bg-white text-slate-900 shadow-md font-bold"
              : "text-white hover:bg-white/10"
              }`}
          >
            <Car className="w-4 h-4" />
            <span>Car Rentals</span>
          </Button>

          <div className="relative">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF6B00] text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider animate-bounce shadow-md z-10">
              New
            </span>
            <Button
              onClick={() => setTab("umrah")}
              className={`flex items-center gap-2 px-6 py-6 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${tab === "umrah"
                ? "bg-white text-slate-900 shadow-md font-bold"
                : "bg-white/15 text-white border border-white/10 hover:bg-white/25 shadow-sm"
                }`}
            >
              <KaabaIcon className="w-4 h-4" />
              <span>Umrah</span>
            </Button>
          </div>

        </div>
      </div>

      {/* 2. Main Search Widget White Card */}
      <div className="bg-white rounded-[28px] shadow-2xl p-6 md:p-8 border border-slate-100 relative transition-all duration-300">

        {/* Row 1: Trip type buttons */}
        <div className="flex gap-2 sm:gap-3 mb-6">
          <Button
            onClick={() => setTripType("one-way")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all cursor-pointer ${tripType === "one-way"
              ? "bg-[#E6F7EB] text-[#1D992F] font-bold border border-[#C5ECD0]"
              : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
          >
            One-way
          </Button>

          <Button
            onClick={() => setTripType("round-trip")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all cursor-pointer ${tripType === "round-trip"
              ? "bg-[#E6F7EB] text-[#1D992F] font-bold border border-[#C5ECD0]"
              : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
          >
            Round-trip
          </Button>

          <Button
            onClick={() => setTripType("multi-city")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all cursor-pointer ${tripType === "multi-city"
              ? "bg-[#E6F7EB] text-[#1D992F] font-bold border border-[#C5ECD0]"
              : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
          >
            Multi-city
          </Button>
        </div>

        {/* Row 2: Layout Conditional Rendering */}

        {/* CASE A: ONE-WAY LAYOUT */}
        {tripType === "one-way" && (
          <div className="grid grid-cols-1 lg:grid-cols-11 border border-slate-200 rounded-2xl overflow-visible mb-6 bg-slate-50/50 relative">

            {/* FROM */}
            <div
              className="lg:col-span-4 p-4 relative border-b lg:border-b-0 hover:bg-white transition-colors group cursor-pointer lg:mr-1 lg:rounded-l-2xl lg:rounded-r-xl lg:pr-4"
              onClick={() => setActiveDropdown(activeDropdown?.type === "from" ? null : { type: "from" })}
            >
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">From</label>
              <div className="text-base font-bold text-slate-800 select-none">{from}</div>

              {/* Right border divider with cutout */}
              <div className="absolute right-0 top-0 bottom-0 pointer-events-none hidden lg:block w-[22px] z-20">
                <div className="absolute right-0 top-0 bottom-[calc(50%+22px)] w-[1px] bg-slate-200" />
                <div className="absolute right-0 top-[calc(50%+22px)] bottom-0 w-[1px] bg-slate-200" />
                <div className="absolute right-0 translate-x-[0.5px] top-1/2 -translate-y-1/2 w-[22px] h-[44px] border-l border-t border-b border-slate-200 rounded-l-full bg-slate-50/50 group-hover:bg-white transition-colors" />
              </div>

              {activeDropdown?.type === "from" && (
                <div className="absolute left-0 right-0 top-[102%] mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-2 max-h-60 overflow-y-auto">
                  <div className="px-4 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50">Popular Airports</div>
                  {popularCities.map((city) => (
                    <Button
                      key={city.code}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFrom(`${city.name} (${city.code})`);
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-sm font-medium text-slate-700 flex justify-between items-center transition-colors cursor-pointer"
                    >
                      <div>
                        <span className="font-bold text-slate-800">{city.name}</span>
                        <span className="text-slate-400 text-xs ml-1">, {city.country}</span>
                      </div>
                      <span className="font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded text-xs">{city.code}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Swap Button (Centered at 36.3% - boundary between cols 4 and 4) */}
            <div className="absolute left-[36.3%] top-[148px] lg:left-[36.3%] lg:top-[50%] transform -translate-x-1/2 -translate-y-1/2 z-30 hidden lg:block">
              <button
                onClick={handleSingleSwap}
                className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all duration-200 cursor-pointer active:scale-95 outline-none"
                title="Swap Locations"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* TO (Focus box like mockup when empty) */}
            <div
              className={`lg:col-span-4 p-4 relative border-b lg:border-b-0 lg:border-r border-slate-200 hover:bg-white transition-all group cursor-pointer lg:ml-1 lg:rounded-l-xl lg:rounded-r-none lg:pl-8 ${!to ? "border-t-2 border-b-2 border-r-2 border-emerald-500 z-10 bg-white" : "hover:bg-white"
                }`}
              onClick={() => setActiveDropdown(activeDropdown?.type === "to" ? null : { type: "to" })}
            >
              {/* Custom Left Border with Cutout (Visible on desktop) */}
              <div className="absolute left-0 top-0 bottom-0 pointer-events-none hidden lg:block z-20">
                {/* Top vertical segment */}
                <div className={`absolute left-0 top-0 bottom-[calc(50%+22px)] transition-all ${!to ? "w-[2px] -left-[1px] bg-emerald-500" : "w-0 bg-transparent"}`} />
                {/* Bottom vertical segment */}
                <div className={`absolute left-0 top-[calc(50%+22px)] bottom-0 transition-all ${!to ? "w-[2px] -left-[1px] bg-emerald-500" : "w-0 bg-transparent"}`} />
                {/* Cutout curve */}
                <div className={`absolute left-0 -translate-x-[0.5px] top-1/2 -translate-y-1/2 w-[22px] h-[44px] rounded-r-full transition-all ${!to ? "border-r-2 border-t-2 border-b-2 border-emerald-500 -left-[1px] bg-white" : "border-0 border-transparent bg-transparent"
                  }`} />
              </div>

              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">To</label>
              <div className={`text-base font-bold select-none ${to ? "text-slate-800" : "text-slate-400 font-normal"}`}>
                {to}
              </div>

              {activeDropdown?.type === "to" && (
                <div className="absolute left-0 right-0 top-[102%] mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-2 max-h-60 overflow-y-auto">
                  <div className="px-4 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50">Popular Airports</div>
                  {popularCities
                    .filter(c => !from.includes(c.code))
                    .map((city) => (
                      <Button
                        key={city.code}
                        onClick={(e) => {
                          e.stopPropagation();
                          setTo(`${city.name} (${city.code})`);
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-sm font-medium text-slate-700 flex justify-between items-center transition-colors cursor-pointer"
                      >
                        <div>
                          <span className="font-bold text-slate-800">{city.name}</span>
                          <span className="text-slate-400 text-xs ml-1">, {city.country}</span>
                        </div>
                        <span className="font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded text-xs">{city.code}</span>
                      </Button>
                    ))}
                </div>
              )}
            </div>

            {/* DEPART */}
            <div
              className="lg:col-span-3 p-4 hover:bg-white transition-colors group flex items-center justify-between cursor-pointer relative"
              onClick={() => singleDepartInputRef.current?.showPicker()}
            >
              <Input
                type="date"
                ref={singleDepartInputRef}
                value={departDate.toISOString().split('T')[0]}
                onChange={(e) => setDepartDate(new Date(e.target.value))}
                className="absolute inset-0 opacity-0 pointer-events-none"
              />
              <div className="flex-grow">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Depart</label>
                <div className="text-base font-bold text-slate-800 select-none flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{formatDateString(departDate)}</span>
                </div>
              </div>

              {/* Chevron arrows */}
              <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 group-hover:bg-slate-200/60 transition-colors z-20" onClick={(e) => e.stopPropagation()}>
                <Button
                  onClick={() => adjustSingleDate(-1)}
                  className="p-1 hover:bg-white rounded text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </Button>
                <Button
                  onClick={() => adjustSingleDate(1)}
                  className="p-1 hover:bg-white rounded text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

          </div>
        )}

        {/* CASE B: ROUND-TRIP LAYOUT */}
        {tripType === "round-trip" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-slate-200 rounded-2xl overflow-visible mb-6 bg-slate-50/50 relative">

            {/* FROM */}
            <div
              className="lg:col-span-3 p-4 relative border-b lg:border-b-0 hover:bg-white transition-colors group cursor-pointer lg:mr-1 lg:rounded-l-2xl lg:rounded-r-xl lg:pr-8"
              onClick={() => setActiveDropdown(activeDropdown?.type === "from" ? null : { type: "from" })}
            >
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">From</label>
              <div className="text-base font-bold text-slate-800 select-none">{from}</div>

              {/* Right border divider with cutout */}
              <div className="absolute right-0 top-0 bottom-0 pointer-events-none hidden lg:block w-[22px] z-20">
                <div className="absolute right-0 top-0 bottom-[calc(50%+22px)] w-[1px] bg-slate-200" />
                <div className="absolute right-0 top-[calc(50%+22px)] bottom-0 w-[1px] bg-slate-200" />
                <div className="absolute right-0 translate-x-[0.5px] top-1/2 -translate-y-1/2 w-[22px] h-[44px] border-l border-t border-b border-slate-200 rounded-l-full bg-slate-50/50 group-hover:bg-white transition-colors" />
              </div>

              {activeDropdown?.type === "from" && (
                <div className="absolute left-0 right-0 top-[102%] mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-2 max-h-60 overflow-y-auto">
                  <div className="px-4 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50">Popular Airports</div>
                  {popularCities.map((city) => (
                    <Button
                      key={city.code}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFrom(`${city.name} (${city.code})`);
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-sm font-medium text-slate-700 flex justify-between items-center transition-colors cursor-pointer"
                    >
                      <div>
                        <span className="font-bold text-slate-800">{city.name}</span>
                        <span className="text-slate-400 text-xs ml-1">, {city.country}</span>
                      </div>
                      <span className="font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded text-xs">{city.code}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Swap Button (Centered at 25% - boundary between cols 3 and 3) */}
            <div className="absolute left-[25%] top-[148px] lg:left-[25%] lg:top-[50%] transform -translate-x-1/2 -translate-y-1/2 z-30 hidden lg:block">
              <button
                onClick={handleSingleSwap}
                className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all duration-200 cursor-pointer active:scale-95 outline-none"
                title="Swap Locations"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* TO (Focus box like mockup when empty) */}
            <div
              className={`lg:col-span-3 p-4 relative border-b lg:border-b-0 lg:border-r border-slate-200 hover:bg-white transition-all group cursor-pointer lg:ml-1 lg:rounded-l-xl lg:rounded-r-none lg:pl-8 ${!to ? "border-t-2 border-b-2 border-r-2 border-emerald-500 z-10 bg-white" : "hover:bg-white"
                }`}
              onClick={() => setActiveDropdown(activeDropdown?.type === "to" ? null : { type: "to" })}
            >
              {/* Custom Left Border with Cutout (Visible on desktop) */}
              <div className="absolute left-0 top-0 bottom-0 pointer-events-none hidden lg:block z-20">
                {/* Top vertical segment */}
                <div className={`absolute left-0 top-0 bottom-[calc(50%+22px)] transition-all ${!to ? "w-[2px] -left-[1px] bg-emerald-500" : "w-0 bg-transparent"}`} />
                {/* Bottom vertical segment */}
                <div className={`absolute left-0 top-[calc(50%+22px)] bottom-0 transition-all ${!to ? "w-[2px] -left-[1px] bg-emerald-500" : "w-0 bg-transparent"}`} />
                {/* Cutout curve */}
                <div className={`absolute left-0 -translate-x-[0.5px] top-1/2 -translate-y-1/2 w-[22px] h-[44px] rounded-r-full transition-all ${!to ? "border-r-2 border-t-2 border-b-2 border-emerald-500 -left-[1px] bg-white" : "border-0 border-transparent bg-transparent"
                  }`} />
              </div>

              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">To</label>
              <div className={`text-base font-bold select-none ${to ? "text-slate-800" : "text-slate-400 font-normal"}`}>
                {to}
              </div>

              {activeDropdown?.type === "to" && (
                <div className="absolute left-0 right-0 top-[102%] mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-2 max-h-60 overflow-y-auto">
                  <div className="px-4 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50">Popular Airports</div>
                  {popularCities
                    .filter(c => !from.includes(c.code))
                    .map((city) => (
                      <Button
                        key={city.code}
                        onClick={(e) => {
                          e.stopPropagation();
                          setTo(`${city.name} (${city.code})`);
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-sm font-medium text-slate-700 flex justify-between items-center transition-colors cursor-pointer"
                      >
                        <div>
                          <span className="font-bold text-slate-800">{city.name}</span>
                          <span className="text-slate-400 text-xs ml-1">, {city.country}</span>
                        </div>
                        <span className="font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded text-xs">{city.code}</span>
                      </Button>
                    ))}
                </div>
              )}
            </div>

            {/* DEPART */}
            <div
              className="lg:col-span-3 p-4 border-b lg:border-b-0 lg:border-r border-slate-200 hover:bg-white transition-colors group flex items-center justify-between cursor-pointer relative"
              onClick={() => singleDepartInputRef.current?.showPicker()}
            >
              <Input
                type="date"
                ref={singleDepartInputRef}
                value={departDate.toISOString().split('T')[0]}
                onChange={(e) => setDepartDate(new Date(e.target.value))}
                className="absolute inset-0 opacity-0 pointer-events-none"
              />
              <div className="flex-grow">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Depart</label>
                <div className="text-base font-bold text-slate-800 select-none flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{formatDateString(departDate)}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 group-hover:bg-slate-200/60 transition-colors z-20" onClick={(e) => e.stopPropagation()}>
                <Button
                  onClick={() => adjustSingleDate(-1)}
                  className="p-1 hover:bg-white rounded text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </Button>
                <Button
                  onClick={() => adjustSingleDate(1)}
                  className="p-1 hover:bg-white rounded text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* RETURN */}
            <div
              className="lg:col-span-3 p-4 hover:bg-white transition-colors group cursor-pointer relative"
              onClick={() => {
                if (!returnDate) {
                  const d = new Date(departDate);
                  d.setDate(d.getDate() + 7);
                  setReturnDate(d);
                }
                setTimeout(() => singleReturnInputRef.current?.showPicker(), 50);
              }}
            >
              <Input
                type="date"
                ref={singleReturnInputRef}
                value={returnDate ? returnDate.toISOString().split('T')[0] : ""}
                onChange={(e) => setReturnDate(new Date(e.target.value))}
                className="absolute inset-0 opacity-0 pointer-events-none"
              />
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Return</label>
              <div className="text-base font-bold select-none flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                {returnDate ? (
                  <span className="text-slate-800">{formatDateString(returnDate)}</span>
                ) : (
                  <span className="text-slate-400 font-normal">Return</span>
                )}
              </div>
            </div>

          </div>
        )}

        {/* CASE C: MULTI-CITY LAYOUT */}
        {tripType === "multi-city" && (
          <div className="space-y-4 mb-6">
            {segments.map((segment, index) => (
              <div key={segment.id} className="flex items-center gap-3 w-full">

                {/* Segment Input Box container */}
                <div className="flex-grow grid grid-cols-1 lg:grid-cols-11 border border-slate-200 rounded-2xl overflow-visible bg-slate-50/50 relative">

                  {/* FROM */}
                  <div
                    className="lg:col-span-4 p-4 relative border-b lg:border-b-0 hover:bg-white transition-colors group cursor-pointer lg:mr-1 lg:rounded-l-2xl lg:rounded-r-xl lg:pr-8"
                    onClick={() => setActiveDropdown(activeDropdown?.type === "from" && activeDropdown?.index === index ? null : { type: "from", index })}
                  >
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">From</label>
                    <div className={`text-base font-bold select-none ${segment.from ? "text-slate-800" : "text-slate-400 font-normal"}`}>
                      {segment.from || "Select Origin"}
                    </div>

                    {/* Right border divider with cutout */}
                    <div className="absolute right-0 top-0 bottom-0 pointer-events-none hidden lg:block w-[22px] z-20">
                      <div className="absolute right-0 top-0 bottom-[calc(50%+22px)] w-[1px] bg-slate-200" />
                      <div className="absolute right-0 top-[calc(50%+22px)] bottom-0 w-[1px] bg-slate-200" />
                      <div className="absolute right-0 translate-x-[0.5px] top-1/2 -translate-y-1/2 w-[22px] h-[44px] border-l border-t border-b border-slate-200 rounded-l-full bg-slate-50/50 group-hover:bg-white transition-colors" />
                    </div>

                    {activeDropdown?.type === "from" && activeDropdown?.index === index && (
                      <div className="absolute left-0 right-0 top-[102%] mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-2 max-h-60 overflow-y-auto">
                        <div className="px-4 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50">Popular Airports</div>
                        {popularCities.map((city) => (
                          <Button
                            key={city.code}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateSegmentField(index, "from", `${city.name} (${city.code})`);
                              setActiveDropdown(null);
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-sm font-medium text-slate-700 flex justify-between items-center transition-colors cursor-pointer"
                          >
                            <div>
                              <span className="font-bold text-slate-800">{city.name}</span>
                              <span className="text-slate-400 text-xs ml-1">, {city.country}</span>
                            </div>
                            <span className="font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded text-xs">{city.code}</span>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Swap Button (Centered at 36.3% - boundary between cols 4 and 4) */}
                  <div className="absolute left-[36.3%] top-[148px] lg:left-[36.3%] lg:top-[50%] transform -translate-x-1/2 -translate-y-1/2 z-30 hidden lg:block">
                    <button
                      onClick={() => handleSegmentSwap(index)}
                      className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all duration-200 cursor-pointer active:scale-95 outline-none"
                      title="Swap Locations"
                    >
                      <ArrowLeftRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* TO */}
                  <div
                    className={`lg:col-span-4 p-4 relative border-b lg:border-b-0 lg:border-r border-slate-200 hover:bg-white transition-all group cursor-pointer lg:ml-1 lg:rounded-l-xl lg:rounded-r-none lg:pl-8 ${!segment.to ? "border-t-2 border-b-2 border-r-2 border-emerald-500 z-10 bg-white" : "hover:bg-white"
                      }`}
                    onClick={() => setActiveDropdown(activeDropdown?.type === "to" && activeDropdown?.index === index ? null : { type: "to", index })}
                  >
                    {/* Custom Left Border with Cutout (Visible on desktop) */}
                    <div className="absolute left-0 top-0 bottom-0 pointer-events-none hidden lg:block z-20">
                      {/* Top vertical segment */}
                      <div className={`absolute left-0 top-0 bottom-[calc(50%+22px)] w-[1px] transition-all ${!segment.to ? "w-[2px] -left-[1px] bg-emerald-500" : "bg-transparent"}`} />
                      {/* Bottom vertical segment */}
                      <div className={`absolute left-0 top-[calc(50%+22px)] bottom-0 w-[1px] transition-all ${!segment.to ? "w-[2px] -left-[1px] bg-emerald-500" : "bg-transparent"}`} />
                      {/* Cutout curve */}
                      <div className={`absolute left-0 -translate-x-[0.5px] top-1/2 -translate-y-1/2 w-[22px] h-[44px] border-r border-t border-b rounded-r-full transition-all ${!segment.to ? "border-r-2 border-t-2 border-b-2 border-emerald-500 -left-[1px] bg-white" : "border-transparent"
                        }`} />
                    </div>

                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">To</label>
                    <div className={`text-base font-bold select-none ${segment.to ? "text-slate-800" : "text-slate-400 font-normal"}`}>
                      {segment.to}
                    </div>

                    {activeDropdown?.type === "to" && activeDropdown?.index === index && (
                      <div className="absolute left-0 right-0 top-[102%] mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-2 max-h-60 overflow-y-auto">
                        <div className="px-4 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50">Popular Airports</div>
                        {popularCities
                          .filter(c => !segment.from.includes(c.code))
                          .map((city) => (
                            <Button
                              key={city.code}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateSegmentField(index, "to", `${city.name} (${city.code})`);
                                setActiveDropdown(null);
                              }}
                              className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-sm font-medium text-slate-700 flex justify-between items-center transition-colors cursor-pointer"
                            >
                              <div>
                                <span className="font-bold text-slate-800">{city.name}</span>
                                <span className="text-slate-400 text-xs ml-1">, {city.country}</span>
                              </div>
                              <span className="font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded text-xs">{city.code}</span>
                            </Button>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* DEPART */}
                  <div
                    className="lg:col-span-3 p-4 hover:bg-white transition-colors group flex items-center justify-between cursor-pointer relative"
                    onClick={() => {
                      const inputEl = segmentInputRefs.current[segment.id];
                      inputEl?.showPicker();
                    }}
                  >
                    <Input
                      type="date"
                      ref={(el) => { segmentInputRefs.current[segment.id] = el; }}
                      value={segment.departDate.toISOString().split('T')[0]}
                      onChange={(e) => updateSegmentField(index, "departDate", new Date(e.target.value))}
                      className="absolute inset-0 opacity-0 pointer-events-none"
                    />
                    <div className="flex-grow">
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Depart</label>
                      <div className="text-base font-bold text-slate-800 select-none flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>{formatDateString(segment.departDate)}</span>
                      </div>
                    </div>

                    {/* Date Adjusters */}
                    <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 group-hover:bg-slate-200/60 transition-colors z-20" onClick={(e) => e.stopPropagation()}>
                      <Button
                        onClick={() => adjustSegmentDate(index, -1)}
                        className="p-1 hover:bg-white rounded text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        onClick={() => adjustSegmentDate(index, 1)}
                        className="p-1 hover:bg-white rounded text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>

                </div>

                {/* Delete button on the right (Circular grey outline + grey cross) */}
                <Button
                  onClick={() => removeSegment(index)}
                  disabled={segments.length <= 2}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${segments.length <= 2
                    ? "border-slate-100 text-slate-200 cursor-not-allowed"
                    : "border-slate-300 hover:border-slate-500 text-slate-400 hover:text-slate-600 cursor-pointer"
                    }`}
                  title="Remove flight"
                >
                  <X className="w-4 h-4 stroke-[2.5px]" />
                </Button>

              </div>
            ))}

            {/* Add Flight Button */}
            <div className="pt-2">
              <Button
                onClick={addSegment}
                className="border border-[#1D992F] hover:bg-[#E6F7EB]/30 rounded-xl px-5 py-2.5 text-sm text-[#1D992F] font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 stroke-[2.5px]" />
                <span>Add flight</span>
              </Button>
            </div>

          </div>
        )}

        {/* Row 3: Direct check and passenger/class options & Search button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">

          {/* Checkbox Direct Only */}
          <div className="flex items-center">
            <label className="flex items-center gap-3 cursor-pointer group select-none">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={directOnly}
                  onChange={(e) => setDirectOnly(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${directOnly
                  ? "bg-[#3EB816] border-[#3EB816] scale-100"
                  : "border-slate-300 bg-white group-hover:border-[#3EB816]"
                  }`}>
                  {directOnly && <Check className="w-3.5 h-3.5 text-white stroke-[3.5px]" />}
                </div>
              </div>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">Direct Only</span>
            </label>
          </div>

          {/* Dropdown triggers & search button wrapper */}
          <div className="flex flex-wrap items-center gap-3 md:gap-5 justify-end">

            {/* Passengers dropdown */}
            <div className="relative">
              <Button
                onClick={() => setActiveDropdown(activeDropdown?.type === "passenger" ? null : { type: "passenger" })}
                className="flex items-center gap-1 px-4 py-2 hover:bg-slate-50 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 select-none cursor-pointer transition-colors"
              >
                <span>{totalPassengers} {totalPassengers > 1 ? "Passengers" : "Adult"}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeDropdown?.type === "passenger" ? "rotate-180" : ""}`} />
              </Button>

              {activeDropdown?.type === "passenger" && (
                <div className="absolute right-0 bottom-[115%] md:bottom-auto md:top-[115%] w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-5 z-50">
                  <div className="space-y-4">

                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-slate-800">Adults</div>
                        <div className="text-[11px] text-slate-400 font-medium">Age 12+</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          onClick={() => updatePassengerCount("adults", "dec")}
                          className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-500 cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-bold text-slate-800 w-4 text-center">{passengers.adults}</span>
                        <Button
                          onClick={() => updatePassengerCount("adults", "inc")}
                          className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-500 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-slate-800">Children</div>
                        <div className="text-[11px] text-slate-400 font-medium">Age 2-11</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          onClick={() => updatePassengerCount("children", "dec")}
                          className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-500 cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-bold text-slate-800 w-4 text-center">{passengers.children}</span>
                        <Button
                          onClick={() => updatePassengerCount("children", "inc")}
                          className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-500 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Infants */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-slate-800">Infants</div>
                        <div className="text-[11px] text-slate-400 font-medium">Under 2</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          onClick={() => updatePassengerCount("infants", "dec")}
                          className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-500 cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-bold text-slate-800 w-4 text-center">{passengers.infants}</span>
                        <Button
                          onClick={() => updatePassengerCount("infants", "inc")}
                          className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-500 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Class dropdown */}
            <div className="relative">
              <Button
                onClick={() => setActiveDropdown(activeDropdown?.type === "class" ? null : { type: "class" })}
                className="flex items-center gap-1 px-4 py-2 hover:bg-slate-50 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 select-none cursor-pointer transition-colors"
              >
                <span className="capitalize">{flightClass}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeDropdown?.type === "class" ? "rotate-180" : ""}`} />
              </Button>

              {activeDropdown?.type === "class" && (
                <div className="absolute right-0 bottom-[115%] md:bottom-auto md:top-[115%] w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
                  {(["economy", "premium", "business", "first"] as ClassType[]).map((c) => (
                    <Button
                      key={c}
                      onClick={() => {
                        setFlightClass(c);
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-semibold capitalize text-slate-700 hover:text-slate-900 transition-colors flex justify-between items-center cursor-pointer"
                    >
                      <span>{c}</span>
                      {flightClass === c && <Check className="w-4 h-4 text-emerald-500" />}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Payment dropdown */}
            <div className="relative">
              <Button
                onClick={() => setActiveDropdown(activeDropdown?.type === "payment" ? null : { type: "payment" })}
                className="flex items-center gap-1 px-4 py-2 hover:bg-slate-50 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 select-none cursor-pointer transition-colors"
              >
                <span>{paymentType === "Cash" ? "Cash" : "5 Payment Types"}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeDropdown?.type === "payment" ? "rotate-180" : ""}`} />
              </Button>

              {activeDropdown?.type === "payment" && (
                <div className="absolute right-0 bottom-[115%] md:bottom-auto md:top-[115%] w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
                  <div className="px-4 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50">Select Type</div>
                  {["Cash", "Visa/Mastercard", "UnionPay", "Bank Transfer", "Mobile Wallet"].map((type) => (
                    <Button
                      key={type}
                      onClick={() => {
                        setPaymentType(type);
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors flex justify-between items-center cursor-pointer"
                    >
                      <span>{type}</span>
                      {paymentType === type && <Check className="w-4 h-4 text-emerald-500" />}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* SEARCH BUTTON */}
            <Button className="bg-[#3EB816] hover:bg-[#329B10] text-white font-bold text-base px-8 py-3.5 rounded-full shadow-lg shadow-green-500/10 hover:shadow-green-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer leading-none">
              <Search className="w-4 h-4 stroke-[3px]" />
              <span>Search</span>
            </Button>

          </div>

        </div>

      </div>

    </div>
  );
}
