"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabase";

interface UserData {
  credits_used: number;
  credits_limit: number;
  plan: string;
}

interface UserContextType {
  userData: UserData | null;
  history: any[];
  loading: boolean;
  refreshUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshUserData = async () => {
    if (status !== "authenticated") return;

    try {
      const res = await fetch("/api/user/me");
      const data = await res.json();
      
      if (res.ok) {
        setUserData(data.user);
        setHistory(data.history);
      }
    } catch (err) {
      console.error("Erro ao buscar dados do usuário:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      refreshUserData();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  return (
    <UserContext.Provider value={{ userData, history, loading, refreshUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
