import { WalletLost } from "@/entities/walletLost";
import {
  useApproveWalletLost,
  useGetWalletLostList,
} from "@/features/walletLost";
import { PaginationControls } from "@/shared/component";
import { kaia, STUDENT_MANAGER_ABI } from "@/shared/constants";
import { usePagination } from "@/shared/hooks";
import {
  Button,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/shared/ui";
import {
  encodeContractExecutionABI,
  parseToFormattedDateTime,
  sliceWalletAddress,
} from "@/shared/utils";
import { toast } from "sonner";

const tableHeaders = [
  { key: "student_id", label: "학번" },
  { key: "name", label: "이름" },
  { key: "address", label: "기존 계정" },
  { key: "target_address", label: "변경할 계정" },
  { key: "is_confirmed", label: "상태" },
  { key: "created_at", label: "요청 일시" },
  { key: "action", label: "" },
];

const WalletLostTable = () => {
  const {
    data: { total, list },
    refetch,
  } = useGetWalletLostList();

  const { mutate } = useApproveWalletLost({
    onSuccess: (res) => {
      toast.success("요청이 승인되었습니다. 잠시 후 새로고침 해주세요.");
    },
  });

  const { paginationInfo, paginationActions } = usePagination(
    list,
    { itemsPerPage: 10 },
    total
  );

  const approveWalletLost = async (walletLost: WalletLost) => {
    const data = encodeContractExecutionABI(
      STUDENT_MANAGER_ABI,
      "changeAccount",
      [walletLost.student_hash, walletLost.target_address]
    );

    const { rawTransaction } = await kaia.wallet.klaySignTransaction({
      type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
      to: import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
      from: kaia.browserProvider.selectedAddress,
      data: data,
      value: "0x0",
      gas: "0x4C4B42",
    });

    mutate({
      walletHistoryId: walletLost.wallet_history_id,
      studentId: walletLost.student_id,
      rawTransaction,
    });
  };

  const walletLostMapper = (walletLost: WalletLost[]) =>
    walletLost.map((request) => {
      return {
        id: request.wallet_history_id,
        name: request.name,
        student_id: request.student_id,
        address: sliceWalletAddress(request.address, 6),
        target_address: sliceWalletAddress(request.target_address, 6),
        is_confirmed:
          request.is_confirmed === 0 ? (
            <span>요청됨</span>
          ) : (
            <span>처리 완료</span>
          ),
        created_at: parseToFormattedDateTime(request.created_at),
        action: request.is_confirmed === 0 && (
          <Button size="sm" onClick={() => approveWalletLost(request)}>
            승인
          </Button>
        ),
      };
    });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <p className="text-body">
            학생의 지갑 변경 요청 목록입니다. 요청을 승인할 경우, 학생과 연동된
            Kaia 계정이 변경됩니다.
          </p>
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
            {walletLostMapper(list).length > 0 ? (
              walletLostMapper(list).map((row) => (
                <TableRow key={row.id}>
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

export default WalletLostTable;
