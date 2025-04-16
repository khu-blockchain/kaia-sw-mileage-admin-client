import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { refreshAPI, signInAPI } from "@/features/auth/api";
import {
  getLocalStorageData,
  getToday,
  setLocalStorageData,
} from "@/shared/utils";
import { TokenType } from "@/entities/auth";
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
  const refreshToken = getLocalStorageData("admin-refresh-token");
  const refreshExpires = getLocalStorageData("admin-refresh-expires");
  const { setAdmin } = useAdminStore((state) => state.actions);

  return useSuspenseQuery({
    queryKey: ["refresh"],
    queryFn: async () => {
      if (!refreshToken || refreshToken === null) {
        throw new Error("유효하지 않은 리프레시 토큰");
      }
      if (getToday().isAfter(refreshExpires)) {
        throw new Error("유효하지 않은 리프레시 토큰");
      }
      const result = await refreshAPI({ refreshToken });
      const { tokens } = result;
      const newToken = tokens[TokenType.REFRESH];
      setLocalStorageData("admin-refresh-token", newToken.token);
      setLocalStorageData("admin-refresh-expires", newToken.expires);
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
      const { tokens } = result;
      const newToken = tokens[TokenType.REFRESH];
      setLocalStorageData("admin-refresh-token", newToken.token);
      setLocalStorageData("admin-refresh-expires", newToken.expires);
      setAdmin(result);
      return result;
    },
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

export { useRefresh, useSignIn };
