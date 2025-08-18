import type { Row } from "@tanstack/react-table";
import type { StudentColumns } from "./columns";

import { useMemo, useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import {
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router";

import { studentQueries } from "@entities/student/index.ts";
import { DataTable } from "@/shared/ui";

import { columns } from "./columns";
import StudentFilter from "./StudentFilter";

const ManageStudentTable = () => {
	const navigate = useNavigate();

	const [pagination, setPagination] = useState({
		pageIndex: 0, //initial page index
		pageSize: 10, //default page size
	});

	const [filters, setFilters] = useState<{
		studentName?: string;
	}>({});

	const {
		data: { data, meta },
	} = useSuspenseQuery(
		studentQueries.getStudentList({
			page: pagination.pageIndex + 1,
			limit: pagination.pageSize,
			...(filters.studentName && { name: filters.studentName }),
		}),
	);

	const transformedData = useMemo(
		() =>
			data.map((student) => ({
				studentId: student.studentId,
				studentName: student.name,
				department: student.department,
				email: student.email,
				walletAddress: student.walletAddress,
			})),
		[data],
	);

	const onRowClick = (row: Row<StudentColumns>) => {
		navigate(`/student/${row.original.studentId}`);
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

	const handleFilter = (filterValues: { studentName: string }) => {
		setFilters({
			...(filterValues.studentName && {
				studentName: filterValues.studentName,
			}),
		});
		setPagination((prev) => ({ ...prev, pageIndex: 0 }));
	};

	const handleResetFilter = () => {
		setFilters({});
		setPagination((prev) => ({ ...prev, pageIndex: 0 }));
	};

	return (
		<div className="flex flex-col gap-4">
			<StudentFilter onFilter={handleFilter} onReset={handleResetFilter} />
			<DataTable table={table} onRowClick={onRowClick} />
		</div>
	);
};

export default ManageStudentTable;
