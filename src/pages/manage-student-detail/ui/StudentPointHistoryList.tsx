import type { Row } from "@tanstack/react-table";
import type { MileagePointHistoryColumns } from "./point-history-columns";

import { useMemo, useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import {
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useNavigate, useParams } from "react-router";

import { mileagePointHistoryQueries } from "@entities/mileage-point-history";
import { parseToFormattedDate } from "@shared/lib";
import { DataTable } from "@/shared/ui";

import { columns } from "./point-history-columns";

const StudentPointHistoryList = () => {
	const { id: studentId } = useParams();
	const navigate = useNavigate();

	const [pagination, setPagination] = useState({
		pageIndex: 0, //initial page index
		pageSize: 10, //default page size
	});

	const {
		data: { data, meta },
	} = useSuspenseQuery(
		mileagePointHistoryQueries.getMileagePointHistoryList({
			studentId,
			page: pagination.pageIndex + 1,
			limit: pagination.pageSize,
		}),
	);

	const transformedData = useMemo(
		() =>
			data.map((history) => ({
				id: history.id,
				mileageId: history.mileage.id,
				type: history.type,
				mileageTokenName: history.mileageTokenName,
				mileageCategoryName: history.mileage.mileageCategoryName,
				mileageActivityName: history.mileage.mileageActivityName,
				walletAddress: history.mileage.student?.walletAddress ?? "-",
				mileagePoint: history.mileagePoint,
				note: history.note,
				createdAt: parseToFormattedDate(history.createdAt.toISOString()),
			})),
		[data],
	);

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

	const onRowClick = (row: Row<MileagePointHistoryColumns>) => {
		navigate(`/request/${row.original.mileageId}`);
	};

	return (
		<div className="flex flex-col gap-6">
			<DataTable table={table} onRowClick={onRowClick} />
		</div>
	);
};

export default StudentPointHistoryList;
