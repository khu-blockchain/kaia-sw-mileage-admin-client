import type { MileageTokenResponse } from "@shared/api/mileage-token";
import type { MileageToken, MileageTokenWithActivateStatus } from "../model";

import { isSameAddress } from "@shared/lib/web3";

export const mapMileageToken = (dto: MileageTokenResponse): MileageToken => {
	return {
		id: dto.id,
		name: dto.name,
		description: dto.description,
		contractAddress: dto.contract_address,
		symbol: dto.symbol,
		imageUrl: dto.image_url,
		transactionStatus: dto.transaction_status,
		transactionHash: dto.transaction_hash,
		createdAt: new Date(dto.created_at),
		updatedAt: new Date(dto.updated_at),
	};
};

export const mapMileageTokenWithActivateStatus = (
	token: MileageToken,
	currentActivateTokenAddress: string,
): MileageTokenWithActivateStatus => {
	return {
		...token,
		isActivate: isSameAddress(
			token.contractAddress,
			currentActivateTokenAddress,
		),
	};
};
