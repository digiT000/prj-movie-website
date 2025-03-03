import { prisma } from "@/utils/prisma";
import { MovieProps, WatchlistProps } from "@/models/interface";

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

      // ✅ Extract only required fields
      return {
        success: true,
        data: {
          BookmarkId: watchlistItem.id,
          id: watchlistItem.movieId,
          title: watchlistItem.title,
          movieType: watchlistItem.movieType,
          year: watchlistItem.year,
          poster: watchlistItem.poster,
        },
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
    console.log("INNER", movieId);
    console.log("INNER", userId);
    try {
      // Check if the user available
      const user = await this.checkUser(userId);
      if (!user) {
        return { success: false, error: "User not found" };
      }

      // 2️⃣ Check if the movie exists in the user's watchlist
      const bookmark = await prisma.watchlist.findFirst({
        where: {
          userId: userId, // Ensure the user owns the bookmark
          movieId: movieId, // Find by movieId
        },
      });

      if (!bookmark) {
        return { success: false, error: "Movie not found in watchlist" };
      }
      console.log(bookmark);

      // 3️⃣ Delete the bookmark using `movieId`
      await prisma.watchlist.delete({
        where: {
          id: bookmark.id, // Delete using the found bookmark ID
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

      // 3️⃣ Transform the response to match `WatchlistProps`
      const formattedWatchlist: WatchlistProps[] = watchlistItems.map(
        (item) => ({
          bookmarkId: item.id, // ✅ Use database ID as `bookmarkId`
          id: parseInt(item.movieId), // ✅ Convert `movieId` (string) to `number`
          title: item.title,
          year: item.year,
          poster: item.poster as string,
          movieType: item.movieType,
        })
      );

      return { success: true, data: formattedWatchlist };
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
      console.log(error);
      return false;
    }
  }
}
