import type { Row } from "@tanstack/react-table";
import type { MileagePointHistoryColumns } from "./columns.tsx";

import { useMemo, useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import {
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router";

import { parseToFormattedDate } from "@shared/lib";
import { MILEAGE_POINT_HISTORY_TYPE } from "@shared/api/enum";
import { mileagePointHistoryQueries } from "@/entities/mileage-point-history/api/queries";
import { DataTable } from "@/shared/ui";

import { columns } from "./columns";
import PointHistoryFilter from "./PointHistoryFilter";

const ManagePointHistoriesTable = () => {
	const navigate = useNavigate();

	const [pagination, setPagination] = useState({
		pageIndex: 0, //initial page index
		pageSize: 10, //default page size
	});

	const [filters, setFilters] = useState<{
		type?: MILEAGE_POINT_HISTORY_TYPE;
		studentName?: string;
	}>({});

	const {
		data: { data, meta },
	} = useSuspenseQuery(
		mileagePointHistoryQueries.getMileagePointHistoryList({
			page: pagination.pageIndex + 1,
			limit: pagination.pageSize,
			...(filters.type && { type: filters.type }),
			...(filters.studentName && { studentName: filters.studentName }),
		}),
	);

	const transformedData = useMemo(
		() =>
			data.map((mileagePointHistory) => ({
				id: mileagePointHistory.id,
				mileageId: mileagePointHistory?.mileage?.id,
				studentName: mileagePointHistory?.mileage?.student?.name ?? "",
				studentId: mileagePointHistory?.mileage?.student?.studentId ?? "",
				walletAddress:
					mileagePointHistory?.mileage?.student?.walletAddress ?? "",
				type: mileagePointHistory.type,
				mileageTokenName: mileagePointHistory.mileageTokenName,
				mileageCategoryName: mileagePointHistory.mileageCategoryName,
				mileageActivityName: mileagePointHistory.mileageActivityName,
				mileagePoint: mileagePointHistory.mileagePoint,
				createdAt: parseToFormattedDate(
					mileagePointHistory.createdAt.toISOString(),
				),
			})),
		[data],
	);

	const onRowClick = (row: Row<MileagePointHistoryColumns>) => {
		navigate(`/request/${row.original.mileageId}`);
	};

	const handleFilter = (filterValues: { type: MILEAGE_POINT_HISTORY_TYPE | ""; studentName: string }) => {
		setFilters({
			...(filterValues.type && { type: filterValues.type as MILEAGE_POINT_HISTORY_TYPE }),
			...(filterValues.studentName && { studentName: filterValues.studentName }),
		});
		setPagination(prev => ({ ...prev, pageIndex: 0 }));
	};

	const handleResetFilter = () => {
		setFilters({});
		setPagination(prev => ({ ...prev, pageIndex: 0 }));
	};

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
		<div className="flex flex-col gap-4">
			<PointHistoryFilter onFilter={handleFilter} onReset={handleResetFilter} />
			<DataTable table={table} onRowClick={onRowClick} />
		</div>
	);
};

export default ManagePointHistoriesTable;
