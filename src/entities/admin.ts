import { JWT } from "./auth";

type Admin = {
  admin_id: string;
  name: string;
  wallet_address: string;
  role: number;
  email: string;
};

type AdminWithToken = {
  admin: Admin;
  tokens: JWT;
};

export type { Admin, AdminWithToken };
