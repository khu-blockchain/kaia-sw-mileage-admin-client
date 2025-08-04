import { SwMileageTokenHistory } from "@/entities/history";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Button,
} from "@/shared/ui";
import { sliceWalletAddress, parseToFormattedDate } from "@/shared/utils";

const StudentHistoryTab = ({ data }: { data: SwMileageTokenHistory[] }) => {
  return (
    <div className="flex flex-col gap-2 mt-4 w-full">
      <Table className="table-fiexd w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">날짜</TableHead>
            <TableHead className="text-left">토큰 이름</TableHead>
            <TableHead className="text-left">학생 지갑 주소</TableHead>
            <TableHead className="text-left">수량</TableHead>
            <TableHead className="text-left">발급 관리자 지갑 주소</TableHead>
            <TableHead className="text-left w-[60px]">비고</TableHead>
            <TableHead className="text-right">유형</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((history) => (
            <TableRow key={history.sw_mileage_token_history_id}>
              <TableCell className="text-left">
                {parseToFormattedDate(history.created_at)}
              </TableCell>
              <TableCell className="text-left">{history.token_name}</TableCell>
              <TableCell className="text-left">
                {sliceWalletAddress(history.student_address, 8)}
              </TableCell>

              <TableCell className="text-left">
                {history.type === "DIRECT_BURN" ? "-" : "+"} {history.amount}
              </TableCell>
              <TableCell className="text-left">
                {history.admin_address
                  ? sliceWalletAddress(history.admin_address, 8)
                  : "-"}
              </TableCell>
              <TableCell className="text-left w-[60px]">
                {history.note ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <p className="underline text-body">비고</p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{history.note}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="text-right">
                {history.type === "DOC_APPROVED"
                  ? "마일리지 승인"
                  : history.type === "DIRECT_MINT"
                  ? "직접 발급"
                  : history.type === "ACCOUNT_CHANGE"
                  ? "계정 변경"
                  : "직접 회수"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentHistoryTab;
