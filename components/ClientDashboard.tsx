'use client';

import DashboardOverview from "@/components/DashboardOverview";
import PropertiesList from "@/components/PropertiesList";
import LeaseList from "@/components/LeaseList";
import PaymentsView from "@/components/PaymentsView";
import MaintenanceList from "@/components/MaintenanceList";
import Documents from "@/components/Documents";
import Messages from "@/components/Messages";
import Reports from "@/components/Reports";
import AccountingTools from "@/components/AccountingTools";

export default function ClientDashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Landlord Dashboard</h1>
        <p className="text-gray-600">Manage properties, leases, payments, and reports.</p>
      </header>

      <section className="space-y-8">
        <DashboardOverview role="client" />
        <PropertiesList role="client" />
        <LeaseList role="client" />
        <PaymentsView role="client" />
        <MaintenanceList role="client" />
        <Documents role="client" />
        <Messages role="client" />
        <Reports role="client" />
        <AccountingTools role="client" />
      </section>
    </div>
  );
}