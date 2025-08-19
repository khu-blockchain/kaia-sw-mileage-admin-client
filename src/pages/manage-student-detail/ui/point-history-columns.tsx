import { type ColumnDef } from "@tanstack/react-table";

import {
	mileageHistoryTypeParser,
	mileagePointAmountParser,
} from "@entities/mileage-point-history";
import { MILEAGE_POINT_HISTORY_TYPE } from "@shared/api";
import { cn } from "@shared/lib/style";
import { sliceWalletAddress } from "@shared/lib/web3";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@shared/ui";

export type MileagePointHistoryColumns = {
	id: number;
	mileageId: number;
	type: MILEAGE_POINT_HISTORY_TYPE;
	mileageTokenName: string;
	mileageCategoryName: string;
	mileageActivityName: string;
	walletAddress: string;
	mileagePoint: number;
	note: string;
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
		accessorKey: "mileageTokenName",
		header: "토큰 이름",
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
		accessorKey: "type",
		header: "지급 유형",
		cell: ({ row }) => {
			return (
				<span
					className={cn(
						typeConfig(row.original.type).textColor,
						"font-semibold",
					)}
				>
					{typeConfig(row.original.type).text}
				</span>
			);
		},
	},
	{
		accessorKey: "walletAddress",
		header: "지갑 주소",
		cell: ({ row }) => {
			return (
				<span className="text-sm">
					{sliceWalletAddress(row.original.walletAddress, 6)}
				</span>
			);
		},
	},
	{
		accessorKey: "mileagePoint",
		header: "수량",
		cell: ({ row }) => {
			return (
				<span>
					{mileagePointAmountParser(
						row.original.type,
						row.original.mileagePoint,
					)}
				</span>
			);
		},
	},

	{
		accessorKey: "createdAt",
		header: "날짜",
	},
	{
		accessorKey: "note",
		header: "비고",
		cell: ({ row }) => {
			return (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<span className="text-sm underline">비고</span>
						</TooltipTrigger>
						<TooltipContent className="max-w-[300px] whitespace-pre-line break-all">
							<p>{row.original.note}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			);
		},
	},
];
