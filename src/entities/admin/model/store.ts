import type { Admin } from "./types";

import { atom } from "recoil";

export const adminState = atom<Admin | null>({
	key: "admin",
	default: null,
});