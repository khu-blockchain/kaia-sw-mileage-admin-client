import { Alert, AlertDescription } from "@/shared/ui";
import { getToday, parseToFormattedDate } from "@/shared/utils";
import { PageLayout } from "@/widget/_frgment";
import { useMemo } from "react";
import { CircleAlert } from "lucide-react";
import { ActiveTokenInfo, TokenInfoTable } from "@/widget/token";
import { PageBoundary } from "@/widget/_suspense";
import { useGetSwMileageTokenList } from "@/features/token";


const ManageToken = () => {
  const { data: swMileageTokenList } = useGetSwMileageTokenList();

  const activeToken = useMemo(
    () => swMileageTokenList.find((token) => token.is_activated === 1),
    [swMileageTokenList]
  );

  return (
    <PageBoundary>
      <PageLayout index="마일리지 토큰" title="토큰 관리">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <p className="text-body whitespace-pre leading-7">
              {`${parseToFormattedDate(
                getToday().toString()
              )}기준 생성된 SW Mileage 토큰 목록입니다. 운영 연도에 맞는 마일리지 토큰을 활성화 하세요.\n` +
                '접속중인 계정이 관리자로 등록되지 않았을 경우 "관리자 등록"을 눌러 권한을 추가할 수 있습니다.'}
            </p>
          </div>
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
        </div>
      </PageLayout>
    </PageBoundary>
  );
};

export default ManageToken;
