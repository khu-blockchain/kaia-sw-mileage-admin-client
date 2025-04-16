import { SwMileageToken } from "@/entities/token";
import { useIsRegisteredAdmin, useRegisterAdmin } from "@/features/token";
import { provider, caver } from "@/shared/constants";
import { useConnect } from "@/shared/hooks";
import { Alert, AlertDescription, Button } from "@/shared/ui";
import { CircleAlert, CircleCheck } from "lucide-react";
import { useTransition, useEffect } from "react";
import { toast } from "sonner";


const ActiveTokenInfo = ({ activeToken }: { activeToken: SwMileageToken }) => {
  const { walletAddress } = useConnect();

  const [_, startTransition] = useTransition();

  const {
    data: { isValidAddress, isAdmin },
    refetch,
  } = useIsRegisteredAdmin({
    contractAddress: activeToken.contract_address,
    targetAddress: provider.selectedAddress,
  });

  console.log(isValidAddress, isAdmin);

  useEffect(() => {
    if (walletAddress) {
      startTransition(() => {
        refetch();
      });
    }
  }, [walletAddress]);

  return (
    <div className="flex flex-col gap-6">
      <AdminPermissionAlert
        activeToken={activeToken}
        isValidAddress={isValidAddress}
        isAdmin={isAdmin}
      />
      <div className="flex justify-start items-center gap-4">
        <img
          src={activeToken.sw_mileage_token_image_url}
          alt="logo"
          className="w-12 h-12 p-1 border border-border rounded-full object-contain"
        />
        <div className="flex flex-col gap-1/2">
          <p className="text-md text-body font-semibold">
            {activeToken.sw_mileage_token_name}
          </p>
          <p className="text-sm text-body">{activeToken.description}</p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

const AdminPermissionAlert = ({
  activeToken,
  isValidAddress,
  isAdmin,
}: {
  activeToken: SwMileageToken;
  isValidAddress: boolean;
  isAdmin: boolean;
}) => {

  const { mutate, isPending } = useRegisterAdmin({
    onSuccess: () => {
      toast.success("관리자 권한 등록 요청이 전송되었습니다.\n잠시 후 승인 완료됩니다.")
    },
    onError: (res) => {
      console.error(res);
      toast.error("관리자 권한 등록에 실패했습니다.");
    },
  });

  const handleRequestRegisterAdmin = async () => {
    console.log(caver);

    mutate({
      contractAddress: activeToken.contract_address,
      targetAddress: provider.selectedAddress,
      swMileageTokenId: Number(activeToken.sw_mileage_token_id),
    });
  };

  const alertVariant = (
    isValidAddress: boolean,
    isAdmin: boolean
  ): {
    icon: React.ReactNode;
    variant: "default" | "destructive" | "approved";
    description: string;
  } => {
    if (!isValidAddress) {
      return {
        icon: <CircleAlert className="h-4 w-4 color-body" />,
        variant: "default",
        description: "권한 확인을 위해 지갑을 연결해주세요.",
      };
    }
    if (isValidAddress && !isAdmin) {
      return {
        icon: <CircleAlert className="h-4 w-4 color-destructive" />,
        variant: "destructive",
        description: "관리자 권한 등록이 필요한 계정입니다.",
      };
    }
    return {
      icon: <CircleCheck className="h-4 w-4 color-approved" />,
      variant: "approved",
      description: "관리자 권한 등록이 완료된 계정입니다.",
    };
  };

  return (
    <Alert variant={alertVariant(isValidAddress, isAdmin).variant}>
      {alertVariant(isValidAddress, isAdmin).icon}
      <AlertDescription>
        <div className="flex w-full items-center justify-between">
          {alertVariant(isValidAddress, isAdmin).description}
          {isValidAddress && !isAdmin && (
            <Button variant="link_destructive" size="xs" onClick={handleRequestRegisterAdmin} disabled={isPending}>
              관리자 등록
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ActiveTokenInfo;
