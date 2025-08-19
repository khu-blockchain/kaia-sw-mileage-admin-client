import { PageBoundary } from "@widgets/page-boundary";
import { PageLayout } from "@widgets/page-layout";

import MileageRequestTable from "./MileageRequestTable";

export default function MileageRequestPage() {
	return (
		<PageBoundary>
			<PageLayout
				index="신청 내역"
				title="신청 목록"
				description="학생들의 마일리지 신청 내역을 확인하세요."
			>
				<MileageRequestTable />
			</PageLayout>
		</PageBoundary>
	);
}
