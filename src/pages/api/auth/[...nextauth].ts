import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import type { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/utils/prisma";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_NEXT_AUTH_URL;

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        // Ensure credentials exist and are valid
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid email or password");
        }

        const userCredentials = {
          email: credentials.email,
          password: credentials.password,
        };

        try {
          const url = `${BASE_URL}/api/auth/login`;
          console.log("URL for login:", url); // Check if the URL is correct
          const res = await axios.post(url, userCredentials, {
            headers: { "Content-Type": "application/json" },
          });

          console.log("RESSSSPONSE", res);

          if (res.status === 200 && res.data) {
            return res.data; // Return user data if authentication is successful
          } else {
            const error = res.data;
            return error.error; // Return null if authentication fails
          }
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
    signOut: "/",
    error: "/auth/login",
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          id: token.sub as string,
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

// export default function authHandler(req: NextApiRequest, res: NextApiResponse) {
//   (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
// }
// export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(options);

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
