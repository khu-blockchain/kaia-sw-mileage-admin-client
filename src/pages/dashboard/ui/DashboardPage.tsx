import { PageBoundary } from "@widgets/page-boundary";
import { PageLayout } from "@widgets/page-layout";

import ActiveTokenSection from "./ActiveTokenSection";
import RecentMileageRequestSection from "./RecentMileageRequestSection";
import RecentWalletLostSection from "./RecentWalletLostSection";
import StatisticsCards from "./StatisticsCards";

const Dashboard = () => {
	return (
		<PageBoundary>
			<PageLayout
				index="대시보드"
				title="SW 마일리지 관리"
				description="SW 마일리지 관리 시스템의 대시보드입니다."
			>
				<div className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<StatisticsCards />
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
						<div className="lg:col-span-1">
							<ActiveTokenSection />
						</div>
						<div className="lg:col-span-2 space-y-4">
							<RecentMileageRequestSection />
							<RecentWalletLostSection />
						</div>
					</div>
				</div>
			</PageLayout>
		</PageBoundary>
	);
};

export default Dashboard;
