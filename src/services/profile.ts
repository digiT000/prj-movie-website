import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prisma";
import { Prisma } from "@prisma/client";
import { MovieProps } from "@/models/interface";

export class ProfileService {
  async addNewBookmark(userId: string, movie: MovieProps) {
    try {
      // Check if the user available
      const user = await this.checkUser(userId);
      if (!user) {
        return { success: false, error: "User not found" };
      }

      const watchlistItem = await prisma.watchlist.create({
        data: {
          userId: userId,
          movieId: movie.id.toString(),
          title: movie.title,
          movieType: movie.movieType,
          year: movie.year,
          poster: movie.poster,
        },
      });

      return {
        success: true,
        data: watchlistItem,
        message: "Add to watchlist",
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  async removeBookmark(userId: string, movieId: string) {
    try {
      // Check if the user available
      const user = await this.checkUser(userId);
      if (!user) {
        return { success: false, error: "User not found" };
      }

      await prisma.watchlist.delete({
        where: {
          userId_movieId: { userId, movieId },
        },
      });
      return { success: true, message: "Movie removed from watchlist" };
    } catch (error) {
      return { success: false, error };
    }
  }

  async getBookmarkData(userId: string) {
    try {
      // Check if the user available
      const user = await this.checkUser(userId);
      if (!user) {
        return { success: false, error: "User not found" };
      }

      const watchlistItems = await prisma.watchlist.findMany({
        where: { userId },
        orderBy: { addedAt: "desc" },
      });
      return { success: true, data: watchlistItems };
    } catch (error) {
      return { success: false, error };
    }
  }

  async checkUser(userId: string) {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (user) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
