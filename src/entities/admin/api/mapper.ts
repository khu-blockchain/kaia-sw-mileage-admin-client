import type { AdminResponse } from "@shared/api/admin";
import type { Admin } from "../model";

export const mapAdmin = (dto: AdminResponse): Admin => {
	return {
		adminId: dto.admin_id,
		name: dto.name,
		email: dto.email,
		walletAddress: dto.wallet_address,
		transactionStatus: dto.transaction_status,
		createdAt: new Date(dto.created_at),
		updatedAt: new Date(dto.updated_at),
	};
};
