import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

interface UserResponse {
  id: string;
  name: string | null;
  email: string;
  password: string | null;
  image: string | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { email, password } = req.body;

    try {
      const response = await handeLoginUser(email, password);
      if (response?.success) {
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

async function handeLoginUser(email: string, password: string) {
  if (!email || !password) {
    return { success: false, error: "Invalid email or password" };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      image: true,
    },
  });

  if (!user) {
    return { success: false, error: "User not found" };
  }
  const isPasswordValid = await bcrypt.compare(
    password,
    user.password as string
  );

  if (!isPasswordValid) {
    return { success: false, error: "Invalid email or password" };
  }

  return { success: false, user: exclude(user, ["password"]) };
}

// Function to exclude user password returned from prisma
// Function to exclude user password returned from prisma
function exclude(user: UserResponse, keys: (keyof UserResponse)[]) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
