import axios from "axios";
interface UserData {
  email: string;
  password: string;
}

const baseURL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
export async function createNewUser(userData: UserData) {
  try {
    const response = await axios.post(`/api/auth/createUser`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      return { success: true, user: response.data };
    } else {
      return { success: false, error: response.data.error };
    }
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
}
