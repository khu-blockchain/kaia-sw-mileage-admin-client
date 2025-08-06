import { PageBoundary } from "@widgets/page-boundary";
import { PageLayout } from "@widgets/page-layout";
import { getToday, parseToFormattedDate } from "@shared/lib";

export default function ManageTokenPage() {
	return (
		<PageBoundary>
			<PageLayout index="마일리지 토큰" title="토큰 관리">
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-6">
						<p className="text-body whitespace-pre leading-7">
							{`${parseToFormattedDate(
								getToday().toString(),
							)} 기준 생성된 SW Mileage 토큰 목록입니다.\n운영 학기에 맞는 마일리지 토큰을 활성화 하세요.`}
						</p>
					</div>
					{/* <ManageTokenContent /> */}
				</div>
			</PageLayout>
		</PageBoundary>
	);
}
