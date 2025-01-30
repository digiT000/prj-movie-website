import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // ✅ Add `id` to session user
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }

  interface JWT {
    sub: string; // ✅ Ensure JWT has `sub` (user ID)
    email?: string | null;
    name?: string | null;
    picture?: string | null;
  }
}
