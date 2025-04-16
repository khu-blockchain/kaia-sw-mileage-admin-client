import { useActivateToken } from "@/features/token";
import {
  Switch,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/shared/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const TokenActivationDialog = ({
  swMileageTokenId,
  isActive,
}: {
  swMileageTokenId: string;
  isActive: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useActivateToken({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-sw-mileage-token-list"],
      });
      setOpen(false);
    },
    onError: () => {
      toast.error("잠시 후 다시 시도해주세요.");
    },
  });

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isActive) {
      toast.error("이미 활성화된 토큰입니다.");
      return;
    }
    setOpen(true);
  };

  const handleActivateToken = () => {
    mutate({ swMileageTokenId: Number(swMileageTokenId) });
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild onClick={(e) => handleOpen(e)}>
        <div className="cursor-pointer">
          <Switch id="activate-token" checked={isActive} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>이 토큰을 활성화 하시겠어요?</AlertDialogTitle>
          <AlertDialogDescription className="break-keep">
            선택한 토큰이 활성화 상태로 변경되며, 활성화 중이었던 토큰은
            비활성화 상태로 전환됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleActivateToken}>
            활성화
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TokenActivationDialog;
