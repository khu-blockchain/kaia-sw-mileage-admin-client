import { SwMileageTokenHistory } from "@/entities/history";

type getSwMileageTokenHistoriesAPIRequest = {
  limit?: number;
  offset?: number;
  isCount: 0 | 1;
  order?: "DESC" | "ASC";
  lastId?: number;
  type: Array<"DOC_APPROVED" | "DIRECT_MINT" | "ACCOUNT_CHANGE" | "DIRECT_BURN">;
  studentId?: string;
};

type getSwMileageTokenHistoriesAPIResponse = {
  totalCount: number;
  list: Array<SwMileageTokenHistory>;
};

export type {
  getSwMileageTokenHistoriesAPIRequest,
  getSwMileageTokenHistoriesAPIResponse,
};
