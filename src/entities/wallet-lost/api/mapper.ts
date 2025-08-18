import type { WalletLostResponse } from "@shared/api/wallet-lost";
import type { WalletLost } from "../model";
import { parseToFormattedDate } from "@/shared/lib";

export const mapWalletLost = (dto: WalletLostResponse): WalletLost => {
	return {
		id: dto.id,
		studentId: dto.student_id,
		studentName: dto.student_name,
		studentHash: dto.student_hash,
		status: dto.status,
		transactionStatus: dto.transaction_status,
		previousWalletAddress: dto.previous_wallet_address,
		requestWalletAddress: dto.request_wallet_address,
		createdAt: parseToFormattedDate(dto.created_at),
		updatedAt: parseToFormattedDate(dto.updated_at),
	};
};
