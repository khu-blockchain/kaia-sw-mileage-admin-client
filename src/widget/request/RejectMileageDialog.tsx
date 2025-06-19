import {
  AlertDialogHeader,
  Separator,
  Textarea,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/shared/ui";
import { useState } from "react";
import { useRejectSwMileage } from "@/features/mileage";
import { kaia, STUDENT_MANAGER_ABI } from "@/shared/constants";
import { encodeContractExecutionABI } from "@/shared/utils";
import { encodePacked, keccak256 } from "viem";
import { SwMileage } from "@/entities/mileage";
import { toast } from "sonner";

type RejectMileageDialogProps = {
  children: React.ReactNode;
  swMileage: SwMileage;
};

function RejectMileageDialog({
  children,
  swMileage,
}: RejectMileageDialogProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  const { mutate } = useRejectSwMileage({
    onSuccess: () => {
      console.log("success");
      setOpen(false);
      toast.success("SW 마일리지 반려가 완료되었습니다.");
    },
  });

  const handleConfirm = async () => {
    const reasonHash = keccak256(encodePacked(["string"], [reason]));

    const data = encodeContractExecutionABI(
      STUDENT_MANAGER_ABI,
      "approveDocument",
      [swMileage.doc_index, 0, reasonHash]
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
      comment: reason,
    });

    // 확인 동작은 직접 구현 예정
    setOpen(false);
    setReason("");
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <span onClick={() => setOpen(true)}>{children}</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>SW 마일리지 반려</AlertDialogTitle>
          <AlertDialogDescription className="whitespace-pre-wrap">
            {
              "SW 마일리지 신청을 반려합니다.\n하단에 반려 사유를 작성해주세요. 반려 사유는 학생이 확인할 수 있습니다."
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Separator />
        <div>
          <Textarea
            className="w-full min-h-[80px] border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="반려 사유를 입력하세요."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            취소
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default RejectMileageDialog;
