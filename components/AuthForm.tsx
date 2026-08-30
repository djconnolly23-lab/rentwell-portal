'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthForm({ type }: { type: "signup" | "login" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("renter");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    if (type === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { role } }
      });
      
      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg("Account created successfully! Please check your email for verification.");
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        setErrorMsg(error.message);
      } else {
        // Fetch user profile to route properly based on role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        const userRole = profile?.role || role;

        // Route to the appropriate dashboard based on assigned role
        if (userRole === 'superuser') router.push('/superuser');
        else if (userRole === 'client') router.push('/client');
        else if (userRole === 'renter') router.push('/renter');
        else if (userRole === 'va') router.push('/va');
        else if (userRole === 'support') router.push('/support');
        else router.push('/dashboard');
      }
    }
    setLoading(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm space-y-4 max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold text-primary text-center">
        {type === "signup" ? "Create Account" : "Login"}
      </h2>

      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm border border-green-200">
          {successMsg}
        </div>
      )}

      <div className="space-y-3">
        <input
          type="email"
          placeholder="Email address"
          className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {type === "signup" && (
          <select
            className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:ring-2 focus:ring-primary bg-white"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="client">Client (Landlord)</option>
            <option value="renter">Renter</option>
            <option value="va">Virtual Assistant</option>
            <option value="support">Support Staff</option>
          </select>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full px-4 py-3 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-800 disabled:opacity-50 transition-colors shadow-sm"
      >
        {loading ? "Processing..." : type === "signup" ? "Sign Up" : "Login"}
      </button>
    </div>
  );
}