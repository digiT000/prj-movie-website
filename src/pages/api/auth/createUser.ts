import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { AuthService } from "@/services/auth";

const authService = new AuthService();

interface UserProps {
  name: string;
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user = req.body as UserProps;
    try {
      const response = await authService.createUser(user);
      if (response.success) {
        return res.status(201).json(response.user);
      } else {
        return res.status(400).json(response.error);
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
