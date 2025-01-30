import { MovieProps } from "@/models/interface";
import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_NEXT_AUTH_URL;
export async function addNewBookmark(movie: MovieProps) {
  console.log(movie);
  try {
    const response = await axios.post(
      `${baseURL}/api/profile/add-bookmark`,
      movie,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        validateStatus: (status) => status < 500,
      }
    );

    console.log(response);
    if (response.status === 201) {
      return { success: true, user: response.data };
    } else {
      return { success: false, error: response.data };
    }
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong,Please refresh and try again",
    };
  }
}
