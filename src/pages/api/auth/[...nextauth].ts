import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";

import type { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/utils/prisma";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

interface userCredentials {
  email: string;
  password: string;
}

export const options: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Ensure credentials exist and are valid
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid email or password");
        }

        const userCredentials = {
          email: credentials.email,
          password: credentials.password,
        };

        try {
          const res = await axios.post(`/api/auth/`, userCredentials, {
            headers: { "Content-Type": "application/json" },
          });

          if (res.status === 200 && res.data) {
            return res.data; // Return user data if authentication is successful
          }
          return null; // Return null if authentication fails
        } catch (error) {
          console.error("Authorization error:", error);
          return null; // Handle error gracefully
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET as string,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },

  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/login",
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          email: token.email,
          name: token.name || "",
          image: token.picture || null,
        };
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
};

export default function authHandler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(options);
}
