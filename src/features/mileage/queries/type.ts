import { SwMileage } from "@/entities/mileage";

type useGetSwMileageListRequest = {
  student_id?: string;
  status?: number;
};

type useGetSwMileageListResponse = Array<SwMileage>;

type useGetSwMileageByIdRequest = {
  swMileageId: number;
};

type useGetSwMileageByIdResponse = {
  swMileageDetail: SwMileage;
  activityFieldList: Record<string, any>;
};

type useApproveSwMileageRequest = {
  swMileageId: number;
  rawTransaction: string;
};

type useApproveSwMileageResponse = {
  message: string;
};

type useRejectSwMileageRequest = {
  swMileageId: number;
  comment: string;
  rawTransaction: string;
};

type useRejectSwMileageResponse = {
  message: string;
};

export type {
  useGetSwMileageListRequest,
  useGetSwMileageListResponse,
  useGetSwMileageByIdRequest,
  useGetSwMileageByIdResponse,
  useApproveSwMileageRequest,
  useApproveSwMileageResponse,
  useRejectSwMileageRequest,
  useRejectSwMileageResponse,
};
