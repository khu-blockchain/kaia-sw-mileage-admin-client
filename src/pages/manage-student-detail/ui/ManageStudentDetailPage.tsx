import { PageBoundary } from "@widgets/page-boundary";
import { PageLayout } from "@widgets/page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui";

import StudentInfo from "./StudentInfo";
import StudentMileageList from "./StudentMileageList";
import StudentPointHistoryList from "./StudentPointHistoryList";

export default function ManageStudentDetailPage() {
	return (
		<PageBoundary>
			<PageLayout
				index="학생 관리"
				title="학생 상세"
				description="학생의 상세 정보를 확인하세요."
			>
				<div className="flex w-full flex-col gap-2">
					<Tabs defaultValue="detail">
						<TabsList>
							<TabsTrigger value="detail">학생 정보</TabsTrigger>
							<TabsTrigger value="mileage">마일리지 신청 목록</TabsTrigger>
							<TabsTrigger value="point-history">
								마일리지 지급 내역
							</TabsTrigger>
						</TabsList>
						<TabsContent value="detail">
							<StudentInfo />
						</TabsContent>
						<TabsContent value="mileage">
							<StudentMileageList />
						</TabsContent>
						<TabsContent value="point-history">
							<StudentPointHistoryList />
						</TabsContent>
					</Tabs>
				</div>
			</PageLayout>
		</PageBoundary>
	);
}
