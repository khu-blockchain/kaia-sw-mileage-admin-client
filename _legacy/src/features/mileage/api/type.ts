import { SwMileage } from "@/entities/mileage";

//TODO: Pagination 추가
type getSWMileageListAPIRequest = {
  student_id?: string;
  status?: number;
};

type getSWMileageListAPIResponse = Array<SwMileage>;

type getSwMileageByIdAPIRequest = {
  swMileageId: number;
};

type getSwMileageByIdAPIResponse = SwMileage;

type approveSwMileageAPIRequest = {
  swMileageId: number;
  rawTransaction: string;
};

type approveSwMileageAPIResponse = {
  message: string;
};

type rejectSwMileageAPIRequest = {
  swMileageId: number;
  comment: string;
  rawTransaction: string;
};

type rejectSwMileageAPIResponse = {
  message: string;
};


export type {
  getSWMileageListAPIRequest,
  getSWMileageListAPIResponse,
  getSwMileageByIdAPIRequest,
  getSwMileageByIdAPIResponse,
  approveSwMileageAPIRequest,
  approveSwMileageAPIResponse,
  rejectSwMileageAPIRequest,
  rejectSwMileageAPIResponse,
};
