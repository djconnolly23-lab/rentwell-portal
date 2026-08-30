'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import LeaseList from "@/components/LeaseList";
import PaymentsView from "@/components/PaymentsView";
import MaintenanceList from "@/components/MaintenanceList";
import Documents from "@/components/Documents";

export default function RenterDashboard() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Loading renter dashboard...</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm text-center">
        <p className="text-red-600 font-medium">Please sign in to access your renter portal.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8 max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Renter Portal</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your active lease, track payments, submit maintenance tickets, and view documents.</p>
      </header>

      {/* Lease section */}
      <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">My Lease</h2>
        <LeaseList role="renter" />
      </section>

      {/* Payments section */}
      <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">My Payments</h2>
        <PaymentsView role="renter" />
      </section>

      {/* Maintenance section */}
      <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Maintenance Requests</h2>
        <MaintenanceList role="renter" />
      </section>

      {/* Documents section */}
      <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">My Documents</h2>
        <Documents role="renter" />
      </section>
    </div>
  );
}