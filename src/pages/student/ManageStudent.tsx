import { Button, Input } from "@/shared/ui";
import { PageLayout } from "@/widget/_frgment";
import { PageBoundary } from "@/widget/_suspense";
import { useState } from "react";
import EmptyState from "@/shared/assets/images/EmptyState.svg";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/ui";
import { useGetStudentInfo } from "@/features/student/queries";
import { toast } from "sonner";
import {
  StudentInfoTab,
  StudentHistoryTab,
  StudentMintTab,
  StudentBurnTab,
} from "@/widget/student";
import { Student } from "@/entities/student";
import { SwMileageTokenHistory } from "@/entities/history";

const ManageStudent = () => {
  const [studentId, setStudentId] = useState<string>("");
  const [activeTab, setActiveTab] = useState("basic");

  const { data, refetch } = useGetStudentInfo({
    student_id: studentId,
  });

  //TODO: 키 전부 맞추기, UI 부터 모두 구현
  const handleSearch = () => {
    if (!studentId) {
      toast.error("학번을 입력해주세요.");
      return;
    }
    try {
      refetch();
    } catch (error) {
      console.log(error);
      toast.error("학생 정보를 찾을 수 없습니다.");
    }
  };

  return (
    <PageBoundary>
      <PageLayout index="학생 관리" title="학생 관리">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <p className="text-body">
              조회하고자 하는 학생의 학번 정보를 입력하세요.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-2">
              <Input
                className="w-md h-10 bg-white"
                placeholder="학번을 입력하세요"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
              <Button className="h-10 w-16" onClick={() => handleSearch()}>
                조회
              </Button>
            </div>
            <div className="content-container min-h-60">
              {!data && (
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={EmptyState}
                    alt="logo"
                    className="h-40 object-contain"
                  />
                  <p className="text-md text-black font-semibold">
                    학생 정보를 찾을 수 없습니다.
                  </p>
                  <p className="text-sm text-body font-normal">
                    입력된 학번이 올바른지 확인해주세요.
                  </p>
                </div>
              )}
              {data && (
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList>
                    <TabsTrigger value="basic">기본 정보</TabsTrigger>
                    <TabsTrigger value="mileage">
                      마일리지 지급 / 회수 내역
                    </TabsTrigger>
                    <TabsTrigger value="mint">토큰 지급</TabsTrigger>
                    <TabsTrigger value="burn">토큰 회수</TabsTrigger>
                  </TabsList>
                  <StudentInfoTab data={data.student as Student} />
                  <TabsContent value="mileage">
                    <StudentHistoryTab
                      data={data.mileageHistory as SwMileageTokenHistory[]}
                    />
                  </TabsContent>
                  <TabsContent value="mint">
                    <StudentMintTab />
                  </TabsContent>
                  <TabsContent value="burn">
                    <StudentBurnTab />
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </div>
        </div>
      </PageLayout>
    </PageBoundary>
  );
};

export default ManageStudent;
