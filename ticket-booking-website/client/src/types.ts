export type TabType = "flights" | "hotels" | "cars" | "umrah";

export type TripType = "one-way" | "round-trip" | "multi-city";

export type ClassType = "economy" | "premium" | "business" | "first";

export interface PassengerState {
  adults: number;
  children: number;
  infants: number;
}

export interface FlightSegment {
  id: string;
  from: string;
  to: string;
  departDate: string;
}

export interface BookingState {
  tab: TabType;
  tripType: TripType;
  from: string;
  to: string;
  departDate: string; // ISO string or formatted date
  returnDate: string | null;
  directOnly: boolean;
  passengers: PassengerState;
  class: ClassType;
  paymentType: string;
  segments: FlightSegment[]; // For Multi-city itinerary
}

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: string;
  token?: string;
}

export interface AuthResponse {
  user: User;
  session?: Session;
  token?: string;
  message?: string;
}
