import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Mutation, SuspenseQuery } from "@/features/_core/api";
import {
  useActivateTokenRequest,
  useActivateTokenResponse,
  useCreateTokenRequest,
  useCreateTokenResponse,
  useGetSWMileageTokenRequest,
  useGetSWMileageTokenResponse,
  useIsRegisteredAdminRequest,
  useIsRegisteredAdminResponse,
  useRegisterAdminRequest,
  useRegisterAdminResponse,
} from "./type";
import {
  activateSwMileageTokenAPI,
  createTokenAPI,
  getSWMileageTokenAPI,
  registerAdminAPI,
} from "@/features/token/api";
import {
  contractCall,
  encodeContractExecutionABI,
  isSameAddress,
} from "@/shared/utils";
import {
  kaia,
  SW_MILEAGE_TOKEN_ABI,
  STUDENT_MANAGER_ABI,
} from "@/shared/constants";
import { ContractAddress } from "@/shared/types";

const useCreateToken: Mutation<
  useCreateTokenRequest,
  useCreateTokenResponse
> = (args) => {
  const { onSuccess, onError } = args;

  return useMutation({
    mutationFn: async (data) => {
      const result = await createTokenAPI(data);
      return result;
    },
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

const useGetSwMileageTokenList: SuspenseQuery<
  useGetSWMileageTokenRequest,
  useGetSWMileageTokenResponse
> = () => {
  return useSuspenseQuery({
    queryKey: ["get-sw-mileage-token-list"],
    queryFn: async () => {
      const result = await getSWMileageTokenAPI();
      const data = (await contractCall(
        import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
        STUDENT_MANAGER_ABI,
        "mileageToken",
        []
      )) as ContractAddress;

      console.log(data);

      return result.map((token) => {
        return {
          ...token,
          is_activated: isSameAddress(token.contract_address, data),
        };
      });
    },
  });
};

const useActivateToken: Mutation<
  useActivateTokenRequest,
  useActivateTokenResponse
> = (args) => {
  const { onSuccess, onError } = args;

  return useMutation({
    mutationFn: async (data) => {
      const result = await activateSwMileageTokenAPI(data);
      return result;
    },
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

const useIsRegisteredAdmin: SuspenseQuery<
  useIsRegisteredAdminRequest,
  useIsRegisteredAdminResponse
> = (args) => {
  const { contractAddress, targetAddress } = args;

  return useSuspenseQuery({
    queryKey: ["get-is-admin"],
    queryFn: async () => {
      if (!targetAddress) {
        return {
          isValidAddress: false,
          isAdmin: false,
        };
      }
      const result = await contractCall(
        contractAddress,
        SW_MILEAGE_TOKEN_ABI,
        "isAdmin",
        [targetAddress]
      );

      return {
        isValidAddress: true,
        isAdmin: result,
      };
    },
  });
};

const useRegisterAdmin: Mutation<
  useRegisterAdminRequest,
  useRegisterAdminResponse
> = (args) => {
  const { onSuccess, onError } = args;

  return useMutation({
    mutationFn: async (data) => {
      const input = encodeContractExecutionABI(
        SW_MILEAGE_TOKEN_ABI,
        "addAdmin",
        [data.targetAddress]
      );

      const { rawTransaction } = await kaia.wallet.klaySignTransaction({
        type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
        from: data.targetAddress,
        to: data.contractAddress,
        gas: "0x4C4B40",
        data: input,
      });

      const result = await registerAdminAPI({
        swMileageTokenId: data.swMileageTokenId,
        rawTransaction,
      });
      return result;
    },
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};
export {
  useCreateToken,
  useGetSwMileageTokenList,
  useIsRegisteredAdmin,
  useActivateToken,
  useRegisterAdmin,
};
