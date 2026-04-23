import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

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
          role: "wali_santri", // Default role untuk login via Google
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Simulasi 4 peran
        if (credentials?.username === "admin" && credentials?.password === "admin") {
          return { id: "1", name: "Administrator", email: "admin@alazhar.pwk", role: "admin" };
        }
        if (credentials?.username === "wali" && credentials?.password === "wali") {
          return { id: "2", name: "Wali Santri 001", email: "wali@alazhar.pwk", role: "wali_santri" };
        }
        if (credentials?.username === "santriwan" && credentials?.password === "123") {
          return { id: "3", name: "Ahmad Santriwan", email: "ahmad@alazhar.pwk", role: "santriwan" };
        }
        if (credentials?.username === "santriwati" && credentials?.password === "123") {
          return { id: "4", name: "Aisyah Santriwati", email: "aisyah@alazhar.pwk", role: "santriwati" };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login', // Merujuk ke halaman login kustom kita
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "DEV_SECRET_ALAZHAR_KEY_CH4NG3_M3",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
