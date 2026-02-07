/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext"; // 1. Import Auth Hook
import { logoutUser } from "@/lib/auth-service"; // 2. Import Logout Logic
import { toast } from "sonner";
import { Loader2, LogOut, LayoutDashboard, ShoppingBag } from "lucide-react";

export default function Home() {
  const { user, role, loading } = useAuth(); // 3. Get current state

  // 4. Handle Logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      // The AuthContext will automatically update 'user' to null
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-green-700 gap-2">
        <Loader2 className="animate-spin" /> Loading Kentara...
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 bg-gray-50 text-center">

      {/* Hero Section */}
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 tracking-tight">
          Kentara Potato Seeds
        </h1>
        <p className="text-gray-600 text-lg max-w-md mx-auto">
          Premium certified seeds for Indonesian farmers.
        </p>
      </div>

      {/* Dynamic Actions */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm justify-center">

        {!user ? (
          // STATE: GUEST (Not Logged In)
          <>
            <Link href="/login" className="w-full">
              <Button className="w-full bg-green-700 hover:bg-green-800 h-12 text-lg">
                Login
              </Button>
            </Link>
            <Link href="/register" className="w-full">
              <Button variant="outline" className="w-full border-green-600 text-green-700 hover:bg-green-50 h-12 text-lg">
                Register
              </Button>
            </Link>
          </>
        ) : (
          // STATE: LOGGED IN (Farmer or Admin)
          <div className="flex flex-col gap-3 w-full animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm">
              <p className="text-sm text-gray-500">Welcome back,</p>
              <p className="font-semibold text-gray-900 truncate">{user.email}</p>
              <span className="inline-block mt-1 text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full capitalize">
                {role || "Farmer"} Account
              </span>
            </div>

            {/* Admin Only Button */}
            {role === 'admin' && (
              <Link href="/admin/dashboard">
                <Button className="w-full bg-slate-900 text-white hover:bg-slate-800">
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Admin Dashboard
                </Button>
              </Link>
            )}

            {/* Shop Button (Everyone) */}
            <Link href="/shop">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <ShoppingBag className="mr-2 h-4 w-4" /> Browse Seeds
              </Button>
            </Link>

            <Button
              // variant="destructive"
              onClick={handleLogout}
              className="w-full mt-2"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}