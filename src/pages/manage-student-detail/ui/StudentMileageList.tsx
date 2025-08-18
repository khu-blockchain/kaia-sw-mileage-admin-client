import type { Row } from "@tanstack/react-table";
import type { MileageRequestColumns } from "./mileage-request-columns";

import { useMemo, useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import {
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useNavigate, useParams } from "react-router";

import { parseToFormattedDate } from "@shared/lib";
import { mileageQueries } from "@/entities/mileage";
import { DataTable } from "@/shared/ui";

import { columns } from "./mileage-request-columns";

const StudentMileageList = () => {
	const { id: studentId } = useParams();
	const navigate = useNavigate();

	const [pagination, setPagination] = useState({
		pageIndex: 0, //initial page index
		pageSize: 10, //default page size
	});

	const {
		data: { data, meta },
	} = useSuspenseQuery(
		mileageQueries.getMileageList({
			studentId,
			page: pagination.pageIndex + 1,
			limit: pagination.pageSize,
		}),
	);

	const transformedData = useMemo(
		() =>
			data.map((mileage) => ({
				id: mileage.id,
				mileageCategoryName: mileage.mileage_category_name,
				mileageActivityName: mileage.mileage_activity_name,
				status: mileage.status,
				createdAt: parseToFormattedDate(mileage.created_at),
			})),
		[data],
	);

	const onRowClick = (row: Row<MileageRequestColumns>) => {
		navigate(`/request/${row.original.id}`);
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
		<div className="flex flex-col gap-6">
			<DataTable table={table} onRowClick={onRowClick} />
		</div>
	);
};

export default StudentMileageList;
