import { API, AcademicFieldServer } from "@/features/_core/api";
import { getActivityFieldListAPIRequest, getActivityFieldListAPIResponse } from "./type";

const getActivityFieldListAPI: API<getActivityFieldListAPIRequest, getActivityFieldListAPIResponse> = async() => {
  try{
    const result = await AcademicFieldServer.get('')
    return result.json() as getActivityFieldListAPIResponse;
  }catch (e) {
    throw e
  }
}

export { getActivityFieldListAPI };