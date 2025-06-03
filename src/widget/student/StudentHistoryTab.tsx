import { SwMileageTokenHistory } from "@/entities/history";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/shared/ui";
import { sliceWalletAddress, cn } from "@/shared/utils";

const StudentHistoryTab = ({ data }: { data: SwMileageTokenHistory[] }) => {
  return (
    <div className="flex flex-col gap-2 mt-4 w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left w-1/4">날짜</TableHead>
            <TableHead className="text-left">학생 지갑 주소</TableHead>
            <TableHead className="text-left">발급 관리자 지갑 주소</TableHead>
            <TableHead className="text-left">수량</TableHead>
            <TableHead className="text-right">상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((history) => (
            <TableRow key={history.sw_mileage_token_history_id}>
              <TableCell className="text-left">{history.created_at}</TableCell>
              <TableCell className="text-left">
                {sliceWalletAddress(history.student_address, 8)}
              </TableCell>
              <TableCell className="text-left">
                {sliceWalletAddress(history.admin_address, 8)}
              </TableCell>

              <TableCell className="text-left">
                {history.transaction_type === "mint" ? "+" : "-"}{" "}
                {history.amount}
              </TableCell>
              <TableCell
                className={cn(
                  history.status === 1
                    ? "text-pending"
                    : history.status === 2
                    ? "text-approved"
                    : "text-destructive",
                  "text-right"
                )}
              >
                {history.status === 1
                  ? "진행중"
                  : history.status === 2
                  ? "완료"
                  : "실패"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentHistoryTab;
