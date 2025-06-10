import { useGetMintHistories } from "@/features/history";
import { PaginationControls } from "@/shared/component";
import { usePagination } from "@/shared/hooks";
import { Button } from "@/shared/ui";
import HistoryTable from "./HistoryTable";
import { SwMileageTokenHistory } from "@/entities/history";
import { parseToFormattedDate, sliceWalletAddress } from "@/shared/utils";

// 테이블 헤더 정의
const tableHeaders = [
  { key: "student_id", label: "학번" },
  { key: "amount", label: "수량" },
  { key: "student_address", label: "학생 지갑 주소" },
  { key: "type", label: "발급 유형" },
  { key: "token_name", label: "토큰 이름" },
  { key: "admin_address", label: "발급 관리자 지갑 주소" },
  { key: "note", label: "비고" },
  { key: "created_at", label: "발급 일시" },
];

const MintHistoryContent = () => {
  const {
    data: { list, totalCount },
    refetch,
  } = useGetMintHistories({
    isCount: 1,
    type: ["DOC_APPROVED", "DIRECT_MINT"],
  });

  const { currentData, paginationInfo, paginationActions } = usePagination(
    list,
    { itemsPerPage: 10 },
    totalCount
  );
  
  const typeMapper = (type: string) => {
    switch (type) {
      case "DOC_APPROVED":
        return "마일리지 승인";
      case "DIRECT_MINT":
        return "직접 발급";
      default:
        return "-";
    }
  };

  const mintHistoryMapper = (history: SwMileageTokenHistory[]) =>
    history.map((history) => {
      return {
        id: history.sw_mileage_token_history_id,
        student_id: history.student_id,
        amount: history.amount.toLocaleString(),
        student_address: sliceWalletAddress(history.student_address),
        type: typeMapper(history.type),
        token_name: history.token_name,
        admin_address: history.admin_address
          ? sliceWalletAddress(history.admin_address)
          : "-",
        note: history.note || "-",
        created_at: parseToFormattedDate(history.created_at),
      };
    });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <p className="text-body">
            학생에게 지급한 마일리지 내역을 확인하세요.
          </p>
          <Button onClick={() => refetch()} variant="outline" size="sm">
            새로고침
          </Button>
        </div>
      </div>

      <HistoryTable
        tableHeaders={tableHeaders}
        data={currentData}
        mapper={mintHistoryMapper}
      />

      {/* 페이지네이션 */}
      <PaginationControls
        paginationInfo={paginationInfo}
        paginationActions={paginationActions}
      />
    </div>
  );
};

export default MintHistoryContent;
