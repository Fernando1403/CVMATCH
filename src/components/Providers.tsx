import { SessionProvider } from "next-auth/react";
import { GenerateProvider } from "@/context/GenerateContext";
import { UserProvider } from "@/context/UserContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UserProvider>
        <GenerateProvider>
          {children}
        </GenerateProvider>
      </UserProvider>
    </SessionProvider>
  );
}
