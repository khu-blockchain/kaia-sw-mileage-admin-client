import { PageBoundary } from "@widgets/page-boundary";
import { PageLayout } from "@widgets/page-layout";

import ManageStudentTable from "./ManageStudentTable";

export default function ManageStudentPage() {
	return (
		<PageBoundary>
			<PageLayout
				index="학생 관리"
				title="학생 목록"
				description="가입된 학생 목록입니다."
			>
				<ManageStudentTable />
			</PageLayout>
		</PageBoundary>
	);
}
