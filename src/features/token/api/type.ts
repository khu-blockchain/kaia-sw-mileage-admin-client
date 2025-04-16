import { SwMileageToken } from "@/entities/token";

type createTokenAPIRequest = {
  swMileageTokenName: string;
  symbol: string;
  description: string;
  imageUrl: string;
  rlpEncodingString: string;
};

type createTokenAPIResponse = {
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

type getSWMileageTokenAPIRequest = void;

type getSWMileageTokenAPIResponse = SwMileageToken[];

type isRegisteredAdminAPIRequest = {
  contractAddress: string;
  targetAddress: string;
};

type isRegisteredAdminAPIResponse = {
  isValidAddress: boolean;
  isAdmin: boolean;
};

type activateTokenAPIRequest = {
  swMileageTokenId: number;
};

type activateTokenAPIResponse = SwMileageToken;

type registerAdminAPIRequest = {
  swMileageTokenId: number;
  rawTransaction: string;
}

type registerAdminAPIResponse = any;

export type {
  createTokenAPIRequest,
  createTokenAPIResponse,
  getSWMileageTokenAPIRequest,
  getSWMileageTokenAPIResponse,
  isRegisteredAdminAPIRequest,
  isRegisteredAdminAPIResponse,
  activateTokenAPIRequest,
  activateTokenAPIResponse,
  registerAdminAPIRequest,
  registerAdminAPIResponse,
};
