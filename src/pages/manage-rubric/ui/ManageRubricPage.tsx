import { PageBoundary } from "@widgets/page-boundary";
import { PageLayout } from "@widgets/page-layout";

import CreateCategoryDialog from "./CreateCategoryDialog";
import MileageRubricList from "./MileageRubricList";
import CreateActivityDialog from "./CreateActivityDialog";

export default function ManageRubricPage() {
	return (
		<PageBoundary>
			<PageLayout
				index="마일리지 배점 항목"
				title="배점 항목 관리"
				description="마일리지 배점표에 등록될 활동분야 및 비교과 활동 목록을 관리할 수 있습니다."
			>
				<div className="flex flex-col gap-4">
					<div className="flex justify-end items-center gap-2">
						<CreateCategoryDialog />
						<CreateActivityDialog />
					</div>
					<MileageRubricList />
				</div>
			</PageLayout>
		</PageBoundary>
	);
}
