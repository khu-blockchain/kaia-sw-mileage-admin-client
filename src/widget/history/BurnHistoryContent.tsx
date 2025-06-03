import { useGetBurnHistories } from "@/features/history";
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
  { key: "token_name", label: "토큰 이름" },
  { key: "note", label: "비고" },
  { key: "created_at", label: "회수 일시" },
];

const BurnHistoryContent = () => {
  const {
    data: { list, totalCount },
    refetch,
  } = useGetBurnHistories({
    isCount: 1,
    type: ["DIRECT_BURN"],
  });

  const { currentData, paginationInfo, paginationActions } = usePagination(
    list,
    { itemsPerPage: 10 },
    totalCount
  );

  // 트랜잭션 해시 클릭 핸들러
  const onClickTxHash = (hash: string) => {
    // 블록체인 익스플로러로 이동하는 로직
    window.open(`https://etherscan.io/tx/${hash}`, "_blank");
  };

  const burnHistoryMapper = (history: SwMileageTokenHistory[]) =>
    history.map((history) => {
      return {
        id: history.sw_mileage_token_history_id,
        student_id: history.student_id,
        amount: history.amount.toLocaleString(),
        student_address: sliceWalletAddress(history.student_address),
        token_name: history.token_name,
        note: history.note,
        created_at: parseToFormattedDate(history.created_at),
      };
    });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <p className="text-body">마일리지 회수 내역을 확인하세요.</p>
          <Button onClick={() => refetch()} variant="outline" size="sm">
            새로고침
          </Button>
        </div>
      </div>

      <HistoryTable
        tableHeaders={tableHeaders}
        data={currentData}
        mapper={burnHistoryMapper}
      />

      {/* 페이지네이션 */}
      <PaginationControls
        paginationInfo={paginationInfo}
        paginationActions={paginationActions}
      />
    </div>
  );
};

export default BurnHistoryContent;
