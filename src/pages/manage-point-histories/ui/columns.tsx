import { type ColumnDef } from "@tanstack/react-table";

import {
	mileageHistoryTypeParser,
	mileagePointAmountParser,
} from "@entities/mileage-point-history";
import { cn } from "@shared/lib/style";
import { sliceWalletAddress } from "@shared/lib/web3";
import { MILEAGE_POINT_HISTORY_TYPE } from "@/shared/api";

export type MileagePointHistoryColumns = {
	id: number;
	mileageId: number;
	studentName: string;
	studentId: string;
	walletAddress: string;
	type: MILEAGE_POINT_HISTORY_TYPE;
	mileageTokenName: string;
	mileageCategoryName: string;
	mileageActivityName: string;
	mileagePoint: number;
	createdAt: string;
};

const typeConfig = (type: MILEAGE_POINT_HISTORY_TYPE) => {
	const config = {
		[MILEAGE_POINT_HISTORY_TYPE.MILEAGE_APPROVED]: {
			text: mileageHistoryTypeParser(type),
			textColor: "text-approved",
		},
		[MILEAGE_POINT_HISTORY_TYPE.MILEAGE_BURNED]: {
			text: mileageHistoryTypeParser(type),
			textColor: "text-destructive",
		},
		[MILEAGE_POINT_HISTORY_TYPE.MILEAGE_MINTED]: {
			text: mileageHistoryTypeParser(type),
			textColor: "text-index",
		},
	};

	return config[type];
};

export const columns: ColumnDef<MileagePointHistoryColumns>[] = [
	{
		accessorKey: "studentName",
		header: "학생 이름",
	},
	{
		accessorKey: "studentId",
		header: "학생 학번",
	},
	{
		accessorKey: "walletAddress",
		header: "지갑 주소",
		cell: ({ row }) => {
			const { walletAddress } = row.original;
			return (
				<div className="text-sm font-medium">
					{sliceWalletAddress(walletAddress, 4)}
				</div>
			);
		},
	},
	{
		accessorKey: "mileageCategoryName",
		header: "활동 분야",
	},

	{
		accessorKey: "mileageActivityName",
		header: "비교과 활동",
	},
	{
		accessorKey: "mileageTokenName",
		header: "마일리지 토큰",
	},
	{
		accessorKey: "type",
		header: "유형",
		cell: ({ row }) => {
			const { type } = row.original;
			return (
				<div className={cn("text-sm font-medium", typeConfig(type).textColor)}>
					{typeConfig(type).text}
				</div>
			);
		},
	},

	{
		accessorKey: "mileagePoint",
		header: "수량",
		cell: ({ row }) => {
			const { mileagePoint, type } = row.original;
			return (
				<div className="text-sm font-medium">
					{mileagePointAmountParser(type, mileagePoint)}
				</div>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: "날짜",
	},
];
