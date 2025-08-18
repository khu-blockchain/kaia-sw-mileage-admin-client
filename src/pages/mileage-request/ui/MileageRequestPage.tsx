import { PageBoundary } from "@widgets/page-boundary";
import { PageLayout } from "@widgets/page-layout";

import MileageRequestTable from "./MileageRequestTable";

export default function MileageRequestPage() {
	return (
		<PageBoundary>
			<PageLayout
				index="마일리지 신청"
				title="마일리지 신청 목록"
				description="요청된 마일리지 신청 목록을 확인하세요."
			>
				<MileageRequestTable />
			</PageLayout>
		</PageBoundary>
	);
}
