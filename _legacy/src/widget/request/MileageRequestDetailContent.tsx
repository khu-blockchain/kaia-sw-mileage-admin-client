import { useGetSwMileageById } from "@/features/mileage";
import { ACTIVITY_CATEGORIES } from "@/shared/constants";
import { sliceWalletAddress, parseToFormattedDate } from "@/shared/utils";
import { useMemo } from "react";
import { useParams } from "react-router";
import { Button } from "@/shared/ui";
import RejectMileageDialog from "./RejectMileageDialog";
import ApproveMileageDialog from "./ApproveMileageDialog";

const MileageRequestDetailContent = () => {
  const { id: swMileageId } = useParams();
  const {
    data: { swMileageDetail, activityFieldList },
  } = useGetSwMileageById({
    swMileageId: Number(swMileageId),
  });

  const handleFileDownload = (fileUrl: string, fileName: string) => {
    // 새 탭에서 파일 URL 열기 (브라우저에서 자동으로 다운로드 처리)
    const link = document.createElement("a");
    link.href = `http://khunggum.khu.ac.kr${fileUrl}`;
    link.download = fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const detailContentMapper = useMemo(() => {
    return {
      student: {
        name: {
          label: "이름",
          value: swMileageDetail.name,
        },
        walletAddress: {
          label: "지갑 주소",
          value: sliceWalletAddress(
            swMileageDetail.wallet_address.toUpperCase()
          ),
        },
        email: {
          label: "이메일",
          value: swMileageDetail.email,
        },
        phoneNumber: {
          label: "전화번호",
          value: swMileageDetail.phone_number,
        },
      },
      document: {
        academic_field: {
          label: "학술 분야",
          value:
            ACTIVITY_CATEGORIES[
              swMileageDetail.academic_field as keyof typeof ACTIVITY_CATEGORIES
            ],
        },
        extracurricular_activity: {
          label: "비교과 활동",
          value: swMileageDetail.extracurricular_activity,
        },
        extracurricular_activity_classification: {
          label: "비교과 활동 분류",
          value: swMileageDetail.extracurricular_activity_classification ?? "-",
        },
        created_at: {
          label: "신청 일시",
          value: parseToFormattedDate(swMileageDetail.created_at),
        },
        content: {
          label: "활동 내용",
          value: swMileageDetail.content,
        },
      },
      status: swMileageDetail.status,
      comment: swMileageDetail.comment ?? "-",
    };
  }, [swMileageDetail]);
  return (
    <div className="content-container">
      <div className="flex gap-2">
        <div className="grid gap-4 h-min">
          <p className="text-xl font-semibold">기본 정보</p>
          <div className="flex flex-col gap-3">
            {Object.entries(detailContentMapper.student).map(([key, value]) => (
              <div key={key} className="grid gap-1">
                <p className="text-sm text-muted-foreground">{value.label}</p>
                <p className="text-md text-body">{value.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="h-full w-[1px] bg-gray-200 mx-6" />
        <div className="grid gap-4 w-full h-min">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">제출 정보</p>
            <p className="text-sm text-muted-foreground">
              제출 일자: {detailContentMapper.document.created_at.value}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">학술 분야</p>
              <p className="text-md text-body break-all">
                {detailContentMapper.document.academic_field.value}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">비교과 활동</p>
              <p className="text-md text-body break-all">
                {detailContentMapper.document.extracurricular_activity.value}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">비교과 활동 분류</p>
              <p className="text-md text-body break-all">
                {
                  detailContentMapper.document
                    .extracurricular_activity_classification.value
                }
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground mb-2">활동 내용</p>
              <div className="flex w-full border border-gray-300 rounded-md p-3">
                <p className="text-md text-body break-all">
                  {detailContentMapper.document.content.value}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">제출 파일</p>
              <div className="flex flex-col gap-1">
                {swMileageDetail.sw_mileage_files.length === 0 ? (
                  <p className="text-md font-semibold text-body break-all">
                    제출 파일이 없습니다.
                  </p>
                ) : (
                  swMileageDetail.sw_mileage_files.map((file) => (
                    <div key={file.sw_mileage_file_id} className="flex gap-1">
                      <button
                        onClick={() => handleFileDownload(file.url, file.name)}
                        className="text-md text-blue-600 hover:text-blue-800 hover:underline break-all text-left cursor-pointer transition-colors"
                      >
                        {file.name}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {swMileageDetail.status === 2 && (
      <div className="flex w-full justify-end items-center gap-4">
        <RejectMileageDialog swMileage={swMileageDetail}>
          <Button variant="outline" className="w-20">
            반려
          </Button>
        </RejectMileageDialog>
        <ApproveMileageDialog
          swMileage={swMileageDetail}
          activityFieldList={activityFieldList}
        >
          <Button className="w-20">승인</Button>
        </ApproveMileageDialog>
      </div>
      )}
    </div>
  );
};

export default MileageRequestDetailContent;
