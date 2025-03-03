import axios from "axios";
interface UserData {
  email: string;
  password: string;
}

export async function createNewUser(userData: UserData) {
  try {
    const response = await axios.post(`/api/auth/createUser`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: (status) => status < 500,
    });

    if (response.status === 201) {
      return { success: true, user: response.data };
    } else {
      return { success: false, error: response.data };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Something went wrong,Please refresh and try again",
    };
  }
}
