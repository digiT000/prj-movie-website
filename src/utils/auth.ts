import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { Prisma as prisma } from "@prisma/client";
import { prisma } from "./prisma";
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [],
});
