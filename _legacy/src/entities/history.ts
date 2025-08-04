type SwMileageTokenHistory = {
  sw_mileage_token_history_id: number;
  amount: number;
  admin_address: string;
  student_address: string;
  student_id: string;
  type: "DOC_APPROVED" | "DIRECT_MINT" | "ACCOUNT_CHANGE" | "DIRECT_BURN";
  token_name: string;
  note: string;
  created_at: string;
  updated_at: string;
};

export type { SwMileageTokenHistory };
