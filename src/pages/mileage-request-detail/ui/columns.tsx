import { type ColumnDef } from "@tanstack/react-table";

import {
	mileageHistoryTypeParser,
	mileagePointAmountParser,
} from "@entities/mileage-point-history";
import { MILEAGE_POINT_HISTORY_TYPE } from "@shared/api";
import { sliceWalletAddress } from "@shared/lib/web3";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@shared/ui";

export type MileagePointHistoryColumns = {
	id: number;
	type: MILEAGE_POINT_HISTORY_TYPE;
	mileageTokenName: string;
	studentName: string;
	walletAddress: string;
	mileagePoint: number;
	note: string;
	createdAt: string;
};

export const columns: ColumnDef<MileagePointHistoryColumns>[] = [
	{
		accessorKey: "mileageTokenName",
		header: "토큰 이름",
	},
	{
		accessorKey: "type",
		header: "지급 유형",
		cell: ({ row }) => {
			return <span>{mileageHistoryTypeParser(row.original.type)}</span>;
		},
	},
	{
		accessorKey: "studentName",
		header: "학생 이름",
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
