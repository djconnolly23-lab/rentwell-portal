'use client';
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        router.push("/login");
        return;
      }

      // Fetch official role from profiles table for enterprise security enforcement
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profileError || !profile || !allowedRoles.includes(profile.role)) {
        router.push("/login");
        return;
      }

      setLoading(false);
    };

    checkAuth();
  }, [router, allowedRoles]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Checking authentication and role permissions...</p>
      </div>
    );
  }

  return <>{children}</>;
}