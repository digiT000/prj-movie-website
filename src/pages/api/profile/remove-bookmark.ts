import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { ProfileService } from "@/services/profile";
import { getToken } from "next-auth/jwt";

const profileService = new ProfileService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure only POST requests are allowed
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // 1️⃣ Extract and verify token
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    // 2️⃣ Extract user ID from token
    const userId = token.sub; // NextAuth stores user ID in `sub`

    const { movieId } = req.query; // Extract movieId from URL

    // 4️⃣ Call service to add bookmark
    const response = await profileService.removeBookmark(
      userId!,
      movieId as string
    );
    if (response.success) {
      return res.status(201).send(response.message);
    }

    return res.status(400).json(response.error);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(400).json({ message: error.message });
      }
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
