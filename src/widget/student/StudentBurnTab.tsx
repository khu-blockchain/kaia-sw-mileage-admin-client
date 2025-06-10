import {
  Alert,
  AlertTitle,
  AlertDescription,
  Input,
  Button,
  Label,
} from "@/shared/ui";
import { CircleAlert } from "lucide-react";
import { useState } from "react";
import { Student } from "@/entities/student";
import { encodeContractExecutionABI } from "@/shared/utils";
import { kaia, STUDENT_MANAGER_ABI } from "@/shared/constants";
import { useBurnSwMileage } from "@/features/student/queries";

const StudentBurnTab = ({ student }: { student: Student }) => {
  const [burnAmount, setBurnAmount] = useState(0);
  const { mutate } = useBurnSwMileage({
    onSuccess: () => {
      console.log("success");
    },
  });
  const handleBurn = async () => {
    const data = encodeContractExecutionABI(STUDENT_MANAGER_ABI, "burnFrom", [
      student.student_hash,
      student.wallet_address,
      burnAmount,
    ]);
    const { rawTransaction } = await kaia.wallet.klaySignTransaction({
      type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
      to: import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
      from: kaia.browserProvider.selectedAddress,
      data: data,
      value: "0x0",
      gas: "0x4C4B40",
    });

    mutate({
      studentId: student.student_id,
      rawTransaction: rawTransaction,
    });
  };
  return (
    <div className="flex flex-col gap-4 mt-4">
      <Alert>
        <CircleAlert className="h-4 w-4 text-destructive " />
        <AlertTitle>
          반드시 필요한 경우에만 직접 마일리지를 회수하세요.
        </AlertTitle>
        <AlertDescription>
          전산 오류 등의 문제가 발생했을 경우에만 이용하세요.
        </AlertDescription>
      </Alert>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="burn-amount"
          className="text-sm text-body font-semibold"
        >
          마일리지 수량
        </Label>
        <div className="flex flex-row gap-2">
          <Input
            id="burn-amount"
            className="w-100 h-10 bg-white"
            placeholder="회수할 마일리지 수량을 입력하세요"
            value={burnAmount}
            onChange={(e) => setBurnAmount(parseInt(e.target.value))}
            type="number"
            min="0"
          />
          <Button
            className="h-10 px-6"
            onClick={handleBurn}
            disabled={!burnAmount || burnAmount <= 0}
          >
            회수
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentBurnTab;
