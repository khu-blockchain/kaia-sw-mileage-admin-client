import type { ColumnDef } from "@tanstack/react-table";

import { useMemo } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useNavigate } from "react-router";

import { walletLostQueries } from "@entities/wallet-lost";
import { parseToFormattedDate } from "@shared/lib";
import { sliceWalletAddress } from "@shared/lib/web3";
import { Button, DataTable } from "@shared/ui";

type DashboardWalletLostColumns = {
	id: number;
	studentName: string;
	previousWalletAddress: string;
	requestWalletAddress: string;
	createdAt: string;
};

const columns: ColumnDef<DashboardWalletLostColumns>[] = [
	{
		accessorKey: "studentName",
		header: "이름",
	},
	{
		accessorKey: "previousWalletAddress",
		header: "이전 지갑 주소",
	},
	{
		accessorKey: "requestWalletAddress",
		header: "변경할 지갑 주소",
	},
	{
		accessorKey: "createdAt",
		header: "신청 날짜",
	},
];

export default function RecentWalletLostSection() {
	const navigate = useNavigate();
	const {
		data: { data },
	} = useSuspenseQuery(
		walletLostQueries.getWalletLostList({
			page: 1,
			limit: 5,
		}),
	);

	const transformedData = useMemo(
		() =>
			data.map((walletLost) => ({
				id: walletLost.id,
				studentName: walletLost.student_name,
				previousWalletAddress: sliceWalletAddress(
					walletLost.previous_wallet_address,
					6,
				),
				requestWalletAddress: sliceWalletAddress(
					walletLost.request_wallet_address,
					6,
				),
				createdAt: parseToFormattedDate(walletLost.created_at),
			})),
		[data],
	);

	const table = useReactTable({
		data: transformedData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		debugTable: true,
	});

	return (
		<div className="bg-white rounded-md border p-4">
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-3">
					<div>
						<h2 className="text-lg font-semibold text-body">
							최근 지갑 분실 요청
						</h2>
					</div>
				</div>
				<Button
					variant="outline"
					size="sm"
					onClick={() => navigate("/wallet-change")}
				>
					전체보기
				</Button>
			</div>

			<DataTable table={table} />
		</div>
	);
}
