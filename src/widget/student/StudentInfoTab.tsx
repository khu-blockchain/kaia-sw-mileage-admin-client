import { TabsContent } from "@/shared/ui";
import { Student } from "@/entities/student";

const StudentInfoTab = ({ data }: { data: Student }) => {
  return (
    <TabsContent value="basic">
      <div className="flex flex-col gap-2 mt-4 w-full">
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-2 border-b border-gray-200 pb-4 w-full">
            <p className="text-sm text-body font-semibold">학번</p>
            <p className="text-sm text-body font-normal">
              {data.student_id}
            </p>
          </div>
          <div className="flex flex-col gap-2 border-b border-gray-200 pb-4 w-full">
            <p className="text-sm text-body font-semibold">이름</p>
            <p className="text-sm text-body font-normal">
              {data.name}
            </p>
          </div>
          <div className="flex flex-col gap-2 border-b border-gray-200 pb-4 w-full">
            <p className="text-sm text-body font-semibold">이메일</p>
            <p className="text-sm text-body font-normal">
              {data.email}
            </p>
          </div>
          <div className="flex flex-col gap-2 border-b border-gray-200 pb-4 w-full">
            <p className="text-sm text-body font-semibold">전화번호</p>
            <p className="text-sm text-body font-normal">
              {data.phone_number}
            </p>
          </div>
          <div className="flex flex-col gap-2 border-b border-gray-200 pb-4 w-full">
            <div className="flex flex-row justify-between items-center">
              <p className="text-sm text-body font-semibold">지갑 주소</p>
            </div>
            <p className="text-sm text-body font-normal">
              {data.wallet_address}
            </p>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default StudentInfoTab;
