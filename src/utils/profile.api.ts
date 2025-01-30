import { MovieProps } from "@/models/interface";
import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_NEXT_AUTH_URL;
export async function addNewBookmark(movie: MovieProps) {
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

    if (response.status === 201) {
      return { success: true, data: response.data };
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

export async function removeBookmark(movieId: number) {
  console.log(movieId);
  try {
    const response = await axios.delete(
      `${baseURL}/api/profile/remove-bookmark`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: {
          movieId,
        },
        validateStatus: (status) => status < 500,
      }
    );

    console.log(response);
    if (response.status === 200) {
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

export async function getBookmark() {
  try {
    const response = await axios.get(`${baseURL}/api/profile/get-bookmark`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      validateStatus: (status) => status < 500,
    });

    console.log(response);
    if (response.status === 200) {
      return { success: true, data: response.data };
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
