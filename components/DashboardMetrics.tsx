'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface DashboardMetricsProps {
  role: "superuser" | "client" | "renter";
}

export default function DashboardMetrics({ role }: DashboardMetricsProps) {
  const [metrics, setMetrics] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      let query = supabase.from("leases").select(`
        id,
        rent,
        status,
        client_id,
        renter_id
      `);

      // Scope queries by role
      if (role === "client") {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          query = query.eq("client_id", user.id);
        }
      } else if (role === "renter") {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          query = query.eq("renter_id", user.id);
        }
      }
      // Superuser sees all leases, no filter

      const { data, error } = await query;
      if (error) {
        console.error(error);
      } else {
        setMetrics(data || []);
      }
      setLoading(false);
    };

    fetchMetrics();
  }, [role]);

  if (loading || !metrics) {
    return <div className="text-sm text-gray-500 p-4">Loading metrics...</div>;
  }

  // Example calculations
  const totalRent = metrics.reduce((sum: number, lease: any) => sum + (lease.rent || 0), 0);
  const activeLeases = metrics.filter((lease: any) => lease.status === "active").length;
  const delinquentLeases = metrics.filter((lease: any) => lease.status === "delinquent").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Rent</p>
        <p className="text-2xl font-extrabold text-gray-900">${totalRent.toLocaleString()}</p>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Active Leases</p>
        <p className="text-2xl font-extrabold text-green-600">{activeLeases}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Delinquent Leases</p>
        <p className="text-2xl font-extrabold text-red-600">{delinquentLeases}</p>
      </div>
    </div>
  );
}