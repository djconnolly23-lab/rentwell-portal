'use client';

import DashboardMetrics from "@/components/DashboardMetrics";
import PropertiesList from "@/components/PropertiesList";
import LeaseList from "@/components/LeaseList";
import PaymentsView from "@/components/PaymentsView";
import MaintenanceList from "@/components/MaintenanceList";
import Reports from "@/components/Reports";
import AccountingTools from "@/components/AccountingTools";

export default function SuperuserDashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8 max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Superuser Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">System-wide oversight of all clients, renters, properties, and financials.</p>
      </header>

      <section className="space-y-8">
        <DashboardMetrics role="superuser" />
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">System Properties</h2>
          <PropertiesList role="superuser" />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">All Leases</h2>
          <LeaseList role="superuser" />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">All Payments</h2>
          <PaymentsView role="superuser" />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">System Maintenance</h2>
          <MaintenanceList role="superuser" />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Financial Reports</h2>
          <Reports role="superuser" />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Global Accounting Tools</h2>
          <AccountingTools role="superuser" />
        </div>
      </section>
    </div>
  );
}