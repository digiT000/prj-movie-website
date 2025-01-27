import { prisma } from "@/utils/prisma";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

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
      const response = await createUser(user);
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

async function createUser(user: UserProps) {
  if (user.password.length < 6) {
    return {
      success: false,
      error: "password length should be more than 6 characters",
    };
  }

  const saltRounds = 10;
  const hashPassword = bcrypt.hashSync(user.password, saltRounds);
  console.log(hashPassword);

  const createUser = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hashPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return { success: true, user: createUser };
}
