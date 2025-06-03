import { useAdminStore } from "@/features/admin";
import { KyRequest } from "ky";

const injectAccessHandler = (request: KyRequest) => {
  const { getToken } = useAdminStore.getState().actions;
  const token = getToken()[0].token;
  if (token) {
    request.headers.set("Authorization", `Bearer ${token}`);
  }
};

export { injectAccessHandler };