import { SwMileage } from "@/entities/mileage";
import {
  AlertDialogHeader,
  Separator,
  Input,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  Label,
} from "@/shared/ui";
import { useEffect, useState } from "react";
import { useApproveSwMileage } from "@/features/mileage";
import { kaia, STUDENT_MANAGER_ABI } from "@/shared/constants";
import { encodeContractExecutionABI } from "@/shared/utils";
import { toast } from "sonner";

type ApproveMileageDialogProps = {
  swMileage: SwMileage;
  activityFieldList: Record<string, any>;
  children: React.ReactNode;
};

function ApproveMileageDialog({
  swMileage,
  children,
  activityFieldList,
}: ApproveMileageDialogProps) {
  const [open, setOpen] = useState(false);
  const [defaultScore, setDefaultScore] = useState(0);
  const [extraScore, setExtraScore] = useState("");

  const { mutate } = useApproveSwMileage({
    onSuccess: () => {
      console.log("success");
      setOpen(false);
      toast.success("SW 마일리지 승인이 완료되었습니다.");
    },
  });

  const setScore = () => {
    if (!swMileage) return;
    let score;
    if (!swMileage.extracurricular_activity_classification) {
      score =
        activityFieldList[swMileage.academic_field][
          swMileage.extracurricular_activity
        ];
    } else {
      score =
        activityFieldList[swMileage.academic_field][
          swMileage.extracurricular_activity
        ][swMileage.extracurricular_activity_classification];
    }
    setDefaultScore(score.default);
  };

  const handleConfirm = async () => {
    const data = encodeContractExecutionABI(
      STUDENT_MANAGER_ABI,
      "approveDocument",
      [
        swMileage.doc_index,
        defaultScore + Number(extraScore),
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      ]
    );

    const { rawTransaction } = await kaia.wallet.klaySignTransaction({
      type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
      to: import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
      from: kaia.browserProvider.selectedAddress,
      data: data,
      value: "0x0",
      gas: "0x4C4B40",
    });

    mutate({
      swMileageId: swMileage.sw_mileage_id,
      rawTransaction: rawTransaction,
    });

    // setOpen(false);
    setExtraScore("");
    setDefaultScore(0);
  };

  useEffect(() => {
    if (open) {
      setScore();
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      setExtraScore("");
      setDefaultScore(0);
    }
  }, [open]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <span onClick={() => setOpen(true)}>{children}</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>SW 마일리지 승인</AlertDialogTitle>
          <AlertDialogDescription className="whitespace-pre-wrap">
            {
              "SW 마일리지 신청을 승인합니다.\n책정된 기본 점수 이외에 부가 점수를 부여해야 할 경우, 하단의 추가 마일리지 영역에 입력해주세요."
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Separator />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              기본 마일리지 점수
            </span>
            <span className="font-semibold text-md">{defaultScore}</span>
          </div>
          <div className="flex flex-col gap-1">
            <Label
              htmlFor="extra-mileage"
              className="text-sm text-muted-foreground"
            >
              부가 마일리지
            </Label>
            <Input
              id="extra-mileage"
              type="number"
              className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="필요한 경우 부가 마일리지 점수를 입력하세요."
              value={extraScore}
              onChange={(e) => setExtraScore(e.target.value)}
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            취소
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleConfirm()}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ApproveMileageDialog;
