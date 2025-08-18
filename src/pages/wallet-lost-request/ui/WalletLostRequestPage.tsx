import { PageBoundary } from "@widgets/page-boundary";
import { PageLayout } from "@widgets/page-layout";
import WalletLostTable from "./WalletLostTable";

export default function WalletLostRequestPage() {
	return (
		<PageBoundary>
			<PageLayout
				index="지갑 분실 요청"
				title="지갑 분실 요청 목록"
				description="지갑 분실 요청 목록을 확인하세요."
			>
				<WalletLostTable />
			</PageLayout>
		</PageBoundary>
	);
}
