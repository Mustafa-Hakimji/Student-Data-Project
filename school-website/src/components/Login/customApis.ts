import { api } from "../../utils/api/apiInstanse";
import { API_URL } from "../../utils/api/apiUrls";
import type { LoginUser } from "./types";

export const loginUser = async ({ email, password, setLoading }: LoginUser) => {
  try {
    const requestBody = {
      email,
      password,
    };
    setLoading(true);
    const response = await api.post(API_URL.teachersLogin, requestBody);
    if (response.status === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    return error?.response?.data;
  } finally {
    setLoading(false);
  }
};
