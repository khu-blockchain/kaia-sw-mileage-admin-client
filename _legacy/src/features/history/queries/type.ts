import { SwMileageTokenHistory } from "@/entities/history";

type useGetSwMileageTokenHistoriesRequest = {
  limit?: number;
  offset?: number;
  isCount: 0 | 1;
  order?: "DESC" | "ASC";
  lastId?: number;
  type: Array<
    "DOC_APPROVED" | "DIRECT_MINT" | "ACCOUNT_CHANGE" | "DIRECT_BURN"
  >;
};

type useGetSwMileageTokenHistoriesResponse = {
  totalCount: number;
  list: Array<SwMileageTokenHistory>;
};

export type {
  useGetSwMileageTokenHistoriesRequest,
  useGetSwMileageTokenHistoriesResponse,
};
