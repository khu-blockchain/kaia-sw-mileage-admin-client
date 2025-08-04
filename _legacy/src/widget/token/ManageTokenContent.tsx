import { useGetSwMileageTokenList } from "@/features/token";
import { Alert, AlertDescription } from "@/shared/ui";
import { CircleAlert } from "lucide-react";
import { useMemo } from "react";
import ActiveTokenInfo from "./ActiveTokenInfo";
import TokenInfoTable from "./TokenInfoTable";

const ManageTokenContent = () => {
  const { data: swMileageTokenList } = useGetSwMileageTokenList();

  const activeToken = useMemo(
    () => swMileageTokenList.find((token) => token.is_activated),
    [swMileageTokenList]
  );
  return (
    <div className="content-container">
      <p className="text-xl font-semibold text-body">사용중인 토큰</p>
      {!activeToken && (
        <Alert>
          <CircleAlert className="h-4 w-4 color-body" />
          <AlertDescription>
            활성화된 마일리지 토큰이 없습니다.
          </AlertDescription>
        </Alert>
      )}
      {activeToken && <ActiveTokenInfo activeToken={activeToken} />}
      <p className="text-xl font-semibold text-body">토큰 목록</p>
      <TokenInfoTable swMileageTokenList={swMileageTokenList} />
    </div>
  );
};

export default ManageTokenContent;
