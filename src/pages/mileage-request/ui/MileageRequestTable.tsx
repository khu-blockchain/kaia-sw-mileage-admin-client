import type { Row } from "@tanstack/react-table";
import type { MileageColumns } from "./columns.tsx";

import { useMemo, useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import {
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router";

import { MILEAGE_STATUS } from "@shared/api";
import { parseToFormattedDate } from "@shared/lib";
import { mileageQueries } from "@/entities/mileage";
import { DataTable } from "@/shared/ui";

import { columns } from "./columns.tsx";
import MileageFilter from "./MileageFilter.tsx";

const MileageRequestTable = () => {
	const navigate = useNavigate();

	const [pagination, setPagination] = useState({
		pageIndex: 0, //initial page index
		pageSize: 10, //default page size
	});

	const [filters, setFilters] = useState<{
		status?: MILEAGE_STATUS;
		studentId?: string;
	}>({});

	const {
		data: { data, meta },
	} = useSuspenseQuery(
		mileageQueries.getMileageList({
			page: pagination.pageIndex + 1,
			limit: pagination.pageSize,
			...(filters.status && { status: filters.status }),
			...(filters.studentId && { studentId: filters.studentId }),
		}),
	);

	const transformedData = useMemo(
		() =>
			data.map((mileage) => ({
				id: mileage.id,
				studentName: mileage.student?.name ?? "",
				department: mileage.student?.department ?? "",
				studentId: mileage.student?.student_id ?? "",
				mileageCategoryName: mileage.mileage_category_name,
				mileageActivityName: mileage.mileage_activity_name,
				status: mileage.status,
				createdAt: parseToFormattedDate(mileage.created_at),
			})),
		[data],
	);

	const onRowClick = (row: Row<MileageColumns>) => {
		navigate(`/request/${row.original.id}`);
	};

	const handleFilter = (filterValues: {
		status: MILEAGE_STATUS | "";
		studentId: string;
	}) => {
		setFilters({
			...(filterValues.status && {
				status: filterValues.status as MILEAGE_STATUS,
			}),
			...(filterValues.studentId && {
				studentId: filterValues.studentId,
			}),
		});
		setPagination((prev) => ({ ...prev, pageIndex: 0 }));
	};

	const handleResetFilter = () => {
		setFilters({});
		setPagination((prev) => ({ ...prev, pageIndex: 0 }));
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
			<MileageFilter onFilter={handleFilter} onReset={handleResetFilter} />
			<DataTable table={table} onRowClick={onRowClick} />
		</div>
	);
};

export default MileageRequestTable;
