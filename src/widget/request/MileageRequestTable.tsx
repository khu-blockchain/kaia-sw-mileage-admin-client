import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Button,
} from "@/shared/ui";
import { useNavigate } from "react-router";
import { useGetSwMileageList } from "@/features/mileage";
import { usePagination } from "@/shared/hooks";
import { PaginationControls } from "@/shared/component";
import { SwMileage } from "@/entities/mileage";
import { ACTIVITY_CATEGORIES } from "@/shared/constants";
import { parseToFormattedDate } from "@/shared/utils";

const tableHeaders = [
  {
    key: "created_at",
    label: "신청 날짜",
  },
  {
    key: "department",
    label: "학과",
  },
  {
    key: "name",
    label: "이름",
  },
  {
    key: "student_id",
    label: "학번",
  },
  {
    key: "academic_field",
    label: "활동 분야",
  },
  {
    key: "status",
    label: "상태",
  },
];

const MileageRequestTable = () => {
  const navigate = useNavigate();
  const { data, refetch } = useGetSwMileageList({});

  const { currentData, paginationInfo, paginationActions } = usePagination(
    data,
    { itemsPerPage: 10 }
  );

  const swMileageHistoryMapper = (history: SwMileage[]) =>
    history.map((history) => {
      return {
        id: history.sw_mileage_id,
        name: history.name,
        department: history.department,
        academic_field:
          ACTIVITY_CATEGORIES[
            history.academic_field as keyof typeof ACTIVITY_CATEGORIES
          ],
        student_id: history.student_id,
        created_at: parseToFormattedDate(history.created_at),
        status: <SwMileageStatusBadge status={history.status} />,
      };
    });
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <p className="text-body">학생이 신청한 마일리지 내역을 확인하세요.</p>
          <Button onClick={() => refetch()} variant="outline" size="sm">
            새로고침
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeaders.map((col) => (
                <TableHead key={col.key} className="text-left">
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              swMileageHistoryMapper(currentData).map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/request/${row.id}`)}
                >
                  {tableHeaders.map((col) => (
                    <TableCell key={`${row.id}-${col.key}`}>
                      {row[col.key as keyof typeof row]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableHeaders.length}
                  className="text-center py-8 text-gray-500"
                >
                  조회된 데이터가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationControls
        paginationInfo={paginationInfo}
        paginationActions={paginationActions}
      />
    </div>
  );
};

export default MileageRequestTable;

const SwMileageStatusBadge = ({ status }: { status: 0 | 1 | 2 }) => {
  const statusText = {
    2: {
      text: "제출됨",
      color: "text-body",
    },
    1: {
      text: "승인",
      color: "text-approved",
    },
    0: {
      text: "반려",
      color: "text-destructive",
    },
  };
  return (
    <p className={`${statusText[status].color}`}>{statusText[status].text}</p>
  );
};
