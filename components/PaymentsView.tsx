'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface PaymentsViewProps {
  role: "superuser" | "client";
}

export default function PaymentsView({ role }: PaymentsViewProps) {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);

      let query = supabase
        .from("payments")
        .select("id, lease_id, renter_name, amount, due_date, paid_date, status, client_id");

      if (role === "client") {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          query = query.eq("client_id", user.id);
        }
      }
      // Superuser sees all payments

      const { data, error } = await query;
      if (error) {
        console.error(error);
      } else {
        setPayments(data || []);
      }

      setLoading(false);
    };

    fetchPayments();
  }, [role]);

  if (loading) {
    return <div className="text-sm text-gray-500 p-4">Loading payments...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Payments</h2>
        <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors shadow-sm">
          + Record Payment
        </button>
      </div>

      {!payments.length ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500 shadow-sm">
          No payments found.
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Lease</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Renter</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Amount</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Due Date</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Paid Date</th>
                <th className="px-6 py-3 font-semibold text-gray-500 uppercase tracking-wider text-xs">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-medium">{payment.lease_id}</td>
                  <td className="px-6 py-4 text-gray-600">{payment.renter_name}</td>
                  <td className="px-6 py-4 text-primary font-bold">${payment.amount}</td>
                  <td className="px-6 py-4 text-gray-600">{payment.due_date}</td>
                  <td className="px-6 py-4 text-gray-600">{payment.paid_date ?? "—"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        payment.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : payment.status === "late"
                          ? "bg-red-100 text-red-800"
                          : payment.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}