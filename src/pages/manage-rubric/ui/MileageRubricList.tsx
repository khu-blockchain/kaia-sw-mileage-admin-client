import type {
	MileageActivity,
	MileageRubric,
} from "@shared/api/mileage-rubric";

import { useSuspenseQuery } from "@tanstack/react-query";

import {
	mileageActivityPointTypeParser,
	mileageRubricQueries,
} from "@entities/mileage-rubric";
import { Badge, ContentContainer, Separator } from "@/shared/ui";

import DeleteActivityDialog from "./DeleteActivityDialog";
import DeleteCategoryDialog from "./DeleteCategoryDialog";
import UpdateActivityDialog from "./UpdateActivityDialog";
import UpdateCategoryDialog from "./UpdateCategoryDialog";

export default function MileageRubricList() {
	const { data: rubrics } = useSuspenseQuery(mileageRubricQueries.getRubric());

	return (
		<ContentContainer
			title="배점 항목 목록"
			description="등록된 배점 항목 목록입니다. 클릭하여 연관된 비교과 활동 목록을 확인할 수 있습니다."
		>
			<div className="flex flex-col gap-4">
				{rubrics.map((rubric) => (
					<MileageRubricItem key={rubric.id} rubric={rubric} />
				))}
			</div>
		</ContentContainer>
	);
}

function MileageRubricItem({ rubric }: { rubric: MileageRubric }) {
	return (
		<div key={rubric.id} className="flex flex-col gap-3">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<p className="text-lg font-semibold text-black">{rubric.name}</p>
					<Badge variant="outline" className="rounded-full font-semibold">
						{`${rubric.mileage_activities.length} 개`}
					</Badge>
				</div>
				<div className="flex gap-2">
					<UpdateCategoryDialog category={rubric} />
					<DeleteCategoryDialog category={rubric} />
				</div>
			</div>
			<MileageRubricActivityItem
				activities={rubric.mileage_activities}
				mileageCategoryId={rubric.id}
			/>
			<Separator />
		</div>
	);
}

function MileageRubricActivityItem({
	activities,
	mileageCategoryId,
}: {
	activities: MileageActivity[];
	mileageCategoryId: number;
}) {
	return (
		<div className="flex flex-col gap-2">
			<div className="grid grid-cols-11 gap-4 px-3 py-2 bg-gray-50 rounded-md text-sm font-medium text-gray-700">
				<div className="col-span-4">활동명</div>
				<div className="col-span-1">배점 유형</div>
				<div className="col-span-1">점수</div>
				<div className="col-span-4">배점 설명</div>
				<div className="col-span-1 text-center">관리</div>
			</div>
			<div className="space-y-1">
				{activities.map((activity, index) => (
					<div
						key={index}
						className={`grid grid-cols-11 gap-4 items-center px-3 py-2 rounded-md group transition-colors hover:bg-gray-100`}
					>
						<div className="col-span-4  ">
							<span
								className="font-medium text-sm truncate block"
								title={activity.name}
							>
								{activity.name}
							</span>
						</div>

						<div className="col-span-1">
							<Badge
								variant="blue"
								className="text-xs font-semibold rounded-full"
							>
								{mileageActivityPointTypeParser(activity.point_type)}
							</Badge>
						</div>

						<div className="col-span-1">
							<span className="text-xs font-semibold">
								{activity.fixed_point ? `${activity.fixed_point}점` : "-"}
							</span>
						</div>

						<div className="col-span-4">
							<span
								className="text-xs text-gray-600 truncate block"
								title={activity.point_description}
							>
								{activity.point_description}
							</span>
						</div>

						<div className="col-span-1 flex justify-center">
							<div className="flex gap-2">
								<UpdateActivityDialog
									activity={activity}
									mileageCategoryId={mileageCategoryId}
								/>
								<DeleteActivityDialog activity={activity} />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
