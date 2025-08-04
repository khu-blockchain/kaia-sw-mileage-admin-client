import { EOA } from "@/shared/types";

type WalletLost = {
  wallet_history_id: number;
  student_id: string;
  student_hash: string;
  name: string;
  address: EOA;
  target_address: EOA;
  is_confirmed: 0 | 1;
  created_at: string;
  updated_at: string;
};

export type { WalletLost };
