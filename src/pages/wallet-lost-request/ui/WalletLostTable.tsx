import type { Address } from "@kaiachain/viem-ext";

import { useMemo, useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import {
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { toast } from "sonner";

import { useStudentManager } from "@features/kaia";
import { walletLostQueries } from "@entities/wallet-lost";
import { parseToFormattedDate } from "@shared/lib";
import { DataTable } from "@/shared/ui";

import { useApproveWalletLost } from "../api";
import { createColumns } from "./columns";

const MileageRequestTable = () => {
	const [pagination, setPagination] = useState({
		pageIndex: 0, //initial page index
		pageSize: 10, //default page size
	});

	const {
		data: { data, meta },
	} = useSuspenseQuery(
		walletLostQueries.getWalletLostList({
			page: pagination.pageIndex + 1,
			limit: pagination.pageSize,
		}),
	);

	const { encodeAbi, requestSignTransaction } = useStudentManager();

	const { mutateAsync } = useApproveWalletLost();

	const transformedData = useMemo(
		() =>
			data.map((walletLost) => ({
				id: walletLost.id,
				studentId: walletLost.student_id,
				studentName: walletLost.student_name,
				studentHash: walletLost.student_hash,
				status: walletLost.status,
				previousWalletAddress: walletLost.previous_wallet_address,
				requestWalletAddress: walletLost.request_wallet_address,
				createdAt: parseToFormattedDate(walletLost.created_at),
			})),
		[data],
	);

	const approveWalletLost = async (
		id: number,
		studentHash: string,
		targetAddress: Address,
	) => {
		const data = encodeAbi("changeAccount", [studentHash, targetAddress]);
		const rawTransaction = await requestSignTransaction(data);
		toast.promise(mutateAsync({ id, rawTransaction }), {
			loading: "승인 중...",
			success: {
				message: "지갑 분실 처리가 완료되었습니다.",
				description: "블록체인에 반영되는데 시간이 소요될 수 있습니다.",
			},
			error: (error) => {
				return {
					message: "지갑 분실 처리에 실패했습니다.",
					description: `${error.message}`,
				};
			},
		});
	};

	const columns = createColumns(approveWalletLost);

	const table = useReactTable({
		data: transformedData,
		columns,
		pageCount: Math.ceil((meta.total ?? 0) / pagination.pageSize),
		manualPagination: true,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
		state: {
			pagination,
		},
		debugTable: true,
	});

	return (
		<div className="flex flex-col gap-6">
			<DataTable table={table} />
		</div>
	);
};

export default MileageRequestTable;
