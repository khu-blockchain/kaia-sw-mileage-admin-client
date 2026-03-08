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

import { MILEAGE_STATUS, TRANSACTION_STATUS } from "@shared/api";
import { parseToFormattedDate } from "@shared/lib";
import { mileageQueries } from "@/entities/mileage";
import { DataTable } from "@/shared/ui";

import { columns } from "./columns.tsx";
import MileageFilter from "./MileageFilter.tsx";
import { toast } from "sonner";

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

  console.log(data);

	const transformedData = useMemo(
		() =>
			data.map((mileage) => ({
				id: mileage.id,
				studentName: mileage.student?.name ?? "",
				department: mileage.student?.department ?? "",
				studentId: mileage.student?.student_id ?? "",
				mileageCategoryName: mileage.mileage_category_name,
				mileageActivityName: mileage.mileage_activity_name,
				transactionStatus: mileage.transaction_status,
				status: mileage.status,
				createdAt: parseToFormattedDate(mileage.created_at),
			})),
		[data],
	);

	const onRowClick = (row: Row<MileageColumns>) => {
    if(row.original.transactionStatus === TRANSACTION_STATUS.PROCESSING) {
      toast.info("아직 블록체인에 기록되지 않은 요청입니다.", {
        description: "잠시만 기다려주세요.(잠시 후 새로고침 해주세요.)",
      })
      return;
    }
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
