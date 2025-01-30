import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { AuthService } from "@/services/auth";

const authService = new AuthService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log(req);
    const { email, password } = req.body;

    try {
      const response = await authService.handeLoginUser(email, password);
      if (response.success) {
        return res.status(200).json(response?.user);
      } else {
        return res.status(401).json({ error: response?.error });
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return res.status(400).json({ message: error.message });
        }
        return res.status(400).json({ message: error.message });
      }
    }
  } else {
    return res.status(405);
  }
}
