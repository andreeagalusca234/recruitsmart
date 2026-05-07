import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/settings"
  },
  providers: [
    CredentialsProvider({
      name: "Demo credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "demo@london.edu" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          if (user) {
            return {
              id: user.id,
              email: user.email,
              name: user.name ?? "LBS MBA"
            };
          }
        } catch {
          // The credentials provider remains usable before local migrations run.
        }

        return {
          id: "demo-user",
          email: credentials.email,
          name: "Demo LBS MBA"
        };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id ?? "demo-user");
      }
      return session;
    }
  }
};
