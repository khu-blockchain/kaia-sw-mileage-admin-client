import type { Address } from "@kaiachain/viem-ext";

import { type ColumnDef } from "@tanstack/react-table";

import { WALLET_LOST_STATUS } from "@shared/api";
import { sliceWalletAddress } from "@shared/lib/web3";
import { Button } from "@/shared/ui";

export type WalletLostColumns = {
	id: number;
	studentId: string;
	studentName: string;
	studentHash: string;
	status: WALLET_LOST_STATUS;
	previousWalletAddress: Address;
	requestWalletAddress: Address;
	createdAt: string;
};

export const createColumns: (
	onApprove: (id: number, studentHash: string, targetAddress: Address) => void,
) => ColumnDef<WalletLostColumns>[] = (onApprove) => [
	{
		accessorKey: "studentName",
		header: "이름",
	},
	{
		accessorKey: "studentId",
		header: "학번",
	},

	{
		accessorKey: "previousWalletAddress",
		header: "이전 지갑 주소",
		cell: ({ row }) => {
			return (
				<span>{sliceWalletAddress(row.original.previousWalletAddress, 10)}</span>
			);
		},
	},
	{
		accessorKey: "requestWalletAddress",
		header: "요청 지갑 주소",
		cell: ({ row }) => {
			return (
				<span>{sliceWalletAddress(row.original.requestWalletAddress, 10)}</span>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: "신청 날짜",
	},
	{
		header: "처리",
		cell: ({ row }) => {
			if (row.original.status === WALLET_LOST_STATUS.CREATED) {
				return (
					<Button
						size="sm"
						className="h-6 w-10 text-xs"
						onClick={() =>
							onApprove(
								row.original.id,
								row.original.studentHash,
								row.original.requestWalletAddress,
							)
						}
					>
						승인
					</Button>
				);
			}
			return <span>승인 완료</span>;
		},
	},
];
