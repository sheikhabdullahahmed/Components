import React, { useState } from "react";
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  Loader2,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useSignInMutation,
  useSignUpMutation,
  useSignInSocialMutation,
} from "@/store/services/authApi";
import { useAppDispatch } from "@/store/hook";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup";
}

export function AuthModal({
  isOpen,
  onClose,
  initialMode = "signin",
}: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [customError, setCustomError] = useState<string | null>(null);
  const [activeSocialProvider, setActiveSocialProvider] = useState<"google" | "facebook" | null>(null);

  const [signIn, { isLoading: isSigningIn }] = useSignInMutation();
  const [signUp, { isLoading: isSigningUp }] = useSignUpMutation();
  const [signInSocial, { isLoading: isSocialLoading }] =
    useSignInSocialMutation();

  const isLoading = isSigningIn || isSigningUp || isSocialLoading;

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCustomError(null);

    if (!email || !password) {
      setCustomError("Please fill in all required fields.");
      return;
    }

    if (mode === "signup" && !name) {
      setCustomError("Please enter your full name.");
      return;
    }

    try {
      if (mode === "signin") {
        const result = await signIn({ email, password }).unwrap();
        if (result) {
          onClose();
        }
      } else {
        const result = await signUp({ name, email, password }).unwrap();
        if (result) {
          onClose();
        }
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      const errorMessage =
        err?.data?.message ||
        err?.error ||
        "Authentication failed. Please check your credentials.";
      setCustomError(errorMessage);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "facebook") => {
    setCustomError(null);
    setActiveSocialProvider(provider);
    try {
      const result = await signInSocial({
        provider,
        callbackURL: window.location.origin,
      }).unwrap();
      if (result?.url) {
        window.location.href = result.url;
      }
    } catch (err: any) {
      console.error("Social Auth error:", err);
      const errorMessage =
        err?.data?.message ||
        err?.error ||
        "Social sign in failed. Please try again.";
      setCustomError(errorMessage);
    } finally {
      setActiveSocialProvider(null);
    }
  };

  const toggleMode = (newMode: "signin" | "signup") => {
    setMode(newMode);
    setCustomError(null);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300">
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="p-8 pb-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 mb-4 shadow-inner">
            {mode === "signin" ? (
              <LogIn className="w-7 h-7" />
            ) : (
              <UserPlus className="w-7 h-7" />
            )}
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {mode === "signin" ? "Welcome Back" : "Create an Account"}
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            {mode === "signin"
              ? "Sign in to access your bookings and travel preferences"
              : "Join QuickSeat today to manage your flights and trips"}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="px-8 mb-6">
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => toggleMode("signin")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                mode === "signin"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => toggleMode("signup")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                mode === "signup"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
          {customError && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-600 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              <span>{customError}</span>
            </div>
          )}

          {mode === "signup" && (
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-orange-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>
                  {mode === "signin" ? "Signing In..." : "Creating Account..."}
                </span>
              </>
            ) : (
              <span>{mode === "signin" ? "Sign In" : "Create Account"}</span>
            )}
          </Button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-wider">
              or continue with
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Google Button */}
            <Button
              type="button"
              disabled={isLoading}
              onClick={() => handleSocialSignIn("google")}
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs py-3.5 rounded-xl shadow-sm hover:shadow active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {activeSocialProvider === "google" ? (
                <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
              ) : (
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="matrix(1, 0, 0, 1, 0, 0)">
                    <path
                      d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.56h3.29c1.93,-1.78 3.04,-4.4 3.04,-7.48C21.67,11.73 21.56,11.39 21.35,11.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12,20.62c2.43,0 4.47,-0.81 5.96,-2.18l-2.92,-2.26c-0.81,0.54 -1.85,0.87 -3.04,0.87 -2.34,0 -4.32,-1.58 -5.03,-3.71H3.59v2.33C5.07,18.62 8.3,20.62 12,20.62z"
                      fill="#34A853"
                    />
                    <path
                      d="M6.97,13.34c-0.18,-0.54 -0.28,-1.12 -0.28,-1.71s0.1,-1.17 0.28,-1.71V7.59H3.59C2.98,8.81 2.63,10.19 2.63,11.63s0.35,2.82 0.96,4.04l3.38,-2.33z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12,5.65c1.32,0 2.51,0.45 3.44,1.35l2.58,-2.58C16.46,2.94 14.42,2.12 12,2.12c-3.7,0 -6.93,2 -8.41,4.97l3.38,2.62c0.71,-2.13 2.69,-3.71 5.03,-3.71z"
                      fill="#EA4335"
                    />
                  </g>
                </svg>
              )}
              <span>Google</span>
            </Button>

            {/* Facebook Button */}
            <Button
              type="button"
              disabled={isLoading}
              onClick={() => handleSocialSignIn("facebook")}
              className="bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold text-xs py-3.5 rounded-xl shadow-sm hover:shadow active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
            >
              {activeSocialProvider === "facebook" ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              )}
              <span>Facebook</span>
            </Button>
          </div>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() =>
                toggleMode(mode === "signin" ? "signup" : "signin")
              }
              className="text-xs font-bold text-slate-500 hover:text-orange-500 transition-colors cursor-pointer"
            >
              {mode === "signin"
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
