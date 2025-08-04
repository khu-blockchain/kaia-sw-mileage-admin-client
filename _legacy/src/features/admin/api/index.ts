import { AdminServer, API } from "@/features/_core/api";
import { signUpAPIRequest, signUpAPIResponse } from "./types";

const signUpAPI: API<signUpAPIRequest, signUpAPIResponse> = async (request) => {
  try {
    const result = await AdminServer.post("", {
      json: {
        ...request,
      },
    }).json();
    return result as signUpAPIResponse;
  } catch (e) {
    throw e;
  }
};

export { signUpAPI };
