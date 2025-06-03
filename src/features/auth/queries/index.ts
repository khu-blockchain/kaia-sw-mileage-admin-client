import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { refreshAPI, signInAPI } from "@/features/auth/api";
import {
  useRefreshRequest,
  useRefreshResponse,
  useSignInRequest,
  useSignInResponse,
} from "./type";
import { Mutation, SuspenseQuery } from "@/features/_core/api";
import { useAdminStore } from "@/features/admin/store";

// post 요청은 mutation이어야 한다는 법칙은 없음
const useRefresh: SuspenseQuery<useRefreshRequest, useRefreshResponse> = () => {
  const { setAdmin } = useAdminStore((state) => state.actions);

  return useSuspenseQuery({
    queryKey: ["refresh"],
    queryFn: async () => {
      const result = await refreshAPI();
      setAdmin(result);
      return result;
    },
    retry: false,
  });
};

const useSignIn: Mutation<useSignInRequest, useSignInResponse> = (args) => {
  const { onSuccess, onError } = args;
  const { setAdmin } = useAdminStore((state) => state.actions);

  return useMutation({
    mutationFn: async (data) => {
      const result = await signInAPI({
        ...data,
        loginType: "ADMIN",
      });
      setAdmin(result);
      return result;
    },
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

export { useRefresh, useSignIn };
