import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "MOCK_GOOGLE_ID",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "MOCK_GOOGLE_SECRET",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          // Secara otomatis menjadikan email ini sebagai Admin Utama
          role: profile.email === "danishalzam8002@gmail.com" ? "admin" : "wali", 
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        // JALUR KHUSUS DEVELOPER (Bypass Database)
        if (credentials.username === "danishalzam8002@gmail.com") {
          return { 
            id: "super-admin-dev", 
            name: "Danish Alzam (Dev)", 
            role: "admin" 
          };
        }

        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("username", credentials.username)
          .single();

        if (error || !user) return null;

        if (user.password_hash === credentials.password) {
          return { 
            id: user.id, 
            name: user.name, 
            role: user.role 
          };
        }
        
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as unknown as { role: string }).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role: unknown }).role = token.role;
        (session.user as { id: unknown }).id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "DEV_SECRET_ALAZHAR_KEY_CH4NG3_M3",
};
