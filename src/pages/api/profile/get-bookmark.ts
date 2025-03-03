import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { ProfileService } from "@/services/profile";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]";

const profileService = new ProfileService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure only POST requests are allowed
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // 🔹 Get authenticated user session
    const session = await getServerSession(req, res, options);

    if (!session || !session.user) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const userId = session.user.id; // Ensure your NextAuth user object has an `id`
    // 4️⃣ Call service to add bookmark
    const response = await profileService.getBookmarkData(userId!);
    if (response.success) {
      return res.status(200).json(response.data);
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
