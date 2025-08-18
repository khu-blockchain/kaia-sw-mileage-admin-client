import { PageBoundary } from "@widgets/page-boundary";
import { PageLayout } from "@widgets/page-layout";

import ManagePointHistoriesTable from "./ManagePointHistoriesTable";

export default function ManagePointHistoriesPage() {
	return (
		<PageBoundary>
			<PageLayout
				index="마일리지 기록"
				title="마일리지 기록 목록"
				description="마일리지 기록 목록을 확인하세요. 항목을 클릭하여 해당되는 마일리지의 상세 페이지로 이동할 수 있습니다."
			>
				<ManagePointHistoriesTable />
			</PageLayout>
		</PageBoundary>
	);
}
