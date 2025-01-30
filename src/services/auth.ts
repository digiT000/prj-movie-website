import { prisma } from "@/utils/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { UserProps, UserResponse } from "@/models/interface";

export class AuthService {
  async createUser(user: UserProps) {
    if (user.password.length < 6) {
      return {
        success: false,
        error: "password length should be more than 6 characters",
      };
    }

    const checkUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (checkUser && checkUser.email === user.email) {
      return {
        success: false,
        error:
          "This email is already in use. Please use a different email or log in to your account.",
      };
    }
    const saltRounds = 10;
    const hashPassword = bcrypt.hashSync(user.password, saltRounds);

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

  async handeLoginUser(email: string, password: string) {
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

    return { success: true, user: this.exclude(user, ["password"]) };
  }

  // Function to exclude user password returned from prisma
  // Function to exclude user password returned from prisma
  exclude(user: UserResponse, keys: (keyof UserResponse)[]) {
    for (let key of keys) {
      delete user[key];
    }
    return user;
  }
}
