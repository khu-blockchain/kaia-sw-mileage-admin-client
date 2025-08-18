import { useMemo, useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import {
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useParams } from "react-router";

import { mileagePointHistoryQueries } from "@entities/mileage-point-history";
import { parseToFormattedDate } from "@shared/lib";
import { DataTable } from "@/shared/ui";

import { columns } from "./columns.tsx";

const InpagePointHistoryTable = () => {
	const { id: swMileageId } = useParams();

	const [pagination, setPagination] = useState({
		pageIndex: 0, //initial page index
		pageSize: 10, //default page size
	});

	const {
		data: { data, meta },
	} = useSuspenseQuery(
		mileagePointHistoryQueries.getMileagePointHistoryList({
			mileageId: Number(swMileageId),
			page: pagination.pageIndex + 1,
			limit: pagination.pageSize,
		}),
	);

	const transformedData = useMemo(
		() =>
			data.map((mileage) => ({
				id: mileage.id,
				type: mileage.type,
				mileageTokenName: mileage.mileageTokenName,
				studentName: mileage.mileage.student?.name ?? "-",
				walletAddress: mileage.mileage.student?.walletAddress ?? "-",
				mileagePoint: mileage.mileagePoint,
				note: mileage.note,
				createdAt: parseToFormattedDate(mileage.createdAt.toISOString()),
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

	return (
		<div className="flex flex-col gap-6">
			<DataTable table={table} />
		</div>
	);
};

export default InpagePointHistoryTable;
