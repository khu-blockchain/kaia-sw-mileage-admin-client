import { SwMileageToken } from "@/entities/token";
import { ABI, Bytecode } from "@/shared/types";

type useCreateTokenRequest = {
  swMileageTokenName: string;
  symbol: string;
  description: string;
  imageUrl: string;
  rlpEncodingString: string;
};

type useCreateTokenResponse = {
  // sw_mileage_token_id: number;
  // sw_mileage_token_name: string;
  // contract_address: string;
  // sw_mileage_token_symbol: string;
  // sw_mileage_token_decimals: number;
  // sw_mileage_token_image_url: string;
  // contract_owner_address: string;
  // description: string;
  // is_paused: number;
  // is_activated: number;
  // created_at: string;
  // updated_at: string;
};


type useGetSWMileageTokenRequest = void;

type useGetSWMileageTokenResponse = SwMileageToken[];

type useIsRegisteredAdminRequest = {
  contractAddress: string;
  targetAddress: string;
};

type useIsRegisteredAdminResponse = {
  isValidAddress: boolean;
  isAdmin: boolean;
};

type useActivateTokenRequest = {
  swMileageTokenId: number;
};

type useActivateTokenResponse = SwMileageToken;

type useRegisterAdminRequest = {
  contractAddress: string;
  targetAddress: string;
  swMileageTokenId: number;
}

type useRegisterAdminResponse = any;

export type {
  useCreateTokenRequest,
  useCreateTokenResponse,
  useGetSWMileageTokenRequest,
  useGetSWMileageTokenResponse,
  useIsRegisteredAdminRequest,
  useIsRegisteredAdminResponse,
  useActivateTokenRequest,
  useActivateTokenResponse,
  useRegisterAdminRequest,
  useRegisterAdminResponse,
};
