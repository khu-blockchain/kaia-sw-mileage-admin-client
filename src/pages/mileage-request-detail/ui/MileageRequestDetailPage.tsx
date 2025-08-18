import { PageBoundary } from "@widgets/page-boundary";
import { PageLayout } from "@widgets/page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui";

import MileageRequestDetail from "./MileageRequestDetail";
import InpagePointHistoryTable from "./InpagePointHistoryTable";

export default function MileageRequestDetailPage() {
	return (
		<PageBoundary>
			<PageLayout
				index="신청 내역"
				title="신청 내역 상세"
				description="학생이 신청한 마일리지 내역을 확인하세요."
			>
				<div className="flex w-full flex-col gap-2">
					<Tabs defaultValue="detail">
						<TabsList>
							<TabsTrigger value="detail">제출 정보</TabsTrigger>
							<TabsTrigger value="history">마일리지 지급 내역</TabsTrigger>
						</TabsList>
						<TabsContent value="detail">
							<MileageRequestDetail />
						</TabsContent>
						<TabsContent value="history">
							<InpagePointHistoryTable />
						</TabsContent>
					</Tabs>
				</div>
			</PageLayout>
		</PageBoundary>
	);
}
