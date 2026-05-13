import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getSupabaseAdmin } from "./lib/supabase";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const supabase = getSupabaseAdmin();

        // Buscar usuário no Supabase
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single();

        if (error || !user || !user.password_hash) {
          console.error("Erro ao buscar usuário:", error);
          return null;
        }

        // Verificar senha
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password_hash
        );

        if (!isPasswordValid) {
          return null;
        }

        // Retornar os dados do usuário para a sessão (sem a senha)
        return {
          id: user.id,
          email: user.email,
          plan: user.plan,
          credits_used: user.credits_used,
          credits_limit: user.credits_limit
        };
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    // Adicionamos as propriedades extras (plano, créditos) no token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.plan = (user as any).plan;
        token.credits_used = (user as any).credits_used;
        token.credits_limit = (user as any).credits_limit;
      }
      return token;
    },
    // E passamos do token para a sessão para usar no frontend
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).plan = token.plan;
        (session.user as any).credits_used = token.credits_used;
        (session.user as any).credits_limit = token.credits_limit;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt"
  }
});
