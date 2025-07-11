import { API, AuthServer } from "@/features/_core/api";
import {
  signInAPIRequest,
  signInAPIResponse,
  refreshAPIRequest,
  refreshAPIResponse,
} from "./type";

const signInAPI: API<signInAPIRequest, signInAPIResponse> = async (request) => {
  const { id, password } = request;

  try {
    const result = await AuthServer.post("admin/login", {
      credentials: "include",
      json: {
        id,
        password,
      },
    }).json();
    return result as signInAPIResponse;
  } catch (e) {
    throw e;
  }
};

const refreshAPI: API<refreshAPIRequest, refreshAPIResponse> = async (
) => {

  try {
    const result = await AuthServer.post("admin/refresh-token", {
      credentials: "include",
    }).json();
    return result as refreshAPIResponse;
  } catch (e) {
    throw e;
  }
};

export { signInAPI, refreshAPI };
