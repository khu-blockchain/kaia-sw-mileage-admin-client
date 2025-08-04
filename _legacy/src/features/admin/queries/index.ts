import { useMutation } from "@tanstack/react-query"
import { Mutation } from "@/features/_core/api"
import { signUpAPI } from "@/features/admin/api"
import { useSignUpRequest, useSignUpResponse } from "./types"

// 질문 1: mutation에 대한 성공 및 실패 이후의 처리는 어디서 결정하는 것이 좋을까?
// Featrure vs View
const useSignUp: Mutation<useSignUpRequest, useSignUpResponse> = (args) => {
  const {onSuccess, onError} = args
  return useMutation({
    mutationFn: async(data) => {
      const result = await signUpAPI(data);
      return result;
    },
    ...(onSuccess && {onSuccess: (res: any) => onSuccess(res)}),
    ...(onError && {onError: (res) => onError(res)})
  })
}

export {
  useSignUp
}