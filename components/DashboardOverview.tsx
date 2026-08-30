'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface DashboardOverviewProps {
  role?: string;
}

export default function DashboardOverview({ role = 'client' }: DashboardOverviewProps) {
  const [userName, setUserName] = useState("David"); // Defaulting to your name while loading
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    marketing: 0,
    leads: 0,
    applicants: 0,
    showings: 0,
    tenants: 0,
    leases: 0,
    reports: 0,
    esign: 0,
    rentCollected: 0,
    pastDue: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Fetch user profile name
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', session.user.id)
          .single();

        if (profile?.full_name) {
          setUserName(profile.full_name.split(' ')[0]);
        }

        // TODO: Replace with your actual table names to fetch live counts
        // const { count: tenantCount } = await supabase.from('tenants').select('*', { count: 'exact', head: true });
        // setStats(prev => ({ ...prev, tenants: tenantCount || 0 }));
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hello, {userName}</h1>
      </div>

      {/* AI Assistant Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center shadow-sm">
        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <input 
          type="text" 
          placeholder="I got an email saying my tenant hasn't signed the lease addendum yet, but I'm sure she signed it. Can you check?"
          className="w-full outline-none text-sm text-gray-700 bg-transparent placeholder-gray-400"
        />
        <button className="ml-2 bg-slate-500 hover:bg-slate-600 p-2 rounded text-white transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* Vacancy Section */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Vacancy</h2>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="grid grid-cols-4 divide-x divide-gray-100">
            <StatBlock title="Marketing On" value={stats.marketing} icon="home" />
            <StatBlock title="Leads" value={stats.leads} icon="users" />
            <StatBlock title="Applicants" value={stats.applicants} icon="clipboard" />
            <StatBlock title="Showings" value={stats.showings} icon="calendar" />
          </div>
        </div>
      </div>

      {/* Residency Section */}
      <div>
        <div className="flex justify-between items-end mb-3">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Residency</h2>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          
          {/* Financials Row */}
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">August payments</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-green-100 bg-green-50/30 rounded-lg p-4 relative overflow-hidden">
                <p className="text-xs font-semibold text-gray-600 mb-1">Rent Collected</p>
                <p className="text-2xl font-bold text-green-600">${stats.rentCollected}</p>
              </div>
              <div className="border border-red-100 bg-red-50/30 rounded-lg p-4 relative overflow-hidden">
                <p className="text-xs font-semibold text-gray-600 mb-1">Past due</p>
                <p className="text-2xl font-bold text-red-600">${stats.pastDue}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-4 text-center divide-x divide-gray-100 border-t border-gray-100 pt-4">
              <button className="text-sm font-semibold text-primary hover:text-blue-700">RECORD PAYMENT</button>
              <button className="text-sm font-semibold text-primary hover:text-blue-700">SET UP PAYMENTS</button>
            </div>
          </div>

          {/* Docs & Tenants Row */}
          <div className="grid grid-cols-4 divide-x divide-gray-100">
            <StatBlock title="Tenants" value={stats.tenants} icon="users" />
            <StatBlock title="Leases" value={stats.leases} icon="document" />
            <StatBlock title="Condition Reports" value={stats.reports} icon="clipboard-check" />
            <StatBlock title="E-Sign" value={stats.esign} icon="pencil" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for rendering the individual stat squares cleanly
function StatBlock({ title, value, icon }: { title: string, value: number | string, icon: string }) {
  const getIcon = () => {
    switch(icon) {
      case 'home': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />;
      case 'users': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />;
      case 'clipboard': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />;
      case 'calendar': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />;
      case 'document': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />;
      case 'clipboard-check': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />;
      case 'pencil': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />;
      default: return <circle cx="12" cy="12" r="10" strokeWidth="1.5" />;
    }
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
      <svg className="w-8 h-8 text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {getIcon()}
      </svg>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{title}</p>
      <p className="text-2xl font-extrabold text-gray-900">{value}</p>
    </div>
  );
}