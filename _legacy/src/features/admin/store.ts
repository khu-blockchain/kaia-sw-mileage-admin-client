import { AdminWithToken } from "@/entities/admin";
import { TokenType } from "@/entities/auth";
import { create } from "zustand";
import { combine } from "zustand/middleware";

const initialState: AdminWithToken = {
  admin: {
    admin_id: "",
    name: "",
    wallet_address: "",
    role: 0,
    email: "",
  },
  tokens: [
    {
      token: "",
      expires: "",
      token_type: TokenType.ACCESS,
    },
    {
      token: "",
      expires: "",
      token_type: TokenType.REFRESH,
    },
  ],
};

export const useAdminStore = create(
  combine(initialState, (set, get) => ({
    actions: {
      setAdmin: (adminWithToken: AdminWithToken) => set({ ...adminWithToken }),
      getAdmin: () => get().admin,
      getToken: () => get().tokens,
      reset: () => set(initialState),
    },
  }))
);
