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

const StudentMintTab = () => {
  const [mintAmount, setMintAmount] = useState(0);

  const handleMint = () => {
    console.log("토큰 지급:", mintAmount);
    // TODO: 토큰 지급 로직 구현
  };
  return (
    <div className="flex flex-col gap-4 mt-4">
      <Alert>
        <CircleAlert className="h-4 w-4 text-destructive " />
        <AlertTitle>
          반드시 필요한 경우에만 직접 마일리지를 지급하세요.
        </AlertTitle>
        <AlertDescription>
          전산 오류, 지급 승인 과정 중 기입 오류등의 문제가 발생했을 경우에만
          이용하세요.
        </AlertDescription>
      </Alert>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="mint-amount"
          className="text-sm text-body font-semibold"
        >
          마일리지 수량
        </Label>
        <div className="flex flex-row gap-2">
          <Input
            id="mint-amount"
            className="w-100 h-10 bg-white"
            placeholder="지급할 마일리지 수량을 입력하세요"
            value={mintAmount}
            onChange={(e) => setMintAmount(parseInt(e.target.value))}
            type="number"
            min="0"
          />
          <Button
            className="h-10 px-6"
            onClick={handleMint}
            disabled={!mintAmount || mintAmount <= 0}
          >
            지급
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentMintTab;
